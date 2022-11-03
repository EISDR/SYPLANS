app.controller("pei_admin", function ($scope, $http, $compile) {
    pei_admin = this;
    var session = new SESSION().current();

    pei_admin.fixFilters = [
        {
            field: 'compania',
            operator: "=",
            value: session.compania_id ? session.compania_id : 0
        }
    ];
    pei_admin.destroyForm = false;

    pei_admin.refrescar = function () {
        pei_admin.fixFilters = [
            {
                field: 'compania',
                operator: "=",
                value: session.compania_id ? session.compania_id : 0
            }
        ];
        pei_admin.refresh();
    };

    RUNCONTROLLER("pei_admin", pei_admin, $scope, $http, $compile);
    pei_admin.triggers.table.after.insert = function (data) {
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
    pei_admin.triggers.table.after.update = function (data) {
        if (data.updating.activo == 1) {
            SWEETALERT.loading({message: `Activando pei  ${data.updating.nombre} ${data.updating.periodo_desde} - ${data.updating.periodo_hasta}...`});
            new SESSION().update(
                {
                    pei_id: pei_admin.id,
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
            if (session.pei_id == pei_admin.id) {
                SWEETALERT.loading({message: `Desactivando pei  ${data.updating.nombre} ${data.updating.periodo_desde} - ${data.updating.periodo_hasta}...`});
                new SESSION().update(
                    {
                        pei_id: pei_admin.id,
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
    pei_admin.afterDelete = function (data) {
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
        // pei_admin.permissionsAdd();
    };
    pei_admin.haspoa = false;
    pei_admin.validatePOA = function (value) {
        if (value > 0) {
            pei_admin.haspoa = true;
        } else {
            pei_admin.haspoa = false;
        }
    };

    pei_admin.plural = "PEI";
    pei_admin.singular = "PEI";
    pei_admin.formulary = function (data, mode, defaultData) {
        if (pei_admin !== undefined) {
            RUN_B("pei_admin", pei_admin, $scope, $http, $compile);
            pei_admin.old_periodo_desde = "";
            pei_admin.old_periodo_hasta = "";
            pei_admin.form.titles = {
                new: "Nuevo - " + MESSAGE.i('planificacion.titlepei_admin'),
                edit: "Editar - " + MESSAGE.i('planificacion.titlepei_admin'),
                view: "Ver - " + MESSAGE.i('planificacion.titlepei_admin')
            };
            pei_admin.refrescar();
            pei_admin.lista_ano = [];

            for (var a = 2019; a <= 3000; a++) {
                pei_admin.lista_ano.push(a);
            }
            pei_admin.form.schemas.insert = {};
            pei_admin.form.schemas.select = {};
            pei_admin.form.readonly = {
                compania: session.compania_id,
                periodo_desde: pei_admin.periodo_desde,
                periodo_hasta: pei_admin.periodo_hasta
            };
            pei_admin.createForm(data, mode, defaultData);
            pei_admin.verdad = true;
            pei_admin.triggers.table.after.control = function (data) {
                if (mode != 'new' && data == 'estatus') {
                    var desde = pei_admin.periodo_desde;
                    pei_admin.old_periodo_desde = desde;
                }
                if (mode != 'new' && data == 'estatus') {
                    var hasta = pei_admin.periodo_hasta;
                    pei_admin.old_periodo_hasta = hasta;
                }
                if (mode == 'new' && data == 'estatus') {
                    pei_admin.estatus = ENUM_2.pei_estatus.Pendiente_a_autorizar.toString();
                    pei_admin.form.options.estatus.disabled = true;
                    pei_admin.refreshAngular();
                }
                if (mode != 'new' && data == 'estatus') {
                    if (pei_admin.estatus == ENUM_2.pei_estatus.Pendiente_a_autorizar.toString() || pei_admin.estatus == ENUM_2.pei_estatus.Cerrado.toString()) {
                        pei_admin.form.options.estatus.disabled = true;
                        pei_admin.refreshAngular();
                    } else if (pei_admin.verdad) {
                        pei_admin.selectQueries["estatus"] = [
                            {
                                field: "id",
                                operator: "!=",
                                value: ENUM_2.pei_estatus.Pendiente_a_autorizar
                            }
                        ];
                        pei_admin.verdad = false;
                        pei_admin.form.loadDropDown('estatus');
                    }
                    if (pei_admin.estatus == ENUM_2.pei_estatus.Autorizado.toString()) {
                        pei_admin.form.options.periodo_desde = {};
                        pei_admin.form.options.periodo_hasta = {};
                        pei_admin.form.options.descripcion.disabled = true;
                        pei_admin.form.options.periodo_desde.disabled = true;
                        pei_admin.form.options.periodo_hasta.disabled = true;
                        pei_admin.form.options.activo.disabled = true;
                        pei_admin.form.options.nombre.disabled = true;
                    }
                }
            };

            pei_admin.$scope.$watch('pei_admin.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(pei_admin, "nombre", rules)
            });

            pei_admin.$scope.$watch('pei_admin.periodo_desde', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.menorQue(pei_admin.periodo_desde, pei_admin.periodo_hasta, "El periodo desde", "periodo hasta"));
                VALIDATION.validate(pei_admin, "periodo_desde", rules)

                var rules2 = [];
                rules2.push(VALIDATION.general.required(pei_admin.periodo_hasta));
                rules2.push(VALIDATION.yariel.mayorQue(pei_admin.periodo_hasta, pei_admin.periodo_desde, "El periodo hasta", "periodo desde"));
                VALIDATION.validate(pei_admin, "periodo_hasta", rules2)
            });

            pei_admin.$scope.$watch('pei_admin.periodo_hasta', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.mayorQue(pei_admin.periodo_hasta, pei_admin.periodo_desde, "El periodo hasta", "periodo desde"));
                VALIDATION.validate(pei_admin, "periodo_hasta", rules);

                var rules2 = [];
                rules2.push(VALIDATION.general.required(pei_admin.periodo_desde));
                rules2.push(VALIDATION.yariel.menorQue(pei_admin.periodo_desde, pei_admin.periodo_hasta, "El periodo desde", "periodo hasta"));
                VALIDATION.validate(pei_admin, "periodo_desde", rules2)
            });
            pei_admin.$scope.$watch('pei_admin.estatus', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pei_admin, "estatus", rules)
            });
            pei_admin.$scope.$watch('pei_admin.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(pei_admin, "descripcion", rules)
            });
            pei_admin.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                pei_admin.response = [];
                BASEAPI.list('pei', {
                    "where": [
                        {
                            "field": "compania",
                            "operator": "=",
                            "value": session.compania_id ? session.compania_id : 0
                        }
                    ]
                }, function (result) {
                    pei_admin.response = result.data;
                    pei_admin.selected_activo = pei_admin.response.filter(information => {
                        if (data.inserting.activo == true) {
                            return information.activo == 1;
                        }
                    });
                    pei_admin.selected_periodo = pei_admin.response.filter(information => {
                        if ((parseInt(pei_admin.periodo_desde) >= information.periodo_desde && parseInt(pei_admin.periodo_desde) <= information.periodo_hasta) ||
                            (parseInt(pei_admin.periodo_hasta) >= information.periodo_desde && parseInt(pei_admin.periodo_hasta) <= information.periodo_hasta)) {
                            return true;
                        } else if ((information.periodo_desde >= parseInt(pei_admin.periodo_desde) && information.periodo_desde <= parseInt(pei_admin.periodo_hasta)) &&
                            (information.periodo_hasta >= parseInt(pei_admin.periodo_desde) && information.periodo_hasta <= parseInt(pei_admin.periodo_hasta))) {
                            return true;
                        }
                    });

                    if (pei_admin.selected_activo.length > 0) {
                        SWEETALERT.show({message: `Ya existe un PEI activo - ${pei_admin.selected_activo[0].nombre}`});
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    } else if (pei_admin.selected_periodo.length > 0) {
                        SWEETALERT.show({message: `Ya existe un periodo PEI dentro del rango especificado nombre: ` + pei_admin.selected_periodo[0].nombre + ", periodo desde: " + pei_admin.selected_periodo[0].periodo_desde + ", periodo hasta: " + pei_admin.selected_periodo[0].periodo_hasta});
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    } else {

                        resolve(true);
                    }
                });

            });


            pei_admin.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
                pei_admin.response = [];

                BASEAPI.list('pei', {

                    "where": [
                        {
                            "field": "compania",
                            "operator": "=",
                            "value": session.compania_id ? session.compania_id : 0
                        },
                        {
                            "field": "id",
                            "operator": "!=",
                            "value": pei_admin.id,
                        }
                    ]
                }, async function (result) {

                    pei_admin.response = result.data;

                    pei_admin.selected_activo = pei_admin.response.filter(information => {
                        if (data.updating.activo == true) {
                            return information.activo == 1;
                        }
                    });

                    var exist_poa = await BASEAPI.firstp('poa', {
                        where: [
                            {
                                field: "pei",
                                value: pei_admin.id
                            },
                            {
                                open: "(",
                                field: "periodo_poa",
                                operator: "<",
                                value: pei_admin.periodo_desde,
                                "connector": "OR"
                            },
                            {
                                field: "periodo_poa",
                                operator: ">",
                                value: pei_admin.periodo_hasta,
                                close: ")",
                            }
                        ]
                    });

                    console.log(exist_poa);

                    pei_admin.selected_periodo = pei_admin.response.filter(information => {
                        if ((parseInt(pei_admin.periodo_desde) >= information.periodo_desde && parseInt(pei_admin.periodo_desde) <= information.periodo_hasta) ||
                            (parseInt(pei_admin.periodo_hasta) >= information.periodo_desde && parseInt(pei_admin.periodo_hasta) <= information.periodo_hasta)) {
                            return true;
                        } else if ((information.periodo_desde >= parseInt(pei_admin.periodo_desde) && information.periodo_desde <= parseInt(pei_admin.periodo_hasta)) &&
                            (information.periodo_hasta >= parseInt(pei_admin.periodo_desde) && information.periodo_hasta <= parseInt(pei_admin.periodo_hasta))) {
                            return true;
                        }
                    });

                    if (pei_admin.selected_activo.length > 0) {
                        SWEETALERT.show({message: `Ya existe un PEI activo - ${pei_admin.selected_activo[0].nombre}`});
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    } else if (pei_admin.selected_periodo.length > 0) {
                        SWEETALERT.show({message: `Ya existe un periodo PEI dentro del rango especificado nombre: ` + pei_admin.selected_periodo[0].nombre + ", periodo desde: " + pei_admin.selected_periodo[0].periodo_desde + ", periodo hasta: " + pei_admin.selected_periodo[0].periodo_hasta});
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    }
                    // else if ((pei_admin.old_periodo_desde != pei_admin.periodo_desde || pei_admin.old_periodo_hasta != pei_admin.periodo_hasta) && pei_admin.haspoa) {
                    //     pei_admin.periodo_desde = pei_admin.old_periodo_desde;
                    //     pei_admin.periodo_hasta = pei_admin.old_periodo_hasta;
                    //     $('[name="periodo_desde"]').trigger('change');
                    //     $('[name="periodo_hasta"]').trigger('change');
                    //     SWEETALERT.show({message: `No se pudo aplicar este rango de fecha puesto que existe un POA creado dentro del rango anterior.`});
                    //     resolve(false);
                    // }
                    else if (exist_poa) {
                        SWEETALERT.show({message: `No es posible cambiar los períodos del PEI desde ${pei_admin.periodo_desde} hasta ${pei_admin.periodo_hasta} porque existe un POA creado en ${exist_poa.periodo_poa} llamado ${exist_poa.nombre}`});
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
            });

        }
    };
});
