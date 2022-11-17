app.controller("vw_proyecto_item_actividad", function ($scope, $http, $compile) {
    vw_proyecto_item_actividad = this;
    vw_proyecto_item_actividad.session = new SESSION().current();
    vw_proyecto_item_actividad.group_caracteristica = vw_proyecto_item_actividad.session.groups[0] ? vw_proyecto_item_actividad.session.groups[0].caracteristica : "";
    vw_proyecto_item_actividad.fixFilters = [
        {
            field: "proyecto_item_estatus",
            operator: ">",
            value: 1
        },
        {
            field: "compania",
            value: vw_proyecto_item_actividad.session.compania_id
        },
    ];

    // gestion de proceso
    //vw_proyecto_item_actividad.singular = "singular";
    //vw_proyecto_item_actividad.plural = "plural";
    //vw_proyecto_item_actividad.headertitle = "Hola Title";
    //vw_proyecto_item_actividad.destroyForm = false;
    //vw_proyecto_item_actividad.permissionTable = "tabletopermission";
    vw_proyecto_item_actividad.do_me_once = false;
    vw_proyecto_item_actividad.destroyForm = false;
    vw_proyecto_item_actividad.dont_show_money = false;
    RUNCONTROLLER("vw_proyecto_item_actividad", vw_proyecto_item_actividad, $scope, $http, $compile);
    RUN_B("vw_proyecto_item_actividad", vw_proyecto_item_actividad, $scope, $http, $compile);
    vw_proyecto_item_actividad.soloAnadirComentario = async function (copy) {
        VALIDATION.save(vw_proyecto_item_actividad, async function () {
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
            for(var item of buttons){
                item.disabled = true;
            }
            BASEAPI.insertIDp('comentarios',
                {
                    "comentario": vw_proyecto_item_actividad.comentario_comment,
                    "type": 26,
                    "created_by": session.usuario_id,
                    "value": vw_proyecto_item_actividad.estatus_id,
                    "value2": vw_proyecto_item_actividad.id,
                }, '', '').then(async function (rs) {
                    var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                    for(var item of buttons){
                        item.disabled = false;
                    }
                    if (rs.data)
                        if (rs.data.data)
                            if (rs.data.data[0])
                                if (rs.data.data[0].id) {
                                    vw_proyecto_item_actividad.comentario_comment = "";
                                    vw_proyecto_item_actividad.refreshAngular();
                                    await vw_proyecto_item_actividad.saveAllFiles(rs.data.data[0].id, 'comentarios_proyecto_item_actividad', 'proyecto_item_actividadfile_comment');
                                }
                    if (ShowCountactividadfile_comment !== undefined) {
                        ShowCountactividadfile_comment(true);
                    }
                }
            );
            NOTIFY.success("Comentario agregado");
            comentarios_p_actividad.refresh();
        },  ["comentario_comment"] );
    };
    vw_proyecto_item_actividad.saveActividad = function () {
        var fields = vw_proyecto_item_actividad.estatus_id == ENUM_2.actividad_apoyo_estatus.Completa ? ["estatus_id", "comentario", "presupuesto"] : ["estatus_id", "comentario"];
        VALIDATION.save(vw_proyecto_item_actividad, async function () {
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
            for(var item of buttons){
                item.disabled = true;
            }
            if (vw_proyecto_item_actividad.estatus_id == ENUM_2.actividad_proyecto_estatus.Trabajada) {
                if (vw_proyecto_item_actividad.puede_completar == 'No') {
                    SWEETALERT.show({
                        type: 'error',
                        message: "El estatus de la Actividad no puede ser cambiado al estatus seleccionado, para hacer lo deseado debes COMPLETAR o CANCELAR sus Actividades de Apoyo. Favor Revisar"
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    return;
                }
            }
            if (vw_proyecto_item_actividad.estatus_id == ENUM_2.actividad_proyecto_estatus.Cancelada) {
                if (vw_proyecto_item_actividad.puede_cancelar == 'No') {
                    SWEETALERT.show({
                        type: 'error',
                        message: "La actividad no puede ser cancelada puesto que existen actividades de apoyo ya trabajadas. Favor revisar"
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    return;
                }
                if (LAN.money(vw_proyecto_item_actividad.presupuesto_consumido).value > 0) {
                    SWEETALERT.show({
                        type: 'error',
                        message: "La actividad no puede ser cancelada puesto que tiene presupuesto consumido. Favor revisar"
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    return;
                }
            }
            if (vw_proyecto_item_actividad.estatus_id == ENUM_2.actividad_proyecto_estatus.Completa) {
                if (vw_proyecto_item_actividad.puede_completar == 'No') {
                    SWEETALERT.show({
                        type: 'error',
                        message: "El estatus de la Actividad no puede ser cambiado al estatus seleccionado, para hacer lo deseado debes COMPLETAR o CANCELAR sus Actividades de Apoyo. Favor Revisar"
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    return;
                }
            }
            SWEETALERT.loading({message: MESSAGE.i('mono.procesing')});
            BASEAPI.updateall('proyecto_item_actividad', {
                presupuesto: LAN.money(vw_proyecto_item_actividad.presupuesto).value,
                presupuesto_consumido: vw_proyecto_item_actividad.estatus_id == 6 ? LAN.money(vw_proyecto_item_actividad.presupuesto).value : parseFloat(DSON.cleanNumber(vw_proyecto_item_actividad.presupuesto_consumido_ver)) > 0 ? LAN.money(vw_proyecto_item_actividad.presupuesto_consumido_ver).value : 0,
                estatus: vw_proyecto_item_actividad.estatus_id,
                razon: !DSON.oseaX(vw_proyecto_item_actividad.razon) ? vw_proyecto_item_actividad.razon : "$NULL",
                responsable: !DSON.oseaX(vw_proyecto_item_actividad.responsable_id) ? vw_proyecto_item_actividad.responsable_id : "$null",
                avance_porcentaje: vw_proyecto_item_actividad.estatus == 6 ? 100 : vw_proyecto_item_actividad.avance_porcentaje,
                where: [{
                    field: "id",
                    value: vw_proyecto_item_actividad.id
                }]
            }, async function (result) {
                var rs = await BASEAPI.insertIDp('comentarios', {
                    "comentario": vw_proyecto_item_actividad.comentario,
                    "type": ENUM_2.tipo_comentario.proyecto_actividad,
                    "created_by": vw_proyecto_item_actividad.session.usuario_id,
                    "value": vw_proyecto_item_actividad.estatus_id,
                    "value2": vw_proyecto_item_actividad.id,
                    "value3": parseFloat(DSON.cleanNumber(vw_proyecto_item_actividad.act_presupuesto_consumido)) > 0 ? LAN.money(vw_proyecto_item_actividad.act_presupuesto_consumido).value : "$null",
                }, '', '');
                if (rs.data)
                    if (rs.data.data)
                        if (rs.data.data[0])
                            if (rs.data.data[0].id) {
                                vw_proyecto_item_actividad.comentario = "";
                                vw_proyecto_item_actividad.refreshAngular();
                                await BASEAPI.ajax.postp(new HTTP().path(["files", "api", "copy"]), {
                                    moves: [{
                                        from: `${FOLDERS.files}/vw_proyecto_item_actividad/actividadfile/${vw_proyecto_item_actividad.id}`,
                                        to: `${FOLDERS.files}/comentarios_p_actividad/actividadfile_comment/${rs.data.data[0].id}`
                                    }]
                                });
                            }

                if (vw_proyecto_item_actividad.estatus_id == ENUM_2.actividad_proyecto_estatus.Ejecucion && vw_proyecto_item_actividad.proyecto_item_estatus == 1){
                    BASEAPI.updateall('proyecto_item', {
                        estatus: 2,
                        where: [{
                            field: "id",
                            value: vw_proyecto_item_actividad.proyecto_item
                        }]
                    }, async function (result) {

                    });
                }
                if (vw_proyecto_item_actividad.estatus_id == ENUM_2.actividad_proyecto_estatus.Cancelada){
                    BASEAPI.updateall('proyecto_actividad_apoyo', {
                        estatus: 5,
                        where: [
                            {
                                field: "proyecto_actividad",
                                value: vw_proyecto_item_actividad.id
                            },
                            {
                                field: "estatus",
                                value: 1
                            }
                        ]
                    }, async function (result) {

                    });
                }
                // await AUDIT.LOG(AUDIT.ACTIONS.update, drp_actividades_apoyo.auditModel,
                //     {
                //         id: drp_actividades_apoyo.id,
                //         nombre: drp_actividades_apoyo.nombre,
                //         estado: drp_actividades_apoyo.form.selected('estatus').nombre,
                //         presupuesto: drp_actividades_apoyo.act_apoyo_presupuesto
                //     },
                //     {
                //         id: drp_actividades_apoyo.id,
                //         nombre: drp_actividades_apoyo.nombre,
                //         estado: drp_actividades_apoyo.estado_antiguo,
                //         presupuesto: drp_actividades_apoyo.view_presupuesto
                //     }
                // );
                // if (drp_actividades_apoyo.estado_antiguo != drp_actividades_apoyo.estatus){
                //     if (drp_actividades_apoyo.estatus == ENUM_2.actividad_apoyo_estatus.Completa){
                //         titulo_push = `Se ha completado la Actividad de Apoyo: "${drp_actividades_apoyo.nombre}"`;
                //         cuerpo_push = `${drp_actividades_apoyo.form.selected('responsable').nombre + ' ' + drp_actividades_apoyo.form.selected('responsable').apellido} se ha completado la actividad de apoyo: "${drp_actividades_apoyo.nombre}" asignada a usted.`;
                //
                //         titulo = `Se ha completado la Actividad de Apoyo: "${drp_actividades_apoyo.nombre}"`;
                //         cuerpo = `Se ha completado la actividad de apoyo: "${drp_actividades_apoyo.nombre}". Proceder a tomar las acciones que considre pertinente.`;
                //         drp_actividades_apoyo.push_json = {
                //             title: titulo_push,
                //             content: cuerpo_push,
                //             user: [drp_actividades_apoyo.form.selected('responsable').id],
                //             url: 'drp_actividades_apoyo'
                //         };
                //         send_notification.send.send(drp_actividades_apoyo.push_json);
                //         function_send_email_group(titulo, cuerpo, titulo, cuerpo, session.compania_id, drp_actividades_apoyo.departamento, drp_actividades_apoyo.form.selected('responsable').correo, session.institucion_id);
                //     }else if (drp_actividades_apoyo.estatus == ENUM_2.actividad_apoyo_estatus.Cancelada){
                //         titulo_push = `Actividad de Apoyo: "${drp_actividades_apoyo.nombre}" ha sido cancelada.`;
                //         cuerpo_push = `Se ha cancelado la actividad de apoyo: "${drp_actividades_apoyo.nombre}" asignada a usted.`;
                //
                //         titulo = `Actividad de Apoyo:  "${drp_actividades_apoyo.nombre}" ha sido cancelada.`;
                //         cuerpo = `Se ha cancelado la actividad de apoyo: "${drp_actividades_apoyo.nombre}". Proceder a tomar las acciones que considre pertinente.`;
                //         drp_actividades_apoyo.push_json = {
                //             title: titulo_push,
                //             content: cuerpo_push,
                //             user: [drp_actividades_apoyo.form.selected('responsable').id],
                //             url: 'drp_actividades_apoyo'
                //         };
                //         send_notification.send.send(drp_actividades_apoyo.push_json);
                //         function_send_email_group(titulo, cuerpo, titulo, cuerpo, session.compania_id, drp_actividades_apoyo.departamento, drp_actividades_apoyo.form.selected('responsable').correo, session.institucion_id);
                //     }
                // }
                var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                for(var item of buttons){
                    item.disabled = false;
                }
                NOTIFY.success("Comentario agregado");
                MODAL.close();
                vw_proyecto_item_actividad.refresh();
                SWEETALERT.stop();
            });
        }, fields);
    };
    if (vw_proyecto_item_actividad.group_caracteristica == ENUM_2.Grupos.director_departamental || vw_proyecto_item_actividad.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
        if (vw_proyecto_item_actividad.session.departamento) {
            vw_proyecto_item_actividad.fixFilters.push({
                "field": "departamento",
                "value": vw_proyecto_item_actividad.session.departamento
            });
        }
        vw_proyecto_item_actividad.dont_show_money = true;
        if (vw_proyecto_item_actividad.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            vw_proyecto_item_actividad.fixFilters.push({
                "field": "responsable_id",
                "value": vw_proyecto_item_actividad.session.id
            });
        }
    } else {
        vw_proyecto_item_actividad.dont_show_money = false;
        vw_proyecto_item_actividad.departamentoPre = "0";
    }
    vw_proyecto_item_actividad.cargar = true;
    vw_proyecto_item_actividad.triggers.table.after.control = function (data) {
        if (data == 'departamentoPre') {
            if (vw_proyecto_item_actividad.group_caracteristica == ENUM_2.Grupos.director_departamental || vw_proyecto_item_actividad.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                vw_proyecto_item_actividad.departamentoPre = vw_proyecto_item_actividad.session.departamento + "";
                vw_proyecto_item_actividad.form.options.departamentoPre.disabled = true;
            } else {
                if (vw_proyecto_item_actividad.cargar) {
                    if (STORAGE.exist('depaP')) {
                        vw_proyecto_item_actividad.departamentoPre = STORAGE.get('depaP');
                        vw_proyecto_item_actividad.cargar = false;
                        vw_proyecto_item_actividad.form.loadDropDown('departamentoPre');
                    } else {
                        vw_proyecto_item_actividad.departamentoPre = vw_proyecto_item_actividad.session.departamento + "";
                        vw_proyecto_item_actividad.cargar = false;
                        vw_proyecto_item_actividad.form.loadDropDown('departamentoPre');
                    }
                    if (vw_proyecto_item_actividad.form.selected('departamentoPre') !== null) {
                        if (vw_proyecto_item_actividad.form.selected('departamentoPre').id == 0) {
                            vw_proyecto_item_actividad.fixFilters = [
                                {
                                    field: "proyecto_item_estatus",
                                    operator: ">",
                                    value: 1
                                },
                                {
                                    field: "compania",
                                    value: vw_proyecto_item_actividad.session.compania_id
                                }
                            ];
                            if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                                vw_proyecto_item_actividad.fixFilters.push({
                                    "field": "responsable_id",
                                    "value": vw_proyecto_item_actividad.session.id
                                });
                            }
                        } else {
                            STORAGE.add('depaP', vw_proyecto_item_actividad.departamentoPre);
                            vw_proyecto_item_actividad.fixFilters = [
                                {
                                    field: "proyecto_item_estatus",
                                    operator: ">",
                                    value: 1
                                },
                                {
                                    field: "compania",
                                    value: vw_proyecto_item_actividad.session.compania_id
                                },
                                {
                                    "field": "departamento_id",
                                    "value": vw_proyecto_item_actividad.form.selected('departamentoPre').id
                                }
                            ];
                            if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                                vw_proyecto_item_actividad.fixFilters.push({
                                    "field": "responsable_id",
                                    "value": vw_proyecto_item_actividad.session.id
                                });
                            }
                        }
                    } else {
                        if (STORAGE.exist('depaP')) {
                            vw_proyecto_item_actividad.departamentoPre = STORAGE.get('depaP');
                        } else {
                            vw_proyecto_item_actividad.departamentoPre = "0";
                        }
                        vw_proyecto_item_actividad.fixFilters = [
                            {
                                field: "proyecto_item_estatus",
                                operator: ">",
                                value: 1
                            },
                            {
                                field: "compania",
                                value: vw_proyecto_item_actividad.session.compania_id
                            },
                        ];
                        if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                            vw_proyecto_item_actividad.fixFilters.push({
                                "field": "responsable_id",
                                "value": vw_proyecto_item_actividad.session.id
                            });
                        }
                        vw_proyecto_item_actividad.refresh();
                    }
                }
            }
            if (!vw_proyecto_item_actividad.do_me_once){
                vw_proyecto_item_actividad.form.loadDropDown('departamentoPre');
                vw_proyecto_item_actividad.do_me_once = true;
            }
        }
    };
    vw_proyecto_item_actividad.myfirsttime = 0;
    vw_proyecto_item_actividad.$scope.$watch('vw_proyecto_item_actividad.departamentoPre', function (value) {
        if (vw_proyecto_item_actividad.myfirsttime > 1) {
            if (vw_proyecto_item_actividad.form.selected('departamentoPre') !== null) {
                if (vw_proyecto_item_actividad.form.selected('departamentoPre').id == 0) {
                    STORAGE.add('depaP', vw_proyecto_item_actividad.departamentoPre);
                    vw_proyecto_item_actividad.fixFilters = [
                        {
                            field: "proyecto_item_estatus",
                            operator: ">",
                            value: 1
                        },
                        {
                            field: "compania",
                            value: vw_proyecto_item_actividad.session.compania_id
                        },
                    ];
                    if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                        vw_proyecto_item_actividad.fixFilters.push({
                            "field": "responsable_id",
                            "value": vw_proyecto_item_actividad.session.id
                        });
                    }
                } else {
                    STORAGE.add('depaP', vw_proyecto_item_actividad.departamentoPre);
                    vw_proyecto_item_actividad.fixFilters = [
                        {
                            field: "proyecto_item_estatus",
                            operator: ">",
                            value: 1
                        },
                        {
                            field: "compania",
                            value: vw_proyecto_item_actividad.session.compania_id
                        },
                        {
                            "field": "departamento_id",
                            "value": value
                        }
                    ];
                    if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                        vw_proyecto_item_actividad.fixFilters.push({
                            "field": "responsable_id",
                            "value": vw_proyecto_item_actividad.session.id
                        });
                    }
                }
                vw_proyecto_item_actividad.refresh();
            } else {
                if (STORAGE.exist('depaP')) {
                    vw_proyecto_item_actividad.departamentoPre = STORAGE.get('depaP');
                }else {
                    vw_proyecto_item_actividad.departamentoPre = "0";
                }
                vw_proyecto_item_actividad.fixFilters = [
                    {
                        field: "proyecto_item_estatus",
                        operator: ">",
                        value: 1
                    },
                    {
                        field: "compania",
                        value: vw_proyecto_item_actividad.session.compania_id
                    },
                ];
                if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                    vw_proyecto_item_actividad.fixFilters.push({
                        "field": "responsable_id",
                        "value": vw_proyecto_item_actividad.session.id
                    });
                }
                vw_proyecto_item_actividad.refresh();
            }
        }
        vw_proyecto_item_actividad.myfirsttime++;
    });
    vw_proyecto_item_actividad.formulary =  function (data, mode, defaultData, view) {
        if (vw_proyecto_item_actividad !== undefined) {
            vw_proyecto_item_actividad.form.modalWidth = ENUM.modal.width.full;
            vw_proyecto_item_actividad.form.readonly = {};
            vw_proyecto_item_actividad.createForm(data, mode, defaultData, view);
            vw_proyecto_item_actividad.selectQueries['estatus_id'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: vw_proyecto_item_actividad.session.groups[0].id
                },
                {
                    field: 'entidad',
                    operator: '=',
                    value: "proyecto_item_actividad"
                }
            ];
            //ms_product.selectQueries['pei'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_proyecto_item_actividad.pei", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_item_actividad, 'pei', rules);
            });
            //ms_product.selectQueries['proyecto_item'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_proyecto_item_actividad.proyecto_item", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_item_actividad, 'proyecto_item', rules);
            });
            // $scope.$watch("vw_proyecto_item_actividad.proyecto_item_nombre", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_proyecto_item_actividad, 'proyecto_item_nombre', rules);
            // });
            // $scope.$watch("vw_proyecto_item_actividad.nombre", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_proyecto_item_actividad, 'nombre', rules);
            // });
            // $scope.$watch("vw_proyecto_item_actividad.descripcion", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_proyecto_item_actividad, 'descripcion', rules);
            // });
            $scope.$watch("vw_proyecto_item_actividad.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_item_actividad, 'departamento', rules);
            });
            $scope.$watch("vw_proyecto_item_actividad.departamento_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_item_actividad, 'departamento_id', rules);
            });
            // $scope.$watch("vw_proyecto_item_actividad.responsable", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_proyecto_item_actividad, 'responsable', rules);
            // });
            $scope.$watch("vw_proyecto_item_actividad.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_item_actividad, 'estatus', rules);
            });
            $scope.$watch("vw_proyecto_item_actividad.estatus_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_item_actividad, 'estatus_id', rules);
            });
            $scope.$watch("vw_proyecto_item_actividad.from", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_item_actividad, 'from', rules);
            });
            $scope.$watch("vw_proyecto_item_actividad.comentario_comment", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_item_actividad, 'comentario_comment', rules);
            });
            $scope.$watch('vw_proyecto_item_actividad.avance_porcentaje', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.menorQue(value,100,"Porcentaje de Avance", "100"))
                VALIDATION.validate(vw_proyecto_item_actividad, "avance_porcentaje", rules);
            });
            $scope.$watch("vw_proyecto_item_actividad.act_presupuesto_consumido", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                var RES = vw_proyecto_item_actividad.presupuesto_old;
                rules.push(VALIDATION.yariel.greaterThanAct(
                    (parseFloat(vw_proyecto_item_actividad.presupuesto_consumido) + parseFloat(DSON.cleanNumber(value))),
                    RES, "El monto del presupuesto consumido", "Presupuesto asignado"));
                vw_proyecto_item_actividad.presupuesto_consumido_ver = LAN.money(vw_proyecto_item_actividad.presupuesto_consumido_restante_calculate()).format(false);
                VALIDATION.validate(vw_proyecto_item_actividad, 'act_presupuesto_consumido', rules);
            });
            $scope.$watch("vw_proyecto_item_actividad.comentario", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_item_actividad, 'comentario', rules);
            });
            $scope.$watch("vw_proyecto_item_actividad.presupuesto", async function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                debugger
                if (vw_proyecto_item_actividad.proyecto_item_presupuesto_restante) {
                    var RES = parseFloat(DSON.cleanNumber(vw_proyecto_item_actividad.presupuesto_ver)) + vw_proyecto_item_actividad.proyecto_item_presupuesto_restante;
                }else{
                    await vw_proyecto_item_actividad.get_presupuesto_restante();
                    var RES = parseFloat(DSON.cleanNumber(vw_proyecto_item_actividad.presupuesto_ver)) + vw_proyecto_item_actividad.proyecto_item_presupuesto_restante;
                }
                rules.push(VALIDATION.yariel.greaterThanAct(
                    parseFloat(DSON.cleanNumber(value)),
                    RES, "El monto del presupuesto consumido", "Presupuesto asignado"));
                vw_proyecto_item_actividad.presupuesto_restante = LAN.money(vw_proyecto_item_actividad.presupuesto_restante_calculate()).format(true);
                VALIDATION.validate(vw_proyecto_item_actividad, 'presupuesto', rules);
            });
            $scope.$watch("vw_proyecto_item_actividad.razon", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_item_actividad, 'razon', rules);
            });
            vw_proyecto_item_actividad.triggers.table.after.control = async function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
                if (data == 'presupuesto_restante') {
                    await vw_proyecto_item_actividad.get_presupuesto_restante();
                    vw_proyecto_item_actividad.presupuesto_restante = LAN.money(vw_proyecto_item_actividad.proyecto_item_presupuesto_restante).format(true);
                }
                if (data == 'presupuesto_ver') {
                    vw_proyecto_item_actividad.presupuesto_old = LAN.money(vw_proyecto_item_actividad.presupuesto_ver).value;
                    vw_proyecto_item_actividad.presupuesto_ver = LAN.money(vw_proyecto_item_actividad.presupuesto_ver).format(true);
                }
                if (data == 'show_presupuesto_consumido') {
                    vw_proyecto_item_actividad.show_presupuesto_consumido = LAN.money(vw_proyecto_item_actividad.show_presupuesto_consumido).format(true);
                }
            };
        }
    };
    vw_proyecto_item_actividad.triggers.table.after.load = async function (records) {
        vw_proyecto_item_actividad.fileSI = [];
        if (records.data) {
            for (var items of records.data) {
                vw_proyecto_item_actividad.files = () => new Promise(async (resolve, reject) => {
                    BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/vw_proyecto_item_actividad/actividadfile/' + items.id}, function (result) {
                        if (result.data.count > 0) {
                            vw_proyecto_item_actividad.fileSI.push({id: items.id});
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
                await vw_proyecto_item_actividad.files();
                vw_proyecto_item_actividad.refreshAngular();
            }
        }
    };
    vw_proyecto_item_actividad.get_presupuesto_restante = async function() {
        vw_proyecto_item_actividad.proyecto_item_lista_actividades = await BASEAPI.listp('vw_proyecto_item_actividad',{
            limit: 0,
            where: [
                {
                    field: "proyecto_item",
                    operator: "=",
                    value: vw_proyecto_item_actividad.proyecto_item
                }
            ]
        });
        vw_proyecto_item_actividad.proyecto_item_lista_actividades = vw_proyecto_item_actividad.proyecto_item_lista_actividades.data;
        vw_proyecto_item_actividad.proyecto_item_presupuesto_consumido = 0;
        vw_proyecto_item_actividad.proyecto_item_presupuesto_restante = 0;
        if (vw_proyecto_item_actividad.proyecto_item_lista_actividades.length > 0) {
            for (var i of vw_proyecto_item_actividad.proyecto_item_lista_actividades) {
                vw_proyecto_item_actividad.proyecto_item_presupuesto_consumido += LAN.money(i.presupuesto).value;
            }
        }else{
            vw_proyecto_item_actividad.proyecto_item_presupuesto_consumido = 0;
        }
        vw_proyecto_item_actividad.proyecto_item_presupuesto_restante = LAN.money(vw_proyecto_item_actividad.presupuesto_producto).value - vw_proyecto_item_actividad.proyecto_item_presupuesto_consumido;
    }
    vw_proyecto_item_actividad.presupuesto_restante_calculate = function () {
        var DB_PRR = LAN.money(vw_proyecto_item_actividad.presupuesto_restante).value;
        var PT_PA = LAN.money(vw_proyecto_item_actividad.presupuesto_ver).value;
        var PT_PR = LAN.money(vw_proyecto_item_actividad.presupuesto).value;

        var CONSUMIDO = (DB_PRR + PT_PA) - PT_PR;
        return LAN.money(CONSUMIDO).format(true);
    };
    vw_proyecto_item_actividad.presupuesto_consumido_restante_calculate = function () {
        var DB_PRR = LAN.money(vw_proyecto_item_actividad.presupuesto_consumido).value;
        var PT_PR = LAN.money(vw_proyecto_item_actividad.act_presupuesto_consumido).value;

        var CONSUMIDO = (DB_PRR + PT_PR);
        return LAN.money(CONSUMIDO).format(true);
    };
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
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
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
    vw_proyecto_item_actividad.verFile = function (key, value, row) {
        vw_proyecto_item_actividad.setPermission("file.upload", false);
        if (vw_proyecto_item_actividad.group_caracteristica !== ENUM_2.Grupos.director_general){
            vw_proyecto_item_actividad.setPermission("file.remove", false);
        }else{
            vw_proyecto_item_actividad.setPermission("file.remove", true);
        }
        if (typeof vw_proyecto_item_actividad !== 'null') {
            if (vw_proyecto_item_actividad) {
                var info = vw_proyecto_item_actividad.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/vw_proyecto_item_actividad/actividadfile/" + row.id, row);
                    vw_proyecto_item_actividad.showfiletypes = function () {
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
                        vw_proyecto_item_actividad.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'vw_proyecto_item_actividad',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    vw_proyecto_item_actividad.modal.modalView("templates/components/gallery", {
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
    vw_proyecto_item_actividad.change_normal_comments = function () {
        CRUD_comentarios_p_actividad.table.columns.value3 = {
            visible: false,
            visibleDetail: false,
            export: false,
            exportExample: false,
            dead: true
        }
        comentarios_p_actividad.fixFilters = [
            {
                "field": "type",
                "value": ENUM_2.tipo_comentario.proyecto_actividad
            },
            {
                "field": "value2",
                "value": vw_proyecto_item_actividad.id
            }
        ];
        comentarios_p_actividad.refresh();
    };
    vw_proyecto_item_actividad.change_money_comments = function () {
        CRUD_comentarios_p_actividad.table.columns.value3 = {
            label: function (){
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
        comentarios_p_actividad.fixFilters = [
            {
                "field": "type",
                "value": ENUM_2.tipo_comentario.proyecto_actividad
            },
            {
                "field": "value2",
                "value": vw_proyecto_item_actividad.id
            },
            {
                "field": "value3",
                "operator": "is",
                "value": "$not null"
            }
        ];
        comentarios_p_actividad.refresh();
    };
});