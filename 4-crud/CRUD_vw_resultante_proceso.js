CRUD_vw_resultante_proceso = {};
DSON.keepmerge(CRUD_vw_resultante_proceso, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_resultante_proceso, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_vw_resultante_proceso',
        //method: 'vw_resultante_proceso',
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
            compania: {formattype: ENUM.FORMAT.numeric},
            institucion_name: {link: {table: 'institucion',from: 'institucion'}},
            compania_base: {formattype: ENUM.FORMAT.numeric},
            entidad: {},
            factor: {formattype: ENUM.FORMAT.numeric},
            rid: {formattype: ENUM.FORMAT.numeric},
            riesgo: {},
            table_: {formattype: ENUM.FORMAT.numeric},
            registro: {formattype: ENUM.FORMAT.numeric},
            pid: {formattype: ENUM.FORMAT.decimal},
            pid_excel: {formattype: ENUM.FORMAT.decimal},
            pidx: {formattype: ENUM.FORMAT.numeric},
            probabilidad: {},
            iid: {formattype: ENUM.FORMAT.decimal},
            iidx: {formattype: ENUM.FORMAT.numeric},
            impacto: {},
            nivel_riesgo: {},
            nivel_riesgo_v: {formattype: ENUM.FORMAT.decimal},
            color: {formattype: ENUM.FORMAT.color,sortable: false},
            control: {},
            control_excel: {},
            responsable: {},
            efectividad_sum: {formattype: ENUM.FORMAT.numeric},
            efectividad_sum_excel: {formattype: ENUM.FORMAT.decimal},
            efectividad: {formattype: ENUM.FORMAT.decimal},
            efectividad_excel: {formattype: ENUM.FORMAT.decimal},
            residual: {formattype: ENUM.FORMAT.decimal}
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'institucion',
                'base': 'institucion',
                'field': 'id',
                'columns': ['id', 'name']
            }]
    }
});
//modify methods that existing option
//CRUD_vw_resultante_proceso.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_resultante_proceso.table.options[0].menus.push({
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