var periodo = new SESSION().current() ? new SESSION().current().monitoreo_nombre : 0;
CRUD_indicador_generico2 = {};
DSON.keepmerge(CRUD_indicador_generico2, CRUDDEFAULTS);
DSON.keepmerge(CRUD_indicador_generico2, {
    table: {
        engine: 'my',
        view: "vw_indicador_generico",
        width: "width:3000px;",
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
            registro: {
                label: "Registro",
            },
            nombre_indicador: {
                // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                label: function () {
                    return "Nombre del Indicador"
                },
                shorttext: 370
            },
            descripcion_indicador: {
                label: function () {
                    return "Descripción del Indicador"
                },
                shorttext: 370
            },
            fuente: {
                label: function () {
                    return "Fuente del Indicador"
                },
                shorttext: 370
            },
            metodo: {
                label: function () {
                    return "Método de Cálculo"
                },
                shorttext: 370
            },
            desagregacion_demografica_geografia: {
                label: function () {
                    return "Desagregación Demográfica Geográfica";
                },
                shorttext: 370
            },
            caracteristica: {
                label: function () {
                    return "Características del Indicador";
                },
                shorttext: 370
            },
            tipo_meta: {
                label: function () {
                    return "Tipo de dato de la Meta";
                }
            },
            direccion_meta: {
                label: function () {
                    return "Dirección de la Meta"
                }
            },
            ano: {
                label: function () {
                    return "Año a evaluar"
                }
            },
            ano_linea_base: {
                label: function () {
                    return "Año Línea Base"
                }
            },
            linea: {
                label: function () {
                    return "Línea Base";
                },
                shorttext: 370,
                format: function (row) {
                    if (row.linea) {
                        switch (row.tipo_meta) {
                            case 'Porcentaje':
                                return row.linea + '%';
                                break;
                            case 'Decimal':
                                return LAN.money(row.linea).format(false);
                                break;
                            case 'Dinero':
                                return `${LAN.money(row.linea).format(true)}`;
                                break;
                            default : {
                                return row.linea;
                            }
                        }
                    }
                },
            },
            medio_verificacion: {
                // label: "Medio de Verificación",
                label: function () {
                    return "Medio de Verificación"
                },
                shorttext: 370
            },

            observacion: {
                label: "Observación",
                shorttext: 370
            }
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.indicador_generico.allow.edit && PERMISSIONS.mypermission.indicador_generico.allow.view && PERMISSIONS.mypermission.indicador_generico.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }

                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.edit && PERMISSIONS.mypermission.indicador_generico.allow.view && PERMISSIONS.mypermission.indicador_generico.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.edit && PERMISSIONS.mypermission.indicador_generico.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.edit && PERMISSIONS.mypermission.indicador_generico.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.view && PERMISSIONS.mypermission.indicador_generico.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.view && PERMISSIONS.mypermission.indicador_generico.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.edit && PERMISSIONS.mypermission.indicador_generico.allow.view && PERMISSIONS.mypermission.indicador_generico.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }

                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.edit && PERMISSIONS.mypermission.indicador_generico.allow.view && PERMISSIONS.mypermission.indicador_generico.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.edit && PERMISSIONS.mypermission.indicador_generico.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.edit && PERMISSIONS.mypermission.indicador_generico.allow.view) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.view && PERMISSIONS.mypermission.indicador_generico.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.edit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.view && PERMISSIONS.mypermission.indicador_generico.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.indicador_generico.allow.view) {
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
                            console.log(data);
                            // if (!DSON.oseaX(data.row)) {
                            //     data.$scope.dataForView = data.row;
                            //     data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                            //         header: {
                            //             title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
                            //             icon: "user"
                            //         },
                            //         footer: {
                            //             cancelButton: true
                            //         },
                            //         content: {
                            //             loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                            //             sameController: true
                            //         },
                            //     });
                            // }
                            indicador_generico.list_indicador_generico_periodo = [];
                            indicador_generico.detalleapd = [];
                            var contador = 1;
                            BASEAPI.listp('vw_indicador_generico_periodo', {
                                limit: 0,
                                orderby: "periodo",
                                order: "asc",
                                where: [{
                                    field: "indicador_generico",
                                    value: data.row.id
                                }]
                            }).then(function (result) {
                                indicador_generico.list_indicador_generico_periodo = result.data;
                                for (var key of indicador_generico.list_indicador_generico_periodo) {
                                    indicador_generico.detalleapd.push({
                                        column: 'Proyectado ' + periodo + ' ' + contador,
                                        row: key.valor
                                    });
                                    indicador_generico.detalleapd.push({
                                        column: 'Alcanzado ' + periodo + ' ' + contador,
                                        row: key.valor_alcanzado
                                    });
                                    indicador_generico.detalleapd.push({
                                        column: 'Diferencia ' + periodo + ' ' + contador,
                                        row: key.varianzas
                                    });
                                    contador++;
                                }
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
                                    // indicador_generico.refreshAngular();
                                }
                            });
                        }
                    },
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
                                    indicador_generico.delete_relation(data.row.id).then(function (res) {
                                        console.log(res);

                                        AUDIT.LOG(AUDIT.ACTIONS.delete, indicador_generico.tableOrView ? indicador_generico.tableOrView : indicador_generico.modelName, data.row);
                                        if (res == 1) {
                                            SWEETALERT.stop();
                                            indicador_generico.refresh();
                                        } else {
                                            data.$scope.deleteRow(data.row).then(function () {
                                                SWEETALERT.stop();
                                            });
                                        }
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
        ],
    }
});
