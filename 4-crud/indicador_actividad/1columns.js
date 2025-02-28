var periodo = new SESSION().current() ? new SESSION().current().monitoreo_nombre : 0;
CRUD_indicador_actividad = {};
DSON.keepmerge(CRUD_indicador_actividad, CRUDDEFAULTS);
DSON.keepmerge(CRUD_indicador_actividad, {
    table: {
        engine: 'my',
        view: "vw_indicador_actividad",
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
            departamento_nombre: {
                shorttext: 370
            },
            no: {
            },
            resultado_esperado: {
                shorttext: 370
            },
            // indicador_poa_r: {
            //     label: function() {
            //         return new SESSION().current().tipo_institucion == 1 ? "Indicador de Proyecto/Producto Asociado" : "Indicador de Proyecto/Plan de Acción Asociado"
            //     },
            // },
            no_producto: {
            },
            producto: {
                shorttext: 370
            },
            no_actividad: {
            },
            actividades_poa_nombre: {
                shorttext: 500
            },
            no_indicador: {
            },
            nombre_indicador: {
                // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                shorttext: 370
            },
            descripcion_indicador: {
                shorttext: 370
            },
            fuente: {
                shorttext: 370
            },
            metodo: {
                shorttext: 370
            },
            desagregacion_demografica_geografia: {
                shorttext: 370
            },
            caracteristica: {
                shorttext: 370
            },
            tipo_meta: {
            },
            direccion_meta: {
            },
            ano_linea_base: {
            },
            poa_monitoreo_nombre: {
                // label: "Medio de Verificación",
                shorttext: 370
            },
            linea: {
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
                shorttext: 370
            },
            observacion: {
                shorttext: 370
            }
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.indicador_actividad.allow.edit && PERMISSIONS.mypermission.indicador_actividad.allow.view && PERMISSIONS.mypermission.indicador_actividad.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }

                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.edit && PERMISSIONS.mypermission.indicador_actividad.allow.view && PERMISSIONS.mypermission.indicador_actividad.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.edit && PERMISSIONS.mypermission.indicador_actividad.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.edit && PERMISSIONS.mypermission.indicador_actividad.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.view && PERMISSIONS.mypermission.indicador_actividad.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.view && PERMISSIONS.mypermission.indicador_actividad.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.edit && PERMISSIONS.mypermission.indicador_actividad.allow.view && PERMISSIONS.mypermission.indicador_actividad.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }

                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.edit && PERMISSIONS.mypermission.indicador_actividad.allow.view && PERMISSIONS.mypermission.indicador_actividad.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.edit && PERMISSIONS.mypermission.indicador_actividad.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.edit && PERMISSIONS.mypermission.indicador_actividad.allow.view) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.view && PERMISSIONS.mypermission.indicador_actividad.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.edit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.view && PERMISSIONS.mypermission.indicador_actividad.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.indicador_actividad.allow.view) {
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
                            //return ((data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Trabajado));
                            return (((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)));
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
                            indicador_actividad.list_indicador_actividad_periodo = [];
                            indicador_actividad.detalleapd = [];
                            var contador = 1;
                            BASEAPI.listp('vw_indicador_actividad_periodo', {
                                limit: 0,
                                orderby: "periodo",
                                order: "asc",
                                where: [{
                                    field: "indicador_actividad",
                                    value: data.row.id
                                }]
                            }).then(function (result) {
                                indicador_actividad.list_indicador_actividad_periodo = result.data;
                                for (var key of indicador_actividad.list_indicador_actividad_periodo) {
                                    indicador_actividad.detalleapd.push({
                                        column: 'Proyectado ' + periodo + ' ' + contador,
                                        row: key.valor
                                    });
                                    indicador_actividad.detalleapd.push({
                                        column: 'Alcanzado ' + periodo + ' ' + contador,
                                        row: key.valor_alcanzado
                                    });
                                    indicador_actividad.detalleapd.push({
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
                                    // indicador_actividad.refreshAngular();
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
                            return (((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)));
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                    indicador_actividad.delete_relation(data.row.id).then(function (res) {
                                        console.log(res);
                                        SWEETALERT.stop();
                                        indicador_actividad.refresh();
                                        data.$scope.deleteRow(data.row).then(function () {
                                            SWEETALERT.stop();
                                        });
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
            },
            {
                title: (data) => {
                    return "Ver periodos del indicador";
                },
                text: (data) => {
                    return "Ver periodos del indicador";
                },
                icon: (data) => {
                    return "list3";
                },
                permission: (data) => {
                    return 'view';
                },
                characterist: (data) => {
                    return "";
                },
                click: function (data) {
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
                    indicador_actividad.list_indicador_poa_periodo_view = [];
                    indicador_actividad.detalleapd = [];
                    indicador_actividad.dataForViewMeta = data.row;
                    var contador = 1;
                    BASEAPI.listp('vw_indicador_actividad_periodo', {
                        limit: 0,
                        orderby: "periodo",
                        order: "asc",
                        where: [{
                            field: "indicador_actividad",
                            value: data.row.id
                        }]
                    }).then(function (result) {
                        indicador_actividad.list_indicador_actividad_periodo_view = result.data;
                        for (var key of indicador_actividad.list_indicador_actividad_periodo_view) {
                            indicador_actividad.detalleapd.push({
                                column: 'Proyectado ' + periodo + ' ' + contador,
                                row: key.valor
                            });
                            indicador_actividad.detalleapd.push({
                                column: 'Alcanzado ' + periodo + ' ' + contador,
                                row: key.valor_alcanzado
                            });
                            contador++;
                        }
                        if (!DSON.oseaX(data.row)) {
                            data.$scope.dataForView = data.row;
                            data.$scope.modal.modalView(String.format("{0}/view_meta", data.$scope.modelName), {
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
        ]
    }
});
