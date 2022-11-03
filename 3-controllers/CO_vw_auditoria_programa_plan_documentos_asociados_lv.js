app.controller("vw_auditoria_programa_plan_documentos_asociados_lv", function ($scope, $http, $compile) {
    vw_auditoria_programa_plan_documentos_asociados_lv = this;
    vw_auditoria_programa_plan_documentos_asociados_lv.fixFilters = [
        {
            field: "programa_plan",
            value: auditoria_programa_plan.for_show_id
        },
        {
            field: "cumple",
            value: 0
        }
    ];
    //vw_auditoria_programa_plan_documentos_asociados_lv.singular = "singular";
    //vw_auditoria_programa_plan_documentos_asociados_lv.plural = "plural";
    //vw_auditoria_programa_plan_documentos_asociados_lv.headertitle = "Hola Title";
    //vw_auditoria_programa_plan_documentos_asociados_lv.destroyForm = false;
    //vw_auditoria_programa_plan_documentos_asociados_lv.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_auditoria_programa_plan_documentos_asociados_lv", vw_auditoria_programa_plan_documentos_asociados_lv, $scope, $http, $compile);
    vw_auditoria_programa_plan_documentos_asociados_lv.formulary = function (data, mode, defaultData) {
        if (vw_auditoria_programa_plan_documentos_asociados_lv !== undefined) {
            RUN_B("vw_auditoria_programa_plan_documentos_asociados_lv", vw_auditoria_programa_plan_documentos_asociados_lv, $scope, $http, $compile);
            vw_auditoria_programa_plan_documentos_asociados_lv.form.modalWidth = ENUM.modal.width.full;
            vw_auditoria_programa_plan_documentos_asociados_lv.form.readonly = {};
            vw_auditoria_programa_plan_documentos_asociados_lv.createForm(data, mode, defaultData);
            $scope.$watch("vw_auditoria_programa_plan_documentos_asociados_lv.programa_plan_documentos_asociados", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa_plan_documentos_asociados_lv, 'programa_plan_documentos_asociados', rules);
            });
            $scope.$watch("vw_auditoria_programa_plan_documentos_asociados_lv.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa_plan_documentos_asociados_lv, 'tempid', rules);
            });
            $scope.$watch("vw_auditoria_programa_plan_documentos_asociados_lv.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa_plan_documentos_asociados_lv, 'descripcion', rules);
            });
            $scope.$watch("vw_auditoria_programa_plan_documentos_asociados_lv.cumple", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa_plan_documentos_asociados_lv, 'cumple', rules);
            });
            $scope.$watch("vw_auditoria_programa_plan_documentos_asociados_lv.observaciones", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa_plan_documentos_asociados_lv, 'observaciones', rules);
            });
            $scope.$watch("vw_auditoria_programa_plan_documentos_asociados_lv.acciones_correctivas", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa_plan_documentos_asociados_lv, 'acciones_correctivas', rules);
            });
            //ms_product.selectQueries['tipo_inconformidad'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_auditoria_programa_plan_documentos_asociados_lv.tipo_inconformidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa_plan_documentos_asociados_lv, 'tipo_inconformidad', rules);
            });
            $scope.$watch("vw_auditoria_programa_plan_documentos_asociados_lv.tipo_inconformidad_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa_plan_documentos_asociados_lv, 'tipo_inconformidad_nombre', rules);
            });
        }
    };

    vw_auditoria_programa_plan_documentos_asociados_lv.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        vw_auditoria_programa_plan_documentos_asociados_lv.fileSI = [];
        for (var items of records.data) {
            vw_auditoria_programa_plan_documentos_asociados_lv.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/auditoria_programa_plan_documentos_asociados_listaverificacion/listaverificacionfile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        vw_auditoria_programa_plan_documentos_asociados_lv.fileSI.push({id: items.id});
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
            await vw_auditoria_programa_plan_documentos_asociados_lv.files();
            vw_auditoria_programa_plan_documentos_asociados_lv.refreshAngular();
        }
    };
    vw_auditoria_programa_plan_documentos_asociados_lv.verFile = function (key, value, row) {
        if (key != "archivo")
            return;

        vw_auditoria_programa_plan_documentos_asociados_lv.setPermission("file.upload", false);
        vw_auditoria_programa_plan_documentos_asociados_lv.setPermission("file.remove", false);
        // if (row.estatus_actividad == ENUM_2.actividad_poa_estatus.Completada || row.estatus_actividad == ENUM_2.actividad_poa_estatus.Cancelada) {
        //     actividades_poa_monitoreo.setPermission("file.upload", false);
        //     actividades_poa_monitoreo.setPermission("file.remove", false);
        // } else {
        //     actividades_poa_monitoreo.setPermission("file.upload", true);
        //     actividades_poa_monitoreo.setPermission("file.remove", true);
        // }
        if (typeof vw_auditoria_programa_plan_documentos_asociados_lv !== 'null') {
            if (vw_auditoria_programa_plan_documentos_asociados_lv) {
                var info = vw_auditoria_programa_plan_documentos_asociados_lv.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/auditoria_programa_plan_documentos_asociados_listaverificacion/listaverificacionfile/" + row.id, row);
                    vw_auditoria_programa_plan_documentos_asociados_lv.showfiletypes = function () {
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
                        vw_auditoria_programa_plan_documentos_asociados_lv.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'auditoria_programa_plan_documentos_asociados_listaverificacion',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    vw_auditoria_programa_plan_documentos_asociados_lv.modal.modalView("templates/components/gallery", {
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
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //     resolve(true);
    // });
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