CRUD_end = {};
DSON.keepmerge(CRUD_end, CRUDDEFAULTS);
DSON.keepmerge(CRUD_end, {
    table: {
        engine: 'my',
        view: "vw_end",
        viewExport: "vw_end_export",
        sort: "edt",
        order: "asc",
        columns: {
            id: {
                label: "id",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            edt: {
                sorttype: "numeric",
            },
            nombre: {
                shorttext: 370
            },
            descripcion: {
                shorttext: 370
            },
            objetivo: {
                shorttext: 8000,
                export: false,
                exportExample: false,
                sortable: false,
            },
            objetivos_end: {
                shorttext: 8000,
                visible: false,
                visibleDetail: false,
                checkExport: true,
                dead: true,
                sortable: false,
            },
            compania: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },

        },
        allow: {
            menu: true,
            add: true,
            edit: true,
            view: true,
            remove: true,
            active: false,
            filter: true,
            import: false,
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
                    //
                    return "";
                },
                title: (data) => {
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
                        click: async function (data) {
                            var relations = []
                            var delete_relations = [];
                            var result_eje = await BASEAPI.firstp('eje_estrategico_end',{
                                where:[{
                                    field: "end",
                                    value: data.row.id
                                }]
                            });
                            if (result_eje){
                                relations.push(' "Ejes "Estratégicos"');
                            }
                            var result_objetivo =  await BASEAPI.firstp('objetivo',{
                                where:[{
                                    field: "end",
                                    value: data.row.id
                                }]
                            });
                            if (result_objetivo){
                                relations.push(' "Objetivos Generales"');
                                delete_relations.push(' "Objetivos Generales"')
                            }
                            var result_obj_especifico = await BASEAPI.firstp('objetivo_especifico',{
                                where:[{
                                    field: "end",
                                    value: data.row.id
                                }]
                            })
                            if (result_obj_especifico){
                                relations.push(' "Objetivos Específicos"');
                                delete_relations.push(' "Objetivos Específicos"');
                            }
                            var result_linea_accion = await BASEAPI.firstp('linea_accion',{
                                where:[{
                                    field: "end",
                                    value: data.row.id
                                }]
                            })
                            if (result_linea_accion){
                                relations.push(' "Línea de Acción"');
                                delete_relations.push(' "Línea de acción"');
                            }
                            if(result_eje){
                                SWEETALERT.show({
                                    message: `<p>Registro está relacionado a la entidad "Eje Estratégico".</p> Este no puede ser borrado a menos que se elimine su relación con la entidad.`,
                                });
                            }else {
                                if (relations.length > 0) {
                                    if (delete_relations.length > 0) {
                                        SWEETALERT.confirm({
                                            message: `<p>Registro está relacionado a la/s entidad/es ${relations}.</p> Desea Eliminar este registro y los relacionados con la/s entidad/es${delete_relations}?`,
                                            confirm: function () {
                                                SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                                data.$scope.deleteRow(data.row).then(function () {
                                                    SWEETALERT.stop();
                                                });
                                            }
                                        });
                                    } else {
                                        SWEETALERT.confirm({
                                            message: `<p>Registro está relacionado a la entidad/es ${relations}.</p> Desea Eliminar este registro?`,
                                            confirm: function () {
                                                SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                                data.$scope.deleteRow(data.row).then(function () {
                                                    SWEETALERT.stop();
                                                });
                                            }
                                        });
                                    }
                                } else {
                                    SWEETALERT.confirm({
                                        message: MESSAGE.i('alerts.AYSDelete'),
                                        confirm: function () {
                                            SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                            data.$scope.deleteRow(data.row).then(function () {
                                                SWEETALERT.stop();
                                            });
                                        }
                                    });
                                }
                            }
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
            }
        ]
    }
});
