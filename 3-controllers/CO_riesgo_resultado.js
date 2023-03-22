app.controller("riesgo_resultado", function ($scope, $http, $compile) {
    riesgo_resultado = this;
    riesgo_resultado.session = new SESSION().current();
    riesgo_resultado.entidad = window.location.href.split('?')[1].replaceAll('RF', '');
    riesgo_resultado.fixFilters = [
        {
            field: "compania",
            value: riesgo_resultado.session.compania_id
        },
        {
            field: "institucion",
            operator: riesgo_resultado.session.institucion_id ? "=" : "is",
            value: riesgo_resultado.session.institucion_id ? riesgo_resultado.session.institucion_id : "$null"
        },
        {
            field: "entidad",
            value: riesgo_resultado.entidad
        }
    ];
    if (window.location.href.split('?').length > 2) {
        riesgo_resultado.soyamfe = true;
        CRUD_riesgo_resultado = {};
        DSON.keepmerge(CRUD_riesgo_resultado, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_riesgo_resultado, {
            table: {
                //width: "width:3000px;",
                //view: 'vw_riesgo_resultado',
                //method: 'riesgo_resultado',
                //limits: [10, 50, 100, 0],
                //report: true,
                //batch: false,
                //persist: false,
                //sortable: false,
                //dragrow: 'num',
                //rowStyle: function (row, $scope) {
                //    return "color:red;";
                //},
                //rowClass: function (row, $scope) {
                //    return row.name === 'whatever' ? "bg-" + COLOR.danger + "-300" : "";
                //},
                //activeColumn: "active",
                //key: 'id',
                //deletekeys: ['id'],
                columns: {
                    // dbcolumnname: {
                    //     visible: false,
                    //     visibleDetail: false,
                    //     export: false,
                    //     exportExample: false,
                    //     sortable: false,
                    //     shorttext: 360,
                    //     dead:true,
                    //     formattype: ENUM.FORMAT.numeric,
                    //     sorttype: ENUM.FORMATFILTER.numeric,
                    //     drag: true,
                    //     click: function (data) {
                    //         alert(data.row.id);
                    //         //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
                    //     },
                    //     reference: "id",
                    //     format: function (row) {
                    //         return row.id + "*";
                    //     }
                    // },
                    id: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        dead: true
                    },
                    nombre: {
                        label: function () {
                            return "Gravedad"
                        },
                    },
                    descripcion: {
                        label: function () {
                            return "Criterio"
                        },
                        shorttext: 360
                    },
                    valor: {
                        exportExample: "[int]",
                        label: function () {
                            return "Valor"
                        },
                        format: function (row) {
                            return `${row.valor} - ${row.valor_to}`;
                        }
                    },
                    compania: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        exportfix: "new SESSION().current().compania_id",
                        dead: true
                    }
                },
                filters: {
                    columns: true
                }
            }
        });
        riesgo_resultado.fixFilters.push({
            field: "mamfe",
            value: 1
        });
    } else {
        CRUD_riesgo_resultado = {};
        DSON.keepmerge(CRUD_riesgo_resultado, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_riesgo_resultado, {
            table: {
                //width: "width:3000px;",
                //view: 'vw_riesgo_resultado',
                //method: 'riesgo_resultado',
                //limits: [10, 50, 100, 0],
                //report: true,
                //batch: false,
                //persist: false,
                //sortable: false,
                //dragrow: 'num',
                //rowStyle: function (row, $scope) {
                //    return "color:red;";
                //},
                //rowClass: function (row, $scope) {
                //    return row.name === 'whatever' ? "bg-" + COLOR.danger + "-300" : "";
                //},
                //activeColumn: "active",
                //key: 'id',
                //deletekeys: ['id'],
                columns: {
                    // dbcolumnname: {
                    //     visible: false,
                    //     visibleDetail: false,
                    //     export: false,
                    //     exportExample: false,
                    //     sortable: false,
                    //     shorttext: 360,
                    //     dead:true,
                    //     formattype: ENUM.FORMAT.numeric,
                    //     sorttype: ENUM.FORMATFILTER.numeric,
                    //     drag: true,
                    //     click: function (data) {
                    //         alert(data.row.id);
                    //         //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
                    //     },
                    //     reference: "id",
                    //     format: function (row) {
                    //         return row.id + "*";
                    //     }
                    // },
                    id: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false
                    },
                    nombre: {},
                    descripcion: {shorttext: 360},
                    condition: {
                        export: true,
                        exportExample: false,
                        label: "Color",
                        format: function (row) {
                            $(`.riesgo_resultado_color` + row.id).css('background', row.color);
                            return `<div   class='${`riesgo_resultado_color` + row.id} shape_element_left'> </div>`;
                        }
                    },
                    valor: {
                        exportExample: "[int]",
                        label: function () {
                            return "Rango Desde"
                        },
                        formattype: ENUM.FORMAT.decimal
                    },
                    valor_to: {
                        exportExample: "[int]",
                        label: function () {
                            return "Rango Hasta"
                        },
                        formattype: ENUM.FORMAT.decimal
                    },
                    compania: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        exportfix: "new SESSION().current().compania_id",
                        dead: true
                    }
                },
                filters: {
                    columns: true
                }
            }
        });
        riesgo_resultado.fixFilters.push({
            field: "mamfe",
            operator: "IS",
            value: "$NULL"
        });
    }
    riesgo_resultado.fechita = LAN.date();
    //riesgo_resultado.fixFilters = [];
    //riesgo_resultado.singular = "singular";
    //riesgo_resultado.plural = "plural";
    // riesgo_resultado.headertitle = "Niveles de Riesgos";
    riesgo_resultado.destroyForm = false;
    riesgo_resultado.headertitle = "Niveles de Riesgo";
    if (riesgo_resultado.soyamfe)
        riesgo_resultado.headertitle = "Detectabilidad";

    //riesgo_resultado.permissionTable = "tabletopermission";
    RUNCONTROLLER("riesgo_resultado", riesgo_resultado, $scope, $http, $compile);
    RUN_B("riesgo_resultado", riesgo_resultado, $scope, $http, $compile);
    riesgo_resultado.formulary = function (data, mode, defaultData) {
        if (riesgo_resultado !== undefined) {
            RUN_B("riesgo_resultado", riesgo_resultado, $scope, $http, $compile);
            riesgo_resultado.entidad = window.location.href.split('?')[1].replaceAll('RF', '');
            riesgo_resultado.form.modalWidth = ENUM.modal.width.full;
            riesgo_resultado.form.readonly = {
                compania: riesgo_resultado.session.compania_id,
                institucion: riesgo_resultado.session.institucion_id,
                entidad: riesgo_resultado.entidad
            };

            if (riesgo_resultado.soyamfe) {
                riesgo_resultado.form.titles = {
                    new: "Nueva Detectabilidad",
                    edit: "Editar Detectabilidad",
                    view: "Ver Detectabilidad"
                };
            }
            if (riesgo_resultado.soyamfe) {
                riesgo_resultado.form.readonly.mamfe = 1;
            }
            riesgo_resultado.createForm(data, mode, defaultData, riesgo_resultado.soyamfe ? "form_mamfe" : undefined);
            $scope.$watch("riesgo_resultado.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_resultado, 'nombre', rules);
            });
            $scope.$watch("riesgo_resultado.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_resultado, 'descripcion', rules);
            });
            $scope.$watch("riesgo_resultado.color", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_resultado, 'color', rules);
            });
            $scope.$watch("riesgo_resultado.valor", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_resultado, 'valor', rules);
            });
            $scope.$watch("riesgo_resultado.valor_to", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_resultado, 'valor_to', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_resultado.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_resultado, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_resultado.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_resultado, 'institucion', rules);
            });
        }
    };
    riesgo_resultado.afterInstitucion = function () {
        setTimeout(function () {
            riesgo_resultado.getrefresh();
        }, 1000);
    };

    riesgo_resultado.orders = ["probabilidades", "impactos"];
    riesgo_resultado.orderst = ["Probabilidades", "Impactos"];
    riesgo_resultado.E = function (i) {
        return eval(`riesgo_resultado.${riesgo_resultado.orders[i]}`);
    };
    riesgo_resultado.Invertir = function (i) {
        riesgo_resultado.impactos.reverse();
        riesgo_resultado.probabilidades.reverse();
        riesgo_resultado.orders.reverse();
        riesgo_resultado.orderst.reverse();

        riesgo_resultado.refreshAngular();
    };
    riesgo_resultado.counts = function (p, i) {
        var camps = ["iid", "pid"];
        if (riesgo_resultado.orders[0] !== "probabilidades") {
            camps = ["pid", "iid"];
        }
        var counts = riesgo_resultado.resultantes.filter(d => {
            return d[camps[0]] == p && d[camps[1]] == i;
        });
        if (counts.length)
            return counts[0].sum;
        return 0;
    };
    riesgo_resultado.datamon = function (p, i) {
        var camps = ["impacto", "probabilidad"];

        if (riesgo_resultado.orders[0] !== "probabilidades") {
            camps = ["probabilidad", "impacto"];
        }
        riesgo_resultado["t" + camps[0]] = p;
        riesgo_resultado["t" + camps[1]] = i;
        riesgo_resultado.modal.modalView("vw_resultante", {
            header: {
                title: camps[0] === "probabilidad" ? `Matriz Resultante con probabilidad ${p.nombre.toLowerCase()} e impacto ${i.nombre.toLowerCase()}` :
                    `Matriz Resultante con impacto ${i.nombre.toLowerCase()} y probabilidad ${p.nombre.toLowerCase()}`
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: "vw_resultante"
            },
        });
    };
    riesgo_resultado.getrefresh = async function () {
        var user = new SESSION().current();
        var riesgoData = await BASEAPI.firstp('vw_riesgo_historico', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value: user.compania_id
                },
                {
                    "field": "institucion",
                    "operator": user.institucion_id ? "=" : "is",
                    "value": user.institucion_id ? user.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (riesgoData) {
            riesgo_resultado.historico_id = riesgoData.id;
            riesgo_resultado.nombre_historico = riesgoData.nombre;
            riesgo_resultado.descripcion_historico = riesgoData.descripcion;
            riesgo_resultado.ano_historico = riesgoData.ano + '';
            riesgo_resultado.estatus_historico = riesgoData.estatus_nombre;

        }
        riesgo_resultado.probabilidades = [];
        riesgo_resultado.resultados = [];
        riesgo_resultado.impactos = [];
        if (location.href.indexOf('riesgo_resultado/matriz') === -1)
            return;

        new ANIMATION().loading(`.subcontent`, "", ``, '200', undefined, true);
        var aymywhere = [];
        if (riesgo_resultado.institucion !== '[NULL]') {
            if (riesgo_resultado.institucion_object.tipo === "c") {
                aymywhere = [
                    {
                        field: "compania",
                        value: riesgo_resultado.institucion
                    },
                    {
                        field: "institucion",
                        operator: "is",
                        value: "$null"
                    },
                    {
                        field: "entidad",
                        value: riesgo_resultado.entidad
                    },
                    {
                        field: "riesgo_historico",
                        value: riesgo_resultado.historico_id ? riesgo_resultado.historico_id : -1
                    }
                ];
            } else {
                aymywhere = [
                    {
                        field: "institucion",
                        value: riesgo_resultado.institucion
                    },
                    {
                        field: "entidad",
                        value: riesgo_resultado.entidad
                    },
                    {
                        field: "riesgo_historico",
                        value: riesgo_resultado.historico_id ? riesgo_resultado.historico_id : -1
                    }
                ];
            }
        } else {
            aymywhere = [
                {
                    field: new SESSION().current().institucion_id ? "institucion" : "compania",
                    value: new SESSION().current().institucion_id ? new SESSION().current().institucion_id : new SESSION().current().compania_id
                },
                {
                    field: "entidad",
                    value: riesgo_resultado.entidad
                }
            ];
            if (!new SESSION().current().institucion_id) {
                aymywhere.push({
                    field: "institucion",
                    operator: "is",
                    value: "$null"
                });
            }
        }

        riesgo_resultado.resultantes = await BASEAPI.listp('vw_resultante_count', {
            limit: 0,
            orderby: "$ compania",
            order: "desc",
            where: aymywhere
        });
        riesgo_resultado.resultantes = riesgo_resultado.resultantes.data;

        riesgo_resultado.probabilidades = await BASEAPI.listp('riesgo_probabilidad', {
            limit: 0,
            orderby: "$ valor",
            order: "desc",
            where: aymywhere
        });
        riesgo_resultado.probabilidades = riesgo_resultado.probabilidades.data;

        riesgo_resultado.impactos = await BASEAPI.listp('riesgo_impacto', {
            limit: 0,
            orderby: "$ valor",
            order: "asc",
            where: aymywhere
        });
        riesgo_resultado.impactos = riesgo_resultado.impactos.data;
        // riesgo_resultado.probabilidades.reverse();
        riesgo_resultado.resultados = await BASEAPI.listp('riesgo_resultado', {
            limit: 0,
            orderby: "$ id",
            order: "asc",
            where: aymywhere
        });
        riesgo_resultado.resultados = riesgo_resultado.resultados.data;

        riesgo_resultado.matriz = await BASEAPI.listp('riesgo_matriz', {
            limit: 0,
            orderby: "$ id",
            order: "asc",
            where: [
                {
                    field: 'probabilidad',
                    value: riesgo_resultado.probabilidades.map(d => {
                        return d.id
                    })
                },
                {
                    field: 'impacto',
                    value: riesgo_resultado.impactos.map(d => {
                        return d.id
                    })
                }]
        });
        riesgo_resultado.matriz = riesgo_resultado.matriz.data;
        riesgo_resultado.refreshAngular();
        riesgo_resultado.empresita = (riesgo_resultado.institucion_object ? riesgo_resultado.institucion_object.nombre : (new SESSION().current().institucion ? new SESSION().current().institucion : new SESSION().current().compania));
        document.title = "Syplans - Matriz de Calor (" + riesgo_resultado.empresita + ")";
        riesgo_resultado.fechita = LAN.date();
        new ANIMATION().stoploading(`.subcontent`, "", ``, '200', undefined, true);
    };
    riesgo_resultado.saveM = async function (i, p, b) {
        var camps = ["impacto", "probabilidad"];
        if (riesgo_resultado.orders[0] !== "probabilidades") {
            camps = ["probabilidad", "impacto"];
        }
        console.log('entro');
        var animation = new ANIMATION();
        animation.loading(`#item_p${i}_i${p}`, "", ``, '50');
        var currentRiesgo = riesgo_resultado.getM(i, p);

        if (currentRiesgo.resultado === 0) {
            var inserted = {};
            inserted[camps[0]] = i;
            inserted[camps[1]] = p;
            inserted.resultado = riesgo_resultado.nextR(currentRiesgo.resultado, b);
            await BASEAPI.insertp('riesgo_matriz', inserted);
        } else {
            await BASEAPI.updateallp('riesgo_matriz', {
                resultado: riesgo_resultado.nextR(currentRiesgo.resultado, b),
                where: [
                    {
                        field: `${camps[1]}`,
                        value: p
                    },
                    {
                        field: `${camps[0]}`,
                        value: i
                    }
                ]
            });
        }
        riesgo_resultado.matriz = await BASEAPI.listp('riesgo_matriz', {
            limit: 0,
            orderby: "$ id",
            order: "asc",
            where: [
                {
                    field: `${camps[1]}`,
                    value: riesgo_resultado[riesgo_resultado.orders[0]].map(d => {
                        return d.id
                    })
                },
                {
                    field: `${camps[0]}`,
                    value: riesgo_resultado[riesgo_resultado.orders[1]].map(d => {
                        return d.id
                    })
                }]
        });
        riesgo_resultado.matriz = riesgo_resultado.matriz.data;
        riesgo_resultado.refreshAngular();
        riesgo_resultado.fechita = LAN.date();
        animation.stoploading(`#item_p${i}_i${p}`, "");
    };
    riesgo_resultado.nextR = function (r, b) {
        if (r === 0) {
            return riesgo_resultado.resultados[0].id;
        }
        if (!b) {
            for (var i in riesgo_resultado.resultados) {
                if (riesgo_resultado.resultados[i].id == r) {
                    if (riesgo_resultado.resultados[parseInt(i) + 1]) {
                        return riesgo_resultado.resultados[parseInt(i) + 1].id;
                    }
                }
            }
            return riesgo_resultado.resultados[0].id;
        } else {
            for (var i in riesgo_resultado.resultados) {
                if (riesgo_resultado.resultados[i].id == r) {
                    if (riesgo_resultado.resultados[parseInt(i) - 1]) {
                        return riesgo_resultado.resultados[parseInt(i) - 1].id;
                    }
                }
            }
            return riesgo_resultado.resultados[riesgo_resultado.resultados.length - 1].id;
        }

    };
    riesgo_resultado.getM = function (i, p) {
        var camps = ["impacto", "probabilidad"];
        if (riesgo_resultado.orders[0] !== "probabilidades") {
            camps = ["probabilidad", "impacto"];
        }
        var item = riesgo_resultado.matriz.filter(d => {
            return d[camps[0]] == i && d[camps[1]] == p
        });
        if (item.length > 0) {
            var resultado = riesgo_resultado.resultados.filter(d => {
                return d.id == item[0].resultado
            });
            if (resultado.length > 0) {
                item[0].color = resultado[0].color;
                item[0].nombre = resultado[0].nombre;
            }
            return item[0];
        } else {
            return {
                probabilidad: 0,
                resultado: 0,
                color: "white",
                nombre: "N/A",
                impacto: 0,
            }
        }
    };
    riesgo_resultado.openmodalField = function (value) {

        riesgo_resultado.tipeExport = 'PDF';

        riesgo_resultado.modal.modalView("riesgo_resultado/export", {

            width: 'modal-full',
            header: {
                title: `Vista Matriz de Calor (${riesgo_resultado.empresita})`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    };
    riesgo_resultado.exportPDF = function () {

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
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    riesgo_resultado.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        if (!riesgo_resultado.soyamfe) {
            var exist = await BASEAPI.listp("riesgo_resultado", {
                where: [
                    {
                        field: 'compania',
                        value: new SESSION().current().compania_id
                    },
                    {
                        field: 'institucion',
                        operator: new SESSION().current().institucion_id ? "=" : '',
                        value: new SESSION().current().institucion_id || "$ is NULL"
                    },
                    {
                        field: "entidad",
                        value: riesgo_resultado.entidad
                    },
                    {
                        open: '((',
                        field: "$" + data.inserting.valor,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.inserting.valor,
                        operator: 'BETWEEN',
                        connector: "OR",
                        value: `$ valor and valor_to`,
                        close: ')'
                    },
                    {
                        open: '(',
                        field: "$" + data.inserting.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.inserting.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`,
                        close: '))'
                    }
                ]
            });
            if (exist.data)
                if (exist.data.length) {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `El rango desde y hasta interfiere con el nivel de riesgo "${exist.data[0].nombre}"`
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                }
        }else{
            var exist = await BASEAPI.listp("riesgo_resultado", {
                where: [
                    {
                        field: 'compania',
                        value: new SESSION().current().compania_id
                    },
                    {
                        field: 'institucion',
                        operator: new SESSION().current().institucion_id ? "=" : '',
                        value: new SESSION().current().institucion_id || "$ is NULL"
                    },
                    {
                        field: "entidad",
                        value: riesgo_resultado.entidad
                    },
                    {
                        field: "mamfe",
                        value: 1
                    },
                    {
                        open: '((',
                        field: "$" + data.inserting.valor,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.inserting.valor,
                        operator: 'BETWEEN',
                        connector: "OR",
                        value: `$ valor and valor_to`,
                        close: ')'
                    },
                    {
                        open: '(',
                        field: "$" + data.inserting.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.inserting.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`,
                        close: '))'
                    }
                ]
            });
            if (exist.data)
                if (exist.data.length) {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `El rango desde y hasta interfiere con la detectabilidad "${exist.data[0].nombre}"`
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                }
        }
        resolve(true);
    });
    //

    riesgo_resultado.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        var exist = await BASEAPI.listp("riesgo_resultado", {
            where: [
                {
                    field: 'id',
                    operator: '!=',
                    value: riesgo_resultado.id
                },
                {
                    field: 'compania',
                    value: new SESSION().current().compania_id
                },
                {
                    field: 'institucion',
                    operator: new SESSION().current().institucion_id ? "=" : '',
                    value: new SESSION().current().institucion_id || "$ is NULL"
                },
                {
                    field: "entidad",
                    value: riesgo_resultado.entidad
                },
                {
                    open: '((',
                    field: "$" + data.updating.valor,
                    operator: 'BETWEEN',
                    value: `$ valor and valor_to`
                },
                {
                    field: "$" + data.updating.valor,
                    operator: 'BETWEEN',
                    connector: "OR",
                    value: `$ valor and valor_to`,
                    close: ')'
                },
                {
                    open: '(',
                    field: "$" + data.updating.valor_to,
                    operator: 'BETWEEN',
                    value: `$ valor and valor_to`
                },
                {
                    field: "$" + data.updating.valor_to,
                    operator: 'BETWEEN',
                    value: `$ valor and valor_to`,
                    close: '))'
                }
            ]
        });
        if (!riesgo_resultado.soyamfe) {
            if (exist.data)
                if (exist.data.length) {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `El rango desde y hasta interfiere con el nivel de riesgo "${exist.data[0].nombre}"`
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                }
        }else {
            if (exist.data)
                if (exist.data.length) {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `El rango desde y hasta interfiere con la detectabilidad "${exist.data[0].nombre}"`
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                }
        }
        resolve(true);
    });
    //
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});
