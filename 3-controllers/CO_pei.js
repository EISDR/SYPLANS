app.controller("pei", function ($scope, $http, $compile) {
    pei = this;

    pei.headertitle = "PEI";

    pei.permissionsAdd = function () {
        if (compania) {
            if (!compania.form.options.pei)
                return;
            BASEAPI.firstp('pei', {
                "where": [
                    {
                        field: compania.form.mode == "new" ? 'tempid' : 'compania',
                        value: compania.form.mode == "new" ? 'compania' + compania.form.options.pei.tempId : compania.id,
                    },
                    {
                        "field": "estatus",
                        "operator": "!=",
                        "value": ENUM_2.pei_estatus.Cerrado
                    }
                ]
            }).then(function (result) {
                if (typeof result != 'undefined') {
                    console.log(result);
                    pei.setPermission("add", false);
                } else {
                    console.log(result);
                    pei.setPermission("add", true);
                }
            });
        } else {
            if (!institucion.form.options.pei)
                return;
            BASEAPI.firstp('pei', {
                "where": [
                    {
                        field: institucion.form.mode == "new" ? 'tempid' : 'institucion',
                        value: institucion.form.mode == "new" ? 'institucion' + institucion.form.options.pei.tempId : institucion.id,
                    },
                    {
                        "field": "estatus",
                        "operator": "!=",
                        "value": ENUM_2.pei_estatus.Cerrado
                    }
                ]
            }).then(function (result) {
                if (typeof result != 'undefined') {
                    console.log(result);
                    pei.setPermission("add", false);
                } else {
                    console.log(result);
                    pei.setPermission("add", true);
                }
            });
        }
    };


    RUNCONTROLLER("pei", pei, $scope, $http, $compile);
    if (compania) {
        pei.fixFilters = [
            {
                "field": "institucion",
                "operator": "IS",
                "value": "$NULL"
            }
        ];
    }
    pei.triggers.table.after.load = function (records) {
        poa.refrescar();
    };
    if (compania) {
        if (compania.form.mode == "new") {
            if (typeof poa !== "undefined")
                if (poa)
                    poa.refrescar();
        }

    } else {
        if (institucion.form.mode == "new") {
            if (typeof poa !== "undefined")
                if (poa)
                    poa.refrescar();
        }

    }
    if (pei)
        pei.permissionsAdd();
    pei.triggers.table.after.insert = function (data) {
        pei.permissionsAdd();
    };
    pei.triggers.table.after.update = function (data) {
        pei.permissionsAdd();
    };
    pei.afterDelete = function (data) {
        pei.permissionsAdd();
    };

    pei.triggers.table.after.insert = function (data) {
        if (data.inserted.activo == 1) {
            SWEETALERT.loading({message: `Activando pei  ${data.inserted.nombre} ${data.inserted.periodo_desde} - ${data.inserted.periodo_hasta}...`});
            new SESSION().update(
                {
                    pei_id: data.inserted.id,
                    pei: data.inserted.nombre,
                    periodo_desde: data.inserted.periodo_desde,
                    periodo_hasta: data.inserted.periodo_hasta,
                    estatus: data.inserted.activo,
                    est_pei: data.inserted.estatus,
                    periodo_pei_msj: `PEI ${data.inserted.periodo_desde} - ${data.inserted.periodo_hasta}`,
                    poa_initial: 1
                });
            location.reload();
        }
    };
    pei.triggers.table.after.update = function (data) {
        if (data.updating.activo == 1) {
            SWEETALERT.loading({message: `Activando pei  ${data.updating.nombre} ${data.updating.periodo_desde} - ${data.updating.periodo_hasta}...`});
            new SESSION().update(
                {
                    pei_id: pei.id,
                    pei: data.updating.nombre,
                    periodo_desde: data.updating.periodo_desde,
                    periodo_hasta: data.updating.periodo_hasta,
                    estatus: data.updating.activo,
                    est_pei: data.updating.estatus,
                    periodo_pei_msj: `PEI ${data.updating.periodo_desde} - ${data.updating.periodo_hasta}`,
                    poa_initial: 1
                });
            location.reload();
        } else {
            if (session.pei_id == pei.id) {
                SWEETALERT.loading({message: `Desactivando pei  ${data.updating.nombre} ${data.updating.periodo_desde} - ${data.updating.periodo_hasta}...`});
                new SESSION().update(
                    {
                        pei_id: pei.id,
                        pei: data.updating.nombre,
                        periodo_desde: data.updating.periodo_desde,
                        periodo_hasta: data.updating.periodo_hasta,
                        estatus: data.updating.activo,
                        est_pei: data.updating.estatus,
                        periodo_pei_msj: `PEI ${data.updating.periodo_desde} - ${data.updating.periodo_hasta}`,
                    });
                location.reload();
            }
        }
    };
    pei.afterDelete = function (data) {
        if (session.pei_id == data.id) {
            SWEETALERT.loading({message: `Eliminando pei  ${data.nombre} ${data.periodo_desde} - ${data.periodo_hasta}...`});
            new SESSION().update(
                {
                    pei_id: "",
                    pei: "",
                    periodo_desde: "",
                    periodo_hasta: "",
                    estatus: "",
                    est_pei: "",
                    periodo_pei_msj: "",
                    poa_initial: 1

                });
            location.reload();
        }
        // pei.permissionsAdd();
    };

    pei.haspoa = false;
    pei.validatePOA = function (value) {
        if (value > 0) {
            pei.haspoa = true;
        } else {
            pei.haspoa = false;
        }
    };
    pei.plural = "PEI";
    pei.singular = "PEI";
    pei.colorSecunday = COLOR.secundary;
    pei.formulary = function (data, mode, defaultData) {

        if (pei !== undefined) {
            RUN_B("pei", pei, $scope, $http, $compile);
            pei.old_periodo_desde = "";
            pei.old_periodo_hasta = "";
            pei.form.titles = {
                new: MESSAGE.i('planificacion.titlepei'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titlepei')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titlepei')}`
            }

            pei.lista_ano = [];

            for (var a = 2018; a <= 3000; a++) {
                pei.lista_ano.push(a);
            }


            pei.form.readonly = {periodo_desde: pei.periodo_desde, periodo_hasta: pei.periodo_hasta};
            if (typeof institucion !== "undefined")
                if (institucion)
                    if (institucion.form) {
                        pei.form.readonly.compania = institucion.compania;
                    }
            pei.createForm(data, mode, defaultData);
            pei.verdad = true;
            pei.triggers.table.after.control = function (data) {
                console.log(mode, data);
                if (mode != 'new' && data == 'estatus') {
                    var desde = pei.periodo_desde;
                    pei.old_periodo_desde = desde;
                }
                if (mode != 'new' && data == 'estatus') {
                    var hasta = pei.periodo_hasta;
                    pei.old_periodo_hasta = hasta;
                }
                if (mode == 'new' && data == 'estatus') {
                    pei.estatus = "3";
                    pei.form.options.estatus.disabled = true;
                    pei.refreshAngular();
                }
                if (mode != 'new' && data == 'estatus') {
                    if (pei.estatus == ENUM_2.pei_estatus.Pendiente_a_autorizar.toString() || pei.estatus == ENUM_2.pei_estatus.Cerrado.toString()) {
                        pei.form.options.estatus.disabled = true;
                        pei.refreshAngular();
                    } else if (pei.verdad) {
                        pei.selectQueries["estatus"] = [
                            {
                                field: "id",
                                operator: "!=",
                                value: ENUM_2.pei_estatus.Pendiente_a_autorizar
                            }
                        ];
                        pei.verdad = false;
                        pei.form.loadDropDown('estatus');
                    }
                }
            };
            pei.res = false;
            pei.form.before.insert = function (data) {
                if (pei.res)
                    return false;
                pei.res = true;
                pei.response = [];


                var miwhere = {};
                if (!compania) {
                    miwhere = {
                        "where": [
                            {
                                "field": institucion.id == undefined ? "tempid" : "institucion",
                                "operator": "=",
                                "value": institucion.id == undefined ? 'institucion' + institucion.form.options.pei.tempId : institucion.id,
                            }
                        ]
                    };
                } else {
                    miwhere = {
                        "where": [
                            {
                                "field": compania.id == undefined ? "tempid" : "compania",
                                "operator": "=",
                                "value": compania.id == undefined ? 'compania' + compania.form.options.pei.tempId : compania.id,
                            },
                            {
                                "field": "institucion",
                                "operator": "IS",
                                "value": "$NULL"
                            }
                        ]
                    };
                }
                BASEAPI.list('pei', miwhere, function (result) {

                    pei.response = result.data;

                    pei.selected_activo = pei.response.filter(information => {
                        if (data.inserting.activo == true) {
                            return information.activo == 1;
                        }

                    });

                    pei.selected_periodo = pei.response.filter(information => {
                        if ((parseInt(pei.periodo_desde) >= information.periodo_desde && parseInt(pei.periodo_desde) <= information.periodo_hasta) ||
                            (parseInt(pei.periodo_hasta) >= information.periodo_desde && parseInt(pei.periodo_hasta) <= information.periodo_hasta)) {
                            return true;
                        } else if ((information.periodo_desde >= parseInt(pei.periodo_desde) && information.periodo_desde <= parseInt(pei.periodo_hasta)) &&
                            (information.periodo_hasta >= parseInt(pei.periodo_desde) && information.periodo_hasta <= parseInt(pei.periodo_hasta))) {
                            return true;
                        }
                    });


                    if (pei.selected_activo.length > 0) {

                        SWEETALERT.show({message: `Ya existe un PEI activo - ${pei.selected_activo[0].nombre}`});
                        pei.res = false;
                    } else if (pei.selected_periodo.length > 0) {
                        SWEETALERT.show({message: `Ya existe un periodo PEI dentro del rango especificado nombre: ` + pei.selected_periodo[0].nombre + ", periodo desde: " + pei.selected_periodo[0].periodo_desde + ", periodo hasta: " + pei.selected_periodo[0].periodo_hasta});
                        pei.res = false;
                    } else {
                        pei.form.saveAction();
                        SWEETALERT.stop();
                    }
                });

                return true;

            };


            pei.form.before.update = function (data) {
                if (pei.res)
                    return false;
                pei.res = true;
                pei.response = [];

                var miwhere = {};
                if (!compania) {
                    miwhere = {

                        "where": [
                            {
                                "field": institucion.id == undefined ? "tempid" : "institucion",
                                "operator": "=",
                                "value": institucion.id == undefined ? 'institucion' + institucion.form.options.pei.tempId : institucion.id,
                            },
                            {
                                "field": "id",
                                "operator": "!=",
                                "value": pei.id,
                            }
                        ]
                    };
                } else {
                    miwhere = {

                        "where": [
                            {
                                "field": compania.id == undefined ? "tempid" : "compania",
                                "operator": "=",
                                "value": compania.id == undefined ? 'compania' + compania.form.options.pei.tempId : compania.id,
                            },
                            {
                                "field": "id",
                                "operator": "!=",
                                "value": pei.id,
                            },
                            {
                                "field": "institucion",
                                "operator": "IS",
                                "value": "$NULL"
                            }
                        ]
                    };
                }
                BASEAPI.list('pei', miwhere, function (result) {
                    pei.response = result.data;

                    pei.selected_activo = pei.response.filter(information => {
                        if (data.updating.activo == true) {
                            return information.activo == 1;
                        }
                    });

                    pei.selected_periodo = pei.response.filter(information => {
                        if ((parseInt(pei.periodo_desde) >= information.periodo_desde && parseInt(pei.periodo_desde) <= information.periodo_hasta) ||
                            (parseInt(pei.periodo_hasta) >= information.periodo_desde && parseInt(pei.periodo_hasta) <= information.periodo_hasta)) {
                            return true;
                        } else if ((information.periodo_desde >= parseInt(pei.periodo_desde) && information.periodo_desde <= parseInt(pei.periodo_hasta)) &&
                            (information.periodo_hasta >= parseInt(pei.periodo_desde) && information.periodo_hasta <= parseInt(pei.periodo_hasta))) {
                            return true;
                        }
                    });


                    if (pei.selected_activo.length > 0) {
                        SWEETALERT.show({message: `Ya existe un PEI activo - ${pei.selected_activo[0].nombre}`});
                        pei.res = false;
                    } else if (pei.selected_periodo.length > 0) {
                        SWEETALERT.show({message: `Ya existe un periodo PEI dentro del rango especificado nombre: ` + pei.selected_periodo[0].nombre + ", periodo desde: " + pei.selected_periodo[0].periodo_desde + ", periodo hasta: " + pei.selected_periodo[0].periodo_hasta});
                        pei.res = false;
                    } else if ((pei.old_periodo_desde != pei.periodo_desde || pei.old_periodo_hasta != pei.periodo_hasta) && pei.haspoa) {
                        pei.periodo_desde = pei.old_periodo_desde;
                        pei.periodo_hasta = pei.old_periodo_hasta;
                        $('[name="periodo_desde"]').trigger('change');
                        $('[name="periodo_hasta"]').trigger('change');
                        SWEETALERT.show({message: `No se pudo aplicar este rango de fecha puesto que existe un POA creado dentro del rango anterior.`});
                        pei.res = false;
                    } else {
                        pei.form.saveAction();
                        SWEETALERT.stop();
                    }
                });

                return true;

            };

            pei.$scope.$watch('pei.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(pei, "nombre", rules)
            });

            pei.$scope.$watch('pei.periodo_desde', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.menorQue(pei.periodo_desde, pei.periodo_hasta, "El periodo desde", "periodo hasta"));
                VALIDATION.validate(pei, "periodo_desde", rules)

                var rules2 = [];
                rules2.push(VALIDATION.general.required(pei.periodo_hasta));
                rules2.push(VALIDATION.yariel.mayorQue(pei.periodo_hasta, pei.periodo_desde, "El periodo hasta", "periodo desde"));
                VALIDATION.validate(pei, "periodo_hasta", rules2)
            });

            pei.$scope.$watch('pei.periodo_hasta', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.mayorQue(pei.periodo_hasta, pei.periodo_desde, "El periodo hasta", "periodo desde"));
                VALIDATION.validate(pei, "periodo_hasta", rules)

                var rules2 = [];
                rules2.push(VALIDATION.general.required(pei.periodo_desde));
                rules2.push(VALIDATION.yariel.menorQue(pei.periodo_desde, pei.periodo_hasta, "El periodo desde", "periodo hasta"));
                VALIDATION.validate(pei, "periodo_desde", rules2)
            });

            pei.$scope.$watch('pei.estatus', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pei, "estatus", rules)
            });


        }
    };
});
