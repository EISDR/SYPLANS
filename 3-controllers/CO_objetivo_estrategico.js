app.controller("objetivo_estrategico", function ($scope, $http, $compile) {
    objetivo_estrategico = this;
    var user = new SESSION().current();
    objetivo_estrategico.refreshed = false;
    objetivo_estrategico.refreshed_pro = false;
    objetivo_estrategico.lista_end = [];
    objetivo_estrategico.current = user;
    objetivo_estrategico.enviar = [];
    objetivo_estrategico.publica = ENUM_2.COMPANY_TYPE.publica;
    objetivo_estrategico.session = user;
    objetivo_estrategico.do_me_only_once = false;
    objetivo_estrategico.have_sector = true;
    var validar = false;
    objetivo_estrategico.fixFilters = [
        {
            field: 'pei_id',
            operator: "=",
            value: new SESSION().current().estatus ? new SESSION().current().pei_id : 0
        }
    ];
    RUNCONTROLLER("objetivo_estrategico", objetivo_estrategico, $scope, $http, $compile);
    objetivo_estrategico.plural = "Objetivos Estratégicos Institucionales";
    objetivo_estrategico.singular = "Objetivo Estratégico Institucional";

    title_header_table_pei(objetivo_estrategico, MESSAGE.i('planificacion.titleObjetivoEstrategico'));
    getPEIstatus(objetivo_estrategico, user.pei_id);

    objetivo_estrategico.triggers.table.after.load = async function (records) {
        if (objetivo_estrategico.estatus_pei && objetivo_estrategico.condicion_pei == ENUM_2.pei_estatus.Inactivo) {
            objetivo_estrategico.setPermission("add", false);
        }
        if (objetivo_estrategico.estatus_pei && objetivo_estrategico.estatus_pei == ENUM_2.pei_estatus.Autorizado) {
            objetivo_estrategico.setPermission("add", false);
        }
        if (!objetivo_estrategico.session.sector_id) {
            objetivo_estrategico.have_sector = false;
            delete CRUD_objetivo_estrategico.table.columns.producto_terminal;
            delete CRUD_objetivo_estrategico.table.columns.productos_terminales;
        }
        if (user.tipo_institucion !== ENUM_2.COMPANY_TYPE.publica) {
            CRUD_objetivo_estrategico.table.columns.objetivo_end.visible = false;
            CRUD_objetivo_estrategico.table.columns.objetivo_end.visibleDetail = false;
            CRUD_objetivo_estrategico.table.columns.objetivo_end.export = false;
            CRUD_objetivo_estrategico.table.columns.objetivo_end.exportExample = false;
            CRUD_objetivo_estrategico.table.columns.objetivo_end.dead = true;
            CRUD_objetivo_estrategico.table.columns.objetivos_end.export = false;
            CRUD_objetivo_estrategico.table.columns.objetivos_end.exportExample = false;
            delete CRUD_objetivo_estrategico.table.columns.politica_gobierno;
            delete CRUD_objetivo_estrategico.table.columns.politicas_gobierno;
        }
        objetivo_estrategico.runMagicManyToMany('politica_gobierno', 'vw_politica_gobierno', 'objetivo_estrategico', 'id', 'nom_sec', 'objetivo_estrategico_politica_gobierno', 'politica_gobierno', 'id');
        objetivo_estrategico.runMagicManyToMany('objetivo_end', 'vw_objetivos_edt', 'objetivo_estrategico', 'id', 'final', 'objetivo_estrategico_oe_end', 'objetivo', 'id');
        objetivo_estrategico.runMagicOneToMany('objetivo_especifico', 'vw_objetivo_estrategico_especifico_grid', 'objetivo_estrategico', 'nombre_edt', 'id');
    };
    objetivo_estrategico.inuse = false;
    objetivo_estrategico.inusemessage = function () {
        if (objetivo_estrategico.inuse) {
            SWEETALERT.show({
                type: 'warning',
                message: "Eje estratégico NO PUEDE modificarse porque el Objetivo Estratégico Institucional posee Estrategias asociadas"
            });
        }
    };


    objetivo_estrategico.formulary = function (data, mode, defaultData) {
        if (objetivo_estrategico !== undefined) {
            RUN_B("objetivo_estrategico", objetivo_estrategico, $scope, $http, $compile);
            objetivo_estrategico.inuse = false;
            objetivo_estrategico.form.titles = {
                new: "Nuevo - " + objetivo_estrategico.singular,
                edit: "Editar - " + objetivo_estrategico.singular,
                view: "Ver ALL - " + objetivo_estrategico.singular
            };
            objetivo_estrategico.res = false;
            // objetivo_estrategico.form.before.update = function (data) {
            //     objetivo_estrategico.enviar = [];
            //     if (objetivo_estrategico.res)
            //         return false;
            //     objetivo_estrategico.res = true;
            //     objetivo_estrategico.alineacionoe = new Set(objetivo_estrategico.alineacionoe);
            //     for (value of objetivo_estrategico.alineacionoe) {
            //         objetivo_estrategico.enviar.push({
            //             'objetivo_estrategico': objetivo_estrategico.id,
            //             'objetivo': value,
            //         });
            //     }
            //     BASEAPI.deleteall('objetivo_estrategico_oe_end',
            //         [
            //             {
            //                 field: "objetivo_estrategico",
            //                 value: objetivo_estrategico.id
            //             }
            //         ]
            //         , function (result) {
            //         });
            //
            //     return false;
            // };

            objetivo_estrategico.form.readonly = {};

            objetivo_estrategico.form.schemas.insert['alineacionoe'] = FORM.schemasType.calculated;
            objetivo_estrategico.createForm(data, mode, defaultData);
            validar = false;
            objetivo_estrategico.triggers.table.after.close = function (data) {
                //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
                objetivo_estrategico.do_me_only_once = false;
                objetivo_estrategico.refreshed = false;
                objetivo_estrategico.refreshed_pro = false;
            };
            objetivo_estrategico.triggers.table.after.control = function (data) {
                if (data === "eje_estrategico") {
                    if (validar === false && mode === "edit" && objetivo_estrategico.id !== undefined) {
                        validar = true;
                        BASEAPI.list('estrategia', {
                            limit: 0,
                            orderby: 'id',
                            order: "asc",
                            where: [{
                                "field": "eje_estrategico",
                                "value": objetivo_estrategico.eje_estrategico
                            },
                                {
                                    "field": "objetivo_estrategico",
                                    "value": objetivo_estrategico.id
                                }
                            ]
                        }, function (result) {
                            if (result.data.length > 0) {
                                objetivo_estrategico.inuse = true;
                                objetivo_estrategico.form.options.eje_estrategico.disabled = true;
                            }
                            objetivo_estrategico.refreshAngular();
                        });
                        BASEAPI.list('objetivo_estrategico_oe_end', {
                            limit: 0,
                            orderby: 'objetivo',
                            order: "asc",
                            where: [{
                                "field": "eje_estrategico_id",
                                "value": objetivo_estrategico.eje_estrategico
                            },
                                {
                                    "field": "objetivo_estrategico",
                                    "value": objetivo_estrategico.id
                                }
                            ]
                        }, function (result) {
                            if (result.data.length > 0) {
                                for (var value of result.data) {
                                    objetivo_estrategico.alineacionoe.push(value.objetivo);
                                }
                            }
                            objetivo_estrategico.refreshAngular();
                        });
                    }
                }
                if (data === "alineacionoe") {
                    var lista_ends = [];
                    objetivo_estrategico.lista_end = [];
                    if (objetivo_estrategico.alineacionoe.length > 0) {
                        VALIDATION.validate(objetivo_estrategico, "alineacionoe", [{
                            valid: (!DSON.oseaX0(objetivo_estrategico.alineacionoe) && objetivo_estrategico.alineacionoe !== "[NULL]"),
                            message: MESSAGE.i('validations.Fieldisrequired'),
                            type: VALIDATION.types.error,
                            visible: false
                        }]);
                    }
                    if (objetivo_estrategico.form.selected('eje_estrategico')) {
                        if (objetivo_estrategico.form.selected('eje_estrategico').lista_ends) {
                            lista_ends = eval(objetivo_estrategico.form.selected('eje_estrategico').lista_ends);
                            objetivo_estrategico.lista_end = lista_ends;
                            objetivo_estrategico.selectQueries["alineacionoe"] = [
                                {
                                    field: "end",
                                    value: lista_ends
                                },
                                {
                                    field: "pei",
                                    value: user.pei_id
                                }
                            ];
                            if (!objetivo_estrategico.refreshed) {
                                console.log("Entre", objetivo_estrategico.refreshed);
                                objetivo_estrategico.form.loadDropDown('alineacionoe')
                                objetivo_estrategico.refreshed = true;
                            } else {
                                console.log("Entre", objetivo_estrategico.refreshed);
                            }
                        } else {
                            objetivo_estrategico.selectQueries["alineacionoe"] = [
                                {
                                    field: "id",
                                    value: -1
                                }
                            ];
                            if (!objetivo_estrategico.refreshed) {
                                console.log("Entre", objetivo_estrategico.refreshed);
                                objetivo_estrategico.form.loadDropDown('alineacionoe')
                                objetivo_estrategico.refreshed = true;
                            }
                        }
                    } else {
                        objetivo_estrategico.selectQueries["alineacionoe"] = [
                            {
                                field: "id",
                                value: -1
                            }
                        ];
                        if (!objetivo_estrategico.refreshed) {
                            console.log("Entre", objetivo_estrategico.refreshed);
                            objetivo_estrategico.form.loadDropDown('alineacionoe')
                            objetivo_estrategico.refreshed = true;
                        }
                    }
                }
                if (data === "productos_terminales") {
                    var lista_objetivos_sectoriales = [];
                    if (objetivo_estrategico.form.selected('eje_estrategico')) {
                        if (objetivo_estrategico.form.selected('eje_estrategico').lista_objetivos_sectoriales) {
                            lista_objetivos_sectoriales = eval(objetivo_estrategico.form.selected('eje_estrategico').lista_objetivos_sectoriales);
                            objetivo_estrategico.lista_objetivos_sectoriales = lista_objetivos_sectoriales;
                            objetivo_estrategico.selectQueries["productos_terminales"] = [
                                {
                                    field: "objetivo_sectorial",
                                    value: lista_objetivos_sectoriales
                                }
                            ];
                            if (!objetivo_estrategico.refreshed_pro) {
                                console.log("Entre", objetivo_estrategico.refreshed_pro);
                                objetivo_estrategico.form.loadDropDown('productos_terminales')
                                objetivo_estrategico.refreshed_pro = true;
                            }
                        } else {
                            objetivo_estrategico.selectQueries["productos_terminales"] = [];
                            if (!objetivo_estrategico.refreshed_pro) {
                                objetivo_estrategico.form.loadDropDown('productos_terminales')
                                objetivo_estrategico.refreshed_pro = true;
                            }
                        }
                    }
                }
            };

            objetivo_estrategico.selectQueries["eje_estrategico"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                }

            ];

            objetivo_estrategico.$scope.$watch('objetivo_estrategico.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(objetivo_estrategico, "nombre", rules);

            });

            objetivo_estrategico.$scope.$watch('objetivo_estrategico.eje_estrategico', function (value) {
                var lista_ends = [];
                objetivo_estrategico.lista_end = [];
                if (objetivo_estrategico.form.selected('eje_estrategico')) {
                    if (objetivo_estrategico.form.selected('eje_estrategico').lista_ends) {
                        lista_ends = eval(objetivo_estrategico.form.selected('eje_estrategico').lista_ends);
                        objetivo_estrategico.lista_end = lista_ends;
                        objetivo_estrategico.selectQueries["alineacionoe"] = [
                            {
                                field: "end",
                                value: lista_ends
                            },
                            {
                                field: "pei",
                                value: user.pei_id
                            }
                        ];
                    } else {
                        objetivo_estrategico.selectQueries["alineacionoe"] = [
                            {
                                field: "id",
                                value: -1
                            }
                        ];
                    }
                } else {
                    objetivo_estrategico.selectQueries["alineacionoe"] = [
                        {
                            field: "id",
                            value: -1
                        }
                    ];
                }
                var lista_objetivos_sectoriales = [];
                if (objetivo_estrategico.form.selected('eje_estrategico')) {
                    if (objetivo_estrategico.form.selected('eje_estrategico').lista_objetivos_sectoriales) {
                        lista_objetivos_sectoriales = eval(objetivo_estrategico.form.selected('eje_estrategico').lista_objetivos_sectoriales);
                        objetivo_estrategico.lista_objetivos_sectoriales = lista_objetivos_sectoriales;
                        objetivo_estrategico.selectQueries["productos_terminales"] = [
                            {
                                field: "objetivo_sectorial",
                                value: lista_objetivos_sectoriales
                            }
                        ];
                    } else {
                        objetivo_estrategico.selectQueries["productos_terminales"] = [];
                    }
                }
                objetivo_estrategico.alineacionoe = [];
                objetivo_estrategico.form.loadDropDown('alineacionoe');
                objetivo_estrategico.form.loadDropDown('productos_terminales');
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_estrategico, "eje_estrategico", rules);
            });

            objetivo_estrategico.$scope.$watch('objetivo_estrategico.alineacionoe', function (value) {
                var rules = [];
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_estrategico, "alineacionoe", rules);
            });

            objetivo_estrategico.$scope.$watch('objetivo_estrategico.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(objetivo_estrategico, "descripcion", rules)
            });
        }
    };

});
