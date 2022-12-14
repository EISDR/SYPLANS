app.controller("vw_procesados", function ($scope, $http, $compile) {
    vw_procesados = this;
    vw_procesados.destroyForm = false;
    var user = new SESSION().current();
    vw_procesados.user = user;
    //vw_procesados.fixFilters = [];
    //vw_procesados.singular = "singular";
    //vw_procesados.plural = "plural";
    vw_procesados.headertitle = "Procesos";
    //vw_procesados.destroyForm = false;
    //vw_procesados.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_procesados", vw_procesados, $scope, $http, $compile);
    RUN_B("vw_procesados", vw_procesados, $scope, $http, $compile);
    vw_procesados.colors = COLOR.secundary;
    vw_procesados.list = [];
    var animation1 = new ANIMATION();

    vw_procesados.getMapaProceso = async function (callback) {
        var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value:  vw_procesados.user.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  vw_procesados.user.institucion_id ? "=" : "is",
                    "value":  vw_procesados.user.institucion_id ?  vw_procesados.user.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (mapaData) {
            vw_procesados.mapa_id = mapaData.id;
        }
        if (callback)
            callback();
    }
    vw_procesados.getMapaProceso();
    vw_procesados.vw_refresh = async function () {
        animation1.loading(`.subcontent`, "", ``, '30');

        var aymywhere = [
            {
                field: "compania",
                value: user.compania_id
            },
            {
                field: "mapa_proceso",
                value: vw_procesados.mapa_id ? vw_procesados.mapa_id : -1
            }
        ];
        if (user.institucion_id) {
            aymywhere.push({
                field: "institucion",
                value: user.institucion_id
            })
        }

        vw_procesados.list = await BASEAPI.listp('vw_procesados', {
            limit: 0,
            orderby: "$ categoria_id,proceso_id,fecha",
            order: "asc",
            where: aymywhere
        });
        vw_procesados.list = vw_procesados.list.data;
        vw_procesados.ordered = await vw_procesados.categoria();
        animation1.stoploading(`.subcontent`);
        vw_procesados.refreshAngular();
    };

    vw_procesados.mypathfile = '/documentos_asociados/documento_asociadofile/';
    vw_procesados.getfile = (id) => new Promise(async (resolve, reject) => {
        BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: vw_procesados.mypathfile + id}, function (result) {
            resolve(result.data.count > 0);
        }, $('#invisible'));
    });

    vw_procesados.verFile = function (documento) {
        vw_procesados.setPermission("file.upload", false);
        vw_procesados.setPermission("file.remove", false);
        if (typeof vw_procesados !== 'null') {
            if (vw_procesados) {

                var root = DSON.template(vw_procesados.mypathfile + documento.id, {});
                vw_procesados.showfiletypes = function () {
                    var modal = {
                        width: "modal-full",
                        header: {
                            title: `Vista previa del Documento ${documento.codigo} - ${documento.nombre}`,
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
                                    vw_procesados.setPermission("file.upload", false);
                                    vw_procesados.setPermission("file.remove", false);
                                }
                            },
                            hide: {
                                begin: function (data) {

                                }
                            }
                        }
                    };
                    vw_procesados.modal.modalView("templates/components/filetype", modal);
                };
                baseController.viewData = {
                    root: root,
                    scope: 'vw_procesados',
                    maxsize: 20,
                    maxfiles: 1,
                    acceptedFiles: null,
                    columns: 1,
                    remove: false
                };

                vw_procesados.modal.modalView("templates/components/gallery", {
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

            }
        }
    };

    vw_procesados.categoria = async function () {
        let categorias = [];
        vw_procesados.list.forEach(d => {
            if (!categorias.filter(e => {
                return e.id === d.categoria_id
            }).length)
                categorias.push({id: d.categoria_id, nombre: d.categoria, desc: d.categoria_desc});
        });
        categorias.forEach(c => {
            c.procesos = [];
            vw_procesados.list.forEach(d => {
                if (d.categoria_id !== c.id)
                    return;
                if (!c.procesos.filter(p => {
                    return p.id === d.proceso_id
                }).length)
                    c.procesos.push({
                        id: d.proceso_id,
                        nombre: d.proceso,
                        desc: d.proceso_desc,
                        objetivo: d.objetivo,
                        alcance: d.alcance
                    });
            });
        });
        for (const c of categorias) {
            for (const p of c.procesos) {
                p.documentos = [];
                p.elementos = [];
                for (const d of vw_procesados.list) {
                    if (d.proceso_id !== p.id)
                        continue;

                    if (!p.documentos.filter(f => {
                        return f.id === d.documento_id
                    }).length)
                        if (d.documento_id) {
                            let tienefile = await vw_procesados.getfile(d.documento_id);
                            p.documentos.push({
                                id: d.documento_id,
                                nombre: d.documento,
                                codigo: d.codigo,
                                fecha: d.fecha,
                                usuario: d.usuario,
                                tipo: d.tipo_documento,
                                isfile: tienefile
                            });
                        }

                    if (!p.elementos.filter(f => {
                        return f.id === d.elemento_id
                    }).length)
                        if (d.elemento_id)
                            p.elementos.push({
                                id: d.elemento_id,
                                nombre: d.elemento,
                                direccion_meta: d.direccion_meta,
                                acumulado: d.acumulado,
                                alcanzado: d.alcanzado,
                                alcanzado2: d.alcanzado2,
                                tipo_meta: d.tipo_meta,
                                month_inicio: d.month_inicio
                            });
                }
            }
        }
        return categorias;
    };
    vw_procesados.verIndicador = (indicador) => {
        let data = {};
        data.row = indicador;
        vw_dashboard_productosgrid_proceso = {};
        vw_dashboard_productosgrid_proceso.selectedPEI = data.row.id;
        baseController.modal.modalView("indicador_producto_poa_proceso", {
            header: {
                title: data.row.nombre,
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: 'indicador_producto_poa_proceso'
            },
        });
    };
    vw_procesados.indicador = (indicador) => {
        let data = {};
        data.row = indicador;
        let row = indicador;
        if (!data.row.alcanzado || !data.row.acumulado) {
            return {
                icon: "icon-blocked",
                color: "text-info",
                tooltip: "-Clic para ver el detalle-\nEste indicador del proceso no se le han cargado evidencias.",
                print: "Sin evidencias."
            };
        }
        var icon = "icon-blocked";
        var color = "text-";
        var vari = data.row.alcanzado - data.row.acumulado;
        var tooltip = "-Clic para ver el detalle-\n";
        var print = "";
        var colorprint = "";
        let varimoney = vari;
        if (vari < 0)
            vari = `(${vari})`;

        if (vari === "null")
            vari = 0;
        var lindo = {
            alcanzado: "",
            acumulado: "",
            vari: ""
        };
        if (row.acumulado) {
            switch (row.tipo_meta) {
                case 2:
                    lindo.acumulado = "??ndice: " + (row.acumulado > 1 ? 1 : 0);
                    break;
                case 1:
                    lindo.acumulado = (row.acumulado || 0) + '%';
                    break;
                case 4:
                    lindo.acumulado = LAN.money(row.acumulado).format(false);
                    break;
                case 5:
                    lindo.acumulado = '$' + LAN.money(row.acumulado).format(false);
                    break;

                default : {
                    lindo.acumulado = LAN.money(row.acumulado).format(false);
                }
            }
        }
        if (row.alcanzado) {
            switch (row.tipo_meta) {
                case 2:
                    lindo.alcanzado = "??ndice: " + (row.alcanzado > 1 ? 1 : 0);
                    break;
                case 1:
                    lindo.alcanzado = (row.alcanzado || 0) + '%';
                    break;
                case 4:
                    lindo.alcanzado = LAN.money(row.alcanzado).format(false);
                    break;
                case 5:
                    lindo.alcanzado = '$' + LAN.money(row.alcanzado).format(false);
                    break;

                default : {
                    lindo.alcanzado = LAN.money(row.alcanzado).format(false);
                }
            }
        }
        switch (data.row.tipo_meta) {
            case 2:
                lindo.vari = LAN.money(varimoney || vari).format(false)
                break;
            case 1:
                lindo.vari = LAN.money(varimoney || vari).format(false);
                break;
            case 4:
                lindo.vari = LAN.money(vari).format(false);
                break;
            case 5:
                lindo.vari = "$" + LAN.money(varimoney).format(false);
                break;
            default: {
                lindo.vari = LAN.money(varimoney || vari).format(false);
            }
        }
        if (data.row.direccion_meta == 1) {
            icon = "icon-arrow-up7";
            tooltip += `Proyectado: ${lindo.acumulado}\nAlcanzado: ${lindo.alcanzado}\nVarianza: ${lindo.vari}\nDirecci??n: Subir`;
            print += `<b>Proyectado:</b> ${lindo.acumulado}, <b>Alcanzado:</b> ${lindo.alcanzado}, <b>Varianza:</b> ${lindo.vari}, <b>Direcci??n:</b> Subir`;
            if ((vari || 0) == 0) {
                color += colorprint = "gray";

            } else if (vari > 0) {
                color += colorprint = "green";
            } else {
                color += colorprint = "red";
            }
        } else if (data.row.direccion_meta == 2) {
            icon = "icon-arrow-down7";
            tooltip += `Proyectado: ${lindo.acumulado}\nAlcanzado: ${lindo.alcanzado}\nVarianza: ${lindo.vari}\nDirecci??n: Bajar`;
            print += `<b>Proyectado:</b> ${lindo.acumulado}, <b>Alcanzado:</b> ${lindo.alcanzado}, <b>Varianza:</b> ${lindo.vari}, <b>Direcci??n:</b> Bajar`;
            if ((vari || 0) == 0) {
                color += colorprint = "gray";
            }
            if (vari < 0) {
                color += colorprint = "green";
            } else {
                color += colorprint = "red";
            }
        } else if (data.row.direccion_meta == 3) {
            tooltip += `Proyectado: ${lindo.acumulado}\nAlcanzado: ${lindo.alcanzado}\nVarianza: ${lindo.vari}\nDirecci??n: Permanecer`;
            print += `<b>Proyectado:</b> ${lindo.acumulado}, <b>Alcanzado:</b> ${lindo.alcanzado}, <b>Varianza:</b> ${lindo.vari}, <b>Direcci??n:</b> Permanecer`;
            icon = "icon-minus3";
            if ((vari || 0) == 0) {
                color += colorprint = "green";
            } else {
                color += colorprint = "red";
            }
        } else {
            color += colorprint = "red";
        }


        return {icon: icon, color: color, tooltip: tooltip, print: print, colorprint: colorprint};

    };
    vw_procesados.openfile = () => {
        FILEMANAGER.OPEN(['documentos_asociados', '4'], {});
    };
    vw_procesados.exportXLS = function () {
        var url = $("#vw_procesadosTable").excelexportjs({
            containerid: "vw_procesadosTable",
            datatype: 'table',
            worksheetName: `Mapa de Procesos - ${vw_procesados.user.compania} ${vw_procesados.user.sigla ? ('(' + vw_procesados.user.sigla + ')') : ''} Y SUS DOCUMENTOS`,
            returnUri: true
        });
        DOWNLOAD.excel("Alineaci??n ODS con Ejes estrat??gicos", url);
    };
    vw_procesados.exportPDF = function () {
        SWEETALERT.loading({message: "Generando Reporte" + "..."});
        let allcss = [
            "../assets/css/icons/icomoon/styles.css?node=" + new Date().getTime(),
            "../assets/css/bootstrap.min.css?node=" + new Date().getTime(),
            "../assets/css/core.min.css?node=" + new Date().getTime(),
            "../assets/css/components.css?node=" + new Date().getTime(),
            "../assets/css/extras/animate.min.css?node=" + new Date().getTime(),
            "../assets/css/sweetalert2.min.css?node=" + new Date().getTime(),
            "../assets/js/plugins/date/jquery.datetimepicker.min.css?node=" + new Date().getTime(),
            "../assets/css/colors.css?node=" + new Date().getTime(),
            "../files/configuration/themes/extra.css?node=" + new Date().getTime(),
            "../files/configuration/themes/primary.css?node=" + new Date().getTime(),
            "../files/configuration/themes/secundary.css?node=" + new Date().getTime(),
        ];
        CSSS.forEach(d => {
            if (d.indexOf('stylePrint.css') === -1)
                allcss.push("../styles/" + d + "?node=" + new Date().getTime())
        });
        $("#vw_procesadosExport").printThis({
            importCSS: false,                // import parent page css
            loadCSS: allcss,      // path to additional css file - use an array [] for multiple
            printDelay: 1000,
        });
        setTimeout(function () {
            SWEETALERT.stop();
        }, 1000);
    };
    vw_procesados.openmodalField = function (value) {

        vw_procesados.tipeExport = value.toString();

        vw_procesados.modal.modalView("vw_procesados/export", {

            width: 'modal-full',
            header: {
                title: `Mapa de Procesos - ${vw_procesados.user.compania} ${vw_procesados.user.sigla ? ('(' + vw_procesados.user.sigla + ')') : ''} Y SUS DOCUMENTOS`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    }
    setTimeout(function () {
        vw_procesados.vw_refresh();
    }, 500);
});
