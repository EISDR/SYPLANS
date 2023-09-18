app.controller("presupuesto_aprobado", function ($scope, $http, $compile) {
    presupuesto_aprobado = this;
    var session = new SESSION().current();
    presupuesto_aprobado.session = session;
    presupuesto_aprobado.pei = session.pei_id;
    presupuesto_aprobado.compania = session.compania_id;
    presupuesto_aprobado.poa_id = session.poa_id === null ? 0 : session.poa_id;
    presupuesto_aprobado.presupuesto_institucional_p = 0;
    presupuesto_aprobado.restante = 0;
    presupuesto_aprobado.not_exists_poa = 0;
    presupuesto_aprobado.presupuesto_institucional_validar = 0;
    presupuesto_aprobado.restante_modi = 0;
    presupuesto_aprobado.objecto = {};
    presupuesto_aprobado.show_comment = false;
    presupuesto_aprobado.group_caracteristica = session.groups[0].caracteristica;

    TRIGGER.run(presupuesto_aprobado);
    // Este metodo es para cargar la informacion y mascarrilla de los campos custom en el index, tambien compruebo de si hay un poa activo con 1 o 0
    presupuesto_aprobado.destroyForm = false;

    RUNCONTROLLER("presupuesto_aprobado", presupuesto_aprobado, $scope, $http, $compile);

    presupuesto_aprobado.plural = "presupuestos Aprobados";
    presupuesto_aprobado.singular = "presupuestos Aprobados";
    getPOAstatus(presupuesto_aprobado, session.poa_id);

    presupuesto_aprobado.triggers.table.after.load = async function (records) {
        if (!presupuesto_aprobado.allow(['update_budget'])) {
            presupuesto_aprobado.form.options.presupuesto_institucional_p.disabled = true;
            presupuesto_aprobado.refreshAngular();
        }
        await presupuesto_aprobado.check_pei();
    };

    title_header_table_poa(presupuesto_aprobado, MESSAGE.i('planificacion.titlePresupuesto'));
    RUN_B("presupuesto_aprobado", presupuesto_aprobado, $scope, $http, $compile);
    // En esta variable obtengo todos los objecto del formulario para volver a construirlo
    presupuesto_aprobado.objecto = presupuesto_aprobado.form.options;
    // end

    presupuesto_aprobado.formulary = function (data, mode, defaultData) {
        if (presupuesto_aprobado !== undefined) {
            RUN_B("presupuesto_aprobado", presupuesto_aprobado, $scope, $http, $compile);

            presupuesto_aprobado.departamento_array = [];
            presupuesto_aprobado.form.titles = {
                new: MESSAGE.i('planificacion.titlePresupuestoDepartamento'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titlePresupuestoDepartamento')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titlePresupuestoDepartamento')}`
            };
            // Esta fue la nasa inventada por yariel para uno poder hacer x cosas dentro de los befofe
            // presupuesto_aprobado.valid = false;
            // presupuesto_aprobado.form.before.insert = function (data) {
            //
            //     if(presupuesto_aprobado.valid)
            //         return false;
            //     presupuesto_aprobado.valid = true;
            //
            //
            //     return true;
            // };
            presupuesto_aprobado.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
                delete data.inserting.comentario;
                data.inserting.valor = LAN.money(presupuesto_aprobado.valor).value;
                data.inserting.estatus = ENUM_2.presupuesto_estatus.Pendiente;
                if (!presupuesto_aprobado.poa_id) {
                    SWEETALERT.show({message: "No existe un periodo POA activo"});
                    return true;
                }

                BASEAPI.first('presupuesto_aprobado', {
                    "where": [
                        {
                            "field": "poa",
                            "value": presupuesto_aprobado.poa_id
                        }, {
                            "field": "departamento",
                            "value": presupuesto_aprobado.departamento
                        }
                    ]
                }, function (result) {
                    if (result) {
                        SWEETALERT.show({message: "Ya existe un presupuesto para este departamento"});
                    } else {
                        resolve(true);
                    }
                });

            });

            presupuesto_aprobado.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
                //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
                delete data.updating.comentario;
                console.log(data.updating);
                if ((parseFloat(DSON.cleanNumber(presupuesto_aprobado.valor)) - parseFloat(DSON.cleanNumber(presupuesto_aprobado.valor_antes))).toFixed(2) > parseFloat(DSON.cleanNumber(presupuesto_aprobado.restante))) {
                    SWEETALERT.show({message: "Este presupuesto no puede exceder el limite definido"});
                    return true;
                }
                data.updating.valor = LAN.money(presupuesto_aprobado.valor).value;
                BASEAPI.first('presupuesto_aprobado', {
                    "where": [
                        {
                            "field": "poa",
                            "value": presupuesto_aprobado.poa_id
                        },
                        {
                            "field": "id",
                            "operator": "!=",
                            "value": presupuesto_aprobado.id
                        }, {
                            "field": "departamento",
                            "value": presupuesto_aprobado.departamento
                        }]
                }, function (result) {
                    if (result) {
                        SWEETALERT.show({message: "Ya existe un presupuesto para este departamento"});
                    } else {
                        if (presupuesto_aprobado.comentario || presupuesto_aprobado.comentario != "") {
                            BASEAPI.insert('comentarios', {
                                "comentario": presupuesto_aprobado.comentario,
                                "type": 20,
                                "created_by": session.usuario_id,
                                "value": presupuesto_aprobado.id
                            }, function (result) {

                            });
                        }

                        resolve(true);
                    }
                });

            });
            // presupuesto_aprobado.res =false;
            // presupuesto_aprobado.form.before.update = function (data) {
            //
            //
            //     if(presupuesto_aprobado.res)
            //         return false;
            //     presupuesto_aprobado.res = true;
            //
            //
            //     return true;
            // };

            // presupuesto_aprobado.form.readonly = {poa: presupuesto_aprobado.poa_id};

            presupuesto_aprobado.createForm(data, mode, defaultData);
            presupuesto_aprobado.form.schemas.insert.presupuesto_consumido_departamento = FORM.schemasType.calculated;
            presupuesto_aprobado.form.schemas.insert.restante_departamento = FORM.schemasType.calculated;
            presupuesto_aprobado.form.schemas.insert.restante_modi = FORM.schemasType.calculated;
            presupuesto_aprobado.form.schemas.insert.presupuesto_detenido_departamento = FORM.schemasType.calculated;
            presupuesto_aprobado.selectQueries["departamento"] = [
                {
                    field: "poa",
                    operator: "=",
                    value: session.poa_id
                },
                {
                    field: "compania",
                    operator: "=",
                    value: session.compania_id
                }
            ];


            presupuesto_aprobado.triggers.table.after.control = function (data) {
                if (mode === 'edit' && data === 'valor') {
                    presupuesto_aprobado.valor = LAN.money(presupuesto_aprobado.valor).format(false);
                    presupuesto_aprobado.old_valor = presupuesto_aprobado.valor;
                }
                // De esta manera le paso la mascarrilla y obtengo el valor para poder hacer la resta del presupuesto
                if (mode === 'edit' && data === "restante_modi") {
                    presupuesto_aprobado.valor_antes = presupuesto_aprobado.valor;
                    presupuesto_aprobado.restante_modi = LAN.money(presupuesto_aprobado.restante).format(false);
                }
                if (mode === 'new') {
                    presupuesto_aprobado.restante_modi = LAN.money(presupuesto_aprobado.restante).format(false);
                }
                if (mode === 'edit' && data === 'departamento') {
                    if (presupuesto_aprobado.form.selected('departamento') !== null) {
                        var rules = [];
                        presupuesto_aprobado.presupuesto_consumido_departamento = LAN.money(presupuesto_aprobado.form.selected('departamento').presupuesto_asignado).format(false);
                        presupuesto_aprobado.presupuesto_detenido_departamento = LAN.money(presupuesto_aprobado.form.selected('departamento').presupuesto_liberado).format(false);
                        presupuesto_aprobado.restante_departamento = LAN.money(presupuesto_aprobado.form.selected('departamento').presupuesto_restante).format(false);
                        rules.push(VALIDATION.yariel.mayorQue(parseFloat(DSON.cleanNumber(presupuesto_aprobado.valor)), parseFloat(DSON.cleanNumber(presupuesto_aprobado.presupuesto_consumido_departamento)), "Presupuesto del área", "Presupuesto de las sumatoría de las actividades"));
                        VALIDATION.validate(presupuesto_aprobado, "valor", rules);
                        presupuesto_aprobado.form.selected('departamento').presupuesto_restante ? presupuesto_aprobado.restante_departamento = LAN.money(presupuesto_aprobado.form.selected('departamento').presupuesto_restante).format(false) : presupuesto_aprobado.restante_departamento = LAN.money(presupuesto_aprobado.valor).format(false);
                    }
                }
                if (data === "poa") {
                    presupuesto_aprobado.poa = presupuesto_aprobado.poa_id + "";
                }
                presupuesto_aprobado.refreshAngular();
            };
            presupuesto_aprobado.$scope.$watch('presupuesto_aprobado.comentario', function (value) {
                var rules = [];
                if (presupuesto_aprobado.show_comment) {
                    rules.push(VALIDATION.general.requiredWithMessage(value, "Al evento de cambiar el Presupuesto se debe capturar un comentario."));
                }
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(presupuesto_aprobado, "comentario", rules);
            });
            presupuesto_aprobado.$scope.$watch('presupuesto_aprobado.departamento', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(presupuesto_aprobado, "departamento", rules);

                if (mode === 'edit') {
                    if (presupuesto_aprobado.form.selected('departamento') !== null) {
                        presupuesto_aprobado.presupuesto_consumido_departamento = LAN.money(presupuesto_aprobado.form.selected('departamento').presupuesto_asignado).format(false);
                        presupuesto_aprobado.restante_departamento = LAN.money(presupuesto_aprobado.form.selected('departamento').presupuesto_restante).format(false);
                        presupuesto_aprobado.presupuesto_detenido_departamento = LAN.money(presupuesto_aprobado.form.selected('departamento').presupuesto_liberado).format(false);
                    }
                }

            });
            presupuesto_aprobado.$scope.$watch('presupuesto_aprobado.valor', function (value) {
                // Creo que estas reglas estan clara y pasar la mascarrilla
                var rules = [];
                var presupuesto_restante = LAN.money(presupuesto_aprobado.valor_antes).value;
                if (mode === "new") {
                    // rules.push(VALIDATION.general.required(value));
                    // rules.push(VALIDATION.yariel.mayorCero(parseFloat(DSON.cleanNumber(value)),"Presupuesto"));
                    rules.push(VALIDATION.yariel.greaterThan(parseFloat(DSON.cleanNumber(value)), parseFloat(DSON.cleanNumber(presupuesto_aprobado.presupuesto_institucional_validar)), parseFloat(DSON.cleanNumber(presupuesto_aprobado.restante)), "Presupuesto del área", "Presupuesto Institucional"));
                } else {
                    // rules.push(VALIDATION.general.required(value));
                    // rules.push(VALIDATION.yariel.mayorCero(parseFloat(DSON.cleanNumber(value)),"Presupuesto"));
                    if (LAN.money(presupuesto_aprobado.old_valor).value > 0 && LAN.money(presupuesto_aprobado.valor).value > 0) {
                        if (LAN.money(presupuesto_aprobado.valor).value != LAN.money(presupuesto_aprobado.old_valor).value) {
                            console.log("que da esto?", LAN.money(presupuesto_aprobado.valor).value != LAN.money(presupuesto_aprobado.old_valor).value, LAN.money(presupuesto_aprobado.valor).value, LAN.money(presupuesto_aprobado.old_valor).value);
                            presupuesto_aprobado.show_comment = true;
                            presupuesto_aprobado.comentario = "";

                            let index = presupuesto_aprobado.$scope.$$watchers.map((d, index) => {
                                if (d.exp === "presupuesto_aprobado.comentario")
                                    return index;
                                return false;
                            }).filter(e => {
                                return e
                            })[0];
                            delete presupuesto_aprobado.$scope.$$watchers[index];

                            presupuesto_aprobado.$scope.$watch('presupuesto_aprobado.comentario', function (value) {
                                var rules = [];
                                if (presupuesto_aprobado.show_comment) {
                                    rules.push(VALIDATION.general.requiredWithMessage(value, "Al evento de cambiar el Presupuesto se debe capturar un comentario."));
                                }
                                rules.push(VALIDATION.yariel.maliciousCode(value));
                                VALIDATION.validate(presupuesto_aprobado, "comentario", rules);
                            });
                            presupuesto_aprobado.refreshAngular();

                        }
                    }
                    rules.push(VALIDATION.yariel.mayorQue(parseFloat(DSON.cleanNumber(value)), parseFloat(DSON.cleanNumber(presupuesto_aprobado.presupuesto_consumido_departamento)), "Presupuesto del área", "Presupuesto asignado."));
                    rules.push(VALIDATION.yariel.presupuesto_editar(parseInt(DSON.cleanNumber(presupuesto_aprobado.valor_antes)), parseInt(DSON.cleanNumber(presupuesto_aprobado.valor)).toFixed(2), parseInt(DSON.cleanNumber(presupuesto_aprobado.restante))));
                }
                // Aqui es donde se realiza la resta para el presupuesto restante
                VALIDATION.validate(presupuesto_aprobado, "valor", rules);

                if (presupuesto_aprobado.form.mode === 'new') {
                    if (rules.length > 0)
                        if (rules[0].valid) {
                            presupuesto_aprobado.restante_modi = LAN.money(parseFloat(DSON.cleanNumber(presupuesto_aprobado.restante)) - parseFloat(DSON.cleanNumber(value))).format(false);
                        }
                } else {
                    if (rules[0] && rules[1]) {
                        if (rules[0].valid && rules[1].valid) {
                            presupuesto_aprobado.restante_modi = LAN.money((presupuesto_restante - LAN.money(presupuesto_aprobado.valor).value) + LAN.money(presupuesto_aprobado.restante).value).format(false);
                            if (presupuesto_aprobado.form.selected('departamento') !== null)
                                presupuesto_aprobado.restante_departamento = LAN.money((LAN.money(presupuesto_aprobado.valor).value - LAN.money(presupuesto_aprobado.form.selected('departamento').presupuesto_asignado).value) /*+ LAN.money(presupuesto_aprobado.valor).value*/).format(false);
                        }
                    }
                }

            });

        }
    };
    // En estos metodo utilizo los objectos obtenidos en la objecto para poder construir de nuevo los input con sus propiedades
    presupuesto_aprobado.triggers.table.after.close = function (data) {
        MENUMODAL = true;
        presupuesto_aprobado.show_comment = false;
    };

    // Para actualizar el presupuesto de la institucion
    presupuesto_aprobado.update = async function (data) {
        presupuesto_aprobado.myPei = await BASEAPI.firstp('pei', {
            where: [
                {
                    field: "id",
                    value: presupuesto_aprobado.pei
                }
            ]
        });
        if (presupuesto_aprobado.myPei.estatus == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
            SWEETALERT.lastLaert = myswal({
                type: "warning",
                title: "PEI no Autorizado",
                html: `El periodo PEI (${presupuesto_aprobado.myPei.periodo_desde} - ${presupuesto_aprobado.myPei.periodo_hasta}) no esta autorizado, debe proceder a autorizarlo. Ir hacia la autorización del PEI en el siguiente botón`,
                showCancelButton: true,
                confirmButtonText: "Ir a Autorización PEI",
                cancelButtonText: "Cancelar"
            }).then(result => {
                if (result.dismiss === undefined) {
                    presupuesto_aprobado.modal.modalView('megaconsulta', {
                        header: {
                            title: MESSAGE.i('planificacion.title_mega_consulta'),
                            icon: ""
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading'),
                            sameController: 'megaconsulta'
                        },
                        event: {
                            show: {
                                end: function (data) {
                                    window.location.href = "#information/about";
                                }
                            }
                        }
                    });
                }
            });
        } else {
            if (session.poa_id) {
                BASEAPI.first('vw_presupuesto_aprobado_index', { // presupuesto_aprobado
                    "where": [{
                        "field": "poa",
                        "value": presupuesto_aprobado.poa_id
                    }]

                }, function (result) {
                    let pi = parseFloat(DSON.cleanNumber(presupuesto_aprobado.presupuesto_institucional_p));
                    let pxd = parseFloat(result.presupuesto_x_departamento);
                    if (pi > pxd) {
                        BASEAPI.updateall('poa', {
                            "presupuesto_institucional": pi,
                            "updated_at": moment().format('YYYY-MM-DD H:mm:ss'),
                            "where": [{
                                "field": "id",
                                "value": presupuesto_aprobado.poa_id
                            }]
                        }, function (result) {
                            //
                            BASEAPI.first('vw_presupuesto_aprobado_index', {
                                "where": [{
                                    "field": "poa",
                                    "value": presupuesto_aprobado.poa_id
                                }]
                            }, function (result) {
                                //
                                if (result) {
                                    presupuesto_aprobado.updateInputPresupuesto();

                                }
                                SWEETALERT.show({message: "Presupuesto actualizado"});
                                presupuesto_aprobado.refreshAngular();
                            });

                        });
                    } else {
                        SWEETALERT.show({
                            title: "Programación de Presupuesto Anual",
                            message: "El presupuesto debe de ser mayor que la sumatoria de los presupuesto por departamento",
                            confirm: function () {
                                SWEETALERT.stop();
                            }
                        });
                    }
                });
            } else {
                SWEETALERT.show({message: "No existe un POA activo"});
            }
        }
    };
    // Este metodo es para cargar la informacion y mascarrilla de los campos custom en el index
    presupuesto_aprobado.updateInputPresupuesto = function () {
        BASEAPI.first('vw_presupuesto_aprobado_index_left', {
            "where": [{
                "field": "poa",
                "value": presupuesto_aprobado.poa_id
            }]
        }, function (result) {
            if (result) {
                presupuesto_aprobado.presupuesto_institucional_p = LAN.money(result.presupuesto).format(true);
                presupuesto_aprobado.presupuesto_institucional_validar = LAN.money(result.presupuesto).format(true);
                presupuesto_aprobado.restante = LAN.money(((result.presupuesto || 0) - (result.presupuesto_x_departamento || 0))).format(true);
                presupuesto_aprobado.presupuesto_consumido = LAN.money((result.presupuesto_x_departamento || 0)).format(true);
                $('[name="restante"]').val(presupuesto_aprobado.restante);
                presupuesto_aprobado.refreshAngular();
            }
            // RUN_B("presupuesto_aprobado", presupuesto_aprobado, $scope, $http, $compile);
        });
        presupuesto_aprobado.fixFilters = [
            {
                "field": "poa",
                "value": presupuesto_aprobado.poa_id
            },
            {
                "field": "compania",
                "value": new SESSION().current().institucion_id || new SESSION().current().compania_id
            }
        ];
    };
    presupuesto_aprobado.updateInputPresupuesto();
    presupuesto_aprobado.open_modal_autoriza_departamento = function (_data) {
        presupuesto_aprobado.modalAction('mega_presupuesto_aprobado', 'Presupuestos', 'design', 'new', {});
    };
    presupuesto_aprobado.no_trabaja_poa = function () {
        if (presupuesto_aprobado.group_caracteristica != ENUM_2.Grupos.analista_departamental && presupuesto_aprobado.group_caracteristica != ENUM_2.Grupos.director_departamental) {
            return true;
        } else {
            return false;
        }
    };

    presupuesto_aprobado.triggers.table.after.insert = function (data) {
        // console.log(data,presupuesto_aprobado.form.selected('departamento').nombre);
        var data_json_email = {
            title: MESSAGE.ieval('planificacion.titulo_send_presupuesto_add', {
                field: presupuesto_aprobado.form.selected('departamento').nombre,
                field2: LAN.money(data.inserting.valor).format(true)
            }),
            content: MESSAGE.ieval('planificacion.titulo_send_presupuesto_add', {
                field: presupuesto_aprobado.form.selected('departamento').nombre,
                field2: LAN.money(data.inserting.valor).format(true)
            })
        };
        var data_json_push = {
            title: MESSAGE.ieval('planificacion.titulo_send_presupuesto_add', {
                field: presupuesto_aprobado.form.selected('departamento').nombre,
                field2: LAN.money(data.inserting.valor).format(true)
            }),
            content: MESSAGE.ieval('planificacion.titulo_send_presupuesto_add', {
                field: presupuesto_aprobado.form.selected('departamento').nombre,
                field2: LAN.money(data.inserting.valor).format(true)
            })
        };
        presupuesto_aprobado.email_send(data_json_email, data_json_push);
        return true;
    };
    presupuesto_aprobado.triggers.table.after.update = function (data) {
        // console.log(data,presupuesto_aprobado.form.selected('departamento').nombre);
        var data_json_email = {
            title: MESSAGE.ieval('planificacion.titulo_send_presupuesto_edit', {
                field: presupuesto_aprobado.form.selected('departamento').nombre,
                field2: LAN.money(data.updating.valor).format(true),
                field3: LAN.money(presupuesto_aprobado.valor_antes).format(true)
            }),
            content: MESSAGE.ieval('planificacion.titulo_send_presupuesto_edit', {
                field: presupuesto_aprobado.form.selected('departamento').nombre,
                field2: LAN.money(data.updating.valor).format(true),
                field3: LAN.money(presupuesto_aprobado.valor_antes).format(true)
            })
        };
        var data_json_push = {
            title: MESSAGE.ieval('planificacion.titulo_send_presupuesto_edit', {
                field: presupuesto_aprobado.form.selected('departamento').nombre,
                field2: LAN.money(data.updating.valor).format(true),
                field3: LAN.money(presupuesto_aprobado.valor_antes).format(true)
            }),
            content: MESSAGE.ieval('planificacion.titulo_send_presupuesto_edit', {
                field: presupuesto_aprobado.form.selected('departamento').nombre,
                field2: LAN.money(data.updating.valor).format(true),
                field3: LAN.money(presupuesto_aprobado.valor_antes).format(true)
            })
        };
        presupuesto_aprobado.email_send(data_json_email, data_json_push);
        return true;
    };
    presupuesto_aprobado.email_send = async function (json_email, json_push) {
        let array_grupos = [];
        let code = [];
        let usuario_data = [];
        let usuario_director = [];
        let id_usuarios = [];
        let correo_usuarios = [];

        BASEAPI.listp('group', {
            limit: 0
        }).then(function (rs_g) {
            code = rs_g.data;
            let cod = code.filter(search => {
                return search.caracteristica == ENUM_2.Grupos.director_general || search.caracteristica == ENUM_2.Grupos.solo_lectura;
            });
            for (key in cod) {
                array_grupos.push(cod[key].id);
            }
        });

        BASEAPI.listp('usuario', {
            limit: 0,
            where: [
                {
                    "field": "nombre",
                    "operator": "!=",
                    "value": "Admin"
                },
                {
                    "field": "compania",
                    "value": presupuesto_aprobado.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": presupuesto_aprobado.session.institucion_id ? "=" : "is",
                    "value": presupuesto_aprobado.session.institucion_id ? presupuesto_aprobado.session.institucion_id : "$null"
                }
            ]
        }).then(function (result) {
            usuario_data = result.data;
            for (let i = 0; i < array_grupos.length; i++) {
                usuario_director.push(usuario_data.filter(search => {
                    return search.profile == array_grupos[i];
                }));
            }
            for (item of usuario_director) {
                for (resul of item) {
                    id_usuarios.push(resul.id);
                    correo_usuarios.push(resul.correo);
                }
            }
            // console.log(id_usuarios,correo_usuarios);
            if (id_usuarios.length > 0 && correo_usuarios.length > 0) {
                let data_json = {
                    title: json_push.title,
                    content: json_push.content,
                    user: id_usuarios,
                    url: 'actividades_poa'
                };
                send_notification.send.send(data_json);
                let data_json_email = {
                    to: correo_usuarios,
                    subject: json_email.title,
                    name_show: "NoReply",
                    template: 'email/plane',
                    message: json_email.content,
                    notification: 'yes'
                };
                send_notification.send.email(data_json_email);
            }
        });
    };

    presupuesto_aprobado.check_poa_close = function () {
        if (session.est_pei == ENUM_2.pei_estatus.Autorizado) {
            if (session.est_poa === ENUM_2.poa_estatus.Cerrado) {
                presupuesto_aprobado.form.options.presupuesto_institucional_p.disabled = true;
                CRUD_presupuesto_aprobado.table.batch = false;
                presupuesto_aprobado.refreshAngular();
                $('.icon-plus-circle2 ').parent().hide();
            } else {
                CRUD_presupuesto_aprobado.table.batch = true;
                presupuesto_aprobado.refreshAngular();
                $('.icon-plus-circle2 ').parent().show();
            }
        }
        return session.est_poa !== ENUM_2.poa_estatus.Cerrado;
    }
    presupuesto_aprobado.check_pei = async function () {
        presupuesto_aprobado.myPei = await BASEAPI.firstp('pei', {
            where: [
                {
                    field: "id",
                    value: presupuesto_aprobado.pei
                }
            ]
        });
        if (presupuesto_aprobado.myPei.estatus == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
            $('.icon-plus-circle2 ').parent().hide();
        } else {
            $('.icon-plus-circle2 ').parent().show();
        }
    }
});
