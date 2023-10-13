CRUD_vw_documentos_asociados_pv = {};
DSON.keepmerge(CRUD_vw_documentos_asociados_pv, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_documentos_asociados_pv, {
    table: {
        width: "width:2000px;",
        view: 'vw_documentos_asociados_mp',
        //method: 'vw_documentos_asociados_pv',
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
            nombre_mapa: {
                label: function () {
                    return "Macroproceso"
                }
            },
            nombre_proceso: {
                label: function () {
                    return "Proceso"
                }
            },
            id: {
                label: function () {
                    return "Código Automático"
                },
                format: (row) => {
                    return baseController.COD("Módulo de Calidad -> Documentos", row.id,row.aprobado_en);
                },
            },
            codigo: {
                label: function () {
                    return "Código Manual"
                }
            },
            nombre: {
                label: function () {
                    return "Nombre del Documento"
                }
            },
            tipo_documento: {
                label: function () {
                    return "Tipo de Documento"
                },
            },
            responsable_proceso_departamento: {
                label: function () {
                    return "Área/Departamento"
                }
            },
            estatus: {
                label: function () {
                    return "Estatus"
                }
            },
            responsable_proceso: {
                label: function () {
                    return "Responsable del Proceso"
                }
            },
            aprobado_en: {
                label: function () {
                    return "Fecha de Autorización"
                },
                formattype: ENUM.FORMAT.datetime
            },
            vigencia_lm: {
                label: function () {
                    return "Vigencia del Documento"
                },
                formattype: ENUM.FORMAT.datetime
            },
            folder: {
                label: function () {
                    return "Ubicación"
                },
                format: function (row) {
                    return row.folder ? `<a title="Click para ver documento">${row.folder}</a>` : ''
                },
                fileicon: true
            }
        },
        filters: {
            columns: [
                {
                    key: 'procesos_categoria',
                    label: function () {
                        return 'Macroproceso'
                    },
                    type: FILTER.types.relation,
                    table: 'vw_procesos_categoria',
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
                            },
                            {
                                field: "estatus_mapa",
                                operator: "!=",
                                value: 4
                            },
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
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
                            },
                            {
                                field: "estatus_mapa",
                                operator: "!=",
                                value: 4
                            },
                            {
                                field: "estatus_id",
                                operator: "!=",
                                value: 4
                            },
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'codigo',
                    label: 'Código Manual',
                    type: FILTER.types.string,
                    placeholder: 'Código Manual'
                },
                {
                    key: 'nombre',
                    label: function () {
                        return 'Nombre del Documento'
                    },
                    type: FILTER.types.string,
                    placeholder: 'Nombre'
                },
                {
                    key: 'tipo_documento_id',
                    label: function () {
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
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'responsable_proceso_departamento_id',
                    label: function () {
                        return 'Área/Departamento '
                    },
                    type: FILTER.types.relation,
                    table: 'departamento',
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
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'estatus_id',
                    label: function () {
                        return 'Estatus'
                    },
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
                                "value": 2
                            },
                        ],
                        orderby: "id",
                        order: "asc"
                    },
                },
                {
                    key: 'id_responsable_proceso',
                    label: 'Responsable del Proceso',
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
                {
                    key: 'aprobado_en',
                    label: function () {
                        return 'Fecha de Autorización'
                    },
                    type: FILTER.types.date,
                    placeholder: 'Fecha de Autorización'
                },
                {
                    key: 'vigencia_lm',
                    label: function () {
                        return 'Vigencia del Documento'
                    },
                    type: FILTER.types.date,
                    placeholder: 'Vigencia del Documento'
                },
            ]
        },
    }
});
//modify methods that existing option
//CRUD_vw_documentos_asociados_pv.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_documentos_asociados_pv.table.options[0].menus.push({
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