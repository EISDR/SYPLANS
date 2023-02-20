CRUD_vw_procesos_v2 = {};
DSON.keepmerge(CRUD_vw_procesos_v2, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_procesos_v2, {
    table: {
        width: "width:2000px;",
        view: 'vw_procesos',
        //method: 'vw_procesos_v2',
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
            procesos_categoria_nombre: {
                label: function () {
                    return "Macroproceso"
                },
                sortable: false
            },
            codigor: {
                label: function () {
                    return "Código"
                },
                format: (row) => {
                    return baseController.COD("Módulo de Calidad -> Procesos", row.id, row.fecha_solicitud);
                },
                sortable: false
            },
            nombre: {},
            descripcion: {shorttext: 360},
            responsable_nombre: {
                label: function () {
                    return "Responsable";
                }
            },
            estatus: {
                label: function () {
                    return "Estado";
                }
            },
            objetivo: {
                label: function () {
                    return "Objetivos"
                },
                shorttext: 360
            },
            alcance: {
                label: function () {
                    return "Alcance"
                },
                shorttext: 360
            },
            recursos: {
                label: function () {
                    return "Recursos (Humanos, Tecnológicos, etc)"
                },
                shorttext: 360
            },
            archivo: {
                label: function () {
                    return "Imagen Adjunta"
                },
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
                    if (typeof vw_procesos_v2 !== 'null') {
                        if (vw_procesos_v2) {
                            var info = vw_procesos_v2.fileSI.filter(data => {
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
            proc_ele: {
                label: function () {
                    return "Elementos del Proceso"
                },
                export: false,
                exportExample: false,
            },
            doc_asoc: {
                label: function () {
                    return "Documentos Asociados"
                },
                export: false,
                exportExample: false,
            },
            proc_ind: {
                label: function () {
                    return "Indicadores del Proceso"
                },
                export: false,
                exportExample: false,
            },
            doc_asoc_exp: {
                label: function () {
                    return "Documentos Asociados"
                },
                visible: false,
                visibleDetail: false,
                export: true,
                exportExample: true,
                checkExport: true,
                dead: true
            }
        },
        filters: {
            columns: true
        },
    }
});
//modify methods that existing option
//CRUD_vw_procesos_v2.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_procesos_v2.table.options[0].menus.push({
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