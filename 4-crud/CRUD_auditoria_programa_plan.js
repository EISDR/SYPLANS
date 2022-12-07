CRUD_auditoria_programa_plan = {};
DSON.keepmerge(CRUD_auditoria_programa_plan, CRUDDEFAULTS);
CRUD_auditoria_programa_plan.esalgo = (row) => {
    let session = new SESSION().current();
    let usuario = session.id;
    if (row.lista_participantes) {
        let participantes = JSON.parse(row.lista_participantes);
        if (participantes.indexOf(usuario + "") !== -1)
            return true;
    }
    return row.lider == usuario;
};
CRUD_auditoria_programa_plan.esDocumentoResponsables = (row) => {
    let session = new SESSION().current();
    let usuario = session.id;
    auditoria_programa_plan.viewSoyLider = row.lider == usuario;
    if (row.lista_documentos_responsables) {
        let documentos_responsables = JSON.parse(row.lista_documentos_responsables);
        if (documentos_responsables.indexOf(usuario + "") !== -1)
            return true;
    }
    return row.lider == usuario;
};
DSON.keepmerge(CRUD_auditoria_programa_plan, {
    table: {
        width: "width:1800px;",
        view: 'vw_auditoria_programa_plan',
        //method: 'auditoria_programa_plan',
        //limits: [10, 50, 100, 0],
        //report: true,
        batch: false,
        //persist: false,
        //sortable: false,
        //dragrow: 'num',
        //rowStyle: function (row, $scope) {
        //    return "color:red;";
        //},
        //rowClass: function (row, $scope) {
        //    return row.name === 'whatever' ? "bg-" + COLOR.danger + "-300" : "";
        //},
        //activeColumn: "active",
        //key: 'id',
        //deletekeys: ['id'],
        columns: {
            // dbcolumnname: {
            //     visible: false,
            //     visibleDetail: false,
            //     export: false,
            //     exportExample: false,
            //     sortable: false,
            //     shorttext: 360,
            //     dead:true,
            //     formattype: ENUM.FORMAT.numeric,
            //     sorttype: ENUM.FORMATFILTER.numeric,
            //     drag: true,
            //     click: function (data) {
            //         alert(data.row.id);
            //         //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
            //     },
            //     reference: "id",
            //     format: function (row) {
            //         return row.id + "*";
            //     }
            // },
            id: {},
            nombre: {},
            descripcion: {shorttext: 360},
            fecha_inicio: {formattype: ENUM.FORMAT.datetime},
            fecha_fin: {formattype: ENUM.FORMAT.datetime},
            objetivo: {shorttext: 360},
            alcance: {shorttext: 360},
            prioridad_nombre: {
                label: function () {
                    return "Prioridad"
                }
            },
            criterio: {
                label: function () {
                    return "Criterio de Auditoría"
                },
                shorttext: 360
            },
            tipo_auditoria_nombre: {
                label: function () {
                    return "Tipo de Auditoría"
                }
            },
            puntos_no_cumplidos: {
                label: function () {
                    return "No Cumplimiento"
                },
                format: function (row) {
                    if (row.puntos_no_cumplidos > 0) {
                        $(`.NoCumplidos`).css('background', '#FF0000');
                        return `<div title="Cantidad de puntos no Cumplidos: ${row.puntos_no_cumplidos}" class='NoCumplidos shape_element'> </div>`;
                    }
                }
            },
            estatus_nombre: {},
            elaborado_por_nombre: {
                label: function () {
                    return "Elaborado Por"
                }
            },
            elaborado_en: {
                label: function () {
                    return "Elaborado En"
                },
                formattype: ENUM.FORMAT.datetime
            },
            autorizado_por_nombre: {
                label: function () {
                    return "Autorizado Por"
                }
            },
            autorizado_en: {
                label: function () {
                    return "Autorizado En"
                },
                formattype: ENUM.FORMAT.datetime
            }
        },
        filters: {
            columns: true
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (typeof eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`) != "undefined") {
                        if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit) {
                            return MESSAGE.i('actions.Edit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                            return MESSAGE.i('actions.View');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Remove');
                        }
                    } else {
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.Remove') + ", " +
                            MESSAGE.i('actions.audit');
                    }
                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['edit', 'remove', 'active', 'view', 'copy', 'audit'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [
                    {
                        text: (data) => {
                            return "Autorizar";
                        },
                        icon: (data) => {
                            return "medal";
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            if (typeof auditoria_programa_plan !== "undefined")
                                return auditoria_programa_plan.allowAction("Autorizar", "auditoria_programa_plan", data.row.estatus);
                        },
                        click: function (data) {
                            data.$scope.estatus_nombre = data.row.estatus_nombre;
                            if (data.row.estatus === 3) {
                                BASEAPI.updateall('auditoria_programa_plan', {
                                    estatus: 4,
                                    where: [
                                        {
                                            field: "id",
                                            value: data.row.id
                                        }
                                    ]
                                }, async function (result) {
                                    var titulo_push = `Inicio de Recolección de Datos de la Auditoría "${data.row.nombre}"`
                                    var cuerpo_push = `Ha iniciado la ejecición de la auditoría "${data.row.nombre}"`;
                                    var titulo_correo = `Inicio de Recolección de Datos de la Auditoría "${data.row.nombre}"`
                                    var cuerpo_correo = `El auditor "${new SESSION().current().fullName()}" ha iniciado la la ejecución de la auditoría "${data.row.nombre}".

Los auditores que estarán participando serán :
`;
                                    var cuerpo_correo_2 = "Gracias";
                                    var list_auditores = await BASEAPI.listp('vw_auditoria_programa_plan_equipotrabajo', {
                                        limit: 0,
                                        where: [
                                            {
                                                "field": "programa_plan",
                                                "value": data.row.id
                                            },
                                            {
                                                "field": "esresponsable",
                                                "operator": "is not",
                                                "value": "$null"
                                            }
                                        ]
                                    });
                                    list_auditores = list_auditores.data;
                                    var list_participantes = await BASEAPI.listp('vw_auditoria_programa_plan_participantes', {
                                        limit: 0,
                                        where: [
                                            {
                                                "field": "programa_plan",
                                                "value": data.row.id
                                            }
                                        ]
                                    });
                                    list_participantes = list_participantes.data;
                                    function_send_email_custom_group_with_list(titulo_push, cuerpo_push, titulo_correo, cuerpo_correo, new SESSION().current().compania_id, new SESSION().current().institucion_id, 18, [17, 4], list_auditores, list_participantes, false, false, true, cuerpo_correo_2)
                                    data.$scope.my_true_estatus = 4;
                                    data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                                    data.$scope.refresh();
                                });
                            } else {
                                data.$scope.my_true_estatus = data.row.estatus;
                                data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                            }
                            data.$scope.from_edit = true;
                            if (data.row.estatus >= 3) {
                                data.$scope.formulary({
                                    where: [{
                                        field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                        value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                    }]
                                }, FORM.modes.edit, {}, 'work_plan');
                                data.$scope.form.titles = {
                                    edit: "Trabajar - Auditoría",
                                };
                                data.$scope.form.modalIcon = 'hammer-wrench';
                            } else {
                                data.$scope.formulary({
                                    where: [{
                                        field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                        value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                    }]
                                }, FORM.modes.edit, {});
                            }
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "Trabajar"
                        },
                        icon: (data) => {
                            if (((data.row.estatus == 2) && new SESSION().current().groups[0].caracteristica == "SC") || ((data.row.estatus == 2) && new SESSION().current().groups[0].caracteristica == "DG")) {
                                return "medal"
                            } else if ((data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "SC") || (data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "DG") || (data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "AU")) {
                                return "hammer-wrench"
                            } else {
                                return "pencil5";
                            }
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            if (typeof auditoria_programa_plan !== "undefined")
                                return auditoria_programa_plan.allowAction("Trabajar", "auditoria_programa_plan", data.row.estatus) && auditoria_programa.estatus >= 3;
                        },
                        click: function (data) {
                            data.$scope.estatus_nombre = data.row.estatus_nombre;
                            if (data.row.estatus === 3) {
                                BASEAPI.updateall('auditoria_programa_plan', {
                                    estatus: 4,
                                    where: [
                                        {
                                            field: "id",
                                            value: data.row.id
                                        }
                                    ]
                                }, async function (result) {
                                    var titulo_push = `Inicio de Recolección de Datos de la Auditoría "${data.row.nombre}"`
                                    var cuerpo_push = `Ha iniciado la ejecición de la auditoría "${data.row.nombre}"`;
                                    var titulo_correo = `Inicio de Recolección de Datos de la Auditoría "${data.row.nombre}"`
                                    var cuerpo_correo = `El auditor "${new SESSION().current().fullName()}" ha iniciado la la ejecución de la auditoría "${data.row.nombre}".

Los auditores que estarán participando serán :
`;
                                    var cuerpo_correo_2 = "Gracias";
                                    var list_auditores = await BASEAPI.listp('vw_auditoria_programa_plan_equipotrabajo', {
                                        limit: 0,
                                        where: [
                                            {
                                                "field": "programa_plan",
                                                "value": data.row.id
                                            },
                                            {
                                                "field": "esresponsable",
                                                "operator": "is not",
                                                "value": "$null"
                                            }
                                        ]
                                    });
                                    list_auditores = list_auditores.data;
                                    var list_participantes = await BASEAPI.listp('vw_auditoria_programa_plan_participantes', {
                                        limit: 0,
                                        where: [
                                            {
                                                "field": "programa_plan",
                                                "value": data.row.id
                                            }
                                        ]
                                    });
                                    list_participantes = list_participantes.data;
                                    function_send_email_custom_group_with_list(titulo_push, cuerpo_push, titulo_correo, cuerpo_correo, new SESSION().current().compania_id, new SESSION().current().institucion_id, 18, [17, 4], list_auditores, list_participantes, false, false, true, cuerpo_correo_2)
                                    data.$scope.my_true_estatus = 4;
                                    data.$scope.refresh();
                                    BASEAPI.updateall('auditoria_programa', {
                                        estatus: 4,
                                        where: [
                                            {
                                                field: "id",
                                                value: auditoria_programa.id
                                            }
                                        ]
                                    }, async function (result) {

                                    });
                                });
                            } else {
                                data.$scope.my_true_estatus = data.row.estatus;
                                data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                            }
                            data.$scope.from_edit = true;
                            if (data.row.estatus >= 3) {
                                data.$scope.formulary({
                                    where: [{
                                        field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                        value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                    }]
                                }, FORM.modes.edit, {}, 'work_plan');
                                data.$scope.form.titles = {
                                    edit: "Trabajar - Auditoría",
                                };
                                data.$scope.form.modalIcon = 'hammer-wrench';
                            } else {
                                data.$scope.formulary({
                                    where: [{
                                        field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                        value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                    }]
                                }, FORM.modes.edit, {});
                            }
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "Iniciar Recolección de Datos"
                        },
                        icon: (data) => {
                            if (((data.row.estatus == 2) && new SESSION().current().groups[0].caracteristica == "SC") || ((data.row.estatus == 2) && new SESSION().current().groups[0].caracteristica == "DG")) {
                                return "medal"
                            } else if ((data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "SC") || (data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "DG") || (data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "AU")) {
                                return "hammer-wrench"
                            } else {
                                return "pencil5";
                            }
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            if (typeof auditoria_programa_plan !== "undefined")
                                return auditoria_programa_plan.allowAction("Iniciar Recolección de Datos", "auditoria_programa_plan", data.row.estatus) && auditoria_programa.estatus >= 3;
                        },
                        click: function (data) {
                            data.$scope.estatus_nombre = data.row.estatus_nombre;
                            if (data.row.estatus === 3) {
                                BASEAPI.updateall('auditoria_programa_plan', {
                                    estatus: 4,
                                    where: [
                                        {
                                            field: "id",
                                            value: data.row.id
                                        }
                                    ]
                                }, async function (result) {
                                    if (auditoria_programa.estatus == 3) {
                                        BASEAPI.updateall('auditoria_programa', {
                                            estatus: 4,
                                            where: [
                                                {
                                                    field: "id",
                                                    value: auditoria_programa.id
                                                }
                                            ]
                                        }, async function (result) {
                                            auditoria_programa.getPrograma();
                                        });
                                    }
                                    var titulo_push = `Inicio de Recolección de Datos de la Auditoría "${data.row.nombre}"`
                                    var cuerpo_push = `Ha iniciado la ejecición de la auditoría "${data.row.nombre}"`;
                                    var titulo_correo = `Inicio de Recolección de Datos de la Auditoría "${data.row.nombre}"`
                                    var cuerpo_correo = `El auditor "${new SESSION().current().fullName()}" ha iniciado la la ejecución de la auditoría "${data.row.nombre}".

Los auditores que estarán participando serán :
`;
                                    var cuerpo_correo_2 = "Gracias";
                                    var list_auditores = await BASEAPI.listp('vw_auditoria_programa_plan_equipotrabajo', {
                                        limit: 0,
                                        where: [
                                            {
                                                "field": "programa_plan",
                                                "value": data.row.id
                                            },
                                            {
                                                "field": "esresponsable",
                                                "operator": "is not",
                                                "value": "$null"
                                            }
                                        ]
                                    });
                                    list_auditores = list_auditores.data;
                                    var list_participantes = await BASEAPI.listp('vw_auditoria_programa_plan_participantes', {
                                        limit: 0,
                                        where: [
                                            {
                                                "field": "programa_plan",
                                                "value": data.row.id
                                            }
                                        ]
                                    });
                                    list_participantes = list_participantes.data;
                                    function_send_email_custom_group_with_list(titulo_push, cuerpo_push, titulo_correo, cuerpo_correo, new SESSION().current().compania_id, new SESSION().current().institucion_id, 18, [17, 4], list_auditores, list_participantes, false, false, true, cuerpo_correo_2)
                                    data.$scope.my_true_estatus = 4;
                                    data.$scope.refresh();
                                });
                            } else {
                                data.$scope.my_true_estatus = data.row.estatus;
                                data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                            }
                            data.$scope.from_edit = true;
                            if (data.row.estatus >= 3) {
                                data.$scope.formulary({
                                    where: [{
                                        field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                        value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                    }]
                                }, FORM.modes.edit, {}, 'work_plan');
                                data.$scope.form.titles = {
                                    edit: "Trabajar - Auditoría",
                                };
                                data.$scope.form.modalIcon = 'hammer-wrench';
                            } else {
                                data.$scope.formulary({
                                    where: [{
                                        field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                        value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                    }]
                                }, FORM.modes.edit, {});
                            }
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "Trabajar Recolección de Datos"
                        },
                        icon: (data) => {
                            if (((data.row.estatus == 2) && new SESSION().current().groups[0].caracteristica == "SC") || ((data.row.estatus == 2) && new SESSION().current().groups[0].caracteristica == "DG")) {
                                return "medal"
                            } else if ((data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "SC") || (data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "DG") || (data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "AU")) {
                                return "hammer-wrench"
                            } else {
                                return "pencil5";
                            }
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            if (typeof auditoria_programa_plan !== "undefined")
                                return auditoria_programa_plan.allowAction("Trabajar Recolección de Datos", "auditoria_programa_plan", data.row.estatus) && auditoria_programa.estatus >= 3;
                        },
                        click: function (data) {
                            data.$scope.estatus_nombre = data.row.estatus_nombre;
                            if (data.row.estatus === 3) {
                                BASEAPI.updateall('auditoria_programa_plan', {
                                    estatus: 4,
                                    where: [
                                        {
                                            field: "id",
                                            value: data.row.id
                                        }
                                    ]
                                }, async function (result) {
                                    var titulo_push = `Inicio de Recolección de Datos de la Auditoría "${data.row.nombre}"`
                                    var cuerpo_push = `Ha iniciado la ejecición de la auditoría "${data.row.nombre}"`;
                                    var titulo_correo = `Inicio de Recolección de Datos de la Auditoría "${data.row.nombre}"`
                                    var cuerpo_correo = `El auditor "${new SESSION().current().fullName()}" ha iniciado la la ejecución de la auditoría "${data.row.nombre}".

Los auditores que estarán participando serán :
`;
                                    var cuerpo_correo_2 = "Gracias";
                                    var list_auditores = await BASEAPI.listp('vw_auditoria_programa_plan_equipotrabajo', {
                                        limit: 0,
                                        where: [
                                            {
                                                "field": "programa_plan",
                                                "value": data.row.id
                                            },
                                            {
                                                "field": "esresponsable",
                                                "operator": "is not",
                                                "value": "$null"
                                            }
                                        ]
                                    });
                                    list_auditores = list_auditores.data;
                                    var list_participantes = await BASEAPI.listp('vw_auditoria_programa_plan_participantes', {
                                        limit: 0,
                                        where: [
                                            {
                                                "field": "programa_plan",
                                                "value": data.row.id
                                            }
                                        ]
                                    });
                                    list_participantes = list_participantes.data;
                                    function_send_email_custom_group_with_list(titulo_push, cuerpo_push, titulo_correo, cuerpo_correo, new SESSION().current().compania_id, new SESSION().current().institucion_id, 18, [17, 4], list_auditores, list_participantes, false, false, true, cuerpo_correo_2)
                                    data.$scope.my_true_estatus = 4;
                                    data.$scope.refresh();
                                });
                            } else {
                                data.$scope.my_true_estatus = data.row.estatus;
                                data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                            }
                            data.$scope.from_edit = true;
                            if (data.row.estatus >= 3) {
                                data.$scope.formulary({
                                    where: [{
                                        field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                        value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                    }]
                                }, FORM.modes.edit, {}, 'work_plan');
                                data.$scope.form.titles = {
                                    edit: "Trabajar - Auditoría",
                                };
                                data.$scope.form.modalIcon = 'hammer-wrench';
                            } else {
                                data.$scope.formulary({
                                    where: [{
                                        field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                        value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                    }]
                                }, FORM.modes.edit, {});
                            }
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "Editar"
                        },
                        icon: (data) => {
                            if (((data.row.estatus == 2) && new SESSION().current().groups[0].caracteristica == "SC") || ((data.row.estatus == 2) && new SESSION().current().groups[0].caracteristica == "DG")) {
                                return "medal"
                            } else if ((data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "SC") || (data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "DG") || (data.row.estatus >= 3 && new SESSION().current().groups[0].caracteristica == "AU")) {
                                return "hammer-wrench"
                            } else {
                                return "pencil5";
                            }
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            if (typeof auditoria_programa_plan !== "undefined")
                                return auditoria_programa_plan.allowAction("Editar", "auditoria_programa_plan", data.row.estatus);
                        },
                        click: function (data) {
                            data.$scope.estatus_nombre = data.row.estatus_nombre;
                            if (data.row.estatus === 3) {
                                BASEAPI.updateall('auditoria_programa_plan', {
                                    estatus: 4,
                                    where: [
                                        {
                                            field: "id",
                                            value: data.row.id
                                        }
                                    ]
                                }, async function (result) {
                                    var titulo_push = `Inicio de Recolección de Datos de la Auditoría "${data.row.nombre}"`
                                    var cuerpo_push = `Ha iniciado la ejecición de la auditoría "${data.row.nombre}"`;
                                    var titulo_correo = `Inicio de Recolección de Datos de la Auditoría "${data.row.nombre}"`
                                    var cuerpo_correo = `El auditor "${new SESSION().current().fullName()}" ha iniciado la la ejecución de la auditoría "${data.row.nombre}".

Los auditores que estarán participando serán :
`;
                                    var cuerpo_correo_2 = "Gracias";
                                    var list_auditores = await BASEAPI.listp('vw_auditoria_programa_plan_equipotrabajo', {
                                        limit: 0,
                                        where: [
                                            {
                                                "field": "programa_plan",
                                                "value": data.row.id
                                            },
                                            {
                                                "field": "esresponsable",
                                                "operator": "is not",
                                                "value": "$null"
                                            }
                                        ]
                                    });
                                    list_auditores = list_auditores.data;
                                    var list_participantes = await BASEAPI.listp('vw_auditoria_programa_plan_participantes', {
                                        limit: 0,
                                        where: [
                                            {
                                                "field": "programa_plan",
                                                "value": data.row.id
                                            }
                                        ]
                                    });
                                    list_participantes = list_participantes.data;
                                    function_send_email_custom_group_with_list(titulo_push, cuerpo_push, titulo_correo, cuerpo_correo, new SESSION().current().compania_id, new SESSION().current().institucion_id, 18, [17, 4], list_auditores, list_participantes, false, false, true, cuerpo_correo_2)
                                    data.$scope.my_true_estatus = 4;
                                    data.$scope.refresh();
                                });
                            } else {
                                data.$scope.my_true_estatus = data.row.estatus;
                                data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                            }
                            data.$scope.from_edit = true;
                            if (data.row.estatus >= 3) {
                                data.$scope.formulary({
                                    where: [{
                                        field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                        value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                    }]
                                }, FORM.modes.edit, {}, 'work_plan');
                                data.$scope.form.titles = {
                                    edit: "Trabajar - Auditoría",
                                };
                                data.$scope.form.modalIcon = 'hammer-wrench';
                            } else {
                                data.$scope.formulary({
                                    where: [{
                                        field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                        value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                    }]
                                }, FORM.modes.edit, {});
                            }
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "Comentar nivel satisfacción";
                        },
                        icon: (data) => {
                            return "reading";
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: (data) => {
                            if (typeof auditoria_programa_plan !== "undefined") {
                                let condiciones = false;
                                if (auditoria_programa_plan.allowFeature("Comentar", "auditoria_programa_plan", data.row.estatus) && CRUD_auditoria_programa_plan.esalgo(data.row))
                                    condiciones = true;
                                if (auditoria_programa_plan.allowFeature("Comentar", "auditoria_programa_plan", data.row.estatus) && !CRUD_auditoria_programa_plan.esalgo(data.row))
                                    condiciones = false;

                                return condiciones && auditoria_programa_plan.allowAction("Comentar nivel satisfacción", "auditoria_programa_plan", data.row.estatus);
                            }
                        },
                        click: async function (data) {
                            data.$scope.from_edit = false;
                            data.$scope.my_true_estatus = data.row.estatus;
                            auditoria_programa_plan.my_true_estatus_mio = data.row.estatus;
                            data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                            data.$scope.estatus_view = data.row.estatus + "";

                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {}, 'work_plan_informe');
                            data.$scope.form.titles = {
                                edit: "Informe - Auditoría",
                            };
                            data.$scope.form.modalIcon = 'list';
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "Trabajar Informe Preliminar";
                        },
                        icon: (data) => {
                            return "list";
                        },
                        permission: (data) => {
                            return 'informe';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: (data) => {
                            if (typeof auditoria_programa_plan !== "undefined") {
                                let condiciones = false;
                                if (auditoria_programa_plan.allowFeature("Trabajar A", "auditoria_programa_plan", data.row.estatus) && CRUD_auditoria_programa_plan.esalgo(data.row))
                                    condiciones = true;
                                if (auditoria_programa_plan.allowFeature("Trabajar A", "auditoria_programa_plan", data.row.estatus) && !CRUD_auditoria_programa_plan.esalgo(data.row))
                                    condiciones = false;

                                return condiciones && auditoria_programa_plan.allowAction("Trabajar informe preliminar", "auditoria_programa_plan", data.row.estatus);
                            }
                        },
                        click: async function (data) {
                            data.$scope.from_edit = false;
                            data.$scope.my_true_estatus = data.row.estatus;
                            auditoria_programa_plan.my_true_estatus_mio = data.row.estatus;
                            data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                            data.$scope.estatus_view = data.row.estatus + "";

                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {}, 'work_plan_informe');
                            data.$scope.form.titles = {
                                edit: "Informe - Auditoría",
                            };
                            data.$scope.form.modalIcon = 'list';
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "Crear Informe Preliminar";
                        },
                        icon: (data) => {
                            return "list";
                        },
                        permission: (data) => {
                            return 'informe';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: (data) => {
                            if (typeof auditoria_programa_plan !== "undefined") {
                                let condiciones = false;
                                if (auditoria_programa_plan.allowFeature("Trabajar", "auditoria_programa_plan", data.row.estatus) && CRUD_auditoria_programa_plan.esalgo(data.row))
                                    condiciones = true;

                                if (auditoria_programa_plan.allowFeature("Trabajar", "auditoria_programa_plan", data.row.estatus) && !CRUD_auditoria_programa_plan.esalgo(data.row))
                                    condiciones = false;

                                return condiciones && auditoria_programa_plan.allowAction("Crear Informe Preliminar", "auditoria_programa_plan", data.row.estatus);
                            }
                        },
                        click: async function (data) {
                            data.$scope.from_edit = false;
                            data.$scope.my_true_estatus = data.row.estatus;
                            data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                            data.$scope.estatus_view = data.row.estatus + "";

                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {}, 'work_plan_informe');
                            data.$scope.form.titles = {
                                edit: "Informe - Auditoría",
                            };
                            data.$scope.form.modalIcon = 'list';
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "Ver";
                        },
                        icon: (data) => {
                            return "eye";
                        },
                        permission: (data) => {
                            return 'view';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: (data) => {
                            if (typeof auditoria_programa_plan !== "undefined") {
                                let condiciones = false;
                                if ( ( auditoria_programa_plan.allowFeature("Ver Participantes", "auditoria_programa_plan", data.row.estatus) || auditoria_programa_plan.allowFeature("Ver Auditor", "auditoria_programa_plan", data.row.estatus) ) && CRUD_auditoria_programa_plan.esalgo(data.row))
                                    condiciones = true;

                                if ( ( auditoria_programa_plan.allowFeature("Ver Participantes", "auditoria_programa_plan", data.row.estatus) || auditoria_programa_plan.allowFeature("Ver Auditor", "auditoria_programa_plan", data.row.estatus) ) && !CRUD_auditoria_programa_plan.esalgo(data.row))
                                    condiciones = false;

                                return condiciones && auditoria_programa_plan.allowAction("Ver RP", "auditoria_programa_plan", data.row.estatus);
                            }
                        },
                        click: function (data) {
                            data.$scope.from_edit = false;
                            data.$scope.my_true_estatus = data.row.estatus;
                            data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                            data.$scope.estatus_view = data.row.estatus + "";
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {}, 'work_plan_view');
                            data.$scope.form.titles = {
                                edit: "Verificar - Auditoría",
                            };
                            data.$scope.form.modalIcon = 'eye';
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "Ver";
                        },
                        icon: (data) => {
                            return "eye";
                        },
                        permission: (data) => {
                            return 'view';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: (data) => {
                            if (typeof auditoria_programa_plan !== "undefined")
                                return auditoria_programa_plan.allowAction("Ver AR", "auditoria_programa_plan", data.row.estatus);
                        },
                        click: function (data) {
                            data.$scope.from_edit = false;
                            data.$scope.my_true_estatus = data.row.estatus;
                            data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                            data.$scope.estatus_view = data.row.estatus + "";
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {}, 'work_plan_view');
                            data.$scope.form.titles = {
                                edit: "Verificar - Auditoría",
                            };
                            data.$scope.form.modalIcon = 'eye';
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Enable');
                        },
                        icon: (data) => {
                            return "checkmark-circle";
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSEnable'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                    data.$scope.activeRow(data.row, 1).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        },
                        show: (data) => {
                            if (typeof auditoria_programa_plan !== "undefined")
                                return auditoria_programa_plan.allowAction("Habilitar", "auditoria_programa_plan", data.row.estatus);
                        },
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Disable');
                        },
                        icon: (data) => {
                            return "circle";
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDisable'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                    data.$scope.activeRow(data.row, 0).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        },
                        show: function (data) {
                            if (typeof auditoria_programa_plan !== "undefined")
                                return auditoria_programa_plan.allowAction("Deshabilitar", "auditoria_programa_plan", data.row.estatus);
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Copy');
                        },
                        icon: (data) => {
                            return "copy3";
                        },
                        permission: (data) => {
                            return 'copy';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {

                            var formatRow = {};

                            for (var i in eval(`CRUD_${data.$scope.modelName}`).table.columns) {
                                var column = eval(`CRUD_${data.$scope.modelName}`).table.columns[i];
                                var key = i;
                                var alter = column.exportKey !== undefined ? column.exportKey : i;
                                if (eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample !== false) {
                                    var exampleText = eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample;
                                    exampleText = exampleText === undefined ? "[string]" : exampleText;
                                    var realValue = eval(`data.row.${key};`);
                                    if (!DSON.oseaX(realValue)) {
                                        if (column.link !== undefined) {
                                            realValue = eval(`data.row.${key.split('_')[0]}_${key.split('_')[1]}_id;`);
                                        }
                                        if (column.formattype === "datetime") {
                                            realValue = moment(realValue).format(DSON.UNIVERSALTIME);
                                        }
                                        if (column.formattype === "date") {
                                            realValue = moment(realValue).format(DSON.UNIVERSAL);
                                        }
                                        eval(`formatRow.${alter} = \`${realValue}\`;`);
                                    }
                                }
                            }
                            SWEETALERT.confirm({
                                title: MESSAGE.i('actions.CopyRecords'),
                                message: MESSAGE.i('alerts.Copy'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.i('actions.CopyngRecord')});
                                    var records = [formatRow];
                                    var columns = eval(`CRUD_${data.$scope.modelName}`).table.columns;
                                    var inserts = [];
                                    for (var i in records) {
                                        var record = records[i];
                                        var row = {};
                                        for (var i in record) {
                                            var key = i;
                                            var value = record[i];
                                            for (var c in columns) {
                                                var column = false;
                                                if (c === key || key === columns[c].exportKey)
                                                    column = columns[c];
                                                if (column === false) continue;
                                                eval(`row.${key} = \`${value}\`;`);
                                                break;
                                            }
                                        }
                                        inserts.push({row: row, relations: []});
                                    }
                                    data.$scope.importing(inserts);
                                }
                            });
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.audit');
                        },
                        title: (data) => {
                            return MESSAGE.i('actions.audit');
                        },
                        permission: (data) => {
                            return 'audit';
                        },
                        icon: (data) => {
                            return "stack-text";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            if (typeof auditoria_programa_plan !== "undefined")
                                return auditoria_programa_plan.allowAction("Auditoria", "auditoria_programa_plan", data.row.estatus);
                        },
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/audit", data.$scope.modelName), {
                                    header: {
                                        title: MESSAGE.i('mono.auditof') + " " + data.$scope.plural,
                                        icon: "user"
                                    },
                                    footer: {
                                        cancelButton: true
                                    },
                                    content: {
                                        loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                        sameController: true
                                    },
                                });
                            }
                        }
                    },
                    {
                        text: (data) => {
                            return "Eliminar";
                        },
                        icon: (data) => {
                            return "trash";
                        },
                        permission: (data) => {
                            return 'remove';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: (data) => {
                            if (typeof auditoria_programa_plan !== "undefined")
                                return auditoria_programa_plan.allowAction("Eliminar", "auditoria_programa_plan", data.row.estatus);
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: async function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                    data.$scope.deleteRow(data.row).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        }
                    }
                ]
            },
            {
                text: (data) => {
                    return "Imprimir Informe Preliminar";
                },
                title: (data) => {
                    return "Imprimir Informe Preliminar";
                },
                icon: (data) => {
                    return "printer2";
                },
                permission: (data) => {
                    return 'view';
                },
                characterist: (data) => {
                    return "";
                },
                show: (data) => {
                    return data.row.estatus > 6 || data.row.estatus == 5;
                },
                click: function (data) {
                    data.$scope.from_edit = false;
                    data.$scope.my_true_estatus = data.row.estatus;
                    data.$scope.my_true_estatus_name = data.row.estatus_nombre;
                    data.$scope.estatus_view = data.row.estatus + "";
                    data.$scope.formulary({
                        where: [{
                            field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                            value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                        }]
                    }, FORM.modes.edit, {}, 'export');
                    data.$scope.form.titles = {
                        edit: "Vista previa informe preliminar",
                    };
                    data.$scope.form.modalIcon = 'printer2';
                    return false;
                }
            },
            {
                text: (data) => {
                    return "Crear Puntos de Verificación";
                },
                title: (data) => {
                    return "Crear Puntos de Verificación";
                },
                icon: (data) => {
                    return "magazine";
                },
                permission: (data) => {
                    return 'view';
                },
                characterist: (data) => {
                    return "";
                },
                show: (data) => {
                    if (typeof auditoria_programa_plan !== "undefined") {
                        let condiciones = false;
                        if (auditoria_programa_plan.allowFeature("Trabajar", "auditoria_programa_plan", data.row.estatus) && CRUD_auditoria_programa_plan.esDocumentoResponsables(data.row))
                            condiciones = true;

                        if (auditoria_programa_plan.allowFeature("Trabajar", "auditoria_programa_plan", data.row.estatus) && !CRUD_auditoria_programa_plan.esDocumentoResponsables(data.row))
                            condiciones = false;

                        return condiciones && auditoria_programa_plan.allowAction("Agregar Listas de Verificación", "auditoria_programa_plan", data.row.estatus);
                    }
                },
                click: async function (data) {
                    data.$scope.mi_id = data.row.id;
                    data.$scope.my_true_estatus = data.row.estatus;
                    data.$scope.dataForWork = data.row;
                    var auditoria_auditores = await BASEAPI.listp('vw_auditoria_programa_plan_equipotrabajo', {
                        limit: 0,
                        where: [
                            {
                                field: "programa_plan",
                                value: auditoria_programa_plan.mi_id
                            }
                        ]
                    });
                    auditoria_programa_plan.auditoria_auditores = auditoria_auditores.data.filter((value, index, self) => self.map(x => x.usuario).indexOf(value.usuario) == index)
                    auditoria_programa_plan.modal.modalView("auditoria_programa_plan/add_list_auditor", {

                        width: 'modal-full',
                        header: {
                            title: `Agregar Listas de Verificación`,
                            icon: "icon-magazine"
                        },
                        footer: {
                            cancelButton: false
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading'),
                            sameController: 'auditoria_programa_plan'
                        },
                        event: {
                            show: {
                                begin: function (data) {

                                },
                                end: async function (eData) {
                                    var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                        limit: 0, where: [
                                            {
                                                field: "programa_plan",
                                                value: data.row.id
                                            },
                                            {
                                                field: "documento_asociado",
                                                operator: "is not",
                                                value: "$null"
                                            }
                                        ]
                                    });
                                    auditoria_programa_plan.documentos_list_view = documentos_list.data;
                                    auditoria_programa_plan.auditoria_plan_documentos_asociados_view = eval(data.row.lista_documentos);
                                    auditoria_programa_plan.refreshAngular();
                                    vw_documentos_asociados_view.refresh();
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
                    return false;
                }
            },
        ]
    }
});
//modify methods that existing option
//CRUD_auditoria_programa_plan.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_auditoria_programa_plan.table.options[0].menus.push({
//     text: (data) => {
//         return MESSAGE.i('actions.Extra');
//     },
//     icon: (data) => {
//         return "list";
//     },
//     permission: (data) => {
//         return 'extra';
//     },
//     characterist: (data) => {
//         return "";
//     },
//     show: function (data) {
//         return true;
//     },
//     click: function (data) {
//         //extra function
//         return false;
//     }
// });
