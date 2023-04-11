app.controller("dashboard_indicadores", function ($scope, $http, $compile) {
    dashboard_indicadores = this;
    dashboard = undefined;
    dashboard_departamento = undefined;
    dashboard_cofiguration = undefined;
    dashboard_presupuesto_barra = undefined;
    RUNCONTROLLER("dashboard_indicadores", dashboard_indicadores, $scope, $http, $compile);
    RUN_B("dashboard_indicadores", dashboard_indicadores, $scope, $http, $compile);
    dashboard_indicadores.headertitle = "Indicadores_Producto";

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

    dashboard_indicadores.loadCharts = true;
    var user = new SESSION().current();
    dashboard_indicadores.pei_id = user.pei_id;
    dashboard_indicadores.compania_id = user.compania_id;
    dashboard_indicadores.group_caracteristica = user.groups[0].caracteristica;
    dashboard_indicadores.currentYear = moment().year();
    dashboard_indicadores.session = user;
    dashboard_indicadores.columnsstack_data = {
        legend: [],
        down: [],
        data: []
    };
    dashboard_indicadores.pie_events = {
        'click': function (data) {
            console.log(data);
            dashboard_indicadores.openmodalproductos(data.name.toString().toLowerCase());
        }
    };
    dashboard_indicadores.pie2_events = {
        'click': function (data) {
            console.log(data);
            data.name = data.name == 'Sin información' ? ' ' : data.name.toString().toLowerCase();
            dashboard_indicadores.openmodalactividades(data.name);
        }
    };
    dashboard_indicadores.pie3_events = {
        'click': function (data) {
            dashboard_indicadores.openmodalasignaciones(data.name.toString().toLowerCase());
        }
    };
    dashboard_indicadores.pie_data = [{value: 1, name: "N/A"}];
    dashboard_indicadores.pie2_data = [{value: 1, name: "N/A"}];
    dashboard_indicadores.pie3_data = [{value: 1, name: "N/A"}];
    dashboard_indicadores.area_data = {
        legend: [],
        down: [],
        data: []
    };
    dashboard_indicadores.area2_data = {
        legend: [],
        down: [],
        data: []
    };
    dashboard_indicadores.area3_data = {
        legend: [],
        down: [],
        data: []
    };


    var animation = new ANIMATION();

    var paso2 = false;
    var paso = false;
    dashboard_indicadores.searchFirstData = true;
    dashboard_indicadores.searchData = function () {
        if (typeof dashboard_indicadores != "undefined" && dashboard_indicadores != null) {
            vw_dashboard_productosgrid_pei.fixFilters = [{
                field: dashboard_indicadores.institucion === '[NULL]' ? "compania" : "entidad",
                value: dashboard_indicadores.institucion === '[NULL]' ? user.compania_id : dashboard_indicadores.institucion,
            }];
        } else if (typeof dashboard_departamento_especifico != "undefined" && dashboard_departamento_especifico != null) {
            vw_dashboard_productosgrid_pei.fixFilters = [
                {
                    field: dashboard_indicadores.institucion === '[NULL]' ? "compania" : "entidad",
                    value: dashboard_indicadores.institucion === '[NULL]' ? user.compania_id : dashboard_indicadores.institucion,
                }];
        } else {
            vw_dashboard_productosgrid_pei.fixFilters = [{
                field: dashboard_indicadores.institucion === '[NULL]' ? "compania" : "entidad",
                value: dashboard_indicadores.institucion === '[NULL]' ? user.compania_id : dashboard_indicadores.institucion,
            }];
        }

        if (dashboard_indicadores.institucion === "[NULL]") {
            dashboard_indicadores.poabushin = [];
            for (var item of dashboard_indicadores.form.options.institucion.data) {
                if (item.compania == dashboard_indicadores.compania_id) {
                    if (item.poa)
                        dashboard_indicadores.poabushin.push(item.poa);
                }
            }
        } else {
            dashboard_indicadores.poabushin = dashboard_indicadores.poa;
        }


        // vw_dashboard_productosgrid.goPage(1);
        // vw_dashboard_productosgrid_actividades.goPage(1);
        // vw_dashboard_productosgrid_pei.goPage(1);
        dashboard_indicadores.getAll();


        CRUD_vw_dashboard_productosgrid.table.filters.columns[0].query.where = [
            {
                field: "departamento",
                value: dashboard_indicadores.departamento
            },
            {
                field: "poa",
                value: dashboard_indicadores./**/poabushin
            },
        ];
        CRUD_vw_dashboard_productosgrid_actividades.table.filters.columns[0].query.where = [
            {
                field: "departamento",
                value: dashboard_indicadores.departamento
            },
            {
                field: "poa",
                value: dashboard_indicadores./**/poabushin
            }
        ];
        CRUD_vw_dashboard_productosgrid_pei.table.filters.columns[0].query.where = [

            {
                field: dashboard_indicadores.institucion === '[NULL]' ? "compania" : "entidad",
                value: dashboard_indicadores.institucion === '[NULL]' ? dashboard_indicadores.compania_id : dashboard_indicadores.institucion,
            }
        ];
    };

    dashboard_indicadores.triggers.table.after.close = function (data) {
        MENUMODAL = true;
        dashboard_indicadores.firstWatch = 1;
    };

    //Aquí se hace la validación de que si el usuario es director o analista departamental
    dashboard_indicadores.triggers.table.after.control = function (data) {
        if (data === "poa") {
            if (paso2 == false && dashboard_indicadores.group_caracteristica == ENUM_2.Grupos.director_departamental || paso2 == false && dashboard_indicadores.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                dashboard_indicadores.poa = user.poa_id.toString();
                dashboard_indicadores.poabushin = dashboard_indicadores.poa;
                dashboard_indicadores.form.loadDropDown('poa');
                paso2 = true;
            } else if (paso2 == false) {
                dashboard_indicadores.poa = user.poa_id.toString();
                dashboard_indicadores.poabushin = dashboard_indicadores.poa;
                dashboard_indicadores.form.loadDropDown('poa');
                paso2 = true;
                dashboard_indicadores.form.options.poa.disabled = false;
                dashboard_indicadores.refreshAngular();
            }
        }
        if (data === "departamento") {
            dashboard_indicadores.getAll();
            if (paso == false && dashboard_indicadores.group_caracteristica == ENUM_2.Grupos.director_departamental || paso == false && dashboard_indicadores.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                dashboard_indicadores.departamento = user.departamento.toString();
                dashboard_indicadores.searchFirstData = true;
                dashboard_indicadores.form.loadDropDown('departamento');
                paso = true;
            } else if (paso == false) {
                dashboard_indicadores.departamento = "0";
                dashboard_indicadores.form.loadDropDown('departamento');
                paso = true;
                dashboard_indicadores.form.options.departamento.disabled = false;
                dashboard_indicadores.refreshAngular();
                dashboard_indicadores.searchFirstData = false;

            } else {
                dashboard_indicadores.searchFirstData = false;
                dashboard_indicadores.refreshAngular();
            }


        }

    };
    //Aquí acaba.


    dashboard_indicadores.openmodalproductos = function (value) {
        dashboard_indicadores.Mproductos = value;
        dashboard_indicadores.modal.modalView("productos_poa", {
            width: 'modal-full',
            header: {
                title: dashboard_indicadores.session.tipo_institucion === 1 ? "Proyecto/Producto "  + dashboard_indicadores.Mproductos : "Proyectos/Planes de Acción " + dashboard_indicadores.Mproductos,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'productos_poa',
            },
        });
    };
    dashboard_indicadores.openmodalactividades = function (value) {
        var title = "";
        dashboard_indicadores.Mactividades = value;
        switch (dashboard_indicadores.Mactividades) {
            case "planificados":
                title = "planificadas";
                break;
            case "en ejecución":
                title = "en ejecución";
                break;
            case "detenidos":
                title = "detenidas";
                break;
            case "vencidos":
                title = "vencidas";
                break;
            case "cancelados":
                title = "canceladas";
                break;
            case "completados":
                title = "completadas";
                break;
            default:
                title = value;
        }
        switch (dashboard_indicadores.Mactividades) {
            case "planificadas":
                dashboard_indicadores.Mactividades = "planificados";
                break;
            case "en ejecución":
                dashboard_indicadores.Mactividades = "en ejecución";
                break;
            case "detenidas":
                dashboard_indicadores.Mactividades = "detenidos";
                break;
            case "vencidas":
                dashboard_indicadores.Mactividades = "vencidos";
                break;
            case "canceladas":
                dashboard_indicadores.Mactividades = "cancelados";
                break;
            case "completadas":
                dashboard_indicadores.Mactividades = "completados";
                break;
        }
        dashboard_indicadores.modal.modalView("actividades_poa", {
            width: 'modal-full',
            header: {
                title: "Actividades " + title,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'actividades_poa',
            },
        });
    };
    dashboard_indicadores.openmodalasignaciones = function (value) {
        var title = "";
        dashboard_indicadores.Masignaciones = value;
        switch (dashboard_indicadores.Masignaciones) {
            case "planificados":
                title = "planificadas";
                break;
            case "en ejecución":
                title = "en ejecución";
                break;
            case "vencidos":
                title = "vencidas";
                break;
            case "cancelados":
                title = "canceladas";
                break;
            case "completados":
                title = "completadas";
                break;
            default:
                title = value;
        }
        switch (dashboard_indicadores.Masignaciones) {
            case "planificadas":
                dashboard_indicadores.Masignaciones = "planificados";
                break;
            case "en ejecución":
                dashboard_indicadores.Masignaciones = "en ejecución";
                break;
            case "detenidas":
                dashboard_indicadores.Masignaciones = "detenidos";
                break;
            case "vencidas":
                dashboard_indicadores.Masignaciones = "vencidos";
                break;
            case "canceladas":
                dashboard_indicadores.Masignaciones = "cancelados";
                break;
            case "completadas":
                dashboard_indicadores.Masignaciones = "completados";
                break;
        }
        dashboard_indicadores.modal.modalView("vw_asignacion_especial_dashboard", {
            width: 'modal-full',
            header: {
                title: "Asignaciones especiales " + title,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'vw_asignacion_especial_dashboard',
            },
        });
    };

    dashboard_indicadores.getAll = function () {
        if (dashboard_indicadores.departamento !== "[NULL]" && dashboard_indicadores.departamento !== undefined) {
            dashboard_indicadores.getIndicadores();
            // dashboard_indicadores.callDataBarra();
            dashboard_indicadores.callDataLinea();
        }
    };

    dashboard_indicadores.getPresupuesto = function () {
        animation.loading(`#presupuestos`, "", ``, '30');
        var dashboard_indicadores_listpresupuestos = [];
        dashboard_indicadores.presupuestos = {
            aprobado: 0,
            ejecutado: 0,
            cuentasporpagar: 0,
            reprogramar: 0,
            noejecutado: 0
        };

        if (dashboard_indicadores.departamento == "0") {
            dashboard_indicadores.condition = [{
                field: "poa",
                value: dashboard_indicadores./**/poabushin,
            },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }];
        } else {
            dashboard_indicadores.condition = [{
                field: "poa",
                value: dashboard_indicadores./**/poabushin,
            }, {
                field: "departamento",
                value: dashboard_indicadores.departamento
            },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }];
        }

        BASEAPI.listp('vw_presupesto', {
            where: dashboard_indicadores.condition
        }).then(function (result) {
            dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_indicadores_listpresupuestos = result;
            if (dashboard_indicadores_listpresupuestos.data) {
                for (var p = 0; p < dashboard_indicadores_listpresupuestos.data.length; p++) {
                    dashboard_indicadores.presupuestos.aprobado += dashboard_indicadores_listpresupuestos.data[p].aprobado;
                    dashboard_indicadores.presupuestos.ejecutado += dashboard_indicadores_listpresupuestos.data[p].ejecutado;
                    dashboard_indicadores.presupuestos.cuentasporpagar += dashboard_indicadores_listpresupuestos.data[p].cuentasporpagar;
                    dashboard_indicadores.presupuestos.reprogramar += dashboard_indicadores_listpresupuestos.data[p].reprogramar;
                    dashboard_indicadores.presupuestos.noejecutado += dashboard_indicadores_listpresupuestos.data[p].noejecutado;
                }
                for (var i in dashboard_indicadores.presupuestos) {
                    dashboard_indicadores.presupuestos[i] = LAN.money(dashboard_indicadores.presupuestos[i]).format(true);
                }
            }
            dashboard_indicadores.refreshAngular();
            animation.stoploading(`#presupuestos`);
        });
    };
    dashboard_indicadores.getIndicadores = function () {
        if (dashboard_indicadores.departamento == "0") {
            dashboard_indicadores.condition = [{
                field: "poa",
                value: dashboard_indicadores./**/poabushin,
            }];
            dashboard_indicadores.condition2 = [
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }];

        } else {
            dashboard_indicadores.condition = [{
                field: "poa",
                value: dashboard_indicadores./**/poabushin,
            }, {
                field: "departamento",
                value: dashboard_indicadores.departamento
            },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }];

            dashboard_indicadores.condition2 = [{
                field: "poa",
                value: dashboard_indicadores./**/poabushin,
            }, {
                field: "departamento",
                operator: 'like',
                value: `$'%(${dashboard_indicadores.departamento})%'`
            },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }];


        }
        var usersss = new SESSION().current();
        vw_dashboard_productosgrid.changeFilter(dashboard_indicadores.condition);
        vw_dashboard_productosgrid_actividades.changeFilter(dashboard_indicadores.condition);
        vw_dashboard_productosgrid_pei.changeFilter([
            {
                field: dashboard_indicadores.institucion === '[NULL]' ? "compania" : "entidad",
                value: dashboard_indicadores.institucion === '[NULL]' ? dashboard_indicadores.compania_id : dashboard_indicadores.institucion
            }]);
    };
    dashboard_indicadores.getProductos = function () {
        animation.loading(`#productos`, "", ``, '30');
        dashboard_indicadores.listproductos = [];
        dashboard_indicadores.productos = {
            cantidad: 0,
            completados: 0,
            ejecucion: 0,
            vencidos: 0,
            planificados: 0,
            cancelados: 0,
            detenidos: 0
        };
        if (dashboard_indicadores.departamento == "0") {
            dashboard_indicadores.condition = [{
                field: "id",
                value: dashboard_indicadores./**/poabushin,
            },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }];
        } else {
            dashboard_indicadores.condition = [{
                field: "id",
                value: dashboard_indicadores./**/poabushin,
            }, {
                field: "departamento",
                value: dashboard_indicadores.departamento
            },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }];
        }


        BASEAPI.listp('vw_dashboard_productos', {
            where: dashboard_indicadores.condition
        }).then(function (result) {
            dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_indicadores.listproductos = result;
            if (dashboard_indicadores.listproductos.data) {
                if (dashboard_indicadores.listproductos.data.length > 0) {
                    dashboard_indicadores.pie_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificados'},
                        ejecucion: {value: 0, name: 'En Ejecución'},
                        detenidos: {value: 0, name: 'Detenidos'},
                        vencidos: {value: 0, name: 'Vencidos'},
                        cancelados: {value: 0, name: 'Cancelados'},
                        completados: {value: 0, name: 'Completados'}
                    };
                    for (var pr = 0; pr < dashboard_indicadores.listproductos.data.length; pr++) {
                        dashboard_indicadores.productos.cantidad += dashboard_indicadores.listproductos.data[pr].cantidad;
                        dashboard_indicadores.productos.completados += dashboard_indicadores.listproductos.data[pr].completados;
                        dashboard_indicadores.productos.ejecucion += dashboard_indicadores.listproductos.data[pr].ejecucion;
                        dashboard_indicadores.productos.vencidos += dashboard_indicadores.listproductos.data[pr].vencidos;
                        dashboard_indicadores.productos.planificados += dashboard_indicadores.listproductos.data[pr].planificados;
                        dashboard_indicadores.productos.detenidos += dashboard_indicadores.listproductos.data[pr].detenidos;
                        dashboard_indicadores.productos.cancelados += dashboard_indicadores.listproductos.data[pr].cancelados;

                        legendsAct.planificados.value += dashboard_indicadores.listproductos.data[pr].planificados;
                        legendsAct.ejecucion.value += dashboard_indicadores.listproductos.data[pr].ejecucion;
                        legendsAct.vencidos.value += dashboard_indicadores.listproductos.data[pr].vencidos;
                        legendsAct.completados.value += dashboard_indicadores.listproductos.data[pr].completados;
                        legendsAct.detenidos.value += dashboard_indicadores.listproductos.data[pr].detenidos;
                        legendsAct.cancelados.value += dashboard_indicadores.listproductos.data[pr].cancelados;
                    }

                    for (var i in dashboard_indicadores.productos) {
                        dashboard_indicadores.productos[i] = parseInt(dashboard_indicadores.productos[i]) < 10 ? ('0' + dashboard_indicadores.productos[i]) : dashboard_indicadores.productos[i];
                    }

                    dashboard_indicadores.pie_data = [];
                    dashboard_indicadores.pie_legend = ['Planificados', 'En Ejecución', 'Detenidos', 'Vencidos', 'Completados', 'Cancelados'];
                    dashboard_indicadores.pie_data.push(
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
                                    color: '#57595D',
                                },
                                emphasis: {
                                    color: '#57595D',
                                }
                            }
                        },
                    );
                } else {
                    dashboard_indicadores.pie_legend = ['No existen datos para la selección'];
                    dashboard_indicadores.pie_data = [{
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
                    dashboard_indicadores.pie_menssageHover = "";
                }
            } else {
                dashboard_indicadores.pie_legend = ['No existen datos para la selección'];
                dashboard_indicadores.pie_data = [{
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
                dashboard_indicadores.pie_menssageHover = "Hacer clic para ver detalle";
            }
            dashboard_indicadores.refreshAngular();
            dashboard_indicadores.charts.pie.refresh();
            animation.stoploading(`#productos`);
        });
    };
    dashboard_indicadores.getAsignaciones = function () {
        animation.loading(`#asignaciones`, "", ``, '30');
        dashboard_indicadores.listasignaciones = [];
        dashboard_indicadores.asignaciones = {
            cantidad: 0,
            completados: 0,
            ejecucion: 0,
            vencidos: 0,
            planificados: 0,
            cancelados: 0
        };
        if (dashboard_indicadores.departamento == "0") {
            dashboard_indicadores.condition = [{
                field: "id",
                value: dashboard_indicadores./**/poabushin,
            },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }];
        } else {
            dashboard_indicadores.condition = [{
                field: "id",
                value: dashboard_indicadores./**/poabushin,
            }, {
                field: "departamento",
                value: dashboard_indicadores.departamento
            },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }];
        }
        BASEAPI.listp('vw_dashboard_asignaciones', {
            where: dashboard_indicadores.condition
        }).then(function (result) {
            dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_indicadores.listasignaciones = result;
            if (dashboard_indicadores.listasignaciones.data) {
                if (dashboard_indicadores.listasignaciones.data.length > 0) {
                    dashboard_indicadores.pie3_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificadas'},
                        ejecucion: {value: 0, name: 'En Ejecución'},
                        vencidos: {value: 0, name: 'Vencidas'},
                        cancelados: {value: 0, name: 'Canceladas'},
                        completados: {value: 0, name: 'Completadas'}
                    };
                    for (var a = 0; a < dashboard_indicadores.listasignaciones.data.length; a++) {
                        dashboard_indicadores.asignaciones.cantidad += dashboard_indicadores.listasignaciones.data[a].cantidad;
                        dashboard_indicadores.asignaciones.completados += dashboard_indicadores.listasignaciones.data[a].completados;
                        dashboard_indicadores.asignaciones.ejecucion += dashboard_indicadores.listasignaciones.data[a].ejecucion;
                        dashboard_indicadores.asignaciones.vencidos += dashboard_indicadores.listasignaciones.data[a].vencidos;
                        dashboard_indicadores.asignaciones.planificados += dashboard_indicadores.listasignaciones.data[a].planificados;
                        dashboard_indicadores.asignaciones.cancelados += dashboard_indicadores.listasignaciones.data[a].cancelados;

                        legendsAct.planificados.value += dashboard_indicadores.listasignaciones.data[a].planificados;
                        legendsAct.ejecucion.value += dashboard_indicadores.listasignaciones.data[a].ejecucion;
                        legendsAct.vencidos.value += dashboard_indicadores.listasignaciones.data[a].vencidos;
                        legendsAct.completados.value += dashboard_indicadores.listasignaciones.data[a].completados;
                        legendsAct.cancelados.value += dashboard_indicadores.listasignaciones.data[a].cancelados;
                    }

                    for (var i in dashboard_indicadores.asignaciones) {
                        dashboard_indicadores.asignaciones[i] = parseInt(dashboard_indicadores.asignaciones[i]) < 10 ? ('0' + dashboard_indicadores.asignaciones[i]) : dashboard_indicadores.asignaciones[i];
                    }

                    dashboard_indicadores.pie3_data = [];
                    dashboard_indicadores.pie3_legend = ['Planificadas', 'En Ejecución', 'Vencidas', 'Completadas', 'Canceladas'];
                    dashboard_indicadores.pie3_data.push(
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
                                    color:'#9b89d9',
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
                    dashboard_indicadores.pie3_legend = ['No existen datos para la selección'];
                    dashboard_indicadores.pie3_data = [{
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
                    dashboard_indicadores.pie3_menssageHover = "";
                }
            } else {
                dashboard_indicadores.pie3_legend = ['No existen datos para la selección'];
                dashboard_indicadores.pie3_data = [{
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
                dashboard_indicadores.pie3_menssageHover = "";
            }
            dashboard_indicadores.refreshAngular();
            dashboard_indicadores.charts.pie3.refresh();
            animation.stoploading(`#asignaciones`);
        });
    };
    dashboard_indicadores.getActividades = function () {
        animation.loading(`#actividades`, "", ``, '30');
        dashboard_indicadores.listactividades = [];
        dashboard_indicadores.actividades = {
            cantidad: 0,
            completados: 0,
            ejecucion: 0,
            vencidos: 0,
            planificados: 0,
            detenidos: 0,
            cancelados: 0
        };
        if (dashboard_indicadores.departamento == "0") {
            dashboard_indicadores.condition = [{
                field: "id",
                value: dashboard_indicadores./**/poabushin,
            },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }];
        } else {
            dashboard_indicadores.condition = [{
                field: "id",
                value: dashboard_indicadores./**/poabushin,
            }, {
                field: "departamento",
                value: dashboard_indicadores.departamento
            },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }];
        }
        BASEAPI.listp('vw_dashboard_actividades', {
            where: dashboard_indicadores.condition
        }).then(function (result) {
            dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_indicadores.listactividades = result;
            if (dashboard_indicadores.listactividades.data) {
                if (dashboard_indicadores.listactividades.data.length > 0) {
                    dashboard_indicadores.pie2_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificadas'},
                        detenidos: {value: 0, name: 'Detenidas'},
                        ejecucion: {value: 0, name: 'En Ejecución'},
                        vencidos: {value: 0, name: 'Vencidas'},
                        cancelados: {value: 0, name: 'Canceladas'},
                        completados: {value: 0, name: 'Completadas'}
                    };
                    for (var ac = 0; ac < dashboard_indicadores.listactividades.data.length; ac++) {
                        dashboard_indicadores.actividades.cantidad += dashboard_indicadores.listactividades.data[ac].cantidad;
                        dashboard_indicadores.actividades.completados += dashboard_indicadores.listactividades.data[ac].completados;
                        dashboard_indicadores.actividades.ejecucion += dashboard_indicadores.listactividades.data[ac].ejecucion;
                        dashboard_indicadores.actividades.vencidos += dashboard_indicadores.listactividades.data[ac].vencidos;
                        dashboard_indicadores.actividades.planificados += dashboard_indicadores.listactividades.data[ac].planificados;
                        dashboard_indicadores.actividades.cancelados += dashboard_indicadores.listactividades.data[ac].cancelados;
                        dashboard_indicadores.actividades.detenidos += dashboard_indicadores.listactividades.data[ac].detenidos;

                        legendsAct.planificados.value += dashboard_indicadores.listactividades.data[ac].planificados;
                        legendsAct.ejecucion.value += dashboard_indicadores.listactividades.data[ac].ejecucion;
                        legendsAct.vencidos.value += dashboard_indicadores.listactividades.data[ac].vencidos;
                        legendsAct.completados.value += dashboard_indicadores.listactividades.data[ac].completados;
                        legendsAct.detenidos.value += dashboard_indicadores.listactividades.data[ac].detenidos;
                        legendsAct.cancelados.value += dashboard_indicadores.listactividades.data[ac].cancelados;
                    }

                    for (var i in dashboard_indicadores.actividades) {
                        dashboard_indicadores.actividades[i] = parseInt(dashboard_indicadores.actividades[i]) < 10 ? ('0' + dashboard_indicadores.actividades[i]) : dashboard_indicadores.actividades[i];
                    }
                    dashboard_indicadores.pie2_data = [];

                    dashboard_indicadores.pie2_legend = ['Planificadas', 'En Ejecución', 'Detenidas', 'Vencidas', 'Completadas', 'Canceladas'];

                    dashboard_indicadores.pie2_data.push(
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
                    dashboard_indicadores.pie2_legend = ['No existen datos para la selección'];
                    dashboard_indicadores.pie2_data = [{
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
                    dashboard_indicadores.pie2_menssageHover = "";
                }
            } else {
                dashboard_indicadores.pie2_legend = ['No existen datos para la selección'];
                dashboard_indicadores.pie2_data = [{
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
                dashboard_indicadores.pie2_menssageHover = "";
            }
            dashboard_indicadores.refreshAngular();
            dashboard_indicadores.charts.pie2.refresh();
            animation.stoploading(`#actividades`);
        });
    };

    dashboard_indicadores.callDataBarra = async function () {
        dashboard_indicadores.listPre = [];
        dashboard_indicadores.listDep = [];
        var whereCondition = [{}];
        if (dashboard_indicadores.departamento == "0") {
            whereCondition = [
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id
                },
                {
                    field: "poa",
                    value: dashboard_indicadores./**/poabushin
                }
            ];
        } else {
            whereCondition = [
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id
                },
                {
                    field: "departamento",
                    value: dashboard_indicadores.departamento
                },
                {
                    field: "poa",
                    value: dashboard_indicadores./**/poabushin
                }
            ];
        }

        dashboard_indicadores.listPre = await BASEAPI.listp('vw_presupesto', {
            limit: 0,
            orderby: "departamento_nombre",
            order: "asc",
            where: whereCondition
        });

        if (dashboard_indicadores.listPre.data.length > 0) {
            dashboard_indicadores.listPre = dashboard_indicadores.listPre.data;
            dashboard_indicadores.columnsstack_data = {};
            dashboard_indicadores.columnsstack_data = {
                legend: ['Disponible', 'Ejecutado', 'No Ejecutado'],
                down: dashboard_indicadores.listDep,
                data: [
                    {
                        name: 'No Ejecutado',
                        type: 'bar',
                        //stack: 'Total',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'inside',
                                    textStyle: {
                                        fontSize: '11',
                                    },
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
                                    position: 'inside',
                                    textStyle: {
                                        fontSize: '11',
                                    },
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
                                    position: 'inside',
                                    textStyle: {
                                        fontSize: '11',
                                    },
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
            dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');

            dashboard_indicadores.columnsstack_data.data[0].data = createArray(dashboard_indicadores.listDep.length, '');
            dashboard_indicadores.columnsstack_data.data[1].data = createArray(dashboard_indicadores.listDep.length, '');
            dashboard_indicadores.columnsstack_data.data[2].data = createArray(dashboard_indicadores.listDep.length, '');

            for (var p = 0; p < dashboard_indicadores.listPre.length; p++) {
                dashboard_indicadores.listDep.push(dashboard_indicadores.listPre[p].departamento_nombre);
                dashboard_indicadores.columnsstack_data.data[1].data[p] = dashboard_indicadores.listPre[p].noejecutado ? dashboard_indicadores.listPre[p].noejecutado : '';
                dashboard_indicadores.columnsstack_data.data[0].data[p] = dashboard_indicadores.listPre[p].ejecutado ? dashboard_indicadores.listPre[p].ejecutado : '';
                dashboard_indicadores.columnsstack_data.data[2].data[p] = dashboard_indicadores.listPre[p].reprogramar ? dashboard_indicadores.listPre[p].reprogramar : '';
                if (dashboard_indicadores.columnsstack_data.data[2].data[p] < 0)
                    dashboard_indicadores.columnsstack_data.data[2].data[p] *= -1;
            }
            dashboard_indicadores.columnsstack_data.down = dashboard_indicadores.listDep;
            dashboard_indicadores.refreshAngular();
            dashboard_indicadores.charts.columnsstack.refresh();
        } else {
            dashboard_indicadores.columnsstack_data = {
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
                                color: '#ffe287',
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
            dashboard_indicadores.refreshAngular();
            dashboard_indicadores.charts.columnsstack.refresh();
        }
    };
    dashboard_indicadores.tipodashboard = "bar";
    dashboard_indicadores.callDataLinea = async function () {
        dashboard_indicadores.prototipos = [
            {
                name: 'Proyectado',
                type: dashboard_indicadores.tipodashboard,
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
            }, {
                name: 'Alcanzado',
                type: dashboard_indicadores.tipodashboard,
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
                type: dashboard_indicadores.tipodashboard,
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
        var dashboard_indicadores_listInd = [];
        var dashboard_indicadores_listIndN = [];

        var dashboard_indicadores_listInd2 = [];
        var dashboard_indicadores_listInd2N = [];

        var dashboard_indicadores_listInd3 = [];
        var dashboard_indicadores_listInd4 = [];
        var dashboard_indicadores_listInd3N = [];
        var dashboard_indicadores_listInd4N = [];

        if (dashboard_indicadores.departamento == "0") {
            dashboard_indicadores.whereCondition = [
                {
                    field: "poa",
                    value: dashboard_indicadores./**/poabushin
                },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }
            ];
        } else {
            dashboard_indicadores.whereCondition = [
                {
                    field: "poa",
                    value: dashboard_indicadores./**/poabushin
                },
                {
                    field: "departamento",
                    value: dashboard_indicadores.departamento
                },
                {
                    field: "compania",
                    value: dashboard_indicadores.compania_id,
                }
            ];
        }

        dashboard_indicadores_listInd = await BASEAPI.listp('vw_dashboard_productosgrid', {
            limit: 0,
            orderby: "indicador",
            order: "asc",
            where: dashboard_indicadores.whereCondition
        });

        dashboard_indicadores_listInd2 = await BASEAPI.listp('vw_dashboard_productosgrid_actividades', {
            limit: 0,
            orderby: "indicador",
            order: "asc",
            where: dashboard_indicadores.whereCondition
        });

        var ayalfinal = [
            {
                field: "compania",
                value: dashboard_indicadores.compania_id
            },
            {
                field: "poa",
                value: dashboard_indicadores./**/poabushin
            }
        ];
        if (dashboard_indicadores.departamento != 0) {
            // ayalfinal.push(
            //     {
            //         field: "departamento",
            //         operator: '',
            //         value: `$ LIKE '%(${dashboard_indicadores.departamento})%'`
            //     });
        }
        dashboard_indicadores_listInd3 = await BASEAPI.listp('vw_dashboard_productosgrid_pei', {
            limit: 0,
            orderby: "indicador",
            order: "asc",
            where: [
                {
                    field: dashboard_indicadores.institucion === '[NULL]' ? "compania" : "entidad",
                    value: dashboard_indicadores.institucion === '[NULL]' ? dashboard_indicadores.compania_id : dashboard_indicadores.institucion
                }]
        });

        if (dashboard_indicadores_listInd3.data) {
            if (dashboard_indicadores_listInd3.data.length > 0) {
                dashboard_indicadores_listInd3 = dashboard_indicadores_listInd3.data;
                dashboard_indicadores.area3_data = {};
                dashboard_indicadores.area3_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: dashboard_indicadores_listInd3N,
                    data: [
                        {
                            name: 'Diferencia',
                            type: dashboard_indicadores.tipodashboard,
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
                            type: dashboard_indicadores.tipodashboard,
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
                            type: dashboard_indicadores.tipodashboard,
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
                dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');

                dashboard_indicadores.area3_data.data[0].data = createArray(dashboard_indicadores_listInd3N.length, 0);
                dashboard_indicadores.area3_data.data[1].data = createArray(dashboard_indicadores_listInd3N.length, 0);
                dashboard_indicadores.area3_data.data[2].data = createArray(dashboard_indicadores_listInd3N.length, 0);

                for (var p = 0; p < dashboard_indicadores_listInd3.length; p++) {
                    dashboard_indicadores_listInd3N.push(dashboard_indicadores_listInd3[p].indicador);
                    dashboard_indicadores.area3_data.data[1].data[p] = dashboard_indicadores_listInd3[p].alcanzado ? dashboard_indicadores_listInd3[p].alcanzado : 0;
                    dashboard_indicadores.area3_data.data[0].data[p] = dashboard_indicadores_listInd3[p].acumulado ? dashboard_indicadores_listInd3[p].acumulado : 0;
                    dashboard_indicadores.area3_data.data[2].data[p] = dashboard_indicadores_listInd3[p].alcanzado - dashboard_indicadores_listInd3[p].acumulado ? parseFloat(dashboard_indicadores_listInd3[p].alcanzado - dashboard_indicadores_listInd3[p].acumulado).toFixed(2) : 0;
                    if (dashboard_indicadores.area3_data.data[2].data[p] < 0)
                        dashboard_indicadores.area3_data.data[2].data[p] *= -1;

                }
                dashboard_indicadores.refreshAngular();
                dashboard_indicadores.charts.area3.refresh();
            } else {
                dashboard_indicadores.area3_data = {};
                dashboard_indicadores.area3_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: ['No existen datos para la selección'],
                    data: dashboard_indicadores.prototipos
                };
                dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');
                dashboard_indicadores.refreshAngular();
                dashboard_indicadores.charts.area3.refresh();
            }
        } else {
            dashboard_indicadores.area3_data = {};
            dashboard_indicadores.area3_data = {
                legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                down: ['Este departamento no contiene Indicadores'],
                data: dashboard_indicadores.prototipos
            };
            dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_indicadores.refreshAngular();
            dashboard_indicadores.charts.area3.refresh();
        }

        if (dashboard_indicadores_listInd2.data) {
            if (dashboard_indicadores_listInd2.data.length > 0) {
                dashboard_indicadores_listInd2 = dashboard_indicadores_listInd2.data;
                dashboard_indicadores.area2_data = {};
                dashboard_indicadores.area2_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: dashboard_indicadores_listInd2N,
                    data: dashboard_indicadores.prototipos
                };
                dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');

                dashboard_indicadores.area2_data.data[0].data = createArray(dashboard_indicadores_listInd2N.length, 0);
                dashboard_indicadores.area2_data.data[1].data = createArray(dashboard_indicadores_listInd2N.length, 0);
                dashboard_indicadores.area2_data.data[2].data = createArray(dashboard_indicadores_listInd2N.length, 0);

                for (var p = 0; p < dashboard_indicadores_listInd2.length; p++) {
                    dashboard_indicadores_listInd2N.push(dashboard_indicadores_listInd2[p].indicador);
                    dashboard_indicadores.area2_data.data[1].data[p] = dashboard_indicadores_listInd2[p].alcanzado ? dashboard_indicadores_listInd2[p].alcanzado : 0;
                    dashboard_indicadores.area2_data.data[0].data[p] = dashboard_indicadores_listInd2[p].acumulado ? dashboard_indicadores_listInd2[p].acumulado : 0;
                    dashboard_indicadores.area2_data.data[2].data[p] = dashboard_indicadores_listInd2[p].alcanzado - dashboard_indicadores_listInd2[p].acumulado ? parseFloat(dashboard_indicadores_listInd2[p].alcanzado - dashboard_indicadores_listInd2[p].acumulado).toFixed(2) : 0;
                    if (dashboard_indicadores.area2_data.data[2].data[p] < 0)
                        dashboard_indicadores.area2_data.data[2].data[p] *= -1;
                }
                dashboard_indicadores.refreshAngular();
                dashboard_indicadores.charts.area2.refresh();
            } else {
                dashboard_indicadores.area2_data = {};
                dashboard_indicadores.area2_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: ['No existen datos para la selección'],
                    data: dashboard_indicadores.prototipos
                };
                dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');
                dashboard_indicadores.refreshAngular();
                dashboard_indicadores.charts.area2.refresh();
            }
        } else {
            dashboard_indicadores.area2_data = {};
            dashboard_indicadores.area2_data = {
                legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                down: ['Este departamento no contiene Indicadores'],
                data: dashboard_indicadores.prototipos
            };
            dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_indicadores.refreshAngular();
            dashboard_indicadores.charts.area2.refresh();
        }

        if (dashboard_indicadores_listInd.data) {
            if (dashboard_indicadores_listInd.data.length > 0) {
                dashboard_indicadores_listInd = dashboard_indicadores_listInd.data;
                dashboard_indicadores.area_data = {};
                dashboard_indicadores.area_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: dashboard_indicadores_listIndN,
                    data: dashboard_indicadores.prototipos
                };
                dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');

                dashboard_indicadores.area_data.data[0].data = createArray(dashboard_indicadores_listIndN.length, 0);
                dashboard_indicadores.area_data.data[1].data = createArray(dashboard_indicadores_listIndN.length, 0);
                dashboard_indicadores.area_data.data[2].data = createArray(dashboard_indicadores_listIndN.length, 0);

                for (var p = 0; p < dashboard_indicadores_listInd.length; p++) {
                    dashboard_indicadores_listIndN.push(dashboard_indicadores_listInd[p].indicador);
                    dashboard_indicadores.area_data.data[1].data[p] = dashboard_indicadores_listInd[p].alcanzado ? dashboard_indicadores_listInd[p].alcanzado : 0;
                    dashboard_indicadores.area_data.data[0].data[p] = dashboard_indicadores_listInd[p].acumulado ? dashboard_indicadores_listInd[p].acumulado : 0;
                    dashboard_indicadores.area_data.data[2].data[p] = dashboard_indicadores_listInd[p].alcanzado - dashboard_indicadores_listInd[p].acumulado ? parseFloat(dashboard_indicadores_listInd[p].alcanzado - dashboard_indicadores_listInd[p].acumulado).toFixed(2) : 0;
                    if (dashboard_indicadores.area_data.data[2].data[p] < 0)
                        dashboard_indicadores.area_data.data[2].data[p] *= -1;
                }
                dashboard_indicadores.refreshAngular();
                dashboard_indicadores.charts.area.refresh();
            } else {
                dashboard_indicadores.area_data = {};
                dashboard_indicadores.area_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: ['No existen datos para la selección'],
                    data: dashboard_indicadores.prototipos
                };
                dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');
                dashboard_indicadores.refreshAngular();
                dashboard_indicadores.charts.area.refresh();
            }
        } else {
            dashboard_indicadores.area_data = {};
            dashboard_indicadores.area_data = {
                legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                down: ['Este departamento no contiene Indicadores'],
                data: dashboard_indicadores.prototipos
            };
            dashboard_indicadores.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_indicadores.refreshAngular();
            dashboard_indicadores.charts.area.refresh();
        }
        animation.stoploading(`#graficos`, ``);
    };

    dashboard_indicadores.yaporpoa = false;
    // $scope.$watch('dashboard_indicadores.poa', function (value) {
    //     dashboard_indicadores.getAll();
    //     if (value > 0)
    //         CRUD_vw_dashboard_productosgrid.table.filters.columns[0].query.where = [
    //             {
    //                 field: "departamento",
    //                 value: dashboard_indicadores.departamento
    //             },
    //             {
    //                 field: "poa",
    //                 value: value
    //             }
    //         ];
    // });

    dashboard_indicadores.firstWatch = 1;


    $scope.$watch('dashboard_indicadores.departamento', function (value) {

        if (dashboard_indicadores.firstWatch >= 2) {

            if (dashboard_indicadores.searchFirstData) {
                console.log("getall");
                //dashboard_indicadores.getAll();
                if (value > 0) {

                    CRUD_vw_dashboard_productosgrid.table.filters.columns[0].query.where = [
                        {
                            field: "departamento",
                            value: value
                        },
                        {
                            field: "poa",
                            value: dashboard_indicadores./**/poabushin
                        }
                        ,
                        {
                            field: "compania",
                            value: dashboard_indicadores.compania_id,
                        }
                    ];

                }
            }
        } else {
            dashboard_indicadores.firstWatch++;
        }

    });

});
