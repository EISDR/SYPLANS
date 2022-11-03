CRUD_ser_salida_comentario = {};
DSON.keepmerge(CRUD_ser_salida_comentario, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ser_salida_comentario, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_ser_salida_comentario',
        //method: 'ser_salida_comentario',
        //limits: [10, 50, 100, 0],
        report: true,
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
                exportExample: false
            },
            comentario: {},
            fecha: {formattype: ENUM.FORMAT.datetime},
            usuario: {},
            estatus: {},
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_ser_salida_comentario.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_ser_salida_comentario.table.options = [];