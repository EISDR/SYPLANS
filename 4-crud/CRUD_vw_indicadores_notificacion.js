CRUD_vw_indicadores_notificacion = {};
DSON.keepmerge(CRUD_vw_indicadores_notificacion, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_indicadores_notificacion, {
    table: {
        width: "height:15%; margin-bottom: 40px !important; ",
        //view: 'vw_vw_indicadores_notificacion',
        //method: 'vw_indicadores_notificacion',
        //limits: [10, 50, 100, 0],
        report: true,
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
                exportExample: false
            },
            indicador: {},
            flecha: {
                label: function () {
                    return "Dirección Meta"
                },
                anonymous: true,
                format: function (row) {
                    if (row.cumplidor)
                        if (row.cumplidor.general)
                            if (row.cumplidor.general[0])
                                if (row.cumplidor.general[0].direccionMeta)
                                    if (row.cumplidor.general[0].direccionMeta[0])
                                        if (row.cumplidor.general[0].direccionMeta[0].nombre)
                                            if (row.cumplidor.general[0].direccionMeta[0].nombre)
                                                return row.cumplidor.general[0].direccionMeta[0].nombre;
                }
            },
            acumulado: {
                label: function () {
                    return "Proyectado"
                },
                format: function (row) {
                    if (row.cumplidor)
                        if (row.cumplidor.general)
                            if (row.cumplidor.general[0])
                                if (row.cumplidor.general[0].sumas)
                                    if (row.cumplidor.general[0].sumas.formatedSumMeta)
                                        return row.cumplidor.general[0].sumas.formatedSumMeta;
                },
                sorttype: "numeric",
                // formattype: ENUM.FORMAT.numeric
            },
            alcanzado: {
                label: "Alcanzada",
                sorttype: "numeric",
                format: function (row) {
                    if (row.cumplidor)
                        if (row.cumplidor.general)
                            if (row.cumplidor.general[0])
                                if (row.cumplidor.general[0].sumas)
                                    if (row.cumplidor.general[0].sumas.formatedSumAlcanzada)
                                        return row.cumplidor.general[0].sumas.formatedSumAlcanzada;
                },
                // formattype: ENUM.FORMAT.numeric
            },
            cumplimiento: {
                format: function (row) {
                    let ponderacion = "";
                    let clase = "";
                    if (row.cumplidor) {
                        if (row.cumplidor.ponderacion)
                            if (row.cumplidor.ponderacion.titulo) {
                                ponderacion = row.cumplidor.ponderacion.titulo;
                                clase = `text_${row.cumplidor.ponderacion.id}`;
                            }
                        if (row.cumplidor.cumplimiento)
                            return `<span class="${clase}" title="${ponderacion}">${row.cumplidor.cumplimiento}%</span>`;
                    }
                },
                sortable: false
            },
            detalle: {
                label: function () {
                    return "Acciones"
                },
                format: function (row) {
                    return `<a class="ng-binding" title="Ver Detalle" data-action="Ver">
			<i class="icon-eye "></i>
		</a>`
                },
                click: function (data) {
                    if (data.row.cumplidor)
                        if (data.row.cumplidor.ficha) {
                            data.$scope.FICHA = data.row.cumplidor.ficha.FICHA;
                            data.$scope.modal.modalView("aacontroldemando/fichaindicador", {
                                header: {
                                    title: data.row.indicador,
                                },
                                footer: {
                                    cancelButton: true
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`
                                },
                            });
                        }
                }
            }
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_vw_indicadores_notificacion.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_indicadores_notificacion.table.options[0].menus.push({
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
