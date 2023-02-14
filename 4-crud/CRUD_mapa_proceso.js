CRUD_mapa_proceso = {};
DSON.keepmerge(CRUD_mapa_proceso, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mapa_proceso, {
    table: {
        //width: "width:3000px;",
        view: 'vw_mapa_proceso',
        //method: 'mapa_proceso',
        //limits: [10, 50, 100, 0],
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
            nombre: {},
            descripcion: {shorttext: 360},
            ano: {
                label: function() {
                    return "Año"
                }
            },
            estatus_nombre: {
                label: function() {
                    return "Estatus"
                }
            }
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_mapa_proceso.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
CRUD_mapa_proceso.table.options.push({
    title: (data) => {
        return "Ver datos del Mapa de procesos";
    },
    icon: (data) => {
        return "list";
    },
    characterist: (data) => {
        return "";
    },
    show: function (data) {
        return true;
    },
    click: function (data) {
        //extra function
        mapa_proceso.dataForView = data.row;
        mapa_proceso.modal.modalView("mapa_proceso/view_procesos", {

            width: 'modal-full',
            header: {
                title: `Ver datos del Mapa de procesos: "${data.row.nombre}" `,
                icon: "list"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'mapa_proceso'
            },
            event: {
                // show: {
                //     begin: function (data) {
                //
                //     },
                //     end: async function (eData) {
                //
                //     }
                // },
                // hide: {
                //     begin: function (data) {
                //
                //     },
                //     end: function (data) {
                //     }
                // }
            },
        });
        return false;
    }
});
// CRUD_riesgo_historico.table.options.push({
//     title: (data) => {
//         return "Ver lista de Auditorías";
//     },
//     icon: (data) => {
//         return "list";
//     },
//     characterist: (data) => {
//         return "";
//     },
//     show: function (data) {
//         return true;
//     },
//     click: function (data) {
//         //extra function
//         riesgo_historico.dataForView = data.row;
//         riesgo_historico.modal.modalView("riesgo_historico/view_matrices", {
//
//             width: 'modal-full',
//             header: {
//                 title: `Ver matrices de riesgo de la gestión: "${data.row.nombre}" `,
//                 icon: "list"
//             },
//             footer: {
//                 cancelButton: false
//             },
//             content: {
//                 loadingContentText: MESSAGE.i('actions.Loading'),
//                 sameController: 'riesgo_historico'
//             },
//             event: {
//                 // show: {
//                 //     begin: function (data) {
//                 //
//                 //     },
//                 //     end: async function (eData) {
//                 //
//                 //     }
//                 // },
//                 // hide: {
//                 //     begin: function (data) {
//                 //
//                 //     },
//                 //     end: function (data) {
//                 //     }
//                 // }
//             },
//         });
//         return false;
//     }
// });