var app = angular.module('app', ['ngSanitize', 'ngMask']);
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
                return d.disable
            });
        };
        baseController.elelemenu = undefined;
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
        baseController.myMenu();
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
                location.reload();
            }, 500);
        };
    }
    begin = async () => {
        var session = new SESSION();
        COMPILE.run(baseController, $scope, $compile);
        MODAL.run(baseController, $compile);
        if (location.href.indexOf(`/home#auth/login`) === -1)
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
                    header: {title: "Ayuda en L??nea - Syplans", icon: "info22"}
                });
            });
        };
        baseController.poaUpdate = function (poa) {
            console.log(poa.cantidad);
            SWEETALERT.confirm({
                message: "Esta seguro de realizar esta acci??n?",
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
                            monitoreo_nombre: poa.nombre_mostrar
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
            //                 MODAL.baseRawModal("Configuraci??n", "wizard/init", 'cog2', 'full', 'wizard');
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
            if (location.href.indexOf(`/home#auth/login`) === -1)
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

                inside.modal.modalView("templates/components/gallery", {
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
    };
    begin();

});

