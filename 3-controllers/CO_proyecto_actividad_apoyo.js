app.controller("proyecto_actividad_apoyo", function ($scope, $http, $compile) {
    proyecto_actividad_apoyo = this;
    proyecto_actividad_apoyo.session = new SESSION().current();
    //proyecto_actividad_apoyo.fixFilters = [];
    //proyecto_actividad_apoyo.singular = "singular";
    //proyecto_actividad_apoyo.plural = "plural";
    proyecto_actividad_apoyo.headertitle = "Actividades de apoyo";
    proyecto_actividad_apoyo.group_caracteristica = proyecto_actividad_apoyo.session.groups[0] ? proyecto_actividad_apoyo.session.groups[0].caracteristica : "";
        //proyecto_actividad_apoyo.destroyForm = false;
    //proyecto_actividad_apoyo.permissionTable = "tabletopermission";
    RUNCONTROLLER("proyecto_actividad_apoyo", proyecto_actividad_apoyo, $scope, $http, $compile);
    proyecto_actividad_apoyo.formulary = async function (data, mode, defaultData) {
        if (proyecto_actividad_apoyo !== undefined) {
            RUN_B("proyecto_actividad_apoyo", proyecto_actividad_apoyo, $scope, $http, $compile);
            proyecto_actividad_apoyo.form.modalWidth = ENUM.modal.width.full;
            proyecto_actividad_apoyo.form.readonly = {};
            proyecto_actividad_apoyo.createForm(data, mode, defaultData);
            proyecto_actividad_apoyo.do_once = false;
            $scope.$watch("proyecto_actividad_apoyo.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'nombre', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'descripcion', rules);
            });
            //ms_product.selectQueries['proyecto_actividad'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_actividad_apoyo.proyecto_actividad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'proyecto_actividad', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.estatus", function (value) {
                var rules = [];
                //rules here
                VALIDATION.validate(proyecto_actividad_apoyo, 'estatus', rules);
            });
            //ms_product.selectQueries['departamento'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_actividad_apoyo.departamento", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'departamento', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.fecha_inicio", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'fecha_inicio', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.range_date", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'range_date', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.fecha_fin", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'fecha_fin', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_actividad_apoyo.responsable", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'responsable', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'tempid', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.departamento_solicitante", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'departamento_solicitante', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.presupuesto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'presupuesto', rules);
            });
            //ms_product.selectQueries['razon'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_actividad_apoyo.razon", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'razon', rules);
            });
            //ms_product.selectQueries['tipo_inversion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_actividad_apoyo.tipo_inversion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'tipo_inversion', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.maneja_presupuesto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'maneja_presupuesto', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.calificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'calificacion', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.clasificador_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'clasificador_id', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.maneja_presupuesto_act_apoyo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'maneja_presupuesto_act_apoyo', rules);
            });
            $scope.$watch("proyecto_actividad_apoyo.cantidad_completa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_apoyo, 'cantidad_completa', rules);
            });
            proyecto_actividad_apoyo.triggers.table.after.control = function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
                if (data == 'estatus' && mode == 'new'){
                    if (!proyecto_actividad_apoyo.do_once) {
                        proyecto_actividad_apoyo.estatus = '1';
                        proyecto_actividad_apoyo.form.loadDropDown('estatus');
                        proyecto_actividad_apoyo.do_once = true;
                    }
                }
                if (data == 'range_date') {
                    var rango_minimo = moment(proyecto_item_actividad.from).format("YYYY-MM-DD");
                    var rango_maximo = moment(proyecto_item_actividad.to).format("YYYY-MM-DD");

                    proyecto_actividad_apoyo.range_date_min(rango_minimo);
                    proyecto_actividad_apoyo.range_date_max(rango_maximo);
                    proyecto_actividad_apoyo.refreshAngular();
                }
            };
        }
    };
    proyecto_actividad_apoyo.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        proyecto_actividad_apoyo.fileSI = [];
        if (records.data) {
            if (records.data.length > 0) {
                for (var items of records.data) {
                    proyecto_actividad_apoyo.files = () => new Promise(async (resolve, reject) => {
                        BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/vw_proyecto_actividad_apoyo/actividad_apoyofile_comment/' + items.id}, function (result) {
                            if (result.data.count > 0) {
                                proyecto_actividad_apoyo.fileSI.push({id: items.id});
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
                    await proyecto_actividad_apoyo.files();
                    proyecto_actividad_apoyo.refreshAngular();
                }
            }
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
    proyecto_actividad_apoyo.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        if(DSON.oseaX(proyecto_actividad_apoyo.presupuesto)) {
            data.inserting.presupuesto  = "$null"
        }
        if (moment(proyecto_actividad_apoyo.fecha_inicio) >= moment(proyecto_item_actividad.from) && moment(proyecto_actividad_apoyo.fecha_fin) <= moment(proyecto_item_actividad.to)) {
            resolve(true);
        } else {
            var template = `Las fechas de inicio y fin de esta actividad deben estar comprendidas entre el ${LAN.date(proyecto_item_actividad.from)} y el ${LAN.date(proyecto_item_actividad.to)}`;
            SWEETALERT.show({type: 'error', message: `${template}`});
            resolve(false);
        }
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    proyecto_actividad_apoyo.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        if(DSON.oseaX(proyecto_actividad_apoyo.presupuesto)) {
            data.updating.presupuesto  = "$null"
        }
        if (moment(proyecto_actividad_apoyo.fecha_inicio) >= moment(proyecto_item_actividad.from) && moment(proyecto_actividad_apoyo.fecha_fin) <= moment(proyecto_item_actividad.to)) {
            resolve(true);
        } else {
            var template = `Las fechas de inicio y fin de esta actividad deben estar comprendidas entre el ${LAN.date(proyecto_item_actividad.from)} y el ${LAN.date(proyecto_item_actividad.to)}`;
            SWEETALERT.show({type: 'error', message: `${template}`});
            resolve(false);
        }
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
    proyecto_actividad_apoyo.verFile = function (key, value, row) {
        proyecto_actividad_apoyo.setPermission("file.upload", false);
        if (proyecto_actividad_apoyo.group_caracteristica !== ENUM_2.Grupos.director_general){
            proyecto_actividad_apoyo.setPermission("file.remove", false);
        }else{
            proyecto_actividad_apoyo.setPermission("file.remove", true);
        }
        if (typeof proyecto_actividad_apoyo !== 'null') {
            if (proyecto_actividad_apoyo) {
                var info = proyecto_actividad_apoyo.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/vw_proyecto_actividad_apoyo/actividad_apoyofile_comment/" + row.id, row);
                    proyecto_actividad_apoyo.showfiletypes = function () {
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
                        proyecto_actividad_apoyo.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'proyecto_item_actividad',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    proyecto_actividad_apoyo.modal.modalView("templates/components/gallery", {
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