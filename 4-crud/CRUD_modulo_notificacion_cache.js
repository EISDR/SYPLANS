CRUD_modulo_notificacion_cache = {};
DSON.keepmerge(CRUD_modulo_notificacion_cache, CRUDDEFAULTS);
DSON.keepmerge(CRUD_modulo_notificacion_cache, {
    table: {
        width: "width:1500px;",
        //view: 'vw_modulo_notificacion_cache',
        //method: 'modulo_notificacion_cache',
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
        key: 'sendDate',
        orderby: 'sendDate',
        order: 'asc',
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
            modulo_notificacion_nombre: {
            },
            permanent: {
                format: (row) => {
                    return row.permanent == 1 ? 'Si' : 'No';
                },
                visible: true
            },
            to: {
                shorttext: 360
            },
            cc: {
                shorttext: 360
            },
            subject: {
                shorttext: 360
            },
            email: {
            },
            push: {
                shorttext: 360
            },
            sendDate: {
                formattype: ENUM.FORMAT.datetime
            }
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'modulo_notificacion',
                'base': 'module_notification',
                'field': 'id',
                'columns': ['nombre']
            }]
    }
});
//modify methods that existing option
//CRUD_modulo_notificacion_cache.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_modulo_notificacion_cache.table.options[0].menus.push({
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