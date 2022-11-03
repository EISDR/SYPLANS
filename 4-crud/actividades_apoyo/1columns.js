var Bien_servicio_apoyo = "";
var Bien_servicio_nombre_apoyo = "";
var Presupuestario_apoyo = "";
var Presupuestario_nombre_apoyo = "";
CRUD_actividades_apoyo = {};
DSON.keepmerge(CRUD_actividades_apoyo, CRUDDEFAULTS);
DSON.keepmerge(CRUD_actividades_apoyo, {
    table: {
        engine: 'my',
        width: "width:1500px;",
        view: "drp_actividades_apoyo",
        sort: "id",
        order: "desc",
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead:true
            },
            nombre: {
                label: function () {
                    return "Actividad Apoyo";
                },
                shorttext: 370
            },
            descripcion: {
                label: "Descripción",
                shorttext: 370
            },
            departamento_nombre: {
                label: "Dpto.Solicitado",
                format: {
                    table: "departamento",
                    from: "departamento",
                    modal: {
                        header: {
                            title: MESSAGE.i(`planificacion.nombre`, 'nombre'),
                            // icon: "archive"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.loading')
                        }
                    }
                }
            },
            usuario_nombre: {
                label: "Responsable",
                shorttext: 370,
                format: function (row){
                    return row.usuario_nombre + " " + row.usuario_apellido;
                }
            },
            fecha_inicio: {
                label: function () {
                    return "Fecha Inicio";
                },
                sorttype: "date",
                formattype: "date",
            },
            fecha_fin: {
                label: function () {
                    return "Fecha Fin";
                },
                sorttype: "date",
                formattype: "date",
            },
            created_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            maneja_presupuesto: {
                label: function() {
                    return "Maneja Presupuesto?";
                },
                format: function (row) {
                    return row.maneja_presupuesto_act_apoyo == 1 ? "Sí" : "No";
                }
            },
            view_presupuesto: {
                label: function () {
                    return "Presupuesto";
                },
                formattype: "money",
            },
            tipo_inversion_nombre: {
                label: function () {
                    return "Tipo de Inversión";
                },
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false : true : false
            },
            bienes_permiso: {
                label: "Código de Bienes y Servicios",
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false : true : false
            },
            bienes_permiso_nombre: {
                label: "Descripcion de Bienes y Servicios",
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false : true : false
            },
            presupuestario: {
                label: function () {
                    return "Código del Clasificador";
                },
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false : true : false
            },
            presupuestario_nombre: {
                label: function () {
                    return "Nombre del Clasificador";
                },
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false : true : false
            }
        },
        allow: {
            menu: true,
            add: true,
            edit: true,
            view: true,
            remove: true,
            active: false,
            filter: true,
            import: true,
            copy: true,
            export: {
                Clipboard: true,
                PDF: true,
                CSV: true,
                XLS: true,
                DOC: true
            },
            actions: true,
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.Remove') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.Remove') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.Remove') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view){
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.Remove') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view){
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.Remove') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit){
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.view){
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.Remove') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit){
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('actions.Remove') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.view){
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    }
                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['edit', 'remove', 'active', 'view', 'copy'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Edit');
                        },
                        icon: (data) => {
                            return "pencil5";
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            Bien_servicio_apoyo = data.row.bienes_permiso;
                            Bien_servicio_nombre_apoyo = data.row.bienes_permiso_nombre;
                            Presupuestario_apoyo = data.row.presupuestario;
                            Presupuestario_nombre_apoyo = data.row.presupuestario_nombre;
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.View');
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
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                    header: {
                                        title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
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
                            return MESSAGE.i('actions.Remove');
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
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                    data.$scope.deleteRow(data.row).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
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
                            return 'active';
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
                        show: function (data) {
                            return data.$scope.activeColumn();
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Disable');
                        },
                        icon: (data) => {
                            return "circle";
                        },
                        permission: (data) => {
                            return 'active';
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
                            return data.$scope.activeColumn();
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
                                        eval(`formatRow.${alter} = '${realValue}';`);
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
                                                eval(`row.${key} = '${value}';`);
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
                    }
                ]
            },
            {
                text: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                title: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                icon: (data) => {
                    return 'comment';
                },
                permission: (data) => {
                    return "comment";
                },
                characterist: (data) => {
                    return "";
                },
                show: (data) => {
                    return (data.row.comentarios == 'si');
                },
                click: function (data) {
                    drp_actividades_apoyo = undefined;
                    actividades_asociadas_view = undefined;
                    actividades_poa_monitoreo = undefined;
                    mega_actividades_asociadas = undefined;
                    data.$scope.id = data.row.id;
                    data.$scope.modal.modalView("actividades_apoyo/viewComments", {
                        width: 'modal-full',
                        header: {
                            title: "Ver comentarios de la actividad apoyo",
                            icon: "comment"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading'),
                            sameController: true
                        },
                    });
                }
            }
        ]
    }
});