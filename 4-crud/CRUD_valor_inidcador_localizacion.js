CRUD_valor_inidcador_localizacion = {};
DSON.keepmerge(CRUD_valor_inidcador_localizacion, CRUDDEFAULTS);
DSON.keepmerge(CRUD_valor_inidcador_localizacion, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_valor_inidcador_localizacion',
        //method: 'valor_inidcador_localizacion',
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
            objetivo_localizacion_consideraciones: {
                label: () => {
                    return "Objetivo"
                }
            },
            meta_localizacion_consideraciones: {
                label: () => {
                    return "Meta"
                }
            },
            inidcador_compania_definicion: {
                label: () => {
                    return "Indicador"
                }
            },
            valor_organizacion: {
                label: () => {
                    return "Valor Organización"
                }
            },
            valor_referencia: {
                label: () => {
                    return "Valor de Referencia"
                }
            },
            consideraciones: {shorttext: 360}
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'meta_localizacion',
                'base': 'meta_localizacion',
                'field': 'id',
                'columns': ['id', 'consideraciones']
            },

            {
                'table': 'inidcador_compania',
                'base': 'inidcador_compania',
                'field': 'id',
                'columns': ['id', 'definicion']
            }
        ]
    }
});
//modify methods that existing option
//CRUD_valor_inidcador_localizacion.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_valor_inidcador_localizacion.table.options[0].menus.push({
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