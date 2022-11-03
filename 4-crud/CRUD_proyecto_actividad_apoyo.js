CRUD_proyecto_actividad_apoyo = {};
DSON.keepmerge(CRUD_proyecto_actividad_apoyo, CRUDDEFAULTS);
DSON.keepmerge(CRUD_proyecto_actividad_apoyo, {
    table: {
        width: "width:2000px;",
        view: 'vw_proyecto_actividad_apoyo',
        //method: 'proyecto_actividad_apoyo',
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
            descripcion: {},
            departamento: {
                label: function (){
                    return "Departamento"
                }
            },
            estatus: {
                label: function (){
                    return "Estatus"
                }
            },
            fecha_inicio: {
                label: function (){
                    return "Fecha Inicio"
                },
                formattype: ENUM.FORMAT.date
            },
            fecha_fin: {
                label: function (){
                    return  "Fecha Fin"
                },
                formattype: ENUM.FORMAT.date
            },
            responsable: {
                label: function (){
                    return  "Responsable"
                },
            },
            archivos: {
                label: function () {
                    return "Documento Adjunto"
                },
                // click: function (d,d2,d3) {
                //     console.log(d,d2,d3,"xc");
                //     if(data.row.estatus == "Completado"){
                //         vw_proyecto_item_actividad.setPermission("file.upload",false);
                //         vw_proyecto_item_actividad.setPermission("file.remove",false);
                //     } else {
                //         vw_proyecto_item_actividad.setPermission("file.upload",true);
                //         vw_proyecto_item_actividad.setPermission("file.remove",true);
                //     }
                //     // if (typeof vw_proyecto_item_actividad !== 'null'){
                //     //     if (vw_proyecto_item_actividad){
                //             var info = vw_proyecto_item_actividad.fileSI.filter(data2 => {
                //                 return data2.id == data.row.id;
                //             });
                //             console.log("klk",info);
                //             if(info.length){
                //                 var root = DSON.template( "/vw_proyecto_item_actividad/actividadfile/"+data.row.id, data.row);
                //                 baseController.viewData = {
                //                     root: root,
                //                     scope: 'vw_proyecto_item_actividad',
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
                    if (typeof proyecto_actividad_apoyo !== 'null') {
                        if (proyecto_actividad_apoyo) {
                            if (proyecto_actividad_apoyo.fileSI) {
                                var info = proyecto_actividad_apoyo.fileSI.filter(data => {
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
                }
            },
        },
        filters: {
            columns: true
        },
    }
});
//modify methods that existing option
//CRUD_proyecto_actividad_apoyo.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_proyecto_actividad_apoyo.table.options[0].menus.push({
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