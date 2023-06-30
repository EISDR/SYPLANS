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
        if (typeof riesgo != "undefined") {
            if (riesgo) {
                if (typeof riesgo !== 'not defined') {
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
                    reporte_indicadores.entidadobj = await BASEAPI.firstp('vw_indicador_generico_entidad', {
                        where: [{
                            field: "table_",
                            value: indicador_generico2.indicador_generico_entidad
                        }]
                    });
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
                    reporte_indicadores.refresh();
                }
            }
        }
    });
});
