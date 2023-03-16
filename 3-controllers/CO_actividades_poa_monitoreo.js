app.controller("actividades_poa_monitoreo", function ($scope, $http, $compile) {
    actividades_poa_monitoreo = this;
    actividades_poa_monitoreo.destroyForm = false;
    actividades_poa_monitoreo.id_actividad = [];
    actividades_poa_monitoreo.fileSI = [];
    actividades_poa_monitoreo.alert = false;
    actividades_poa_monitoreo.auditModel = "vw_actividades_poa";
    var session = new SESSION().current();
    actividades_poa_monitoreo.compania_idid = session.compania_id;
    actividades_poa_monitoreo.institucion_idid = session.institucion_id;
    var titulo_push = "";
    var cuerpo_push = "";
    var titulo = "";
    var cuerpo = "";
    var nombre_estatus_titulo = '';
    var nombre_estatus_cuerpo = '';
    actividades_poa_monitoreo.show_export_tab = true;
    actividades_poa_monitoreo.poa_id = session.poa_id === null ? 0 : session.poa_id;
    actividades_poa_monitoreo.group_caracteristica = session.groups[0] ? session.groups[0].caracteristica : "";
    actividades_poa_monitoreo.director_general = "DG";
    actividades_poa_monitoreo.analista_de_planificacion = "AP";
    actividades_poa_monitoreo.solo_lectura = "SL";
    actividades_poa_monitoreo.analista_departamental = "AD";
    actividades_poa_monitoreo.director_departamental = "DP";
    actividades_poa_monitoreo.array_grupos = [];
    actividades_poa_monitoreo.id_user_msj = [];
    actividades_poa_monitoreo.correos_user_msj = [];
    actividades_poa_monitoreo.correo_user_msj = [];
    actividades_poa_monitoreo.NopermitirCancelar = false;
    actividades_poa_monitoreo.session = session;
    actividades_poa_monitoreo.no_trabaja_poa = function () {
        if (actividades_poa_monitoreo.group_caracteristica != actividades_poa_monitoreo.analista_departamental && actividades_poa_monitoreo.group_caracteristica != actividades_poa_monitoreo.director_departamental) {
            return true;
        } else {
            return false;
        }
    };
    actividades_poa_monitoreo.SaveAndContinue = function () {

        VALIDATION.save(actividades_poa_monitoreo, async function () {
            if (actividades_poa_monitoreo.estatus == ENUM_2.actividad_poa_estatus.Completada.toString()) {
                actividades_poa_monitoreo.pages.form.saveAlter(['comentario_comment']);
            } else {
                SWEETALERT.loading({message: MESSAGE.i('mono.procesing')});
                actividades_poa_monitoreo.soloAnadirComentario();
                comentarios_actividades_poa.refresh();
                SWEETALERT.stop();
            }
            if (ShowCountactividadfile_comment !== undefined) {
                ShowCountactividadfile_comment(true);
                console.log("clean");
            }
        }, ['comentario_comment']);
        if (ShowCountactividadfile_comment !== undefined) {
            ShowCountactividadfile_comment(true);
            console.log("clean");
        }
    };
    actividades_poa_monitoreo.fixFilters = [
        {
            "field": "poa",
            "value": actividades_poa_monitoreo.poa_id
        },
        {
            "field": "tempid",
            "operator": "is",
            "value": "$null"
        },
    ];

    if (actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.director_departamental || actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
        if (session.departamento) {
            actividades_poa_monitoreo.fixFilters = [];
            actividades_poa_monitoreo.fixFilters.push({
                "field": "departamento",
                "value": session.departamento
            });
            actividades_poa_monitoreo.fixFilters.push(
                {
                    field: "poa",
                    value: actividades_poa_monitoreo.session.poa_id
                },
                {
                    "field": "tempid",
                    "operator": "is",
                    "value": "$null"
                },
            );
        }
        if (actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            actividades_poa_monitoreo.fixFilters.push({
                "field": "responsable_id",
                "value": session.id
            });
        }
    } else {
        actividades_poa_monitoreo.departamentoPre = (actividades_poa_monitoreo.poa_id - 99999).toString();
    }


    TRIGGER.run(actividades_poa_monitoreo);
    actividades_poa_monitoreo.triggers.table.after.load = async function (records) {
        actividades_poa_monitoreo.fileSI = [];
        for (var items of records.data) {
            actividades_poa_monitoreo.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/actividades_poa_monitoreo/actividadfile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        actividades_poa_monitoreo.fileSI.push({id: items.id});
                        resolve(true);
                    } else {
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for (var item of buttons) {
                            item.disabled = false;
                        }
                        resolve(false);
                    }
                }, $('#invisible'));
            });
            await actividades_poa_monitoreo.files();
            actividades_poa_monitoreo.refreshAngular();
        }
        check_poa_close(actividades_poa_monitoreo, session);
    };

    RUNCONTROLLER("actividades_poa_monitoreo", actividades_poa_monitoreo, $scope, $http, $compile);
    RUN_B("actividades_poa_monitoreo", actividades_poa_monitoreo, $scope, $http, $compile);
    FORM.run(actividades_poa_monitoreo, $http, 'filtros');
    actividades_poa_monitoreo.triggers.table.after.close = function (data) {
        // actividades_poa_monitoreo.refresh()
    };
    actividades_poa_monitoreo.triggers.table.after.open = async function (data) {
        let quierorefrescar = false;
        let dataan = await BASEAPI.firstp('vw_actividadesCanComplete', {
            where: [{value: actividades_poa_monitoreo.id}]
        });
        if (dataan) {
            actividades_poa_monitoreo.canStatus = ["3", "4"];
        } else {
            if (actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.director_general) {
                actividades_poa_monitoreo.canStatus = [];
            } else {
                actividades_poa_monitoreo.canStatus = ["1", "5"];
            }
        }
        quierorefrescar = true;

        dataan = await BASEAPI.firstp('vw_get_cant_activapoyo_activ', {
            where: [{value: actividades_poa_monitoreo.id}]
        });
        if (dataan) {
            if (dataan.cantidad_actividades_apoyo_completa > 0) {
                actividades_poa_monitoreo.NopermitirCancelar = true;
            } else {
                actividades_poa_monitoreo.NopermitirCancelar = false;
            }
        }

        actividades_poa_monitoreo.dont_show_money = actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.director_departamental || actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.analista_departamental;
        actividades_poa_monitoreo.presupuesto_old = LAN.money(actividades_poa_monitoreo.presupuesto).value;
        actividades_poa_monitoreo.presupuesto_ver = LAN.money(actividades_poa_monitoreo.presupuesto).format(true);
        actividades_poa_monitoreo.show_presupuesto_consumido = LAN.money(actividades_poa_monitoreo.presupuesto_consumido).format(true);
        if (!actividades_poa_monitoreo.maneja_presupuesto) {
            if (actividades_poa_monitoreo.form.options.presupuesto)
                actividades_poa_monitoreo.form.options.presupuesto.disabled = false;
        } else {
            if (actividades_poa_monitoreo.form.options.presupuesto)
                actividades_poa_monitoreo.form.options.presupuesto.disabled = true;
        }
        if (actividades_poa_monitoreo.dataooo) {
            actividades_poa_monitoreo.form.options.actividadfile.truetext = "Ver Evidencias";
            actividades_poa_monitoreo.form.options.actividadfile_comment.truetext = "Ver Evidencias";
            actividades_poa_monitoreo.form.options.actividadfile.title = "Ver Evidencias";
            actividades_poa_monitoreo.form.options.actividadfile_comment.title = "Ver Evidencias";
            if (actividades_poa_monitoreo.actividadfile_DragonCountFile > 0) {
                actividades_poa_monitoreo.mostrar_actividad = true;
            } else {
                actividades_poa_monitoreo.mostrar_actividad = false;
            }
            if (actividades_poa_monitoreo.actividadfile_comment_DragonCountFile > 0) {
                actividades_poa_monitoreo.mostrar_comentario = true;
            } else {
                actividades_poa_monitoreo.mostrar_comentario = false;
            }
            for (var a in actividades_poa_monitoreo.form.options) {
                actividades_poa_monitoreo.form.options[a].disabled = true;
                actividades_poa_monitoreo.setPermission("file.upload", false);
                if (actividades_poa_monitoreo.group_caracteristica !== ENUM_2.Grupos.director_general) {
                    actividades_poa_monitoreo.setPermission("file.remove", false);
                }
            }

            quierorefrescar = true;
        } else {
            actividades_poa_monitoreo.mostrar_actividad = true;
            actividades_poa_monitoreo.mostrar_comentario = true;
            actividades_poa_monitoreo.form.options.actividadfile.truetext = "Subir Evidencias";
            actividades_poa_monitoreo.form.options.actividadfile_comment.truetext = "Subir Evidencias";
            actividades_poa_monitoreo.form.options.actividadfile.title = "Subir Evidencias";
            actividades_poa_monitoreo.form.options.actividadfile_comment.title = "Subir Evidencias";
            actividades_poa_monitoreo.setPermission("file.upload", true);
            actividades_poa_monitoreo.setPermission("file.remove", true);
            quierorefrescar = true;
        }
        if (quierorefrescar)
            actividades_poa_monitoreo.refreshAngular();
    };
    actividades_poa_monitoreo.triggers.table.after.audit = () => new Promise(async (resolve, reject) => {
        if (dragon_audit.storageModel == "vw_actividades_poa") {
            if (dragon_audit.dataForView.action == "insert") {
                dragon_audit.dataForView.dataJson.fecha_inicio = LAN.date(dragon_audit.dataForView.dataJson.fecha_inicio);
                dragon_audit.dataForView.dataJson.fecha_fin = LAN.date(dragon_audit.dataForView.dataJson.fecha_fin);
                dragon_audit.dataForView.dataJson.presupuesto = LAN.money(dragon_audit.dataForView.dataJson.presupuesto);
                dragon_audit.dataForView.dataJson.maneja_presupuesto = dragon_audit.dataForView.dataJson.maneja_presupuesto == 1 ? 'Sí' : 'No';
                dragon_audit.dataForView.dataJson.producto =
                    await actividades_poa_monitoreo.runMagicColumAudit('productos_poa',
                        dragon_audit.dataForView.dataJson.producto,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson.departamento =
                    await actividades_poa_monitoreo.runMagicColumAudit('departamento',
                        dragon_audit.dataForView.dataJson.departamento,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson.estatus =
                    await actividades_poa_monitoreo.runMagicColumAudit('actividades_poa_estatus',
                        dragon_audit.dataForView.dataJson.estatus,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson.poa =
                    await actividades_poa_monitoreo.runMagicColumAudit('poa',
                        dragon_audit.dataForView.dataJson.poa,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson.responsable =
                    await actividades_poa_monitoreo.runMagicColumAudit('vw_usuario_compania_pei_poa',
                        dragon_audit.dataForView.dataJson.responsable,
                        'id', 'usuario');

                dragon_audit.dataForView.dataJson.tipo_inversion =
                    await actividades_poa_monitoreo.runMagicColumAudit('tipo_inversion',
                        dragon_audit.dataForView.dataJson.tipo_inversion,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "tipo_inversion", "nombre", "descripcion", "compania", "responsable",
                        "poa", "estatus", "departamento", "producto", "maneja_presupuesto", "presupuesto",
                        "fecha_fin", "fecha_inicio"
                    ]);
            }

            if (dragon_audit.dataFoerView.action == "update") {
                dragon_audit.dataForView.dataJson.fecha_inicio = LAN.date(dragon_audit.dataForView.dataJson.fecha_inicio);
                dragon_audit.dataForView.dataJson.fecha_fin = LAN.date(dragon_audit.dataForView.dataJson.fecha_fin);
                dragon_audit.dataForView.dataJson.presupuesto = LAN.money(dragon_audit.dataForView.dataJson.presupuesto);
                dragon_audit.dataForView.dataJson.maneja_presupuesto = dragon_audit.dataForView.dataJson.maneja_presupuesto == 1 ? 'Sí' : 'No';
                dragon_audit.dataForView.dataJson.producto =
                    await actividades_poa_monitoreo.runMagicColumAudit('productos_poa',
                        dragon_audit.dataForView.dataJson.producto,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson.departamento =
                    await actividades_poa_monitoreo.runMagicColumAudit('departamento',
                        dragon_audit.dataForView.dataJson.departamento,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson.estatus =
                    await actividades_poa_monitoreo.runMagicColumAudit('actividades_poa_estatus',
                        dragon_audit.dataForView.dataJson.estatus,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson.poa =
                    await actividades_poa_monitoreo.runMagicColumAudit('poa',
                        dragon_audit.dataForView.dataJson.poa,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson.responsable =
                    await actividades_poa_monitoreo.runMagicColumAudit('vw_usuario_compania_pei_poa',
                        dragon_audit.dataForView.dataJson.responsable,
                        'id', 'usuario');

                dragon_audit.dataForView.dataJson.tipo_inversion =
                    await actividades_poa_monitoreo.runMagicColumAudit('tipo_inversion',
                        dragon_audit.dataForView.dataJson.tipo_inversion,
                        'id', 'nombre');

                dragon_audit.dataForView.updatedJson.fecha_inicio = LAN.date(dragon_audit.dataForView.updatedJson.fecha_inicio);
                dragon_audit.dataForView.updatedJson.fecha_fin = LAN.date(dragon_audit.dataForView.updatedJson.fecha_fin);
                dragon_audit.dataForView.updatedJson.presupuesto = LAN.money(dragon_audit.dataForView.updatedJson.presupuesto);
                dragon_audit.dataForView.updatedJson.maneja_presupuesto = dragon_audit.dataForView.updatedJson.maneja_presupuesto == 1 ? 'Sí' : 'No';
                dragon_audit.dataForView.updatedJson.producto =
                    await actividades_poa_monitoreo.runMagicColumAudit('productos_poa',
                        dragon_audit.dataForView.updatedJson.producto,
                        'id', 'nombre');

                dragon_audit.dataForView.updatedJson.departamento =
                    await actividades_poa_monitoreo.runMagicColumAudit('departamento',
                        dragon_audit.dataForView.updatedJson.departamento,
                        'id', 'nombre');

                dragon_audit.dataForView.updatedJson.estatus =
                    await actividades_poa_monitoreo.runMagicColumAudit('actividades_poa_estatus',
                        dragon_audit.dataForView.updatedJson.estatus,
                        'id', 'nombre');

                dragon_audit.dataForView.updatedJson.poa =
                    await actividades_poa_monitoreo.runMagicColumAudit('poa',
                        dragon_audit.dataForView.updatedJson.poa,
                        'id', 'nombre');

                dragon_audit.dataForView.updatedJson.responsable =
                    await actividades_poa_monitoreo.runMagicColumAudit('vw_usuario_compania_pei_poa',
                        dragon_audit.dataForView.updatedJson.responsable,
                        'id', 'usuario');

                dragon_audit.dataForView.updatedJson.tipo_inversion =
                    await actividades_poa_monitoreo.runMagicColumAudit('tipo_inversion',
                        dragon_audit.dataForView.updatedJson.tipo_inversion,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "tipo_inversion", "nombre", "descripcion", "compania", "responsable",
                        "poa", "estatus", "departamento", "producto", "maneja_presupuesto", "presupuesto",
                        "fecha_fin", "fecha_inicio"
                    ]);

                dragon_audit.dataForView.updatedJson = DSON.removeOther(dragon_audit.dataForView.updatedJson,
                    ["id", "tipo_inversion", "nombre", "descripcion", "compania", "responsable",
                        "poa", "estatus", "departamento", "producto", "maneja_presupuesto", "presupuesto",
                        "fecha_fin", "fecha_inicio"
                    ]);
            }

            if (dragon_audit.dataForView.action == "delete") {
                dragon_audit.dataForView.dataJson.fecha_inicio = LAN.date(dragon_audit.dataForView.dataJson.fecha_inicio);
                dragon_audit.dataForView.dataJson.fecha_fin = LAN.date(dragon_audit.dataForView.dataJson.fecha_fin);
                dragon_audit.dataForView.dataJson.presupuesto = LAN.money(dragon_audit.dataForView.dataJson.presupuesto);
                dragon_audit.dataForView.dataJson.maneja_presupuesto = dragon_audit.dataForView.dataJson.maneja_presupuesto == 1 ? 'Sí' : 'No';
                dragon_audit.dataForView.dataJson.producto =
                    await actividades_poa_monitoreo.runMagicColumAudit('productos_poa',
                        dragon_audit.dataForView.dataJson.producto,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson.poa =
                    await actividades_poa_monitoreo.runMagicColumAudit('poa',
                        dragon_audit.dataForView.dataJson.poa,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson.departamento =
                    await actividades_poa_monitoreo.runMagicColumAudit('departamento',
                        dragon_audit.dataForView.dataJson.departamento,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "tipo_inversion", "nombre", "descripcion", "compania", "responsable",
                        "poa", "estatus", "departamento", "producto", "maneja_presupuesto", "presupuesto",
                        "fecha_fin", "fecha_inicio"
                    ]);
            }

            if (dragon_audit.dataForView.action == "Trabajar actividades") {
                dragon_audit.dataForView.dataJson.presupuesto_asignado = LAN.money(dragon_audit.dataForView.dataJson.presupuesto_asignado);
            }
        }
        resolve(true);
    });

    if (actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.director_departamental || actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
        console.log("entre");
        actividades_poa_monitoreo.departamento_list = eval(session.departamentos_y_secundarios);
        actividades_poa_monitoreo.selectQueries['departamentoPre'] = [
            {
                "field": "poa",
                "operator": "=",
                "value": session.poa_id
            },
            {
                "field": "id",
                "value": actividades_poa_monitoreo.departamento_list
            }
        ];
    } else {
        if (!new SESSION().current().intersectorial) {
            actividades_poa_monitoreo.selectQueries['departamentoPre'] = [
                {
                    field: "compania",
                    operator: "=",
                    value: session.compania_id
                },
                {
                    "field": "poa",
                    "operator": "=",
                    "value": session.poa_id
                }
            ];
        } else {

        }
        if (!new SESSION().current().interinstitucional && new SESSION().current().institucion_id) {
            actividades_poa_monitoreo.selectQueries['departamentoPre'] = [
                {
                    field: "institucion",
                    operator: "=",
                    value: session.institucion_id
                },
                {
                    "field": "poa",
                    "operator": "=",
                    "value": session.poa_id
                }
            ];
        }
    }

    actividades_poa_monitoreo.make_alert = function () {
        actividades_poa_monitoreo.change_normal_comments();
        actividades_poa_monitoreo.pages.form.save = function (pre, post, close) {
            var newRecord = {};
            var state = actividades_poa_monitoreo.validation.statePure();
            if (state === VALIDATION.types.success) {
                actividades_poa_monitoreo.form.saveAction(close);
            } else {
                if (state === VALIDATION.types.warning) {
                    SWEETALERT.confirm({
                        message:
                            MESSAGE.i('alerts.ContainsWarning'),
                        confirm: function () {
                            actividades_poa_monitoreo.form.saveAction(close);
                        }
                    });
                } else {
                    actividades_poa_monitoreo.form.intent = true;
                    SWEETALERT.show({
                        type: "error",
                        message: "El campo de comentario está vacío favor pasar al tab de comentarios y llenarlo pues este es obligatorio",
                        confirm: function () {
                            actividades_poa_monitoreo.pages.form.focusFirstValidation();
                        }
                    });

                }
            }
        };
    };
    actividades_poa_monitoreo.undo_alert = function () {
        actividades_poa_monitoreo.alert = false;
        actividades_poa_monitoreo.change_normal_comments();
        actividades_poa_monitoreo.pages.form.save = function (pre, post, close) {
            var newRecord = {};
            var state = actividades_poa_monitoreo.validation.statePure();
            if (state === VALIDATION.types.success) {
                actividades_poa_monitoreo.form.saveAction(close);
            } else {
                if (state === VALIDATION.types.warning) {
                    SWEETALERT.confirm({
                        message:
                            MESSAGE.i('alerts.ContainsWarning'),
                        confirm: function () {
                            actividades_poa_monitoreo.form.saveAction(close);
                        }
                    });
                } else {
                    actividades_poa_monitoreo.form.intent = true;
                    SWEETALERT.show({
                        type: "error",
                        message: MESSAGE.i('alerts.ContainsError'),
                        confirm: function () {
                            actividades_poa_monitoreo.pages.form.focusFirstValidation();
                        }
                    });

                }
            }
        };
    };
    actividades_poa_monitoreo.cargar = true;
    actividades_poa_monitoreo.triggers.table.after.control = function (data) {
        let quierorefrescar = false;
        var session = new SESSION().current();
        if (data == 'departamentoPre') {
            if (actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.director_departamental || actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                actividades_poa_monitoreo.departamentoPre = session.departamento + "";
                if (actividades_poa_monitoreo.filtros.selected('departamentoPre') !== null) {
                    actividades_poa_monitoreo.valor = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').valor).format(true);
                    actividades_poa_monitoreo.presupuesto_restantePre = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_restante).format(true);
                    actividades_poa_monitoreo.presupuesto_actividades = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_actividades).format(true);
                    actividades_poa_monitoreo.presupuesto_liberado = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_liberado).format(true);
                    actividades_poa_monitoreo.refrescarInputs();
                    actividades_poa_monitoreo.refresh();
                }
            } else {
                // if (STORAGE.exist('depaM')) {
                //     actividades_poa_monitoreo.departamentoPre = STORAGE.get('depaM');
                // } else {
                //     actividades_poa_monitoreo.departamentoPre = (actividades_poa_monitoreo.poa_id - 99999).toString();
                // }
                // actividades_poa_monitoreo.valor = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').valor).format(true);
                // actividades_poa_monitoreo.presupuesto_restantePre = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_restante).format(true);
                // actividades_poa_monitoreo.presupuesto_actividades = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_actividades).format(true);
                // actividades_poa_monitoreo.presupuesto_liberado = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_liberado).format(true);
                // actividades_poa_monitoreo.refrescarInputs();
                if (actividades_poa_monitoreo.cargar) {
                    if (actividades_poa_monitoreo.no_trabaja_poa()) {
                    } else {
                        actividades_poa_monitoreo.filtros.options.departamentoPre.disabled = true;
                        quierorefrescar = true;
                    }
                    if (false) {
                        actividades_poa_monitoreo.departamentoPre = STORAGE.get('depaM');
                        actividades_poa_monitoreo.cargar = false;
                        actividades_poa_monitoreo.filtros.loadDropDown('departamentoPre');
                    } else {
                        actividades_poa_monitoreo.departamentoPre = session.departamento + "";
                        actividades_poa_monitoreo.cargar = false;
                        actividades_poa_monitoreo.filtros.loadDropDown('departamentoPre');
                        actividades_poa_monitoreo.refresh();
                    }
                    if (actividades_poa_monitoreo.filtros.selected('departamentoPre') !== null) {
                        if (actividades_poa_monitoreo.filtros.selected('departamentoPre').id < 0) {
                            actividades_poa_monitoreo.fixFilters = [
                                {
                                    "field": "poa",
                                    "value": actividades_poa_monitoreo.poa_id
                                },
                                {
                                    "field": "tempid",
                                    "operator": "is",
                                    "value": "$null"
                                },
                            ];
                            if (session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                                actividades_poa_monitoreo.fixFilters.push({
                                    "field": "responsable_id",
                                    "value": session.id
                                });
                            }
                        } else {
                            STORAGE.add('depaM', actividades_poa_monitoreo.departamentoPre);
                            actividades_poa_monitoreo.fixFilters = [
                                {
                                    "field": "poa",
                                    "value": actividades_poa_monitoreo.poa_id
                                },
                                {
                                    "field": "departamento",
                                    "value": actividades_poa_monitoreo.filtros.selected('departamentoPre').id
                                },
                                {
                                    "field": "tempid",
                                    "operator": "is",
                                    "value": "$null"
                                },
                            ];
                            if (session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                                actividades_poa_monitoreo.fixFilters.push({
                                    "field": "responsable_id",
                                    "value": session.id
                                });
                            }
                        }
                        actividades_poa_monitoreo.valor = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').valor).format(true);
                        actividades_poa_monitoreo.presupuesto_restantePre = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_restante).format(true);
                        actividades_poa_monitoreo.presupuesto_actividades = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_actividades).format(true);
                        actividades_poa_monitoreo.presupuesto_liberado = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_liberado).format(true);

                        actividades_poa_monitoreo.refrescarInputs();
                    } else {
                        if (false) {
                            actividades_poa_monitoreo.departamentoPre = STORAGE.get('depaM');
                        } else {
                            actividades_poa_monitoreo.departamentoPre = (actividades_poa_monitoreo.poa_id - 99999).toString();
                        }
                        actividades_poa_monitoreo.fixFilters = [
                            {
                                "field": "poa",
                                "value": actividades_poa_monitoreo.poa_id
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                            actividades_poa_monitoreo.fixFilters.push({
                                "field": "responsable_id",
                                "value": session.id
                            });
                        }
                        actividades_poa_monitoreo.refrescarInputs();
                    }
                }
            }
        }
        if (quierorefrescar)
            actividades_poa_monitoreo.refreshAngular();
    };

    actividades_poa_monitoreo.refrescarInputs = function () {
        // actividades_poa_monitoreo.refresh();
    };
    actividades_poa_monitoreo.myfirsttime = 0;
    actividades_poa_monitoreo.$scope.$watch('actividades_poa_monitoreo.departamentoPre', function (value) {
        var session = new SESSION().current();
        if (actividades_poa_monitoreo.myfirsttime > 1) {
            if (actividades_poa_monitoreo.filtros.selected('departamentoPre') !== null) {
                if (actividades_poa_monitoreo.filtros.selected('departamentoPre').id < 0) {
                    actividades_poa_monitoreo.fixFilters = [
                        {
                            "field": "poa",
                            "value": actividades_poa_monitoreo.poa_id
                        },
                        {
                            "field": "tempid",
                            "operator": "is",
                            "value": "$null"
                        },
                    ];
                    if (session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                        actividades_poa_monitoreo.fixFilters.push({
                            "field": "responsable_id",
                            "value": session.id
                        });
                    }
                } else {
                    STORAGE.add('depaM', actividades_poa_monitoreo.departamentoPre);
                    actividades_poa_monitoreo.fixFilters = [
                        {
                            "field": "poa",
                            "value": actividades_poa_monitoreo.poa_id
                        },
                        {
                            "field": "departamento",
                            "value": value
                        },
                        {
                            "field": "tempid",
                            "operator": "is",
                            "value": "$null"
                        },
                    ];
                    if (session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                        actividades_poa_monitoreo.fixFilters.push({
                            "field": "responsable_id",
                            "value": session.id
                        });
                    }
                }
                actividades_poa_monitoreo.valor = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').valor).format(true);
                actividades_poa_monitoreo.presupuesto_restantePre = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_restante).format(true);
                actividades_poa_monitoreo.presupuesto_actividades = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_actividades).format(true);
                actividades_poa_monitoreo.presupuesto_liberado = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_liberado).format(true);

                actividades_poa_monitoreo.refresh();
            } else {
                if (false) {
                    actividades_poa_monitoreo.departamentoPre = STORAGE.get('depaM');
                } else {
                    actividades_poa_monitoreo.departamentoPre = (actividades_poa_monitoreo.poa_id - 99999).toString();
                }
                actividades_poa_monitoreo.fixFilters = [
                    {
                        "field": "poa",
                        "value": actividades_poa_monitoreo.poa_id
                    },
                    {
                        "field": "tempid",
                        "operator": "is",
                        "value": "$null"
                    },
                ];
                if (session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                    actividades_poa_monitoreo.fixFilters.push({
                        "field": "responsable_id",
                        "value": session.id
                    });
                }
                actividades_poa_monitoreo.valor = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').valor).format(true);
                actividades_poa_monitoreo.presupuesto_restantePre = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_restante).format(true);
                actividades_poa_monitoreo.presupuesto_actividades = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_actividades).format(true);
                actividades_poa_monitoreo.presupuesto_liberado = LAN.money(actividades_poa_monitoreo.filtros.selected('departamentoPre').presupuesto_liberado).format(true);

                actividades_poa_monitoreo.refresh();
            }
        }
        actividades_poa_monitoreo.myfirsttime++;
    });

    actividades_poa_monitoreo.singular = MESSAGE.i('planificacion.titleActividadPOAT');
    actividades_poa_monitoreo.plural = MESSAGE.i('planificacion.titleActividadPOAT');
    if (!actividades_poa_monitoreo.no_trabaja_poa()) {
        actividades_poa_monitoreo.fixFilters.push(
            {
                field: "departamento",
                operator: "=",
                value: session.departamento
            }
        );
    }

    title_header_table_poa(actividades_poa_monitoreo, "Actualización de datos / " + MESSAGE.i('planificacion.titleActividadPOAT'));
    actividades_poa_monitoreo.formulary = function (data, mode, defaultData) {
        if (actividades_poa_monitoreo !== undefined) {
            RUN_B("actividades_poa_monitoreo", actividades_poa_monitoreo, $scope, $http, $compile);
            var load_me_once = false;
            actividades_poa_monitoreo.form.schemas.insert.comentario = FORM.schemasType.calculated;
            actividades_poa_monitoreo.form.schemas.update.comentario = FORM.schemasType.calculated;
            actividades_poa_monitoreo.form.schemas.insert.presupuesto_restante_show = FORM.schemasType.calculated;
            actividades_poa_monitoreo.form.schemas.update.presupuesto_restante_show = FORM.schemasType.calculated;
            actividades_poa_monitoreo.form.schemas.insert.comentario_comment = FORM.schemasType.calculated;
            actividades_poa_monitoreo.form.schemas.update.comentario_comment = FORM.schemasType.calculated;

            actividades_poa_monitoreo.departamento_old_ = actividades_poa_monitoreo.departamentoPre;
            actividades_poa_monitoreo.form.titles = {
                new: MESSAGE.i('planificacion.titleActividadPOA'),
                edit: `${MESSAGE.i('planificacion.titleTrabajar')}` + " - " + `${MESSAGE.i('planificacion.titleActividadPOAT')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleActividadPOAT')}`
            };
            // implementacion del envio de las notificaciones para los directores de los departamentos begin
            actividades_poa_monitoreo.form.after.update = async function (data) {
                var usuario = actividades_poa_monitoreo.form.selected('responsable');
                var nombre_actividad = actividades_poa_monitoreo.nombre;
                if (actividades_poa_monitoreo.estatus == ENUM_2.actividad_poa_estatus.Completada.toString()) {
                    titulo_push = `Se ha completado la actividad "${nombre_actividad}"`;
                    cuerpo_push = `${usuario.nombre + ' ' + usuario.apellido} se ha completado la actividad: "${nombre_actividad}". Proceder a tomar las acciones que considre pertinente.`;

                    titulo = `Se ha completado la actividad "${nombre_actividad}"`;
                    cuerpo = `${usuario.nombre + ' ' + usuario.apellido} se ha completado la actividad: "${nombre_actividad}". Proceder a tomar las acciones que considre pertinente.`;
                    actividades_poa_monitoreo.data_json2 = {
                        title: titulo_push,
                        content: cuerpo_push,
                        user: [actividades_poa_monitoreo.form.selected('responsable').id],
                        url: 'actividades_poa_monitoreo'
                    };
                    send_notification.send.send(actividades_poa_monitoreo.data_json2);

                    actividades_poa_monitoreo.data_json_email2 = {
                        to: actividades_poa_monitoreo.form.selected('responsable').correo,
                        subject: titulo,
                        name_show: "NoReply",
                        template: 'email/plane',
                        message: cuerpo,
                        notification: 'no'
                    };
                    send_notification.send.email(actividades_poa_monitoreo.data_json_email2);
                    // function_send_email_group(titulo_push, cuerpo_push, titulo, cuerpo, session.compania_id, actividades_poa_monitoreo.departamento_old_);
                    BASEAPI.updateall('actividades_apoyo', {
                        estatus: ENUM_2.actividad_apoyo_estatus.Completa,
                        where: [
                            {
                                field: "actividades_poa",
                                value: actividades_poa_monitoreo.id
                            },
                            {
                                field: "estatus",
                                value: ENUM_2.actividad_apoyo_estatus.Pendiente
                            }
                        ]
                    });
                } else {
                    if (actividades_poa_monitoreo.estatus != actividades_poa_monitoreo.estatus_old) {
                        if (actividades_poa_monitoreo.estatus === ENUM_2.actividad_poa_estatus.Detenida.toString()) {
                            nombre_estatus_titulo = `Actividad "${nombre_actividad}" ha sido detenida`;
                            nombre_estatus_cuerpo = `Se ha detenido la actividad: "${nombre_actividad}"`;
                            titulo_push = nombre_estatus_titulo;
                            cuerpo_push = nombre_estatus_cuerpo;
                            titulo = nombre_estatus_titulo;
                            cuerpo = nombre_estatus_cuerpo;
                            function_send_email_group(titulo_push, cuerpo_push, titulo, cuerpo, session.compania_id, actividades_poa_monitoreo.departamento_old_, actividades_poa_monitoreo.form.selected('responsable').correo, session.institucion_id);
                        } else if (actividades_poa_monitoreo.estatus === ENUM_2.actividad_poa_estatus.Cancelada.toString()) {
                            nombre_estatus_titulo = `Actividad "${nombre_actividad}" ha sido cancelada`;
                            nombre_estatus_cuerpo = `Se ha cancelado la actividad: "${nombre_actividad}"`;
                            BASEAPI.updateall('actividades_apoyo', {
                                estatus: ENUM_2.actividad_apoyo_estatus.Cancelada,
                                where: [
                                    {
                                        field: "actividades_poa",
                                        value: actividades_poa_monitoreo.id
                                    },
                                    {
                                        field: "estatus",
                                        value: ENUM_2.actividad_apoyo_estatus.Pendiente
                                    }
                                ]
                            });
                            titulo_push = nombre_estatus_titulo;
                            cuerpo_push = nombre_estatus_cuerpo;
                            titulo = nombre_estatus_titulo;
                            cuerpo = nombre_estatus_cuerpo;
                            function_send_email_group_user(titulo_push, cuerpo_push, titulo, cuerpo, session.compania_id, actividades_poa_monitoreo.departamento_old_, actividades_poa_monitoreo.form.selected('responsable').correo, session.institucion_id);
                        } else if (actividades_poa_monitoreo.estatus === ENUM_2.actividad_poa_estatus.Abierta.toString()) {
                            nombre_estatus_titulo = `Actividad "${nombre_actividad}" ha sido abierta`;
                            nombre_estatus_cuerpo = `Se ha abierto la actividad ${nombre_actividad}`;
                        } else if (actividades_poa_monitoreo.estatus === ENUM_2.actividad_poa_estatus.Trabajada.toString()) {
                            if (moment(actividades_poa_monitoreo.fecha_fin) < moment()) {
                                nombre_estatus_titulo = `Actividad fuera del tiempo límite establecido`;
                                nombre_estatus_cuerpo = `La Actividad "${nombre_actividad}" fue trabajada posterior a la fecha ${actividades_poa_monitoreo.fecha_fin}`;
                                titulo_push = nombre_estatus_titulo;
                                cuerpo_push = nombre_estatus_cuerpo;
                                titulo = nombre_estatus_titulo;
                                cuerpo = nombre_estatus_cuerpo;
                                function_send_email_group_user(titulo_push, cuerpo_push, titulo, cuerpo, session.compania_id, actividades_poa_monitoreo.departamento_old_, actividades_poa_monitoreo.form.selected('responsable').correo, session.institucion_id);
                            } else {
                                nombre_estatus_titulo = `Actividad ${nombre_actividad} ha sido trabajada`;
                                nombre_estatus_cuerpo = `Se ha trabajado la actividad ${nombre_actividad}`;
                                titulo_push = nombre_estatus_titulo;
                                cuerpo_push = nombre_estatus_cuerpo;
                                titulo = nombre_estatus_titulo;
                                cuerpo = nombre_estatus_cuerpo;
                                function_send_email_group_user(titulo_push, cuerpo_push, titulo, cuerpo, session.compania_id, actividades_poa_monitoreo.departamento_old_, actividades_poa_monitoreo.form.selected('responsable').correo, session.institucion_id);
                            }
                        }
                        //
                        actividades_poa_monitoreo.data_json2 = {
                            title: nombre_estatus_titulo,
                            content: nombre_estatus_cuerpo,
                            user: [actividades_poa_monitoreo.form.selected('responsable').id],
                            url: 'actividades_poa_monitoreo'
                        };
                        send_notification.send.send(actividades_poa_monitoreo.data_json2);

                        // actividades_poa_monitoreo.data_json_email2 = {
                        //     to: actividades_poa_monitoreo.form.selected('responsable').correo,
                        //     subject: nombre_estatus_titulo,
                        //     name_show: "NoReply",
                        //     template: 'email/plane',
                        //     message: nombre_estatus_cuerpo,
                        //     notification: 'no'
                        // };
                        // send_notification.send.email(actividades_poa_monitoreo.data_json_email2);
                    }
                }
            };
            // end
            actividades_poa_monitoreo.form.readonly = {poa: new SESSION().current().poa_id};
            actividades_poa_monitoreo.createForm(data, mode, defaultData);
            actividades_poa_monitoreo.selectQueries['estatus'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: actividades_poa_monitoreo.session.groups[0].id
                },
                {
                    field: 'entidad',
                    operator: '=',
                    value: "actividades_poa"
                }
            ];
            actividades_poa_monitoreo.form.saveSubAction = async function (close) {
                var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                for (var item of buttons) {
                    item.disabled = true;
                }
                var $scope = actividades_poa_monitoreo;
                $scope.form.makeInsert();
                SWEETALERT.loading({message: MESSAGE.ic('mono.saving')});
                if ($scope.form.mode === FORM.modes.new) {
                    for (var i in CONFIG.audit.insert) {
                        var audit = CONFIG.audit.insert[i].replaceAll("&#34;", '"').replaceAll("&#39;", "'");
                        if (eval(`CRUD_${$scope.modelName}`).table.columns[i] !== undefined)
                            eval(`$scope.form.inserting.${i} = '${eval(audit)}';`);
                    }
                    if ($scope.form.before.insert({
                        inserting: $scope.form.inserting,
                        uploading: $scope.form.uploading,
                        multipleRelations: $scope.form.multipleRelations,
                        relations: $scope.form.relations,
                    }))
                        return;
                    var conti = await $scope.triggers.table.before.insert({
                        inserting: $scope.form.inserting,
                        uploading: $scope.form.uploading,
                        multipleRelations: $scope.form.multipleRelations,
                        relations: $scope.form.relations,
                    });
                    if (conti === false) {
                        return;
                    }

                    var crud = eval(`CRUD_${$scope.modelName}`);
                    if (crud.table.dragrow !== false) {
                        var last = await BASEAPI.firstp($scope.tableOrView, {
                            order: 'desc',
                            orderby: crud.table.dragrow,
                            where: $scope.fixFilters,
                        });
                        if (last === undefined)
                            $scope.form.inserting[crud.table.dragrow] = "1";
                        else
                            $scope.form.inserting[crud.table.dragrow] = (parseInt(last[crud.table.dragrow]) + 1).toString();
                    }

                    BASEAPI.insertID($scope.tableOrMethod, $scope.form.inserting, $scope.form.fieldExGET, $scope.form.valueExGET, async function (result) {
                        if (result.data.error === false) {

                            SWEETALERT.loading({message: MESSAGE.i('mono.saving')});
                            var savedRow = result.data.data[0];
                            console.log("yori data", savedRow);
                            $scope.form.after.insert({
                                inserted: savedRow,
                                inserting: $scope.form.inserting,
                                uploading: $scope.form.uploading,
                                multipleRelations: $scope.form.multipleRelations,
                                relations: $scope.form.relations,
                            });

                            $scope.triggers.table.after.insert({
                                inserted: savedRow,
                                inserting: $scope.form.inserting,
                                uploading: $scope.form.uploading,
                                multipleRelations: $scope.form.multipleRelations,
                                relations: $scope.form.relations,
                            });

                            //await AUDIT.LOG(AUDIT.ACTIONS.insert, $scope.modelName, $scope.form.inserting);
                            console.log("yori", $scope.crudConfig);
                            await AUDIT.LOG(AUDIT.ACTIONS.update, $scope.tableOrView ? $scope.tableOrView : $scope.modelName, {
                                id: $scope.id,
                                Nombre: $scope.nombre,
                                comentario: $scope.comentario,
                                estatus: $scope.estatus_object.nombre,
                                condición: $scope.razon != "[NULL]" ? `${$scope.razon_object.nombre} - ${$scope.razon_object.porcentaje}%` : null,
                                presupuesto_asignado: $scope.presupuesto
                            });

                            // console.log($scope.form.inserting);
                            // console.log(savedRow);

                            var firstColumn = eval(`CRUD_${$scope.modelName}`).table.key || "id";
                            var DRAGONID = eval(`savedRow.${firstColumn}`);

                            if ($scope.modelName === CURRENTPRUDENTS)
                                if (!DSON.oseaX(CURRENTPRUDENTS)) {
                                    PRUDENTS[CURRENTPRUDENTS] = DRAGONID;
                                    CURRENTPRUDENTS = "";
                                }
                            $scope.form.mode = FORM.modes.edit;
                            $scope.pages.form.subRequestCompleteVar = 0;
                            $scope.pages.form.subRequestCompleteProgress = 0;
                            $scope.pages.form.subRequestCompleteVar =
                                ($scope.form.uploading.length > 0 ? 1 : 0)
                                + $scope.form.multipleRelations.length
                                + $scope.form.relations.length;

                            if ($scope.pages !== null)
                                if ($scope.pages.form.subRequestCompleteVar === 0) {
                                    var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                                    for (var item of buttons) {
                                        item.disabled = false;
                                    }
                                    $scope.pages.form.close(undefined, undefined, close);
                                    SWEETALERT.stop();
                                    NOTIFY.success(`${$scope.singular} ${MESSAGE.i('mono.saved')}`);
                                }
                            if ($scope.form !== null)
                                if ($scope.form.uploading !== undefined)
                                    if ($scope.form.uploading.length > 0) {
                                        for (var file of $scope.form.uploading)
                                            file.to = file.to.replace('$id', DRAGONID);

                                        BASEAPI.ajax.post(new HTTP().path(["files", "api", "move"]), {moves: $scope.form.uploading}, function (data) {
                                            $scope.pages.form.subRequestComplete(close);
                                            $scope.filesToMove = [];
                                        });
                                    }
                            if ($scope.form !== null)
                                if ($scope.form.relations !== undefined)
                                    if ($scope.form.relations.length > 0) {
                                        for (var relation of $scope.form.relations) {
                                            for (var frel of relation.data) {
                                                for (var i in frel) {
                                                    var vi = frel[i].replace('$id', DRAGONID);
                                                    eval(`frel.${i} = vi`);
                                                }
                                            }
                                            BASEAPI.insert(relation.config.toTable, relation.data, function (data) {
                                                $scope.pages.form.subRequestComplete(close);
                                            });
                                        }
                                    }
                            if ($scope.form !== null)
                                if ($scope.form.multipleRelations !== undefined)
                                    if ($scope.form.multipleRelations.length > 0) {
                                        for (var relation of $scope.form.multipleRelations) {
                                            var dataToUpdate = {};
                                            var dataToWhere = [];
                                            for (var frel of relation.config.where) {
                                                for (var i in frel) {
                                                    var vi = frel[i].replace('$id', relation.tempID);
                                                    eval(`frel.${i} = vi`);
                                                }
                                                dataToWhere.push(frel);
                                            }
                                            for (var i in relation.config.update) {
                                                var vi = relation.config.update[i].replace('$id', DRAGONID);
                                                eval(`dataToUpdate.${i} = vi`);
                                            }
                                            dataToUpdate.where = dataToWhere;
                                            BASEAPI.updateall(relation.config.toTable, dataToUpdate, function (udata) {
                                                $scope.pages.form.subRequestComplete(close);
                                            });
                                        }
                                    }
                        } else {
                            SWEETALERT.stop();
                            ERROR.alert(result.data, ERROR.category.database);
                        }
                    });
                }
                if ($scope.form.mode === FORM.modes.edit) {
                    var firstColumn = eval(`CRUD_${$scope.modelName}`).table.key || "id";
                    var dataToWhere = [{field: firstColumn, value: eval(`$scope.${firstColumn}`)}];
                    var dataToUpdate = $scope.form.inserting;
                    dataToUpdate.where = dataToWhere;
                    for (var i in CONFIG.audit.update) {
                        var audit = CONFIG.audit.update[i].replaceAll("&#34;", '"').replaceAll("&#39;", "'");
                        if (eval(`CRUD_${$scope.modelName}`).table.columns[i] !== undefined)
                            eval(`$scope.form.inserting.${i} = '${eval(audit)}';`);
                    }
                    if ($scope.form.before.update({
                        updating: $scope.form.inserting,
                        uploading: $scope.form.uploading,
                        multipleRelations: $scope.form.multipleRelations,
                        relations: $scope.form.relations,
                    })) return;

                    if (await $scope.triggers.table.before.update({
                        updating: $scope.form.inserting,
                        uploading: $scope.form.uploading,
                        multipleRelations: $scope.form.multipleRelations,
                        relations: $scope.form.relations,
                    }) === false)
                        return;

                    BASEAPI.updateall($scope.tableOrMethod, dataToUpdate, async function (result) {
                        if (result.data.error === false) {
                            if ($scope.form !== null) {
                                $scope.form.after.update({
                                    updating: $scope.form.inserting,
                                    uploading: $scope.form.uploading,
                                    multipleRelations: $scope.form.multipleRelations,
                                    relations: $scope.form.relations,
                                });

                                $scope.triggers.table.after.update({
                                    updating: $scope.form.inserting,
                                    uploading: $scope.form.uploading,
                                    multipleRelations: $scope.form.multipleRelations,
                                    relations: $scope.form.relations,
                                });
                            }
                            // SWEETALERT.loading({message: MESSAGE.i('mono.saving')});
                            var firstColumn = eval(`CRUD_${$scope.modelName}`).table.key || "id";
                            var DRAGONID = eval(`$scope.${firstColumn}`);

                            await AUDIT.LOGCUSTOM(`Trabajar actividades`, $scope.tableOrView ? $scope.tableOrView : $scope.modelName, {
                                id: $scope.id,
                                Nombre: $scope.nombre,
                                comentario: $scope.comentario,
                                estatus: $scope.estatus_object.nombre,
                                condición: $scope.razon != "[NULL]" ? `${$scope.razon_object.nombre} - ${$scope.razon_object.porcentaje}%` : null,
                                presupuesto_asignado: $scope.presupuesto_dra
                            });

                            if ($scope.form !== null)
                                $scope.form.mode = FORM.modes.edit;
                            if ($scope.pages !== null)
                                $scope.pages.form.subRequestCompleteVar = 0;
                            if ($scope.pages !== null)
                                $scope.pages.form.subRequestCompleteProgress = 0;
                            if ($scope.pages !== null)
                                $scope.pages.form.subRequestCompleteVar = $scope.form.relations.length;
                            if ($scope.pages.form.subRequestCompleteVar === 0) {

                                $scope.pages.form.close(undefined, undefined, close);
                                SWEETALERT.stop();
                                NOTIFY.success(`${$scope.singular} ${MESSAGE.i('mono.saved')}`);
                            }

                            var allrelations = [];
                            for (var item of $scope.form.relations) {
                                var relations = [];
                                var objExist = [];
                                for (var sub of item.data) {
                                    if (objExist.indexOf(JSON.stringify(sub)) === -1) {
                                        relations.push(sub);
                                        objExist.push(JSON.stringify(sub));
                                    }
                                }
                                item.data = relations;
                                allrelations.push(item);
                            }
                            // if (allrelations.length)
                            //     allrelations = allrelations[0];
                            if ($scope.form !== null)
                                if ($scope.form.relations !== undefined) {
                                    if (allrelations.length > 0) {
                                        for (var relation of allrelations) {
                                            for (var frel of relation.data) {
                                                for (var i in frel) {
                                                    var vi = frel[i].replace('$id', DRAGONID);
                                                    eval(`frel.${i} = vi`);
                                                }
                                            }
                                            for (var i in relation.config.fieldsUpdate) {
                                                var vi = relation.config.fieldsUpdate[i].replace('$id', DRAGONID);
                                                eval(`relation.config.fieldsUpdate.${i} = vi`);
                                            }
                                            var whereDelete = [];
                                            whereDelete.push(relation.config.fieldsUpdate);

                                            if ($scope.form.multirepeat.indexOf(relation.config.toDeleteTable) === -1) {
                                                var ddata = await BASEAPI.deleteallp(relation.config.toDeleteTable, whereDelete);
                                            }
                                            $scope.form.multirepeat.push(relation.config.toDeleteTable);
                                            console.log(await BASEAPI.insertp(relation.config.toTable, relation.data));
                                            $scope.pages.form.subRequestComplete(close);
                                        }
                                    }
                                }
                        } else {
                            SWEETALERT.stop();
                            ERROR.alert(result.data, ERROR.category.database);
                        }
                    });
                }
            };

            actividades_poa_monitoreo.triggers.table.after.control = async function (data) {
                let quierorefrescar = false;
                if (data == 'estatus') {
                    actividades_poa_monitoreo.estatus_old = actividades_poa_monitoreo.estatus;
                    if ((actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.director_departamental || actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.analista_departamental) && actividades_poa_monitoreo.my_true_estatus == 6) {
                        actividades_poa_monitoreo.form.options.estatus.disabled = true;
                        quierorefrescar = true;
                    }
                }
                if (data == "comentario") {
                    actividades_poa_monitoreo.valor_validar = await BASEAPI.firstp("vw_presupuesto_departamento", {
                        where: [
                            {
                                field: "id",
                                value: actividades_poa_monitoreo.departamento
                            },
                            {
                                field: "poa",
                                value: session.poa_id
                            }
                        ]
                    });
                }
                if (data === 'presupuesto') {
                    if (actividades_poa_monitoreo.presupuesto == "0.00" || actividades_poa_monitoreo.presupuesto == "0" || !actividades_poa_monitoreo.presupuesto) {
                        actividades_poa_monitoreo.presupuesto = "";
                    } else {
                        actividades_poa_monitoreo.presupuesto = LAN.money(actividades_poa_monitoreo.presupuesto).format(false);
                    }
                    actividades_poa_monitoreo.presupuesto_restante = LAN.money(actividades_poa_monitoreo.presupuesto_restante).value + LAN.money(actividades_poa_monitoreo.presupuesto).value;
                    actividades_poa_monitoreo.old_presupuesto = actividades_poa_monitoreo.presupuesto;
                    actividades_poa_monitoreo.presupuesto_restante_show = LAN.money(actividades_poa_monitoreo.presupuesto_restante - LAN.money(actividades_poa_monitoreo.presupuesto).value).format(true);
                    quierorefrescar = true;
                }
                if (data === 'presupuesto_consumido') {
                    actividades_poa_monitoreo.presupuesto_consumido = LAN.money(actividades_poa_monitoreo.presupuesto_consumido).value;
                }
                if (data === 'presupuesto_consumido_ver') {
                    actividades_poa_monitoreo.presupuesto_consumido_ver = LAN.money(actividades_poa_monitoreo.presupuesto_consumido).format(false);
                }
                if (data === 'maneja_presupuesto') {
                    actividades_poa_monitoreo.old_maneja_presupuesto = actividades_poa_monitoreo.maneja_presupuesto;
                }
                if (data == "responsable") {
                    if (actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.director_departamental && actividades_poa_monitoreo.condition !== "Vencida") {
                        actividades_poa_monitoreo.selectQueries['responsable'] = [
                            {
                                field: 'departamento',
                                operator: '=',
                                value: actividades_poa_monitoreo.session.departamento
                            }
                        ];
                        if (!load_me_once) {
                            actividades_poa_monitoreo.form.loadDropDown('responsable')
                            load_me_once = true;
                        }
                        actividades_poa_monitoreo.form.options.responsable.disabled = false;
                    } else if (actividades_poa_monitoreo.group_caracteristica == ENUM_2.Grupos.director_general) {
                        actividades_poa_monitoreo.selectQueries['responsable'] = [
                            {
                                field: 'departamento',
                                operator: '=',
                                value: actividades_poa_monitoreo.departamento
                            }
                        ];
                        if (!load_me_once) {
                            actividades_poa_monitoreo.form.loadDropDown('responsable')
                            load_me_once = true;
                        }
                        actividades_poa_monitoreo.form.options.responsable.disabled = false;
                    }
                }
                if (quierorefrescar)
                    actividades_poa_monitoreo.refreshAngular();
            };

            actividades_poa_monitoreo.$scope.$watch('actividades_poa_monitoreo.comentario', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(actividades_poa_monitoreo, "comentario", rules);
            });

            actividades_poa_monitoreo.$scope.$watch('actividades_poa_monitoreo.comentario_comment', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(actividades_poa_monitoreo, "comentario_comment", rules);
            });

            actividades_poa_monitoreo.$scope.$watch('actividades_poa_monitoreo.razon', function (value) {
                var rules = [];
                if (actividades_poa_monitoreo.estatus == ENUM_2.actividad_poa_estatus.Completada.toString()) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(actividades_poa_monitoreo, "razon", rules);
            });

            actividades_poa_monitoreo.$scope.$watch('actividades_poa_monitoreo.presupuesto', function (value) {
                var rules = [];
                var RES = parseFloat(DSON.cleanNumber(actividades_poa_monitoreo.view_presupuesto));
                if (!actividades_poa_monitoreo.maneja_presupuesto) {
                    rules.push(VALIDATION.yariel.greaterThanAct(
                        parseFloat(DSON.cleanNumber(value)),
                        parseFloat(DSON.cleanNumber(LAN.money((actividades_poa_monitoreo.presupuesto_restante)).format(false)))
                        ,
                        "El monto de la actividad", "Presupuesto disponible del departamento "));
                } else {
                    if (actividades_poa_monitoreo.form.options.presupuesto)
                        actividades_poa_monitoreo.form.options.presupuesto.disabled = true;
                    actividades_poa_monitoreo.refreshAngular();
                }
                rules.push(VALIDATION.yariel.lesserThanAct(
                    parseFloat(DSON.cleanNumber(value)),
                    parseFloat(actividades_poa_monitoreo.presupuesto_consumido), "El monto del presupuesto", "Presupuesto ejecutado"));
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_poa_monitoreo, "presupuesto", rules);
            });

            actividades_poa_monitoreo.$scope.$watch('actividades_poa_monitoreo.calificacion', function (value) {
                var rules = [];
                if (actividades_poa_monitoreo.estatus == 1) {
                    rules.push(VALIDATION.general.requiredallow(value));
                }
                rules.push(VALIDATION.yariel.menorQue(value, 100, "Calificación", "100"))
                rules.push(VALIDATION.yariel.mayorOigualCero(value, "Calificación"))
                VALIDATION.validate(actividades_poa_monitoreo, "calificacion", rules);
            });
            actividades_poa_monitoreo.$scope.$watch('actividades_poa_monitoreo.avance_porcentaje', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.menorQue(value, 100, "Porcentaje de Avance", "100"))
                VALIDATION.validate(actividades_poa_monitoreo, "avance_porcentaje", rules);
            });
            actividades_poa_monitoreo.$scope.$watch('actividades_poa_monitoreo.estatus', function (value) {
                if (!actividades_poa_monitoreo.maneja_presupuesto) {
                    if (actividades_poa_monitoreo.form.options.presupuesto)
                        if (actividades_poa_monitoreo.form.options.presupuesto)
                            actividades_poa_monitoreo.form.options.presupuesto.disabled = false;
                    actividades_poa_monitoreo.refreshAngular();
                } else {
                    if (actividades_poa_monitoreo.form.options.presupuesto) {
                        actividades_poa_monitoreo.form.options.presupuesto.disabled = true;
                        actividades_poa_monitoreo.refreshAngular();
                    }
                }
                console.log(value, "estatus", actividades_poa_monitoreo.presupuesto_restante, LAN.money(actividades_poa_monitoreo.presupuesto).value, actividades_poa_monitoreo.razon);
                if (value == ENUM_2.actividad_poa_estatus.Completada.toString() && (actividades_poa_monitoreo.razon == "[NULL]" || !actividades_poa_monitoreo.razon || actividades_poa_monitoreo.razon == "0")) {
                    actividades_poa_monitoreo.validate['razon'] =
                        {
                            messages: [],
                            type: "error",
                            valid: false
                        };
                    actividades_poa_monitoreo.updateInputPresupuesto();
                } else {
                    actividades_poa_monitoreo.validate['razon'] =
                        {
                            messages: [],
                            type: "success",
                            valid: true
                        };
                    actividades_poa_monitoreo.updateInputPresupuesto();
                }

                if (value == ENUM_2.actividad_poa_estatus.Completada.toString() && (DSON.oseaX(actividades_poa_monitoreo.calificacion))) {
                    actividades_poa_monitoreo.validate['calificacion'] =
                        {
                            messages: [],
                            type: "error",
                            valid: false
                        };
                    actividades_poa_monitoreo.updateInputPresupuesto();
                } else {
                    actividades_poa_monitoreo.validate['calificacion'] =
                        {
                            messages: [],
                            type: "success",
                            valid: true
                        };
                    actividades_poa_monitoreo.updateInputPresupuesto();
                }

                if (value == ENUM_2.actividad_poa_estatus.Completada.toString() || value == "5") {
                    if ((!actividades_poa_monitoreo.presupuesto || actividades_poa_monitoreo.presupuesto == "0.00") && !actividades_poa_monitoreo.maneja_presupuesto) {
                        actividades_poa_monitoreo.validate['presupuesto'] =
                            {
                                messages: [''],
                                type: "error",
                                valid: false
                            };
                        actividades_poa_monitoreo.updateInputPresupuesto();

                    } else if ((actividades_poa_monitoreo.presupuesto_restante < LAN.money(actividades_poa_monitoreo.presupuesto).value) && !actividades_poa_monitoreo.maneja_presupuesto) {
                        actividades_poa_monitoreo.validate['presupuesto'] = {
                            "valid": false,
                            "messages": [{
                                "message": "El monto de la actividad debe de ser menor o igual al Presupuesto disponible del departamento",
                                "icon": "icon-cancel-circle2 text-danger",
                                "type": "danger"
                            }],
                            "type": "error"
                        };
                        actividades_poa_monitoreo.updateInputPresupuesto();
                    } else {
                        actividades_poa_monitoreo.validate['presupuesto'] =
                            {
                                messages: [''],
                                type: "success",
                                valid: true
                            };
                        actividades_poa_monitoreo.updateInputPresupuesto();
                    }
                } else {
                    actividades_poa_monitoreo.validate['presupuesto'] =
                        {
                            messages: [''],
                            type: "success",
                            valid: true
                        };
                    actividades_poa_monitoreo.updateInputPresupuesto();
                }
            });

            actividades_poa_monitoreo.$scope.$watch('actividades_poa_monitoreo.maneja_presupuesto', function (value) {
                if (value) {
                    if (actividades_poa_monitoreo.form.options.presupuesto)
                        actividades_poa_monitoreo.form.options.presupuesto.disabled = false;
                } else if (actividades_poa_monitoreo.form.options.presupuesto)
                    actividades_poa_monitoreo.form.options.presupuesto.disabled = true;
                console.log(value, "manejaPres", actividades_poa_monitoreo.presupuesto_restante, LAN.money(actividades_poa_monitoreo.presupuesto).value);
                if (value == false) {
                    if (!actividades_poa_monitoreo.presupuesto || actividades_poa_monitoreo.presupuesto == "0.00") {
                        actividades_poa_monitoreo.validate['presupuesto'] =
                            {
                                messages: [''],
                                type: "error",
                                valid: false
                            };
                        actividades_poa_monitoreo.updateInputPresupuesto();
                    } else if (actividades_poa_monitoreo.presupuesto_restante < LAN.money(actividades_poa_monitoreo.presupuesto).value) {
                        actividades_poa_monitoreo.validate['presupuesto'] = {
                            "valid": false,
                            "messages": [{
                                "message": "El monto de la actividad debe de ser menor o igual al Presupuesto disponible del departamento",
                                "icon": "icon-cancel-circle2 text-danger",
                                "type": "danger"
                            }],
                            "type": "error"
                        };
                        actividades_poa_monitoreo.updateInputPresupuesto();
                    } else {
                        actividades_poa_monitoreo.validate['presupuesto'] =
                            {
                                messages: [''],
                                type: "success",
                                valid: true
                            };
                        actividades_poa_monitoreo.updateInputPresupuesto();
                    }
                } else {
                    actividades_poa_monitoreo.validate['presupuesto'] =
                        {
                            messages: [''],
                            type: "success",
                            valid: true
                        };
                    actividades_poa_monitoreo.updateInputPresupuesto();
                }
                if (!value) {
                    if (actividades_poa_monitoreo.form.options.presupuesto)
                        actividades_poa_monitoreo.form.options.presupuesto.disabled = true;
                } else if (actividades_poa_monitoreo.form.options.presupuesto)
                    actividades_poa_monitoreo.form.options.presupuesto.disabled = false;
                // El monto de la actividad debe de ser menor o igual al Presupuesto disponible del departamento
                actividades_poa_monitoreo.refreshAngular();
            });

            actividades_poa_monitoreo.$scope.$watch("actividades_poa_monitoreo.act_presupuesto_consumido", function (value) {
                var rules = [];
                //rules here
                var RES = actividades_poa_monitoreo.presupuesto_old;
                rules.push(VALIDATION.yariel.greaterThanAct(
                    (actividades_poa_monitoreo.presupuesto_consumido + parseFloat(DSON.cleanNumber(value))),
                    RES, "El monto del presupuesto consumido", "Presupuesto asignado"));
                actividades_poa_monitoreo.presupuesto_consumido_ver = LAN.money(actividades_poa_monitoreo.presupuesto_restante_calculate()).format(false);
                VALIDATION.validate(actividades_poa_monitoreo, 'act_presupuesto_consumido', rules);
            });
        }
    };
    actividades_poa_monitoreo.updateInputPresupuesto = function () {
        actividades_poa_monitoreo.refreshAngular();
    };
    actividades_poa_monitoreo.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        delete data.updating.act_presupuesto_consumido;
        data.updating.presupuesto_consumido = LAN.money(actividades_poa_monitoreo.presupuesto_consumido_ver).value;
        data.updating.presupuesto = LAN.money(data.updating.presupuesto).value;
        data.updating.avance_porcentaje = actividades_poa_monitoreo.estatus == 1 ? 100 : actividades_poa_monitoreo.avance_porcentaje;
        if (actividades_poa_monitoreo.estatus == ENUM_2.actividad_poa_estatus.Trabajada) {
            if (actividades_poa_monitoreo.puede_completar == 'No') {
                SWEETALERT.show({
                    type: 'error',
                    message: "La actividad no puede ser trabajada puesto que sus todas sus actividades de apoyo deben de estar completas o canceladas. Favor Revisar"
                });
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                return;
            }
        }
        if (actividades_poa_monitoreo.estatus == ENUM_2.actividad_poa_estatus.Completada) {
            if (actividades_poa_monitoreo.puede_completar == 'No') {
                SWEETALERT.show({
                    type: 'error',
                    message: "La actividad no puede ser Completada puesto que existen actividades de apoyo sin completar o cancelar. Favor Revisar"
                });
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                return;
            }
        }
        if (actividades_poa_monitoreo.estatus == ENUM_2.actividad_poa_estatus.Cancelada.toString()) {
            if (actividades_poa_monitoreo.presupuesto_consumido > 0) {
                SWEETALERT.show({
                    type: 'error',
                    message: "La actividad no puede ser cancelada puesto que tiene presupuesto consumido. Favor Revisar"
                });
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
                return;
            }
            if (actividades_poa_monitoreo.NopermitirCancelar) {
                SWEETALERT.show({
                    type: 'error',
                    message: "No puede Cancelar la Actividad, pues tiene una o más actividad de apoyo completada."
                });
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
                return;
            }
        }

        if (actividades_poa_monitoreo.estatus != ENUM_2.actividad_poa_estatus.Completada.toString()) {
            data.updating.razon = '$NULL';
        }
        if (actividades_poa_monitoreo.estatus != ENUM_2.actividad_poa_estatus.Completada.toString() && actividades_poa_monitoreo.estatus != "5") {
            data.updating.presupuesto = LAN.money(actividades_poa_monitoreo.old_presupuesto).value;
            data.updating.maneja_presupuesto = actividades_poa_monitoreo.old_maneja_presupuesto ? 1 : 0;
        } else {
            if (!actividades_poa_monitoreo.maneja_presupuesto) {
                //data.updating.presupuesto = LAN.money(0).value;
            } else {
                data.updating.presupuesto = LAN.money(actividades_poa_monitoreo.presupuesto).value;
            }
        }


        if (actividades_poa_monitoreo.estatus == ENUM_2.actividad_poa_estatus.Completada.toString()) {
            if (LAN.money(actividades_poa_monitoreo.presupuesto).value > actividades_poa_monitoreo.valor_validar.presupuesto_actividades) {
                if (LAN.money(actividades_poa_monitoreo.presupuesto).value >= actividades_poa_monitoreo.valor_validar.valor) {
                    SWEETALERT.show({
                        message: MESSAGE.ieval('planificacion.validacion_completar_actividad', {
                            field: LAN.money(actividades_poa_monitoreo.valor_validar.presupuesto_restante).format(true),
                            field2: LAN.money(actividades_poa_monitoreo.valor_validar.valor).format(true)
                        })
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                } else if (LAN.money(actividades_poa_monitoreo.presupuesto).value > (actividades_poa_monitoreo.valor_validar.presupuesto_restante + actividades_poa_monitoreo.presupuesto_old)) {
                    SWEETALERT.show({
                        message: MESSAGE.ieval('planificacion.validacion_completar_actividad', {
                            field: LAN.money(actividades_poa_monitoreo.valor_validar.presupuesto_restante).format(true),
                            field2: LAN.money(actividades_poa_monitoreo.valor_validar.valor).format(true)
                        })
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                } else {
                    data.updating.presupuesto_consumido = LAN.money(actividades_poa_monitoreo.presupuesto).value;
                    actividades_poa_monitoreo.soloAnadirComentario(true);
                    resolve(true);
                }
            } else if (LAN.money(actividades_poa_monitoreo.presupuesto).value <= actividades_poa_monitoreo.valor_validar.presupuesto_actividades) {
                if (LAN.money(actividades_poa_monitoreo.presupuesto).value < actividades_poa_monitoreo.valor_validar.valor) {
                    if (LAN.money(actividades_poa_monitoreo.presupuesto).value > (actividades_poa_monitoreo.valor_validar.presupuesto_restante + actividades_poa_monitoreo.presupuesto_old)) {
                        SWEETALERT.show({
                            message: MESSAGE.ieval('planificacion.validacion_completar_actividad', {
                                field: LAN.money(actividades_poa_monitoreo.valor_validar.presupuesto_restante).format(true),
                                field2: LAN.money(actividades_poa_monitoreo.valor_validar.valor).format(true)
                            })
                        });
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for (var item of buttons) {
                            item.disabled = false;
                        }
                        resolve(false);
                    } else {
                        data.updating.presupuesto_consumido = LAN.money(actividades_poa_monitoreo.presupuesto).value;
                        actividades_poa_monitoreo.soloAnadirComentario(true);
                        resolve(true);
                    }
                }
            } else {
                data.updating.presupuesto_consumido = LAN.money(actividades_poa_monitoreo.presupuesto).value;
                actividades_poa_monitoreo.soloAnadirComentario(true);
                resolve(true);
            }
        } else {
            actividades_poa_monitoreo.refreshAngular();
            actividades_poa_monitoreo.soloAnadirComentario(true);
            resolve(true);
        }
    });
    actividades_poa_monitoreo.triggers.table.after.update = function (data) {
        if (actividades_poa_monitoreo.estatus == ENUM_2.actividad_poa_estatus.Detenida.toString()) {
            BASEAPI.updateall('actividades_apoyo', {
                "estatus": ENUM_2.actividad_apoyo_estatus.Detenida,
                where: [
                    {
                        "field": "actividades_poa",
                        "value": actividades_poa_monitoreo.id
                    },
                    {
                        "field": "estatus",
                        "value": ENUM_2.actividad_apoyo_estatus.Pendiente
                    }

                ]
            }, function (result) {
                console.log(result);
            });
        } else if (actividades_poa_monitoreo.estatus == ENUM_2.actividad_poa_estatus.Cancelada.toString()) {
            BASEAPI.updateall('actividades_apoyo', {
                "estatus": ENUM_2.actividad_apoyo_estatus.Cancelada,
                where: [
                    {
                        "field": "actividades_poa",
                        "value": actividades_poa_monitoreo.id
                    },
                    {
                        "field": "estatus",
                        "value": ENUM_2.actividad_apoyo_estatus.Detenida
                    }
                ]
            }, function (result) {
            });
        } else if (actividades_poa_monitoreo.estatus == ENUM_2.actividad_poa_estatus.Abierta.toString()) {
            BASEAPI.updateall('actividades_apoyo', {
                "estatus": ENUM_2.actividad_apoyo_estatus.Pendiente,
                where: [
                    {
                        "field": "actividades_poa",
                        "value": actividades_poa_monitoreo.id
                    },
                    {
                        "field": "estatus",
                        "value": ENUM_2.actividad_apoyo_estatus.Detenida
                    }
                ]
            }, function (result) {
            });
        }

    };
    actividades_poa_monitoreo.soloAnadirComentario = async function (copy) {
        var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
        for (var item of buttons) {
            item.disabled = true;
        }
        let rs = BASEAPI.insertIDp('comentarios',
            {
                "comentario": (copy ? actividades_poa_monitoreo.comentario : actividades_poa_monitoreo.comentario_comment),
                "type": ENUM_2.tipo_comentario.Trabajar_actividad,
                "created_by": session.usuario_id,
                "value": actividades_poa_monitoreo.estatus,
                "value2": actividades_poa_monitoreo.id,
                "value3": (copy ? parseFloat(DSON.cleanNumber(actividades_poa_monitoreo.act_presupuesto_consumido)) > 0 ? LAN.money(actividades_poa_monitoreo.act_presupuesto_consumido).value : "$null" : "$null"),
            }, '', '');
        var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
        for (var item of buttons) {
            item.disabled = false;
        }
        if (copy) {
            if (rs.data)
                if (rs.data.data)
                    if (rs.data.data[0])
                        if (rs.data.data[0].id) {
                            actividades_poa_monitoreo.comentario_comment = "";
                            actividades_poa_monitoreo.refreshAngular();
                            await BASEAPI.ajax.postp(new HTTP().path(["files", "api", "copy"]), {
                                moves: [{
                                    from: `${FOLDERS.files}/actividades_poa_monitoreo/actividadfile/${actividades_poa_monitoreo.id}`,
                                    to: `${FOLDERS.files}/comentarios_actividades_poa/actividadfile_comment/${rs.data.data[0].id}`
                                }]
                            });
                        }
        } else {
            if (rs.data)
                if (rs.data.data)
                    if (rs.data.data[0])
                        if (rs.data.data[0].id) {
                            actividades_poa_monitoreo.comentario_comment = "";
                            actividades_poa_monitoreo.refreshAngular();
                            await actividades_poa_monitoreo.saveAllFiles(rs.data.data[0].id, 'comentarios_actividades_poa', 'actividadfile_comment');
                        }
        }
        if (ShowCountactividadfile_comment !== undefined) {
            ShowCountactividadfile_comment(true);
        }
        NOTIFY.success("Comentario agregado");
        if (ShowCountactividadfile_comment !== undefined) {
            ShowCountactividadfile_comment(true);
            console.log("clean");
        }
    };
    actividades_poa_monitoreo.verFile = function (key, value, row) {
        if (key != "archivo")
            return;

        actividades_poa_monitoreo.setPermission("file.upload", false);
        if (actividades_poa_monitoreo.group_caracteristica !== ENUM_2.Grupos.director_general) {
            actividades_poa_monitoreo.setPermission("file.remove", false);
        } else {
            actividades_poa_monitoreo.setPermission("file.remove", true);
        }
        // if (row.estatus_actividad == ENUM_2.actividad_poa_estatus.Completada || row.estatus_actividad == ENUM_2.actividad_poa_estatus.Cancelada) {
        //     actividades_poa_monitoreo.setPermission("file.upload", false);
        //     actividades_poa_monitoreo.setPermission("file.remove", false);
        // } else {
        //     actividades_poa_monitoreo.setPermission("file.upload", true);
        //     actividades_poa_monitoreo.setPermission("file.remove", true);
        // }
        if (typeof actividades_poa_monitoreo !== 'null') {
            if (actividades_poa_monitoreo) {
                var info = actividades_poa_monitoreo.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/actividades_poa_monitoreo/actividadfile/" + row.id, row);
                    actividades_poa_monitoreo.showfiletypes = function () {
                        var modal = {
                            width: "modal-full",
                            header: {
                                title: "Ver tipos de archivos permitidos a ser cargados",
                                icon: "file-eye"
                            },
                            footer: {
                                cancelButton: false,
                                buttons: [
                                    {
                                        color: "btn bg-<%= COLOR.info %> btn-labeled btn-xs pull-rightm",
                                        title: "<b><i class='icon-arrow-right8'></i></b>Continuar",
                                        action: function () {
                                            MODAL.close();
                                        }
                                    }
                                ]
                            },
                            content: {
                                loadingContentText: MESSAGE.i('actions.Loading')
                            },
                            event: {
                                show: {
                                    begin: function (data) {
                                        data.permitted_files = [];
                                        for (var i in CONFIG.fileType_general) {
                                            for (var j in CONFIG.fileType_general[i]) {
                                                if (typeof data.permitted_files[j] == "undefined") {
                                                    data.permitted_files[j] = {};
                                                }
                                                data.permitted_files[j][i] = CONFIG.fileType_general[i][j];
                                            }
                                        }
                                    }
                                },
                                hide: {
                                    begin: function (data) {

                                    }
                                }
                            }
                        };
                        actividades_poa_monitoreo.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'actividades_poa_monitoreo',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    actividades_poa_monitoreo.modal.modalView("templates/components/gallery", {
                        width: 'modal-full',
                        header: {
                            title: MESSAGE.ic("mono.files"),
                            icon: "file-eye"
                        },
                        footer: {
                            cancelButton: false
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading')
                        },
                    });
                }
            }
        }
    };
    actividades_poa_monitoreo.presupuesto_restante_calculate = function () {
        var DB_PRR = LAN.money(actividades_poa_monitoreo.presupuesto_consumido).value;
        var PT_PR = LAN.money(actividades_poa_monitoreo.act_presupuesto_consumido).value;

        var CONSUMIDO = (DB_PRR + PT_PR);
        return LAN.money(CONSUMIDO).format(true);
    };
    actividades_poa_monitoreo.change_normal_comments = function () {
        CRUD_comentarios_actividades_poa.table.columns.value3 = {
            visible: false,
            visibleDetail: false,
            export: false,
            exportExample: false,
            dead: true
        }
        comentarios_actividades_poa.fixFilters = [
            {
                "field": "type",
                "value": ENUM_2.tipo_comentario.Trabajar_actividad
            },
            {
                "field": "value2",
                "value": actividades_poa_monitoreo.id
            }
        ];
        comentarios_actividad_apoyo.fixFilters = [
            {
                "field": "id",
                "value": -1
            }
        ];
        comentarios_actividad_apoyo.refresh();
        comentarios_actividades_poa.refresh();
    };
    actividades_poa_monitoreo.change_money_comments = function () {
        CRUD_comentarios_actividades_poa.table.columns.value3 = {
            label: function () {
                return "Presupuesto Consumido"
            },
            sorttype: "money",
            formattype: "money",
            visible: true,
            visibleDetail: true,
            export: false,
            exportExample: false,
            dead: false
        },
            CRUD_comentarios_actividad_apoyo.table.columns.value3 = {
                label: function () {
                    return "Presupuesto Consumido"
                },
                sorttype: "money",
                formattype: "money",
                visible: true,
                visibleDetail: true,
                export: false,
                exportExample: false,
                dead: false
            }
        comentarios_actividades_poa.fixFilters = [
            {
                "field": "type",
                "value": ENUM_2.tipo_comentario.Trabajar_actividad
            },
            {
                "field": "value2",
                "value": actividades_poa_monitoreo.id
            },
            {
                "field": "value3",
                "operator": "is",
                "value": "$not null"
            }
        ];
        comentarios_actividad_apoyo.fixFilters = [
            {
                "field": "type",
                "value": ENUM_2.tipo_comentario.Actividades_apoyo
            },
            {
                "field": "actividades_poa",
                "value": actividades_poa_monitoreo.id
            },
            {
                "field": "value3",
                "operator": "is",
                "value": "$not null"
            }
        ];
        comentarios_actividades_poa.refresh();
        comentarios_actividad_apoyo.refresh();
    };
});
