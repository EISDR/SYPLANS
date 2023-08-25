app.controller("vw_comentarios", function ($scope, $http, $compile) {
    vw_comentarios = this;
    //vw_comentarios.fixFilters = [];
    //vw_comentarios.singular = "singular";
    //vw_comentarios.plural = "plural";
    vw_comentarios.headertitle = "Comentarios";
    vw_comentarios.destroyForm = false;
    //vw_comentarios.permissionTable = "tabletopermission";
    vw_comentarios.session = new SESSION().current();
    vw_comentarios.group_caracteristica = vw_comentarios.session.groups[0] ? vw_comentarios.session.groups[0].caracteristica : "";
    RUNCONTROLLER("vw_comentarios", vw_comentarios, $scope, $http, $compile);
    if (typeof indicador_producto_poa_producto !== 'undefined') {
        if (typeof indicador_producto_poa_producto !== 'not defined') {
            if (indicador_producto_poa_producto && indicador_producto_poa_producto.ids) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actualizacion_indicadores_poa_producto
                    },
                    {
                        "field": "value",
                        "value": indicador_producto_poa_producto.ids
                    },
                    {
                        "field": "value2",
                        "value": indicador_producto_poa_producto.value2
                    }
                ];
            }
        }
    }
    if (typeof indicador_producto_poa_proceso !== 'undefined') {
        if (typeof indicador_producto_poa_proceso !== 'not defined') {
            if (indicador_producto_poa_proceso && indicador_producto_poa_proceso.ids) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actualizacion_indicadores_poa_proceso
                    },
                    {
                        "field": "value",
                        "value": indicador_producto_poa_proceso.ids
                    },
                    {
                        "field": "value2",
                        "value": indicador_producto_poa_proceso.value2
                    }
                ];
            }
        }
    }
    if (typeof indicador_resultado_pei !== 'undefined') {
        if (typeof indicador_resultado_pei !== 'not defined') {
            if (indicador_resultado_pei && indicador_resultado_pei.ids) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actualizacion_indicadores_pei
                    },
                    {
                        "field": "value",
                        "value": indicador_resultado_pei.ids
                    },
                    {
                        "field": "value2",
                        "value": indicador_resultado_pei.indicador_pei
                    }
                ];
            }
        }
    }
    if (typeof presupuesto_aprobado !== 'undefined') {
        if (typeof presupuesto_aprobado !== 'not defined') {
            if (presupuesto_aprobado) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": 20
                    },
                    {
                        "field": "value",
                        "value": presupuesto_aprobado.id_for_comment
                    }
                ];
            }
        }
    }
    if (typeof indicador_producto_poa !== 'undefined') {
        if (typeof indicador_producto_poa !== 'not defined') {
            if (indicador_producto_poa && indicador_producto_poa.ids) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actualizacion_indicadores_poa
                    },
                    {
                        "field": "value",
                        "value": indicador_producto_poa.ids
                    },
                    {
                        "field": "value2",
                        "value": indicador_producto_poa.value2
                    }
                ];
            }
        }
    }
    if (typeof indicador_generico_poa !== 'undefined') {
        if (typeof indicador_generico_poa !== 'not defined') {
            if (indicador_generico_poa && indicador_generico_poa.ids) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": [
                            ENUM_2.tipo_comentario.Actualizacion_indicadores_poa_generico,
                            ENUM_2.tipo_comentario.Actualizacion_indicadores_poa_proceso
                        ]
                    },
                    {
                        "field": "value",
                        "value": indicador_generico_poa.edit
                    },
                    {
                        "field": "value2",
                        "value": indicador_generico_poa.indicador_generico_object.id
                    }
                ];
            }
        }
    }
    if (typeof indicador_producto_poa_actividad !== 'undefined') {
        if (typeof indicador_producto_poa_actividad !== 'not defined') {
            if (indicador_producto_poa_actividad && indicador_producto_poa_actividad.ids) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actualizacion_indicadores_poa_actividad
                    },
                    {
                        "field": "value",
                        "value": indicador_producto_poa_actividad.ids
                    },
                    {
                        "field": "value2",
                        "value": indicador_producto_poa_actividad.value2
                    }
                ];
            }
        }
    }
    if (typeof mega_indicadores_pei !== 'undefined') {
        if (typeof mega_indicadores_pei !== 'not defined') {
            if (mega_indicadores_pei && mega_indicadores_pei.ids2) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actualizacion_indicadores_pei
                    },
                    {
                        "field": "value",
                        "value": mega_indicadores_pei.periodo
                    },
                    {
                        "field": "value2",
                        "value": mega_indicadores_pei.ids2
                    }
                ];
            }
        }
    }
    if (typeof mega_indicadores_poa !== 'undefined') {
        if (typeof mega_indicadores_poa !== 'not defined') {
            if (mega_indicadores_poa && mega_indicadores_poa.ids2) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actualizacion_indicadores_poa
                    },
                    {
                        "field": "value",
                        "value": mega_indicadores_poa.periodo
                    },
                    {
                        "field": "value2",
                        "value": mega_indicadores_poa.ids2
                    }
                ];
            }
        }
    }
    if (typeof vw_mega_indicadores_actividad !== 'undefined') {
        if (typeof vw_mega_indicadores_actividad !== 'not defined') {
            if (vw_mega_indicadores_actividad && vw_mega_indicadores_actividad.ids2) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actualizacion_indicadores_poa_actividad
                    },
                    {
                        "field": "value",
                        "value": vw_mega_indicadores_actividad.periodo
                    },
                    {
                        "field": "value2",
                        "value": vw_mega_indicadores_actividad.ids2
                    }
                ];
            }
        }
    }
    if (typeof riesgo !== 'undefined') {
        if (typeof riesgo !== 'not defined') {
            if (riesgo) {
                vw_comentarios.headertitle = "Evaluaciones";
                vw_comentarios.riesgo_id = Row_id ? Row_id : null;
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": 21
                    },
                    {
                        "field": "value",
                        "value": vw_comentarios.riesgo_id
                    }
                ]
            }
        }
    }
    if (typeof consolidacion !== 'undefined') {
        if (typeof consolidacion !== 'not defined') {
            if (consolidacion) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": 15
                    },
                    {
                        "field": "value",
                        "value": consolidacion.id
                    }
                ]
            }
        }
    }
    if (typeof unificacion !== 'undefined') {
        if (typeof unificacion !== 'not defined') {
            if (unificacion) {
                vw_comentarios.fixFilters = [
                    {
                        "field": "type",
                        "value": 15
                    },
                    {
                        "field": "value",
                        "value": unificacion.id
                    }
                ]
            }
        }
    }
    if (typeof aprobacion_mae !== 'undefined') {
        if (typeof aprobacion_mae !== 'not defined') {
            if (aprobacion_mae) {
                if (aprobacion_mae.lista_pacc_d) {
                    vw_comentarios.fixFilters = [
                        {
                            "field": "type",
                            "value": [14]
                        },
                        {
                            "field": "value",
                            "value": aprobacion_mae.lista_pacc_d
                        }
                    ]
                } else {
                    vw_comentarios.fixFilters = [
                        {
                            "field": "type",
                            "value": 15
                        },
                        {
                            "field": "value",
                            "value": aprobacion_mae.id
                        }
                    ]
                }
            }
        }
    }
    if (typeof aprobacion_digepres !== 'undefined') {
        if (typeof aprobacion_digepres !== 'not defined') {
            if (aprobacion_digepres) {
                if (aprobacion_digepres.lista_pacc_d) {
                    vw_comentarios.fixFilters = [
                        {
                            "field": "type",
                            "value": [14]
                        },
                        {
                            "field": "value",
                            "value": aprobacion_digepres.lista_pacc_d
                        }
                    ]
                } else {
                    vw_comentarios.fixFilters = [
                        {
                            "field": "type",
                            "value": 15
                        },
                        {
                            "field": "value",
                            "value": aprobacion_digepres.id
                        }
                    ]
                }
            }
        }
    }
    if (typeof aprobacion_dgcp !== 'undefined') {
        if (typeof aprobacion_dgcp !== 'not defined') {
            if (aprobacion_dgcp) {
                if (aprobacion_dgcp.lista_pacc_d) {
                    vw_comentarios.fixFilters = [
                        {
                            "field": "type",
                            "value": [14]
                        },
                        {
                            "field": "value",
                            "value": aprobacion_dgcp.lista_pacc_d
                        }
                    ]
                } else {
                    vw_comentarios.fixFilters = [
                        {
                            "field": "type",
                            "value": 15
                        },
                        {
                            "field": "value",
                            "value": aprobacion_dgcp.id
                        }
                    ]
                }
            }
        }
    }
    vw_comentarios.formulary = function (data, mode, defaultData) {
        if (vw_comentarios !== undefined) {
            RUN_B("vw_comentarios", vw_comentarios, $scope, $http, $compile);
            vw_comentarios.form.modalWidth = ENUM.modal.width.full;
            vw_comentarios.form.readonly = {};
            vw_comentarios.createForm(data, mode, defaultData);
            $scope.$watch("vw_comentarios.comentario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(vw_comentarios, 'comentario', rules);
            });
            $scope.$watch("vw_comentarios.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios, 'type', rules);
            });
            $scope.$watch("vw_comentarios.value", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios, 'value', rules);
            });
            $scope.$watch("vw_comentarios.usuario_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios, 'usuario_nombre', rules);
            });
            $scope.$watch("vw_comentarios.value2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios, 'value2', rules);
            });
        }
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
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //     resolve(true);
    // });
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
