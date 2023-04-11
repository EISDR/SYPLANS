app.controller("dashboard_departamento", function ($scope, $http, $compile) {
    dashboard_departamento = this;
    dashboard = undefined;
    dashboard_indicadores = undefined;
    dashboard_cofiguration = undefined;
    dashboard_presupuesto_barra = undefined;
    RUNCONTROLLER("dashboard_departamento", dashboard_departamento, $scope, $http, $compile);
    RUN_B("dashboard_departamento", dashboard_departamento, $scope, $http, $compile);

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

    var user = new SESSION().current();
    var animation = new ANIMATION();
    var paso2 = false;
    dashboard_departamento.currentYear = moment().year();
    dashboard_departamento.searchFirstData = true;
    dashboard_departamento.pei_id = user.pei_id;
    dashboard_departamento.group_caracteristica = user.groups[0].caracteristica;
    dashboard_departamento.activo_poa = user.estado ? user.estado : 0;

    dashboard_departamento.columnsstack_data = {
        legend: [],
        down: [],
        data: []
    };

    dashboard_departamento.searchData = function () {
        dashboard_departamento.getAll();
    };

    dashboard_departamento.triggers.table.after.control = function (data) {
        if (data === "poa") {
            if (paso2 == false && dashboard_departamento.group_caracteristica == ENUM_2.Grupos.director_departamental ||
                paso2 == false && dashboard_departamento.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                dashboard_departamento.poa = user.poa_id.toString();
                dashboard_departamento.form.loadDropDown('poa');
                paso2 = true;
                dashboard_departamento.searchFirstData = false;
            } else if (paso2 == false) {
                dashboard_departamento.poa = user.poa_id.toString();
                dashboard_departamento.form.loadDropDown('poa');
                paso2 = true;
                dashboard_departamento.form.options.poa.disabled = false;
                dashboard_departamento.refreshAngular();
                dashboard_departamento.searchFirstData = false;
            }
        }
    };

    dashboard_departamento.getAll = function () {
        dashboard_departamento.getData();
        dashboard_departamento.callDataBarra();
    };
    dashboard_departamento.getData = async function () {
        animation.loading(`#presupuestos_departamento`, "", ``, '30');
        var filters = false;
        dashboard_departamento.departamento_ids = [];
        BASEAPI.listp('departamento', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: [
                {
                    "field": "compania",
                    "operator": "=",
                    "value": user.compania_id
                },
            ]
        }).then(async function (rs_departamento) {
            dashboard_departamento.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_departamento.list_departamento = rs_departamento;
            if (dashboard_departamento.list_departamento.data) {
                for (var d = 0; d < dashboard_departamento.list_departamento.data.length; d++) {
                    dashboard_departamento.departamento_ids.push(dashboard_departamento.list_departamento.data[d].id);
                }
                dashboard_departamento.list_departamento_presupuesto = await BASEAPI.listp('vw_presupesto', {
                    limit: 0,
                    orderby: "id",
                    order: "asc",
                    where: [
                        {
                            "field": "poa",
                            "operator": "=",
                            "value": dashboard_departamento.poa
                        },
                        {
                            "field": "departamento",
                            "value": dashboard_departamento.departamento_ids
                        }
                    ]
                });
                if (dashboard_departamento.list_departamento_presupuesto.data) {
                    for (var d2 = 0; d2 < dashboard_departamento.list_departamento.data.length; d2++) {
                        filters = dashboard_departamento.list_departamento_presupuesto.data.filter(data => {
                            return data.departamento == dashboard_departamento.list_departamento.data[d2].id;
                        });
                        if (filters.length > 0) {
                            dashboard_departamento.list_departamento.data[d2].aprobado = LAN.money(filters[0].aprobado).format(true);
                            dashboard_departamento.list_departamento.data[d2].ejecutado = LAN.money(filters[0].ejecutado).format(true);
                            dashboard_departamento.list_departamento.data[d2].cuentasporpagar = LAN.money(filters[0].cuentasporpagar).format(true);
                            dashboard_departamento.list_departamento.data[d2].reprogramar = LAN.money(filters[0].reprogramar).format(true);
                            dashboard_departamento.list_departamento.data[d2].noejecutado = LAN.money(filters[0].noejecutado).format(true);
                        }
                    }
                }
            }
            dashboard_departamento.refreshAngular();
            animation.stoploading(`#presupuestos_departamento`);
        });

    };
    dashboard_departamento.callDataBarra = async function () {
        dashboard_departamento.listPre = [];
        dashboard_departamento.listDep = [];
        var whereCondition = [{}];
        if (dashboard_departamento.group_caracteristica == ENUM_2.Grupos.director_departamental && dashboard_departamento.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            whereCondition = [
                {
                    field: "compania",
                    value: user.compania_id
                },
                {
                    field: "departamento",
                    value: user.departamento
                },
                {
                    field: "poa",
                    value: dashboard_departamento.poa
                }
            ];
        } else {
            whereCondition = [
                {
                    field: "compania",
                    value: user.compania_id
                },
                {
                    field: "poa",
                    value: dashboard_departamento.poa
                }
            ];
        }

        dashboard_departamento.listPre = await BASEAPI.listp('vw_presupesto', {
            limit: 0,
            orderby: "departamento_nombre",
            order: "asc",
            where: whereCondition
        });

        if (dashboard_departamento.listPre.data.length > 0) {
            dashboard_departamento.listPre = dashboard_departamento.listPre.data;
            dashboard_departamento.columnsstack_data = {};
            dashboard_departamento.columnsstack_data = {
                legend: ['Disponible', 'Ejecutado', 'No Ejecutado'],
                down: dashboard_departamento.listDep,
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
            dashboard_departamento.actualizacion = moment().format('DD/MM/YYYY h:mm');

            dashboard_departamento.columnsstack_data.data[0].data = createArray(dashboard_departamento.listDep.length, '');
            dashboard_departamento.columnsstack_data.data[1].data = createArray(dashboard_departamento.listDep.length, '');
            dashboard_departamento.columnsstack_data.data[2].data = createArray(dashboard_departamento.listDep.length, '');

            for (var p = 0; p < dashboard_departamento.listPre.length; p++) {
                dashboard_departamento.listDep.push(dashboard_departamento.listPre[p].departamento_nombre);
                dashboard_departamento.columnsstack_data.data[0].data[p] = dashboard_departamento.listPre[p].noejecutado ? dashboard_departamento.listPre[p].noejecutado : '';
                dashboard_departamento.columnsstack_data.data[1].data[p] = dashboard_departamento.listPre[p].ejecutado ? dashboard_departamento.listPre[p].ejecutado : '';
                dashboard_departamento.columnsstack_data.data[2].data[p] = dashboard_departamento.listPre[p].reprogramar ? dashboard_departamento.listPre[p].reprogramar : '';
            }
            dashboard_departamento.refreshAngular();
            dashboard_departamento.charts.columnsstack.refresh();
        } else {
            dashboard_departamento.columnsstack_data = {
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
                        data: ['']
                    }]
            };
            dashboard_departamento.refreshAngular();
            dashboard_departamento.charts.columnsstack.refresh();
        }
    };
    $scope.$watch('dashboard_departamento.poa', function (value) {
        if (dashboard_departamento.searchFirstData) {
            dashboard_departamento.getAll();
        }

    });

    dashboard_departamento.openmodalactividades = function (value, depa) {
        dashboard_cofiguration = null;
        var title = "";
        var user = new SESSION().current();
        dashboard_departamento.poa = user.poa_id.toString();
        dashboard_departamento.departamento = depa;
        dashboard_departamento.Mactividades = value;
        switch (dashboard_departamento.Mactividades) {
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
            case "ejecutado":
                title = "ejecutadas";
                break;
            default:
                title = value;
        }
        switch (dashboard_departamento.Mactividades) {
            case "planificadas":
                dashboard_departamento.Mactividades = "planificados";
                break;
            case "en ejecución":
                dashboard_departamento.Mactividades = "en ejecución";
                break;
            case "ejecutado":
                dashboard_departamento.Mactividades = "completados";
                break;
            case "detenidas":
                dashboard_departamento.Mactividades = "detenidos";
                break;
            case "vencidas":
                dashboard_departamento.Mactividades = "vencidos";
                break;
            case "canceladas":
                dashboard_departamento.Mactividades = "cancelados";
                break;
            case "completadas":
                dashboard_departamento.Mactividades = "completados";
                break;
        }
        dashboard_departamento.modal.modalView("actividades_poa", {
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

});
