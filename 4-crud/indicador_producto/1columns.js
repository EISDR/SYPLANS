CRUD_indicador_producto = {};
DSON.keepmerge(CRUD_indicador_producto, CRUDDEFAULTS);
DSON.keepmerge(CRUD_indicador_producto, {
    table: {
        engine: 'my',
        view: "vw_indicador_producto",
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
            actividades_poa_nombre: {
                label: function () {
                    return "Proyecto Especial"
                },
                shorttext: 500
            },
            nombre_indicador: {
                label: function () {
                    return "Indicador de Proyecto especial"
                },
                // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                shorttext: 370
            },
            descripcion_indicador: {
                label: "Descripción",
                shorttext: 370
            },
            fuente: {
                label: "Fuente del Indicador",
                shorttext: 370
            },
            metodo: {
                label: "Método de Cálculo",
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
                    return "Caracteristicas del Indicador";
                },
                shorttext: 370
            },
            tipo_meta: {
                label: function () {
                    return "Tipo de dato de la Meta"
                }
            },
            direccion_meta: {
                label: function (row) {
                    return "Medio de Verificación"
                }
            },
            ano_linea_base: {
                label: function (row) {
                    return "Año Línea Base"
                }
            },
            linea: {
                label: function (row) {
                    return "Línea Base"
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
                label: "Medio de Verificación",
                shorttext: 370
            },
            observacion: {
                label: "Observación",
                shorttext: 370
            },
            indicador_ods_nombre: {
                label: "Indicador ODS asociado",
                shorttext: 370
            },
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.indicador_producto.allow.edit && PERMISSIONS.mypermission.indicador_producto.allow.view && PERMISSIONS.mypermission.indicador_producto.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }

                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.edit && PERMISSIONS.mypermission.indicador_producto.allow.view && PERMISSIONS.mypermission.indicador_producto.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.edit && PERMISSIONS.mypermission.indicador_producto.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.edit && PERMISSIONS.mypermission.indicador_producto.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.view && PERMISSIONS.mypermission.indicador_producto.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.view && PERMISSIONS.mypermission.indicador_producto.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.edit && PERMISSIONS.mypermission.indicador_producto.allow.view && PERMISSIONS.mypermission.indicador_producto.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }

                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.edit && PERMISSIONS.mypermission.indicador_producto.allow.view && PERMISSIONS.mypermission.indicador_producto.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.edit && PERMISSIONS.mypermission.indicador_producto.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.edit && PERMISSIONS.mypermission.indicador_producto.allow.view) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.view && PERMISSIONS.mypermission.indicador_producto.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.edit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.view && PERMISSIONS.mypermission.indicador_producto.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.poa_activo == ENUM_2.poa_estatus.Activo)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.indicador_producto.allow.view) {
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
                            return true;
                        },
                        click: function (data) {

                            BASEAPI.list('tipoMeta', {}, function (rsm) {
                                data.$scope.list_tipo_meta = rsm.data;
                                BASEAPI.list('direccionMeta', {}, function (rsd) {
                                    data.$scope.list_direccion_meta = rsd.data;
                                    data.$scope.showFuente = false;
                                    data.$scope.formulary({
                                        where: [{
                                            field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                            value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                        }]
                                    }, FORM.modes.edit, {});
                                });
                            });
                            return false;
                        }
                    },

                    // {
                    //     text: (data) => {
                    //         return "Captura de Avance Automático";
                    //     },
                    //     icon: (data) => {
                    //         return "database-arrow";
                    //     },
                    //     permission: (data) => {
                    //         return 'fuente';
                    //     },
                    //     characterist: (data) => {
                    //         return "";
                    //     },
                    //     click: function (data) {
                    //
                    //         BASEAPI.list('tipoMeta', {}, function (rsm) {
                    //             data.$scope.list_tipo_meta = rsm.data;
                    //             BASEAPI.list('direccionMeta', {}, function (rsd) {
                    //                 data.$scope.list_direccion_meta = rsd.data;
                    //                 data.$scope.showFuente = true;
                    //                 data.$scope.formulary({
                    //                     where: [{
                    //                         field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                    //                         value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                    //                     }]
                    //                 }, FORM.modes.edit, {});
                    //             });
                    //         });
                    //
                    //         return false;
                    //     }
                    // },
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
                            indicador_producto.list_indicador_producto_periodo = [];
                            indicador_producto.detalleapd = [];
                            var contador = 1;
                            BASEAPI.listp('vw_indicador_producto_periodo', {
                                limit: 0,
                                orderby: "periodo",
                                order: "asc",
                                where: [{
                                    field: "indicador_proceso",
                                    value: data.row.id
                                }]
                            }).then(function (result) {
                                indicador_producto.list_indicador_producto_periodo = result.data;
                                for (var key of indicador_producto.list_indicador_producto_periodo) {
                                    indicador_producto.detalleapd.push({
                                        column: 'Proyectado ' + key.monitoreo + ' ' + contador,
                                        row: key.valor
                                    });
                                    indicador_producto.detalleapd.push({
                                        column: 'Alcanzado ' +  key.monitoreo + ' ' + contador,
                                        row: key.valor_alcanzado
                                    });
                                    indicador_producto.detalleapd.push({
                                        column: 'Diferencia ' +  key.monitoreo + ' ' + contador,
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
                                    indicador_producto.refreshAngular();
                                }
                            });
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
                            // return ((data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Trabajado));
                            return true;
                            ;
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                    indicador_producto.delete_relation(data.row.id).then(function (res) {
                                        console.log(res);
                                        if (res == 1) {
                                            SWEETALERT.stop();
                                            indicador_producto.refresh();
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
