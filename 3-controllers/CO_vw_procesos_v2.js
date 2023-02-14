app.controller("vw_procesos_v2", function ($scope, $http, $compile) {
    vw_procesos_v2 = this;
    //vw_procesos_v2.fixFilters = [];
    vw_procesos_v2.session = new SESSION().current();
    //vw_procesos_v2.fixFilters = [{
    //    field: "compania",
    //    value: vw_procesos_v2.session.compania_id
    //}];
    //vw_procesos_v2.singular = "singular";
    //vw_procesos_v2.plural = "plural";
    //vw_procesos_v2.headertitle = "Hola Title";
    // vw_procesos_v2.destroyForm = false;
    //vw_procesos_v2.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_procesos_v2", vw_procesos_v2, $scope, $http, $compile);
    vw_procesos_v2.formulary = function (data, mode, defaultData) {
        if (vw_procesos_v2 !== undefined) {
            RUN_B("vw_procesos_v2", vw_procesos_v2, $scope, $http, $compile);
            vw_procesos_v2.form.modalWidth = ENUM.modal.width.full;
            vw_procesos_v2.form.readonly = {};
            vw_procesos_v2.form.titles = {};
            vw_procesos_v2.createForm(data, mode, defaultData);
        }
    };
    vw_procesos_v2.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        vw_procesos_v2.fileSI = [];
        vw_procesos_v2.runMagicOneToMany('doc_asoc', 'vw_documentos_asociados', 'proceso', 'nombre', 'id');
        vw_procesos_v2.runMagicOneToMany('proc_ele', 'procesos_elemento', 'proceso', 'nombre', 'id');
        vw_procesos_v2.runMagicOneToMany('proc_ind', 'vw_indicador_generico_v2', 'registro', 'nombre_indicador', 'id');
        for (var items of records.data) {
            vw_procesos_v2.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/procesos/procesofile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        vw_procesos_v2.fileSI.push({id: items.id});
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
            await vw_procesos_v2.files();

            vw_procesos_v2.refreshAngular();
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
    vw_procesos_v2.verFile = function (key, value, row) {
        if (key != "archivo")
            return;

        vw_procesos_v2.setPermission("file.upload", false);
        vw_procesos_v2.setPermission("file.remove", false);
        // if (row.estatus_actividad == ENUM_2.actividad_poa_estatus.Completada || row.estatus_actividad == ENUM_2.actividad_poa_estatus.Cancelada) {
        //     actividades_poa_monitoreo.setPermission("file.upload", false);
        //     actividades_poa_monitoreo.setPermission("file.remove", false);
        // } else {
        //     actividades_poa_monitoreo.setPermission("file.upload", true);
        //     actividades_poa_monitoreo.setPermission("file.remove", true);
        // }
        if (typeof vw_procesos_v2 !== 'null') {
            if (vw_procesos_v2) {
                var info = vw_procesos_v2.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/procesos/procesofile/" + row.id, row);
                    vw_procesos_v2.showfiletypes = function () {
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
                        vw_procesos_v2.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'vw_procesos_v2',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    vw_procesos_v2.modal.modalView("templates/components/gallery", {
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