CRUD_vw_documentos_asociados_pv2 = {};
DSON.keepmerge(CRUD_vw_documentos_asociados_pv2, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_documentos_asociados_pv2, {
    table: {
        width: "width:2000px;",
        view: 'vw_documentos_asociados_pv',
        //method: 'vw_documentos_asociados_pv2',
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
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            nombre_proceso: {
                label: function () {
                    return "Proceso"
                },
                // rowspan: function (index, list, category, fromreport) {
                //     return (category === "span") ? vw_documentos_asociados_pv2.sp_('d.nombre_proceso', index, list)
                //         : vw_documentos_asociados_pv2.sm_('d.nombre_proceso', index, list);
                // }
            },
            responsable_proceso: {
                label: function () {
                    return "Responsable del Proceso"
                },
            },
            codigo: {
                label: function () {
                    return "Código del Documento"
                },
            },
            nombre: {
                label: function () {
                    return "Nombre del Documento"
                },
            },
            responsable_ducumento: {
                label: function () {
                    return "Responsable del Documento"
                },
            },
            punto_verificacion: {
                label: function () {
                    return "Punto de Verificación"
                },
                shorttext: 360,
            },
            cumple: {
                label: function () {
                    return "¿Cumple?"
                },
                visible: true,
                sorttype: ENUM.FORMAT.bool,
                formattype: ENUM.FORMAT.bool,
            },
            tipo_inconformidad: {
                label: function () {
                    return "Tipo de No Conformidad"
                },
            },
            observaciones: {
                label: function () {
                    return "Observación"
                },
            },
            comentfinal: {
                label: function(){
                    return "Comentario final de la auditoría"
                },
                shorttext: 360,
            }
        },
        filters: {
            columns: [
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
                        order: "asc",
                        distinct: false
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
                    key: 'codigo',
                    label: 'Código del Documento',
                    type: FILTER.types.string,
                    placeholder: 'Código del Documento'
                },
                {
                    key: 'nombre',
                    label: 'Nombre del Documento',
                    type: FILTER.types.string,
                    placeholder: 'Nombre del Documento'
                },
                {
                    key: 'responsable',
                    label: 'Responsable del Documento',
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
                    key: 'punto_verificacion',
                    label: 'Punto de Verificación',
                    type: FILTER.types.string,
                    placeholder: 'Punto de Verificación'
                },
                {
                    key: 'cumple',
                    label: '¿Cumple?',
                    type: FILTER.types.bool,
                    placeholder: '¿Cumple?'
                },
                {
                    key: 'id_tipo_inconformidad',
                    label: 'Tipo de Inconformidad',
                    type: FILTER.types.relation,
                    table: 'tipo_inconformidad',
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
                    key: 'observaciones',
                    label: 'Observación',
                    type: FILTER.types.string,
                    placeholder: 'Observación'
                },
                {
                    key: 'comentfinal',
                    label: 'Comentario final de la auditoría',
                    type: FILTER.types.string,
                    placeholder: 'Comentario final de la auditoría'
                },
            ]
        }
    }
});
//modify methods that existing option
//CRUD_vw_documentos_asociados_pv2.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_documentos_asociados_pv2.table.options[0].menus.push({
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