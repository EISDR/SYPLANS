CRUD_reporte_tipometa_formula = {};
DSON.keepmerge(CRUD_reporte_tipometa_formula, CRUDDEFAULTS);
DSON.keepmerge(CRUD_reporte_tipometa_formula, {
    table: {
        width: "width:3000px;",
        //view: 'vw_reporte_tipometa_formula',
        //method: 'reporte_tipometa_formula',
        //limits: [10, 50, 100, 0],
        //report: true,
        batch: false,
        persist: false,
        sortable: false,
        piemessage: false,
        fixheader: true,

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
            tipo_meta: {
                label: () => {
                    return "Tipo Meta"
                },
                format: (row) => {
                    let item = baseController.session.tipoMenta.filter(d => d.id == row.tipo_meta)[0];
                    return (item || {}).nombre || "General";
                },
                rowspan: function (index, list, category) {
                    if (category === "span")
                        return reporte_tipometa_formula.sp_('d.tipo_meta', index, list);
                    if (category === "seeme")
                        return reporte_tipometa_formula.sm_('d.tipo_meta', index, list);
                }
            },
            direccion_meta: {
                label: () => {
                    return "Dirección de la Meta"
                },
                format: (row) => {
                    let item = baseController.session.direccionMeta.filter(d => d.id == row.direccion_meta)[0];
                    return (item || {}).nombre || "General";
                }
            },
            formula: {
                label: () => {
                    return "Fórmula por periodo"
                },
                format: (row) => {
                    return reporte_tipometa_formula.progToNormal(row.formula);
                }
            },
            formato: {
                label: () => {
                    return "Formato del Periodo"
                },
                format: (row) => {
                    return reporte_tipometa_formula.progToNormal(row.formato);
                }
            },
            sumformula: {
                label: () => {
                    return "Fórmula al Sumar"
                },
                format: (row) => {
                    return reporte_tipometa_formula.progToNormal(row.sumformula);
                }
            },
            sumformato: {
                label: () => {
                    return "Formato de la Suma"
                },
                format: (row) => {
                    return reporte_tipometa_formula.progToNormal(row.sumformato);
                }
            },
            varianzaformula: {
                label: () => {
                    return "Fórmula de la varianza"
                },
                format: (row) => {
                    return reporte_tipometa_formula.progToNormal(row.varianzaformula);
                }
            },
            porcentaje: {
                label: () => {
                    return "Formula del cumplimiento(Porcentaje)"
                },
                format: (row) => {
                    return reporte_tipometa_formula.progToNormal(row.porcentaje);
                }
            }
        },
        filters: {
            columns: true
        },
        // single: [
        //     {
        //         'table': 'ods',
        //         'base': 'ods',
        //         'field': 'id',
        //         'columns': ['id', 'edt', 'nombre']
        //     }]

    }
});
//modify methods that existing option
//CRUD_reporte_tipometa_formula.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_reporte_tipometa_formula.table.options[0].menus.push({
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