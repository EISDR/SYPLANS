lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_recursos = {};
DSON.keepmerge(CRUD_recursos, CRUDDEFAULTS);
DSON.keepmerge(CRUD_recursos, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_recursos',
        //method: 'recursos',
        //limits: [10, 50, 100, 0],
        //report: true,
        //batch: false,
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
            tipo_recurso_nombre: {
                label: "Tipo",
                linkfilter: {
                    from: "tipo_recurso",
                    value: "id",
                    text: "item.nombre",
                    whereColumn: "tipo_recurso",
                }
            },
            descripcion: {shorttext: 360}
        },
        filters: {
            columns: [
                {
                    key: 'descripcion',
                    label: function () {
                        return 'Descripción'
                    },
                    type: FILTER.types.string,
                    placeholder: 'Descripción'
                },
                {
                    key: 'tipo',
                    label: function () {
                        return 'Tipo'
                    },
                    type: FILTER.types.relation,
                    table: 'tipo_recurso',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "compania",
                                "value": lachechon ? lachechon.compania_id : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
            ]
        },
        single: [
            {
                'table': 'tipo_recurso',
                'base': 'tipo',
                'field': 'id',
                'columns': ['id', 'nombre']
            }
        ],
    }
});
//modify methods that existing option
//CRUD_recursos.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_recursos.table.options[0].menus.push({
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