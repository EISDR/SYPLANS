CRUD_vw_correctiva = {};
DSON.keepmerge(CRUD_vw_correctiva, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_correctiva, {
    table: {
        width: "width:1800px;",
        //view: 'vw_vw_correctiva',
        //method: 'vw_correctiva',
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
                dead: true,
            },
            proceso_nombre: {
                label: () => {
                    return "Proceso"
                }
            },
            doc_nombre: {
                label: () => {
                    return "Documento"
                }
            },
            descripcion: {
                label: () => {
                    return "Punto Auditado"
                },
                click: function (e){
                    $(document).bind("contextmenu",function(e){
                        return false;
                    });
                },
                shorttext: 360
            },
            observaciones: {
                label: () => {
                    return "Observación"
                },
                shorttext: 360
            },
            tipo_inconformidad_nombre: {
                label: () => {
                    return "Tipo de hallazgo"
                },
                shorttext: 360
            },
            condition: {
                export: true,
                label: "Condición",
                format: function (row) {
                    var nom = row.condition;
                    $(`.Retrazado`).css('background', '#FF0000');
                    $(`.Enejecucion`).css('background', '#5de362');
                    $(`.Finalizado`).css('background', '#548235');
                    $(`.Pendiente`).css('background', '#CECECE');
                    return `<div title="${row.condition.replaceAll('Ninguno', 'Ninguna Condición')}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },

            archivo: {
                label: function () {
                    return "Evidencia"
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
                // }
                format: function (row) {
                    if (typeof vw_correctiva !== 'null') {
                        if (vw_correctiva) {
                            var info = vw_correctiva.fileSI.filter(data => {
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
            acciones_correctivas: {
                label: () => {
                    return "Acciones de Mejora"
                },
                format: (row) => {
                    if (row.acciones_correctivas)
                        return DSON.ULALIA((row.acciones_correctivas || '').split(' | '))
                    return "";
                }
            }
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
CRUD_vw_correctiva.table.options = [{
    text: (data) => {
        return "Trabajar";
    },
    title: (data) => {
        return "Asignar acciones preventivas y correctivas.";
    },
    icon: (data) => {
        return "cog2";
    },
    permission: (data) => {
        return 'edit';
    },
    characterist: (data) => {
        return "";
    },
    show: function (data) {
        return true;
    },
    click: function (data) {
        console.log(data);

        if (data.row) {
            if (data.row.id) {
                SWEETALERT.loading({message: "Cargando Acciones Correctivas"});
                auditoria_programa_plan = {
                    documento: {
                        id: data.row.doc_id
                    }
                };

                auditoria_programa_plan_documentos_asociados_listaverificacion.alterform = "correctiva";
                auditoria_programa_plan_documentos_asociados_listaverificacion.doc_nombre = data.row.doc_nombre;
                auditoria_programa_plan_documentos_asociados_listaverificacion.proceso_nombre = data.row.proceso_nombre;
                auditoria_programa_plan_documentos_asociados_listaverificacion.refresh = () => {

                };
                auditoria_programa_plan_documentos_asociados_listaverificacion.formulary({
                    where: [{
                        field: "id",
                        value: data.row.id
                    }]
                }, FORM.modes.edit, {});
                auditoria_programa_plan_documentos_asociados_listaverificacion.form.titles = {
                    new: "Nueva - Lista de Verificación",
                    edit: `Asignar Acciones de Mejora a la auditoría "${data.row.plan_nombre}"`,
                    view: "Ver ALL - Lista de Verificación"
                };
                auditoria_programa_plan_documentos_asociados_listaverificacion.triggers.table.after.update = function (data) {
                    vw_correctiva.refresh();
                };
                SWEETALERT.stop();
            }
        }
        return false;
    }
}];
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_correctiva.table.options[0].menus.push({
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
