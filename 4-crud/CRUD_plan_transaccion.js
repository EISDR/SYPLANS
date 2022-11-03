CRUD_plan_transaccion = {};
DSON.keepmerge(CRUD_plan_transaccion, CRUDDEFAULTS);
DSON.keepmerge(CRUD_plan_transaccion, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_plan_transaccion',
        //method: 'plan_transaccion',
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
            features: {shorttext: 360},
            pacc: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            riesgo: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            privada: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            multianual: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            cantidad_usuario_departamental: {formattype: ENUM.FORMAT.numeric},
            cantidad_usuario_planificacion: {formattype: ENUM.FORMAT.numeric},
            cantidad_admin: {formattype: ENUM.FORMAT.numeric},
            multiinstitucion: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            creacion_poa_flexibles: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            evidencias_flexibles: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            frecuencia: {},
            monto: {formattype: ENUM.FORMAT.decimal},
            monto_inicial: {formattype: ENUM.FORMAT.decimal},
            descuento: {formattype: ENUM.FORMAT.numeric},
            compania_name: {link: {table: 'compania',from: 'compania'}},
            end_date: {formattype: ENUM.FORMAT.datetime},
            date: {formattype: ENUM.FORMAT.datetime},
            estatus: {formattype: ENUM.FORMAT.numeric}
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'compania',
                'base': 'compania',
                'field': 'id',
                'columns': ['id', 'name']
            }]
    }
});
//modify methods that existing option
//CRUD_plan_transaccion.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_plan_transaccion.table.options[0].menus.push({
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