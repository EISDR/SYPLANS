CRUD_mi_asignacion_especial_poa = {};
DSON.keepmerge(CRUD_mi_asignacion_especial_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mi_asignacion_especial_poa, {
    table: {
        engine: 'my',
        width: 'width:2400px;',
        view: 'vw_asignacion_especial',
        sort: "id",
        order: "desc",
        batch: false,
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            nombre: {
                shorttext: 370
            },
            descripcion: {
                shorttext: 370
            },
            departamento_solicitante: {
                shorttext: 370
            },
            departamento_solicitado: {
                shorttext: 370
            },
            responsable: {
                shorttext: 370
            },
            fecha_inicio: {
                sorttype: "time",
                formattype: "date"
            },
            fecha_fin: {
                sorttype: "time",
                formattype: "date"
            },
            estatus: {
                shorttext: 370,
            },
            comentario: {
                shorttext: 370
            },
            razon: {
                shorttext: 370
            },
            archivo: {
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
                    if (typeof mi_asignacion_especial_poa !== 'null') {
                        if (mi_asignacion_especial_poa) {
                            var info = mi_asignacion_especial_poa.fileSI.filter(data => {
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
        allow: {
            menu: true,
            add: true,
            edit: true,
            view: true,
            remove: true,
            active: false,
            filter: true,
            import: false,
            copy: true,
            export: {
                Clipboard: true,
                PDF: true,
                CSV: true,
                XLS: true,
                DOC: true
            },
            actions: true,
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    return MESSAGE.i('actions.Edit') + ", " +
                        MESSAGE.i('actions.View') + ", " +
                        MESSAGE.i('actions.Remove');
                },
                icon: (data) => {
                    return "cog2";
                },
                show: function(){
                  return false;
                },
                permission: (data) => {
                    return ['edit', 'remove', 'active', 'view', 'copy'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [

                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Remove');
                        },
                        icon: (data) => {
                            return "trash";
                        },
                        permission: (data) => {
                            return 'remove';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: (data) =>{
                            return (data.row.poa_estado != ENUM_2.poa_estatus.Cerrado && data.row.estatus_presupuesto_id != ENUM_2.presupuesto_estatus.Completo);
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: async function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                    data.$scope.deleteRow(data.row).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        }
                    },

                ]
            },
            {
                text: (data) => {
                    return MESSAGE.i('actions.View');
                },
                title: (data) => {
                    return MESSAGE.i('actions.View');
                },
                icon: (data) => {
                    return "eye";
                },
                permission: (data) => {
                    return 'view';
                },
                characterist: (data) => {
                    return "";
                },
                click: function (data) {
                    if (!DSON.oseaX(data.row)) {
                        data.$scope.dataForView = data.row;
                        data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                            header: {
                                title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
                                icon: "user"
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                sameController: true
                            },
                        });
                    }
                }
            },
            {
                text: (data) => {
                    return MESSAGE.i('planificacion.titleTrabajar');
                },
                title: (data) => {
                    return MESSAGE.i('planificacion.titleTrabajar');
                },
                icon: (data) => {
                    return "hammer-wrench";
                },
                permission: (data) => {
                    return 'work';
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    if (typeof mi_asignacion_especial_poa !== "undefined")
                        return mi_asignacion_especial_poa.allowAction("Trabajar", "asignacion_especial_poa_monitoreo", data.row.estatus_id) && (new SESSION().current().est_poa !== ENUM_2.poa_estatus.Cerrado);
                },
                click: function (data) {
                    mi_asignacion_especial_poa.my_true_estatus = data.row.estatus_id;
                    mi_asignacion_especial_poa.modalAction('asignacion_especial_poa_monitoreo', MESSAGE.i('planificacion.titleAsignacionEspecialTrabajar'), 'pencil5', 'edit', data.row.id);
                    return false;
                }
            },
            {
                text: (data) => {
                    return MESSAGE.i('actions.audit');
                },
                title: (data) => {
                    return MESSAGE.i('actions.audit');
                },
                permission: (data) => {
                    return 'audit';
                },
                icon: (data) => {
                    return "stack-text";
                },
                characterist: (data) => {
                    return "";
                },
                click: function (data) {
                    if (!DSON.oseaX(data.row)) {
                        data.$scope.dataForView = data.row;
                        data.$scope.modal.modalView(String.format("{0}/audit", data.$scope.modelName), {
                            header: {
                                title: MESSAGE.i('mono.auditof') + " " + data.$scope.plural,
                                icon: "user"
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                sameController: true
                            },
                        });
                    }
                }
            }
        ]
    }
});