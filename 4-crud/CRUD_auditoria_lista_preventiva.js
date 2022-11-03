CRUD_auditoria_lista_preventiva = {};
DSON.keepmerge(CRUD_auditoria_lista_preventiva, CRUDDEFAULTS);
DSON.keepmerge(CRUD_auditoria_lista_preventiva, {
    table: {
        //width: "width:3000px;",
        view: 'vw_auditoria_lista_preventiva',
        //method: 'auditoria_lista_preventiva',
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
            nombre: {},
            descripcion: {
                label: () => {
                    return "Observación de Acción Preventiva";
                },
                shorttext: 360
            },
            departamento_name: {
                visible: false,
                label: () => {
                    return "Departamento"
                },
            },
            responsable_name: {
                label: () => {
                    return "Responsable"
                }
            },
            ejecucion: {
                label: () => {
                    return "Fecha de Ejecución"
                },
                formattype: ENUM.FORMAT.datetime
            }
        },
        filters: {
            columns: true
        },
    }
});
//modify methods that existing option
//CRUD_auditoria_lista_preventiva.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_auditoria_lista_preventiva.table.options[0].menus.push({
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
