CRUD_vw_estrategia_pesta = {};
DSON.keepmerge(CRUD_vw_estrategia_pesta, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_estrategia_pesta, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_estrategia_pesta',
        //method: 'vw_estrategia_pesta',
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
            no_eje: {
                label: "No.",
                sorttype: "numeric",
                class: "text-left"
            },
            eje_estrategico:{
                label: "Eje Estratégico",
                shorttext: 370
            },
            no_objetivo: {
                label: "No.",
                class: "text-left",
            },
            objetivo_estrategico:{
                label: "Objetivo Estratégico",
                shorttext: 370
            },
            no_estrategia: {
                label: "No.",
                class: "text-left"
            },
            estrategia:{
                label: "Estrategia",
                shorttext: 370
            },
            resultados_esperados:{
                label: "Resultados Esperados",
                shorttext: 370
            }
            // type: {formattype: ENUM.FORMAT.numeric},
            // descripcion: {shorttext: 360},
            // pei: {}
        },
        filters: {
            columns: [
                {
                    key: 'no_eje',
                    label: 'No. Eje estratégico',
                    type: FILTER.types.integer,
                    placeholder: 'No. Eje estratégico',
                    maxlength: 15
                },
                {
                    key: 'no_objetivo',
                    label: 'No. Objetivo',
                    type: FILTER.types.integer,
                    placeholder: 'No. Objetivo',
                    maxlength: 15
                },
                {
                    key: 'no_estrategia',
                    label: 'No. Estrategia',
                    type: FILTER.types.integer,
                    placeholder: 'No. Estrategia',
                    maxlength: 15
                },
                {
                    key: 'estrategia',
                    label: 'Estrategia',
                    type: FILTER.types.string,
                    placeholder: 'Estrategia',
                    maxlength: 255
                },
                {
                    key: 'eje_estrategico_id',
                    label: 'Eje Estratégico',
                    type: FILTER.types.relation,
                    table: 'eje_estrategico',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [{
                            "field": "pei",
                            "value": new SESSION().current() ? new SESSION().current().pei_id : -1
                        }],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'objetivo_estrategico_id',
                    label: 'Objetivo Estratégico',
                    type: FILTER.types.relation,
                    table: 'vw_objetivo_estrategico',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [{
                            "field": "pei_id" +
                                "",
                            "value": new SESSION().current() ? new SESSION().current().pei_id : -1
                        }],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'resultados_esperados',
                    label: 'Resultado Esperado',
                    type: FILTER.types.string,
                    placeholder: 'Resultado Esperado'
                },

            ]
        }
    }
});
//modify methods that existing option
//CRUD_vw_estrategia_pesta.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_estrategia_pesta.table.options[0].menus.push({
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