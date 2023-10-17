app.controller("vw_procesados", function ($scope, $http, $compile) {
    ready = async () => {
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
                        value: vw_procesados.user.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator": vw_procesados.user.institucion_id ? "=" : "is",
                        "value": vw_procesados.user.institucion_id ? vw_procesados.user.institucion_id : "$null"
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
        await vw_procesados.getMapaProceso();
        vw_procesados.vw_refresh = async function () {
            SWEETALERT.loading({message: "Estructurando Reporte Completo"});

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
            SWEETALERT.stop();
            vw_procesados.refreshAngular();
            setTimeout(async () => {

                for (const categoria of vw_procesados.ordered) {
                    for (const proceso of categoria.procesos) {
                        for (const docunento of proceso.documentos) {
                            await vw_procesados.getfile(docunento.id);
                        }
                    }
                }
            }, 1000);

        };

        vw_procesados.mypathfile = '/documentos_asociados/documento_asociadofile/';
        vw_procesados.getfile = (id) => new Promise(async (resolve, reject) => {
            BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: vw_procesados.mypathfile + id}, function (result) {
                if (result.data.count > 0)
                    $('#documento_' + id).show();
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
                    if (d.categoria_id !== c.id || d.proceso_general === 1 || d.estatus_proceso == 4)
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
                            if (d.documento_id && !d.documento_general && d.estatus_documento != 4) {
                                p.documentos.push({
                                    id: d.documento_id,
                                    nombre: d.documento,
                                    codigo: d.codigo,
                                    fecha: d.fecha,
                                    usuario: d.usuario,
                                    tipo: d.tipo_documento,
                                    isfile: true
                                });
                            }

                        if (!p.elementos.filter(f => {
                            return f.id === d.elemento_id
                        }).length)
                            if (d.elemento_id) {
                                let cumplidor = await aacontroldemandofalso.cumplimiento(
                                    "vw_report_indicadores_generico",
                                    baseController.session,
                                    "indicador_generico",
                                    d.elemento_id);
                                let colored = "";
                                let ponderacion = "";
                                let clase = "";
                                if (cumplidor)
                                    if (cumplidor.ponderacion)
                                        if (cumplidor.ponderacion.titulo) {
                                            ponderacion = cumplidor.ponderacion.titulo;
                                            clase = `text_${cumplidor.ponderacion.id}`;
                                        }
                                let indicador = {
                                    id: d.elemento_id,
                                    nombre: d.elemento,
                                    cumplidor: cumplidor
                                };
                                let texto = vw_procesados.indicador(indicador);
                                colored = `<span class="${clase} cumplidor" title="${texto.tooltip}${ponderacion}">${cumplidor?.cumplimiento || 0}%</span>`;
                                indicador.colored = colored;
                                p.elementos.push(indicador);
                            }
                    }
                }
            }
            return categorias;
        };
        vw_procesados.verIndicador = async (indicador) => {
            if (indicador.cumplidor)
                if (indicador.cumplidor.ficha) {
                    vw_procesados.FICHA = indicador.cumplidor.ficha.FICHA;
                    vw_procesados.modal.modalView("aacontroldemando/fichaindicador", {
                        header: {
                            title: indicador.nombre,
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: `Cargando Vista Previa del Indicador...`
                        },
                    });
                }
            // let data = {};
            // data.row = indicador;
            // vw_dashboard_productosgrid_proceso = {};
            // vw_dashboard_productosgrid_proceso.selectedPEI = data.row.id;
            // baseController.modal.modalView("indicador_producto_poa_proceso", {
            //     header: {
            //         title: data.row.nombre,
            //     },
            //     footer: {
            //         cancelButton: true
            //     },
            //     content: {
            //         loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
            //         sameController: 'indicador_producto_poa_proceso'
            //     },
            // });
        };
        vw_procesados.indicador = (indicador) => {


            let data = {};
            data.row = indicador;
            let cumplimiento = indicador.cumplidor?.cumplimiento || 0;
            let sumas = (indicador.cumplidor?.general || [])[0]?.sumas;
            let dirdir = (indicador.cumplidor?.general || [])[0]?.direccionMeta[0] || {nombre: "Ninguna"};

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
                        lindo.acumulado = "Índice: " + (row.acumulado > 1 ? 1 : 0);
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
                        lindo.alcanzado = "Índice: " + (row.alcanzado > 1 ? 1 : 0);
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
                tooltip += `Proyectado: ${sumas.formatedSumMeta}\nAlcanzado: ${sumas.formatedSumAlcanzada}\nTendencia: ${dirdir.nombre}\nCumplimiento: ${cumplimiento}%`;
                print += `<b>Proyectado:</b> ${lindo.acumulado}, <b>Alcanzado:</b> ${lindo.alcanzado}, <b>Varianza:</b> ${lindo.vari}, <b>Dirección:</b> Subir`;
                if ((vari || 0) == 0) {
                    color += colorprint = "gray";

                } else if (vari > 0) {
                    color += colorprint = "green";
                } else {
                    color += colorprint = "red";
                }
            } else if (data.row.direccion_meta == 2) {
                icon = "icon-arrow-down7";
                tooltip += `Proyectado: ${sumas.formatedSumMeta}\nAlcanzado: ${sumas.formatedSumAlcanzada}\nTendencia: ${dirdir.nombre}\nCumplimiento: ${cumplimiento}%`;
                print += `<b>Proyectado:</b> ${lindo.acumulado}, <b>Alcanzado:</b> ${lindo.alcanzado}, <b>Varianza:</b> ${lindo.vari}, <b>Dirección:</b> Bajar`;
                if ((vari || 0) == 0) {
                    color += colorprint = "gray";
                }
                if (vari < 0) {
                    color += colorprint = "green";
                } else {
                    color += colorprint = "red";
                }
            } else if (data.row.direccion_meta == 3) {
                tooltip += `Proyectado: ${sumas.formatedSumMeta}\nAlcanzado: ${sumas.formatedSumAlcanzada}\nTendencia: ${dirdir.nombre}\nCumplimiento: ${cumplimiento}%`;
                print += `<b>Proyectado:</b> ${lindo.acumulado}, <b>Alcanzado:</b> ${lindo.alcanzado}, <b>Varianza:</b> ${lindo.vari}, <b>Dirección:</b> Permanecer`;
                icon = "icon-minus3";
                if ((vari || 0) == 0) {
                    color += colorprint = "green";
                } else {
                    color += colorprint = "red";
                }
            } else {
                color += colorprint = "red";
            }


            return {icon: icon, color: color, tooltip: tooltip + "\n", print: print, colorprint: colorprint};

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
            DOWNLOAD.excel("Alineación ODS con Ejes estratégicos", url);
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
        }, 10);
    }
    ready();
});
