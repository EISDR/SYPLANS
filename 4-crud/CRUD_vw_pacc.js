CRUD_vw_pacc = {};
DSON.keepmerge(CRUD_vw_pacc, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_pacc, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_vw_pacc',
        //method: 'vw_pacc',
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
            nombre: {},
            descripcion: {shorttext: 360},
            capitulo: {},
            subcapitulo: {},
            unidad: {},
            codigo: {},
            año: {formattype: ENUM.FORMAT.numeric},
            fecha_revision: {formattype: ENUM.FORMAT.datetime},
            fecha_aprobacion: {formattype: ENUM.FORMAT.datetime},
            codigo_plan: {},
            cantidad: {formattype: ENUM.FORMAT.numeric},
            version: {},
            estatus: {formattype: ENUM.FORMAT.numeric},
            estatus_nombre: {},
            fecha_presentacion: {formattype: ENUM.FORMAT.datetime},
            active: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            compania: {}
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_vw_pacc.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_pacc.table.options[0].menus.push({
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