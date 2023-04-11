app.controller("dashboard", function ($scope, $http, $compile) {
    dashboard = this;
    dashboard_departamento = undefined;
    dashboard_indicadores = undefined;
    dashboard_cofiguration = undefined;
    dashboard_presupuesto_barra = undefined;
    RUNCONTROLLER("dashboard", dashboard, $scope, $http, $compile);
    RUN_B("dashboard", dashboard, $scope, $http, $compile);
    dashboard.isloading = true;

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

    dashboard.loadCharts = true;
    var user = new SESSION().current();
    dashboard.pei_id = user.pei_id;
    dashboard.compania_id = user.compania_id;
    dashboard.group_caracteristica = user.groups[0].caracteristica;
    dashboard.usery = user;
    dashboard.currentYear = moment().year();
    dashboard.session = user;
    dashboard.columnsstack_data = {
        legend: [],
        down: [],
        data: []
    };
    dashboard.pie_events = {
        'click': function (data) {
            console.log(data);
            dashboard_cofiguration = null;
            dashboard.openmodalproductos(data.name.toString().toLowerCase());
        }
    };
    dashboard.pie2_events = {
        'click': function (data) {
            console.log(data);
            dashboard_cofiguration = null;
            data.name = data.name == 'Sin información' ? ' ' : data.name.toString().toLowerCase();
            dashboard.openmodalactividades(data.name);
        }
    };
    dashboard.pie3_events = {
        'click': function (data) {
            dashboard_cofiguration = null;
            dashboard.openmodalasignaciones(data.name.toString().toLowerCase());
        }
    };
    dashboard.pie_data = [{value: 1, name: "N/A"}];
    dashboard.pie2_data = [{value: 1, name: "N/A"}];
    dashboard.pie3_data = [{value: 1, name: "N/A"}];
    dashboard.area_data = {
        legend: [],
        down: [],
        data: []
    };


    var animation = new ANIMATION();

    var paso2 = false;
    var paso = false;
    dashboard.searchFirstData = true;
    dashboard.poabushin = [];
    dashboard.searchData = function (chiki) {
        if (dashboard.institucion === "[NULL]") {
            dashboard.poabushin = [];
            for (var item of dashboard.form.options.institucion.data) {
                if (item.compania == dashboard.compania_id) {
                    if (item.poa)
                        dashboard.poabushin.push(item.poa);
                }
            }
        } else {
            dashboard.poabushin = dashboard.poa;
        }
        dashboard.getAll(chiki);
        CRUD_vw_dashboard_productosgrid.table.filters.columns[0].query.where = [
            {
                field: "departamento",
                value: dashboard.departamento
            },
            {
                field: "poa",
                value: dashboard.poabushin
            }
        ];
    };

    //Aquí se hace la validación de que si el usuario es director o analista departamental
    dashboard.alltoo = 0;
    dashboard.triggers.table.after.control = function (data) {
        if (data === "poa") {
            if (paso2 == false && dashboard.group_caracteristica == ENUM_2.Grupos.director_departamental || paso2 == false && dashboard.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                dashboard.poa = user.poa_id.toString();
                dashboard.poabushin = dashboard.poa;
                dashboard.form.loadDropDown('poa');
                paso2 = true;
            } else if (paso2 == false) {
                dashboard.poa = user.poa_id.toString();
                dashboard.poabushin = dashboard.poa;
                dashboard.form.loadDropDown('poa');
                paso2 = true;
                dashboard.form.options.poa.disabled = false;
                dashboard.refreshAngular();
            }
            dashboard.alltoo += 1;
        }
        if (data === "departamento") {
            if (paso == false && dashboard.group_caracteristica == ENUM_2.Grupos.director_departamental || paso == false && dashboard.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                dashboard.departamento = user.departamento.toString();
                dashboard.form.loadDropDown('departamento');
                paso = true;
            } else if (paso == false) {
                dashboard.departamento = "0";
                dashboard.form.loadDropDown('departamento');
                paso = true;
                dashboard.form.options.departamento.disabled = false;
                dashboard.refreshAngular();
                dashboard.searchFirstData = false;

            }
            dashboard.alltoo += 1;


        }
        if (dashboard.alltoo > 1) {
            dashboard.getAll();
        }

    };
    //Aquí acaba.


    dashboard.openmodalproductos = function (value) {
        dashboard_cofiguration = null;
        dashboard.Mproductos = value;
        dashboard.modal.modalView("productos_poa", {
            width: 'modal-full',
            header: {
                title: dashboard.session.tipo_institucion === 1 ? "Proyectos/Productos "  + dashboard.Mproductos : "Proyectos/Planes de Acción " + dashboard.Mproductos,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'productos_poa',
            },
            event: {
                show: {
                    end: function(data) {
                        setTimeout(function(){
                            $('#productos_poaTable').css('display', 'inline-table')
                        }, 1000)
                    }
                }
            }
        });
    };
    dashboard.openmodalactividades = function (value) {
        dashboard_cofiguration = null;
        var title = "";
        dashboard.Mactividades = value;
        switch (dashboard.Mactividades) {
            case "planificados":
                title = "planificadas";
                break;
            case "pendientes":
                title = "pendientes a ejecución";
                break;
            case "trabajadas":
                title = "Trabajadas";
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
            case "ejecutado":
                title = "ejecutadas";
                break;
            default:
                title = value;
        }
        switch (dashboard.Mactividades) {
            case "planificadas":
                dashboard.Mactividades = "planificados";
                break;
            case "pendientes":
                title = "pendientes a ejecución";
                break;
            case "trabajadas":
                title = "Trabajadas";
                break;
            case "en ejecución":
                dashboard.Mactividades = "en ejecución";
                break;
            case "ejecutado":
                dashboard.Mactividades = "ejecutado";
                break;
            case "detenidas":
                dashboard.Mactividades = "detenidos";
                break;
            case "vencidas":
                dashboard.Mactividades = "vencidos";
                break;
            case "canceladas":
                dashboard.Mactividades = "cancelados";
                break;
            case "completadas":
                dashboard.Mactividades = "completados";
                break;
        }
        dashboard.modal.modalView("actividades_poa", {
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
            event: {
                show: {
                    end: function(data) {
                        setTimeout(function(){
                                $('.icon-plus-circle2 ').parent().hide();
                            $('#actividades_poaTable').css('display', 'inline-table')
                        }, 1000)
                    }
                }
            }
        });
    };
    dashboard.openmodalasignaciones = function (value) {
        dashboard_cofiguration = null;
        var title = "";
        dashboard.Masignaciones = value;
        switch (dashboard.Masignaciones) {
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
        switch (dashboard.Masignaciones) {
            case "planificadas":
                dashboard.Masignaciones = "planificados";
                break;
            case "en ejecución":
                dashboard.Masignaciones = "en ejecución";
                break;
            case "detenidas":
                dashboard.Masignaciones = "detenidos";
                break;
            case "vencidas":
                dashboard.Masignaciones = "vencidos";
                break;
            case "canceladas":
                dashboard.Masignaciones = "cancelados";
                break;
            case "completadas":
                dashboard.Masignaciones = "completados";
                break;
        }
        dashboard.modal.modalView("vw_asignacion_especial_dashboard", {
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
            event: {
                show: {
                    end: function(data) {
                        setTimeout(function(){
                            $('#vw_asignacion_especial_dashboardTable').css('display', 'inline-table')
                        }, 1000)
                    }
                }
            }
        });
    };


    dashboard.getAll = function (chiki) {
        animation.loading(`.loadingbata`, "", ``, '200');
        if (dashboard.departamento !== "[NULL]" && dashboard.departamento !== undefined) {
            dashboard.getPresupuesto(function () {
                dashboard.getProductos(function () {
                    dashboard.getActividades(function () {
                        dashboard.getAsignaciones(function () {
                            dashboard.getIndicadores(function () {
                                dashboard.callDataBarra(function () {
                                    dashboard.callDataLinea(function () {
                                        resizeCharts();
                                    });
                                });
                            });

                        });
                    });
                });

            });

        }


    };

    dashboard.getPresupuesto = function (callback) {
        animation.loading(`#presupuestos`, "", ``, '30');
        dashboard.listpresupuestos = [];
        dashboard.presupuestos = {
            aprobado: 0,
            ejecutado: 0,
            cuentasporpagar: 0,
            reprogramar: 0,
            noejecutado: 0
        };

        if (dashboard.departamento == "0") {
            dashboard.condition = [{
                field: "poa",
                value: dashboard.poabushin,
            }];
        } else {
            dashboard.condition = [{
                field: "poa",
                value: dashboard.poabushin,
            }, {
                field: "departamento",
                value: dashboard.departamento
            }];
        }

        BASEAPI.listp('vw_presupesto', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: dashboard.condition
        }).then(function (result) {
            dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard.listpresupuestos = result;
            dashboard.presupuestos.aprobado = 0;
            dashboard.presupuestos.ejecutado = 0;
            dashboard.presupuestos.cuentasporpagar = 0;
            dashboard.presupuestos.reprogramar = 0;
            dashboard.presupuestos.noejecutado = 0;
            if (dashboard.listpresupuestos.data) {
                for (var p = 0; p < dashboard.listpresupuestos.data.length; p++) {
                    dashboard.presupuestos.aprobado += parseFloat(dashboard.listpresupuestos.data[p].aprobado);
                    dashboard.presupuestos.ejecutado += parseFloat(dashboard.listpresupuestos.data[p].ejecutado);
                    dashboard.presupuestos.cuentasporpagar += parseFloat(dashboard.listpresupuestos.data[p].cuentasporpagar);
                    dashboard.presupuestos.reprogramar += parseFloat(dashboard.listpresupuestos.data[p].reprogramar);
                    dashboard.presupuestos.noejecutado += parseFloat(dashboard.listpresupuestos.data[p].noejecutado);
                }
                for (var i in dashboard.presupuestos) {
                    dashboard.presupuestos[i] = LAN.money(dashboard.presupuestos[i]).format(true);
                }
            }
            dashboard.refreshAngular();
            animation.stoploading(`#presupuestos`);

            if (callback)
                callback();
        });
    };
    dashboard.getIndicadores = function (callback) {
        if (dashboard.departamento == "0") {
            dashboard.condition = [{
                field: "poa",
                value: dashboard.poabushin,
            }];
        } else {
            dashboard.condition = [{
                field: "poa",
                value: dashboard.poabushin,
            }, {
                field: "departamento",
                value: dashboard.departamento
            }];
        }

        vw_dashboard_productosgrid.changeFilter(dashboard.condition, function () {
            if (callback)
                callback();
        });
    };
    dashboard.getProductos = function (callback) {
        animation.loading(`#productos`, "", ``, '30');
        dashboard.listproductos = [];
        dashboard.productos = {
            cantidad: 0,
            completados: 0,
            ejecucion: 0,
            vencidos: 0,
            planificados: 0,
            cancelados: 0,
            detenidos: 0
        };
        if (dashboard.departamento == "0") {
            dashboard.condition = [{
                field: "id",
                value: dashboard.poabushin,
            }];
        } else {
            dashboard.condition = [{
                field: "id",
                value: dashboard.poabushin,
            }, {
                field: "departamento",
                value: dashboard.departamento
            }];
        }

        BASEAPI.listp('vw_dashboard_productos', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: dashboard.condition
        }).then(function (result) {
            dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard.listproductos = result;
            dashboard.productos.cantidad = 0;
            dashboard.productos.completados = 0;
            dashboard.productos.ejecucion = 0;
            dashboard.productos.vencidos = 0;
            dashboard.productos.planificados = 0;
            dashboard.productos.detenidos = 0;
            dashboard.productos.cancelados = 0;
            if (dashboard.listproductos.data) {
                if (dashboard.listproductos.data.length > 0) {
                    dashboard.pie_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificados'},
                        ejecucion: {value: 0, name: 'En Ejecución'},
                        detenidos: {value: 0, name: 'Detenidos'},
                        vencidos: {value: 0, name: 'Vencidos'},
                        cancelados: {value: 0, name: 'Cancelados'},
                        completados: {value: 0, name: 'Completados'}
                    };
                    for (var pr = 0; pr < dashboard.listproductos.data.length; pr++) {
                        dashboard.productos.cantidad += parseInt(dashboard.listproductos.data[pr].cantidad);
                        dashboard.productos.completados += parseInt(dashboard.listproductos.data[pr].completados);
                        dashboard.productos.ejecucion += parseInt(dashboard.listproductos.data[pr].ejecucion);
                        dashboard.productos.vencidos += parseInt(dashboard.listproductos.data[pr].vencidos);
                        dashboard.productos.planificados += parseInt(dashboard.listproductos.data[pr].planificados);
                        dashboard.productos.detenidos += parseInt(dashboard.listproductos.data[pr].detenidos);
                        dashboard.productos.cancelados += parseInt(dashboard.listproductos.data[pr].cancelados);

                        legendsAct.planificados.value += parseInt(dashboard.listproductos.data[pr].planificados);
                        legendsAct.ejecucion.value += parseInt(dashboard.listproductos.data[pr].ejecucion);
                        legendsAct.vencidos.value += parseInt(dashboard.listproductos.data[pr].vencidos);
                        legendsAct.completados.value += parseInt(dashboard.listproductos.data[pr].completados);
                        legendsAct.detenidos.value += parseInt(dashboard.listproductos.data[pr].detenidos);
                        legendsAct.cancelados.value += parseInt(dashboard.listproductos.data[pr].cancelados);
                    }

                    for (var i in dashboard.productos) {
                        dashboard.productos[i] = parseInt(dashboard.productos[i]) < 10 ? ('0' + dashboard.productos[i]) : dashboard.productos[i];
                    }
                    dashboard.pie_data = [];
                    dashboard.pie_legend = ['Planificados', 'En Ejecución', 'Detenidos', 'Vencidos', 'Completados', 'Cancelados'];
                    dashboard.pie_data.push(
                        {
                            value: legendsAct.planificados.value,
                            name: legendsAct.planificados.name,
                            label: {
                                show: legendsAct.planificados.value ? true : false,
                                color: "black",
                            },
                            cantidad: LAN.money(dashboard.productos.cantidad).value,
                            itemStyle: {
                                color: '#9b89d9',
                            }
                        },
                        {
                            value: legendsAct.ejecucion.value,
                            name: legendsAct.ejecucion.name,
                            label: {
                                show: legendsAct.ejecucion.value ? true : false,
                                color: "black",
                            },
                            cantidad: LAN.money(dashboard.productos.cantidad).value,
                            itemStyle: {
                                color: '#a1de78',
                            }
                        },
                        {
                            value: legendsAct.detenidos.value,
                            name: legendsAct.detenidos.name,
                            label: {
                                show: legendsAct.detenidos.value ? true : false,
                                color: "black",
                            },
                            cantidad: LAN.money(dashboard.productos.cantidad).value,
                            itemStyle: {
                                color: '#ffe287',
                            }
                        },
                        {
                            value: legendsAct.vencidos.value,
                            name: legendsAct.vencidos.name,
                            label: {
                                show: legendsAct.vencidos.value ? true : false,
                                color: "black",
                            },
                            cantidad: LAN.money(dashboard.productos.cantidad).value,
                            itemStyle: {
                                color: '#ff8a8a',
                            }
                        },
                        {
                            value: legendsAct.completados.value,
                            name: legendsAct.completados.name,
                            label: {
                                show: legendsAct.completados.value ? true : false,
                                color: "black",
                            },
                            cantidad: LAN.money(dashboard.productos.cantidad).value,
                            itemStyle: {
                                color: '#737fff',
                            }
                        },
                        {
                            value: legendsAct.cancelados.value,
                            name: legendsAct.cancelados.name,
                            label: {
                                show: legendsAct.cancelados.value ? true : false,
                                color: "black",
                            },
                            cantidad: LAN.money(dashboard.productos.cantidad).value,
                            itemStyle: {
                                color: '#8e8f91',
                            }
                        },
                    );
                } else {
                    dashboard.pie_legend = ['No existen datos para la selección'];
                    dashboard.pie_data = [{
                        value: 1,
                        name: "Sin información",
                        label: {
                            show: false,
                            color: "black",
                        },
                        itemStyle: {
                            color: '#8e8f91',
                        }
                    }];
                    dashboard.pie_menssageHover = "";
                }
            } else {
                dashboard.pie_legend = ['No existen datos para la selección'];
                dashboard.pie_data = [{
                    value: 1,
                    name: "Sin información",
                    label: {
                        show: false,
                        color: "black",
                    },
                    itemStyle: {
                        color: '#8e8f91',
                    }
                }];
                dashboard.pie_menssageHover = "Hacer clic para ver detalle";
            }
            dashboard.refreshAngular();
            setTimeout(function () {
                dashboard.charts.pie.refresh();
            }, 2000);
            if (callback)
                callback();
            animation.stoploading(`#productos`);
        });
    };
    dashboard.getAsignaciones = function (callback) {
        animation.loading(`#asignaciones`, "", ``, '30');
        dashboard.listasignaciones = [];
        dashboard.asignaciones = {
            cantidad: 0,
            completados: 0,
            ejecucion: 0,
            vencidos: 0,
            planificados: 0,
            cancelados: 0
        };
        if (dashboard.departamento == "0") {
            dashboard.condition = [{
                field: "id",
                value: dashboard.poabushin,
            }];
        } else {
            dashboard.condition = [{
                field: "id",
                value: dashboard.poabushin,
            }, {
                field: "departamento",
                value: dashboard.departamento
            }];
        }
        BASEAPI.listp('vw_dashboard_asignaciones', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: dashboard.condition
        }).then(function (result) {
            dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard.listasignaciones = result;
            if (dashboard.listasignaciones.data) {
                dashboard.asignaciones.cantidad = 0;
                dashboard.asignaciones.completados = 0;
                dashboard.asignaciones.ejecucion = 0;
                dashboard.asignaciones.vencidos = 0;
                dashboard.asignaciones.planificados = 0;
                dashboard.asignaciones.cancelados = 0;
                if (dashboard.listasignaciones.data.length > 0) {
                    dashboard.pie3_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificadas'},
                        ejecucion: {value: 0, name: 'En Ejecución'},
                        vencidos: {value: 0, name: 'Vencidas'},
                        cancelados: {value: 0, name: 'Canceladas'},
                        completados: {value: 0, name: 'Completadas'}
                    };


                    for (var a = 0; a < dashboard.listasignaciones.data.length; a++) {
                        dashboard.asignaciones.cantidad += parseInt(dashboard.listasignaciones.data[a].cantidad);
                        dashboard.asignaciones.completados += parseInt(dashboard.listasignaciones.data[a].completados);
                        dashboard.asignaciones.ejecucion += parseInt(dashboard.listasignaciones.data[a].ejecucion);
                        dashboard.asignaciones.vencidos += parseInt(dashboard.listasignaciones.data[a].vencidos);
                        dashboard.asignaciones.planificados += parseInt(dashboard.listasignaciones.data[a].planificados);
                        dashboard.asignaciones.cancelados += parseInt(dashboard.listasignaciones.data[a].cancelados);

                        legendsAct.planificados.value += parseInt(dashboard.listasignaciones.data[a].planificados);
                        legendsAct.ejecucion.value += parseInt(dashboard.listasignaciones.data[a].ejecucion);
                        legendsAct.vencidos.value += parseInt(dashboard.listasignaciones.data[a].vencidos);
                        legendsAct.completados.value += parseInt(dashboard.listasignaciones.data[a].completados);
                        legendsAct.cancelados.value += parseInt(dashboard.listasignaciones.data[a].cancelados);
                    }

                    for (var i in dashboard.asignaciones) {
                        dashboard.asignaciones[i] = parseInt(dashboard.asignaciones[i]) < 10 ? ('0' + dashboard.asignaciones[i]) : dashboard.asignaciones[i];
                    }

                    dashboard.pie3_data = [];
                    dashboard.pie3_legend = ['Planificadas', 'En Ejecución', 'Vencidas', 'Completadas', 'Canceladas'];
                    dashboard.pie3_data.push(
                        {
                            value: legendsAct.planificados.value,
                            name: legendsAct.planificados.name,
                            label: {
                                show: legendsAct.planificados.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.asignaciones.cantidad).value,
                            itemStyle: {
                                color: '#9b89d9',
                            }
                        },
                        {
                            value: legendsAct.ejecucion.value,
                            name: legendsAct.ejecucion.name,
                            label: {
                                show: legendsAct.ejecucion.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.asignaciones.cantidad).value,
                            itemStyle: {
                                color: '#a1de78',
                            }
                        },
                        {
                            value: legendsAct.vencidos.value,
                            name: legendsAct.vencidos.name,
                            label: {
                                show: legendsAct.vencidos.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.asignaciones.cantidad).value,
                            itemStyle: {
                                color: '#ff8a8a',
                            }
                        },
                        {
                            value: legendsAct.cancelados.value,
                            name: legendsAct.cancelados.name,
                            label: {
                                show: legendsAct.cancelados.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.asignaciones.cantidad).value,
                            itemStyle: {
                                color: '#8e8f91',
                            }
                        },
                        {
                            value: legendsAct.completados.value,
                            name: legendsAct.completados.name,
                            label: {
                                show: legendsAct.completados.value ? true : false,
                                color: "black"
                            },
                            itemStyle: {
                                color: '#737fff',
                            }
                        },
                    );

                } else {
                    dashboard.pie3_legend = ['No existen datos para la selección'];
                    dashboard.pie3_data = [{
                        value: 1,
                        name: "Sin información",
                        label: {
                            show: false,
                            color: "black"
                        },
                        itemStyle: {
                            color: '#80867C',
                        }
                    }];
                    dashboard.pie3_menssageHover = "";
                }
            } else {
                dashboard.pie3_legend = ['No existen datos para la selección'];
                dashboard.pie3_data = [{
                    value: 1,
                    name: "Sin información",
                    label: {
                        show: false,
                        color: "black"
                    },
                    itemStyle: {
                        color: '#80867C',
                    }
                }];
                dashboard.pie3_menssageHover = "";
            }
            dashboard.refreshAngular();
            setTimeout(function () {
                dashboard.charts.pie3.refresh();
            }, 2000);
            if (callback)
                callback();
            animation.stoploading(`#asignaciones`);
        });
    };
    dashboard.getActividades = function (callback) {
        animation.loading(`#actividades`, "", ``, '30');
        dashboard.listactividades = [];
        dashboard.actividades = {
            cantidad: 0,
            completados: 0,
            ejecucion: 0,
            vencidos: 0,
            planificados: 0,
            detenidos: 0,
            cancelados: 0
        };
        if (dashboard.departamento == "0") {
            dashboard.condition = [{
                field: "id",
                value: dashboard.poabushin,
            }];
        } else {
            dashboard.condition = [{
                field: "id",
                value: dashboard.poabushin,
            }, {
                field: "departamento",
                value: dashboard.departamento
            }];
        }
        BASEAPI.listp('vw_dashboard_actividades', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: dashboard.condition
        }).then(function (result) {
            dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard.listactividades = result;
            if (dashboard.listactividades.data) {
                dashboard.actividades.cantidad = 0;
                dashboard.actividades.completados = 0;
                dashboard.actividades.trabajadas = 0;
                dashboard.actividades.pendientes = 0;
                dashboard.actividades.ejecucion = 0;
                dashboard.actividades.vencidos = 0;
                dashboard.actividades.planificados = 0;
                dashboard.actividades.cancelados = 0;
                dashboard.actividades.detenidos = 0;
                if (dashboard.listactividades.data.length > 0) {
                    dashboard.pie2_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificadas'},
                        detenidos: {value: 0, name: 'Detenidas'},
                        trabajadas: {value: 0, name: 'Trabajadas'},
                        pendientes: {value: 0, name: 'Pendientes a Ejecución'},
                        ejecucion: {value: 0, name: 'En Ejecución'},
                        vencidos: {value: 0, name: 'Vencidas'},
                        cancelados: {value: 0, name: 'Canceladas'},
                        completados: {value: 0, name: 'Completadas'}
                    };
                    for (var ac = 0; ac < dashboard.listactividades.data.length; ac++) {
                        dashboard.actividades.cantidad += parseInt(dashboard.listactividades.data[ac].cantidad);
                        dashboard.actividades.completados += parseInt(dashboard.listactividades.data[ac].completados);
                        dashboard.actividades.trabajadas += parseInt(dashboard.listactividades.data[ac].trabajadas);
                        dashboard.actividades.pendientes += parseInt(dashboard.listactividades.data[ac].pendientes);
                        dashboard.actividades.ejecucion += parseInt(dashboard.listactividades.data[ac].ejecucion);
                        dashboard.actividades.vencidos += parseInt(dashboard.listactividades.data[ac].vencidos);
                        dashboard.actividades.planificados += parseInt(dashboard.listactividades.data[ac].planificados);
                        dashboard.actividades.cancelados += parseInt(dashboard.listactividades.data[ac].cancelados);
                        dashboard.actividades.detenidos += parseInt(dashboard.listactividades.data[ac].detenidos);

                        legendsAct.planificados.value += parseInt(dashboard.listactividades.data[ac].planificados);
                        legendsAct.trabajadas.value += parseInt(dashboard.listactividades.data[ac].trabajadas);
                        legendsAct.pendientes.value += parseInt(dashboard.listactividades.data[ac].pendientes);
                        legendsAct.ejecucion.value += parseInt(dashboard.listactividades.data[ac].ejecucion);
                        legendsAct.vencidos.value += parseInt(dashboard.listactividades.data[ac].vencidos);
                        legendsAct.completados.value += parseInt(dashboard.listactividades.data[ac].completados);
                        legendsAct.detenidos.value += parseInt(dashboard.listactividades.data[ac].detenidos);
                        legendsAct.cancelados.value += parseInt(dashboard.listactividades.data[ac].cancelados);
                    }

                    for (var i in dashboard.actividades) {
                        dashboard.actividades[i] = parseInt(dashboard.actividades[i]) < 10 ? ('0' + dashboard.actividades[i]) : dashboard.actividades[i];
                    }
                    dashboard.pie2_data = [];

                    dashboard.pie2_legend = ['Planificadas', 'Trabajadas', 'Pendientes a Ejecución', 'En Ejecución', 'Detenidas', 'Vencidas', 'Completadas', 'Canceladas'];

                    dashboard.pie2_data.push(
                        {
                            value: legendsAct.planificados.value,
                            name: legendsAct.planificados.name,
                            label: {
                                show: legendsAct.planificados.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.actividades.cantidad).value,
                            itemStyle: {
                                color: '#9b89d9',
                            }
                        },
                        {
                            value: legendsAct.pendientes.value,
                            name: legendsAct.pendientes.name,
                            label: {
                                show: legendsAct.pendientes.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.actividades.cantidad).value,
                            itemStyle: {
                                color: '#74f791',
                            }
                        },
                        {
                            value: legendsAct.ejecucion.value,
                            name: legendsAct.ejecucion.name,
                            label: {
                                show: legendsAct.ejecucion.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.actividades.cantidad).value,
                            itemStyle: {
                                color: '#a1de78',
                            }
                        },
                        {
                            value: legendsAct.detenidos.value,
                            name: legendsAct.detenidos.name,
                            label: {
                                show: legendsAct.detenidos.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.actividades.cantidad).value,
                            itemStyle: {
                                color: '#ffe287',
                            }
                        },
                        {
                            value: legendsAct.vencidos.value,
                            name: legendsAct.vencidos.name,
                            label: {
                                show: legendsAct.vencidos.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.actividades.cantidad).value,
                            itemStyle: {
                                color: '#ff8a8a',
                            }
                        },
                        {
                            value: legendsAct.trabajadas.value,
                            name: legendsAct.trabajadas.name,
                            label: {
                                show: legendsAct.trabajadas.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.actividades.cantidad).value,
                            itemStyle: {
                                color: '#5968ff',
                            }
                        },
                        {
                            value: legendsAct.completados.value,
                            name: legendsAct.completados.name,
                            label: {
                                show: legendsAct.completados.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.actividades.cantidad).value,
                            itemStyle: {
                                color: '#737fff',
                            }
                        },
                        {
                            value: legendsAct.cancelados.value,
                            name: legendsAct.cancelados.name,
                            label: {
                                show: legendsAct.cancelados.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(dashboard.actividades.cantidad).value,
                            itemStyle: {
                                color: '#8e8f91',
                            }
                        },
                    );
                } else {
                    dashboard.pie2_legend = ['No existen datos para la selección'];
                    dashboard.pie2_data = [{
                        value: 1,
                        name: "Sin información",
                        label: {
                            show: false,
                            color: "black"
                        },
                        itemStyle: {
                            color: '#80867C',
                        }
                    }];
                    dashboard.pie2_menssageHover = "";
                }
            } else {
                dashboard.pie2_legend = ['No existen datos para la selección'];
                dashboard.pie2_data = [{
                    value: 1,
                    name: "Sin información",
                    label: {
                        show: false,
                        color: "black"
                    },
                    itemStyle: {
                        color: '#80867C',
                    }
                }];
                dashboard.pie2_menssageHover = "";
            }
            dashboard.refreshAngular();
            setTimeout(function () {
                dashboard.charts.pie2.refresh();
            }, 2000);
            if (callback)
                callback();
            animation.stoploading(`#actividades`);
        });
    };


    dashboard.callDataBarra = async function (callback) {
        dashboard.listPre = [];
        dashboard.listDep = [];
        if (dashboard.departamento == "0") {
            dashboard.condition = [{
                field: "poa",
                value: dashboard.poabushin,
            }];
        } else {
            dashboard.condition = [{
                field: "poa",
                value: dashboard.poabushin,
            }, {
                field: "departamento",
                value: dashboard.departamento
            }];
        }

        dashboard.listPre = await BASEAPI.listp('vw_presupesto', {
            limit: 0,
            orderby: "departamento_nombre",
            order: "asc",
            where: dashboard.condition
        });

        if (!dashboard.listPre.data)
            dashboard.listPre.data = [];
        if (dashboard.listPre.data.length > 0) {
            dashboard.listPre = dashboard.listPre.data;
            dashboard.columnsstack_data = {};
            dashboard.columnsstack_data = {
                legend: ['Disponible', 'Ejecutado', 'No Ejecutado'],
                down: dashboard.listDep,
                data: [
                    {
                        name: 'No Ejecutado',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'inside',
                                    textStyle: {
                                        fontSize: '11',
                                    },
                                    formatter: function (data) {
                                        return LAN.money(data.value).format(true);
                                    }
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
                        stack: 'Total',
                        itemStyle: {
                            normal: {

                                label: {
                                    show: true,
                                    position: 'inside',
                                    textStyle: {
                                        fontSize: '11',
                                    },
                                    formatter: function (data) {
                                        return LAN.money(data.value).format(true);
                                    }
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
                        stack: 'Total',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'inside',
                                    textStyle: {
                                        fontSize: '11',
                                    },
                                    formatter: function (data) {
                                        return LAN.money(data.value).format(true);
                                    }
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
            dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');

            dashboard.listDep = [];
            dashboard.columnsstack_data.data[0].data = createArray(dashboard.listDep.length, '');
            dashboard.columnsstack_data.data[1].data = createArray(dashboard.listDep.length, '');
            dashboard.columnsstack_data.data[2].data = createArray(dashboard.listDep.length, '');

            for (var p = 0; p < dashboard.listPre.length; p++) {
                dashboard.listDep.push(dashboard.listPre[p].departamento_nombre);
                dashboard.columnsstack_data.data[0].data[p] = dashboard.listPre[p].noejecutado ? dashboard.listPre[p].noejecutado : '';
                dashboard.columnsstack_data.data[1].data[p] = dashboard.listPre[p].ejecutado ? dashboard.listPre[p].ejecutado : '';
                dashboard.columnsstack_data.data[2].data[p] = dashboard.listPre[p].reprogramar ? dashboard.listPre[p].reprogramar : '';
            }
            if (dashboard.listPre.length < 3) {
                dashboard.columnsstack_data.data[0].data[p] = '';
                dashboard.columnsstack_data.data[1].data[p] = '';
                dashboard.columnsstack_data.data[2].data[p] = '';
            }
            dashboard.refreshAngular();
            dashboard.columnsstack_data.down = dashboard.listDep;
            setTimeout(function () {
                dashboard.charts.columnsstack.refresh();
            }, 2000);

        } else {
            dashboard.listDep = [];
            dashboard.columnsstack_data = {
                legend: ['Disponible', 'Ejecutado', 'No Ejecutado'],
                down: ['No existen datos para la selección'],
                data: [{
                    name: 'No Ejecutado',
                    type: 'bar',
                    stack: 'Total',
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
                    data: ['']
                },
                    {
                        name: 'Ejecutado',
                        type: 'bar',
                        stack: 'Total',
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
                        data: ['']
                    },
                    {
                        name: 'Disponible',
                        type: 'bar',
                        stack: 'Total',
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
                        data: ['']
                    }]
            };
            dashboard.refreshAngular();
            setTimeout(function () {
                dashboard.charts.columnsstack.refresh();
            }, 2000);
        }
        dashboard.isloading = false;
        if (callback)
            callback();
        animation.stoploading(`.loadingbata`, "", ``, '30');
    };
    dashboard.callDataLinea = async function (callback) {
        var dashboard_listInd = [];
        var dashboard_listIndN = [];
        if (dashboard.departamento == "0") {
            dashboard.whereCondition = [
                {
                    field: "poa",
                    value: dashboard.poabushin
                }
            ];
        } else {
            dashboard.whereCondition = [
                {
                    field: "poa",
                    value: dashboard.poabushin
                },
                {
                    field: "departamento",
                    value: dashboard.departamento
                }
            ];
        }

        dashboard_listInd = await BASEAPI.listp('vw_dashboard_productosgrid', {
            limit: 0,
            orderby: "indicador",
            order: "asc",
            where: dashboard.whereCondition
        });
        if (dashboard_listInd.data) {
            if (dashboard_listInd.data.length > 0) {
                dashboard_listInd = dashboard_listInd.data;
                dashboard.area_data = {};
                dashboard.area_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: dashboard_listIndN,
                    data: [
                        {
                            name: 'Diferencia',
                            type: 'line',
                            stack: 'Total',
                            data: [],
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'top',
                                        show: true,
                                        textStyle: {
                                            fontSize: '11',
                                            color: '#000000'
                                        }
                                    }, color:
                                    '#ffe287', areaStyle: {type: 'default', color: '#ffe287',}
                                }
                            }
                        },
                        {
                            name: 'Alcanzado',
                            type: 'line',
                            stack: 'Total',
                            data: [],
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'top',
                                        show: true,
                                        textStyle: {
                                            fontSize: '11',

                                        }
                                    }, color: '#737fff',
                                }
                            }
                        },
                        {
                            name: 'Proyectado',
                            type: 'line',
                            stack: 'Total',
                            data: [],
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'top',
                                        show: true,
                                        textStyle: {
                                            fontSize: '11',

                                        }
                                    }, color: '#a1de78',
                                }
                            }
                        }

                    ]
                };
                dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');

                dashboard.area_data.data[0].data = createArray(dashboard_listIndN.length, '');
                dashboard.area_data.data[1].data = createArray(dashboard_listIndN.length, '');
                dashboard.area_data.data[2].data = createArray(dashboard_listIndN.length, '');

                for (var p = 0; p < dashboard_listInd.length; p++) {
                    dashboard_listIndN.push(dashboard_listInd[p].indicador);
                    dashboard.area_data.data[1].data[p] = dashboard_listInd[p].alcanzado ? dashboard_listInd[p].alcanzado : '';
                    dashboard.area_data.data[2].data[p] = dashboard_listInd[p].acumulado ? dashboard_listInd[p].acumulado : '';
                    dashboard.area_data.data[0].data[p] = dashboard_listInd[p].alcanzado - dashboard_listInd[p].acumulado ? parseFloat(dashboard_listInd[p].alcanzado - dashboard_listInd[p].acumulado).toFixed(2) : '';

                }
                dashboard.refreshAngular();
                setTimeout(function () {
                    dashboard.charts.area.refresh();
                }, 2000);
            } else {
                dashboard.area_data = {};
                dashboard.area_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: ['No existen datos para la selección'],
                    data: [
                        {
                            name: 'Diferencia',
                            type: 'line',
                            stack: 'Total',
                            data: [''],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '10',

                                        }
                                    }, areaStyle: {type: 'default'}
                                }
                            }
                        },
                        {
                            name: 'Alcanzado',
                            type: 'line',
                            stack: 'Total',
                            data: [''],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '10',

                                        }
                                    }
                                }
                            }
                        },
                        {
                            name: 'Proyectado',
                            type: 'line',
                            stack: 'Total',
                            data: [''],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '10',

                                        }
                                    }
                                }
                            }
                        }

                    ]
                };
                dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');
                dashboard.refreshAngular();
                setTimeout(function () {
                    dashboard.charts.area.refresh();
                }, 2000);
            }
        } else {
            dashboard.area_data = {};
            dashboard.area_data = {
                legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                down: ['Este departamento no contiene Indicadores'],
                data: [
                    {
                        name: 'Diferencia',
                        type: 'line',
                        stack: 'Total',
                        data: [''],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '10',

                                    }
                                }, areaStyle: {type: 'default'}
                            }
                        }
                    },
                    {
                        name: 'Alcanzado',
                        type: 'line',
                        stack: 'Total',
                        data: [''],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '10',

                                    }
                                }
                            }
                        }
                    },
                    {
                        name: 'Proyectado',
                        type: 'line',
                        stack: 'Total',
                        data: [''],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '10',

                                    }
                                }
                            }
                        }
                    }

                ]
            };
            dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard.refreshAngular();
            setTimeout(function () {
                dashboard.charts.area.refresh();
            }, 2000);
        }
        if (callback)
            callback();
    };

    $scope.$watch('dashboard.poa', function (value) {
        if (dashboard.group_caracteristica == ENUM_2.Grupos.director_departamental || dashboard.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            dashboard.departamento = dashboard.usery.departamento.toString();
            dashboard.form.loadDropDown("departamento");
        }
    });
    //
    $scope.$watch('dashboard.departamento', function (value) {

        if (dashboard.searchFirstData) {
            if (value > 0) {
                CRUD_vw_dashboard_productosgrid.table.filters.columns[0].query.where = [
                    {
                        field: "departamento",
                        value: value
                    },
                    {
                        field: "poa",
                        value: dashboard.poabushin
                    }
                ];
            }

        }

    });

});
