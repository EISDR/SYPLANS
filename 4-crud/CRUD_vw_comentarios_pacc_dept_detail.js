CRUD_vw_comentarios_pacc_dept_detail = {};
DSON.keepmerge(CRUD_vw_comentarios_pacc_dept_detail, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_comentarios_pacc_dept_detail, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_vw_comentarios_pacc_dept_detail',
        //method: 'vw_comentarios_pacc_dept_detail',
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
            comentario: {shorttext: 360},
            type: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                formattype: ENUM.FORMAT.numeric,
                dead: true
            },
            created_at: {formattype: ENUM.FORMAT.datetime},
            creado_por: {
                label: function () {
                    return "Creado Por"
                },
            },
            revision: {
                label: function () {
                    return "¿Revisión?"
                },
                format: function (row) {
                    if (row.revision == "1") {
                        return "Sí";
                    } else {
                        return "No";
                    }
                }
            },
            trimestre: {
                shorttext: 360,
                format: function (row) {
                    if (!row.trimestre) {
                        return "General";
                    } else {
                        return row.trimestre;
                    }
                }
            },
            pacc_dept_detail: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                formattype: ENUM.FORMAT.numeric,
                dead: true
            }
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_vw_comentarios_pacc_dept_detail.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_comentarios_pacc_dept_detail.table.options[0].menus.push({
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
