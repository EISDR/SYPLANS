app.controller("institucion", function ($scope, $http, $compile) {
    institucion = this;
    institucion.plural = "Institución";
    institucion.singular = "Instituciones";
    institucion.session = new SESSION().current();
    institucion.user_config = new SESSION().current();
    institucion.admin_company = "1";
    institucion.showmerelations = false;
    institucion.volver = function () {
        location.href = '#compania'
    };
    if (STORAGE.exist('config_lacompania')){
        baseController.lacompania = STORAGE.get('config_lacompania');
        compania = null;
    }
    if (STORAGE.exist('config_lacompania_nombre')){
        baseController.lacompania_nombre = STORAGE.get('config_lacompania_nombre');
    }
    if (!baseController.lacompania)
        location.href = "#compania";
    institucion.compania = baseController.lacompania;
    institucion.headertitle = "Instituciones que pertenecen a " + baseController.lacompania_nombre;
    institucion.fixFilters = [
        {
            "field": "compania",
            "value": baseController.lacompania
        }
    ];

    if (new SESSION().current().interinstitucional) {
        institucion.soyinter = true;
        // if (!new SESSION().current().intersectorial) {
        //     institucion.fixFilters.push(
        //         {
        //             "field": "responsable",
        //             "value": new SESSION().current().id
        //         }
        //     );
        // }
    } else if (!new SESSION().current().interinstitucional && new SESSION().current().institucion_id) {
        institucion.soyinter = true;
        institucion.fixFilters.push(
            {
                "field": "id",
                "value": new SESSION().current().institucion_id
            }
        );
    }


    RUNCONTROLLER("institucion", institucion, $scope, $http, $compile);

    institucion.removeUserFrominstitucion = (id) => new Promise((resolve, reject) => {
        BASEAPI.updateallp('usuario', {
            "institucion": "$NULL",
            where: [{
                "field": "institucion",
                "value": id
            }]
        }).then(function (result) {
            resolve(true);
        });
    });

    institucion.refrescar_responsable = function () {
        if (institucion.responsable) {
            institucion.list_responsable_admin = [];
            BASEAPI.list('usuario', {
                limit: 0,
                where: [{
                    "field": "profile",
                    "value": institucion.admin_company
                }]
            }, function (result) {
                console.log(result);

                for (var i of result.data) {
                    institucion.list_responsable_admin.push(i.id);
                }
                institucion.selectQueries["responsable"] = [
                    {
                        field: "id",
                        value: institucion.list_responsable_admin
                    },
                    {
                        field: "deleted_at",
                        operator: "",
                        value: "$ IS NULL"
                    }

                ];
                institucion.form.loadDropDown('responsable');
            });
        }
    };
    institucion.triggers.table.after.open = function (data) {
        institucion.refrescar_responsable();
    };
    institucion.triggers.table.after.load = function (data) {
        // if (institucion)
        //     institucion.setPermission("remove", false);
        if (!institucion.session.interinstitucional) {
            institucion.setPermission("add", false);
            institucion.setPermission("edit", false);
        }
        // if (!institucion.session.super) {
        //     institucion.setPermission("add", false);
        // }
        if (institucion.session.intersectorial) {
            institucion.setPermission("edit", true);
        }
        if (institucion.session.groups)
            if (institucion.session.groups.filter(d => d.caracteristica == ENUM_2.Grupos.director_general).length > 0) {
                institucion.setPermission("edit", true);
            }
        if (institucion.session.super) {
            institucion.setPermission("add", true);
            institucion.setPermission("edit", true);
            institucion.setPermission("remove", true);
        }
    };
    institucion.formulary = function (data, mode, defaultData) {
        institucion.old_responsable_edit = true;
        if (institucion !== undefined) {
            RUN_B("institucion", institucion, $scope, $http, $compile);
            institucion.form.titles = {
                new: "Crear - Institución",
                edit: "Editar - Institución",
                view: "Ver ALL - Institución"
            };

            var breakBucle = true;
            institucion.triggers.table.after.control = function (data) {
                if (data === "responsable" && breakBucle) {
                    institucion.refrescar_responsable();
                    breakBucle = false;
                }

                // if (!institucion.session.super) {
                //     if (institucion.form.options.nombre)
                //         institucion.form.options.nombre.readonly = true;
                //     if (institucion.form.options.tipo_institucion)
                //         institucion.form.options.tipo_institucion.disabled = true;
                //     if (institucion.form.options.sector)
                //         institucion.form.options.sector.disabled = true;
                //     if (institucion.form.options.responsable)
                //         institucion.form.options.responsable.disabled = true;
                //     institucion.refreshAngular();
                // }
            };

            institucion.form.readonly = {compania: baseController.lacompania};
            institucion.createForm(data, mode, defaultData);


            institucion.$scope.$watch('institucion.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(institucion, "nombre", rules)
            });

            institucion.$scope.$watch('institucion.telefono', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.telefono7(value));
                VALIDATION.validate(institucion, "telefono", rules)
            });

            institucion.$scope.$watch('institucion.tipo_institucion', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(institucion, "tipo_institucion", rules)
            });

            institucion.$scope.$watch('institucion.responsable', function (value) {
                if (institucion.old_responsable_edit && value) {
                    institucion.old_responsable = value;
                    institucion.old_responsable_edit = false;
                }
                var rules = [];
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(institucion, "responsable", rules)
            });


            var f = new Date();
            var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
            institucion.form.after.insert = function (data) {
                if (institucion.form.mode !== "new") {

                } else {


                    setTimeout(() => {

                        institucion.formulary({
                            where: [{
                                field: CRUD_institucion.table.key,
                                value: data.inserted.id
                            }]
                        }, FORM.modes.edit, {});

                    }, 1500);
                }
                return false;
            };

            institucion.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
                if (institucion.form.mode !== "new") {
                    console.log(`institucion.triggers.table.before.update ${institucion.modelName}`);
                    if (institucion.responsable) {
                        if (institucion.old_responsable != institucion.responsable) {
                            BASEAPI.first('usuario', {
                                "where": [
                                    {
                                        "field": "id",
                                        "operator": "=",
                                        "value": institucion.responsable
                                    },
                                    {
                                        "field": "deleted_at",
                                        "operator": "",
                                        "value": "$ IS NULL"
                                    }
                                ]
                            }, function (rs_usuario) {
                                console.log(rs_usuario);

                                BASEAPI.updateall('usuario', {
                                    "esadmin": 0,
                                    "updated_at": fecha,
                                    "created_by": new SESSION().current().usuario_id,
                                    where: [{
                                        "field": "id",
                                        "value": institucion.old_responsable
                                    }]
                                }, function (result) {
                                    SWEETALERT.stop();
                                    resolve(true);
                                });

                            });

                        } else {
                            resolve(true);
                        }
                    }
                } else {
                    resolve(true);
                }
            });

            institucion.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                console.log(data);
                if (institucion.form.mode !== "new") {
                    if (institucion.responsable) {
                        BASEAPI.first('usuario', {
                            "where": [
                                {
                                    "field": "id",
                                    "operator": "=",
                                    "value": institucion.responsable
                                },
                                {
                                    "field": "deleted_at",
                                    "operator": "",
                                    "value": "$ IS NULL"
                                }
                            ]
                        }, function (rs_usuario) {
                            console.log(rs_usuario);
                            if (rs_usuario.institucion != null) {
                                SWEETALERT.confirm({
                                    message: 'Este usuario ya pertenece a una Institución, desea desvincularlo y que pertenezca a esta Institución?',
                                    confirm: function () {
                                        SWEETALERT.loading({message: ""});
                                        SWEETALERT.stop();
                                        console.log("otro1");
                                        resolve(true);
                                    }
                                });
                            } else {
                                resolve(true);
                            }
                        });
                    }
                } else {
                    resolve(true);
                }

            });
        }
    };
});
