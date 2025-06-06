CRUD_module_lan = {};
DSON.keepmerge(CRUD_module_lan, CRUDDEFAULTS);
DSON.keepmerge(CRUD_module_lan, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_module_lan',
        //method: 'module_lan',
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
            language_nombre: {
                label: function () {
                    return "Lenguaje"
                }
            },
            key: {
                label: function () {
                    return "Indice"
                }
            },
            value: {
                label: function () {
                    return "Texto a mostrar"
                }
            },
            ia: {
                label: function () {
                    return "¿Trabaja con IA?"
                },
                visible: true,
                sorttype: ENUM.FORMAT.bool,
                formattype: ENUM.FORMAT.bool
            }
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'language',
                'base': 'language',
                'field': 'id',
                'columns': ['id', 'nombre']
            }]
    }
});
//modify methods that existing option
//CRUD_module_lan.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_module_lan.table.options[0].menus.push({
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