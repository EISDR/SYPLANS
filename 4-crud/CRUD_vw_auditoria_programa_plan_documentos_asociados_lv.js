CRUD_vw_auditoria_programa_plan_documentos_asociados_lv = {};
DSON.keepmerge(CRUD_vw_auditoria_programa_plan_documentos_asociados_lv, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_auditoria_programa_plan_documentos_asociados_lv, {
    table: {
        width: "width:1800px;",
        //view: 'vw_vw_auditoria_programa_plan_documentos_asociados_lv',
        //method: 'vw_auditoria_programa_plan_documentos_asociados_lv',
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
            programa_plan_nombre: {
                label: function () {
                    return "Auditoría"
                }
            },
            proceso_nombre: {
                label: function () {
                    return "Proceso"
                }
            },
            programa_plan_documentos_asociados_nombre: {
                label: function () {
                    return "Documento Asociado"
                }
            },
            descripcion: {
                label: function () {
                    return "Punto de Verificación"
                },
                shorttext: 360
            },
            cumple: {
                label: function () {
                    return "¿Cumple?"
                },
                visible: true,
                sorttype: ENUM.FORMAT.bool,
                formattype: ENUM.FORMAT.bool
            },
            observaciones: {},
            tipo_inconformidad_nombre: {
                label: function () {
                    return "Tipo de hallazgo"
                }
            },
            archivo: {
                label: function () {
                    return "Documento Adjunto"
                },
                export: false,
                exportExample: false,
                // click: function (d,d2,d3) {
                //     console.log(d,d2,d3,"xc");
                //     if(data.row.estatus == "Completado"){
                //         actividades_poa_monitoreo.setPermission("file.upload",false);
                //         actividades_poa_monitoreo.setPermission("file.remove",false);
                //     } else {
                //         actividades_poa_monitoreo.setPermission("file.upload",true);
                //         actividades_poa_monitoreo.setPermission("file.remove",true);
                //     }
                //     // if (typeof actividades_poa_monitoreo !== 'null'){
                //     //     if (actividades_poa_monitoreo){
                //             var info = actividades_poa_monitoreo.fileSI.filter(data2 => {
                //                 return data2.id == data.row.id;
                //             });
                //             console.log("klk",info);
                //             if(info.length){
                //                 var root = DSON.template( "/actividades_poa_monitoreo/actividadfile/"+data.row.id, data.row);
                //                 baseController.viewData = {
                //                     root: root,
                //                     scope: 'actividades_poa_monitoreo',
                //                     maxsize: 20,
                //                     maxfiles: 1,
                //                     acceptedFiles: null,
                //                     columns: 1,
                //                 };
                //
                //                 data.$scope.modal.modalView("templates/components/gallery", {
                //                     width: 'modal-full',
                //                     header: {
                //                         title: MESSAGE.ic("mono.files"),
                //                         icon: "file-eye"
                //                     },
                //                     footer: {
                //                         cancelButton: false
                //                     },
                //                     content: {
                //                         loadingContentText: MESSAGE.i('actions.Loading')
                //                     },
                //                 });
                //             }
                //     //     }
                //     // }
                // },
                format: function (row) {
                    if (typeof vw_auditoria_programa_plan_documentos_asociados_lv !== 'null') {
                        if (vw_auditoria_programa_plan_documentos_asociados_lv) {
                            var info = vw_auditoria_programa_plan_documentos_asociados_lv.fileSI.filter(data => {
                                return data.id == row.id;
                            });
                            if (info.length) {
                                return "<a title='Ver imagen'><i class='icon-files-empty'></i></a>";

                            } else {
                                return '';
                            }
                        }

                    }
                }
            },
        },
        filters: {
            columns: true
        },
    }
});
//modify methods that existing option
//CRUD_vw_auditoria_programa_plan_documentos_asociados_lv.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_auditoria_programa_plan_documentos_asociados_lv.table.options[0].menus.push({
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