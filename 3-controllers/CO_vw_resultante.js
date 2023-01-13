app.controller("vw_resultante", function ($scope, $http, $compile) {
    vw_resultante = this;
    //vw_resultante.fixFilters = [];
    //vw_resultante.singular = "singular";
    //vw_resultante.plural = "plural";
    if (window.location.href.indexOf('mamfe') !== -1)
        vw_resultante.soyamfe = true;


    vw_resultante.headertitle = "MATRIZ RESULTANTE";
    if (vw_resultante.soyamfe)
        vw_resultante.headertitle = "MATRIZ RESULTANTE (Análisis Modal de Fallos y Efectos)";
    vw_resultante.formaty = function (val) {
        if (val !== "" && val !== null && val !== undefined)
            return LAN.date(val);
        return "";
    };
    vw_resultante.destroyForm = false;
    vw_resultante.periodopoa = new SESSION().current().cantidad;
    vw_resultante.monitoreo_nombre = new SESSION().current().monitoreo_nombre;
    vw_resultante.periodopoas = [];
    vw_resultante.fimpacto = undefined;
    vw_resultante.fprobabilidad = undefined;
    vw_resultante.real = false;
    vw_resultante.entidad = window.location.href.split('?')[1].replaceAll('RF', '');
    for (var i = 1; i <= vw_resultante.periodopoa; i++) {
        vw_resultante.periodopoas.push(i);
    }
    //vw_resultante.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_resultante", vw_resultante, $scope, $http, $compile);
    RUN_B("vw_resultante", vw_resultante, $scope, $http, $compile);
    //Filters


    //Cols functions
    vw_resultante.cols = [
        {col: 1, span: 1}, {col: 2, span: 1}, {col: 3, span: 1}, {col: 4, span: 1}, {
            col: 5,
            span: 1
        }, {col: 6, span: 1}, {col: 7, span: 1}, {col: 8, span: 1}, {col: 9, span: 1}];
    vw_resultante.fullcolspan = function () {
        return vw_resultante.cols.map(d => d.span).reduce((a, b) => {
            return a + b
        });
    };

    vw_resultante.format = function (d) {
        if (d !== "" && d !== null && d !== undefined)
            return LAN.money(d).format(false);
        return '';
    };
    vw_resultante.distinct = function (list, fields) {
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
    vw_resultante.reduce = function (list, field, back) {

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

    vw_resultante.changeTab = async function (reales) {
        vw_resultante.real = reales;
        vw_resultante.getrefresh();
    };
    vw_resultante.getrefresh = async function () {
        var user = new SESSION().current();

        vw_resultante.cols[1].span = 10 + vw_resultante.periodopoa;


        new ANIMATION().loading(`#miSubcontent`, "", ``, '200', undefined, true);
        var aymywhere = [
            {
                field: vw_resultante.institucion !== '[NULL]' ? "compania" : "compania_base",
                value: vw_resultante.institucion !== '[NULL]' ? vw_resultante.institucion : user.compania_id
            },
            {
                field: "opcion_entidad",
                value: vw_resultante.entidad
            }
        ];
        if (vw_resultante.soyamfe) {
            aymywhere.push({
                field: "mamfe",
                value: 1
            });
        } else {
            aymywhere.push({
                field: "mamfe",
                operator: "IS",
                value: "$NULL"
            });
        }

        if (location.href.indexOf("riesgo_resultado/matriz") !== -1) {
            if (riesgo_resultado) {
                aymywhere.push({
                    field: "pidx",
                    value: riesgo_resultado.tprobabilidad.id
                });
                aymywhere.push({
                    field: "iidx",
                    value: riesgo_resultado.timpacto.id
                });

            }
        }
        if (vw_resultante.real) {
            vw_resultante.report = await BASEAPI.listp(vw_resultante.soyamfe ? 'vw_resultante_mamfe' : 'vw_resultante', {
                limit: 0,
                orderby: vw_resultante.soyamfe ? "$ compania_base,compania,proceso,elemento " : "$ compania_base,compania,factor,table_,departamento,rid,responsable,control ",
                order: "asc",
                where: aymywhere
            });
        } else {
            vw_resultante.report = await BASEAPI.listp(vw_resultante.soyamfe ? 'vw_resultante_mamfe' : 'vw_resultante', {
                limit: 0,
                orderby: vw_resultante.soyamfe ? "$ compania_base,compania,proceso,elemento " : "$ compania_base,compania,factor,table_,departamento,rid,responsable,control ",
                order: "asc",
                where: aymywhere
            });
        }
        vw_resultante.report = vw_resultante.report.data;
        if (!vw_resultante.report)
            return;


        vw_resultante.perspectiva = await BASEAPI.listp('perspectiva', {
            limit: 0,
            orderby: "$ id",
            order: "asc"
        });

        vw_resultante.perspectiva = vw_resultante.perspectiva.data;

        vw_resultante.entidadobj = await BASEAPI.listp('riesgo_entidad', {});
        vw_resultante.entidadobj = vw_resultante.entidadobj.data;


        vw_resultante.cache = [];
        if (vw_resultante.report)
            for (var i of vw_resultante.report) {
                var factor = vw_resultante.perspectiva.filter(d => {
                    return d.id == i.factor
                });
                if (factor.length)
                    i.factor = factor[0].nombre;

                var table = vw_resultante.entidadobj.filter(d => {
                    return d.id == i.table_
                })[0];

                i.residual = vw_resultante.format(i.residual);
                i.nivel_riesgo_v = vw_resultante.format(i.nivel_riesgo_v);
                i.efectividad_sum = vw_resultante.format(i.efectividad_sum);
                i.efectividad = vw_resultante.format(i.efectividad);

                i.residual2 = vw_resultante.format(i.residual2);
                i.nivel_riesgo_v2 = vw_resultante.format(i.nivel_riesgo_v2);
                i.efectividad_sum2 = vw_resultante.format(i.efectividad_sum2);
                i.efectividad2 = vw_resultante.format(i.efectividad2);
                i.tablex = table.name;
                if (!vw_resultante.cache[`${table.table_}x${i.registro}`]) {
                    var search = await BASEAPI.listp(table.table_, {
                        where: [
                            {
                                field: "id",
                                value: i.registro
                            }
                        ]
                    });
                    search = search.data;
                    if (search.length) {
                        vw_resultante.cache[`${table.table_}x${i.registro}`] = search[0][table.label];
                        i.registrox = search[0][table.label];
                    }
                } else {
                    i.registrox = vw_resultante.cache[`${table.table_}x${i.registro}`];
                }

            }

        new ANIMATION().stoploading(`#miSubcontent`, "", ``, '200', undefined, true);
        vw_resultante.afterInstitucion = function () {
            console.log("afterInstitucion");
            vw_resultante.getrefresh();
        };
        vw_resultante.refreshAngular();
        $('#minusubcontent').floatingScrollbar();
    };
    //Trigger
    setTimeout(function () {
        new ANIMATION().loading(`#miSubcontent`, "", ``, '200', undefined, true);
        vw_resultante.getrefresh();
    }, 200);
    //Exports
    vw_resultante.exportFields = [
        {
            label: "Factor",
            field: "factor"
        },
        {
            label: "Riesgo",
            field: "riesgo"
        },
        {
            label: "Probabilidad",
            field: "probabilidad"
        },
        {
            label: "Valor",
            field: "pid_excel"
        },
        {
            label: "Impacto",
            field: "impacto"
        },
        {
            label: "Valor",
            field: "iid"
        },
        {
            label: "Nivel de Riesgo",
            field: "nivel_riesgo"
        },
        {
            label: "Responsable",
            field: "responsable"
        },
        {
            label: vw_resultante.real ? "Descripcióndel Control de Riesgo Real" : "Descripcióndel Control de Riesgo",
            field: "control_excel"
        },
        {
            label: "Efectividad",
            field: "efectividad_sum_excel"
        },
        {
            label: "Efectividad del Control Porcentaje",
            field: "efectividad_excel"
        },
        {
            label: "Residual",
            field: "residual"
        }
    ];
    vw_resultante.xlsPrint = function (row, column) {
        if (column.format) {
            return column.format(row, column.field);
        } else {
            return row[column.field];
        }
    };
    vw_resultante.exportXLS = function () {
        var url = $("#XLS").excelexportjs({
            containerid: "XLS",
            datatype: 'table',
            worksheetName: `Reporte`,
            returnUri: true
        });
        DOWNLOAD.excel("Reporte Matriz Resultante", url);
    };
    vw_resultante.exportPDF = function () {
        $("#PDF").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    vw_resultante.openmodalField = function (value) {

        vw_resultante.tipeExport = 'PDF';

        vw_resultante.modal.modalView("vw_resultante/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa ` + "Matriz Resultante",
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
