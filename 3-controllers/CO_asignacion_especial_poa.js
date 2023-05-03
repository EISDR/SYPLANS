app.controller("asignacion_especial_poa", function ($scope, $http, $compile) {
    asignacion_especial_poa = this;
    var session = new SESSION().current();
    var titulo_push = "";
    var cuerpo_push = "";
    var titulo_email = "";
    var cuerpo_email = "";
    asignacion_especial_poa.session = session;
    asignacion_especial_poa.poa_id = session.poa_id === null ? 0 : session.poa_id;
    asignacion_especial_poa.compania_id = session.compania_id;
    asignacion_especial_poa.not_exists_poa = 0;
    asignacion_especial_poa.view_option_first = true;
    asignacion_especial_poa.currentdate = moment().format("YYYY-MM-DD");
    asignacion_especial_poa.paso = false;
    asignacion_especial_poa.destroyForm = false;
    asignacion_especial_poa.insert_readonly = {};
    asignacion_especial_poa.insert_readonly = {
        poa: session.poa_id,
        departamento_solicitante: session.departamento,
        estatus: 2
    };
    asignacion_especial_poa.requireFIlter = {
        "field": "poa_id",
        "value": asignacion_especial_poa.poa_id
    };
    asignacion_especial_poa.fixFilters = [asignacion_especial_poa.requireFIlter];

    var carac = undefined;
    if (session.groups.length > 0)
        carac = session.groups[0] ? session.groups[0].caracteristica : '';
    var mydepa = session.departamento;
    var myID = session.getID();

    if (carac === ENUM_2.Grupos.director_departamental || carac === ENUM_2.Grupos.analista_departamental) {
        asignacion_especial_poa.fixFilters.push({field: 'departamento_createdby_id', value: mydepa});
    }

    RUNCONTROLLER("asignacion_especial_poa", asignacion_especial_poa, $scope, $http, $compile);

    // asignacion_especial_poa.triggers.table.after.load = async function (record) {
    //
    // }
    asignacion_especial_poa.check_date = function () {
        if (session.estado == 0){
            SWEETALERT.show({message:'Para poder crear una asignación especial debe seleccionar un POA Activo'})
        }else{
            asignacion_especial_poa.formulary(null,'new')
        }
    }
    asignacion_especial_poa.singular = "Asignación Especial POA";
    asignacion_especial_poa.plural = MESSAGE.i('planificacion.titleAsignacion');

    title_header_table_poa(asignacion_especial_poa, "Asignaciones Creadas");
    asignacion_especial_poa.formulary = function (data, mode, defaultData) {
        if (asignacion_especial_poa !== undefined) {
            RUN_B("asignacion_especial_poa", asignacion_especial_poa, $scope, $http, $compile);
            asignacion_especial_poa.form.titles = {
                new: MESSAGE.i('planificacion.titleAsignacion'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titleAsignacion')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleAsignacion')}`
            };
            asignacion_especial_poa.form.before.insert = function () {
                if (asignacion_especial_poa.poa_id === 0) {
                    SWEETALERT.show({message: "No existe un POA activo"});
                    return true;
                }
                if (!session.departamento) {
                    SWEETALERT.show({message: "Necesitas tener un departamento asignado"});
                    return true;
                }
                return false;
            };
            // implementacion de las notificaciones al momento de crear o actualizar una asignacion begin
            asignacion_especial_poa.form.after.insert = function (data) {
                asignacion_especial_poa.data_json = {
                    title: "Se le ha asiganado una asignación especial",
                    content: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`,
                    user: [data.inserted.responsable],
                    url: 'asignacion_especial_poa'
                };
                BASEAPI.mail({
                    "to": asignacion_especial_poa.form.selected('responsable').correo,
                    "subject": "Se le ha asiganado una asignación especial",
                    "name": "noReply",
                    "template": 'email/plane',
                    "fields": { //estos campos se utilizarán en el template
                        message: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`,
                    }
                }, function (result) {
                    SWEETALERT.stop();
                    SWEETALERT.show({message: "Se asignó la tarea éxitosamente"});
                });
                send_notification.send.send(asignacion_especial_poa.data_json);

                // titulo_push = "Se le ha asiganado una asignación especial";
                // cuerpo_push = `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`;
                //
                // titulo_email = MESSAGE.i('planificacion.asignacion_especial_titulo_add_email');
                // cuerpo_email = `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`;
                // function_send_email_group(titulo_push, cuerpo_push, titulo_email, cuerpo_email, session.compania_id, asignacion_especial_poa.form.selected('responsable').departamento);
            };
            asignacion_especial_poa.form.before.update = function (data) {
                asignacion_especial_poa.insert_readonly = {};
                return false;
            };
            asignacion_especial_poa.form.after.update = function (data) {
                if (data.updating.responsable != asignacion_especial_poa.data_user.id) {
                    var array_correo = [];
                    asignacion_especial_poa.data_json = {
                        title: "Se le ha asiganado una asignación especial",
                        content: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`,
                        user: [data.updating.responsable],
                        url: 'asignacion_especial_poa'
                    };
                    send_notification.send.send(asignacion_especial_poa.data_json);
                    BASEAPI.mail({
                        "to": asignacion_especial_poa.form.selected('responsable').correo,
                        "subject": "Se le ha asiganado una asignación especial",
                        "name": "noReply",
                        "template": 'email/plane',
                        "fields": { //estos campos se utilizarán en el template
                            message: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`,
                        }
                    }, function (result) {
                    });
                    //
                    asignacion_especial_poa.data_json2 = {
                        title: `Ha sido removido de la asignación especial: "${data.updating.nombre}"`,
                        content: `${asignacion_especial_poa.data_user.nombre + ' ' + asignacion_especial_poa.data_user.apellido} ha sido removido de la asignación especial: "${data.updating.nombre}", dicha actividad fué asignada a ${asignacion_especial_poa.form.selected('responsable').nombre + " " + asignacion_especial_poa.form.selected('responsable').apellido}.`,
                        user: [asignacion_especial_poa.data_user.id],
                        url: 'asignacion_especial_poa'
                    };
                    send_notification.send.send(asignacion_especial_poa.data_json2);
                    // BASEAPI.mail({
                    //     "to": asignacion_especial_poa.data_user.correo,
                    //     "subject": `Ha sido removido de la asignación especial: "${data.updating.nombre}"`,
                    //     "name": "noReply",
                    //     "template": 'email/plane',
                    //     "fields": { //estos campos se utilizarán en el template
                    //         message: `${asignacion_especial_poa.data_user.nombre + ' ' + asignacion_especial_poa.data_user.apellido} ha sido removido de la asignación especial: "${data.updating.nombre}", dicha actividad fué asignada a ${asignacion_especial_poa.form.selected('responsable').nombre + " " + asignacion_especial_poa.form.selected('responsable').apellido}.`
                    //     }
                    // }, function (result) {
                    // });
                    titulo_push = `Ha sido removido de la asignación especial: "${data.updating.nombre}"`;
                    cuerpo_push = `${asignacion_especial_poa.data_user.nombre + ' ' + asignacion_especial_poa.data_user.apellido} ha sido removido de la asignación especial: "${data.updating.nombre}", dicha actividad fué asignada a ${asignacion_especial_poa.form.selected('responsable').nombre + " " + asignacion_especial_poa.form.selected('responsable').apellido}.`;
                    array_correo.push(asignacion_especial_poa.data_user.correo, asignacion_especial_poa.form.selected('responsable').correo)
                    titulo_email = `Ha sido removido de la asignación especial: "${data.updating.nombre}"`;
                    cuerpo_email = `${asignacion_especial_poa.data_user.nombre + ' ' + asignacion_especial_poa.data_user.apellido} ha sido removido de la asignación especial: "${data.updating.nombre}", dicha actividad fué asignada a ${asignacion_especial_poa.form.selected('responsable').nombre + " " + asignacion_especial_poa.form.selected('responsable').apellido}.`;

                    function_send_email_director_user(titulo_push, cuerpo_email, titulo_push, cuerpo_email, session.compania_id,  asignacion_especial_poa.form.selected('responsable').departamento, array_correo);
                } else {
                    asignacion_especial_poa.data_json = {
                        title: "Hubo un cambio de fecha en la asignación especial",
                        content: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, Ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde  ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}. Proceder a tomar las acciones que considre pertinente.`,
                        user: [data.updating.responsable],
                        url: 'asignacion_especial_poa'
                    };
                    send_notification.send.send(asignacion_especial_poa.data_json);
                    BASEAPI.mail({
                        "to": asignacion_especial_poa.form.selected('responsable').correo,
                        "subject": "Hubo un cambio de fecha en la asignación especial",
                        "name": "noReply",
                        "template": 'email/plane',
                        "fields": { //estos campos se utilizarán en el template
                            message: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, Ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde  ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}. Proceder a tomar las acciones que considre pertinente.`,
                        }
                    }, function (result) {
                    });

                    // titulo_push = "Hubo un cambio de fecha en la asignación especial asignada a usted";
                    // cuerpo_push = `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, Ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde  ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}. Proceder a tomar las acciones que considre pertinente.`;
                    //
                    // titulo_email = "Hubo un cambio de fecha en la asignación especial asignada a usted";
                    // cuerpo_email = `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, Ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde  ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}. Proceder a tomar las acciones que considre pertinente.`;
                    // function_send_email_group(titulo_push, cuerpo_push, titulo_email, cuerpo_email, session.compania_id, asignacion_especial_poa.form.selected('responsable').departamento);
                }
            };
            // end
            asignacion_especial_poa.triggers.table.after.close = function (data) {
                MENUMODAL = true;
            };

            asignacion_especial_poa.triggers.table.after.control = function (data) {
                if (mode === 'new' && data == 'range_date') {
                    asignacion_especial_poa.range_date = "";
                    var rango_minimo = moment().format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + session.periodo_poa).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        rango_minimo = moment(("01-02-" + session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    }

                    asignacion_especial_poa.range_date_min(rango_minimo);
                    asignacion_especial_poa.range_date_max(rango_maximo);
                    //cambio placebo
                    if ( moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        asignacion_especial_poa.range_date_start(rango_minimo);
                        asignacion_especial_poa.range_date_end(rango_minimo);
                    }
                    asignacion_especial_poa.refreshAngular();
                }

                if (mode === 'edit' && data == 'range_date') {
                    var rango_minimo = moment().format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + session.periodo_poa).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        rango_minimo = moment(("01-02-" + session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    }

                    asignacion_especial_poa.range_date_min(rango_minimo);
                    asignacion_especial_poa.range_date_max(rango_maximo);
                    asignacion_especial_poa.refreshAngular();
                }

                if (mode === 'edit' && data === 'responsable') {
                    asignacion_especial_poa.data_user = asignacion_especial_poa.form.selected('responsable');
                    asignacion_especial_poa.insert_readonly = {};
                }
            };
            asignacion_especial_poa.form.readonly = asignacion_especial_poa.insert_readonly;
            asignacion_especial_poa.createForm(data, mode, defaultData);

            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(asignacion_especial_poa, "nombre", rules)
            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.departamento_solicitado', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(asignacion_especial_poa, "departamento_solicitado", rules);
            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.responsable', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(asignacion_especial_poa, "responsable", rules)
            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.fecha_inicio', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(asignacion_especial_poa, "fecha_inicio", rules)
            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.fecha_fin', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(asignacion_especial_poa, "fecha_fin", rules)
            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.range_date', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(asignacion_especial_poa, "fecha_inicio", rules);
                VALIDATION.validate(asignacion_especial_poa, "range_date", rules);

            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(asignacion_especial_poa, "descripcion", rules)
            });
        }
    };
});
