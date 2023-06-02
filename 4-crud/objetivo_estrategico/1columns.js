CRUD_objetivo_estrategico = {};
DSON.keepmerge(CRUD_objetivo_estrategico, CRUDDEFAULTS);
DSON.keepmerge(CRUD_objetivo_estrategico, {
    table: {
        engine: 'my',
        view: "vw_objetivo_estrategico",
        viewExport: "vw_objetivo_estrategico_export",
        method: "objetivo_estrategico",
        sort: "no_objetivo",
        order: "desc",
        width: "width:1500px;",
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            no_orden: {
                label: function () {
                    return "No.Eje"
                },
                class: "text-left",
            },
            eje_estrategico: {
                label: function () {
                    return "Eje Estratégico";
                },
                shorttext: 370
            },
            no_objetivo: {
                label: function () {
                    return "No.Objetivo"
                },
                class: "text-left",
            },
            nombre: {
                label: function () {
                    if (new SESSION().current().tipo_institucion == 2) {
                        return "Objetivo Estratégico"
                    } else {
                        return MESSAGE.i('planificacion.titleObjetivoEstrategico');
                    }
                },
                shorttext: 370
            },
            descripcion: {
                label: function () {
                    return "Descripción"
                },
                shorttext: 370
            },
            objetivo_especifico: {
                sortable: false,
                label: function () {
                    if (new SESSION().current().tipo_institucion == 2) {
                        return "Objetivos Específicos"
                    } else {
                        return "Objetivos Específicos Institucionales";
                    }
                },
                export: false,
                exportExample: false,
                shorttext: 370
            },
            objetivos_especificos: {
                sortable: false,
                label: function () {
                    return "Objetivos Específicos Institucionales";
                },
                shorttext: 370,
                visible: false,
                visibleDetail: false,
                export: true,
                exportExample: true,
                checkExport: true,
                dead: true
            },
            objetivo_end: {
                sortable: false,
                label: function () {
                    return "Objetivos Generales END";
                },
                export: false,
                exportExample: false,
                shorttext: 370
            },
            objetivos_end: {
                sortable: false,
                label: function () {
                    return "Objetivos Generales END";
                },
                shorttext: 370,
                visible: false,
                visibleDetail: false,
                export: true,
                exportExample: true,
                checkExport: true,
                dead: true
            },
            politica_gobierno: {
                sortable: false,
                label: function () {
                    return "Políticas de Gobierno";
                },
                export: false,
                exportExample: false,
                shorttext: 370
            },
            politicas_gobierno: {
                sortable: false,
                label: function () {
                    return "Políticas de Gobierno";
                },
                shorttext: 370,
                visible: false,
                visibleDetail: false,
                export: true,
                exportExample: true,
                checkExport: true,
                dead: true
            }
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit && PERMISSIONS.mypermission.objetivo_estrategico.allow.view && PERMISSIONS.mypermission.objetivo_estrategico.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit && PERMISSIONS.mypermission.objetivo_estrategico.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit && PERMISSIONS.mypermission.objetivo_estrategico.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.view && PERMISSIONS.mypermission.objetivo_estrategico.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit && PERMISSIONS.mypermission.objetivo_estrategico.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit && PERMISSIONS.mypermission.objetivo_estrategico.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit && PERMISSIONS.mypermission.objetivo_estrategico.allow.view && PERMISSIONS.mypermission.objetivo_estrategico.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit && PERMISSIONS.mypermission.objetivo_estrategico.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit && PERMISSIONS.mypermission.objetivo_estrategico.allow.view) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.view && PERMISSIONS.mypermission.objetivo_estrategico.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit && PERMISSIONS.mypermission.objetivo_estrategico.allow.view) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit && PERMISSIONS.mypermission.objetivo_estrategico.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.edit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.view) {
                        return MESSAGE.i('actions.View');
                    } else if (PERMISSIONS.mypermission.objetivo_estrategico.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
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
                        show: (data) => {
                            return (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar);
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
                        show: (data) => {
                            return (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar);
                        },
                        click: async function (data) {
                            var relations = [];
                            var result_estrategia = await BASEAPI.firstp('estrategia', {
                                where: [{
                                    field: "objetivo_estrategico",
                                    value: data.row.id
                                }]
                            })
                            if (result_estrategia) {
                                relations.push(' "Estrategía Institucional"');
                            }
                            var result_resultado = await BASEAPI.firstp('vw_resultado', {
                                where: [{
                                    field: "objetivo_estrategico",
                                    value: data.row.id
                                }]
                            })
                            if (result_resultado) {
                                relations.push(' "Resultado Esperado');
                            }
                            var result_indicador = await BASEAPI.firstp('indicador_pei', {
                                where: [{
                                    field: "objetivo_estrategico",
                                    value: data.row.id
                                }]
                            })
                            if (result_indicador) {
                                relations.push(' "Indicadores"');
                            }
                            if (relations.length > 0) {
                                SWEETALERT.show({
                                    type: "warning",
                                    message: `<p>Registro está relacionado a la/s entidad/es ${relations}.</p> Para poder borrar deberá borrar todos sus registros relacionados.`,
                                });
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
