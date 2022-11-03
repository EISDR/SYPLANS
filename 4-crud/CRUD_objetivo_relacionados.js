CRUD_objetivo_relacionados = {};
DSON.keepmerge(CRUD_objetivo_relacionados, CRUDDEFAULTS);
DSON.keepmerge(CRUD_objetivo_relacionados, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_objetivo_relacionados',
        //method: 'objetivo_relacionados',
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
                exportExample: false
            },
            localizacion_nombre: {
                label: () => {
                    return "Localización"
                }
            },
            ods_compania_descripcion: {
                label: () => {
                    return "Primer Objetivo"
                }
            },
            vw_ods_compania_descripcion: {
                label: () => {
                    return "Segundo Objetivo"
                }
            },
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'localizacion',
                'base': 'localizacion',
                'field': 'id',
                'columns': ['id', 'nombre']
            },

            {
                'table': 'ods_compania',
                'base': 'ods_compania',
                'field': 'id',
                'columns': ['id', 'descripcion']
            },
            {
                'table': 'vw_ods_compania',
                'base': 'ods_compania2',
                'field': 'id',
                'columns': ['id', 'descripcion']
            }
        ]
    }
});
//modify methods that existing option
//CRUD_objetivo_relacionados.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_objetivo_relacionados.table.options[0].menus.push({
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