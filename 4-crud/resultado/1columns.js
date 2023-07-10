CRUD_resultado = {};
DSON.keepmerge(CRUD_resultado, CRUDDEFAULTS);
DSON.keepmerge(CRUD_resultado, {
    table: {
        engine: 'my',
        view: "vw_resultado",
        method: "resultado",
        sort: "id",
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
            no_resultado: {
                label: "No.",
                format: function (row) {
                    if (row.no_resultado) {
                        return row.no_resultado;
                    } else {
                        return "?"
                    }
                }
            },
            resultado_esperado: {
                label: "Nombre",
                shorttext: 370
            },
            descripcion: {
                label: "Descripción",
                shorttext: 370
            },
            tipo_resultado_nombre: {
                label: "Tipo de Resultado Esperado",
                shorttext: 370,
            },
            perspectiva: {
                label: "Perspectiva",
                shorttext: 370,
            },
            created_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                sorttype: "datetime",
                formattype: "datetime",
                dead: true
            },
            updated_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                sorttype: "datetime",
                formattype: "datetime",
                dead: true
            },
            deleted_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            created_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            updated_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            deleted_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            }
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.resultado.allow.edit && PERMISSIONS.mypermission.resultado.allow.view && PERMISSIONS.mypermission.resultado.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.edit && PERMISSIONS.mypermission.resultado.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.edit && PERMISSIONS.mypermission.resultado.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.view && PERMISSIONS.mypermission.resultado.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.edit && PERMISSIONS.mypermission.resultado.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.edit && PERMISSIONS.mypermission.resultado.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if (PERMISSIONS.mypermission.resultado.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.edit && PERMISSIONS.mypermission.resultado.allow.view && PERMISSIONS.mypermission.resultado.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.edit && PERMISSIONS.mypermission.resultado.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.edit && PERMISSIONS.mypermission.resultado.allow.view) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.view && PERMISSIONS.mypermission.resultado.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.edit && PERMISSIONS.mypermission.resultado.allow.view) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.edit && PERMISSIONS.mypermission.resultado.allow.remove) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.edit) {
                        if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar) {
                            return MESSAGE.i('actions.Edit');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.resultado.allow.view) {
                        return MESSAGE.i('actions.View');
                    } else if (PERMISSIONS.mypermission.resultado.allow.remove) {
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
                        click: function (data) {
                            data.$scope.fromView = false;
                            // resultado.form.titles = {
                            //     edit: "Editar " + 'RESULTADO ESPERADO - Eje Estratégico ( ' + resultado.eje + ' ) / Objetivo Estratégico ( ' + resultado.objetivo + ' )',
                            // }
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
                            resultado.fromView = true
                            console.log(resultado.fromView);
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            resultado.form.titles = {
                                edit: "ver " + 'RESULTADO ESPERADO - Eje Estratégico ( ' + resultado.eje + ' ) / Objetivo Estratégico ( ' + resultado.objetivo + ' )',
                            }
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
                        click: async function (data) {
                            var relations = [];
                            var delete_relations = [];
                            var result_eje = await BASEAPI.firstp('eje_estrategico', {
                                where: [{
                                    field: "id",
                                    value: data.row.eje_estrategico
                                }]
                            });
                            if (result_eje) {
                                relations.push(' "Eje Estratégico"');
                            }
                            var result_objetivo_institucional = await BASEAPI.firstp('objetivo_estrategico', {
                                where: [{
                                    field: "id",
                                    value: data.row.objetivo_estrategico
                                }]
                            });
                            if (result_objetivo_institucional) {
                                relations.push(' "Objetivos Estratégicos"');
                            }
                            var result_resultado = await BASEAPI.firstp('estrategia', {
                                where: [{
                                    field: "id",
                                    value: data.row.estrategia
                                }]
                            })
                            if (result_resultado) {
                                relations.push(' "Estrategia"');
                            }
                            var result_linea = await BASEAPI.firstp('resultado_linea_accion', {
                                where: [
                                    {
                                        field: "resultado",
                                        value: data.row.id
                                    },
                                    {
                                        field: "linea_accion",
                                        operator: "is not",
                                        value: "$null"
                                    }
                                ]
                            })
                            if (result_linea) {
                                relations.push(' "Línea de Acción"');
                                delete_relations.push(' "Línea de Acción"');
                            }
                            var result_meta = await BASEAPI.firstp('resultado_mods', {
                                where: [
                                    {
                                        field: "resultado",
                                        value: data.row.id
                                    },
                                    {
                                        field: "mods",
                                        operator: "is not",
                                        value: "$null"
                                    }
                                ]
                            })
                            if (result_meta) {
                                relations.push(' "Metas Objetivo Desarrollo Sostenible"');
                                delete_relations.push(' "Metas Objetivo Desarrollo Sostenible"');
                            }
                            var result_compromiso = await BASEAPI.firstp('resultado_compromiso', {
                                where: [
                                    {
                                        field: "resultado",
                                        value: data.row.id
                                    },
                                    {
                                        field: "compromiso",
                                        operator: "is not",
                                        value: "$null"
                                    }
                                ]
                            })
                            if (result_compromiso) {
                                relations.push(' "Compromisos Nacionales e Internacionales"');
                                delete_relations.push(' "Compromisos Nacionales e Internacionales"');
                            }
                            var result_supuesto = await BASEAPI.firstp('resultado_supuesto', {
                                where: [
                                    {
                                        field: "resultado",
                                        value: data.row.id
                                    },
                                    {
                                        field: "supuesto",
                                        operator: "is not",
                                        value: "$null"
                                    }
                                ]
                            })
                            if (result_supuesto) {
                                relations.push(' "Supuestos"');
                                delete_relations.push(' "Supuestos"');
                            }
                            var result_indicador = await BASEAPI.listp('indicador_pei', {
                                where: [{
                                    field: "resultado",
                                    value: data.row.id
                                }]
                            })
                            if (result_indicador.data.length > 0) {
                                relations.push(' "Indicadores"');
                                delete_relations.push(' "Indicadores"');
                            }
                            var result_producto = await BASEAPI.listp('vw_productos_poa_detalles', {
                                where: [{
                                    field: "id_resultado",
                                    value: data.row.id
                                }]
                            })
                            if (result_producto.data.length > 0) {
                                relations.push(' "Proyecto/Plan de Acción"');
                                delete_relations.push(' "Proyecto/Plan de Acción"');
                            }
                            var result_actividades = await BASEAPI.listp('vw_actividades_poa_grid', {
                                where: [{
                                    field: "id_resultado",
                                    value: data.row.id
                                }]
                            })
                            var result_actividades_apoyo = await BASEAPI.listp('drp_actividades_apoyo', {
                                where: [{
                                    field: "id_resultado",
                                    value: data.row.id
                                }]
                            })
                            if (relations.length > 0) {
                                if (delete_relations.length > 0) {
                                    SWEETALERT.confirm({
                                        type: "warning",
                                        message: `<p>Registro está relacionado a la/s entidad/es <br> ${relations}.</p> Al ELIMINAR este RESULTADO ESPERADO se estarán borrando relaciones existentes con la/s entidad/es <br> ${delete_relations}.<br> Está seguro que desea ELIMINAR. ?`,
                                        confirm:  async function () {
                                            SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                            let id_actividades = [];
                                            let id_actividades_apoyo = [];
                                            for (var i of result_indicador.data){
                                                await AUDIT.LOG(AUDIT.ACTIONS.delete,  "vw_indicador_pei_2", i);
                                            }
                                            for (var i of result_producto.data){
                                                await AUDIT.LOG(AUDIT.ACTIONS.delete,  "vw_productos_poa_detalles", i);
                                            }
                                            for (var i of result_actividades.data){
                                                await AUDIT.LOG(AUDIT.ACTIONS.delete,  "vw_actividades_poa_grid", i);
                                                id_actividades.push(i.id)
                                            }
                                            for (var i of result_actividades_apoyo.data){
                                                await AUDIT.LOG(AUDIT.ACTIONS.delete,  "drp_actividades_apoyo", i);
                                                id_actividades_apoyo.push(i.id)
                                            }
                                            console.log(id_actividades,id_actividades_apoyo, "los ids")
                                            BASEAPI.deleteall('productos_poa',[
                                                {
                                                    field: "resultado",
                                                    value: data.row.id
                                                }
                                            ], function (result) {
                                                if (result) {
                                                    BASEAPI.deleteall('productos_poa', [
                                                        {
                                                            field: "resultado",
                                                            value: data.row.id
                                                        }
                                                    ], function (result) {
                                                        if (result) {
                                                            BASEAPI.deleteall('actividades_poa', [
                                                                {
                                                                    field: "id",
                                                                    value: id_actividades
                                                                }
                                                            ], function (result) {
                                                                BASEAPI.deleteall('actividades_apoyo', [
                                                                    {
                                                                        field: "id",
                                                                        value: id_actividades_apoyo
                                                                    }
                                                                ], function (result) {
                                                                    if (result) {
                                                                        data.$scope.deleteRow(data.row).then(function () {
                                                                            SWEETALERT.stop();
                                                                        });
                                                                    }
                                                                });
                                                            })
                                                        }
                                                    })
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    SWEETALERT.confirm({
                                        message: `<p>Registro está relacionado a la entidad/es ${relations}.</p> Desea Eliminar este registro?`,
                                        confirm: function () {
                                            SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                            // data.$scope.deleteRow(data.row).then(function () {
                                            //     SWEETALERT.stop();
                                            // });
                                        }
                                    });
                                }
                            } else {
                                SWEETALERT.confirm({
                                    message: MESSAGE.i('alerts.AYSDelete'),
                                    confirm: function () {
                                        SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                        // data.$scope.deleteRow(data.row).then(function () {
                                        //     SWEETALERT.stop();
                                        // });
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
        ],
        single: [
            {
                "table": "tipo_resultado",
                "base": "tipo_resultado",
                "field": "id",
                "columns": ["id", "nombre"]
            },
        ]
    }
});