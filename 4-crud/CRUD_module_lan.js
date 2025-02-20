CRUD_module_lan = {};
DSON.keepmerge(CRUD_module_lan, CRUDDEFAULTS);
DSON.keepmerge(CRUD_module_lan, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_module_lan',
        //method: 'module_lan',
        limits: [10, 50, 100, 0],
        //report: true,
        batch: false,
        //persist: false,
        //sortable: false,
        //dragrow: 'num',
        //rowStyle: function (row, $scope) {
        //    return "color:red;";
        //},
        rowClass: function (row, $scope) {
            let estatus = module_lan.getStatus(row);
            let table = {
                "ia": "text-default bg-success-300",
                "human": "",
                "no": "text-default  bg-danger-300",
            }
            return table[estatus];
        },
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
                dead: true,
                nofilter: true
            },
            category: {
                link: {
                    from: "vw_lancategory",
                    value: "id",
                    text: "item.name"
                }
            },
            key: {
                label: function () {
                    return "ID"
                }
            },
            ia: {
                format: (row) => {
                    let estatus = module_lan.getStatus(row);
                    let table = {
                        "ia": MESSAGE.i('special.ia'),
                        "human": MESSAGE.i('special.human'),
                        "no": MESSAGE.i('special.nowork'),
                    }
                    return table[estatus];
                },
                visible: true,
                sorttype: ENUM.FORMAT.bool,
                formattype: ENUM.FORMAT.bool
            }
        },
        filters: {
            columns: true
        },
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
