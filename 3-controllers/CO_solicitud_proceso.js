app.controller("solicitud_proceso", function ($scope, $http, $compile) {
    solicitud_proceso = this;
    //solicitud_proceso.fixFilters = [];
    solicitud_proceso.session = new SESSION().current();
    //solicitud_proceso.singular = "singular";
    //solicitud_proceso.plural = "plural";
    solicitud_proceso.headertitle = "Solicitud de Procesos";
    solicitud_proceso.my_true_estatus = 1;
    solicitud_proceso.caracteristica = solicitud_proceso.session.groups[0].caracteristica;
    solicitud_proceso.canStatus = "";
    solicitud_proceso.loaded = false;
    //solicitud_proceso.destroyForm = false;
    //solicitud_proceso.permissionTable = "tabletopermission";
    solicitud_proceso.getMapaProceso = async function (callback) {
        var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value:  solicitud_proceso.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  solicitud_proceso.session.institucion_id ? "=" : "is",
                    "value":  solicitud_proceso.session.institucion_id ?  solicitud_proceso.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (mapaData) {
            solicitud_proceso.mapa_id = mapaData.id;
            solicitud_proceso.fixFilters = [
                {
                    field: "compania",
                    value: solicitud_proceso.session.compania_id
                },
                {
                    field: "institucion",
                    operator: solicitud_proceso.session.institucion_id ? "=" : "is",
                    value: solicitud_proceso.session.institucion_id ? solicitud_proceso.session.institucion_id : "$null"
                },
                {
                    field: "mapa_proceso_solicitud",
                    value: solicitud_proceso.mapa_id ? solicitud_proceso.mapa_id : -1
                }
            ];

        }else{
            solicitud_proceso.fixFilters = [
                {
                    field: "compania",
                    value: solicitud_proceso.session.compania_id
                },
                {
                    field: "institucion",
                    operator: solicitud_proceso.session.institucion_id ? "=" : "is",
                    value: solicitud_proceso.session.institucion_id ? solicitud_proceso.session.institucion_id : "$null"
                },
                {
                    field: "mapa_proceso_solicitud",
                    value: -1
                }
            ];
        }
        solicitud_proceso.refresh();
        if (callback)
            callback();
    }
    solicitud_proceso.getMapaProceso(function () {
        solicitud_proceso.refresh();
    });

    RUNCONTROLLER("solicitud_proceso", solicitud_proceso, $scope, $http, $compile);

    solicitud_proceso.formulary = function (data, mode, defaultData) {
        if (solicitud_proceso !== undefined) {
            RUN_B("solicitud_proceso", solicitud_proceso, $scope, $http, $compile);
            solicitud_proceso.form.modalWidth = ENUM.modal.width.full;
            solicitud_proceso.form.readonly = {
                solicitante: solicitud_proceso.session.id,
                compania: solicitud_proceso.session.compania_id,
                institucion: solicitud_proceso.session.institucion_id,
                mapa_proceso_solicitud: solicitud_proceso.mapa_id ? solicitud_proceso.mapa_id : -1
            };
            solicitud_proceso.form.titles = {
                new: "Crear Solicitud de Proceso",
                edit: "Editar Solicitud de Proceso",
                view: "Ver Solicitud de Proceso"
            };
            solicitud_proceso.createForm(data, mode, defaultData);
            let do_me_once = false;
            var do_meOnce = false;
            solicitud_proceso.selectQueries['estatus'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: solicitud_proceso.session.groups[0].id
                }
            ];
            $scope.$watch("solicitud_proceso.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(solicitud_proceso, 'nombre', rules);
            });
            $scope.$watch("solicitud_proceso.proceso_categoria", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'proceso_categoria', rules);
            });
            $scope.$watch("solicitud_proceso.objetivo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'objetivo', rules);
            });
            $scope.$watch("solicitud_proceso.alcance", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'alcance', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("solicitud_proceso.responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'responsable', rules);
            });
            $scope.$watch("solicitud_proceso.recursos", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'recursos', rules);
            });
            $scope.$watch("solicitud_proceso.estatus", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'estatus', rules);
            });
            //ms_product.selectQueries['mapa_proceso'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("solicitud_proceso.mapa_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'mapa_proceso', rules);
            });
            $scope.$watch("solicitud_proceso.nombre_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'nombre_proceso', rules);
            });
            //ms_product.selectQueries['tipo_accion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("solicitud_proceso.tipo_accion", function (value) {
                var rules = [];
                //rules here
                solicitud_proceso.nombre_solicitante = mode === 'new' ? solicitud_proceso.session.fullName() : solicitud_proceso.solicitante_nombre;
                solicitud_proceso.departamento_solicitante = mode === 'new' ? solicitud_proceso.session.departamento_nombre : solicitud_proceso.solicitante_departamento;
                solicitud_proceso.fecha_solicitante = mode === 'new' ? LAN.date() : LAN.date(solicitud_proceso.fecha_solicitud);
                solicitud_proceso.refreshAngular()
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'tipo_accion', rules);
            });
            $scope.$watch("solicitud_proceso.proceso", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                if (solicitud_proceso.tipo_accion == 2) {
                    if (solicitud_proceso.form.selected('proceso')) {
                        solicitud_proceso.mod_pro_id = solicitud_proceso.form.selected('proceso').id;
                        solicitud_proceso.mod_pro_mapa_proceso = solicitud_proceso.form.selected('proceso').mapa_proceso + "";
                        solicitud_proceso.mod_pro_proceso_categoria = solicitud_proceso.form.selected('proceso').procesos_categoria + "";
                        solicitud_proceso.mod_pro_responsable = solicitud_proceso.form.selected('proceso').responsable + "";
                        solicitud_proceso.mod_pro_estatus = solicitud_proceso.form.selected('proceso').estatus_id + "";
                        solicitud_proceso.mod_pro_nombre = solicitud_proceso.form.selected('proceso').nombre;
                        solicitud_proceso.mod_pro_objetivo = solicitud_proceso.form.selected('proceso').objetivo;
                        solicitud_proceso.mod_pro_alcance = solicitud_proceso.form.selected('proceso').alcance;
                        solicitud_proceso.mod_pro_descripcion = solicitud_proceso.form.selected('proceso').descripcion;
                        solicitud_proceso.mod_pro_recursos = solicitud_proceso.form.selected('proceso').recursos;
                        solicitud_proceso.form.loadDropDown('mod_pro_mapa_proceso');
                        solicitud_proceso.form.loadDropDown('mod_pro_proceso_categoria');
                        solicitud_proceso.form.loadDropDown('mod_pro_responsable');
                        solicitud_proceso.form.loadDropDown('mod_pro_estatus');
                        solicitud_proceso.refreshAngular();
                    }
                }
                if (solicitud_proceso.tipo_accion == 3) {
                    if (solicitud_proceso.form.selected('proceso')) {
                        solicitud_proceso.delete_pro_id = solicitud_proceso.form.selected('proceso').id;
                        solicitud_proceso.delete_pro_mapa_proceso = solicitud_proceso.form.selected('proceso').mapa_proceso + "";
                        solicitud_proceso.delete_pro_proceso_categoria = solicitud_proceso.form.selected('proceso').procesos_categoria + "";
                        solicitud_proceso.delete_pro_responsable = solicitud_proceso.form.selected('proceso').responsable + "";
                        solicitud_proceso.delete_pro_estatus = solicitud_proceso.form.selected('proceso').estatus_id + "";
                        solicitud_proceso.delete_pro_nombre = solicitud_proceso.form.selected('proceso').nombre;
                        solicitud_proceso.delete_pro_objetivo = solicitud_proceso.form.selected('proceso').objetivo;
                        solicitud_proceso.delete_pro_alcance = solicitud_proceso.form.selected('proceso').alcance;
                        solicitud_proceso.delete_pro_descripcion = solicitud_proceso.form.selected('proceso').descripcion;
                        solicitud_proceso.delete_pro_recursos = solicitud_proceso.form.selected('proceso').recursos;
                        solicitud_proceso.form.loadDropDown('delete_pro_mapa_proceso');
                        solicitud_proceso.form.loadDropDown('delete_pro_proceso_categoria');
                        solicitud_proceso.form.loadDropDown('delete_pro_responsable');
                        solicitud_proceso.form.loadDropDown('delete_pro_estatus');
                        solicitud_proceso.refreshAngular();
                    }
                }
                VALIDATION.validate(solicitud_proceso, 'proceso', rules);
            });
            if (solicitud_proceso.caracteristica == ENUM_2.Grupos.analista_de_calidad || solicitud_proceso.caracteristica == ENUM_2.Grupos.supervisor_de_calidad) {

            }
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("solicitud_proceso.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("solicitud_proceso.proceso_categoria", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'proceso_categoria', rules);
            });
            $scope.$watch("solicitud_proceso.mapa_proceso", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'mapa_proceso', rules);
            });
            $scope.$watch("solicitud_proceso.responsable", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'responsable', rules);
            });
            $scope.$watch("solicitud_proceso.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'institucion', rules);
            });

            $scope.$watch("solicitud_proceso.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'descripcion', rules);
            });
            $scope.$watch("solicitud_proceso.descripcion_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'descripcion_proceso', rules);
            });
            $scope.$watch("solicitud_proceso.nombre_proceso", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_proceso, 'nombre_proceso', rules);
            });
            solicitud_proceso.triggers.table.after.control = function (data) {
                if ((data === "estatus" && solicitud_proceso.form.mode === "new") && !do_me_once) {
                    console.log("entre")
                    solicitud_proceso.estatus = '1';
                    solicitud_proceso.my_true_estatus = 1;
                    solicitud_proceso.form.loadDropDown('estatus')
                    do_me_once = true;
                }
                if (data === "tipo_accion") {
                    if (solicitud_proceso.form.mode == "edit") {
                        solicitud_proceso.form.options.tipo_accion.disabled = true;
                    }
                }
                if (data === "proceso") {
                    if (solicitud_proceso.form.mode == "edit") {
                        solicitud_proceso.form.options.proceso.disabled = true;
                    }
                    if (!do_meOnce) {
                        if (solicitud_proceso.tipo_accion == 2) {
                            if (solicitud_proceso.form.selected('proceso')) {
                                solicitud_proceso.mod_pro_id = solicitud_proceso.form.selected('proceso').id;
                                solicitud_proceso.mod_pro_mapa_proceso = solicitud_proceso.form.selected('proceso').mapa_proceso + "";
                                solicitud_proceso.mod_pro_proceso_categoria = solicitud_proceso.form.selected('proceso').procesos_categoria + "";
                                solicitud_proceso.mod_pro_responsable = solicitud_proceso.form.selected('proceso').responsable + "";
                                solicitud_proceso.mod_pro_estatus = solicitud_proceso.form.selected('proceso').estatus_id + "";
                                solicitud_proceso.mod_pro_nombre = solicitud_proceso.form.selected('proceso').nombre;
                                solicitud_proceso.mod_pro_objetivo = solicitud_proceso.form.selected('proceso').objetivo;
                                solicitud_proceso.mod_pro_alcance = solicitud_proceso.form.selected('proceso').alcance;
                                solicitud_proceso.mod_pro_descripcion = solicitud_proceso.form.selected('proceso').descripcion;
                                solicitud_proceso.mod_pro_recursos = solicitud_proceso.form.selected('proceso').recursos;
                                solicitud_proceso.form.loadDropDown('mod_pro_mapa_proceso');
                                solicitud_proceso.form.loadDropDown('mod_pro_proceso_categoria');
                                solicitud_proceso.form.loadDropDown('mod_pro_responsable');
                                solicitud_proceso.form.loadDropDown('mod_pro_estatus');
                                solicitud_proceso.refreshAngular();
                            }
                        }
                        if (solicitud_proceso.tipo_accion == 3) {
                            if (solicitud_proceso.form.selected('proceso')) {
                                solicitud_proceso.delete_pro_id = solicitud_proceso.form.selected('proceso').id;
                                solicitud_proceso.delete_pro_mapa_proceso = solicitud_proceso.form.selected('proceso').mapa_proceso + "";
                                solicitud_proceso.delete_pro_proceso_categoria = solicitud_proceso.form.selected('proceso').procesos_categoria + "";
                                solicitud_proceso.delete_pro_responsable = solicitud_proceso.form.selected('proceso').responsable + "";
                                solicitud_proceso.delete_pro_estatus = solicitud_proceso.form.selected('proceso').estatus_id + "";
                                solicitud_proceso.delete_pro_nombre = solicitud_proceso.form.selected('proceso').nombre;
                                solicitud_proceso.delete_pro_objetivo = solicitud_proceso.form.selected('proceso').objetivo;
                                solicitud_proceso.delete_pro_alcance = solicitud_proceso.form.selected('proceso').alcance;
                                solicitud_proceso.delete_pro_descripcion = solicitud_proceso.form.selected('proceso').descripcion;
                                solicitud_proceso.delete_pro_recursos = solicitud_proceso.form.selected('proceso').recursos;
                                solicitud_proceso.form.loadDropDown('delete_pro_mapa_proceso');
                                solicitud_proceso.form.loadDropDown('delete_pro_proceso_categoria');
                                solicitud_proceso.form.loadDropDown('delete_pro_responsable');
                                solicitud_proceso.form.loadDropDown('delete_pro_estatus');
                                solicitud_proceso.refreshAngular();
                            }
                        }
                        do_meOnce = true;
                    }
                }
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
            };
        }
    };
    solicitud_proceso.delete_pro = function (proceso) {
        let titulo_push="";
        let cuerpo_push="";
        let titulo= "";
        let cuerpo="";
        let cuerpo2 = "";
        VALIDATION.save(solicitud_proceso, async function () {
            var auditVar = solicitud_proceso.form.getAudit();
            BASEAPI.list('vw_auditoria_programa_plan_procesos', {
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
                        field: "proceso",
                        value: solicitud_proceso.proceso
                    },
                    {
                        field: "$auditoria_programa_plan.estatus",
                        operator: "not in",
                        value: [5,8]
                    }
                ],

            },function(result){
                if(result.data.length > 0){
                    SWEETALERT.show({
                        message: `Proceso no puede ser ELIMINADO, el mismo está siendo AUDITADO en estos momentos en el plan de Auditoría: "${result.data[0].auditoria_programa_plan_nombre}"`,
                    });
                }else{
                    if (solicitud_proceso.form.mode == 'new') {
                        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                        BASEAPI.insertID('solicitud_proceso', {
                            nombre: solicitud_proceso.nombre ? solicitud_proceso.nombre : "$null",
                            descripcion: solicitud_proceso.descripcion ? solicitud_proceso.descripcion : "$null",
                            proceso_categoria: solicitud_proceso.delete_pro_proceso_categoria ? solicitud_proceso.delete_pro_proceso_categoria : "$null",
                            responsable: solicitud_proceso.delete_pro_responsable ? solicitud_proceso.delete_pro_responsable : "$null",
                            alcance: solicitud_proceso.delete_pro_alcance ? solicitud_proceso.delete_pro_alcance : "$null",
                            objetivo: solicitud_proceso.delete_pro_objetivo ? solicitud_proceso.delete_pro_objetivo : "$null",
                            mapa_proceso: solicitud_proceso.delete_pro_mapa_proceso ? solicitud_proceso.delete_pro_mapa_proceso : "$null",
                            proceso: solicitud_proceso.proceso ? solicitud_proceso.proceso : "$null",
                            nombre_proceso: solicitud_proceso.delete_pro_nombre ? solicitud_proceso.delete_pro_nombre : "$null",
                            tipo_accion: solicitud_proceso.tipo_accion ? solicitud_proceso.tipo_accion : "$null",
                            compania: solicitud_proceso.session.compania_id,
                            institucion: solicitud_proceso.session.institucion_id ? solicitud_proceso.session.institucion_id : "$null",
                            solicitante: solicitud_proceso.session.usuario_id,
                            mapa_proceso_solicitud: solicitud_proceso.mapa_id ? solicitud_proceso.mapa_id : "$null",
                            estatus: solicitud_proceso.estatus != "[NULL]" && solicitud_proceso.estatus != 'null' ? solicitud_proceso.estatus : "$null",
                        }, "", "", async function (result) {
                            SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                            if (solicitud_proceso.estatus == 2){
                                titulo_push = `La solicitud de eliminación de proceso "${solicitud_proceso.nombre}" ha sido Elaborada.`;
                                cuerpo_push = `La solicitud de eliminación del proceso "${solicitud_proceso.delete_pro_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
                                titulo = `La solicitud de eliminación de proceso  "${solicitud_proceso.nombre}" ha sido Elaborada.`
                                cuerpo = `La solicitud de eliminación del proceso "${solicitud_proceso.delete_pro_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.
        
Gracias.`;
                                function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_proceso.session.compania_id, solicitud_proceso.session.institucion_id, solicitud_proceso.solicitante, [4,18]);
                            }
                            await AUDIT.LOG(AUDIT.ACTIONS.insert, solicitud_proceso.tableOrView ? solicitud_proceso.tableOrView : solicitud_proceso.modelName, auditVar);
                            solicitud_proceso.refresh();
                            MODAL.close()
                        });
                    } else {
                        if (solicitud_proceso.estatus == 3) {
                            SWEETALERT.confirm({
                                message: "¿Autorizar la eliminación de este proceso?",
                                confirm: function () {
                                    BASEAPI.updateall('solicitud_proceso', {
                                        nombre: solicitud_proceso.nombre ? solicitud_proceso.nombre : "$null",
                                        estatus: solicitud_proceso.estatus != "[NULL]" && solicitud_proceso.estatus != 'null' ? solicitud_proceso.estatus : "$null",
                                        fecha_solicitud: moment().format("YYYY-MM-DD HH:mm:ss"),
                                        where: [
                                            {
                                                field: "id",
                                                value: solicitud_proceso.id
                                            }
                                        ]
                                    }, function (result) {
                                        BASEAPI.updateall('procesos', {
                                            estatus: 4,
                                            where: [
                                                {
                                                    field: "id",
                                                    value: proceso
                                                }
                                            ]
                                        }, async function (result) {
                                            console.log(result)
                                            SWEETALERT.stop()
                                            solicitud_proceso.refresh();
                                            BASEAPI.updateall('documentos_asociados', {
                                                estatus: 4,
                                                where: [
                                                    {
                                                        field: "proceso",
                                                        value: proceso
                                                    }
                                                ]
                                            }, async function (result) {
                                                if (result){
                                                    BASEAPI.deleteall('procesos_elemento', [
                                                        {
                                                            field: "proceso",
                                                            value: proceso
                                                        }
                                                    ], async function (result) {
                                                        titulo_push = `La solicitud de eliminación de proceso "${solicitud_proceso.nombre}" ha sido Autorizada.`;
                                                        cuerpo_push = `La solicitud de eliminación del proceso "${solicitud_proceso.delete_pro_nombre}" ha sido Autorizada.`;
                                                        titulo = `La solicitud de eliminación de proceso  "${solicitud_proceso.nombre}" ha sido Autorizada.`
                                                        cuerpo = `La solicitud de eliminación del proceso "${solicitud_proceso.delete_pro_nombre}" ha sido Autorizada. El Proceso tomará un estatus de borrado y será enviado al repositorio de Procesos borrados.
        
Gracias.`;
                                                        function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_proceso.session.compania_id, solicitud_proceso.session.institucion_id, solicitud_proceso.solicitante, [4,18]);
                                                        await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_proceso.tableOrView ? solicitud_proceso.tableOrView : solicitud_proceso.modelName, auditVar, solicitud_proceso.form.oldData);
                                                        MODAL.close();
                                                    });
                                                }
                                            })
                                        });
                                    });
                                }
                            });
                        } else if (solicitud_proceso.estatus == 2) {
                            if (solicitud_proceso.my_true_estatus == 1) {
                                SWEETALERT.confirm({
                                    message: "¿Solicitar la eliminación de este proceso?",
                                    confirm: function () {
                                        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                        BASEAPI.updateall('solicitud_proceso', {
                                            nombre: solicitud_proceso.nombre ? solicitud_proceso.nombre : "$null",
                                            descripcion: solicitud_proceso.descripcion ? solicitud_proceso.descripcion : "$null",
                                            responsable: solicitud_proceso.delete_pro_responsable ? solicitud_proceso.delete_pro_responsable : "$null",
                                            proceso_categoria: solicitud_proceso.delete_pro_proceso_categoria ? solicitud_proceso.delete_pro_proceso_categoria : "$null",
                                            alcance: solicitud_proceso.delete_pro_alcance ? solicitud_proceso.delete_pro_alcance : "$null",
                                            objetivo: solicitud_proceso.delete_pro_objetivo ? solicitud_proceso.delete_pro_objetivo : "$null",
                                            mapa_proceso: solicitud_proceso.delete_pro_mapa_proceso ? solicitud_proceso.delete_pro_mapa_proceso : "$null",
                                            proceso: solicitud_proceso.proceso ? solicitud_proceso.proceso : "$null",
                                            nombre_proceso: solicitud_proceso.delete_pro_nombre ? solicitud_proceso.delete_pro_nombre : "$null",
                                            tipo_accion: solicitud_proceso.tipo_accion ? solicitud_proceso.tipo_accion : "$null",
                                            compania: solicitud_proceso.session.compania_id,
                                            institucion: solicitud_proceso.session.institucion_id ? solicitud_proceso.session.institucion_id : "$null",
                                            solicitante: solicitud_proceso.session.usuario_id,
                                            estatus: solicitud_proceso.estatus != "[NULL]" && solicitud_proceso.estatus != 'null' ? solicitud_proceso.estatus : "$null",
                                            where: [
                                                {
                                                    field: "id",
                                                    value: solicitud_proceso.id
                                                }
                                            ]
                                        }, async function (result) {
                                            SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                                            titulo_push = `La solicitud de eliminación de proceso "${solicitud_proceso.nombre}" ha sido Elaborada.`;
                                            cuerpo_push = `La solicitud de eliminación del proceso "${solicitud_proceso.delete_pro_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
                                            titulo = `La solicitud de eliminación de proceso  "${solicitud_proceso.nombre}" ha sido Elaborada.`
                                            cuerpo = `La solicitud de eliminación del proceso "${solicitud_proceso.delete_pro_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.
        
Gracias.`;
                                            function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_proceso.session.compania_id, solicitud_proceso.session.institucion_id, solicitud_proceso.solicitante, [4,18]);
                                            await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_proceso.tableOrView ? solicitud_proceso.tableOrView : solicitud_proceso.modelName, auditVar, solicitud_proceso.form.oldData);
                                            solicitud_proceso.refresh();
                                            MODAL.close()
                                        });
                                    }
                                });
                            } else {
                                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                BASEAPI.updateall('solicitud_proceso', {
                                    nombre: solicitud_proceso.nombre ? solicitud_proceso.nombre : "$null",
                                    descripcion: solicitud_proceso.descripcion ? solicitud_proceso.descripcion : "$null",
                                    responsable: solicitud_proceso.delete_pro_responsable ? solicitud_proceso.delete_pro_responsable : "$null",
                                    proceso_categoria: solicitud_proceso.delete_pro_proceso_categoria ? solicitud_proceso.delete_pro_proceso_categoria : "$null",
                                    alcance: solicitud_proceso.delete_pro_alcance ? solicitud_proceso.delete_pro_alcance : "$null",
                                    objetivo: solicitud_proceso.delete_pro_objetivo ? solicitud_proceso.delete_pro_objetivo : "$null",
                                    mapa_proceso: solicitud_proceso.delete_pro_mapa_proceso ? solicitud_proceso.delete_pro_mapa_proceso : "$null",
                                    tipo_accion: solicitud_proceso.tipo_accion ? solicitud_proceso.tipo_accion : "$null",
                                    compania: solicitud_proceso.session.compania_id,
                                    institucion: solicitud_proceso.session.institucion_id ? solicitud_proceso.session.institucion_id : "$null",
                                    solicitante: solicitud_proceso.session.usuario_id,
                                    proceso: solicitud_proceso.proceso ? solicitud_proceso.proceso : "$null",
                                    nombre_proceso: solicitud_proceso.delete_pro_nombre ? solicitud_proceso.delete_pro_nombre : "$null",
                                    estatus: solicitud_proceso.estatus != "[NULL]" && solicitud_proceso.estatus != 'null' ? solicitud_proceso.estatus : "$null",
                                    where: [
                                        {
                                            field: "id",
                                            value: solicitud_proceso.id
                                        }
                                    ]
                                }, async function (result) {
                                    SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                                    await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_proceso.tableOrView ? solicitud_proceso.tableOrView : solicitud_proceso.modelName, auditVar, solicitud_proceso.form.oldData);
                                    solicitud_documento.refresh();
                                    MODAL.close()
                                });
                            }
                        } else {
                            SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                            BASEAPI.updateall('solicitud_proceso', {
                                nombre: solicitud_proceso.nombre ? solicitud_proceso.nombre : "$null",
                                descripcion: solicitud_proceso.descripcion ? solicitud_proceso.descripcion : "$null",
                                proceso_categoria: solicitud_proceso.delete_pro_proceso_categoria ? solicitud_proceso.delete_pro_proceso_categoria : "$null",
                                responsable: solicitud_proceso.delete_pro_responsable ? solicitud_proceso.delete_pro_responsable : "$null",
                                alcance: solicitud_proceso.delete_pro_alcance ? solicitud_proceso.delete_pro_alcance : "$null",
                                objetivo: solicitud_proceso.delete_pro_objetivo ? solicitud_proceso.delete_pro_objetivo : "$null",
                                mapa_proceso: solicitud_proceso.delete_pro_mapa_proceso ? solicitud_proceso.delete_pro_mapa_proceso : "$null",
                                proceso: solicitud_proceso.proceso ? solicitud_proceso.proceso : "$null",
                                nombre_proceso: solicitud_proceso.delete_pro_nombre ? solicitud_proceso.delete_pro_nombre : "$null",
                                tipo_accion: solicitud_proceso.tipo_accion ? solicitud_proceso.tipo_accion : "$null",
                                compania: solicitud_proceso.session.compania_id,
                                institucion: solicitud_proceso.session.institucion_id ? solicitud_proceso.session.institucion_id : "$null",
                                solicitante: solicitud_proceso.session.usuario_id,
                                estatus: solicitud_proceso.estatus != "[NULL]" && solicitud_proceso.estatus != 'null' ? solicitud_proceso.estatus : "$null",
                                where: [
                                    {
                                        field: "id",
                                        value: solicitud_proceso.id
                                    }
                                ]
                            }, async function (result) {
                                SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                                await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_proceso.tableOrView ? solicitud_proceso.tableOrView : solicitud_proceso.modelName, auditVar, solicitud_proceso.form.oldData);
                                solicitud_proceso.refresh();
                                MODAL.close()
                            });
                        }
                    }
                }
            });

        }, ['nombre', 'tipo_accion', 'estatus']);
    }
    solicitud_proceso.mod_pro = function (proceso) {
        let titulo_push="";
        let cuerpo_push="";
        let titulo= "";
        let cuerpo="";
        let cuerpo2 = "";
        VALIDATION.save(solicitud_proceso, async function () {
            var auditVar = solicitud_proceso.form.getAudit();
            let old_Data = {}
            let updated_data = {}
            if (solicitud_proceso.form.mode == 'new') {
                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                BASEAPI.insertID('solicitud_proceso', {
                    nombre: solicitud_proceso.nombre ? solicitud_proceso.nombre : "$null",
                    descripcion: solicitud_proceso.descripcion ? solicitud_proceso.descripcion : "$null",
                    responsable: solicitud_proceso.edit_pro_responsable != "[NULL]" && solicitud_proceso.edit_pro_responsable != 'null' ? solicitud_proceso.edit_pro_responsable : "$null",
                    proceso_categoria: solicitud_proceso.edit_pro_proceso_categoria != "[NULL]" && solicitud_proceso.edit_pro_proceso_categoria != 'null' ? solicitud_proceso.edit_pro_proceso_categoria : "$null",
                    alcance: solicitud_proceso.edit_pro_alcance ? solicitud_proceso.edit_pro_alcance : "$null",
                    objetivo: solicitud_proceso.edit_pro_objetivo ? solicitud_proceso.edit_pro_objetivo : "$null",
                    mapa_proceso: solicitud_proceso.edit_pro_mapa_proceso != "[NULL]" && solicitud_proceso.edit_pro_mapa_proceso != 'null'? solicitud_proceso.edit_pro_mapa_proceso : "$null",
                    proceso: solicitud_proceso.proceso != "[NULL]" && solicitud_proceso.proceso != 'null' ? solicitud_proceso.proceso : "$null",
                    recursos: solicitud_proceso.edit_pro_recursos ? solicitud_proceso.edit_pro_recursos : "$null",
                    nombre_proceso: solicitud_proceso.edit_pro_nombre ? solicitud_proceso.edit_pro_nombre : "$null",
                    tipo_accion: solicitud_proceso.tipo_accion != "[NULL]" && solicitud_proceso.tipo_accion != 'null' ? solicitud_proceso.tipo_accion : "$null",
                    compania: solicitud_proceso.session.compania_id,
                    institucion: solicitud_proceso.session.institucion_id ? solicitud_proceso.session.institucion_id : "$null",
                    solicitante: solicitud_proceso.session.usuario_id,
                    mapa_proceso_solicitud: solicitud_proceso.mapa_id ? solicitud_proceso.mapa_id : "$null",
                    estatus: solicitud_proceso.estatus != "[NULL]" && solicitud_proceso.estatus != 'null' ? solicitud_proceso.estatus : "$null",
                }, "", "", async function (result) {
                    SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                    if (solicitud_proceso.estatus == 2){
                        titulo_push = `La solicitud de modificación de proceso "${solicitud_proceso.nombre}" ha sido Elaborada.`;
                        cuerpo_push = `La solicitud de modificación del proceso "${solicitud_proceso.mod_pro_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
                        titulo = `La solicitud de modificación de proceso  "${solicitud_proceso.nombre}" ha sido Elaborada.`
                        cuerpo = `La solicitud de modificación del proceso "${solicitud_proceso.mod_pro_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.
        
Gracias.`;
                        function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_proceso.session.compania_id, solicitud_proceso.session.institucion_id, solicitud_proceso.solicitante, [4,18]);
                    }
                    Object.keys(solicitud_proceso.form.oldData).forEach(d => {
                        ["Mod_pro", "Estado", "Nombre", "Descripción"].forEach(e => {
                            if (v.startsWith(d, e)){
                                if (d == "nombre"){
                                    old_Data["Nombre de la solicitud"] = solicitud_proceso.form.oldData[d];
                                }else if (d == "Descripción") {
                                    old_Data["Descripción de la solicitud"] = solicitud_proceso.form.oldData[d];
                                }else{
                                    old_Data[d == "Estado" ? d : d.split("Mod_pro_")[1]] = solicitud_proceso.form.oldData[d];
                                }
                            }
                        });
                    });
                    Object.keys(auditVar).forEach(d => {
                        ["Edit_pro", "Estado", "Nombre", "Descripción"].forEach(e => {
                            if (v.startsWith(d, e)){
                                if (d == "Nombre"){
                                    updated_data["Nombre de la solicitud"] = auditVar[d];
                                }else if (d == "Descripción") {
                                    updated_data["Descripción de la solicitud"] = auditVar[d];
                                }else{
                                    updated_data[d == "Estado" ? d : d.split("Edit_pro_")[1]] = auditVar[d] != "" ? auditVar[d] : undefined;
                                }

                            }
                        });
                    });
                    await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_proceso.tableOrView ? solicitud_proceso.tableOrView : solicitud_proceso.modelName, updated_data, old_Data);
                    solicitud_proceso.refresh();
                    MODAL.close()
                });
            } else {
                if (solicitud_proceso.estatus == 3) {
                    SWEETALERT.confirm({
                        message: "¿Autorizar la Modificación de este Proceso?",
                        confirm: function () {
                            BASEAPI.updateall('solicitud_proceso', {
                                nombre: solicitud_proceso.nombre ? solicitud_proceso.nombre : "$null",
                                descripcion: solicitud_proceso.descripcion ? solicitud_proceso.descripcion : "$null",
                                responsable: solicitud_proceso.edit_pro_responsable != "[NULL]" && solicitud_proceso.edit_pro_responsable != 'null' ? solicitud_proceso.edit_pro_responsable : "$null",
                                proceso_categoria: solicitud_proceso.edit_pro_proceso_categoria != "[NULL]" && solicitud_proceso.edit_pro_proceso_categoria != 'null' ? solicitud_proceso.edit_pro_proceso_categoria : "$null",
                                alcance: solicitud_proceso.edit_pro_alcance ? solicitud_proceso.edit_pro_alcance : "$null",
                                objetivo: solicitud_proceso.edit_pro_objetivo ? solicitud_proceso.edit_pro_objetivo : "$null",
                                mapa_proceso: solicitud_proceso.edit_pro_mapa_proceso != "[NULL]" && solicitud_proceso.edit_pro_mapa_proceso != 'null'? solicitud_proceso.edit_pro_mapa_proceso : "$null",
                                proceso: solicitud_proceso.proceso != "[NULL]" && solicitud_proceso.proceso != 'null' ? solicitud_proceso.proceso : "$null",
                                recursos: solicitud_proceso.edit_pro_recursos ? solicitud_proceso.edit_pro_recursos : "$null",
                                nombre_proceso: solicitud_proceso.edit_pro_nombre ? solicitud_proceso.edit_pro_nombre : "$null",
                                tipo_accion: solicitud_proceso.tipo_accion != "[NULL]" && solicitud_proceso.tipo_accion != 'null' ? solicitud_proceso.tipo_accion : "$null",
                                compania: solicitud_proceso.session.compania_id,
                                institucion: solicitud_proceso.session.institucion_id ? solicitud_proceso.session.institucion_id : "$null",
                                solicitante: solicitud_proceso.session.usuario_id,
                                estatus: solicitud_proceso.estatus != "[NULL]" && solicitud_proceso.estatus != 'null' ? solicitud_proceso.estatus : "$null",
                                fecha_solicitud: moment().format("YYYY-MM-DD HH:mm:ss"),
                                where: [
                                    {
                                        field: "id",
                                        value: solicitud_proceso.id
                                    }
                                ]
                            }, function (result) {
                                BASEAPI.updateall('procesos', {
                                    nombre: solicitud_proceso.edit_pro_nombre || undefined,
                                    descripcion: solicitud_proceso.edit_pro_descripcion || undefined,
                                    responsable: solicitud_proceso.edit_pro_responsable != "[NULL]" && solicitud_proceso.edit_pro_responsable != 'null' ? solicitud_proceso.edit_pro_responsable : undefined,
                                    procesos_categoria: solicitud_proceso.edit_pro_proceso_categoria != "[NULL]" && solicitud_proceso.edit_pro_proceso_categoria != 'null' ? solicitud_proceso.edit_pro_proceso_categoria : undefined,
                                    alcance: solicitud_proceso.edit_pro_alcance || undefined,
                                    objetivo: solicitud_proceso.edit_pro_objetivo || undefined,
                                    recursos: solicitud_proceso.edit_pro_recursos || undefined,
                                    mapa_proceso: solicitud_proceso.edit_pro_mapa_proceso != "[NULL]" && solicitud_proceso.edit_pro_mapa_proceso != 'null' ? solicitud_proceso.edit_pro_mapa_proceso : undefined,
                                    solicitud_proceso: solicitud_proceso.id || undefined,
                                    where: [
                                        {
                                            field: "id",
                                            value: proceso
                                        }
                                    ]
                                }, async function (result) {
                                    console.log(result)
                                    SWEETALERT.stop()
                                    titulo_push = `La solicitud de modificación de proceso "${solicitud_proceso.nombre}" ha sido Autorizada.`;
                                    cuerpo_push = `La solicitud de modificación del proceso "${solicitud_proceso.mod_pro_nombre}" ha sido Autorizada por ${ solicitud_proceso.session.fullName() }.`;
                                    titulo = `La solicitud de modificación de proceso  "${solicitud_proceso.nombre}" ha sido Autorizada.`
                                    cuerpo = `La solicitud de modificación del proceso "${solicitud_proceso.mod_pro_nombre}" ha sido Autorizada por ${ solicitud_proceso.session.fullName() }.
        
Gracias.`;
                                    function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_proceso.session.compania_id, solicitud_proceso.session.institucion_id, solicitud_proceso.solicitante, [4,18]);
                                    Object.keys(solicitud_proceso.form.oldData).forEach(d => {
                                        ["Mod_pro", "Estado", "Nombre", "Descripción"].forEach(e => {
                                            if (v.startsWith(d, e)){
                                                if (d == "nombre"){
                                                    old_Data["Nombre de la solicitud"] = solicitud_proceso.form.oldData[d];
                                                }else if (d == "Descripción") {
                                                    old_Data["Descripción de la solicitud"] = solicitud_proceso.form.oldData[d];
                                                }else{
                                                    old_Data[d == "Estado" ? d : d.split("Mod_pro_")[1]] = solicitud_proceso.form.oldData[d];
                                                }
                                            }
                                        });
                                    });
                                    Object.keys(auditVar).forEach(d => {
                                        ["Edit_pro", "Estado", "Nombre", "Descripción"].forEach(e => {
                                            if (v.startsWith(d, e)){
                                                if (d == "Nombre"){
                                                    updated_data["Nombre de la solicitud"] = auditVar[d];
                                                }else if (d == "Descripción") {
                                                    updated_data["Descripción de la solicitud"] = auditVar[d];
                                                }else{
                                                    updated_data[d == "Estado" ? d : d.split("Edit_pro_")[1]] = auditVar[d] != "" ? auditVar[d] : undefined;
                                                }

                                            }
                                        });
                                    });
                                    await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_proceso.tableOrView ? solicitud_proceso.tableOrView : solicitud_proceso.modelName, updated_data, old_Data);
                                    solicitud_proceso.refresh();
                                    MODAL.close();
                                });
                            });
                        }
                    });
                } else if (solicitud_proceso.estatus == 2) {
                    if (solicitud_proceso.my_true_estatus == 1) {
                        SWEETALERT.confirm({
                            message: "¿Solicitar la modificación de este proceso?",
                            confirm: function () {
                                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                BASEAPI.updateall('solicitud_proceso', {
                                    nombre: solicitud_proceso.nombre ? solicitud_proceso.nombre : "$null",
                                    descripcion: solicitud_proceso.descripcion ? solicitud_proceso.descripcion : "$null",
                                    responsable: solicitud_proceso.edit_pro_responsable != "[NULL]" && solicitud_proceso.edit_pro_responsable != 'null' ? solicitud_proceso.edit_pro_responsable : "$null",
                                    proceso_categoria: solicitud_proceso.edit_pro_proceso_categoria != "[NULL]" && solicitud_proceso.edit_pro_responsable != 'null' ? solicitud_proceso.edit_pro_proceso_categoria : "$null",
                                    alcance: solicitud_proceso.edit_pro_alcance ? solicitud_proceso.edit_pro_alcance : "$null",
                                    objetivo: solicitud_proceso.edit_pro_objetivo ? solicitud_proceso.edit_pro_objetivo : "$null",
                                    mapa_proceso: solicitud_proceso.edit_pro_mapa_proceso != "[NULL]" && solicitud_proceso.edit_pro_mapa_proceso != 'null'? solicitud_proceso.edit_pro_mapa_proceso : "$null",
                                    proceso: solicitud_proceso.proceso != "[NULL]" && solicitud_proceso.proceso != 'null' ? solicitud_proceso.proceso : "$null",
                                    recursos: solicitud_proceso.edit_pro_recursos ? solicitud_proceso.edit_pro_recursos : "$null",
                                    nombre_proceso: solicitud_proceso.edit_pro_nombre ? solicitud_proceso.edit_pro_nombre : "$null",
                                    tipo_accion: solicitud_proceso.tipo_accion != "[NULL]" && solicitud_proceso.tipo_accion != 'null' ? solicitud_proceso.tipo_accion : "$null",
                                    compania: solicitud_proceso.session.compania_id,
                                    institucion: solicitud_proceso.session.institucion_id ? solicitud_proceso.session.institucion_id : "$null",
                                    solicitante: solicitud_proceso.session.usuario_id,
                                    estatus: solicitud_proceso.estatus != "[NULL]" && solicitud_proceso.estatus != 'null' ? solicitud_proceso.estatus : "$null",
                                    where: [
                                        {
                                            field: "id",
                                            value: solicitud_proceso.id
                                        }
                                    ]
                                }, async function (result) {
                                    SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                                    titulo_push = `La solicitud de modificación de proceso "${solicitud_proceso.nombre}" ha sido Elaborada.`;
                                    cuerpo_push = `La solicitud de modificación del proceso "${solicitud_proceso.mod_pro_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
                                    titulo = `La solicitud de modificación de proceso  "${solicitud_proceso.nombre}" ha sido Elaborada.`
                                    cuerpo = `La solicitud de modificación del proceso "${solicitud_proceso.mod_pro_nombre}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.
        
Gracias.`;
                                    function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_proceso.session.compania_id, solicitud_proceso.session.institucion_id, solicitud_proceso.solicitante, [4,18]);
                                    Object.keys(solicitud_proceso.form.oldData).forEach(d => {
                                        ["Edit_pro", "Estado", "Nombre", "Descripción"].forEach(e => {
                                            if (v.startsWith(d, e)){
                                                if (d == "nombre"){
                                                    old_Data["Nombre de la solicitud"] = solicitud_proceso.form.oldData[d];
                                                }else if (d == "Descripción") {
                                                    old_Data["Descripción de la solicitud"] = solicitud_proceso.form.oldData[d];
                                                }else{
                                                    old_Data[d == "Estado" ? d : d.split("Edit_pro_")[1]] = solicitud_proceso.form.oldData[d];
                                                }
                                            }
                                        });
                                    });
                                    Object.keys(auditVar).forEach(d => {
                                        ["Edit_pro", "Estado", "Nombre", "Descripción"].forEach(e => {
                                            if (v.startsWith(d, e)){
                                                if (d == "Nombre"){
                                                    updated_data["Nombre de la solicitud"] = auditVar[d];
                                                }else if (d == "Descripción") {
                                                    updated_data["Descripción de la solicitud"] = auditVar[d];
                                                }else{
                                                    updated_data[d == "Estado" ? d : d.split("Edit_pro_")[1]] = auditVar[d] != "" ? auditVar[d] : undefined;
                                                }

                                            }
                                        });
                                    });
                                    await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_proceso.tableOrView ? solicitud_proceso.tableOrView : solicitud_proceso.modelName, updated_data, old_Data);
                                    solicitud_proceso.refresh();
                                    MODAL.close()
                                });
                            }
                        });
                    } else {
                        console.log(solicitud_proceso.edit_doc_proceso_categoria, "a ver");
                        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                        BASEAPI.updateall('solicitud_proceso', {
                            nombre: solicitud_proceso.nombre ? solicitud_proceso.nombre : "$null",
                            descripcion: solicitud_proceso.descripcion ? solicitud_proceso.descripcion : "$null",
                            responsable: solicitud_proceso.edit_pro_responsable != "[NULL]" && solicitud_proceso.edit_pro_responsable != 'null' ? solicitud_proceso.edit_pro_responsable : "$null",
                            proceso_categoria: solicitud_proceso.edit_pro_proceso_categoria != "[NULL]" && solicitud_proceso.edit_pro_responsable != 'null' ? solicitud_proceso.edit_pro_proceso_categoria : "$null",
                            alcance: solicitud_proceso.edit_pro_alcance ? solicitud_proceso.edit_pro_alcance : "$null",
                            objetivo: solicitud_proceso.edit_pro_objetivo ? solicitud_proceso.edit_pro_objetivo : "$null",
                            mapa_proceso: solicitud_proceso.edit_pro_mapa_proceso != "[NULL]" && solicitud_proceso.edit_pro_mapa_proceso != 'null'? solicitud_proceso.edit_pro_mapa_proceso : "$null",
                            proceso: solicitud_proceso.proceso != "[NULL]" && solicitud_proceso.proceso != 'null' ? solicitud_proceso.proceso : "$null",
                            recursos: solicitud_proceso.edit_pro_recursos ? solicitud_proceso.edit_pro_recursos : "$null",
                            nombre_proceso: solicitud_proceso.edit_pro_nombre ? solicitud_proceso.edit_pro_nombre : "$null",
                            tipo_accion: solicitud_proceso.tipo_accion != "[NULL]" && solicitud_proceso.tipo_accion != 'null' ? solicitud_proceso.tipo_accion : "$null",
                            compania: solicitud_proceso.session.compania_id,
                            institucion: solicitud_proceso.session.institucion_id ? solicitud_proceso.session.institucion_id : "$null",
                            solicitante: solicitud_proceso.session.usuario_id,
                            estatus: solicitud_proceso.estatus != "[NULL]" && solicitud_proceso.estatus != 'null' ? solicitud_proceso.estatus : "$null",
                            where: [
                                {
                                    field: "id",
                                    value: solicitud_proceso.id
                                }
                            ]
                        }, async function (result) {
                            SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                            Object.keys(solicitud_proceso.form.oldData).forEach(d => {
                                ["Edit_pro", "Estado", "Nombre", "Descripción"].forEach(e => {
                                    if (v.startsWith(d, e)){
                                        if (d == "nombre"){
                                            old_Data["Nombre de la solicitud"] = solicitud_proceso.form.oldData[d];
                                        }else if (d == "Descripción") {
                                            old_Data["Descripción de la solicitud"] = solicitud_proceso.form.oldData[d];
                                        }else{
                                            old_Data[d == "Estado" ? d : d.split("Edit_pro_")[1]] = solicitud_proceso.form.oldData[d];
                                        }
                                    }
                                });
                            });
                            Object.keys(auditVar).forEach(d => {
                                ["Edit_pro", "Estado", "Nombre", "Descripción"].forEach(e => {
                                    if (v.startsWith(d, e)){
                                        if (d == "Nombre"){
                                            updated_data["Nombre de la solicitud"] = auditVar[d];
                                        }else if (d == "Descripción") {
                                            updated_data["Descripción de la solicitud"] = auditVar[d];
                                        }else{
                                            updated_data[d == "Estado" ? d : d.split("Edit_pro_")[1]] = auditVar[d] != "" ? auditVar[d] : undefined;
                                        }

                                    }
                                });
                            });
                            await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_proceso.tableOrView ? solicitud_proceso.tableOrView : solicitud_proceso.modelName, updated_data, old_Data);
                            solicitud_proceso.refresh();
                            MODAL.close()
                        });
                    }
                } else {
                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    BASEAPI.updateall('solicitud_proceso', {
                        nombre: solicitud_proceso.nombre ? solicitud_proceso.nombre : "$null",
                        descripcion: solicitud_proceso.descripcion ? solicitud_proceso.descripcion : "$null",
                        responsable: solicitud_proceso.edit_pro_responsable != "[NULL]" && solicitud_proceso.edit_pro_responsable != 'null' ? solicitud_proceso.edit_pro_responsable : "$null",
                        proceso_categoria: solicitud_proceso.edit_pro_proceso_categoria != "[NULL]" && solicitud_proceso.edit_pro_proceso_categoria != 'null' ? solicitud_proceso.edit_pro_proceso_categoria : "$null",
                        alcance: solicitud_proceso.edit_pro_alcance ? solicitud_proceso.edit_pro_alcance : "$null",
                        objetivo: solicitud_proceso.edit_pro_objetivo ? solicitud_proceso.edit_pro_objetivo : "$null",
                        recursos: solicitud_proceso.edit_pro_recursos ? solicitud_proceso.edit_pro_recursos : "$null",
                        mapa_proceso: solicitud_proceso.edit_pro_mapa_proceso != "[NULL]" && solicitud_proceso.edit_pro_mapa_proceso != 'null'? solicitud_proceso.edit_pro_mapa_proceso : "$null",
                        proceso: solicitud_proceso.proceso != "[NULL]" && solicitud_proceso.proceso != 'null' ? solicitud_proceso.proceso : "$null",
                        nombre_proceso: solicitud_proceso.edit_pro_nombre ? solicitud_proceso.edit_pro_nombre : "$null",
                        tipo_accion: solicitud_proceso.tipo_accion != "[NULL]" && solicitud_proceso.tipo_accion != 'null' ? solicitud_proceso.tipo_accion : "$null",
                        compania: solicitud_proceso.session.compania_id,
                        institucion: solicitud_proceso.session.institucion_id ? solicitud_proceso.session.institucion_id : "$null",
                        solicitante: solicitud_proceso.session.usuario_id,
                        estatus: solicitud_proceso.estatus != "[NULL]" && solicitud_proceso.estatus != 'null' ? solicitud_proceso.estatus : "$null",
                        where: [
                            {
                                field: "id",
                                value: solicitud_proceso.id
                            }
                        ]
                    }, async function (result) {
                        SWEETALERT.stop({message: MESSAGE.ic('mono.procesing')});
                        Object.keys(solicitud_proceso.form.oldData).forEach(d => {
                            ["Edit_pro", "Estado", "Nombre", "Descripción"].forEach(e => {
                                if (v.startsWith(d, e)){
                                    if (d == "nombre"){
                                        old_Data["Nombre de la solicitud"] = solicitud_proceso.form.oldData[d];
                                    }else if (d == "Descripción") {
                                        old_Data["Descripción de la solicitud"] = solicitud_proceso.form.oldData[d];
                                    }else{
                                        old_Data[d == "Estado" ? d : d.split("Edit_pro_")[1]] = solicitud_proceso.form.oldData[d];
                                    }
                                }
                            });
                        });
                        Object.keys(auditVar).forEach(d => {
                            ["Edit_pro", "Estado", "Nombre", "Descripción"].forEach(e => {
                                if (v.startsWith(d, e)){
                                    if (d == "Nombre"){
                                        updated_data["Nombre de la solicitud"] = auditVar[d];
                                    }else if (d == "Descripción") {
                                        updated_data["Descripción de la solicitud"] = auditVar[d];
                                    }else{
                                        updated_data[d == "Estado" ? d : d.split("Edit_pro_")[1]] = auditVar[d] != "" ? auditVar[d] : undefined;
                                    }

                                }
                            });
                        });
                        await AUDIT.LOG(AUDIT.ACTIONS.update, solicitud_proceso.tableOrView ? solicitud_proceso.tableOrView : solicitud_proceso.modelName, updated_data, old_Data);
                        solicitud_proceso.refresh();
                        MODAL.close()
                    });
                }
            }
        }, ['nombre']);
    }
    solicitud_proceso.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        if (!solicitud_proceso.loaded){
            solicitud_proceso.refresh();
            solicitud_proceso.loaded = true;
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
    solicitud_proceso.triggers.table.after.insert = function (data) {
        //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        let titulo_push="";
        let cuerpo_push="";
        let titulo= "";
        let cuerpo="";
        if (data.inserting.estatus == 2 && data.inserting.tipo_accion == 1) {
            titulo_push = `La solicitud de creación de proceso "${data.inserting.nombre}" ha sido Elaborada.`;
            cuerpo_push = `La solicitud de creación del proceso "${data.inserting.nombre_proceso}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
            titulo = `La solicitud de creación del proceso  "${data.inserting.nombre}" ha sido Elaborada.`
            cuerpo = `La solicitud de creación del proceso "${data.inserting.nombre_proceso}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.
        
Gracias.`;
            function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_proceso.session.compania_id, solicitud_proceso.session.institucion_id, data.inserting.solicitante, [4,18]);
        }
        return true;
    };
    solicitud_proceso.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        Object.keys(data.inserting).forEach(d => {
            ["delete_pro", "mod_pro", "edit_pro"].forEach(e => {
                if (v.startsWith(d, e)) delete data.inserting[d]
            });
        });
        delete data.inserting.proceso
        resolve(true);
    });
    //
    solicitud_proceso.triggers.table.after.update = function (data) {
        let titulo_push="";
        let cuerpo_push="";
        let titulo= "";
        let cuerpo="";
        let cuerpo2 = "";
        if (data.updating.estatus == 3 && data.updating.tipo_accion == 1) {
            titulo_push = `La solicitud de creación de proceso "${data.updating.nombre}" ha sido Autorizada.`;
            cuerpo_push = `La solicitud de creación del proceso "${data.updating.nombre_proceso}" ha sido Autorizada por ${ solicitud_proceso.session.fullName() }`;
            titulo = `La solicitud de creación de proceso "${data.updating.nombre}" ha sido Autorizada.`
            cuerpo = `La solicitud de creación del proceso "${data.updating.nombre_proceso}" ha sido Autorizada por ${ solicitud_proceso.session.fullName() }

Un supervisor de calidad debe proceder a Revisar y Autorizar la creación de dicho Proceso. Los supervisores de calidad son :`;
            cuerpo2 = "Gracias.";
            function_send_email_custom_group_res_list(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_proceso.session.compania_id, solicitud_proceso.session.institucion_id, data.updating.solicitante, 18, 4, 18, cuerpo2);
            BASEAPI.insertID('procesos', {
                mapa_proceso: solicitud_proceso.mapa_proceso || "$null",
                procesos_categoria: solicitud_proceso.proceso_categoria || "$null",
                responsable: solicitud_proceso.responsable || "$null",
                nombre: solicitud_proceso.nombre_proceso || "$null",
                objetivo: solicitud_proceso.objetivo || "$null",
                alcance: solicitud_proceso.alcance || "$null",
                recursos: solicitud_proceso.recursos || "$null",
                descripcion: solicitud_proceso.descripcion_proceso || "$null",
                solicitud_proceso: solicitud_proceso.id || "$null",
                estatus: 1,
                active: 1,
            }, '', '', function (result) {
                // BASEAPI.updateall('solicitud_documento', {
                //     documento_creo: result.data.data[0].id,
                //     where: [
                //         {
                //             value: solicitud_documento.id
                //         }
                //     ]
                // }, function (resultado) {
                //     console.log(resultado, "se actualizo la solicitud de crear");
                // });
            });
            setTimeout(function () {
                SWEETALERT.show({
                    message: "Se ha enviado al departamento correspondiente la solicitud de creación del Proceso"
                });
            }, 500)
        }else if (data.updating.estatus == 2 && data.updating.tipo_accion == 1) {
            titulo_push = `La solicitud de creación de proceso "${data.updating.nombre}" ha sido Elaborada.`;
            cuerpo_push = `La solicitud de creación del proceso "${data.updating.nombre_proceso}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.`;
            titulo = `La solicitud de creación del proceso  "${data.updating.nombre}" ha sido Elaborada.`
            cuerpo = `La solicitud de creación del proceso "${data.updating.nombre_proceso}" ha sido Elaborada. Favor contactar a su supervisor para que proceda a hacer la autorización de la misma.
        
Gracias.`;
            function_send_email_custom_group_res(titulo_push, cuerpo_push, titulo, cuerpo, solicitud_proceso.session.compania_id, solicitud_proceso.session.institucion_id, data.updating.solicitante, [4,18]);
        }
        //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    };
    solicitud_proceso.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        Object.keys(data.updating).forEach(d => {
            ["delete_pro", "mod_pro", "edit_pro"].forEach(e => {
                if (v.startsWith(d, e)) delete data.updating[d]
            });
        });
        delete data.updating.proceso
        data.updating.fecha_solicitud = moment().format('YYYY-MM-DD HH:mm:ss');
        resolve(true);
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