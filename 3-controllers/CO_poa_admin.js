app.controller("poa_admin", function ($scope, $http, $compile) {
    poa_admin = this;
    poa_admin.respuesta_pei = [];
    poa_admin.money = LAN.money;
    poa_admin.institucional_suficiente = false;
    poa_admin.periodo_poa;
    poa_admin.pei;
    poa_admin.destroyForm = false;
    poa_admin.peis = [];
    var session = new SESSION().current();
    poa_admin.loading = true;

    poa_admin.refrescar = function () {
        BASEAPI.listp('pei', {
            "where": [
                {
                    "field": "compania",
                    "operator": "=",
                    "value": session.compania_id ? session.compania_id : 0
                }
            ]
        }).then(function (response) {
            poa_admin.list_pei = [];
            if (response.data.length > 0) {
                for (var peis of response.data) {
                    poa_admin.list_pei.push(peis.id);
                }
            } else {
                poa_admin.list_pei.push(-50);
            }
            poa_admin.fixFilters = [
                {
                    field: 'pei_id',
                    value: poa_admin.list_pei
                }
            ];

            poa_admin.peis = poa_admin.list_pei;
            poa_admin.drp_pei = response.data;
            poa_admin.respuesta_pei = response.data;
            poa_admin.refresh();
        });
    };
    poa_admin.print = function () {

        var fileName = `POA ${poa_admin.report.periodo_poa} - ${poa_admin.report.n_periodo_poa}.xls`;
        var url = $("#tableReport").excelexportjs({
            containerid: "tableReport",
            datatype: 'table',
            worksheetName: `POA ${poa_admin.report.periodo_poa} - ${poa_admin.report.n_periodo_poa}`,
            returnUri: true
        });
        DOWNLOAD.excel(fileName, url);
    };

    poa_admin.incovenientes = function () {
        if (!poa_admin.actividadesR)
            return true;
        return poa_admin.actividadesR.filter(function (item) {
            return item.valid === false
        }).length > 0;
    };

    poa_admin.getPresupuesto = function (departamento) {
        var nuevo = poa_admin.presupuestos.filter(function (data) {
            return data.nombre == departamento;
        });
        if (nuevo.length > 0) {
            nuevo = nuevo[0];
        } else {
            return true;
        }

        var viejo = poa_admin.presupuestosdepa.filter(function (data) {
            return data.departamento == departamento;
        });
        if (viejo.length > 0) {
            viejo = viejo[0];
        } else {
            return true;
        }
        console.log(nuevo.valor, viejo.value);
        if (nuevo.valor < viejo.value) {
            return false;
        }
        return true;
    };

    poa_admin.getPresupuestoValor = function (departamento) {
        var nuevo = poa_admin.presupuestos.filter(function (data) {
            return data.nombre == departamento;
        });
        if (nuevo.length > 0) {
            nuevo = nuevo[0];
        } else {
            nuevo = 0;
        }
        return nuevo.valor;
    };

    poa_admin.getPresupuestoStatus = function (departamento) {
        var nuevo = poa_admin.presupuestos.filter(function (data) {
            return data.nombre == departamento;
        });
        if (nuevo.length > 0) {
            nuevo = nuevo[0];
        } else {
            nuevo = 0;
        }
        return nuevo.estatus;
    };

    poa_admin.fillReport = async function () {
        var transfer = await BASEAPI.firstp('vw_transfer', {
            "where": [
                {
                    "value": poa_admin.ids
                }
            ]
        });
        // ||
        var actividades = await BASEAPI.listp('vw_transfer_actividades', {
            limit: 0,
            orderby: "departamento",
            order: "asc",
            "where": [
                {
                    "field": "poa",
                    "value": poa_admin.ids
                }
            ]
        });
        poa_admin.report = transfer;
        poa_admin.actividades = actividades.data;
        poa_admin.departamentos = [];
        poa_admin.subtotal = 0;
        poa_admin.total = 0;
        poa_admin.actividadesR = [];

        var presupuestos = await BASEAPI.listp('vw_presupuesto_departamento', {
            limit: 0,
            orderby: "departamento",
            order: "asc",
            "where": [
                {
                    "field": "poa",
                    "value": poa_admin.report.n_id
                }
            ]
        });
        poa_admin.presupuestos = presupuestos.data;
        poa_admin.presupuestosdepa = [];
        poa_admin.fechatodas = `${moment(poa_admin.report.n_periodo_poa + "-01-01").format(DSON.UNIVERSAL)} a ${moment(poa_admin.report.n_periodo_poa + "-12-31").format(DSON.UNIVERSAL)}`;

        poa_admin.suficiente = true;
        poa_admin.suficienteColor = "black";

        for (var actividad of poa_admin.actividades) {
            var lastDepartamento = poa_admin.departamentos[poa_admin.departamentos.length - 1];
            if (poa_admin.departamentos.indexOf(actividad.departamento) === -1) {
                if (poa_admin.departamentos.length > 0) {
                    poa_admin.presupuestosdepa.push({
                        departamento: lastDepartamento,
                        value: poa_admin.subtotal
                    });
                    poa_admin.actividadesR.push({
                        subtotal: poa_admin.money(poa_admin.subtotal).format(true),
                        valid: poa_admin.getPresupuesto(lastDepartamento),
                        anterior: poa_admin.money(poa_admin.getPresupuestoValor(lastDepartamento)).format(true),
                        status: poa_admin.getPresupuestoStatus(lastDepartamento)
                    });
                    if (!poa_admin.getPresupuesto(lastDepartamento)) {
                        poa_admin.suficiente = false;
                        poa_admin.suficienteColor = "red";
                    }
                    if (poa_admin.getPresupuestoStatus(lastDepartamento) == "3") {
                        poa_admin.suficiente = false;
                        poa_admin.suficienteColor = "red";
                    }

                    poa_admin.subtotal = 0;
                }
                poa_admin.departamentos.push(actividad.departamento);
                poa_admin.actividadesR.push({row: actividad.departamento});
            }
            actividad.fecha = `${moment(actividad.fecha_inicio).format(DSON.UNIVERSAL)} a ${moment(actividad.fecha_fin).format(DSON.UNIVERSAL)}`;
            actividad.fechatodas = poa_admin.fechatodas;
            poa_admin.subtotal += parseFloat(actividad.presupuesto);
            poa_admin.total += parseFloat(actividad.presupuesto);
            actividad.presupuesto = poa_admin.money(actividad.presupuesto).format(true);
            actividad.normal = ".";
            poa_admin.actividadesR.push(actividad);
        }

        if (poa_admin.report.n_INS)
            if (poa_admin.total > poa_admin.report.n_INS) {
                poa_admin.suficiente = false;
                poa_admin.suficienteColor = "red";
            }
        if ((poa_admin.LAN.money(poa_admin.total).value > poa_admin.LAN.money(poa_admin.report.n_INS).value) && poa_admin.report.n_INS) {
            poa_admin.institucional_suficiente = true;
        } else {
            poa_admin.institucional_suficiente = false;
        }

        if (poa_admin.actividades.length) {
            var actividad = poa_admin.actividades[poa_admin.actividades.length - 1];
            var lastDepartamento = poa_admin.departamentos[poa_admin.departamentos.length - 1];
            if (poa_admin.departamentos.indexOf(actividad.departamento) === -1) {
                if (poa_admin.departamentos.length > 0) {
                    poa_admin.presupuestosdepa.push({
                        departamento: lastDepartamento,
                        value: poa_admin.subtotal
                    });
                    poa_admin.actividadesR.push({
                        subtotal: poa_admin.money(poa_admin.subtotal).format(true),
                        valid: poa_admin.getPresupuesto(lastDepartamento),
                        anterior: poa_admin.money(poa_admin.getPresupuestoValor(lastDepartamento)).format(true),
                        status: poa_admin.getPresupuestoStatus(lastDepartamento)
                    });
                    if (!poa_admin.getPresupuesto(lastDepartamento)) {
                        poa_admin.suficiente = false;
                        poa_admin.suficienteColor = "red";
                    }
                    if (poa_admin.getPresupuestoStatus(lastDepartamento) == "3") {
                        poa_admin.suficiente = false;
                        poa_admin.suficienteColor = "red";
                    }
                }
            } else {
                poa_admin.actividadesR.push({
                    subtotal: poa_admin.money(poa_admin.subtotal).format(true),
                    valid: poa_admin.getPresupuesto(lastDepartamento),
                    anterior: poa_admin.money(poa_admin.getPresupuestoValor(lastDepartamento)).format(true)
                });
            }
        }
        //poa_admin.actividadesR.push({subtotal: poa_admin.money(poa_admin.subtotal).format(true)});
        poa_admin.total = poa_admin.money(poa_admin.total).format(true);

        poa_admin.report.INS = poa_admin.money(poa_admin.report.INS).format(true);
        poa_admin.report.ASI = poa_admin.money(poa_admin.report.ASI).format(true);
        poa_admin.report.RES = poa_admin.money(poa_admin.report.RES).format(true);

        if (poa_admin.report.n_INS)
            poa_admin.report.n_INS = poa_admin.money(poa_admin.report.n_INS).format(true);
        if (poa_admin.report.N_ASI)
            poa_admin.report.N_ASI = poa_admin.money(poa_admin.report.N_ASI).format(true);
        if (poa_admin.report.N_RES)
            poa_admin.report.N_RES = poa_admin.money(poa_admin.report.N_RES).format(true);

        poa_admin.loading = false;
        poa_admin.refreshAngular();
    };

    poa_admin.refrescar();

    poa_admin.enviar_poa = function () {
        SWEETALERT.confirm({
            message: 'Está seguro de realizar esta acción',
            confirm: function () {
                SWEETALERT.loading({message: "Transfiriendo Actividades y Asignaciones..."});
                BASEAPI.first('poa', {
                    "where": [
                        {
                            "field": "id",
                            "value": poa_admin.ids,
                        }
                    ]
                }, function (rs_poa) {
                    poa_admin.actual = rs_poa;
                    poa_admin.proximo_periodo = parseInt(rs_poa.periodo_poa) + 1;
                    BASEAPI.first('poa', {
                        "where": [
                            {
                                "field": "pei",
                                "value": poa_admin.peis
                            },
                            {
                                "field": "periodo_poa",
                                "value": poa_admin.proximo_periodo
                            }
                        ]
                    }, function (rs_proximo_poa) {
                        if (rs_proximo_poa !== undefined) {
                            poa_admin.proximo_poa = rs_proximo_poa;
                            if (trabajar_actividades_poa_monitoreo.records.data.length > 0) {
                                SERVICE.planificacion_transfer.senditems({
                                    poa_id: poa_admin.ids,
                                    poa_proximo: poa_admin.proximo_poa.id
                                }, function (result) {
                                    console.log(result);
                                    if (result.data.error == false) {
                                        BASEAPI.updateall('poa', {
                                            "activo": 0,
                                            where: [{
                                                "field": "id",
                                                "value": poa_admin.ids
                                            }]
                                        }, function (result5) {
                                            BASEAPI.updateall('poa', {
                                                "activo": 1,
                                                where: [{
                                                    "field": "id",
                                                    "value": poa_admin.proximo_poa.id
                                                }]
                                            }, function (result6) {
                                                SWEETALERT.stop();
                                                SWEETALERT.show({message: `Las Actividades y Asignaciones del POA: ` + poa_admin.actual.nombre + ` pasaron al POA: ` + poa_admin.proximo_poa.nombre});
                                                poa_admin.refrescar();
                                                MODAL.closeAll();

                                            });
                                        });
                                    }
                                });
                            } else {
                                SWEETALERT.show({message: `No hay Actividades POA para transferir`});
                            }
                            var titulo_push = `Se ha cerrado el POA anual "${session.periodo_poa}"`;
                            var cuerpo_push = `Se ha cerrado el POA anual "${poa_admin.actual.nombre}",  no se podrán hacer más actualizaciones en el mismo.`;
                            var titulo = `Se ha cerrado el POA anual "${session.periodo_poa}"`;
                            var cuerpo = `Se ha cerrado el POA anual "${poa_admin.actual.nombre}",  no se podrán hacer más actualizaciones en el mismo.`;
                            function_send_email_group(titulo_push, cuerpo_push, titulo, cuerpo, session.compania_id, null, null, session.institucion_id);

                        } else {
                            SWEETALERT.show({message: `El POA siguiente ` + poa_admin.proximo_periodo + ` no existe`});
                        }
                    });

                });
            }
        });
    };

    poa_admin.transfer_poa = function () {
        SWEETALERT.confirm({
            message: `Esta seguro que desea cerrar el POA para ${poa_admin.report.periodo_poa}`,
            confirm: function () {
                SWEETALERT.loading({message: `Cerrando POA para ${poa_admin.report.periodo_poa}`});
                SERVICE.planificacion_transfer.senditems({
                    poa_id: poa_admin.ids,

                    poa_proximo: poa_admin.report.n_id

                }, async function (result) {
                    console.log(result);

                    if (result.data.error == false) {
                        await AUDIT.LOGCUSTOM(`Cierre del POA`, "vw_poa", {
                            id: poa_admin.report.n_id,
                            nombre: poa_admin.report.n_nombre,
                            periodo: poa_admin.report.n_periodo_poa,
                            estado: poa_admin.report.n_estado_nombre,
                            activo: poa_admin.report.n_activo > 0 ? 'Sí' : 'No',
                            presupuesto_institucional: poa_admin.report.n_INS,
                            presupuesto_asignado: poa_admin.report.n_ASI,
                            presupuesto_restante: poa_admin.report.n_RES
                        }, {
                            id: poa_admin.report.id,
                            nombre: poa_admin.report.nombre,
                            periodo: poa_admin.report.periodo_poa,
                            presupuesto_institucional: poa_admin.report.INS,
                            presupuesto_asignado: poa_admin.report.ASI,
                            presupuesto_restante: poa_admin.report.RES
                        });

                        await AUDIT.LOGCUSTOM(`Cierre del POA`, "poa", {
                            id: poa_admin.report.n_id,
                            nombre: poa_admin.report.n_nombre,
                            periodo: poa_admin.report.n_periodo_poa,
                            estado: poa_admin.report.n_estado_nombre,
                            activo: poa_admin.report.n_activo > 0 ? 'Sí' : 'No',
                            presupuesto_institucional: poa_admin.report.n_INS,
                            presupuesto_asignado: poa_admin.report.n_ASI,
                            presupuesto_restante: poa_admin.report.n_RES
                        }, {
                            id: poa_admin.report.id,
                            nombre: poa_admin.report.nombre,
                            periodo: poa_admin.report.periodo_poa,
                            presupuesto_institucional: poa_admin.report.INS,
                            presupuesto_asignado: poa_admin.report.ASI,
                            presupuesto_restante: poa_admin.report.RES
                        });


                        await AUDIT.LOGCUSTOM(`Cierre del POA`, "pei", {
                            id: poa_admin.report.n_id,
                            nombre: poa_admin.report.n_nombre,
                            periodo: poa_admin.report.n_periodo_poa,
                            estado: poa_admin.report.n_estado_nombre,
                            activo: poa_admin.report.n_activo > 0 ? 'Sí' : 'No',
                            presupuesto_institucional: poa_admin.report.n_INS,
                            presupuesto_asignado: poa_admin.report.n_ASI,
                            presupuesto_restante: poa_admin.report.n_RES
                        }, {
                            id: poa_admin.report.id,
                            nombre: poa_admin.report.nombre,
                            periodo: poa_admin.report.periodo_poa,
                            presupuesto_institucional: poa_admin.report.INS,
                            presupuesto_asignado: poa_admin.report.ASI,
                            presupuesto_restante: poa_admin.report.RES
                        });


                        SWEETALERT.show({
                            message: `EL POA para ${poa_admin.report.periodo_poa} ha sido cerrado`,
                            confirm: function () {
                                new SESSION().update(
                                    {
                                        poa_id: poa_admin.report.n_id,
                                        poa: poa_admin.report.n_nombre,
                                        periodo_poa: poa_admin.report.n_periodo_poa,
                                        estado: poa_admin.report.n_activo,
                                        est_poa: poa_admin.report.n_estado,
                                        periodo_poa_msj: `POA ${poa_admin.report.n_periodo_poa}`
                                    });
                                location.reload();
                            }
                        });
                    }
                });
            }
        });

    };


    RUNCONTROLLER("poa_admin", poa_admin, $scope, $http, $compile);
    poa_admin.ids = Row_id ? Row_id : null;
    poa_admin.triggers.table.after.insert = function (data) {
        console.log(data)
        if (session.pei_id == data.inserted.pei) {
            if (data.inserted.activo == 1) {
                SWEETALERT.loading({message: `Activando poa  ${data.inserted.nombre} - ${data.inserted.periodo_poa}...`});
                new SESSION().update(
                    {
                        poa_id: data.inserted.id,
                        poa: data.inserted.nombre,
                        periodo_poa: data.inserted.periodo_poa,
                        estado: data.inserted.activo,
                        est_poa: data.inserted.estado,
                        periodo_poa_msj: `POA ${data.inserted.periodo_poa}`,
                        cantidad: poa_admin.form.selected('monitoreo').cantidad,
                        monitoreo_nombre: poa_admin.form.selected('monitoreo').nombre_mostrar
                    });
                new SESSION().destroy();
                location.reload();
            }
            location.reload();
        } else {
            pei_admin.refresh();
        }
    };
    poa_admin.triggers.table.after.update = function (data) {
        if (session.pei_id == poa_admin.pei) {


            if (data.updating.activo == 1) {
                SWEETALERT.loading({message: `Activando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`});

                for (var i = 1; i <= 5; i++) {
                    setTimeout(function () {
                        SWEETALERT.loading({
                            message: `Activando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`,
                            animation: ""
                        });
                    }, i * 500);
                }

                var parasalior = {
                    poa_id: poa_admin.id,
                    poa: data.updating.nombre,
                    periodo_poa: data.updating.periodo_poa,
                    estado: data.updating.activo,
                    est_poa: data.updating.estado,
                    periodo_poa_msj: `POA ${data.updating.periodo_poa}`,
                    cantidad: poa_admin.form.selected('monitoreo').cantidad,
                    monitoreo_nombre: poa_admin.form.selected('monitoreo').nombre_mostrar
                };
                setTimeout(function () {
                    new SESSION().update(
                        parasalior);
                    new SESSION().destroy();
                    location.reload();
                }, 5000);

            } else {
                SWEETALERT.loading({message: `Desactivando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`});
                for (var i = 1; i <= 5; i++) {
                    setTimeout(function () {
                        SWEETALERT.loading({
                            message: `Desactivando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`,
                            animation: ""
                        });
                    }, i * 500);
                }
                var parasalior = {
                    poa_id: poa_admin.id,
                    poa: data.updating.nombre,
                    periodo_poa: data.updating.periodo_poa,
                    estado: data.updating.activo,
                    est_poa: data.updating.estado,
                    periodo_poa_msj: `POA ${data.updating.periodo_poa}`,
                    cantidad: poa_admin.form.selected('monitoreo').cantidad,
                    monitoreo_nombre: poa_admin.form.selected('monitoreo').nombre_mostrar
                };
                setTimeout(function () {
                    new SESSION().update(
                        parasalior);
                    location.reload();
                }, 5000);
            }
        } else {
            pei_admin.refresh();
        }
    };
    poa_admin.afterDelete = function (data) {
        if (session.pei_id == data.pei_id) {
            if (data.activo == 1) {
                SWEETALERT.loading({message: `Eliminando poa  ${data.nombre} - ${data.periodo_poa}...`});
                new SESSION().update(
                    {
                        poa_id: "",
                        poa: "",
                        periodo_poa: "",
                        estado: "",
                        est_poa: "",
                        periodo_poa_msj: "",
                        cantidad: "",
                        monitoreo_nombre: ""
                    });
                location.reload();
            } else {
                SWEETALERT.loading({message: `Eliminando poa  ${data.nombre} - ${data.periodo_poa}...`});
                location.reload();
            }
        } else {
            pei_admin.refresh();
        }
    };
    poa_admin.plural = "POA";
    poa_admin.singular = "POA";

    poa_admin.open_modal_mega_opcion = function (value) {
        poa_admin.sin_fin = "sin_fin";
        poa_admin.modalAction('megaconsulta', MESSAGE.i('planificacion.title_mega_consulta'), 'design', '', {});
    };

    poa_admin.openmodalField = function (value, row) {
        poa_admin.actual = {};
        poa_admin.ids = value;
        poa_admin.proximo_poa = {};
        poa_admin.proximo_periodo = 0;

        console.log(poa_admin.ids);

        poa_admin.modal.modalView("poa_admin/closePOA", {
            width: 'modal-full',
            header: {
                title: `Cerrar POA ${row.periodo_poa} - ${row.n_periodo_poa}`,
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
    poa_admin.refrescar();
    poa_admin.formulary = function (data, mode, defaultData) {
        poa_admin.porelusuario = false;
        if (poa_admin !== undefined) {
            RUN_B("poa_admin", poa_admin, $scope, $http, $compile);
            poa_admin.form.titles = {
                new: "Nuevo - " + MESSAGE.i('planificacion.titlepoa_admin'),
                edit: "Editar - " + ` ${MESSAGE.i('planificacion.titlepoa_admin')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titlepoa_admin')}`
            };

            poa_admin.form.schemas.insert = {};
            poa_admin.form.schemas.select = {};

            poa_admin.form.readonly = {pei: poa_admin.pei, periodo_poa: poa_admin.periodo_poa, estado: 4, active: 1};
            poa_admin.createForm(data, mode, defaultData);

            poa_admin.refrescar();

            poa_admin.triggers.table.after.control = function (data) {
                if (mode == 'new' && data == 'estado') {
                    poa_admin.estado = "4";
                    poa_admin.form.options.estado.disabled = true;
                    poa_admin.refreshAngular();
                }
                if (mode != 'new' && data == 'estado') {
                    poa_admin.form.options.estado.disabled = true;
                    poa_admin.refreshAngular();
                }
                if (data === 'activo') {
                    setTimeout(function () {
                        poa_admin.porelusuario = true;
                    }, 500);
                }
            };

            poa_admin.$scope.$watch('poa_admin.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(poa_admin, "nombre", rules);
            });
            poa_admin.$scope.$watch('poa_admin.periodo_poa', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa_admin, "periodo_poa", rules);
            });

            poa_admin.$scope.$watch('poa_admin.monitoreo', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa_admin, "monitoreo", rules);
            });

            poa_admin.porelusuario = false;
            poa_admin.$scope.$watch('poa_admin.activo', function (value) {
                console.log("balbalbalba");
                if (value && poa_admin.porelusuario) {
                    SWEETALERT.show({
                        message: "En caso de activar este POA se estará procediendo a refrescar todas las variables temporales utilizadas en Syplans y, deberá volver a iniciar sesión.",
                        type: "warning"
                    });
                }
            });


            poa_admin.$scope.$watch('poa_admin.estado', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa_admin, "estado", rules)
            });
            poa_admin.$scope.$watch('poa_admin.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(poa_admin, "descripcion", rules)
            });
            poa_admin.$scope.$watch('poa_admin.pei', function (value) {
                var rules = [];

                poa_admin.periodos_poa = [];
                poa_admin.periodos_poa_anadidos = [];

                var selected = poa_admin.respuesta_pei.filter(data => {
                    return data.id == poa_admin.pei;
                });

                if (selected.length > 0) {
                    if (selected[0].activo != 1) {
                        $("#checkDinamic").hide();
                        poa_admin.activo = false;
                    } else {
                        $("#checkDinamic").show();
                    }


                    for (var o = 0; o < poa_admin.records.data.length; o++) {
                        poa_admin.periodos_poa_anadidos.push(poa_admin.records.data[o].periodo_poa);
                    }

                    for (var i = selected[0].periodo_desde; i <= selected[0].periodo_hasta; i++) {
                        poa_admin.periodos_poa_anadidos.includes(i) && poa_admin.periodo_poa != i ? 0 : poa_admin.periodos_poa.push(i);
                    }
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa_admin, "pei", rules);
            });

            poa_admin.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                poa_admin.respuesta = [];
                BASEAPI.list('poa', {
                    "where": [
                        {
                            "field": "pei",
                            "value": poa_admin.peis
                        }
                    ]
                }, function (result) {
                    poa_admin.respuesta = result.data;
                    poa_admin.selected_activo = poa_admin.respuesta.filter(information => {
                        if (data.inserting.activo == true) {
                            return information.activo == 1;
                        }
                    });

                    poa_admin.selected_periodo_poa = poa_admin.respuesta.filter(information => {
                        return data.inserting.periodo_poa == information.periodo_poa;
                    });

                    if (poa_admin.selected_activo.length > 0) {
                        SWEETALERT.show({message: `Ya existe un POA activo - ${poa_admin.selected_activo[0].nombre}`});
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);

                    } else if (poa_admin.selected_periodo_poa.length > 0) {
                        SWEETALERT.show({message: `Ya existe un POA con el Periodo ${data.inserting.periodo_poa} nombre: ` + poa_admin.selected_periodo_poa[0].nombre});
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);

                    } else {
                        // pei_admin.refresh();
                        resolve(true);
                    }
                });
            });

            poa_admin.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
                poa_admin.respuesta = [];

                BASEAPI.list('poa', {
                    "where": [
                        {
                            "field": "pei",
                            "value": poa_admin.peis
                        },
                        {
                            "field": "id",
                            "operator": "!=",
                            "value": poa_admin.id
                        }
                    ]
                }, function (result) {
                    poa_admin.respuesta = result.data;
                    poa_admin.selected_activo = poa_admin.respuesta.filter(information => {
                        if (data.updating.activo == true) {
                            return information.activo == 1;
                        }
                    });

                    poa_admin.selected_periodo_poa = poa_admin.respuesta.filter(information => {
                        return data.updating.periodo_poa == information.periodo_poa;
                    });

                    if (poa_admin.selected_activo.length > 0) {
                        SWEETALERT.show({message: `Ya existe un POA activo - ${poa_admin.selected_activo[0].nombre}`});
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);

                    } else if (poa_admin.selected_periodo_poa.length > 0) {
                        SWEETALERT.show({message: `Ya existe un POA con el Periodo ${data.updating.periodo_poa} nombre: ` + poa_admin.selected_periodo_poa[0].nombre});
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);

                    } else {
                        // pei_admin.refresh();
                        resolve(true);
                    }
                });
            });
        }
    };
});
