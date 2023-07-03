app.controller("indicador_generico2", function ($scope, $http, $compile) {
    indicador_generico2 = this;
    indicador_generico2.destroyForm = false;
    indicador_generico2.myfirsttime = 0;
    RUNCONTROLLER("indicador_generico2", indicador_generico2, $scope, $http, $compile);
    RUN_B("indicador_generico2", indicador_generico2, $scope, $http, $compile);
    if (typeof riesgo != "undefined") {
        if (riesgo) {
            if (typeof riesgo !== 'not defined') {
                indicador_generico2.selectQueries['evento_indicador'] = [
                    {
                        "field": "compania",
                        "value": indicador_generico.session.compania_id
                    },
                    {
                        "field": "tipo",
                        "value": [1, 3, 5]
                    }
                ];
            }
        }
    }
    indicador_generico2.$scope.$watch('indicador_generico2.evento_indicador', async function (value) {
        if (indicador_generico2.myfirsttime > 0) {
            STORAGE.add('evento', indicador_generico2.evento_indicador);
        }
        indicador_generico2.myfirsttime++
        if (typeof indicador_generico != "undefined") {
            if (indicador_generico) {
                if (typeof indicador_generico !== 'not defined') {
                    if (value.includes('r')) {
                        indicador_generico.fixFilters = [
                            {
                                "field": "table_",
                                "value": 11
                            },
                            {
                                "field": "registro",
                                "value": value.replaceAll('r', '')
                            },
                            {
                                "field": "related",
                                "value": 1
                            },
                            {
                                "field": "compania",
                                "value": indicador_generico.session.compania_id
                            }
                        ];
                        indicador_generico.refresh();
                    } else if (value.includes('s')) {
                        indicador_generico.fixFilters = [
                            {
                                "field": "table_",
                                "value": 11
                            },
                            {
                                "field": "registro",
                                "value": value.replaceAll('s', '')
                            },
                            {
                                "field": "related",
                                "value": 2
                            },
                            {
                                "field": "compania",
                                "value": indicador_generico.session.compania_id
                            }
                        ];
                        indicador_generico.refresh();
                    } else if (value.includes('g')) {
                        indicador_generico.fixFilters = [
                            {
                                "field": "table_",
                                "value": 11
                            },
                            {
                                "field": "registro",
                                "value": value.replaceAll('g', '')
                            },
                            {
                                "field": "related",
                                "value": 3
                            },
                            {
                                "field": "compania",
                                "value": indicador_generico.session.compania_id
                            }
                        ];
                        indicador_generico.refresh();
                    } else {
                        indicador_generico.fixFilters = [
                            {
                                "field": "table_",
                                "value": 11
                            },
                            {
                                "field": "registro",
                                "value": value
                            },
                            {
                                "field": "related",
                                "value": 0
                            },
                            {
                                "field": "compania",
                                "value": indicador_generico.session.compania_id
                            }
                        ];
                        indicador_generico.refresh();
                    }
                }
            }
        }
    });
    indicador_generico2.$scope.$watch('indicador_generico2.indicador_generico_entidad', async function (value) {
        if (typeof reporte_indicadores != "undefined") {
            if (reporte_indicadores) {
                if (typeof reporte_indicadores !== 'not defined') {
                    indicador_generico2.year = null;
                    if (indicador_generico2.indicador_generico_entidad == 'vw_mods'){
                        indicador_generico2.selectQueries['year'] = []
                    }else {
                        indicador_generico2.selectQueries['year'] = [
                            {
                                field: "compania",
                                value: reporte_indicadores.session.compania_id
                            }
                        ]

                    }
                    indicador_generico2.form.loadDropDown('year');
                }
            }
        }
    });
    indicador_generico2.search = async function () {
        if (typeof reporte_indicadores != "undefined") {
            if (reporte_indicadores) {
                if (typeof reporte_indicadores !== 'not defined') {
                    reporte_indicadores.entidadobj = await BASEAPI.firstp('vw_indicador_generico_entidad', {
                        where: [{
                            field: "table_",
                            value: indicador_generico2.indicador_generico_entidad
                        }]
                    });
                    if (indicador_generico2.indicador_generico_entidad == 'vw_mods') {
                        reporte_indicadores.fixFilters = [
                            {
                                "field": "table_",
                                "value": reporte_indicadores.entidadobj ? reporte_indicadores.entidadobj.id : -1
                            }
                        ];
                        if (indicador_generico2.year){
                            reporte_indicadores.fixFilters.push(
                                {
                                    field: "ano",
                                    operator: "=",
                                    value: indicador_generico2.year
                                }
                            )
                        }
                    } else{
                        reporte_indicadores.fixFilters = [
                            {
                                "field": "table_",
                                "value": reporte_indicadores.entidadobj ? reporte_indicadores.entidadobj.id : -1
                            },
                            {
                                "field": "compania",
                                "value": reporte_indicadores.session.compania_id
                            }
                        ];
                        if (indicador_generico2.year){
                            reporte_indicadores.fixFilters.push(
                                {
                                    field: "ano",
                                    operator: "=",
                                    value: indicador_generico2.year
                                }
                            )
                        }
                    }
                    reporte_indicadores.fixFlters = reporte_indicadores.where_filters;
                    reporte_indicadores.refresh();
                }
            }
        }
    }
});
