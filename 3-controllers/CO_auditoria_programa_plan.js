app.controller("auditoria_programa_plan", function ($scope, $http, $compile) {
    auditoria_programa_plan = this;
    auditoria_programa_plan.session = new SESSION().current();
    auditoria_programa_plan.singular = "singular";
    auditoria_programa_plan.fixFilters = [];
    auditoria_programa_plan.plural = "plural";
    auditoria_programa_plan.headertitle = "Planes de Auditoría";
    auditoria_programa_plan.orderbyx = "$ nombre_proceso,responsable_proceso,codigo,punto_verificacion,responsable_ducumento";
    auditoria_programa_plan.group_caracteristica = auditoria_programa_plan.session.groups[0] ? auditoria_programa_plan.session.groups[0].caracteristica : "";
    auditoria_programa_plan.supervisor_de_calidad = "SC";
    auditoria_programa_plan.analista_de_calidad = "AC";
    auditoria_programa_plan.director_planificacion = "DG";
    auditoria_programa_plan.auditor = "AU";
    auditoria_programa_plan.from_new = false;
    auditoria_programa_plan.from_edit = false;
    auditoria_programa_plan.my_true_estatus = 1;
    auditoria_programa_plan.paso = false;
    auditoria_programa_plan.send_noti = false;
    auditoria_programa_plan.fileSI = [];
    auditoria_programa_plan.lista_procesos_creados = [];
    auditoria_programa_plan.lista_documentos_creados = [];
    auditoria_programa_plan.canStatus = "";
    auditoria_programa_plan.documentos_list = {};
    auditoria_programa_plan.estoyenelview = "";
    auditoria_programa_plan.current_year = moment().format('YYYY');
    auditoria_programa_plan.from_informe = false;
    if (MODAL.history.length > 0) {
        if (typeof dashboard_proceso != "undefined") {
            if (dashboard_proceso) {
                if (typeof dashboard_proceso !== 'not defined') {
                    if (!auditoria_programa_plan.paso) {
                        auditoria_programa_plan.fixFilters = [];
                        auditoria_programa_plan.headertitle = "Auditorías";
                        auditoria_programa_plan.fixFilters = [
                            {
                                "field": "estatus_nombre",
                                "value": dashboard_proceso.Mplanes
                            },
                            {
                                field: "auditoria_programa",
                                value: dashboard_proceso.programa_id
                            }
                        ];
                        if (dashboard_proceso.session.institucion) {
                            auditoria_programa_plan.fixFilters.push({
                                "field": "institucion",
                                "value": dashboard_proceso.session.institucion_id
                            });
                            auditoria_programa_plan.fixFilters.push({
                                "field": "compania",
                                "value": dashboard_proceso.session.compania_id
                            });
                        } else {
                            auditoria_programa_plan.fixFilters.push({
                                "field": "compania",
                                "value": dashboard_proceso.session.compania_id
                            });
                            auditoria_programa_plan.fixFilters.push({
                                "field": "institucion",
                                "operator": "",
                                "value": "$ is NULL"
                            });
                        }
                        auditoria_programa_plan.paso = true;
                    }
                }
            }
        }
        if (typeof vw_auditoria_programa != "undefined") {
            if (vw_auditoria_programa) {
                if (typeof vw_auditoria_programa !== 'not defined') {
                    if (!auditoria_programa_plan.paso) {
                        auditoria_programa_plan.fixFilters = [];
                        auditoria_programa_plan.headertitle = "Auditorías";
                        auditoria_programa_plan.fixFilters = [
                            {
                                "field": "estatus_nombre",
                                "value": vw_auditoria_programa.Mplanes
                            }
                        ];
                        if (vw_auditoria_programa.session.institucion) {
                            auditoria_programa_plan.fixFilters.push({
                                "field": "institucion",
                                "value": vw_auditoria_programa.session.institucion_id
                            });
                            auditoria_programa_plan.fixFilters.push({
                                "field": "compania",
                                "value": vw_auditoria_programa.session.compania_id
                            });
                        } else {
                            auditoria_programa_plan.fixFilters.push({
                                "field": "compania",
                                "value": vw_auditoria_programa.session.compania_id
                            });
                            auditoria_programa_plan.fixFilters.push({
                                "field": "institucion",
                                "operator": "",
                                "value": "$ is NULL"
                            });
                        }
                        auditoria_programa_plan.paso = true;
                    }
                }
            }
        }
        if (typeof vw_auditoria_dashboard != "undefined") {
            if (vw_auditoria_dashboard) {
                if (typeof vw_auditoria_dashboard !== 'not defined') {
                    if (!auditoria_programa_plan.paso) {
                        auditoria_programa_plan.fixFilters = [];
                        auditoria_programa_plan.headertitle = "Auditorías";
                        auditoria_programa_plan.fixFilters = [
                            {
                                "field": "estatus_nombre",
                                "value": vw_auditoria_dashboard.Mplanes
                            }
                        ];
                        if (vw_auditoria_dashboard.session.institucion) {
                            auditoria_programa_plan.fixFilters.push({
                                "field": "institucion",
                                "value": vw_auditoria_dashboard.session.institucion_id
                            });
                            auditoria_programa_plan.fixFilters.push({
                                "field": "compania",
                                "value": vw_auditoria_dashboard.session.compania_id
                            });
                        } else {
                            auditoria_programa_plan.fixFilters.push({
                                "field": "compania",
                                "value": vw_auditoria_dashboard.session.compania_id
                            });
                            auditoria_programa_plan.fixFilters.push({
                                "field": "institucion",
                                "operator": "",
                                "value": "$ is NULL"
                            });
                        }
                        auditoria_programa_plan.paso = true;
                    }
                }
            }
        }
    }
    auditoria_programa_plan.getMapaProceso = async function (callback) {
        var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value: auditoria_programa_plan.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": auditoria_programa_plan.session.institucion_id ? "=" : "is",
                    "value": auditoria_programa_plan.session.institucion_id ? auditoria_programa_plan.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (mapaData) {
            auditoria_programa_plan.mapa_id = mapaData.id;
        }
        if (callback)
            callback();
    }
    // auditoria_programa_plan.destroyForm = false;
    //auditoria_programa_plan.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_programa_plan", auditoria_programa_plan, $scope, $http, $compile);
    if (auditoria_programa_plan.group_caracteristica == auditoria_programa_plan.auditor) {
        auditoria_programa_plan.setPermission("add", false);
    }
    if (auditoria_programa_plan.group_caracteristica == auditoria_programa_plan.supervisor_de_calidad) {
        auditoria_programa_plan.setPermission('active', true);
    } else {
        auditoria_programa_plan.setPermission('active', false);
    }
    auditoria_programa_plan.dimesitodosparticiparon = false;
    auditoria_programa_plan.todosparticiparon = async () => {
        let participantes = auditoria_programa_plan.auditoria_plan_participantes;
        let comentarios = await BASEAPI.listp('auditoria_informe', {
            limit: 0,
            where: [
                {
                    field: "auditoria",
                    value: auditoria_programa_plan.id
                }
            ]
        });
        if (comentarios) {
            if (comentarios.data) {
                comentarios = comentarios.data;
                if (participantes) {
                    if (participantes.length) {
                        for (let participante of participantes) {
                            if (comentarios.filter(d => {
                                return d.creadopor == participante
                            }).length === 0)
                                return false;
                        }
                        auditoria_programa_plan.dimesitodosparticiparon = true;
                        auditoria_programa_plan.selectQueries['estatus'] = [
                            {
                                field: 'rol',
                                operator: '=',
                                value: auditoria_programa_plan.session.groups[0].id
                            },
                            {
                                field: 'entidad',
                                operator: '=',
                                value: "auditoria_programa_plan"
                            }
                        ];
                        auditoria_programa_plan.form.options.estatus.query.where = auditoria_programa_plan.selectQueries['estatus'];
                        auditoria_programa_plan.estatus = '8';
                        auditoria_programa_plan.form.loadDropDown('estatus');
                        auditoria_programa_plan.refreshAngular();
                        return true;
                    }
                }

            }
        }
        return false;
    };
    auditoria_programa_plan.formulary = function (data, mode, defaultData, view) {
        auditoria_programa_plan.mevengo = false;
        auditoria_programa_plan.procesos_list = {};
        auditoria_programa_plan.participantes_list = {};
        auditoria_programa_plan.documentos_asociados_list = {};
        auditoria_programa_plan.documentos_asociados_list_view = {};
        auditoria_programa_plan.real_participantes_list = {};
        auditoria_programa_plan.informes_auditoria = {};
        auditoria_programa_plan.comentarios_auditoria = {};
        auditoria_programa_plan.dont_show_me = true;
        auditoria_programa_plan.unavez = false;
        auditoria_programa_plan.part_responsable = undefined;
        if (auditoria_programa_plan.mode === "new")
            auditoria_programa_plan.id = undefined;

        if (auditoria_programa_plan !== undefined) {
            RUN_B("auditoria_programa_plan", auditoria_programa_plan, $scope, $http, $compile);
            auditoria_programa_plan.form.titles = {
                new: "Nuevo - Plan de Auditoría",
                edit: "Editar - Plan de Auditoría",
                view: "Ver ALL - Plan de Auditoría"
            };
            auditoria_programa_plan.form.modalWidth = ENUM.modal.width.full;
            auditoria_programa_plan.form.readonly = {
                auditoria_programa: auditoria_programa_plan.auditoria_programa ? auditoria_programa_plan.auditoria_programa : "$null",
                active: 1,
                estatus_plan_accion: 1
            };
            auditoria_programa_plan.createForm(data, mode, defaultData, view);
            auditoria_programa_plan.estoyenelview = view || "";

            auditoria_programa_plan.show_drp_down = false;
            auditoria_programa_plan.selectQueries['estatus'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: auditoria_programa_plan.session.groups[0].id
                },
                {
                    field: 'entidad',
                    operator: '=',
                    value: "auditoria_programa_plan"
                }
            ];
            $scope.$watch("auditoria_programa_plan.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_programa_plan, 'nombre', rules);
            });
            $scope.$watch("auditoria_programa_plan.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_programa_plan, 'descripcion', rules);
            });
            //ms_product.selectQueries['auditoria_programa'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("auditoria_programa_plan.auditoria_programa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'auditoria_programa', rules);
            });
            $scope.$watch("auditoria_programa_plan.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'tempid', rules);
            });
            $scope.$watch("auditoria_programa_plan.fecha_inicio", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'fecha_inicio', rules);
            });
            $scope.$watch("auditoria_programa_plan.tipo_auditoria", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                auditoria_programa_plan.check_tipo_audit();
                VALIDATION.validate(auditoria_programa_plan, 'tipo_auditoria', rules);
            });
            $scope.$watch("auditoria_programa_plan.fecha_fin", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'fecha_fin', rules);
            });
            $scope.$watch("auditoria_programa_plan.range_date", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'fecha_inicio', rules);
                VALIDATION.validate(auditoria_programa_plan, 'range_date', rules);
            });
            $scope.$watch("auditoria_programa_plan.objetivo", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'objetivo', rules);
            });
            $scope.$watch("auditoria_programa_plan.alcance", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'alcance', rules);
            });
            $scope.$watch("auditoria_programa_plan.prioridad", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'prioridad', rules);
            });
            $scope.$watch("auditoria_programa_plan.auditoria_relacionada", async function (value) {
                var rules = [];
                //rules here
                if (auditoria_programa_plan.estoyenelview.indexOf('work') !== -1)
                    return;
                rules.push(VALIDATION.general.required(value));
                if (!auditoria_programa_plan.unavez) {
                    if (auditoria_programa_plan.form.mode === 'edit') {
                        auditoria_programa_plan.relacionada_noConformidades = await BASEAPI.firstp('auditoria_programa_plan', {
                            where: [
                                {
                                    field: "id",
                                    value: auditoria_programa_plan.id
                                },
                                {
                                    field: "auditoria_relacionada",
                                    value: value
                                }
                            ]
                        });
                        if (!auditoria_programa_plan.relacionada_noConformidades) {
                            if (auditoria_programa_plan.id) {
                                if (value !== '[NULL]') {
                                    let queryTopas = `insert into  auditoria_programa_plan_proceso(programa_plan,proceso,revisado)
select ${auditoria_programa_plan.id},proceso,revisado from auditoria_programa_plan_proceso where programa_plan=${value};

insert into  auditoria_programa_plan_documentos_asociados(programa_plan,documento_asociado,observaciones,estatus,trabajado,original)
select ${auditoria_programa_plan.id},documento_asociado,observaciones,null,1,id from vw_auditoria_programa_plan_documentos_asociados where programa_plan=${value} and total_listas_malas > 0;

insert into  auditoria_programa_plan_documentos_asociados_listaverificacion(programa_plan_documentos_asociados,descripcion,cumple,observaciones,acciones_correctivas,tipo_inconformidad,auditoria_relacionada)
select (select t.id from auditoria_programa_plan_documentos_asociados t where t.original=programa_plan_documentos_asociados limit 1),descripcion,null,null,null,null,${value} from auditoria_programa_plan_documentos_asociados_listaverificacion where programa_plan_documentos_asociados in 
(select t.id from auditoria_programa_plan_documentos_asociados t where t.programa_plan=${value}) and tipo_inconformidad is not null and auditoria_relacionada is null;

select * from vw_auditoria_programa_plan where id=${auditoria_programa_plan.id};`;

                                    SERVICE.base_db.directQuery({query: queryTopas}, async (result) => {
                                        auditoria_programa_plan.unavez = true;
                                        if (result.data.recordset) {
                                            console.log(result)
                                            auditoria_programa_plan.auditoria_plan_proceso = eval(result.data.recordset[3][0].lista_procesos);
                                            auditoria_programa_plan.auditoria_plan_documentos_asociados = eval(result.data.recordset[3][0].lista_documentos);
                                            auditoria_programa_plan.form.options.auditoria_relacionada.disabled = true;
                                            auditoria_programa_plan.form.options.tipo_auditoria.disabled = true;
                                            auditoria_programa_plan.elaborado_por = auditoria_programa_plan.session.usuario_id;
                                            auditoria_programa_plan.elaborado_en = moment().format("YYYY-MM-DD HH:mm");
                                            auditoria_programa_plan.form.loadDropDown('tipo_auditoria')
                                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso')
                                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados')
                                            auditoria_programa_plan.form.mode = 'edit';
                                        }
                                    });
                                }
                            }
                        }
                    } else {
                        if (value !== '[NULL]') {
                            let queryTopas = `insert into  auditoria_programa_plan(nombre,descripcion,auditoria_programa,fecha_inicio,fecha_fin,objetivo,alcance,estatus,elaborado_por,autorizado_por,elaborado_en,autorizado_en,tipo_auditoria,active,recomendaciones,comentarios,comentarios_auditor,prioridad,criterio,estatus_plan_accion,comentolider,comentoparticipante,auditoria_relacionada)

select null,null,auditoria_programa,null,null,null,null,1,null,null,null,null,null,1,null,null,null,null,null,null,0,0,${value} from auditoria_programa_plan where id=${value};

set @auditorianext = (select id from auditoria_programa_plan where auditoria_relacionada=@auditoria_relacionada order by id desc limit 1);


insert into  auditoria_programa_plan_proceso(programa_plan,proceso,revisado)
select @auditorianext,proceso,revisado from auditoria_programa_plan_proceso where programa_plan=${value};

insert into  auditoria_programa_plan_documentos_asociados(programa_plan,documento_asociado,observaciones,estatus,trabajado,original)
select @auditorianext,documento_asociado,observaciones,null,1,id from vw_auditoria_programa_plan_documentos_asociados where programa_plan=${value} and total_listas_malas > 0;

insert into auditoria_programa_plan_documentos_asociados_listaverificacion(programa_plan_documentos_asociados,descripcion,cumple,observaciones,acciones_correctivas,tipo_inconformidad,auditoria_relacionada)
select (select t.id from auditoria_programa_plan_documentos_asociados t where t.original=programa_plan_documentos_asociados limit 1),descripcion,null,null,null,null,${value} from auditoria_programa_plan_documentos_asociados_listaverificacion where programa_plan_documentos_asociados in (select t.id from auditoria_programa_plan_documentos_asociados t where t.programa_plan=${value}) and tipo_inconformidad is not null and auditoria_relacionada is null;

select * from vw_auditoria_programa_plan where id=@auditorianext;`;


                            SERVICE.base_db.directQuery({query: queryTopas}, async (result) => {
                                auditoria_programa_plan.unavez = true;
                                if (result.data.recordset) {
                                    auditoria_programa_plan.from_new = true;
                                    auditoria_programa_plan.id = result.data.recordset[5][0].id;
                                    auditoria_programa_plan.auditoria_plan_proceso = eval(result.data.recordset[5][0].lista_procesos);
                                    auditoria_programa_plan.auditoria_plan_documentos_asociados = eval(result.data.recordset[5][0].lista_documentos);
                                    auditoria_programa_plan.form.options.auditoria_relacionada.disabled = true;
                                    auditoria_programa_plan.form.options.tipo_auditoria.disabled = true;
                                    auditoria_programa_plan.elaborado_por = auditoria_programa_plan.session.usuario_id;
                                    auditoria_programa_plan.elaborado_en = moment().format("YYYY-MM-DD HH:mm");
                                    auditoria_programa_plan.form.loadDropDown('tipo_auditoria')
                                    auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso')
                                    auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados')
                                    auditoria_programa_plan.form.mode = 'edit';
                                }
                            });
                        }
                    }
                }
                VALIDATION.validate(auditoria_programa_plan, 'auditoria_relacionada', rules);
            });
            $scope.$watch("auditoria_programa_plan.criterio", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'criterio', rules);
            });
            if (auditoria_programa_plan.estatus == 6) {
                $scope.$watch("auditoria_programa_plan.recomendaciones", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(auditoria_programa_plan, 'recomendaciones', rules);
                });
                $scope.$watch("auditoria_programa_plan.comentarios", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(auditoria_programa_plan, 'comentarios', rules);
                });
            }
            $scope.$watch("auditoria_programa_plan.nuevo_proceso", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'nuevo_proceso', rules);
            });
            $scope.$watch("auditoria_programa_plan.nuevo_documento", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'nuevo_documento', rules);
            });
            $scope.$watch("auditoria_programa_plan.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                if (auditoria_programa_plan.form.selected('estatus') != null) {
                    auditoria_programa_plan.canStatus = eval(auditoria_programa_plan.form.selected('estatus').estatus_permitidos);
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'estatus', rules);
            });
            $scope.$watch("auditoria_programa_plan.observaciones", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'observaciones', rules);
            });
            $scope.$watch("auditoria_programa_plan.auditoria_plan_departamento", async function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                if (auditoria_programa_plan.auditoria_plan_departamento) {
                    if (auditoria_programa_plan.auditoria_plan_departamento.length > 0) {
                    }
                }
                auditoria_programa_plan.form.loadDropDown('auditoria_plan_participantes');
                VALIDATION.validate(auditoria_programa_plan, 'auditoria_plan_departamento', rules);
            });
            $scope.$watch("auditoria_programa_plan.auditoria_plan_responsable", async function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                // if (auditoria_programa_plan.auditoria_plan_documentos_asociados) {
                //     if (auditoria_programa_plan.auditoria_plan_documentos_asociados.length > 0) {
                //         auditoria_programa_plan.documentos_asociados_list = await BASEAPI.listp('vw_documentos_asociados', {
                //             limit: 0,
                //             where: [
                //                 {
                //                     field: "id",
                //                     value: auditoria_programa_plan.auditoria_plan_documentos_asociados
                //                 }
                //             ]
                //         });
                //     }
                // }
                // auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados');
                await auditoria_programa_plan.getRol();
                if (auditoria_programa_plan.auditoria_plan_responsable) {
                    if (auditoria_programa_plan.auditoria_plan_responsable.length > 0) {
                        auditoria_programa_plan.participantes_list = await BASEAPI.listp('vw_usuarios', {
                            limit: 0,
                            where: [
                                {
                                    field: "id",
                                    value: auditoria_programa_plan.auditoria_plan_responsable
                                }
                            ]
                        });
                    } else {
                        // auditoria_programa_plan.auditoria_plan_responsable = [];
                        auditoria_programa_plan.participantes_list = {data: []};

                    }
                }
                auditoria_programa_plan.refreshAngular();
                VALIDATION.validate(auditoria_programa_plan, 'auditoria_plan_responsable', rules);
            });
            $scope.$watch("auditoria_programa_plan.auditoria_plan_participantes", async function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                // if (auditoria_programa_plan.auditoria_plan_documentos_asociados) {
                //     if (auditoria_programa_plan.auditoria_plan_documentos_asociados.length > 0) {
                //         auditoria_programa_plan.documentos_asociados_list = await BASEAPI.listp('vw_documentos_asociados', {
                //             limit: 0,
                //             where: [
                //                 {
                //                     field: "id",
                //                     value: auditoria_programa_plan.auditoria_plan_documentos_asociados
                //                 }
                //             ]
                //         });
                //     }
                // }
                // auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados');
                if (auditoria_programa_plan.auditoria_plan_participantes) {
                    if (auditoria_programa_plan.auditoria_plan_participantes.length > 0) {
                        auditoria_programa_plan.real_participantes_list = await BASEAPI.listp('vw_cargo', {
                            limit: 0,
                            where: [
                                {
                                    field: "id",
                                    value: auditoria_programa_plan.auditoria_plan_participantes
                                }
                            ]
                        });
                    } else {
                        // auditoria_programa_plan.auditoria_plan_responsable = [];
                        auditoria_programa_plan.real_participantes_list = {data: []};

                    }
                }
                auditoria_programa_plan.refreshAngular();
                VALIDATION.validate(auditoria_programa_plan, 'auditoria_plan_participantes', rules);
            });
            $scope.$watch("auditoria_programa_plan.documento_responsable", async function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                // if (auditoria_programa_plan.auditoria_plan_documentos_asociados) {
                //     if (auditoria_programa_plan.auditoria_plan_documentos_asociados.length > 0) {
                //         auditoria_programa_plan.documentos_asociados_list = await BASEAPI.listp('vw_documentos_asociados', {
                //             limit: 0,
                //             where: [
                //                 {
                //                     field: "id",
                //                     value: auditoria_programa_plan.auditoria_plan_documentos_asociados
                //                 }
                //             ]
                //         });
                //     }
                // }
                // auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados');
                VALIDATION.validate(auditoria_programa_plan, 'documento_responsable', rules);
            });
            $scope.$watch("auditoria_programa_plan.auditoria_plan_proceso", async function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                await auditoria_programa_plan.getProcesoUsuario();
                if (auditoria_programa_plan.auditoria_plan_proceso) {
                    if (auditoria_programa_plan.auditoria_plan_proceso.length > 0) {
                        auditoria_programa_plan.procesos_list = await BASEAPI.listp('vw_procesos', {
                            limit: 0,
                            where: [
                                {
                                    field: "id",
                                    value: auditoria_programa_plan.auditoria_plan_proceso
                                }
                            ],
                        });
                        auditoria_programa_plan.selectQueries["auditoria_plan_documentos_asociados"] = [
                            {
                                field: "proceso",
                                value: auditoria_programa_plan.auditoria_plan_proceso
                            }
                        ];
                    } else {
                        // auditoria_programa_plan.auditoria_plan_responsable = [];.
                        auditoria_programa_plan.procesos_list = {data: []};
                        auditoria_programa_plan.documentos_asociados_list = {data: []};
                        auditoria_programa_plan.documentos_asociados_list_view = {data: []};

                    }
                }
                auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados');
                VALIDATION.validate(auditoria_programa_plan, 'auditoria_plan_proceso', rules);
            });
            $scope.$watch("auditoria_programa_plan.auditoria_plan_documentos_asociados", async function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));

                if (auditoria_programa_plan.auditoria_plan_documentos_asociados) {
                    if (auditoria_programa_plan.auditoria_plan_documentos_asociados.length > 0) {
                        auditoria_programa_plan.documentos_asociados_list = await BASEAPI.listp('vw_documentos_asociados_drp', {
                            limit: 0,
                            orderby: "$ nombre_proceso,responsable_proceso,codigo",
                            order: "asc",
                            where: [
                                {
                                    field: "id",
                                    value: auditoria_programa_plan.auditoria_plan_documentos_asociados
                                }
                            ]
                        });
                        auditoria_programa_plan.documentos_asociados_list_view = await BASEAPI.listp('vw_documentos_asociados_pv', {
                            limit: 0,
                            orderby: auditoria_programa_plan.orderbyx,
                            order: "asc",
                            where: [
                                {
                                    field: "id",
                                    value: auditoria_programa_plan.auditoria_plan_documentos_asociados
                                },
                                {
                                    field: "programa_plan",
                                    value: auditoria_programa_plan.id
                                },
                            ]
                        });
                        if (auditoria_programa_plan.id) {
                            var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                limit: 0, where: [
                                    {
                                        field: "programa_plan",
                                        value: auditoria_programa_plan.id
                                    },
                                    {
                                        field: "documento_asociado",
                                        operator: "is not",
                                        value: "$null"
                                    }
                                ]
                            });
                            auditoria_programa_plan.documentos_list = documentos_list.data;
                        } else {
                            auditoria_programa_plan.documentos_list = [];
                        }
                    } else {
                        // auditoria_programa_plan.auditoria_plan_responsable = [];
                        auditoria_programa_plan.documentos_asociados_list = {data: []};
                        auditoria_programa_plan.documentos_asociados_list_view = {data: []};
                        if (auditoria_programa_plan.id) {
                            var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                limit: 0, where: [
                                    {
                                        field: "programa_plan",
                                        value: auditoria_programa_plan.id
                                    },
                                    {
                                        field: "documento_asociado",
                                        operator: "is not",
                                        value: "$null"
                                    }
                                ]
                            });
                            auditoria_programa_plan.documentos_list = documentos_list.data;
                        } else {
                            auditoria_programa_plan.documentos_list = [];
                        }
                    }
                }
                auditoria_programa_plan.refreshAngular();
                VALIDATION.validate(auditoria_programa_plan, 'auditoria_plan_documentos_asociados', rules);
            });
            $scope.$watch("auditoria_programa_plan.elaborado_en", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'elaborado_en', rules);
            });
            $scope.$watch("auditoria_programa_plan.autorizado_en", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan, 'autorizado_en', rules);
            });
            auditoria_programa_plan.triggers.table.after.control = async function (data) {
                if (mode === 'new' && data === 'estatus_nombre') {
                    auditoria_programa_plan.estatus = '1';
                    auditoria_programa_plan.estatus_nombre = "Pre Planificación";
                    auditoria_programa_plan.refreshAngular();
                }
                if (data === 'auditoria_plan_departamento') {
                    if (auditoria_programa_plan.auditoria_plan_departamento) {
                        if (auditoria_programa_plan.auditoria_plan_departamento.length > 0) {
                            auditoria_programa_plan.departamento_list = await BASEAPI.listp('departamento', {
                                limit: 0,
                                where: [
                                    {
                                        field: "id",
                                        value: auditoria_programa_plan.auditoria_plan_departamento
                                    }
                                ]
                            });
                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_participantes');
                        } else {
                            auditoria_programa_plan.auditoria_plan_participantes = [];
                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_participantes');
                        }
                    }

                }
                if (data === 'auditoria_plan_responsable') {
                    // debugger
                    if (auditoria_programa_plan.auditoria_plan_responsable) {
                        if (auditoria_programa_plan.auditoria_plan_responsable.length > 0) {
                            auditoria_programa_plan.participantes_list = await BASEAPI.listp('vw_usuarios', {
                                limit: 0,
                                where: [
                                    {
                                        field: "id",
                                        value: auditoria_programa_plan.auditoria_plan_responsable
                                    }
                                ]
                            });
                            await auditoria_programa_plan.getRol();
                            if (auditoria_programa_plan.id) {
                                auditoria_programa_plan.part_responsable = await BASEAPI.firstp('auditoria_programa_plan_equipotrabajo', {
                                    limit: 0,
                                    where: [
                                        {
                                            field: "programa_plan",
                                            value: auditoria_programa_plan.id
                                        },
                                        {
                                            field: "usuario",
                                            value: auditoria_programa_plan.auditoria_plan_responsable
                                        },
                                        {
                                            field: "esresponsable",
                                            value: 1
                                        }
                                    ]
                                });
                                let soylidi = auditoria_programa_plan.get_rolRaw(auditoria_programa_plan.session.id);
                                auditoria_programa_plan.soylider = false;
                                if (soylidi.lider) {
                                    auditoria_programa_plan.soylider = true;
                                    auditoria_programa_plan.soyparticipe = true;
                                }
                                auditoria_programa_plan.mevengo = true;
                                if (auditoria_programa_plan.part_responsable && !auditoria_programa_plan.hazlo_una_vez) {
                                    BASEAPI.deleteall('auditoria_programa_plan_equipotrabajo', [
                                        {
                                            field: "programa_plan",
                                            value: auditoria_programa_plan.part_responsable.programa_plan
                                        },
                                        {
                                            field: "usuario",
                                            value: auditoria_programa_plan.part_responsable.usuario
                                        },
                                        {
                                            field: "esresponsable",
                                            operator: "is",
                                            value: "$null"
                                        }
                                    ], function (result) {
                                        auditoria_programa_plan.hazlo_una_vez = true;
                                    });

                                }
                            }
                        } else {
                            // auditoria_programa_plan.auditoria_plan_responsable = [];
                            auditoria_programa_plan.participantes_list = {data: []};

                        }
                        auditoria_programa_plan.refreshAngular()
                    }

                }
                if (data === 'auditoria_plan_participantes') {
                    // debugger
                    if (auditoria_programa_plan.auditoria_plan_participantes) {
                        if (auditoria_programa_plan.auditoria_plan_participantes.length > 0) {
                            auditoria_programa_plan.real_participantes_list = await BASEAPI.listp('vw_cargo', {
                                limit: 0,
                                where: [
                                    {
                                        field: "id",
                                        value: auditoria_programa_plan.auditoria_plan_participantes
                                    }
                                ]
                            });
                        } else {
                            // auditoria_programa_plan.auditoria_plan_responsable = [];
                            auditoria_programa_plan.real_participantes_list = {data: []};

                        }
                        auditoria_programa_plan.refreshAngular()
                    }

                }

                if (data === 'auditoria_plan_proceso') {
                    if (auditoria_programa_plan.auditoria_plan_proceso) {
                        if (auditoria_programa_plan.auditoria_plan_proceso.length > 0) {
                            auditoria_programa_plan.procesos_list = await BASEAPI.listp('vw_procesos', {
                                limit: 0,
                                where: [
                                    {
                                        field: "id",
                                        value: auditoria_programa_plan.auditoria_plan_proceso
                                    }
                                ]
                            });
                            await auditoria_programa_plan.getProcesoUsuario();
                            if (auditoria_programa_plan.id) {
                                auditoria_programa_plan.proc_revisado = await BASEAPI.firstp('auditoria_programa_plan_proceso', {
                                    limit: 0,
                                    where: [
                                        {
                                            field: "programa_plan",
                                            value: auditoria_programa_plan.id
                                        },
                                        {
                                            field: "proceso",
                                            value: auditoria_programa_plan.auditoria_plan_proceso
                                        },
                                        {
                                            field: "revisado",
                                            value: 1
                                        }
                                    ]
                                });
                            }
                            auditoria_programa_plan.selectQueries["auditoria_plan_documentos_asociados"] = [
                                {
                                    field: "proceso",
                                    value: auditoria_programa_plan.auditoria_plan_proceso
                                }
                            ];
                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados');
                        } else {
                            auditoria_programa_plan.procesos_list = {data: []};
                            auditoria_programa_plan.auditoria_plan_documentos_asociados = [];
                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados');
                        }
                        auditoria_programa_plan.refreshAngular()
                    }
                }
                if (data === 'auditoria_plan_documentos_asociados') {
                    if (auditoria_programa_plan.auditoria_plan_documentos_asociados) {
                        if (auditoria_programa_plan.auditoria_plan_documentos_asociados.length > 0) {
                            auditoria_programa_plan.documentos_asociados_list = await BASEAPI.listp('vw_documentos_asociados_drp', {
                                limit: 0,
                                orderby: "$ nombre_proceso,responsable_proceso,codigo",
                                order: "asc",
                                where: [
                                    {
                                        field: "id",
                                        value: auditoria_programa_plan.auditoria_plan_documentos_asociados
                                    }
                                ]
                            });
                            auditoria_programa_plan.documentos_asociados_list_view = await BASEAPI.listp('vw_documentos_asociados_pv', {
                                limit: 0,
                                orderby: auditoria_programa_plan.orderbyx,
                                order: "asc",
                                where: [
                                    {
                                        field: "id",
                                        value: auditoria_programa_plan.auditoria_plan_documentos_asociados
                                    },
                                    {
                                        field: "programa_plan",
                                        value: auditoria_programa_plan.id
                                    }
                                ]
                            });
                        } else {
                            auditoria_programa_plan.documentos_asociados_list = {data: []};
                            auditoria_programa_plan.documentos_asociados_list_view = {data: []};
                        }
                        auditoria_programa_plan.refreshAngular()
                    }
                }
                if (data === 'documento_responsable') {
                    // debugger
                    if (auditoria_programa_plan.auditoria_plan_responsable) {
                        if (auditoria_programa_plan.auditoria_plan_responsable.length > 0) {
                            auditoria_programa_plan.selectQueries["documento_responsable"] = [
                                {
                                    field: "id",
                                    value: auditoria_programa_plan.auditoria_plan_responsable
                                }
                            ];
                        }
                        auditoria_programa_plan.refreshAngular()
                    }

                }
                if (data == 'range_date') {
                    var elano = auditoria_programa.poa ? auditoria_programa.poa : auditoria_programa_plan.current_year;
                    var rango_minimo = moment(("01-02-" + elano)).add(-1, 'day').format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + (parseInt(elano) + 1))).add(-1, 'day').format("YYYY-MM-DD");

                    auditoria_programa_plan.range_date_min(rango_minimo);
                    auditoria_programa_plan.range_date_max(rango_maximo);
                    auditoria_programa_plan.refreshAngular();
                }
                if (data === 'tipo_auditoria') {
                    auditoria_programa_plan.check_tipo_audit();
                }

                if (data === 'comentarios_auditor') {
                    if (auditoria_programa_plan.estoyenelview === "work_plan_informe") {
                        BASEAPI.firstp('auditoria_informe', {
                            limit: 0,
                            where: [
                                {
                                    field: "auditoria",
                                    value: auditoria_programa_plan.id
                                },
                                {
                                    field: "creadopor",
                                    value: auditoria_programa_plan.session.usuario_id
                                }
                            ]
                        }).then(async (datesx) => {
                            auditoria_programa_plan.hiceuncomment = datesx;
                            if (auditoria_programa_plan.hiceuncomment) {
                                auditoria_programa_plan.comentarios_auditor = auditoria_programa_plan.hiceuncomment.recomendaciones;
                                $("[name='auditoria_programa_plan_comentarios_auditor']").summernote("code", auditoria_programa_plan.hiceuncomment.recomendaciones);
                                await auditoria_programa_plan.todosparticiparon();
                                auditoria_programa_plan.refreshAngular();
                            }
                        });

                    }
                }
            };
        }
        auditoria_programa_plan.triggers.table.after.open = async function (data) {
            auditoria_programa_plan.auditor_lider = await BASEAPI.firstp('vw_auditoria_programa_plan_equipotrabajo', {
                order: "asc",
                where: [
                    {
                        field: "programa_plan",
                        value: auditoria_programa_plan.id
                    },
                    {
                        field: "usuario",
                        value: auditoria_programa_plan.session.usuario_id
                    },
                    {
                        field: "lider",
                        value: 1
                    }
                ]
            });
            auditoria_programa_plan.auditores_responsables = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados_responsables', {
                order: "asc",
                where: [
                    {
                        field: "programa_plan",
                        value: auditoria_programa_plan.id
                    },
                    {
                        field: "usuario",
                        value: auditoria_programa_plan.session.usuario_id
                    }
                ]
            });
            auditoria_programa_plan.roles_auditores = await BASEAPI.listp('tipo_rol_auditores', {
                limit: 0,
                where: [
                    {
                        "field": "compania",
                        "value": auditoria_programa_plan.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator": auditoria_programa_plan.session.institucion_id ? "=" : "is",
                        "value": auditoria_programa_plan.session.institucion_id ? auditoria_programa_plan.session.institucion_id : "$null"
                    },
                ],
            });
            auditoria_programa_plan.roles_auditores = auditoria_programa_plan.roles_auditores.data;
            auditoria_programa_plan.usuarios_auditores = await BASEAPI.listp('vw_usuario', {
                limit: 0,
                where: [
                    {
                        "field": "profile",
                        "value": 19
                    },
                    {
                        "field": "compania",
                        "value": auditoria_programa_plan.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator": auditoria_programa_plan.session.institucion_id ? "=" : "is",
                        "value": auditoria_programa_plan.session.institucion_id ? auditoria_programa_plan.session.institucion_id : "$null"
                    },
                ],
            });
            auditoria_programa_plan.usuarios_auditores = auditoria_programa_plan.usuarios_auditores.data;
            auditoria_programa_plan.roles_lideres = auditoria_programa_plan.roles_auditores.filter(d => {
                return d.lider === 1;
            });
            auditoria_programa_plan.informes_auditoria = await BASEAPI.listp('vw_auditoria_informe', {
                limit: 0,
                where: [
                    {
                        "field": "auditoria",
                        "value": auditoria_programa_plan.id
                    }
                ],
            });
            auditoria_programa_plan.comentarios_auditoria = await BASEAPI.listp('vw_auditoria_comentarios', {
                limit: 0,
                where: [
                    {
                        "field": "auditoria",
                        "value": auditoria_programa_plan.id
                    }
                ],
            });
            auditoria_programa_plan.lista_procesos_creados = await BASEAPI.listp('vw_auditoria_programa_plan_procesos', {
                limit: 0,
                where: [
                    {
                        "field": "programa_plan",
                        "value": auditoria_programa_plan.id
                    }
                ],
            });
            auditoria_programa_plan.lista_procesos_creados = auditoria_programa_plan.lista_procesos_creados.data;
            auditoria_programa_plan.lista_documentos_creados = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                limit: 0,
                where: [
                    {
                        "field": "programa_plan",
                        "value": auditoria_programa_plan.id
                    }
                ],
            });
            auditoria_programa_plan.lista_documentos_creados = auditoria_programa_plan.lista_documentos_creados.data;
            await auditoria_programa_plan.getMapaProceso();
            auditoria_programa.getPrograma();
            if (auditoria_programa_plan.form.mode === 'new') {
                delete auditoria_programa_plan.id;
                auditoria_programa_plan.from_edit = false;
                auditoria_programa_plan.my_true_estatus = 1;
            }
            if (mode === 'edit') {
                auditoria_programa_plan.hazlo_una_vez = false;
                if (auditoria_programa_plan.estatus == 6) {
                    await BASEAPI.updateallp('auditoria_programa_plan', {
                        estatus: 7,
                        where: [{
                            field: "id",
                            value: auditoria_programa_plan.id
                        }]
                    }, '', '');
                    auditoria_programa_plan.my_true_estatus = "7";
                    auditoria_programa_plan.estatus = "7";
                }


                var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                    limit: 0, where: [
                        {
                            field: "programa_plan",
                            value: auditoria_programa_plan.id
                        },
                        {
                            field: "documento_asociado",
                            operator: "is not",
                            value: "$null"
                        }
                    ]
                })
                var my_procesos_list = await BASEAPI.listp('vw_auditoria_programa_plan_procesos', {
                    where: [
                        {
                            field: "programa_plan",
                            value: auditoria_programa_plan.id
                        }
                    ]
                })
                auditoria_programa_plan.my_procesos_list = my_procesos_list.data;
                auditoria_programa_plan.documentos_list = documentos_list.data;
                if (auditoria_programa_plan.from_new) {
                    BASEAPI.first('auditoria_programa_plan', {
                        order: "desc"
                    }, function (result) {
                        auditoria_programa_plan.id = result.id;
                        auditoria_programa_plan.refreshAngular();
                    })
                }
            }
            auditoria_programa_plan.form.fileds = auditoria_programa_plan.form.fileds.filter(d => {
                return ["estatus_view", "comentarios_auditor"].indexOf(d) === -1
            });
            auditoria_programa_plan.participantes_list = await BASEAPI.listp('vw_usuarios', {
                limit: 0,
                where: [
                    {
                        field: "id",
                        value: auditoria_programa_plan.auditoria_plan_responsable
                    }
                ]
            });
            if (auditoria_programa_plan.participantes_list.data) {
                if (auditoria_programa_plan.participantes_list.data.length > 0) {
                    auditoria_programa_plan.soyparticipe = auditoria_programa_plan.real_participantes_list.data.filter(d => {
                        return d.id == auditoria_programa_plan.session.cargo
                    }).length > 0;
                }
            }
            await auditoria_programa_plan.todosparticiparon();
            auditoria_programa_plan.refreshAngular();
            //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
        };
    };
    auditoria_programa_plan.triggers.table.after.load = function (records) {
        if (typeof auditoria_programa != "undefined")
            if (auditoria_programa)
                if (typeof auditoria_programa !== 'not defined')
                    if (!auditoria_programa.auditoriaData)
                        auditoria_programa.getPrograma();
    };

    auditoria_programa_plan.check_tipo_audit = function () {
        if (auditoria_programa_plan.form.selected('tipo_auditoria')) {
            if (auditoria_programa_plan.form.selected('tipo_auditoria').seguimiento === 1) {
                VALIDATION.validate(auditoria_programa_plan, "auditoria_relacionada", [{
                    valid: !DSON.oseaX0(auditoria_programa_plan.auditoria_relacionada),
                    message: MESSAGE.i('validations.Fieldisrequired'),
                    type: VALIDATION.types.error,
                    visible: false
                }]);
                auditoria_programa_plan.show_drp_down = true;
            } else {
                auditoria_programa_plan.auditoria_relacionada = "[NULL]";
                auditoria_programa_plan.form.loadDropDown('auditoria_relacionada');
                VALIDATION.validate(auditoria_programa_plan, "auditoria_relacionada", [{
                    valid: true,
                    message: MESSAGE.i('validations.Fieldisrequired'),
                    type: VALIDATION.types.error,
                    visible: false
                }]);
                auditoria_programa_plan.show_drp_down = false;
            }
        } else {
            auditoria_programa_plan.auditoria_relacionada = "[NULL]";
            auditoria_programa_plan.form.loadDropDown('auditoria_relacionada');
            VALIDATION.validate(auditoria_programa_plan, "auditoria_relacionada", [{
                valid: true,
                message: MESSAGE.i('validations.Fieldisrequired'),
                type: VALIDATION.types.error,
                visible: false
            }]);
            auditoria_programa_plan.show_drp_down = false;
        }
    }
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // auditoria_programa_plan.triggers.table.before.open = () => new Promise(async (resolve, reject) => {
    //     if (auditoria_programa_plan.estatus == 6) {
    //         await BASEAPI.updateallp('auditoria_programa_plan', {
    //             estatus: 7,
    //             where: [{
    //                 field: "id",
    //                 value: auditoria_programa_plan.id
    //             }]
    //         }, '', '');
    //         auditoria_programa_plan.estatus = "7";
    //         auditoria_programa_plan.refreshAngular();
    //         resolve(true);
    //     } else
    //         resolve(true);
    //
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
    // auditoria_programa_plan.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    auditoria_programa_plan.getSelectedText = function (type, key) {
        return $('#' + type + '_' + key + ' option:selected').text();
        auditoria_programa_plan.refreshAngular();
    }

    function ROLROW() {
        this.id = new Date().getTime();
        this.usuario = "";
        this.rol = "";
    }

    function RESROW() {
        this.id = new Date().getTime();
        this.proceso = "";
        this.usuario = "";
    }
    auditoria_programa_plan.add_proceso = function () {
        auditoria_programa_plan.modal.modalView("auditoria_programa_plan/add_proceso_form", {
            width: 'modal-lg',
            header: {
                title: 'Agregar nuevo proceso: ',
                icon: "file-plus2"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: true
            },
            event: {
                // show: {
                //     end: function (data) {
                //
                //     }
                // },
                hide: {
                    // begin: function (data) {
                    //     if($(`[name=${indicador_producto_poa.commentName}]`).val().length >= 85){
                    //         $(`.${indicador_producto_poa.commentName}`).show();
                    //     }else{
                    //         $(`.${indicador_producto_poa.commentName}`).hide();
                    //     }
                    // },
                    // end: async function (data) {
                    //
                    // }
                }
            },
        });
    }
    auditoria_programa_plan.add_proceso_save = function () {
        VALIDATION.save(auditoria_programa_plan, async function () {
            auditoria_programa_plan.auditoria_plan_proceso.push(auditoria_programa_plan.nuevo_proceso);
            BASEAPI.insert('auditoria_programa_plan_proceso', {
                programa_plan: auditoria_programa_plan.id,
                proceso: auditoria_programa_plan.nuevo_proceso,
                from_recoleccion: 1
            }, function(result){
                auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso')
                MODAL.close()
            });
        }, ['nuevo_proceso']);
    }
    auditoria_programa_plan.permitir_borrar = function (proceso) {
        if (auditoria_programa_plan.lista_procesos_creados && auditoria_programa_plan.lista_procesos_creados.length > 0) {
            var procesos_creados = [...new Set(auditoria_programa_plan.lista_procesos_creados)];
            return procesos_creados.some(d => d.proceso === proceso && d.from_recoleccion === 1);
        }
        return false;
    }
    auditoria_programa_plan.eliminar_proceso = async function (proceso) {
        const documentosAsociados = await getDocumentosAsociados(proceso.id);
        if (documentosAsociados.length > 0){
            SWEETALERT.confirm({
                message: "Este proceso tiene documentos asociados a la auditoría al borrarse se eliminarán todas sus relaciones ¿Está seguro que desea borrar el proceso?",
                confirm: async function () {
                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing') + "..."})
                    try {
                        await deleteAuditoriaProgramaPlanProceso(proceso.id);
                        if (documentosAsociados.length > 0) {
                            const documentosAsocIds = documentosAsociados.map(doc => doc.id);
                            await deleteDocumentosAsociadosListaverificacion(documentosAsocIds);
                            await deleteDocumentosAsociadosResponsables(documentosAsocIds);
                            await deleteDocumentosAsociados(documentosAsocIds);
                        }
                        await auditoria_programa_plan.getProcesoUsuario();
                        var index = auditoria_programa_plan.auditoria_plan_proceso.indexOf(proceso.id + '');
                        if (index > -1) { // only splice array when item is found
                            auditoria_programa_plan.auditoria_plan_proceso.splice(index, 1); // 2nd parameter means remove one item only
                        }
                        auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso');
                        auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados');
                        auditoria_programa_plan.refreshAngular();
                    } catch (error) {
                        console.error(error);
                        // Manejar el error de acuerdo a las necesidades del programa
                    }
                    SWEETALERT.stop();
                }
            })
        }else{
            SWEETALERT.confirm({
                message: "¿Está seguro que desea borrar el proceso?",
                confirm: async function () {
                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing') + "..."})
                    try {
                        await deleteAuditoriaProgramaPlanProceso(proceso.id);
                        if (documentosAsociados.length > 0) {
                            const documentosAsocIds = documentosAsociados.map(doc => doc.id);
                            await deleteDocumentosAsociadosListaverificacion(documentosAsocIds);
                            await deleteDocumentosAsociadosResponsables(documentosAsocIds);
                            await deleteDocumentosAsociados(documentosAsocIds);
                        }
                        await auditoria_programa_plan.getProcesoUsuario();
                        var index = auditoria_programa_plan.auditoria_plan_proceso.indexOf(proceso.id + '');
                        if (index > -1) { // only splice array when item is found
                            auditoria_programa_plan.auditoria_plan_proceso.splice(index, 1); // 2nd parameter means remove one item only
                        }
                        auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso');
                        auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados');
                        auditoria_programa_plan.refreshAngular();
                    } catch (error) {
                        console.error(error);
                        // Manejar el error de acuerdo a las necesidades del programa
                    }
                    SWEETALERT.stop();
                }
            })
        }

    }
    auditoria_programa_plan.add_documento = function () {
        auditoria_programa_plan.modal.modalView("auditoria_programa_plan/add_documento_form", {
            width: 'modal-lg',
            header: {
                title: 'Agregar nuevo documento: ',
                icon: "file-plus2"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: true
            },
            event: {
                // show: {
                //     end: function (data) {
                //
                //     }
                // },
                hide: {
                    // begin: function (data) {
                    //     if($(`[name=${indicador_producto_poa.commentName}]`).val().length >= 85){
                    //         $(`.${indicador_producto_poa.commentName}`).show();
                    //     }else{
                    //         $(`.${indicador_producto_poa.commentName}`).hide();
                    //     }
                    // },
                    // end: async function (data) {
                    //
                    // }
                }
            },
        });
    }
    auditoria_programa_plan.add_documento_save = function () {
        VALIDATION.save(auditoria_programa_plan, async function () {
            auditoria_programa_plan.auditoria_plan_documentos_asociados.push(auditoria_programa_plan.nuevo_documento);
            BASEAPI.insertID('auditoria_programa_plan_documentos_asociados', {
                programa_plan: auditoria_programa_plan.id,
                documento_asociado: auditoria_programa_plan.nuevo_documento,
                from_recoleccion: 1
            }, "","",function(result){
                if (result.data.data.length > 0) {
                    BASEAPI.insert('auditoria_programa_plan_documentos_asociados_responsables', {
                        usuario: auditoria_programa_plan.session.id,
                        programa_plan_documentos_asociados: result.data.data[0].id
                    }, function (result) {
                        auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados')
                        MODAL.close()
                    });
                }
            });
        }, ['nuevo_documento']);
    }
    auditoria_programa_plan.permitir_crear_eliminar = function (documento) {
        if (auditoria_programa_plan.lista_documentos_creados && auditoria_programa_plan.lista_documentos_creados.length > 0) {
            var documentos_creados = [...new Set(auditoria_programa_plan.lista_documentos_creados)];
            return documentos_creados.some(d => d.documento_asociado === documento && d.from_recoleccion === 1);
        }
        return false;
    }
    auditoria_programa_plan.eliminar_documento = function (documento) {
        SWEETALERT.confirm({
            message: "¿Está seguro que desea borrar el Documento?",
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing') + "..."})
                BASEAPI.deleteall('auditoria_programa_plan_documentos_asociados', [
                    {
                        field: "documento_asociado",
                        value: documento.id
                    },
                    {
                        field: "programa_plan",
                        value: auditoria_programa_plan.id
                    }
                ], function (result) {
                    debugger
                    var index = auditoria_programa_plan.auditoria_plan_documentos_asociados.indexOf(documento.id + '');
                    if (index > -1) { // only splice array when item is found
                        auditoria_programa_plan.auditoria_plan_documentos_asociados.splice(index, 1); // 2nd parameter means remove one item only
                    }
                    auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso');
                    auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados');
                    SWEETALERT.stop();
                })
            }
        });
    }
    // auditoria_programa_plan.eliminar_proceso = function (proceso) {
    //     BASEAPI.deleteall('auditoria_programa_plan_proceso',[
    //         {
    //             field: "proceso",
    //             value: proceso.id
    //         },
    //         {
    //             field: "programa_plan",
    //             value: auditoria_programa_plan.id
    //         }
    //     ], function(result) {
    //         BASEAPI.list('vw_auditoria_programa_plan_documentos_asociados', {
    //             limit: 0,
    //             where: [
    //                 {
    //                     field: "proceso",
    //                     value: proceso.id
    //                 },
    //                 {
    //                     field: "programa_plan",
    //                     value: auditoria_programa_plan.id
    //                 }
    //             ]
    //         }, async function (result2) {
    //             if (result2.data.length > 0){
    //                 let id_list_documentos_asoc = [];
    //                 for (var i of result2.data) {
    //                     id_list_documentos_asoc.push(i.id)
    //                 }
    //                 BASEAPI.deleteall('auditoria_programa_plan_documentos_asociados_listaverificacion', [
    //                     {
    //                         field: "programa_plan_documentos_asociados",
    //                         value: id_list_documentos_asoc
    //                     }
    //                 ], function (result) {
    //                     BASEAPI.deleteall('auditoria_programa_plan_documentos_asociados_responsables', [
    //                         {
    //                             field: "programa_plan_documentos_asociados",
    //                             value: id_list_documentos_asoc
    //                         }
    //                     ], function (result) {
    //                         BASEAPI.deleteall('auditoria_programa_plan_documentos_asociados', [
    //                             {
    //                                 field: "id",
    //                                 value: id_list_documentos_asoc
    //                             }
    //                         ], async function (result) {
    //                             await auditoria_programa_plan.getProcesoUsuario();
    //                             auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados');
    //                             auditoria_programa_plan.refreshAngular();
    //                         });
    //                     });
    //                 });
    //             }else{
    //                 await auditoria_programa_plan.getProcesoUsuario();
    //                 auditoria_programa_plan.form.loadDropDown('auditoria_plan_documentos_asociados');
    //                 auditoria_programa_plan.refreshAngular();
    //             }
    //         });
    //     });
    // }
    auditoria_programa_plan.getRol = async function () {
        auditoria_programa_plan.auditores = await BASEAPI.listp('auditoria_programa_plan_equipotrabajo', {
            limit: 0,
            where: [
                {
                    field: "programa_plan",
                    value: auditoria_programa_plan.id ? auditoria_programa_plan.id : -1
                },
                {
                    field: "usuario",
                    value: auditoria_programa_plan.auditoria_plan_responsable
                }
            ]
        });
        if (auditoria_programa_plan.auditores) {
            auditoria_programa_plan.ROLROWS = [];
            auditoria_programa_plan.auditores_lideres = 0;
            if (auditoria_programa_plan.auditores.data) {
                if (auditoria_programa_plan.auditores.data.length > 0) {
                    auditoria_programa_plan.auditores_reales = auditoria_programa_plan.auditores.data.filter((value, index, self) => self.map(x => x.usuario).indexOf(value.usuario) == index)
                }
            }
            if (auditoria_programa_plan.auditoria_plan_responsable) {
                if (auditoria_programa_plan.auditoria_plan_responsable.length > 0) {
                    var auditores_unicos = auditoria_programa_plan.auditoria_plan_responsable.filter((value, index, self) => self.map(x => x).indexOf(value) == index)
                }
            }
            auditoria_programa_plan.proceso_auditores = [];
            if (auditoria_programa_plan.usuarios_auditores) {
                if (auditoria_programa_plan.usuarios_auditores.length > 0) {
                    for (let i of auditoria_programa_plan.usuarios_auditores) {
                        if (auditores_unicos) {
                            if (auditores_unicos.length > 0) {
                                for (let j of auditores_unicos) {
                                    if (i.id == j) {
                                        auditoria_programa_plan.proceso_auditores.push(i)
                                    }
                                }
                            }
                        }
                    }
                    ;
                }
            }
            try {
                let auditores_responsable = ARRAY.unique(auditoria_programa_plan.auditoria_plan_responsable);
                auditores_responsable.sort(function (a, b) {
                    return a - b
                });
                for (var item of auditores_responsable) {
                    var somwerow = new ROLROW();
                    var auditor = auditoria_programa_plan.auditores.data.filter(d => {
                        return d.usuario == item;
                    });
                    if (auditor.length > 0) {
                        somwerow.usuario = item;
                        somwerow.rol = auditor[0].esresponsable ? auditor[0].esresponsable + "" : null;
                        auditoria_programa_plan.ROLROWS.push(somwerow)
                        if (auditoria_programa_plan.roles_lideres.filter(d => d.id == auditor[0].esresponsable && d.lider === 1).length > 0)
                            auditoria_programa_plan.auditores_lideres++
                    } else {
                        somwerow.usuario = item;
                        somwerow.rol = null;
                        auditoria_programa_plan.ROLROWS.push(somwerow);
                    }
                }
            } catch (e) {

            }
        }
        auditoria_programa_plan.refreshAngular();
    }
    auditoria_programa_plan.getProcesoUsuario = async function () {
        auditoria_programa_plan.procesoAuditores = await BASEAPI.listp('auditoria_programa_plan_proceso', {
            limit: 0,
            where: [
                {
                    field: "programa_plan",
                    value: auditoria_programa_plan.id ? auditoria_programa_plan.id : -1
                },
                {
                    field: "proceso",
                    value: auditoria_programa_plan.auditoria_plan_proceso
                }
            ]
        });
        if (auditoria_programa_plan.procesoAuditores) {
            auditoria_programa_plan.RESROWS = [];
            if (auditoria_programa_plan.procesoAuditores.data) {
                if (auditoria_programa_plan.procesoAuditores.data.length > 0) {
                    auditoria_programa_plan.procesoAuditores_reales = auditoria_programa_plan.procesoAuditores.data.filter(x => {
                        return x.usuario
                    })
                }
            }
            try {
                let losProcesos = ARRAY.unique(auditoria_programa_plan.auditoria_plan_proceso);
                losProcesos.sort(function (a, b) {
                    return a - b
                });
                for (var item of losProcesos) {
                    var somwerow = new RESROW();
                    var leproceso = auditoria_programa_plan.procesoAuditores.data.filter(d => {
                        return d.proceso == item;
                    });
                    if (leproceso.length > 0) {
                        somwerow.proceso = item;
                        somwerow.usuario = leproceso[0].usuario ? leproceso[0].usuario + "" : null;
                        auditoria_programa_plan.RESROWS.push(somwerow)
                    } else {
                        somwerow.proceso = item;
                        somwerow.usuario = null;
                        auditoria_programa_plan.RESROWS.push(somwerow);
                    }
                }
            } catch (e) {

            }
        }
        auditoria_programa_plan.refreshAngular();
    }
    auditoria_programa_plan.get_rol = function (id) {
        try {
            if (auditoria_programa_plan.auditores) {
                if (auditoria_programa_plan.auditores.data) {
                    var auditor = auditoria_programa_plan.auditores.data.filter(d => {
                        return d.usuario == id;
                    })
                    var rol = auditoria_programa_plan.roles_auditores.filter(e => {
                        return e.id == auditor[0].esresponsable
                    })
                    if (rol.length > 0)
                        return `(${rol[0].nombre})`;
                }
            }
        } catch (e) {
            return "";
        }
    };
    auditoria_programa_plan.check_responsable_documento = function (row) {
        var auditor_responsable = auditoria_programa_plan.auditores_responsables.data.filter(d => {
            return d.documento_asociado == row.id;
        });
        auditor_responsable = auditor_responsable[0];
        return auditoria_programa_plan.auditor_lider || auditor_responsable;
    }
    auditoria_programa_plan.get_rolRaw = function (id) {
        if (auditoria_programa_plan.auditores) {
            if (auditoria_programa_plan.auditores.data) {
                var auditor = auditoria_programa_plan.auditores.data.filter(d => {
                    return d.usuario == id;
                });
                if (auditor.length) {
                    var rol = auditoria_programa_plan.roles_auditores.filter(e => {
                        return e.id == auditor[0].esresponsable
                    });
                    if (rol.length > 0)
                        return rol[0];
                }
            }
        }
        return {};
    };
    auditoria_programa_plan.get_files = async function () {
        auditoria_programa_plan.fileSI = [];
        for (var registros of auditoria_programa_plan.documentos_asociados_list_view.data) {
            auditoria_programa_plan.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/auditoria_programa_plan_documentos_asociados_listaverificacion/listaverificacionfile/' + registros.id_punto_verificacion}, function (result) {
                    if (result.data.count > 0) {
                        auditoria_programa_plan.fileSI.push({id: registros.id_punto_verificacion});
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
            await auditoria_programa_plan.files();
            auditoria_programa_plan.refreshAngular();
        }
    };
    auditoria_programa_plan.check_file = function (row) {
        var info = auditoria_programa_plan.fileSI.filter(data => {
            return data.id == row.id_punto_verificacion;
        });
        return info.length > 0;
    }
    auditoria_programa_plan.verFile = function (key, value, row) {
        if (key != "archivo")
            return;

        auditoria_programa_plan.setPermission("file.upload", false);
        auditoria_programa_plan.setPermission("file.remove", false);
        // if (row.estatus_actividad == ENUM_2.actividad_poa_estatus.Completada || row.estatus_actividad == ENUM_2.actividad_poa_estatus.Cancelada) {
        //     actividades_poa_monitoreo.setPermission("file.upload", false);
        //     actividades_poa_monitoreo.setPermission("file.remove", false);
        // } else {
        //     actividades_poa_monitoreo.setPermission("file.upload", true);
        //     actividades_poa_monitoreo.setPermission("file.remove", true);
        // }
        if (typeof auditoria_programa_plan !== 'null') {
            if (auditoria_programa_plan) {
                var info = auditoria_programa_plan.fileSI.filter(data2 => {
                    return data2.id == row.id_punto_verificacion;
                });
                if (info.length) {
                    var root = DSON.template("/auditoria_programa_plan_documentos_asociados_listaverificacion/listaverificacionfile/" + row.id_punto_verificacion, row);
                    auditoria_programa_plan.showfiletypes = function () {
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
                        auditoria_programa_plan.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'auditoria_programa_plan',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    auditoria_programa_plan.modal.modalView("templates/components/gallery", {
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
    auditoria_programa_plan.verPuntosIncompletos = function (key, value, row) {
        auditoria_programa_plan.for_show_id = row.id;
        auditoria_programa_plan.modal.modalView("auditoria_programa/view_doc", {
            width: 'modal-full',
            header: {
                title: "Puntos de Verificación no Cumplidos",
                icon: "cancel-square2"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'auditoria_programa',
            },
        });
    }
    auditoria_programa_plan.make_responsable = function (key, row) {
        if (!auditoria_programa_plan.id) {
            auditoria_programa_plan.from_new = true;
            BASEAPI.insertID('auditoria_programa_plan', {
                nombre: auditoria_programa_plan.nombre ? auditoria_programa_plan.nombre : "$null",
                auditoria_programa: auditoria_programa_plan.auditoria_programa ? auditoria_programa_plan.auditoria_programa : "$null",
                descripcion: auditoria_programa_plan.descripcion ? auditoria_programa_plan.descripcion : "$null",
                fecha_inicio: auditoria_programa_plan.fecha_inicio ? moment(auditoria_programa_plan.fecha_inicio).format("YYYY-MM-DD") : "$null",
                fecha_fin: auditoria_programa_plan.fecha_fin ? moment(auditoria_programa_plan.fecha_fin).format("YYYY-MM-DD") : "$null",
                objetivo: auditoria_programa_plan.objetivo ? auditoria_programa_plan.objetivo : "$null",
                tipo_auditoria: auditoria_programa_plan.tipo_auditoria != "[NULL]" ? auditoria_programa_plan.tipo_auditoria : "$null",
                prioridad: auditoria_programa_plan.prioridad != "[NULL]" ? auditoria_programa_plan.prioridad : "$null",
                criterio: auditoria_programa_plan.criterio ? auditoria_programa_plan.criterio : "$null",
                estatus: 1,
                estatus_plan_accion: 1,
                alcance: auditoria_programa_plan.alcance ? auditoria_programa_plan.alcance : "$null",
                elaborado_por: auditoria_programa_plan.session.usuario_id,
                elaborado_en: moment().format("YYYY-MM-DD HH:mm"),
                active: 1
            }, '', '', function (result) {
                if (result) {
                    auditoria_programa_plan.id = result.data.data[0].id
                    auditoria_programa_plan.form.mode = 'edit';
                    auditoria_programa_plan.refreshAngular();
                    if (auditoria_programa_plan.id) {
                        BASEAPI.insert('auditoria_programa_plan_equipotrabajo', {
                            programa_plan: auditoria_programa_plan.id,
                            usuario: row.id,
                            esresponsable: auditoria_programa_plan.ROLROWS[key].rol ? auditoria_programa_plan.ROLROWS[key].rol : "$null"
                        }, function (result) {
                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_responsable');
                        });
                    }
                }
            })
        } else {
            if (auditoria_programa_plan.id) {
                auditoria_programa_plan.from_new = false;
                BASEAPI.first('auditoria_programa_plan_equipotrabajo', {
                    where: [
                        {
                            field: "programa_plan",
                            value: auditoria_programa_plan.id
                        },
                        {
                            field: "usuario",
                            value: row.id
                        }
                    ]
                }, function (result) {
                    if (result) {
                        BASEAPI.updateall('auditoria_programa_plan_equipotrabajo', {
                            esresponsable: auditoria_programa_plan.ROLROWS[key].rol ? auditoria_programa_plan.ROLROWS[key].rol : "$null",
                            where: [
                                {
                                    field: "id",
                                    value: result.id
                                }
                            ]
                        }, function (result) {
                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_responsable');
                        });
                    } else {
                        BASEAPI.insert('auditoria_programa_plan_equipotrabajo', {
                            programa_plan: auditoria_programa_plan.id,
                            usuario: row.id,
                            esresponsable: auditoria_programa_plan.ROLROWS[key].rol ? auditoria_programa_plan.ROLROWS[key].rol : "$null"
                        }, function (result) {
                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_responsable');
                        });
                    }
                })

            }
        }
    }
    auditoria_programa_plan.make_proceso_usuario = function (key, row) {
        if (!auditoria_programa_plan.id) {
            auditoria_programa_plan.from_new = true;
            BASEAPI.insertID('auditoria_programa_plan', {
                nombre: auditoria_programa_plan.nombre ? auditoria_programa_plan.nombre : "$null",
                auditoria_programa: auditoria_programa_plan.auditoria_programa ? auditoria_programa_plan.auditoria_programa : "$null",
                descripcion: auditoria_programa_plan.descripcion ? auditoria_programa_plan.descripcion : "$null",
                fecha_inicio: auditoria_programa_plan.fecha_inicio ? moment(auditoria_programa_plan.fecha_inicio).format("YYYY-MM-DD") : "$null",
                fecha_fin: auditoria_programa_plan.fecha_fin ? moment(auditoria_programa_plan.fecha_fin).format("YYYY-MM-DD") : "$null",
                objetivo: auditoria_programa_plan.objetivo ? auditoria_programa_plan.objetivo : "$null",
                tipo_auditoria: auditoria_programa_plan.tipo_auditoria != "[NULL]" ? auditoria_programa_plan.tipo_auditoria : "$null",
                prioridad: auditoria_programa_plan.prioridad != "[NULL]" ? auditoria_programa_plan.prioridad : "$null",
                criterio: auditoria_programa_plan.criterio ? auditoria_programa_plan.criterio : "$null",
                estatus: 1,
                estatus_plan_accion: 1,
                alcance: auditoria_programa_plan.alcance ? auditoria_programa_plan.alcance : "$null",
                elaborado_por: auditoria_programa_plan.session.usuario_id,
                elaborado_en: moment().format("YYYY-MM-DD HH:mm"),
                active: 1
            }, '', '', function (result) {
                if (result) {
                    auditoria_programa_plan.id = result.data.data[0].id
                    auditoria_programa_plan.form.mode = 'edit';
                    auditoria_programa_plan.refreshAngular();
                    if (auditoria_programa_plan.id) {
                        BASEAPI.insert('auditoria_programa_plan_proceso', {
                            programa_plan: auditoria_programa_plan.id,
                            proceso: row.id,
                            usuario: auditoria_programa_plan.RESROWS[key].usuario ? auditoria_programa_plan.RESROWS[key].usuario : "$null"
                        }, function (result) {
                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso');
                        });
                    }
                }
            })
        } else {
            if (auditoria_programa_plan.id) {
                auditoria_programa_plan.from_new = false;
                BASEAPI.first('auditoria_programa_plan_proceso', {
                    where: [
                        {
                            field: "programa_plan",
                            value: auditoria_programa_plan.id
                        },
                        {
                            field: "proceso",
                            value: row.id
                        }
                    ]
                }, function (result) {
                    if (result) {
                        let usuario_viejo = result.usuario;
                        BASEAPI.updateall('auditoria_programa_plan_proceso', {
                            usuario: auditoria_programa_plan.RESROWS[key].usuario ? auditoria_programa_plan.RESROWS[key].usuario : "$null",
                            where: [
                                {
                                    field: "id",
                                    value: result.id
                                }
                            ]
                        }, async function (result) {
                            let documentos_asociados = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                limit: 0, where: [
                                    {
                                        field: "programa_plan",
                                        value: auditoria_programa_plan.id
                                    },
                                    {
                                        field: "proceso",
                                        value: row.id
                                    }
                                ]
                            })
                            let documentos_id = [];
                            if (documentos_asociados.data.length > 0) {
                                for (var i of documentos_asociados.data) {
                                    documentos_id.push(i.id)
                                }
                                if (documentos_id.length > 0) {
                                    BASEAPI.updateall('auditoria_programa_plan_documentos_asociados', {
                                        trabajado: 1,
                                        where: [
                                            {
                                                field: "id",
                                                value: documentos_id
                                            }
                                        ]
                                    }, async function (result) {
                                        BASEAPI.deleteall('auditoria_programa_plan_documentos_asociados_responsables', [
                                            {
                                                field: "programa_plan_documentos_asociados",
                                                value: documentos_id
                                            },
                                            {
                                                field: "usuario",
                                                value: [usuario_viejo ? usuario_viejo : 0, auditoria_programa_plan.RESROWS[key].usuario ? auditoria_programa_plan.RESROWS[key].usuario : 0]
                                            }
                                        ], async function (result) {
                                            for (var i of documentos_id) {
                                                if (auditoria_programa_plan.RESROWS[key].usuario) {
                                                    BASEAPI.insert('auditoria_programa_plan_documentos_asociados_responsables', {
                                                        usuario: auditoria_programa_plan.RESROWS[key].usuario ? auditoria_programa_plan.RESROWS[key].usuario : "$null",
                                                        programa_plan_documentos_asociados: i
                                                    }, async function (result) {
                                                        var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                                            limit: 0, where: [
                                                                {
                                                                    field: "programa_plan",
                                                                    value: auditoria_programa_plan.id
                                                                },
                                                                {
                                                                    field: "estatus",
                                                                    operator: "is",
                                                                    value: "$null"
                                                                }
                                                            ]
                                                        })
                                                        auditoria_programa_plan.documentos_list = documentos_list.data;
                                                    });
                                                } else {
                                                    var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                                        limit: 0, where: [
                                                            {
                                                                field: "programa_plan",
                                                                value: auditoria_programa_plan.id
                                                            },
                                                            {
                                                                field: "estatus",
                                                                operator: "is",
                                                                value: "$null"
                                                            }
                                                        ]
                                                    })
                                                    auditoria_programa_plan.documentos_list = documentos_list.data;
                                                }
                                            }
                                        })
                                    });
                                }
                            }
                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso');
                        });
                    } else {
                        BASEAPI.insert('auditoria_programa_plan_proceso', {
                            programa_plan: auditoria_programa_plan.id,
                            proceso: row.id,
                            usuario: auditoria_programa_plan.RESROWS[key].usuario ? auditoria_programa_plan.RESROWS[key].usuario : "$null"
                        }, async function (result) {
                            auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso');
                        });
                    }
                })
            }
        }
    }
    auditoria_programa_plan.revisar_proceso = function (row) {
        if (!auditoria_programa_plan.id) {
            auditoria_programa_plan.from_new = true;
            BASEAPI.insertID('auditoria_programa_plan', {
                nombre: auditoria_programa_plan.nombre ? auditoria_programa_plan.nombre : "$null",
                auditoria_programa: auditoria_programa_plan.auditoria_programa ? auditoria_programa_plan.auditoria_programa : "$null",
                descripcion: auditoria_programa_plan.descripcion ? auditoria_programa_plan.descripcion : "$null",
                fecha_inicio: auditoria_programa_plan.fecha_inicio ? moment(auditoria_programa_plan.fecha_inicio).format("YYYY-MM-DD") : "$null",
                fecha_fin: auditoria_programa_plan.fecha_fin ? moment(auditoria_programa_plan.fecha_fin).format("YYYY-MM-DD") : "$null",
                objetivo: auditoria_programa_plan.objetivo ? auditoria_programa_plan.objetivo : "$null",
                tipo_auditoria: auditoria_programa_plan.tipo_auditoria != "[NULL]" ? auditoria_programa_plan.tipo_auditoria : "$null",
                prioridad: auditoria_programa_plan.prioridad != "[NULL]" ? auditoria_programa_plan.prioridad : "$null",
                criterio: auditoria_programa_plan.criterio ? auditoria_programa_plan.criterio : "$null",
                alcance: auditoria_programa_plan.alcance ? auditoria_programa_plan.alcance : "$null",
                estatus: 1,
                estatus_plan_accion: 1,
                elaborado_por: auditoria_programa_plan.session.usuario_id,
                elaborado_en: moment().format("YYYY-MM-DD HH:mm"),
                active: 1
            }, '', '', function (result) {
                if (result) {
                    auditoria_programa_plan.id = result.data.data[0].id
                    auditoria_programa_plan.form.mode = 'edit';
                    auditoria_programa_plan.refreshAngular();
                    if (auditoria_programa_plan.id) {
                        BASEAPI.insert('auditoria_programa_plan_proceso', {
                            programa_plan: auditoria_programa_plan.id,
                            proceso: row.id,
                            revisado: 1
                        }, async function (result) {
                            if (result) {
                                var my_procesos_list = await BASEAPI.listp('vw_auditoria_programa_plan_procesos', {
                                    where: [
                                        {
                                            field: "programa_plan",
                                            value: auditoria_programa_plan.id
                                        }
                                    ]
                                })
                                auditoria_programa_plan.my_procesos_list = my_procesos_list.data;
                                auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso');
                            }
                        });
                    }
                }
            })
        } else {
            if (auditoria_programa_plan.id) {
                auditoria_programa_plan.from_new = false;
                BASEAPI.first('auditoria_programa_plan_proceso', {
                    where: [
                        {
                            field: "programa_plan",
                            value: auditoria_programa_plan.id
                        },
                        {
                            field: "proceso",
                            value: row.id
                        }
                    ]
                }, function (result) {
                    if (result) {
                        BASEAPI.updateall('auditoria_programa_plan_proceso', {
                            revisado: 1,
                            where: [
                                {
                                    field: "id",
                                    value: result.id
                                }
                            ]
                        }, async function (result) {
                            if (result) {
                                var my_procesos_list = await BASEAPI.listp('vw_auditoria_programa_plan_procesos', {
                                    where: [
                                        {
                                            field: "programa_plan",
                                            value: auditoria_programa_plan.id
                                        }
                                    ]
                                })
                                auditoria_programa_plan.my_procesos_list = my_procesos_list.data;
                                auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso');
                            }
                        });
                    } else {
                        BASEAPI.insert('auditoria_programa_plan_proceso', {
                            programa_plan: auditoria_programa_plan.id,
                            proceso: row.id,
                            revisado: 1
                        }, async function (result) {
                            if (result) {
                                var my_procesos_list = await BASEAPI.listp('vw_auditoria_programa_plan_procesos', {
                                    where: [
                                        {
                                            field: "programa_plan",
                                            value: auditoria_programa_plan.id
                                        }
                                    ]
                                })
                                auditoria_programa_plan.my_procesos_list = my_procesos_list.data;
                                auditoria_programa_plan.form.loadDropDown('auditoria_plan_proceso');
                            }
                        });
                    }
                })

            }
        }
    }
    auditoria_programa_plan.work_documento = async function (row) {
        auditoria_programa_plan.documento = await BASEAPI.firstp('auditoria_programa_plan_documentos_asociados', {
            order: "asc",
            where: [
                {
                    field: "programa_plan",
                    value: auditoria_programa_plan.id
                },
                {
                    field: "documento_asociado",
                    value: row.id
                }
            ]
        })
        auditoria_programa_plan.documento_asoc_nombre = row.nombre;
        auditoria_programa_plan.observaciones = auditoria_programa_plan.documento.observaciones;
        auditoria_programa_plan.modal.modalView("auditoria_programa_plan/verificar_doc", {
            width: 'modal-full',
            header: {
                title: 'Trabajar lista de verificación del Documento: ' + row.nombre,
                icon: "hammer-wrench"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: true
            },
            event: {
                show: {
                    end: function (data) {
                        // VALIDATION.validate(auditoria_programa_plan, "observaciones", [{
                        //     valid: !DSON.oseaX0(auditoria_programa_plan.observaciones),
                        //     message: MESSAGE.i('validations.Fieldisrequired'),
                        //     type: VALIDATION.types.error,
                        //     visible: false
                        // }]);
                        auditoria_programa_plan.refreshAngular()
                    }
                },
                hide: {
                    // begin: function (data) {
                    //     if($(`[name=${indicador_producto_poa.commentName}]`).val().length >= 85){
                    //         $(`.${indicador_producto_poa.commentName}`).show();
                    //     }else{
                    //         $(`.${indicador_producto_poa.commentName}`).hide();
                    //     }
                    // },
                    end: function (data) {
                        // VALIDATION.validate(auditoria_programa_plan, "observaciones", [{
                        //     valid: true,
                        //     message: MESSAGE.i('validations.Fieldisrequired'),
                        //     type: VALIDATION.types.error,
                        //     visible: false
                        // }]);
                        auditoria_programa_plan.refreshAngular()
                    }
                }
            },
        });
    }
    auditoria_programa_plan.add_work_list = async function (row, from_view) {
        auditoria_programa_plan.selected_row = row;
        if (from_view) {
            auditoria_programa_plan.hide_me = true;
            BASEAPI.first('auditoria_programa_plan_documentos_asociados', {
                where: [
                    {
                        field: "programa_plan",
                        value: auditoria_programa_plan.mi_id ? auditoria_programa_plan.mi_id : -1
                    },
                    {
                        field: "documento_asociado",
                        value: row.id
                    }
                ]
            }, async function (result) {
                if (result) {
                    var updated = await BASEAPI.updateallp('auditoria_programa_plan_documentos_asociados', {
                        trabajado: 1,
                        where: [{
                            field: "id",
                            value: result.id
                        }]
                    }, '', '');
                    auditoria_programa_plan.documento = result;
                    auditoria_programa_plan.modal.modalView("auditoria_programa_plan/add_list", {
                        width: 'modal-full',
                        header: {
                            title: 'Agregar - lista de verificación  del Documento: ' + row.nombre,
                            icon: "file-plus2"
                        },
                        footer: {
                            cancelButton: false
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading'),
                            sameController: true
                        },
                        event: {
                            // show: {
                            //     end: function (data) {
                            //
                            //     }
                            // },
                            hide: {
                                // begin: function (data) {
                                //     if($(`[name=${indicador_producto_poa.commentName}]`).val().length >= 85){
                                //         $(`.${indicador_producto_poa.commentName}`).show();
                                //     }else{
                                //         $(`.${indicador_producto_poa.commentName}`).hide();
                                //     }
                                // },
                                end: async function (data) {
                                    var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                        limit: 0, where: [
                                            {
                                                field: "programa_plan",
                                                value: auditoria_programa_plan.id
                                            },
                                            {
                                                field: "estatus",
                                                operator: "is",
                                                value: "$null"
                                            }
                                        ]
                                    })
                                    auditoria_programa_plan.documentos_list = documentos_list.data;
                                }
                            }
                        },
                    });
                }
            });
        } else {
            auditoria_programa_plan.hide_me = false;
            if (!auditoria_programa_plan.id) {
                auditoria_programa_plan.from_new = true;
                BASEAPI.insertID('auditoria_programa_plan', {
                    nombre: auditoria_programa_plan.nombre ? auditoria_programa_plan.nombre : "$null",
                    auditoria_programa: auditoria_programa_plan.auditoria_programa ? auditoria_programa_plan.auditoria_programa : "$null",
                    descripcion: auditoria_programa_plan.descripcion ? auditoria_programa_plan.descripcion : "$null",
                    fecha_inicio: auditoria_programa_plan.fecha_inicio ? moment(auditoria_programa_plan.fecha_inicio).format("YYYY-MM-DD") : "$null",
                    fecha_fin: auditoria_programa_plan.fecha_fin ? moment(auditoria_programa_plan.fecha_fin).format("YYYY-MM-DD") : "$null",
                    objetivo: auditoria_programa_plan.objetivo ? auditoria_programa_plan.objetivo : "$null",
                    tipo_auditoria: auditoria_programa_plan.tipo_auditoria != "[NULL]" ? auditoria_programa_plan.tipo_auditoria : "$null",
                    prioridad: auditoria_programa_plan.prioridad != "[NULL]" ? auditoria_programa_plan.prioridad : "$null",
                    criterio: auditoria_programa_plan.criterio ? auditoria_programa_plan.criterio : "$null",
                    alcance: auditoria_programa_plan.alcance ? auditoria_programa_plan.alcance : "$null",
                    estatus: 1,
                    estatus_plan_accion: 1,
                    elaborado_por: auditoria_programa_plan.session.usuario_id,
                    elaborado_en: moment().format("YYYY-MM-DD HH:mm"),
                    active: 1
                }, '', '', function (result) {
                    if (result) {
                        auditoria_programa_plan.id = result.data.data[0].id
                        auditoria_programa_plan.form.mode = 'edit';
                        auditoria_programa_plan.refreshAngular();
                        if (auditoria_programa_plan.id) {
                            BASEAPI.first('auditoria_programa_plan_documentos_asociados', {
                                where: [
                                    {
                                        field: "programa_plan",
                                        value: auditoria_programa_plan.id ? auditoria_programa_plan.id : -1
                                    },
                                    {
                                        field: "documento_asociado",
                                        value: row.id
                                    }
                                ]
                            }, async function (result) {
                                if (result) {
                                    var updated = await BASEAPI.updateallp('auditoria_programa_plan_documentos_asociados', {
                                        trabajado: 1,
                                        where: [{
                                            field: "id",
                                            value: result.id
                                        }]
                                    }, '', '');
                                    auditoria_programa_plan.documento = result;
                                    if (auditoria_programa_plan.procesoAuditores_reales.length > 0) {
                                        var usuario_responsable = auditoria_programa_plan.procesoAuditores_reales.filter(x => {
                                            return x.proceso == row.proceso
                                        })
                                    } else {
                                        var usuario_responsable = [];
                                    }
                                    BASEAPI.list('vw_auditoria_programa_plan_documentos_asociados_responsables', {
                                        limit: 0,
                                        where: [
                                            {
                                                field: "programa_plan",
                                                value: auditoria_programa_plan.id
                                            },
                                            {
                                                field: "documento_asociado",
                                                value: row.id
                                            }
                                        ]
                                    }, async function (result) {
                                        if (result.data.length > 0) {
                                            auditoria_programa_plan.modal.modalView("auditoria_programa_plan/add_list", {
                                                width: 'modal-full',
                                                header: {
                                                    title: 'Agregar - lista de verificación del Documento: ' + row.nombre,
                                                    icon: "file-plus2"
                                                },
                                                footer: {
                                                    cancelButton: false
                                                },
                                                content: {
                                                    loadingContentText: MESSAGE.i('actions.Loading'),
                                                    sameController: true
                                                },
                                                event: {
                                                    // show: {
                                                    //     end: function (data) {
                                                    //
                                                    //     }
                                                    // },
                                                    hide: {
                                                        // begin: function (data) {
                                                        //     if($(`[name=${indicador_producto_poa.commentName}]`).val().length >= 85){
                                                        //         $(`.${indicador_producto_poa.commentName}`).show();
                                                        //     }else{
                                                        //         $(`.${indicador_producto_poa.commentName}`).hide();
                                                        //     }
                                                        // },
                                                        end: async function (data) {
                                                            var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                                                limit: 0, where: [
                                                                    {
                                                                        field: "programa_plan",
                                                                        value: auditoria_programa_plan.id
                                                                    },
                                                                    {
                                                                        field: "estatus",
                                                                        operator: "is",
                                                                        value: "$null"
                                                                    }
                                                                ]
                                                            })
                                                            auditoria_programa_plan.documentos_list = documentos_list.data;
                                                        }
                                                    }
                                                },
                                            });
                                        } else {
                                            BASEAPI.insert('auditoria_programa_plan_documentos_asociados_responsables', {
                                                programa_plan_documentos_asociados: auditoria_programa_plan.documento.id,
                                                usuario: usuario_responsable[0].usuario,
                                            }, function () {
                                                auditoria_programa_plan.modal.modalView("auditoria_programa_plan/add_list", {
                                                    width: 'modal-full',
                                                    header: {
                                                        title: 'Agregar - lista de verificación del Documento: ' + row.nombre,
                                                        icon: "file-plus2"
                                                    },
                                                    footer: {
                                                        cancelButton: false
                                                    },
                                                    content: {
                                                        loadingContentText: MESSAGE.i('actions.Loading'),
                                                        sameController: true
                                                    },
                                                    event: {
                                                        // show: {
                                                        //     end: function (data) {
                                                        //
                                                        //     }
                                                        // },
                                                        hide: {
                                                            // begin: function (data) {
                                                            //     if($(`[name=${indicador_producto_poa.commentName}]`).val().length >= 85){
                                                            //         $(`.${indicador_producto_poa.commentName}`).show();
                                                            //     }else{
                                                            //         $(`.${indicador_producto_poa.commentName}`).hide();
                                                            //     }
                                                            // },
                                                            end: async function (data) {
                                                                var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                                                    limit: 0, where: [
                                                                        {
                                                                            field: "programa_plan",
                                                                            value: auditoria_programa_plan.id
                                                                        },
                                                                        {
                                                                            field: "estatus",
                                                                            operator: "is",
                                                                            value: "$null"
                                                                        }
                                                                    ]
                                                                })
                                                                auditoria_programa_plan.documentos_list = documentos_list.data;
                                                            }
                                                        }
                                                    },
                                                });
                                            });
                                        }
                                    });
                                } else {
                                    var inserted = await BASEAPI.insertIDp('auditoria_programa_plan_documentos_asociados', {
                                        programa_plan: auditoria_programa_plan.id,
                                        documento_asociado: row.id,
                                        trabajado: 1
                                    }, '', '');
                                    if (inserted) {
                                        auditoria_programa_plan.documento = inserted.data.data[0];
                                        auditoria_programa_plan.responsables_list = await BASEAPI.listp('auditoria_programa_plan_documentos_asociados_responsables', {
                                            where: [
                                                {
                                                    field: "programa_plan_documentos_asociados",
                                                    value: auditoria_programa_plan.documento.id
                                                }
                                            ]
                                        })
                                        auditoria_programa_plan.modal.modalView("auditoria_programa_plan/add_list", {
                                            width: 'modal-full',
                                            header: {
                                                title: 'Agregar - lista de verificación del Documento: ' + row.nombre,
                                                icon: "file-plus2"
                                            },
                                            footer: {
                                                cancelButton: false
                                            },
                                            content: {
                                                loadingContentText: MESSAGE.i('actions.Loading'),
                                                sameController: true
                                            },
                                            event: {
                                                // show: {
                                                //     end: function (data) {
                                                //
                                                //     }
                                                // },
                                                hide: {
                                                    // begin: function (data) {
                                                    //     if($(`[name=${indicador_producto_poa.commentName}]`).val().length >= 85){
                                                    //         $(`.${indicador_producto_poa.commentName}`).show();
                                                    //     }else{
                                                    //         $(`.${indicador_producto_poa.commentName}`).hide();
                                                    //     }
                                                    // },
                                                    end: async function (data) {
                                                        var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                                            limit: 0, where: [
                                                                {
                                                                    field: "programa_plan",
                                                                    value: auditoria_programa_plan.id
                                                                },
                                                                {
                                                                    field: "estatus",
                                                                    operator: "is",
                                                                    value: "$null"
                                                                }
                                                            ]
                                                        })
                                                        auditoria_programa_plan.documentos_list = documentos_list.data;
                                                    }
                                                }
                                            },
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            } else {
                BASEAPI.first('auditoria_programa_plan_documentos_asociados', {
                    where: [
                        {
                            field: "programa_plan",
                            value: auditoria_programa_plan.id ? auditoria_programa_plan.id : -1
                        },
                        {
                            field: "documento_asociado",
                            value: row.id
                        }
                    ]
                }, async function (result) {
                    if (result) {
                        var updated = await BASEAPI.updateallp('auditoria_programa_plan_documentos_asociados', {
                            trabajado: 1,
                            where: [{
                                field: "id",
                                value: result.id
                            }]
                        }, '', '');
                        auditoria_programa_plan.documento = result;
                        auditoria_programa_plan.modal.modalView("auditoria_programa_plan/add_list", {
                            width: 'modal-full',
                            header: {
                                title: 'Agregar - lista de verificación del Documento: ' + row.nombre,
                                icon: "file-plus2"
                            },
                            footer: {
                                cancelButton: false
                            },
                            content: {
                                loadingContentText: MESSAGE.i('actions.Loading'),
                                sameController: true
                            },
                            event: {
                                // show: {
                                //     end: function (data) {
                                //
                                //     }
                                // },
                                hide: {
                                    // begin: function (data) {
                                    //     if($(`[name=${indicador_producto_poa.commentName}]`).val().length >= 85){
                                    //         $(`.${indicador_producto_poa.commentName}`).show();
                                    //     }else{
                                    //         $(`.${indicador_producto_poa.commentName}`).hide();
                                    //     }
                                    // },
                                    end: async function (data) {
                                        var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                            limit: 0, where: [
                                                {
                                                    field: "programa_plan",
                                                    value: auditoria_programa_plan.id
                                                },
                                                {
                                                    field: "estatus",
                                                    operator: "is",
                                                    value: "$null"
                                                }
                                            ]
                                        })
                                        auditoria_programa_plan.documentos_list = documentos_list.data;
                                    }
                                }
                            },
                        });
                    } else {
                        var inserted = await BASEAPI.insertIDp('auditoria_programa_plan_documentos_asociados', {
                            programa_plan: auditoria_programa_plan.id,
                            documento_asociado: row.id,
                            trabajado: 1
                        }, '', '');
                        if (inserted) {
                            auditoria_programa_plan.documento = inserted.data.data[0];
                            auditoria_programa_plan.modal.modalView("auditoria_programa_plan/add_list", {
                                width: 'modal-full',
                                header: {
                                    title: 'Agregar - lista de verificación del Documento: ' + row.nombre,
                                    icon: "file-plus2"
                                },
                                footer: {
                                    cancelButton: false
                                },
                                content: {
                                    loadingContentText: MESSAGE.i('actions.Loading'),
                                    sameController: true
                                },
                                event: {
                                    // show: {
                                    //     end: function (data) {
                                    //
                                    //     }
                                    // },
                                    hide: {
                                        // begin: function (data) {
                                        //     if($(`[name=${indicador_producto_poa.commentName}]`).val().length >= 85){
                                        //         $(`.${indicador_producto_poa.commentName}`).show();
                                        //     }else{
                                        //         $(`.${indicador_producto_poa.commentName}`).hide();
                                        //     }
                                        // },
                                        end: async function (data) {
                                            var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                                                limit: 0, where: [
                                                    {
                                                        field: "programa_plan",
                                                        value: auditoria_programa_plan.id
                                                    },
                                                    {
                                                        field: "estatus",
                                                        operator: "is",
                                                        value: "$null"
                                                    }
                                                ]
                                            })
                                            auditoria_programa_plan.documentos_list = documentos_list.data;
                                        }
                                    }
                                },
                            });
                        }
                    }
                });
            }
        }
    }
    auditoria_programa_plan.validate_documentos = function (row) {
        if (auditoria_programa_plan.documentos_list) {
            if (auditoria_programa_plan.documentos_list.length > 0) {
                if (auditoria_programa_plan.my_true_estatus == 1) {
                    var current_documento = auditoria_programa_plan.documentos_list.filter(d => {
                        return d.cantidad_responsables > 0 && d.documento_asociado === row.id;
                    });
                    return current_documento.length > 0;
                } else if (auditoria_programa_plan.my_true_estatus == 2) {
                    var current_documento = auditoria_programa_plan.documentos_list.filter(d => {
                        return (d.total_listas > 0 && d.cantidad_responsables > 0) && d.documento_asociado === row.id;
                    });
                    return current_documento.length > 0;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    auditoria_programa_plan.validate_documentos_view = function (row) {
        if (auditoria_programa_plan.documentos_list_view) {
            if (auditoria_programa_plan.documentos_list_view.length > 0) {
                var current_documento = auditoria_programa_plan.documentos_list_view.filter(d => {
                    return d.total_listas > 0 && d.documento_asociado === row.id;
                });
                return current_documento.length > 0;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    auditoria_programa_plan.check_documento = function (value) {
        if (auditoria_programa_plan.documentos_list) {
            if (auditoria_programa_plan.documentos_list.length > 0) {
                var documento_trabajado = auditoria_programa_plan.documentos_list.filter(d => {
                    return d.estado == null;
                });
                return check_in_object_array(documento_trabajado, 'documento_asociado', value)
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    auditoria_programa_plan.check_proceso = function (value) {
        if (auditoria_programa_plan.my_procesos_list) {
            if (auditoria_programa_plan.my_procesos_list.length > 0) {
                var proceso_trabajado = auditoria_programa_plan.my_procesos_list.filter(d => {
                    return d.revisado == 1;
                });
                return check_in_object_array(proceso_trabajado, 'proceso', value)
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    auditoria_programa_plan.done_documento = function (value) {
        if (auditoria_programa_plan.documentos_list && auditoria_programa_plan.documentos_list.length > 0) {
            const documento_trabajado = auditoria_programa_plan.documentos_list.find(d => d.documento_asociado === value);
            return documento_trabajado ? documento_trabajado.total_listas > 0 ? documento_trabajado.total_listas === documento_trabajado.total_listas_trabajadas : false : false;
        }
        return false;
    }
    auditoria_programa_plan.hide_work_documento = function (value) {
        if (auditoria_programa_plan.documentos_list) {
            if (auditoria_programa_plan.documentos_list.length > 0) {
                var documento_trabajado = auditoria_programa_plan.documentos_list.filter(d => {
                    return d.documento_asociado == value;
                });
                if (documento_trabajado.length > 0) {
                    return documento_trabajado[0].estatus === 1;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    auditoria_programa_plan.tiene_listaverificacion = function (value) {
        if (auditoria_programa_plan.documentos_list) {
            if (auditoria_programa_plan.documentos_list.length > 0) {
                var documento_con_lista = auditoria_programa_plan.documentos_list.filter(d => {
                    return d.documento_asociado == value;
                });
                if (documento_con_lista.length > 0) {
                    return documento_con_lista[0].total_listas > 0;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    auditoria_programa_plan.done_proceso = function (value) {
        if (!auditoria_programa_plan.my_procesos_list || auditoria_programa_plan.my_procesos_list.length === 0) {
            return false;
        }

        const proceso_trabajado = auditoria_programa_plan.my_procesos_list.find(d => d.proceso === value);

        return proceso_trabajado ? (proceso_trabajado.total_documentos === proceso_trabajado.total_documentos_trabajados) && proceso_trabajado.revisado !== 1 : false;
    }
    auditoria_programa_plan.work_doc_estatus = async function (row) {
        SWEETALERT.loading({message: MESSAGE.i('mono.procesing')})
        BASEAPI.updateall('auditoria_programa_plan_documentos_asociados', {
            estatus: 1,
            where: [
                {
                    field: "programa_plan",
                    value: auditoria_programa_plan.id
                },
                {
                    field: "documento_asociado",
                    value: row.id
                },
                {
                    field: "estatus",
                    operator: "is",
                    value: "$null"
                }
            ]
        }, async function (result) {
            if (result) {
                var documentos_list = await BASEAPI.listp('vw_auditoria_programa_plan_documentos_asociados', {
                    limit: 0, where: [
                        {
                            field: "programa_plan",
                            value: auditoria_programa_plan.id
                        },
                        {
                            field: "documento_asociado",
                            operator: "is not",
                            value: "$null"
                        }
                    ]
                });
                auditoria_programa_plan.documentos_list = documentos_list.data;
                SWEETALERT.stop();
                SWEETALERT.show({
                    message: "El Documento ha sido Trabajado",
                    confirm: async function () {
                        var my_procesos_list = await BASEAPI.listp('vw_auditoria_programa_plan_procesos', {
                            where: [
                                {
                                    field: "programa_plan",
                                    value: auditoria_programa_plan.id
                                }
                            ]
                        })
                        auditoria_programa_plan.my_procesos_list = my_procesos_list.data;
                        auditoria_programa_plan.form.loadDropDown('auditoria_plan_responsable');
                    }
                });
            }
        });
    }
    auditoria_programa_plan.view_doc = async function (row) {
        auditoria_programa_plan.documento = await BASEAPI.firstp('auditoria_programa_plan_documentos_asociados', {
            order: "asc",
            where: [
                {
                    field: "programa_plan",
                    value: auditoria_programa_plan.id
                },
                {
                    field: "documento_asociado",
                    value: row.id
                }
            ]
        })
        auditoria_programa_plan.observaciones = auditoria_programa_plan.documento.observaciones;
        auditoria_programa_plan.modal.modalView("auditoria_programa_plan/view_doc", {
            width: 'modal-full',
            header: {
                title: 'Ver lista de verificación del Documento: ' + row.nombre,
                icon: "eye"
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: true
            },
            event: {
                show: {
                    end: function (data) {
                        // VALIDATION.validate(auditoria_programa_plan, "observaciones", [{
                        //     valid: !DSON.oseaX0(auditoria_programa_plan.observaciones),
                        //     message: MESSAGE.i('validations.Fieldisrequired'),
                        //     type: VALIDATION.types.error,
                        //     visible: false
                        // }]);
                        auditoria_programa_plan.refreshAngular()
                    }
                },
                hide: {
                    // begin: function (data) {
                    //     if($(`[name=${indicador_producto_poa.commentName}]`).val().length >= 85){
                    //         $(`.${indicador_producto_poa.commentName}`).show();
                    //     }else{
                    //         $(`.${indicador_producto_poa.commentName}`).hide();
                    //     }
                    // },
                    end: function (data) {
                        // VALIDATION.validate(auditoria_programa_plan, "observaciones", [{
                        //     valid: true,
                        //     message: MESSAGE.i('validations.Fieldisrequired'),
                        //     type: VALIDATION.types.error,
                        //     visible: false
                        // }]);
                        auditoria_programa_plan.refreshAngular()
                    }
                }
            },
        });
    }
    auditoria_programa_plan.save_document = function (from_where) {
        if (auditoria_programa_plan.fromWhere == 'from_work') {
            SWEETALERT.loading({message: MESSAGE.i('mono.procesing')})
            BASEAPI.updateall('auditoria_programa_plan_documentos_asociados', {
                observaciones: auditoria_programa_plan.observaciones ? auditoria_programa_plan.observaciones : "$null",
                where: [
                    {
                        field: "id",
                        value: auditoria_programa_plan.documento.id
                    }
                ]
            }, function (result) {
                SWEETALERT.stop();
                MODAL.close();
            });
        } else if (auditoria_programa_plan.fromWhere == 'from_add') {
            SWEETALERT.loading({message: MESSAGE.i('mono.procesing')})
            if (auditoria_programa_plan.documento_responsable.length > 0) {
                BASEAPI.updateall('auditoria_programa_plan_documentos_asociados', {
                    observaciones: auditoria_programa_plan.observaciones ? auditoria_programa_plan.observaciones : "$null",
                    where: [
                        {
                            field: "id",
                            value: auditoria_programa_plan.documento.id
                        }
                    ]
                }, function (result) {
                    BASEAPI.deleteall('auditoria_programa_plan_documentos_asociados_responsables', [
                        {
                            field: "programa_plan_documentos_asociados",
                            value: auditoria_programa_plan.documento.id
                        }
                    ], function (result) {
                        for (var i of auditoria_programa_plan.documento_responsable) {
                            BASEAPI.insert('auditoria_programa_plan_documentos_asociados_responsables', {
                                usuario: i,
                                programa_plan_documentos_asociados: auditoria_programa_plan.documento.id
                            }, function (result) {

                            });
                        }
                        SWEETALERT.stop();
                        MODAL.close();
                    })
                });
            } else {
                SWEETALERT.show({
                    type: "error",
                    message: "Debe elegir al menos un Auditor responsable",
                    confirm: function () {
                        firstFieldWithError = $(`#inputauditoria_programa_plan_documento_responsable`);
                        firstFieldWithError.find('.form-control').focus();
                        var tab = firstFieldWithError.closest('.tab-pane');
                        $(`[href='#${tab.attr('id')}']`).trigger('click');
                        new ANIMATION().playPure(firstFieldWithError, "shake", function () {
                            firstFieldWithError.find('.form-control').focus();
                        });
                    }
                })
            }
        }
    };
    auditoria_programa_plan.closeModal = function () {
        if (auditoria_programa_plan.from_new && auditoria_programa_plan.id) {
            BASEAPI.list('auditoria_programa_plan_documentos_asociados', {
                limit: 0,
                where: [
                    {
                        field: "programa_plan",
                        value: auditoria_programa_plan.id
                    }
                ]
            }, function (result2) {
                if (result2) {
                    var id_list_documentos_asoc = [];
                    var list_documentos_asoc = result2.data;
                    for (var i of list_documentos_asoc) {
                        id_list_documentos_asoc.push(i.id)
                    }
                    BASEAPI.deleteall('auditoria_programa_plan_documentos_asociados_listaverificacion', [
                        {
                            field: "programa_plan_documentos_asociados",
                            value: id_list_documentos_asoc
                        }
                    ], function (result) {
                        BASEAPI.deleteall('auditoria_programa_plan_documentos_asociados', [
                            {
                                field: "id",
                                value: id_list_documentos_asoc
                            }
                        ], function (result) {
                            BASEAPI.deleteall('auditoria_programa_plan', [
                                {
                                    field: "id",
                                    value: auditoria_programa_plan.id
                                }
                            ], function (result) {
                                auditoria_programa_plan.pages.form.close()
                            })
                        })
                    })
                } else {
                    console.log(result2);
                    BASEAPI.deleteall('auditoria_programa_plan', [
                        {
                            field: "id",
                            value: auditoria_programa_plan.id
                        }
                    ], function (result) {

                        auditoria_programa_plan.pages.form.close()
                    })
                    auditoria_programa_plan.pages.form.close()
                }
            });
            auditoria_programa_plan.from_new = false;
        } else {
            auditoria_programa_plan.pages.form.close()
        }
    }
    auditoria_programa_plan.allow_save_documents = function () {
        debugger
        var documentos_seleccionados = auditoria_programa_plan.auditoria_plan_documentos_asociados.filter(function (item, index, inputArray) {
            return inputArray.indexOf(item) == index;
        });
        // var documentos_list_filtrados = auditoria_programa_plan.documentos_list.filter(function (item, index, inputArray) {
        //     return inputArray.indexOf(item) == index && item.cantidad_responsables > 0;
        // });
        var documentos_correctos = [];
        if (documentos_seleccionados.length > 0) {
            for (let i of auditoria_programa_plan.documentos_list) {
                for (let j of documentos_seleccionados) {
                    if (!documentos_correctos.some(e => e.programa_plan == i.programa_plan && e.proceso == i.proceso && e.documento_asociado == i.documento_asociado)) {
                        if ((i.documento_asociado == j) && i.cantidad_responsables > 0) {
                            documentos_correctos.push(i)
                        }
                    }
                }
            }
            ;
        }
        if (documentos_correctos.length !== documentos_seleccionados.length){
            var procesos_seleccionados = auditoria_programa_plan.auditoria_plan_proceso.filter(function (item, index, inputArray) {
                return inputArray.indexOf(item) == index;
            });
            // var documentos_list_filtrados = auditoria_programa_plan.documentos_list.filter(function (item, index, inputArray) {
            //     return inputArray.indexOf(item) == index && item.cantidad_responsables > 0;
            // });
            var procesos_correctos = [];
            if (procesos_seleccionados.length > 0) {
                if (auditoria_programa_plan.procesoAuditores.data.length > 0)
                    for (let i of auditoria_programa_plan.procesoAuditores.data) {
                        for (let j of procesos_seleccionados) {
                            if (!procesos_correctos.some(e => e.programa_plan == i.programa_plan && e.proceso == i.proceso)) {
                                if ((i.proceso == j && i.usuario)) {
                                    procesos_correctos.push(i)
                                }
                            }
                        }
                    };
            }
            return procesos_correctos.length === procesos_seleccionados.length;
        }
        return documentos_correctos.length === documentos_seleccionados.length;
    },
    auditoria_programa_plan.allow_autorize_audit = function () {
        var documentos_seleccionados = auditoria_programa_plan.auditoria_plan_documentos_asociados.filter(function (item, index, inputArray) {
            return inputArray.indexOf(item) == index;
        });
        var documentos_correctos = [];
        if (documentos_seleccionados.length > 0) {
            for (let i of auditoria_programa_plan.documentos_list) {
                for (let j of documentos_seleccionados) {
                    if (!documentos_correctos.some(e => e.programa_plan == i.programa_plan && e.proceso == i.proceso && e.documento_asociado == i.documento_asociado)) {
                        if ((i.documento_asociado == j) && (i.total_listas > 0)) {
                            documentos_correctos.push(i)
                        }
                    }
                }
            }
            ;
        }
        return documentos_correctos.length === documentos_seleccionados.length;
    }
    auditoria_programa_plan.allow_autorize_audit_view = function () {
        var documentos_seleccionados = auditoria_programa_plan.auditoria_plan_documentos_asociados_view.filter(function (item, index, inputArray) {
            return inputArray.indexOf(item) == index;
        });
        var documentos_correctos = [];
        if (documentos_seleccionados.length > 0) {
            for (let i of auditoria_programa_plan.documentos_list_view) {
                for (let j of documentos_seleccionados) {
                    if (!documentos_correctos.some(e => e.programa_plan == i.programa_plan && e.proceso == i.proceso && e.documento_asociado == i.documento_asociado)) {
                        if ((i.documento_asociado == j) && (i.total_listas > 0)) {
                            documentos_correctos.push(i)
                        }
                    }
                }
            }
            ;
        }
        return documentos_correctos.length === documentos_seleccionados.length;
    }
    auditoria_programa_plan.change_message = function () {
        if (auditoria_programa_plan.auditoria_plan_documentos_asociados.length > 0 && auditoria_programa_plan.documentos_list.length > 0) {
            var documentos_seleccionados = [...new Set(auditoria_programa_plan.auditoria_plan_documentos_asociados)];
            var documentos_list = auditoria_programa_plan.documentos_list.slice();
            var documentos_correctos = documentos_list.filter(d => d.total_listas > 0 && d.total_listas == d.total_listas_trabajadas);
            auditoria_programa_plan.refreshAngular();
            return documentos_correctos.length === documentos_seleccionados.length;
        }
            return false;
    }
    auditoria_programa_plan.allow_save_procesos = function () {
        var procesos_seleccionados = [...new Set(auditoria_programa_plan.auditoria_plan_proceso)];
        var procesos_revisados = auditoria_programa_plan.my_procesos_list.filter(d => d.revisado === 1);
        return procesos_revisados.length === procesos_seleccionados.length ? true : false;
    }
    auditoria_programa_plan.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        VALIDATION.validate(auditoria_programa_plan, "nuevo_proceso", [{
            valid: true,
            message: MESSAGE.i('validations.Fieldisrequired'),
            type: VALIDATION.types.error,
            visible: false
        }]);
        VALIDATION.validate(auditoria_programa_plan, "nuevo_documento", [{
            valid: true,
            message: MESSAGE.i('validations.Fieldisrequired'),
            type: VALIDATION.types.error,
            visible: false
        }]);
        delete data.inserting.nuevo_proceso;
        delete data.inserting.nuevo_documento;
        if (auditoria_programa_plan.estatus > 1 && auditoria_programa_plan.auditores_lideres > 1) {
            SWEETALERT.show({
                type: 'error',
                message: `Sólo puede haber un Auditor Líder.`,
            });
            let buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
        } else if (auditoria_programa_plan.estatus > 1 && !auditoria_programa_plan.allow_save_documents()) {
            SWEETALERT.show({
                type: 'error',
                message: `Existen Documentos sin Auditores Responsables Asignados`,
            });
            let buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
        } else {
            data.inserting.observaciones = undefined;
            data.inserting.estatus = 1;
            data.inserting.elaborado_por = auditoria_programa_plan.session.usuario_id;
            data.inserting.elaborado_en = moment().format("YYYY-MM-DD HH:mm");
            resolve(true);
            auditoria_programa_plan.from_new = false;
            auditoria_programa_plan.from_edit = false;
        }
    });
    auditoria_programa_plan.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);

        delete data.updating.nuevo_proceso;
        delete data.updating.nuevo_documento;
        if (auditoria_programa_plan.from_new) {
            await AUDIT.LOG(AUDIT.ACTIONS.insert, auditoria_programa_plan.tableOrView ? auditoria_programa_plan.tableOrView : auditoria_programa_plan.modelName, data.updating);
            data.updating.elaborado_por = auditoria_programa_plan.session.usuario_id;
            data.updating.elaborado_en = moment().format("YYYY-MM-DD HH:mm");
        }
        delete data.updating.comentarios_auditor;
        if (auditoria_programa_plan.estatus_view) {
            auditoria_programa_plan.form.frominforme = true;
            if (auditoria_programa_plan.estatus == "5") {
                if (!auditoria_programa_plan.soylider && auditoria_programa_plan.soyparticipe) {
                    if (!stripHtml(auditoria_programa_plan.comentarios_auditor).replace('undefined', '')) {
                        SWEETALERT.show({
                            type: 'error',
                            message: `Favor de completar tu punto de vista como auditor para guardar.`,
                        });
                        resolve(false);
                        return false;
                    } else {
                        data.updating.comentoparticipante = 1;

                        let todosparti = await auditoria_programa_plan.todosparticiparon();
                        if (todosparti)
                            data.updating.estatus = 8;
                    }
                    auditoria_programa_plan.yocomente = await BASEAPI.firstp('auditoria_informe', {
                        limit: 0,
                        where: [
                            {
                                field: "auditoria",
                                value: auditoria_programa_plan.id
                            },
                            {
                                field: "creadopor",
                                value: auditoria_programa_plan.session.usuario_id
                            }
                        ]
                    });
                    if (auditoria_programa_plan.yocomente) {
                        await BASEAPI.updateallp('auditoria_informe', {
                            secuencia: parseInt(auditoria_programa_plan.yocomente.secuencia) + 1,
                            recomendaciones: auditoria_programa_plan.comentarios_auditor,
                            where: [{
                                field: "auditoria",
                                value: auditoria_programa_plan.id
                            }, {
                                field: "creadopor",
                                value: auditoria_programa_plan.session.usuario_id
                            }]
                        }, '', '');
                    } else
                        await BASEAPI.insertIDp('auditoria_informe', {
                            auditoria: auditoria_programa_plan.id,
                            fecha: "$now()",
                            creadoen: "$now()",
                            secuencia: "1",
                            creadopor: auditoria_programa_plan.session.usuario_id,
                            recomendaciones: auditoria_programa_plan.comentarios_auditor
                        }, '', '');
                }
            } else {
                if (stripHtml(auditoria_programa_plan.comentarios_auditor).replace('undefined', '')) {
                    data.updating.comentoparticipante = 1;
                }
            }
            if (auditoria_programa_plan.estatus == "5") {
                if (auditoria_programa_plan.soylider) {
                    if (!stripHtml(auditoria_programa_plan.recomendaciones).replace('undefined', '')) {
                        SWEETALERT.show({
                            type: 'error',
                            message: `Favor de completar las recomendaciones de mejora, sugerencias y comentarios finales para finalizar.`,
                        });
                        resolve(false);
                        return false;
                    } else {
                        auditoria_programa_plan.comentolider = 1;
                    }
                }

            } else {
                if (stripHtml(auditoria_programa_plan.recomendaciones).replace('undefined', '')) {
                    data.updating.comentolider = 1;
                }
            }
            resolve(true);
        }
        var auditores_sin_rol = false;
        if (auditoria_programa_plan.auditoria_plan_responsable) {
            if (auditoria_programa_plan.auditoria_plan_responsable.length > 0) {
                var auditores_seleccionados = auditoria_programa_plan.auditoria_plan_responsable.filter(function (item, index, inputArray) {
                    return inputArray.indexOf(item) == index;
                });
            }
        }
        if (auditoria_programa_plan.ROLROWS && auditores_seleccionados) {
            if (auditoria_programa_plan.ROLROWS.length !== auditores_seleccionados.length) {
                auditores_sin_rol = true;
            }
        }
        delete data.updating.observaciones;
        if (auditoria_programa_plan.estoyenelview.indexOf('work') === -1) {
            if (auditoria_programa_plan.auditores_lideres > 1) {
                SWEETALERT.show({
                    type: 'error',
                    message: `Sólo puede haber un Auditor Líder.`,
                });
                let buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
            }
        }
        if (data.updating.estatus == 3) {
            data.updating.autorizado_por = auditoria_programa_plan.session.usuario_id;
            data.updating.autorizado_en = moment().format("YYYY-MM-DD HH:mm");
        }
        if (auditoria_programa_plan.estatus > 1 && auditoria_programa_plan.estatus < 5) {
            if ((!auditoria_programa_plan.allow_save_documents() || auditoria_programa_plan.auditoria_plan_documentos_asociados.length == 0) && auditores_sin_rol) {
                SWEETALERT.show({
                    type: 'error',
                    message: `Cada Auditor participante debe tener un Rol definido y todos los DOCUMENTOS seleccionados deben tener Auditores Responsables Asignados`,
                });
                resolve(false);
            } else if (!auditoria_programa_plan.allow_save_documents() || auditoria_programa_plan.auditoria_plan_documentos_asociados.length == 0) {
                SWEETALERT.show({
                    type: 'error',
                    message: `Todos los DOCUMENTOS seleccionados deben tener Auditores Responsables Asignados`,
                });
                resolve(false);
            } else if (!auditoria_programa_plan.allow_autorize_audit() && auditoria_programa_plan.estatus == 3) {
                SWEETALERT.show({
                    type: 'error',
                    message: `Todos los DOCUMENTOS seleccionados deben tener definida la Lista de Verificación que será auditada`,
                });
                resolve(false);
            } else if (auditores_sin_rol && auditoria_programa_plan.estatus < 4) {
                SWEETALERT.show({
                    type: 'error',
                    message: `Cada Auditor participante debe tener un Rol definido`,
                });
                resolve(false);
            } else if (auditoria_programa_plan.auditores_lideres === 0 && auditoria_programa_plan.estatus < 4) {
                SWEETALERT.show({
                    type: 'error',
                    message: `Debe elegir al menos un Auditor cuyo rol sea Líder`,
                });
                resolve(false);
            } else {
                resolve(true);
            }
            let buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
        } else if (auditoria_programa_plan.estatus == 6) {
            if (!auditoria_programa_plan.allow_save_procesos()) {
                SWEETALERT.show({
                    type: 'error',
                    message: `Debe trabajar las listas de verificación de los Documentos a Auditar y Marcar como revisados los procesos`,
                });
                resolve(false);
            } else {
                resolve(true)
            }
            let buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
        } else {
            if (auditoria_programa_plan.from_new) {
                data.updating.estatus = 1;
            }
            resolve(true);
        }
    });
    auditoria_programa_plan.triggers.table.after.update_relation = async function (data) {
        //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        if (auditoria_programa_plan.form.frominforme) {

            delete auditoria_programa_plan.form.frominforme;
            return true;
        }
        if (data.updating.estatus < 4) {
            BASEAPI.list('auditoria_programa_plan_proceso', {
                limit: 0,
                where: [
                    {
                        field: "programa_plan",
                        value: auditoria_programa_plan.id
                    }
                ]
            }, function (result) {
                if (result.data.length > 0) {
                    let procesos = result.data;
                    procesos = procesos.filter(x => {
                        return x.usuario
                    })
                    for (let i of procesos) {
                        BASEAPI.list('vw_auditoria_programa_plan_documentos_asociados', {
                            limit: 0,
                            where: [
                                {
                                    field: "programa_plan",
                                    value: auditoria_programa_plan.id
                                },
                                {
                                    field: "proceso",
                                    value: i.proceso
                                }
                            ]
                        }, function (result) {
                            if (result.data.length > 0) {
                                var documentos = result.data;
                                var documentos_ids = [];
                                for (let j of documentos) {
                                    documentos_ids.push(j.id)
                                }
                                BASEAPI.deleteall('auditoria_programa_plan_documentos_asociados_responsables', [
                                    {
                                        field: "programa_plan_documentos_asociados",
                                        value: documentos_ids
                                    },
                                    {
                                        field: "usuario",
                                        value: i.usuario
                                    }
                                ], function (result) {
                                    if (result) {
                                        for (var k of documentos_ids) {
                                            BASEAPI.insert('auditoria_programa_plan_documentos_asociados_responsables', {
                                                usuario: i.usuario,
                                                programa_plan_documentos_asociados: k
                                            }, function (result) {
                                                console.log(result)
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
        auditoria_programa_plan.from_new = false;
        auditoria_programa_plan.from_edit = false;
    };
    auditoria_programa_plan.triggers.table.after.update = async function (data) {
        if (data.updating.estatus == 2) {
            var titulo_push = `La auditoría "${auditoria_programa_plan.nombre}" ha sido planificada.`
            var cuerpo_push = `Se ha planificado "${auditoria_programa_plan.nombre}" .`;
            var titulo_correo = `La auditoría "${auditoria_programa_plan.nombre}" ha sido planificada.`
            var cuerpo_correo = `Se ha planificado la auditoría "${auditoria_programa_plan.nombre}"`
            var list_auditores = await BASEAPI.listp('vw_auditoria_programa_plan_equipotrabajo', {
                limit: 0,
                where: [
                    {
                        "field": "programa_plan",
                        "value": auditoria_programa_plan.id
                    },
                    {
                        "field": "esresponsable",
                        "operator": "is not",
                        "value": "$null"
                    },
                ]
            });
            list_auditores = list_auditores.data;
            var auditores_tabla_data = await BASEAPI.listp('vw_documentos_asociados_view', {
                limit: 0,
                where: [
                    {
                        "field": "auditoria",
                        "value": auditoria_programa_plan.id
                    }
                ]
            });
            auditores_tabla_data = auditores_tabla_data.data;
            function_send_email_auditores_resposables(titulo_push, cuerpo_push, titulo_correo, cuerpo_correo, auditoria_programa_plan.session.compania_id, auditoria_programa_plan.session.institucion_id, 0, [17, 18], list_auditores, auditores_tabla_data)
        } else if (data.updating.estatus == 3) {
            var titulo_push = `La auditoría "${auditoria_programa_plan.nombre}" ha sido revisada y autorizada.`
            var cuerpo_push = `Se ha revisado y autorizado la auditoría "${auditoria_programa_plan.nombre}" .`;
            var titulo_correo = `La auditoría "${auditoria_programa_plan.nombre}" ha sido revisada y autorizada.`
            var cuerpo_correo = `Se ha revisado y autorizado la auditoría "${auditoria_programa_plan.nombre}"

Los auditores pueden proceder con la labor de ejecución de la misma haciendo la recolección de datos y sus evidencias.
Los auditores participantes en esta auditoría son:`
            var cuerpo_correo_2 = `Los participantes departamentales coordinen sus labores para estar listos cuando los auditores procedan a evaluar sus áreas.
Los participantes departamentales son:`
            var cuerpo_correo_3 = `Gracias`
            var list_auditores = await BASEAPI.listp('vw_auditoria_programa_plan_equipotrabajo', {
                limit: 0,
                where: [
                    {
                        "field": "programa_plan",
                        "value": auditoria_programa_plan.id
                    },
                    {
                        "field": "esresponsable",
                        "operator": "is not",
                        "value": "$null"
                    },
                ]
            });
            list_auditores = list_auditores.data;
            var list_participantes = await BASEAPI.listp('vw_auditoria_programa_plan_participantes', {
                limit: 0,
                where: [
                    {
                        "field": "programa_plan",
                        "value": auditoria_programa_plan.id
                    }
                ]
            });
            list_participantes = list_participantes.data;
            function_send_email_custom_group_with_list_auditoria_autorizada(titulo_push, cuerpo_push, titulo_correo, cuerpo_correo, auditoria_programa_plan.session.compania_id, auditoria_programa_plan.session.institucion_id, 0, [17, 18, 4], list_auditores, list_participantes, true, false, true, true, cuerpo_correo_2, cuerpo_correo_3)
        } else if (data.updating.estatus == 5) {
            var titulo_push = `La auditoría "${auditoria_programa_plan.nombre}" ha finalizado.`
            var cuerpo_push = `Ha finalizado la ejecución de la auditoría "${auditoria_programa_plan.nombre}".`;
            var titulo_correo = `La auditoría "${auditoria_programa_plan.nombre}" ha finalizado.`
            var cuerpo_correo = `Ha finalizado la ejecución de la auditoría "${auditoria_programa_plan.nombre}".`
            var list_auditores = await BASEAPI.listp('vw_auditoria_programa_plan_equipotrabajo', {
                limit: 0,
                where: [
                    {
                        "field": "programa_plan",
                        "value": auditoria_programa_plan.id
                    },
                    {
                        "field": "esresponsable",
                        "operator": "is not",
                        "value": "$null"
                    },
                ]
            });
            list_auditores = list_auditores.data;
            var list_participantes = await BASEAPI.listp('vw_auditoria_programa_plan_participantes', {
                limit: 0,
                where: [
                    {
                        "field": "programa_plan",
                        "value": auditoria_programa_plan.id
                    }
                ]
            });
            list_participantes = list_participantes.data;
            function_send_email_custom_group_with_list(titulo_push, cuerpo_push, titulo_correo, cuerpo_correo, auditoria_programa_plan.session.compania_id, auditoria_programa_plan.session.institucion_id, 18, [17, 4], list_auditores, list_participantes, false, false, false)
        } else if (data.updating.estatus == 6) {
            var titulo_push = `Finalización de Recolección de Datos de la auditoría "${auditoria_programa_plan.nombre}"`
            var cuerpo_push = `Ha finalizado la labor de recolección de datos para esta auditoría.`;
            var titulo_correo = `Finalización de Recolección de Datos de la auditoría "${auditoria_programa_plan.nombre}"`
            var cuerpo_correo = `Ha finalizado la labor de recolección de datos para esta auditoría, se debe proceder con el inicio de la creación del Informe Preliminar.`
            var list_auditores = await BASEAPI.listp('vw_auditoria_programa_plan_equipotrabajo', {
                limit: 0,
                where: [
                    {
                        "field": "programa_plan",
                        "value": auditoria_programa_plan.id
                    },
                    {
                        "field": "esresponsable",
                        "operator": "is not",
                        "value": "$null"
                    },
                    {
                        "field": "lider",
                        "value": 1
                    }
                ]
            });
            list_auditores = list_auditores.data;
            function_send_email_custom_group_with_list(titulo_push, cuerpo_push, titulo_correo, cuerpo_correo, auditoria_programa_plan.session.compania_id, auditoria_programa_plan.session.institucion_id, 18, [17, 4], list_auditores, null, true, false, false)
        }
        auditoria_programa_plan.from_new = false;
        auditoria_programa_plan.from_edit = false;
    }
    auditoria_programa_plan.get_date = function () {
        return LAN.datetime();
    }
    auditoria_programa_plan.export_informe = function (name) {
        // var fecha = LAN.datetime();
        // var url = $("#informe_preliminar").excelexportjs({
        //     containerid: "informe_preliminar",
        //     datatype: 'table',
        //     worksheetName: `Informe preliminar ${fecha}.xls`,
        //     returnUri: true
        // });
        // DOWNLOAD.excel(`Informe preliminar ${fecha}`, url);
        $("#informe_preliminar").printThis({
            importCSS: true,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    auditoria_programa_plan.openmodalField = function (value) {

        auditoria_programa_plan.modal.modalView("auditoria_programa/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Informe Preliminar`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'auditoria_programa'
            },
        });
    }
    auditoria_programa_plan.send_email_calidad = function (data_auditoria) {

        var titulo_push = `Se han definido todos los puntos de verificación de la auditoría: "${data_auditoria.nombre}"`
        var cuerpo_push = `Todos los documentos asociados a la auditoría: "${data_auditoria.nombre}" tienen sus puntos de verficación definidos. `;
        var titulo_correo = `Se han definido todos los puntos de verificación de la auditoría: "${data_auditoria.nombre}"`
        var cuerpo_correo = `Todos los documentos asociados a la auditoría: "${data_auditoria.nombre}" tienen sus puntos de verficación definidos.

Los Supervisores y Anlistas de Calidad deben proceder a autorizar la auditoría.

Gracias`;
        SWEETALERT.confirm({
            message: "¿Desea enviar una notificación por correo a los supervisores y analistas de calidad?",
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing') + "..."})
                function_send_email_custom_group(titulo_push, cuerpo_push, titulo_correo, cuerpo_correo, auditoria_programa_plan.session.compania_id, auditoria_programa_plan.session.institucion_id, [17, 18], 4)
                SWEETALERT.show({
                    message: "La notificación ha sido enviada con exito", confirm: function () {
                        MODAL.close()
                    }
                })
            }
        });
    }
    auditoria_programa_plan.elsave = function (pre, post, close) {
        VALIDATION.validate(auditoria_programa_plan, "nuevo_proceso", [{
            valid: true,
            message: MESSAGE.i('validations.Fieldisrequired'),
            type: VALIDATION.types.error,
            visible: false
        }]);
        VALIDATION.validate(auditoria_programa_plan, "nuevo_documento", [{
            valid: true,
            message: MESSAGE.i('validations.Fieldisrequired'),
            type: VALIDATION.types.error,
            visible: false
        }]);
        auditoria_programa_plan.pages.form.save(pre,post,close)
    }
    // auditoria_programa_plan.exportPDF = function () {
    //     html2canvas(document.body).then(function(canvas) {
    //         document.body.appendChild(canvas);
    //     });
    // };
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //
    // });
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
