app.controller("usuario", function ($scope, $http, $compile) {
    usuario = this;

    var session = new SESSION().current();
    var general_cargo = null;
    var general_departamento = null;
    if (typeof compania !== "undefined") {
        if (compania) {
            session.compania_id = compania.id;
        } else if (baseController.lacompania) {
            session.compania_id = baseController.lacompania;
        } else {
            session.compania_id = new SESSION().current().compania_id;
        }
    }
    usuario.session = session;
    usuario.validar_usuario = session.super;
    usuario.validar_responsable_actividades = true;
    usuario.compania_id = session.compania_id === null ? 0 : session.compania_id;
    usuario.headertitle = "Usuarios";

    if (typeof compania === "undefined")
        compania = null;
    if (usuario.compania_id) {
        usuario.compania_query = {
            "field": "compania",
            "value": (compania || {id: undefined}).id || usuario.compania_id
        };

    } else {
        usuario.compania_query = {"field": "ISNULL(compania)"};
    }


    BASEAPI.first('cargo', {
        where: [{
            "field": "nombre",
            "value": "General"
        }]
    }, function (result) {
        if (result) {
            general_cargo = result.id;
        }
    });
    BASEAPI.first('departamento', {
        where: [{
            "field": "nombre",
            "value": "General"
        }]
    }, function (result) {
        if (result) {
            general_departamento = result.id;
        }
    });
    RUNCONTROLLER("usuario", usuario, $scope, $http, $compile);
    TRIGGER.run(usuario);

    CheckuserStatus = (email) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
        SERVICE.base_auth.loginStatus({username: email}, function (data) {
            if (data.data.error === "Account is Locked") {
                resolve("Bloqueado");
            } else {
                resolve("Desbloqueado");
            }
        });

    });
    usuario.triggers.table.after.load = async function (records) {
        usuario.setPermission("import", false);
        if (usuario.validar_usuario) {
            CRUD_usuario.table.columns.compania_nombre.export = true;
            CRUD_usuario.table.columns.compania_nombre.visible = true;
            CRUD_usuario.table.columns.compania_nombre.visibleDetail = true;
            CRUD_usuario.table.columns.compania_nombre.exportExample = true;
        }
        usuario.runMagicColum('profile', 'group', "id", "name");
        usuario.runMagicManyToMany('departamento_secundario', 'departamento',
            'usuario', 'id', 'nombre', 'usuario_departamento',
            'departamento', 'id')
        //
        for (var i of usuario.records.data) {
            var status = await CheckuserStatus(i.correo);
            i.usuario_estatus = status;
        }

        if (typeof institucion !== "undefined") {
            if (institucion)
                if (institucion.refrescar_responsable) {
                    institucion.refrescar_responsable();
                }
        }

        if (typeof compania !== "undefined") {
            if (compania)
                if (compania.refrescar_responsable) {
                    compania.refrescar_responsable();
                }
        }

        usuario.refreshAngular();
    };
    usuario.permissionTable = "usuario";
    if (session.super) {
        usuario.fixFilters = [];
    } else {
        usuario.fixFilters = [
            {
                "field": "compania",
                "value": (compania || {id: undefined}).id || usuario.compania_id
            }
        ];
        CRUD_usuario.table.filters.columns.splice(6, 1);
    }

    if (typeof institucion === "undefined") {
        usuario.fixFilters.push(
            {
                "field": "institucion",
                "operator": "IS",
                "value": "$NULL"
            }
        );
    } else {
        if (institucion === null) {
            usuario.fixFilters.push(
                {
                    "field": "institucion",
                    "operator": "IS",
                    "value": "$NULL"
                }
            );
        }
    }

    usuario.formulary = function (data, mode, defaultData, view) {
        if (usuario !== undefined) {
            RUN_B("usuario", usuario, $scope, $http, $compile);
            usuario.form.titles = {
                new: MESSAGE.i('planificacion.titleUsuario'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titleUsuario')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleUsuario')}`
            };
            if (typeof My_profile_var !== 'not defined') {
                if (typeof My_profile_var != "undefined") {
                    if (My_profile_var) {
                        usuario.form.titles = {
                            edit: "Editar - " + `${MESSAGE.i('planificacion.titleUsuario')} (${usuario.session.institucion || usuario.session.compania})`,
                        }
                    }
                }
            }
            usuario.exist_options = false;
            usuario.triggers.table.after.close = function (data) {
                if (typeof compania != "undefined" && compania != null) {
                    compania.refrescar_responsable();
                }
                delete My_profile_var;
            };
            usuario.triggers.table.after.control = function (data) {
                if (data === "group") {
                    $('[name="usuario_group"]').trigger("change");
                }
                if (data === "departamento") {
                    if (usuario.form.selected('departamento') == null) {
                        usuario.form.options.departamento.allowedit = false;
                        usuario.exist_options = true;
                        usuario.refreshAngular();
                    } else {
                        usuario.form.options.departamento.allowedit = true;
                        usuario.exist_options = true;
                        usuario.refreshAngular();
                    }
                }
                if (data === 'profile') {
                    if (typeof My_profile_var !== 'not defined') {
                        if (typeof My_profile_var != "undefined") {
                            if (My_profile_var) {
                                usuario.form.options.profile.disabled = true;
                                usuario.form.options.departamento.disabled = true;
                                usuario.form.options.cargo.disabled = true;
                                // usuario.form.options.departamentos.disabled = true;
                                usuario.refreshAngular();
                            }
                        }
                    } else {
                        usuario.form.options.profile.disabled = false;
                        usuario.form.options.departamento.disabled = false;
                        usuario.form.options.cargo.disabled = false;
                        // usuario.form.options.departamentos.disabled = false;
                        usuario.refreshAngular();
                    }
                }
            };
            usuario.triggers.table.before.control = function (data) {
                if (data === 'usuario_activo') {
                    usuario.usuario_activo = usuario.active;
                    usuario.refreshAngular();
                }
                //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
            };

            usuario.valid = false;


            usuario.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
                if ((compania || {id: undefined}).id)
                    data.inserting.compania = (compania || {id: undefined}).id || null;
                // if (session.super) {
                //     data.inserting["cargo"] = general_cargo;
                //     data.inserting["departamento"] = general_departamento;
                // }
                data.inserting.usuario_activo = undefined;
                resolve(true);
            });

            usuario.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
                //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
                data.updating.usuario_activo = undefined;
                resolve(true);
            });

            usuario.triggers.table.before.load = () => new Promise((resolve, reject) => {
                //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
                resolve(true);
            });

            usuario.form.readonly.active = 1;

            if (typeof institucion !== "undefined") {
                if (institucion) {
                    usuario.form.readonly.institucion = institucion.id;
                    usuario.form.readonly.compania = baseController.lacompania;
                    usuario.form.readonly.user_activo = undefined;
                }
            } else {
                if (typeof compania !== "undefined") {

                    if (compania) {
                        usuario.form.readonly = {
                            compania: compania.id,
                            active: 1,
                            user_activo: undefined
                        };
                    }
                }
            }

            usuario.form.schemas.insert.usuario_activo = FORM.schemasType.calculated;
            usuario.form.schemas.update.usuario_activo = FORM.schemasType.calculated;
            usuario.form.schemas.insert.repeatPassword = FORM.schemasType.calculated;
            if (session.compania_id != null) {
                usuario.selectQueries["departamento"] = [
                    {
                        "field": "compania",
                        "value": (compania || {id: undefined}).id || usuario.compania_id
                    }
                ];
                usuario.selectQueries["cargo"] = [
                    {
                        "field": "compania",
                        "value": (compania || {id: undefined}).id || usuario.compania_id
                    }
                ];
                // usuario.selectQueries["departamentos"] = [
                //     {
                //         "field": "compania",
                //         "value": (compania || {id: undefined}).id || usuario.compania_id
                //     }
                // ];
            } else {
                usuario.selectQueries["departamento"] = [
                    {
                        "field": "compania",
                        "value": (compania || {id: undefined}).id || "$null"
                    }
                ];
                // usuario.selectQueries["departamentos"] = [
                //     {
                //         "field": "compania",
                //         "value": (compania || {id: undefined}).id || "$null"
                //     }
                // ];
                usuario.selectQueries["cargo"] = [
                    {
                        "field": "compania",
                        "value": (compania || {id: undefined}).id || "$null"
                    }
                ];
            }
            if (typeof My_profile_var !== 'not defined') {
                if (typeof My_profile_var != "undefined") {
                    if (My_profile_var && usuario.session.institucion_id) {
                        usuario.selectQueries["departamento"] = [
                            {
                                "field": "institucion",
                                "value": usuario.session.institucion_id
                            }
                        ];
                        // usuario.selectQueries["departamentos"] = [
                        //     {
                        //         "field": "institucion",
                        //         "value": usuario.session.institucion_id
                        //     }
                        // ]
                        usuario.selectQueries["cargo"] = [
                            {
                                "field": "institucion",
                                "value": usuario.session.institucion_id
                            }
                        ];
                    }
                }
            }
            usuario.createForm(data, mode, defaultData, view);
            usuario.repeatPassword = "[Encrypted]";
            usuario.$scope.$watch('usuario.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(usuario, "nombre", rules)
            });
            usuario.$scope.$watch('usuario.apellido', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(usuario, "apellido", rules)
            });
            usuario.$scope.$watch('usuario.correo', async function (value) {
                var rules = [];
                if (usuario.form.mode === "edit") {
                    var result = await BASEAPI.firstp('usuario', {
                        "where": [
                            // {
                            //     "field": "compania",
                            //     "value": usuario.compania_id
                            // },
                            {
                                "field": "correo",
                                "value": value
                            },
                            {
                                "field": "id",
                                "operator": "!=",
                                "value": usuario.id
                            }
                        ]
                    });
                    console.log("En el watch del edit", usuario.result);
                } else {
                    var result = await BASEAPI.firstp('usuario', {
                        "where": [
                            // {
                            //     "field": "compania",
                            //     "value": usuario.compania_id
                            // },
                            {
                                "field": "correo",
                                "value": value
                            }
                        ]
                    });
                }
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.email(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                rules.push(VALIDATION.yariel.duplicateEmail(value, result ? result.correo : ""));
                VALIDATION.validate(usuario, "correo", rules);
                usuario.refreshAngular();
            });
            usuario.$scope.$watch('usuario.cargo', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(usuario, "cargo", rules)
            });
            usuario.$scope.$watch('usuario.departamento', function (value) {
                if (usuario.form.selected('departamento') == null && usuario.exist_options) {
                    usuario.form.options.departamento.allowedit = false;
                    usuario.refreshAngular();
                } else {
                    try {
                        usuario.form.options.departamento.allowedit = true;
                    } catch (err) {
                    }
                }
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(usuario, "departamento", rules)
            });
            usuario.$scope.$watch('usuario.profile', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                // rules.push(VALIDATION.dropdown.atLeast(value, 1));
                VALIDATION.validate(usuario, "profile", rules)
                if (usuario.form.selected('profile').caracteristica === "AU"){
                    VALIDATION.validate(usuario, "tipo_auditor", [{
                        valid: !DSON.oseaX0(usuario.tipo_auditor),
                        message: MESSAGE.i('validations.Fieldisrequired'),
                        type: VALIDATION.types.error,
                        visible: false
                    }]);
                    usuario.refreshAngular()
                }else{
                    VALIDATION.validate(usuario, "tipo_auditor", [{
                        valid: true,
                        message: MESSAGE.i('validations.Fieldisrequired'),
                        type: VALIDATION.types.error,
                        visible: false
                    }]);
                    usuario.tipo_auditor = "[NULL]";
                    usuario.form.loadDropDown('tipo_auditor');
                    usuario.refreshAngular()
                }
            });
            usuario.$scope.$watch('usuario.tipo_auditor', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(usuario, "tipo_auditor", rules)
            });
            usuario.$scope.$watch('usuario.password', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.equal(value, usuario.repeatPassword, "Contraseña", "Repetir Contraseña"));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(usuario, "password", rules)

                var rules2 = [];
                rules2.push(VALIDATION.general.required(value));
                rules2.push(VALIDATION.yariel.equal(usuario.repeatPassword, value, "Repetir Contraseña", "Contraseña"));
                VALIDATION.validate(usuario, "repeatPassword", rules2);
            });
            usuario.$scope.$watch('usuario.repeatPassword', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.equal(value, usuario.password, "Repetir Contraseña", "Contraseña"));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(usuario, "repeatPassword", rules);

                var rules2 = [];
                rules2.push(VALIDATION.general.required(usuario.password));
                rules2.push(VALIDATION.yariel.equal(usuario.password, usuario.repeatPassword, "Contraseña", "Repetir Contraseña"));
                VALIDATION.validate(usuario, "password", rules2)
            });

        }
    };
    usuario.triggers.table.before.open = () => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
        if (usuario.form.mode === "new")
            usuario.id = undefined;
        resolve(true);
    });
});
