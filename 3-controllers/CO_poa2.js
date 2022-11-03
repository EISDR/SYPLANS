app.controller("poa2", function ($scope, $http, $compile) {
    poa2 = this;
    poa2.respuesta = [];
    poa2.respuesta_pei = [];
    poa2.pei;

    poa2.periodos_poa = [];
    poa2.periodo_poa;
    poa2.peis = [];

    poa2.refrescar = function () {

        BASEAPI.listp('pei', {
            limit: 0,
            where: [{
                field: compania.form.mode == "new" ? 'tempid' : 'compania',
                value: compania.form.mode == "new" ? 'compania' + compania.form.options.pei.tempId : compania.id,
            }]
        }).then(function (response) {
            var peis = [];

            if (response.data.length > 0) {
                for (var pei of response.data) {
                    peis.push(pei.id);
                }
            }

            poa2.fixFilters = [
                {
                    field: 'pei_id',
                    value: peis
                }
            ];
            poa2.peis = peis;
            poa2.drp_pei = response.data;
            poa2.respuesta_pei = response.data;
            poa2.refresh();
        });
    };

    if (compania.form.mode != "new") {
        poa2.refrescar();
    }

    poa2.enviar_poa = function () {
        SWEETALERT.confirm({
            message: 'Está seguro de realizar esta acción',
            confirm: function () {
                SWEETALERT.loading({message: "Transfiriendo Actividades y Asignaciones..."});
                BASEAPI.first('poa', {
                    "where": [
                        {
                            "field": "id",
                            "value": poa2.ids,
                        }
                    ]
                }, function (rs_poa) {
                    poa2.actual = rs_poa;
                    poa2.proximo_periodo = parseInt(rs_poa2.periodo_poa) + 1;
                    BASEAPI.first('poa', {
                        "where": [
                            {
                                "field": "pei",
                                "value": poa2.peis
                            },
                            {
                                "field": "periodo_poa",
                                "value": poa2.proximo_periodo
                            }
                        ]
                    }, function (rs_proximo_poa) {
                        if (rs_proximo_poa !== undefined) {
                            poa2.proximo_poa = rs_proximo_poa;
                            if (trabajar_actividades_poa_monitoreo.records.data.length > 0) {
                                SERVICE.planificacion_transfer.senditems({
                                    poa_id: poa2.ids,
                                    poa_proximo: poa2.proximo_poa2.id
                                }, function (result) {
                                    console.log(result);
                                    if (result.data.error == false) {
                                        BASEAPI.updateall('poa', {
                                            "activo": 0,
                                            where: [{
                                                "field": "id",
                                                "value": poa2.ids
                                            }]
                                        }, function (result5) {
                                            BASEAPI.updateall('poa', {
                                                "activo": 1,
                                                where: [{
                                                    "field": "id",
                                                    "value": poa2.proximo_poa2.id
                                                }]
                                            }, async function (result6) {
                                                SWEETALERT.stop();


                                                SWEETALERT.show({message: `Las Actividades y Asignaciones del POA: ` + poa2.actual.nombre + ` pasaron al POA: ` + poa2.proximo_poa2.nombre});
                                                poa2.refrescar();
                                                MODAL.closeAll();

                                            });
                                        });
                                    }
                                });

                            } else {
                                SWEETALERT.show({message: `No hay Actividades POA para transferir`});
                            }

                        } else {
                            SWEETALERT.show({message: `El POA siguiente ` + poa2.proximo_periodo + ` no existe`});
                        }
                    });

                });
            }
        });
    };

    RUNCONTROLLER("poa", poa, $scope, $http, $compile);

    poa2.plural = "POA";
    poa2.singular = "POA";

    poa2.asignaciones_pasadas = false;
    poa2.openmodalField = function (value) {
        poa2.ids = value;
        poa2.estado_validate = false;
        poa2.actividades_pendientes = [];
        poa2.proximo_poa = {};
        poa2.proximo_validar = false;
        poa2.proximo_periodo = 0;
        poa2.asignaciones_pendientes = [];
        poa2.actual = {};
        poa2.whereActividades = [];
        poa2.whereAsignaciones = [];
        poa2.rs_actividades_poa = [];


        poa2.modal.modalView("poa/closePOA", {
            width: 'modal-full',
            header: {
                title: "Cerrar POA",
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
            event: {
                show: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                },
                hide: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                }
            },
        });


    };

    if (compania.form.mode == "new") {

        RUN_B("poa", poa, $scope, $http, $compile);

        poa2.form.titles = {
            new: MESSAGE.i('planificacion.titlepoa'),
            edit: "Editar - " + ` ${MESSAGE.i('planificacion.titlepoa')}`,
            view: "Ver ALL - " + `${MESSAGE.i('planificacion.titlepoa')}`
        }

        // poa2.createForm(null, FORM.modes.new);

        // poa2.$scope.$watch('poa2.refreshModal', function (value) {
        //     poa2.refrescar();
        //     MODAL.close(poa);
        // });
    }

    poa2.formulary = function (data, mode, defaultData) {
        if (poa !== undefined) {
            RUN_B("poa", poa, $scope, $http, $compile);

            poa2.form.readonly = {pei: poa2.pei, periodo_poa: poa2.periodo_poa, estado: 4};

            poa2.createForm(data, mode, defaultData);

            poa2.triggers.table.after.control = function (data) {
                if (mode == 'new' && data == 'estado') {
                    poa2.estado = "4";
                    poa2.form.options.estado.disabled = true;
                    poa2.refreshAngular();
                }
            };
            poa2.triggers.table.after.close = function (data) {
                pei.refresh();
            };

            poa2.refrescar();
            poa2.$scope.$watch('poa2.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(poa, "nombre", rules);
            });
            poa2.$scope.$watch('poa2.periodo_poa', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa, "periodo_poa", rules);
            });

            poa2.$scope.$watch('poa2.monitoreo', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa, "monitoreo", rules);
            });

            poa2.$scope.$watch('poa2.estado', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa, "estado", rules)
            });

            poa2.$scope.$watch('poa2.pei', function (value) {
                var rules = [];

                poa2.periodos_poa = [];

                poa2.periodos_poa_anadidos = [];

                var selected = poa2.respuesta_pei.filter(data => {
                    return data.id == poa2.pei;
                });

                if (selected.length > 0) {

                    if (selected[0].activo != 1) {
                        $("#checkDinamic").hide();
                        poa2.activo = false;
                    } else {
                        $("#checkDinamic").show();
                    }

                    for (var o = 0; o < poa2.records.data.length; o++) {
                        poa2.periodos_poa_anadidos.push(poa2.records.data[o].periodo_poa);
                    }

                    for (var i = selected[0].periodo_desde; i <= selected[0].periodo_hasta; i++) {
                        poa2.periodos_poa_anadidos.includes(i) && poa2.periodo_poa != i ? 0 : poa2.periodos_poa2.push(i);
                    }
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa, "pei", rules);
            });


            poa2.res = false;
            poa2.form.before.insert = function (data) {
                if (poa2.res)
                    return false;
                poa2.res = true;
                poa2.respuesta = [];
                BASEAPI.list('poa', {
                    "where": [
                        {
                            "field": "pei",
                            "value": poa2.peis
                        }
                    ]
                }, function (result) {
                    poa2.respuesta = result.data;
                    poa2.selected_activo = poa2.respuesta.filter(information => {
                        if (data.inserting.activo == true) {
                            return information.activo == 1;
                        }
                    });

                    poa2.selected_periodo_poa = poa2.respuesta.filter(information => {
                        return data.inserting.periodo_poa == information.periodo_poa;
                    });

                    if (poa2.selected_activo.length > 0) {
                        SWEETALERT.show({message: `Ya existe un POA activo - ${poa2.selected_activo[0].nombre}`});
                        poa2.res = false;
                    } else if (poa2.selected_periodo_poa2.length > 0) {
                        SWEETALERT.show({message: `Ya existe un POA con el Periodo ${data.inserting.periodo_poa} nombre: ` + poa2.selected_periodo_poa[0].nombre});
                        poa2.res = false;
                    } else {
                        poa2.form.saveAction();
                        SWEETALERT.stop();
                    }
                });

                return true;
            };

            poa2.form.before.update = function (data) {
                if (poa2.res)
                    return false;
                poa2.res = true;
                poa2.respuesta = [];
                BASEAPI.list('poa', {
                    "where": [
                        {
                            "field": "pei",
                            "value": poa2.peis,

                        },
                        {
                            "field": "id",
                            "operator": "!=",
                            "value": poa2.id
                        }
                    ]
                }, function (result) {
                    poa2.respuesta = result.data;

                    poa2.selected_activo = poa2.respuesta.filter(information => {
                        if (data.updating.activo == true) {
                            return information.activo == 1;
                        }

                    });

                    poa2.selected_periodo_poa = poa2.respuesta.filter(information => {
                        return data.updating.periodo_poa == information.periodo_poa;
                    });

                    if (poa2.selected_activo.length > 0) {
                        SWEETALERT.show({message: `Ya existe un POA activo - ${poa2.selected_activo[0].nombre}`});
                        poa2.res = false;
                    } else if (poa2.selected_periodo_poa2.length > 0) {
                        SWEETALERT.show({message: `Ya existe un POA con el Periodo ${data.updating.periodo_poa} nombre: ` + poa2.selected_periodo_poa[0].nombre});
                        poa2.res = false;
                    } else {
                        poa2.form.saveAction();
                        SWEETALERT.stop();
                    }
                });

                return true;
            };


        }
    };


});
