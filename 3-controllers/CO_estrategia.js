app.controller("estrategia", function ($scope, $http, $compile) {
    estrategia = this;
    var session = new SESSION().current();
    estrategia.dataValues = [];
    estrategia.dataValuesIDs = [];
    estrategia.pestaDvalues = [];
    estrategia.pestaDvaluesIDs = [];
    estrategia.current = session;
    estrategia.session = session;

    RUNCONTROLLER("estrategia", estrategia, $scope, $http, $compile);
    RUN_B("estrategia", estrategia, $scope, $http, $compile);
    estrategia.fixFilters = [
        {
            "field": "pei",
            "value": session.estatus ? session.pei_id : 0
        }
    ];
    if (typeof foda_items != 'undefined') {
        if (typeof foda_items != 'not defined') {
            if (foda_items) {
                estrategia.fixFilters = [{
                    field: "id",
                    value: foda_items.dataValuesIDs
                }];
            }
        }
    }
    if (typeof pesta_items != 'undefined') {
        if (typeof pesta_items != 'not defined') {
            if (pesta_items) {
                $('.icon-plus-circle2').parent().hide();
                estrategia.fixFilters = [{
                    field: "id",
                    value: pesta_items.dataValuesIDs
                }];
            }
        }
    }
    estrategia.plural = "Estrategia";
    estrategia.singular = "Estrategia";

    title_header_table_pei(estrategia, MESSAGE.i('planificacion.titleEstrategia'));
    getPEIstatus(estrategia, session.pei_id);

    estrategia.selectQueries["fortaleza"] = [
        {
            field: "pei",
            operator: "=",
            value: new SESSION().current().pei_id
        },
        {
            field: "type",
            operator: "=",
            value: 1
        }
    ];
    estrategia.selectQueries["oportunidad"] = [
        {
            field: "pei",
            operator: "=",
            value: new SESSION().current().pei_id
        },
        {
            field: "type",
            operator: "=",
            value: 3
        }
    ];
    estrategia.selectQueries["debilidad"] = [
        {
            field: "pei",
            operator: "=",
            value: new SESSION().current().pei_id
        },
        {
            field: "type",
            operator: "=",
            value: 2
        }
    ];
    estrategia.selectQueries["amenaza"] = [
        {
            field: "pei",
            operator: "=",
            value: new SESSION().current().pei_id
        },
        {
            field: "type",
            operator: "=",
            value: 4
        }
    ];
    estrategia.selectQueries["politico"] = [
        {
            field: "pei",
            operator: "=",
            value: new SESSION().current().pei_id
        },
        {
            field: "type",
            operator: "=",
            value: 1
        }
    ];
    estrategia.selectQueries["economico"] = [
        {
            field: "pei",
            operator: "=",
            value: new SESSION().current().pei_id
        },
        {
            field: "type",
            operator: "=",
            value: 2
        }
    ];
    estrategia.selectQueries["social"] = [
        {
            field: "pei",
            operator: "=",
            value: new SESSION().current().pei_id
        },
        {
            field: "type",
            operator: "=",
            value: 3
        }
    ];
    estrategia.selectQueries["tecnologico"] = [
        {
            field: "pei",
            operator: "=",
            value: new SESSION().current().pei_id
        },
        {
            field: "type",
            operator: "=",
            value: 4
        }
    ];
    estrategia.selectQueries["ambiental"] = [
        {
            field: "pei",
            operator: "=",
            value: new SESSION().current().pei_id
        },
        {
            field: "type",
            operator: "=",
            value: 5
        }
    ];
    estrategia.selectQueries["legal"] = [
        {
            field: "pei",
            operator: "=",
            value: new SESSION().current().pei_id
        },
        {
            field: "type",
            operator: "=",
            value: 6
        }
    ];


    estrategia.triggers.table.after.load = async function (records) {
        if (estrategia.estatus_pei && estrategia.condicion_pei == ENUM_2.pei_estatus.Inactivo) {
            estrategia.setPermission("add", false);
        }
        estrategia.runMagicOneToManyWithStorage('resultados_esperados', 'perspectiva', 'vw_resultado_esperado', 'perspectiva', 'id', 'estrategia', 'nombre', 'resultado_esperado', 'id', 'perspectiva');
        check_PEI("estrategia", session.pei_id);
    };
    estrategia.formulary = function (data, mode, defaultData) {
        if (estrategia !== undefined) {
            RUN_B("estrategia", estrategia, $scope, $http, $compile);
            estrategia.form.titles = {
                new: "Nueva - " + MESSAGE.i('planificacion.titleEstrategia'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titleEstrategia')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleEstrategia')}`
            };
            if (mode == "new") {
                estrategia.current_title = `<i class="icon-file-plus"></i> ${estrategia.form.titles.new}`;
            } else if (mode == "edit") {
                estrategia.current_title = `<i class="icon-pencil7"></i> ${estrategia.form.titles.edit}`;
            }
            estrategia.selectQueries["fortaleza"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                },
                {
                    field: "type",
                    operator: "=",
                    value: 1
                }
            ];
            estrategia.selectQueries["oportunidad"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                },
                {
                    field: "type",
                    operator: "=",
                    value: 3
                }
            ];
            estrategia.selectQueries["debilidad"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                },
                {
                    field: "type",
                    operator: "=",
                    value: 2
                }
            ];
            estrategia.selectQueries["amenaza"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                },
                {
                    field: "type",
                    operator: "=",
                    value: 4
                }
            ];
            estrategia.selectQueries["politico"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                },
                {
                    field: "type",
                    operator: "=",
                    value: 1
                }
            ];
            estrategia.selectQueries["economico"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                },
                {
                    field: "type",
                    operator: "=",
                    value: 2
                }
            ];
            estrategia.selectQueries["social"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                },
                {
                    field: "type",
                    operator: "=",
                    value: 3
                }
            ];
            estrategia.selectQueries["tecnologico"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                },
                {
                    field: "type",
                    operator: "=",
                    value: 4
                }
            ];
            estrategia.selectQueries["ambiental"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                },
                {
                    field: "type",
                    operator: "=",
                    value: 5
                }
            ];
            estrategia.selectQueries["legal"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                },
                {
                    field: "type",
                    operator: "=",
                    value: 6
                }
            ];


            estrategia.$scope.$watch('estrategia.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(estrategia, "nombre", rules);
            });


            estrategia.$scope.$watch('estrategia.eje_estrategico', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(estrategia, "eje_estrategico", rules);
            });


            estrategia.$scope.$watch('estrategia.objetivo_estrategico', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(estrategia, "objetivo_estrategico", rules);
            });

            estrategia.form.readonly = {};
            estrategia.createForm(data, mode, defaultData);

        }
    };

    estrategia.relateditems = async function (id) {
        estrategia.dataValuesIDs = [];
        estrategia.pestaDvaluesIDs = [];
        estrategia.dataValues = await getRelationData('estrategia_foda', "estrategia", id);
        estrategia.pestaDvalues = await getRelationData('estrategia_pesta', 'estrategia', id);
        for (var i of estrategia.dataValues) {
            estrategia.dataValuesIDs.push(i.foda);
        }
        for (var i of estrategia.pestaDvalues) {
            estrategia.pestaDvaluesIDs.push(i.pesta);
        }
    };
});
