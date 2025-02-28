var Bien_servicio = "";
var Bien_servicio_nombre = "";
var Presupuestario = "";
var Presupuestario_nombre = "";
CRUD_actividades_poa = {};
DSON.keepmerge(CRUD_actividades_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_actividades_poa, {
    table: {
        engine: 'my',
        view: "vw_actividades_poa_grid",
        width: "width:1600px;",
        sort: "departamento_nombre",
        columns: {
            id: {
                sorttype: "numeric",
                class: "text-left",
                export: false,
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            departamento: {
                sorttype: "numeric",
                export: false,
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            departamento_nombre: {},
            no1: {
            },
            producto_nombre: {
                shorttext: 370
            },
            no2: {
            },
            actividad: {
                shorttext: 370
            },
            responsable: {
                shorttext: 370
            },
            fecha_inicio: {
                sorttype: "date",
                formattype: "date",
            },
            fecha_fin: {
                sorttype: "date",
                formattype: "date",
            },
            presupuesto: {
                formattype: "money",
                exportExample: "[money]",
                shorttext: 370,
            },
            presupuesto_consumido: {
                formattype: "money",
                exportExample: "[money]",
                shorttext: 370,
            },
            tipo_inversion: {
                visible: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? false : true : false
            },
            bienes_permiso: {
                format: function (row) {
                    if (row.bienes_permiso == '[NULL]') {
                        return "";
                    } else {
                        return row.bienes_permiso
                    }
                },

                visible: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? false : true : false
            },
            bienes_permiso_nombre: {
                format: function (row) {
                    if (row.bienes_permiso_nombre == '[NULL]') {
                        return "";
                    } else {
                        return row.bienes_permiso_nombre
                    }
                },
                visible: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? false : true : false
            },
            presupuestario: {
                format: function (row) {
                    if (row.presupuestario == '[NULL]') {
                        return "";
                    } else {
                        return row.presupuestario
                    }
                },
                visible: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? false : true : false
            },
            presupuestario_nombre: {
                format: function (row) {
                    if (row.presupuestario_nombre == '[NULL]') {
                        return "";
                    } else {
                        return row.presupuestario_nombre
                    }
                },
                visible: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? false : true : false
            },
            estatus: {
                shorttext: 370
            },
            condition: {
                export: true,
                format: function (row) {
                    var nom = row.condition;
                    $(`.Vencida`).css('background', '#FF0000');
                    $(`.Enejecucion`).css('background', '#548235');
                    $(`.Planificada`).css('background', '#5F5FAF');
                    $(`.Ninguno`).css('background', '#CECECE');
                    return `<div title="${row.condition.replaceAll('Ninguno', 'Ninguna Condición')}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },
            maneja_presupuesto: {
                visible: false,
                export: false,
                exportExample: false,
                dead: true,
                format: function (row) {
                    return row.maneja_presupuesto == 1 ? "Sí" : "No";
                }
            },
            estatus_actividad: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            involucrados: {
                sortable: false,
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
            },
            involucrados_export: {
                sortable: false,
                visible: false,
                visibleDetail: false,
                parent: "involucrados",
                export: true,
                exportExample: true,
                checkExport: true,
                dead: true
            },
            actividades_apoyo: {
                sortable: false,
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
            },
            actividades_apoyo_export: {
                sortable: false,
                visible: false,
                visibleDetail: false,
                parent: "actividades_apoyo",
                export: true,
                exportExample: true,
                checkExport: true,
                dead: true
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
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }

                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        return MESSAGE.i('actions.View');
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }

                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.view) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view) {
                        return MESSAGE.i('actions.View');
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.Edit');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view) {
                        return MESSAGE.i('actions.View');
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
                            // return ((data.row.id_estatus_departamento !== ENUM_2.presupuesto_estatus.Completo) && (data.row.id_estatus_departamento !== ENUM_2.presupuesto_estatus.Trabajado));
                            return (((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido)) && ((data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta) && ((data.row.dpto_estatus != ENUM_2.presupuesto_estatus.Completo))));
                        },
                        click: function (data) {
                            Bien_servicio = data.row.bienes_permiso;
                            Bien_servicio_nombre = data.row.bienes_permiso_nombre;
                            Presupuestario = data.row.presupuestario;
                            Presupuestario_nombre = data.row.presupuestario_nombre;
                            data.$scope.presupuesto_ver = data.row.presupuesto_ver;
                            data.$scope.cargado = false;
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
                                    event: {
                                        show: {
                                            begin: function (data) {

                                            },
                                            end: function (data) {

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
                            // return ((data.row.id_estatus_departamento !== ENUM_2.presupuesto_estatus.Completo) && (data.row.id_estatus_departamento !== ENUM_2.presupuesto_estatus.Trabajado));
                            return (((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido)) && ((data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta) && ((data.row.dpto_estatus != ENUM_2.presupuesto_estatus.Completo))));
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
                                        BASEAPI.updateall('actividades_apoyo', {
                                            active: 1,
                                            where: [
                                                {
                                                    field: 'actividades_poa',
                                                    value: data.row.id
                                                }
                                            ]
                                        }, function (result) {
                                            console.log(result.data)
                                        })
                                        BASEAPI.updateall('indicador_actividad', {
                                            active: 1,
                                            where: [
                                                {
                                                    field: 'actividades_poa',
                                                    value: data.row.id
                                                }
                                            ]
                                        }, function (result) {
                                            console.log(result.data)
                                        })
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
                                        BASEAPI.updateall('actividades_apoyo', {
                                            active: 0,
                                            where: [
                                                {
                                                    field: 'actividades_poa',
                                                    value: data.row.id
                                                }
                                            ]
                                        }, function (result) {
                                            console.log(result.data)
                                        })
                                        BASEAPI.updateall('indicador_actividad', {
                                            active: 0,
                                            where: [
                                                {
                                                    field: 'actividades_poa',
                                                    value: data.row.id
                                                }
                                            ]
                                        }, function (result) {
                                            console.log(result.data)
                                        })
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
                    return 'comment_activities';
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
                    actividades_poa_monitoreo = undefined;
                    mega_actividades = undefined;
                    actividades_poa.id_para_comentarios = data.row.id;
                    actividades_poa.modalAction('comentarios_actividades_poa', MESSAGE.i('planificacion.comentarios'), 'comment', 'list', {});
                    return false;
                }
            }
        ],
        limits: [10, 20, 50]
    }
});
CRUD_actividades_poa.table.limits = [10, 20];