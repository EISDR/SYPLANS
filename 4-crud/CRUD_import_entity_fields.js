CRUD_import_entity_fields = {};
DSON.keepmerge(CRUD_import_entity_fields, CRUDDEFAULTS);
DSON.keepmerge(CRUD_import_entity_fields, {
    table: {
        width: "width:1800px;",
        //view: 'vw_import_entity_fields',
        //method: 'import_entity_fields',
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
            field_name: {
                label: function(){
                    return "Nombre del campo"
                },
            },
            field_excel: {
                label: function(){
                    return "Nombre del campo en Excel"
                },
            },
            required: {
                label: function(){
                    return "¿Requerido?"
                },
                formattype: ENUM.FORMAT.bool
            },
            validacion: {
                label: function(){
                    return "Validación"
                },
                shorttext: 360
            },
            fkof: {
                label: function(){
                    return "Foreign key de"
                },
            },
            multipleof: {
                label: function(){
                    return "Relación múltiple de"
                },
            },
            import_entity_nombre: {
                label: function(){
                    return "Entidad del import"
                }
            },
            query: {shorttext: 360}
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'import_entity',
                'base': 'import_entity',
                'field': 'id',
                'columns': ['id', 'nombre']
            }]
    }
});
//modify methods that existing option
//CRUD_import_entity_fields.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_import_entity_fields.table.options[0].menus.push({
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