app.controller("solicitud_documento", function ($scope, $http, $compile) {
    solicitud_documento = this;
    solicitud_documento.session = new SESSION().current();
    solicitud_documento.fixFilters = [
        {
            field: "compania",
            value: solicitud_documento.session.compania_id
        },
        {
            "field": "institucion",
            "operator": solicitud_documento.session.institucion_id ? "=" : "is",
            "value": solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null"
        }
    ];
    solicitud_documento.NoShowWarningClose = true;
    //solicitud_documento.singular = "singular";
    //solicitud_documento.plural = "plural";
    solicitud_documento.headertitle = "Solicitud de Documento";
    //solicitud_documento.destroyForm = false;
    //solicitud_documento.permissionTable = "tabletopermission";
    solicitud_documento.my_true_estatus = 1;
    solicitud_documento.show_actividades = false;
    solicitud_documento.caracteristica = solicitud_documento.session.groups[0].caracteristica;
    solicitud_documento.canStatus = "";
    solicitud_documento.showmerelations = false;
    solicitud_documento.loaded = false;
    solicitud_documento.getMapaProceso = async function (callback) {
        var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value: solicitud_documento.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": solicitud_documento.session.institucion_id ? "=" : "is",
                    "value": solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (mapaData) {
            solicitud_documento.mapa_id = mapaData.id;
            solicitud_documento.fixFilters = [
                {
                    field: "compania",
                    value: solicitud_documento.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": solicitud_documento.session.institucion_id ? "=" : "is",
                    "value": solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null"
                },
                {
                    field: "mapa_proceso",
                    value: solicitud_documento.mapa_id ? solicitud_documento.mapa_id : -1
                }
            ];
        } else {
            solicitud_documento.fixFilters = [
                {
                    field: "compania",
                    value: solicitud_documento.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": solicitud_documento.session.institucion_id ? "=" : "is",
                    "value": solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null"
                },
                {
                    field: "mapa_proceso",
                    value: -1
                }
            ];
        }
        solicitud_documento.refresh();
        if (callback)
            callback();
    }
    solicitud_documento.getMapaProceso();
    RUNCONTROLLER("solicitud_documento", solicitud_documento, $scope, $http, $compile);
    solicitud_documento.formulary = function (data, mode, defaultData) {
        if (solicitud_documento !== undefined) {
            RUN_B("solicitud_documento", solicitud_documento, $scope, $http, $compile);
            solicitud_documento.form.modalWidth = ENUM.modal.width.full;
            solicitud_documento.form.readonly = {
                solicitante: solicitud_documento.session.id,
                compania: solicitud_documento.session.compania_id,
                institucion: solicitud_documento.session.institucion_id,
                mapa_proceso: solicitud_documento.mapa_id
            };
            solicitud_documento.createForm(data, mode, defaultData);
            solicitud_documento.form.titles = {
                new: "Nueva Solicitud de Documento",
            };
            let do_me_once = false;
            var do_meOnce = false;
            solicitud_documento.selectQueries['estatus'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: solicitud_documento.session.groups[0].id
                }
            ];
            $scope.$watch("solicitud_documento.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(solicitud_documento, 'nombre', rules);
            });
            $scope.$watch("solicitud_documento.descripcion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(solicitud_documento, 'descripcion', rules);
            });
            //ms_product.selectQueries['tipo_documento'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("solicitud_documento.tipo_documento", function (value) {
                var rules = [];
                //rules here
                if (value) {
                    if (solicitud_documento.form.selected('tipo_documento')) {
                        solicitud_documento.show_actividades = solicitud_documento.form.selected('tipo_documento').trabaja_actividades === 1;
                    }
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_documento, 'tipo_documento', rules);
            });
            $scope.$watch("solicitud_documento.estatus", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_documento, 'estatus', rules);
            });
            $scope.$watch("solicitud_documento.tipo_accion", function (value) {
                var rules = [];
                //rules here
                solicitud_documento.nombre_solicitante = mode === 'new' ? solicitud_documento.session.fullName() : solicitud_documento.solicitante_nombre;
                solicitud_documento.departamento_solicitante = mode === 'new' ? solicitud_documento.session.departamento_nombre : solicitud_documento.solicitante_departamento;
                solicitud_documento.fecha_solicitante = mode === 'new' ? LAN.date() : LAN.date(solicitud_documento.fecha_solicitud);
                solicitud_documento.refreshAngular()
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_documento, 'tipo_accion', rules);
            });
            $scope.$watch("solicitud_documento.documentos_asociados", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                if (solicitud_documento.tipo_accion == 2) {
                    if (solicitud_documento.form.selected('documentos_asociados')) {
                        solicitud_documento.mod_doc_id = solicitud_documento.form.selected('documentos_asociados').id;
                        solicitud_documento.mod_doc_codigo = solicitud_documento.form.selected('documentos_asociados').codigo;
                        solicitud_documento.mod_doc_proceso_categoria = solicitud_documento.form.selected('documentos_asociados').procesos_categoria + "";
                        solicitud_documento.mod_doc_proceso = solicitud_documento.form.selected('documentos_asociados').proceso + "";
                        solicitud_documento.mod_doc_estatus = solicitud_documento.form.selected('documentos_asociados').estatus_id + "";
                        solicitud_documento.mod_doc_nombre = solicitud_documento.form.selected('documentos_asociados').nombre;
                        solicitud_documento.mod_doc_tipo_documento = solicitud_documento.form.selected('documentos_asociados').tipo_documento_id + "";
                        solicitud_documento.mod_doc_objetivo = solicitud_documento.form.selected('documentos_asociados').objetivo;
                        solicitud_documento.mod_doc_alcance = solicitud_documento.form.selected('documentos_asociados').alcance;
                        solicitud_documento.mod_doc_marco_legal = solicitud_documento.form.selected('documentos_asociados').marco_legal;
                        solicitud_documento.mod_doc_trabaja_marco_legal = solicitud_documento.form.selected('documentos_asociados').trabaja_marco_legal;
                        solicitud_documento.mod_doc_resultado_esperado = solicitud_documento.form.selected('documentos_asociados').resultado_esperado;
                        solicitud_documento.mod_doc_descripcion = solicitud_documento.form.selected('documentos_asociados').descripcion;
                        solicitud_documento.mod_doc_version = solicitud_documento.form.selected('documentos_asociados').version_documento;
                        solicitud_documento.form.loadDropDown('mod_doc_proceso_categoria');
                        solicitud_documento.form.loadDropDown('mod_doc_proceso');
                        solicitud_documento.form.loadDropDown('mod_doc_estatus');
                        solicitud_documento.form.loadDropDown('mod_doc_tipo_documento');
                        vw_solicitud_documento_actividades.fixFilters = [{
                            field: 'documento_asociado',
                            value: solicitud_documento.mod_doc_id
                        }];
                        vw_solicitud_documento_actividades.refresh();
                        solicitud_documento.refreshAngular();
                    }
                }
                if (solicitud_documento.tipo_accion == 3) {
                    if (solicitud_documento.form.selected('documentos_asociados')) {
                        solicitud_documento.delete_doc_id = solicitud_documento.form.selected('documentos_asociados').id;
                        solicitud_documento.delete_doc_codigo = solicitud_documento.form.selected('documentos_asociados').codigo;
                        solicitud_documento.delete_doc_proceso_categoria = solicitud_documento.form.selected('documentos_asociados').procesos_categoria + "";
                        solicitud_documento.delete_doc_proceso = solicitud_documento.form.selected('documentos_asociados').proceso + "";
                        solicitud_documento.delete_doc_estatus = solicitud_documento.form.selected('documentos_asociados').estatus_id + "";
                        solicitud_documento.delete_doc_nombre = solicitud_documento.form.selected('documentos_asociados').nombre;
                        solicitud_documento.delete_doc_tipo_documento = solicitud_documento.form.selected('documentos_asociados').tipo_documento_id + "";
                        solicitud_documento.delete_doc_objetivo = solicitud_documento.form.selected('documentos_asociados').objetivo;
                        solicitud_documento.delete_doc_alcance = solicitud_documento.form.selected('documentos_asociados').alcance;
                        solicitud_documento.delete_doc_marco_legal = solicitud_documento.form.selected('documentos_asociados').marco_legal;
                        solicitud_documento.delete_doc_trabaja_marco_legal = solicitud_documento.form.selected('documentos_asociados').trabaja_marco_legal;
                        solicitud_documento.delete_doc_resultado_esperado = solicitud_documento.form.selected('documentos_asociados').resultado_esperado;
                        solicitud_documento.delete_doc_descripcion = solicitud_documento.form.selected('documentos_asociados').descripcion;
                        solicitud_documento.form.loadDropDown('delete_doc_proceso_categoria');
                        solicitud_documento.form.loadDropDown('delete_doc_proceso');
                        solicitud_documento.form.loadDropDown('delete_doc_estatus');
                        solicitud_documento.form.loadDropDown('delete_doc_tipo_documento');
                        vw_solicitud_documento_actividades.fixFilters = [{
                            field: 'documento_asociado',
                            value: solicitud_documento.delete_doc_id
                        }];
                        vw_solicitud_documento_actividades.refresh();
                        solicitud_documento.refreshAngular();
                    }
                }
                VALIDATION.validate(solicitud_documento, 'documentos_asociados', rules);
            });
            $scope.$watch("solicitud_documento.codigo_documento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(solicitud_documento, 'codigo_documento', rules);
            });
            if (solicitud_documento.caracteristica == ENUM_2.Grupos.analista_de_calidad || solicitud_documento.caracteristica == ENUM_2.Grupos.supervisor_de_calidad || (solicitud_documento.caracteristica == ENUM_2.Grupos.director_general && solicitud_documento.my_true_estatus == 2)) {
                $scope.$watch("solicitud_documento.proceso_categoria", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    rules.push(VALIDATION.yariel.maliciousCode(value));
                    VALIDATION.validate(solicitud_documento, 'proceso_categoria', rules);
                });
                $scope.$watch("solicitud_documento.proceso", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    rules.push(VALIDATION.yariel.maliciousCode(value));
                    VALIDATION.validate(solicitud_documento, 'proceso', rules);
                });
                $scope.$watch("solicitud_documento.objetivo", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    rules.push(VALIDATION.yariel.maliciousCode(value));
                    VALIDATION.validate(solicitud_documento, 'objetivo', rules);
                });
                $scope.$watch("solicitud_documento.alcance", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    rules.push(VALIDATION.yariel.maliciousCode(value));
                    VALIDATION.validate(solicitud_documento, 'alcance', rules);
                });
                $scope.$watch("solicitud_documento.marco_legal", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    rules.push(VALIDATION.yariel.maliciousCode(value));
                    VALIDATION.validate(solicitud_documento, 'marco_legal', rules);
                });
                $scope.$watch("solicitud_documento.trabaja_marco_legal", function (value) {
                    var rules = [];
                    //rules here
                    // rules.push(VALIDATION.general.required(value));
                    // rules.push(VALIDATION.yariel.maliciousCode(value));
                    if (solicitud_documento.trabaja_marco_legal) {
                        VALIDATION.validate(solicitud_documento, "marco_legal", [{
                            valid: !DSON.oseaX(solicitud_documento.marco_legal),
                            message: MESSAGE.i('validations.Fieldisrequired'),
                            type: VALIDATION.types.error,
                            visible: false
                        }]);
                        solicitud_documento.refreshAngular()
                    } else {
                        setTimeout(function () {
                            VALIDATION.validate(solicitud_documento, "marco_legal", [{
                                valid: true,
                                message: MESSAGE.i('validations.Fieldisrequired'),
                                type: VALIDATION.types.error,
                                visible: false
                            }]);
                        }, 500)
                    }

                    VALIDATION.validate(solicitud_documento, 'trabaja_marco_legal', rules);
                });
                $scope.$watch("solicitud_documento.resultado_esperado", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    rules.push(VALIDATION.yariel.maliciousCode(value));
                    VALIDATION.validate(solicitud_documento, 'resultado_esperado', rules);
                });
            }
            $scope.$watch("solicitud_documento.nombre_documento", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_documento, 'nombre_documento', rules);
            });
            solicitud_documento.triggers.table.after.control = function (data) {
                if ((data === "estatus" && solicitud_documento.form.mode === "new") && !do_me_once) {
                    console.log("entre")
                    solicitud_documento.estatus = '1';
                    solicitud_documento.my_true_estatus = 1;
                    solicitud_documento.form.loadDropDown('estatus')
                    do_me_once = true;
                }
                if (data === "tipo_documento") {
                    if (solicitud_documento.form.selected('tipo_documento')) {
                        solicitud_documento.show_actividades = solicitud_documento.form.selected('tipo_documento').trabaja_actividades === 1;
                    }
                }
                if (data === "documentos_asociados") {
                    if (solicitud_documento.form.mode == "edit") {
                        solicitud_documento.form.options.documentos_asociados.disabled = true;
                    }
                    if (!do_meOnce) {
                        if (solicitud_documento.tipo_accion == 2) {
                            if (solicitud_documento.form.selected('documentos_asociados')) {
                                solicitud_documento.mod_doc_id = solicitud_documento.form.selected('documentos_asociados').id;
                                solicitud_documento.mod_doc_codigo = solicitud_documento.form.selected('documentos_asociados').codigo;
                                solicitud_documento.mod_doc_proceso_categoria = solicitud_documento.form.selected('documentos_asociados').procesos_categoria + "";
                                solicitud_documento.mod_doc_proceso = solicitud_documento.form.selected('documentos_asociados').proceso + "";
                                solicitud_documento.mod_doc_estatus = solicitud_documento.form.selected('documentos_asociados').estatus_id + "";
                                solicitud_documento.mod_doc_nombre = solicitud_documento.form.selected('documentos_asociados').nombre;
                                solicitud_documento.mod_doc_tipo_documento = solicitud_documento.form.selected('documentos_asociados').tipo_documento_id + "";
                                solicitud_documento.mod_doc_objetivo = solicitud_documento.form.selected('documentos_asociados').objetivo;
                                solicitud_documento.mod_doc_alcance = solicitud_documento.form.selected('documentos_asociados').alcance;
                                solicitud_documento.mod_doc_marco_legal = solicitud_documento.form.selected('documentos_asociados').marco_legal;
                                solicitud_documento.mod_doc_trabaja_marco_legal = solicitud_documento.form.selected('documentos_asociados').trabaja_marco_legal;
                                solicitud_documento.mod_doc_resultado_esperado = solicitud_documento.form.selected('documentos_asociados').resultado_esperado;
                                solicitud_documento.mod_doc_descripcion = solicitud_documento.form.selected('documentos_asociados').descripcion;
                                solicitud_documento.mod_doc_version = solicitud_documento.form.selected('documentos_asociados').version_documento;
                                solicitud_documento.form.loadDropDown('mod_doc_proceso_categoria');
                                solicitud_documento.form.loadDropDown('mod_doc_proceso');
                                solicitud_documento.form.loadDropDown('mod_doc_estatus');
                                solicitud_documento.form.loadDropDown('mod_doc_tipo_documento');
                                vw_solicitud_documento_actividades.fixFilters = [{
                                    field: 'documento_asociado',
                                    value: solicitud_documento.mod_doc_id
                                }];
                                vw_solicitud_documento_actividades.refresh();
                                solicitud_documento.refreshAngular();
                            }
                        }
                        if (solicitud_documento.tipo_accion == 3) {
                            if (solicitud_documento.form.selected('documentos_asociados')) {
                                solicitud_documento.delete_doc_id = solicitud_documento.form.selected('documentos_asociados').id;
                                solicitud_documento.delete_doc_codigo = solicitud_documento.form.selected('documentos_asociados').codigo;
                                solicitud_documento.delete_doc_proceso_categoria = solicitud_documento.form.selected('documentos_asociados').procesos_categoria + "";
                                solicitud_documento.delete_doc_proceso = solicitud_documento.form.selected('documentos_asociados').proceso + "";
                                solicitud_documento.delete_doc_estatus = solicitud_documento.form.selected('documentos_asociados').estatus_id + "";
                                solicitud_documento.delete_doc_nombre = solicitud_documento.form.selected('documentos_asociados').nombre;
                                solicitud_documento.delete_doc_tipo_documento = solicitud_documento.form.selected('documentos_asociados').tipo_documento_id + "";
                                solicitud_documento.delete_doc_objetivo = solicitud_documento.form.selected('documentos_asociados').objetivo;
                                solicitud_documento.delete_doc_alcance = solicitud_documento.form.selected('documentos_asociados').alcance;
                                solicitud_documento.delete_doc_marco_legal = solicitud_documento.form.selected('documentos_asociados').marco_legal;
                                solicitud_documento.delete_doc_trabaja_marco_legal = solicitud_documento.form.selected('documentos_asociados').trabaja_marco_legal;
                                solicitud_documento.delete_doc_resultado_esperado = solicitud_documento.form.selected('documentos_asociados').resultado_esperado;
                                solicitud_documento.delete_doc_descripcion = solicitud_documento.form.selected('documentos_asociados').descripcion;
                                solicitud_documento.form.loadDropDown('delete_doc_proceso_categoria');
                                solicitud_documento.form.loadDropDown('delete_doc_proceso');
                                solicitud_documento.form.loadDropDown('delete_doc_estatus');
                                solicitud_documento.form.loadDropDown('delete_doc_tipo_documento');
                                vw_solicitud_documento_actividades.fixFilters = [{
                                    field: 'documento_asociado',
                                    value: solicitud_documento.delete_doc_id
                                }];
                                vw_solicitud_documento_actividades.refresh();
                                solicitud_documento.refreshAngular();
                            }
                        }
                        do_meOnce = true;
                    }
                }
                if (data === "tipo_accion") {
                    if (solicitud_documento.form.mode == "edit") {
                        solicitud_documento.form.options.tipo_accion.disabled = true;
                    }
                }
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
            };
        }
    };
    // solicitud_documento.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    solicitud_documento.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        if (!solicitud_documento.loaded) {
            solicitud_documento.refresh();
            solicitud_documento.loaded = true;
        }
    };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
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
    solicitud_documento.triggers.table.after.insert = async function (data) {
        //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`;
        let titulo_push = "";
        let cuerpo_push = "";
        let titulo = "";
        let cuerpo = "";
        if (data.inserting.estatus == 3) {
            setTimeout(function () {
                SWEETALERT.show({
                    message: "Se ha enviado al departamento correspondiente la solicitud de creación del documento"
                });
            }, 500)
        } else if (data.inserting.estatus == 2) {
            titulo_push = `La solicitud de creación del documento "${data.inserting.nombre}" ha sido Elaborada.`;
            cuerpo_push = `La solicitud del documento "${data.inserting.nombre_documento}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
            titulo = `La solicitud de creación del documento "${data.inserting.nombre}" ha sido Elaborada.`
            cuerpo = `La solicitud del documento "${data.inserting.nombre_documento}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma
        
Gracias.`;
            function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_documento.session.compania_id, solicitud_documento.session.institucion_id, data.inserting.solicitante, [4, 18]);
        }
        return true;
    };
    solicitud_documento.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        Object.keys(data.inserting).forEach(d => {
            ["delete_doc", "mod_doc", "edit_doc"].forEach(e => {
                if (v.startsWith(d, e)) delete data.inserting[d]
            });
        });
        if (solicitud_documento.tipo_accion == 3) {
            if (!solicitud_documento.delete_doc_marco_legal) {
                data.inserting.marco_legal = "$null";
            }
        }
        delete data.inserting.documentos_asociados
        if (solicitud_documento.tipo_accion == 2) {
            if (!solicitud_documento.mod_doc_marco_legal) {
                data.inserting.marco_legal = "$null";
            }
        }
        resolve(true);
    });
    //
    solicitud_documento.triggers.table.after.update = async function (data) {
        let titulo_push = "";
        let cuerpo_push = "";
        let titulo = "";
        let cuerpo = "";
        let cuerpo2 = "";
        if (data.updating.estatus == 3 && data.updating.tipo_accion == 1) {
            titulo_push = `La solicitud de creación de documento "${data.updating.nombre}" ha sido Autorizada.`;
            cuerpo_push = `Ha sido Autorizada por ${solicitud_documento.session.fullName()}.`;
            titulo = `La solicitud de creación de documento "${data.updating.nombre}" ha sido Autorizada.`
            cuerpo = `La solicitud de creación de documento "${data.updating.nombre_documento}" ha sido Autorizada por ${solicitud_documento.session.fullName()}.

Un supervisor de calidad debe proceder a Revisar y Autorizar la creación de dicho documento. Los supervisores de calidad son :`;
            cuerpo2 = "Gracias.";
            function_send_email_custom_group_res_list(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_documento.session.compania_id, solicitud_documento.session.institucion_id, data.updating.solicitante, 18, 4, 18, cuerpo2);
            BASEAPI.insertID('documentos_asociados', {
                proceso: solicitud_documento.proceso || "$null",
                procesos_categoria: solicitud_documento.proceso_categoria || "$null",
                codigo: solicitud_documento.codigo_documento || "$null",
                nombre: solicitud_documento.nombre_documento || "$null",
                objetivo: solicitud_documento.objetivo || "$null",
                alcance: solicitud_documento.alcance || "$null",
                trabaja_marco_legal: solicitud_documento.trabaja_marco_legal || "$null",
                marco_legal: solicitud_documento.marco_legal || "$null",
                resultado_esperado: solicitud_documento.resultado_esperado || "$null",
                tipo_documento: solicitud_documento.tipo_documento || "$null",
                solicitud_documento: solicitud_documento.id || "$null",
                estatus: 1,
                active: 1,
                creado_en: moment().format('YYYY-MM-DD hh:mm:ss'),
                creado_por: solicitud_documento.session.id
            }, '', '', function (result) {
                BASEAPI.updateall('solicitud_documento_actividades', {
                    documento_asociado: result.data.data[0].id,
                    where: [
                        {
                            field: "solicitud_documento",
                            value: solicitud_documento.id
                        }
                    ]
                }, function (resultado) {
                    console.log(resultado, "se actualizaron las actividades");
                });
                BASEAPI.updateall('solicitud_documento', {
                    documento_creo: result.data.data[0].id,
                    where: [
                        {
                            value: solicitud_documento.id
                        }
                    ]
                }, function (resultado) {
                    console.log(resultado, "se actualizo la solicitud de crear");
                });
            });
            setTimeout(function () {
                SWEETALERT.show({
                    message: "Se ha enviado al departamento correspondiente la solicitud de creación del documento"
                });
            }, 500)
        } else if (data.updating.estatus == 2 && data.updating.tipo_accion == 1) {
            titulo_push = `La solicitud de creación del documento "${data.updating.nombre}" ha sido Elaborada.`;
            cuerpo_push = `La solicitud del documento "${data.updating.nombre_documento}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
            titulo = `La solicitud de creación del documento "${data.updating.nombre}" ha sido Elaborada.`
            cuerpo = `La solicitud del documento "${data.updating.nombre_documento}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.
        
Gracias.`;
            function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_documento.session.compania_id, solicitud_documento.session.institucion_id, data.updating.solicitante, [4, 18]);
        }
        //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    };
    solicitud_documento.delete_doc = function (documento) {
        let titulo_push = "";
        let cuerpo_push = "";
        let titulo = "";
        let cuerpo = "";
        let cuerpo2 = "";
        VALIDATION.save(solicitud_documento, async function () {
            var auditVar = solicitud_documento.form.getAudit();
            BASEAPI.list('vw_auditoria_programa_plan_documentos_asociados', {
                join: [
                    {
                        "table": "auditoria_programa_plan",
                        "base": "programa_plan",
                        "field": "id",
                        "columns": ["id", "nombre", "estatus"]
                    },
                ],
                where: [
                    {
                        field: "documento_asociado",
                        value: solicitud_documento.documentos_asociados
                    },
                    {
                        field: "$auditoria_programa_plan.estatus",
                        operator: "not in",
                        value: [5, 8]
                    }
                ],

            }, function (result) {
                if (result.data.length > 0) {
                    SWEETALERT.show({
                        message: `Documento no puede ser ELIMINADO, el mismo está siendo AUDITADO en estos momentos en el plan de Auditoría: "${result.data[0].auditoria_programa_plan_nombre}"`,
                    });
                } else {
                    if (solicitud_documento.form.mode == 'new') {
                        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                        BASEAPI.insertID('solicitud_documento', {
                            nombre: solicitud_documento.nombre ? solicitud_documento.nombre : "$null",
                            descripcion: solicitud_documento.descripcion ? solicitud_documento.descripcion : "$null",
                            proceso_categoria: solicitud_documento.delete_doc_proceso_categoria ? solicitud_documento.delete_doc_proceso_categoria : "$null",
                            alcance: solicitud_documento.delete_doc_alcance ? solicitud_documento.delete_doc_alcance : "$null",
                            objetivo: solicitud_documento.delete_doc_objetivo ? solicitud_documento.delete_doc_objetivo : "$null",
                            resultado_esperado: solicitud_documento.delete_doc_resultado_esperado ? solicitud_documento.delete_doc_resultado_esperado : "$null",
                            trabaja_marco_legal: solicitud_documento.delete_doc_trabaja_marco_legal ? solicitud_documento.delete_doc_trabaja_marco_legal : "$null",
                            marco_legal: solicitud_documento.delete_doc_marco_legal ? solicitud_documento.delete_doc_marco_legal : "$null",
                            proceso: solicitud_documento.delete_doc_proceso ? solicitud_documento.delete_doc_proceso : "$null",
                            codigo_documento: solicitud_documento.delete_doc_codigo ? solicitud_documento.delete_doc_codigo : "$null",
                            nombre_documento: solicitud_documento.delete_doc_nombre ? solicitud_documento.delete_doc_nombre : "$null",
                            tipo_documento: solicitud_documento.delete_doc_tipo_documento ? solicitud_documento.delete_doc_tipo_documento : "$null",
                            tipo_accion: solicitud_documento.tipo_accion ? solicitud_documento.tipo_accion : "$null",
                            compania: solicitud_documento.session.compania_id,
                            institucion: solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null",
                            solicitante: solicitud_documento.session.usuario_id,
                            documentos_asociados: solicitud_documento.documentos_asociados ? solicitud_documento.documentos_asociados : "$null",
                            mapa_proceso: solicitud_documento.mapa_id ? solicitud_documento.mapa_id : "$null",
                            estatus: solicitud_documento.estatus != "[NULL]" && solicitud_documento.estatus != 'null' ? solicitud_documento.estatus : "$null",
                        }, "", "", async function (result) {
                            SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                            if (solicitud_documento.estatus == 2) {
                                titulo_push = `La solicitud de eliminación de documento "${solicitud_documento.nombre}" ha sido Elaborada.`;
                                cuerpo_push = `La solicitud de eliminación del documento "${solicitud_documento.delete_doc_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
                                titulo = `La solicitud de eliminación de documento "${solicitud_documento.nombre}" ha sido Elaborada.`
                                cuerpo = `La solicitud de eliminación del documento "${solicitud_documento.delete_doc_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.
        
Gracias.`;
                                function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_documento.session.compania_id, solicitud_documento.session.institucion_id, solicitud_documento.solicitante, [4, 18]);
                            }
                            await AUDIT.LOG(AUDIT.ACTIONS.insert, solicitud_documento.tableOrView ? solicitud_documento.tableOrView : solicitud_documento.modelName, auditVar);
                            solicitud_documento.refresh();
                            MODAL.close()
                        });
                    } else {
                        if (solicitud_documento.estatus == 3) {
                            SWEETALERT.confirm({
                                message: "¿Autorizar la eliminación de este documento?",
                                confirm: function () {
                                    BASEAPI.updateall('solicitud_documento', {
                                        nombre: solicitud_documento.nombre ? solicitud_documento.nombre : "$null",
                                        estatus: solicitud_documento.estatus != "[NULL]" && solicitud_documento.estatus != 'null' ? solicitud_documento.estatus : "$null",
                                        fecha_solicitud: moment().format("YYYY-MM-DD HH:mm:ss"),
                                        where: [
                                            {
                                                field: "id",
                                                value: solicitud_documento.id
                                            }
                                        ]
                                    }, function (result) {
                                        BASEAPI.updateall('documentos_asociados', {
                                            estatus: 4,
                                            where: [
                                                {
                                                    field: "id",
                                                    value: documento
                                                }
                                            ]
                                        }, async function (result) {
                                            console.log(result)
                                            SWEETALERT.stop()
                                            solicitud_documento.refresh();
                                            titulo_push = `La solicitud de eliminación de documento "${solicitud_documento.nombre}" ha sido Autorizada.`;
                                            cuerpo_push = `La solicitud de eliminación del documento "${solicitud_documento.delete_doc_nombre}" ha sido Autorizada.`;
                                            titulo = `La solicitud de eliminación de documento "${solicitud_documento.nombre}" ha sido Autorizada.`
                                            cuerpo = `La solicitud de eliminación del documento "${solicitud_documento.delete_doc_nombre}" ha sido Autorizada.  El documento tomará un estatus de borrado y será enviado al repositorio de documentos borrados.
            
    Gracias.`;
                                            function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_documento.session.compania_id, solicitud_documento.session.institucion_id, solicitud_documento.solicitante, [4, 18]);
                                            await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_documento.tableOrView ? solicitud_documento.tableOrView : solicitud_documento.modelName, auditVar, solicitud_documento.form.oldData);
                                            MODAL.close();
                                        });
                                    });
                                }
                            });
                        } else if (solicitud_documento.estatus == 2) {
                            if (solicitud_documento.my_true_estatus == 1) {
                                SWEETALERT.confirm({
                                    message: "¿Solicitar la eliminación de este documento?",
                                    confirm: function () {
                                        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                        BASEAPI.updateall('solicitud_documento', {
                                            nombre: solicitud_documento.nombre ? solicitud_documento.nombre : "$null",
                                            descripcion: solicitud_documento.delete_doc_descripcion ? solicitud_documento.delete_doc_descripcion : "$null",
                                            proceso_categoria: solicitud_documento.delete_doc_proceso_categoria ? solicitud_documento.delete_doc_proceso_categoria : "$null",
                                            alcance: solicitud_documento.delete_doc_alcance ? solicitud_documento.delete_doc_alcance : "$null",
                                            objetivo: solicitud_documento.delete_doc_objetivo ? solicitud_documento.delete_doc_objetivo : "$null",
                                            resultado_esperado: solicitud_documento.delete_doc_resultado_esperado ? solicitud_documento.delete_doc_resultado_esperado : "$null",
                                            trabaja_marco_legal: solicitud_documento.delete_doc_trabaja_marco_legal ? solicitud_documento.delete_doc_trabaja_marco_legal : "$null",
                                            marco_legal: solicitud_documento.delete_doc_marco_legal ? solicitud_documento.delete_doc_marco_legal : "$null",
                                            proceso: solicitud_documento.delete_doc_proceso ? solicitud_documento.delete_doc_proceso : "$null",
                                            codigo_documento: solicitud_documento.delete_doc_codigo ? solicitud_documento.delete_doc_codigo : "$null",
                                            nombre_documento: solicitud_documento.delete_doc_nombre ? solicitud_documento.delete_doc_nombre : "$null",
                                            tipo_accion: solicitud_documento.tipo_accion ? solicitud_documento.tipo_accion : "$null",
                                            compania: solicitud_documento.session.compania_id,
                                            institucion: solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null",
                                            solicitante: solicitud_documento.session.usuario_id,
                                            documentos_asociados: solicitud_documento.documentos_asociados ? solicitud_documento.documentos_asociados : "$null",
                                            estatus: solicitud_documento.estatus != "[NULL]" && solicitud_documento.estatus != 'null' ? solicitud_documento.estatus : "$null",
                                            where: [
                                                {
                                                    field: "id",
                                                    value: solicitud_documento.id
                                                }
                                            ]
                                        }, async function (result) {
                                            SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                                            titulo_push = `La solicitud de eliminación de documento "${solicitud_documento.nombre}" ha sido Elaborada.`;
                                            cuerpo_push = `La solicitud de eliminación del documento "${solicitud_documento.delete_doc_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
                                            titulo = `La solicitud de eliminación de documento "${solicitud_documento.nombre}" ha sido Elaborada.`
                                            cuerpo = `La solicitud de eliminación del documento "${solicitud_documento.delete_doc_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.
            
    Gracias.`;
                                            function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_documento.session.compania_id, solicitud_documento.session.institucion_id, solicitud_documento.solicitante, [4, 18]);
                                            await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_documento.tableOrView ? solicitud_documento.tableOrView : solicitud_documento.modelName, auditVar, solicitud_documento.form.oldData);
                                            solicitud_documento.refresh();
                                            MODAL.close()
                                        });
                                    }
                                });
                            } else {
                                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                BASEAPI.updateall('solicitud_documento', {
                                    nombre: solicitud_documento.nombre ? solicitud_documento.nombre : "$null",
                                    tipo_accion: solicitud_documento.tipo_accion ? solicitud_documento.tipo_accion : "$null",
                                    compania: solicitud_documento.session.compania_id,
                                    institucion: solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null",
                                    solicitante: solicitud_documento.session.usuario_id,
                                    documentos_asociados: solicitud_documento.documentos_asociados ? solicitud_documento.documentos_asociados : "$null",
                                    estatus: solicitud_documento.estatus != "[NULL]" && solicitud_documento.estatus != 'null' ? solicitud_documento.estatus : "$null",
                                    where: [
                                        {
                                            field: "id",
                                            value: solicitud_documento.id
                                        }
                                    ]
                                }, async function (result) {
                                    SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                                    await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_documento.tableOrView ? solicitud_documento.tableOrView : solicitud_documento.modelName, auditVar, solicitud_documento.form.oldData);
                                    solicitud_documento.refresh();
                                    MODAL.close()
                                });
                            }
                        } else {
                            SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                            BASEAPI.updateall('solicitud_documento', {
                                nombre: solicitud_documento.nombre ? solicitud_documento.nombre : "$null",
                                estatus: solicitud_documento.estatus != "[NULL]" && solicitud_documento.estatus != 'null' ? solicitud_documento.estatus : "$null",
                                where: [
                                    {
                                        field: "id",
                                        value: solicitud_documento.id
                                    }
                                ]
                            }, async function (result) {
                                SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                                await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_documento.tableOrView ? solicitud_documento.tableOrView : solicitud_documento.modelName, auditVar, solicitud_documento.form.oldData);
                                solicitud_documento.refresh();
                                MODAL.close()
                            });
                        }
                    }
                }
            });
        }, ['nombre']);
    }
    solicitud_documento.mod_doc = function (documento) {
        let titulo_push = "";
        let cuerpo_push = "";
        let titulo = "";
        let cuerpo = "";
        let cuerpo2 = "";
        VALIDATION.save(solicitud_documento, async function () {
            var auditVar = solicitud_documento.form.getAudit();
            let old_Data = {}
            let updated_data = {}
            if (solicitud_documento.form.mode == 'new') {
                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                BASEAPI.insertID('solicitud_documento', {
                    nombre: solicitud_documento.nombre ? solicitud_documento.nombre : "$null",
                    descripcion: solicitud_documento.edit_doc_descripcion ? solicitud_documento.edit_doc_descripcion : "$null",
                    proceso_categoria: solicitud_documento.edit_doc_proceso_categoria != "[NULL]" && solicitud_documento.edit_doc_proceso_categoria != 'null' ? solicitud_documento.edit_doc_proceso_categoria : "$null",
                    alcance: solicitud_documento.edit_doc_alcance ? solicitud_documento.edit_doc_alcance : "$null",
                    objetivo: solicitud_documento.edit_doc_objetivo ? solicitud_documento.edit_doc_objetivo : "$null",
                    resultado_esperado: solicitud_documento.edit_doc_resultado_esperado ? solicitud_documento.edit_doc_resultado_esperado : "$null",
                    trabaja_marco_legal: solicitud_documento.edit_doc_trabaja_marco_legal ? 1 : "$null",
                    marco_legal: solicitud_documento.edit_doc_marco_legal ? solicitud_documento.edit_doc_marco_legal : "$null",
                    proceso: solicitud_documento.edit_doc_proceso != "[NULL]" && solicitud_documento.edit_doc_proceso != 'null' ? solicitud_documento.edit_doc_proceso : "$null",
                    codigo_documento: solicitud_documento.edit_doc_codigo ? solicitud_documento.edit_doc_codigo : "$null",
                    nombre_documento: solicitud_documento.edit_doc_nombre ? solicitud_documento.edit_doc_nombre : "$null",
                    tipo_documento: solicitud_documento.edit_doc_tipo_documento != "[NULL]" && solicitud_documento.edit_doc_tipo_documento != 'null' ? solicitud_documento.edit_doc_tipo_documento : "$null",
                    tipo_accion: solicitud_documento.tipo_accion != "[NULL]" && solicitud_documento.tipo_accion != 'null' ? solicitud_documento.tipo_accion : "$null",
                    compania: solicitud_documento.session.compania_id,
                    institucion: solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null",
                    solicitante: solicitud_documento.session.usuario_id,
                    documentos_asociados: solicitud_documento.documentos_asociados != "[NULL]" && solicitud_documento.documentos_asociados != 'null' ? solicitud_documento.documentos_asociados : "$null",
                    mapa_proceso: solicitud_documento.mapa_id ? solicitud_documento.mapa_id : "$null",
                    estatus: solicitud_documento.estatus != "[NULL]" && solicitud_documento.estatus != 'null' ? solicitud_documento.estatus : "$null",
                }, "", "", async function (result) {
                    SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                    if (solicitud_documento.estatus == 2) {
                        titulo_push = `La solicitud  de modificación de documento "${solicitud_documento.nombre}" ha sido Elaborada.`;
                        cuerpo_push = `La solicitud de modificación del documento "${solicitud_documento.mod_doc_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
                        titulo = `La solicitud de modificación de documento "${solicitud_documento.nombre}" ha sido Elaborada.`
                        cuerpo = `La solicitud de modificación del documento "${solicitud_documento.mod_doc_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.
        
Gracias.`;
                        function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_documento.session.compania_id, solicitud_documento.session.institucion_id, solicitud_documento.solicitante, [4, 18]);
                    }
                    Object.keys(solicitud_documento.form.oldData).forEach(d => {
                        ["Mod_doc", "Estado", "Nombre", "Descripción"].forEach(e => {
                            if (v.startsWith(d, e)) {
                                if (d == "Nombre") {
                                    old_Data["Nombre de la solicitud"] = solicitud_documento.form.oldData[d];
                                } else if (d == "Descripción") {
                                    old_Data["Descripción de la solicitud"] = solicitud_documento.form.oldData[d];
                                } else {
                                    old_Data[d == "Estado" ? d : d.split("Mod_doc_")[1]] = solicitud_documento.form.oldData[d];
                                }
                            }
                        });
                    });
                    Object.keys(auditVar).forEach(d => {
                        ["Edit_doc", "Estado", "Nombre", "Descripción"].forEach(e => {
                            if (v.startsWith(d, e)) {
                                if (d == "Nombre") {
                                    updated_data["Nombre de la solicitud"] = auditVar[d];
                                } else if (d == "Descripción") {
                                    updated_data["Descripción de la solicitud"] = auditVar[d];
                                } else {
                                    updated_data[d == "Estado" ? d : d.split("Edit_doc_")[1]] = auditVar[d] != "" ? auditVar[d] : undefined;
                                }
                            }
                        });
                    });
                    await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_documento.tableOrView ? solicitud_documento.tableOrView : solicitud_documento.modelName, updated_data, old_Data);
                    solicitud_documento.refresh();
                    MODAL.close()
                });
            } else {
                if (solicitud_documento.estatus == 3) {
                    SWEETALERT.confirm({
                        message: "¿Autorizar la Modificación de este documento?",
                        confirm: function () {
                            console.log(solicitud_documento.edit_doc_proceso_categoria, "a ver");
                            BASEAPI.updateall('solicitud_documento', {
                                nombre: solicitud_documento.nombre ? solicitud_documento.nombre : "$null",
                                descripcion: solicitud_documento.edit_doc_descripcion ? solicitud_documento.edit_doc_descripcion : "$null",
                                proceso_categoria: solicitud_documento.edit_doc_proceso_categoria != "[NULL]" && solicitud_documento.edit_doc_proceso_categoria != 'null' ? solicitud_documento.edit_doc_proceso_categoria : "$null",
                                alcance: solicitud_documento.edit_doc_alcance ? solicitud_documento.edit_doc_alcance : "$null",
                                objetivo: solicitud_documento.edit_doc_objetivo ? solicitud_documento.edit_doc_objetivo : "$null",
                                resultado_esperado: solicitud_documento.edit_doc_resultado_esperado ? solicitud_documento.edit_doc_resultado_esperado : "$null",
                                trabaja_marco_legal: solicitud_documento.edit_doc_trabaja_marco_legal ? 1 : "$null",
                                marco_legal: solicitud_documento.edit_doc_marco_legal ? solicitud_documento.edit_doc_marco_legal : "$null",
                                proceso: solicitud_documento.edit_doc_proceso != "[NULL]" && solicitud_documento.edit_doc_proceso != 'null' ? solicitud_documento.edit_doc_proceso : "$null",
                                codigo_documento: solicitud_documento.edit_doc_codigo ? solicitud_documento.edit_doc_codigo : "$null",
                                nombre_documento: solicitud_documento.edit_doc_nombre ? solicitud_documento.edit_doc_nombre : "$null",
                                tipo_documento: solicitud_documento.edit_doc_tipo_documento != "[NULL]" && solicitud_documento.edit_doc_tipo_documento != 'null' ? solicitud_documento.edit_doc_tipo_documento : "$null",
                                tipo_accion: solicitud_documento.tipo_accion != "[NULL]" && solicitud_documento.tipo_accion != 'null' ? solicitud_documento.tipo_accion : "$null",
                                compania: solicitud_documento.session.compania_id,
                                institucion: solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null",
                                documentos_asociados: solicitud_documento.documentos_asociados != "[NULL]" && solicitud_documento.documentos_asociados != 'null' ? solicitud_documento.documentos_asociados : "$null",
                                estatus: solicitud_documento.estatus != "[NULL]" && solicitud_documento.estatus != 'null' ? solicitud_documento.estatus : "$null",
                                fecha_solicitud: moment().format("YYYY-MM-DD HH:mm:ss"),
                                where: [
                                    {
                                        field: "id",
                                        value: solicitud_documento.id
                                    }
                                ]
                            }, function (result) {

                                BASEAPI.updateall('documentos_asociados', {
                                    proceso: solicitud_documento.edit_doc_proceso != "[NULL]" && solicitud_documento.edit_doc_proceso != 'null' ? solicitud_documento.edit_doc_proceso : undefined,
                                    procesos_categoria: solicitud_documento.edit_doc_proceso_categoria != "[NULL]" && solicitud_documento.edit_doc_proceso_categoria != 'null' ? solicitud_documento.edit_doc_proceso_categoria : undefined,
                                    codigo: solicitud_documento.edit_doc_codigo || undefined,
                                    nombre: solicitud_documento.edit_doc_nombre || undefined,
                                    descripcion: solicitud_documento.descripcion || undefined,
                                    objetivo: solicitud_documento.edit_doc_objetivo || undefined,
                                    alcance: solicitud_documento.edit_doc_alcance || undefined,
                                    trabaja_marco_legal: solicitud_documento.edit_doc_trabaja_marco_legal ? 1 : undefined,
                                    marco_legal: solicitud_documento.edit_doc_marco_legal || undefined,
                                    resultado_esperado: solicitud_documento.edit_doc_resultado_esperado || undefined,
                                    tipo_documento: solicitud_documento.edit_doc_tipo_documento != "[NULL]" && solicitud_documento.edit_doc_tipo_documento != 'null' ? solicitud_documento.edit_doc_tipo_documento : undefined,
                                    aprobado_por: solicitud_documento.session.id || undefined,
                                    aprobado_en: moment().format("YYYY-MM-DD HH:mm:ss"),
                                    solicitud_documento: solicitud_documento.id || undefined,
                                    version: solicitud_documento.mod_doc_version + 1 || undefined,
                                    where: [
                                        {
                                            field: "id",
                                            value: documento
                                        }
                                    ]
                                }, async function (result) {
                                    console.log(result)
                                    SWEETALERT.stop()
                                    titulo_push = `La solicitud  de modificación de documento "${solicitud_documento.nombre}" ha sido Autorizada.`;
                                    cuerpo_push = `La solicitud de modificación del documento "${solicitud_documento.mod_doc_nombre}" ha sido Autorizada.`;
                                    titulo = `La solicitud de modificación de documento "${solicitud_documento.nombre}" ha sido Autorizada.`
                                    cuerpo = `La solicitud de modificación del documento "${solicitud_documento.mod_doc_nombre}" ha sido Autorizada.
        
Gracias.`;
                                    function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_documento.session.compania_id, solicitud_documento.session.institucion_id, solicitud_documento.solicitante, [4, 18]);
                                    Object.keys(solicitud_documento.form.oldData).forEach(d => {
                                        ["Mod_doc", "Estado", "Nombre", "Descripción"].forEach(e => {
                                            if (v.startsWith(d, e)) {
                                                if (d == "Nombre") {
                                                    old_Data["Nombre de la solicitud"] = solicitud_documento.form.oldData[d];
                                                } else if (d == "Descripción") {
                                                    old_Data["Descripción de la solicitud"] = solicitud_documento.form.oldData[d];
                                                } else {
                                                    old_Data[d == "Estado" ? d : d.split("Mod_doc_")[1]] = solicitud_documento.form.oldData[d];
                                                }
                                            }
                                        });
                                    });
                                    Object.keys(auditVar).forEach(d => {
                                        ["Edit_doc", "Estado", "Nombre", "Descripción"].forEach(e => {
                                            if (v.startsWith(d, e)) {
                                                if (d == "Nombre") {
                                                    updated_data["Nombre de la solicitud"] = auditVar[d];
                                                } else if (d == "Descripción") {
                                                    updated_data["Descripción de la solicitud"] = auditVar[d];
                                                } else {
                                                    updated_data[d == "Estado" ? d : d.split("Edit_doc_")[1]] = auditVar[d] != "" ? auditVar[d] : undefined;
                                                }
                                            }
                                        });
                                    });
                                    await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_documento.tableOrView ? solicitud_documento.tableOrView : solicitud_documento.modelName, updated_data, old_Data);
                                    solicitud_documento.refresh();
                                    MODAL.close();
                                });
                            });
                        }
                    });
                } else if (solicitud_documento.estatus == 2) {
                    if (solicitud_documento.my_true_estatus == 1) {
                        SWEETALERT.confirm({
                            message: "¿Solicitar la modificación de este documento?",
                            confirm: function () {
                                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                BASEAPI.updateall('solicitud_documento', {
                                    nombre: solicitud_documento.nombre ? solicitud_documento.nombre : "$null",
                                    descripcion: solicitud_documento.edit_doc_descripcion ? solicitud_documento.edit_doc_descripcion : "$null",
                                    proceso_categoria: solicitud_documento.edit_doc_proceso_categoria != "[NULL]" && solicitud_documento.edit_doc_proceso_categoria != 'null' ? solicitud_documento.edit_doc_proceso_categoria : "$null",
                                    alcance: solicitud_documento.edit_doc_alcance ? solicitud_documento.edit_doc_alcance : "$null",
                                    objetivo: solicitud_documento.edit_doc_objetivo ? solicitud_documento.edit_doc_objetivo : "$null",
                                    resultado_esperado: solicitud_documento.edit_doc_resultado_esperado ? solicitud_documento.edit_doc_resultado_esperado : "$null",
                                    trabaja_marco_legal: solicitud_documento.edit_doc_trabaja_marco_legal ? 1 : "$null",
                                    marco_legal: solicitud_documento.edit_doc_marco_legal ? solicitud_documento.edit_doc_marco_legal : "$null",
                                    proceso: solicitud_documento.edit_doc_proceso != "[NULL]" && solicitud_documento.edit_doc_proceso != 'null' ? solicitud_documento.edit_doc_proceso : "$null",
                                    codigo_documento: solicitud_documento.edit_doc_codigo ? solicitud_documento.edit_doc_codigo : "$null",
                                    nombre_documento: solicitud_documento.edit_doc_nombre ? solicitud_documento.edit_doc_nombre : "$null",
                                    tipo_documento: solicitud_documento.edit_doc_tipo_documento != "[NULL]" && solicitud_documento.edit_doc_tipo_documento != 'null' ? solicitud_documento.edit_doc_tipo_documento : "$null",
                                    tipo_accion: solicitud_documento.tipo_accion != "[NULL]" && solicitud_documento.tipo_accion != 'null' ? solicitud_documento.tipo_accion : "$null",
                                    compania: solicitud_documento.session.compania_id,
                                    institucion: solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null",
                                    documentos_asociados: solicitud_documento.documentos_asociados != "[NULL]" && solicitud_documento.documentos_asociados != 'null' ? solicitud_documento.documentos_asociados : "$null",
                                    estatus: solicitud_documento.estatus != "[NULL]" && solicitud_documento.estatus != 'null' ? solicitud_documento.estatus : "$null",
                                    where: [
                                        {
                                            field: "id",
                                            value: solicitud_documento.id
                                        }
                                    ]
                                }, async function (result) {
                                    SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                                    titulo_push = `La solicitud  de modificación de documento "${solicitud_documento.nombre}" ha sido Elaborada.`;
                                    cuerpo_push = `La solicitud de modificación del documento "${solicitud_documento.mod_doc_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
                                    titulo = `La solicitud de modificación de documento "${solicitud_documento.nombre}" ha sido Elaborada.`
                                    cuerpo = `La solicitud de modificación del documento "${solicitud_documento.mod_doc_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.
        
Gracias.`;
                                    function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_documento.session.compania_id, solicitud_documento.session.institucion_id, solicitud_documento.solicitante, [4, 18]);
                                    Object.keys(solicitud_documento.form.oldData).forEach(d => {
                                        ["Edit_doc", "Estado", "Nombre", "Descripción"].forEach(e => {
                                            if (v.startsWith(d, e)) {
                                                if (d == "Nombre") {
                                                    old_Data["Nombre de la solicitud"] = solicitud_documento.form.oldData[d];
                                                } else if (d == "Descripción") {
                                                    old_Data["Descripción de la solicitud"] = solicitud_documento.form.oldData[d];
                                                } else {
                                                    old_Data[d == "Estado" ? d : d.split("Edit_doc_")[1]] = solicitud_documento.form.oldData[d];
                                                }
                                            }
                                        });
                                    });
                                    Object.keys(auditVar).forEach(d => {
                                        ["Edit_doc", "Estado", "Nombre", "Descripción"].forEach(e => {
                                            if (v.startsWith(d, e)) {
                                                if (d == "Nombre") {
                                                    updated_data["Nombre de la solicitud"] = auditVar[d];
                                                } else if (d == "Descripción") {
                                                    updated_data["Descripción de la solicitud"] = auditVar[d];
                                                } else {
                                                    updated_data[d == "Estado" ? d : d.split("Edit_doc_")[1]] = auditVar[d] != "" ? auditVar[d] : undefined;
                                                }
                                            }
                                        });
                                    });
                                    await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_documento.tableOrView ? solicitud_documento.tableOrView : solicitud_documento.modelName, auditVar, solicitud_documento.form.oldData);
                                    solicitud_documento.refresh();
                                    MODAL.close()
                                });
                            }
                        });
                    } else {
                        console.log(solicitud_documento.edit_doc_proceso_categoria, "a ver");
                        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                        BASEAPI.updateall('solicitud_documento', {
                            nombre: solicitud_documento.nombre ? solicitud_documento.nombre : "$null",
                            descripcion: solicitud_documento.edit_doc_descripcion ? solicitud_documento.edit_doc_descripcion : "$null",
                            proceso_categoria: solicitud_documento.edit_doc_proceso_categoria != "[NULL]" && solicitud_documento.edit_doc_proceso_categoria != 'null' ? solicitud_documento.edit_doc_proceso_categoria : "$null",
                            alcance: solicitud_documento.edit_doc_alcance ? solicitud_documento.edit_doc_alcance : "$null",
                            objetivo: solicitud_documento.edit_doc_objetivo ? solicitud_documento.edit_doc_objetivo : "$null",
                            resultado_esperado: solicitud_documento.edit_doc_resultado_esperado ? solicitud_documento.edit_doc_resultado_esperado : "$null",
                            trabaja_marco_legal: solicitud_documento.edit_doc_trabaja_marco_legal ? 1 : "$null",
                            marco_legal: solicitud_documento.edit_doc_marco_legal ? solicitud_documento.edit_doc_marco_legal : "$null",
                            proceso: solicitud_documento.edit_doc_proceso != "[NULL]" && solicitud_documento.edit_doc_proceso != 'null' ? solicitud_documento.edit_doc_proceso : "$null",
                            codigo_documento: solicitud_documento.edit_doc_codigo ? solicitud_documento.edit_doc_codigo : "$null",
                            nombre_documento: solicitud_documento.edit_doc_nombre ? solicitud_documento.edit_doc_nombre : "$null",
                            tipo_documento: solicitud_documento.edit_doc_tipo_documento != "[NULL]" && solicitud_documento.edit_doc_tipo_documento != 'null' ? solicitud_documento.edit_doc_tipo_documento : "$null",
                            tipo_accion: solicitud_documento.tipo_accion != "[NULL]" && solicitud_documento.tipo_accion != 'null' ? solicitud_documento.tipo_accion : "$null",
                            compania: solicitud_documento.session.compania_id,
                            institucion: solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null",
                            documentos_asociados: solicitud_documento.documentos_asociados != "[NULL]" && solicitud_documento.documentos_asociados != 'null' ? solicitud_documento.documentos_asociados : "$null",
                            estatus: solicitud_documento.estatus != "[NULL]" && solicitud_documento.estatus != 'null' ? solicitud_documento.estatus : "$null",
                            where: [
                                {
                                    field: "id",
                                    value: solicitud_documento.id
                                }
                            ]
                        }, async function (result) {
                            SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                            Object.keys(solicitud_documento.form.oldData).forEach(d => {
                                ["Edit_doc", "Estado", "Nombre", "Descripción"].forEach(e => {
                                    if (v.startsWith(d, e)) {
                                        if (d == "Nombre") {
                                            old_Data["Nombre de la solicitud"] = solicitud_documento.form.oldData[d];
                                        } else if (d == "Descripción") {
                                            old_Data["Descripción de la solicitud"] = solicitud_documento.form.oldData[d];
                                        } else {
                                            old_Data[d == "Estado" ? d : d.split("Edit_doc_")[1]] = solicitud_documento.form.oldData[d];
                                        }
                                    }
                                });
                            });
                            Object.keys(auditVar).forEach(d => {
                                ["Edit_doc", "Estado", "Nombre", "Descripción"].forEach(e => {
                                    if (v.startsWith(d, e)) {
                                        if (d == "Nombre") {
                                            updated_data["Nombre de la solicitud"] = auditVar[d];
                                        } else if (d == "Descripción") {
                                            updated_data["Descripción de la solicitud"] = auditVar[d];
                                        } else {
                                            updated_data[d == "Estado" ? d : d.split("Edit_doc_")[1]] = auditVar[d] != "" ? auditVar[d] : undefined;
                                        }
                                    }
                                });
                            });
                            await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_documento.tableOrView ? solicitud_documento.tableOrView : solicitud_documento.modelName, updated_data, old_Data);
                            solicitud_documento.refresh();
                            MODAL.close()
                        });
                    }
                } else {
                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    BASEAPI.updateall('solicitud_documento', {
                        nombre: solicitud_documento.nombre ? solicitud_documento.nombre : "$null",
                        descripcion: solicitud_documento.edit_doc_descripcion ? solicitud_documento.edit_doc_descripcion : "$null",
                        proceso_categoria: solicitud_documento.edit_doc_proceso_categoria != "[NULL]" && solicitud_documento.edit_doc_proceso_categoria != 'null' ? solicitud_documento.edit_doc_proceso_categoria : "$null",
                        alcance: solicitud_documento.edit_doc_alcance ? solicitud_documento.edit_doc_alcance : "$null",
                        objetivo: solicitud_documento.edit_doc_objetivo ? solicitud_documento.edit_doc_objetivo : "$null",
                        resultado_esperado: solicitud_documento.edit_doc_resultado_esperado ? solicitud_documento.edit_doc_resultado_esperado : "$null",
                        trabaja_marco_legal: solicitud_documento.edit_doc_trabaja_marco_legal ? 1 : "$null",
                        marco_legal: solicitud_documento.edit_doc_marco_legal ? solicitud_documento.edit_doc_marco_legal : "$null",
                        proceso: solicitud_documento.edit_doc_proceso != "[NULL]" && solicitud_documento.edit_doc_proceso != 'null' ? solicitud_documento.edit_doc_proceso : "$null",
                        codigo_documento: solicitud_documento.edit_doc_codigo ? solicitud_documento.edit_doc_codigo : "$null",
                        nombre_documento: solicitud_documento.edit_doc_nombre ? solicitud_documento.edit_doc_nombre : "$null",
                        tipo_documento: solicitud_documento.edit_doc_tipo_documento != "[NULL]" && solicitud_documento.edit_doc_tipo_documento != 'null' ? solicitud_documento.edit_doc_tipo_documento : "$null",
                        tipo_accion: solicitud_documento.tipo_accion != "[NULL]" && solicitud_documento.tipo_accion != 'null' ? solicitud_documento.tipo_accion : "$null",
                        compania: solicitud_documento.session.compania_id,
                        institucion: solicitud_documento.session.institucion_id ? solicitud_documento.session.institucion_id : "$null",
                        documentos_asociados: solicitud_documento.documentos_asociados != "[NULL]" && solicitud_documento.documentos_asociados != 'null' ? solicitud_documento.documentos_asociados : "$null",
                        estatus: solicitud_documento.estatus != "[NULL]" && solicitud_documento.estatus != 'null' ? solicitud_documento.estatus : "$null",
                        where: [
                            {
                                field: "id",
                                value: solicitud_documento.id
                            }
                        ]
                    }, async function (result) {
                        SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                        Object.keys(solicitud_documento.form.oldData).forEach(d => {
                            ["Edit_doc", "Estado", "Nombre", "Descripción"].forEach(e => {
                                if (v.startsWith(d, e)) {
                                    if (d == "Nombre") {
                                        old_Data["Nombre de la solicitud"] = solicitud_documento.form.oldData[d];
                                    } else if (d == "Descripción") {
                                        old_Data["Descripción de la solicitud"] = solicitud_documento.form.oldData[d];
                                    } else {
                                        old_Data[d == "Estado" ? d : d.split("Edit_doc_")[1]] = solicitud_documento.form.oldData[d];
                                    }
                                }
                            });
                        });
                        Object.keys(auditVar).forEach(d => {
                            ["Edit_doc", "Estado", "Nombre", "Descripción"].forEach(e => {
                                if (v.startsWith(d, e)) {
                                    if (d == "Nombre") {
                                        updated_data["Nombre de la solicitud"] = auditVar[d];
                                    } else if (d == "Descripción") {
                                        updated_data["Descripción de la solicitud"] = auditVar[d];
                                    } else {
                                        updated_data[d == "Estado" ? d : d.split("Edit_doc_")[1]] = auditVar[d] != "" ? auditVar[d] : undefined;
                                    }
                                }
                            });
                        });
                        await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_documento.tableOrView ? solicitud_documento.tableOrView : solicitud_documento.modelName, updated_data, old_Data);
                        solicitud_documento.refresh();
                        MODAL.close()
                    });
                }
            }
        }, ['nombre']);
    }
    solicitud_documento.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        Object.keys(data.updating).forEach(d => {
            ["delete_doc", "mod_doc", "edit_doc"].forEach(e => {
                if (v.startsWith(d, e)) delete data.updating[d]
            });
        });
        delete data.updating.documentos_asociados
        if (solicitud_documento.tipo_accion == 3) {
            if (!solicitud_documento.delete_doc_marco_legal) {
                data.updating.marco_legal = "$null";
            }
        }
        if (!solicitud_documento.trabaja_marco_legal) {
            data.updating.marco_legal = "$null"
        }
        if (data.updating.estatus == 3) {
            data.updating.fecha_solicitud = moment().format("YYYY-MM-DD HH:mm:ss");
        }
        resolve(true)
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    });
    //
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});