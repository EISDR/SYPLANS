CRUD_vw_desempeno = {};
DSON.keepmerge(CRUD_vw_desempeno, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_desempeno, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_vw_desempeno',
        //method: 'vw_desempeno',
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
            poa_name: {link: {table: 'poa',from: 'poa'}},
            producto: {formattype: ENUM.FORMAT.numeric},
            nombre: {},
            fecha_inicio: {formattype: ENUM.FORMAT.date},
            fecha_fin: {formattype: ENUM.FORMAT.date},
            responsable_name: {link: {table: 'responsable',from: 'responsable'}},
            presupuesto: {formattype: ENUM.FORMAT.decimal},
            completa: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            comentario: {shorttext: 360},
            razon_name: {link: {table: 'razon',from: 'razon'}},
            estatus: {formattype: ENUM.FORMAT.numeric},
            created_at: {visible: false,visibleDetail: false,export: false,exportExample: false},
            updated_at: {visible: false,visibleDetail: false,export: false,exportExample: false},
            deleted_at: {visible: false,visibleDetail: false,export: false,exportExample: false},
            created_by: {visible: false,visibleDetail: false,export: false,exportExample: false},
            updated_by: {visible: false,visibleDetail: false,export: false,exportExample: false},
            deleted_by: {visible: false,visibleDetail: false,export: false,exportExample: false},
            originalid: {formattype: ENUM.FORMAT.numeric},
            departamento_name: {link: {table: 'departamento',from: 'departamento'}},
            tipo_inversion_name: {link: {table: 'tipo_inversion',from: 'tipo_inversion'}},
            maneja_presupuesto: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            order_at: {formattype: ENUM.FORMAT.numeric},
            calificacion: {},
            presupuesto_proyectado: {formattype: ENUM.FORMAT.numeric},
            cantidad_completa: {formattype: ENUM.FORMAT.numeric}
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'poa',
                'base': 'poa',
                'field': 'id',
                'columns': ['id', 'name']
            },

            {
                'table': 'responsable',
                'base': 'responsable',
                'field': 'id',
                'columns': ['id', 'name']
            },

            {
                'table': 'razon',
                'base': 'razon',
                'field': 'id',
                'columns': ['id', 'name']
            },

            {
                'table': 'departamento',
                'base': 'departamento',
                'field': 'id',
                'columns': ['id', 'name']
            },

            {
                'table': 'tipo_inversion',
                'base': 'tipo_inversion',
                'field': 'id',
                'columns': ['id', 'name']
            }]
    }
});
//modify methods that existing option
//CRUD_vw_desempeno.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_desempeno.table.options[0].menus.push({
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