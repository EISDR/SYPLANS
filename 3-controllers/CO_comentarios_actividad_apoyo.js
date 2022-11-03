app.controller("comentarios_actividad_apoyo", function ($scope, $http, $compile) {
    comentarios_actividad_apoyo = this;
    comentarios_actividad_apoyo.fileSI = [];
    //comentarios_actividad_apoyo.fixFilters = [];
    //comentarios_actividad_apoyo.singular = "singular";
    //comentarios_actividad_apoyo.plural = "plural";
    comentarios_actividad_apoyo.headertitle = "Comentarios";
    //comentarios_actividad_apoyo.destroyForm = false;
    //comentarios_actividad_apoyo.permissionTable = "tabletopermission";
    if (typeof actividades_apoyo !== 'undefined') {
        if (typeof actividades_apoyo !== 'not defined') {
            if (actividades_apoyo) {
                comentarios_actividad_apoyo.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actividades_apoyo
                    },
                    {
                        "field": "value2",
                        "value": actividades_apoyo.id
                    }
                ];
            }
        }
    }


    if (typeof drp_actividades_apoyo !== 'undefined') {
        if (typeof drp_actividades_apoyo !== 'not defined') {
            if (drp_actividades_apoyo) {
                CRUD_comentarios_actividad_apoyo.table.columns.value3 = {
                    visible: false,
                    visibleDetail: false,
                    export: false,
                    exportExample: false,
                    dead: true
                }
                comentarios_actividad_apoyo.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actividades_apoyo
                    },
                    {
                        "field": "value2",
                        "value": drp_actividades_apoyo.id
                    },
                ];
            }
        }
    }
    if (typeof actividades_asociadas_view !== 'undefined') {
        if (typeof actividades_asociadas_view !== 'not defined') {
            if (actividades_asociadas_view) {
                comentarios_actividad_apoyo.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actividades_apoyo
                    },
                    {
                        "field": "value2",
                        "value": actividades_asociadas_view.id
                    }
                ];
            }
        }
    }
    if (typeof actividades_poa_monitoreo !== 'undefined') {
        if (typeof actividades_poa_monitoreo !== 'not defined') {
            if (actividades_poa_monitoreo) {
                if (actividades_poa_monitoreo.form.mode == "edit") {
                    comentarios_actividad_apoyo.fixFilters = [
                        {
                            "field": "id",
                            "value": -1
                        }
                    ];
                }
            }
        }
    }
    if (typeof mega_actividades_asociadas !== 'undefined') {
        if (typeof mega_actividades_asociadas !== 'not defined') {
            if (mega_actividades_asociadas) {
                comentarios_actividad_apoyo.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Actividades_apoyo
                    },
                    {
                        "field": "value2",
                        "value": mega_actividades_asociadas.id
                    }
                ];
            }
        }
    }
    comentarios_actividad_apoyo.session = new SESSION().current();
    comentarios_actividad_apoyo.group_caracteristica = comentarios_actividad_apoyo.session.groups[0] ? comentarios_actividad_apoyo.session.groups[0].caracteristica : "";
    RUNCONTROLLER("comentarios_actividad_apoyo", comentarios_actividad_apoyo, $scope, $http, $compile);
    comentarios_actividad_apoyo.triggers.table.after.load = async function (records) {
        comentarios_actividad_apoyo.fileSI = [];
        for (var items of records.data) {
            comentarios_actividad_apoyo.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/comentarios_actividad_apoyo/actividadfile_comment/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        comentarios_actividad_apoyo.fileSI.push({id: items.id});
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
            await comentarios_actividad_apoyo.files();
            comentarios_actividad_apoyo.refreshAngular();
        }
    };
    comentarios_actividad_apoyo.formulary = function (data, mode, defaultData) {
        if (comentarios_actividad_apoyo !== undefined) {
            RUN_B("comentarios_actividad_apoyo", comentarios_actividad_apoyo, $scope, $http, $compile);
            comentarios_actividad_apoyo.form.modalWidth = ENUM.modal.width.full;
            comentarios_actividad_apoyo.form.readonly = {};
            comentarios_actividad_apoyo.createForm(data, mode, defaultData);
            $scope.$watch("comentarios_actividad_apoyo.comentario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_actividad_apoyo, 'comentario', rules);
            });
            $scope.$watch("comentarios_actividad_apoyo.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_actividad_apoyo, 'type', rules);
            });
            $scope.$watch("comentarios_actividad_apoyo.responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_actividad_apoyo, 'responsable', rules);
            });
            $scope.$watch("comentarios_actividad_apoyo.id_responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_actividad_apoyo, 'id_responsable', rules);
            });
            $scope.$watch("comentarios_actividad_apoyo.value", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_actividad_apoyo, 'value', rules);
            });
            $scope.$watch("comentarios_actividad_apoyo.value2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(comentarios_actividad_apoyo, 'value2', rules);
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
    comentarios_actividad_apoyo.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        comentarios_actividad_apoyo.refresh();
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
    comentarios_actividad_apoyo.verFile = function (key, value, row) {
        comentarios_actividad_apoyo.setPermission("file.upload", false);
        if (comentarios_actividad_apoyo.group_caracteristica !== ENUM_2.Grupos.director_general){
            comentarios_actividad_apoyo.setPermission("file.remove", false);
        }else{
            comentarios_actividad_apoyo.setPermission("file.remove", true);
        }
        if (typeof comentarios_actividad_apoyo !== 'null') {
            if (comentarios_actividad_apoyo) {
                var info = comentarios_actividad_apoyo.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/comentarios_actividad_apoyo/actividadfile_comment/" + row.id, row);
                    comentarios_actividad_apoyo.showfiletypes = function () {
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
                        comentarios_actividad_apoyo.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'comentarios_actividad_apoyo',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    comentarios_actividad_apoyo.modal.modalView("templates/components/gallery", {
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
