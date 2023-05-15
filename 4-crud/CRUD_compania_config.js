CRUD_compania_config = {};
DSON.keepmerge(CRUD_compania_config, CRUDDEFAULTS);
DSON.keepmerge(CRUD_compania_config, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_compania_config',
        //method: 'compania_config',
        //limits: [10, 50, 100, 0],
        //report: true,
        batch: false,
        //persist: false,
        sort:"compania_id",
        order:"compania_id",
        sortable: false,
        //dragrow: 'num',
        //rowStyle: function (row, $scope) {
        //    return "color:red;";
        //},
        //rowClass: function (row, $scope) {
        //    return row.name === 'whatever' ? "bg-" + COLOR.danger + "-300" : "";
        //},
        //activeColumn: "active",
        key: 'compania_id',
        deletekeys: ['compania_id'],
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
            compania_id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            pacc: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            institucional: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            sectorial: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            ods: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            estatus_productoXactividades: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            notificaciones_correo: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            notificaciones_push: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            planificacion: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            asignaciones_especiales: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            ipn: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            calidad: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            proyectos_especiales: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            gestion_indicadores: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            riesgo_var: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            riesgo_amfe: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            plan_accion: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            salidas: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            servicio: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            documentos_externos: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            formularios: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            reporte_configurable: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            plantillas_ods: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            import_masivo: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            historial_acceso: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            mesa_ayuda: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            repositorio_archivos: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            interfaces: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            color_principal: {formattype: ENUM.FORMAT.color, sortable: false},
            color_secundario: {formattype: ENUM.FORMAT.color, sortable: false},
            dias_de_gracia: {formattype: ENUM.FORMAT.numeric},
            hora_notificacion: {},
            onesignal_key: {},
            onesignal_appauth: {},
            onesignal_appid: {},
            carga_evidencia_abierta: {},
            smtp_host: {},
            smtp_port: {},
            smtp_ssl: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool},
            smtp_email: {},
            smtp_password: {formattype: ENUM.FORMAT.password},
            smtp_sender: {},
            smtp_sender_name: {}
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_compania_config.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_compania_config.table.options[0].menus.push({
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