lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_vw_reporte_francis = {};
DSON.keepmerge(CRUD_vw_reporte_francis, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_reporte_francis, {
    table: {
        width: "width:3000px;",
        //view: 'vw_vw_reporte_francis',
        //method: 'vw_reporte_francis',
        //limits: [10, 50, 100, 0],
        report: true,
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
                exportExample: false
            },
            ano: {
                label: () => {
                    return "Año"
                }
            },
            departamento: {
                label: () => {
                    return "Departamento"
                }
            },
            presupuesto_departamento: {
                label: () => {
                    return "Presupuesto del Departamento"
                },
                formattype: ENUM.FORMAT.money
            },
            producto: {
                label: () => {
                    return "Producto"
                }
            },
            presupuesto_producto: {
                label: () => {
                    return "Presupuesto del Producto"
                },
                formattype: ENUM.FORMAT.money
            },
            fecha_inicio: {
                label: () => {
                    return "Fecha Inicio"
                }, formattype: ENUM.FORMAT.date,
                export: (value) => {
                    return (moment(value).format("DD-MM-YYYY")).replaceAll("-", "_");
                }
            },
            fecha_fin: {
                label: () => {
                    return "Fecha Fin"
                }, formattype: ENUM.FORMAT.date,
                export: (value) => {
                    return (moment(value).format("DD-MM-YYYY")).replaceAll("-", "_");
                }
            },
            actividad: {
                label: () => {
                    return "Actividades"
                },
                format: (row) => {
                    if (row.actividad) {
                        return DSON.ULALIA(row.actividad.split(";;"));
                    }
                },
                export: (value) => {
                    return "*" + ((value || "").replaceAll(";;", "<br>"));
                }
            },
            indicador: {
                label: () => {
                    return "Indicador de Producto"
                }
            },
            medio_verificacion: {
                label: () => {
                    return "Medio de Verificación"
                }
            },
            meta_trimestre_1: {
                label: () => {
                    return "Meta - Primer Trimestre"
                }
            },
            meta_trimestre_2: {
                label: () => {
                    return "Meta - Segundo Trimestre"
                }
            },
            meta_trimestre_3: {
                label: () => {
                    return "Meta - Tercer Trimestre"
                }
            },
            meta_trimestre_4: {
                label: () => {
                    return "Meta - Cuarto Trimestre"
                }
            },
            alcanzada_trimestre_1: {
                label: () => {
                    return "Meta Alcanzada - Primer Trimestre"
                }
            },
            alcanzada_trimestre_2: {
                label: () => {
                    return "Meta Alcanzada - Segundo Trimestre"
                }
            },
            alcanzada_trimestre_3: {
                label: () => {
                    return "Meta Alcanzada - Tercer Trimestre"
                }
            },
            alcanzada_trimestre_4: {
                label: () => {
                    return "Meta Alcanzada - Cuarto Trimestre"
                }
            }
        },
        filters: {
            columns: [
                {
                    key: 'ano',
                    label: function(){
                        return 'Año'
                    },
                    type: FILTER.types.relation,
                    table: 'vw_poa_ddl',
                    value: "periodo_poa",
                    text: "item.periodo_poa",
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
                        orderby: "periodo_poa",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'departamento',
                    label: function(){
                        return 'Departamento'
                    },
                    placeholder: 'Departamento',
                    type: FILTER.types.relation,
                    value: "nombre",
                    table:'departamento',
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        orderby: "id",
                        order: "asc",
                        distinct: false,
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
                    }
                },
                {
                    key: 'presupuesto_departamento',
                    label: function(){
                        return 'Presupuesto del departamento'
                    },
                    type: FILTER.types.decimal,
                    placeholder: 'Presupuesto del departamento',
                    maxlength: 20
                },
                {
                    key: 'producto',
                    label: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
                    type: FILTER.types.relation,
                    table: 'vw_productos_poa_detalles',
                    value: "producto",
                    text: "item.no1 + ' ' + item.producto",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [{
                            "field": "poa_id",
                            "value": lachechon ? lachechon.poa_id : -1
                        }],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'presupuesto_producto',
                    label: function(){
                        return 'Presupuesto del producto'
                    },
                    type: FILTER.types.decimal,
                    placeholder: 'Presupuesto del producto',
                    maxlength: 20
                },
                {
                    key: 'fecha_inicio',
                    label: 'Fecha Inicio',
                    type: FILTER.types.date,
                    placeholder: 'Fecha Inicio'
                },
                {
                    key: 'fecha_fin',
                    label: 'Fecha Fin',
                    type: FILTER.types.date,
                    placeholder: 'Fecha Fin'
                },
                {
                    key: 'indicador',
                    label: function(){
                        return 'Indicador del producto'
                    },
                    type: FILTER.types.string,
                    placeholder: function(){
                        return 'Indicador del producto'
                    },
                },
                {
                    key: 'medio_verificacion',
                    label: function(){
                        return 'Medio de verificación'
                    },
                    type: FILTER.types.string,
                    placeholder: function(){
                        return 'Medio de verificación'
                    },
                },
                {
                    key: 'meta_trimestre_1',
                    label: function(){
                        return 'Meta - Primer Trimestre'
                    },
                    type: FILTER.types.integer,
                    placeholder: 'Meta - Primer Trimestre',
                    maxlength: 20
                },
                {
                    key: 'meta_trimestre_2',
                    label: function(){
                        return 'Meta - Segundo Trimestre'
                    },
                    type: FILTER.types.integer,
                    placeholder: 'Meta - Segundo Trimestre',
                    maxlength: 20
                },
                {
                    key: 'meta_trimestre_3',
                    label: function(){
                        return 'Meta - Tercer Trimestre'
                    },
                    type: FILTER.types.integer,
                    placeholder: 'Meta - Tercer Trimestre',
                    maxlength: 20
                },
                {
                    key: 'meta_trimestre_4',
                    label: function(){
                        return 'Meta - Cuarto Trimestre'
                    },
                    type: FILTER.types.integer,
                    placeholder: 'Meta - Cuarto Trimestre',
                    maxlength: 20
                },
                {
                    key: 'alcanzada_trimestre_1',
                    label: function(){
                        return 'Meta Alcanzada - Primer Trimestre'
                    },
                    type: FILTER.types.integer,
                    placeholder: 'Meta Alcanzada - Primer Trimestre',
                    maxlength: 20
                },
                {
                    key: 'alcanzada_trimestre_2',
                    label: function(){
                        return 'Meta Alcanzada - Segundo Trimestre'
                    },
                    type: FILTER.types.integer,
                    placeholder: 'Meta Alcanzada - Segundo Trimestre',
                    maxlength: 20
                },
                {
                    key: 'alcanzada_trimestre_3',
                    label: function(){
                        return 'Meta Alcanzada - Tercer Trimestre'
                    },
                    type: FILTER.types.integer,
                    placeholder: 'Meta Alcanzada - Tercer Trimestre',
                    maxlength: 20
                },
                {
                    key: 'alcanzada_trimestre_4',
                    label: function(){
                        return 'Meta Alcanzada - Cuarto Trimestre'
                    },
                    type: FILTER.types.integer,
                    placeholder: 'Meta Alcanzada - Cuarto Trimestre',
                    maxlength: 20
                },
            ]
        }
    }
});
//modify methods that existing option
//CRUD_vw_reporte_francis.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_reporte_francis.table.options[0].menus.push({
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