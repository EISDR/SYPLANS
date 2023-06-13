CRUD_vw_documentos_asociados_pv2 = {};
DSON.keepmerge(CRUD_vw_documentos_asociados_pv2, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_documentos_asociados_pv2, {
    table: {
        width: "width:2000px;",
        view: 'vw_documentos_asociados_pv',
        //method: 'vw_documentos_asociados_pv2',
        //limits: [10, 50, 100, 0],
        //report: true,
        sortmessage: "proceso",
        batch: false,
        sortable: false,
        fixheader: true,
        sort: "$ nombre_proceso, nombre, punto_verificacion, responsable_ducumento,  tipo_inconformidad, observaciones, comentfinal",
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
        rowspan: function (index, list, category, fromreport) {
            return (category === "span") ? vw_documentos_asociados_pv2.sp_('d.nombre_proceso + d.nombre + d.punto_verificacion', index, list)
                : vw_documentos_asociados_pv2.sm_('d.nombre_proceso + d.nombre + d.punto_verificacion', index, list);
        },
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
                rowspan: function (index, list, category, fromreport) {
                    return (category === "span") ? vw_documentos_asociados_pv2.sp_('d.nombre_proceso', index, list)
                        : vw_documentos_asociados_pv2.sm_('d.nombre_proceso', index, list);
                }
            },
            nombre: {
                label: function () {
                    return "Nombre del Documento"
                },
                rowspan: function (index, list, category, fromreport) {
                    return (category === "span") ? vw_documentos_asociados_pv2.sp_('d.nombre_proceso + d.nombre', index, list)
                        : vw_documentos_asociados_pv2.sm_('d.nombre_proceso + d.nombre', index, list);
                }
            },
            responsable_ducumento: {
                label: function () {
                    return "Auditor Responsable del Documento"
                },
                rowspan: function (index, list, category, fromreport) {
                    return (category === "span") ? vw_documentos_asociados_pv2.sp_('d.nombre_proceso + d.nombre + d.responsable_ducumento + d.punto_verificacion', index, list)
                        : vw_documentos_asociados_pv2.sm_('d.nombre_proceso + d.nombre + d.responsable_ducumento + d.punto_verificacion', index, list);
                }
            },
            punto_verificacion: {
                label: function () {
                    return "Punto de Verificación"
                },
                shorttext: 360,
                rowspan: function (index, list, category, fromreport) {
                    return (category === "span") ? vw_documentos_asociados_pv2.sp_('d.nombre_proceso + d.nombre + d.punto_verificacion', index, list)
                        : vw_documentos_asociados_pv2.sm_('d.nombre_proceso + d.nombre + d.punto_verificacion', index, list);
                }
            },
            tipo_inconformidad: {
                label: function () {
                    return "Tipo de No Conformidad"
                },
                rowspan: function (index, list, category, fromreport) {
                    return (category === "span") ? vw_documentos_asociados_pv2.sp_('d.nombre_proceso + d.nombre + d.punto_verificacion ', index, list)
                        : vw_documentos_asociados_pv2.sm_('d.nombre_proceso + d.nombre + d.punto_verificacion', index, list);
                }
            },
            observaciones: {
                label: function () {
                    return "Observación"
                },
                rowspan: function (index, list, category, fromreport) {
                    return (category === "span") ? vw_documentos_asociados_pv2.sp_('d.nombre_proceso + d.nombre + d.punto_verificacion', index, list)
                        : vw_documentos_asociados_pv2.sm_('d.nombre_proceso + d.nombre + d.punto_verificacion', index, list);
                }
            },
            comentfinal: {
                label: function(){
                    return "Comentario final de la auditoría"
                },
                shorttext: 360,
                rowspan: function (index, list, category, fromreport) {
                    return (category === "span") ? vw_documentos_asociados_pv2.sp_('d.nombre_proceso + d.nombre', index, list)
                        : vw_documentos_asociados_pv2.sm_('d.nombre_proceso + d.nombre', index, list);
                }
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
                    key: 'nombre',
                    label: 'Nombre del Documento',
                    type: FILTER.types.string,
                    placeholder: 'Nombre del Documento'
                },
                {
                    key: 'responsable',
                    label: 'Auditor Responsable del Documento',
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
CRUD_vw_documentos_asociados_pv2.table.options.push({
    title: (data) => {
        return "Ver historial de cambios hechos por los auditores";
    },
    icon: (data) => {
        return "list";
    },
    characterist: (data) => {
        return "";
    },
    show: function (data) {
        return true;
    },
    click: function (data) {
        //extra function
        vw_documentos_asociados_pv2.dataForView = data.row;
        vw_documentos_asociados_pv2.modal.modalView("vw_documentos_asociados_pv2/view_history", {

            width: 'modal-full',
            header: {
                title: `Ver historial de cambios hechos por los auditores al punto de verificación: "${data.row.nombre}" `,
                icon: "list"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'mapa_proceso'
            },
            event: {
                // show: {
                //     begin: function (data) {
                //
                //     },
                //     end: async function (eData) {
                //
                //     }
                // },
                // hide: {
                //     begin: function (data) {
                //
                //     },
                //     end: function (data) {
                //     }
                // }
            },
        });
        return false;
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