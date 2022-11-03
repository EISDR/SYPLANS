app.controller("vw_documentos_asociados", function ($scope, $http, $compile) {
    vw_documentos_asociados = this;
    vw_documentos_asociados.fixFilters = [];
    vw_documentos_asociados.singular = "singular";
    vw_documentos_asociados.plural = "plural";
    vw_documentos_asociados.headertitle = "Documentos Asociados";
    //vw_documentos_asociados.destroyForm = false;
    //vw_documentos_asociados.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_documentos_asociados", vw_documentos_asociados, $scope, $http, $compile);
    vw_documentos_asociados.formulary = function (data, mode, defaultData) {
        if (vw_documentos_asociados !== undefined) {
            RUN_B("vw_documentos_asociados", vw_documentos_asociados, $scope, $http, $compile);
            vw_documentos_asociados.form.modalWidth = ENUM.modal.width.full;
            vw_documentos_asociados.form.readonly = {};
            vw_documentos_asociados.createForm(data, mode, defaultData);
            $scope.$watch("vw_documentos_asociados.codigo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados, 'codigo', rules);
            });
            $scope.$watch("vw_documentos_asociados.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados, 'nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados, 'descripcion', rules);
            });
            $scope.$watch("vw_documentos_asociados.proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados, 'proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados, 'tempid', rules);
            });
        }
    };
    vw_documentos_asociados.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        vw_documentos_asociados.fileSI = [];
        for (var items of records.data) {
            vw_documentos_asociados.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/documentos_asociados/documento_asociadofile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        vw_documentos_asociados.fileSI.push({id: items.id});
                        resolve(true);
                    } else {
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for (var item of buttons) {
                            item.disabled = false;
                        }
                        resolve(false);
                    }
                }, $('#invisible'));
            });
            await vw_documentos_asociados.files();
            vw_documentos_asociados.refreshAngular();
        }
    };
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
    vw_documentos_asociados.verFile = function (key, value, row) {
        if (key != "archivo")
            return;

        vw_documentos_asociados.setPermission("file.upload", false);
        vw_documentos_asociados.setPermission("file.remove", false);
        if (typeof vw_documentos_asociados !== 'null') {
            if (vw_documentos_asociados) {
                var info = vw_documentos_asociados.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/documentos_asociados/documento_asociadofile/" + row.id, row);
                    vw_documentos_asociados.showfiletypes = function () {
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
                        vw_documentos_asociados.modal.modalView("templates/components/filetype", modal);
                    };
                    baseController.viewData = {
                        root: root,
                        scope: 'actividades_poa_monitoreo',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    vw_documentos_asociados.modal.modalView("templates/components/gallery", {
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
});