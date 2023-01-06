app.controller("dashboard_proceso", function ($scope, $http, $compile) {
    dashboard_proceso = this;

    RUNCONTROLLER("dashboard_proceso", dashboard_proceso, $scope, $http, $compile);
    RUN_B("dashboard_proceso", dashboard_proceso, $scope, $http, $compile);
    dashboard_proceso.headertitle = "Indicadores_Producto";

    function createArray(len, itm) {
        var arr1 = [itm],
            arr2 = [];
        while (len > 0) {
            if (len & 1) arr2 = arr2.concat(arr1);
            arr1 = arr1.concat(arr1);
            len >>>= 1;
        }
        return arr2;
    }

    dashboard_proceso.loadCharts = true;
    var user = new SESSION().current();
    var animation = new ANIMATION();
    dashboard_proceso.pei_id = user.pei_id;
    dashboard_proceso.compania_id = user.compania_id;
    dashboard_proceso.group_caracteristica = user.groups[0].caracteristica;
    dashboard_proceso.currentYear = moment().year();
    dashboard_proceso.session = user;
    dashboard_proceso.columnsstack_data = {
        legend: [],
        down: [],
        data: []
    };
    dashboard_proceso.pie_events = {
        'click': function (data) {
            console.log(data);
            dashboard_proceso.openmodalproductos(data.name.toString().toLowerCase());
        }
    };
    dashboard_proceso.pie2_events = {
        'click': function (data) {
            console.log(data);
            data.name = data.name == 'Sin información' ? ' ' : data.name.toString().toLowerCase();
            dashboard_proceso.openmodalactividades(data.name);
        }
    };
    dashboard_proceso.pie3_events = {
        'click': function (data) {
            dashboard_proceso.openmodalasignaciones(data.name.toString().toLowerCase());
        }
    };
    dashboard_proceso.pie_data = [{value: 1, name: "N/A"}];
    dashboard_proceso.pie2_data = [{value: 1, name: "N/A"}];
    dashboard_proceso.pie3_data = [{value: 1, name: "N/A"}];
    dashboard_proceso.area_data = {
        legend: [],
        down: [],
        data: []
    };
    dashboard_proceso.area2_data = {
        legend: [],
        down: [],
        data: []
    };
    dashboard_proceso.area3_data = {
        legend: [],
        down: [],
        data: []
    };
    dashboard_proceso.array_procesos = [];
    dashboard_proceso.getMapaProceso = async function (callback) {
        var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value:  dashboard_proceso.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  dashboard_proceso.session.institucion_id ? "=" : "is",
                    "value":  dashboard_proceso.session.institucion_id ?  dashboard_proceso.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (mapaData) {
            dashboard_proceso.mapa_id = mapaData.id;
        }
        if (callback)
            callback();
    }
    dashboard_proceso.getPlanesAuditoria = function (callback) {
        animation.loading(`#PlanAuditoria`, "", ``, '30');
        dashboard_proceso.condition_plan = [];
        if (dashboard_proceso.session.institucion) {
            dashboard_proceso.condition_plan = [
                {
                    field: "institucion",
                    value: dashboard_proceso.session.institucion_id
                },
                {
                    field: "id",
                    value: dashboard_proceso.mapa_id ? dashboard_proceso.mapa_id : -1
                }
            ];
        } else {
            dashboard_proceso.condition_plan = [
                {
                    field: "institucion",
                    operator: "is",
                    value: "$null"
                },
                {
                    field: "compania",
                    value: dashboard_proceso.session.compania_id
                },
                {
                    field: "id",
                    value: dashboard_proceso.mapa_id ? dashboard_proceso.mapa_id : -1
                }
            ];
        }
        dashboard_proceso.planes = {
            cantidad: 0,
            preplanificacion: 0,
            planificadas: 0,
            autorizadas: 0,
            enproceso: 0,
            recoleccionfinalizadas: 0,
            informepreliminar: 0,
            finalizadas: 0,
            cerradas: 0,
        };
        BASEAPI.listp('vw_dashboard_plan_auditoria_proceso', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: dashboard_proceso.condition_plan
        }).then(async function (result) {
            dashboard_proceso.nombre_estatus_plan = await BASEAPI.listp('auditoria_programa_plan_estatus', {
                limit: 0,
                orderby: "code",
                order: "asc",
                where: [
                    {
                        field: "entidad",
                        value: 1
                    }
                ]
            });
            dashboard_proceso.nombre_estatus_plan = dashboard_proceso.nombre_estatus_plan.data;
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_proceso.listplanes = result;
            dashboard_proceso.array_planes = [];
            dashboard_proceso.planes.cantidad = 0;
            dashboard_proceso.planes.preplanificacion = 0;
            dashboard_proceso.planes.planificadas = 0;
            dashboard_proceso.planes.enproceso = 0;
            dashboard_proceso.planes.autorizadas = 0;
            dashboard_proceso.planes.recoleccionfinalizadas = 0;
            dashboard_proceso.planes.informepreliminar = 0;
            dashboard_proceso.planes.finalizadas = 0;
            dashboard_proceso.planes.cerradas = 0;
            if (dashboard_proceso.listplanes.data) {
                if (dashboard_proceso.listplanes.data.length > 0) {
                    for (var pr = 0; pr < dashboard_proceso.listplanes.data.length; pr++) {
                        dashboard_proceso.planes.preplanificacion += parseInt(dashboard_proceso.listplanes.data[pr].preplanificacion) || 0;
                        dashboard_proceso.planes.planificadas += parseInt(dashboard_proceso.listplanes.data[pr].planificadas) || 0;
                        dashboard_proceso.planes.enproceso += parseInt(dashboard_proceso.listplanes.data[pr].enproceso) || 0;
                        dashboard_proceso.planes.autorizadas += parseInt(dashboard_proceso.listplanes.data[pr].autorizadas) || 0;
                        dashboard_proceso.planes.recoleccionfinalizadas += parseInt(dashboard_proceso.listplanes.data[pr].recoleccionfinalizadas) || 0;
                        dashboard_proceso.planes.informepreliminar += parseInt(dashboard_proceso.listplanes.data[pr].informepreliminar) || 0;
                        dashboard_proceso.planes.finalizadas += parseInt(dashboard_proceso.listplanes.data[pr].finalizadas) || 0;
                        dashboard_proceso.planes.cerradas += parseInt(dashboard_proceso.listplanes.data[pr].cerradas) || 0;
                        dashboard_proceso.planes.cantidad += parseInt(dashboard_proceso.listplanes.data[pr].cantidad) || 0;
                    }

                    for (var i in dashboard_proceso.planes) {
                        dashboard_proceso.planes[i] = parseInt(dashboard_proceso.planes[i]) < 10 ? ('0' + dashboard_proceso.planes[i]) : dashboard_proceso.planes[i];
                        if (i !== 'cantidad')
                            dashboard_proceso.array_planes.push(
                                {
                                    name: i == 'preplanificacion' ? dashboard_proceso.nombre_estatus_plan[0].nombre : i == 'autorizadas' ? dashboard_proceso.nombre_estatus_plan[2].nombre : i == 'recoleccionfinalizadas' ? dashboard_proceso.nombre_estatus_plan[5].nombre : i == 'informepreliminar' ? dashboard_proceso.nombre_estatus_plan[6].nombre : i == 'enproceso' ? dashboard_proceso.nombre_estatus_plan[3].nombre : i == "planificadas" ? dashboard_proceso.nombre_estatus_plan[1].nombre : i == "finalizadas" ? dashboard_proceso.nombre_estatus_plan[4].nombre : i == "cerradas" ? dashboard_proceso.nombre_estatus_plan[7].nombre : "????",
                                    value: LAN.money(dashboard_proceso.planes[i]).value,
                                    percent: dashboard_proceso.planes.cantidad > 0 ? Math.round((LAN.money(dashboard_proceso.planes[i]).value / LAN.money(dashboard_proceso.planes.cantidad).value) * 100) + '%' : '0%',
                                    total: LAN.money(dashboard_proceso.planes.cantidad).value,
                                    icon: i == 'informepreliminar' ? 'icon-certificate' : i == 'recoleccionfinalizadas' ? 'icon-stack-check' : i == 'finalizadas' ? 'icon-checkmark4' : i == 'preplanificacion' ? 'icon-strategy' : i == 'planificadas' ? 'icon-arrow-right16' : i == 'autorizadas' ? 'icon-clipboard2' : i == 'enproceso' ? ' icon-cogs' : i == 'cerradas' ? ' icon-switch' : 'icon-question3',
                                    color: i == 'informepreliminar' ? '#6a46e0' : i == 'recoleccionfinalizadas' ? '#543070' : i == 'finalizadas' ? '#4451DB' : i == 'preplanificacion' ? '#5F5FAF' : i == 'planificadas' ? '#84a379' : i == 'autorizadas' ? '#548235' : i == 'enproceso' ? '#6b4d82' : i == 'cerradas' ? '#4613ed' : '#CCCCCC',
                                    order: i == 'informepreliminar' ? '6' : i == 'recoleccionfinalizadas' ? '5' : i == 'finalizadas' ? '7' : i == 'preplanificacion' ? '1' : i == 'planificadas' ? '2' : i == 'autorizadas' ? '3' : i == 'enproceso' ? '4' : i == 'cerradas' ? '8' : '9',
                                    light_color: i == 'informepreliminar' ? '#7c65c9' : i == 'recoleccionfinalizadas' ? '#995ccc' : i == 'finalizadas' ? '#7784FF' : i == 'preplanificacion' ? '#9292E2' : i == 'planificadas' ? '#a4de90' : i == 'autorizadas' ? '#87B568' : i == 'enproceso' ? '#a87dc9' : i == 'cerradas' ? '#7373ff' : '#CCCCCC',
                                    font_color: 'white',
                                    title: "Hacer clic para ver detalle"
                                }
                            )
                    }
                }
            }
            animation.stoploading(`#PlanAuditoria`);
            dashboard_proceso.refreshAngular();
            if (callback)
                callback();
        });
    }
    dashboard_proceso.getProcesos = async function (callback) {
        animation.loading(`#procesos`, "", ``, '30');
        if (dashboard_proceso.session.institucion) {
            dashboard_proceso.condition = [
                {
                    field: "institucion",
                    value: dashboard_proceso.session.institucion_id
                },
                {
                    field: "id",
                    value: dashboard_proceso.mapa_id ? dashboard_proceso.mapa_id : -1
                }
            ];
        } else {
            dashboard_proceso.condition = [
                {
                    field: "institucion",
                    operator: "is",
                    value: "$null"
                },
                {
                    field: "compania",
                    value: dashboard_proceso.session.compania_id
                },
                {
                    field: "id",
                    value: dashboard_proceso.mapa_id ? dashboard_proceso.mapa_id : -1
                }
            ];
        }
        dashboard_proceso.procesos = {
            cantidad: 0,
            completados: 0,
            iniciados: 0,
            autorizados: 0,
        };
        BASEAPI.listp('vw_dashboard_procesos', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: dashboard_proceso.condition
        }).then(async function (result) {
            dashboard_proceso.nombre_estatus_proceso = await BASEAPI.listp('auditoria_programa_plan_estatus', {
                limit: 0,
                orderby: "code",
                order: "asc",
                where: [
                    {
                        field: "entidad",
                        value: 3
                    }
                ]
            });
            dashboard_proceso.nombre_estatus_proceso = dashboard_proceso.nombre_estatus_proceso.data;
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_proceso.listprocesos = result;
            dashboard_proceso.array_procesos = [];
            dashboard_proceso.procesos.cantidad = 0;
            dashboard_proceso.procesos.completados = 0;
            dashboard_proceso.procesos.iniciados = 0;
            dashboard_proceso.procesos.autorizados = 0;
            if (dashboard_proceso.listprocesos.data) {
                if (dashboard_proceso.listprocesos.data.length > 0) {
                    for (var pr = 0; pr < dashboard_proceso.listprocesos.data.length; pr++) {
                        dashboard_proceso.procesos.autorizados += parseInt(dashboard_proceso.listprocesos.data[pr].autorizados) || 0;
                        dashboard_proceso.procesos.iniciados += parseInt(dashboard_proceso.listprocesos.data[pr].iniciados) || 0;
                        dashboard_proceso.procesos.completados += parseInt(dashboard_proceso.listprocesos.data[pr].completados) || 0;
                        dashboard_proceso.procesos.cantidad += parseInt(dashboard_proceso.listprocesos.data[pr].cantidad) || 0;
                    }

                    for (var i in dashboard_proceso.procesos) {
                        dashboard_proceso.procesos[i] = parseInt(dashboard_proceso.procesos[i]) < 10 ? ('0' + dashboard_proceso.procesos[i]) : dashboard_proceso.procesos[i];
                        if (i !== 'cantidad')
                            dashboard_proceso.array_procesos.push(
                                {
                                    name: i == "iniciados" ? dashboard_proceso.nombre_estatus_proceso[0].nombre : i == "completados" ? dashboard_proceso.nombre_estatus_proceso[1].nombre : i == "autorizados" ? dashboard_proceso.nombre_estatus_proceso[2].nombre : "????",
                                    value: LAN.money(dashboard_proceso.procesos[i]).value,
                                    percent: dashboard_proceso.procesos.cantidad > 0 ? Math.round((LAN.money(dashboard_proceso.procesos[i]).value / LAN.money(dashboard_proceso.procesos.cantidad).value) * 100) + '%' : '0%',
                                    total: LAN.money(dashboard_proceso.procesos.cantidad).value,
                                    icon: i == 'completados' ? 'icon-checkmark4' : i == 'iniciados' ? 'icon-arrow-right16' : i == 'autorizados' ? 'icon-clipboard2' : 'icon-question3',
                                    color: i == 'autorizados' ? '#4451DB' : i == 'iniciados' ? '#84a379' : i == 'completados' ? '#548235' : '#CCCCCC',
                                    order: i == 'completados' ? '2' : i == 'iniciados' ? '1' : i == 'autorizados' ? '3' : '7',
                                    light_color: i == 'autorizados' ? '#7784FF' : i == 'iniciados' ? '#a4de90' : i == 'completados' ? '#87B568' : '#CCCCCC',
                                    font_color: 'white',
                                    title: "Hacer clic para ver detalle"
                                }
                            )
                    }
                }
            }
            animation.stoploading(`#procesos`);
            dashboard_proceso.refreshAngular();
            if (callback)
                callback();
        });
    }
    dashboard_proceso.getDocumentos = async function (callback) {
        animation.loading(`#documentos`, "", ``, '30');
        if (dashboard_proceso.session.institucion) {
            dashboard_proceso.condition = [
                {
                    field: "institucion",
                    value: dashboard_proceso.session.institucion_id
                },
                {
                    field: "id",
                    value: dashboard_proceso.mapa_id ? dashboard_proceso.mapa_id : -1
                }
            ];
        } else {
            dashboard_proceso.condition = [
                {
                    field: "institucion",
                    operator: "is",
                    value: "$null"
                },
                {
                    field: "compania",
                    value: dashboard_proceso.session.compania_id
                },
                {
                    field: "id",
                    value: dashboard_proceso.mapa_id ? dashboard_proceso.mapa_id : -1
                }
            ];
        }
        dashboard_proceso.documentos = {
            cantidad: 0,
            completados: 0,
            iniciados: 0,
            autorizados: 0,
        };
        BASEAPI.listp('vw_dashboard_documentos', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: dashboard_proceso.condition
        }).then(async function (result) {
            dashboard_proceso.nombre_estatus_documento = await BASEAPI.listp('auditoria_programa_plan_estatus', {
                limit: 0,
                orderby: "code",
                order: "asc",
                where: [
                    {
                        field: "entidad",
                        value: 2
                    }
                ]
            });
            dashboard_proceso.nombre_estatus_documento = dashboard_proceso.nombre_estatus_documento.data;
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_proceso.listdocumentos = result;
            dashboard_proceso.array_documentos = [];
            dashboard_proceso.documentos.cantidad = 0;
            dashboard_proceso.documentos.completados = 0;
            dashboard_proceso.documentos.iniciados = 0;
            dashboard_proceso.documentos.autorizados = 0;
            if (dashboard_proceso.listdocumentos.data) {
                if (dashboard_proceso.listdocumentos.data.length > 0) {
                    for (var pr = 0; pr < dashboard_proceso.listprocesos.data.length; pr++) {
                        dashboard_proceso.documentos.autorizados += parseInt(dashboard_proceso.listdocumentos.data[pr].autorizados) || 0;
                        dashboard_proceso.documentos.iniciados += parseInt(dashboard_proceso.listdocumentos.data[pr].iniciados) || 0;
                        dashboard_proceso.documentos.completados += parseInt(dashboard_proceso.listdocumentos.data[pr].completados) || 0;
                        dashboard_proceso.documentos.cantidad += parseInt(dashboard_proceso.listdocumentos.data[pr].cantidad) || 0;
                    }

                    for (var i in dashboard_proceso.documentos) {
                        dashboard_proceso.procesos[i] = parseInt(dashboard_proceso.documentos[i]) < 10 ? ('0' + dashboard_proceso.documentos[i]) : dashboard_proceso.documentos[i];
                        if (i !== 'cantidad')
                            dashboard_proceso.array_documentos.push(
                                {
                                    name: i == "iniciados" ? dashboard_proceso.nombre_estatus_documento[0].nombre : i == "completados" ? dashboard_proceso.nombre_estatus_documento[2].nombre : i == "autorizados" ? dashboard_proceso.nombre_estatus_documento[1].nombre : "????",
                                    value: LAN.money(dashboard_proceso.documentos[i]).value,
                                    percent: dashboard_proceso.documentos.cantidad > 0 ? Math.round((LAN.money(dashboard_proceso.documentos[i]).value / LAN.money(dashboard_proceso.documentos.cantidad).value) * 100) + '%' : '0%',
                                    total: LAN.money(dashboard_proceso.documentos.cantidad).value,
                                    icon: i == 'completados' ? 'icon-checkmark4' : i == 'pendientes' ? 'icon-hour-glass2' : i == 'iniciados' ? 'icon-arrow-right16' : i == 'autorizados' ? 'icon-clipboard2' : 'icon-question3',
                                    color: i == 'autorizados' ? '#4451DB' : i == 'iniciados' ? '#84a379' : i == 'completados' ? '#548235' : '#CCCCCC',
                                    order: i == 'completados' ? '2' : i == 'iniciados' ? '1' : i == 'autorizados' ? '3' : '7',
                                    light_color: i == 'autorizados' ? '#7784FF' : i == 'iniciados' ? '#a4de90' : i == 'completados' ? '#87B568' : '#CCCCCC',
                                    font_color: 'white',
                                    title: "Hacer clic para ver detalle"
                                }
                            )
                    }
                }
            }
            animation.stoploading(`#documentos`);
            dashboard_proceso.refreshAngular();
            if (callback)
                callback();
        });
    }
    dashboard_proceso.getMapaProceso();
    dashboard_proceso.getPlanesAuditoria();
    dashboard_proceso.getProcesos();
    dashboard_proceso.getDocumentos();
    var paso2 = false;
    var paso = false;
    dashboard_proceso.searchFirstData = true;
    dashboard_proceso.searchData = function () {
        vw_dashboard_productosgrid_proceso.fixFilters = [
            {
                field: dashboard_proceso.institucion === '[NULL]' ? "compania" : "entidad",
                value: dashboard_proceso.institucion === '[NULL]' ? user.compania_id : dashboard_proceso.institucion,
            },
            {
                field: "mapa_proceso",
                value: dashboard_proceso.mapa_id ? dashboard_proceso.mapa_id : -1
            }
        ];

        if (dashboard_proceso.institucion === "[NULL]") {
            dashboard_proceso.poabushin = [];
            for (var item of dashboard_proceso.form.options.institucion.data) {
                if (item.compania == dashboard_proceso.compania_id) {
                    if (item.poa)
                        dashboard_proceso.poabushin.push(item.poa);
                }
            }
        } else {
            dashboard_proceso.poabushin = dashboard_proceso.poa;
        }


        // vw_dashboard_productosgrid.goPage(1);
        // vw_dashboard_productosgrid_actividades.goPage(1);
        // vw_dashboard_productosgrid_pei.goPage(1);
        dashboard_proceso.getAll();
        CRUD_vw_dashboard_productosgrid_proceso.table.filters.columns[0].query.where = [

            {
                field: dashboard_proceso.institucion === '[NULL]' ? "compania" : "entidad",
                value: dashboard_proceso.institucion === '[NULL]' ? dashboard_proceso.compania_id : dashboard_proceso.institucion,
            }
        ];
    };

    dashboard_proceso.triggers.table.after.close = function (data) {
        MENUMODAL = true;
        dashboard_proceso.firstWatch = 1;
    };

    //Aquí se hace la validación de que si el usuario es director o analista departamental
    dashboard_proceso.triggers.table.after.control = function (data) {
        if (data === "poa") {
            if (paso2 == false && dashboard_proceso.group_caracteristica == ENUM_2.Grupos.director_departamental || paso2 == false && dashboard_proceso.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                dashboard_proceso.poa = user.poa_id.toString();
                dashboard_proceso.poabushin = dashboard_proceso.poa;
                dashboard_proceso.form.loadDropDown('poa');
                paso2 = true;
            } else if (paso2 == false) {
                dashboard_proceso.poa = user.poa_id.toString();
                dashboard_proceso.poabushin = dashboard_proceso.poa;
                dashboard_proceso.form.loadDropDown('poa');
                paso2 = true;
                dashboard_proceso.form.options.poa.disabled = false;
                dashboard_proceso.refreshAngular();
            }
        }
        if (data === "departamento") {
            dashboard_proceso.getAll();
            if (paso == false && dashboard_proceso.group_caracteristica == ENUM_2.Grupos.director_departamental || paso == false && dashboard_proceso.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                dashboard_proceso.departamento = user.departamento.toString();
                dashboard_proceso.searchFirstData = true;
                dashboard_proceso.form.loadDropDown('departamento');
                paso = true;
            } else if (paso == false) {
                dashboard_proceso.departamento = "0";
                dashboard_proceso.form.loadDropDown('departamento');
                paso = true;
                dashboard_proceso.form.options.departamento.disabled = false;
                dashboard_proceso.refreshAngular();
                dashboard_proceso.searchFirstData = false;

            } else {
                dashboard_proceso.searchFirstData = false;
                dashboard_proceso.refreshAngular();
            }


        }

    };
    //Aquí acaba.

    dashboard_proceso.openmodalplanes = function (value) {
        dashboard_proceso.Mplanes = value;
        console.log("Entre", dashboard_proceso.Mplanes)
        dashboard_proceso.modal.modalView("auditoria_programa_plan", {
            width: 'modal-full',
            header: {
                title: "Auditorías " + dashboard_proceso.Mplanes,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'auditoria_programa_plan',
            },
            event: {
                show: {
                    end: function (data) {
                        setTimeout(function () {
                            if (typeof auditoria_programa_plan != 'undefined') {
                                if (typeof auditoria_programa_plan != 'not defined') {
                                    if (auditoria_programa_plan) {
                                        auditoria_programa_plan.setPermission("add", false);
                                        auditoria_programa_plan.setPermission("edit", false);
                                        auditoria_programa_plan.setPermission("remove", false);
                                        auditoria_programa_plan.setPermission("export", false);
                                    }
                                }
                            }
                        }, 500);
                    }
                },
                hide: {
                    end: function (data) {
                        setTimeout(function () {
                            if (typeof auditoria_programa_plan != 'undefined') {
                                if (typeof auditoria_programa_plan != 'not defined') {
                                    if (auditoria_programa_plan) {
                                        auditoria_programa_plan.setPermission("add", true);
                                        auditoria_programa_plan.setPermission("edit", true);
                                        auditoria_programa_plan.setPermission("remove", true);
                                        auditoria_programa_plan.setPermission("export", true);
                                    }
                                }
                            }
                        }, 500);
                    }
                }
            }
        });
    };
    dashboard_proceso.openmodalprocesos = function (value) {
        dashboard_proceso.Mprocesos = value;
        dashboard_proceso.modal.modalView("vw_procesos", {
            width: 'modal-full',
            header: {
                title: "Mapa de Procesos - Procesos ( " + dashboard_proceso.Mprocesos + " )",
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'procesos',
            },
        });
    };
    dashboard_proceso.openmodaldocumentos = function (value) {
        dashboard_proceso.Mdocumentos = value;
        dashboard_proceso.modal.modalView("vw_documentos_asociados", {
            width: 'modal-full',
            header: {
                title: "Documentos Asociados - Documentos ( " + dashboard_proceso.Mdocumentos + " )",
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'documentos_asociados',
            },
        });
    };
    dashboard_proceso.getAll = async function () {
        animation.loading(`#graficos`, "", ``, '60');
        if (dashboard_proceso.departamento !== "[NULL]" && dashboard_proceso.departamento !== undefined) {
            await dashboard_proceso.getIndicadores();
            await dashboard_proceso.getPlanesAuditoria();
            await dashboard_proceso.getProcesos();
            await dashboard_proceso.getDocumentos();
            await dashboard_proceso.callDataLinea();
        }
    };

    dashboard_proceso.getPresupuesto = function () {
        animation.loading(`#presupuestos`, "", ``, '30');
        var dashboard_proceso_listpresupuestos = [];
        dashboard_proceso.presupuestos = {
            aprobado: 0,
            ejecutado: 0,
            cuentasporpagar: 0,
            reprogramar: 0,
            noejecutado: 0
        };

        if (dashboard_proceso.departamento == "0") {
            dashboard_proceso.condition = [{
                field: "poa",
                value: dashboard_proceso./**/poabushin,
            },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }];
        } else {
            dashboard_proceso.condition = [{
                field: "poa",
                value: dashboard_proceso./**/poabushin,
            }, {
                field: "departamento",
                value: dashboard_proceso.departamento
            },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }];
        }

        BASEAPI.listp('vw_presupesto', {
            where: dashboard_proceso.condition
        }).then(function (result) {
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_proceso_listpresupuestos = result;
            if (dashboard_proceso_listpresupuestos.data) {
                for (var p = 0; p < dashboard_proceso_listpresupuestos.data.length; p++) {
                    dashboard_proceso.presupuestos.aprobado += parseInt(dashboard_proceso_listpresupuestos.data[p].aprobado) || 0;
                    dashboard_proceso.presupuestos.ejecutado += parseInt(dashboard_proceso_listpresupuestos.data[p].ejecutado) || 0;
                    dashboard_proceso.presupuestos.cuentasporpagar += parseInt(dashboard_proceso_listpresupuestos.data[p].cuentasporpagar) || 0;
                    dashboard_proceso.presupuestos.reprogramar += parseInt(dashboard_proceso_listpresupuestos.data[p].reprogramar) || 0;
                    dashboard_proceso.presupuestos.noejecutado += parseInt(dashboard_proceso_listpresupuestos.data[p].noejecutado) || 0;
                }
                for (var i in dashboard_proceso.presupuestos) {
                    dashboard_proceso.presupuestos[i] = LAN.money(dashboard_proceso.presupuestos[i]).format(true);
                }
            }
            dashboard_proceso.refreshAngular();
            animation.stoploading(`#presupuestos`);
        });
    };
    dashboard_proceso.getIndicadores = function () {
        if (dashboard_proceso.departamento == "0") {
            dashboard_proceso.condition = [{
                field: "poa",
                value: dashboard_proceso./**/poabushin,
            }];
            dashboard_proceso.condition2 = [
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }];

        } else {
            dashboard_proceso.condition = [{
                field: "poa",
                value: dashboard_proceso./**/poabushin,
            }, {
                field: "departamento",
                value: dashboard_proceso.departamento
            },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }];

            dashboard_proceso.condition2 = [{
                field: "poa",
                value: dashboard_proceso./**/poabushin,
            }, {
                field: "departamento",
                operator: 'like',
                value: `$'%(${dashboard_proceso.departamento})%'`
            },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }];


        }
        var usersss = new SESSION().current();
        vw_dashboard_productosgrid_proceso.changeFilter([
            {
                field: dashboard_proceso.institucion === '[NULL]' ? "compania" : "entidad",
                value: dashboard_proceso.institucion === '[NULL]' ? dashboard_proceso.compania_id : dashboard_proceso.institucion
            }]);
        setTimeout(function () {
            animation.stoploading(`#graficos`, ``);
        }, 1000)
    };
    dashboard_proceso.getProductos = function () {
        animation.loading(`#productos`, "", ``, '30');
        dashboard_proceso.listproductos = [];
        dashboard_proceso.productos = {
            cantidad: 0,
            completados: 0,
            ejecucion: 0,
            vencidos: 0,
            planificados: 0,
            cancelados: 0,
            detenidos: 0
        };
        if (dashboard_proceso.departamento == "0") {
            dashboard_proceso.condition = [{
                field: "id",
                value: dashboard_proceso./**/poabushin,
            },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }];
        } else {
            dashboard_proceso.condition = [{
                field: "id",
                value: dashboard_proceso./**/poabushin,
            }, {
                field: "departamento",
                value: dashboard_proceso.departamento
            },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }];
        }


        BASEAPI.listp('vw_dashboard_productos', {
            where: dashboard_proceso.condition
        }).then(function (result) {
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_proceso.listproductos = result;
            if (dashboard_proceso.listproductos.data) {
                if (dashboard_proceso.listproductos.data.length > 0) {
                    dashboard_proceso.pie_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificados'},
                        ejecucion: {value: 0, name: 'En Ejecución'},
                        detenidos: {value: 0, name: 'Detenidos'},
                        vencidos: {value: 0, name: 'Vencidos'},
                        cancelados: {value: 0, name: 'Cancelados'},
                        completados: {value: 0, name: 'Completados'}
                    };
                    for (var pr = 0; pr < dashboard_proceso.listproductos.data.length; pr++) {
                        dashboard_proceso.productos.cantidad += parseInt(dashboard_proceso.listproductos.data[pr].cantidad) || 0;
                        dashboard_proceso.productos.completados += parseInt(dashboard_proceso.listproductos.data[pr].completados) || 0;
                        dashboard_proceso.productos.ejecucion += parseInt(dashboard_proceso.listproductos.data[pr].ejecucion) || 0;
                        dashboard_proceso.productos.vencidos += parseInt(dashboard_proceso.listproductos.data[pr].vencidos) || 0;
                        dashboard_proceso.productos.planificados += parseInt(dashboard_proceso.listproductos.data[pr].planificados) || 0;
                        dashboard_proceso.productos.detenidos += parseInt(dashboard_proceso.listproductos.data[pr].detenidos) || 0;
                        dashboard_proceso.productos.cancelados += parseInt(dashboard_proceso.listproductos.data[pr].cancelados) || 0;

                        legendsAct.planificados.value += parseInt(dashboard_proceso.listproductos.data[pr].planificados) || 0;
                        legendsAct.ejecucion.value += parseInt(dashboard_proceso.listproductos.data[pr].ejecucion) || 0;
                        legendsAct.vencidos.value += parseInt(dashboard_proceso.listproductos.data[pr].vencidos) || 0;
                        legendsAct.completados.value += parseInt(dashboard_proceso.listproductos.data[pr].completados) || 0;
                        legendsAct.detenidos.value += parseInt(dashboard_proceso.listproductos.data[pr].detenidos) || 0;
                        legendsAct.cancelados.value += parseInt(dashboard_proceso.listproductos.data[pr].cancelados) || 0;
                    }

                    for (var i in dashboard_proceso.productos) {
                        dashboard_proceso.productos[i] = parseInt(dashboard_proceso.productos[i]) < 10 ? ('0' + dashboard_proceso.productos[i]) : dashboard_proceso.productos[i];
                    }

                    dashboard_proceso.pie_data = [];
                    dashboard_proceso.pie_legend = ['Planificados', 'En Ejecución', 'Detenidos', 'Vencidos', 'Completados', 'Cancelados'];
                    dashboard_proceso.pie_data.push(
                        {
                            value: legendsAct.planificados.value, name: legendsAct.planificados.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#9b89d9',
                                },
                                emphasis: {
                                    color: '#9b89d9',
                                }
                            }
                        },
                        {
                            value: legendsAct.ejecucion.value, name: legendsAct.ejecucion.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#a1de78',
                                },
                                emphasis: {
                                    color: '#a1de78',
                                }
                            }
                        },
                        {
                            value: legendsAct.detenidos.value, name: legendsAct.detenidos.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#ffe287',
                                },
                                emphasis: {
                                    color: '#ffe287',
                                }
                            }
                        },
                        {
                            value: legendsAct.vencidos.value, name: legendsAct.vencidos.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }

                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#ff8a8a',
                                },
                                emphasis: {
                                    color: '#ff8a8a',
                                }
                            }
                        },
                        {
                            value: legendsAct.completados.value, name: legendsAct.completados.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#737fff',
                                },
                                emphasis: {
                                    color: '#737fff',
                                }
                            }
                        },
                        {
                            value: legendsAct.cancelados.value, name: legendsAct.cancelados.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#8e8f91',
                                },
                                emphasis: {
                                    color: '#8e8f91',
                                }
                            }
                        },
                    );
                } else {
                    dashboard_proceso.pie_legend = ['No existen datos para la selección'];
                    dashboard_proceso.pie_data = [{
                        value: 1, name: "Sin información", itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                                color: '#80867C',
                            },
                            emphasis: {
                                color: '#80867C',
                            }
                        }
                    }];
                    dashboard_proceso.pie_menssageHover = "";
                }
            } else {
                dashboard_proceso.pie_legend = ['No existen datos para la selección'];
                dashboard_proceso.pie_data = [{
                    value: 1, name: "Sin información", itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: '#80867C',
                        },
                        emphasis: {
                            color: '#80867C',
                        }
                    }
                }];
                dashboard_proceso.pie_menssageHover = "Hacer clic para ver detalle";
            }
            dashboard_proceso.refreshAngular();
            // dashboard_proceso.charts.pie.refresh();
            animation.stoploading(`#productos`);
        });
    };
    dashboard_proceso.getAsignaciones = function () {
        animation.loading(`#asignaciones`, "", ``, '30');
        dashboard_proceso.listasignaciones = [];
        dashboard_proceso.asignaciones = {
            cantidad: 0,
            completados: 0,
            ejecucion: 0,
            vencidos: 0,
            planificados: 0,
            cancelados: 0
        };
        if (dashboard_proceso.departamento == "0") {
            dashboard_proceso.condition = [{
                field: "id",
                value: dashboard_proceso./**/poabushin,
            },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }];
        } else {
            dashboard_proceso.condition = [{
                field: "id",
                value: dashboard_proceso./**/poabushin,
            }, {
                field: "departamento",
                value: dashboard_proceso.departamento
            },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }];
        }
        BASEAPI.listp('vw_dashboard_asignaciones', {
            where: dashboard_proceso.condition
        }).then(function (result) {
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_proceso.listasignaciones = result;
            if (dashboard_proceso.listasignaciones.data) {
                if (dashboard_proceso.listasignaciones.data.length > 0) {
                    dashboard_proceso.pie3_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificadas'},
                        ejecucion: {value: 0, name: 'En Ejecución'},
                        vencidos: {value: 0, name: 'Vencidas'},
                        cancelados: {value: 0, name: 'Canceladas'},
                        completados: {value: 0, name: 'Completadas'}
                    };
                    for (var a = 0; a < dashboard_proceso.listasignaciones.data.length; a++) {
                        dashboard_proceso.asignaciones.cantidad += parseInt(dashboard_proceso.listasignaciones.data[a].cantidad) || 0;
                        dashboard_proceso.asignaciones.completados += parseInt(dashboard_proceso.listasignaciones.data[a].completados) || 0;
                        dashboard_proceso.asignaciones.ejecucion += parseInt(dashboard_proceso.listasignaciones.data[a].ejecucion) || 0;
                        dashboard_proceso.asignaciones.vencidos += parseInt(dashboard_proceso.listasignaciones.data[a].vencidos) || 0;
                        dashboard_proceso.asignaciones.planificados += parseInt(dashboard_proceso.listasignaciones.data[a].planificados) || 0;
                        dashboard_proceso.asignaciones.cancelados += parseInt(dashboard_proceso.listasignaciones.data[a].cancelados) || 0;

                        legendsAct.planificados.value += parseInt(dashboard_proceso.listasignaciones.data[a].planificados) || 0;
                        legendsAct.ejecucion.value += parseInt(dashboard_proceso.listasignaciones.data[a].ejecucion) || 0;
                        legendsAct.vencidos.value += parseInt(dashboard_proceso.listasignaciones.data[a].vencidos) || 0;
                        legendsAct.completados.value += parseInt(dashboard_proceso.listasignaciones.data[a].completados) || 0;
                        legendsAct.cancelados.value += parseInt(dashboard_proceso.listasignaciones.data[a].cancelados) || 0;
                    }

                    for (var i in dashboard_proceso.asignaciones) {
                        dashboard_proceso.asignaciones[i] = parseInt(dashboard_proceso.asignaciones[i]) < 10 ? ('0' + dashboard_proceso.asignaciones[i]) : dashboard_proceso.asignaciones[i];
                    }

                    dashboard_proceso.pie3_data = [];
                    dashboard_proceso.pie3_legend = ['Planificadas', 'En Ejecución', 'Vencidas', 'Completadas', 'Canceladas'];
                    dashboard_proceso.pie3_data.push(
                        {
                            value: legendsAct.planificados.value, name: legendsAct.planificados.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#9b89d9',
                                },
                                emphasis: {
                                    color: '#9b89d9',
                                }
                            }
                        },
                        {
                            value: legendsAct.ejecucion.value, name: legendsAct.ejecucion.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#a1de78',
                                },
                                emphasis: {
                                    color: '#a1de78',
                                }
                            }
                        },
                        {
                            value: legendsAct.vencidos.value, name: legendsAct.vencidos.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#ff8a8a',
                                },
                                emphasis: {
                                    color: '#ff8a8a',
                                }
                            }
                        },
                        {
                            value: legendsAct.cancelados.value, name: legendsAct.cancelados.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#8e8f91',
                                },
                                emphasis: {
                                    color: '#8e8f91',
                                }
                            }
                        },
                        {
                            value: legendsAct.completados.value, name: legendsAct.completados.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#737fff',
                                },
                                emphasis: {
                                    color: '#737fff',
                                }
                            }
                        },
                    );

                } else {
                    dashboard_proceso.pie3_legend = ['No existen datos para la selección'];
                    dashboard_proceso.pie3_data = [{
                        value: 1, name: "Sin información", itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                                color: '#80867C',
                            },
                            emphasis: {
                                color: '#80867C',
                            }
                        }
                    }];
                    dashboard_proceso.pie3_menssageHover = "";
                }
            } else {
                dashboard_proceso.pie3_legend = ['No existen datos para la selección'];
                dashboard_proceso.pie3_data = [{
                    value: 1, name: "Sin información", itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: '#80867C',
                        },
                        emphasis: {
                            color: '#80867C',
                        }
                    }
                }];
                dashboard_proceso.pie3_menssageHover = "";
            }
            dashboard_proceso.refreshAngular();
            // dashboard_proceso.charts.pie3.refresh();
            animation.stoploading(`#asignaciones`);
        });
    };
    dashboard_proceso.getActividades = function () {
        animation.loading(`#actividades`, "", ``, '30');
        dashboard_proceso.listactividades = [];
        dashboard_proceso.actividades = {
            cantidad: 0,
            completados: 0,
            ejecucion: 0,
            vencidos: 0,
            planificados: 0,
            detenidos: 0,
            cancelados: 0
        };
        if (dashboard_proceso.departamento == "0") {
            dashboard_proceso.condition = [{
                field: "id",
                value: dashboard_proceso./**/poabushin,
            },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }];
        } else {
            dashboard_proceso.condition = [{
                field: "id",
                value: dashboard_proceso./**/poabushin,
            }, {
                field: "departamento",
                value: dashboard_proceso.departamento
            },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }];
        }
        BASEAPI.listp('vw_dashboard_actividades', {
            where: dashboard_proceso.condition
        }).then(function (result) {
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_proceso.listactividades = result;
            if (dashboard_proceso.listactividades.data) {
                if (dashboard_proceso.listactividades.data.length > 0) {
                    dashboard_proceso.pie2_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificadas'},
                        detenidos: {value: 0, name: 'Detenidas'},
                        ejecucion: {value: 0, name: 'En Ejecución'},
                        vencidos: {value: 0, name: 'Vencidas'},
                        cancelados: {value: 0, name: 'Canceladas'},
                        completados: {value: 0, name: 'Completadas'}
                    };
                    for (var ac = 0; ac < dashboard_proceso.listactividades.data.length; ac++) {
                        dashboard_proceso.actividades.cantidad += parseInt(dashboard_proceso.listactividades.data[ac].cantidad) || 0;
                        dashboard_proceso.actividades.completados += parseInt(dashboard_proceso.listactividades.data[ac].completados) || 0;
                        dashboard_proceso.actividades.ejecucion += parseInt(dashboard_proceso.listactividades.data[ac].ejecucion) || 0;
                        dashboard_proceso.actividades.vencidos += parseInt(dashboard_proceso.listactividades.data[ac].vencidos) || 0;
                        dashboard_proceso.actividades.planificados += parseInt(dashboard_proceso.listactividades.data[ac].planificados) || 0;
                        dashboard_proceso.actividades.cancelados += parseInt(dashboard_proceso.listactividades.data[ac].cancelados) || 0;
                        dashboard_proceso.actividades.detenidos += parseInt(dashboard_proceso.listactividades.data[ac].detenidos) || 0;

                        legendsAct.planificados.value += parseInt(dashboard_proceso.listactividades.data[ac].planificados) || 0;
                        legendsAct.ejecucion.value += parseInt(dashboard_proceso.listactividades.data[ac].ejecucion) || 0;
                        legendsAct.vencidos.value += parseInt(dashboard_proceso.listactividades.data[ac].vencidos) || 0;
                        legendsAct.completados.value += parseInt(dashboard_proceso.listactividades.data[ac].completados) || 0;
                        legendsAct.detenidos.value += parseInt(dashboard_proceso.listactividades.data[ac].detenidos) || 0;
                        legendsAct.cancelados.value += parseInt(dashboard_proceso.listactividades.data[ac].cancelados) || 0;
                    }

                    for (var i in dashboard_proceso.actividades) {
                        dashboard_proceso.actividades[i] = parseInt(dashboard_proceso.actividades[i]) < 10 ? ('0' + dashboard_proceso.actividades[i]) : dashboard_proceso.actividades[i];
                    }
                    dashboard_proceso.pie2_data = [];

                    dashboard_proceso.pie2_legend = ['Planificadas', 'En Ejecución', 'Detenidas', 'Vencidas', 'Completadas', 'Canceladas'];

                    dashboard_proceso.pie2_data.push(
                        {
                            value: legendsAct.planificados.value, name: legendsAct.planificados.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#9b89d9',
                                },
                                emphasis: {
                                    color: '#9b89d9',
                                }
                            }
                        },
                        {
                            value: legendsAct.ejecucion.value, name: legendsAct.ejecucion.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#a1de78',
                                },
                                emphasis: {
                                    color: '#a1de78',
                                }
                            }
                        },
                        {
                            value: legendsAct.detenidos.value, name: legendsAct.detenidos.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#ffe287',
                                },
                                emphasis: {
                                    color: '#ffe287',
                                }
                            }
                        },
                        {
                            value: legendsAct.vencidos.value, name: legendsAct.vencidos.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#ff8a8a',
                                },
                                emphasis: {
                                    color: '#ff8a8a',
                                }
                            }
                        },
                        {
                            value: legendsAct.completados.value, name: legendsAct.completados.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#737fff',
                                },
                                emphasis: {
                                    color: '#737fff',
                                }
                            }
                        },
                        {
                            value: legendsAct.cancelados.value, name: legendsAct.cancelados.name, itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (data) {
                                            var v = data.value;
                                            if (v == 0) {
                                                return ''
                                            }
                                            return v
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: '#8e8f91',
                                },
                                emphasis: {
                                    color: '#8e8f91',
                                }
                            }
                        },
                    );
                } else {
                    dashboard_proceso.pie2_legend = ['No existen datos para la selección'];
                    dashboard_proceso.pie2_data = [{
                        value: 1, name: "Sin información", itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                                color: '#80867C',
                            },
                            emphasis: {
                                color: '#80867C',
                            }
                        }
                    }];
                    dashboard_proceso.pie2_menssageHover = "";
                }
            } else {
                dashboard_proceso.pie2_legend = ['No existen datos para la selección'];
                dashboard_proceso.pie2_data = [{
                    value: 1, name: "Sin información", itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: '#80867C',
                        },
                        emphasis: {
                            color: '#80867C',
                        }
                    }
                }];
                dashboard_proceso.pie2_menssageHover = "";
            }
            dashboard_proceso.refreshAngular();
            // dashboard_proceso.charts.pie2.refresh();
            animation.stoploading(`#actividades`);
        });
    };

    dashboard_proceso.callDataBarra = async function () {
        dashboard_proceso.listPre = [];
        dashboard_proceso.listDep = [];
        var whereCondition = [{}];
        if (dashboard_proceso.departamento == "0") {
            whereCondition = [
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id
                },
                {
                    field: "poa",
                    value: dashboard_proceso./**/poabushin
                }
            ];
        } else {
            whereCondition = [
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id
                },
                {
                    field: "departamento",
                    value: dashboard_proceso.departamento
                },
                {
                    field: "poa",
                    value: dashboard_proceso./**/poabushin
                }
            ];
        }

        dashboard_proceso.listPre = await BASEAPI.listp('vw_presupesto', {
            limit: 0,
            orderby: "departamento_nombre",
            order: "asc",
            where: whereCondition
        });

        if (dashboard_proceso.listPre.data.length > 0) {
            dashboard_proceso.listPre = dashboard_proceso.listPre.data;
            dashboard_proceso.columnsstack_data = {};
            dashboard_proceso.columnsstack_data = {
                legend: ['Disponible', 'Ejecutado', 'No Ejecutado'],
                down: dashboard_proceso.listDep,
                data: [
                    {
                        name: 'No Ejecutado',
                        type: 'bar',
                        //stack: 'Total',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'inside'
                                },
                                color: '#a1de78',
                            },
                            emphasis: {
                                label: {
                                    show: true
                                },
                                color: '#a1de78',
                            }
                        },
                        data: []
                    },
                    {
                        name: 'Ejecutado',
                        type: 'bar',
                        //stack: 'Total',
                        itemStyle: {
                            normal: {

                                label: {
                                    show: true,
                                    position: 'inside'
                                },
                                color: '#ff8a8a',
                            },
                            emphasis: {

                                label: {
                                    show: true
                                },
                                color: '#ff8a8a',
                            }
                        },
                        data: []
                    },
                    {
                        name: 'Disponible',
                        type: 'bar',
                        //stack: 'Total',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'inside'
                                },
                                color: '#737fff',
                            },
                            emphasis: {
                                label: {
                                    show: true
                                },
                                color: '#737fff',
                            }
                        },
                        data: []
                    }
                ]
            };
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');

            dashboard_proceso.columnsstack_data.data[0].data = createArray(dashboard_proceso.listDep.length, '');
            dashboard_proceso.columnsstack_data.data[1].data = createArray(dashboard_proceso.listDep.length, '');
            dashboard_proceso.columnsstack_data.data[2].data = createArray(dashboard_proceso.listDep.length, '');

            for (var p = 0; p < dashboard_proceso.listPre.length; p++) {
                dashboard_proceso.listDep.push(dashboard_proceso.listPre[p].departamento_nombre);
                dashboard_proceso.columnsstack_data.data[1].data[p] = dashboard_proceso.listPre[p].noejecutado ? dashboard_proceso.listPre[p].noejecutado : '';
                dashboard_proceso.columnsstack_data.data[0].data[p] = dashboard_proceso.listPre[p].ejecutado ? dashboard_proceso.listPre[p].ejecutado : '';
                dashboard_proceso.columnsstack_data.data[2].data[p] = dashboard_proceso.listPre[p].reprogramar ? dashboard_proceso.listPre[p].reprogramar : '';
                if (dashboard_proceso.columnsstack_data.data[2].data[p] < 0)
                    dashboard_proceso.columnsstack_data.data[2].data[p] *= -1;
            }
            dashboard_proceso.columnsstack_data.down = dashboard_proceso.listDep;
            dashboard_proceso.refreshAngular();
            dashboard_proceso.charts.columnsstack.refresh();
        } else {
            dashboard_proceso.columnsstack_data = {
                legend: ['Disponible', 'Ejecutado', 'No Ejecutado'],
                down: ['No existen datos para la selección'],
                data: [{
                    name: 'No Ejecutado',
                    type: 'bar',
                    //stack: 'Total',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'inside'
                            },
                            color: '#a1de78',
                        },
                        emphasis: {
                            label: {
                                show: true
                            },
                            color: '#a1de78',
                        }
                    },
                    data: ['']
                },
                    {
                        name: 'Ejecutado',
                        type: 'bar',
                        //stack: 'Total',
                        itemStyle: {
                            normal: {

                                label: {
                                    show: true,
                                    position: 'inside'
                                },
                                color: '#ff8a8a',
                            },
                            emphasis: {

                                label: {
                                    show: true
                                },
                                color: '#ff8a8a',
                            }
                        },
                        data: ['']
                    },
                    {
                        name: 'Disponible',
                        type: 'bar',
                        //stack: 'Total',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'inside'
                                },
                                color: '#737fff',
                            },
                            emphasis: {
                                label: {
                                    show: true
                                },
                                color: '#737fff',
                            }
                        },
                        data: ['']
                    }]
            };
            dashboard_proceso.refreshAngular();
            dashboard_proceso.charts.columnsstack.refresh();
        }
    };
    dashboard_proceso.tipodashboard = "bar";
    dashboard_proceso.callDataLinea = async function () {
        dashboard_proceso.prototipos = [
            {
                name: 'Proyectado',
                type: dashboard_proceso.tipodashboard,
                //stack: 'Total',
                data: [],
                itemStyle: {
                    normal: {
                        label: {
                            position: 'top',
                            show: true,
                            textStyle: {
                                fontSize: '12',

                            }
                        }, color: '#9b89d9',
                    }
                }
            },
            {
                name: 'Alcanzado',
                type: dashboard_proceso.tipodashboard,
                //stack: 'Total',
                data: [],
                itemStyle: {
                    normal: {
                        label: {
                            position: 'top',
                            show: true,
                            textStyle: {
                                fontSize: '12',

                            }
                        }, color: '#a1de78',
                    }
                }
            },
            {
                name: 'Diferencia',
                type: dashboard_proceso.tipodashboard,
                ////stack: 'Total',
                data: [],
                itemStyle: {
                    normal: {
                        label: {
                            position: 'top',
                            show: true,
                            textStyle: {
                                fontSize: '12',
                                color: '#000000'
                            }
                        }, color: '#ff8a8a', areaStyle: {type: 'default', color: '#ff8a8a',}
                    }
                }
            }];
        var dashboard_proceso_listInd = [];
        var dashboard_proceso_listIndN = [];

        var dashboard_proceso_listInd2 = [];
        var dashboard_proceso_listInd2N = [];

        var dashboard_proceso_listInd3 = [];
        var dashboard_proceso_listInd4 = [];
        var dashboard_proceso_listInd3N = [];
        var dashboard_proceso_listInd4N = [];

        if (dashboard_proceso.departamento == "0") {
            dashboard_proceso.whereCondition = [
                {
                    field: "poa",
                    value: dashboard_proceso./**/poabushin
                },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }
            ];
        } else {
            dashboard_proceso.whereCondition = [
                {
                    field: "poa",
                    value: dashboard_proceso./**/poabushin
                },
                {
                    field: "departamento",
                    value: dashboard_proceso.departamento
                },
                {
                    field: "compania",
                    value: dashboard_proceso.compania_id,
                }
            ];
        }


        var ayalfinal = [
            {
                field: "compania",
                value: dashboard_proceso.compania_id
            },
            {
                field: "poa",
                value: dashboard_proceso./**/poabushin
            }
        ];
        if (dashboard_proceso.departamento != 0) {
            // ayalfinal.push(
            //     {
            //         field: "departamento",
            //         operator: '',
            //         value: `$ LIKE '%(${dashboard_proceso.departamento})%'`
            //     });
        }
        dashboard_proceso_listInd4 = await BASEAPI.listp('vw_dashboard_dato_indicador_proceso', {
            limit: 0,
            orderby: "indicador",
            order: "asc",
            where: [
                {
                    field: "entidad",
                    value: dashboard_proceso.institucion === '[NULL]' ? dashboard_proceso.compania_id : dashboard_proceso.institucion
                },
                {
                    field: "mapa_proceso",
                    value: dashboard_proceso.mapa_id ? dashboard_proceso.mapa_id : -1
                }
            ]
        });

        if (dashboard_proceso_listInd4.data) {
            if (dashboard_proceso_listInd4.data.length > 0) {
                dashboard_proceso_listInd4 = dashboard_proceso_listInd4.data;
                dashboard_proceso.area4_data = {};
                dashboard_proceso.area4_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: dashboard_proceso_listInd4N,
                    data: [
                        {
                            name: 'Diferencia',
                            type: dashboard_proceso.tipodashboard,
                            //stack: 'Total',
                            data: [],
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'top',
                                        show: true,
                                        textStyle: {
                                            fontSize: '12',
                                            color: '#000000'
                                        }
                                    }, color: '#ff8a8a', areaStyle: {type: 'default', color: '#ff8a8a',}
                                }
                            }
                        },
                        {
                            name: 'Alcanzado',
                            type: dashboard_proceso.tipodashboard,
                            //stack: 'Total',
                            data: [],
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'top',
                                        show: true,
                                        textStyle: {
                                            fontSize: '12',

                                        }
                                    }, color: '#a1de78',
                                }
                            }
                        },
                        {
                            name: 'Proyectado',
                            type: dashboard_proceso.tipodashboard,
                            //stack: 'Total',
                            data: [],
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'top',
                                        show: true,
                                        textStyle: {
                                            fontSize: '12',

                                        }
                                    }, color: '#9b89d9',
                                }
                            }
                        },

                    ]
                };
                dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');

                dashboard_proceso.area4_data.data[0].data = createArray(dashboard_proceso_listInd4N.length, 0);
                dashboard_proceso.area4_data.data[1].data = createArray(dashboard_proceso_listInd4N.length, 0);
                dashboard_proceso.area4_data.data[2].data = createArray(dashboard_proceso_listInd4N.length, 0);

                for (var p = 0; p < dashboard_proceso_listInd4.length; p++) {
                    dashboard_proceso_listInd4N.push(dashboard_proceso_listInd4[p].indicador);
                    dashboard_proceso.area4_data.data[1].data[p] = dashboard_proceso_listInd4[p].alcanzado ? dashboard_proceso_listInd4[p].alcanzado : 0;
                    dashboard_proceso.area4_data.data[0].data[p] = dashboard_proceso_listInd4[p].acumulado ? dashboard_proceso_listInd4[p].acumulado : 0;
                    dashboard_proceso.area4_data.data[2].data[p] = dashboard_proceso_listInd4[p].alcanzado - dashboard_proceso_listInd4[p].acumulado ? parseFloat(dashboard_proceso_listInd4[p].alcanzado - dashboard_proceso_listInd4[p].acumulado).toFixed(2) : 0;
                    if (dashboard_proceso.area4_data.data[2].data[p] < 0)
                        dashboard_proceso.area4_data.data[2].data[p] *= -1;

                }
                dashboard_proceso.refreshAngular();
                dashboard_proceso.charts.area4.refresh();
            } else {
                dashboard_proceso.area4_data = {};
                dashboard_proceso.area4_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: ['No existen datos para la selección'],
                    data: dashboard_proceso.prototipos
                };
                dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
                dashboard_proceso.refreshAngular();
                dashboard_proceso.charts.area4.refresh();
            }
        } else {
            dashboard_proceso.area4_data = {};
            dashboard_proceso.area4_data = {
                legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                down: ['Este departamento no contiene Indicadores'],
                data: dashboard_proceso.prototipos
            };
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_proceso.refreshAngular();
            dashboard_proceso.charts.area4.refresh();
        }


        if (dashboard_proceso_listInd3.data) {
            if (dashboard_proceso_listInd3.data.length > 0) {
                dashboard_proceso_listInd3 = dashboard_proceso_listInd3.data;
                dashboard_proceso.area3_data = {};
                dashboard_proceso.area3_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: dashboard_proceso_listInd3N,
                    data: [
                        {
                            name: 'Diferencia',
                            type: dashboard_proceso.tipodashboard,
                            //stack: 'Total',
                            data: [],
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'top',
                                        show: true,
                                        textStyle: {
                                            fontSize: '12',
                                            color: '#000000'
                                        }
                                    }, color: '#ff8a8a', areaStyle: {type: 'default', color: '#ff8a8a'}
                                }
                            }
                        },
                        {
                            name: 'Alcanzado',
                            type: dashboard_proceso.tipodashboard,
                            //stack: 'Total',
                            data: [],
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'top',
                                        show: true,
                                        textStyle: {
                                            fontSize: '12',

                                        }
                                    }, color: '#a1de78',
                                }
                            }
                        },
                        {
                            name: 'Proyectado',
                            type: dashboard_proceso.tipodashboard,
                            //stack: 'Total',
                            data: [],
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'top',
                                        show: true,
                                        textStyle: {
                                            fontSize: '12',

                                        }
                                    }, color: '#9b89d9',
                                }
                            }
                        },

                    ]
                };
                dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');

                dashboard_proceso.area3_data.data[0].data = createArray(dashboard_proceso_listInd3N.length, 0);
                dashboard_proceso.area3_data.data[1].data = createArray(dashboard_proceso_listInd3N.length, 0);
                dashboard_proceso.area3_data.data[2].data = createArray(dashboard_proceso_listInd3N.length, 0);

                for (var p = 0; p < dashboard_proceso_listInd3.length; p++) {
                    dashboard_proceso_listInd3N.push(dashboard_proceso_listInd3[p].indicador);
                    dashboard_proceso.area3_data.data[1].data[p] = dashboard_proceso_listInd3[p].alcanzado ? dashboard_proceso_listInd3[p].alcanzado : 0;
                    dashboard_proceso.area3_data.data[0].data[p] = dashboard_proceso_listInd3[p].acumulado ? dashboard_proceso_listInd3[p].acumulado : 0;
                    dashboard_proceso.area3_data.data[2].data[p] = dashboard_proceso_listInd3[p].alcanzado - dashboard_proceso_listInd3[p].acumulado ? parseFloat(dashboard_proceso_listInd3[p].alcanzado - dashboard_proceso_listInd3[p].acumulado).toFixed(2) : 0;
                    if (dashboard_proceso.area3_data.data[2].data[p] < 0)
                        dashboard_proceso.area3_data.data[2].data[p] *= -1;

                }
                dashboard_proceso.refreshAngular();
                dashboard_proceso.charts.area3.refresh();
            } else {
                dashboard_proceso.area3_data = {};
                dashboard_proceso.area3_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: ['No existen datos para la selección'],
                    data: dashboard_proceso.prototipos
                };
                dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
                dashboard_proceso.refreshAngular();
                dashboard_proceso.charts.area3.refresh();
            }
        } else {
            dashboard_proceso.area3_data = {};
            dashboard_proceso.area3_data = {
                legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                down: ['Este departamento no contiene Indicadores'],
                data: dashboard_proceso.prototipos
            };
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_proceso.refreshAngular();
            // dashboard_proceso.charts.area3.refresh();
        }

        if (dashboard_proceso_listInd2.data) {
            if (dashboard_proceso_listInd2.data.length > 0) {
                dashboard_proceso_listInd2 = dashboard_proceso_listInd2.data;
                dashboard_proceso.area2_data = {};
                dashboard_proceso.area2_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: dashboard_proceso_listInd2N,
                    data: dashboard_proceso.prototipos
                };
                dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');

                dashboard_proceso.area2_data.data[0].data = createArray(dashboard_proceso_listInd2N.length, 0);
                dashboard_proceso.area2_data.data[1].data = createArray(dashboard_proceso_listInd2N.length, 0);
                dashboard_proceso.area2_data.data[2].data = createArray(dashboard_proceso_listInd2N.length, 0);

                for (var p = 0; p < dashboard_proceso_listInd2.length; p++) {
                    dashboard_proceso_listInd2N.push(dashboard_proceso_listInd2[p].indicador);
                    dashboard_proceso.area2_data.data[1].data[p] = dashboard_proceso_listInd2[p].alcanzado ? dashboard_proceso_listInd2[p].alcanzado : 0;
                    dashboard_proceso.area2_data.data[0].data[p] = dashboard_proceso_listInd2[p].acumulado ? dashboard_proceso_listInd2[p].acumulado : 0;
                    dashboard_proceso.area2_data.data[2].data[p] = dashboard_proceso_listInd2[p].alcanzado - dashboard_proceso_listInd2[p].acumulado ? parseFloat(dashboard_proceso_listInd2[p].alcanzado - dashboard_proceso_listInd2[p].acumulado).toFixed(2) : 0;
                    if (dashboard_proceso.area2_data.data[2].data[p] < 0)
                        dashboard_proceso.area2_data.data[2].data[p] *= -1;
                }
                dashboard_proceso.refreshAngular();
                dashboard_proceso.charts.area2.refresh();
            } else {
                dashboard_proceso.area2_data = {};
                dashboard_proceso.area2_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: ['No existen datos para la selección'],
                    data: dashboard_proceso.prototipos
                };
                dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
                dashboard_proceso.refreshAngular();
                dashboard_proceso.charts.area2.refresh();
            }
        } else {
            dashboard_proceso.area2_data = {};
            dashboard_proceso.area2_data = {
                legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                down: ['Este departamento no contiene Indicadores'],
                data: dashboard_proceso.prototipos
            };
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_proceso.refreshAngular();
            // dashboard_proceso.charts.area2.refresh();
        }

        if (dashboard_proceso_listInd.data) {
            if (dashboard_proceso_listInd.data.length > 0) {
                dashboard_proceso_listInd = dashboard_proceso_listInd.data;
                dashboard_proceso.area_data = {};
                dashboard_proceso.area_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: dashboard_proceso_listIndN,
                    data: dashboard_proceso.prototipos
                };
                dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');

                dashboard_proceso.area_data.data[0].data = createArray(dashboard_proceso_listIndN.length, 0);
                dashboard_proceso.area_data.data[1].data = createArray(dashboard_proceso_listIndN.length, 0);
                dashboard_proceso.area_data.data[2].data = createArray(dashboard_proceso_listIndN.length, 0);

                for (var p = 0; p < dashboard_proceso_listInd.length; p++) {
                    dashboard_proceso_listIndN.push(dashboard_proceso_listInd[p].indicador);
                    dashboard_proceso.area_data.data[1].data[p] = dashboard_proceso_listInd[p].alcanzado ? dashboard_proceso_listInd[p].alcanzado : 0;
                    dashboard_proceso.area_data.data[0].data[p] = dashboard_proceso_listInd[p].acumulado ? dashboard_proceso_listInd[p].acumulado : 0;
                    dashboard_proceso.area_data.data[2].data[p] = dashboard_proceso_listInd[p].alcanzado - dashboard_proceso_listInd[p].acumulado ? parseFloat(dashboard_proceso_listInd[p].alcanzado - dashboard_proceso_listInd[p].acumulado).toFixed(2) : 0;
                    if (dashboard_proceso.area_data.data[2].data[p] < 0)
                        dashboard_proceso.area_data.data[2].data[p] *= -1;
                }
                dashboard_proceso.refreshAngular();
                dashboard_proceso.charts.area.refresh();
            } else {
                dashboard_proceso.area_data = {};
                dashboard_proceso.area_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: ['No existen datos para la selección'],
                    data: dashboard_proceso.prototipos
                };
                dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
                dashboard_proceso.refreshAngular();
                dashboard_proceso.charts.area.refresh();
            }
        } else {
            dashboard_proceso.area_data = {};
            dashboard_proceso.area_data = {
                legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                down: ['Este departamento no contiene Indicadores'],
                data: dashboard_proceso.prototipos
            };
            dashboard_proceso.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_proceso.refreshAngular();
            // dashboard_proceso.charts.area.refresh();
        }
        setTimeout(function () {
            animation.stoploading(`#graficos`, ``);
        }, 1000)
    };

    dashboard_proceso.yaporpoa = false;
    // $scope.$watch('dashboard_proceso.poa', function (value) {
    //     dashboard_proceso.getAll();
    //     if (value > 0)
    //         CRUD_vw_dashboard_productosgrid.table.filters.columns[0].query.where = [
    //             {
    //                 field: "departamento",
    //                 value: dashboard_proceso.departamento
    //             },
    //             {
    //                 field: "poa",
    //                 value: value
    //             }
    //         ];
    // });

    dashboard_proceso.firstWatch = 1;


    $scope.$watch('dashboard_proceso.departamento', function (value) {

        if (dashboard_proceso.firstWatch >= 2) {

            if (dashboard_proceso.searchFirstData) {
                console.log("getall");
                //dashboard_proceso.getAll();
                if (value > 0) {

                }
            }
        } else {
            dashboard_proceso.firstWatch++;
        }

    });

});
