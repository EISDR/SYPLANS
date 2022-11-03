app.controller("vw_caasd", function ($scope, $http, $compile) {
    vw_caasd = this;
    //vw_caasd.fixFilters = [];
    //vw_caasd.singular = "singular";
    //vw_caasd.plural = "plural";
    vw_caasd.headertitle = "Planificación Institucional";
    vw_caasd.destroyForm = false;
    vw_caasd.periodopoa = new SESSION().current().cantidad;
    vw_caasd.monitoreo_nombre = new SESSION().current().monitoreo_nombre;
    vw_caasd.periodopoas = [];
    for (var i = 1; i <= vw_caasd.periodopoa; i++) {
        vw_caasd.periodopoas.push(i);
    }
    //vw_caasd.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_caasd", vw_caasd, $scope, $http, $compile);
    RUN_B("vw_caasd", vw_caasd, $scope, $http, $compile);
    //Filters
    vw_caasd.afterInstitucion = function () {
        vw_caasd.getrefresh();
    };
    vw_caasd.afterDepartamento = function () {
        vw_caasd.getrefresh();
    };
    vw_caasd.afterPoa = function () {
        vw_caasd.getrefresh();
    };
    //Cols functions
    vw_caasd.cols = [
        {col: 1, span: 6}, {col: 2, span: 10}, {col: 3, span: 3}, {col: 4, span: 4}, {
            col: 5,
            span: 1
        }, {col: 6, span: 1}];
    vw_caasd.fullcolspan = function () {
        return vw_caasd.cols.map(d => d.span).reduce((a, b) => {
            return a + b
        });
    };
    //Group By EIS Mode
    vw_caasd.heightx = function (id) {
        if (document.getElementById(id))
            return document.getElementById(id).clientHeight;
        return 200;
    };
    vw_caasd.format = function (valor, tipo_meta) {

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
    vw_caasd.distinct = function (list, fields) {
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
    vw_caasd.reduce = function (list, field, back) {

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
    vw_caasd.getrefresh = async function () {
        var user = new SESSION().current();


        new ANIMATION().loading(`.subcontent`, "", ``, '200', undefined, true);
        var aymywhere = [{
            field: vw_caasd.institucion !== '[NULL]' ? "compania" : "compania_base",
            value: vw_caasd.institucion !== '[NULL]' ? vw_caasd.institucion : user.compania_id
        }];
        vw_caasd.report = await BASEAPI.listp('vw_caasd', {
            limit: 0,
            orderby: "$ compania_base,compania,eje,objetivo,resultado,indicador_pei,producto_id",
            order: "asc",
            where: aymywhere
        });

        vw_caasd.report = vw_caasd.report.data;
        if (vw_caasd.report)
            if (vw_caasd.report.length > 0) {
                var periododesde = vw_caasd.report[0].periodo_desde;
                var periodohasta = vw_caasd.report[0].periodo_hasta;
                vw_caasd.peianos = [];
                for (var pe = periododesde; pe <= periodohasta; pe++)
                    vw_caasd.peianos.push(pe);
                vw_caasd.reportDistinct = vw_caasd.distinct(vw_caasd.report, ["entidad", "eje_estrategico", "objetivo_estrategico"]);
                for (var i of vw_caasd.reportDistinct) {
                    for (var d of i.records) {
                        try {
                            d.indicador_pei_x = eval(d.indicador_pei_x);
                        } catch (e) {

                        }
                    }
                }
                vw_caasd.refreshAngular();
            } else {
                vw_caasd.reportDistinct = [];
                vw_caasd.refreshAngular();
            }
        new ANIMATION().stoploading(`.subcontent`, "", ``, '200', undefined, true);
        $('#minusubcontent').floatingScrollbar();
    };
    //Trigger
    setTimeout(function () {
        new ANIMATION().loading(`.subcontent`, "", ``, '200', undefined, true);
        vw_caasd.getrefresh();
    }, 1000);
    //Exports
    vw_caasd.exportFields = [
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
            label: "Resultado Esperado",
            field: "resultado"
        },
        {
            label: "Indicador PEI",
            field: "indicador_pei"
        },
        {
            label: "Producto Terminal",
            field: "Producto"
        },
    ];
    vw_caasd.xlsPrint = function (row, column) {
        if (column.format) {
            return column.format(row, column.field);
        } else {
            return row[column.field];
        }
    };
    vw_caasd.exportXLS = function () {
        var url = $("#report").excelexportjs({
            containerid: "report",
            datatype: 'table',
            worksheetName: `Reporte`,
            returnUri: true
        });
        DOWNLOAD.excel("Reporte Planificación Institucional(" + vw_caasd.report[0].entidad + ")", url);
    };
    vw_caasd.exportPDF = function () {
        $("#PDF").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    vw_caasd.openmodalField = function (value) {

        vw_caasd.tipeExport = 'PDF';

        vw_caasd.modal.modalView("vw_caasd/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa ` + "Reporte Planificación Institucional(" + vw_caasd.report[0].entidad + ")",
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

