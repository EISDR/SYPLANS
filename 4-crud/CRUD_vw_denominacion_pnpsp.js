CRUD_vw_denominacion_pnpsp = {};
DSON.keepmerge(CRUD_vw_denominacion_pnpsp, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_denominacion_pnpsp, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_vw_denominacion_pnpsp',
        //method: 'vw_denominacion_pnpsp',
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
            no_secuencia: {
                label: function () {
                    return "No. Secuencia"
                },
                formattype: ENUM.FORMAT.numeric
            },
            nombre: {},
            descripcion: {shorttext: 360},
            // impacto_politica: {
            //     export: false,
            //     exportExample: false,
            //     label: function (){
            //         return "Impactos de la Política";
            //     }
            // },
            // impactos_politica: {
            //     label: function(){ return "Impactos de la Política"; },
            //     visible: false,
            //     visibleDetail: false,
            //     export: true,
            //     exportExample: true,
            //     checkExport: true,
            //     dead: true
            // }
        },
        filters: {
            columns: [
                {
                    key: 'no_secuencia',
                    label: "No. Secuencia",
                    type: FILTER.types.integer,
                    placeholder: 'No. secuencia',
                    maxlength: 255
                },
                {
                    key: 'nombre',
                    label: "Nombre",
                    type: FILTER.types.string,
                    placeholder: 'Nombre',
                    maxlength: 255
                },
                {
                    key: 'descripcion',
                    label: 'Descripción',
                    type: FILTER.types.string,
                    placeholder: 'Descripción',
                    maxlength: 1000
                },
            ]
        },
    }
});
//modify methods that existing option
//CRUD_vw_denominacion_pnpsp.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_denominacion_pnpsp.table.options[0].menus.push({
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