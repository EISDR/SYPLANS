app.controller("ods", function ($scope, $http, $compile) {
    ods = this;
    // ods.fixFilters = [
    //     {
    //         "field": "compania",
    //         "value": new SESSION().current().compania_id
    //     }
    // ];
    ods.session = new SESSION().current();
    ods.group_caracteristica = ods.session.groups[0] ? ods.session.groups[0].caracteristica : "";
    RUNCONTROLLER("ods", ods, $scope, $http, $compile);
    ods.singular = MESSAGE.i('columns.ods_singular');
    ods.plural = MESSAGE.i('columns.ods_plural');
    ods.headertitle = "Objetivos de Desarrollo Sostenible";
    ods.formulary = function (data, mode, defaultData) {
        if (ods !== undefined) {
            RUN_B("ods", ods, $scope, $http, $compile);
            ods.form.titles = {
                new: MESSAGE.i('planificacion.titleODS'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titleODS')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleODS')}`
            };
            ods.form.readonly = {};
            ods.createForm(data, mode, defaultData);
            ods.$scope.$watch('ods.edt', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(ods, "edt", rules);
            });
            ods.$scope.$watch('ods.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(ods, "nombre", rules);
            });
            ods.$scope.$watch('ods.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(ods, "descripcion", rules);
            });
        }
    };

    ods.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        var validatett = await BASEAPI.firstp("ods", {
            where: [
                {
                    field: "edt",
                    operator: "=",
                    value: data.inserting.edt
                }
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un registro con el No. Secuencia: " + data.inserting.edt
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    ods.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (ods.edt)
            data.updating.edt = ods.edt;
        var validatett = await BASEAPI.firstp("ods", {
            where: [
                {
                    field: "edt",
                    operator: "=",
                    value: data.updating.edt
                },
                {
                    field: "id",
                    operator: "!=",
                    value: ods.id
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un registro con el No. Secuencia: " + data.updating.edt
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });

    ods.triggers.table.after.load = async function (records) {
        // CRUD_ods.table.filters.columns.splice(0, 1);
        // CRUD_ods.table.filters.columns[0].label = MESSAGE.i('planificacion.titleODS');
        // CRUD_ods.table.filters.columns[0].placeholder = MESSAGE.i('planificacion.titleODS');
        ods.fileSI = [];
        if (records.data) {
            for (var items of records.data) {
                ods.files = () => new Promise(async (resolve, reject) => {
                    BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/ods/odsimage/' + items.id}, function (result) {
                        if (result.data.count > 0) {
                            ods.fileSI.push({id: items.id});
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
                await ods.files();
                ods.refreshAngular();
            }
        }
        ods.runMagicOneToMany('metas_grid', 'vw_mods', "ods", "nombre", "id");
        ods.refreshAngular();
    };
    ods.verFile = function (key, value, row) {
        ods.setPermission("file.upload", false);
        if (ods.group_caracteristica !== ENUM_2.Grupos.director_general) {
            ods.setPermission("file.remove", false);
        } else {
            ods.setPermission("file.remove", true);
        }
        if (typeof ods !== 'null') {
            if (ods) {
                var info = ods.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/ods/odsimage/" + row.id, row);
                    ods.showfiletypes = function () {
                        var modal = {
                            width: "modal-full",
                            header: {
                                title: "Ver Imagen del ODS",
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
                        ods.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'ods',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    ods.modal.modalView("templates/components/gallery", {
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
