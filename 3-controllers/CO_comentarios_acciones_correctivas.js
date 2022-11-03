app.controller("comentarios_acciones_correctivas", function ($scope, $http, $compile) {
    comentarios_acciones_correctivas = this;
    comentarios_acciones_correctivas.session = new SESSION().current();
    //comentarios_acciones_correctivas.fixFilters = [];
    //comentarios_acciones_correctivas.singular = "singular";
    //comentarios_acciones_correctivas.plural = "plural";
    comentarios_acciones_correctivas.headertitle = "Comentarios";
    //comentarios_acciones_correctivas.destroyForm = false;
    //comentarios_acciones_correctivas.permissionTable = "tabletopermission";
    if (typeof vw_auditoria_lista_correctiva !== 'undefined') {
        if (typeof vw_auditoria_lista_correctiva !== 'not defined') {
            if (vw_auditoria_lista_correctiva) {
                comentarios_acciones_correctivas.fixFilters = [
                    {
                        "field": "type",
                        "value": 27
                    },
                    {
                        "field": "value2",
                        "value": vw_auditoria_lista_correctiva.id
                    }
                ];
            }
        }
    }
    if (typeof auditoria_lista_correctiva !== 'undefined') {
        if (typeof auditoria_lista_correctiva !== 'not defined') {
            if (auditoria_lista_correctiva) {
                comentarios_acciones_correctivas.fixFilters = [
                    {
                        "field": "type",
                        "value": 27
                    },
                    {
                        "field": "value2",
                        "value": auditoria_lista_correctiva.id
                    }
                ];
            }
        }
    }
    comentarios_acciones_correctivas.group_caracteristica = comentarios_acciones_correctivas.session.groups[0] ? comentarios_acciones_correctivas.session.groups[0].caracteristica : "";
    RUNCONTROLLER("comentarios_acciones_correctivas", comentarios_acciones_correctivas, $scope, $http, $compile);
    comentarios_acciones_correctivas.formulary = function (data, mode, defaultData) {
        if (comentarios_acciones_correctivas !== undefined) {
            RUN_B("comentarios_acciones_correctivas", comentarios_acciones_correctivas, $scope, $http, $compile);
            comentarios_acciones_correctivas.form.modalWidth = ENUM.modal.width.full;
            comentarios_acciones_correctivas.form.readonly = {};
            comentarios_acciones_correctivas.createForm(data, mode, defaultData);
            $scope.$watch("comentarios_acciones_correctivas.comentario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_acciones_correctivas, 'comentario', rules);
            });
            $scope.$watch("comentarios_acciones_correctivas.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_acciones_correctivas, 'type', rules);
            });
            $scope.$watch("comentarios_acciones_correctivas.responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_acciones_correctivas, 'responsable', rules);
            });
            $scope.$watch("comentarios_acciones_correctivas.estatus_a", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_acciones_correctivas, 'estatus_a', rules);
            });
            $scope.$watch("comentarios_acciones_correctivas.id_responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_acciones_correctivas, 'id_responsable', rules);
            });
            $scope.$watch("comentarios_acciones_correctivas.value", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_acciones_correctivas, 'value', rules);
            });
            $scope.$watch("comentarios_acciones_correctivas.value2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_acciones_correctivas, 'value2', rules);
            });
            $scope.$watch("comentarios_acciones_correctivas.value3", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_acciones_correctivas, 'value3', rules);
            });
        }
    };
    comentarios_acciones_correctivas.triggers.table.after.load = async function (records) {
        comentarios_acciones_correctivas.fileSI = [];
        for (var items of records.data) {
            comentarios_acciones_correctivas.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/comentarios_acciones_correctivas/correctivafile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        comentarios_acciones_correctivas.fileSI.push({id: items.id});
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
            await comentarios_acciones_correctivas.files();
            comentarios_acciones_correctivas.refreshAngular();
        }
    };
    comentarios_acciones_correctivas.verFile = function (key, value, row) {
        comentarios_acciones_correctivas.setPermission("file.upload", false);
        comentarios_acciones_correctivas.setPermission("file.download", true);
        if (comentarios_acciones_correctivas.group_caracteristica !== ENUM_2.Grupos.director_general){
            comentarios_acciones_correctivas.setPermission("file.remove", false);
        }else{
            comentarios_acciones_correctivas.setPermission("file.remove", true);
        }
        if (typeof comentarios_acciones_correctivas !== 'null') {
            if (comentarios_acciones_correctivas) {
                var info = comentarios_acciones_correctivas.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/comentarios_acciones_correctivas/correctivafile/" + row.id, row);
                    comentarios_acciones_correctivas.showfiletypes = function () {
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
                        comentarios_acciones_correctivas.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'comentarios_acciones_correctivas',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    comentarios_acciones_correctivas.modal.modalView("templates/components/gallery", {
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