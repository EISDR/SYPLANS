CRUD_vw_documentos_asociados_pv = {};
DSON.keepmerge(CRUD_vw_documentos_asociados_pv, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_documentos_asociados_pv, {
    table: {
        width: "width:2000px;",
        view: 'vw_documentos_asociados',
        //method: 'vw_documentos_asociados_pv',
        limits: [0],
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
            nombre_mapa: {
                label: function (){
                    return "Macroproceso"
                }
            },
            nombre_proceso: {
                label: function (){
                    return "Subproceso"
                }
            },
            codigo: {
                label: function (){
                    return "Código"
                }
            },
            nombre: {
                label: function (){
                    return "Nombre del Documento"
                }
            },
            tipo_documento_c: {
                label: function (){
                    return "Tipo de Documento"
                },
                format: function (row){
                    return row.tipo_documento
                }
            },
            departamento_responsable_proceso: {
                label: function (){
                    return "Área/Departamento"
                }
            },
            estatus: {
                label: function (){
                    return "Estatus"
                }
            },
            responsable_proceso: {
                label: function (){
                    return "Responsable del Proceso"
                }
            },
            aprobado_en: {
                label: function (){
                    return "Fecha de Autorización"
                },
                formattype: ENUM.FORMAT.datetime
            },
            folder: {
                label: function (){
                    return "Ubicación"
                }
            }
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_vw_documentos_asociados_pv.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_documentos_asociados_pv.table.options[0].menus.push({
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