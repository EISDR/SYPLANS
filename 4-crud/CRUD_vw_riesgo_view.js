CRUD_vw_riesgo_view = {};
DSON.keepmerge(CRUD_vw_riesgo_view, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_riesgo_view, {
    table: {
        width: "width:3000px;",
        view: 'vw_riesgo',
        //method: 'vw_riesgo_view',
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
                exportExample: false,
                dead: true
            },
            riesgo_a_id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            riesgo_a: {
                label: function () {
                    return "Riesgo"
                }
            },
            registro: {
                label: "Registro",
            },
            descripcion: {shorttext: 360},
            probabilidad_nombre: {
                label: function () {
                    return "Probalidad"
                },
                format: function (row) {
                    return row.probabilidad_nombre + " - " + parseInt(row.probabilidad_valor) + "%";
                }
            },
            impacto_nombre: {
                label: function () {
                    return "Impacto"
                },
                format: function (row) {
                    return row.impacto_nombre + " - " + parseInt(row.impacto_valor) + "";
                }
            },
            nivel_riesgo_v: {
                label: function () {
                    return "Nivel de Riesgo"
                },
                format: function (row) {
                    $(`.maring-bottom`).css('margin-bottom', '0');
                    return `<div class="${row.nivel_riesgo}"><p class="maring-bottom">${row.nivel_riesgo}</p>(${parseFloat(row.nivel_riesgo_v).toFixed(2)})</div>`
                }
            },
            factor_riesgo: {
                label: function () {
                    return "Factor de Riesgo"
                }
            },
            causa_debilidad: {
                label: function () {
                    return "Causa o Debilidad"
                }
            },
            consecuencia: {
                label: function () {
                    return "Efecto"
                }
            },
            supuestos: {
                label: function () {
                    return "Supuestos"
                }
            },
            evaluacion: {
                label: function () {
                    return "Evaluación"
                }
            },
            estado: {
                label: function () {
                    return "Estatus"
                },
                export: true,
                format: function (row) {
                    var nom = row.estado;
                    $(`.Monitoreado`).css('background', '#FF0000');
                    $(`.NoMonitoreado`).css('background', '#548235');
                    $(`.PendienteaTrabajar`).css('background', '#CECECE');
                    return `<div title="${row.estado}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },
            riesgo_control: {
                label: function () {
                    return "Controles de Riesgo"
                },
                export: false,
                exportExample: false
            },
            riesgo_controls: {
                label: function () {
                    return "Controles de Riesgo"
                },
                visible: false,
                visibleDetail: false,
                export: true,
                exportExample: true,
                checkExport: true,
                dead: true
            },
            ocurrencia_nombre: {
                label: function () {
                    return "Ocurrencia del Riesgo"
                },
                export: true,
                format: function (row) {
                    var nom = row.ocurrencia_nombre;
                    $(`.ConOcurrencia`).css('background', '#e32619');
                    $(`.SinOcurrencia`).css('background', '#548235');
                    $(`.PendienteaTrabajarO`).css('background', 'none');
                    return `<div title="${row.ocurrencia_nombre}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_vw_riesgo_view.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_riesgo_view.table.options[0].menus.push({
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