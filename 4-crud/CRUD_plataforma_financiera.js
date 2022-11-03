CRUD_plataforma_financiera = {};
DSON.keepmerge(CRUD_plataforma_financiera, CRUDDEFAULTS);
DSON.keepmerge(CRUD_plataforma_financiera, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_plataforma_financiera',
        //method: 'plataforma_financiera',
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
            actividades_poa_name: {link: {table: 'actividades_poa',from: 'actividades_poa'}},
            centro_costo_name: {link: {table: 'centro_costo',from: 'centro_costo'}},
            estructura_programatica_name: {link: {table: 'estructura_programatica',from: 'estructura_programatica'}},
            cuenta_name: {link: {table: 'cuenta',from: 'cuenta'}}
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'actividades_poa',
                'base': 'actividades_poa',
                'field': 'id',
                'columns': ['id', 'name']
            },

            {
                'table': 'centro_costo',
                'base': 'centro_costo',
                'field': 'id',
                'columns': ['id', 'name']
            },

            {
                'table': 'estructura_programatica',
                'base': 'estructura_programatica',
                'field': 'id',
                'columns': ['id', 'name']
            },

            {
                'table': 'cuenta',
                'base': 'cuenta',
                'field': 'id',
                'columns': ['id', 'name']
            }]
    }
});
//modify methods that existing option
//CRUD_plataforma_financiera.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_plataforma_financiera.table.options[0].menus.push({
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