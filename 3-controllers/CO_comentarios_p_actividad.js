app.controller("comentarios_p_actividad", function ($scope, $http, $compile) {
    comentarios_p_actividad = this;
    comentarios_p_actividad.session = new SESSION().current();
    //comentarios_p_actividad.fixFilters = [];
    //comentarios_p_actividad.singular = "singular";
    //comentarios_p_actividad.plural = "plural";
    //comentarios_p_actividad.headertitle = "Hola Title";
    //comentarios_p_actividad.destroyForm = false;
    //comentarios_p_actividad.permissionTable = "tabletopermission";
    comentarios_p_actividad.headertitle = "Comentarios";
    comentarios_p_actividad.group_caracteristica = comentarios_p_actividad.session.groups[0] ? comentarios_p_actividad.session.groups[0].caracteristica : "";
    if (typeof vw_proyecto_item_actividad !== 'undefined') {
        if (typeof vw_proyecto_item_actividad !== 'not defined') {
            if (vw_proyecto_item_actividad) {
                comentarios_p_actividad.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.proyecto_actividad
                    },
                    {
                        "field": "value2",
                        "value": vw_proyecto_item_actividad.id
                    }
                ];
            }
        }
    }
    RUNCONTROLLER("comentarios_p_actividad", comentarios_p_actividad, $scope, $http, $compile);
    comentarios_p_actividad.triggers.table.after.load = async function (records) {
        comentarios_p_actividad.fileSI = [];
        for (var items of records.data) {
            comentarios_p_actividad.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/comentarios_p_actividad/actividadfile_comment/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        comentarios_p_actividad.fileSI.push({id: items.id});
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
            await comentarios_p_actividad.files();
            comentarios_p_actividad.refreshAngular();
        }
    };
    comentarios_p_actividad.formulary = function (data, mode, defaultData) {
        if (comentarios_p_actividad !== undefined) {
            RUN_B("comentarios_p_actividad", comentarios_p_actividad, $scope, $http, $compile);
            comentarios_p_actividad.form.modalWidth = ENUM.modal.width.full;
            comentarios_p_actividad.form.readonly = {};
            comentarios_p_actividad.createForm(data, mode, defaultData);
            $scope.$watch("comentarios_p_actividad.comentario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad, 'comentario', rules);
            });
            $scope.$watch("comentarios_p_actividad.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad, 'type', rules);
            });
            $scope.$watch("comentarios_p_actividad.responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad, 'responsable', rules);
            });
            $scope.$watch("comentarios_p_actividad.estatus_actividad_apoyo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad, 'estatus_actividad_apoyo', rules);
            });
            $scope.$watch("comentarios_p_actividad.id_responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad, 'id_responsable', rules);
            });
            $scope.$watch("comentarios_p_actividad.value", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad, 'value', rules);
            });
            $scope.$watch("comentarios_p_actividad.value2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_p_actividad, 'value2', rules);
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
    comentarios_p_actividad.verFile = function (key, value, row) {
        comentarios_p_actividad.setPermission("file.upload", false);
        if (comentarios_p_actividad.group_caracteristica !== ENUM_2.Grupos.director_general){
            comentarios_p_actividad.setPermission("file.remove", false);
        }else{
            comentarios_p_actividad.setPermission("file.remove", true);
        }
        if (typeof comentarios_p_actividad !== 'null') {
            if (comentarios_p_actividad) {
                var info = comentarios_p_actividad.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/comentarios_p_actividad/actividadfile_comment/" + row.id, row);
                    comentarios_p_actividad.showfiletypes = function () {
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
                        comentarios_p_actividad.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'comentarios_p_actividad',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    comentarios_p_actividad.modal.modalView("templates/components/gallery", {
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