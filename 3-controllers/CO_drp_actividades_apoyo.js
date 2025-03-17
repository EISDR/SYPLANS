app.controller("drp_actividades_apoyo", function ($scope, $http, $compile) {
    drp_actividades_apoyo = this;
    drp_actividades_apoyo.allowtoWork = true;
    drp_actividades_apoyo.auditModel = "actividades_apoyo";
    var session = new SESSION().current();
    drp_actividades_apoyo.session = session;
    drp_actividades_apoyo.headertitle = "Actividades de Apoyo";
    drp_actividades_apoyo.director_general = ENUM_2.Grupos.director_general;
    drp_actividades_apoyo.show_export_tab = true;
    drp_actividades_apoyo.director_departamental = ENUM_2.Grupos.director_departamental;
    drp_actividades_apoyo.analista_de_planificacion = ENUM_2.Grupos.analista_de_planificacion;
    drp_actividades_apoyo.analista_departamental = ENUM_2.Grupos.analista_departamental;
    drp_actividades_apoyo.solo_lectura = ENUM_2.Grupos.solo_lectura;
    drp_actividades_apoyo.permitir = session.groups[0] ? session.groups[0].caracteristica : '';
    drp_actividades_apoyo.fileSI = [];
    drp_actividades_apoyo.show_diagram = true;
    var load_me_once = false;
    var paso = false;
    var titulo_push = "";
    var cuerpo_push = "";
    var titulo = "";
    var cuerpo = "";
    drp_actividades_apoyo.get_departamento = async function () {
        drp_actividades_apoyo.get_data_depto = await BASEAPI.listp('usuario_departamento', {
            where: [{
                field: "usuario",
                value: session.usuario_id
            }]
        });
        drp_actividades_apoyo.base = [
            {
                field: "poa",
                value: drp_actividades_apoyo.session.poa_id
            },
            {
                field: "compania",
                value: drp_actividades_apoyo.session.compania_id
            },
            {
                field: "departamento",
                value: drp_actividades_apoyo.session.departamento
            }
        ];
        drp_actividades_apoyo.template = [
            {
                open: "(",
                field: "id",
                value: '',
                close: ")"
            }
        ];
        if (drp_actividades_apoyo.get_data_depto.data.length > 0) {
            drp_actividades_apoyo.get_data_depto.data.forEach(item => {
                var where = DSON.OSO(drp_actividades_apoyo.template);
                where[0].value = item.departamento;
                where[0].connector = "OR";

                drp_actividades_apoyo.base.push(where[0]);
                console.log(item.departamento);
            });
            drp_actividades_apoyo.base[drp_actividades_apoyo.base.length - 1].connector = undefined;
        }
    };
    drp_actividades_apoyo.get_departamento();

    drp_actividades_apoyo.fixFilters = [
        {
            field: "responsable",
            value: drp_actividades_apoyo.session.usuario_id
        },
        {
            field: "poa",
            value: drp_actividades_apoyo.session.poa_id
        },
        {
            field: "compania",
            value: drp_actividades_apoyo.session.compania_id
        }
    ];

    drp_actividades_apoyo.plural = "Actividades de Apoyo";
    drp_actividades_apoyo.headertitle = "Actividades de Apoyo";
    drp_actividades_apoyo.singular = "Actividades de Apoyo";
    //drp_actividades_apoyo.destroyForm = false;
    //drp_actividades_apoyo.permissionTable = "tabletopermission";
    RUNCONTROLLER("drp_actividades_apoyo", drp_actividades_apoyo, $scope, $http, $compile);
    drp_actividades_apoyo.formulary = function (data, mode, defaultData) {
        if (drp_actividades_apoyo !== undefined) {
            load_me_once = false;
            RUN_B("drp_actividades_apoyo", drp_actividades_apoyo, $scope, $http, $compile);
            drp_actividades_apoyo.form.modalWidth = ENUM.modal.width.full;
            drp_actividades_apoyo.form.readonly = {};

            // if (drp_actividades_apoyo.session.poa_id) {
            //     drp_actividades_apoyo.headertitle = "Actualización de datos / " + MESSAGE.i('planificacion.title_indicador_resultados_pei') + " / " + drp_actividades_apoyo.session.periodo_pei_msj + " / " + drp_actividades_apoyo.session.periodo_poa_msj;
            // } else if (drp_actividades_apoyo.session.pei_id) {
            //     drp_actividades_apoyo.headertitle = "Actualización de datos / " + MESSAGE.i('planificacion.title_indicador_resultados_pei') + " / " + drp_actividades_apoyo.session.periodo_pei_msj;
            // } else {
            //     drp_actividades_apoyo.headertitle = "Actualización de datos / " + MESSAGE.i('planificacion.title_indicador_resultados_pei') + " / PEI ";
            // }
            drp_actividades_apoyo.createForm(data, mode, defaultData);
            load_me_once = false;
            drp_actividades_apoyo.selectQueries['estatus'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: drp_actividades_apoyo.session.groups[0].id
                },
                {
                    field: 'entidad',
                    operator: '=',
                    value: "actividades_apoyo"
                }
            ];
            if (drp_actividades_apoyo.ver) {
                if (drp_actividades_apoyo.permitir !== ENUM_2.Grupos.director_general){
                    drp_actividades_apoyo.setPermission("file.remove", false);
                }else{
                    drp_actividades_apoyo.setPermission("file.remove", true);
                }
                drp_actividades_apoyo.setPermission("file.upload", false);
                drp_actividades_apoyo.form.titles = {
                    edit: "Ver - " + drp_actividades_apoyo.singular,
                };
            } else {
                drp_actividades_apoyo.form.titles = {
                    new: MESSAGE.i('planificacion.titleTrabajar'),
                    edit: "Trabajar - " + drp_actividades_apoyo.singular,
                    view: "Ver - " + drp_actividades_apoyo.singular
                };
            }
            $scope.$watch("drp_actividades_apoyo.estatus", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_actividades_apoyo, 'estatus', rules);
            });
            $scope.$watch("drp_actividades_apoyo.comentario", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_actividades_apoyo, 'comentario', rules);
            });
            $scope.$watch("drp_actividades_apoyo.act_apoyo_presupuesto_consumido", function (value) {
                var rules = [];
                //rules here
                var RES = parseFloat(DSON.cleanNumber(drp_actividades_apoyo.view_presupuesto));
                if (drp_actividades_apoyo.view_presupuesto) {
                    rules.push(VALIDATION.yariel.greaterThanAct(
                        parseFloat(DSON.cleanNumber(drp_actividades_apoyo.presupuesto_consumido)) + parseFloat(DSON.cleanNumber(value)),
                        RES, "El monto del presupuesto consumido", "Presupuesto asignado"));
                }
                drp_actividades_apoyo.view_presupuesto_consumido = LAN.money(drp_actividades_apoyo.presupuesto_restante_calculate()).format(true);
                VALIDATION.validate(drp_actividades_apoyo, 'act_apoyo_presupuesto_consumido', rules);
            });
            $scope.$watch("drp_actividades_apoyo.comentario_comment", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_actividades_apoyo, 'comentario_comment', rules);
            });
            $scope.$watch("drp_actividades_apoyo.clasificador_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                if (drp_actividades_apoyo.clasificador_nombre != value) {
                    drp_actividades_apoyo.clasificador_nombre = value;
                    drp_actividades_apoyo.form.loadDropDown('clasificador_nombre');
                }
                VALIDATION.validate(drp_actividades_apoyo, 'clasificador_id', rules);
            });
            $scope.$watch("drp_actividades_apoyo.clasificador_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                if (drp_actividades_apoyo.clasificador_id != value) {
                    drp_actividades_apoyo.clasificador_id = value;
                    drp_actividades_apoyo.form.loadDropDown('clasificador_id');
                }
                VALIDATION.validate(drp_actividades_apoyo, 'clasificador_nombre', rules);
            });
            $scope.$watch('drp_actividades_apoyo.maneja_presupuesto_act_apoyo', function (value) {
                // if ((value) && (!drp_actividades_apoyo.presupuesto || drp_actividades_apoyo.presupuesto == "0.00")) {
                //     drp_actividades_apoyo.validate['presupuesto'] =
                //         {
                //             messages: [''],
                //             type: "error",
                //             valid: false
                //         };
                //     drp_actividades_apoyo.updateInputPresupuesto();
                // }
                // else {
                //     drp_actividades_apoyo.validate['presupuesto'] =
                //         {
                //             messages: [''],
                //             type: "success",
                //             valid: true
                //         };
                //     drp_actividades_apoyo.updateInputPresupuesto();
                // }
                // El monto de la actividad debe de ser menor o igual al Presupuesto disponible del departamento
            });
            $scope.$watch("drp_actividades_apoyo.act_apoyo_presupuesto", function (value) {
                var rules = [];
                //rules here
                if (drp_actividades_apoyo.maneja_presupuesto_actividad) {
                    rules.push(VALIDATION.general.required(value));
                }
                var RES = parseFloat(DSON.cleanNumber(drp_actividades_apoyo.view_presupuesto));
                if (drp_actividades_apoyo.presupuesto_restante) {
                    rules.push(VALIDATION.yariel.greaterThanAct(
                        parseFloat(DSON.cleanNumber(value)),
                        parseFloat(DSON.cleanNumber(drp_actividades_apoyo.presupuesto_restante)) + RES, "El monto de la actividad de apoyo", "Presupuesto disponible del departamento"));
                    rules.push(VALIDATION.yariel.lesserThanAct(
                        parseFloat(DSON.cleanNumber(value)),
                        parseFloat(DSON.cleanNumber(drp_actividades_apoyo.presupuesto_consumido)), "El monto del presupuesto final consumido", "Presupuesto ejecutado"));
                }
                VALIDATION.validate(drp_actividades_apoyo, 'act_apoyo_presupuesto', rules);
            });
            $scope.$watch('drp_actividades_apoyo.avance_porcentaje', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.menorQue(value,100,"Porcentaje de Avance", "100"))
                VALIDATION.validate(drp_actividades_apoyo, "avance_porcentaje", rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            // $scope.$watch("drp_actividades_apoyo.compania", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(drp_actividades_apoyo, 'compania', rules);
            // });
            //ms_product.selectQueries['actividades_poa'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            // $scope.$watch("drp_actividades_apoyo.actividades_poa", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(drp_actividades_apoyo, 'actividades_poa', rules);
            // });
        }
    };
    drp_actividades_apoyo.updateInputPresupuesto = function () {
        drp_actividades_apoyo.refreshAngular();
    };
    drp_actividades_apoyo.saveActividadApoyo = function () {
        VALIDATION.save(drp_actividades_apoyo, async function () {
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
            var auditVar = drp_actividades_apoyo.form.getAudit();
            if (drp_actividades_apoyo.estatus == ENUM_2.actividad_apoyo_estatus.Cancelada) {
                if (LAN.money(drp_actividades_apoyo.presupuesto_consumido).value > 0) {
                    SWEETALERT.show({
                        type: 'error',
                        message: "La actividad de apoyo no puede ser cancelada puesto que tiene presupuesto consumido. Favor Revisar"
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    return;
                }
            }
            for(var item of buttons){
                item.disabled = true;
            }
            SWEETALERT.loading({message: MESSAGE.i('mono.procesing')});
            BASEAPI.updateall('actividades_apoyo', {
                presupuesto: drp_actividades_apoyo.maneja_presupuesto_act_apoyo ? LAN.money(drp_actividades_apoyo.act_apoyo_presupuesto).value : 0,
                presupuesto_consumido: drp_actividades_apoyo.maneja_presupuesto_act_apoyo ? drp_actividades_apoyo.estatus == 2 ? LAN.money(drp_actividades_apoyo.act_apoyo_presupuesto).value : parseFloat(DSON.cleanNumber(drp_actividades_apoyo.view_presupuesto_consumido)) > 0 ? LAN.money(drp_actividades_apoyo.view_presupuesto_consumido).value : 0 : 0,
                estatus: drp_actividades_apoyo.estatus,
                razon: !DSON.oseaX(drp_actividades_apoyo.razon) ? drp_actividades_apoyo.razon : "$NULL",
                responsable: !DSON.oseaX(drp_actividades_apoyo.responsable_edit) ? drp_actividades_apoyo.responsable_edit : "$null",
                avance_porcentaje: drp_actividades_apoyo.estatus == 2 ? 100 : drp_actividades_apoyo.avance_porcentaje,
                where: [{
                    field: "id",
                    value: drp_actividades_apoyo.id
                }]
            }, async function (result) {
                var porcentaje_actividad = await BASEAPI.firstp('vw_act_calc_percent',{ "where": [ {"field": "id", "value": drp_actividades_apoyo.actividades_poa} ]});
                BASEAPI.updateall('actividades_poa', {
                    presupuesto: drp_actividades_apoyo.maneja_presupuesto_act_apoyo ? (LAN.money(drp_actividades_apoyo.act_apoyo_presupuesto).value + LAN.money(drp_actividades_apoyo.presupuesto_actividad_actual).value) : LAN.money(drp_actividades_apoyo.presupuesto_actividad_actual).value,
                    presupuesto_consumido: drp_actividades_apoyo.maneja_presupuesto_act_apoyo ? drp_actividades_apoyo.estatus == 2 ? (LAN.money(drp_actividades_apoyo.act_apoyo_presupuesto).value + LAN.money(drp_actividades_apoyo.presupuesto_consumido_actividad_actual).value) : (LAN.money(drp_actividades_apoyo.view_presupuesto_consumido).value + LAN.money(drp_actividades_apoyo.presupuesto_consumido_actividad_actual).value) : LAN.money(drp_actividades_apoyo.presupuesto_consumido_actividad).value,
                    estatus: (drp_actividades_apoyo.estatus == 5 && drp_actividades_apoyo.estatus_actividad_poa == ENUM_2.actividad_poa_estatus.Abierta) ? 6 : drp_actividades_apoyo.estatus_actividad_poa,
                    avance_porcentaje: porcentaje_actividad.total_porcentaje,
                    where: [{
                        field: "id",
                        value: drp_actividades_apoyo.actividades_poa
                    }]
                }, function (result) {
                    console.log(result);
                });
                var rs = await BASEAPI.insertIDp('comentarios', {
                    "comentario": drp_actividades_apoyo.comentario,
                    "type": ENUM_2.tipo_comentario.Actividades_apoyo,
                    "created_by": drp_actividades_apoyo.session.usuario_id,
                    "value": drp_actividades_apoyo.estatus,
                    "value2": drp_actividades_apoyo.id,
                    "value3": parseFloat(DSON.cleanNumber(drp_actividades_apoyo.act_apoyo_presupuesto_consumido)) > 0 ? LAN.money(drp_actividades_apoyo.act_apoyo_presupuesto_consumido).value : "$null",
                }, '', '');
                if (rs.data)
                    if (rs.data.data)
                        if (rs.data.data[0])
                            if (rs.data.data[0].id) {
                                drp_actividades_apoyo.comentario = "";
                                drp_actividades_apoyo.refreshAngular();
                                await BASEAPI.ajax.postp(new HTTP().path(["files", "api", "copy"]), {
                                    moves: [{
                                        from: `${FOLDERS.files}/drp_actividades_apoyo/actividadfile_comment/${drp_actividades_apoyo.id}`,
                                        to: `${FOLDERS.files}/comentarios_actividad_apoyo/actividadfile_comment/${rs.data.data[0].id}`
                                    }]
                                });
                            }
                await AUDIT.LOG(AUDIT.ACTIONS.update, drp_actividades_apoyo.auditModel, auditVar, drp_actividades_apoyo.form.oldData);
                if (drp_actividades_apoyo.estado_antiguo != drp_actividades_apoyo.estatus){
                    if (drp_actividades_apoyo.estatus == ENUM_2.actividad_apoyo_estatus.Completa){
                        titulo_push = `Se ha completado la Actividad de Apoyo: "${drp_actividades_apoyo.nombre}"`;
                        cuerpo_push = `${drp_actividades_apoyo.form.selected('responsable').nombre + ' ' + drp_actividades_apoyo.form.selected('responsable').apellido} se ha completado la actividad de apoyo: "${drp_actividades_apoyo.nombre}" asignada a usted.`;

                        titulo = `Se ha completado la Actividad de Apoyo: "${drp_actividades_apoyo.nombre}"`;
                        cuerpo = `Se ha completado la actividad de apoyo: "${drp_actividades_apoyo.nombre}". Proceder a tomar las acciones que considre pertinente.`;
                        drp_actividades_apoyo.push_json = {
                            title: titulo_push,
                            content: cuerpo_push,
                            user: [drp_actividades_apoyo.form.selected('responsable').id],
                            url: 'drp_actividades_apoyo'
                        };
                        send_notification.send.send(drp_actividades_apoyo.push_json);
                        function_send_email_group(titulo, cuerpo, titulo, cuerpo, session.compania_id, drp_actividades_apoyo.departamento, drp_actividades_apoyo.form.selected('responsable').correo, session.institucion_id);
                    }else if (drp_actividades_apoyo.estatus == ENUM_2.actividad_apoyo_estatus.Cancelada){
                        titulo_push = `Actividad de Apoyo: "${drp_actividades_apoyo.nombre}" ha sido cancelada.`;
                        cuerpo_push = `Se ha cancelado la actividad de apoyo: "${drp_actividades_apoyo.nombre}" asignada a usted.`;

                        titulo = `Actividad de Apoyo:  "${drp_actividades_apoyo.nombre}" ha sido cancelada.`;
                        cuerpo = `Se ha cancelado la actividad de apoyo: "${drp_actividades_apoyo.nombre}". Proceder a tomar las acciones que considre pertinente.`;
                        drp_actividades_apoyo.push_json = {
                            title: titulo_push,
                            content: cuerpo_push,
                            user: [drp_actividades_apoyo.form.selected('responsable').id],
                            url: 'drp_actividades_apoyo'
                        };
                        send_notification.send.send(drp_actividades_apoyo.push_json);
                        function_send_email_group(titulo, cuerpo, titulo, cuerpo, session.compania_id, drp_actividades_apoyo.departamento, drp_actividades_apoyo.form.selected('responsable').correo, session.institucion_id);
                    }
                }
                var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                for(var item of buttons){
                    item.disabled = false;
                }
                NOTIFY.success("Comentario agregado");
                MODAL.close();
                drp_actividades_apoyo.refresh();
                SWEETALERT.stop();
            });

        }, ["estatus", "comentario", "act_apoyo_presupuesto", ""]);
    };
    drp_actividades_apoyo.SaveAndContinue = function () {

        VALIDATION.save(drp_actividades_apoyo, async function () {
            SWEETALERT.loading({message: MESSAGE.i('mono.procesing')});
            drp_actividades_apoyo.soloAnadirComentario();
            comentarios_actividad_apoyo.refresh();
            SWEETALERT.stop();
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
    drp_actividades_apoyo.soloAnadirComentario = async function () {
        var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
        for(var item of buttons){
            item.disabled = true;
        }
        BASEAPI.insertIDp('comentarios',
            {
                "comentario": drp_actividades_apoyo.comentario_comment,
                "type": ENUM_2.tipo_comentario.Actividades_apoyo,
                "created_by": session.usuario_id,
                "value": drp_actividades_apoyo.estatus,
                "value2": drp_actividades_apoyo.id
            }, '', '').then(async function (rs) {
                var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                for(var item of buttons){
                    item.disabled = false;
                }
                if (rs.data)
                    if (rs.data.data)
                        if (rs.data.data[0])
                            if (rs.data.data[0].id) {
                                drp_actividades_apoyo.comentario_comment = "";
                                drp_actividades_apoyo.refreshAngular();
                                await BASEAPI.ajax.postp(new HTTP().path(["files", "api", "copy"]), {
                                    moves: [{
                                        from: `${FOLDERS.files}/drp_actividades_apoyo/actividad_commentfile/${drp_actividades_apoyo.id}`,
                                        to: `${FOLDERS.files}/comentarios_actividad_apoyo/actividadfile_comment/${rs.data.data[0].id}`
                                    }]
                                });
                                drp_actividades_apoyo.form.options.actividad_commentfile.folder = drp_actividades_apoyo.form.options.actividad_commentfile.folder.split('/').splice(0,3).join('/')+'/'+new Date().getTime();
                                $(".filedragon span:eq(1)").each(function () {
                                    $(this).html("Subir Evidencia")
                                });
                            }
                if (ShowCountactividad_commentfile !== undefined) {
                    ShowCountactividad_commentfile(true);
                }
            }
        );
        NOTIFY.success("Comentario agregado");
        if (ShowCountactividadfile_comment !== undefined) {
            ShowCountactividadfile_comment(true);
            console.log("clean");
        }
    };
    drp_actividades_apoyo.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        if (session.tipo_institucion !== ENUM_2.COMPANY_TYPE.publica) {
            CRUD_drp_actividades_apoyo.table.filters.columns.splice(5, 2);
        }
        drp_actividades_apoyo.fileSI = [];
        for (var items of records.data) {
            drp_actividades_apoyo.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/drp_actividades_apoyo/actividadfile_comment/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        drp_actividades_apoyo.fileSI.push({id: items.id});
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
            await drp_actividades_apoyo.files();
        }
    };
    drp_actividades_apoyo.downloadDiagram = () => {
        let image = drp_actividades_apoyo.myDiagram.makeImage({
            scale: 1
        });
        var a = document.createElement("a"); //Create <a>
        a.href = image.src; //Image Base64 Goes here
        a.download = "Flujo de Trabajo - Actividades de Apoyo.png";
        a.click();
    };
    drp_actividades_apoyo.diagram = () => {
        drp_actividades_apoyo.modal.modalView("drp_actividades_apoyo/diagram", {
            width: 'modal-full',
            header: {
                title: "Vista del Flujo de Trabajo",
                icon: "icon-repo-forked"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'drp_actividades_apoyo',
            },
            event: {
                show: {
                    end: async function (data) {
                        SWEETALERT.loading({message: "Cargando Diagrama"});
                        drp_actividades_apoyo.statusList = await BASEAPI.listp('vw_modulo_estatus', {
                            limit: 0,
                            orderby: "entidad",
                            order: "asc",
                            where: [
                                {
                                    "field": "entidad",
                                    "value": "Actividades de Apoyo"
                                }
                            ]
                        });
                        drp_actividades_apoyo.statusList = drp_actividades_apoyo.statusList.data;
                        setTimeout(async function () {
                            const $$$ = go.GraphObject.make;
                            let statusList = drp_actividades_apoyo.statusList;
                            let thejson = {
                                class: "go.GraphLinksModel",
                                "nodeKeyProperty": "id",
                                "nodeDataArray": [],
                                "linkDataArray": []
                            };

                            statusList.forEach((d) => {
                                let item = {
                                    "id": d.id,
                                    "text": d.nombre
                                };
                                thejson.nodeDataArray.push(item);
                            });

                            statusList?.forEach((d) => {
                                let uniq = a => [...new Set(a)];
                                let posteriores = uniq(eval(d.estatus_posterior));

                                posteriores?.forEach((e) => {
                                    let posterior = statusList.filter(f => f.id === e)[0];
                                    if (posterior) {
                                        let isprogress = true;
                                        let item = {
                                            "from": d.id,
                                            "to": e,
                                            "progress": isprogress,
                                            "text": posterior.action
                                        };
                                        thejson.linkDataArray.push(item);
                                    }
                                });
                            });

                            drp_actividades_apoyo.myDiagram = new go.Diagram(
                                'myDiagramDiv', // must name or refer to the DIV HTML element
                                {
                                    'animationManager.initialAnimationStyle': go.AnimationStyle.None,
                                    InitialAnimationStarting: (e) => {
                                        var animation = e.subject.defaultAnimation;
                                        animation.easing = go.Animation.EaseOutExpo;
                                        animation.duration = 800;
                                        animation.add(e.diagram, 'scale', 0.3, 1);
                                        animation.add(e.diagram, 'opacity', 0, 1);
                                    },

                                    // have mouse wheel events zoom in and out instead of scroll up and down
                                    'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
                                    // support double-click in background creating a new node
                                    'clickCreatingTool.archetypeNodeData': {text: 'new node'},
                                    // enable undo & redo
                                    'undoManager.isEnabled': true,
                                    layout: new go.LayeredDigraphLayout({
                                        layerSpacing: 100,
                                        columnSpacing: 100,
                                        direction: 90,
                                        setsPortSpot: false,
                                        setsChildPortSpot: false,
                                        arrangement: go.TreeArrangement.Horizontal,
                                    }),
                                }
                            );
                            const colors = {
                                pink: '#facbcb',
                                blue: '#b7d8f7',
                                green: '#b9e1c8',
                                yellow: '#faeb98',
                                background: '#e8e8e8',
                            };
                            drp_actividades_apoyo.myDiagram.div.style.backgroundColor = colors.background;
                            drp_actividades_apoyo.myDiagram.nodeTemplate = new go.Node('Auto', {
                                isShadowed: true,
                                shadowBlur: 0,
                                shadowOffset: new go.Point(5, 5),
                                shadowColor: 'black',
                            }).bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify).add(
                                new go.Shape('RoundedRectangle', {
                                    strokeWidth: 1.5,
                                    fill: colors.blue,
                                }).bind('fill', 'type', (type) => {
                                    if (type === 'Start') return colors.green;
                                    if (type === 'End') return colors.pink;
                                    return colors.blue;
                                }).bind('figure', 'type', (type) => {
                                    return 'RoundedRectangle';
                                }),
                                new go.TextBlock({
                                    shadowVisible: false,
                                    margin: 8,
                                    font: 'bold 14px sans-serif',
                                    stroke: '#333',
                                }).bind('text')
                            );

                            // replace the default Link template in the linkTemplateMap
                            drp_actividades_apoyo.myDiagram.linkTemplate = new go.Link(
                                {
                                    isShadowed: true,
                                    shadowBlur: 0,
                                    shadowColor: 'black',
                                    shadowOffset: new go.Point(2.5, 2.5),
                                    curve: go.Curve.Bezier,
                                    curviness: 40,
                                    adjusting: go.LinkAdjusting.Stretch,
                                    reshapable: true,
                                    relinkableFrom: true,
                                    relinkableTo: true,
                                    fromShortLength: 8,
                                    toShortLength: 10,
                                }).bindTwoWay('points').bind('curviness').add(
                                new go.Shape({strokeWidth: 2, shadowVisible: false, stroke: 'black'})
                                    .bind('strokeDashArray', 'progress', (progress) => (progress ? [] : [5, 6]))
                                    .bind('opacity', 'progress', (progress) => (progress ? 1 : 0.5)),
                                new go.Shape({
                                    fromArrow: 'circle',
                                    strokeWidth: 1.5,
                                    fill: 'white'
                                }).bind('opacity', 'progress', (progress) => (progress ? 1 : 0.5)),
                                new go.Shape({
                                    toArrow: 'standard',
                                    stroke: null,
                                    scale: 1.5,
                                    fill: 'black'
                                }).bind('opacity', 'progress', (progress) => (progress ? 1 : 0.5))
                            );


                            // read in the JSON data from the "mySavedModel" element
                            drp_actividades_apoyo.myDiagram.model = go.Model.fromJson(JSON.stringify(thejson));
                            SWEETALERT.stop();
                        }, 1000)
                    }
                }
            }
        });
    }
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    drp_actividades_apoyo.triggers.table.after.open = function (data) {
        drp_actividades_apoyo.estado_antiguo = drp_actividades_apoyo.estatus;
        drp_actividades_apoyo.dont_show_money = drp_actividades_apoyo.permitir == ENUM_2.Grupos.director_departamental || drp_actividades_apoyo.permitir == ENUM_2.Grupos.analista_departamental;
        setTimeout(function () {
            if (drp_actividades_apoyo.ver) {
                drp_actividades_apoyo.form.options.actividadfile_comment.truetext = "Ver Evidencias";
                drp_actividades_apoyo.form.options.actividadfile_comment.title = "Ver Evidencias";
                drp_actividades_apoyo.setPermission("file.upload", false);
                if (drp_actividades_apoyo.permitir !== ENUM_2.Grupos.director_general){
                    drp_actividades_apoyo.setPermission("file.remove", false);
                }else{
                    drp_actividades_apoyo.setPermission("file.remove", true);
                }
                drp_actividades_apoyo.refreshAngular();
            } else {
                drp_actividades_apoyo.form.options.actividadfile_comment.truetext = "Subir Evidencias";
                drp_actividades_apoyo.form.options.actividadfile_comment.title = "Subir Evidencias";
                drp_actividades_apoyo.setPermission("file.upload", true);
                drp_actividades_apoyo.setPermission("file.remove", true);
                drp_actividades_apoyo.refreshAngular();
            }
        }, 4000);
        //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    };

    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    drp_actividades_apoyo.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        paso = false;
        drp_actividades_apoyo.refresh();
        // drp_actividades_apoyo.ver = false;
    };
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
    drp_actividades_apoyo.triggers.table.after.control = function (data) {
        if (data === 'actividades_poa_info') {
            if (drp_actividades_apoyo.form.selected('actividades_poa_info') !== null) {
                drp_actividades_apoyo.departamento_actividad = drp_actividades_apoyo.form.selected('actividades_poa_info').departamento_nombre_2 + "";
                drp_actividades_apoyo.producto_actividad = drp_actividades_apoyo.form.selected('actividades_poa_info').producto_nombre + "";
                drp_actividades_apoyo.responsable_actividad = drp_actividades_apoyo.form.selected('actividades_poa_info').responsable;
                drp_actividades_apoyo.presupuesto_actividad = LAN.money(drp_actividades_apoyo.form.selected('actividades_poa_info').presupuesto).format(true);
                drp_actividades_apoyo.presupuesto_consumido_actividad = LAN.money(drp_actividades_apoyo.form.selected('actividades_poa_info').presupuesto_consumido).value;
                drp_actividades_apoyo.presupuesto_consumido_actividad_actual = (LAN.money(drp_actividades_apoyo.presupuesto_consumido_actividad).value - LAN.money(drp_actividades_apoyo.view_presupuesto_consumido).value);
                drp_actividades_apoyo.poa_actividad = drp_actividades_apoyo.form.selected('actividades_poa_info').poa;
                drp_actividades_apoyo.maneja_presupuesto_actividad = drp_actividades_apoyo.form.selected('actividades_poa_info').maneja_presupuesto;
                drp_actividades_apoyo.presupuesto_actividad_actual = (LAN.money(drp_actividades_apoyo.presupuesto_actividad).value - LAN.money(drp_actividades_apoyo.act_apoyo_presupuesto).value);
                drp_actividades_apoyo.estatus_actividad_poa = drp_actividades_apoyo.form.selected('actividades_poa_info').estatus_actividad;
                drp_actividades_apoyo.refreshAngular();
            }
        }
        if (data === 'departamento_act_info') {
            drp_actividades_apoyo.presupuesto_restante = LAN.money(drp_actividades_apoyo.form.selected('departamento_act_info').presupuesto_restante).format(true);
        }
        if (data == 'view_presupuesto_consumido') {
            drp_actividades_apoyo.view_presupuesto_consumido = LAN.money(drp_actividades_apoyo.view_presupuesto_consumido).format(true);
            drp_actividades_apoyo.show_presupuesto_consumido = drp_actividades_apoyo.view_presupuesto_consumido;
        }
        if (data == 'view_presupuesto') {
            drp_actividades_apoyo.view_presupuesto = LAN.money(drp_actividades_apoyo.view_presupuesto).format(true);
        }
        if (data == 'act_apoyo_presupuesto') {
            drp_actividades_apoyo.act_apoyo_presupuesto = LAN.money(drp_actividades_apoyo.view_presupuesto).format(false);
            drp_actividades_apoyo.refreshAngular();
        }
        if (data == 'responsable_edit') {
            drp_actividades_apoyo.responsable_edit = drp_actividades_apoyo.responsable;
            if (drp_actividades_apoyo.permitir == ENUM_2.Grupos.director_departamental && drp_actividades_apoyo.condicion !== "Vencida") {
                drp_actividades_apoyo.selectQueries['responsable_edit'] = [
                    {
                        field: 'departamento',
                        operator: '=',
                        value: drp_actividades_apoyo.session.departamento
                    }
                ];
                if (!load_me_once) {
                    drp_actividades_apoyo.form.loadDropDown('responsable_edit')
                    load_me_once = true;
                }
                drp_actividades_apoyo.show_drp = true;
            }else if (drp_actividades_apoyo.permitir == ENUM_2.Grupos.director_general){
                drp_actividades_apoyo.selectQueries['responsable_edit'] = [
                    {
                        field: 'departamento',
                        operator: '=',
                        value: drp_actividades_apoyo.departamento
                    }
                ];
                if (!load_me_once) {
                    drp_actividades_apoyo.form.loadDropDown('responsable_edit')
                    load_me_once = true;
                }
                drp_actividades_apoyo.show_drp = true;
            }
        }
        if (data == 'estatus'){
            if ((drp_actividades_apoyo.permitir == ENUM_2.Grupos.director_departamental || drp_actividades_apoyo.permitir == ENUM_2.Grupos.analista_departamental ) && drp_actividades_apoyo.my_true_estatus == 5) {
                drp_actividades_apoyo.form.options.estatus.disabled = true;
                drp_actividades_apoyo.refreshAngular();
            }
        }
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};

    drp_actividades_apoyo.change_filters_toMines = function () {
        drp_actividades_apoyo.allowtoWork = true;
        drp_actividades_apoyo.fixFilters = [
            {
                field: "responsable",
                value: drp_actividades_apoyo.session.usuario_id
            },
            {
                field: "poa",
                value: drp_actividades_apoyo.session.poa_id
            },
            {
                field: "compania",
                value: drp_actividades_apoyo.session.compania_id
            }
        ];
        drp_actividades_apoyo.refresh();
    };
    drp_actividades_apoyo.change_filters_toOurs = function () {
        drp_actividades_apoyo.allowtoWork = false;
        if (drp_actividades_apoyo.permitir) {
            if (drp_actividades_apoyo.permitir != drp_actividades_apoyo.analista_de_planificacion && drp_actividades_apoyo.permitir != drp_actividades_apoyo.director_general && drp_actividades_apoyo.permitir != drp_actividades_apoyo.analista_departamental) {
                drp_actividades_apoyo.fixFilters = [
                    {
                        field: "responsable",
                        value: drp_actividades_apoyo.session.usuario_id
                    },
                    {
                        field: "poa",
                        value: drp_actividades_apoyo.session.poa_id
                    },
                    {
                        field: "compania",
                        value: drp_actividades_apoyo.session.compania_id
                    }
                ];
            } else if (drp_actividades_apoyo.permitir == drp_actividades_apoyo.analista_de_planificacion || drp_actividades_apoyo.permitir == drp_actividades_apoyo.director_general) {
                drp_actividades_apoyo.fixFilters = [
                    {
                        field: "poa",
                        value: drp_actividades_apoyo.session.poa_id
                    },
                    {
                        field: "compania",
                        value: drp_actividades_apoyo.session.compania_id
                    }
                ];
            }  if (drp_actividades_apoyo.permitir == drp_actividades_apoyo.director_departamental) {
                console.log("Entre en el ultimo if", drp_actividades_apoyo.permitir, drp_actividades_apoyo.director_departamental);
                drp_actividades_apoyo.fixFilters = drp_actividades_apoyo.base;
            }
        } else {
            drp_actividades_apoyo.fixFilters = [];
        }
        drp_actividades_apoyo.refresh();
    };

    drp_actividades_apoyo.change_normal_comments = function () {
        CRUD_comentarios_actividad_apoyo.table.columns.value3 = {
            visible: false,
            visibleDetail: false,
            export: false,
            exportExample: false,
            dead: true
        }
        comentarios_actividad_apoyo.fixFilters = [
            {
                "field": "type",
                "value": ENUM_2.tipo_comentario.Actividades_apoyo
            },
            {
                "field": "value2",
                "value": drp_actividades_apoyo.id
            }
        ];
        comentarios_actividad_apoyo.refresh();
    };
    drp_actividades_apoyo.change_money_comments = function () {
        CRUD_comentarios_actividad_apoyo.table.columns.value3 = {
            sorttype: "money",
            formattype: "money",
            visible: true,
            visibleDetail: true,
            export: false,
            exportExample: false,
            dead: false
        }
        comentarios_actividad_apoyo.fixFilters = [
            {
                "field": "type",
                "value": ENUM_2.tipo_comentario.Actividades_apoyo
            },
            {
                "field": "value2",
                "value": drp_actividades_apoyo.id
            },
            {
                "field": "value3",
                "operator": "is",
                "value": "$not null"
            }
        ];
        comentarios_actividad_apoyo.refresh();
    };

    drp_actividades_apoyo.verFile = function (key, value, row) {
        drp_actividades_apoyo.setPermission("file.upload", false);
        if (drp_actividades_apoyo.permitir !== ENUM_2.Grupos.director_general){
            drp_actividades_apoyo.setPermission("file.remove", false);
        }else{
            drp_actividades_apoyo.setPermission("file.remove", true);
        }
        if (typeof drp_actividades_apoyo !== 'null') {
            if (drp_actividades_apoyo) {
                var info = drp_actividades_apoyo.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/drp_actividades_apoyo/actividadfile_comment/" + row.id, row);
                    drp_actividades_apoyo.showfiletypes = function () {
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
                                        action: function(){
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
                                    begin: function(data) {
                                        data.permitted_files = [];
                                        for (var i in CONFIG.fileType_general) {
                                            for (var j in CONFIG.fileType_general[i]) {
                                                if(typeof data.permitted_files[j] == "undefined"){
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
                        drp_actividades_apoyo.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'drp_actividades_apoyo',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    drp_actividades_apoyo.modal.modalView("templates/components/gallery", {
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
    drp_actividades_apoyo.contains_status = function (item) {
        if (drp_actividades_apoyo.estatus != 4 ) {
            if (item.name == "Detenida") {
                return false;
            }
        }
        return true;
    };
    drp_actividades_apoyo.presupuesto_restante_calculate = function () {
        var DB_PRR = LAN.money(drp_actividades_apoyo.presupuesto_consumido).value;
        var PT_PR = LAN.money(drp_actividades_apoyo.act_apoyo_presupuesto_consumido).value;

        var CONSUMIDO = (DB_PRR + PT_PR);
        return LAN.money(CONSUMIDO).format(true);
    };
});

