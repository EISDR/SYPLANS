CRUD_estrategia = {};
DSON.keepmerge(CRUD_estrategia, CRUDDEFAULTS);
DSON.keepmerge(CRUD_estrategia, {
    table: {
        engine: 'my',
        width: "width: 1500px;",
        view: "vw_estrategia",
        viewReport: "vw_estrategia_export",
        sort: "no_eje",
        order: "desc",
        persist: false,
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            no_eje: {
                label: "No.",
                sorttype: "numeric",
                class: "text-left",
                format: function (row) {
                    return row.no_eje;
                }
            },
            eje_estrategico: {
                label: function() {
                    return "Eje Estratégico";
                },
                shorttext: 370
            },
            no_objetivo: {
                label: "No.",
                class: "text-left",
            },
            objetivo_estrategico: {
                label: function () {
                    return "Objetivo Estratégico Institucional";
                },
                shorttext: 370
            },
            no_estrategia: {
                label: "No.",
                class: "text-left"
            },
            estrategia: {
                label: "Estrategia",
                shorttext: 370
            },
            resultados_esperados: {
                label: function () {
                    return "Resultados Esperados";
                },
                shorttext: 370,
                sortable: false,
            }
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.estrategia.allow.edit && PERMISSIONS.mypermission.estrategia.allow.view && PERMISSIONS.mypermission.estrategia.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.edit && PERMISSIONS.mypermission.estrategia.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.edit && PERMISSIONS.mypermission.estrategia.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.view && PERMISSIONS.mypermission.estrategia.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.edit && PERMISSIONS.mypermission.estrategia.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.edit && PERMISSIONS.mypermission.estrategia.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if (PERMISSIONS.mypermission.estrategia.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.edit && PERMISSIONS.mypermission.estrategia.allow.view && PERMISSIONS.mypermission.estrategia.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.edit && PERMISSIONS.mypermission.estrategia.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.edit && PERMISSIONS.mypermission.estrategia.allow.view) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.view && PERMISSIONS.mypermission.estrategia.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.edit && PERMISSIONS.mypermission.estrategia.allow.view) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.edit && PERMISSIONS.mypermission.estrategia.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.edit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.estrategia.allow.view) {
                        return MESSAGE.i('actions.View');
                    } else if (PERMISSIONS.mypermission.estrategia.allow.remove) {
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
                        click: async function (data) {
                            await data.$scope.relateditems(data.row.id);
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
                            var delete_relations = [];
                            var result_eje = await BASEAPI.firstp('eje_estrategico', {
                                where: [{
                                    field: "id",
                                    value: data.row.eje_estrategico_id
                                }]
                            });
                            if (result_eje) {
                                relations.push(' "Eje Estratégico"');
                            }
                            var result_objetivo_institucional = await BASEAPI.firstp('objetivo_estrategico', {
                                where: [{
                                    field: "id",
                                    value: data.row.objetivo_estrategico_id
                                }]
                            });
                            if (result_objetivo_institucional) {
                                relations.push(' "Objetivos Estratégicos Institucionales"');
                            }
                            var result_objetivo_especifico = await BASEAPI.firstp('estrategia_objetivo_especifico', {
                                where: [{
                                    field: "estrategia",
                                    value: data.row.id
                                }]
                            })
                            if (result_objetivo_especifico) {
                                relations.push(' "Objetivos Específicos"');
                                delete_relations.push(' "Objetivos Específicos"');
                            }
                            var result_resultado = await BASEAPI.firstp('vw_resultado', {
                                where: [{
                                    field: "estrategia",
                                    value: data.row.id
                                }]
                            })
                            if (result_resultado) {
                                relations.push(' "Resultado Esperado/FODA/PESTA"');
                                delete_relations.push(' "Resultado Esperado/FODA/PESTA"');
                            }
                            var result_indicador = await BASEAPI.firstp('indicador_pei', {
                                where: [{
                                    field: "estrategia",
                                    value: data.row.id
                                }]
                            })
                            if (result_indicador) {
                                relations.push(' "Indicadores"');
                                delete_relations.push(' "Indicadores"')
                            }
                            if (relations.length > 0) {
                                if (delete_relations.length > 0) {
                                    SWEETALERT.confirm({
                                        type: "warning",
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
                    },
                ]
            },
            {
                text: (data) => {
                    return "Ver FODA";
                },
                title: (data) => {
                    return "Ver FODA";
                },
                icon: (data) => {
                    return "puzzle3";
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    return (data.row.foda == 'si');
                },
                click: async function (data) {
                    await data.$scope.relateditems(data.row.id);
                    data.$scope.modal.modalView("estrategia/vFodaxEstrategia", {
                        width: 'modal-full',
                        header: {
                            title: "Lista de FODA",
                            icon: "puzzle3"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading'),
                            sameController: true
                        },
                    });
                    // dashboard.modal.modalView("productos_poa", {
                    //     width: 'modal-full',
                    //     header: {
                    //         title: "Productos "+ dashboard.Mproductos,
                    //         icon: "archive"
                    //     },
                    //     footer: {
                    //         cancelButton: false
                    //     },
                    //     content: {
                    //         loadingContentText: MESSAGE.i('actions.Loading'),
                    //         sameController: 'productos_poa',
                    //     },
                    // });
                    return false;
                }
            },
            {
                text: (data) => {
                    return "Ver PESTAL";
                },
                title: (data) => {
                    return "Ver PESTAL";
                },
                icon: (data) => {
                    return "briefcase";
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    return (data.row.pesta == 'si');
                },
                click: async function (data) {
                    console.log(data);
                    await data.$scope.relateditems(data.row.id);
                    data.$scope.modal.modalView("estrategia/vpestaxEstrategia", {
                        width: 'modal-full',
                        header: {
                            title: "Lista de PESTAL",
                            icon: "briefcase"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading'),
                            sameController: true
                        },
                    });
                    return false;
                }
            }
        ]
    }
});
