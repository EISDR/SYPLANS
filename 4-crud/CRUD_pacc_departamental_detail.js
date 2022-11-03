var Row_id = "";
var Revision = "";
var Trimestre = "";
var Deleted = "";
CRUD_pacc_departamental_detail = {};
DSON.keepmerge(CRUD_pacc_departamental_detail, CRUDDEFAULTS);
DSON.keepmerge(CRUD_pacc_departamental_detail, {
    table: {
        width: "width:1800px;",
        view: 'vw_pacc_departamental_detail',
        method: 'pacc_departamental_detail',
        limits: [20, 50, 100, 0],
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
            cbs: {
                label: function () {
                    return "Código del Catálogo de Bienes y Servicios (CBS)"
                }
            },
            pacc_descripcion: {
                label: function () {
                    return "Descripción de la Compra o Contratación"
                }
            },
            unidad: {
                label: function () {
                    return "Unidad de Medida"
                }
            },
            periodo_1: {
                label: function () {
                    return "Primer Trimestre"
                }
            },
            periodo_2: {
                label: function () {
                    return "Segundo Trimestre"
                }
            },
            periodo_3: {
                label: function () {
                    return "Tercer Trimestre"
                }
            },
            periodo_4: {
                label: function () {
                    return "Cuarto Trimestre"
                },
            },
            periodo_total: {
                label: function () {
                    return "Cantidad Total"
                }
            },
            precio_unitario: {
                label: function () {
                    return "Precio Unitario Estimado"
                },
                formattype: ENUM.FORMAT.decimal
            },
            costo_total: {
                label: function () {
                    return "Costo Total Unitario"
                },
                formattype: ENUM.FORMAT.decimal
            },
            costo_total_real: {
                label: function () {
                    return "Costo Total por Catálogo de Bienes y Servicios"
                },
                formattype: ENUM.FORMAT.decimal
            },
            procedimiento_seleccion_nombre: {
                label: function () {
                    return "Procedimiento de Selección"
                }
            },
            fuente_financiamiento_nombre: {
                label: function () {
                    return "Fuente de financiamiento"
                }
            },
            valor_adquirido: {
                label: function () {
                    return "Valor Adquirido"
                }
            },
            observacion: {
                label: function () {
                    return "Observación"
                },
            },
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_pacc_departamental_detail.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_pacc_departamental_detail.table.options[0].menus.push({
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