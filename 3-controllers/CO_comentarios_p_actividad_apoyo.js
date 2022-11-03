app.controller("comentarios_p_actividad_apoyo", function ($scope, $http, $compile) {
    comentarios_p_actividad_apoyo = this;
    comentarios_p_actividad_apoyo.session = new SESSION().current();
    //comentarios_p_actividad_apoyo.singular = "singular";
    //comentarios_p_actividad_apoyo.plural = "plural";
    comentarios_p_actividad_apoyo.headertitle = "Comentarios";
    comentarios_p_actividad_apoyo.group_caracteristica = comentarios_p_actividad_apoyo.session.groups[0] ? comentarios_p_actividad_apoyo.session.groups[0].caracteristica : "";
    //comentarios_p_actividad_apoyo.destroyForm = false;
    //comentarios_p_actividad_apoyo.permissionTable = "tabletopermission";
    if (typeof vw_proyecto_item_actividad !== 'undefined') {
        if (typeof vw_proyecto_item_actividad !== 'not defined') {
            if (vw_proyecto_item_actividad) {
                if (vw_proyecto_item_actividad.form.mode == "edit") {
                    comentarios_p_actividad_apoyo.fixFilters = [
                        {
                            "field": "id",
                            "value": -1
                        }
                    ];
                }
            }
        }
    }
    if (typeof vw_proyecto_actividad_apoyo !== 'undefined') {
        if (typeof vw_proyecto_actividad_apoyo !== 'not defined') {
            if (vw_proyecto_actividad_apoyo) {
                comentarios_p_actividad_apoyo.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Proyecto_actividad_apoyo
                    },
                    {
                        "field": "value2",
                        "value": vw_proyecto_actividad_apoyo.id
                    }
                ];
            }
        }
    }
    RUNCONTROLLER("comentarios_p_actividad_apoyo", comentarios_p_actividad_apoyo, $scope, $http, $compile);
    comentarios_p_actividad_apoyo.triggers.table.after.load = async function (records) {
        comentarios_p_actividad_apoyo.fileSI = [];
        for (var items of records.data) {
            comentarios_p_actividad_apoyo.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/comentarios_p_actividad_apoyo/actividad_apoyofile_comment/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        comentarios_p_actividad_apoyo.fileSI.push({id: items.id});
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
            await comentarios_p_actividad_apoyo.files();
            comentarios_p_actividad_apoyo.refreshAngular();
        }
    };
    comentarios_p_actividad_apoyo.formulary = function (data, mode, defaultData) {
        if (comentarios_p_actividad_apoyo !== undefined) {
            RUN_B("comentarios_p_actividad_apoyo", comentarios_p_actividad_apoyo, $scope, $http, $compile);
            comentarios_p_actividad_apoyo.form.modalWidth = ENUM.modal.width.full;
            comentarios_p_actividad_apoyo.form.readonly = {};
            comentarios_p_actividad_apoyo.createForm(data, mode, defaultData);
            $scope.$watch("comentarios_p_actividad_apoyo.comentario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad_apoyo, 'comentario', rules);
            });
            $scope.$watch("comentarios_p_actividad_apoyo.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad_apoyo, 'type', rules);
            });
            $scope.$watch("comentarios_p_actividad_apoyo.responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad_apoyo, 'responsable', rules);
            });
            $scope.$watch("comentarios_p_actividad_apoyo.estatus_actividad_apoyo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad_apoyo, 'estatus_actividad_apoyo', rules);
            });
            $scope.$watch("comentarios_p_actividad_apoyo.id_responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad_apoyo, 'id_responsable', rules);
            });
            $scope.$watch("comentarios_p_actividad_apoyo.value", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad_apoyo, 'value', rules);
            });
            $scope.$watch("comentarios_p_actividad_apoyo.value2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad_apoyo, 'value2', rules);
            });
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
    comentarios_p_actividad_apoyo.verFile = function (key, value, row) {
        comentarios_p_actividad_apoyo.setPermission("file.upload", false);
        if (comentarios_p_actividad_apoyo.group_caracteristica !== ENUM_2.Grupos.director_general){
            comentarios_p_actividad_apoyo.setPermission("file.remove", false);
        }else{
            comentarios_p_actividad_apoyo.setPermission("file.remove", true);
        }
        if (typeof comentarios_p_actividad_apoyo !== 'null') {
            if (comentarios_p_actividad_apoyo) {
                var info = comentarios_p_actividad_apoyo.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/comentarios_p_actividad_apoyo/actividad_apoyofile_comment/" + row.id, row);
                    comentarios_p_actividad_apoyo.showfiletypes = function () {
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
                        comentarios_p_actividad_apoyo.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'comentarios_p_actividad_apoyo',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    comentarios_p_actividad_apoyo.modal.modalView("templates/components/gallery", {
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