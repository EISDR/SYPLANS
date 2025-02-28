CRUD_modulo_formulario_registro = {};
DSON.keepmerge(CRUD_modulo_formulario_registro, CRUDDEFAULTS);
DSON.keepmerge(CRUD_modulo_formulario_registro, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_modulo_formulario_registro',
        //method: 'modulo_formulario_registro',
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
            respuestas: {
                shorttext: 360,
                format: (row) => {
                    try {
                        let datos = JSON.parse(row.respuestas);
                        let arrayDedatos = [];
                        Object.keys(datos).forEach(field => {
                            arrayDedatos.push(`<b>${field}</b>: ${datos[field]}`);
                        });
                        return DSON.ULALIA(arrayDedatos);
                    } catch (e) {
                        return "Datos Corruptos";
                    }
                }
            },
            fecha: {formattype: ENUM.FORMAT.datetime},
            ip: {},
            nombre: {
            },
            origen: {},
            browser: {
            }
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'modulo_formulario',
                'base': 'modulo_formulario',
                'field': 'id',
                'columns': ['id', 'nombre']
            },

            {
                'table': 'usuario',
                'base': 'usuario',
                'field': 'id',
                'columns': ['id', 'nombre', 'apellido']
            }]
    }
});
//modify methods that existing option
//CRUD_modulo_formulario_registro.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_modulo_formulario_registro.table.options[0].menus.push({
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