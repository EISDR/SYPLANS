lachechon = new SESSION().current();
lachechon = lachechon || {};
Custom_column = null;
CRUD_productos_poa = {};
DSON.keepmerge(CRUD_productos_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_productos_poa, {
    table: {
        engine: 'my',
        width: "width:1600px;",
        view: "vw_productos_poa_detalles",
        viewExport: "vw_productos_poa_detalles_export",
        sort: "id",
        order: "desc",
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            no2: {
                label: "No.",
            },
            resultado: {
                label: function () {
                    return "Resultado Esperado";
                },
                shorttext: 370
            },
            no1: {
                label: "No.",
            },
            producto: {
                label: function () {
                    return lachechon.tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto";
                },
                shorttext: 370
            },
            descripcion: {
                label: "descripción",
                shorttext: 370
            },
            departamento: {
                label: function () {
                    return "Departamento";
                },
                shorttext: 370
            },
            estado_producto: {
                label: "estado",
                shorttext: 370
            },
            condition: {
                label: "Condición",
                export: true,
                format: function (row) {
                    var nom = row.condition;
                    $(`.Vencido`).css('background', '#FF0000');
                    $(`.Enejecucion`).css('background', '#548235');
                    $(`.Planificado`).css('background', '#5F5FAF');
                    $(`.Ninguno`).css('background', '#CECECE');
                    return `<div title="${nom.replaceAll('Ninguno', 'Ninguna Condición')}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
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
            actividades: {
                sortable: false,
                label: function () {
                    return lachechon.tipo_institucion == 1 ? "Actividades del Proyecto/Producto" : "Actividades del Proyecto";
                },
                shorttext: 150,
                export: false,
                exportExample: false,
            },
            actividades_poa: {
                sortable: false,
                label: function () {
                    return  lachechon.tipo_institucion == 1 ? "Actividades del Proyecto/Producto" : "Actividades del Proyecto";
                },
                visible: false,
                visibleDetail: false,
                checkExport: true,
                dead: true
            },
            involucrado: {
                sortable: false,
                label: function () {
                    return "Involucrados";
                },
                shorttext: 150,
                export: false,
                exportExample: false,
            },
            involucrados: {
                sortable: false,
                label: function () {
                    return "Involucrados";
                },
                visible: false,
                visibleDetail: false,
                checkExport: true,
                dead: true
            },
            indicadores: {
                sortable: false,
                label: function () {
                    return lachechon.tipo_institucion == 1 ? "Indicadores del Proyecto/Producto" : "Indicadores del Proyecto";
                },
                shorttext: 150,
                export: false,
                exportExample: false,
            },
        },
        options: [
            {
                text: (data) => {
                    //
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.view && PERMISSIONS.mypermission.productos_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }

                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.view && PERMISSIONS.mypermission.productos_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.view && PERMISSIONS.mypermission.productos_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.view && PERMISSIONS.mypermission.productos_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.view && PERMISSIONS.mypermission.productos_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.view && PERMISSIONS.mypermission.productos_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.view) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.view && PERMISSIONS.mypermission.productos_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.view) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit && PERMISSIONS.mypermission.productos_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.view) {
                        return MESSAGE.i('actions.View');
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.view && PERMISSIONS.mypermission.productos_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View') + ", " + MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.edit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Edit');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.productos_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)) {
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
                        show: function (data) {
                            return (((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)));
                        },
                        click: function (data) {
                            productos_poa.modo_view_trabajar = false;
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
                            return "Trabajar";
                        },
                        icon: (data) => {
                            return "design";
                        },
                        permission: (data) => {
                            return 'work';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            if (((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada)) && ((data.row.id_estatus == ENUM_2.presupuesto_estatus.Completo))) {
                                return true;
                            } else {
                                return false;
                            }
                        },
                        click: function (data) {
                            productos_poa.modo_view_trabajar = true;
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
                        show: function (data) {
                            return (((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.id_estatus != ENUM_2.presupuesto_estatus.Completo)));
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
            },
            {
                text: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                title: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                icon: (data) => {
                    return "comment";
                },
                permission: (data) => {
                    return 'comment_product';
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    if (data.row.comentarios > 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                click: function (data) {
                    // data.$scope.formulary({
                    //     where: [{
                    //         field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                    //         value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                    //     }]
                    // }, FORM.modes.edit, {});
                    productos_poa.id_para_comentarios = data.row.id;
                    productos_poa.modalAction('comentarios_productos_poa', MESSAGE.i('planificacion.comentarios'), 'comment', 'list', {});
                    return false;
                }
            },
        ]
    }
});
