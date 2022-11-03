app.controller("vw_sectorial", function ($scope, $http, $compile) {
    vw_sectorial = this;
    //vw_sectorial.fixFilters = [];
    //vw_sectorial.singular = "singular";
    //vw_sectorial.plural = "plural";
    vw_sectorial.headertitle = "PLAN ESTRATÉGICO SECTORIAL";
    vw_sectorial.destroyForm = false;
    vw_sectorial.periodopoa = new SESSION().current().cantidad;
    vw_sectorial.monitoreo_nombre = new SESSION().current().monitoreo_nombre;
    vw_sectorial.periodopoas = [];
    for (var i = 1; i <= vw_sectorial.periodopoa; i++) {
        vw_sectorial.periodopoas.push(i);
    }
    //vw_sectorial.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_sectorial", vw_sectorial, $scope, $http, $compile);
    RUN_B("vw_sectorial", vw_sectorial, $scope, $http, $compile);
    //Filters
    vw_sectorial.afterInstitucion = function () {
        vw_sectorial.getrefresh();
    };
    vw_sectorial.afterDepartamento = function () {
        vw_sectorial.getrefresh();
    };
    vw_sectorial.afterPoa = function () {
        vw_sectorial.getrefresh();
    };
    //Cols functions
    vw_sectorial.cols = [
        {col: 1, span: 6}, {col: 2, span: 10}, {col: 3, span: 3}, {col: 4, span: 4}, {
            col: 5,
            span: 1
        }, {col: 6, span: 1}];
    vw_sectorial.fullcolspan = function () {
        return vw_sectorial.cols.map(d => d.span).reduce((a, b) => {
            return a + b
        });
    };
    //Group By EIS Mode
    vw_sectorial.heightx = function (id) {
        if (document.getElementById(id))
            return document.getElementById(id).clientHeight;
        return 200;
    };
    vw_sectorial.format = function (valor, tipo_meta) {

        switch (tipo_meta) {
            case "1": {
                return valor === null || valor === undefined ? '' : (valor + '%');
                break;
            }
            case "4": {
                return valor === null || valor === undefined ? '' : (LAN.money(valor).format(false));
                break;
            }
            case "5": {
                return valor === null || valor === undefined ? '' : `$${LAN.money(valor).format(false)}`;
                break;
            }
            default : {
                return valor === null || valor === undefined ? '' : (valor || 0);
            }
        }

    };
    vw_sectorial.distinct = function (list, fields) {
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
    vw_sectorial.reduce = function (list, field, back) {

        var elements = [];
        elements = list.map(d => {
            return Object.keys(eval(d[field]))
        });
        var subelements = [];
        for (var element of elements) {
            for (var item of element) {
                if (subelements.indexOf(item) === -1)
                    if ((back || []).indexOf(item) === -1)
                        subelements.push(item);
            }
        }
        return subelements;
    };
    vw_sectorial.getrefresh = async function () {
        var user = new SESSION().current();

        vw_sectorial.cols[1].span = 10 + vw_sectorial.periodopoa;


        new ANIMATION().loading(`.subcontent`, "", ``, '200', undefined, true);
        var aymywhere = [{
            field: "sector",
            value: new SESSION().current().sector_id
        }];
        vw_sectorial.report = await BASEAPI.listp('vw_sectorial', {
            limit: 0,
            orderby: "$ eje,eje_estrategico,politica,impacto_politica,denominacion_pnpsp,indicador_denominacion_pnpsp,resultado,programa,indicador,responsable,involucrado,supuestos,objetivo_general_end,objetivo_especifico_end,linea_accion_end,resultado,indicador_pei",
            order: "asc",
            where: aymywhere
        });

        vw_sectorial.report = vw_sectorial.report.data;
        if (vw_sectorial.report)
            if (vw_sectorial.report.length > 0) {
                vw_sectorial.finanzas = vw_sectorial.reduce(vw_sectorial.report, "finanzas", ["x"]).sort();
                vw_sectorial.cols[1].span += vw_sectorial.finanzas.length;


                var periododesde = vw_sectorial.report[0].periodo_desde;
                var periodohasta = vw_sectorial.report[0].periodo_hasta;
                vw_sectorial.peianos = [];
                for (var pe = periododesde; pe <= periodohasta; pe++)
                    vw_sectorial.peianos.push(pe);
                vw_sectorial.cols[3].span = 4 + vw_sectorial.peianos.length;
                vw_sectorial.reportDistinct = vw_sectorial.distinct(vw_sectorial.report, ["entidad", "eje_estrategico", "objetivo_estrategico"]);
                for (var i of vw_sectorial.reportDistinct) {
                    for (var d of i.records) {
                        d.involucrado = [...new Set(d.involucrado.split(';'))].join(', ');
                        d.mods = [...new Set(d.mods.split(';'))].join(', ');
                        d.compromisos = [...new Set(d.compromisos.split(';'))].join(', ');
                        d.indicador_x = eval(d.indicador_x);
                        d.indicador_pei_x = eval(d.indicador_pei_x);
                        d.finanzas = eval(d.finanzas);
                    }
                }
                // vw_sectorial.anos = [];
                // vw_sectorial.doubleanos = [];
                //
                //
                // vw_sectorial.cols[1].span = 4 + vw_sectorial.anos.length;
                // vw_sectorial.cols[6].span = vw_sectorial.doubleanos.length;
                // vw_sectorial.cols[5].span = 2 + vw_sectorial.anos.length;
                vw_sectorial.refreshAngular();
            } else {
                vw_sectorial.reportDistinct = [];
                vw_sectorial.refreshAngular();
            }
        new ANIMATION().stoploading(`.subcontent`, "", ``, '200', undefined, true);
        $('#minusubcontent').floatingScrollbar();
    };
    //Trigger
    setTimeout(function () {
        new ANIMATION().loading(`.subcontent`, "", ``, '200', undefined, true);
        vw_sectorial.getrefresh();
    }, 1000);
    //Exports
    vw_sectorial.exportFields = [
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
    vw_sectorial.xlsPrint = function (row, column) {
        if (column.format) {
            return column.format(row, column.field);
        } else {
            return row[column.field];
        }
    };
    vw_sectorial.exportXLS = function () {
        var url = $("#report").excelexportjs({
            containerid: "report",
            datatype: 'table',
            worksheetName: `Reporte`,
            returnUri: true
        });
        DOWNLOAD.excel("Reporte Plan Estratégico Sectorial(" + vw_sectorial.report[0].entidad + ")", url);
    };
    vw_sectorial.exportPDF = function () {
        $("#PDF").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    vw_sectorial.openmodalField = function (value) {

        vw_sectorial.tipeExport = 'PDF';

        vw_sectorial.modal.modalView("vw_sectorial/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa ` + "Reporte Plan Estratégico Sectorial(" + vw_sectorial.report[0].entidad + ")",
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
});
