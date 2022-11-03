CRUD_indicador_pei = {};
DSON.keepmerge(CRUD_indicador_pei, CRUDDEFAULTS);
DSON.keepmerge(CRUD_indicador_pei, {
    table: {
        engine: ['my', 'st'],
        view: "vw_indicador_pei_2",
        width: "width:2200px;",
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
            no_nombre_eje: {
                label: function () {
                    return "Eje Estratégico";
                },
                shorttext: 370
            },
            no_nombre_objetivo: {
                label: function () {
                    return "Objetivo Estratégico";
                },
                shorttext: 370
            },
            no_nombre_estrategia: {
                label: function () {
                    return "Estrategia";
                },
                shorttext: 370
            },
            no_nombre_resultado: {
                label: function () {
                    return "Resultado Esperado";
                },
                shorttext: 370
            },
            no_indicador: {
                label: function () {
                    return "No. Indicador"
                }
            },
            nombre: {
                label: function () {
                    return "Indicador PEI";
                },
                shorttext: 370
            },
            descripcion: {
                label: function () {
                    return "Descripción Indicador PEI";
                },
                shorttext: 370
            },
            fuente: {
                label: "Fuente",
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
            metodo: {
                label: "Método Cálculo",
                shorttext: 370
            },
            tipo_meta: {
                label: "Tipo de dato de la Meta",
            },
            direccion_meta: {
                label: "Dirección Meta"
            },
            ano_linea_base: {
                label: "Año Línea Base"
            },
            linea: {
                label: function () {
                    return "Línea Base";
                },
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
            medio: {
                label: function () {
                    return "Medio de Verificación";
                },
                shorttext: 370
            },
            unidad_ejecutora_nombre: {
                label: function () {
                    return "Unidad Ejecutora";
                },
                shorttext: 370
            },
            observacion: {
                label: "Observación",
                shorttext: 370
            },
        }, options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.indicador_pei.allow.edit && PERMISSIONS.mypermission.indicador_pei.allow.view && PERMISSIONS.mypermission.indicador_pei.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.edit && PERMISSIONS.mypermission.indicador_pei.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.edit && PERMISSIONS.mypermission.indicador_pei.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.view && PERMISSIONS.mypermission.indicador_pei.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.edit && PERMISSIONS.mypermission.indicador_pei.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.edit && PERMISSIONS.mypermission.indicador_pei.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.edit && PERMISSIONS.mypermission.indicador_pei.allow.view && PERMISSIONS.mypermission.indicador_pei.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.edit && PERMISSIONS.mypermission.indicador_pei.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.edit && PERMISSIONS.mypermission.indicador_pei.allow.view) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.view && PERMISSIONS.mypermission.indicador_pei.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.edit && PERMISSIONS.mypermission.indicador_pei.allow.view) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.edit && PERMISSIONS.mypermission.indicador_pei.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.edit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.view) {
                        return MESSAGE.i('actions.View');
                    } else if (PERMISSIONS.mypermission.indicador_pei.allow.remove) {
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
                    return ['edit', 'remove', 'active', 'view', 'copy', 'fuente'];
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
                        show: (data) => {
                            return (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar);
                        },
                        characterist: (data) => {
                            return "";
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
                            indicador_pei.list_indicador_pei_ano_view = [];
                            indicador_pei.detalleapd = [];
                            BASEAPI.listp('vw_indicador_pei_ano', {
                                limit: 0,
                                orderby: "ano",
                                order: "asc",
                                where: [{
                                    field: "indicador_pei",
                                    value: data.row.id
                                }]
                            }).then(function (result) {
                                indicador_pei.list_indicador_pei_ano_view = result.data;
                                for (var key of indicador_pei.list_indicador_pei_ano_view) {
                                    indicador_pei.detalleapd.push({column: 'Proyectado ' + key.ano, row: key.valor});
                                    indicador_pei.detalleapd.push({
                                        column: 'Alcanzado ' + key.ano,
                                        row: key.valor_alcanzado
                                    });
                                    indicador_pei.detalleapd.push({
                                        column: 'Diferencia ' + key.ano,
                                        row: key.varianzas
                                    });
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
                                    // indicador_pei.refreshAngular();
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
                        show: (data) => {
                            return (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar);
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                    indicador_pei.delete_relation(data.row.id).then(function (res) {

                                        AUDIT.LOG(AUDIT.ACTIONS.delete, indicador_pei.tableOrView ? indicador_pei.tableOrView : indicador_pei.modelName, data.row);
                                        if (res == 1) {
                                            SWEETALERT.stop();
                                            indicador_pei.refresh();
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
