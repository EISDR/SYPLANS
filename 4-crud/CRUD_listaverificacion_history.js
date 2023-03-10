CRUD_listaverificacion_history = {};
DSON.keepmerge(CRUD_listaverificacion_history, CRUDDEFAULTS);
DSON.keepmerge(CRUD_listaverificacion_history, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_listaverificacion_history',
        //method: 'listaverificacion_history',
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
                dead:true
            },
            observaciones: {shorttext: 360},
            cumple: {formattype: ENUM.FORMAT.bool},
            tipo_inconformidad_nombre: {},
            usuario_nombre: {
                format: function(row){
                    return row.usuario_nombre  + ' ' + row.usuario_apellido;
                }
            },
            fecha: {formattype: ENUM.FORMAT.datetime},
        },
        single: [
            {
                'table': 'usuario',
                'base': 'usuario',
                'field': 'id',
                'columns': ['id', 'nombre', "apellido"]
            },

            {
                'table': 'tipo_inconformidad',
                'base': 'tipo_inconformidad',
                'field': 'id',
                'columns': ['id', 'nombre']
            }]
    }
});
//modify methods that existing option
//CRUD_listaverificacion_history.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_listaverificacion_history.table.options[0].menus.push({
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