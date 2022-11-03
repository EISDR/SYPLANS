app.controller("vw_desempeno", function ($scope, $http, $compile) {
    vw_desempeno = this;
    vw_desempeno.session = new SESSION().current();
    //vw_desempeno.fixFilters = [];
    //vw_desempeno.singular = "singular";
    //vw_desempeno.plural = "plural";
    //vw_desempeno.headertitle = "Hola Title";
    //vw_desempeno.destroyForm = false;
    //vw_desempeno.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_desempeno", vw_desempeno, $scope, $http, $compile);
    RUN_B("vw_desempeno", vw_desempeno, $scope, $http, $compile);
    vw_desempeno.desempeno_ap_data = {};
    vw_desempeno.monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    vw_desempeno.bar = false;
    vw_desempeno.pies = false;
    if (window.location.href.indexOf("bar") !== -1) {
        vw_desempeno.bar = true;
    } else {
        vw_desempeno.pies = true;
    }
    vw_desempeno.loadAll = async function () {
        var animation = new ANIMATION();
        animation.loading(`#gracontent`, "", ``, '200');
        var generalis = {
            productos: {
                total: 0,
                completados: 0,
                pendientes: 0,
                pendientes2: 0,
                porcentaje: 0,
                nocompletadas: 0,
            },
            actividades: {
                total: 0,
                completados: 0,
                pendientes: 0,
                pendientes2: 0,
                porcentaje: 0,
                nocompletadas: 0,
            }
        };
        var result = await BASEAPI.firstp('vw_dashboard_meses', {where: [{value: vw_desempeno.poadd}]});
        var data = [];
        if (result !== undefined) {
            vw_desempeno.othercondition = result.periodo;
            var incrementar = (12 / result.periodo)
            if (result) {
                for (i = 1; i <= 12; i += incrementar) {
                    if (incrementar > 1) {
                        data.push({
                            id: `${i}`,
                            periodo: `${(i - 1) + incrementar}`,
                            name: `${vw_desempeno.monthNames[i - 1]} - ${vw_desempeno.monthNames[(i - 1) + (incrementar - 1)]}`
                        });
                    } else {
                        data.push({
                            id: `${i}`,
                            periodo: `${(i - 1) + (incrementar - 1)}`,
                            name: `${vw_desempeno.monthNames[i - 1]}`
                        });
                    }
                }
            }

            var wheregeneral = {
                limit: 0, where: vw_desempeno.institucion !== '[NULL]' ?
                    [{
                        field: "compania",
                        value: vw_desempeno.institucion
                    }]
                    :
                    [{
                        field: "compania_base",
                        value: vw_desempeno.companiasel
                    }], orderby: '$ compania', order: 'asc'
            };
            if (vw_desempeno.departamento !== '[NULL]') {
                wheregeneral.where.push({
                    field: "departamento",
                    value: vw_desempeno.departamento
                });
            }
            if (vw_desempeno.poadd !== '[NULL]') {
                wheregeneral.where.push({
                    field: "poa",
                    value: vw_desempeno.poadd
                });
            }
            if (vw_desempeno.periodos.length > 0 && vw_desempeno.periodos !== "[NULL]") {
                wheregeneral.where.push({
                    open: "(",
                    field: "mes_i",
                    value: vw_desempeno.periodos,
                    connector: "OR"
                });
                wheregeneral.where.push({
                    close: ")",
                    field: "mes_f",
                    value: vw_desempeno.periodos
                });
            }
            var actividades = await BASEAPI.listp('vw_desempeno_actividad', wheregeneral);
            actividades = actividades.data;
            var productos = await BASEAPI.listp('vw_desempeno_producto', wheregeneral);
            productos = productos.data;

            for (var term of actividades) {
                generalis.actividades.total += parseInt(term.count);
                if (term.completa === 1) {
                    generalis.actividades.completados += parseInt(term.count);
                } else if (term.sub.toLowerCase().indexOf('ejecución') !== -1 || term.detenido === 1) {
                    generalis.actividades.nocompletadas += parseInt(term.count);
                } else if (term.sub.toLowerCase().indexOf('vencid') !== -1 || term.detenido === 1) {
                    generalis.actividades.nocompletadas += parseInt(term.count);
                } else if (term.sub.toLowerCase().indexOf('planifica') !== -1) {
                    generalis.actividades.pendientes += parseInt(term.count);
                }
                generalis.actividades.porcentaje = (generalis.actividades.completados * 100) / generalis.actividades.total;
            }

            for (var term of productos) {
                generalis.productos.total += parseInt(term.count);
                if (term.completa === 1) {
                    generalis.productos.completados += parseInt(term.count);
                } else if (term.sub.toLowerCase().indexOf('ejecución') !== -1 || term.detenido === 1) {
                    generalis.productos.nocompletadas += parseInt(term.count);
                } else if (term.sub.toLowerCase().indexOf('vencid') !== -1 || term.detenido === 1) {
                    generalis.productos.nocompletadas += parseInt(term.count);
                } else if (term.sub.toLowerCase().indexOf('planifica') !== -1) {
                    generalis.productos.pendientes += parseInt(term.count);
                }
                generalis.productos.porcentaje = (generalis.productos.completados * 100) / generalis.productos.total;
            }


            vw_desempeno.form.options.periodos.data = data;

            vw_desempeno.desempeno_ap_data = {};
            vw_desempeno.desempeno_ap_data = {
                legend: ['Suma de Total', 'Total Completadas'],
                down: [LAN.money(generalis.actividades.porcentaje).value + '%\n Actividades', LAN.money(generalis.productos.porcentaje).value + '%\n Productos'],
                data: [
                    {
                        name: 'Suma de Total',
                        type: 'bar',
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
                        data: [generalis.actividades.total, generalis.productos.total]
                    },
                    {
                        name: 'Total Completadas',
                        type: 'bar',
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
                        data: [generalis.actividades.completados, generalis.productos.completados]
                    }
                ]
            };
            console.log(generalis);
            if (data.length > 0) {
                vw_desempeno.refreshAngular();
                vw_desempeno.form.loadDropDown('periodos');
            }

            vw_desempeno.desempeno_a_data = [];
            vw_desempeno.desempeno_a_legend = ['Completadas', 'No Completadas', 'Pendientes'];
            vw_desempeno.desempeno_a_data.push(
                {
                    value: generalis.actividades.completados,
                    name: "Completadas",
                    label: {
                        show: generalis.actividades.completados ? true : false,
                        color: 'black',
                    },
                    itemStyle: {
                        color: '#a1de78',
                    }
                },
                {
                    value: generalis.actividades.nocompletadas,
                    name: "No Completadas",
                    label: {
                        show: generalis.actividades.nocompletadas ? true : false,
                        color: "black"
                    },
                    itemStyle: {
                        color: '#ff8a8a',
                    }
                },
                {
                    value: generalis.actividades.pendientes,
                    name: "Pendientes",
                    label: {
                        show: generalis.actividades.pendientes ? true : false,
                        color: "black"
                    },
                    itemStyle: {
                        color: '#9b89d9',
                    }
                }
            );

            vw_desempeno.desempeno_p_data = [];
            vw_desempeno.desempeno_p_legend = ['Completados', 'No Completadas', 'Pendientes'];
            vw_desempeno.desempeno_p_data.push(
                {
                    value: generalis.productos.completados,
                    name: "Completados",
                    label: {
                        show: generalis.productos.completados ? true : false,
                        color: "black"
                    },
                    itemStyle: {
                        color: '#a1de78',
                    }
                },
                {
                    value: generalis.productos.nocompletadas,
                    name: "No Completadas",
                    label: {
                        show: generalis.productos.nocompletadas ? true : false,
                        color: "black"
                    },
                    itemStyle: {
                        color: '#ff8a8a',
                    }
                },
                {
                    value: generalis.productos.pendientes,
                    name: "Pendientes",
                    label: {
                        show: generalis.productos.pendientes ? true : false,
                        color: "black"
                    },
                    itemStyle: {
                        color: '#9b89d9',
                    }
                }
            );

            vw_desempeno.charts.desempeno_ap.refresh();
            vw_desempeno.charts.desempeno_a.refresh();
            vw_desempeno.charts.desempeno_p.refresh();
            setTimeout(function () {
                resizeCharts();
            }, 1000);
        } else {
            vw_desempeno.periodos = "[NULL]";
            vw_desempeno.form.options.periodos.data = [];
            vw_desempeno.refreshAngular();
            vw_desempeno.form.loadDropDown('periodos');
        }
        animation.stoploading(`#gracontent`);
    };

    vw_desempeno.afterPoa = async function () {
        vw_desempeno.loadAll();
    };


});
