app.controller("departamento_poa", function ($scope, $http, $compile) {
    departamento_poa = this;
    var user_info = new SESSION().current();
    var animation = new ANIMATION();
    var titulo_push = "";
    var cuerpo_push = "";
    var message_body = "";
    departamento_poa.valid_coment = true;
    departamento_poa.session = user_info;
    departamento_poa.estatus_volver_load = true;
    departamento_poa.bloquear_estatus = true;
    departamento_poa.data = {};
    departamento_poa.director_general = ENUM_2.Grupos.director_general;
    departamento_poa.director_departamental = ENUM_2.Grupos.director_departamental;
    departamento_poa.analista_de_planificacion = ENUM_2.Grupos.analista_de_planificacion;
    departamento_poa.analista_departamental = ENUM_2.Grupos.analista_departamental;
    departamento_poa.solo_lectura = ENUM_2.Grupos.solo_lectura;
    departamento_poa.permitir = user_info.groups[0] ? user_info.groups[0].caracteristica : '';
    departamento_poa.viewBotonAddCommentLiberar = false;
    departamento_poa.estatus_id_puede = 0;
    departamento_poa.departamento_id_puede = 0;
    departamento_poa.trucho = false;
    departamento_poa.array_grupos = [];
    departamento_poa.correos_user_msj = [];
    departamento_poa.compania_id = user_info.compania_id;
    departamento_poa.destroyForm = false;
    departamento_poa.comentarios_depto = 0;
    departamento_poa.comentarios_depto_liberar = 0;
    var animation = new ANIMATION();
    departamento_poa.condiction = user_info.poa_id ? user_info.poa_id : 0;
    RUNCONTROLLER("departamento_poa", departamento_poa, $scope, $http, $compile);
    RUN_B("departamento_poa", departamento_poa, $scope, $http, $compile);

    BASEAPI.firstp('pei', {where: [{field: 'id', value: user_info.pei_id}]}).then(function (res) {
        if (res)
            departamento_poa.estatus_pei = (res.estatus == ENUM_2.pei_estatus.Pendiente_a_autorizar);
        // if (departamento_poa.estatus_pei){
        //     SWEETALERT.show({message: `El PEI no esta autorizado`});
        // }
    });

    if (baseController.viaja_depto == 0) {
        BASEAPI.first('vw_presupuesto_departamento', {
            where: [
                {
                    field: "id",
                    value: user_info.departamento
                },
                {
                    field: "poa",
                    value: user_info.poa_id
                }
            ]
        }, function (result) {
            if (result) {
                departamento_poa.estatus_id = result.estatus ? result.estatus : "[NULL]";
                departamento_poa.estatus = departamento_poa.estatus_id.toString();
                departamento_poa.departamento_id = result.id;
                departamento_poa.departamento = '' + departamento_poa.departamento_id;
                departamento_poa.form.loadDropDown('departamento');
                departamento_poa.form.loadDropDown('estatus');

            } else {
                departamento_poa.estatus_id = "[NULL]";
                departamento_poa.estatus = "[NULL]";
                departamento_poa.departamento_id = "[NULL]";
                departamento_poa.departamento = "[NULL]";
                departamento_poa.form.loadDropDown('departamento');
                departamento_poa.form.loadDropDown('estatus');
            }
        });
    } else {
        departamento_poa.departamento_id = baseController.viaja_depto.toString();
        departamento_poa.departamento = baseController.viaja_depto.toString();
        departamento_poa.estatus_id = baseController.viaja_status.toString();
        departamento_poa.estatus = baseController.viaja_status.toString();
        departamento_poa.form.loadDropDown('departamento');
        departamento_poa.form.loadDropDown('estatus');
    }

    if (departamento_poa.session.tipo_institucion == 1){
        departamento_poa.headertitle = MESSAGE.i('planificacion.titledepartamento_poa');
    }else{
        departamento_poa.headertitle = "Autorizar Gestión Presupuestaria";
    }
    departamento_poa.plural = MESSAGE.i('planificacion.titledepartamento_poa');
    departamento_poa.singular = MESSAGE.i('planificacion.titledepartamento_poa');
    departamento_poa.anadirComentario = async function () {
        if (departamento_poa.estatus == "[NULL]" || departamento_poa.estatus == "null") {
            SWEETALERT.show({message: `Debes seleccionar un estatus.`});
        }
        if (departamento_poa.comentario == "") {
            departamento_poa.comentario = "Comentario por defecto - Cambio de estatus de " + departamento_poa.form.selected('departamento').estatus_nombre + " a " + departamento_poa.form.selected('estatus').nombre;
            // SWEETALERT.show({message: `Debes agregar un comentario.`});
        } else if (departamento_poa.departamento == "[NULL]") {
            SWEETALERT.show({message: `Debes seleccionar un departamento.`});
        } else {
            SWEETALERT.lastLaert = myswal({
                type: "warning",
                title: "Deseas cambiar el estatus?",
                html: "",
                showCancelButton: true,
                confirmButtonText: MESSAGE.ic('mono.yes'),
                cancelButtonText: MESSAGE.ic('mono.no')
            }).then(result => {
                if (result.dismiss === undefined) {
                    var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                    for(var item of buttons){
                        item.disabled = true;
                    }
                    animation.loading(`#panelEstatus`, "", ``, '30');
                    animation.loading("#panelDepartamento","", ``, '30');
                    BASEAPI.insertp('comentarios',
                        {
                            "comentario": departamento_poa.comentario,
                            "type": ENUM_2.tipo_comentario.POA_Presupuesto,
                            "created_by": user_info.usuario_id,
                            "value": departamento_poa.form.selected('departamento').id_presupuesto,
                            "value2": departamento_poa.estatus,
                        }).then(function (rs) {
                        departamento_poa.comentario = "";
                        departamento_poa.refreshAngular();
                    });
                    BASEAPI.updateall('presupuesto_aprobado', {
                        estatus: departamento_poa.estatus,
                        where: [
                            {
                                field: "departamento",
                                value: departamento_poa.departamento
                            },
                            {
                                field: "poa",
                                value: user_info.poa_id
                            }
                        ]
                    }, async function (result) {
                        // if ((departamento_poa.estatus == ENUM_2.presupuesto_estatus.Completo.toString())) {
                        //     departamento_poa.trucho = false;
                        //     departamento_poa.refreshAngular();
                        // }
                        departamento_poa.form.loadDropDown('departamento');
                        NOTIFY.success("Estatus actualizado");
                        await departamento_poa.puede();
                        await BASEAPI.firstp("vw_presupuesto_aprobado", {
                            where: [{
                                'field': 'poa',
                                'operator': '=',
                                'value': user_info.poa_id
                            },
                                {
                                    'field': 'id_departamento',
                                    'operator': '=',
                                    'value': departamento_poa.departamento
                                }]
                        }).then(function (result) {
                            departamento_poa.poa_nuevo = result;
                        });
                        await AUDIT.LOGCUSTOM(`Autorizar POA de ${departamento_poa.departamento_object.departamento}`, "vw_presupuesto_aprobado", departamento_poa.poa_nuevo, "", departamento_poa.poa_nuevo.estatus);
                        await AUDIT.LOGCUSTOM(`Autorizar POA de ${departamento_poa.departamento_object.departamento}`, "vw_poa", departamento_poa.poa_nuevo, "", departamento_poa.poa_nuevo.estatus);
                        await AUDIT.LOGCUSTOM(`Autorizar POA de ${departamento_poa.departamento_object.departamento}`, "poa", departamento_poa.poa_nuevo, "", departamento_poa.poa_nuevo.estatus);
                        departamento_poa.actualizar_presupuesto();
                        titulo_push = MESSAGE.ieval("planificacion.subject_autorizar", {field: departamento_poa.form.selected('departamento').nombre});
                        cuerpo_push = MESSAGE.ieval("planificacion.message", {field: departamento_poa.form.selected('estatus').nombre});
                        if (departamento_poa.estatus == ENUM_2.presupuesto_estatus.Pendiente.toString()){
                            BASEAPI.insert('modulo_notificacion_task', {
                                accion: "PDCEP",
                                record_id: departamento_poa.departamento_object.id_presupuesto,
                                date: moment().format("YYYY-MM-DD")
                            }, function(result){
                                if (result)
                                    SWEETALERT.stop();
                            })
                            // message_body = MESSAGE.i("planificacion.message_body_pendiente");
                            // function_send_email_group_poa(titulo_push,cuerpo_push,titulo_push,cuerpo_push,message_body,user_info.compania_id,departamento_poa.departamento,departamento_poa.estatus, user_info.institucion_id);
                        } else if (departamento_poa.estatus == ENUM_2.presupuesto_estatus.Trabajado.toString()){
                            BASEAPI.insert('modulo_notificacion_task', {
                                accion: "PDCET",
                                record_id: departamento_poa.departamento_object.id_presupuesto,
                                date: moment().format("YYYY-MM-DD")
                            }, function(result){
                                if (result)
                                    SWEETALERT.stop();
                            })
                            // message_body = MESSAGE.ieval("planificacion.message_body_trabajado",{field: departamento_poa.form.selected('departamento').nombre});
                            // function_send_email_group_poa(titulo_push,cuerpo_push,titulo_push,cuerpo_push,message_body,user_info.compania_id,departamento_poa.departamento,departamento_poa.estatus, user_info.institucion_id);
                        } else if (departamento_poa.estatus == ENUM_2.presupuesto_estatus.Completo.toString()){
                            message_body = MESSAGE.i("planificacion.message_body_autorizado");
                            function_send_email_group_poa(titulo_push,cuerpo_push,titulo_push,cuerpo_push,message_body,user_info.compania_id,departamento_poa.departamento,departamento_poa.estatus, user_info.institucion_id);
                        }
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                    });
                    //
                } else {
                    departamento_poa.comentario = '';
                    departamento_poa.refreshAngular();
                }
            });
        }
    };
    departamento_poa.soloAnadirComentario = async function () {
        if (departamento_poa.comentario == "") {
            SWEETALERT.show({message: `Debes agregar un comentario.`});
        } else if (departamento_poa.estatus == "[NULL]" || departamento_poa.estatus == "null") {
            SWEETALERT.show({message: `Debes seleccionar un estatus.`});
        } else if (departamento_poa.departamento == "[NULL]") {
            SWEETALERT.show({message: `Debes seleccionar un departamento.`});
        } else {
            SWEETALERT.confirm({
                type: "warning",
                title: "Deseas agregar este comentario?",
                message: " ",
                confirm: function () {
                    BASEAPI.insertp('comentarios',
                        {
                            "comentario": departamento_poa.comentario,
                            "type": ENUM_2.tipo_comentario.POA_Presupuesto,
                            "created_by": user_info.usuario_id,
                            "value": departamento_poa.form.selected('departamento').id_presupuesto,
                            "value2": departamento_poa.form.selected('departamento').estatus,
                        }).then(function (rs) {
                        departamento_poa.comentario = "";
                        NOTIFY.success("Comentario agregado");
                        departamento_poa.actualizar_presupuesto();
                        // departamento_poa.refreshAngular();
                    });
                    // BASEAPI.updateall('presupuesto_aprobado',{
                    //     estatus: departamento_poa.estatus,
                    //     where: [
                    //         {
                    //             field: "departamento",
                    //             value: departamento_poa.departamento
                    //         },
                    //         {
                    //             field: "poa",
                    //             value: user_info.poa_id
                    //         }
                    //     ]
                    // },function(result){
                    //     NOTIFY.success("Comentario agregado");
                    //     departamento_poa.actualizar_presupuesto();
                    // });
                }
            });
        }
    };
    departamento_poa.verComentarios = async function () {
        departamento_poa.verComentario_liberado = false;
        // departamento_poa.modalAction('mega_comentario_presupuesto_poa',MESSAGE.i('planificacion.comentarios'), 'design', '',{});.
        departamento_poa.modal.modalView("departamento_poa/comments", {
            header: {
                title: MESSAGE.i('planificacion.comentarios'),
                icon: 'design'
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'mega_comentario_presupuesto_poa'
            },
        });
    };
    departamento_poa.liberar = async function () {
        if (departamento_poa.comentarioDepartamental == "") {
            SWEETALERT.show({message: `Debe agregar un comentario.`});
        } else if ((departamento_poa.estatus == "") || (departamento_poa.estatus == null) || (departamento_poa.estatus == undefined)) {
            SWEETALERT.show({message: `Debe de haber un estatus seleccionado.`});
        } else {
            SWEETALERT.confirm({
                type: "warning",
                title: "Deseas liberar el presupuesto?",
                message: " ",
                confirm: async function () {
                    var departamento_liberado = departamento_poa.data[0];
                    delete departamento_liberado.id_departamento;
                    departamento_liberado.valor = departamento_liberado.presupuesto;
                    delete departamento_liberado.presupuesto;
                    animation.loading(`#panelLiberar`, "", ``, '30');
                    BASEAPI.insertp('comentarios',
                        {
                            "comentario": departamento_poa.comentarioDepartamental,
                            "type": ENUM_2.tipo_comentario.Liberar_Presupuesto,
                            "created_by": user_info.usuario_id,
                            "value": departamento_poa.form.selected('departamento').id_presupuesto,
                            "value2": departamento_poa.form.selected('departamento').estatus
                        }).then(function (rs) {
                        departamento_poa.comentarioDepartamental = "";
                        departamento_poa.refreshAngular();
                    });

                    BASEAPI.list('vw_get_cant_activapoyo_activ', {
                        limit: 0,
                        where: [
                            {
                                "field": "producto",
                                "value": departamento_poa.id_productos
                            },
                        ]
                    }, async function (result) {
                        var listactividades = [];
                        var lista_actividades_completas = [];
                        var lista_actividades_detenidas = [];
                        if (result.data.length > 0) {
                            for (var i of result.data) {
                                listactividades.push(i.id);
                                if (i.cantidad_actividades_apoyo_completa > 0) {
                                    lista_actividades_completas.push(i.id);
                                } else if (i.estado == ENUM_2.actividad_poa_estatus.Detenida && i.cantidad_actividades_apoyo_completa == 0) {
                                    lista_actividades_detenidas.push(i.id);
                                }
                            }
                        }
                        var todosero = lista_actividades_completas.length === 0 && lista_actividades_detenidas.length;

                        if (todosero) {
                            animation.stoploading(`#panelLiberar`);
                        }

                        if (lista_actividades_completas.length > 0) {
                            console.log(lista_actividades_completas);
                            await BASEAPI.updateallp('actividades_apoyo', {
                                estatus: ENUM_2.actividad_apoyo_estatus.Cancelada,
                                where: [
                                    {
                                        field: 'actividades_poa',
                                        value: listactividades
                                    },
                                    {
                                        field: "estatus",
                                        value: ENUM_2.actividad_apoyo_estatus.Detenida
                                    }
                                ]
                            }, function (result) {

                            });

                            await BASEAPI.updateallp('actividades_poa', {
                                estatus: ENUM_2.actividad_poa_estatus.Completada,
                                where: [
                                    {
                                        field: "id",
                                        value: lista_actividades_completas
                                    }
                                ]
                            }, function (result) {

                            });

                            departamento_poa.actualizar_presupuesto();
                            departamento_poa.actualizar_productos();
                            departamento_poa.actualizar_actividades();
                            animation.stoploading(`#panelLiberar`);
                            departamento_poa.refreshAngular();
                        }
                        if (lista_actividades_detenidas.length > 0) {
                            console.log(lista_actividades_detenidas);
                            await BASEAPI.updateallp('actividades_apoyo', {
                                estatus: ENUM_2.actividad_apoyo_estatus.Cancelada,
                                where: [
                                    {
                                        field: 'actividades_poa',
                                        value: listactividades
                                    },
                                    {
                                        field: "estatus",
                                        value: ENUM_2.actividad_apoyo_estatus.Detenida
                                    }
                                ]
                            }, function (result) {

                            });

                            await BASEAPI.updateallp('actividades_poa', {
                                estatus: ENUM_2.actividad_poa_estatus.Cancelada,
                                where: [
                                    {
                                        field: "id",
                                        value: lista_actividades_detenidas
                                    }
                                ]
                            }, function (result) {

                            });

                            departamento_poa.actualizar_presupuesto();
                            departamento_poa.actualizar_productos();
                            departamento_poa.actualizar_actividades();
                            animation.stoploading(`#panelLiberar`);
                            departamento_poa.refreshAngular();
                        }
                    });
                    await AUDIT.LOGCUSTOM(`Presupuesto liberado del departamento: ${departamento_poa.departamento_object.departamento}`, "vw_presupuesto_aprobado", departamento_liberado, "","Presupuesto Liberado");
                    await AUDIT.LOGCUSTOM(`Presupuesto liberado del departamento: ${departamento_poa.departamento_object.departamento}`, "vw_poa", departamento_liberado, "","Presupuesto Liberado");
                    await AUDIT.LOGCUSTOM(`Presupuesto liberado del departamento: ${departamento_poa.departamento_object.departamento}`, "poa", departamento_liberado, "","Presupuesto Liberado");
                    titulo_push = MESSAGE.ieval("planificacion.producto_poa_titulo_cancelar", {field: departamento_poa.form.selected('departamento').nombre});
                    cuerpo_push = MESSAGE.ieval("planificacion.producto_poa_cuerpo_cancelar", {field: departamento_poa.poner_mask(departamento_poa.data[0].presupuesto_detenido)});
                    function_send_email_group(titulo_push, cuerpo_push, titulo_push, cuerpo_push, user_info.compania_id, departamento_poa.departamento, null, user_info.institucion_id);
                }
            });
        }
    };
    departamento_poa.comentarioliberar = async function () {
        if (departamento_poa.comentarioDepartamental == "") {
            SWEETALERT.show({message: `Debes agregar un comentario.`});
        } else if ((departamento_poa.estatus == "") || (departamento_poa.estatus == null) || (departamento_poa.estatus == undefined) || (departamento_poa.estatus == "[NULL]") || (departamento_poa.estatus == "null")) {
            SWEETALERT.show({message: `Debes de haber un estatus seleccionado.`});
        } else {
            SWEETALERT.confirm({
                type: "warning",
                title: "Desea agregar este comentario?",
                message: " ",
                confirm: function () {
                    BASEAPI.insertp('comentarios',
                        {
                            "comentario": departamento_poa.comentarioDepartamental,
                            "type": ENUM_2.tipo_comentario.Liberar_Presupuesto,
                            "created_by": user_info.usuario_id,
                            "value": departamento_poa.form.selected('departamento').id_presupuesto,
                            "value2": departamento_poa.form.selected('departamento').estatus
                        }).then(function (rs) {
                        departamento_poa.comentarioDepartamental = "";
                        departamento_poa.actualizar_presupuesto();
                        departamento_poa.refreshAngular();
                    });
                }
            });
        }
    };
    departamento_poa.verComentariosPresupuesto = async function () {
        departamento_poa.verComentario_liberado = true;
        // departamento_poa.modalAction('mega_comentario_presupuesto_poa',MESSAGE.i('planificacion.comentarios') , 'design', '',{});
        departamento_poa.modal.modalView("departamento_poa/comments", {
            header: {
                title: MESSAGE.i('planificacion.comentarios'),
                icon: 'design'
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'mega_comentario_presupuesto_poa'
            },
        });
    };
    departamento_poa.poner_mask = function (value) {
        departamento_poa.refreshAngular();
        return LAN.money(value).format(true);
    };

    // RUN_B("departamento_poa", departamento_poa, $scope, $http, $compile);
    departamento_poa.selectQueries['departamento'] = [
        {
            "field": "poa",
            "operator": "=",
            "value": user_info.poa_id
        }
    ];
    departamento_poa.repetir_condicion_estatus = true;
    departamento_poa.repetir_condicion_departamento = true;

    departamento_poa.triggers.table.after.control = function (data) {
        // if (data == "comentario"){
        // departamento_poa.comentario = baseController.comentarioChangeStatus;
        // }
        // if (data == "comentarioDepartamental"){
        // departamento_poa.comentarioDepartamental = baseController.comentarioLiberar;
        // }
        if (data == "departamento") {
            if ((departamento_poa.director_general != departamento_poa.permitir)) {
                departamento_poa.form.options.departamento.disabled = true;
                departamento_poa.refreshAngular();
            } else {
                departamento_poa.refreshAngular();
            }
        }
        if (data == "estatus") {
            if ((departamento_poa.director_departamental == departamento_poa.permitir) || (departamento_poa.director_general == departamento_poa.permitir)) {
                if (departamento_poa.repetir_condicion_departamento) {
                    // data hace refencia a los campos de los presupuesto
                    if (departamento_poa.data[0] != undefined || departamento_poa.data[0] != null) {
                        if (departamento_poa.data[0].presupuesto_detenido > 0 && ((departamento_poa.director_departamental == departamento_poa.permitir) || (departamento_poa.director_general == departamento_poa.permitir))) {
                            departamento_poa.setPermission('break_free', true);
                            departamento_poa.viewBotonAddCommentLiberar = true;
                        } else {
                            departamento_poa.setPermission('break_free', false);
                            departamento_poa.viewBotonAddCommentLiberar = false;
                        }
                    } else {
                        departamento_poa.setPermission('break_free', false);
                        departamento_poa.viewBotonAddCommentLiberar = false;
                    }
                    departamento_poa.repetir_condicion_departamento = false;
                    departamento_poa.refreshAngular();
                }
            }
        }
    };

    departamento_poa.$scope.$watch('departamento_poa.departamento', function (value) {
        animation.loading(`#animationDepartamento`, "Cargando ", ``, '300');
        if (value != "[NULL]") {
            departamento_poa.comentario = '';
            departamento_poa.comentarioDepartamental = "";
            departamento_poa.actualizar_presupuesto();
            departamento_poa.function_bloquear();
            setTimeout(function () {
                animation.stoploading(`#animationDepartamento`, ``);
                departamento_poa.refreshAngular();
            }, 200);
        } else if (value === "[NULL]") {
            departamento_poa.estatus = "[NULL]";
            departamento_poa.comentarioDepartamental = "";
            departamento_poa.comentario = "";
            departamento_poa.comentarios_depto = 0;
            departamento_poa.comentarios_depto_liberar = 0;
            departamento_poa.form.loadDropDown('estatus');
            animation.stoploading(`#animationDepartamento`, ``);
        }
        if ((departamento_poa.estatus !== departamento_poa.departamento_object.estatus.toString()) && (departamento_poa.departamento == departamento_poa.departamento_id_puede.toString())) {
            if (departamento_poa.estatus_id_puede != 0) {
                departamento_poa.trucho = true;
                departamento_poa.refreshAngular();
            } else {
                departamento_poa.trucho = false;
                departamento_poa.refreshAngular();
            }
        } else {
            departamento_poa.trucho = false;
            departamento_poa.refreshAngular();
        }
    });
    departamento_poa.$scope.$watch('departamento_poa.estatus', async function (value) {
        if (value !== "[NULL]") {
            await departamento_poa.puede();
            // if ( (departamento_poa.estatus !== departamento_poa.estatus_id_puede.toString()) && (departamento_poa.departamento == departamento_poa.departamento_id_puede.toString())){
            if ((departamento_poa.estatus !== departamento_poa.departamento_object.estatus.toString()) && (departamento_poa.departamento == departamento_poa.departamento_id_puede.toString())) {
                if (departamento_poa.estatus_id_puede != 0) {
                    departamento_poa.trucho = true;
                    departamento_poa.refreshAngular();
                } else {
                    departamento_poa.trucho = false;
                    departamento_poa.refreshAngular();
                }
            } else {
                departamento_poa.trucho = false;
                departamento_poa.refreshAngular();
            }
        }
    });
    departamento_poa.$scope.$watch('departamento_poa.comentario', async function (value) {
        var rules = [];
        rules.push(VALIDATION.yariel.maliciousCode(value));
        VALIDATION.validate(departamento_poa, "comentario", rules);
    });
    departamento_poa.$scope.$watch('departamento_poa.comentarioDepartamental', async function (value) {
        var rules = [];
        rules.push(VALIDATION.yariel.maliciousCode(value));
        VALIDATION.validate(departamento_poa, "comentario", rules);
    });

    departamento_poa.function_bloquear = function () {
        if (departamento_poa.form.selected('departamento') !== null) {
            departamento_poa.estatus = departamento_poa.form.selected('departamento').estatus ? departamento_poa.form.selected('departamento').estatus.toString() : "[NULL]";
            departamento_poa.form.loadDropDown('estatus');
        }
        if ((departamento_poa.director_general != departamento_poa.permitir)) {
            if ((departamento_poa.estatus == ENUM_2.presupuesto_estatus.Completo) && (departamento_poa.estatus_id.toString() == departamento_poa.estatus)) {
                departamento_poa.form.options.estatus.disabled = true;
                departamento_poa.refreshAngular();
            }
            if (departamento_poa.estatus == ENUM_2.presupuesto_estatus.Trabajado) {
                departamento_poa.form.options.estatus.disabled = true;
                departamento_poa.refreshAngular();
            }
        }
    };
    departamento_poa.actualizar_presupuesto = async function () {
        departamento_poa.id_productos = [];
        departamento_poa.nombre_productos = [];
        SERVICE.planificacion_get_presupuesto.get_department({
            id_department: departamento_poa.departamento == "[NULL]" ? 0 : departamento_poa.departamento,
            id_poa: user_info.poa_id
        }, function (result) {
            departamento_poa.data = {};
            var data = {};
            if (result) {
                if (result.data.recordset)
                    departamento_poa.data = result.data.recordset[0];
                if (departamento_poa.data[0]) {
                    if (departamento_poa.data[0].presupuesto_detenido > 0 && ((departamento_poa.director_departamental == departamento_poa.permitir) || (departamento_poa.director_general == departamento_poa.permitir))) {
                        departamento_poa.setPermission('break_free', true);
                        departamento_poa.viewBotonAddCommentLiberar = true;
                    } else {
                        departamento_poa.setPermission('break_free', false);
                        departamento_poa.viewBotonAddCommentLiberar = false;
                    }
                } else {
                    departamento_poa.setPermission('break_free', false);
                    departamento_poa.viewBotonAddCommentLiberar = false;
                }
            }
            departamento_poa.refreshAngular();
        });

        await BASEAPI.list('vw_productos_poa_detalles', {
            limit: 0,
            where: [{
                field: "id_departamento",
                value: departamento_poa.departamento
            },
                {
                    field: "poa_id",
                    value: user_info.poa_id
                }]
        }, function (result) {
            if (result.data != undefined) {
                if (result.data.length > 0) {
                    for (item of result.data) {
                        departamento_poa.id_productos.push(item.id);
                        departamento_poa.nombre_productos.push(item.nombre);
                        departamento_poa.comentarios_depto = item.total_comentarios ? item.total_comentarios : 0;
                        departamento_poa.comentarios_depto_liberar = item.total_comentarios_liberar ? item.total_comentarios_liberar : 0;
                    }
                } else {
                    departamento_poa.comentarios_depto = 0;
                    departamento_poa.comentarios_depto_liberar = 0;
                }
            }
            departamento_poa.actualizar_productos();
            departamento_poa.actualizar_actividades();
        });
        await BASEAPI.list('vw_presupuesto_aprobado', {
            where: [{
                field: "departamento_id",
                value: departamento_poa.departamento
            },
                {
                    field: "poa_id",
                    value: user_info.poa_id
                }]
        }, function (result) {
            if (result.data != undefined) {
                if (result.data.length > 0) {
                    for (item of result.data) {
                        departamento_poa.comentarios_depto = item.total_comentarios ? item.total_comentarios : 0;
                        departamento_poa.comentarios_depto_liberar = item.total_comentarios_liberar ? item.total_comentarios_liberar : 0;
                        departamento_poa.refreshAngular();
                    }
                } else {
                    departamento_poa.comentarios_depto = 0;
                    departamento_poa.comentarios_depto_liberar = 0;
                }
            }
        });
    };
    departamento_poa.actualizar_productos = function () {
        vw_productos_auth_poa.fixFilters = [
            {
                "field": "id",
                "value": departamento_poa.id_productos ? departamento_poa.id_productos : -1
            }
        ];
        vw_productos_auth_poa.refresh();
    };
    departamento_poa.actualizar_actividades = function () {
        vw_actividades_auth_poa.fixFilters = [
            {
                "field": "producto",
                "value": departamento_poa.id_productos[0] ? departamento_poa.id_productos[0] : -1
            }
        ];
        vw_actividades_auth_poa.refresh();
    };

    departamento_poa.open_modal_autoriza_departamento = function (data) {
        departamento_poa.modalAction('mega_presupuesto_aprobado', 'Presupuestos', 'design', 'new', {});
    };

    departamento_poa.pei_activo = function () {
        if (departamento_poa.estatus_pei) {
            departamento_poa.form.options.estatus.disabled = true;
        }
        return (!departamento_poa.estatus_pei && departamento_poa.allow(['change_status']));
    };
    departamento_poa.bloqueo_estatus = function (data) {
        if ((departamento_poa.director_general != departamento_poa.permitir)) {
            if (departamento_poa.estatus != ENUM_2.presupuesto_estatus.Completo && (departamento_poa.estatus !== undefined) && (departamento_poa.estatus != "[NULL]")) {
                if (data.id == ENUM_2.presupuesto_estatus.Pendiente || data.id == ENUM_2.presupuesto_estatus.Trabajado) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    };
    departamento_poa.puede = async function () {
        var d = await BASEAPI.firstp('vw_presupuesto_departamento', {
            where: [
                {
                    field: "id",
                    value: departamento_poa.departamento
                },
                {
                    "field": "poa",
                    "value": user_info.poa_id
                }
            ]
        });
        if (d) {
            departamento_poa.estatus_id_puede = d.estatus ? d.estatus : 0;
            departamento_poa.departamento_id_puede = d.id;
        } else {
            departamento_poa.departamento = "[NULL]";
            departamento_poa.form.loadDropDown('departamento');
            departamento_poa.estatus = "[NULL]";
            departamento_poa.form.loadDropDown('estatus');
        }
        if (departamento_poa.estatus_id_puede.toString() === ENUM_2.presupuesto_estatus.Completo.toString()) {
            departamento_poa.resize_panel(true);
        } else {
            departamento_poa.resize_panel(false);
        }
    };
    departamento_poa.resize_panel = function (value) {
        if (value) {
            $("#panelLiberar").show();
        } else {
            $("#panelLiberar").hide();
        }
    };
    departamento_poa.poa_activo = function () {
        if (user_info.estado != "1") {
            // departamento_poa.form.options.departamento.disabled = true;
            departamento_poa.form.options.estatus.disabled = true;
            departamento_poa.form.options.comentario.disabled = true;
            departamento_poa.form.options.comentarioDepartamental.disabled = true;
            departamento_poa.refreshAngular();
        }
    };

});
