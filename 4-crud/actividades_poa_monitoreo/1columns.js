CRUD_actividades_poa_monitoreo = {};
DSON.keepmerge(CRUD_actividades_poa_monitoreo, CRUDDEFAULTS);
DSON.keepmerge(CRUD_actividades_poa_monitoreo, {
    table: {
        engine: 'my',
        width: 'width:2000px;',
        view: 'vw_actividades_poa_grid',
        method: "actividades_poa",
        sort: "departamento_nombre",
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            departamento: {
                sorttype: "numeric",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            departamento_nombre: {},
            no1: {
                label: "No.",
                shorttext: 30,
            },
            producto_nombre: {
                label: function() {
                    return new SESSION().current().tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto"
                },
                shorttext: 370
            },
            no2: {
                label: "No.",
                shorttext: 30,
            },
            actividad: {
                label: "Actividad",
                shorttext: 370
            },
            responsable: {
                label: "Responsable",
                shorttext: 370,
            },
            fecha_inicio: {
                label: "Fecha Inicio",
                sorttype: "date",
                formattype: "date",
            },
            fecha_fin: {
                label: "Fecha Fin",
                sorttype: "date",
                formattype: "date",
            },
            presupuesto: {
                label: "Presupuesto",
                formattype: "money",
                exportExample: "[money]",
                shorttext: 370,
            },
            presupuesto_consumido: {
                label: function() {
                    return "Presupuesto Consumido"
                },
                formattype: "money",
                exportExample: "[money]",
                shorttext: 370,
            },
            avance_porcentaje: {
                label: "Porcentaje de Avance",
                sorttype: "percentage",
                formattype: "percentage",
            },
            tipo_inversion: {
                label: function(){
                    return "Tipo de Inversión"
                },
                visible: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? false : true : false
            },
            biene_permiso: {
                label: function() {
                    return "Código de Bienes y Servicios"
                },
                visible: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? false : true : false
            },
            biene_permiso_nombre: {
                label: function() {
                    return "Descripcion de Bienes y Servicios"
                },
                visible: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? false : true : false
            },
            presupuestario: {
                label: function() {
                    return "Código del Clasificador Presupuestario"
                },
                visible: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? false : true : false
            },
            presupuestario_nombre: {
                label: function() {
                    return "Descripción del Clasificador Presupuestario"
                },
                visible: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? CONFIGCOMPANY.pacc == 1 ? false : true : false
            },
            comentario: {
                label: "Comentario",
                shorttext: 370,
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            razon_nombre: {
                label: function(){
                    return "Evaluación de cierre"
                },
                shorttext: 370,
            },
            estatus: {
                label: "Estatus",
                shorttext: 370
            },
            condition: {
                export: true,
                label: function(){
                    return "Condición de la actividad"
                },
                format: function (row) {
                    //
                    var nom = row.condition;
                    $(`.Vencida`).css('background', '#FF0000');
                    $(`.Enejecucion`).css('background', '#548235');
                    $(`.Planificada`).css('background', '#5F5FAF');
                    $(`.Ninguno`).css('background', '#CECECE');
                    return `<div title="${row.condition.replaceAll('Ninguno', 'Ninguna Condición')}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },
            presupuesto_restante: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            archivo: {
                label: function () {
                    return "Documento Adjunto"
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
                    if (typeof actividades_poa_monitoreo !== 'null') {
                        if (actividades_poa_monitoreo) {
                            var info = actividades_poa_monitoreo.fileSI.filter(data => {
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
            dpto_estatus: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            }
        },
        allow: {
            menu: true,
            add: false,
            edit: true,
            view: true,
            remove: false,
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
                    if (PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.view && PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.work) {
                        if ((data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Completada) && (data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Cancelada) && (data.row.dpto_estatus == ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('planificacion.titleTrabajar');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.view && PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.work) {
                        if ((data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Completada) && (data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Cancelada) && (data.row.dpto_estatus == ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('planificacion.titleTrabajar');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.work) {
                        if ((data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Completada) && (data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Cancelada) && (data.row.dpto_estatus == ENUM_2.presupuesto_estatus.Completo)) {
                            return '';
                        } else {
                            return MESSAGE.i('planificacion.titleTrabajar');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.view) {
                        if ((data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Completada) && (data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Cancelada) && (data.row.dpto_estatus == ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.view && PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.work) {
                        if ((data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Completada) && (data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Cancelada) && (data.row.dpto_estatus == ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('planificacion.titleTrabajar');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.view) {
                        if ((data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Completada) && (data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Cancelada) && (data.row.dpto_estatus == ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('actions.View');
                        } else {
                            return MESSAGE.i('actions.View');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.work) {
                        if ((data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Completada) && (data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Cancelada) && (data.row.dpto_estatus == ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('planificacion.titleTrabajar');
                        } else {
                            return MESSAGE.i('planificacion.titleTrabajar');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.view) {
                        return MESSAGE.i('actions.View');
                    } else if (PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.view && PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.work) {
                        if ((data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Completada) && (data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Cancelada) && (data.row.dpto_estatus == ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('planificacion.titleTrabajar');
                        } else {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('planificacion.titleTrabajar');
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.work) {
                        if ((data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Completada) && (data.row.estatus_actividad != ENUM_2.actividad_poa_estatus.Cancelada) && (data.row.dpto_estatus == ENUM_2.presupuesto_estatus.Completo)) {
                            return MESSAGE.i('planificacion.titleTrabajar');
                        } else {
                            return '';
                        }
                    } else if (PERMISSIONS.mypermission.actividades_poa_monitoreo.allow.view) {
                        return MESSAGE.i('actions.View');
                    }
                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['work', 'view'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [
                    {
                        text: (data) => {
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
                            if (typeof actividades_poa_monitoreo !== "undefined")
                                return actividades_poa_monitoreo.allowAction("Trabajar AR", "actividades_poa", data.row.estatus_actividad) && ( data.row.id_estatus_departamento == 3 && new SESSION().current().estado == ENUM_2.poa_estatus.Activo);
                        },
                        click: function (data) {
                            actividades_poa_monitoreo.puede_completar = data.row.puede_completar;
                            actividades_poa_monitoreo.my_true_estatus = data.row.estatus_actividad;
                            actividades_poa_monitoreo.presupuesto_restante = data.row.presupuesto_restante;
                            actividades_poa_monitoreo.condition = data.row.condition;
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            return false;
                        }
                    },
                    {
                        text: (data) => {
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
                            if (typeof actividades_poa_monitoreo !== "undefined")
                                return actividades_poa_monitoreo.allowAction("Trabajar RP", "actividades_poa", data.row.estatus_actividad) && ( data.row.id_estatus_departamento == 3 && new SESSION().current().estado == ENUM_2.poa_estatus.Activo);
                        },
                        click: function (data) {
                            actividades_poa_monitoreo.puede_completar = data.row.puede_completar;
                            actividades_poa_monitoreo.my_true_estatus = data.row.estatus_actividad;
                            actividades_poa_monitoreo.presupuesto_restante = data.row.presupuesto_restante;
                            actividades_poa_monitoreo.condition = data.row.condition;
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            return false;
                        }
                    },
                    {
                        text: (data) => {
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
                            if (typeof actividades_poa_monitoreo !== "undefined")
                                return actividades_poa_monitoreo.allowAction("Trabajar RG", "actividades_poa", data.row.estatus_actividad) && ( data.row.id_estatus_departamento == 3 && new SESSION().current().estado == ENUM_2.poa_estatus.Activo);
                        },
                        click: function (data) {
                            actividades_poa_monitoreo.puede_completar = data.row.puede_completar;
                            actividades_poa_monitoreo.my_true_estatus = data.row.estatus_actividad;
                            actividades_poa_monitoreo.presupuesto_restante = data.row.presupuesto_restante;
                            actividades_poa_monitoreo.condition = data.row.condition;
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            return false;
                        }
                    },
                    {
                        text: (data) => {
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
                        show: function (data) {
                            if (typeof actividades_poa_monitoreo !== "undefined")
                                return actividades_poa_monitoreo.allowAction("Ver", "actividades_poa", data.row.estatus_actividad);
                        },
                        click: function (data) {
                            // if (!DSON.oseaX(data.row)) {
                            //     data.$scope.dataForView = data.row;
                            //     data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                            //         header: {
                            //             title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
                            //             icon: "user"
                            //         },
                            //         footer: {
                            //             cancelButton: true
                            //         },
                            //         content: {
                            //             loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                            //             sameController: true
                            //         },
                            //     });
                            // }
                            actividades_poa_monitoreo.presupuesto_restante = data.row.presupuesto_restante;

                            actividades_poa_monitoreo.dataooo = true;

                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
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
                        show: function (data) {
                            if (typeof actividades_poa_monitoreo !== "undefined")
                                return actividades_poa_monitoreo.allowAction("Auditoría", "actividades_poa", data.row.estatus_actividad);
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
                    },
                    // {
                    //     text: (data) => {
                    //         return MESSAGE.i('actions.Remove');
                    //     },
                    //     icon: (data) => {
                    //         return "trash";
                    //     },
                    //     characterist: (data) => {
                    //         return "";
                    //     },
                    //     show: function (data) {
                    //         if (typeof actividades_poa_monitoreo !== "undefined")
                    //             return actividades_poa_monitoreo.allowAction("Eliminar AR", "actividades_poa", data.row.estatus_actividad);
                    //     },
                    //     click: function (data) {
                    //         SWEETALERT.confirm({
                    //             message: MESSAGE.i('alerts.AYSDelete'),
                    //             confirm: function () {
                    //                 SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                    //                 data.$scope.deleteRow(data.row).then(function () {
                    //                     SWEETALERT.stop();
                    //                 });
                    //             }
                    //         });
                    //         return false;
                    //     }
                    // },
                    // {
                    //     text: (data) => {
                    //         return MESSAGE.i('actions.Remove');
                    //     },
                    //     icon: (data) => {
                    //         return "trash";
                    //     },
                    //     characterist: (data) => {
                    //         return "";
                    //     },
                    //     show: function (data) {
                    //         if (typeof actividades_poa_monitoreo !== "undefined")
                    //             return actividades_poa_monitoreo.allowAction("Eliminar RP", "actividades_poa", data.row.estatus_actividad);
                    //     },
                    //     click: function (data) {
                    //         SWEETALERT.confirm({
                    //             message: MESSAGE.i('alerts.AYSDelete'),
                    //             confirm: function () {
                    //                 SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                    //                 data.$scope.deleteRow(data.row).then(function () {
                    //                     SWEETALERT.stop();
                    //                 });
                    //             }
                    //         });
                    //         return false;
                    //     }
                    // },
                ]
            },
            {
                text: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                title: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                icon: (data) => {
                    return "comment";
                },
                permission: (data) => {
                    return 'comment_activities';
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    if (data.row.comentarios > 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                click: function (data) {
                    mega_actividades = undefined;
                    actividades_poa_monitoreo.id_para_comentarios = data.row.id;
                    actividades_poa_monitoreo.modalAction('comentarios_actividades_poa', MESSAGE.i('planificacion.comentarios'), 'comment', 'list', {});
                    return false;
                }
            }
        ]
    }
});
