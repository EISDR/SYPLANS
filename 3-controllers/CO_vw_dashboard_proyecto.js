app.controller("vw_dashboard_proyecto", function ($scope, $http, $compile) {
    vw_dashboard_proyecto = this;
    RUNCONTROLLER("vw_dashboard_proyecto", vw_dashboard_proyecto, $scope, $http, $compile);
    RUN_B("vw_dashboard_proyecto", vw_dashboard_proyecto, $scope, $http, $compile);
    vw_dashboard_proyecto.isloading = true;

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

    vw_dashboard_proyecto.loadCharts = true;
    var user = new SESSION().current();
    vw_dashboard_proyecto.pei_id = user.pei_id;
    vw_dashboard_proyecto.compania_id = user.compania_id;
    vw_dashboard_proyecto.group_caracteristica = user.groups[0].caracteristica;
    vw_dashboard_proyecto.usery = user;
    vw_dashboard_proyecto.currentYear = moment().year();
    vw_dashboard_proyecto.session = user;
    vw_dashboard_proyecto.columnsstack_data = {
        legend: [],
        down: [],
        data: []
    };
    vw_dashboard_proyecto.pie_events = {
        'click': function (data) {
            console.log(data);
            dashboard_cofiguration = null;
            vw_dashboard_proyecto.openmodalproductos(data.name.toString().toLowerCase());
        }
    };
    vw_dashboard_proyecto.pie2_events = {
        'click': function (data) {
            console.log(data);
            dashboard_cofiguration = null;
            data.name = data.name == 'Sin información' ? ' ' : data.name.toString().toLowerCase();
            vw_dashboard_proyecto.openmodalactividades(data.name);
        }
    };
    vw_dashboard_proyecto.pie3_events = {
        'click': function (data) {
            dashboard_cofiguration = null;
            vw_dashboard_proyecto.openmodalasignaciones(data.name.toString().toLowerCase());
        }
    };
    vw_dashboard_proyecto.pie_data = [{value: 1, name: "N/A"}];
    vw_dashboard_proyecto.pie2_data = [{value: 1, name: "N/A"}];
    vw_dashboard_proyecto.pie3_data = [{value: 1, name: "N/A"}];
    vw_dashboard_proyecto.area_data = {
        legend: [],
        down: [],
        data: []
    };


    var animation = new ANIMATION();

    var paso2 = false;
    var paso = false;
    vw_dashboard_proyecto.searchFirstData = true;
    vw_dashboard_proyecto.poabushin = [];
    vw_dashboard_proyecto.searchData = function (chiki) {
        if (vw_dashboard_proyecto.institucion === "[NULL]") {
            vw_dashboard_proyecto.poabushin = [];
            for (var item of vw_dashboard_proyecto.form.options.institucion.data) {
                if (item.compania == vw_dashboard_proyecto.compania_id) {
                    if (item.poa)
                        vw_dashboard_proyecto.poabushin.push(item.poa);
                }
            }
        } else {
            vw_dashboard_proyecto.poabushin = vw_dashboard_proyecto.poa;
        }
        vw_dashboard_proyecto.getAll(chiki);
        CRUD_vw_dashboard_productosgrid.table.filters.columns[0].query.where = [
            {
                field: "departamento",
                value: vw_dashboard_proyecto.departamento
            },
            {
                field: "poa",
                value: vw_dashboard_proyecto.poabushin
            }
        ];
    };

    //Aquí se hace la validación de que si el usuario es director o analista departamental
    vw_dashboard_proyecto.alltoo = 0;
    vw_dashboard_proyecto.triggers.table.after.control = function (data) {
        if (data === "poa") {
            if (paso2 == false && vw_dashboard_proyecto.group_caracteristica == ENUM_2.Grupos.director_departamental || paso2 == false && vw_dashboard_proyecto.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                vw_dashboard_proyecto.poa = user.poa_id.toString();
                vw_dashboard_proyecto.poabushin = vw_dashboard_proyecto.poa;
                vw_dashboard_proyecto.form.loadDropDown('poa');
                paso2 = true;
            } else if (paso2 == false) {
                vw_dashboard_proyecto.poa = user.poa_id.toString();
                vw_dashboard_proyecto.poabushin = vw_dashboard_proyecto.poa;
                vw_dashboard_proyecto.form.loadDropDown('poa');
                paso2 = true;
                vw_dashboard_proyecto.form.options.poa.disabled = false;
                vw_dashboard_proyecto.refreshAngular();
            }
            vw_dashboard_proyecto.alltoo += 1;
        }
        if (data === "departamento") {
            if (paso == false && vw_dashboard_proyecto.group_caracteristica == ENUM_2.Grupos.director_departamental || paso == false && vw_dashboard_proyecto.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                vw_dashboard_proyecto.departamento = user.departamento.toString();
                vw_dashboard_proyecto.form.loadDropDown('departamento');
                paso = true;
            } else if (paso == false) {
                vw_dashboard_proyecto.departamento = "0";
                vw_dashboard_proyecto.form.loadDropDown('departamento');
                paso = true;
                vw_dashboard_proyecto.form.options.departamento.disabled = false;
                vw_dashboard_proyecto.refreshAngular();
                vw_dashboard_proyecto.searchFirstData = false;

            }
            vw_dashboard_proyecto.alltoo += 1;


        }
        if (vw_dashboard_proyecto.alltoo > 1) {
            vw_dashboard_proyecto.getAll();
        }

    };
    //Aquí acaba.


    vw_dashboard_proyecto.openmodalproductos = function (value) {
        dashboard_cofiguration = null;
        if (typeof proyecto_item != "not defined")
            if (typeof proyecto_item != "undefined")
                if (proyecto_item)
                    proyecto_item.paso = false;

        vw_dashboard_proyecto.Mproductos = value;
        vw_dashboard_proyecto.modal.modalView("proyecto_item", {
            width: 'modal-full',
            header: {
                title: vw_dashboard_proyecto.session.tipo_institucion === 1 ? "Proyectos/Productos Estratégicos " + vw_dashboard_proyecto.Mproductos : "Proyectos/Productos Estratégicos " + vw_dashboard_proyecto.Mproductos,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'proyecto_item',
            },
            event: {
                show: {
                    end: function (data) {
                        setTimeout(function () {
                            $('#proyecto_itemTable').css('display', 'inline-table')
                        }, 1000)
                    }
                }
            }
        });
    };
    vw_dashboard_proyecto.openmodalactividades = function (value) {
        dashboard_cofiguration = null;
        if (typeof proyecto_item_actividad != "not defined")
            if (typeof proyecto_item_actividad != "undefined")
                if (proyecto_item_actividad)
                    proyecto_item_actividad.paso = false;

        var title = "";
        vw_dashboard_proyecto.Mactividades = value;
        switch (vw_dashboard_proyecto.Mactividades) {
            case "planificados":
                title = "planificadas";
                break;
            case "pendientes":
                title = "pendientes";
                break;
            case "ejecucion":
                title = "En ejecución";
                break;
            case "vencidos":
                title = "vencidas";
                break;
            case "finalizados":
                title = "finalizadas";
                break;
            default:
                title = value;
        }
        switch (vw_dashboard_proyecto.Mactividades) {
            case "planificadas":
                vw_dashboard_proyecto.Mactividades = "planificados";
                break;
            case "pendientes":
                vw_dashboard_proyecto.Mactividades = "pendientes";
                break;
            case "ejecucion":
                vw_dashboard_proyecto.Mactividades = "ejecucion";
                break;
            case "detenidas":
                vw_dashboard_proyecto.Mactividades = "detenidos";
                break;
            case "vencidas":
                vw_dashboard_proyecto.Mactividades = "vencidos";
                break;
            case "finalizadas":
                vw_dashboard_proyecto.Mactividades = "finalizados";
                break;
        }
        vw_dashboard_proyecto.modal.modalView("proyecto_item_actividad", {
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
                sameController: 'proyecto_item_actividad',
            },
            event: {
                show: {
                    end: function (data) {
                        setTimeout(function () {
                            $('#actividades_poaTable').css('display', 'inline-table')
                        }, 1000)
                    }
                }
            }
        });
    };
    vw_dashboard_proyecto.openmodalasignaciones = function (value) {
        dashboard_cofiguration = null;
        var title = "";
        vw_dashboard_proyecto.Masignaciones = value;
        switch (vw_dashboard_proyecto.Masignaciones) {
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
        switch (vw_dashboard_proyecto.Masignaciones) {
            case "planificadas":
                vw_dashboard_proyecto.Masignaciones = "planificados";
                break;
            case "en ejecución":
                vw_dashboard_proyecto.Masignaciones = "en ejecución";
                break;
            case "detenidas":
                vw_dashboard_proyecto.Masignaciones = "detenidos";
                break;
            case "vencidas":
                vw_dashboard_proyecto.Masignaciones = "vencidos";
                break;
            case "canceladas":
                vw_dashboard_proyecto.Masignaciones = "cancelados";
                break;
            case "completadas":
                vw_dashboard_proyecto.Masignaciones = "completados";
                break;
        }
        vw_dashboard_proyecto.modal.modalView("vw_asignacion_especial_dashboard", {
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
                    end: function (data) {
                        setTimeout(function () {
                            $('#vw_asignacion_especial_dashboardTable').css('display', 'inline-table')
                        }, 1000)
                    }
                }
            }
        });
    };


    vw_dashboard_proyecto.getAll = function (chiki) {
        animation.loading(`.loadingbata`, "", ``, '200');
        if (vw_dashboard_proyecto.departamento !== "[NULL]" && vw_dashboard_proyecto.departamento !== undefined) {
            vw_dashboard_proyecto.getPresupuesto(function () {
                vw_dashboard_proyecto.getProductos(function () {
                    vw_dashboard_proyecto.getActividades(function () {
                        vw_dashboard_proyecto.getAsignaciones(function () {
                            vw_dashboard_proyecto.getIndicadores(function () {
                                vw_dashboard_proyecto.callDataBarra(function () {
                                    vw_dashboard_proyecto.callDataLinea(function () {
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
    vw_dashboard_proyecto.getPresupuesto = function (callback) {
        animation.loading(`#presupuestos`, "", ``, '30');
        vw_dashboard_proyecto.listpresupuestos = [];
        vw_dashboard_proyecto.presupuestos = {
            aprobado: 0,
            ejecutado: 0,
            cuentasporpagar: 0,
            reprogramar: 0,
            noejecutado: 0
        };

        if (vw_dashboard_proyecto.departamento == "0") {
            vw_dashboard_proyecto.condition = [{
                field: "pei",
                value: vw_dashboard_proyecto.session.pei_id,
            }];
        } else {
            vw_dashboard_proyecto.condition = [{
                field: "pei",
                value: vw_dashboard_proyecto.session.pei_id,
            }, {
                field: "departamento",
                value: vw_dashboard_proyecto.departamento
            }];
        }

        BASEAPI.listp('vw_proyecto_item_dashboard_presupuesto', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: vw_dashboard_proyecto.condition
        }).then(function (result) {
            vw_dashboard_proyecto.actualizacion = moment().format('DD/MM/YYYY h:mm');
            vw_dashboard_proyecto.listpresupuestos = result;
            vw_dashboard_proyecto.presupuestos.aprobado = 0;
            vw_dashboard_proyecto.presupuestos.ejecutado = 0;
            vw_dashboard_proyecto.presupuestos.cuentasporpagar = 0;
            vw_dashboard_proyecto.presupuestos.reprogramar = 0;
            vw_dashboard_proyecto.presupuestos.noejecutado = 0;
            if (vw_dashboard_proyecto.listpresupuestos.data) {
                for (var p = 0; p < vw_dashboard_proyecto.listpresupuestos.data.length; p++) {
                    vw_dashboard_proyecto.presupuestos.aprobado += vw_dashboard_proyecto.listpresupuestos.data[p].aprobado;
                    vw_dashboard_proyecto.presupuestos.ejecutado += vw_dashboard_proyecto.listpresupuestos.data[p].ejecutado;
                    vw_dashboard_proyecto.presupuestos.cuentasporpagar += vw_dashboard_proyecto.listpresupuestos.data[p].cuentasporpagar;
                    vw_dashboard_proyecto.presupuestos.reprogramar += vw_dashboard_proyecto.listpresupuestos.data[p].reprogramar;
                    vw_dashboard_proyecto.presupuestos.noejecutado += vw_dashboard_proyecto.listpresupuestos.data[p].noejecutado;
                }
                for (var i in vw_dashboard_proyecto.presupuestos) {
                    vw_dashboard_proyecto.presupuestos[i] = LAN.money(vw_dashboard_proyecto.presupuestos[i]).format(true);
                }
            }
            vw_dashboard_proyecto.refreshAngular();
            animation.stoploading(`#presupuestos`);

            if (callback)
                callback();
        });
    };
    vw_dashboard_proyecto.getIndicadores = function (callback) {
        if (vw_dashboard_proyecto.departamento == "0") {
            vw_dashboard_proyecto.condition = [{
                field: "pei",
                value: vw_dashboard_proyecto.session.pei_id,
            }];
        } else {
            vw_dashboard_proyecto.condition = [{
                field: "pei",
                value: vw_dashboard_proyecto.session.pei_id,
            }, {
                field: "departamento",
                value: vw_dashboard_proyecto.departamento
            }];
        }

        vw_dashboard_proyectosgrid.changeFilter(vw_dashboard_proyecto.condition, function () {
            if (callback)
                callback();
        });
    };
    vw_dashboard_proyecto.getProductos = function (callback) {
        animation.loading(`#productos`, "", ``, '30');
        vw_dashboard_proyecto.listproductos = [];
        vw_dashboard_proyecto.productos = {
            cantidad: 0,
            finalizados: 0,
            iniciados: 0,
            vencidos: 0,
            planificados: 0,
            proceso: 0,
        };
        if (vw_dashboard_proyecto.departamento == "0") {
            vw_dashboard_proyecto.condition = [{
                field: "id",
                value: vw_dashboard_proyecto.session.pei_id,
            }];
        } else {
            vw_dashboard_proyecto.condition = [{
                field: "id",
                value: vw_dashboard_proyecto.session.pei_id,
            }, {
                field: "departamento",
                value: vw_dashboard_proyecto.departamento
            }];
        }

        BASEAPI.listp('vw_proyecto_item_dashboard', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: vw_dashboard_proyecto.condition
        }).then(function (result) {
            vw_dashboard_proyecto.actualizacion = moment().format('DD/MM/YYYY h:mm');
            vw_dashboard_proyecto.listproductos = result;
            vw_dashboard_proyecto.productos.cantidad = 0;
            vw_dashboard_proyecto.productos.finalizados = 0;
            vw_dashboard_proyecto.productos.iniciados = 0;
            vw_dashboard_proyecto.productos.vencidos = 0;
            vw_dashboard_proyecto.productos.planificados = 0;
            vw_dashboard_proyecto.productos.proceso = 0;
            if (vw_dashboard_proyecto.listproductos.data) {
                if (vw_dashboard_proyecto.listproductos.data.length > 0) {
                    vw_dashboard_proyecto.pie_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificados'},
                        iniciados: {value: 0, name: 'Iniciados'},
                        proceso: {value: 0, name: 'En Proceso'},
                        vencidos: {value: 0, name: 'Vencidos'},
                        finalizados: {value: 0, name: 'Finalizados'}
                    };
                    for (var pr = 0; pr < vw_dashboard_proyecto.listproductos.data.length; pr++) {
                        vw_dashboard_proyecto.productos.cantidad += vw_dashboard_proyecto.listproductos.data[pr].cantidad;
                        vw_dashboard_proyecto.productos.finalizados += vw_dashboard_proyecto.listproductos.data[pr].finalizados;
                        vw_dashboard_proyecto.productos.iniciados += vw_dashboard_proyecto.listproductos.data[pr].iniciados;
                        vw_dashboard_proyecto.productos.vencidos += vw_dashboard_proyecto.listproductos.data[pr].vencidos;
                        vw_dashboard_proyecto.productos.planificados += vw_dashboard_proyecto.listproductos.data[pr].planificados;
                        vw_dashboard_proyecto.productos.proceso += vw_dashboard_proyecto.listproductos.data[pr].proceso;

                        legendsAct.planificados.value += vw_dashboard_proyecto.listproductos.data[pr].planificados;
                        legendsAct.iniciados.value += vw_dashboard_proyecto.listproductos.data[pr].iniciados;
                        legendsAct.vencidos.value += vw_dashboard_proyecto.listproductos.data[pr].vencidos;
                        legendsAct.finalizados.value += vw_dashboard_proyecto.listproductos.data[pr].finalizados;
                        legendsAct.proceso.value += vw_dashboard_proyecto.listproductos.data[pr].proceso;
                    }

                    for (var i in vw_dashboard_proyecto.productos) {
                        vw_dashboard_proyecto.productos[i] = parseInt(vw_dashboard_proyecto.productos[i]) < 10 ? ('0' + vw_dashboard_proyecto.productos[i]) : vw_dashboard_proyecto.productos[i];
                    }
                    vw_dashboard_proyecto.pie_data = [];
                    vw_dashboard_proyecto.pie_legend = ['Planificados', 'Iniciados', 'En Proceso', 'Vencidos', 'Finalizados'];
                    vw_dashboard_proyecto.pie_data.push(
                        {
                            value: legendsAct.planificados.value,
                            name: legendsAct.planificados.name,
                            label: {
                                show: legendsAct.planificados.value ? true : false,
                                color: "black",
                            },
                            cantidad: LAN.money(vw_dashboard_proyecto.productos.cantidad).value,
                            itemStyle: {
                                color: '#9b89d9',
                            }
                        },
                        {
                            value: legendsAct.iniciados.value,
                            name: legendsAct.iniciados.name,
                            label: {
                                show: legendsAct.iniciados.value ? true : false,
                                color: "black",
                            },
                            cantidad: LAN.money(vw_dashboard_proyecto.productos.cantidad).value,
                            itemStyle: {
                                color: '#a1de78',
                            }
                        },
                        {
                            value: legendsAct.proceso.value,
                            name: legendsAct.proceso.name,
                            label: {
                                show: legendsAct.proceso.value ? true : false,
                                color: "black",
                            },
                            cantidad: LAN.money(vw_dashboard_proyecto.productos.cantidad).value,
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
                            cantidad: LAN.money(vw_dashboard_proyecto.productos.cantidad).value,
                            itemStyle: {
                                color: '#ff8a8a',
                            }
                        },
                        {
                            value: legendsAct.finalizados.value,
                            name: legendsAct.finalizados.name,
                            label: {
                                show: legendsAct.finalizados.value ? true : false,
                                color: "black",
                            },
                            cantidad: LAN.money(vw_dashboard_proyecto.productos.cantidad).value,
                            itemStyle: {
                                color: '#737fff',
                            }
                        },
                    );
                } else {
                    vw_dashboard_proyecto.pie_legend = ['No existen datos para la selección'];
                    vw_dashboard_proyecto.pie_data = [{
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
                    vw_dashboard_proyecto.pie_menssageHover = "";
                }
            } else {
                vw_dashboard_proyecto.pie_legend = ['No existen datos para la selección'];
                vw_dashboard_proyecto.pie_data = [{
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
                vw_dashboard_proyecto.pie_menssageHover = "Hacer clic para ver detalle";
            }
            vw_dashboard_proyecto.refreshAngular();
            setTimeout(function () {
                vw_dashboard_proyecto.charts.pie.refresh();
            }, 2000);
            if (callback)
                callback();
            animation.stoploading(`#productos`);
        });
    };
    vw_dashboard_proyecto.getAsignaciones = function (callback) {
        animation.loading(`#asignaciones`, "", ``, '30');
        vw_dashboard_proyecto.listasignaciones = [];
        vw_dashboard_proyecto.asignaciones = {
            cantidad: 0,
            completados: 0,
            ejecucion: 0,
            vencidos: 0,
            planificados: 0,
            cancelados: 0
        };
        if (vw_dashboard_proyecto.departamento == "0") {
            vw_dashboard_proyecto.condition = [{
                field: "pei",
                value: vw_dashboard_proyecto.session.pei_id,
            }];
        } else {
            vw_dashboard_proyecto.condition = [
                {
                    field: "id",
                    value: vw_dashboard_proyecto.session.pei_id,
                },
                {
                    field: "departamento",
                    value: vw_dashboard_proyecto.session.pei_id,
                }
            ];
        }
        BASEAPI.listp('vw_dashboard_asignaciones', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: vw_dashboard_proyecto.condition
        }).then(function (result) {
            vw_dashboard_proyecto.actualizacion = moment().format('DD/MM/YYYY h:mm');
            vw_dashboard_proyecto.listasignaciones = result;
            if (vw_dashboard_proyecto.listasignaciones.data) {
                vw_dashboard_proyecto.asignaciones.cantidad = 0;
                vw_dashboard_proyecto.asignaciones.completados = 0;
                vw_dashboard_proyecto.asignaciones.ejecucion = 0;
                vw_dashboard_proyecto.asignaciones.vencidos = 0;
                vw_dashboard_proyecto.asignaciones.planificados = 0;
                vw_dashboard_proyecto.asignaciones.cancelados = 0;
                if (vw_dashboard_proyecto.listasignaciones.data.length > 0) {
                    vw_dashboard_proyecto.pie3_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificadas'},
                        ejecucion: {value: 0, name: 'En Ejecución'},
                        vencidos: {value: 0, name: 'Vencidas'},
                        cancelados: {value: 0, name: 'Canceladas'},
                        completados: {value: 0, name: 'Completadas'}
                    };


                    for (var a = 0; a < vw_dashboard_proyecto.listasignaciones.data.length; a++) {
                        vw_dashboard_proyecto.asignaciones.cantidad += vw_dashboard_proyecto.listasignaciones.data[a].cantidad;
                        vw_dashboard_proyecto.asignaciones.completados += vw_dashboard_proyecto.listasignaciones.data[a].completados;
                        vw_dashboard_proyecto.asignaciones.ejecucion += vw_dashboard_proyecto.listasignaciones.data[a].ejecucion;
                        vw_dashboard_proyecto.asignaciones.vencidos += vw_dashboard_proyecto.listasignaciones.data[a].vencidos;
                        vw_dashboard_proyecto.asignaciones.planificados += vw_dashboard_proyecto.listasignaciones.data[a].planificados;
                        vw_dashboard_proyecto.asignaciones.cancelados += vw_dashboard_proyecto.listasignaciones.data[a].cancelados;

                        legendsAct.planificados.value += vw_dashboard_proyecto.listasignaciones.data[a].planificados;
                        legendsAct.ejecucion.value += vw_dashboard_proyecto.listasignaciones.data[a].ejecucion;
                        legendsAct.vencidos.value += vw_dashboard_proyecto.listasignaciones.data[a].vencidos;
                        legendsAct.completados.value += vw_dashboard_proyecto.listasignaciones.data[a].completados;
                        legendsAct.cancelados.value += vw_dashboard_proyecto.listasignaciones.data[a].cancelados;
                    }

                    for (var i in vw_dashboard_proyecto.asignaciones) {
                        vw_dashboard_proyecto.asignaciones[i] = parseInt(vw_dashboard_proyecto.asignaciones[i]) < 10 ? ('0' + vw_dashboard_proyecto.asignaciones[i]) : vw_dashboard_proyecto.asignaciones[i];
                    }

                    vw_dashboard_proyecto.pie3_data = [];
                    vw_dashboard_proyecto.pie3_legend = ['Planificadas', 'En Ejecución', 'Vencidas', 'Completadas', 'Canceladas'];
                    vw_dashboard_proyecto.pie3_data.push(
                        {
                            value: legendsAct.planificados.value,
                            name: legendsAct.planificados.name,
                            label: {
                                show: legendsAct.planificados.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(vw_dashboard_proyecto.asignaciones.cantidad).value,
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
                            cantidad: LAN.money(vw_dashboard_proyecto.asignaciones.cantidad).value,
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
                            cantidad: LAN.money(vw_dashboard_proyecto.asignaciones.cantidad).value,
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
                            cantidad: LAN.money(vw_dashboard_proyecto.asignaciones.cantidad).value,
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
                    vw_dashboard_proyecto.pie3_legend = ['No existen datos para la selección'];
                    vw_dashboard_proyecto.pie3_data = [{
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
                    vw_dashboard_proyecto.pie3_menssageHover = "";
                }
            } else {
                vw_dashboard_proyecto.pie3_legend = ['No existen datos para la selección'];
                vw_dashboard_proyecto.pie3_data = [{
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
                vw_dashboard_proyecto.pie3_menssageHover = "";
            }
            vw_dashboard_proyecto.refreshAngular();
            setTimeout(function () {
                vw_dashboard_proyecto.charts.pie3.refresh();
            }, 2000);
            if (callback)
                callback();
            animation.stoploading(`#asignaciones`);
        });
    };
    vw_dashboard_proyecto.getActividades = function (callback) {
        animation.loading(`#actividades`, "", ``, '30');
        vw_dashboard_proyecto.listactividades = [];
        vw_dashboard_proyecto.actividades = {
            cantidad: 0,
            finalizados: 0,
            iniciados: 0,
            vencidos: 0,
            planificados: 0,
            proceso: 0,
            cancelados: 0
        };
        if (vw_dashboard_proyecto.departamento == "0") {
            vw_dashboard_proyecto.condition = [{
                field: "id",
                value: vw_dashboard_proyecto.session.pei_id,
            }];
        } else {
            vw_dashboard_proyecto.condition = [{
                field: "id",
                value: vw_dashboard_proyecto.session.pei_id,
            }, {
                field: "departamento",
                value: vw_dashboard_proyecto.departamento
            }];
        }
        BASEAPI.listp('vw_proyecto_item_dashboard_actividad', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: vw_dashboard_proyecto.condition
        }).then(function (result) {
            vw_dashboard_proyecto.actualizacion = moment().format('DD/MM/YYYY h:mm');
            vw_dashboard_proyecto.listactividades = result;
            if (vw_dashboard_proyecto.listactividades.data) {
                vw_dashboard_proyecto.actividades.cantidad = 0;
                vw_dashboard_proyecto.actividades.finalizados = 0;
                vw_dashboard_proyecto.actividades.pendientes = 0;
                vw_dashboard_proyecto.actividades.vencidos = 0;
                vw_dashboard_proyecto.actividades.planificados = 0;
                vw_dashboard_proyecto.actividades.ejecucion = 0;
                vw_dashboard_proyecto.actividades.cancelados = 0;
                if (vw_dashboard_proyecto.listactividades.data.length > 0) {
                    vw_dashboard_proyecto.pie2_menssageHover = "Hacer clic para ver detalle";
                    var legendsAct = {
                        planificados: {value: 0, name: 'Planificadas'},
                        cancelados: {value: 0, name: 'Canceladas'},
                        ejecucion: {value: 0, name: 'En Ejecución'},
                        pendientes: {value: 0, name: 'Pendientes a Ejecución'},
                        vencidos: {value: 0, name: 'Vencidas'},
                        finalizados: {value: 0, name: 'Finalizadas'}
                    };
                    for (var ac = 0; ac < vw_dashboard_proyecto.listactividades.data.length; ac++) {
                        vw_dashboard_proyecto.actividades.cantidad += vw_dashboard_proyecto.listactividades.data[ac].cantidad;
                        vw_dashboard_proyecto.actividades.finalizados += vw_dashboard_proyecto.listactividades.data[ac].finalizados;
                        vw_dashboard_proyecto.actividades.pendientes += vw_dashboard_proyecto.listactividades.data[ac].pendientes;
                        vw_dashboard_proyecto.actividades.vencidos += vw_dashboard_proyecto.listactividades.data[ac].vencidos;
                        vw_dashboard_proyecto.actividades.planificados += vw_dashboard_proyecto.listactividades.data[ac].planificados;
                        vw_dashboard_proyecto.actividades.cancelados += vw_dashboard_proyecto.listactividades.data[ac].cancelados;
                        vw_dashboard_proyecto.actividades.ejecucion += vw_dashboard_proyecto.listactividades.data[ac].ejecucion;

                        legendsAct.planificados.value += vw_dashboard_proyecto.listactividades.data[ac].planificados;
                        legendsAct.cancelados.value += vw_dashboard_proyecto.listactividades.data[ac].cancelados;
                        legendsAct.pendientes.value += vw_dashboard_proyecto.listactividades.data[ac].pendientes;
                        legendsAct.vencidos.value += vw_dashboard_proyecto.listactividades.data[ac].vencidos;
                        legendsAct.finalizados.value += vw_dashboard_proyecto.listactividades.data[ac].finalizados;
                        legendsAct.ejecucion.value += vw_dashboard_proyecto.listactividades.data[ac].ejecucion;
                    }

                    for (var i in vw_dashboard_proyecto.actividades) {
                        vw_dashboard_proyecto.actividades[i] = parseInt(vw_dashboard_proyecto.actividades[i]) < 10 ? ('0' + vw_dashboard_proyecto.actividades[i]) : vw_dashboard_proyecto.actividades[i];
                    }
                    vw_dashboard_proyecto.pie2_data = [];

                    vw_dashboard_proyecto.pie2_legend = ['Planificadas', 'Pendientes a Ejecución', 'En Ejecución', 'Vencidas', 'Finalizadas', 'Canceladas'];

                    vw_dashboard_proyecto.pie2_data.push(
                        {
                            value: legendsAct.planificados.value,
                            name: legendsAct.planificados.name,
                            label: {
                                show: legendsAct.planificados.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(vw_dashboard_proyecto.actividades.cantidad).value,
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
                            cantidad: LAN.money(vw_dashboard_proyecto.actividades.cantidad).value,
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
                            cantidad: LAN.money(vw_dashboard_proyecto.actividades.cantidad).value,
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
                            cantidad: LAN.money(vw_dashboard_proyecto.actividades.cantidad).value,
                            itemStyle: {
                                color: '#ff8a8a',
                            }
                        },
                        {
                            value: legendsAct.finalizados.value,
                            name: legendsAct.finalizados.name,
                            label: {
                                show: legendsAct.finalizados.value ? true : false,
                                color: "black"
                            },
                            cantidad: LAN.money(vw_dashboard_proyecto.actividades.cantidad).value,
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
                            cantidad: LAN.money(vw_dashboard_proyecto.actividades.cantidad).value,
                            itemStyle: {
                                color: '#8e8f91',
                            }
                        },
                    );
                } else {
                    vw_dashboard_proyecto.pie2_legend = ['No existen datos para la selección'];
                    vw_dashboard_proyecto.pie2_data = [{
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
                    vw_dashboard_proyecto.pie2_menssageHover = "";
                }
            } else {
                vw_dashboard_proyecto.pie2_legend = ['No existen datos para la selección'];
                vw_dashboard_proyecto.pie2_data = [{
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
                vw_dashboard_proyecto.pie2_menssageHover = "";
            }
            vw_dashboard_proyecto.refreshAngular();
            setTimeout(function () {
                vw_dashboard_proyecto.charts.pie2.refresh();
            }, 2000);
            if (callback)
                callback();
            animation.stoploading(`#actividades`);
        });
    };


    vw_dashboard_proyecto.callDataBarra = async function (callback) {
        vw_dashboard_proyecto.listPre = [];
        vw_dashboard_proyecto.listDep = [];
        if (vw_dashboard_proyecto.departamento == "0") {
            vw_dashboard_proyecto.condition = [{
                field: "pei",
                value: vw_dashboard_proyecto.session.pei_id,
            }];
        } else {
            vw_dashboard_proyecto.condition = [{
                field: "pei",
                value: vw_dashboard_proyecto.session.pei_id,
            }, {
                field: "departamento",
                value: vw_dashboard_proyecto.departamento
            }];
        }

        vw_dashboard_proyecto.listPre = await BASEAPI.listp('vw_proyecto_item_dashboard_presupuesto', {
            limit: 0,
            orderby: "proyecto_item_nombre",
            order: "asc",
            where: vw_dashboard_proyecto.condition
        });

        if (!vw_dashboard_proyecto.listPre.data)
            vw_dashboard_proyecto.listPre.data = [];
        if (vw_dashboard_proyecto.listPre.data.length > 0) {
            vw_dashboard_proyecto.listPre = vw_dashboard_proyecto.listPre.data;
            vw_dashboard_proyecto.columnsstack_data = {};
            vw_dashboard_proyecto.columnsstack_data = {
                legend: ['Disponible', 'Ejecutado', 'No Ejecutado'],
                down: vw_dashboard_proyecto.listDep,
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
            vw_dashboard_proyecto.actualizacion = moment().format('DD/MM/YYYY h:mm');

            vw_dashboard_proyecto.listDep = [];
            vw_dashboard_proyecto.columnsstack_data.data[0].data = createArray(vw_dashboard_proyecto.listDep.length, '');
            vw_dashboard_proyecto.columnsstack_data.data[1].data = createArray(vw_dashboard_proyecto.listDep.length, '');
            vw_dashboard_proyecto.columnsstack_data.data[2].data = createArray(vw_dashboard_proyecto.listDep.length, '');

            for (var p = 0; p < vw_dashboard_proyecto.listPre.length; p++) {
                vw_dashboard_proyecto.listDep.push(vw_dashboard_proyecto.listPre[p].proyecto_item_nombre);
                vw_dashboard_proyecto.columnsstack_data.data[0].data[p] = vw_dashboard_proyecto.listPre[p].noejecutado ? vw_dashboard_proyecto.listPre[p].noejecutado : '';
                vw_dashboard_proyecto.columnsstack_data.data[1].data[p] = vw_dashboard_proyecto.listPre[p].ejecutado ? vw_dashboard_proyecto.listPre[p].ejecutado : '';
                vw_dashboard_proyecto.columnsstack_data.data[2].data[p] = vw_dashboard_proyecto.listPre[p].reprogramar ? vw_dashboard_proyecto.listPre[p].reprogramar : '';
            }
            if (vw_dashboard_proyecto.listPre.length < 3) {
                vw_dashboard_proyecto.columnsstack_data.data[0].data[p] = '';
                vw_dashboard_proyecto.columnsstack_data.data[1].data[p] = '';
                vw_dashboard_proyecto.columnsstack_data.data[2].data[p] = '';
            }
            vw_dashboard_proyecto.refreshAngular();
            vw_dashboard_proyecto.columnsstack_data.down = vw_dashboard_proyecto.listDep;
            setTimeout(function () {
                vw_dashboard_proyecto.charts.columnsstack.refresh();
            }, 2000);

        } else {
            vw_dashboard_proyecto.listDep = [];
            vw_dashboard_proyecto.columnsstack_data = {
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
                        stack: 'Total',
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
                        stack: 'Total',
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
            vw_dashboard_proyecto.refreshAngular();
            setTimeout(function () {
                vw_dashboard_proyecto.charts.columnsstack.refresh();
            }, 2000);
        }
        vw_dashboard_proyecto.isloading = false;
        if (callback)
            callback();
        animation.stoploading(`.loadingbata`, "", ``, '30');
    };
    vw_dashboard_proyecto.callDataLinea = async function (callback) {
        var vw_dashboard_proyecto_listInd = [];
        var vw_dashboard_proyecto_listIndN = [];
        if (vw_dashboard_proyecto.departamento == "0") {
            vw_dashboard_proyecto.whereCondition = [
                {
                    field: "pei",
                    value: vw_dashboard_proyecto.session.pei_id,
                }
            ];
        } else {
            vw_dashboard_proyecto.whereCondition = [
                {
                    field: "pei",
                    value: vw_dashboard_proyecto.session.pei_id,
                },
                {
                    field: "departamento",
                    value: vw_dashboard_proyecto.departamento
                }
            ];
        }

        vw_dashboard_proyecto_listInd = await BASEAPI.listp('vw_dashboard_proyectosgrid', {
            limit: 0,
            orderby: "indicador",
            order: "asc",
            where: vw_dashboard_proyecto.whereCondition
        });
        if (vw_dashboard_proyecto_listInd.data) {
            if (vw_dashboard_proyecto_listInd.data.length > 0) {
                vw_dashboard_proyecto_listInd = vw_dashboard_proyecto_listInd.data;
                vw_dashboard_proyecto.area_data = {};
                vw_dashboard_proyecto.area_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: vw_dashboard_proyecto_listIndN,
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
                                            fontSize: '12',
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
                                            fontSize: '12',

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
                                            fontSize: '12',

                                        }
                                    }, color: '#a1de78',
                                }
                            }
                        }

                    ]
                };
                vw_dashboard_proyecto.actualizacion = moment().format('DD/MM/YYYY h:mm');

                vw_dashboard_proyecto.area_data.data[0].data = createArray(vw_dashboard_proyecto_listIndN.length, '');
                vw_dashboard_proyecto.area_data.data[1].data = createArray(vw_dashboard_proyecto_listIndN.length, '');
                vw_dashboard_proyecto.area_data.data[2].data = createArray(vw_dashboard_proyecto_listIndN.length, '');

                for (var p = 0; p < vw_dashboard_proyecto_listInd.length; p++) {
                    vw_dashboard_proyecto_listIndN.push(vw_dashboard_proyecto_listInd[p].indicador);
                    vw_dashboard_proyecto.area_data.data[1].data[p] = vw_dashboard_proyecto_listInd[p].alcanzado ? vw_dashboard_proyecto_listInd[p].alcanzado : '';
                    vw_dashboard_proyecto.area_data.data[2].data[p] = vw_dashboard_proyecto_listInd[p].acumulado ? vw_dashboard_proyecto_listInd[p].acumulado : '';
                    vw_dashboard_proyecto.area_data.data[0].data[p] = vw_dashboard_proyecto_listInd[p].alcanzado - vw_dashboard_proyecto_listInd[p].acumulado ? parseFloat(vw_dashboard_proyecto_listInd[p].alcanzado - vw_dashboard_proyecto_listInd[p].acumulado).toFixed(2) : '';

                }
                vw_dashboard_proyecto.refreshAngular();
                setTimeout(function () {
                    vw_dashboard_proyecto.charts.area.refresh();
                }, 2000);
            } else {
                vw_dashboard_proyecto.area_data = {};
                vw_dashboard_proyecto.area_data = {
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
                vw_dashboard_proyecto.actualizacion = moment().format('DD/MM/YYYY h:mm');
                vw_dashboard_proyecto.refreshAngular();
                setTimeout(function () {
                    vw_dashboard_proyecto.charts.area.refresh();
                }, 2000);
            }
        } else {
            vw_dashboard_proyecto.area_data = {};
            vw_dashboard_proyecto.area_data = {
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
            vw_dashboard_proyecto.actualizacion = moment().format('DD/MM/YYYY h:mm');
            vw_dashboard_proyecto.refreshAngular();
            setTimeout(function () {
                vw_dashboard_proyecto.charts.area.refresh();
            }, 2000);
        }
        if (callback)
            callback();
    };

    $scope.$watch('vw_dashboard_proyecto.poa', function (value) {
        if (vw_dashboard_proyecto.group_caracteristica == ENUM_2.Grupos.director_departamental || vw_dashboard_proyecto.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            vw_dashboard_proyecto.departamento = vw_dashboard_proyecto.usery.departamento.toString();
            vw_dashboard_proyecto.form.loadDropDown("departamento");
        }
    });
    //
    $scope.$watch('vw_dashboard_proyecto.departamento', function (value) {

        if (vw_dashboard_proyecto.searchFirstData) {
            if (value > 0) {
                CRUD_vw_dashboard_productosgrid.table.filters.columns[0].query.where = [
                    {
                        field: "departamento",
                        value: value
                    },
                    {
                        field: "poa",
                        value: vw_dashboard_proyecto.poabushin
                    }
                ];
            }

        }

    });

});
