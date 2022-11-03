app.controller("vw_asignacion_especial_dashboard", function ($scope, $http, $compile) {
    vw_asignacion_especial_dashboard = this;
    vw_asignacion_especial_dashboard.currentdate = moment().format("YYYY-MM-DD");
    vw_asignacion_especial_dashboard.paso = false;
    vw_asignacion_especial_dashboard.fixFilters = [
        {
            "field": "poa",
            "value": new SESSION().current().estado ? new SESSION().current().poa_id : 0
        }
    ];
    $('.icon-plus-circle2 ').parent().hide();
    if (typeof dashboard != "undefined") {
        if (dashboard) {
            if (typeof dashboard !== 'not defined') {
                if (dashboard.departamento > 0) {
                    vw_asignacion_especial_dashboard.fixFilters.push({
                        "field": "departamento_solicitado",
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
                    vw_asignacion_especial_dashboard.fixFilters.push({
                        "field": "departamento_solicitado",
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
                    vw_asignacion_especial_dashboard.fixFilters.push({
                        "field": "departamento_solicitado",
                        "value": dashboard_presupuesto_barra.departamento
                    });
                }
            }
        }
    }


    if (typeof dashboard_cofiguration != "undefined") {
        if (dashboard_cofiguration) {
            if (typeof dashboard_cofiguration !== 'not defined') {
                if (!vw_asignacion_especial_dashboard.paso) {
                    if (dashboard_cofiguration.Masignaciones == "planificadas") {
                        vw_asignacion_especial_dashboard.base = [
                            {
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": ">",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            }
                        ];
                        if (dashboard_cofiguration.departamento_mostrar_id > 0) {
                            vw_asignacion_especial_dashboard.base.push({
                                "field": "departamento_solicitado",
                                "value": dashboard_cofiguration.departamento_mostrar_id
                            });
                        }
                        vw_asignacion_especial_dashboard.fixFilters = vw_asignacion_especial_dashboard.base.concat(dashboard_cofiguration.global_template);
                    }
                    if (dashboard_cofiguration.Masignaciones == "en ejecución") {
                        vw_asignacion_especial_dashboard.base = [
                            {
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": "<=",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ not in (${ENUM_2.asignacion_especial_estatus.Completado}, ${ENUM_2.asignacion_especial_estatus.Rechazado})`
                            }
                        ];
                        if (dashboard_cofiguration.departamento_mostrar_id > 0) {
                            vw_asignacion_especial_dashboard.base.push({
                                "field": "departamento_solicitado",
                                "value": dashboard_cofiguration.departamento_mostrar_id
                            });
                        }
                        vw_asignacion_especial_dashboard.fixFilters = vw_asignacion_especial_dashboard.base.concat(dashboard_cofiguration.global_template);
                    }
                    if (dashboard_cofiguration.Masignaciones == "vencidas") {
                        vw_asignacion_especial_dashboard.base = [
                            {
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "fecha_fin",
                                "operator": "<",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ not in (${ENUM_2.asignacion_especial_estatus.Completado}, ${ENUM_2.asignacion_especial_estatus.Rechazado})`
                            }
                        ];
                        if (dashboard_cofiguration.departamento_mostrar_id > 0) {
                            vw_asignacion_especial_dashboard.base.push({
                                "field": "departamento_solicitado",
                                "value": dashboard_cofiguration.departamento_mostrar_id
                            });
                        }
                        vw_asignacion_especial_dashboard.fixFilters = vw_asignacion_especial_dashboard.base.concat(dashboard_cofiguration.global_template);

                    }
                    if (dashboard_cofiguration.Masignaciones == "canceladas") {
                        vw_asignacion_especial_dashboard.base = [
                            {
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Rechazado})`
                            }
                        ];
                        if (dashboard_cofiguration.departamento_mostrar_id > 0) {
                            vw_asignacion_especial_dashboard.base.push({
                                "field": "departamento_solicitado",
                                "value": dashboard_cofiguration.departamento_mostrar_id
                            });
                        }
                        vw_asignacion_especial_dashboard.fixFilters = vw_asignacion_especial_dashboard.base.concat(dashboard_cofiguration.global_template);
                    }
                    if (dashboard_cofiguration.Masignaciones == "completadas") {
                        vw_asignacion_especial_dashboard.base = [
                            {
                                "field": "poa",
                                "value": dashboard_cofiguration.dashboardPoa
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Completado})`
                            }
                        ];
                        if (dashboard_cofiguration.departamento_mostrar_id > 0) {
                            vw_asignacion_especial_dashboard.base.push({
                                "field": "departamento_solicitado",
                                "value": dashboard_cofiguration.departamento_mostrar_id
                            });
                        }
                        vw_asignacion_especial_dashboard.fixFilters = vw_asignacion_especial_dashboard.base.concat(dashboard_cofiguration.global_template);
                    }
                    vw_asignacion_especial_dashboard.paso = true;
                }
            }
        }
    }
    if (typeof dashboard != "undefined") {
        if (dashboard) {
            if (typeof dashboard !== 'not defined') {
                if (!vw_asignacion_especial_dashboard.paso) {
                    if (dashboard.Masignaciones == "sin información") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": -1
                            }
                        ];
                    }
                    if (dashboard.Masignaciones == " ") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard.poa
                            }
                        ];
                        if (dashboard.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": dashboard.departamento
                            });
                        }
                    }
                    if (dashboard.Masignaciones == "planificados") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard.poa
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": ">",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Pendiente})`
                            },
                        ];
                        if (dashboard.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": dashboard.departamento
                            });
                        }
                    }
                    if (dashboard.Masignaciones == "en ejecución") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard.poa
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": "<=",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Pendiente})`
                            },
                        ];
                        if (dashboard.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": dashboard.departamento
                            });
                        }
                    }
                    if (dashboard.Masignaciones == "vencidos") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard.poa
                            },
                            {
                                "field": "fecha_fin",
                                "operator": "<",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Pendiente})`
                            },
                        ];
                        if (dashboard.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": dashboard.departamento
                            });
                        }
                    }
                    if (dashboard.Masignaciones == "cancelados") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard.poa
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Rechazado})`
                            },
                        ];
                        if (dashboard.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": dashboard.departamento
                            });
                        }
                    }
                    if (dashboard.Masignaciones == "completados") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": dashboard.poa
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Completado})`
                            },
                        ];
                        if (dashboard.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": dashboard.departamento
                            });
                        }
                    }
                    if (dashboard.institucion_object.tipo === "i") {
                        vw_asignacion_especial_dashboard.fixFilters.push({
                            "field": "institucion",
                            "value": dashboard.institucion
                        });
                        vw_asignacion_especial_dashboard.fixFilters.push({
                            "field": "compania",
                            "value": "$compania"
                        });
                    } else {
                        vw_asignacion_especial_dashboard.fixFilters.push({
                            "field": "compania",
                            "value": dashboard.institucion
                        });
                        vw_asignacion_especial_dashboard.fixFilters.push({
                            "field": "institucion",
                            "operator": "",
                            "value": "$ is NULL"
                        });
                    }
                    vw_asignacion_especial_dashboard.paso = true;
                }
            }
        }
    }
    if (typeof notificacion != "undefined") {
        if (notificacion) {
            if (typeof notificacion !== 'not defined') {
                if (!vw_asignacion_especial_dashboard.paso) {
                    if (notificacion.Masignaciones == "sin información") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": -1
                            }
                        ];
                    }
                    if (notificacion.Masignaciones == " ") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion.poa
                            }
                        ];
                        if (notificacion.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": notificacion.departamento
                            });
                        }
                    }
                    if (notificacion.Masignaciones == "planificados") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion.poa
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": ">",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Pendiente})`
                            },
                        ];
                        if (notificacion.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": notificacion.departamento
                            });
                        }
                    }
                    if (notificacion.Masignaciones == "en ejecución") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion.poa
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": "<=",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Pendiente})`
                            },
                        ];
                        if (notificacion.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": notificacion.departamento
                            });
                        }
                    }
                    if (notificacion.Masignaciones == "vencidos") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion.poa
                            },
                            {
                                "field": "fecha_fin",
                                "operator": "<",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Pendiente})`
                            },
                        ];
                        if (notificacion.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": notificacion.departamento
                            });
                        }
                    }
                    if (notificacion.Masignaciones == "cancelados") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion.poa
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Rechazado})`
                            },
                        ];
                        if (notificacion.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": notificacion.departamento
                            });
                        }
                    }
                    if (notificacion.Masignaciones == "completados") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": notificacion.poa
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Completado})`
                            },
                        ];
                        if (notificacion.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": notificacion.departamento
                            });
                        }
                    }
                    if (notificacion.institucion_object.tipo === "i") {
                        vw_asignacion_especial_dashboard.fixFilters.push({
                            "field": "institucion",
                            "value": notificacion.institucion
                        });
                        vw_asignacion_especial_dashboard.fixFilters.push({
                            "field": "compania",
                            "value": "$compania"
                        });
                    } else {
                        vw_asignacion_especial_dashboard.fixFilters.push({
                            "field": "compania",
                            "value": notificacion.institucion
                        });
                        vw_asignacion_especial_dashboard.fixFilters.push({
                            "field": "institucion",
                            "operator": "",
                            "value": "$ is NULL"
                        });
                    }
                    vw_asignacion_especial_dashboard.paso = true;
                }
            }
        }
    }
    if (typeof dashboard_presupuesto_barra != "undefined") {
        if (dashboard_presupuesto_barra) {
            if (typeof dashboard_presupuesto_barra !== 'not defined') {
                if (!vw_asignacion_especial_dashboard.paso) {
                    if (dashboard_presupuesto_barra.Masignaciones == "planificados") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": new SESSION().current().estado ? new SESSION().current().poa_id : 0
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": ">",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                        ];
                        if (dashboard_presupuesto_barra.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": dashboard_presupuesto_barra.departamento
                            });
                        }
                    }
                    if (dashboard_presupuesto_barra.Masignaciones == "en ejecución") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": new SESSION().current().estado ? new SESSION().current().poa_id : 0
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": "<=",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ not in (${ENUM_2.asignacion_especial_estatus.Completado}, ${ENUM_2.asignacion_especial_estatus.Rechazado})`
                            },
                        ];
                        if (dashboard_presupuesto_barra.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": dashboard_presupuesto_barra.departamento
                            });
                        }
                    }
                    if (dashboard_presupuesto_barra.Masignaciones == "vencidos") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": new SESSION().current().estado ? new SESSION().current().poa_id : 0
                            },
                            {
                                "field": "fecha_fin",
                                "operator": "<",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ not in (${ENUM_2.asignacion_especial_estatus.Completado}, ${ENUM_2.asignacion_especial_estatus.Rechazado})`
                            },
                        ];
                        if (dashboard_presupuesto_barra.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": dashboard_presupuesto_barra.departamento
                            });
                        }
                    }
                    if (dashboard_presupuesto_barra.Masignaciones == "completados") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": new SESSION().current().estado ? new SESSION().current().poa_id : 0
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Completado}, ${ENUM_2.asignacion_especial_estatus.Rechazado})`
                            },
                        ];
                        if (dashboard_presupuesto_barra.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": dashboard_presupuesto_barra.departamento
                            });
                        }
                    }

                    vw_asignacion_especial_dashboard.paso = true;
                }
            }
        }
    }
    if (typeof vw_dashboard_proyecto != "undefined") {
        if (vw_dashboard_proyecto) {
            if (typeof vw_dashboard_proyecto !== 'not defined') {
                if (!vw_asignacion_especial_dashboard.paso) {
                    if (vw_dashboard_proyecto.Masignaciones == "sin información") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "poa",
                                "value": -1
                            }
                        ];
                    }
                    if (vw_dashboard_proyecto.Masignaciones == " ") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "pei",
                                "value": vw_dashboard_proyecto.session.pei_id
                            }
                        ];
                        if (vw_dashboard_proyecto.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": vw_dashboard_proyecto.departamento
                            });
                        }
                    }
                    if (vw_dashboard_proyecto.Masignaciones == "planificados") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "pei",
                                "value": vw_dashboard_proyecto.session.pei_id
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": ">",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Pendiente})`
                            },
                        ];
                        if (vw_dashboard_proyecto.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": vw_dashboard_proyecto.departamento
                            });
                        }
                    }
                    if (vw_dashboard_proyecto.Masignaciones == "en ejecución") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "pei",
                                "value": vw_dashboard_proyecto.session.pei_id
                            },
                            {
                                "field": "fecha_inicio",
                                "operator": "<=",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Pendiente})`
                            },
                        ];
                        if (vw_dashboard_proyecto.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": vw_dashboard_proyecto.departamento
                            });
                        }
                    }
                    if (vw_dashboard_proyecto.Masignaciones == "vencidos") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "pei",
                                "value": vw_dashboard_proyecto.session.pei_id
                            },
                            {
                                "field": "fecha_fin",
                                "operator": "<",
                                "value": vw_asignacion_especial_dashboard.currentdate
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Pendiente})`
                            },
                        ];
                        if (vw_dashboard_proyecto.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": vw_dashboard_proyecto.departamento
                            });
                        }
                    }
                    if (vw_dashboard_proyecto.Masignaciones == "cancelados") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "pei",
                                "value": vw_dashboard_proyecto.session.pei_id
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Rechazado})`
                            },
                        ];
                        if (vw_dashboard_proyecto.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": vw_dashboard_proyecto.departamento
                            });
                        }
                    }
                    if (vw_dashboard_proyecto.Masignaciones == "completados") {
                        vw_asignacion_especial_dashboard.fixFilters = [
                            {
                                "field": "pei",
                                "value": vw_dashboard_proyecto.session.pei_id
                            },
                            {
                                "field": "estatus",
                                "operator": "",
                                "value": `$ in (${ENUM_2.asignacion_especial_estatus.Completado})`
                            },
                        ];
                        if (vw_dashboard_proyecto.departamento > 0) {
                            vw_asignacion_especial_dashboard.fixFilters.push({
                                "field": "departamento_solicitado",
                                "value": vw_dashboard_proyecto.departamento
                            });
                        }
                    }
                    vw_asignacion_especial_dashboard.paso = true;
                }
            }
        }
    }
    //vw_asignacion_especial_dashboard.singular = "singular";
    //vw_asignacion_especial_dashboard.plural = "plural";
    //vw_asignacion_especial_dashboard.headertitle = "Hola Title";
    RUNCONTROLLER("vw_asignacion_especial_dashboard", vw_asignacion_especial_dashboard, $scope, $http, $compile);
    RUN_B("vw_asignacion_especial_dashboard", vw_asignacion_especial_dashboard, $scope, $http, $compile);
    vw_asignacion_especial_dashboard.triggers.table.after.load = function (records) {


    };

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

    if (hasDashboard) {
        title_header_dashboard_table_poa(vw_asignacion_especial_dashboard, "Asignaciones Especiales", dashboard.form.selected('poa').periodo_poa);
    } else if (hasDashboardConfig) {
        title_header_dashboard_table_poa(vw_asignacion_especial_dashboard, "Asignaciones Especiales", dashboard_cofiguration.form.selected('vw_dashboard_poas').periodo_poa);
    } else {
        title_header_table_poa(vw_asignacion_especial_dashboard, "Asignaciones Especiales");
    }

    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //Put This in 0-config/security/permission.json
    //"blog": {
    //"type": "report",
    //"allow": {}
    //},
});
