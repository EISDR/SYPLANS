CRUD_import_actions = {};
DSON.keepmerge(CRUD_import_actions, CRUDDEFAULTS);
DSON.keepmerge(CRUD_import_actions, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_import_actions',
        //method: 'import_actions',
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
            compania_nombre: {
                label: function (){
                    return 'Compañía'
                },
            },
            description: {shorttext: 360},
            detalles: {
                format: (row) => {
                    if (row.user_id) {
                        let eluser = import_actions.usuarios.filter(d => {
                            return d.id === row.user_id
                        })[0] || "un usuario no identificado";
                        if (typeof eluser === "object")
                            eluser = v.camelCase(`${eluser.nombre} ${eluser.apellido}`);

                        return `Ejecutado por ${eluser} en la fecha ${LAN.datetime(row.fecha)}`;
                    } else {
                        return "Aún no ha sido corrida esta data";
                    }
                },
                shorttext: 360
            },
            mensaje: {
                label: function (){
                    return 'Mensaje'
                },
                shorttext: 360
            },
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'compania',
                'base': 'compania',
                'field': 'id',
                'columns': ['id', 'nombre']
            }]
    }
});
//modify methods that existing option
//CRUD_import_actions.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_import_actions.table.options[0].menus.push({
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
