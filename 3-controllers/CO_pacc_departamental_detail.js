app.controller("pacc_departamental_detail", function ($scope, $http, $compile) {
    pacc_departamental_detail = this;
    pacc_departamental_detail.session = new SESSION().current();
    pacc_departamental_detail.fixFilters = [];
    //pacc_departamental_detail.singular = "singular";
    //pacc_departamental_detail.plural = "plural";
    //pacc_departamental_detail.headertitle = "Hola Title";
    //pacc_departamental_detail.destroyForm = false;
    //pacc_departamental_detail.permissionTable = "tabletopermission";
    if (typeof aprobacion_mae !== 'undefined') {
        if (typeof aprobacion_mae !== 'not defined') {
            if (aprobacion_mae) {
                pacc_departamental_detail.fixFilters = [
                    {
                        "field": "pacc_departamento",
                        "value": aprobacion_mae.lista_pacc_c
                    }
                ]
            }
        }
    }
    if (typeof aprobacion_digepres !== 'undefined') {
        if (typeof aprobacion_digepres !== 'not defined') {
            if (aprobacion_digepres) {
                pacc_departamental_detail.fixFilters = [
                    {
                        "field": "pacc_departamento",
                        "value": aprobacion_digepres.lista_pacc_c
                    }
                ]
            }
        }
    }
    if (typeof aprobacion_dgcp !== 'undefined') {
        if (typeof aprobacion_dgcp !== 'not defined') {
            if (aprobacion_dgcp) {
                pacc_departamental_detail.fixFilters = [
                    {
                        "field": "pacc_departamento",
                        "value": aprobacion_dgcp.lista_pacc_c
                    }
                ]
            }
        }
    }
    RUNCONTROLLER("pacc_departamental_detail", pacc_departamental_detail, $scope, $http, $compile);
    RUN_B("pacc_departamental_detail", pacc_departamental_detail, $scope, $http, $compile);
    if (typeof u_pacc_dept !== 'undefined') {
        if (typeof u_pacc_dept !== 'not defined') {
            if (u_pacc_dept) {
                if (u_pacc_dept.rawestatus > 2) {
                    if (Deleted == 1) {
                        pacc_departamental_detail.dont_comment = true;
                    } else {
                        pacc_departamental_detail.dont_comment = false;
                    }
                }

                pacc_departamental_detail.dont_show_me = true;

                // if (pacc_departamental_detail.Trimestre) {
                //     pacc_departamental_detail.fixFilters.push({
                //         "field": "value3",
                //         "value": pacc_departamental_detail.Trimestre
                //     });
                // }
            }
        }
    }
    if (typeof vw_pacc !== 'undefined') {
        if (typeof vw_pacc !== 'not defined') {
            if (vw_pacc) {
                if (Deleted == 1) {
                    pacc_departamental_detail.dont_comment = true;
                } else {
                    pacc_departamental_detail.dont_comment = false;
                }
                pacc_departamental_detail.dont_show_me = false;
            }
        }
    }
    if (typeof consolidacion !== 'undefined') {
        if (typeof consolidacion !== 'not defined') {
            if (consolidacion) {
                if (Deleted == 1) {
                    pacc_departamental_detail.dont_comment = true;
                } else {
                    pacc_departamental_detail.dont_comment = false;
                }
            }
        }
    }
    if (typeof unificacion !== 'undefined') {
        if (typeof unificacion !== 'not defined') {
            if (unificacion) {
                pacc_departamental_detail.dont_comment = false;
                if (unificacion.rawestatus > 3) {
                    pacc_departamental_detail.dont_show_me = true;
                } else {
                    if (unificacion.lastprofile == pacc_departamental_detail.session.groups[0].id){
                        pacc_departamental_detail.dont_show_me = true;
                    }else {
                        pacc_departamental_detail.dont_show_me = false;
                    }
                }
            }
        }
    }
    $scope.$watch("pacc_departamental_detail.detail_comentario", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(pacc_departamental_detail, 'detail_comentario', rules);
    });
    pacc_departamental_detail.formulary = function (data, mode, defaultData) {
        if (pacc_departamental_detail !== undefined) {
            pacc_departamental_detail.form.modalWidth = ENUM.modal.width.full;
            pacc_departamental_detail.form.readonly = {};
            pacc_departamental_detail.createForm(data, mode, defaultData);
            $scope.$watch("pacc_departamental_detail.pacc_departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'pacc_departamento', rules);
            });
            $scope.$watch("pacc_departamental_detail.unidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'unidad', rules);
            });
            $scope.$watch("pacc_departamental_detail.cuatrimestre_1", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'cuatrimestre_1', rules);
            });
            $scope.$watch("pacc_departamental_detail.cuatrimestre_2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'cuatrimestre_2', rules);
            });
            $scope.$watch("pacc_departamental_detail.cuatrimestre_3", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'cuatrimestre_3', rules);
            });
            $scope.$watch("pacc_departamental_detail.estatus", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'estatus', rules);
            });
            $scope.$watch("pacc_departamental_detail.cbs", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'cbs', rules);
            });
            $scope.$watch("pacc_departamental_detail.familia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'familia', rules);
            });
            $scope.$watch("pacc_departamental_detail.precio_unitario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'precio_unitario', rules);
            });
            $scope.$watch("pacc_departamental_detail.costo_total", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'costo_total', rules);
            });
            $scope.$watch("pacc_departamental_detail.costo_total_real", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'costo_total_real', rules);
            });
            $scope.$watch("pacc_departamental_detail.procedimiento_seleccion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'procedimiento_seleccion', rules);
            });
            //ms_product.selectQueries['fuente_financiamiento'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("pacc_departamental_detail.fuente_financiamiento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'fuente_financiamiento', rules);
            });
            $scope.$watch("pacc_departamental_detail.valor_adquirido", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'valor_adquirido', rules);
            });
            $scope.$watch("pacc_departamental_detail.observacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'observacion', rules);
            });
            $scope.$watch("pacc_departamental_detail.actividad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'actividad', rules);
            });
            $scope.$watch("pacc_departamental_detail.actividad_apoyo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental_detail, 'actividad_apoyo', rules);
            });
        }
    };
    pacc_departamental_detail.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        if (typeof aprobacion_mae !== 'undefined') {
            if (typeof aprobacion_mae !== 'not defined') {
                if (aprobacion_mae) {
                    aprobacion_mae.pacc_d_cantidad = records.totalPage;
                    aprobacion_mae.refreshAngular();
                }
            }
        }
    };
    // pacc_departamental_detail.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //
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
    pacc_departamental_detail.save_coment = async function () {
        VALIDATION.save(pacc_departamental_detail, async function () {
            SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
            var rs = await BASEAPI.insertIDp('comentarios', {
                "comentario": pacc_departamental_detail.detail_comentario,
                "type": ENUM_2.tipo_comentario.Pacc_departamental_detail,
                "created_by": pacc_departamental_detail.session.usuario_id,
                "value": pacc_departamental_detail.id,
                "value2": pacc_departamental_detail.revision ? pacc_departamental_detail.revision : "$null",
                "value3": pacc_departamental_detail.Trimestre ? pacc_departamental_detail.Trimestre : "$null"
            }, '', '');
            if (typeof u_pacc_dept != "undefined") {
                if (typeof u_pacc_dept !== 'not defined') {
                    if (u_pacc_dept) {
                        if (pacc_departamental_detail.Trimestre) {
                            pacc_departamental_detail.refreshAngular();
                            vw_comentarios_pacc_dept_detail.refresh();
                            SWEETALERT.stop();
                        } else {
                            if (vw_pacc) {
                                BASEAPI.updateall('pacc_departamental_detail', {
                                    observacion: pacc_departamental_detail.revision ? 1 : "$null",
                                    where: [{
                                        field: "id",
                                        value: pacc_departamental_detail.id
                                    }]
                                }, function (result) {

                                });
                            } else if (typeof unificacion !== 'undefined') {
                                if (typeof unificacion !== 'not defined') {
                                    if (unificacion) {
                                        BASEAPI.updateall('pacc_departamental_detail', {
                                            observacion: pacc_departamental_detail.revision ? 1 : "$null",
                                            where: [{
                                                field: "id",
                                                value: pacc_departamental_detail.id
                                            }]
                                        }, function (result) {

                                        });
                                    }
                                }
                            } else {
                                BASEAPI.updateall('pacc_departamental_detail', {
                                    observacion: pacc_departamental_detail.revision ? 1 : Revision == "1" ? 2 : Revision,
                                    where: [{
                                        field: "id",
                                        value: pacc_departamental_detail.id
                                    }]
                                }, function (result) {

                                });
                            }
                            pacc_departamental_detail.detail_comentario = "";
                            pacc_departamental_detail.refreshAngular();
                            if (vw_comentarios_pacc_dept_detail)
                                vw_comentarios_pacc_dept_detail.refresh();
                            MODAL.close();
                            u_pacc_dept.refresh();
                        }
                    } else {
                        BASEAPI.updateall('pacc_departamental_detail', {
                            observacion: pacc_departamental_detail.revision ? 1 : "$null",
                            where: [{
                                field: "id",
                                value: pacc_departamental_detail.id
                            }]
                        }, function (result) {
                            if (typeof vw_pacc !== 'undefined') {
                                if (typeof vw_pacc !== 'not defined') {
                                    if (vw_pacc) {
                                        if (pacc_departamental_detail.revision) {
                                            vw_pacc.selectQueries['pacc_departamento_estatus'] = [
                                                {
                                                    "field": "id",
                                                    "operator": "!=",
                                                    "value": 4
                                                },
                                            ];
                                            vw_pacc.form.loadDropDown('pacc_departamento_estatus');
                                        } else {
                                            vw_pacc.selectQueries['pacc_departamento_estatus'] = [];
                                            vw_pacc.form.loadDropDown('pacc_departamento_estatus');
                                        }
                                    }
                                }
                            }
                        })
                    }
                } else {
                    BASEAPI.updateall('pacc_departamental_detail', {
                        observacion: pacc_departamental_detail.revision ? 1 : "$null",
                        where: [{
                            field: "id",
                            value: pacc_departamental_detail.id
                        }]
                    }, function (result) {
                        if (typeof vw_pacc !== 'undefined') {
                            if (typeof vw_pacc !== 'not defined') {
                                if (vw_pacc) {
                                    if (pacc_departamental_detail.revision) {
                                        vw_pacc.selectQueries['pacc_departamento_estatus'] = [
                                            {
                                                "field": "id",
                                                "operator": "!=",
                                                "value": 4
                                            },
                                        ];
                                        vw_pacc.form.loadDropDown('pacc_departamento_estatus');
                                    } else {
                                        vw_pacc.selectQueries['pacc_departamento_estatus'] = [];
                                        vw_pacc.form.loadDropDown('pacc_departamento_estatus');
                                    }
                                }
                            }
                        }
                    })
                }
            } else {
                BASEAPI.updateall('pacc_departamental_detail', {
                    observacion: pacc_departamental_detail.revision ? 1 : "$null",
                    where: [{
                        field: "id",
                        value: pacc_departamental_detail.id
                    }]
                }, function (result) {
                    if (typeof vw_pacc !== 'undefined') {
                        if (typeof vw_pacc !== 'not defined') {
                            if (vw_pacc) {
                                if (pacc_departamental_detail.revision) {
                                    vw_pacc.selectQueries['pacc_departamento_estatus'] = [
                                        {
                                            "field": "id",
                                            "operator": "!=",
                                            "value": 4
                                        },
                                    ];
                                    vw_pacc.form.loadDropDown('pacc_departamento_estatus');
                                } else {
                                    vw_pacc.selectQueries['pacc_departamento_estatus'] = [];
                                    vw_pacc.form.loadDropDown('pacc_departamento_estatus');
                                }
                            }
                        }
                    }
                })
            }
            if (rs.data) {
                if (rs.data.data)
                    if (rs.data.data[0])
                        if (rs.data.data[0].id) {
                            SWEETALERT.stop();
                            pacc_departamental_detail.detail_comentario = "";
                            if (pacc_departamental_detail.revision) {
                                pacc_departamental_detail.revision = false;
                                checkboxpacc_departamental_detail_revision.setPosition(2);
                            }
                            if (typeof vw_pacc_departamental_detail !== "undefined")
                                vw_pacc_departamental_detail.refreshAngular();
                            vw_comentarios_pacc_dept_detail.refresh();
                            if (typeof vw_pacc_departamental_detail !== "undefined")
                                vw_pacc_departamental_detail.refresh();
                            MODAL.close();
                        }
                if (typeof vw_comentarios_pacc_dept_detail != "undefined") {
                    if (vw_comentarios_pacc_dept_detail) {
                        if (typeof vw_comentarios_pacc_dept_detail !== 'not defined') {
                            vw_comentarios_pacc_dept_detail.refresh();
                        }
                    }
                }
                if (typeof vw_pacc_departamental_detail != "undefined") {
                    if (vw_pacc_departamental_detail) {
                        if (typeof vw_pacc_departamental_detail !== 'not defined') {
                            vw_pacc_departamental_detail.refresh();
                        }
                    }
                }
            }
        }, ["detail_comentario"]);
    }
});
