CRUD_pacc_auditoria = {};
DSON.keepmerge(CRUD_pacc_auditoria, CRUDDEFAULTS);
DSON.keepmerge(CRUD_pacc_auditoria, {
    table: {
        //width: "width:3000px;",
        view: 'vw_pacc_auditoria',
        //method: 'pacc_auditoria',
        //limits: [10, 50, 100, 0],
        report: true,
        batch: false,
        persist: false,
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
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            // compania: {
            //     label: function () {
            //         return "Compañía"
            //     }
            // },
            pacc: {
                label: function () {
                    return "Código de Catálogo de Bienes y Servicios (CBS) - Descripción"
                },
                format: function (row) {
                    return row.pacc_departamental_detail;
                }
            },
            campo: {
                label: function () {
                    return "Campo"
                },
                format: function (row) {
                    return capitalize(row.campo.replaceAll('_', ' ').replaceAll('real', ' - valor').replaceAll('cantidad', ' - cantidad'));
                }
            },
            valoranterior: {
                label: function () {
                    return "Valor Anterior"
                }
            },
            valornuevo: {
                label: function () {
                    return "Valor Nuevo"
                }
            },
            cambiadoen: {
                formattype: ENUM.FORMAT.datetime, label: function () {
                    return "Fecha"
                }
            },
            completo: {
                label: function () {
                    return "Responsable"
                }
            }
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_pacc_auditoria.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_pacc_auditoria.table.options[0].menus.push({
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
