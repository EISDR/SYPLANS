app.controller("actividades_poa", function ($scope, $http, $compile) {
    //
    actividades_poa = this;
    actividades_poa.cargado = false;
    var paso = true;
    actividades_poa.currentdate = moment().format("YYYY-MM-DD");
    actividades_poa.pei = 0;
    actividades_poa.destroyForm = false;
    var session = new SESSION().current();
    var titulo_push = "";
    var cuerpo_push = "";
    var titulo = "";
    var cuerpo = "";
    var correo = "";
    actividades_poa.dont_show_productos = false;
    actividades_poa.show_export_tab = true;
    actividades_poa.poa_id = session.poa_id === null ? 0 : session.poa_id;
    actividades_poa.datos_actividades = [];
    actividades_poa.compania = session.compania_id;
    actividades_poa.session = session;
    actividades_poa.no_limpiar_fecha_change = false;
    actividades_poa.group_caracteristica = actividades_poa.session.groups[0] ? actividades_poa.session.groups[0].caracteristica : "";
    actividades_poa.director_general = ENUM_2.Grupos.director_general;
    actividades_poa.analista_de_planificacion = ENUM_2.Grupos.analista_de_planificacion;
    actividades_poa.solo_lectura = ENUM_2.Grupos.solo_lectura;
    actividades_poa.validar_responsable_actividades = false; // linea para ocultar departamento cuando se accede desde actividades
    actividades_poa.paso = false;
    actividades_poa.analista_departamental = ENUM_2.Grupos.analista_departamental;
    actividades_poa.director_departamental = ENUM_2.Grupos.director_departamental;
    actividades_poa.lista_act_apoyo_presupuesto = [];
    actividades_poa.no_trabaja_poa = function () {
        if (actividades_poa.group_caracteristica != actividades_poa.analista_departamental && actividades_poa.group_caracteristica != actividades_poa.director_departamental) {
            return true;
        } else {
            return false;
        }
    };
    actividades_poa.fixFilters = [
        {
            "field": "poa",
            "value": -1
        }];
    if (typeof productos_poa != "undefined") {
        if (typeof productos_poa !== 'not defined') {
            if (productos_poa) {
                if (paso) {
                    actividades_poa.fixFilters = [];
                }
                paso = false;
            }
        }
    }
    if (typeof dashboard_cofiguration != "undefined") {
        if (dashboard_cofiguration) {
            if (typeof dashboard_cofiguration !== 'not defined') {
                if (paso) {
                    actividades_poa.fixFilters = [];
                    if (dashboard_cofiguration.Mactividades == "planificadas") {
                        actividades_poa.base = [
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                            {
                                "open": "(",
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "departamento",
                                "value": session.departamento
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": ">",
                                "value": actividades_poa.currentdate,
                                "close": ")"
                            }
                        ];
                        actividades_poa.fixFilters = actividades_poa.base.concat(dashboard_cofiguration.global_template);
                    }
                    if (dashboard_cofiguration.Mactividades == "pendientes a ejecución") {
                        actividades_poa.base = [
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                            {
                                "open": "(",
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "departamento",
                                "value": session.departamento
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": "<=",
                                "value": actividades_poa.currentdate
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ not in (${ENUM_2.actividad_poa_estatus.Completada}, ${ENUM_2.actividad_poa_estatus.Cancelada}, ${ENUM_2.actividad_poa_estatus.Trabajada}, ${ENUM_2.actividad_poa_estatus.Detenida})`,
                                "close": ")"
                            }
                        ];
                        actividades_poa.fixFilters = actividades_poa.base.concat(dashboard_cofiguration.global_template);
                    }
                    if (dashboard_cofiguration.Mactividades == "en ejecución") {
                        actividades_poa.base = [
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                            {
                                "open": "(",
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "departamento",
                                "value": session.departamento
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Ejecucion}, ${ENUM_2.actividad_poa_estatus.Trabajada})`,
                                "close": ")"
                            }
                        ];
                        actividades_poa.fixFilters = actividades_poa.base.concat(dashboard_cofiguration.global_template);
                    }
                    if (dashboard_cofiguration.Mactividades == "detenidas") {
                        actividades_poa.base = [
                            {
                                "open": "(",
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "departamento",
                                "value": session.departamento
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Detenida})`,
                                "close": ")"
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        actividades_poa.fixFilters = actividades_poa.base.concat(dashboard_cofiguration.global_template);
                    }
                    if (dashboard_cofiguration.Mactividades == "vencidas") {
                        actividades_poa.base = [
                            {
                                "open": "(",
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "departamento",
                                "value": session.departamento
                            },
                            {
                                "field": "fecha_fin",
                                "operator": "<",
                                "value": actividades_poa.currentdate
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ not in (${ENUM_2.actividad_poa_estatus.Completada}, ${ENUM_2.actividad_poa_estatus.Cancelada})`,
                                "close": ")"
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        actividades_poa.fixFilters = actividades_poa.base.concat(dashboard_cofiguration.global_template);
                    }
                    if (dashboard_cofiguration.Mactividades == "canceladas") {
                        actividades_poa.base = [
                            {
                                "open": "(",
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "departamento",
                                "value": session.departamento
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Cancelada})`,
                                "close": ")"
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        actividades_poa.fixFilters = actividades_poa.base.concat(dashboard_cofiguration.global_template);
                    }
                    if (dashboard_cofiguration.Mactividades == "completadas") {
                        actividades_poa.base = [
                            {
                                "open": "(",
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "departamento",
                                "value": session.departamento
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Completada})`,
                                "close": ")"
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        actividades_poa.fixFilters = actividades_poa.base.concat(dashboard_cofiguration.global_template);
                    }
                    paso = false;
                }
            }
        }
    }
    if (typeof dashboard != "undefined") {
        if (typeof dashboard !== 'not defined') {
            if (dashboard) {
                if (paso) {
                    actividades_poa.fixFilters = [];
                    if (dashboard.Mactividades == " ") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard./**/poabushin
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard.departamento
                            });
                    }
                    if (dashboard.Mactividades == "planificados") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard./**/poabushin
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": ">",
                                "value": actividades_poa.currentdate
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ IN (${ENUM_2.actividad_poa_estatus.Abierta})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard.departamento
                            });
                    }
                    if (dashboard.Mactividades == "pendientes a ejecución" || dashboard.Mactividades == "pendientes") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard./**/poabushin
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": "<=",
                                "value": actividades_poa.currentdate
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ IN (${ENUM_2.actividad_poa_estatus.Abierta})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard.departamento
                            });
                    }
                    if (dashboard.Mactividades == "en ejecución") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard./**/poabushin
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ IN (${ENUM_2.actividad_poa_estatus.Ejecucion}, ${ENUM_2.actividad_poa_estatus.Trabajada})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard.departamento
                            });
                    }
                    if (dashboard.Mactividades == "detenidos") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard./**/poabushin
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Detenida})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard.departamento
                            });
                    }
                    if (dashboard.Mactividades == "vencidos") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard./**/poabushin
                            },
                            {
                                "field": "fecha_fin",
                                "operator": "<",
                                "value": actividades_poa.currentdate
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ IN (${ENUM_2.actividad_poa_estatus.Abierta}, ${ENUM_2.actividad_poa_estatus.Trabajada}, ${ENUM_2.actividad_poa_estatus.Ejecucion})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard.departamento
                            });
                    }
                    if (dashboard.Mactividades == "cancelados") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard./**/poabushin
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Cancelada})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard.departamento
                            });
                    }
                    if (dashboard.Mactividades == "completados") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard./**/poabushin
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "open": "(",
                                "close": ")",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Completada})  `
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        //OR act_apoyo_has_one_complete>0
                        if (dashboard.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard.departamento
                            });
                    }
                    if (dashboard.Mactividades == "ejecutado") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard./**/poabushin
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "=",
                                "value": ENUM_2.actividad_poa_estatus.Completada
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard.departamento
                            });
                    }
                    if (dashboard.Mactividades == "no ejecutado") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard./**/poabushin
                            },
                            {
                                "field": "presupuesto",
                                "operator": ">",
                                "value": `0`,
                                "open": "(",
                                'connector': 'AND'
                            },
                            {
                                "field": "presupuesto_consumido",
                                "operator": "=",
                                "value": `0`,
                                "close": ")",
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard.departamento
                            });
                    }
                    if (dashboard.institucion_object.tipo === "i") {
                        actividades_poa.fixFilters.push({
                            "field": "institucion",
                            "value": dashboard.institucion
                        });
                        actividades_poa.fixFilters.push({
                            "field": "compania",
                            "value": "$compania"
                        });
                    } else {
                        actividades_poa.fixFilters.push({
                            "field": "compania",
                            "value": dashboard.institucion
                        });
                        actividades_poa.fixFilters.push({
                            "field": "institucion",
                            "operator": "",
                            "value": "$ is NULL"
                        });
                    }
                    paso = false;
                }
            }
        }
    }
    if (typeof notificacion != "undefined") {
        if (typeof notificacion !== 'not defined') {
            if (notificacion) {
                if (paso) {
                    actividades_poa.fixFilters = [];
                    if (notificacion.Mactividades == " ") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion./**/poabushin || notificacion.poadd
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (notificacion.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": notificacion.departamento
                            });
                    }
                    if (notificacion.Mactividades == "planificados") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion./**/poabushin || notificacion.poadd
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": ">",
                                "value": actividades_poa.currentdate
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ IN (${ENUM_2.actividad_poa_estatus.Abierta})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (notificacion.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": notificacion.departamento
                            });
                    }
                    if (notificacion.Mactividades == "Pendiente a Ejecución") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion./**/poabushin || notificacion.poadd
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": "<=",
                                "value": actividades_poa.currentdate
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ IN (${ENUM_2.actividad_poa_estatus.Abierta})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (notificacion.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": notificacion.departamento
                            });
                    }
                    if (notificacion.Mactividades == "en ejecución") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion./**/poabushin || notificacion.poadd
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Ejecucion}, ${ENUM_2.actividad_poa_estatus.Trabajada})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (notificacion.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": notificacion.departamento
                            });
                    }
                    if (notificacion.Mactividades == "detenidos") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion./**/poabushin || notificacion.poadd
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Detenida})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (notificacion.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": notificacion.departamento
                            });
                    }
                    if (notificacion.Mactividades == "vencidos") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion./**/poabushin || notificacion.poadd
                            },
                            {
                                "field": "fecha_fin",
                                "operator": "<",
                                "value": actividades_poa.currentdate
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ IN (${ENUM_2.actividad_poa_estatus.Abierta}, ${ENUM_2.actividad_poa_estatus.Trabajada}, ${ENUM_2.actividad_poa_estatus.Ejecucion})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (notificacion.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": notificacion.departamento
                            });
                    }
                    if (notificacion.Mactividades == "cancelados") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion./**/poabushin || notificacion.poadd
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Cancelada})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (notificacion.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": notificacion.departamento
                            });
                    }
                    if (notificacion.Mactividades == "completados") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion./**/poabushin || notificacion.poadd
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "open": "(",
                                "close": ")",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Completada})  `
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        //OR act_apoyo_has_one_complete>0
                        if (notificacion.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": notificacion.departamento
                            });
                    }
                    if (notificacion.Mactividades == "ejecutado") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion./**/poabushin || notificacion.poadd
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "=",
                                "value": ENUM_2.actividad_poa_estatus.Completada
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (notificacion.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": notificacion.departamento
                            });
                    }
                    if (notificacion.Mactividades == "no ejecutado") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion./**/poabushin || notificacion.poadd
                            },
                            {
                                "field": "presupuesto",
                                "operator": ">",
                                "value": `0`,
                                "open": "(",
                                'connector': 'AND'
                            },
                            {
                                "field": "presupuesto_consumido",
                                "operator": "=",
                                "value": `0`,
                                "close": ")",
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (notificacion.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": notificacion.departamento
                            });
                    }
                    if (notificacion.institucion_object.tipo === "i") {
                        actividades_poa.fixFilters.push({
                            "field": "institucion",
                            "value": notificacion.institucion
                        });
                        actividades_poa.fixFilters.push({
                            "field": "compania",
                            "value": "$compania"
                        });
                    } else {
                        actividades_poa.fixFilters.push({
                            "field": "compania",
                            "value": notificacion.institucion
                        });
                        actividades_poa.fixFilters.push({
                            "field": "institucion",
                            "operator": "",
                            "value": "$ is NULL"
                        });
                    }
                    paso = false;
                }
            }
        }
    }
    if (typeof dashboard_departamento != "undefined") {
        if (typeof dashboard_departamento !== 'not defined') {
            if (dashboard_departamento) {
                if (paso) {
                    actividades_poa.fixFilters = [];
                    if (dashboard_departamento.Mactividades == "completados") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard_departamento.poa
                            },
                            {
                                "field": "presupuesto_consumido",
                                "operator": ">",
                                "value": `0`
                            },
                            {
                                "field": "departamento",
                                "value": dashboard_departamento.departamento
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        //OR act_apoyo_has_one_complete>0
                    }
                    if (dashboard_departamento.Mactividades == "no ejecutado") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard_departamento.poa
                            },
                            {
                                "field": "presupuesto",
                                "operator": ">",
                                "value": `0`,
                                "open": "(",
                                'connector': 'AND'
                            },
                            {
                                "field": "presupuesto_consumido",
                                "operator": "=",
                                "value": `0`,
                                "close": ")",
                            },
                            {
                                "field": "departamento",
                                "value": dashboard_departamento.departamento
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                    }
                    paso = false;
                }
            }
        }
    }

    if (typeof dashboard_presupuesto_barra != "undefined") {
        if (typeof dashboard_presupuesto_barra !== 'not defined') {
            if (dashboard_presupuesto_barra) {
                if (paso) {
                    actividades_poa.fixFilters = [];
                    if (dashboard_presupuesto_barra.Mactividades == " ") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": session.estado ? session.poa_id : 0
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard_presupuesto_barra.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard_presupuesto_barra.departamento
                            });
                    }
                    if (dashboard_presupuesto_barra.Mactividades == "planificados") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": session.estado ? session.poa_id : 0
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": ">",
                                "value": actividades_poa.currentdate
                            }
                        ];
                        if (dashboard_presupuesto_barra.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard_presupuesto_barra.departamento
                            });
                    }
                    if (dashboard_presupuesto_barra.Mactividades == "en ejecución") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": session.estado ? session.poa_id : 0
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": "<=",
                                "value": actividades_poa.currentdate
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ not in (${ENUM_2.actividad_poa_estatus.Completada}, ${ENUM_2.actividad_poa_estatus.Cancelada})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard_presupuesto_barra.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard_presupuesto_barra.departamento
                            });
                    }
                    if (dashboard_presupuesto_barra.Mactividades == "vencidos") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": session.estado ? session.poa_id : 0
                            },
                            {
                                "field": "fecha_fin",
                                "operator": "<",
                                "value": actividades_poa.currentdate
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ not in (${ENUM_2.actividad_poa_estatus.Completada}, ${ENUM_2.actividad_poa_estatus.Cancelada})`
                            },
                        ];
                        if (dashboard_presupuesto_barra.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard_presupuesto_barra.departamento
                            });
                    }
                    if (dashboard_presupuesto_barra.Mactividades == "completados") {
                        actividades_poa.fixFilters = [
                            {
                                "field": "poa",
                                "value": session.estado ? session.poa_id : 0
                            },
                            {
                                "field": "estatus_actividad",
                                "operator": "",
                                "value": `$ in (${ENUM_2.actividad_poa_estatus.Completada}, ${ENUM_2.actividad_poa_estatus.Cancelada})`
                            },
                            {
                                "field": "tempid",
                                "operator": "is",
                                "value": "$null"
                            },
                        ];
                        if (dashboard_presupuesto_barra.departamento > 0)
                            actividades_poa.fixFilters.push({
                                "field": "departamento",
                                "value": dashboard_presupuesto_barra.departamento
                            });
                    }
                    paso = false;
                }
            }
        }
    }

    if (paso) {
        if (actividades_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || actividades_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            if (session.departamento) {
                actividades_poa.fixFilters = [];
                actividades_poa.fixFilters.push({
                    "field": "departamento",
                    "value": session.departamento
                });
                actividades_poa.fixFilters.push(
                    {
                        field: "poa",
                        value: actividades_poa.session.poa_id
                    },
                    {
                        "field": "tempid",
                        "operator": "is",
                        "value": "$null"
                    },
                );
            }
        } else {
            actividades_poa.fixFilters.push({
                field: "poa",
                value: actividades_poa.session.poa_id
            });
        }
    }


    TRIGGER.run(actividades_poa);
    getPOAstatus(actividades_poa, session.poa_id);
    actividades_poa.already = {
        check_active_POA: false,
        check_poa_close: false,
        check_poa: false,
    };
    actividades_poa.triggers.table.after.load = async function (record) {
        if (MODAL.history.length > 0) {
            $('.icon-plus-circle2 ').parent().hide();
            if (typeof productos_poa !== 'undefined') {
                if (typeof productos_poa !== 'not defined') {
                    if (productos_poa) {
                        if (productos_poa.modo_view_trabajar) {
                            $('.icon-plus-circle2 ').parent().hide();
                        } else {
                            actividades_poa.dont_show_productos = true;
                            $('.icon-plus-circle2 ').parent().show();
                        }
                    }
                }
            }
        } else {
            if (session.presupuesto_id === null) {
                $('.icon-plus-circle2 ').parent().hide();
            }
        }
        if (!actividades_poa.already.check_active_POA) {
            check_active_POA(session.poa_id);
            actividades_poa.already.check_active_POA = true;
        }
        if (!actividades_poa.already.check_poa) {
            actividades_poa.check_poa();
            actividades_poa.already.check_poa = true;
        }
        if (!actividades_poa.already.check_poa_close) {
            check_poa_close(actividades_poa, session);
            actividades_poa.already.check_poa_close = true;
        }
        actividades_poa.poa_id = session.poa_id === null ? 0 : session.poa_id;
        if (session.tipo_institucion !== ENUM_2.COMPANY_TYPE.publica) {
            CRUD_actividades_poa.table.filters.columns.splice(10, 3);
        }
        actividades_poa.runMagicOneToMany('actividades_apoyo', 'actividades_apoyo', 'actividades_poa', 'nombre', 'id');

        if (actividades_poa.session.maneja_pacc === 1) {
            if (!actividades_poa.cbslista) {
                actividades_poa.cbslista = await BASEAPI.listp('vw_bienes_servicio_large', {
                    limit: 0,
                    orderby: "id",
                    order: "asc",
                });
                actividades_poa.auxiliares = await BASEAPI.listp('catalogo_bienes_servicios_auxiliar', {
                    limit: 0,
                    orderby: "id",
                    order: "asc",
                });
                actividades_poa.cbslista = actividades_poa.cbslista.data;
                actividades_poa.auxiliares = actividades_poa.auxiliares.data;
            }
        }
        actividades_poa.check_poa();
        if (actividades_poa.filtros)
            actividades_poa.filtros.loadDropDown("departamentoPre", undefined, () => {
                actividades_poa.valor = LAN.money(actividades_poa.filtros.selected('departamentoPre').valor).format(false);
                actividades_poa.presupuesto_restantePre = LAN.money(actividades_poa.filtros.selected('departamentoPre').presupuesto_restante).format(false);
                actividades_poa.presupuesto_actividades = LAN.money(actividades_poa.filtros.selected('departamentoPre').presupuesto_actividades).format(false);
                actividades_poa.presupuesto_liberado = LAN.money(actividades_poa.filtros.selected('departamentoPre').presupuesto_liberado).format(false);
                actividades_poa.refreshAngular();
            });

    };
    actividades_poa.ausiliarSelect = (cbs) => {
        if (actividades_poa.session.maneja_pacc === 1) {
            let newarray = [];
            if (cbs)
                if (actividades_poa.auxiliares)
                    newarray = actividades_poa.auxiliares.filter(d => {
                        return d.materialid == cbs.idreal;
                    }).map(d => {
                        return d.cuenta_auxiliar;
                    });

            if (cbs)
                if (cbs.codigo_clasificador)
                    newarray.push(cbs.codigo_clasificador);
            if (cbs.codigo_clasificador2)
                newarray.push(cbs.codigo_clasificador2);
            return newarray;
        }
        return [];
    };
    actividades_poa.selectedRecord = {};
    actividades_poa.esapoyo = false;
    actividades_poa.cbslist = (apoyo) => {
        if (actividades_poa.session.maneja_pacc === 1) {
            actividades_poa.esapoyo = (apoyo === true);
            let controller = actividades_poa.esapoyo ? actividades_apoyo : actividades_poa;
            actividades_poa.cbslista.forEach(d => {
                if (controller.presupuestario) {
                    if (actividades_poa.ausiliarSelect(d).indexOf(controller.presupuestario) !== -1)
                        d.codigo_clasificadorsel = controller.presupuestario;
                    else
                        d.codigo_clasificadorsel = d.codigo_clasificador;
                } else {
                    d.codigo_clasificadorsel = d.codigo_clasificador;
                }
            });
            if (actividades_poa.esapoyo){
                $("#exampleModalCenterApoyo").modal("show");
            }else{
                $("#exampleModalCenter").modal("show");
            }
            controller.refreshAngular();
        }
    };
    actividades_poa.isselected = (cbs) => {
        let controller = actividades_poa.esapoyo ? actividades_apoyo : actividades_poa;
        return cbs.id === controller.bienes_permiso;
    };
    actividades_poa.selectcbs = (cbs) => {
        let controller = actividades_poa.esapoyo ? actividades_apoyo : actividades_poa;
        if (cbs) {
            controller.bienes_permiso = cbs.id;
            controller.bienes_permiso_nombre = cbs.nombre;
            controller.presupuestario = cbs.codigo_clasificadorsel || cbs.codigo_clasificador;
            controller.presupuestario_nombre = cbs.desc_clasificador;
        }
        controller.selectedKey = undefined;
        controller.refreshAngular();
        $("#exampleModalCenter").modal("hide");
        $("#exampleModalCenterApoyo").modal("hide");
    };
    actividades_poa.loadlist = async () => {
        if (actividades_poa.session.maneja_pacc === 1) {
            let controller = apoyo ? actividades_apoyo : actividades_poa;
            if (!actividades_poa.cbslista) {
                var animation = new ANIMATION();
                animation.loading(`#tb-custom2`, "Cargando ", ``, '200');
                actividades_poa.cbslista = await BASEAPI.listp('vw_bienes_servicio_large', {
                    limit: 0,
                    orderby: "id",
                    order: "asc",
                });
                actividades_poa.cbslista = actividades_poa.cbslista.data;
                controller.refreshAngular();
                animation.stoploading(`#tb-custom2`, ``);
            }
        }
    };
    actividades_poa.know = (search) => {
        let controller = actividades_poa.esapoyo ? actividades_apoyo : actividades_poa;
        if (search)
            if (search.length > 3)
                if (controller.cbslista) {
                    for (const d of controller.cbslista) {
                        if ((d.id || "").indexOf(search) !== -1)
                            return "(Código de Bienes y Servicios)";
                        else if ((d.nombre || "").indexOf(search) !== -1)
                            return "(Descripción de Bienes y Servicios)";
                        else if ((d.codigo_clasificador || "").indexOf(search) !== -1)
                            return "(Objeto de Gasto)";
                        else if ((d.desc_clasificador || "").indexOf(search) !== -1)
                            return "(Descripción del Objeto)";
                    }
                }
        return "";
    };
    if (typeof productos_poa != "undefined") {
        if (productos_poa) {
            if (typeof productos_poa !== 'not defined') {
                var Bien_servicio = "";
                var Bien_servicio_nombre = "";
                var Presupuestario = "";
                var Presupuestario_nombre = "";
                CRUD_actividades_poa = {};
                DSON.keepmerge(CRUD_actividades_poa, CRUDDEFAULTS);
                DSON.keepmerge(CRUD_actividades_poa, {
                    table: {
                        engine: 'my',
                        view: "vw_actividades_poa_grid",
                        width: "width:1600px;",
                        sort: "departamento_nombre",
                        columns: {
                            id: {
                                label: "ID",
                                sorttype: "numeric",
                                class: "text-left",
                                export: false,
                                exportExample: false,
                                visible: false,
                                visibleDetail: false,
                                dead: true
                            },
                            departamento: {
                                sorttype: "numeric",
                                export: false,
                                exportExample: false,
                                visible: false,
                                visibleDetail: false,
                                dead: true
                            },
                            departamento_nombre: {
                                format: function(row){
                                    return productos_poa ? productos_poa.departamento_object.nombre : row.departamento_nombre;
                                },
                            },
                            no1: {
                                label: "No.",
                                format: function(row){
                                    return row.no1 ? row.no1 : "????" ;
                                },
                            },
                            producto_nombre: {
                                label: function () {
                                    return new SESSION().current().tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto"
                                },
                                format: function(row){
                                    return productos_poa.nombre ? productos_poa.nombre : row.producto_nombre;
                                },
                                shorttext: 370
                            },
                            no2: {
                                label: "No.",
                                format: function(row){
                                    return row.no2 ? row.no2 : "????" ;
                                },
                            },
                            actividad: {
                                label: function (row) {
                                    return "Actividad"
                                },
                                shorttext: 370
                            },
                            responsable: {
                                label: function (row) {
                                    return "Responsable"
                                },
                                shorttext: 370
                            },
                            fecha_inicio: {
                                label: function () {
                                    return "Fecha Inicio";
                                },
                                sorttype: "date",
                                formattype: "date",
                            },
                            fecha_fin: {
                                label: function () {
                                    return "Fecha Fin";
                                },
                                sorttype: "date",
                                formattype: "date",
                            },
                            presupuesto: {
                                label: "Presupuesto",
                                formattype: "money",
                                exportExample: "[money]",
                                shorttext: 370,
                            },
                            presupuesto_consumido: {
                                label: function () {
                                    return "Presupuesto Consumido"
                                },
                                formattype: "money",
                                exportExample: "[money]",
                                shorttext: 370,
                            },
                            tipo_inversion: {
                                label: function () {
                                    return "Tipo de Inversión"
                                },
                                visible: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? true : false : false,
                                visibleDetail: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? true : false : false,
                                export: false,
                                exportExample: false,
                                dead: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? false : true : false
                            },
                            bienes_permiso: {
                                label: function () {
                                    return "Código de Bienes y Servicios"
                                },
                                format: function (row) {
                                    if (row.bienes_permiso == '[NULL]') {
                                        return "";
                                    } else {
                                        return row.bienes_permiso
                                    }
                                },

                                visible: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? true : false : false,
                                visibleDetail: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? true : false : false,
                                export: false,
                                exportExample: false,
                                dead: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? false : true : false
                            },
                            bienes_permiso_nombre: {
                                label: function () {
                                    return "Descripcion de Bienes y Servicios"
                                },
                                format: function (row) {
                                    if (row.bienes_permiso_nombre == '[NULL]') {
                                        return "";
                                    } else {
                                        return row.bienes_permiso_nombre
                                    }
                                },
                                visible: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? true : false : false,
                                visibleDetail: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? true : false : false,
                                export: false,
                                exportExample: false,
                                dead: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? false : true : false
                            },
                            presupuestario: {
                                label: function () {
                                    return "Código del Clasificador Presupuestario"
                                },
                                format: function (row) {
                                    if (row.presupuestario == '[NULL]') {
                                        return "";
                                    } else {
                                        return row.presupuestario
                                    }
                                },
                                visible: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? true : false : false,
                                visibleDetail: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? true : false : false,
                                export: false,
                                exportExample: false,
                                dead: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? false : true : false
                            },
                            presupuestario_nombre: {
                                label: function () {
                                    return "Descripción del Clasificador Presupuestario"
                                },
                                format: function (row) {
                                    if (row.presupuestario_nombre == '[NULL]') {
                                        return "";
                                    } else {
                                        return row.presupuestario_nombre
                                    }
                                },
                                visible: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? true : false : false,
                                visibleDetail: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? true : false : false,
                                export: false,
                                exportExample: false,
                                dead: new SESSION().current() ? new SESSION().current().maneja_pacc == 1 ? false : true : false
                            },
                            estatus: {
                                label: "Estatus",
                                shorttext: 370
                            },
                            condition: {
                                export: true,
                                label: "Condición",
                                format: function (row) {
                                    var nom = row.condition;
                                    $(`.Vencida`).css('background', '#FF0000');
                                    $(`.Enejecucion`).css('background', '#548235');
                                    $(`.Planificada`).css('background', '#5F5FAF');
                                    $(`.Ninguno`).css('background', '#CECECE');
                                    return `<div title="${row.condition.replaceAll('Ninguno', 'Ninguna Condición')}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                                }
                            },
                            maneja_presupuesto: {
                                visible: false,
                                label: function () {
                                    return "¿Maneja el presupuesto en las actividades apoyo?"
                                },
                                export: false,
                                exportExample: false,
                                dead: true,
                                format: function (row) {
                                    return row.maneja_presupuesto == 1 ? "Sí" : "No";
                                }
                            },
                            estatus_actividad: {
                                visible: false,
                                visibleDetail: false,
                                export: false,
                                exportExample: false,
                                dead: true
                            },
                            involucrados: {
                                sortable: false,
                                label: function () {
                                    return "Involucrados"
                                },
                                visible: false,
                                visibleDetail: false,
                                export: false,
                                exportExample: false,
                            },
                            involucrados_export: {
                                sortable: false,
                                label: function () {
                                    return "Involucrados"
                                },
                                visible: false,
                                visibleDetail: false,
                                parent: "involucrados",
                                export: true,
                                exportExample: true,
                                checkExport: true,
                                dead: true
                            },
                            actividades_apoyo: {
                                sortable: false,
                                label: function () {
                                    return "Actividades de apoyo"
                                },
                                visible: false,
                                visibleDetail: false,
                                export: false,
                                exportExample: false,
                            },
                            actividades_apoyo_export: {
                                sortable: false,
                                label: function () {
                                    return "Actividades de apoyo"
                                },
                                visible: false,
                                visibleDetail: false,
                                parent: "actividades_apoyo",
                                export: true,
                                exportExample: true,
                                checkExport: true,
                                dead: true
                            }
                        },
                        allow: {
                            menu: true,
                            add: true,
                            edit: true,
                            view: true,
                            remove: true,
                            active: false,
                            filter: true,
                            import: false,
                            copy: true,
                            export: {
                                Clipboard: true,
                                PDF: true,
                                CSV: true,
                                XLS: true,
                                DOC: true
                            },
                            actions: true,
                        },
                        options: [
                            {
                                text: (data) => {
                                    return "";
                                },
                                title: (data) => {
                                    if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.Edit') + ", " +
                                                MESSAGE.i('actions.View') + ", " +
                                                MESSAGE.i('actions.Remove') + ", " +
                                                MESSAGE.i('actions.audit');
                                        } else {
                                            return MESSAGE.i('actions.View') + ", " +
                                                MESSAGE.i('actions.audit');
                                        }

                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return "";
                                        } else {
                                            return MESSAGE.i('actions.Edit') + ", " +
                                                MESSAGE.i('actions.Remove') + ", " +
                                                MESSAGE.i('actions.audit');
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.View') + ", " +
                                                MESSAGE.i('actions.audit');
                                        } else {
                                            return MESSAGE.i('actions.Edit') + ", " +
                                                MESSAGE.i('actions.View') + ", " +
                                                MESSAGE.i('actions.audit');
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.View') + ", " +
                                                MESSAGE.i('actions.audit');
                                        } else {
                                            return MESSAGE.i('actions.View') + ", " +
                                                MESSAGE.i('actions.Remove') + ", " +
                                                MESSAGE.i('actions.audit');
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.Remove') + ", " +
                                                MESSAGE.i('actions.audit');
                                        } else {
                                            return MESSAGE.i('actions.Edit') + ", " +
                                                MESSAGE.i('actions.Remove') + ", " +
                                                MESSAGE.i('actions.audit');
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                        return MESSAGE.i('actions.View');
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.Edit') + ", " +
                                                MESSAGE.i('actions.audit');
                                        } else {
                                            return '';
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.Remove') + ", " +
                                                MESSAGE.i('actions.audit');
                                        } else {
                                            return '';
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                        return MESSAGE.i('actions.View') + ", " +
                                            MESSAGE.i('actions.audit');
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.Edit') + ", " +
                                                MESSAGE.i('actions.View') + ", " +
                                                MESSAGE.i('actions.Remove');
                                        } else {
                                            return MESSAGE.i('actions.View');
                                        }

                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.View');
                                        } else {
                                            return MESSAGE.i('actions.Edit') + ", " +
                                                MESSAGE.i('actions.View') + ", " +
                                                MESSAGE.i('actions.Remove');
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return "";
                                        } else {
                                            return MESSAGE.i('actions.Edit') + ", " +
                                                MESSAGE.i('actions.Remove');
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.view) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.View') + ", " +
                                                MESSAGE.i('actions.audit');
                                        } else {
                                            return MESSAGE.i('actions.Edit') + ", " +
                                                MESSAGE.i('actions.View');
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.View');
                                        } else {
                                            return MESSAGE.i('actions.View') + ", " +
                                                MESSAGE.i('actions.Remove');
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.Remove');
                                        } else {
                                            return MESSAGE.i('actions.Edit') + ", " +
                                                MESSAGE.i('actions.Remove');
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view) {
                                        return MESSAGE.i('actions.View');
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view && PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.Remove');
                                        } else {
                                            return MESSAGE.i('actions.View') + ", " +
                                                MESSAGE.i('actions.Remove');
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.edit) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.Edit');
                                        } else {
                                            return '';
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.remove) {
                                        if ((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido) && (data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta)) {
                                            return MESSAGE.i('actions.Remove');
                                        } else {
                                            return '';
                                        }
                                    } else if (PERMISSIONS.mypermission.actividades_poa.allow.view) {
                                        return MESSAGE.i('actions.View');
                                    }

                                },
                                icon: (data) => {
                                    return "cog2";
                                },
                                permission: (data) => {
                                    return ['edit', 'remove', 'active', 'view', 'copy', 'audit'];
                                },
                                characterist: (data) => {
                                    return '';
                                },
                                menus: [
                                    {
                                        text: (data) => {
                                            return MESSAGE.i('actions.Edit');
                                        },
                                        icon: (data) => {
                                            return "pencil5";
                                        },
                                        permission: (data) => {
                                            return 'edit';
                                        },
                                        characterist: (data) => {
                                            return "";
                                        },
                                        show: function (data) {
                                            // return ((data.row.id_estatus_departamento !== ENUM_2.presupuesto_estatus.Completo) && (data.row.id_estatus_departamento !== ENUM_2.presupuesto_estatus.Trabajado));
                                            return (((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido)) && ((data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta) && ((data.row.dpto_estatus != ENUM_2.presupuesto_estatus.Completo))));
                                        },
                                        click: function (data) {
                                            Bien_servicio = data.row.bienes_permiso;
                                            Bien_servicio_nombre = data.row.bienes_permiso_nombre;
                                            Presupuestario = data.row.presupuestario;
                                            Presupuestario_nombre = data.row.presupuestario_nombre;
                                            data.$scope.presupuesto_ver = data.row.presupuesto_ver;
                                            data.$scope.cargado = false;
                                            data.$scope.formulary({
                                                where: [{
                                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                                }]
                                            }, FORM.modes.edit, {});
                                            return false;
                                        }
                                    },
                                    {
                                        text: (data) => {
                                            return MESSAGE.i('actions.View');
                                        },
                                        icon: (data) => {
                                            return "eye";
                                        },
                                        permission: (data) => {
                                            return 'view';
                                        },
                                        characterist: (data) => {
                                            return "";
                                        },
                                        click: function (data) {
                                            if (!DSON.oseaX(data.row)) {
                                                data.$scope.dataForView = data.row;
                                                data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                                    header: {
                                                        title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
                                                        icon: "user"
                                                    },
                                                    footer: {
                                                        cancelButton: true
                                                    },
                                                    content: {
                                                        loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                                        sameController: true
                                                    },
                                                    event: {
                                                        show: {
                                                            begin: function (data) {

                                                            },
                                                            end: function (data) {

                                                            }
                                                        },
                                                        hide: {
                                                            begin: function (data) {

                                                            },
                                                            end: function (data) {
                                                            }
                                                        }
                                                    },
                                                });
                                            }
                                        }
                                    },
                                    {
                                        text: (data) => {
                                            return MESSAGE.i('actions.Remove');
                                        },
                                        icon: (data) => {
                                            return "trash";
                                        },
                                        permission: (data) => {
                                            return 'remove';
                                        },
                                        characterist: (data) => {
                                            return "";
                                        },
                                        show: function (data) {
                                            // return ((data.row.id_estatus_departamento !== ENUM_2.presupuesto_estatus.Completo) && (data.row.id_estatus_departamento !== ENUM_2.presupuesto_estatus.Trabajado));
                                            return (((data.row.estado_producto_id !== ENUM_2.productos_estatus.Completado) && (data.row.estado_producto_id !== ENUM_2.productos_estatus.Detenido)) && ((data.row.estatus_actividad === ENUM_2.actividad_poa_estatus.Abierta) && ((data.row.dpto_estatus != ENUM_2.presupuesto_estatus.Completo))));
                                        },
                                        click: function (data) {
                                            SWEETALERT.confirm({
                                                message: MESSAGE.i('alerts.AYSDelete'),
                                                confirm: async function () {
                                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                                    data.$scope.deleteRow(data.row).then(function () {
                                                        SWEETALERT.stop();
                                                    });
                                                }
                                            });
                                            return false;
                                        }
                                    },
                                    {
                                        text: (data) => {
                                            return MESSAGE.i('actions.Enable');
                                        },
                                        icon: (data) => {
                                            return "checkmark-circle";
                                        },
                                        permission: (data) => {
                                            return 'active';
                                        },
                                        characterist: (data) => {
                                            return "";
                                        },
                                        click: function (data) {
                                            SWEETALERT.confirm({
                                                message: MESSAGE.i('alerts.AYSEnable'),
                                                confirm: function () {
                                                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                                    data.$scope.activeRow(data.row, 1).then(function () {
                                                        SWEETALERT.stop();
                                                    });
                                                }
                                            });
                                            return false;
                                        },
                                        show: function (data) {
                                            return data.$scope.activeColumn();
                                        }
                                    },
                                    {
                                        text: (data) => {
                                            return MESSAGE.i('actions.Disable');
                                        },
                                        icon: (data) => {
                                            return "circle";
                                        },
                                        permission: (data) => {
                                            return 'active';
                                        },
                                        characterist: (data) => {
                                            return "";
                                        },
                                        click: function (data) {
                                            SWEETALERT.confirm({
                                                message: MESSAGE.i('alerts.AYSDisable'),
                                                confirm: function () {
                                                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                                    data.$scope.activeRow(data.row, 0).then(function () {
                                                        SWEETALERT.stop();
                                                    });
                                                }
                                            });
                                            return false;
                                        },
                                        show: function (data) {
                                            return data.$scope.activeColumn();
                                        }
                                    },
                                    {
                                        text: (data) => {
                                            return MESSAGE.i('actions.Copy');
                                        },
                                        icon: (data) => {
                                            return "copy3";
                                        },
                                        permission: (data) => {
                                            return 'copy';
                                        },
                                        characterist: (data) => {
                                            return "";
                                        },
                                        click: function (data) {

                                            var formatRow = {};

                                            for (var i in eval(`CRUD_${data.$scope.modelName}`).table.columns) {
                                                var column = eval(`CRUD_${data.$scope.modelName}`).table.columns[i];
                                                var key = i;
                                                var alter = column.exportKey !== undefined ? column.exportKey : i;
                                                if (eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample !== false) {
                                                    var exampleText = eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample;
                                                    exampleText = exampleText === undefined ? "[string]" : exampleText;
                                                    var realValue = eval(`data.row.${key};`);
                                                    if (!DSON.oseaX(realValue)) {
                                                        if (column.link !== undefined) {
                                                            realValue = eval(`data.row.${key.split('_')[0]}_${key.split('_')[1]}_id;`);
                                                        }
                                                        if (column.formattype === "datetime") {
                                                            realValue = moment(realValue).format(DSON.UNIVERSALTIME);
                                                        }
                                                        if (column.formattype === "date") {
                                                            realValue = moment(realValue).format(DSON.UNIVERSAL);
                                                        }
                                                        eval(`formatRow.${alter} = \`${realValue}\`;`);
                                                    }
                                                }
                                            }
                                            SWEETALERT.confirm({
                                                title: MESSAGE.i('actions.CopyRecords'),
                                                message: MESSAGE.i('alerts.Copy'),
                                                confirm: function () {
                                                    SWEETALERT.loading({message: MESSAGE.i('actions.CopyngRecord')});
                                                    var records = [formatRow];
                                                    var columns = eval(`CRUD_${data.$scope.modelName}`).table.columns;
                                                    var inserts = [];
                                                    for (var i in records) {
                                                        var record = records[i];
                                                        var row = {};
                                                        for (var i in record) {
                                                            var key = i;
                                                            var value = record[i];
                                                            for (var c in columns) {
                                                                var column = false;
                                                                if (c === key || key === columns[c].exportKey)
                                                                    column = columns[c];
                                                                if (column === false) continue;
                                                                eval(`row.${key} = \`${value}\`;`);
                                                                break;
                                                            }
                                                        }
                                                        inserts.push({row: row, relations: []});
                                                    }
                                                    data.$scope.importing(inserts);
                                                }
                                            });
                                            return false;
                                        }
                                    },
                                    {
                                        text: (data) => {
                                            return MESSAGE.i('actions.audit');
                                        },
                                        title: (data) => {
                                            return MESSAGE.i('actions.audit');
                                        },
                                        permission: (data) => {
                                            return 'audit';
                                        },
                                        icon: (data) => {
                                            return "stack-text";
                                        },
                                        characterist: (data) => {
                                            return "";
                                        },
                                        click: function (data) {
                                            if (!DSON.oseaX(data.row)) {
                                                data.$scope.dataForView = data.row;
                                                data.$scope.modal.modalView(String.format("{0}/audit", data.$scope.modelName), {
                                                    header: {
                                                        title: MESSAGE.i('mono.auditof') + " " + data.$scope.plural,
                                                        icon: "user"
                                                    },
                                                    footer: {
                                                        cancelButton: true
                                                    },
                                                    content: {
                                                        loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                                        sameController: true
                                                    },
                                                });
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                text: (data) => {
                                    return MESSAGE.i('planificacion.comentarios');
                                },
                                title: (data) => {
                                    return MESSAGE.i('planificacion.comentarios');
                                },
                                icon: (data) => {
                                    return "comment";
                                },
                                permission: (data) => {
                                    return 'comment_activities';
                                },
                                characterist: (data) => {
                                    return "";
                                },
                                show: function (data) {
                                    if (data.row.comentarios > 0) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                },
                                click: function (data) {
                                    actividades_poa_monitoreo = undefined;
                                    mega_actividades = undefined;
                                    actividades_poa.id_para_comentarios = data.row.id;
                                    actividades_poa.modalAction('comentarios_actividades_poa', MESSAGE.i('planificacion.comentarios'), 'comment', 'list', {});
                                    return false;
                                }
                            }
                        ],
                        limits: [10, 20, 50],
                        filters: {
                            columns: [
                                {
                                    key: 'no1',
                                    label: function () {
                                        return lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción'
                                    },
                                    type: FILTER.types.integer,
                                    placeholder: lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción',
                                    maxlength: 15
                                },
                                {
                                    key: 'no2',
                                    label: function () {
                                        return 'No. Actividad';
                                    },
                                    type: FILTER.types.integer,
                                    placeholder: 'No. Actividad',
                                    maxlength: 15
                                },
                                {
                                    key: 'departamento',
                                    label: 'Departamento',
                                    placeholder: 'Departamento',
                                    type: FILTER.types.relation,
                                    value: "id",
                                    table:'departamento',
                                    text: "item.nombre",
                                    query: {
                                        limit: 0,
                                        page: 1,
                                        orderby: "id",
                                        order: "asc",
                                        distinct: false,
                                        where: [
                                            {
                                                "field": "compania",
                                                "value": lachechon ? lachechon.compania_id : -1
                                            },
                                            {
                                                "field": "institucion",
                                                "operator": lachechon.institucion_id ? "=" : "is",
                                                "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                                            }
                                        ],
                                    }
                                },
                                {
                                    key: 'producto',
                                    label: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
                                    type: FILTER.types.relation,
                                    table: 'vw_productos_poa_detalles',
                                    value: "id",
                                    text: "item.no1 + ' ' + item.producto",
                                    query: {
                                        limit: 0,
                                        page: 1,
                                        where: [{
                                            "field": "poa_id",
                                            "value": lachechon ? lachechon.poa_id : -1
                                        }],
                                        orderby: "id",
                                        order: "asc",
                                        distinct: false
                                    },
                                },
                                {
                                    key: 'actividad',
                                    label: 'Actividad',
                                    type: FILTER.types.string,
                                    placeholder: 'Actividad',
                                    maxlength: 64
                                },
                                {
                                    key: 'responsable_id',
                                    label: 'Responsable',
                                    type: FILTER.types.relation,
                                    table: 'usuario',
                                    value: "id",
                                    text: "item.nombre + ' ' + item.apellido",
                                    query: {
                                        limit: 0,
                                        page: 1,
                                        where:[
                                            {
                                                "field": "compania",
                                                "value": lachechon ? lachechon.compania_id : -1
                                            },
                                            {
                                                "field": "institucion",
                                                "operator": lachechon.institucion_id ? "=" : "is",
                                                "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                                            }
                                        ],
                                        orderby: "id",
                                        order: "asc",
                                        distinct: false
                                    },
                                },
                                {
                                    key: 'fecha_inicio',
                                    label: 'Fecha Inicio',
                                    type: FILTER.types.date,
                                    placeholder: 'Fecha Inicio'
                                },
                                {
                                    key: 'fecha_fin',
                                    label: 'Fecha Fin',
                                    type: FILTER.types.date,
                                    placeholder: 'Fecha Fin'
                                },
                                {
                                    key: 'presupuesto',
                                    label: 'Presupuesto',
                                    type: FILTER.types.decimal,
                                    placeholder: 'Presupuesto',
                                    maxlength: 20
                                },
                                {
                                    key: 'estatus_actividad',
                                    label: 'Estatus',
                                    type: FILTER.types.relation,
                                    table: 'auditoria_programa_plan_estatus',
                                    value: "code",
                                    text: "item.nombre",
                                    query: {
                                        limit: 0,
                                        page: 1,
                                        where: [
                                            {
                                                "field": "entidad",
                                                "value": 10
                                            }
                                        ],
                                        orderby: "orden",
                                        order: "asc",
                                        distinct: false
                                    },
                                },
                                {
                                    key: 'tipo_inversion',
                                    label: 'Tipo Inversión',
                                    type: FILTER.types.relation,
                                    table: 'tipo_inversion',
                                    value: "id",
                                    text: "item.nombre",
                                    query: {
                                        limit: 0,
                                        page: 1,
                                        where: [],
                                        orderby: "id",
                                        order: "asc",
                                        distinct: false
                                    },
                                },
                                {
                                    key: 'bienes_permiso',
                                    label: 'Código de Bienes y Servicios',
                                    type: FILTER.types.relation,
                                    table: 'vw_bienes_servicio',
                                    value: "id",
                                    text: "item.id",
                                    query: {
                                        limit: 0,
                                        page: 1,
                                        where: [],
                                        orderby: "id",
                                        order: "asc",
                                        distinct: true
                                    },
                                },
                                {
                                    key: 'bienes_permiso_nombre',
                                    label: 'Descripción de Bienes y Servicios',
                                    type: FILTER.types.relation,
                                    table: 'vw_bienes_servicio',
                                    value: "nombre",
                                    text: "item.nombre",
                                    query: {
                                        limit: 0,
                                        page: 1,
                                        where: [],
                                        orderby: "id",
                                        order: "asc",
                                        distinct: true
                                    },
                                }
                            ]
                        },
                        single: [
                            {
                                "table": "departamento",
                                "base": "departamento",
                                "field": "id",
                                "columns": ["id", "nombre"]
                            },
                            {
                                "table": "productos_poa",
                                "base": "producto",
                                "field": "id",
                                "columns": ["id", "nombre"]
                            }
                        ],
                    }
                });
                CRUD_actividades_poa.table.limits = [10, 20];
            }
        }
    }
    RUNCONTROLLER("actividades_poa", actividades_poa, $scope, $http, $compile);
    if (!actividades_poa.no_trabaja_poa()) {
        actividades_poa.setPermission("add", true);
        actividades_poa.setPermission("edit", true);
        actividades_poa.setPermission("remove", true);
        actividades_poa.setPermission("view", true);
        actividades_poa.setPermission("import", true);
        actividades_poa.setPermission("actions", true);
    }
    RUN_B("actividades_poa", actividades_poa, $scope, $http, $compile);
    FORM.run(actividades_poa, $http, 'filtros');
    actividades_poa.selectQueries['departamentoPre'] = [
        {
            "field": "poa",
            "operator": "=",
            "value": session.poa_id
        }
    ];
    actividades_poa.get_departamento = async function (value) {
        actividades_poa.get_data_depto = await BASEAPI.listp('usuario_departamento', {
            where: [{
                field: "usuario",
                value: session.usuario_id
            }]
        });
        actividades_poa.base = [
            {
                field: "poa",
                value: actividades_poa.session.poa_id
            },
            {
                field: "departamento",
                value: value,
            }
        ];
        actividades_poa.template = [
            {
                open: "(",
                field: "departamento",
                value: '',
                close: ")"
            }
        ];
        actividades_poa.mydepartamentolist = [];

        actividades_poa.mydepartamentolist.push(session.departamento);
        if (actividades_poa.get_data_depto.data.length > 0) {


            actividades_poa.get_data_depto.data.forEach(item => {
                actividades_poa.mydepartamentolist.push(item.departamento);
            });
            actividades_poa.base[actividades_poa.base.length - 1].connector = undefined;
        }

    };
    if (actividades_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || actividades_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
        actividades_poa.departamento_list = eval(session.departamentos_y_secundarios) || session.departamento;
        actividades_poa.selectQueries["departamentoPre"] = [
            {
                field: "poa",
                value: actividades_poa.session.poa_id
            },
            {
                field: "id",
                value: actividades_poa.departamento_list
            }
        ];
    } else {
        actividades_poa.selectQueries["departamentoPre"] = [
            {
                field: "poa",
                value: actividades_poa.session.poa_id
            }
        ];
    }
    actividades_poa.filtros.loadDropDown("departamentoPre");
    actividades_poa.check_poa = function () {
        BASEAPI.list("vw_poa", {
            limit: 0,
            where: [
                {
                    field: "id",
                    value: session.poa_id
                }
            ]
        }, function (results) {

            actividades_poa.poa_activo = results.data[0].activo;
        });
        if (actividades_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || actividades_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            var departamentos_totales = actividades_poa.depa_secundarios.replaceAll('(', "").replaceAll(')', "").split(',');
            departamentos_totales.push(session.departamento)
            BASEAPI.list("vw_presupuesto_aprobado", {
                limit: 0,
                where: [
                    {
                        field: "poa",
                        value: session.poa_id
                    },
                    {
                        field: 'departamento_id',
                        value: actividades_poa.departamento_list
                    }
                ]
            }, function (res) {
                actividades_poa.dpto_usuario = res.data.length;
                actividades_poa.dpto_usuario_autorizado = res.data.filter(d => {
                    return d.id_estatus === ENUM_2.presupuesto_estatus.Completo || d.id_estatus === ENUM_2.presupuesto_estatus.Trabajado
                }).length;
                actividades_poa.refreshAngular();
                if (MODAL.history.length > 0) {
                    $('.icon-plus-circle2 ').parent().hide();
                    if (typeof productos_poa !== 'undefined') {
                        if (typeof productos_poa !== 'not defined') {
                            if (productos_poa) {
                                if (productos_poa.modo_view_trabajar) {
                                    $('.icon-plus-circle2 ').parent().hide();
                                } else {
                                    actividades_poa.dont_show_productos = true;
                                    $('.icon-plus-circle2 ').parent().show();
                                }
                            }
                        }
                    }
                } else {
                    if (actividades_poa.dpto_usuario != actividades_poa.dpto_usuario_autorizado) {
                        $('.icon-plus-circle2 ').parent().show();
                        actividades_poa.setPermission("edit", true);
                        actividades_poa.setPermission("remove", true);
                    } else {
                        $('.icon-plus-circle2 ').parent().hide();
                        actividades_poa.setPermission("edit", false);
                        actividades_poa.setPermission("remove", false);
                    }
                }
                // if (CRUD_vw_actividades_poa.table.options[0].menus.length === 0){
                //     $('#actividades_poa .icon-plus-circle2 ').parent().hide();
                // } else {
                //     $('#actividades_poa .icon-plus-circle2 ').parent().show();
                // }
                if (actividades_poa.total_departamentos === 0) {
                    actividades_poa.valor = LAN.money(0).format(false);
                    actividades_poa.presupuesto_restantePre = LAN.money(0).format(false);
                    actividades_poa.presupuesto_actividades = LAN.money(0).format(false);
                    actividades_poa.presupuesto_liberado = LAN.money(0).format(false);
                    actividades_poa.refreshAngular();
                }

            });
        } else {
            BASEAPI.list("vw_presupuesto_aprobado", {
                limit: 0,
                where: [
                    {
                        field: "poa",
                        value: session.poa_id
                    }
                ]
            }, function (res) {
                if (res.data.length)
                    actividades_poa.total_departamentos = res.data.length;

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
                }, function (res) {
                    actividades_poa.departamentos_autorizados = res.data.length;

                    // actividades_poa.refreshAngular();
                    if (MODAL.history.length > 0) {
                        $('.icon-plus-circle2 ').parent().hide();
                        if (typeof productos_poa !== 'undefined') {
                            if (typeof productos_poa !== 'not defined') {
                                if (productos_poa) {
                                    if (productos_poa.modo_view_trabajar) {
                                        $('.icon-plus-circle2 ').parent().hide();
                                    } else {
                                        actividades_poa.dont_show_productos = true;
                                        $('.icon-plus-circle2 ').parent().show();
                                    }
                                }
                            }
                        }
                    } else {
                        if (actividades_poa.total_departamentos == actividades_poa.departamentos_autorizados) {
                            $('.icon-plus-circle2 ').parent().hide();
                        } else {
                            $('.icon-plus-circle2 ').parent().show();
                        }
                    }
                    // if (CRUD_vw_actividades_poa.table.options[0].menus.length === 0){
                    //     $('#actividades_poa .icon-plus-circle2 ').parent().hide();
                    // } else {
                    //     $('#actividades_poa .icon-plus-circle2 ').parent().show();
                    // }
                    if (actividades_poa.total_departamentos === 0) {
                        actividades_poa.valor = LAN.money(0).format(false);
                        actividades_poa.presupuesto_restantePre = LAN.money(0).format(false);
                        actividades_poa.presupuesto_actividades = LAN.money(0).format(false);
                        actividades_poa.presupuesto_liberado = LAN.money(0).format(false);
                        actividades_poa.refreshAngular();
                    } else {
                        actividades_poa.refreshAngular();

                    }
                });
            });
        }
    };
    actividades_poa.triggers.table.after.close = function (data) {
        // MENUMODAL = true;
        actividades_poa.dont_show_productos = false;
    };
    actividades_poa.cargar = true;
    // $(".subcontent").hide();
    actividades_poa.triggers.table.after.control = async function (data) {
        var session = new SESSION().current();
        let quierorefre = false;
        if (data == 'departamentoPre') {
            if (actividades_poa.cargar && typeof actividades_poa.filtros.options.departamentoPre != "undefined") {
                if (actividades_poa.no_trabaja_poa()) {
                } else {
                    actividades_poa.filtros.options.departamentoPre.disabled = true;
                    if (session.departamentos_y_secundarios) {
                        actividades_poa.filtros.options.departamentoPre.disabled = false;
                    }
                    // actividades_poa.refreshAngular();
                    quierorefre = true;
                    $(".subcontent").show();
                }
                if (STORAGE.exist('depa')) {
                    if (actividades_poa.total_departamentos != 0) {
                        actividades_poa.departamentoPre = STORAGE.get('depa');
                        actividades_poa.cargar = false;
                        actividades_poa.filtros.loadDropDown('departamentoPre');
                        $(".subcontent").show();
                    } else {
                        actividades_poa.valor = LAN.money(0).format(false);
                        actividades_poa.presupuesto_restantePre = LAN.money(0).format(false);
                        actividades_poa.presupuesto_actividades = LAN.money(0).format(false);
                        actividades_poa.presupuesto_liberado = LAN.money(0).format(false);
                        quierorefre = true;
                        $(".subcontent").show();
                    }
                } else {
                    if (actividades_poa.total_departamentos != 0) {
                        actividades_poa.departamentoPre = session.departamento + "";
                        actividades_poa.cargar = false;
                        actividades_poa.filtros.loadDropDown('departamentoPre');
                        $(".subcontent").show();
                    } else {
                        actividades_poa.valor = LAN.money(0).format(false);
                        actividades_poa.presupuesto_restantePre = LAN.money(0).format(false);
                        actividades_poa.presupuesto_actividades = LAN.money(0).format(false);
                        actividades_poa.presupuesto_liberado = LAN.money(0).format(false);
                        quierorefre = true;
                        $(".subcontent").show();
                    }
                }
                if (quierorefre)
                    actividades_poa.refreshAngular();
            }
        }
    };
    actividades_poa.refrescarInputs = function () {
        actividades_poa.refresh();
    };
    actividades_poa.myfirsttime = 0;
    actividades_poa.lospresupuestes = (value, refre) => {
        if (typeof dashboard_cofiguration != "undefined") {
            if (dashboard_cofiguration) {
                if (typeof dashboard_cofiguration !== 'not defined') {
                    return;
                }
            }
        }

        if (typeof dashboard != "undefined") {
            if (typeof dashboard !== 'not defined') {
                if (dashboard) {
                    return;
                }
            }
        }

        if (typeof dashboard_departamento != "undefined") {
            if (typeof dashboard_departamento !== 'not defined') {
                if (dashboard_departamento) {
                    return;
                }
            }
        }


        if (typeof dashboard_presupuesto_barra != "undefined") {
            if (typeof dashboard_presupuesto_barra !== 'not defined') {
                if (dashboard_presupuesto_barra) {
                    return;
                }
            }
        }

        var session = new SESSION().current();

        if (actividades_poa.myfirsttime > 1) {
            if (actividades_poa.filtros.selected('departamentoPre') !== null) {
                if (actividades_poa.filtros.selected('departamentoPre').id < 0) {
                    actividades_poa.fixFilters = [
                        {
                            "field": "poa",
                            "value": actividades_poa.poa_id
                        },
                        {
                            "field": "tempid",
                            "operator": "is",
                            "value": "$null"
                        }
                    ];
                    if (session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                        actividades_poa.fixFilters.push({
                            "field": "responsable_id",
                            "value": session.id
                        });
                    }
                } else {
                    STORAGE.add('depa', actividades_poa.departamentoPre);
                    // if (session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental || session.groups[0].caracteristica == ENUM_2.Grupos.director_departamental) {
                    actividades_poa.fixFilters = [
                        {
                            "field": "poa",
                            "value": actividades_poa.poa_id
                        },
                        {
                            "field": "tempid",
                            "operator": "is",
                            "value": "$null"
                        },
                        {
                            "field": "departamento",
                            "value": value
                        }
                    ];
                    if (session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                        actividades_poa.fixFilters.push({
                            "field": "responsable_id",
                            "value": session.id
                        });
                    }
                    // }
                }

                actividades_poa.valor = LAN.money(actividades_poa.filtros.selected('departamentoPre').valor).format(false);
                actividades_poa.presupuesto_restantePre = LAN.money(actividades_poa.filtros.selected('departamentoPre').presupuesto_restante).format(false);
                actividades_poa.presupuesto_actividades = LAN.money(actividades_poa.filtros.selected('departamentoPre').presupuesto_actividades).format(false);
                actividades_poa.presupuesto_liberado = LAN.money(actividades_poa.filtros.selected('departamentoPre').presupuesto_liberado).format(false);
                if (actividades_poa.total_departamentos === 0) {
                    actividades_poa.valor = LAN.money(0).format(false);
                    actividades_poa.presupuesto_restantePre = LAN.money(0).format(false);
                    actividades_poa.presupuesto_actividades = LAN.money(0).format(false);
                    actividades_poa.presupuesto_liberado = LAN.money(0).format(false);
                    actividades_poa.refreshAngular();
                }
                if (!refre)
                    actividades_poa.refrescarInputs();

            } else {
                actividades_poa.departamentoPre = (actividades_poa.poa_id - 99999).toString();
                actividades_poa.fixFilters = [
                    {
                        "field": "poa",
                        "value": actividades_poa.poa_id
                    },
                    {
                        "field": "tempid",
                        "operator": "is",
                        "value": "$null"
                    },
                ];
                if (session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                    actividades_poa.fixFilters.push({
                        "field": "responsable_id",
                        "value": session.id
                    });
                }
                if (!refre)
                    actividades_poa.refrescarInputs();
            }
        }
        actividades_poa.myfirsttime++;
    };
    actividades_poa.$scope.$watch('actividades_poa.departamentoPre', async function (value) {
        actividades_poa.lospresupuestes(value);
    });
    actividades_poa.singular = "Actividades POA";
    actividades_poa.plural = MESSAGE.i('planificacion.titleActividades');

    var hasDashboard = false, hasDashboardConfig = false, hasDashboardotro = false;
    ;
    if (typeof dashboard != "undefined") {
        if (dashboard) {
            if (typeof dashboard !== 'not defined') {
                hasDashboard = true;
            }
        }
    }
    if (typeof dashboard_departamento != "undefined") {
        if (dashboard_departamento) {
            if (typeof dashboard_departamento !== 'not defined') {
                hasDashboardotro = true;
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
        title_header_dashboard_table_poa(actividades_poa, MESSAGE.i('planificacion.titleActividades'), dashboard.form.selected('poa').periodo_poa);
    } else if (hasDashboardConfig && dashboard_cofiguration.form.selected('vw_dashboard_poas')) {
        title_header_dashboard_table_poa(actividades_poa, MESSAGE.i('planificacion.titleActividades'), dashboard_cofiguration.form.selected('vw_dashboard_poas').periodo_poa);
    } else if (hasDashboardotro && dashboard_departamento.poa_object) {
        title_header_dashboard_table_poa(actividades_poa, MESSAGE.i('planificacion.titleActividades'), dashboard_departamento.poa_object.periodo_poa);
    } else {
        title_header_table_poa(actividades_poa, MESSAGE.i('planificacion.titleActividades'));
    }

    actividades_poa.formulary = function (data, mode, defaultData) {
        var session = new SESSION().current();
        actividades_poa.una_vez == "undefined"
        if (actividades_poa !== undefined) {
            RUN_B("actividades_poa", actividades_poa, $scope, $http, $compile);

            actividades_poa.selectQueries['producto'] = [
                {
                    "field": "estado_producto_id",
                    "operator": "=",
                    "value": ENUM_2.productos_estatus.Abierto
                }
            ];
            if (actividades_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || actividades_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                actividades_poa.selectQueries['departamento'] = [
                    {
                        "field": "compania",
                        "operator": "=",
                        "value": session.compania_id
                    },
                    {
                        "field": "estatus_dpto",
                        "operator": "!=",
                        "value": 3
                    },
                    {
                        "field": "poa",
                        "operator": "=",
                        "value": session.poa_id
                    },
                    {
                        "field": "id",
                        "value": actividades_poa.departamento_list
                    }
                ];
            } else {
                actividades_poa.selectQueries['departamento'] = [
                    {
                        "field": "compania",
                        "operator": "=",
                        "value": session.compania_id
                    },
                    {
                        "field": "estatus_dpto",
                        "operator": "!=",
                        "value": 3
                    },
                    {
                        "field": "poa",
                        "operator": "=",
                        "value": session.poa_id
                    }
                ];
            }

            actividades_poa.no_limpiar_fecha_change = false;

            actividades_poa.form.titles = {
                new: "Nueva - " + MESSAGE.i('planificacion.titleActividadPOA'),
                edit: MESSAGE.i('planificacion.titleActividadPOA'),
                view: "Ver ALL - " + ` ${MESSAGE.i('planificacion.titleActividadPOA')}`
            };

            actividades_poa.form.readonly = {poa: actividades_poa.poa_id, estatus: 2};
            actividades_poa.poa = actividades_poa.poa_id;

            // actividades_poa.form.schemas.insert.departamento = FORM.schemasType.calculated;
            actividades_poa.form.schemas.insert.presupuesto_pro = FORM.schemasType.calculated;
            actividades_poa.form.schemas.insert.show_presupuesto = FORM.schemasType.calculated;
            actividades_poa.form.schemas.insert.show_resultado = FORM.schemasType.calculated;
            actividades_poa.form.schemas.insert.presupuesto_restante = FORM.schemasType.calculated;
            // implementacion de las notificaciones al momento de asignar o actualizar una asctividad begin
            actividades_poa.form.after.insert = async function (data) {
                actividades_poa.data_json = {
                    title: `Se le ha asignado la actividad "${data.inserted.nombre}"`,
                    content: `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, se le ha asignado la actividad: "${data.inserted.nombre}". La misma deberá trabajarse durante el rango de fecha de ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}`,
                    user: [data.inserted.responsable],
                    url: 'actividades_poa'
                };
                // BASEAPI.mail({
                //     "to": actividades_poa.form.selected('responsable').correo,
                //     "subject": `Se le ha asignado la actividad "${data.inserted.nombre}"`,
                //     "name": "noReply",
                //     "template": 'email/plane',
                //     "fields": { //estos campos se utilizarán en el template
                //         message: `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, se le ha asignado la actividad: "${data.inserted.nombre}". La misma deberá trabajarse durante el rango de fecha de ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}`,
                //     }
                // }, function (result) {
                //     SWEETALERT.stop();
                //     SWEETALERT.show({message: "Se asignó la tarea éxitosamente"});
                // });
                send_notification.send.send(actividades_poa.data_json);
                titulo_push = `Se le ha asignado la actividad "${data.inserted.nombre}"`;
                cuerpo_push = `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, se le ha asignado la actividad: "${data.inserted.nombre}". La misma deberá trabajarse durante el rango de fecha de ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}`;

                if (actividades_poa.presupuesto !== "") {
                    var act = await BASEAPI.firstp('actividades_poa', {where: [{value: actividades_poa.id}]});
                    if (act)
                        act.presupuesto
                }

                titulo = `Se le ha asignado la actividad "${data.inserted.nombre}"`;
                correo = `${actividades_poa.form.selected('responsable').correo}`;
                cuerpo = `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, se le ha asignado la actividad: "${data.inserted.nombre}". La misma deberá trabajarse durante el rango de fecha de ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}`;
                function_send_email_director_user(titulo_push, cuerpo_push, titulo, cuerpo, actividades_poa.session.compania_id, actividades_poa.departamento, correo, session.institucion_id);


                // Envios de correo actividades de apoyo

                console.log(data.inserted);

                BASEAPI.listp("vw_actividades_apoyo", {
                    limit: 0,
                    order: "asc",
                    where: [
                        {
                            //field: "actividades_poa",
                            //value: data.inserted.id
                            field: 'tempid',
                            value: 'actividades_poa' + actividades_poa.form.options.actividades_apoyo.tempId
                        }
                    ]
                }).then(function (rs) {
                    console.log(rs);
                    if (typeof rs.data != "undefined") {
                        if (rs.data.length > 0) {
                            for (var u of rs.data) {
                                console.log(u.responsable);

                                actividades_apoyo.data_json = {
                                    title: `Ha sido asignado para dar apoyo a la actividad "${data.inserted.nombre}"`,
                                    content: `${u.name}, se le ha asignado la actividad de apoyo: "${u.nombre}". La misma deberá trabajarse durante el rango de fecha de ${moment(u.fecha_inicio).format('YYYY/MM/DD')} hasta ${moment(u.fecha_fin).format('YYYY/MM/DD')}.`,
                                    user: [u.responsable],
                                    url: 'actividades_apoyo'
                                };
                                send_notification.send.send(actividades_apoyo.data_json);
                                actividades_apoyo.data_json_email = {
                                    to: u.correo,
                                    subject: `Ha sido asignado para dar apoyo a la actividad "${data.inserted.nombre}"`,
                                    name_show: "NoReply",
                                    template: 'email/plane',
                                    message: `${u.name}, se le ha asignado la actividad de apoyo: "${u.nombre}". La misma deberá trabajarse durante el rango de fecha de ${moment(u.fecha_inicio).format('YYYY/MM/DD')} hasta ${moment(u.fecha_fin).format('YYYY/MM/DD')}.`,
                                    notification: 'no'
                                };
                                send_notification.send.email(actividades_apoyo.data_json_email);

                                if (!DSON.oseaX('actividades_poa')) {
                                    if (u.presupuesto) {
                                        actividades_apoyo.last_id = u.id;
                                        console.log("en el after insert", actividades_apoyo.last_id);
                                    }
                                }

                                titulo_push = `Ha sido asignado para dar apoyo a la actividad "${data.inserted.nombre}"`;
                                cuerpo_push = MESSAGE.ieval('planificacion.actividades_apoyo_send_notification_push', {
                                    field: u.name,
                                    field2: u.nombre,
                                    field3: moment(u.fecha_inicio).format('YYYY/MM/DD'),
                                    field4: moment(u.fecha_fin).format('YYYY/MM/DD')
                                });
                                titulo_email = `Ha sido asignado para dar apoyo a la actividad "${data.inserted.nombre}"`;
                                cuerpo_email = `${u.name}, se le ha asignado la actividad de apoyo: "${u.nombre}". La misma deberá trabajarse durante el rango de fecha de ${moment(u.fecha_inicio).format('YYYY/MM/DD')} hasta ${moment(u.fecha_fin).format('YYYY/MM/DD')}.`;
                                function_send_email_director_user(titulo_push, cuerpo_push, titulo_email, cuerpo_email, session.compania_id, u.departamento, u.correo, session.institucion_id);
                            }
                        }
                    }
                });
                actividades_poa.poa_id = session.poa_id === null ? 0 : session.poa_id;
            };
            actividades_poa.triggers.table.before.open = () => new Promise((resolve, reject) => {
                if (typeof productos_poa != "undefined") {
                    if (productos_poa) {
                        if (typeof productos_poa !== 'not defined') {
                            if (productos_poa.departamento_object === null || productos_poa.resultado_object === null || productos_poa.nombre === '' || productos_poa.fecha_inicio === null || productos_poa.fecha_fin === null || productos_poa.fecha_fin === "") {
                                actividades_poa.showMsjSi = true;
                                actividades_poa.showMsjNo = false;
                                resolve(true);
                                return
                            } else {
                                actividades_poa.showMsjSi = false;
                                actividades_poa.showMsjNo = true;
                                resolve(true);
                                return
                            }

                            resolve(false);
                            return
                        }
                    }
                }
                actividades_poa.showMsjNo = true;
                actividades_poa.showMsjSi = false;
                resolve(true);
            });
            actividades_poa.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
                if (actividades_poa.maneja_presupuesto) {
                    data.updating.tipo_inversion = '$NULL';
                    data.updating.bienes_permiso = '$NULL';
                    data.updating.show_dept = undefined;
                    data.updating.show_prod = undefined;
                    data.updating.bienes_permiso_nombre = '$NULL';
                    data.updating.presupuestario = '$NULL';
                    data.updating.presupuestario_nombre = '$NULL';
                }
                actividades_poa.datos_actividades = [];
                BASEAPI.listp("actividades_apoyo", {
                    limit: 0,
                    order: "asc",
                    where: [
                        {
                            field: "actividades_poa",
                            value: actividades_poa.id
                        },
                        {
                            field: "presupuesto",
                            operator: ">",
                            value: 0
                        }
                    ]
                }).then(function (result) {
                    actividades_poa.lista_act_apoyo_presupuesto = result.data;

                    actividades_poa.check_actividades_apoyo(function () {
                        if (actividades_poa.lista_actividades_erroenas.data.length > 0) {
                            var template = `Las actividades de apoyo ya creadas por la actividad no están dentro del rango de la misma <br> <ul>`;
                            for (var i of actividades_poa.lista_actividades_erroenas.data) {
                                template += ` <br> <li> <strong>Actividad de apoyo:</strong> ${i.nombre} <br> <strong>Fecha inicio:</strong> ${LAN.date(i.fecha_inicio)} <br> <strong>Fecha fin:</strong> ${LAN.date(i.fecha_fin)} </li>`;
                            }
                            ;
                            template += `</ul>`;
                            SWEETALERT.show({message: `${template}`});
                            let buttons = document.getElementsByClassName("btn btn-labeled");
                            for (var item of buttons) {
                                item.disabled = false;
                            }
                            return;
                        } else {
                            if (!actividades_poa.maneja_presupuesto) {
                                if (actividades_poa.lista_act_apoyo_presupuesto) {
                                    if (actividades_poa.lista_act_apoyo_presupuesto.length > 0) {
                                        SWEETALERT.show({
                                            type: "error",
                                            message: "No debe(n) existir actividad(es) de Apoyo(s) que manejen presupuesto"
                                        });
                                        let buttons = document.getElementsByClassName("btn btn-labeled");
                                        for (var item of buttons) {
                                            item.disabled = false;
                                        }
                                        return;
                                    } else {
                                        data.updating.presupuesto = LAN.money(actividades_poa.presupuesto).value;
                                        resolve(true);
                                    }
                                }
                            } else {
                                data.updating.presupuesto = LAN.money(actividades_poa.presupuesto).value;
                                resolve(true);
                            }
                        }
                        actividades_poa.refreshAngular();
                    });


                });
            });
            // actividades_poa.form.before.insert = function (data) {
            //
            // };
            actividades_poa.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                if (actividades_poa.maneja_presupuesto) {
                    data.inserting.tipo_inversion = '$NULL';
                    data.inserting.show_dept = undefined;
                    data.inserting.show_prod = undefined;
                    data.inserting.bienes_permiso = '$NULL';
                    data.inserting.bienes_permiso_nombre = '$NULL';
                    data.inserting.presupuestario = '$NULL';
                    data.inserting.presupuestario_nombre = '$NULL';
                }
                data.inserting.poa = actividades_poa.poa_id;
                BASEAPI.listp("actividades_apoyo", {
                    limit: 0,
                    order: "asc",
                    where: [
                        {
                            field: "tempid",
                            value: `actividades_poa${actividades_poa.form.options.actividades_apoyo.tempId}`
                        },
                        {
                            field: "presupuesto",
                            operator: ">",
                            value: 0
                        }
                    ]
                }).then(function (result) {
                    actividades_poa.lista_act_apoyo_presupuesto = result.data;
                    actividades_poa.poa = actividades_poa.poa_id;
                    data.inserting.poa = actividades_poa.poa_id;
                    actividades_poa.check_actividades_apoyo(function () {
                        if (actividades_poa.lista_actividades_erroenas.data.length > 0) {
                            var template = `Las actividades de apoyo ya creadas por la actividad no están dentro del rango de la misma <br> <ul>`;
                            for (var i of actividades_poa.lista_actividades_erroenas.data) {
                                template += ` <br> <li> <strong>Actividad de apoyo:</strong> ${i.nombre} <br> <strong>Fecha inicio:</strong> ${LAN.date(i.fecha_inicio)} <br> <strong>Fecha fin:</strong> ${LAN.date(i.fecha_fin)} </li>`;
                            }
                            ;
                            template += `</ul>`;
                            SWEETALERT.show({message: `${template}`});
                        } else {
                            if (!actividades_poa.maneja_presupuesto) {
                                if (actividades_poa.lista_act_apoyo_presupuesto.length > 0) {
                                    SWEETALERT.show({
                                        type: "error",
                                        message: "No debe(n) existir actividad(es) de Apoyo(s) que manejen presupuesto"
                                    });
                                } else {
                                    data.inserting.presupuesto = LAN.money(actividades_poa.presupuesto).value;
                                    resolve(true);
                                }
                            } else {
                                data.inserting.presupuesto = LAN.money(actividades_poa.presupuesto).value;
                                resolve(true);
                            }
                        }
                    });
                });
            });
            actividades_poa.form.after.update = function (data) {
                if (data.updating.responsable != actividades_poa.data_user.id) {
                    var correo_array = [];
                    actividades_poa.data_json = {
                        title: `Se le ha asignado la actividad "${data.updating.nombre}"`,
                        content: `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, se le ha asignado la actividad: ${data.updating.nombre}. La misma deberá trabajarse durante el rango de fecha de ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}`,
                        user: [data.updating.responsable],
                        url: 'actividades_poa'
                    };
                    BASEAPI.mail({
                        "to": actividades_poa.form.selected('responsable').correo,
                        "subject": `Se le ha asignado la actividad "${data.updating.nombre}"`,
                        "name": "noReply",
                        "template": 'email/plane',
                        "fields": { //estos campos se utilizarán en el template
                            message: `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, se le ha asignado la actividad: ${data.updating.nombre}. La misma deberá trabajarse durante el rango de fecha de ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}`,
                        }
                    }, function (result) {
                    });
                    send_notification.send.send(actividades_poa.data_json);

                    actividades_poa.data_json2 = {
                        title: `Ha sido removido de la actividad "${data.updating.nombre}".`,
                        content: `${actividades_poa.data_user.nombre + ' ' + actividades_poa.data_user.apellido} ha sido removido de la actividad: "${data.updating.nombre}", dicha actividad fué asignada a ${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}`,
                        user: [actividades_poa.data_user.id],
                        url: 'actividades_poa'
                    };
                    BASEAPI.mail({
                        "to": actividades_poa.data_user.correo,
                        "subject": `Ha sido removido de la actividad "${data.updating.nombre}".`,
                        "name": "noReply",
                        "template": 'email/plane',
                        "fields": { //estos campos se utilizarán en el template
                            message: `${actividades_poa.data_user.nombre + ' ' + actividades_poa.data_user.apellido} ha sido removido de la actividad: "${data.updating.nombre}", dicha actividad fué asignada a ${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}`,
                        }
                    }, function (result) {
                    });
                    send_notification.send.send(actividades_poa.data_json2);
                    titulo_push = `Ha sido removido de la actividad "${data.updating.nombre}".`;
                    cuerpo_push = `${actividades_poa.data_user.nombre + ' ' + actividades_poa.data_user.apellido} ha sido removido de la actividad: "${data.updating.nombre}", dicha actividad fué asignada a ${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}`;
                    correo_array.push(actividades_poa.data_user.correo);
                    correo_array.push(actividades_poa.form.selected('responsable').correo);
                    titulo = `Ha sido removido de la actividad "${data.updating.nombre}".`;
                    cuerpo = `${actividades_poa.data_user.nombre + ' ' + actividades_poa.data_user.apellido} ha sido removido de la actividad: "${data.updating.nombre}", dicha actividad fué asignada a ${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}`;
                    function_send_email_director_user(titulo_push, cuerpo_push, titulo, cuerpo, actividades_poa.session.compania_id, actividades_poa.departamento, correo_array, actividades_poa.session.institucion_id);
                } else {
                    if (moment(actividades_poa.oldfecha_inicio).format("YYYY/MM/DD") != data.updating.fecha_inicio || moment(actividades_poa.oldfecha_fin).format("YYYY/MM/DD") != data.updating.fecha_fin) {
                        actividades_poa.data_json = {
                            title: `Hubo un cambio de fecha en la Actividad "${data.updating.nombre}"`,
                            content: `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}", El nuevo rango va desde ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}. Proceder a tomar las acciones que considere pertinente.`,
                            user: [data.updating.responsable],
                            url: 'actividades_poa'
                        };
                        // BASEAPI.mail({
                        //     "to": actividades_poa.form.selected('responsable').correo,
                        //     "subject": `Hubo un cambio de fecha en la Actividad`,
                        //     "name": "noReply",
                        //     "template": 'email/plane',
                        //     "fields": { //estos campos se utilizarán en el template
                        //         message: `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}. Proceder a tomar las acciones que considere pertinente.`,
                        //     }
                        // }, function (result) {
                        // });
                        send_notification.send.send(actividades_poa.data_json);

                        titulo_push = `Hubo un cambio de fecha en la Actividad "${data.updating.nombre}"`;
                        cuerpo_push = `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}. Proceder a tomar las acciones que considere pertinente.`;
                        correo = `${actividades_poa.form.selected('responsable').correo}`;
                        titulo = `Hubo un cambio de fecha en la Actividad "${data.updating.nombre}"`;
                        cuerpo = `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}. Proceder a tomar las acciones que considere pertinente.`;
                        function_send_email_group_user(titulo_push, cuerpo_push, titulo, cuerpo, actividades_poa.session.compania_id, actividades_poa.departamento, correo, actividades_poa.session.institucion_id);
                    }
                    if (LAN.money(actividades_poa.oldpresupuesto).value != data.updating.presupuesto) {
                        actividades_poa.data_json = {
                            title: `Actividad "${data.updating.nombre}" ha cambiado su presupuesto`,
                            content: `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, ha sido cambiado el presupuesto de la actividad "${data.updating.nombre}" de ${LAN.money(actividades_poa.oldpresupuesto).format(false)} a ${actividades_poa.presupuesto}`,
                            user: [data.updating.responsable],
                            url: 'actividades_poa'
                        };
                        // BASEAPI.mail({
                        //     "to": actividades_poa.form.selected('responsable').correo,
                        //     "subject": `Hubo un cambio de fecha en la Actividad`,
                        //     "name": "noReply",
                        //     "template": 'email/plane',
                        //     "fields": { //estos campos se utilizarán en el template
                        //         message: `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}. Proceder a tomar las acciones que considere pertinente.`,
                        //     }
                        // }, function (result) {
                        // });
                        send_notification.send.send(actividades_poa.data_json);

                        titulo_push = `Actividad "${data.updating.nombre}" ha cambiado su presupuesto`;
                        cuerpo_push = `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, ha sido cambiado el presupuesto de la actividad "${data.updating.nombre}" de ${LAN.money(actividades_poa.oldpresupuesto).format(false)} a ${actividades_poa.presupuesto}`;
                        correo = `${actividades_poa.form.selected('responsable').correo}`;
                        titulo = `Actividad "${data.updating.nombre}" ha cambiado su presupuesto`;
                        cuerpo = `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, ha sido cambiado el presupuesto de la actividad "${data.updating.nombre}" de ${LAN.money(actividades_poa.oldpresupuesto).format(false)} a ${actividades_poa.presupuesto}`;
                        function_send_email_group_user(titulo_push, cuerpo_push, titulo, cuerpo, actividades_poa.session.compania_id, actividades_poa.departamento, correo, actividades_poa.session.institucion_id);
                    }
                }
                actividades_poa.poa_id = session.poa_id === null ? 0 : session.poa_id;

            };
            actividades_poa.check_actividades_apoyo = async function (callback) {
                if (actividades_poa.form.mode == "edit") {
                    actividades_poa.lista_actividades_erroenas = await BASEAPI.listp('drp_actividades_apoyo', {
                        limit: 0,
                        where: [
                            {
                                'open': "(",
                                'field': 'fecha_inicio',
                                'operator': '<',
                                'value': moment(actividades_poa.fecha_inicio).format('YYYY-MM-DD'),
                                'connector': 'OR'
                            },
                            {
                                'field': 'fecha_fin',
                                'operator': '>',
                                'value': moment(actividades_poa.fecha_fin).format('YYYY-MM-DD'),
                                'close': ")"
                            },
                            {
                                'open': "(",
                                'field': 'poa',
                                'value': session.poa_id
                            },
                            {
                                'field': 'actividades_poa',
                                'value': actividades_poa.id,
                                'close': ")"
                            }
                        ]
                    });
                } else {
                    actividades_poa.lista_actividades_erroenas = await BASEAPI.listp('drp_actividades_apoyo', {
                        limit: 0,
                        where: [
                            {
                                'open': "(",
                                'field': 'fecha_inicio',
                                'operator': '<',
                                'value': moment(actividades_poa.fecha_inicio).format('YYYY-MM-DD'),
                                'connector': 'OR'
                            },
                            {
                                'field': 'fecha_fin',
                                'operator': '>',
                                'value': moment(actividades_poa.fecha_fin).format('YYYY-MM-DD'),
                                'close': ")"
                            },
                            {
                                'field': 'tempid',
                                'value': `actividades_poa${actividades_poa.form.options.actividades_apoyo.tempId}`,
                            }
                        ]
                    });
                }
                if (callback)
                    callback();
            };
            // end

            actividades_poa.createForm(data, mode, defaultData);
            if (mode === 'new') {
                actividades_poa.presupuesto_restante = '';
            }

            actividades_poa.triggers.table.after.open = function (data) {
                if (typeof productos_poa !== 'undefined') {
                    if (typeof productos_poa !== 'not defined') {
                        if (productos_poa) {
                            actividades_poa.dont_show_productos = true;
                        }
                    }
                }
                if (mode != "new") {
                    $('.modal-title').html('Actividad');
                    console.log(data);
                    actividades_poa.oldpresupuesto = actividades_poa.presupuesto;
                    actividades_poa.oldfecha_inicio = actividades_poa.fecha_inicio;
                    actividades_poa.oldfecha_fin = actividades_poa.fecha_fin;

                } else {

                }
                if (session.tipo_institucion !== ENUM_2.COMPANY_TYPE.publica) {
                    CRUD_actividades_apoyo.table.filters.columns.splice(5, 2);
                }
                ["bienes_permiso", "bienes_permiso_nombre", "presupuestario", "presupuestario_nombre"].forEach(d => {
                    if (actividades_poa[d] === '[NULL]')
                        actividades_poa[d] = '';
                });
                actividades_poa.refreshAngular();

            };
            actividades_poa.presupuesto_restante_calculate = function () {
                if (actividades_poa.form.selected('departamento') !== null) {
                    var DB_PRR = LAN.money(actividades_poa.form.selected('departamento').presupuesto_restante).value;
                    var PT_PR = LAN.money(actividades_poa.presupuesto).value;
                    var GB_PRA = actividades_poa.presupuesto_anterior;

                    var RESTANTE = mode == 'new' ?
                        (DB_PRR - PT_PR) :
                        (DB_PRR + GB_PRA) - PT_PR;
                    if (!actividades_poa.form.oldData.presupuesto_restante) {
                        actividades_poa.form.oldData = actividades_poa.form.getAudit();
                        if (LAN.money(RESTANTE).format(false) != actividades_poa.form.oldData['Presupuesto Restante']) {
                            if (actividades_poa.una_vez == "undefined") {
                                actividades_poa.form.oldData['Presupuesto Restante'] = LAN.money(RESTANTE).format(false);
                                actividades_poa.una_vez = true;
                            }
                        }
                    }
                    return LAN.money(RESTANTE).format(false);
                }
            };
            actividades_poa.triggers.table.after.control = async function (data) {
                let quierorefresh = false;
                if (data == 'range_date') {
                    if (mode === "new") {
                        actividades_poa.range_date = "";
                        quierorefresh = true;
                    }
                    if (typeof productos_poa !== 'undefined') {
                        if (typeof productos_poa !== 'not defined') {
                            if (productos_poa) {
                                actividades_poa.range_date_min(productos_poa.fecha_inicio);
                                actividades_poa.range_date_max(productos_poa.fecha_fin);
                            }
                        }
                    }

                }
                if (mode === 'edit' && data == 'presupuesto') {
                    actividades_poa.presupuesto = LAN.money(actividades_poa.presupuesto).format(false);
                }
                if (data === "show_prod") {
                    if (typeof productos_poa !== 'undefined') {
                        if (typeof productos_poa !== 'not defined') {
                            if (productos_poa) {
                                actividades_poa.show_prod = productos_poa.nombre;
                            }
                        }
                    }
                }
                if (data === "show_dept") {
                    if (typeof productos_poa !== 'undefined') {
                        if (typeof productos_poa !== 'not defined') {
                            if (productos_poa) {
                                actividades_poa.show_dept = productos_poa.departamento_object ? productos_poa.departamento_object.nombre : "";

                            }
                        }
                    }
                }
                if (data === "show_presupuesto") {
                    if (typeof productos_poa !== 'undefined') {
                        if (typeof productos_poa !== 'not defined') {
                            if (productos_poa) {
                                actividades_poa.show_presupuesto = productos_poa.departamento_object ? LAN.money(productos_poa.departamento_object.valor).format(false) : "";
                            }
                        }
                    }
                }
                if (data === "show_resultado") {
                    if (typeof productos_poa !== 'undefined') {
                        if (typeof productos_poa !== 'not defined') {
                            if (productos_poa) {
                                actividades_poa.show_resultado = productos_poa.resultado_object ? productos_poa.resultado_object.nombre_sin_hijos : "";
                            }
                        }
                    }
                }

                if (data == 'departamento') {
                    if (paso) {
                        if (actividades_poa.group_caracteristica == actividades_poa.analista_departamental
                            || actividades_poa.group_caracteristica == actividades_poa.director_departamental) {


                            if (!actividades_poa.depa_secundarios)
                                actividades_poa.form.options.departamento.disabled = true;
                            actividades_poa.form.loadDropDown('departamento');
                            quierorefresh = true;
                            paso = false;
                        } else {
                            if (mode !== "new") {
                                actividades_poa.eidt_actv = await BASEAPI.firstp("actividades_poa", {
                                    where: [{
                                        field: 'id',
                                        operator: "=",
                                        value: actividades_poa.id
                                    }]
                                });
                                actividades_poa.edit_prod = await BASEAPI.firstp("productos_poa", {
                                    where: [{
                                        field: 'id',
                                        operator: "=",
                                        value: actividades_poa.eidt_actv.producto
                                    }]
                                });
                                actividades_poa.departamento = actividades_poa.edit_prod.departamento + "";
                                actividades_poa.form.loadDropDown('departamento');
                                paso = false;
                            }
                        }
                    }
                    if (actividades_poa.form.selected('departamento') !== null) {
                        actividades_poa.presupuesto_anterior = 0;
                        actividades_poa.presupuesto_pro = LAN.money(actividades_poa.form.selected('departamento').presupuesto).format(false);
                        actividades_poa.edit_departamento = actividades_poa.form.selected('departamento').id;
                        var presupuesto_restante = mode == 'new' ? LAN.money(actividades_poa.form.selected('departamento').presupuesto_restante).value : LAN.money(actividades_poa.form.selected('departamento').presupuesto_restante_editar).value;
                        var presupuesto = LAN.money(actividades_poa.presupuesto).value;
                        actividades_poa.presupuesto_anterior = actividades_poa.presupuesto_ver || 0;

                        actividades_poa.presupuesto_restante_total = LAN.money((presupuesto_restante + presupuesto)).format(false);
                        actividades_poa.form.selected('departamento').presupuesto = LAN.money(actividades_poa.form.selected('departamento').presupuesto).format(false);

                        actividades_poa.presupuesto_restante = LAN.money(actividades_poa.presupuesto_restante_calculate()).format(false);
                        actividades_poa.true_presupuesto_restante_act = actividades_poa.presupuesto_restante;
                        quierorefresh = true;
                    }
                }

                if (data === 'producto') {
                    if (actividades_poa.form.selected('producto') !== null) {

                        actividades_poa.producto_poa_fecha_inicio = moment(actividades_poa.form.selected('producto').fecha_inicio.split('T')[0]).format('DD/MM/YYYY');
                        actividades_poa.producto_poa_fecha_fin = moment(actividades_poa.form.selected('producto').fecha_fin.split('T')[0]).format('DD/MM/YYYY');
                        actividades_poa.range_date_min(actividades_poa.form.selected('producto').fecha_inicio.split('T')[0]);
                        actividades_poa.range_date_max(actividades_poa.form.selected('producto').fecha_fin.split('T')[0]);
                    }
                }

                if (data === 'responsable') {
                    actividades_poa.paso = true;
                    if (actividades_poa.maneja_presupuesto) {
                        actividades_poa.presupuesto = LAN.money(actividades_poa.presupuesto).format(false);
                        actividades_poa.form.options.presupuesto.disabled = true;
                        quierorefresh = true;
                    } else {
                        actividades_poa.presupuesto = LAN.money(actividades_poa.presupuesto).format(false);
                        actividades_poa.form.options.presupuesto.disabled = false;
                        quierorefresh = true;
                    }
                    if (mode === 'edit' && data === 'responsable')
                        actividades_poa.data_user = actividades_poa.form.selected('responsable');
                }

                if (mode === 'new' && data == 'maneja_presupuesto') {
                    actividades_poa.maneja_presupuesto = false;
                    checkboxactividades_poa_maneja_presupuesto.setPosition(1);
                    quierorefresh = true;
                }
                if (mode === 'new' && data == 'presupuesto') {
                    checkboxactividades_poa_maneja_presupuesto.setPosition(2);
                    actividades_poa.form.options.presupuesto.disabled = true;
                    setTimeout(function () {
                        // checkboxactividades_poa_maneja_presupuesto.setPosition(2);
                    }, 1000);
                }
                ["bienes_permiso", "bienes_permiso_nombre", "presupuestario", "presupuestario_nombre"].forEach(d => {
                    if (actividades_poa[d] === '[NULL]')
                        actividades_poa[d] = '';
                });
                if (quierorefresh)
                    actividades_poa.refreshAngular();
            };
            actividades_poa.$scope.$watch('actividades_poa.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(actividades_poa, "nombre", rules)
            });
            actividades_poa.$scope.$watch('actividades_poa.producto', function (value) {
                actividades_poa.range_date = "";
                if (actividades_poa.form.selected('producto') !== null) {

                    actividades_poa.range_date = "";
                    actividades_poa.producto_poa_fecha_inicio = moment(actividades_poa.form.selected('producto').fecha_inicio.split('T')[0]).format('DD/MM/YYYY');
                    actividades_poa.producto_poa_fecha_fin = moment(actividades_poa.form.selected('producto').fecha_fin.split('T')[0]).format('DD/MM/YYYY');
                    actividades_poa.range_date_min(actividades_poa.form.selected('producto').fecha_inicio.split('T')[0]);
                    actividades_poa.range_date_max(actividades_poa.form.selected('producto').fecha_fin.split('T')[0]);
                    actividades_poa.range_date_start(actividades_poa.form.selected('producto').fecha_inicio.split('T')[0]);
                }
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_poa, "producto", rules);

            });
            if (typeof productos_poa != "undefined") {
                if (productos_poa) {
                    if (typeof productos_poa !== 'not defined') {
                        actividades_poa.$scope.$watch('actividades_poa.producto', function (value) {
                            actividades_poa.range_date = "";
                            if (actividades_poa.form.selected('producto') !== null) {

                                actividades_poa.range_date = "";
                                actividades_poa.producto_poa_fecha_inicio = moment(actividades_poa.form.selected('producto').fecha_inicio.split('T')[0]).format('DD/MM/YYYY');
                                actividades_poa.producto_poa_fecha_fin = moment(actividades_poa.form.selected('producto').fecha_fin.split('T')[0]).format('DD/MM/YYYY');
                                actividades_poa.range_date_min(actividades_poa.form.selected('producto').fecha_inicio.split('T')[0]);
                                actividades_poa.range_date_max(actividades_poa.form.selected('producto').fecha_fin.split('T')[0]);
                                actividades_poa.range_date_start(actividades_poa.form.selected('producto').fecha_inicio.split('T')[0]);
                            }
                            var rules = [];
                            VALIDATION.validate(actividades_poa, "producto", rules);
                        });
                    }
                }
            }
            actividades_poa.limpiar = false;
            actividades_poa.$scope.$watch('actividades_poa.departamento', function (value) {
                if (actividades_poa.form.selected('departamento') !== null) {
                    var presupuesto_restante = mode == 'new' ? LAN.money(actividades_poa.form.selected('departamento').presupuesto_restante).value : LAN.money(actividades_poa.form.selected('departamento').presupuesto_restante_editar).value;
                    actividades_poa.presupuesto_pro = LAN.money(actividades_poa.form.selected('departamento').presupuesto).format(false);
                    actividades_poa.presupuesto_restante = actividades_poa.presupuesto_restante_calculate();
                    if (actividades_poa.edit_departamento != value) {
                        actividades_poa.presupuesto_restante_total = LAN.money((presupuesto_restante)).format(false);
                    } else {
                        actividades_poa.presupuesto_restante_total = LAN.money((presupuesto_restante + actividades_poa.presupuesto_anterior)).format(false);
                    }
                    // if (actividades_poa.limpiar) {
                    //     if (actividades_poa.form.selected('producto')) {
                    //         actividades_poa.form.selected('producto').fecha_fin = "";
                    //         actividades_poa.form.selected('producto').fecha_inicio = "";
                    //         actividades_poa.form.selected('producto').resultado = "";
                    //     }
                    //
                    //     actividades_poa.range_date = "";
                    //     actividades_poa.presupuesto = 0;
                    // }
                    actividades_poa.range_date = "";
                    actividades_poa.presupuesto = 0;
                    actividades_poa.limpiar = true;

                    actividades_poa.form.selected('departamento').presupuesto = LAN.money(actividades_poa.form.selected('departamento').presupuesto).format(false);
                    actividades_poa.updateInputPresupuesto();
                }
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_poa, "departamento", rules)
            });
            actividades_poa.$scope.$watch('actividades_poa.responsable', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_poa, "responsable", rules)
            });
            actividades_poa.$scope.$watch('actividades_poa.fecha_inicio', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_poa, "fecha_inicio", rules)
            });
            actividades_poa.$scope.$watch('actividades_poa.fecha_fin', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_poa, "fecha_fin", rules)
            });
            actividades_poa.$scope.$watch('actividades_poa.range_date', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_poa, "fecha_inicio", rules);
                VALIDATION.validate(actividades_poa, "range_date", rules);
            });
            actividades_poa.$scope.$watch('actividades_poa.presupuesto', function (value) {
                var rules = [];
                if (actividades_poa.form.selected('departamento') !== null) {
                    if (actividades_poa.presupuesto_restante_total) {
                        rules.push(VALIDATION.yariel.greaterThanAct(LAN.money(value).value, LAN.money(actividades_poa.presupuesto_restante_total).value, "El monto de la actividad", "Presupuesto disponible del departamento"));
                    }
                }
                actividades_poa.presupuesto_restante = LAN.money(actividades_poa.presupuesto_restante_calculate()).format(false);
                VALIDATION.validate(actividades_poa, "presupuesto", rules);


            });
            actividades_poa.$scope.$watch('actividades_poa.maneja_presupuesto', async function (value) {

                if (value) {
                    if (actividades_poa.form.mode != "edit") {
                        actividades_poa.lista_act_apoyo_presupuesto = [];
                        var result = await BASEAPI.listp("actividades_apoyo", {
                            limit: 0,
                            order: "asc",
                            where: [
                                {
                                    field: "tempid",
                                    value: `actividades_poa${actividades_poa.form.options.actividades_apoyo.tempId}`
                                },
                                {
                                    field: "presupuesto",
                                    operator: ">",
                                    value: 0
                                }
                            ]
                        });
                        actividades_poa.lista_act_apoyo_presupuesto = result.data;
                        actividades_poa.sum_press_act_apoyo = 0;
                        for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                            actividades_poa.sum_press_act_apoyo += i.presupuesto;
                        }
                        ;
                        if (actividades_poa.presupuesto !== "") {
                            if (actividades_poa.maneja_presupuesto) {
                                actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo).format(false);
                            }
                        }
                        actividades_poa.form.options.presupuesto.disabled = true;
                        actividades_poa.refreshAngular();
                    } else {
                        actividades_poa.lista_act_apoyo_presupuesto = [];
                        var result = await BASEAPI.listp("actividades_apoyo", {
                            limit: 0,
                            order: "asc",
                            where: [
                                {
                                    field: "actividades_poa",
                                    value: actividades_poa.id
                                },
                                {
                                    field: "presupuesto",
                                    operator: ">",
                                    value: 0
                                }
                            ]
                        });
                        actividades_poa.lista_act_apoyo_presupuesto = result.data;
                        actividades_poa.sum_press_act_apoyo = 0;
                        for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                            actividades_poa.sum_press_act_apoyo += i.presupuesto;
                        }
                        ;
                        if (actividades_poa.maneja_presupuesto) {
                            actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo).format(false);
                        }
                        actividades_poa.form.options.presupuesto.disabled = true;
                        actividades_poa.refreshAngular();
                    }
                    actividades_poa.tipo_inversion = "[NULL]";
                    actividades_poa.form.loadDropDown('tipo_inversion');
                    actividades_poa.refreshAngular();
                } else if (value === false) {
                    if (typeof actividades_apoyo != "undefined") {
                        if (actividades_apoyo) {
                            if (typeof actividades_apoyo !== 'not defined') {
                                if (actividades_poa.lista_act_apoyo_presupuesto.length > 0) {
                                    SWEETALERT.show({
                                        message: "Debe quitar los presupuestos de actividades de apoyo.",
                                        type: "warning"
                                    });
                                    actividades_poa.maneja_presupuesto = true;
                                    checkboxactividades_poa_maneja_presupuesto.setPosition(2);
                                }
                            }
                        }
                    }
                    if (actividades_poa.form)
                        if (actividades_poa.form.options)
                            if (actividades_poa.form.options.presupuesto)
                                actividades_poa.form.options.presupuesto.disabled = false;
                } else {
                    if (actividades_poa.form)
                        if (actividades_poa.form.options)
                            if (actividades_poa.form.options.presupuesto)
                                actividades_poa.form.options.presupuesto.disabled = false;
                }
                actividades_poa.refreshAngular();
            });

        }
    };
    actividades_poa.updateInputPresupuesto = function () {
        actividades_poa.refreshAngular();
    };
});
