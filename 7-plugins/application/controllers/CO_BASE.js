var app = angular.module('app', ['ngSanitize', 'ngMask', 'ngTagsInput', 'rt.select3']);
CINTILLO = "";

function encodelast(url) {
    let urlparts = url.split("/");
    let last = urlparts.pop();
    urlparts.push(encodeURIComponent(last));
    return urlparts.join("/");
}

function GetSortOrder(prop, desc) {
    return function (a, b) {
        if (desc) {
            if (a[prop] < b[prop])
                return 1;
            else if (a[prop] > b[prop])
                return -1;
        } else {
            if (a[prop] > b[prop])
                return 1;
            else if (a[prop] < b[prop])
                return -1;
        }
        return 0;
    }
}

app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        if (input)
            return input.slice(start);
        else
            return [];
    }
});

app.directive("repeatEnd", function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.repeatEnd);
            }
        }
    };
});
app.filter('orderObjectBy', function () {
    return function (items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function (item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if (reverse) filtered.reverse();
        return filtered;
    };
});
app.directive('ngModelOnblur', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attr, ngModelCtrl) {
            setTimeout(() => {
                if (attr.type === 'radio' || attr.type === 'checkbox') return;

                elm.unbind('input').unbind('keydown').unbind('change');
                elm.bind('blur', function () {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(elm.val());
                    });
                });
            }, 1000);
        }
    };
});
app.factory('logTimeTaken', [function () {
    var logTimeTaken = {
        request: function (config) {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function (response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return logTimeTaken;
}]);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('logTimeTaken');
    var session = new SESSION();
    if (session.isLogged())
        $httpProvider.defaults.headers.common['x-access-token'] = session.current().token;
}]);
$.ajaxSetup({
    beforeSend: function (xhr) {
        var session = new SESSION();
        if (session.isLogged())
            xhr.setRequestHeader("x-access-token", session.current().token);
    }
});
app.controller('baseController', function ($scope, $http, $compile, $controller) {
    baseController = this;
    var session = new SESSION();
    let adasession = session.current();
    if (adasession) {

        baseController.misnomenclaturas = BASEAPI.listf("code_generator",
            [{
                field: 'compania',
                value: adasession.compania_id
            }]
        ).then(result => {
            baseController.misnomenclaturas = result;
        });
        if (!baseController.dynamicDocuments)
            baseController.dynamicDocuments = BASEAPI.listf("documentos_ia",
                [{
                    field: 'compania',
                    value: adasession.compania_id
                }]
            ).then(result => {
                baseController.dynamicDocuments = result;
                if (baseController.dynamicDocuments)
                    baseController.dynamicDocuments.forEach(d => {
                        let parse = (d.config || "{fields: []}");
                        d.config = JSON.parse(parse);
                    })
            });

        baseController.scanImage = async (entity, simple) => {
            let entityValue = baseController.dynamicDocuments.filter(d => {
                return d.nombre === entity;
            })[0];
            if (entityValue) {
                let image = "";
                let crude = [];
                let informe = [];
                let a = document.createElement("input");
                a.type = "file";
                a.accept = "image/png, image/gif, image/jpeg"
                a.click();
                a.onchange = () => {
                    let file = a.files[0];
                    if (file) {
                        SWEETALERT.loading({message: "Subiendo Documento"});
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (evt) => {
                            try {
                                image = reader.result;
                                if (image) {
                                    SWEETALERT.loading({message: "Procesando Documento"});
                                    Tesseract.recognize(image, 'eng').then(async ({data: {text}}) => {
                                        if (text) {
                                            text.split("\n").forEach((line, ix) => {
                                                crude.push({
                                                    id: ix + 1,
                                                    text: line.replaceAll('"', "'")
                                                });
                                            });
                                        }
                                        if (entityValue.config.fields)
                                            if (entityValue.config.fields.length) {
                                                IA.readFile(entityValue.config.fields, crude, informe, simple);
                                                informe.forEach(info => {
                                                    baseController.currentModel[info.field] = info.result;
                                                });
                                                baseController.currentModel.refreshAngular();
                                            }
                                        SWEETALERT.stop();
                                    });
                                } else {
                                    SWEETALERT.show({type: 'error', message: `Archivo inválido`});
                                }
                            } catch (e) {
                                SWEETALERT.show({type: 'error', message: `Archivo inválido`});
                            }
                        };
                        reader.onerror = function () {
                            SWEETALERT.show({type: 'error', message: `Error al subir el archivo`});
                        };
                    } else {
                        SWEETALERT.show({type: 'error', message: `Error al subir el archivo`});
                    }
                }
            } else {
                SWEETALERT.show({
                    type: 'error',
                    message: `La entidad ${entity.nombre} no está configurada para esta empresa`
                });
            }
        };

        if (!baseController.ponderaciones)
            BASEAPI.listp("reporte_indicador_config", {
                limit: 0,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "compania",
                    value: adasession.compania_id
                }]
            }).then((data) => {
                baseController.ponderaciones = data.data
                if (!baseController.ponderaciones)
                    return;
                let ponderaciones = baseController.ponderaciones.sort(GetSortOrder("orden"));
                let finalPonderaciones = [];
                let distinctPonderations = [...new Set(baseController.ponderaciones.map(d => d.tipo_meta))];
                for (const tipo_meta_index of distinctPonderations) {
                    // if (generalPonderation && tipo_meta_index !== 0)
                    //     continue;
                    let nombre = (baseController.session.tipoMenta.filter(d => d.id === tipo_meta_index)[0] || {nombre: "General"}).nombre;
                    let liston = ponderaciones.filter(d => d.tipo_meta === tipo_meta_index).map(d => {
                        return {id: d.id, color: d.color, nombre: d.titulo, titulo: `Progreso de ${d.from} a ${d.to}`}
                    });
                    finalPonderaciones.push({
                        nombre: nombre,
                        list: liston
                    });
                }
                baseController.ponderaciones = finalPonderaciones;
                let css = ``;

                baseController.ponderaciones.forEach(pon => {
                    pon.list.forEach(l => {
                        css += `
                         .text_${l.id}{
                             color: ${l.color} !important;
                             font-weight: bold;
                         }
                    `;
                    })

                });

                let head = document.head || document.getElementsByTagName('head')[0];
                let style = document.createElement('style');
                head.appendChild(style);
                style.type = 'text/css';
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
            });
        baseController.abrirPonderaciones = () => {
            baseController.modal.modalView("a_interinstitucion/ponderacion", {
                header: {
                    title: "Ponderaciones",
                    icon: "list"
                },
                footer: {
                    cancelButton: false,
                    closeButton: false
                },
                content: {
                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                    sameController: true
                },
                event: {
                    show: {
                        begin: function (data) {

                        },
                        end: function (data) {


                        }
                    },
                    hide: {
                        begin: function (data) {

                        },
                        end: function (data) {

                        }
                    }
                },
            });
        };

        baseController.COD = (mod, id, fecha) => {
            let file = baseController.misnomenclaturas.filter(d => {
                return d.modulo === mod
            })[0];
            if (file) {
                let newNomenclatura = file.nomenclatura;
                let fechista = new Date(fecha);
                let replacers = {
                    "@YY": fechista.getFullYear() + "",
                    "@Y": (fechista.getFullYear() + "").substr(2, 2),
                    "@M": ((fechista.getMonth() + 1) <= 9 ? '0' : '') + (fechista.getMonth() + 1),
                    "@D": ((fechista.getDate() + 1) <= 9 ? '0' : '') + (fechista.getDate()),
                    "@S": id
                };
                Object.keys(replacers).forEach(d => {
                    newNomenclatura = newNomenclatura.replaceAll(d, replacers[d] || "XX");
                });
                return newNomenclatura;
            }
            return id;
        };
        baseController.currentMenu = adasession.currentMenu;
        if (STORAGE.exist('currentMenu')) {
            baseController.currentMenu = STORAGE.get("currentMenu");
        }
        baseController.session = adasession;
        if (baseController.session)
            if (baseController.session.groups[0])
                baseController.usuarioNoDepartamental = baseController.session.groups[0].caracteristica != ENUM_2.Grupos.analista_departamental && baseController.session.groups[0].caracteristica != ENUM_2.Grupos.director_departamental;
        baseController.menus = CONFIG.menus;
        baseController.menusList = CONFIG.ui.menusList;
        baseController.setSeparator = (text) => {
            baseController.selectedSeparator = text;
            baseController.myMenuSeparators().forEach(d => {
                $(`[data-markmain="${d.text}"]`).hide("fast");
            });
            $(`[data-markmain="${text}"]`).show("fast");
        };
        baseController.myMenuSeparators = function () {
            let sessionx = new SESSION().current();
            var renderCompania = sessionx.institucion_id ? ('I' + sessionx.institucion_id) : ('C' + sessionx.compania_id);
            if (sessionx.compania_id === null)
                renderCompania = "";
            if (eval(`CONFIG.${baseController.currentMenu}${renderCompania}`)) {
                return eval(`CONFIG.${baseController.currentMenu}${renderCompania}`).filter(d => {
                    return d.disable
                });
            }
            return eval(`CONFIG.${baseController.currentMenu}`).filter(d => {
                if (d.disable && d.condition) {
                    let result = false;
                    try {
                        result = eval(d.condition);
                    } catch (e) {

                    }
                    return result;
                }
                return d.disable
            });
        };
        baseController.elelemenu = undefined;
        baseController.cleanMenu = (arr, ix) => {
            if (arr[ix].condition) {
                let result = false;
                try {
                    result = eval(arr[ix].condition);
                } catch (e) {

                }
                if (!result) {
                    arr.splice(ix, 1);
                }
            }
        };
        baseController.myMenu = function () {
            let sessionx = new SESSION().current();
            var renderCompania = sessionx.institucion_id ? ('I' + sessionx.institucion_id) : ('C' + sessionx.compania_id);
            if (sessionx.compania_id === null)
                renderCompania = "";
            if (eval(`CONFIG.${baseController.currentMenu}${renderCompania}`)) {
                baseController.elelemenu = eval(`CONFIG.${baseController.currentMenu}${renderCompania}`);
            }
            baseController.elelemenu = eval(`CONFIG.${baseController.currentMenu}`);

        };


        baseController.buildParent = function () {
            let sessionx = new SESSION().current();
            var renderCompania = sessionx.institucion_id ? ('I' + sessionx.institucion_id) : ('C' + sessionx.compania_id);
            if (sessionx.compania_id === null)
                renderCompania = "";
            let menu = [];
            if (eval(`CONFIG.${baseController.currentMenu}${renderCompania}`)) {
                menu = CONFIG[`${baseController.currentMenu}${renderCompania}`];
            } else
                menu = CONFIG[baseController.currentMenu];
            let currentParent = "";
            menu.forEach(d => {
                if (d.disable)
                    currentParent = d.text;
                d.mark = currentParent;
                if (d.menus)
                    d.menus.forEach(e => {
                        e.mark = currentParent;
                        if (e.menus)
                            e.menus.forEach(f => {
                                f.mark = currentParent;
                                if (f.menus)
                                    f.menus.forEach(g => {
                                        g.mark = currentParent;
                                    });
                            });
                    });
            });
        };
        baseController.buildParent();
        baseController.menuLabel = function (menu) {
            return MESSAGE.ispace('menu.' + menu.text.replaceAll(' ', ''), menu.text);
        };
        baseController.changeMenu = function (menu) {
            var animation = new ANIMATION();
            animation.loading(`#dragonmenu`, "", ``, '30');
            setTimeout(() => {
                baseController.currentMenu = menu.href;
                STORAGE.add("currentMenu", baseController.currentMenu);
                baseController.refreshAngular();
                animation.stoploading(`#dragonmenu`);
                MENU.setActive();
                setTimeout(() => {
                    baseController.setSeparator(MENU.current.menu.mark);
                }, 500);
                location.reload();
            }, 500);
        };
        baseController.myMenu();
    }
    begin = async () => {
        var session = new SESSION();
        if (session.current()) {
            let intersession = session.current();
            CONFIGCOMPANY = await BASEAPI.firstp("compania_config", {
                orderby: "compania_id",
                order: "desc",
                where: [
                    {field: "compania_id", value: intersession.compania_id},
                ]
            });
            if (!CONFIGCOMPANY) {
                CONFIGCOMPANY = {};
                if (intersession)
                    CONFIGCOMPANY.pacc = intersession.maneja_pacc === 1 || intersession.pacc;
            } else {
                let css = `.alpha-extra,.border-extra,.border-extra-100,.border-extra-1000,.border-extra-200,.border-extra-300,.border-extra-400,.border-extra-500,.border-extra-600,.border-extra-700,.border-extra-800,.border-extra-900{border-color:ELCOLOR !important}.bg-extra,.bg-extra-100,.bg-extra-1000,.bg-extra-200,.bg-extra-300,.bg-extra-400,.bg-extra-500,.bg-extra-600,.bg-extra-700,.bg-extra-800,.bg-extra-900{background-color:ELCOLOR !important;border-color:ELCOLOR !important;color:#fff!important}.alpha-extra{background-color:ELCOLOR !important}.border-top-extra,.border-top-extra-100,.border-top-extra-1000,.border-top-extra-200,.border-top-extra-300,.border-top-extra-400,.border-top-extra-500,.border-top-extra-600,.border-top-extra-700,.border-top-extra-800,.border-top-extra-900{border-top-color:ELCOLOR !important}.border-bottom-extra,.border-bottom-extra-100,.border-bottom-extra-1000,.border-bottom-extra-200,.border-bottom-extra-300,.border-bottom-extra-400,.border-bottom-extra-500,.border-bottom-extra-600,.border-bottom-extra-700,.border-bottom-extra-800,.border-bottom-extra-900{border-bottom-color:ELCOLOR !important}.border-left-extra,.border-left-extra-100,.border-left-extra-1000,.border-left-extra-200,.border-left-extra-300,.border-left-extra-400,.border-left-extra-500,.border-left-extra-600,.border-left-extra-700,.border-left-extra-800,.border-left-extra-900{border-left-color:ELCOLOR !important}.border-right-extra,.border-right-extra-100,.border-right-extra-1000,.border-right-extra-200,.border-right-extra-300,.border-right-extra-400,.border-right-extra-500,.border-right-extra-600,.border-right-extra-700,.border-right-extra-800,.border-right-extra-900{border-right-color:ELCOLOR !important}.text-extra,.text-extra-100,.text-extra-1000,.text-extra-1000:focus,.text-extra-1000:hover,.text-extra-100:focus,.text-extra-100:hover,.text-extra-200,.text-extra-200:focus,.text-extra-200:hover,.text-extra-300,.text-extra-300:focus,.text-extra-300:hover,.text-extra-400,.text-extra-400:focus,.text-extra-400:hover,.text-extra-600,.text-extra-600:focus,.text-extra-600:hover,.text-extra-700,.text-extra-700:focus,.text-extra-700:hover,.text-extra-800,.text-extra-800:focus,.text-extra-800:hover,.text-extra-900,.text-extra-900:focus,.text-extra-900:hover,.text-extra:focus,.text-extra:hover{color:ELCOLOR!important}.bg-extra-700.navbar-inverse .navbar-text,.bg-extra-700.navbar-inverse a,.bg-extra-700.navbar-inverse a:hover,.nav-tabs.bg-extra-700>.active>a,.nav-tabs.bg-extra-700>li>a,.nav-tabs.bg-extra-800>.active>a:focus,.nav-tabs.bg-extra-800>.active>a:hover{color:#fff!important}.nav-extra li.active{border-bottom:1px solid ELCOLOR !important;border-block-width:2px}`;
                css += ` .alpha-primary,.border-primary,.border-primary-100,.border-primary-1000,.border-primary-200,.border-primary-300,.border-primary-400,.border-primary-500,.border-primary-600,.border-primary-700,.border-primary-800,.border-primary-900{border-color:ELCOLOR !important}.bg-primary,.bg-primary-100,.bg-primary-1000,.bg-primary-200,.bg-primary-300,.bg-primary-400,.bg-primary-500,.bg-primary-600,.bg-primary-700,.bg-primary-800,.bg-primary-900{background-color:ELCOLOR !important;border-color:ELCOLOR !important;color:#fff!important}.alpha-primary{background-color:ELCOLOR !important}.border-top-primary,.border-top-primary-100,.border-top-primary-1000,.border-top-primary-200,.border-top-primary-300,.border-top-primary-400,.border-top-primary-500,.border-top-primary-600,.border-top-primary-700,.border-top-primary-800,.border-top-primary-900{border-top-color:ELCOLOR !important}.border-bottom-primary,.border-bottom-primary-100,.border-bottom-primary-1000,.border-bottom-primary-200,.border-bottom-primary-300,.border-bottom-primary-400,.border-bottom-primary-500,.border-bottom-primary-600,.border-bottom-primary-700,.border-bottom-primary-800,.border-bottom-primary-900{border-bottom-color:ELCOLOR !important}.border-left-primary,.border-left-primary-100,.border-left-primary-1000,.border-left-primary-200,.border-left-primary-300,.border-left-primary-400,.border-left-primary-500,.border-left-primary-600,.border-left-primary-700,.border-left-primary-800,.border-left-primary-900{border-left-color:ELCOLOR !important}.border-right-primary,.border-right-primary-100,.border-right-primary-1000,.border-right-primary-200,.border-right-primary-300,.border-right-primary-400,.border-right-primary-500,.border-right-primary-600,.border-right-primary-700,.border-right-primary-800,.border-right-primary-900{border-right-color:ELCOLOR !important}.text-primary,.text-primary-100,.text-primary-1000,.text-primary-1000:focus,.text-primary-1000:hover,.text-primary-100:focus,.text-primary-100:hover,.text-primary-200,.text-primary-200:focus,.text-primary-200:hover,.text-primary-300,.text-primary-300:focus,.text-primary-300:hover,.text-primary-400,.text-primary-400:focus,.text-primary-400:hover,.text-primary-600,.text-primary-600:focus,.text-primary-600:hover,.text-primary-700,.text-primary-700:focus,.text-primary-700:hover,.text-primary-800,.text-primary-800:focus,.text-primary-800:hover,.text-primary-900,.text-primary-900:focus,.text-primary-900:hover,.text-primary:focus,.text-primary:hover{color:ELCOLOR!important}.bg-primary-700.navbar-inverse .navbar-text,.bg-primary-700.navbar-inverse a,.bg-primary-700.navbar-inverse a:hover,.nav-tabs.bg-primary-700>.active>a,.nav-tabs.bg-primary-700>li>a,.nav-tabs.bg-primary-800>.active>a:focus,.nav-tabs.bg-primary-800>.active>a:hover{color:#fff!important}.nav-primary li.active{border-bottom:1px solid ELCOLOR !important;border-block-width:2px}`;
                css = css.replaceAll("ELCOLOR", CONFIGCOMPANY.color_principal);
                css += `.alpha-secundary,.border-secundary,.border-secundary-100,.border-secundary-1000,.border-secundary-200,.border-secundary-300,.border-secundary-400,.border-secundary-500,.border-secundary-600,.border-secundary-700,.border-secundary-800,.border-secundary-900{border-color:ELCOLOR !important}.bg-secundary,.bg-secundary-100,.bg-secundary-1000,.bg-secundary-200,.bg-secundary-300,.bg-secundary-400,.bg-secundary-500,.bg-secundary-600,.bg-secundary-700,.bg-secundary-800,.bg-secundary-900{background-color:ELCOLOR !important;border-color:ELCOLOR !important;color:#fff!important}.alpha-secundary{background-color:ELCOLOR !important}.border-top-secundary,.border-top-secundary-100,.border-top-secundary-1000,.border-top-secundary-200,.border-top-secundary-300,.border-top-secundary-400,.border-top-secundary-500,.border-top-secundary-600,.border-top-secundary-700,.border-top-secundary-800,.border-top-secundary-900{border-top-color:ELCOLOR !important}.border-bottom-secundary,.border-bottom-secundary-100,.border-bottom-secundary-1000,.border-bottom-secundary-200,.border-bottom-secundary-300,.border-bottom-secundary-400,.border-bottom-secundary-500,.border-bottom-secundary-600,.border-bottom-secundary-700,.border-bottom-secundary-800,.border-bottom-secundary-900{border-bottom-color:ELCOLOR !important}.border-left-secundary,.border-left-secundary-100,.border-left-secundary-1000,.border-left-secundary-200,.border-left-secundary-300,.border-left-secundary-400,.border-left-secundary-500,.border-left-secundary-600,.border-left-secundary-700,.border-left-secundary-800,.border-left-secundary-900{border-left-color:ELCOLOR !important}.border-right-secundary,.border-right-secundary-100,.border-right-secundary-1000,.border-right-secundary-200,.border-right-secundary-300,.border-right-secundary-400,.border-right-secundary-500,.border-right-secundary-600,.border-right-secundary-700,.border-right-secundary-800,.border-right-secundary-900{border-right-color:ELCOLOR !important}.text-secundary,.text-secundary-100,.text-secundary-1000,.text-secundary-1000:focus,.text-secundary-1000:hover,.text-secundary-100:focus,.text-secundary-100:hover,.text-secundary-200,.text-secundary-200:focus,.text-secundary-200:hover,.text-secundary-300,.text-secundary-300:focus,.text-secundary-300:hover,.text-secundary-400,.text-secundary-400:focus,.text-secundary-400:hover,.text-secundary-600,.text-secundary-600:focus,.text-secundary-600:hover,.text-secundary-700,.text-secundary-700:focus,.text-secundary-700:hover,.text-secundary-800,.text-secundary-800:focus,.text-secundary-800:hover,.text-secundary-900,.text-secundary-900:focus,.text-secundary-900:hover,.text-secundary:focus,.text-secundary:hover{color:ELCOLOR!important}.bg-secundary-700.navbar-inverse .navbar-text,.bg-secundary-700.navbar-inverse a,.bg-secundary-700.navbar-inverse a:hover,.nav-tabs.bg-secundary-700>.active>a,.nav-tabs.bg-secundary-700>li>a,.nav-tabs.bg-secundary-800>.active>a:focus,.nav-tabs.bg-secundary-800>.active>a:hover{color:#fff!important}.nav-secundary li.active{border-bottom:1px solid ELCOLOR !important;border-block-width:2px}`;
                css += `#losseparator,.menu-list li>a:focus,.menu-list li>a:hover{background-color:ELCOLOR !important}.navigation>li.active>a,.navigation>li.active>a:focus,.navigation>li.active>a:hover,.navigation>li>ul li.active>a,.navigation>li>ul li.active>a:focus,.navigation>li>ul li.active>a:hover{background-color:ELCOLOR !important;color:#fff}#losseparator,#losseparator a,.menu-list li>a:focus,.menu-list li>a:hover{color:#fff!important;font-weight:700!important}#losseparator{width:100%}`;
                css = css.replaceAll("ELCOLOR", CONFIGCOMPANY.color_secundario);

                let head = document.head || document.getElementsByTagName('head')[0];
                let style = document.createElement('style');
                head.appendChild(style);
                style.type = 'text/css';
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
            }
            baseController.CONFIGCOMPANY = CONFIGCOMPANY;
            baseController.misformularios = await BASEAPI.listp("modulo_formulario",
                [{
                    field: 'compania',
                    value: intersession.compania_id
                }]);
            baseController.misformularios = baseController.misformularios.data;

            //primer paseo

            // if (arr[ix].condition) {
            //     let result = false;
            //     try {
            //         if (arr[ix].condition.indexOf("pacc") !== -1)
            //             debugger;
            //         result = eval(arr[ix].condition);
            //     } catch (e) {
            //
            //     }
            //     if (!result) {
            //         arr.splice(ix, 1);
            //     }
            // }

            var predicado = menu => {
                if (menu.condition) {
                    let result = false;
                    try {
                        result = eval(menu.condition);
                    } catch (e) {

                    }
                    return result;
                }
                return true;
            };

            baseController.elelemenu = baseController.elelemenu.filter(predicado);

            baseController.elelemenu.forEach((menu) => {
                if (menu.menus)
                    menu.menus = menu.menus.filter(predicado);
            });
            baseController.elelemenu.forEach((menu) => {
                if (menu.menus)
                    menu.menus.forEach((submenu) => {
                        if (submenu.menus)
                            submenu.menus = submenu.menus.filter(predicado);
                    });
            });
            baseController.elelemenu.forEach((menu) => {
                if (menu.menus) {
                    menu.menus.forEach((submenu) => {
                        if (submenu.menus) {
                            submenu.menus.forEach((tercer, iz) => {
                                baseController.cleanMenu(submenu.menus, iz);
                            });
                        }
                    });
                }
            });
            //segundo paseo
            baseController.elelemenu.forEach((menu, ix) => {
                baseController.cleanMenu(baseController.elelemenu, ix);
            });
            baseController.elelemenu.forEach((menu) => {
                if (menu.menus) {
                    menu.menus.forEach((submenu, iy) => {
                        baseController.cleanMenu(menu.menus, iy);
                    });
                }
            });
            baseController.elelemenu.forEach((menu) => {
                if (menu.menus) {
                    menu.menus.forEach((submenu) => {
                        if (submenu.menus) {
                            submenu.menus.forEach((tercer, iz) => {
                                baseController.cleanMenu(submenu.menus, iz);
                            });
                        }
                    });
                }
            });

            baseController.elelemenu.forEach(segundonivel => {
                if ((segundonivel.menus || []).filter(d => d.esformulario === true)[0])
                    baseController.misformularios.forEach(row => {
                        if ((segundonivel.menus || []).filter(d => d.esformulario === true)[0].menus) {
                            let link = `#auth/formulario?id=${row.id}`;
                            (segundonivel.menus || []).filter(d => d.esformulario === true)[0].menus.push(
                                {
                                    "modal": "modal-full",
                                    "icon": "list3",
                                    "href": link,
                                    "text": row.nombre.trim()
                                }
                            );
                        }
                    });
            });

        }
        COMPILE.run(baseController, $scope, $compile);
        MODAL.run(baseController, $compile);
        if (location.href.indexOf(`/home#auth/login`) === -1 && location.href.indexOf(`/home#auth/formulario`) === -1)
            CONTROL.run(baseController, $compile);
        baseController.about = eval(`CONFIG.version.about.${MESSAGE.current().code}`).replace("[ENTER]", `
    
    `);
        //CRUD MENU
        baseController.iconList = [
            'home2',
            'home9',
            'eraser',
            'lifebuoy'
        ];
        // variables para poder obtener los datos en autorizar poa
        baseController.viaja_depto = 0;
        baseController.viaja_status = 0;
        baseController.comentarioChangeStatus = "";
        baseController.comentarioLiberar = "";
        baseController.show_form = function (form, index) {
            var fm = form + index;
            if ($(`.${fm}`).hasClass('show-form')) {
                $(`.${fm}`).removeClass('show-form');
                $(`.${fm}`).show();
                $(`[name=icon${fm}]`).select2({
                    templateSelection: DROPDOWN.iformat,
                    templateResult: DROPDOWN.iformat,
                    allowHtml: true
                });
            } else {
                $(`.${fm}`).addClass('show-form');
                $(`.${fm}`).hide();
            }
        };

        session.ifLogoffRedirec();

        baseController.poaList = adasession ? adasession.poaList : [];
        baseController.poaFirt = [];
        baseController.poaFullName = "";
        baseController.poaActual = 0;
        baseController.Ayuda = function (link) {
            var load = new LOAD();
            load.template('templates/components/object', {src: link}, function (html) {
                baseController.modal.simpleModal(html, {
                    width: ENUM.modal.width.full,
                    header: {title: "Ayuda en Línea - Syplans", icon: "info22"}
                });
            });
        };
        baseController.poaUpdate = function (poa) {
            console.log(poa.cantidad);
            SWEETALERT.confirm({
                message: "Esta seguro de realizar esta acción?",
                confirm: function () {
                    SWEETALERT.loading({message: `Cambiando a POA  ${poa.nombre} - ${poa.periodo_poa}...`});
                    for (var Fpoa in baseController.poaList) {
                        if (poa.id == baseController.poaList[Fpoa].id) {
                            baseController.poaList[Fpoa].selected = true;
                            // baseController.poaList[Fpoa].activo = 1;
                            // BASEAPI.updateall('poa', {activo: 1, where:[{ field:"id", value: baseController.poaList[Fpoa].id }]}, function(result){
                            //     console.log(result, "cambie a activo");
                            // });
                        } else {
                            // if (baseController.poaList[Fpoa].activo > 0){
                            //     baseController.poaList[Fpoa].activo = 0;
                            //     BASEAPI.updateall('poa', {activo: 0, where:[{ field:"id", value: baseController.poaList[Fpoa].id }]}, function(result){
                            //         console.log(result, "cambie a inactivo");
                            //     });
                            // }
                            baseController.poaList[Fpoa].selected = false;
                        }
                    }
                    baseController.poaFullName = poa.nombre + ' - ' + poa.periodo_poa;
                    console.log(poa)
                    new SESSION().update(
                        {
                            poa_id: poa.id,
                            poaActual: poa.id,
                            poaFirt: poa,
                            poaList: baseController.poaList,
                            poaFullName: baseController.poaFullName,
                            poa: poa.nombre,
                            periodo_poa: poa.periodo_poa,
                            estado: poa.activo,
                            est_poa: poa.estado,
                            periodo_poa_msj: `POA ${poa.periodo_poa}`,
                            cantidad: poa.cantidad,
                            monitoreo_nombre: poa.nombre_mostrar,
                            poa_habilitado: poa.poa_habilitado
                        });
                    location.reload();
                }
            });
        };

        if (session.current()) {

            IP = "0.0.0.0";

            var session2 = session.current();
            var condition = false;

            if (session2.poa_initial == 1) {
                condition = true;
                new SESSION().update({poa_initial: 0});
            }

            CONFIG.languages[1].money = session2.monedacode;
            LAN.money = value => currency(value, {
                symbol: session2.monedasimbol,
                decimal: session2.monedaformat[1],
                separator: session2.monedaformat[0]
            });

            // let rsm = await BxASEAPI.listp('tipoMeta', {});
            baseController.list_tipo_meta = adasession.tipoMeta;

            // let rsd = await BxASEAPI.listp('direccionMeta', {});
            baseController.list_direccion_meta = adasession.direccionMeta;

            // let lala = await BxASEAPI.listp('vw_aaadef', {limit: 0});
            baseController.WORKFLOW = adasession.WORKFLOW;
            if (baseController.WORKFLOW === undefined) {
                new SESSION().logoff();
                return;
            }
            baseController.WORKFLOW.forEach(d => {
                ["acciones_estatus", "acciones_rol", "feature", "features_estatus"].forEach(e => {
                    try {
                        if (d[e])
                            d[e] = eval(d[e]);
                    } catch (e) {

                    }
                });
            });

            // if (new SESSION().current().intersectorial) {
            //     // let data = await BxASEAPI.listp('compania', {
            //     //     where: [{
            //     //         field: "sector",
            //     //         value: new SESSION().current().sector_id
            //     //     }]
            //     // });
            //     // if (data)
            //     //     if (data.data) {
            //     //         var companies = [];
            //     //         for (var company of data.data) {
            //     //             companies.push(company.id);
            //     //         }
            //     //         new SESSION().update({sectorial: companies});
            //     //     }
            // }

            // rsm = await BxASEAPI.listp('poa_monitoreo', {});
            baseController.poa_monitorieo = adasession.poa_monitorieo;

            baseController.secundarios = new SESSION().current().secundarios;
            if (session2.pei_id && session2.estatus == 1) {
                baseController.poaActual = adasession.poaActual;
                // BxASEAPI.list('drp_poa_navbar', {
                //     limit: 0,
                //     order: 'asc',
                //     orderby: 'periodo_poa',
                //     where: [
                //         {
                //             "field": "pei",
                //             "value": session2.pei_id
                //         }
                //     ]
                // }, function (rs) {
                //     if (rs.data)
                //         if (rs.data.length > 0) {
                //             if (condition) {
                //                 baseController.poaList = rs.data;
                //                 baseController.poaFirt = baseController.poaList.filter(data => {
                //                     return data.id == baseController.poaActual && data.activo == 1;
                //                 });
                //                 if (baseController.poaFirt.length > 0) {
                //                     for (var poa in baseController.poaList) {
                //                         if (baseController.poaFirt[0].id == baseController.poaList[poa].id) {
                //                             baseController.poaList[poa].selected = true;
                //                         } else {
                //                             baseController.poaList[poa].selected = false;
                //                         }
                //                     }
                //                     baseController.poaFullName = baseController.poaFirt[0].nombre + ' - ' + baseController.poaFirt[0].periodo_poa;
                //                 } else {
                //                     baseController.poaFullName = "Seleccione un POA";
                //                 }
                //                 baseController.refreshAngular();
                //             } else {
                //                 baseController.poaList = rs.data;
                //                 baseController.poaFirt = baseController.poaList.filter(data => {
                //                     return data.id == baseController.poaActual;
                //                 });
                //                 if (baseController.poaFirt.length > 0) {
                //                     for (var poa in baseController.poaList) {
                //                         if (baseController.poaFirt[0].id == baseController.poaList[poa].id) {
                //                             baseController.poaList[poa].selected = true;
                //                         } else {
                //                             baseController.poaList[poa].selected = false;
                //                         }
                //                     }
                //                     baseController.poaFullName = baseController.poaFirt[0].nombre + ' - ' + baseController.poaFirt[0].periodo_poa;
                //
                //                 } else {
                //                     baseController.poaFullName = "Seleccione un poa";
                //                 }
                //                 baseController.refreshAngular();
                //             }
                //         } else {
                //             baseController.poaFullName = "Seleccione un poa";
                //         }
                // });
                baseController.poaFirt = adasession.poaFirt;
                baseController.poaFullName = adasession.poaFullName;
            } else {
                baseController.poaFullName = "Seleccione un poa";
            }


            baseController.isLogged = true;
            baseController.isSuper = session.current().super;
            baseController.isAdmin = session.current().groupadmin;
            baseController.correoAdmin = session.current().correo;
            PEI_ID = session.current().pei_id;


            if (!baseController.isSuper) {
                if (session.current().menus)
                    baseController.currentMenu = session.current().menus();
                else
                    baseController.currentMenu = "menus";
            }

            if (session.current().isClient)
                baseController.isClient = new SESSION().current().isClient();
            else
                baseController.isClient = false;

            baseController.userID = session.current().getID();
            if (session.current().path)
                baseController.path = session.current().path();
            else
                baseController.path = CONFIG.users.path;
            baseController.fullName = session.current().fullName();
            baseController.type = session.current().type;
            GROUPS = adasession.GROUPS;
            //SWEETALERT.loading({message: MESSAGE.ic('actions.Loading') + " " + MESSAGE.ic('actions.permissions')});
            var entitiesPermission = [];
            for (var pers of CONFIG.permissions.entities) {
                entitiesPermission.push(`${pers}-${baseController.userID}`)
            }
            baseController.getPermissions = function () {
                // PERMISSIONS = adasession.PERMISSIONS;
                var userPermission = null;
                var grouppermission = [];

                for (var permissionD of adasession.permissionData) {
                    if (permissionD.id.indexOf(CONFIG.permissions.entities[0]) !== -1)
                        userPermission = permissionD;
                    else {
                        grouppermission.push(permissionD);
                    }
                }

                for (var gp in grouppermission) {
                    var entities = eval("(" + grouppermission[gp].object + ")");
                    for (var i in entities)
                        if (PERMISSIONS.mypermission.hasOwnProperty(i))
                            DSON.jalar(entities[i].allow, PERMISSIONS.mypermission[i].allow, false);
                }

                for (var gp in grouppermission) {
                    var entities = eval("(" + grouppermission[gp].object + ")");
                    for (var i in entities)
                        if (PERMISSIONS.mypermission.hasOwnProperty(i))
                            DSON.jalar(entities[i].allow, PERMISSIONS.mypermission[i].allow, true);
                }

                for (var i in PERMISSIONS.mypermission)
                    if (PERMISSIONS.mypermission[i].allow.menu !== true)
                        MENU.hideMenus(i);
            };
            setTimeout(function () {
                baseController.getPermissions();
            }, 1000);
            // if (CONFIG.autostart) {
            //
            //
            //     var session = new SESSION().current().openWizard;
            //     if (session == true) {
            //         let result = await BxASEAPI.listp('wizard', {});
            //         console.log(result.data)
            //
            //         for (var i = 0; i < result.data.length; i++) {
            //             if (result.data[i].complete == "false") {
            //                 console.log("ABRIR MODAL WIZARD");
            //                 MENUMODAL = true;
            //                 MODAL.baseRawModal("Configuración", "wizard/init", 'cog2', 'full', 'wizard');
            //                 break;
            //             }
            //         }
            //     }
            //
            //     //new SESSION().update({openWizard:false});
            //
            // }
        }

        baseController.favorites = [];
        baseController.mode = CONFIG.mode;
        baseController.features = CONFIG.features;
        baseController.SHOWLANGS = SHOWLANGS;
        baseController.currentLang = MESSAGE.current();
        baseController.changeLanguage = MESSAGE.change;
        if (STORAGE.exist('favorites')) {
            baseController.favorites = STORAGE.get('favorites');
        }
        baseController.base = function () {
            new LOAD().loadContent($scope, $http, $compile);
        };
        baseController.base();
        baseController.deleteFavorite = function (href) {
            if (STORAGE.exist('favorites')) {
                var stored = STORAGE.get('favorites');
                var newarray = [];
                stored.forEach(function (item) {
                    if (item.href !== href)
                        newarray.push(item);
                });
                STORAGE.add('favorites', newarray);
                baseController.favorites = newarray;
            }
        };
        baseController.refreshAngular = function () {
            if ($scope)
                if ($scope.$root && !$scope.$root.$$phase)
                    $scope.$digest();
        };
        baseController.favorite = function (href) {
            if (STORAGE.exist('favorites')) {
                var stored = STORAGE.get('favorites');
                var newarray = [];
                stored.forEach(function (item) {
                    if (item.href !== href)
                        newarray.push(item);
                });
                STORAGE.add('favorites', newarray);
                baseController.favorites = newarray;
            }
        };
        var permissionOptions = {
            text: (data) => {
                return "";
            },
            icon: (data) => {
                return "user-lock";
            },
            show: () => {
                return true;
            },
            characterist: (data) => {
                return '';
            },
            title: (data) => {
                return MESSAGE.ic('actions.permissions');
            },
            click: function (data) {
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                BASEAPI.list('permission', {
                    "where": [
                        {
                            "value": `${data.$scope.permissionTable || data.$scope.modelName}-${data.row.id}`
                        }
                    ]
                }, function (result) {
                    SWEETALERT.stop();
                    eval(`${data.$scope.modelName}.idPermission = '${data.$scope.permissionTable || data.$scope.modelName}-${data.row.id}';`);
                    var original = DSON.OSO(PERMISSIONS.entities);
                    if (result.data.length > 0) {
                        var objects = eval("(" + result.data[0].object + ")");
                        var exists = [];
                        var count = 0;
                        for (var key in original)
                            if (objects.hasOwnProperty(key))
                                DSON.jalar(objects[key].allow, original[key].allow)
                    }
                    eval(`${data.$scope.modelName}.permissions = original`);
                    data.$scope.modal.modalView("templates/components/permissions", {
                        width: ENUM.modal.width.full,
                        header: {
                            title: MESSAGE.i('permissions.permissions') + ` ${data.$scope.singular} de ${data.row.name}`,
                            icon: "user-lock"
                        },
                        footer: {
                            cancelButton: false
                        },
                        content: {
                            loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                            sameController: true
                        },
                    });
                });
                return false;
            }
        };
        for (var entity of CONFIG.permissions.entities) {
            if (eval(`typeof CRUD_${entity} !== 'undefined'`)) {
                eval(`CRUD_${entity}.table.allow.permission = true;`);
                eval(`CRUD_${entity}.table.options.push(permissionOptions)`);
            }
        }
        for (var entity of CONFIG.permissions.terms) {
            if (eval(`typeof CRUD_${entity.name} !== 'undefined'`)) {
                eval(`CRUD_${entity.name}.table.allow.permission = true;`);
                eval(`CRUD_${entity.name}.table.options.push(permissionOptions)`);
            }
        }

        CHILDSCOPES = [];
        REMOVELASTCHILDSCOPE = function () {
            ARRAY.last(CHILDSCOPES).$destroy();
            ARRAY.removeLast(CHILDSCOPES);
        };
        REMOVEALLCHILDSCOPE = function () {
            CHILDSCOPES.forEach((scopy) => {
                scopy.$destroy();
            });
            CHILDSCOPES = [];
        };
        GARBAGECOLECTOR = function (exclude, ignoreChangeMenu, instance) {
            if (typeof u_pacc_dept !== "undefined")
                if (u_pacc_dept)
                    if (u_pacc_dept.saveA)
                        delete u_pacc_dept.saveA;
            if (!Array.isArray(exclude))
                exclude = [exclude];
            if (ignoreChangeMenu || CHANGINGMENU) {
                if (baseController.currentModel) {
                    if (baseController.currentModel.onOptionChange) {
                        baseController.currentModel.onOptionChange();
                    }
                }
                if (MODAL.history.length === 0)
                    MODELLIST.forEach((item) => {
                        if (!DSON.oseaX(item)) {
                            if (exclude.indexOf(item) === -1) {
                                eval(`
                                    if ((typeof ${item}) !== 'undefined') {
                                        if (${item} !== null) {
                                            if (${item}.$scope !== undefined) {
                                                if (${item}.destroyForm !== false) {
                                                    ${item}.$scope.$destroy();
                                                    ${item} = null;
                                                    RELATIONS.anonymous = [];
                                                }
                                            }
                                        }
                                    }`);
                            } else {
                                eval(`
                                    if (${item}.cleanForm) {
                                        if (${item} !== null) {
                                            if (${item}.destroyForm !== false)
                                                if (${item}.form !== null)
                                                    if (${item}.form !== undefined) {
                                                        if (CRUD_${item} !== undefined) {
                                                            eval('delete ${item}.' + CRUD_${item}.table.key);
                                                            for (var field of ${item}.form.fileds) {
                                                                eval('delete ${item}.' + field);
                                                            }
                                                            ${item}.form = null;
                                                            ${item}.open = null;
                                                            ${item}.pages = null;
                                                            RELATIONS.anonymous = [];
                                                        } else {
                                                            for (var field of ${item}.form.fileds) {
                                                                eval('delete ${item}.' + field);
                                                            }
                                                            ${item}.form = null;
                                                            ${item}.open = null;
                                                            ${item}.pages = null;
                                                            RELATIONS.anonymous = [];
                                                        }
                                                    }
                                        }
                                    }`);
                            }

                        }
                    });
            }
            CHANGINGMENU = false;
        };
        RUN_A = function (conrollerName, inside, $scope, $http, $compile) {
            TRIGGER.run(inside);
            inside.MENU = MENU.current;
            inside.modelName = conrollerName;
            inside.singular = inside.modelName.split('_').length > 1 ? inside.modelName.split('_')[1] : inside.modelName.split('_')[0];

            inside.plural = pluralize(capitalize(inside.singular.replace(/_/g, " ")));
            if (MESSAGE.exist(`columns.${inside.singular}_plural`))
                inside.plural = MESSAGE.ic(`columns.${inside.singular}_plural`);

            if (MESSAGE.exist(`columns.${inside.singular}`))
                inside.singular = MESSAGE.ic(`columns.${inside.singular}`);

            inside.$scope = $scope;
            COMPILE.run(inside, $scope, $compile);
            STORAGE.run(inside);
            PERMISSIONS.run(inside);
            FORM.run(inside, $http);
            VALIDATION.run(inside);
            MODAL.run(inside, $compile);
            inside.refreshAngular = function () {
                if (inside.$scope)
                    if (inside.$scope.$root && !inside.$scope.$root.$$phase)
                        inside.$scope.$digest();
            };
            $scope.$on('$destroy', function () {
            });
            if (MODAL.history.length === 0) {
                baseController.currentModel = inside;
            }
        };
        RUN_B = function (conrollerName, inside, $scope, $http, $compile) {
            FORM.run(inside, $http);
            if (location.href.indexOf(`/home#auth/login`) === -1 && location.href.indexOf(`/home#auth/formulario`) === -1)
                CONTROL.run(inside, $compile);
            VALIDATION.run(inside);
        };
        RUNTABLE = function (inside) {
            if (eval(`${inside}`).crudConfig !== undefined)
                return;
            TRIGGER.run(eval(`${inside}`));
            if (eval("typeof CRUD_" + eval(
                `${inside}`
            ).modelName) !== "undefined")
                eval(inside + ".crudConfig = CRUD_" + eval(
                    `${inside}`
                ).modelName);
            else
                eval(`${inside}`).crudConfig = undefined;
            if (eval(`${inside}`).crudConfig)
                if (eval(`${inside}`).crudConfig.type !== 'raw')
                    CRUD.run(eval(`${inside}`), eval(`${inside}`).crudConfig);
            if (eval(`${inside}`).crudConfig)
                if (eval(`${inside}`).crudConfig.type !== 'raw')
                    TABLE.run(eval(`${inside}`));
            if (eval(`${inside}`).crudConfig) {
                if (eval(`${inside}`).crudConfig.type !== 'raw') {
                    FILTER.run(eval(`${inside}`));
                    TABLEOPTIONS.run(eval(`${inside}`));
                    TABLEEVENT.run(eval(`${inside}`));
                    TABLEFORMAT.run(eval(`${inside}`));
                    PAGINATOR.run(eval(`${inside}`));
                    SORTABLE.run(eval(`${inside}`));
                    TABLESELECTION.run(eval(`${inside}`));
                }
            }
            if (eval(`${inside}`).crudConfig)
                if (eval(`${inside}`).crudConfig.type !== 'raw')
                    EXPORT.run(eval(`${inside}`));
            if (eval(`${inside}`).crudConfig)
                if (eval(`${inside}`).crudConfig.type !== 'raw')
                    if (eval(`${inside}`).automatic === undefined || eval(`${inside}`).automatic === true)
                        eval(`${inside}`).refresh();
        };
        RUNCONTROLLER = function (conrollerName, inside, $scope, $http, $compile) {
            inside.configcompany = CONFIGCOMPANY;
            inside.alertme = function (type, message) {
                if (message)
                    SWEETALERT.show({
                        type: type || "warning",
                        message: message
                    });
            };
            if (inside.events === undefined) {
                TRIGGER.run(inside);
            }
            if (inside.cleanForm === undefined)
                inside.cleanForm = true;
            inside.MENU = MENU.current;
            inside.modelName = conrollerName;
            inside.evelin = (code) => {
                eval(code);
            };
            inside.verLosFile = async function (entidad, indi, periodo) {
                SWEETALERT.loading({message: "Cargando Evidencias"});
                let folder = "";
                if (entidad === "pei") {
                    let lamesta = await BASEAPI.firstp("indicador_pei_ano", {
                        columns: ["id"],
                        where: [
                            {field: "ano", value: periodo},
                            {field: "indicador_pei", value: indi},
                        ]
                    });
                    folder = `indicador_resultado_pei/META${(lamesta || {id: 0}).id}`;
                } else if (entidad === "poa") {
                    let lamesta = await BASEAPI.firstp("indicador_poa_periodo", {
                        columns: ["id"],
                        where: [
                            {field: "periodo", value: periodo},
                            {field: "indicador_poa", value: indi},
                        ]
                    });
                    folder = `indicador_producto_poa/META${(lamesta || {id: 0}).id}`;
                } else if (entidad === "actividad") {
                    let lamesta = await BASEAPI.firstp("indicador_actividad_periodo", {
                        columns: ["id"],
                        where: [
                            {field: "periodo", value: periodo},
                            {field: "indicador_actividad", value: indi},
                        ]
                    });
                    folder = `indicador_producto_poa_actividad/META${(lamesta || {id: 0}).id}`;
                } else if (entidad === "proceso") {
                    let lamesta = await BASEAPI.firstp("indicador_proceso_periodo", {
                        columns: ["id"],
                        where: [
                            {field: "periodo", value: periodo},
                            {field: "indicador_proceso", value: indi},
                        ]
                    });
                    folder = `indicador_producto_poa_proceso/META${(lamesta || {id: 0}).id}`;
                } else if (entidad === "generico") {
                    let lamesta = await BASEAPI.firstp("indicador_generico_periodo", {
                        columns: ["id"],
                        where: [
                            {field: "periodo", value: periodo},
                            {field: "indicador_generico", value: indi},
                        ]
                    });
                    folder = `indicador_generico_poa_generico/META${(lamesta || {id: 0}).id}`;
                }


                inside.setPermission("file.upload", false);
                if (inside.group_caracteristica !== ENUM_2.Grupos.director_general) {
                    inside.setPermission("file.remove", false);
                } else {
                    inside.setPermission("file.remove", true);
                }

                inside.showfiletypes = function () {
                    var modal = {
                        width: "modal-full",
                        header: {
                            title: "Ver tipos de archivos permitidos a ser cargados",
                            icon: "file-eye"
                        },
                        footer: {
                            cancelButton: false,
                            buttons: [
                                {
                                    color: "btn bg-<%= COLOR.info %> btn-labeled btn-xs pull-rightm",
                                    title: "<b><i class='icon-arrow-right8'></i></b>Continuar",
                                    action: function () {
                                        MODAL.close();
                                    }
                                }
                            ]
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading')
                        },
                        event: {
                            show: {
                                begin: function (data) {
                                    data.permitted_files = [];
                                    for (var i in CONFIG.fileType_general) {
                                        for (var j in CONFIG.fileType_general[i]) {
                                            if (typeof data.permitted_files[j] == "undefined") {
                                                data.permitted_files[j] = {};
                                            }
                                            data.permitted_files[j][i] = CONFIG.fileType_general[i][j];
                                        }
                                    }
                                }
                            },
                            hide: {
                                begin: function (data) {

                                }
                            }
                        }
                    };
                    inside.modal.modalView("templates/components/filetype", modal);
                }
                baseController.viewData = {
                    root: folder,
                    scope: inside.modelName,
                    maxsize: 20,
                    maxfiles: 99,
                    acceptedFiles: null,
                    columns: 4,
                };

                inside.modal.modalView("templates/components/filemanagerlite", {
                    width: 'modal-full',
                    header: {
                        title: MESSAGE.ic("mono.files"),
                        icon: "file-eye"
                    },
                    footer: {
                        cancelButton: false
                    },
                    content: {
                        loadingContentText: MESSAGE.i('actions.Loading')
                    },
                });
                SWEETALERT.stop();
            };
            inside.ddlIn = (selected, thisvalue) => {
                if (selected === '[NULL]')
                    return false;
                if (Array.isArray(selected))
                    if (!selected.length)
                        return false;
                if (!Array.isArray(selected))
                    return selected == thisvalue;
                else
                    return selected.indexOf(thisvalue + "") !== -1;
            };
            inside.depa_secundarios = baseController.secundarios;
            inside.LAN = LAN;
            inside.runws = (source, dest) => new Promise(async (resolve, reject) => {
                var field = await BASEAPI.firstp("vw_webservice", {where: [{value: source}]});
                if (field) {
                    let settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": field.URL,
                        "method": field.method,
                        "headers": eval("(" + field.headers + ")")
                    };

                    $.ajax(settings).done(function (response) {
                        inside[dest] = eval(`response${field.vari}`);
                        resolve(eval(`response${field.vari}`));
                    });
                } else {
                    inside[dest] = 0;
                    resolve(0);
                }
            });

            inside.sp_ = function (field, key, list) {
                var r = 0;
                r = list.filter(d => {
                    var row = list[key];
                    var value = eval(`(${field.replaceAll('d.', 'row.')})`);
                    if (value != ' ')
                        return eval(`${field} == value`)
                }).length;
                return r ? r : 1;
            };
            inside.sm_ = function (field, key, list) {
                var d = list[key];
                var value = eval(`(${field})`);

                if (list[key - 1]) {
                    d = list[key - 1];
                    var valueAntes = eval(`(${field})`);
                    if (value != ' ')
                        return valueAntes != value;

                }
                return true;
            };

            inside.sm_distinct = function (field, keyx, list) {
                var d = list[keyx];
                var value = eval(`(${field})`);
                var myindex = 1;//2
                for (var key = keyx; key >= 0; key--) {
                    if (list[key - 1]) {
                        d = list[key - 1];
                        var valueAntes = eval(`(${field})`);
                        if (value != ' ')
                            if (valueAntes == value) {
                                myindex++;
                            }
                    }
                }

                var indexfound = 1;
                for (var key = keyx; key >= 0; key--) {
                    if (list[key - 1]) {
                        d = list[key - 1];
                        var valueAntes = eval(`(${field})`);
                        if (value != ' ') {
                            if (valueAntes == value && indexfound != myindex) {
                                return false;
                            }
                            if (valueAntes == value) {
                                indexfound++;
                            }
                        }
                    }
                }
                return true;
            };

            inside.sp = function (field, key, list) {
                var r = 0;
                r = list.filter(d => {
                    if (list[key][field] != ' ')
                        return eval(`d.${field} == list[key][field]`)
                }).length;
                return r ? r : 1;
            };
            inside.sm = function (field, key, list) {
                if (list[key - 1])
                    if (list[key][field] != ' ')
                        return list[key - 1][field] != list[key][field];
                return true;
            };

            inside.rowspanme = function (field, value, list) {
                var r = 0;
                r = list.filter(d => {
                    if (value != ' ')
                        return eval(`d.${field} == value`)
                }).length;
                return r ? r : 1;
            };
            inside.seeme = function (field, value, key, list) {
                if (list[key - 1])
                    if (value != ' ')
                        return list[key - 1][field] != value;
                return true;
            };
            inside.rowspanmeplus = function (field, value, list) {
                var r = 0;
                r = list.filter(d => {
                    if (value != ' ')
                        return eval(`${field} == value`)
                }).length;
                return r ? r : 1;
            };
            inside.seemeplus = function (field, value, key, list) {
                if (list[key - 1])
                    if (value != ' ') {
                        var d = list[key - 1];
                        return eval(`${field} != value`)
                    }
                return true;
            };

            inside.rowspanmep = function (field, value, parent_field, parent_value, list) {
                var r = 0;
                if (parent_field && parent_value) {
                    r = list.filter(d => {
                        if (value != ' ')
                            return eval(`d.${field} == value && d.${parent_field} == parent_value`)
                    }).length;
                } else {
                    r = list.filter(d => {
                        if (value != ' ')
                            return eval(`d.${field} == value`)
                    }).length;
                }
                return r ? r : 1;
            };
            inside.seemep = function (field, value, key, parent_field, parent_value, list) {
                if (list[key - 1])
                    if (value != ' ') {
                        if (parent_field && parent_value) {
                            return list[key - 1][field] != value || list[key - 1][parent_field] != parent_value;
                        } else {
                            return list[key - 1][field] != value;
                        }
                    }
                return true;
            };
            inside.list_direccion_meta = baseController.list_direccion_meta;
            inside.list_tipo_meta = baseController.list_tipo_meta;

            if (baseController.secundarios)
                inside.depa_secundariosArray = eval("[" + baseController.secundarios.split("(").join("").split(")").join("") + "]");
            else
                inside.depa_secundariosArray = [];
            inside.colertor = function () {
                GARBAGECOLECTOR(inside.extraExclude || inside.modelName, true, inside);
            };
            GARBAGECOLECTOR(inside.extraExclude || inside.modelName, undefined, inside);
            inside.singular = inside.modelName;
            inside.plural = pluralize(capitalize(inside.singular.replace(/_/g, " ")));
            if (MESSAGE.exist(`columns.${inside.singular}_plural`))
                inside.plural = MESSAGE.ic(`columns.${inside.singular}_plural`);

            if (MESSAGE.exist(`columns.${inside.singular}`))
                inside.singular = MESSAGE.ic(`columns.${inside.singular}`);

            inside.$scope = $scope;
            COMPILE.run(inside, $scope, $compile);
            STORAGE.run(inside);
            MODAL.run(inside, $compile);
            PERMISSIONS.run(inside);
            TABLEFORMAT.run(inside);
            inside.pages = {};
            inside.refreshAngular = function () {
                if (inside.$scope)
                    if (inside.$scope.$root && !inside.$scope.$root.$$phase)
                        inside.$scope.$digest();
            };
            $scope.$on('$destroy', function () {

            });
            if (MODAL.history.length === 0)
                baseController.currentModel = inside;
        };
        baseController.allloaded = true;
        baseController.refreshAngular();
        $(document).ready(function () {
            $(document).on('click', '.dragon-menu a:not(.has-ul)', function () {
                $("body").removeClass("sidebar-mobile-main");
            });
            // $(document).on('click', 'body', function (e) {
            //     if ($(e.target).prop("tagName") !== "I") {
            //         $('.popover').popover('hide');
            //     }
            // });
            baseController.refreshAngular();

            MESSAGE.run();
            $(".remove-content").removeClass("has-ul");
            createfalse();
        });


        // setTimeout(function () {
        //     if (new SESSION().current()) {
        //         if (document.location.href.indexOf('#') === -1 && new SESSION().current().homePage) {
        //             new HTTP().redirecttag(new SESSION().current().homePage.replace('#', ''));
        //         } else if (document.location.href.indexOf('#') === -1) {
        //             new HTTP().redirecttag(CONFIG.home.replace('#', ''));
        //         }
        //     } else {
        //         new SESSION().ifLogoffRedirec();
        //     }
        //     MENU.setActive();
        // }, 500);
    };
    begin();

});

