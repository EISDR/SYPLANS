app.controller("auditoria_programa_plan_documentos_asociados_listaverificacion", function ($scope, $http, $compile) {
    auditoria_programa_plan_documentos_asociados_listaverificacion = this;
    auditoria_programa_plan_documentos_asociados_listaverificacion.session = new SESSION().current();
    //auditoria_programa_plan_documentos_asociados_listaverificacion.fixFilters = [];
    auditoria_programa_plan_documentos_asociados_listaverificacion.singular = "Lista de Verificación";
    auditoria_programa_plan_documentos_asociados_listaverificacion.plural = "Lista de Verificación";
    auditoria_programa_plan_documentos_asociados_listaverificacion.headertitle = "Listas de Verificación";
    auditoria_programa_plan_documentos_asociados_listaverificacion.fileSI = [];
    auditoria_programa_plan_documentos_asociados_listaverificacion.from_work = false;
    if (typeof auditoria_programa_plan != "undefined") {
        if (auditoria_programa_plan) {
            if (typeof auditoria_programa_plan !== 'not defined') {
                auditoria_programa_plan_documentos_asociados_listaverificacion.documento_asociado = auditoria_programa_plan.documento.id;
                auditoria_programa_plan_documentos_asociados_listaverificacion.fixFilters = [
                    {
                        field: "programa_plan_documentos_asociados",
                        value: auditoria_programa_plan.documento.id
                    }
                ];
                if (auditoria_programa_plan.my_true_estatus > 3) {
                    CRUD_auditoria_programa_plan_documentos_asociados_listaverificacion.table.columns = {
                        id: {
                            visible: false,
                            visibleDetail: false,
                            export: false,
                            exportExample: false,
                            dead: true
                        },
                        descripcion: {
                            label: function() {
                                return "Puntos de Verificación"
                            },
                            shorttext: 360
                        },
                        cumple: {
                            label: function() {
                                return "¿Cumple?"
                            },
                            visible: true,
                            sorttype: ENUM.FORMAT.bool,
                            formattype: ENUM.FORMAT.bool
                        },
                        observaciones: {},
                        tipo_inconformidad_nombre: {
                            label: function (){
                                return "Tipo de no Conformidad"
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
                                if (typeof auditoria_programa_plan_documentos_asociados_listaverificacion !== 'null') {
                                    if (auditoria_programa_plan_documentos_asociados_listaverificacion) {
                                        var info = auditoria_programa_plan_documentos_asociados_listaverificacion.fileSI.filter(data => {
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
                    };
                }else{
                    CRUD_auditoria_programa_plan_documentos_asociados_listaverificacion.table.columns = {
                        id: {
                            visible: false,
                            visibleDetail: false,
                            export: false,
                            exportExample: false,
                            dead: true
                        },
                        descripcion: {
                            label: function() {
                                return "Puntos de Verificación"
                            },
                            shorttext: 360
                        }
                    };
                }
            }
        }
    }
    auditoria_programa_plan_documentos_asociados_listaverificacion.destroyForm = true;
    //auditoria_programa_plan_documentos_asociados_listaverificacion.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_programa_plan_documentos_asociados_listaverificacion", auditoria_programa_plan_documentos_asociados_listaverificacion, $scope, $http, $compile);
    RUN_B("auditoria_programa_plan_documentos_asociados_listaverificacion", auditoria_programa_plan_documentos_asociados_listaverificacion, $scope, $http, $compile);
    auditoria_programa_plan_documentos_asociados_listaverificacion.formulary = function (data, mode, defaultData) {
        if (auditoria_programa_plan_documentos_asociados_listaverificacion !== undefined) {
            RUN_B("auditoria_programa_plan_documentos_asociados_listaverificacion", auditoria_programa_plan_documentos_asociados_listaverificacion, $scope, $http, $compile);
            auditoria_programa_plan_documentos_asociados_listaverificacion.form.modalWidth = ENUM.modal.width.full;
            if(auditoria_programa_plan.selected_row) {
                auditoria_programa_plan_documentos_asociados_listaverificacion.form.titles = {
                    new: 'Nueva - Lista de Verificación del Documento: "' + auditoria_programa_plan.selected_row.nombre + '" perteneciente al Proceso: "' + auditoria_programa_plan.selected_row.nombre_proceso + '"',
                    edit: 'Editar - Lista de Verificación del Documento: "' + auditoria_programa_plan.selected_row.nombre + '" perteneciente al Proceso: "' + auditoria_programa_plan.selected_row.nombre_proceso + '"',
                    view: "Ver ALL - Lista de Verificación"
                }
            }else{
                auditoria_programa_plan_documentos_asociados_listaverificacion.form.titles = {
                    new: "Nueva - Lista de Verificación ",
                    edit: "Editar - Lista de Verificación",
                    view: "Ver ALL - Lista de Verificación"
                }
            }
            // if (typeof auditoria_programa_plan != "undefined") {
            //     if (auditoria_programa_plan) {
            //         if (typeof auditoria_programa_plan !== 'not defined') {
            //             auditoria_programa_plan_documentos_asociados_listaverificacion.form.titles = {
            //                 new: "Nueva - Lista de Verificación " + auditoria_programa_plan.documento_asoc_nombre,
            //                 edit: "Editar - Lista de Verificación" + auditoria_programa_plan.documento_asoc_nombre,
            //                 view: "Ver ALL - Lista de Verificación"
            //             }
            //         }
            //     }
            // }
            if (mode === 'new'){
                auditoria_programa_plan_documentos_asociados_listaverificacion.observaciones = "";
                auditoria_programa_plan_documentos_asociados_listaverificacion.refreshAngular();
            }
            auditoria_programa_plan_documentos_asociados_listaverificacion.form.readonly = {programa_plan_documentos_asociados: auditoria_programa_plan.documento.id};
            auditoria_programa_plan_documentos_asociados_listaverificacion.createForm(data, mode, defaultData);
            $scope.$watch("auditoria_programa_plan_documentos_asociados_listaverificacion.programa_plan_documentos_asociados", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_documentos_asociados_listaverificacion, 'programa_plan_documentos_asociados', rules);
            });
            $scope.$watch("auditoria_programa_plan_documentos_asociados_listaverificacion.tipo_inconformidad", function (value) {
                var rules = [];
                //rules here
                if (auditoria_programa_plan_documentos_asociados_listaverificacion.from_where == 'no cumple')
                    rules.push(VALIDATION.general.required(value));
                else
                    auditoria_programa_plan_documentos_asociados_listaverificacion.tipo_inconformidad == '[NULL]';
                VALIDATION.validate(auditoria_programa_plan_documentos_asociados_listaverificacion, 'tipo_inconformidad', rules);
            });
            $scope.$watch("auditoria_programa_plan_documentos_asociados_listaverificacion.descripcion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_documentos_asociados_listaverificacion, 'descripcion', rules);
            });
            $scope.$watch("auditoria_programa_plan_documentos_asociados_listaverificacion.cumple", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_documentos_asociados_listaverificacion, 'cumple', rules);
            });
            $scope.$watch("auditoria_programa_plan_documentos_asociados_listaverificacion.observaciones", function (value) {
                var rules = [];
                //rules here
                if (auditoria_programa_plan_documentos_asociados_listaverificacion.from_where == 'no cumple')
                    rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_documentos_asociados_listaverificacion, 'observaciones', rules);
            });
        }
    };
    auditoria_programa_plan_documentos_asociados_listaverificacion.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        auditoria_programa_plan_documentos_asociados_listaverificacion.fileSI = [];
        for (var items of records.data) {
            auditoria_programa_plan_documentos_asociados_listaverificacion.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/auditoria_programa_plan_documentos_asociados_listaverificacion/listaverificacionfile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        auditoria_programa_plan_documentos_asociados_listaverificacion.fileSI.push({id: items.id});
                        resolve(true);
                    } else {
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    }
                }, $('#invisible'));
            });
            await auditoria_programa_plan_documentos_asociados_listaverificacion.files();
            auditoria_programa_plan_documentos_asociados_listaverificacion.refreshAngular();
        }
    };
    auditoria_programa_plan_documentos_asociados_listaverificacion.verFile = function (key, value, row) {
        if (key != "archivo")
            return;

        auditoria_programa_plan_documentos_asociados_listaverificacion.setPermission("file.upload", false);
        auditoria_programa_plan_documentos_asociados_listaverificacion.setPermission("file.remove", false);
        // if (row.estatus_actividad == ENUM_2.actividad_poa_estatus.Completada || row.estatus_actividad == ENUM_2.actividad_poa_estatus.Cancelada) {
        //     actividades_poa_monitoreo.setPermission("file.upload", false);
        //     actividades_poa_monitoreo.setPermission("file.remove", false);
        // } else {
        //     actividades_poa_monitoreo.setPermission("file.upload", true);
        //     actividades_poa_monitoreo.setPermission("file.remove", true);
        // }
        if (typeof auditoria_programa_plan_documentos_asociados_listaverificacion !== 'null') {
            if (auditoria_programa_plan_documentos_asociados_listaverificacion) {
                var info = auditoria_programa_plan_documentos_asociados_listaverificacion.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/auditoria_programa_plan_documentos_asociados_listaverificacion/listaverificacionfile/" + row.id, row);
                    auditoria_programa_plan_documentos_asociados_listaverificacion.showfiletypes = function () {
                        var modal = {
                            width: "modal-full",
                            header: {
                                title: "Ver tipos de archivos permitidos a ser cargados",
                                icon: "file-eye"
                            },
                            footer: {
                                cancelButton: false,
                                buttons: [
                                    {
                                        color: "btn bg-<%= COLOR.info %> btn-labeled btn-xs pull-rightm",
                                        title: "<b><i class='icon-arrow-right8'></i></b>Continuar",
                                        action: function () {
                                            MODAL.close();
                                        }
                                    }
                                ]
                            },
                            content: {
                                loadingContentText: MESSAGE.i('actions.Loading')
                            },
                            event: {
                                show: {
                                    begin: function (data) {
                                        data.permitted_files = [];
                                        for (var i in CONFIG.fileType_general) {
                                            for (var j in CONFIG.fileType_general[i]) {
                                                if (typeof data.permitted_files[j] == "undefined") {
                                                    data.permitted_files[j] = {};
                                                }
                                                data.permitted_files[j][i] = CONFIG.fileType_general[i][j];
                                            }
                                        }
                                    }
                                },
                                hide: {
                                    begin: function (data) {

                                    }
                                }
                            }
                        };
                        auditoria_programa_plan_documentos_asociados_listaverificacion.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'auditoria_programa_plan_documentos_asociados_listaverificacion',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    auditoria_programa_plan_documentos_asociados_listaverificacion.modal.modalView("templates/components/gallery", {
                        width: 'modal-full',
                        header: {
                            title: MESSAGE.ic("mono.files"),
                            icon: "file-eye"
                        },
                        footer: {
                            cancelButton: false
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading')
                        },
                    });
                }
            }
        }
    };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    auditoria_programa_plan_documentos_asociados_listaverificacion.triggers.table.after.open = function (data) {
        //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
        // $('.modal-title').html(`Nueva - Lista de Verificación - ${auditoria_programa_plan.documento_asoc_nombre}`);
    };
    // auditoria_programa_plan_documentos_asociados_listaverificacion.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    auditoria_programa_plan_documentos_asociados_listaverificacion.triggers.table.after.close = function (data) {
        auditoria_programa_plan_documentos_asociados_listaverificacion.refresh();
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    auditoria_programa_plan_documentos_asociados_listaverificacion.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        if (auditoria_programa_plan_documentos_asociados_listaverificacion.from_where === 'cumple') {
            data.inserting.cumple = 1;

        }else if (auditoria_programa_plan_documentos_asociados_listaverificacion.from_where === 'no cumple'){
            data.inserting.cumple = 0;
        }
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    auditoria_programa_plan_documentos_asociados_listaverificacion.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        if (auditoria_programa_plan_documentos_asociados_listaverificacion.from_where === 'cumple') {
            data.updating.cumple = 1;
        }else if (auditoria_programa_plan_documentos_asociados_listaverificacion.from_where === 'no cumple'){
            data.updating.cumple = 0;
            if (!auditoria_programa_plan_documentos_asociados_listaverificacion.listaverificacionfile_DragonCountFile) {
                SWEETALERT.show({type: 'error', message: "Favor subir un documento para completar el proceso."});
                resolve(false);
            }
        }
        resolve(true);
    });
    //
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});