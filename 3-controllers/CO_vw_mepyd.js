app.controller("vw_mepyd", function ($scope, $http, $compile) {
    vw_mepyd = this;
    //vw_mepyd.fixFilters = [];
    //vw_mepyd.singular = "singular";
    //vw_mepyd.plural = "plural";
    //vw_mepyd.headertitle = "MEPyD";
    vw_mepyd.destroyForm = false;
    //vw_mepyd.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_mepyd", vw_mepyd, $scope, $http, $compile);
    RUN_B("vw_mepyd", vw_mepyd, $scope, $http, $compile);
    //Filters
    vw_mepyd.afterInstitucion = function () {
        vw_mepyd.getrefresh();
    };
    vw_mepyd.formatdate = (fecha) => {
        return moment(new Date(fecha)).format("DD/MM/YYYY hh:mm a");
    };
    vw_mepyd.afterDepartamento = function () {
        vw_mepyd.getrefresh();
    };
    vw_mepyd.afterPoa = function () {
        vw_mepyd.getrefresh();
    };
    //Cols functions
    vw_mepyd.cols = [
        {col: 1, span: 6}, {col: 2, span: 4}, {col: 3, span: 3}, {col: 4, span: 1}, {
            col: 5,
            span: 1
        }, {col: 6, span: 2}, {col: 7, span: 0}, {col: 8, span: 1}, {col: 9, span: 1}, {col: 10, span: 1}, {
            col: 11,
            span: 1
        }];
    vw_mepyd.fullcolspan = function () {
        return vw_mepyd.cols.map(d => d.span).reduce((a, b) => {
            return a + b
        });
    };
    //Group By EIS Mode
    vw_mepyd.heightx = function (id) {
        if (document.getElementById(id))
            return document.getElementById(id).clientHeight;
        return 200;
    };
    vw_mepyd.format = function (valor, tipo_meta) {

        switch (tipo_meta) {
            case "1": {
                return valor === null ? '' : (valor + '%');
                break;
            }
            case "4": {
                return valor === null ? '' : (LAN.money(valor).format(false));
                break;
            }
            case "5": {
                return valor === null ? '' : `${LAN.money(valor).format(true)}`;
                break;
            }
            default : {
                return valor === null ? '' : (valor || 0);
            }
        }

    };
    vw_mepyd.distinct = function (list, fields) {
        var distinct = [];
        var collections = [];
        var key = fields.map(d => {
            return `item.${d}`
        }).join("+'x'+");
        for (var item of list) {
            if (!distinct[eval(key)]) {
                var push = fields.map(d => {
                    return `${d}: item.${d}`
                }).join(",");
                push = eval(`({${push}})`);
                var condition = fields.map(d => {
                    return `e.${d} === item.${d}`
                }).join(" && ");
                push.records = `list.filter(e => { return (${condition}) });`;
                push.records = eval(push.records);

                collections.push(push);
                distinct[eval(key)] = true;
            }
        }
        return collections;
    };
    //General Refresh
    vw_mepyd.getrefresh = async function () {
        var user = new SESSION().current();
        new ANIMATION().loading(`.subcontent`, "", ``, '200', undefined, true);
        vw_mepyd.lastreport = await BASEAPI.listp('mepydfiles', {orderby: "$ id", order: "desc"});
        if (vw_mepyd.lastreport.data.length > 0) {
            vw_mepyd.lastreportd = vw_mepyd.lastreport.data[0];
            vw_mepyd.lastreport = vw_mepyd.lastreport.data[0].id;
        } else {
            vw_mepyd.lastreport = 0;
            vw_mepyd.lastreportd = 0;
        }
        var aymywhere = [{
            field: vw_mepyd.institucion !== '[NULL]' ? "compania" : "compania_base",
            value: vw_mepyd.institucion !== '[NULL]' ? vw_mepyd.institucion : user.compania_id
        }, {
            field: 'report',
            value: vw_mepyd.lastreport
        }];
        // if (vw_mepyd.poadd !== '[NULL]') {
        //     aymywhere.push({
        //         field: 'poa',
        //         value: vw_mepyd.poadd,
        //     })
        // }
        // if (vw_mepyd.departamento !== '[NULL]') {
        //     aymywhere.push({
        //         field: 'departamento',
        //         value: vw_mepyd.departamento,
        //     })
        // }
        vw_mepyd.report = await BASEAPI.listp('mepydreports', {
            limit: 0,
            orderby: "$ compania_base,compania,eje,objetivo,politica,impacto,denominacion_pnpsp,indicador_denominacion_pnpsp,resultado,indicador_pei,end_edt,oge_edt,oes_edt,la_edt,producto_id",
            order: "asc",
            where: aymywhere
        });


        vw_mepyd.report = vw_mepyd.report.data;
        if (vw_mepyd.report)
            if (vw_mepyd.report.length > 0) {
                vw_mepyd.reportDistinct = vw_mepyd.distinct(vw_mepyd.report, ["entidad", "eje_estrategico", "objetivo_estrategico"]);
                for (var i of vw_mepyd.reportDistinct) {
                    for (var d of i.records) {
                        d.indicador_poa_fuente = [...new Set(d.indicador_poa_fuente.split(';'))].join('/');
                        d.medio_verificacion = [...new Set(d.medio_verificacion.split(';'))].join('/');
                        d.indicador_departamentos = [...new Set(d.indicador_departamentos.split(';'))].join('/');
                        d.indicador_poa = d.indicador_poa.split(';');

                        d.valor = d.valor.split(';');
                        for (var f in d.valor) {
                            var tipometa = d.indicador_poa[f].split("=")[1];
                            d.valor[f] = vw_mepyd.format(d.valor[f], tipometa) + ";" + d.no_producto + ' ' + d.indicador_poa[f];
                        }
                    }
                }
                vw_mepyd.anos = vw_mepyd.report.map(d => {
                    d.peivalues = eval(d.indicador_pei_x);
                    if (d.producto_indicador_edt) {
                        d.producto_edt = d.producto_indicador_edt.substr(0, d.producto_indicador_edt.length - 2);
                        d.producto_edt += " " + d.producto;

                        d.indicador_poa += d.producto_indicador_edt + " " + d.indicador_poa;
                    }
                    return Object.keys(eval(d.indicador_pei_x))
                }).reduce((a, b) => {
                    return b
                });
                var periododesde = vw_mepyd.reportDistinct[0].records[0].periodo_desde;
                var periodohasta = vw_mepyd.reportDistinct[0].records[0].periodo_hasta;
                vw_mepyd.anos = [];
                vw_mepyd.doubleanos = [];
                for (var pe = periododesde; pe <= periodohasta; pe++) {
                    vw_mepyd.anos.push(pe);
                }
                for (var pe = periododesde; pe <= periodohasta; pe++) {
                    vw_mepyd.doubleanos.push(pe);
                    vw_mepyd.doubleanos.push("f" + pe);
                }

                vw_mepyd.cols[1].span = 4 + vw_mepyd.anos.length;
                vw_mepyd.cols[6].span = vw_mepyd.doubleanos.length;
                vw_mepyd.cols[5].span = 2 + vw_mepyd.anos.length;
                vw_mepyd.refreshAngular();
            } else {
                vw_mepyd.reportDistinct = [];
                vw_mepyd.refreshAngular();
            }
        new ANIMATION().stoploading(`.subcontent`, "", ``, '200', undefined, true);
        $('#minusubcontent').floatingScrollbar();
    };
    //Trigger
    setTimeout(function () {
        new ANIMATION().loading(`.subcontent`, "", ``, '200', undefined, true);
        vw_mepyd.getrefresh();
    }, 1000);
    //Exports
    vw_mepyd.exportFields = [
        {
            label: "Institución",
            field: "entidad"
        },
        {
            label: "Eje Estratégico",
            field: "eje_estrategico"
        },
        {
            label: "Objetivo Estratégico",
            field: "objetivo_estrategico"
        },
        {
            label: "Política de Gobierno",
            field: "politica_gobierno"
        },
        {
            label: "Impacto de la Política",
            field: "impacto_politica"
        },
        {
            label: "Denominación Resultados PNPSP",
            field: "denominacion_pnpsp"
        },
        {
            label: "Indicador - Denominación Resultados PNPSP",
            field: "indicador_denominacion_pnpsp"
        },
        {
            label: "Año Línea Base",
            field: "indicador_denominacion_pnpsp_base"
        },
        {
            label: "Valor Línea Base",
            field: "indicador_denominacion_pnpsp_meta"
        },
        {
            label: "Resultado Esperado",
            field: "resultado"
        },
        {
            label: "Indicador PEI",
            field: "indicador_pei"
        },
        {
            label: "Año Línea Base",
            field: "indicador_pei_base"
        },
        {
            label: "Valor Línea Base",
            field: "indicador_pei_meta"
        },
        {
            label: "Objetivo Genral END",
            field: "objetivo_general_end"
        },
        {
            label: "Objetivo Específico END",
            field: "objetivo_especifico_end"
        },
        {
            label: "Línea de Acción END",
            field: "linea_accion_end"
        },
        {
            label: "Meta Objetivo de Desarrollo Sostenible directamente alineado",
            field: "mods"
        },
        {
            label: "Meta compromisos nacionales e internacionales relacionados",
            field: "compromiso"
        }
    ];
    vw_mepyd.xlsPrint = function (row, column) {
        if (column.format) {
            return column.format(row, column.field);
        } else {
            return row[column.field];
        }
    };
    vw_mepyd.exportXLS = function () {
        var url = $("#report").excelexportjs({
            containerid: "report",
            datatype: 'table',
            worksheetName: `Reporte`,
            returnUri: true
        });
        DOWNLOAD.excel("Reporte MEPyD", url);
    };
    vw_mepyd.exportPDF = function () {

        // printJS({
        //     printable: 'PDF',
        //     type: 'html',
        //     scanStyles: false,
        //     maxWidth: 3000,
        //     style: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),
        // });
        $("#PDF").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    vw_mepyd.openmodalField = function (value) {

        vw_mepyd.tipeExport = 'PDF';

        vw_mepyd.modal.modalView("vw_mepyd/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa MEPyD`,
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
    vw_mepyd.generarReporte = async (value) => {
        let user = new SESSION().current();
        let ver = await BASEAPI.listp('mepydfiles', {orderby: "$ id", order: "desc"});
        if (ver.data.length > 0) {
            if (ver.data[0].estado === "Pendiente") {
                SWEETALERT.show({
                    type: "warning",
                    message: `${ver.data[0].nombre === user.fullName() ? 'Usted' : user.fullName()} ya ha realizado una solicitud, debe esperar a que se complete la misma para realizar una nueva solicitud`,
                });
                return;
            } else {

                SWEETALERT.loading({message: "Creando la solicitud del reporte MEPYD"});
                await BASEAPI.insertp('mepydfiles',
                    {
                        "nombre": user.fullName(),
                        "fecha": "$now()",
                        "departamento": undefined,
                        "poa": undefined,
                        "estado": 'Pendiente',
                        "correo": user.correo,
                        "compania": user.compania_id,
                        "usuario": user.usuario_id
                    });
                SWEETALERT.stop();
                SWEETALERT.show({
                    message: "El reporte se estará generando en un proceso de cola, una vez finalice el proceso de generación de reporte se le estará enviando un correo.",
                });
            }
        } else {
            SWEETALERT.loading({message: "Creando la solicitud del reporte MEPYD"});
            await BASEAPI.insertp('mepydfiles',
                {
                    "nombre": user.fullName(),
                    "fecha": "$now()",
                    "departamento": undefined,
                    "poa": undefined,
                    "estado": 'Pendiente',
                    "correo": user.correo,
                    "compania": user.compania_id,
                });
            SWEETALERT.stop();
            SWEETALERT.show({
                message: "El reporte se estará generando en un proceso de cola, una vez finalice el proceso de generación de reporte se le estará enviando un correo.",
            });

        }
        vw_mepyd.getrefresh();
    }
});
