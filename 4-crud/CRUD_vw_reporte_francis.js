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
            },
            departamento: {
            },
            presupuesto_departamento: {
                formattype: ENUM.FORMAT.money
            },
            producto: {
            },
            presupuesto_producto: {
                formattype: ENUM.FORMAT.money
            },
            fecha_inicio: {
                formattype: ENUM.FORMAT.date,
                export: (value) => {
                    return (moment(value).format("DD-MM-YYYY")).replaceAll("-", "_");
                }
            },
            fecha_fin: {
                formattype: ENUM.FORMAT.date,
                export: (value) => {
                    return (moment(value).format("DD-MM-YYYY")).replaceAll("-", "_");
                }
            },
            actividad: {
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
            },
            medio_verificacion: {
            },
            meta_trimestre_1: {
            },
            meta_trimestre_2: {
            },
            meta_trimestre_3: {
            },
            meta_trimestre_4: {
            },
            alcanzada_trimestre_1: {
            },
            alcanzada_trimestre_2: {
            },
            alcanzada_trimestre_3: {
            },
            alcanzada_trimestre_4: {
            }
        },
        filters: {
            columns: [
                {
                    key: 'ano',
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
                    type: FILTER.types.decimal,
                    maxlength: 20
                },
                {
                    key: 'producto',
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
                    type: FILTER.types.decimal,
                    maxlength: 20
                },
                {
                    key: 'fecha_inicio',
                    type: FILTER.types.date,
                },
                {
                    key: 'fecha_fin',
                    type: FILTER.types.date,
                },
                {
                    key: 'indicador',
                    type: FILTER.types.string,
                },
                {
                    key: 'medio_verificacion',
                    type: FILTER.types.string,
                },
                {
                    key: 'meta_trimestre_1',
                    type: FILTER.types.integer,
                    maxlength: 20
                },
                {
                    key: 'meta_trimestre_2',
                    type: FILTER.types.integer,
                    maxlength: 20
                },
                {
                    key: 'meta_trimestre_3',
                    type: FILTER.types.integer,
                    maxlength: 20
                },
                {
                    key: 'meta_trimestre_4',
                    type: FILTER.types.integer,
                    maxlength: 20
                },
                {
                    key: 'alcanzada_trimestre_1',
                    type: FILTER.types.integer,
                    maxlength: 20
                },
                {
                    key: 'alcanzada_trimestre_2',
                    type: FILTER.types.integer,
                    maxlength: 20
                },
                {
                    key: 'alcanzada_trimestre_3',
                    type: FILTER.types.integer,
                    maxlength: 20
                },
                {
                    key: 'alcanzada_trimestre_4',
                    type: FILTER.types.integer,
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