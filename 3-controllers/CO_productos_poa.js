app.controller("productos_poa", function ($scope, $http, $compile) {
    productos_poa = this;
    var session = new SESSION().current();
    var titulo_push = "";
    var cuerpo_push = "";
    var titulo = "";
    var cuerpo = "";
    productos_poa.session = session;
    productos_poa.datos_actividades = [];
    productos_poa.group_caracteristica = session.groups[0] ? session.groups[0].caracteristica : "";
    productos_poa.validar_departamento = true;
    productos_poa.modo_view_trabajar = false;
    productos_poa.insert_readonly = {};
    productos_poa.currentdate = moment().format("YYYY-MM-DD");
    productos_poa.paso = false;
    productos_poa.array_grupos = [];
    productos_poa.id_user_msj = [];
    productos_poa.correos_user_msj = [];
    productos_poa.poa_id = session.poa_id;
    productos_poa.show_export_tab = true;
    productos_poa.compania_id = session.compania_id;
    productos_poa.fixFilters = [
        {
            "field": "poa_id",
            "value": -1
        }
    ];
    productos_poa.lista_total_actividades = [];
    if (productos_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || productos_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
        productos_poa.departamento_list = eval(session.departamentos_y_secundarios);
        productos_poa.validar_departamento = false;
        productos_poa.insert_readonly = {poa: session.poa_id};
        productos_poa.fixFilters = [
            {
                "field": "poa_id",
                "value": session.poa_id
            },
            {
                "field": "id_departamento",
                "value": productos_poa.departamento_list
            }
        ];
        if (MODAL.history.length > 0) {
            if (typeof dashboard != "undefined") {
                if (dashboard) {
                    if (typeof dashboard !== 'not defined') {
                        if (dashboard.departamento > 0) {
                            productos_poa.fixFilters.push({
                                "field": "id_departamento",
                                "value": dashboard.departamento
                            });
                        }
                    }
                }
            }
            if (typeof notificacion != "undefined") {
                if (notificacion) {
                    if (typeof notificacion !== 'not defined') {
                        if (notificacion.departamento > 0) {
                            productos_poa.fixFilters.push({
                                "field": "id_departamento",
                                "value": notificacion.departamento
                            });
                        }
                    }
                }
            }
            if (typeof dashboard_presupuesto_barra != "undefined") {
                if (dashboard_presupuesto_barra) {
                    if (typeof dashboard_presupuesto_barra !== 'not defined') {
                        if (dashboard_presupuesto_barra.departamento > 0) {
                            productos_poa.fixFilters.push({
                                "field": "id_departamento",
                                "value": dashboard_presupuesto_barra.departamento
                            });
                        }
                    }
                }
            }
        }
    } else {
        productos_poa.insert_readonly = {poa: session.poa_id};
        if (!new SESSION().current().intersectorial) {
            productos_poa.fixFilters = [{
                "field": "poa_id",
                "value": session.poa_id
            }];
        } else {
            productos_poa.fixFilters = [];
        }
        if (MODAL.history.length > 0) {
            if (typeof dashboard != "undefined") {
                if (dashboard) {
                    if (typeof dashboard !== 'not defined') {
                        if (dashboard.departamento > 0) {
                            productos_poa.fixFilters = [];
                            productos_poa.fixFilters.push({
                                "field": "id_departamento",
                                "value": dashboard.departamento
                            });
                        }
                    }
                }
            }
            if (typeof notificacion != "undefined") {
                if (notificacion) {
                    if (typeof notificacion !== 'not defined') {
                        if (notificacion.departamento > 0) {
                            productos_poa.fixFilters = [];
                            productos_poa.fixFilters.push({
                                "field": "id_departamento",
                                "value": notificacion.departamento
                            });
                        }
                    }
                }
            }
            if (typeof dashboard_presupuesto_barra != "undefined") {
                if (dashboard_presupuesto_barra) {
                    if (typeof dashboard_presupuesto_barra !== 'not defined') {
                        if (dashboard_presupuesto_barra.departamento > 0) {
                            productos_poa.fixFilters = [];
                            productos_poa.fixFilters.push({
                                "field": "id_departamento",
                                "value": dashboard_presupuesto_barra.departamento
                            });
                        }
                    }
                }
            }
        }
    }

    if (MODAL.history.length > 0) {
        if (typeof dashboard_cofiguration != "undefined") {
            if (dashboard_cofiguration) {
                if (typeof dashboard_cofiguration !== 'not defined') {
                    if (!productos_poa.paso) {
                        productos_poa.fixFilters = [];
                        if (dashboard_cofiguration.Mproductos == "planificadas") {
                            productos_poa.base = [
                                {
                                    "open": "(",
                                    "field": "poa_id",
                                    "value": dashboard_cofiguration.dashboardPoa
                                },
                                {
                                    "field": "id_departamento",
                                    "value": session.departamento
                                },
                                {
                                    "field": "fecha inicio",
                                    "operator": ">",
                                    "value": productos_poa.currentdate,
                                    "close": ")"
                                },
                            ];
                            productos_poa.fixFilters = productos_poa.base.concat(dashboard_cofiguration.global_template);
                        }
                        if (dashboard_cofiguration.Mproductos == "en ejecución") {
                            productos_poa.base = [
                                {
                                    "open": "(",
                                    "field": "poa_id",
                                    "value": dashboard_cofiguration.dashboardPoa
                                },
                                {
                                    "field": "id_departamento",
                                    "value": session.departamento
                                },
                                {
                                    "field": "fecha inicio",
                                    "operator": "<=",
                                    "value": productos_poa.currentdate
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ NOT IN (${ENUM_2.productos_estatus.Completado}, ${ENUM_2.productos_estatus.Cancelada})`,
                                    "close": ")"
                                }
                            ];
                            productos_poa.fixFilters = productos_poa.base.concat(dashboard_cofiguration.global_template);
                        }
                        if (dashboard_cofiguration.Mproductos == "detenidas") {
                            productos_poa.base = [
                                {
                                    "open": "(",
                                    "field": "poa_id",
                                    "value": dashboard_cofiguration.dashboardPoa
                                },
                                {
                                    "field": "id_departamento",
                                    "value": session.departamento
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Detenido})`,
                                    "close": ")"
                                }
                            ];
                            productos_poa.fixFilters = productos_poa.base.concat(dashboard_cofiguration.global_template);
                        }
                        if (dashboard_cofiguration.Mproductos == "vencidas") {
                            productos_poa.base = [
                                {
                                    "open": "(",
                                    "field": "poa_id",
                                    "value": dashboard_cofiguration.dashboardPoa
                                },
                                {
                                    "field": "id_departamento",
                                    "value": session.departamento
                                },
                                {
                                    "field": "fecha fin",
                                    "operator": "<",
                                    "value": productos_poa.currentdate
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ NOT IN (${ENUM_2.productos_estatus.Completado}, ${ENUM_2.productos_estatus.Cancelada})`,
                                    "close": ")"
                                }
                            ];
                            productos_poa.fixFilters = productos_poa.base.concat(dashboard_cofiguration.global_template);
                        }
                        if (dashboard_cofiguration.Mproductos == "caceladas") {
                            productos_poa.base = [
                                {
                                    "open": "(",
                                    "field": "poa_id",
                                    "value": dashboard_cofiguration.dashboardPoa
                                },
                                {
                                    "field": "id_departamento",
                                    "value": session.departamento
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Cancelada})`,
                                    "close": ")"
                                }
                            ];
                            productos_poa.fixFilters = productos_poa.base.concat(dashboard_cofiguration.global_template);
                        }
                        if (dashboard_cofiguration.Mproductos == "completadas") {
                            productos_poa.base = [
                                {
                                    "open": "(",
                                    "field": "poa_id",
                                    "value": dashboard_cofiguration.dashboardPoa
                                },
                                {
                                    "field": "id_departamento",
                                    "value": session.departamento
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Completado})`,
                                    "close": ")"
                                }
                            ];
                            productos_poa.fixFilters = productos_poa.base.concat(dashboard_cofiguration.global_template);
                        }

                        productos_poa.paso = true;
                    }
                }
            }
        }
        if (typeof dashboard != "undefined") {
            if (dashboard) {
                if (typeof dashboard !== 'not defined') {
                    if (!productos_poa.paso) {
                        productos_poa.fixFilters = [];
                        if (dashboard.Mproductos == "sin información") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": -1
                                }
                            ];
                        }
                        if (dashboard.Mproductos == " ") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": dashboard./**/poabushin
                                }
                            ];
                            if (dashboard.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": dashboard.departamento
                                });
                        }
                        if (dashboard.Mproductos == "planificados") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": dashboard./**/poabushin
                                },
                                {
                                    "field": "fecha inicio",
                                    "operator": ">",
                                    "value": productos_poa.currentdate
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Abierto})`
                                },
                            ];
                            if (dashboard.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": dashboard.departamento
                                });
                        }
                        if (dashboard.Mproductos == "en ejecución") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": dashboard./**/poabushin
                                },
                                {
                                    "field": "fecha inicio",
                                    "operator": "<=",
                                    "value": productos_poa.currentdate
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Abierto})`
                                },
                            ];
                            if (dashboard.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": dashboard.departamento
                                });
                        }
                        if (dashboard.Mproductos == "detenidos") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": dashboard./**/poabushin
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Detenido})`
                                }
                            ];
                            if (dashboard.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": dashboard.departamento
                                });
                        }
                        if (dashboard.Mproductos == "vencidos") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": dashboard./**/poabushin
                                },
                                {
                                    "field": "fecha fin",
                                    "operator": "<",
                                    "value": productos_poa.currentdate
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Abierto})`
                                },
                            ];
                            if (dashboard.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": dashboard.departamento
                                });
                        }
                        if (dashboard.Mproductos == "cancelados") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": dashboard./**/poabushin
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Cancelada})`
                                }
                            ];
                            if (dashboard.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": dashboard.departamento
                                });
                        }
                        if (dashboard.Mproductos == "completados") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": dashboard./**/poabushin
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Completado})`
                                }
                            ];
                            if (dashboard.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": dashboard.departamento
                                });
                        }
                        if (dashboard.institucion_object.tipo === "i") {
                            productos_poa.fixFilters.push({
                                "field": "institucion",
                                "value": dashboard.institucion
                            });
                            productos_poa.fixFilters.push({
                                "field": "compania",
                                "value": "$compania"
                            });
                        } else {
                            productos_poa.fixFilters.push({
                                "field": "compania",
                                "value": dashboard.institucion
                            });
                            productos_poa.fixFilters.push({
                                "field": "institucion",
                                "operator": "",
                                "value": "$ is NULL"
                            });
                        }
                        productos_poa.paso = true;
                    }
                }
            }
        }
        if (typeof notificacion != "undefined") {
            if (notificacion) {
                if (typeof notificacion !== 'not defined') {
                    if (!productos_poa.paso) {
                        productos_poa.fixFilters = [];
                        if (notificacion.Mproductos == "sin información") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": -1
                                }
                            ];
                        }
                        if (notificacion.Mproductos == " ") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": notificacion./**/poabushin
                                }
                            ];
                            if (notificacion.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": notificacion.departamento
                                });
                        }
                        if (notificacion.Mproductos == "planificados") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": notificacion./**/poabushin
                                },
                                {
                                    "field": "fecha inicio",
                                    "operator": ">",
                                    "value": productos_poa.currentdate
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Abierto})`
                                },
                            ];
                            if (notificacion.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": notificacion.departamento
                                });
                        }
                        if (notificacion.Mproductos == "en ejecución") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": notificacion./**/poabushin
                                },
                                {
                                    "field": "fecha inicio",
                                    "operator": "<=",
                                    "value": productos_poa.currentdate
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Abierto})`
                                },
                            ];
                            if (notificacion.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": notificacion.departamento
                                });
                        }
                        if (notificacion.Mproductos == "detenidos") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": notificacion./**/poabushin
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Detenido})`
                                }
                            ];
                            if (notificacion.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": notificacion.departamento
                                });
                        }
                        if (notificacion.Mproductos == "vencidos") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": notificacion./**/poabushin
                                },
                                {
                                    "field": "fecha fin",
                                    "operator": "<",
                                    "value": productos_poa.currentdate
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Abierto})`
                                },
                            ];
                            if (notificacion.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": notificacion.departamento
                                });
                        }
                        if (notificacion.Mproductos == "cancelados") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": notificacion./**/poabushin
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Cancelada})`
                                }
                            ];
                            if (notificacion.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": notificacion.departamento
                                });
                        }
                        if (notificacion.Mproductos == "completados") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": notificacion./**/poabushin
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Completado})`
                                }
                            ];
                            if (notificacion.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": notificacion.departamento
                                });
                        }
                        if (notificacion.institucion_object.tipo === "i") {
                            productos_poa.fixFilters.push({
                                "field": "institucion",
                                "value": notificacion.institucion
                            });
                            productos_poa.fixFilters.push({
                                "field": "compania",
                                "value": "$compania"
                            });
                        } else {
                            productos_poa.fixFilters.push({
                                "field": "compania",
                                "value": notificacion.institucion
                            });
                            productos_poa.fixFilters.push({
                                "field": "institucion",
                                "operator": "",
                                "value": "$ is NULL"
                            });
                        }
                        productos_poa.paso = true;
                    }
                }
            }
        }
        if (typeof dashboard_presupuesto_barra != "undefined") {
            if (dashboard_presupuesto_barra) {
                if (typeof dashboard_presupuesto_barra !== 'not defined') {
                    if (!productos_poa.paso) {
                        productos_poa.fixFilters = [];
                        if (dashboard_presupuesto_barra.Mproductos == "planificados") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": session.estado ? session.poa_id : 0
                                },
                                {
                                    "field": "fecha inicio",
                                    "operator": ">",
                                    "value": productos_poa.currentdate
                                },
                            ];
                            if (dashboard_presupuesto_barra.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": dashboard_presupuesto_barra.departamento
                                });
                        }
                        if (dashboard_presupuesto_barra.Mproductos == "en ejecución") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": session.estado ? session.poa_id : 0
                                },
                                {
                                    "field": "fecha inicio",
                                    "operator": "<=",
                                    "value": productos_poa.currentdate
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ NOT IN (${ENUM_2.productos_estatus.Completado})`
                                },
                            ];
                            if (dashboard_presupuesto_barra.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": dashboard_presupuesto_barra.departamento
                                });
                        }
                        if (dashboard_presupuesto_barra.Mproductos == "vencidos") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": session.estado ? session.poa_id : 0
                                },
                                {
                                    "field": "fecha fin",
                                    "operator": "<",
                                    "value": productos_poa.currentdate
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ NOT IN (${ENUM_2.productos_estatus.Completado})`
                                }
                            ];
                            if (dashboard_presupuesto_barra.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": dashboard_presupuesto_barra.departamento
                                });
                        }
                        if (dashboard_presupuesto_barra.Mproductos == "completados") {
                            productos_poa.fixFilters = [
                                {
                                    "field": "poa_id",
                                    "value": session.estado ? session.poa_id : 0
                                },
                                {
                                    "field": "estado_producto_id",
                                    "operator": "",
                                    "value": `$ IN (${ENUM_2.productos_estatus.Completado})`
                                }
                            ];
                            if (dashboard_presupuesto_barra.departamento > 0)
                                productos_poa.fixFilters.push({
                                    "field": "id_departamento",
                                    "value": dashboard_presupuesto_barra.departamento
                                });
                        }
                        productos_poa.paso = true;
                    }
                }
            }
        }
    }
    RUNCONTROLLER("productos_poa", productos_poa, $scope, $http, $compile);


    TRIGGER.run(productos_poa);
    getPOAstatus(productos_poa, session.poa_id);
    productos_poa.triggers.table.after.load = async function (record) {
        if (MODAL.history.length > 0) {
            $('.icon-plus-circle2 ').parent().hide();
        } else {
            if (session.presupuesto_id === null)
                $('#productos_poa .icon-plus-circle2 ').parent().hide();
        }
        productos_poa.runMagicOneToMany('actividades', 'actividades_poa', 'producto', 'nombre', 'id');
        productos_poa.runMagicOneToMany('indicadores', 'indicador_poa', 'producto', 'nombre', 'id');
        // productos_poa.runMagicManyToMany('involucrado', "involucrados", "producto", "id", 'nombre_completo', "prudcto_involucrado", "involucrado", "id");
        await productos_poa.check_poa();
        // await productos_poa.check_departamentos();
        check_poa_close(productos_poa, session);
    };
    productos_poa.check_actividades = async function () {
        if (productos_poa.id) {
            productos_poa.lista_actividades_erroenas = await BASEAPI.listp('actividades_poa', {
                limit: 0,
                where: [
                    {
                        'open': "(",
                        'field': 'fecha_inicio',
                        'operator': '<',
                        'value': moment(productos_poa.fecha_inicio).format('YYYY-MM-DD'),
                        'connector': 'OR'
                    },
                    {
                        'field': 'fecha_fin',
                        'operator': '>',
                        'value': moment(productos_poa.fecha_fin).format('YYYY-MM-DD'),
                        'close': ")"
                    },
                    {
                        'open': "(",
                        'field': 'poa',
                        'value': session.poa_id
                    },
                    {
                        'field': 'producto',
                        'value': productos_poa.id,
                        'close': ")"
                    }
                ]
            });
            productos_poa.refreshAngular();
        }
    };
    productos_poa.get_all_actividades = function () {
        BASEAPI.list('actividades_poa', {
            limit: 0,
            where: [
                {
                    'field': 'poa',
                    'value': session.poa_id
                },
                {
                    'field': 'producto',
                    'value': productos_poa.id,
                }
            ]
        }, function (result) {
            productos_poa.lista_total_actividades = result.data;
        });
        productos_poa.refreshAngular();
    };
    productos_poa.check_poa = function () {
        if (session.est_poa == 5 ){
            $('#productos_poa .icon-plus-circle2 ').parent().hide();
            return;
        }
        BASEAPI.list("vw_poa", {
            where: [
                {
                    field: "id",
                    value: session.poa_id
                }
            ]
        }, function (results) {
            productos_poa.poa_activo = results.data[0].activo;
        });
        if (productos_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || productos_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            BASEAPI.list("vw_presupuesto_aprobado", {
                where: [
                    {
                        field: "poa",
                        value: session.poa_id
                    },
                    {
                        field: 'departamento_id',
                        value: productos_poa.departamento_list
                    }
                ]
            }, function (res) {
                productos_poa.dpto_usuario = res.data.length;
                productos_poa.dpto_usuario_autorizado = res.data.filter(d => {
                    return d.id_estatus === ENUM_2.presupuesto_estatus.Completo || d.id_estatus === ENUM_2.presupuesto_estatus.Trabajado
                }).length;
                productos_poa.refreshAngular();
                if (typeof megaconsulta != "undefined") {
                    if (megaconsulta) {
                        if (typeof megaconsulta !== 'not defined') {
                            if (MODAL.history.length > 0) {
                                $('.icon-plus-circle2 ').parent().hide();
                            } else {
                                if (CRUD_productos_poa.table.options[0].menus.length == 0) {
                                    $('#productos_poa .icon-plus-circle2 ').parent().hide();
                                } else {
                                    $('#productos_poa .icon-plus-circle2 ').parent().show();
                                }
                            }
                        }
                    }
                }
                if (MODAL.history.length > 0) {
                    $('.icon-plus-circle2 ').parent().hide();
                } else {
                    if (productos_poa.dpto_usuario != productos_poa.dpto_usuario_autorizado) {
                        $('.icon-plus-circle2 ').parent().show();
                        productos_poa.setPermission("edit", true);
                        productos_poa.setPermission("remove", true);
                    } else {
                        $('.icon-plus-circle2 ').parent().hide();
                        productos_poa.setPermission("edit", false);
                        productos_poa.setPermission("remove", false);
                    }
                }
                // console.log(res.data.length);
            });
        } else {
            // console.log("no me cumplí");
            BASEAPI.list("vw_departamento_not_exists_presupuesto", {
                limit: 0,
                where: [
                    {
                        field: "poa",
                        value: session.poa_id
                    }
                ]
            }, async function (res) {
                productos_poa.total_departamentos = res.data.length;
                // console.log(productos_poa.total_departamentos);
                productos_poa.refreshAngular();
                BASEAPI.list("vw_presupuesto_departamento", {
                    limit: 0,
                    where: [
                        {
                            field: "poa",
                            value: session.poa_id
                        },
                        {
                            field: 'estatus',
                            value: ENUM_2.presupuesto_estatus.Completo
                        }
                    ]
                }, async function (res) {
                    productos_poa.departamentos_autorizados = res.data.length;
                    productos_poa.refreshAngular();
                    if (typeof megaconsulta != "undefined") {
                        if (megaconsulta) {
                            if (typeof megaconsulta !== 'not defined') {
                                if (MODAL.history.length > 0) {
                                    $('.icon-plus-circle2 ').parent().hide();
                                } else {
                                    if (CRUD_productos_poa.table.options[0].menus.length == 0) {
                                        $('#productos_poa .icon-plus-circle2 ').parent().hide();
                                    } else {
                                        $('#productos_poa .icon-plus-circle2 ').parent().show();
                                    }
                                }
                            }
                        }
                    }
                    // console.log(productos_poa.total_departamentos, productos_poa.departamentos_autorizados);
                    if (productos_poa.total_departamentos == productos_poa.departamentos_autorizados) {
                        await productos_poa.check_departamentos();
                    } else {
                        await productos_poa.check_departamentos();
                    }
                });
            });
        }
    };
    productos_poa.anadirComentario = (data) => new Promise((resolve, reject) => {
        if (productos_poa.comentario == "") {
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        } else {
            BASEAPI.insertp('comentarios',
                {
                    "comentario": productos_poa.comentario,
                    "type": 6,
                    "created_by": session.usuario_id,
                    "value2": productos_poa.id,
                    "value": productos_poa.estado
                }).then(function (rs) {
                comentarios_productos_poa.refresh();
                productos_poa.comentario = "";
                productos_poa.refreshAngular();
                resolve(true);
            });
        }
    });
    productos_poa.check_departamentos = async function () {
        productos_poa.departamentos = await BASEAPI.listp('vw_departamento_not_exists_presupuesto', {
            limit: 0,
            where: [
                {
                    'field': 'estatus',
                    'operator': '!=',
                    'value': 3
                },
                {
                    'field': 'poa',
                    'value': productos_poa.poa_id
                },
                {
                    'field': 'compania',
                    'value': productos_poa.compania_id
                },
                {
                    'field': 'valor',
                    'operator': ">=",
                    'value': 0
                }
            ]
        });
        if (typeof presupuesto_aprobado != "undefined") {
            if (presupuesto_aprobado) {
                if (typeof presupuesto_aprobado !== 'not defined') {
                    presupuesto_aprobado.check_poa_close = undefined;
                }
            }
        }
        if (MODAL.history.length > 0) {
            $('.icon-plus-circle2 ').parent().hide();
        } else {
            if (productos_poa.departamentos.data.length == 0) {
                $('.icon-plus-circle2 ').parent().hide();
            } else {
                $('.icon-plus-circle2 ').parent().show();
            }
        }
    }

    productos_poa.plural = "Productos";
    productos_poa.singular = "Producto";

    var hasDashboard = false, hasDashboardConfig = false;
    if (typeof dashboard != "undefined") {
        if (dashboard) {
            if (typeof dashboard !== 'not defined') {
                hasDashboard = true;
            }
        }
    }
    if (typeof dashboard_cofiguration != "undefined") {
        if (dashboard_cofiguration) {
            if (typeof dashboard_cofiguration !== 'not defined') {
                hasDashboardConfig = true;
            }
        }
    }


    if (hasDashboard && dashboard.form.selected('poa')) {
        title_header_dashboard_table_poa(productos_poa, productos_poa.session.tipo_institucion == 1 ? MESSAGE.i('planificacion.titleProductos') : "Proyecto/Plan de Acción", dashboard.form.selected('poa').periodo_poa);
    } else if (hasDashboardConfig && dashboard_cofiguration.form.selected('vw_dashboard_poas')) {
        title_header_dashboard_table_poa(productos_poa, productos_poa.session.tipo_institucion == 1 ? MESSAGE.i('planificacion.titleProductos') : "Proyecto/Plan de Acción", dashboard_cofiguration.form.selected('vw_dashboard_poas').periodo_poa);
    } else {
        title_header_table_poa(productos_poa, productos_poa.session.tipo_institucion == 1 ? MESSAGE.i('planificacion.titleProductos') : "Proyecto/Plan de Acción");
    }
    productos_poa.insert_products = async function () {
        var productos_estrategigos = await BASEAPI.listp('proyecto_item', {
            limit: 0,
            where: [
                {
                    field: "heredado",
                    operator: "is",
                    value: "$null"
                },
                {
                    field: "compania",
                    value: productos_poa.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": productos_poa.session.institucion_id ? "=" : "is",
                    "value": productos_poa.session.institucion_id ? productos_poa.session.institucion_id : "$null"
                }
            ]
        })
        if (productos_estrategigos.data.length > 0) {
            var template = ` Los siguientes Productos Estratégicos formarán parte de los Productos Operativos <br> <div style="text-align: center;"> <ul style="display: inline-block;text-align: left;">`;
            for (var i of productos_estrategigos.data) {
                template += `<li> <strong> ${i.nombre}</strong></li>`;
            }
            ;
            template += `</ul> </div> <p>Una vez estos sean envíados no se podrá deshacer esta acción</p> <p>¿Desea Proceder de todos modos?</p>`;
            SWEETALERT.confirm({
                message: template,
                confirm: async function () {
                    SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                    SERVICE.base_db.importProductos({compania: productos_poa.session.compania_id}, function (result) {
                        SWEETALERT.stop()
                        SWEETALERT.show({message: "Han sido transferidos los Proyectos/Productos Estratégicos de manera satisfactoria"})
                        productos_poa.refresh();
                    });
                }
            });
        } else {
            SWEETALERT.show({
                type: "error",
                message: "No existen Proyectos/Productos Estratégicos disponibles para ser transferidos"
            })
        }

    };
    productos_poa.formulary = function (data, mode, defaultData) {

        if (productos_poa !== undefined) {
            RUN_B("productos_poa", productos_poa, $scope, $http, $compile);
            productos_poa.form.titles = {
                new: productos_poa.session.tipo_institucion == 1 ? "Nuevo - " + MESSAGE.i('planificacion.titleProductoPOA') : " Nuevo - Proyecto/Plan de Acción",
                edit: productos_poa.session.tipo_institucion == 1 ? "Editar - " + `${MESSAGE.i('planificacion.titleProductoPOA')}` : "Editar - Proyecto/Plan de Acción",
                view: productos_poa.session.tipo_institucion == 1 ? "Ver ALL - " + `${MESSAGE.i('planificacion.titleProductoPOA')}` : "Ver - Proyecto/Plan de Acción"
            };
            productos_poa.no_repetir = true;

            productos_poa.selectQueries["resultado"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: session.estatus ? session.pei_id : 0
                }
            ];
            productos_poa.form.schemas.insert.comentario = FORM.schemasType.calculated;
            productos_poa.form.schemas.select = {};
            productos_poa.form.readonly = productos_poa.insert_readonly;

            // productos_poa.presupuesto_departamento = [];
            // BASEAPI.listp('presupuesto_aprobado', {
            //     limit:0,
            //     "where": [
            //         {
            //             "field": "poa",
            //             "value": session.estado ? session.poa_id : 0
            //         }
            //     ]
            // }).then(function (results) {
            //
            //     for (var pd of results.data) {
            //         productos_poa.presupuesto_departamento.push(pd.departamento);
            //     }
            //
            //     productos_poa.selectQueries["departamento"] = [
            //         {
            //             "field": "compania",
            //             "value": session.compania_id
            //         },
            //         {
            //             "field": "id",
            //             "value": productos_poa.presupuesto_departamento
            //         }
            //     ];
            //
            //     productos_poa.form.loadDropDown('departamento');
            //
            // });


            productos_poa.createForm(data, mode, defaultData);
            productos_poa.id = mode == 'new' ? undefined : productos_poa.id;
            productos_poa.old_estado = 0;
            productos_poa.siNo = 0;
            if (productos_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || productos_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                productos_poa.selectQueries["departamento"] = [
                    {
                        "field": "poa",
                        "value": productos_poa.poa_id
                    },
                    {
                        "field": "id",
                        "value": productos_poa.departamento_list
                    }
                ];
            } else {
                productos_poa.selectQueries["departamento"] = [
                    {
                        "field": "poa",
                        "value": productos_poa.poa_id
                    }
                ];
            }
            if (productos_poa.modo_view_trabajar) {
                productos_poa.selectQueries["estado"] = [
                    {
                        "field": "id",
                        "value": [ENUM_2.productos_estatus.Abierto, ENUM_2.productos_estatus.Detenido]
                    }
                ];
            }
            productos_poa.triggers.table.after.control = function (data) {
                console.log(data);
                productos_poa.get_all_actividades();
                if (mode !== 'new' && data === 'nombre')
                    productos_poa.isActivComplete();
                if (data === 'departamento') {
                    productos_poa.permitirChange();
                }
                if (mode !== 'new' && data == 'estado') {
                    productos_poa.old_estado = productos_poa.estado;
                    if (productos_poa.no_repetir) {
                        if (productos_poa.old_estado == ENUM_2.productos_estatus.Detenido.toString()) {
                            console.log("entres noooo 1.1 !!");
                            productos_poa.selectQueries["estado"] = [
                                {
                                    "field": "id",
                                    "value": [ENUM_2.productos_estatus.Abierto, ENUM_2.productos_estatus.Detenido]
                                }
                            ];
                            productos_poa.no_repetir = false;
                            productos_poa.form.loadDropDown('estado');
                            productos_poa.refreshAngular();
                        } else if (productos_poa.old_estado == ENUM_2.productos_estatus.Abierto.toString() && productos_poa.siNo == 0) {
                            if (!CONFIGCOMPANY.estatus_productoXactividades) {
                                productos_poa.selectQueries["estado"] = [
                                    {
                                        "field": "id",
                                        "value": [ENUM_2.productos_estatus.Abierto, ENUM_2.productos_estatus.Detenido, ENUM_2.productos_estatus.Cancelada, ENUM_2.productos_estatus.Completado]
                                    }
                                ];
                            } else {
                                if (productos_poa.lista_total_actividades.length > 0) {
                                    productos_poa.selectQueries["estado"] = [
                                        {
                                            "field": "id",
                                            "value": [ENUM_2.productos_estatus.Abierto, ENUM_2.productos_estatus.Detenido, ENUM_2.productos_estatus.Cancelada]
                                        }
                                    ];
                                } else {
                                    productos_poa.selectQueries["estado"] = [
                                        {
                                            "field": "id",
                                            "value": [ENUM_2.productos_estatus.Abierto, ENUM_2.productos_estatus.Detenido, ENUM_2.productos_estatus.Cancelada, ENUM_2.productos_estatus.Completado]
                                        }
                                    ];
                                }
                            }
                            productos_poa.no_repetir = false;
                            productos_poa.form.loadDropDown('estado');
                            productos_poa.refreshAngular();
                        } else if (productos_poa.modo_view_trabajar) {
                            console.log("entres !!");
                            productos_poa.selectQueries["estado"] = [
                                {
                                    "field": "id",
                                    "value": [ENUM_2.productos_estatus.Abierto, ENUM_2.productos_estatus.Detenido]
                                }
                            ];
                            productos_poa.no_repetir = false;
                            productos_poa.form.loadDropDown('estado');
                        }

                        if (productos_poa.group_caracteristica != ENUM_2.Grupos.analista_departamental && productos_poa.group_caracteristica != ENUM_2.Grupos.director_departamental) {
                            productos_poa.form.options.estado.disabled = false;
                            productos_poa.refreshAngular();
                        } else {
                            productos_poa.form.options.estado.disabled = false;
                            productos_poa.refreshAngular();
                        }
                    }
                }

                if (mode === 'new' && data == 'range_date') {
                    productos_poa.range_date = "";
                    var elano = new SESSION().current().periodo_poa;
                    var rango_minimo = moment().format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta") {
                        rango_minimo = moment(("01-02-" + moment().format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    }

                    var rango_maximo = moment(("01-01-" + moment().add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");

                    if (moment().format('YYYY') != elano) {
                        rango_minimo = moment(("01-02-" + elano)).add(-1, 'day').format("YYYY-MM-DD");
                        productos_poa.range_date_start(moment(("01-01-" + elano)));
                        productos_poa.range_date_end(moment(("01-01-" + elano)));
                        rango_maximo = moment(("01-01-" + (elano + 1))).add(-1, 'day').format("YYYY-MM-DD");
                    }

                    productos_poa.range_date_min(rango_minimo);
                    productos_poa.range_date_max(rango_maximo);
                    productos_poa.refreshAngular();
                }
                if (mode === 'edit' && data == 'range_date') {
                    var elano = new SESSION().current().periodo_poa;
                    var rango_minimo = moment().format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta") {
                        rango_minimo = moment(("01-02-" + moment().format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    }
                    var rango_maximo = moment(("01-01-" + moment().add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    if (moment().format('YYYY') != elano) {
                        rango_minimo = moment(("01-02-" + elano)).add(-1, 'day').format("YYYY-MM-DD");
                        // productos_poa.range_date_start(moment(("01-01-" + elano)));
                        // productos_poa.range_date_end(moment(("01-01-" + elano)));
                        rango_maximo = moment(("01-01-" + (elano + 1))).add(-1, 'day').format("YYYY-MM-DD");
                    }
                    productos_poa.range_date_min(rango_minimo);
                    productos_poa.range_date_max(rango_maximo);
                    productos_poa.refreshAngular();
                }
                if (mode === 'new' && data === 'estado') {
                    productos_poa.estado = ENUM_2.productos_estatus.Abierto.toString();
                    productos_poa.form.options.estado.disabled = true;
                    productos_poa.refreshAngular();
                }
                if (data === "involucrados") {
                    if (productos_poa.modo_view_trabajar) {
                        productos_poa.form.options.involucrados.disabled = true;
                    }
                }
                if (data === "nombre" && productos_poa.modo_view_trabajar) {
                    productos_poa.form.options.nombre.disabled = true;
                }
                if (data === "departamento" && productos_poa.modo_view_trabajar) productos_poa.form.options.departamento.disabled = true;
                if (data === "range_date" && productos_poa.modo_view_trabajar) productos_poa.form.options.fecha_inicio.disabled = true;
                if (data === "descripcion" && productos_poa.modo_view_trabajar) productos_poa.form.options.descripcion.disabled = true;
                if (data === "resultado" && productos_poa.modo_view_trabajar) productos_poa.form.options.resultado.disabled = true;
            };
            productos_poa.$scope.$watch('productos_poa.comentario', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(productos_poa, "comentario", rules);
            });
            productos_poa.$scope.$watch('productos_poa.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(productos_poa, "descripcion", rules);
            });
            productos_poa.$scope.$watch('productos_poa.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(productos_poa, "nombre", rules);
            });
            productos_poa.$scope.$watch('productos_poa.departamento', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(productos_poa, "departamento", rules);
                productos_poa.permitirChange();
            });
            productos_poa.$scope.$watch('productos_poa.fecha_inicio', function (value) {
                var rules = [];

                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(productos_poa, "fecha_inicio", rules)
            });
            productos_poa.$scope.$watch('productos_poa.fecha_fin', function (value) {
                // var rules = [];
                // rules.push(VALIDATION.general.required(value));
                // VALIDATION.validate(productos_poa, "fecha_fin", rules)
            });
            productos_poa.$scope.$watch('productos_poa.range_date', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                console.log("con lodo");
                VALIDATION.validate(productos_poa, "fecha_inicio", rules);
                VALIDATION.validate(productos_poa, "range_date", rules);
            });

            productos_poa.$scope.$watch('productos_poa.resultado', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(productos_poa, "resultado", rules)
            });
            productos_poa.$scope.$watch('productos_poa.involucrados', function (value) {
                var rules = [];
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(productos_poa, "involucrados", rules)
            });

            productos_poa.$scope.$watch('productos_poa.estado', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(productos_poa, "estado", rules);
                setTimeout(() => {
                    if ($(".dragonformfooter").length < 2) {
                        let btnformfooter = $('#btnformfooter');
                        let elment = FIXELEMENT.isScrolledIntoViewBottom(btnformfooter);
                        if (elment === true) {
                            $('.modal-body').prepend(productos_poa.returnBuild(btnformfooter.clone()));
                        }
                    }
                }, 1000);
            });

            productos_poa.triggers.table.after.open = async function (data) {
                BASEAPI.firstp('vw_productos_can_complete', {
                    where: [
                        {
                            field: "producto_id",
                            value: productos_poa.id
                        }
                    ]
                }).then(function (data) {
                    if (data) {
                        productos_poa.canStatus = ["4"];
                    } else {
                        productos_poa.canStatus = [];
                    }
                    productos_poa.refreshAngular();
                });
                productos_poa.canStatus = [];
                //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
            };
            productos_poa.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
                BASEAPI.first('presupuesto_aprobado', {
                    limit: 0,
                    "where": [
                        {
                            "field": "poa",
                            "value": session.poa_id
                        },
                        {
                            "field": "departamento",
                            "value": data.inserting.departamento
                        }
                    ]
                }, async function (result) {
                    if (result == undefined) {
                        SWEETALERT.show({message: `Este departamento no tiene un presupuesto asignado`});
                    } else {
                        resolve(true);
                    }
                });
            });
            productos_poa.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
                BASEAPI.list('actividades_poa', {
                    limit: 0,
                    where: [
                        {
                            'field': 'poa',
                            'value': session.poa_id
                        },
                        {
                            'field': 'tempid',
                            'value': productos_poa.actividades_poa,
                        }
                    ]
                }, function (result) {
                    productos_poa.lista_total_actividades_new = result.data;
                    productos_poa.presupuesto_actividades = 0;
                    for (var i in productos_poa.lista_total_actividades_new) {
                        productos_poa.presupuesto_actividades += LAN.money(productos_poa.lista_total_actividades_new[i].presupuesto).value;
                    }
                    if (productos_poa.departamento_object) {
                        if (productos_poa.departamento_object.presupuesto_restante < productos_poa.presupuesto_actividades) {
                            SWEETALERT.show({message: `Este proyecto/producto tiene actividades asignadas que sobrepasan el presupuesto asignado al departamento`});
                            let buttons = document.getElementsByClassName("btn btn-labeled");
                            for (var item of buttons) {
                                item.disabled = false;
                            }
                            resolve(false);
                            return;
                        }
                    }
                    resolve(true);
                });


                // if (productos_poa.lista_actividades_erroenas.data.length > 0) {
                //     var template = `Las actividades ya creadas del producto no estarían dentro del rango <br> <ul>`;
                //     for (var i of productos_poa.lista_actividades_erroenas.data) {
                //         template += ` <br> <li> <strong>Actividad:</strong> ${i.nombre} <br> <strong>Fecha inicio:</strong> ${LAN.date(i.fecha_inicio)} <br> <strong>Fecha fin:</strong> ${LAN.date(i.fecha_fin)} </li>`;
                //     }
                //     ;
                //     template += `</ul>`;
                //     // console.log(template);
                //     SWEETALERT.show({message: `${template}`});
                //     let buttons = document.getElementsByClassName("btn btn-labeled");
                //     for (var item of buttons) {
                //         item.disabled = false;
                //     }
                //     return;
                // } else {
                //     if (productos_poa.old_estado.toString() !== productos_poa.estado && productos_poa.estado !== '3') {
                //         productos_poa.anadirComentario().then(function (rs_c) {
                //             if (rs_c) {
                //                 resolve(true);
                //             } else {
                //                 SWEETALERT.show({message: `Debe añadir un comentario`});
                //             }
                //             let buttons = document.getElementsByClassName("btn btn-labeled");
                //             for (var item of buttons) {
                //                 item.disabled = false;
                //             }
                //             return;
                //         });
                //     } else {
                //         resolve(true);
                //     }
                // }
                // console.log(productos_poa.lista_actividades_erroenas.data.length);

            });
            //
            productos_poa.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
                productos_poa.datos_actividades = [];
                if (await productos_poa.alert_restante_insuficiente()) {
                    SWEETALERT.show({message: `Este proyecto/producto tiene actividades asignadas que sobrepasan el presupuesto asignado al departamento`});
                    let buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    return;
                }
                await productos_poa.check_actividades();
                if (productos_poa.lista_actividades_erroenas.data.length > 0) {
                    var template = `Las actividades ya creadas del producto no estarían dentro del rango <br> <ul>`;
                    for (var i of productos_poa.lista_actividades_erroenas.data) {
                        template += ` <br> <li> <strong>Actividad:</strong> ${i.nombre} <br> <strong>Fecha inicio:</strong> ${LAN.date(i.fecha_inicio)} <br> <strong>Fecha fin:</strong> ${LAN.date(i.fecha_fin)} </li>`;
                    }
                    ;
                    template += `</ul>`;
                    // console.log(template);
                    SWEETALERT.show({message: `${template}`});
                    let buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    return;
                } else {
                    if (productos_poa.old_estado.toString() !== productos_poa.estado && productos_poa.estado !== '3') {
                        productos_poa.anadirComentario().then(function (rs_c) {
                            if (rs_c) {
                                resolve(true);
                            } else {
                                SWEETALERT.show({message: `Debe añadir un comentario`});
                            }
                            let buttons = document.getElementsByClassName("btn btn-labeled");
                            for (var item of buttons) {
                                item.disabled = false;
                            }
                            return;
                        });
                    } else {
                        resolve(true);
                    }
                }
                // console.log(productos_poa.lista_actividades_erroenas.data.length);
            });
            productos_poa.form.after.update = async function (data) {
                productos_poa.array_grupos = [];
                productos_poa.id_user_msj = [];
                productos_poa.correos_user_msj = [];

                if (data.updating.estado != productos_poa.old_estado) {
                    if (productos_poa.estado === ENUM_2.productos_estatus.Detenido.toString()) {
                        titulo_push = `Producto "${data.updating.nombre}"  ha sido detenido `;
                        cuerpo_push = `Se ha detenido el producto "${data.updating.nombre}"`;

                        titulo = `Producto "${data.updating.nombre}"  ha sido detenido `;
                        cuerpo = `Se ha detenido el producto "${data.updating.nombre}"`;

                        function_send_email_group(titulo_push, cuerpo_push, titulo, cuerpo, session.compania_id, productos_poa.departamento, null, session.institucion_id);
                    }
                }
            };
            productos_poa.triggers.table.after.update = async function (data) {
                // await AUDIT.LOG(AUDIT.ACTIONS.update, "vw_productos_poa_detalles", {
                //     id: data.updating.where[0].value,
                //     Nombre: data.updating.nombre,
                //     descripción: data.updating.descripcion,
                //     estado: productos_poa.estado_object.nombre
                // });
                BASEAPI.updateall('actividades_poa', {
                    "departamento": productos_poa.departamento,
                    where: [
                        {
                            "field": "producto",
                            "value": productos_poa.id
                        }
                    ]
                }, function (result) {

                });
                if (productos_poa.estado == ENUM_2.productos_estatus.Detenido.toString()) {
                    BASEAPI.updateall('actividades_poa', {
                        "estatus": ENUM_2.actividad_poa_estatus.Detenida,
                        where: [
                            {
                                "field": "producto",
                                "value": productos_poa.id
                            },
                            {
                                "field": "estatus",
                                "value": ENUM_2.actividad_poa_estatus.Abierta
                            }
                        ]
                    }, function (result) {

                    });
                    BASEAPI.list('actividades_poa', {
                        limit: 0,
                        where: [
                            {
                                "field": "producto",
                                "value": productos_poa.id
                            },
                        ]
                    }, function (result) {
                        var listactividades = [];
                        for (var i of result.data) {
                            listactividades.push(i.id)
                        }
                        console.log(listactividades);
                        BASEAPI.updateall('actividades_apoyo', {
                            estatus: ENUM_2.actividad_apoyo_estatus.Detenida,
                            where: [
                                {
                                    field: 'actividades_poa',
                                    value: listactividades
                                },
                                {
                                    field: "estatus",
                                    value: ENUM_2.actividad_apoyo_estatus.Pendiente
                                }
                            ]
                        }, function (result) {
                            console.log(result.data)
                        })

                    });
                } else if (productos_poa.estado == ENUM_2.productos_estatus.Abierto.toString()) {
                    BASEAPI.updateall('actividades_poa', {
                        "estatus": ENUM_2.actividad_poa_estatus.Abierta,
                        where: [
                            {
                                "field": "producto",
                                "value": productos_poa.id
                            },
                            {
                                "field": "estatus",
                                "value": ENUM_2.actividad_poa_estatus.Detenida
                            }

                        ]
                    }, function (result) {

                    });
                    BASEAPI.list('actividades_poa', {
                        limit: 0,
                        where: [
                            {
                                "field": "producto",
                                "value": productos_poa.id
                            },
                        ]
                    }, function (result) {
                        var listactividades = [];
                        for (var i of result.data) {
                            listactividades.push(i.id)
                        }
                        BASEAPI.updateall('actividades_apoyo', {
                            estatus: ENUM_2.actividad_apoyo_estatus.Pendiente,
                            where: [
                                {
                                    field: 'actividades_poa',
                                    value: listactividades
                                },
                                {
                                    field: "estatus",
                                    value: ENUM_2.actividad_apoyo_estatus.Detenida
                                }
                            ]
                        }, function (result) {
                        })

                    });
                } else if (productos_poa.estado == ENUM_2.productos_estatus.Cancelada.toString()) {
                    BASEAPI.updateall('actividades_poa', {
                        "estatus": ENUM_2.actividad_poa_estatus.Cancelada,
                        where: [
                            {
                                "field": "producto",
                                "value": productos_poa.id
                            },
                            {
                                "field": "estatus",
                                "value": [ENUM_2.actividad_poa_estatus.Detenida, ENUM_2.actividad_poa_estatus.Abierta]
                            }

                        ]
                    }, function (result) {

                    });
                    BASEAPI.list('actividades_poa', {
                        limit: 0,
                        where: [
                            {
                                "field": "producto",
                                "value": productos_poa.id
                            },
                        ]
                    }, function (result) {
                        var listactividades = [];
                        for (var i of result.data) {
                            listactividades.push(i.id)
                        }
                        console.log(listactividades);
                        BASEAPI.updateall('actividades_apoyo', {
                            estatus: ENUM_2.actividad_apoyo_estatus.Cancelada,
                            where: [
                                {
                                    field: 'actividades_poa',
                                    value: listactividades
                                },
                                {
                                    field: "estatus",
                                    value: [ENUM_2.actividad_apoyo_estatus.Detenida, ENUM_2.actividad_apoyo_estatus.Pendiente]
                                }
                            ]
                        }, function (result) {
                            console.log(result.data)
                        })

                    });
                }
            };

        }
    };
    productos_poa.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        productos_poa.modo_view_trabajar = false;
    };
    productos_poa.isActivComplete = function () {
        BASEAPI.first('vw_get_cant_activ_prod', {
            where: [{
                field: "id",
                value: productos_poa.id
            }]
        }, function (result) {
            if (result.cantidad_completa > 0) {
                productos_poa.siNo = 1;
            } else {
                productos_poa.siNo = 0;
            }
        });
    };
    productos_poa.permitirChange = function () {
        // if (productos_poa.form)
        //     if (productos_poa.form.selected('departamento') != null) {
        //         if ((productos_poa.form.selected('departamento').estatus != ENUM_2.presupuesto_estatus.Completo) && productos_poa.form.mode != 'new') {
        //             productos_poa.form.options.estado.disabled = true;
        //             productos_poa.form.loadDropDown('estado');
        //         } else if (productos_poa.form.mode != 'new') {
        //             productos_poa.form.options.estado.disabled = false;
        //             productos_poa.form.loadDropDown('estado');
        //         }
        //     }
    };
    productos_poa.changeEstado = function (id) {
        BASEAPI.first('productos_poa', {
            where: [{
                field: 'id',
                value: id
            }]
        }, function (res) {
            if (res) {
                productos_poa.estado = res.estado.toString();
                productos_poa.form.loadDropDown('estado');
            }
        });
    };
    productos_poa.alert_restante_insuficiente = async function () {
        if (productos_poa.departamento_object) {
            productos_poa.actividades_asig_alDept = await BASEAPI.listp('actividades_poa', {
                limit: 0,
                where: [
                    {
                        'field': 'poa',
                        'value': productos_poa.session.poa_id
                    },
                    {
                        'field': 'departamento',
                        'value': productos_poa.departamento
                    },
                    {
                        'open': '(',
                        'field': 'producto',
                        'operator': 'is not',
                        'value': "$null",
                        'connector': 'OR'
                    },
                    {
                        'close': ')',
                        'field': 'tempid',
                        'value': productos_poa.actividades_poa
                    }
                ]
            });
            if (productos_poa.actividades_asig_alDept.data.length > 0) {
                productos_poa.presupuesto_actividades = 0;
                for (var i in productos_poa.actividades_asig_alDept.data) {
                    productos_poa.presupuesto_actividades += LAN.money(productos_poa.actividades_asig_alDept.data[i].presupuesto).value;
                }
                productos_poa.refreshAngular();
                return productos_poa.presupuesto_actividades > productos_poa.departamento_object.valor
            } else {
                productos_poa.actividades_asig_alprod = await BASEAPI.listp('actividades_poa', {
                    limit: 0,
                    where: [
                        {
                            'field': 'poa',
                            'value': productos_poa.session.poa_id
                        },
                        {
                            'open': '(',
                            'field': 'producto',
                            'value': productos_poa.id,
                            'connector': 'OR'
                        },
                        {
                            'close': ')',
                            'field': 'tempid',
                            'value': productos_poa.actividades_poa
                        }
                    ]
                });
                productos_poa.presupuesto_actividades = 0;

                for (var i in productos_poa.actividades_asig_alprod.data) {
                    productos_poa.presupuesto_actividades += LAN.money(productos_poa.actividades_asig_alprod.data[i].presupuesto).value;
                }
                productos_poa.refreshAngular();

                return productos_poa.presupuesto_actividades > productos_poa.departamento_object.valor
            }

        }
    }
});
