CRUD_riesgo_resultado = {};
DSON.keepmerge(CRUD_riesgo_resultado, CRUDDEFAULTS);
DSON.keepmerge(CRUD_riesgo_resultado, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_riesgo_resultado',
        //method: 'riesgo_resultado',
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
            condition: {
                export: true,
                exportExample: false,
                label: "Color",
                format: function (row) {
                    $(`.riesgo_resultado_color` + row.id).css('background', row.color);
                    return `<div   class='${`riesgo_resultado_color` + row.id} shape_element_left'> </div>`;
                }
            },
            valor: {
                exportExample: "[int]",
                label: function () {
                    return "Rango Desde"
                },
                formattype: ENUM.FORMAT.decimal
            },
            valor_to: {
                exportExample: "[int]",
                label: function () {
                    return "Rango Hasta"
                },
                formattype: ENUM.FORMAT.decimal
            },
            compania: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                exportfix: "new SESSION().current().compania_id",
                dead: true
            }
        },
        filters: {
            columns: [
                {
                    key: 'nombre',
                    label: 'Nombre',
                    type: FILTER.types.string,
                    placeholder: 'Nombre'
                },
                {
                    key: 'descripcion',
                    label: 'Descripción',
                    type: FILTER.types.string,
                    placeholder: 'Descripción'
                },
                {
                    key: 'valor',
                    label: function() {
                        return 'Valor';
                    },
                    type: FILTER.types.decimal,
                    placeholder: 'Valor'
                },
            ]
        }
    }
});
//modify methods that existing option
//CRUD_riesgo_resultado.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_riesgo_resultado.table.options[0].menus.push({
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
