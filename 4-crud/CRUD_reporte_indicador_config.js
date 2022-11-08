CRUD_reporte_indicador_config = {};
DSON.keepmerge(CRUD_reporte_indicador_config, CRUDDEFAULTS);
DSON.keepmerge(CRUD_reporte_indicador_config, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_reporte_indicador_config',
        //method: 'reporte_indicador_config',
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
            orden: {formattype: ENUM.FORMAT.numeric},
            titulo: {
                label: function(){
                    return "Título"
                }
            },
            tipo_meta: {
                label: function(){
                    return "Tipo de meta"
                }
            },
            color: {
                export: true,
                exportExample: false,
                label: "Color",
                format: function (row) {
                    $(`.riesgo_resultado_colorbaba` + row.id).css('background', row.color);
                    return `<div   class='${`riesgo_resultado_colorbaba` + row.id} shape_element_left'> </div>`;
                }
            },
            from: {
                label: function(){
                    return "Valor desde"
                },
                formattype: ENUM.FORMAT.numeric
            },
            to: {
                label: function(){
                    return "Valor hasta"
                },
                formattype: ENUM.FORMAT.numeric
            },
        },
        filters: {
            columns: [
                {
                    key: 'orden',
                    label: 'Orden',
                    type: FILTER.types.integer,
                    placeholder: 'Orden',
                    maxlength: 15
                },
                {
                    key: 'titulo',
                    label: function(){ return 'Título'},
                    type: FILTER.types.string,
                    placeholder: 'Título'
                },
                {
                    key: 'tipo_meta',
                    label: function(){ return 'Tipo de meta'},
                    type: FILTER.types.relation,
                    table: 'tipoMeta',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'from',
                    label: function(){ return 'Valor desde'},
                    type: FILTER.types.integer,
                    placeholder: 'Valor desde',
                    maxlength: 15
                },
                {
                    key: 'to',
                    label: function(){ return 'Valor hasta'},
                    type: FILTER.types.integer,
                    placeholder: 'Valor hasta',
                    maxlength: 15
                },
            ]
        }
    }
});
//modify methods that existing option
//CRUD_reporte_indicador_config.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_reporte_indicador_config.table.options[0].menus.push({
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