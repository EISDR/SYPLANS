lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_solicitud_documento = {};
DSON.keepmerge(CRUD_solicitud_documento, CRUDDEFAULTS);
DSON.keepmerge(CRUD_solicitud_documento, {
    table: {
        width: "width:3000px;",
        view: 'vw_solicitud_documento',
        //method: 'solicitud_documento',
        //limits: [10, 50, 100, 0],
        //report: true,
        batch: false,
        //persist: false,
        //sortable: false,
        //dragrow: 'num',
        //rowStyle: function (row, $scope) {
        //    return "color:red;";
        //},
        //rowClass: function (row, $scope) {
        //    return row.name === 'whatever' ? "bg-" + COLOR.danger + "-300" : "";
        //},
        //activeColumn: "active",
        //key: 'id',
        //deletekeys: ['id'],
        columns: {
            // dbcolumnname: {
            //     visible: false,
            //     visibleDetail: false,
            //     export: false,
            //     exportExample: false,
            //     sortable: false,
            //     shorttext: 360,
            //     dead:true,
            //     formattype: ENUM.FORMAT.numeric,
            //     sorttype: ENUM.FORMATFILTER.numeric,
            //     drag: true,
            //     click: function (data) {
            //         alert(data.row.id);
            //         //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
            //     },
            //     reference: "id",
            //     format: function (row) {
            //         return row.id + "*";
            //     }
            // },
            id: {},
            codigor: {
                label: function () {
                    return "Código"
                },
                format: (row) => {
                    return baseController.COD("Módulo de Calidad -> Solicitud de Documentos", row.id, row.fecha_solicitud);
                },
                sortable: false
            },
            nombre: {
                label: function () {
                    return "Nombre de la Solicitud / Tipo de Solicitud de documento - Nombre del Documento"
                },
                format: function(row){
                    return row.tipo_accion != 1  ? row.nombre + " / " + row.tipo_accion_nombre + " - " + row.dombre_doc : row.nombre + " / " + row.tipo_accion_nombre + " - " + row.nombre_documento
                }
            },
            descripcion: {shorttext: 360},
            proceso_categoria_nombre: {
                label: function () {
                    return "Macroproceso"
                },
            },
            proceso_nombre: {
                label: function () {
                    return "Proceso"
                },
            },
            tipo_accion_nombre: {
                label: function () {
                    return "Tipo de Acción"
                },
            },
            tipo_documento_nombre: {
                label: function () {
                    return "Tipo de Documento"
                },
            },
            nombre_documento: {
                label: function () {
                    return "Nombre del Documento"
                },
                format: function (row) {
                    return row.tipo_accion == 3  ? row.dombre_doc : row.nombre_documento
                }
            },
            objetivo: {
                label: function () {
                    return "Objetivo"
                },
                shorttext: 360
            },
            alcance: {shorttext: 360},
            trabaja_marco_legal: {
                label: function () {
                    return "¿Trabaja Marco Legal?"
                },
                format: function (row) {
                    return row.trabaja_marco_legal === 1 ? 'Sí' : 'No'
                },
                shorttext: 360
            },
            marco_legal: {
                label: function () {
                    return "Marco Legal"
                },
                shorttext: 360
            },
            resultado_esperado: {shorttext: 360},
            estatus_nombre: {
                label: function () {
                    return "Estatus"
                }
            },
            solicitante_nombre: {
                label: function () {
                    return "Solicitante"
                },
            },
            solicitante_puesto: {
                label: function () {
                    return "Puesto del Solicitante"
                },
            },
            solicitante_departamento: {
                label: function () {
                    return "Departamento del Solicitante"
                },
            },
            fecha_solicitud: {
                label: function () {
                    return "Fecha de Solicitud";
                },
                formattype: "datetime"
            }
        },
        filters: {
            columns: [
                {
                    key: 'tipo_accion',
                    label: function(){
                        return 'Tipo de Acción'
                    },
                    type: FILTER.types.relation,
                    table: 'solicitud_documento_tipo_accion',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [],
                        orderby: "id",
                        order: "asc"
                    },
                },
                {
                    key: 'nombre',
                    label: 'Nombre de la Solicitud',
                    type: FILTER.types.string,
                    placeholder: 'Nombre de la Solicitud',
                    maxlength: 64
                },
                {
                    key: 'descripcion',
                    label: 'Descripción',
                    type: FILTER.types.string,
                    placeholder: 'Descripción',
                    maxlength: 64
                },
                {
                    key: 'proceso_categoria',
                    label: 'Categoría de Proceso',
                    type: FILTER.types.relation,
                    table: 'procesos_categoria',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "compania",
                                "value": lachechon ? lachechon.compania_id : -1
                            },
                            {
                                "field": "institucion",
                                "operator": lachechon.institucion_id ? "=" : "is",
                                "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc"
                    },
                },
                {
                    key: 'proceso',
                    label: 'Proceso',
                    type: FILTER.types.relation,
                    table: 'vw_procesos',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "compania",
                                "value": lachechon ? lachechon.compania_id : -1
                            },
                            {
                                "field": "institucion",
                                "operator": lachechon.institucion_id ? "=" : "is",
                                "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc"
                    },
                },
                {
                    key: 'nombre_documento',
                    label: 'Nombre del Documento',
                    type: FILTER.types.string,
                    placeholder: 'Nombre del Documento',
                    maxlength: 64
                },
                {
                    key: 'tipo_documento',
                    label: function(){
                        return 'Tipo de Documento'
                    },
                    type: FILTER.types.relation,
                    table: 'tipo_documento',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "compania",
                                "value": lachechon ? lachechon.compania_id : -1
                            },
                            {
                                "field": "institucion",
                                "operator": lachechon.institucion_id ? "=" : "is",
                                "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc"
                    },
                },
                {
                    key: 'estatus',
                    label: 'Estatus',
                    type: FILTER.types.relation,
                    table: 'auditoria_programa_plan_estatus',
                    value: "code",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "entidad",
                                "value": 7
                            },
                        ],
                        orderby: "id",
                        order: "asc"
                    },
                },
                {
                    key: 'solicitante',
                    label: 'Solicitante',
                    type: FILTER.types.relation,
                    table: 'usuario',
                    value: "id",
                    text: "item.nombre + ' ' + item.apellido",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "compania",
                                "value": lachechon ? lachechon.compania_id : -1
                            },
                            {
                                "field": "institucion",
                                "operator": lachechon.institucion_id ? "=" : "is",
                                "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
            ]
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (typeof eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`) != "undefined") {
                        if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit) {
                            return MESSAGE.i('actions.Edit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                            return MESSAGE.i('actions.View');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Remove');
                        }
                    } else {
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.Remove') + ", " +
                            MESSAGE.i('actions.audit');
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
                            return "Autorizar"
                        },
                        icon: (data) => {
                            return "medal";
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            if (typeof solicitud_documento !== "undefined")
                                return solicitud_documento.allowAction("Autorizar", "solicitud_documento", data.row.estatus);
                        },
                        click: function (data) {
                            data.$scope.my_true_estatus = data.row.estatus;
                            data.$scope.solicitante_nombre = data.row.solicitante_nombre;
                            data.$scope.solicitante_departamento = data.row.solicitante_departamento;
                            data.$scope.edit_doc_id = data.row.id;
                            data.$scope.edit_doc_codigo = data.row.codigo_documento;
                            data.$scope.edit_doc_proceso_categoria = data.row.proceso_categoria + "";
                            data.$scope.edit_doc_proceso = data.row.proceso + "";
                            data.$scope.edit_doc_estatus = data.row.estatus + "";
                            data.$scope.edit_doc_nombre = data.row.nombre_documento;
                            data.$scope.edit_doc_tipo_documento = data.row.tipo_documento + "";
                            data.$scope.edit_doc_objetivo = data.row.objetivo;
                            data.$scope.edit_doc_alcance = data.row.alcance;
                            data.$scope.edit_doc_marco_legal = data.row.marco_legal;
                            data.$scope.edit_doc_trabaja_marco_legal = data.row.trabaja_marco_legal;
                            data.$scope.edit_doc_resultado_esperado = data.row.resultado_esperado;
                            data.$scope.edit_doc_descripcion = data.row.descripcion;
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            solicitud_documento.form.titles = {
                                edit: 'Autorizar Solicitud de Documento: "' + data.row.nombre + '"',
                            };
                            return false;
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
                            if (typeof solicitud_documento !== "undefined")
                                return solicitud_documento.allowAction("Editar", "solicitud_documento", data.row.estatus);
                        },
                        click: function (data) {
                            data.$scope.my_true_estatus = data.row.estatus;
                            data.$scope.solicitante_nombre = data.row.solicitante_nombre;
                            data.$scope.solicitante_departamento = data.row.solicitante_departamento;
                            data.$scope.edit_doc_id = data.row.id;
                            data.$scope.edit_doc_codigo = data.row.codigo_documento;
                            data.$scope.edit_doc_proceso_categoria = data.row.proceso_categoria + "";
                            data.$scope.edit_doc_proceso = data.row.proceso + "";
                            data.$scope.edit_doc_estatus = data.row.estatus + "";
                            data.$scope.edit_doc_nombre = data.row.nombre_documento;
                            data.$scope.edit_doc_tipo_documento = data.row.tipo_documento + "";
                            data.$scope.edit_doc_objetivo = data.row.objetivo;
                            data.$scope.edit_doc_alcance = data.row.alcance;
                            data.$scope.edit_doc_marco_legal = data.row.marco_legal;
                            data.$scope.edit_doc_trabaja_marco_legal = data.row.trabaja_marco_legal;
                            data.$scope.edit_doc_resultado_esperado = data.row.resultado_esperado;
                            data.$scope.edit_doc_descripcion = data.row.descripcion;
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            solicitud_documento.form.titles = {
                                edit: 'Editar Solicitud de Documento: "' + data.row.nombre + '"',
                            };
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
                    // {
                    //     text: (data) => {
                    //         return MESSAGE.i('actions.Copy');
                    //     },
                    //     icon: (data) => {
                    //         return "copy3";
                    //     },
                    //     permission: (data) => {
                    //         return 'copy';
                    //     },
                    //     characterist: (data) => {
                    //         return "";
                    //     },
                    //     click: function (data) {
                    //
                    //         var formatRow = {};
                    //
                    //         for (var i in eval(`CRUD_${data.$scope.modelName}`).table.columns) {
                    //             var column = eval(`CRUD_${data.$scope.modelName}`).table.columns[i];
                    //             var key = i;
                    //             var alter = column.exportKey !== undefined ? column.exportKey : i;
                    //             if (eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample !== false) {
                    //                 var exampleText = eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample;
                    //                 exampleText = exampleText === undefined ? "[string]" : exampleText;
                    //                 var realValue = eval(`data.row.${key};`);
                    //                 if (!DSON.oseaX(realValue)) {
                    //                     if (column.link !== undefined) {
                    //                         realValue = eval(`data.row.${key.split('_')[0]}_${key.split('_')[1]}_id;`);
                    //                     }
                    //                     if (column.formattype === "datetime") {
                    //                         realValue = moment(realValue).format(DSON.UNIVERSALTIME);
                    //                     }
                    //                     if (column.formattype === "date") {
                    //                         realValue = moment(realValue).format(DSON.UNIVERSAL);
                    //                     }
                    //                     eval(`formatRow.${alter} = \`${realValue}\`;`);
                    //                 }
                    //             }
                    //         }
                    //         SWEETALERT.confirm({
                    //             title: MESSAGE.i('actions.CopyRecords'),
                    //             message: MESSAGE.i('alerts.Copy'),
                    //             confirm: function () {
                    //                 SWEETALERT.loading({message: MESSAGE.i('actions.CopyngRecord')});
                    //                 var records = [formatRow];
                    //                 var columns = eval(`CRUD_${data.$scope.modelName}`).table.columns;
                    //                 var inserts = [];
                    //                 for (var i in records) {
                    //                     var record = records[i];
                    //                     var row = {};
                    //                     for (var i in record) {
                    //                         var key = i;
                    //                         var value = record[i];
                    //                         for (var c in columns) {
                    //                             var column = false;
                    //                             if (c === key || key === columns[c].exportKey)
                    //                                 column = columns[c];
                    //                             if (column === false) continue;
                    //                             eval(`row.${key} = \`${value}\`;`);
                    //                             break;
                    //                         }
                    //                     }
                    //                     inserts.push({row: row, relations: []});
                    //                 }
                    //                 data.$scope.importing(inserts);
                    //             }
                    //         });
                    //         return false;
                    //     }
                    // },
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
                            if (typeof solicitud_documento !== "undefined")
                                return solicitud_documento.allowAction("Eliminar", "solicitud_documento", data.row.estatus);
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
                    }
                ]
            }
        ],
        single: [
            {
                'table': 'vw_documentos_asociados',
                'base': 'documentos_asociados',
                'field': 'id',
                'columns': ['tipo_documento']
            }
        ]
    }
});
//modify methods that existing option
//CRUD_solicitud_documento.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_solicitud_documento.table.options[0].menus.push({
//     text: (data) => {
//         return MESSAGE.i('actions.Extra');
//     },
//     icon: (data) => {
//         return "list";
//     },
//     permission: (data) => {
//         return 'extra';
//     },
//     characterist: (data) => {
//         return "";
//     },
//     show: function (data) {
//         return true;
//     },
//     click: function (data) {
//         //extra function
//         return false;
//     }
// });