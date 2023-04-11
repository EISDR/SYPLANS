var periodo = new SESSION().current() ? new SESSION().current().monitoreo_nombre : 0;
CRUD_indicador_poa = {};
DSON.keepmerge(CRUD_indicador_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_indicador_poa, {
    table: {
        engine: 'my',
        view: "vw_indicador_poa_grid",
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
            departamento_name: {
                label: "Departamento",
                shorttext: 370
            },
            no: {
                // label: "No.",
                label: function () {
                    return "No. Resultado Esperado"
                }
            },
            resultado_esperado: {
                // label: "Resultado Esperado",
                label: function () {
                    return "Resultado Esperado"
                },
                shorttext: 370
            },
            // indicador_pei_nombre: {
            //     label: function () {
            //         return "Indicador PEI Asociado"
            //     },
            //     shorttext: 370
            // },
            no_producto: {
                // label: "No.",
                label: function () {
                    return new SESSION().current().tipo_institucion == 1 ? "No. Proyecto/Producto" : "No. Proyecto"
                },
            },
            nombre_producto: {
                label: function () {
                    return new SESSION().current().tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto"
                },
                shorttext: 370
            },
            no_indicador: {
                label: function () {
                    return "No. Indicador"
                }
            },
            nombre_indicador: {
                // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                label: function () {
                    return "Nombre del Indicador"
                },
                shorttext: 370
            },
            descripcion_indicador: {
                label: "Descripción del Indicador",
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
                label: "Tipo de dato de la Meta"
            },
            direccion_meta: {
                label: "Dirección de la Meta"
            },
            ano_linea_base: {
                label: "Año Línea Base"
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
            },
            metasocultas: {
                label: function () {
                    return "Metas"
                },
                visible: false,
                visibleDetail: false,
                export: true
            }
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.indicador_poa.allow.edit && PERMISSIONS.mypermission.indicador_poa.allow.view && PERMISSIONS.mypermission.indicador_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }

                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.edit && PERMISSIONS.mypermission.indicador_poa.allow.view && PERMISSIONS.mypermission.indicador_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.edit && PERMISSIONS.mypermission.indicador_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.edit && PERMISSIONS.mypermission.indicador_poa.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.view && PERMISSIONS.mypermission.indicador_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.view && PERMISSIONS.mypermission.indicador_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.edit && PERMISSIONS.mypermission.indicador_poa.allow.view && PERMISSIONS.mypermission.indicador_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }

                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.edit && PERMISSIONS.mypermission.indicador_poa.allow.view && PERMISSIONS.mypermission.indicador_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.edit && PERMISSIONS.mypermission.indicador_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.edit && PERMISSIONS.mypermission.indicador_poa.allow.view) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.view && PERMISSIONS.mypermission.indicador_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.edit) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return "";
                        } else {
                            return MESSAGE.i('actions.Edit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.view && PERMISSIONS.mypermission.indicador_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.remove) {
                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.Remove');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.indicador_poa.allow.view) {
                        return MESSAGE.i('actions.View');
                    }
                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['edit', 'remove', 'active', 'view', 'copy', 'audit', 'fuente'];
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
                            indicador_poa.list_indicador_poa_periodo = [];
                            indicador_poa.detalleapd = [];
                            var contador = 1;
                            BASEAPI.listp('vw_indicador_poa_periodo', {
                                limit: 0,
                                orderby: "periodo",
                                order: "asc",
                                where: [{
                                    field: "indicador_poa",
                                    value: data.row.id
                                }]
                            }).then(function (result) {
                                indicador_poa.list_indicador_poa_periodo = result.data;
                                for (var key of indicador_poa.list_indicador_poa_periodo) {
                                    indicador_poa.detalleapd.push({
                                        column: 'Proyectado ' + periodo + ' ' + contador,
                                        row: key.valor
                                    });
                                    indicador_poa.detalleapd.push({
                                        column: 'Alcanzado ' + periodo + ' ' + contador,
                                        row: key.valor_alcanzado
                                    });
                                    indicador_poa.detalleapd.push({
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
                                    // indicador_poa.refreshAngular();
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
                        show: function (data) {
                            //return false;
                            //return ((data.row.estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Trabajado));
                            return (((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Cancelada) && (data.row.estatus !== ENUM_2.presupuesto_estatus.Completo)));
                        },
                        click: function (data) {
                            data.$scope.showFuente = false;
                            data.$scope.departamento = data.row.departamento + '';
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
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
                    //         data.$scope.showFuente = true;
                    //         data.$scope.formulary({
                    //             where: [{
                    //                 field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                    //                 value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                    //             }]
                    //         }, FORM.modes.edit, {});
                    //
                    //         return false;
                    //     }
                    // },
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
                                    indicador_poa.delete_relation(data.row.id).then(function (res) {
                                        console.log(res);

                                        AUDIT.LOG(AUDIT.ACTIONS.delete, indicador_poa.tableOrView ? indicador_poa.tableOrView : indicador_poa.modelName, data.row);
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
            }
        ],
    }
});
