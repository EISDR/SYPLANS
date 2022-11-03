app.controller("vw_resultante_proceso", function ($scope, $http, $compile) {
    vw_resultante_proceso = this;
    //vw_resultante_proceso.fixFilters = [];
    //vw_resultante_proceso.singular = "singular";
    //vw_resultante_proceso.plural = "plural";
    vw_resultante_proceso.headertitle = "MATRIZ RESULTANTE";
    vw_resultante_proceso.destroyForm = false;
    vw_resultante_proceso.periodopoa = new SESSION().current().cantidad;
    vw_resultante_proceso.monitoreo_nombre = new SESSION().current().monitoreo_nombre;
    vw_resultante_proceso.periodopoas = [];
    vw_resultante_proceso.fimpacto = undefined;
    vw_resultante_proceso.fprobabilidad = undefined;
    vw_resultante_proceso.real = false;
    vw_resultante_proceso.entidad = window.location.href.split('?')[1].replaceAll('RF', '');
    for (var i = 1; i <= vw_resultante_proceso.periodopoa; i++) {
        vw_resultante_proceso.periodopoas.push(i);
    }
    //vw_resultante_proceso.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_resultante_proceso", vw_resultante_proceso, $scope, $http, $compile);
    RUN_B("vw_resultante_proceso", vw_resultante_proceso, $scope, $http, $compile);
    //Filters


    //Cols functions
    vw_resultante_proceso.cols = [
        {col: 1, span: 1}, {col: 2, span: 1}, {col: 3, span: 1}, {col: 4, span: 1}, {
            col: 5,
            span: 1
        }, {col: 6, span: 1}, {col: 7, span: 1}, {col: 8, span: 1}, {col: 9, span: 1}];
    vw_resultante_proceso.fullcolspan = function () {
        return vw_resultante_proceso.cols.map(d => d.span).reduce((a, b) => {
            return a + b
        });
    };

    vw_resultante_proceso.format = function (d) {
        if (d !== "" && d !== null && d !== undefined)
            return LAN.money(d).format(false);
        return '';
    };
    vw_resultante_proceso.distinct = function (list, fields) {
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
    vw_resultante_proceso.reduce = function (list, field, back) {

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

    vw_resultante_proceso.changeTab = async function (reales) {
        vw_resultante_proceso.real = reales;
        vw_resultante_proceso.getrefresh();
    }
    vw_resultante_proceso.getrefresh = async function () {
        var user = new SESSION().current();

        vw_resultante_proceso.cols[1].span = 10 + vw_resultante_proceso.periodopoa;


        new ANIMATION().loading(`#miSubcontent`, "", ``, '200', undefined, true);
        var aymywhere = [
            {
                field: vw_resultante_proceso.institucion !== '[NULL]' ? "compania" : "compania_base",
                value: vw_resultante_proceso.institucion !== '[NULL]' ? vw_resultante_proceso.institucion : user.compania_id
            },
            {
                field: "opcion_entidad",
                value: vw_resultante_proceso.entidad
            }
        ];

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
        if (vw_resultante_proceso.real) {
            vw_resultante_proceso.report = await BASEAPI.listp('vw_resultante_real_proceso', {
                limit: 0,
                orderby: "$ compania_base,compania,factor,table_,rid,control,responsable ",
                order: "asc",
                where: aymywhere
            });
        } else {
            vw_resultante_proceso.report = await BASEAPI.listp('vw_resultante_proceso', {
                limit: 0,
                orderby: "$ compania_base,compania,factor,table_,rid,control,responsable ",
                order: "asc",
                where: aymywhere
            });
        }
        vw_resultante_proceso.report = vw_resultante_proceso.report.data;
        if (!vw_resultante_proceso.report)
            return;


        vw_resultante_proceso.perspectiva = await BASEAPI.listp('perspectiva', {
            limit: 0,
            orderby: "$ id",
            order: "asc"
        });

        vw_resultante_proceso.perspectiva = vw_resultante_proceso.perspectiva.data;

        vw_resultante_proceso.entidadobj = await BASEAPI.listp('riesgo_entidad', {});
        vw_resultante_proceso.entidadobj = vw_resultante_proceso.entidadobj.data;


        vw_resultante_proceso.cache = [];
        if (vw_resultante_proceso.report)
            for (var i of vw_resultante_proceso.report) {
                var factor = vw_resultante_proceso.perspectiva.filter(d => {
                    return d.id == i.factor
                });
                if (factor.length)
                    i.factor = factor[0].nombre;

                var table = vw_resultante_proceso.entidadobj.filter(d => {
                    return d.id == i.table_
                })[0];

                i.residual = vw_resultante_proceso.format(i.residual);
                i.nivel_riesgo_v = vw_resultante_proceso.format(i.nivel_riesgo_v);
                i.efectividad_sum = vw_resultante_proceso.format(i.efectividad_sum);
                i.efectividad = vw_resultante_proceso.format(i.efectividad);
                i.tablex = table.name;
                if (!vw_resultante_proceso.cache[`${table.table_}x${i.registro}`]) {
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
                        vw_resultante_proceso.cache[`${table.table_}x${i.registro}`] = search[0][table.label];
                        i.registrox = search[0][table.label];
                    }
                } else {
                    i.registrox = vw_resultante_proceso.cache[`${table.table_}x${i.registro}`];
                }

            }

        new ANIMATION().stoploading(`#miSubcontent`, "", ``, '200', undefined, true);
        vw_resultante_proceso.afterInstitucion = function () {
            console.log("afterInstitucion");
            vw_resultante_proceso.getrefresh();
        };
        vw_resultante_proceso.refreshAngular();
        $('#minusubcontent').floatingScrollbar();
    };
    //Trigger
    setTimeout(function () {
        new ANIMATION().loading(`#miSubcontent`, "", ``, '200', undefined, true);
        vw_resultante_proceso.getrefresh();
    }, 200);
    //Exports
    vw_resultante_proceso.exportFields = [
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
            label: vw_resultante_proceso.real ? "Descripcióndel Control de Riesgo Real" : "Descripcióndel Control de Riesgo",
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
    vw_resultante_proceso.xlsPrint = function (row, column) {
        if (column.format) {
            return column.format(row, column.field);
        } else {
            return row[column.field];
        }
    };
    vw_resultante_proceso.exportXLS = function () {
        var url = $("#XLS").excelexportjs({
            containerid: "XLS",
            datatype: 'table',
            worksheetName: `Reporte`,
            returnUri: true
        });
        DOWNLOAD.excel("Reporte Matriz Resultante", url);
    };
    vw_resultante_proceso.exportPDF = function () {
        $("#PDF").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    vw_resultante_proceso.openmodalField = function (value) {

        vw_resultante_proceso.tipeExport = 'PDF';

        vw_resultante_proceso.modal.modalView("vw_resultante_proceso/export", {

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
