app.controller("compania", function ($scope, $http, $compile) {
    compania = this;
    compania.showmerelations = false;
    compania.plural = "Compañía";
    compania.singular = "Compañía";
    compania.session = new SESSION().current();
    compania.user_config = new SESSION().current();
    compania.admin_company = "1";
    if (!compania.session.super && compania.session.intersectorial) {
        compania.fixFilters = [
            {
                "field": "tipo_institucion",
                "value": 1
            },
            {
                "field": "sector",
                "value": compania.session.sector_id
            }
        ];

        if (!CRUD_compania.table.columns.sector_nombre) {
            CRUD_compania.table.columns.sector_nombre = {
                label: "Sector",
                shorttext: 370
            };
        }

    } else if (compania.session.interinstitucional) {
        compania.fixFilters = [
            {
                "field": "id",
                "value": compania.session.compania_id
            }
        ];
    } else {
        compania.fixFilters = [
            {
                "field": "id",
                "value": compania.session.compania_id
            }
        ];
    }

    if (compania.session.super) {
        compania.fixFilters = [];
    }


    RUNCONTROLLER("compania", compania, $scope, $http, $compile);


    compania.removeUserFromCompania = (id) => new Promise((resolve, reject) => {
        BASEAPI.updateallp('usuario', {
            "compania": "$NULL",
            where: [{
                "field": "compania",
                "value": id
            }]
        }).then(function (result) {
            resolve(true);
        });
    });

    compania.refrescar_responsable = function () {
        if (compania.responsable) {
            compania.list_responsable_admin = [];
            BASEAPI.list('usuario', {
                limit: 0,
                where: [{
                    "field": "profile",
                    "value": compania.admin_company
                }]
            }, function (result) {
                console.log(result);

                for (var i of result.data) {
                    compania.list_responsable_admin.push(i.id);
                }
                compania.selectQueries["responsable"] = [
                    {
                        field: "id",
                        value: compania.list_responsable_admin
                    },
                    {
                        field: "deleted_at",
                        operator: "",
                        value: "$ IS NULL"
                    }

                ];
                compania.form.loadDropDown('responsable');
            });
        }
    };
    compania.triggers.table.after.open = function (data) {
        compania.refrescar_responsable();

    };
    compania.filter_general = function () {
        if (typeof direcciones_generales !== 'undefined') {
            if (typeof direcciones_generales !== 'not defined') {
                if (direcciones_generales) {
                    RELATIONS.anonymous.direcciones_generales = RELATIONS.anonymous.viceministerios;
                    direcciones_generales.show_field = true;
                    direcciones_area.show_field = false;
                    setTimeout(function (){
                        $('#direcciones_generales i.loadingButton').parent().trigger('click');
                    },500);
                }
            }
        }
    };
    compania.filter_area = function () {
        if (typeof direcciones_area !== 'undefined') {
            if (typeof direcciones_area !== 'not defined') {
                if (direcciones_area) {
                    RELATIONS.anonymous.direcciones_area = RELATIONS.anonymous.direcciones_generales;
                    direcciones_generales.show_field = false;
                    direcciones_area.show_field = true;
                    setTimeout(function (){
                        $('#direcciones_area i.loadingButton').parent().trigger('click');
                    },500);
                }
            }
        }
    };
    compania.undo_todo = function (){
        direcciones_area.show_field = false;
        direcciones_generales.show_field = false;
    };
    compania.triggers.table.after.load = function (data) {
        if (!compania.session.super) {
            compania.setPermission("add", false);
            compania.setPermission("remove", false);
        }
        if (!compania.session.intersectorial) {
            compania.setPermission("add", false);
            if (compania.session.groups)
                if (compania.session.groups.filter(d => d.caracteristica == ENUM_2.Grupos.director_general).length > 0)
                    compania.setPermission("instituciones", true);
            //compania.setPermission("edit", false);
        }

        if (compania.session.interinstitucional) {
            compania.setPermission("instituciones", true);
        }
        if (compania.session.super) {
            compania.setPermission("add", true);
            compania.setPermission("edit", true);
        }
        if (compania.session.institucion_id) {
            baseController.lacompania = compania.records.data[0].id;
            baseController.lacompania_nombre = compania.records.data[0].nombre;
            location.href = "#institucion";
        }
    };
    compania.formulary = function (data, mode, defaultData) {
        compania.old_responsable_edit = true;

        if (compania !== undefined) {
            RUN_B("compania", compania, $scope, $http, $compile);

            var breakBucle = true;
            compania.triggers.table.after.control = function (data) {
                if (data === "responsable" && breakBucle) {
                    compania.refrescar_responsable();
                    breakBucle = false;
                }
                if (!compania.session.super) {
                    if (compania.form.options.nombre)
                        compania.form.options.nombre.readonly = true;
                    if (compania.form.options.tipo_institucion)
                        compania.form.options.tipo_institucion.disabled = true;
                    if (compania.form.options.sector)
                        compania.form.options.sector.disabled = true;
                    if (compania.form.options.responsable)
                        compania.form.options.responsable.disabled = true;
                    compania.refreshAngular();
                }
            };


            compania.form.readonly = {};
            compania.createForm(data, mode, defaultData);
            compania.form.titles = {
                new: "Agregar - Compañía",
            };
            compania.$scope.$watch('compania.sigla', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(compania, "sigla", rules)
            });
            compania.$scope.$watch('compania.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(compania, "nombre", rules)
            });

            compania.$scope.$watch('compania.sigla', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(compania, "sigla", rules)
            });

            compania.$scope.$watch('compania.telefono', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.telefono7(value));
                VALIDATION.validate(compania, "telefono", rules)
            });

            compania.$scope.$watch('compania.tipo_institucion', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(compania, "tipo_institucion", rules)
            });

            compania.$scope.$watch('compania.responsable', function (value) {
                if (compania.old_responsable_edit && value) {
                    compania.old_responsable = value;
                    compania.old_responsable_edit = false;
                }
                var rules = [];
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(compania, "responsable", rules)
            });


            var f = new Date();
            var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
            compania.form.after.insert = function (data) {
                if (compania.form.mode !== "new") {
                    BASEAPI.updateall('usuario', {
                        "compania": data.inserted.id,
                        "esadmin": 1,
                        "created_at": fecha,
                        "created_by": new SESSION().current().usuario_id,
                        where: [{
                            "field": "id",
                            "value": compania.responsable
                        }]
                    }, function (result) {

                    });
                } else {
                    let queryTopas = `INSERT INTO compania_config
select  ${data.inserted.id},pacc,institucional,sectorial,ods,estatus_productoXactividades,notificaciones_correo,notificaciones_push,planificacion,asignaciones_especiales,ipn,proceso,proyectos_especiales,gestion_indicadores,riesgo_var,riesgo_amfe,plan_accion,salidas,servicio,documentos_externos,formularios,reporte_configurable,plantillas_ods,import_masivo,historial_acceso,mesa_ayuda,repositorio_archivos,interfaces,color_principal,color_secundario,dias_de_gracia,hora_notificacion,onesignal_key,onesignal_appauth,onesignal_appid,carga_evidencia_abierta,smtp_host,smtp_port,smtp_ssl,smtp_email,smtp_password,smtp_sender,smtp_sender_name,instrumentos,documento,auditoria,norma_iso,notificaciones from compania_config limit 1`;

                    SERVICE.base_db.directQuery({query: queryTopas}, async (result) => {

                        setTimeout(() => {

                            compania.formulary({
                                where: [{
                                    field: CRUD_compania.table.key,
                                    value: data.inserted.id
                                }]
                            }, FORM.modes.edit, {});

                        }, 1500);
                    });
                }
                return false;
            };

            compania.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
                if (compania.form.mode !== "new") {
                    console.log(`compania.triggers.table.before.update ${compania.modelName}`);
                    if (compania.responsable) {
                        if (compania.old_responsable != compania.responsable) {
                            BASEAPI.first('usuario', {
                                "where": [
                                    {
                                        "field": "id",
                                        "operator": "=",
                                        "value": compania.responsable
                                    },
                                    {
                                        "field": "deleted_at",
                                        "operator": "",
                                        "value": "$ IS NULL"
                                    }
                                ]
                            }, function (rs_usuario) {
                                console.log(rs_usuario);
                                if (rs_usuario.compania != null && rs_usuario.compania != compania.id) {
                                    SWEETALERT.confirm({
                                        message: 'Este usuario ya pertenece a una compañía, desea desvincularlo y que pertenezca a esta compañía?',
                                        confirm: function () {
                                            SWEETALERT.loading({message: ""});
                                            BASEAPI.updateall('usuario', {
                                                "esadmin": 0,
                                                "updated_at": fecha,
                                                "created_by": new SESSION().current().usuario_id,
                                                where: [{
                                                    "field": "id",
                                                    "value": compania.old_responsable
                                                }]
                                            }, function (result) {
                                                BASEAPI.updateall('usuario', {
                                                    "compania": compania.id,
                                                    "esadmin": 1,
                                                    "created_by": new SESSION().current().usuario_id,
                                                    where: [{
                                                        "field": "id",
                                                        "value": compania.responsable
                                                    }]
                                                }, function (result1) {

                                                    SWEETALERT.stop();
                                                    console.log(compania.old_responsable, compania.responsable);
                                                    // SWEETALERT.show({message: ``});

                                                    resolve(true);
                                                });

                                            });
                                        }
                                    });

                                } else {
                                    BASEAPI.updateall('usuario', {
                                        "esadmin": 0,
                                        "updated_at": fecha,
                                        "created_by": new SESSION().current().usuario_id,
                                        where: [{
                                            "field": "id",
                                            "value": compania.old_responsable
                                        }]
                                    }, function (result) {
                                        BASEAPI.updateall('usuario', {
                                            "compania": compania.id,
                                            "esadmin": 1,
                                            "created_by": new SESSION().current().usuario_id,
                                            where: [{
                                                "field": "id",
                                                "value": compania.responsable
                                            }]
                                        }, function (result1) {
                                            console.log("otro");
                                            resolve(true);
                                        });

                                    });
                                }
                            });

                        } else {
                            resolve(true);
                        }
                    }
                } else {
                    resolve(true);
                }
            });

            compania.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                console.log(data);
                if (compania.form.mode !== "new") {
                    if (compania.responsable) {
                        BASEAPI.first('usuario', {
                            "where": [
                                {
                                    "field": "id",
                                    "operator": "=",
                                    "value": compania.responsable
                                },
                                {
                                    "field": "deleted_at",
                                    "operator": "",
                                    "value": "$ IS NULL"
                                }
                            ]
                        }, function (rs_usuario) {
                            console.log(rs_usuario);
                            if (rs_usuario.compania != null) {
                                SWEETALERT.confirm({
                                    message: 'Este usuario ya pertenece a una compañía, desea desvincularlo y que pertenezca a esta compañía?',
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
