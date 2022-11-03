app.controller("dashboard_cofiguration", function ($scope, $http, $compile) {
    dashboard_cofiguration = this;
    dashboard_cofiguration.tipodelinea = "bar";
    var user = new SESSION().current();
    dashboard_cofiguration.session = user;
    RUNCONTROLLER("dashboard_cofiguration", dashboard_cofiguration, $scope, $http, $compile);
    RUN_B("dashboard_cofiguration", dashboard_cofiguration, $scope, $http, $compile);
    dashboard_cofiguration.compania = user.compania_id;
    dashboard_cofiguration.pei_id = user.pei_id;

    BASEAPI.firstp('departamento', {
        where: [{
            field: "id",
            value: user.departamento
        }]
    }).then(function (result) {
        dashboard_cofiguration.departamento_mostrar = result.nombre;
        dashboard_cofiguration.departamento_mostrar_id = result.id;
    });


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


    var monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    $scope.$watch('dashboard_cofiguration.vw_dashboard_poas', function (value) {
        if (value === '[NULL]')
            return;
        BASEAPI.firstp('vw_dashboard_meses', {where: [{value: value}]}).then(function (result) {
            var data = [];
            if (result !== undefined) {
                dashboard_cofiguration.othercondition = result.periodo;
                var incrementar = (12 / result.periodo)
                if (result) {
                    for (i = 1; i <= 12; i += incrementar) {
                        if (incrementar > 1) {
                            data.push({
                                id: `${i - 1}`,
                                periodo: `${(i - 1) + incrementar}`,
                                name: `${monthNames[i - 1]} - ${monthNames[(i - 1) + (incrementar - 1)]}`
                            });
                        } else {
                            data.push({
                                id: `${i - 1}`,
                                periodo: `${(i - 1) + (incrementar - 1)}`,
                                name: `${monthNames[i - 1]}`
                            });
                        }
                    }
                }

                dashboard_cofiguration.form.options.periodos.data = data;
                if (data.length > 0) {
                    dashboard_cofiguration.refreshAngular();
                    dashboard_cofiguration.form.loadDropDown('periodos');
                }
            } else {
                dashboard_cofiguration.periodos = "[NULL]";
                dashboard_cofiguration.form.options.periodos.data = [];
                dashboard_cofiguration.refreshAngular();
                dashboard_cofiguration.form.loadDropDown('periodos');
            }
        });

        dashboard_cofiguration.template_departamento = [
            {
                open: "(",
                field: "departamento",
                value: '',
                close: ")"
            }
        ];
        if (dashboard_cofiguration.form.selectedMultiple('periodos') != null) {
            dashboard_cofiguration.base = [
                {
                    open: "(",
                    field: 'poa',
                    value: dashboard_cofiguration.vw_dashboard_poas
                },
                {
                    field: 'departamento',
                    value: user.departamento,
                    close: ")"
                }
            ];
            dashboard_cofiguration.template = [
                {
                    open: "(",
                    field: `month_inicio`,
                    operator: 'BETWEEN',
                    connector: 'OR',
                    value: '',
                },
                {
                    field: `month_fin`,
                    operator: 'BETWEEN',
                    value: '',
                    close: ")"
                }
            ];
            dashboard_cofiguration.global_template = [];
            dashboard_cofiguration.global_templatewai = [];


            // if (dashboard_cofiguration.get_data_depto.data.length > 0) {
            //     dashboard_cofiguration.get_data_depto.data.forEach(item => {
            //         var where = DSON.OSO(dashboard_cofiguration.template_departamento);
            //         where[0].value = item.departamento;
            //         where[0].connector = "OR";
            //
            //         dashboard_cofiguration.base.push(where[0]);
            //         // console.log(item.departamento);
            //     });
            //     dashboard_cofiguration.base[dashboard_cofiguration.base.length - 1].connector = undefined;
            // }


            // var where = DSON.OSO(dashboard_cofiguration.template_departamento);
            // where[0].value = new SESSION().current().departamento;
            // where[0].connector = "OR";
            //
            // dashboard_cofiguration.base.push(where[0]);
            // dashboard_cofiguration.base[dashboard_cofiguration.base.length - 1].connector = undefined;


            if (dashboard_cofiguration.form.selectedMultiple('periodos') !== null) {
                for (item of dashboard_cofiguration.form.selectedMultiple('periodos')) {
                    var where = DSON.OSO(dashboard_cofiguration.template);
                    where[0].value = `$${parseInt(item.id) + 1} and ${parseInt(item.periodo)}`;
                    where[1].value = `$${parseInt(item.id) + 1} and ${parseInt(item.periodo)}`;
                    where[1].connector = "OR";

                    dashboard_cofiguration.base.push(where[0]);
                    dashboard_cofiguration.base.push(where[1]);
                }
                dashboard_cofiguration.base[2].open = "((";
                dashboard_cofiguration.base[dashboard_cofiguration.base.length - 1].connector = undefined;
                dashboard_cofiguration.base[dashboard_cofiguration.base.length - 1].close = "))";
                dashboard_cofiguration.global_template = dashboard_cofiguration.base.filter(d => {
                    return d.field != "poa" && d.field != "departamento";
                });
            }

            console.log(dashboard_cofiguration.base);
            // console.log(dashboard_cofiguration.base);
            // console.log(dashboard_cofiguration.global_template, "este es el template global");
            //por cada seleccion
            // {
            //template[0].field = "id de la iteracion"
            //template[1].field = "periodo de la iteracion"
            //si no es el ultimo
            //template[1].connector = 'OR'
            // base.push(template)
            // }
            //vw_dashboard_productos2.changeFilter(base);


            vw_dashboard_productos2.changeFilter(dashboard_cofiguration.base);
        } else {
            vw_dashboard_productos2.changeFilter([{
                field: "poa",
                value: -1
            }]);
        }
        dashboard_cofiguration.changePie();
        dashboard_cofiguration.changeBar();
        dashboard_cofiguration.changeLine();
    });
    $scope.$watchCollection('dashboard_cofiguration.periodos', async function (value) {
        // console.log('entro');
        // dashboard_cofiguration.get_data_depto = await BASEAPI.listp('usuario_departamento', {
        //     where: [{
        //         field: "usuario",
        //         value: user.usuario_id
        //     }]
        // });
        dashboard_cofiguration.template_departamento = [
            {
                open: "(",
                field: "departamento",
                value: '',
                close: ")"
            }
        ];
        if (dashboard_cofiguration.form.selectedMultiple('periodos') != null) {
            dashboard_cofiguration.base = [
                {
                    open: "(",
                    field: 'poa',
                    value: dashboard_cofiguration.vw_dashboard_poas
                },
                {
                    field: 'departamento',
                    value: user.departamento,
                    close: ")"
                }
            ];
            dashboard_cofiguration.template = [
                {
                    open: "(",
                    field: `month_inicio`,
                    operator: 'BETWEEN',
                    connector: 'OR',
                    value: '',
                },
                {
                    field: `month_fin`,
                    operator: 'BETWEEN',
                    value: '',
                    close: ")"
                }
            ];
            dashboard_cofiguration.global_template = [];
            dashboard_cofiguration.global_templatewai = [];


            // if (dashboard_cofiguration.get_data_depto.data.length > 0) {
            //     dashboard_cofiguration.get_data_depto.data.forEach(item => {
            //         var where = DSON.OSO(dashboard_cofiguration.template_departamento);
            //         where[0].value = item.departamento;
            //         where[0].connector = "OR";
            //
            //         dashboard_cofiguration.base.push(where[0]);
            //         // console.log(item.departamento);
            //     });
            //     dashboard_cofiguration.base[dashboard_cofiguration.base.length - 1].connector = undefined;
            // }


            // var where = DSON.OSO(dashboard_cofiguration.template_departamento);
            // where[0].value = new SESSION().current().departamento;
            // where[0].connector = "OR";
            //
            // dashboard_cofiguration.base.push(where[0]);
            // dashboard_cofiguration.base[dashboard_cofiguration.base.length - 1].connector = undefined;


            if (dashboard_cofiguration.form.selectedMultiple('periodos') !== null) {
                for (item of dashboard_cofiguration.form.selectedMultiple('periodos')) {
                    var where = DSON.OSO(dashboard_cofiguration.template);
                    where[0].value = `$${parseInt(item.id) + 1} and ${parseInt(item.periodo)}`;
                    where[1].value = `$${parseInt(item.id) + 1} and ${parseInt(item.periodo)}`;
                    where[1].connector = "OR";

                    dashboard_cofiguration.base.push(where[0]);
                    dashboard_cofiguration.base.push(where[1]);
                }
                dashboard_cofiguration.base[2].open = "((";
                dashboard_cofiguration.base[dashboard_cofiguration.base.length - 1].connector = undefined;
                dashboard_cofiguration.base[dashboard_cofiguration.base.length - 1].close = "))";
                dashboard_cofiguration.global_template = dashboard_cofiguration.base.filter(d => {
                    return d.field != "poa" && d.field != "departamento";
                });
            }

            console.log(dashboard_cofiguration.base);
            // console.log(dashboard_cofiguration.base);
            // console.log(dashboard_cofiguration.global_template, "este es el template global");
            //por cada seleccion
            // {
            //template[0].field = "id de la iteracion"
            //template[1].field = "periodo de la iteracion"
            //si no es el ultimo
            //template[1].connector = 'OR'
            // base.push(template)
            // }
            //vw_dashboard_productos2.changeFilter(base);


            vw_dashboard_productos2.changeFilter(dashboard_cofiguration.base);
        } else {
            vw_dashboard_productos2.changeFilter([{
                field: "poa",
                value: -1
            }]);
        }
        dashboard_cofiguration.changePie();
        dashboard_cofiguration.changeBar();
        dashboard_cofiguration.changeLine();
    });

    dashboard_cofiguration.changePie = function () {
        if (dashboard_cofiguration.form.selectedMultiple('periodos') != null) {
            var wherecomun = DSON.OSO(dashboard_cofiguration.base);

            BASEAPI.listp('vw_dashboard_presupuesto', {limit: 0, where: wherecomun}).then(function (row) {
                var rs = {ejecutado: 0, noejecutado: 0, noasignado: 0};
                dashboard_cofiguration.rs_presupuesto = row.data;
                dashboard_cofiguration.rs_presupuesto.forEach(obj => {
                    rs.ejecutado += parseFloat(obj.presupuesto_consumido);
                    rs.noejecutado += parseFloat((obj.presupuesto -  obj.presupuesto_consumido));
                });
                dashboard_cofiguration.pie_data = [{value: 1, name: "N/A"}];
                dashboard_cofiguration.pie_data = [];
                if (row.data[0]) {
                    rs.noasignado += Math.abs(row.data[0].presupuesto_asignado - (rs.ejecutado + rs.noejecutado));
                    dashboard_cofiguration.pie_legend = [`Ejecutado`, 'No Asignado', 'No Ejecutado'];

                    dashboard_cofiguration.pie_data.push({
                        value: rs.ejecutado,
                        name: "Ejecutado",
                        label: {
                            show: rs.ejecutado ? true : false,
                        },
                        itemStyle: {
                            color: '#ff8a8a',
                        },
                    });

                    dashboard_cofiguration.pie_data.push({
                        value: rs.noasignado,
                        name: "No Asignado",
                        label: {
                            show: rs.noasignado ? true : false,
                        },
                        itemStyle: {
                            color: '#cacaca'
                        },
                    });

                    dashboard_cofiguration.pie_data.push({
                        value: rs.noejecutado,
                        name: "No Ejecutado",
                        label: {
                            show: rs.noejecutado ? true : false,
                        },
                        itemStyle: {
                            color: '#a1de78',
                        },
                    });
                } else {
                    dashboard_cofiguration.pie_legend = ['No existen datos para la selección'];
                    dashboard_cofiguration.pie_data = [{
                        value: 1,
                        name: "Sin información",
                        label: {
                            show: false,
                            color: "black",
                        },
                        itemStyle: {
                            color: '#80867C',
                        }
                    }];
                    dashboard_cofiguration.pie_menssageHover = "";
                    dashboard_cofiguration.charts.pie.refresh();
                }

                dashboard_cofiguration.charts.pie.refresh();
            });
        } else {
            if (dashboard_cofiguration.charts) {
                dashboard_cofiguration.pie_legend = ['No existen datos para la selección'];
                dashboard_cofiguration.pie_data = [{
                    value: 1,
                    name: "Sin información",
                    label: {
                        show: false,
                        color: "black",
                    },
                    itemStyle: {
                        color: '#80867C',
                    }
                }];
                dashboard_cofiguration.pie_menssageHover = "";
                dashboard_cofiguration.charts.pie.refresh();
            }
        }
    };

    dashboard_cofiguration.bar2_events = {
        'click': function (data) {

            dashboard_cofiguration.monthDateFrom = parseInt(dashboard_cofiguration.form.selectedMultiple('periodos').id) + 1;
            dashboard_cofiguration.monthDateTo = parseInt(dashboard_cofiguration.form.selectedMultiple('periodos').periodo) + 1;
            if (dashboard_cofiguration.othercondition != 12) {
                dashboard_cofiguration.monthDateTo = dashboard_cofiguration.monthDateTo - 1;
            }
            dashboard_cofiguration.dashboardPoa = dashboard_cofiguration.vw_dashboard_poas;
            switch (data.name) {
                case"Productos": {
                    dashboard_cofiguration.openmodalproductos(data.seriesName);
                    break;
                }
                case"Proyecto/Producto": {
                    dashboard_cofiguration.openmodalproductos(data.seriesName);
                    break;
                }
                case"Planes de Acción Empresarial": {
                    dashboard_cofiguration.openmodalproductos(data.seriesName);
                    break;
                }
                case"Proyecto/Plan de Acción": {
                    dashboard_cofiguration.openmodalproductos(data.seriesName);
                    break;
                }
                case"Actividades": {
                    dashboard_cofiguration.openmodalactividades(data.seriesName);
                    break;
                }
                case"Asignaciones Especiales": {
                    dashboard_cofiguration.openmodalasignaciones(data.seriesName);
                    break;
                }
            }
        }
    };
    dashboard_cofiguration.openmodalproductos = function (value) {
        var title = "";
        dashboard_cofiguration.Mproductos = value.toString().toLowerCase();
        switch (dashboard_cofiguration.Mproductos) {
            case "planificadas":
                title = "planificados";
                break;
            case "en ejecución":
                title = "en ejecución";
                break;
            case "vencidas":
                title = "vencidos";
                break;
            case "canceladas":
                title = "cancelados";
                break;
            case "completadas":
                title = "completados";
                break;
            default:
                title = value;
        }
        dashboard_cofiguration.modal.modalView("productos_poa", {
            width: 'modal-full',
            header: {
                title: dashboard_cofiguration.session.tipo_institucion == 1 ? "Proyecto/Producto " + title : "Proyecto/Plan de Acción " + title,
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
    dashboard_cofiguration.openmodalactividades = function (value) {
        dashboard_cofiguration.Mactividades = value.toString().toLowerCase();
        dashboard_cofiguration.modal.modalView("actividades_poa", {
            width: 'modal-full',
            header: {
                title: "Actividades " + dashboard_cofiguration.Mactividades,
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
    dashboard_cofiguration.openmodalasignaciones = function (value) {
        dashboard_cofiguration.Masignaciones = value.toString().toLowerCase();
        dashboard_cofiguration.modal.modalView("vw_asignacion_especial_dashboard", {
            width: 'modal-full',
            header: {
                title: "Asignaciones especiales " + dashboard_cofiguration.Masignaciones,
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

    dashboard_cofiguration.changeBar = function () {

        if (dashboard_cofiguration.form.selectedMultiple('periodos') != null) {

            var wherecomun = DSON.OSO(dashboard_cofiguration.base);
            dashboard_cofiguration.r_s = 0;
            BASEAPI.listp('vw_dashboard_pie', {limit: 0, where: wherecomun}).then(function (pieR) {
                BASEAPI.listp('vw_dashboard_bar_as', {limit: 0, where: wherecomun}).then(function (asR) {
                    BASEAPI.listp('vw_dashboard_bar_acp', {limit: 0, where: wherecomun}).then(function (acpR) {
                        dashboard_cofiguration.bar2_data = {};
                        dashboard_cofiguration.bar2_data = {
                            legend: ['Planificadas', 'Pendientes a Ejecución', 'En Ejecución', 'Detenidas', 'Vencidas', 'Completadas', 'Canceladas'],
                            left: dashboard_cofiguration.session.tipo_institucion == 1 ? ['Asignaciones Especiales', 'Actividades', 'Proyecto/Producto'] : ['Asignaciones Especiales', 'Actividades', 'Proyecto/Plan de Acción'],
                            data: [
                                {
                                    name: 'Planificadas',
                                    type: 'bar',
                                    stack: 'Total',
                                    itemStyle: {
                                        normal: {
                                            color: '#9b89d9',
                                            label: {
                                                show: true,
                                                position: 'insideRight'
                                            }
                                        },
                                        emphasis: {
                                            color: '#9b89d9',
                                            label: {
                                                show: true
                                            }
                                        }
                                    },
                                    data: ['', '', '']
                                },
                                {
                                    name: 'Pendientes a Ejecución',
                                    type: 'bar',
                                    stack: 'Total',
                                    itemStyle: {
                                        normal: {
                                            color: '#74f791',
                                            label: {
                                                show: true,
                                                position: 'insideRight'
                                            }
                                        },
                                        emphasis: {
                                            color: '#74f791',
                                            label: {
                                                show: true
                                            }
                                        }
                                    },
                                    data: ['', '', '']
                                },
                                {
                                    name: 'En Ejecución',
                                    type: 'bar',
                                    stack: 'Total',
                                    itemStyle: {
                                        normal: {
                                            color: '#a1de78',
                                            label: {
                                                show: true,
                                                position: 'insideRight'
                                            }
                                        },
                                        emphasis: {
                                            color: '#a1de78',
                                            label: {
                                                show: true
                                            }
                                        }
                                    },
                                    data: ['', '', '']
                                },
                                {
                                    name: 'Detenidas',
                                    type: 'bar',
                                    stack: 'Total',
                                    itemStyle: {
                                        normal: {
                                            color: '#ffe287',
                                            label: {
                                                show: true,
                                                position: 'insideRight'
                                            }
                                        },
                                        emphasis: {
                                            color: '#ffe287',
                                            label: {
                                                show: true
                                            }
                                        }
                                    },
                                    data: ['', '', '']
                                },
                                {
                                    name: 'Vencidas',
                                    type: 'bar',
                                    stack: 'Total',
                                    itemStyle: {
                                        normal: {
                                            color: '#ff8a8a',
                                            label: {
                                                show: true,
                                                position: 'insideRight'
                                            }
                                        },
                                        emphasis: {
                                            color: '#ff8a8a',
                                            label: {
                                                show: true
                                            }
                                        }
                                    },
                                    data: ['', '', '']
                                },
                                {
                                    name: 'Completadas',
                                    type: 'bar',
                                    stack: 'Total',
                                    itemStyle: {
                                        normal: {
                                            color: '#737fff',
                                            label: {
                                                show: true,
                                                position: 'insideRight'
                                            }
                                        },
                                        emphasis: {
                                            color: '#737fff',
                                            label: {
                                                show: true
                                            }
                                        }
                                    },
                                    data: ['', '', '']
                                },
                                {
                                    name: 'Canceladas',
                                    type: 'bar',
                                    //stack: 'Total',
                                    itemStyle: {
                                        normal: {
                                            color: '#8e8f91',
                                            label: {
                                                show: true,
                                                position: 'insideRight'
                                            }
                                        },
                                        emphasis: {
                                            color: '#8e8f91',
                                            label: {
                                                show: true
                                            }
                                        }
                                    },
                                    data: ['', '', '']
                                },
                            ]
                        };
                        if (pieR.data.length > 0) {
                            var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h= 0;
                            pieR.data.forEach((row) => {
                                if (row.estatus === 'Planificada') {
                                    a += parseInt(row.county);
                                }
                                if (row.estatus === 'pendiente a ejecución') {
                                    b += parseInt(row.county);
                                }
                                if (row.estatus === 'En ejecución') {
                                    c += parseInt(row.county);
                                }
                                if (row.estatus === 'Detenidas') {
                                    d += parseInt(row.county);
                                }
                                if (row.estatus === 'Vencida') {
                                    e += parseInt(row.county);
                                }
                                if (row.estatus === 'Completado') {
                                    f += parseInt(row.county);
                                }
                                if (row.estatus === 'Canceladas') {
                                    g += parseInt(row.county);
                                }
                            });
                            dashboard_cofiguration.bar2_data.data[0].data[2] = a ? a : "";
                            dashboard_cofiguration.bar2_data.data[1].data[2] = b ? b : "";
                            dashboard_cofiguration.bar2_data.data[2].data[2] = c ? c : "";
                            dashboard_cofiguration.bar2_data.data[3].data[2] = d ? d : "";
                            dashboard_cofiguration.bar2_data.data[4].data[2] = e ? e : "";
                            dashboard_cofiguration.bar2_data.data[5].data[2] = f ? f : "";
                            dashboard_cofiguration.bar2_data.data[6].data[2] = g ? g : "";
                        }

                        if (acpR.data.length > 0) {
                            var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h= 0;
                            acpR.data.forEach((row) => {
                                if (row.estatus === 'planificada') {
                                    a += parseInt(row.county);
                                }
                                if (row.estatus === 'pendiente a ejecución') {
                                    b += parseInt(row.county);
                                }
                                if (row.estatus === 'ejecución') {
                                    c += parseInt(row.county);
                                }
                                if (row.estatus === 'Detenidas') {
                                    d += parseInt(row.county);
                                }
                                if (row.estatus === 'vencida') {
                                    e += parseInt(row.county);
                                }
                                if (row.estatus === 'completa') {
                                    f += parseInt(row.county);
                                }
                                if (row.estatus === 'Canceladas') {
                                    g += parseInt(row.county);
                                }
                            });
                            dashboard_cofiguration.bar2_data.data[0].data[1] = a ? a : "";
                            dashboard_cofiguration.bar2_data.data[1].data[1] = b ? b : "";
                            dashboard_cofiguration.bar2_data.data[2].data[1] = c ? c : "";
                            dashboard_cofiguration.bar2_data.data[3].data[1] = d ? d : "";
                            dashboard_cofiguration.bar2_data.data[4].data[1] = e ? e : "";
                            dashboard_cofiguration.bar2_data.data[5].data[1] = f ? f : "";
                            dashboard_cofiguration.bar2_data.data[6].data[1] = g ? g : "";
                        }
                        if (asR.data.length > 0) {
                            var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h= 0;
                            asR.data.forEach((row) => {
                                if (row.estatus === 'planificada') {
                                    a += parseInt(row.county);
                                }
                                if (row.estatus === 'pendiente a ejecución') {
                                    b += parseInt(row.county);
                                }
                                if (row.estatus === 'ejecución') {
                                    c += parseInt(row.county);
                                }
                                if (row.estatus === 'Detenidas') {
                                    d += parseInt(row.county);
                                }
                                if (row.estatus === 'vencida') {
                                    e += parseInt(row.county);
                                }
                                if (row.estatus === 'completa') {
                                    f += parseInt(row.county);
                                }
                                if (row.estatus === 'canceladas') {
                                    g += parseInt(row.county);
                                }
                            });
                            dashboard_cofiguration.bar2_data.data[0].data[0] = a ? a : "";
                            dashboard_cofiguration.bar2_data.data[1].data[0] = b ? b : "";
                            dashboard_cofiguration.bar2_data.data[2].data[0] = c ? c : "";
                            dashboard_cofiguration.bar2_data.data[3].data[0] = d ? d : "";
                            dashboard_cofiguration.bar2_data.data[4].data[0] = e ? e : "";
                            dashboard_cofiguration.bar2_data.data[5].data[0] = f ? f : "";
                            dashboard_cofiguration.bar2_data.data[6].data[0] = g ? g : "";
                        }
                        dashboard_cofiguration.charts.bar2.refresh();
                        SWEETALERT.stop();
                    });
                });
            });
        } else {
            if (dashboard_cofiguration.charts) {
                if (dashboard_cofiguration.charts.bar2) {
                    dashboard_cofiguration.bar2_data = {
                        legend: ['Planificadas', 'Pendientes a Ejecución', 'En Ejecución', 'Detenidas', 'Vencidas', 'Completadas', 'Canceladas'],
                        left: dashboard_cofiguration.session.tipo_institucion == 1 ? ['Asignaciones Especiales', 'Actividades', 'Proyecto/Producto'] : ['Asignaciones Especiales', 'Actividades', 'Proyecto/Plan de Acción'],
                        data: [
                            {
                                name: 'Planificadas',
                                type: 'bar',
                                stack: 'Total',
                                itemStyle: {
                                    normal: {
                                        color: '#9b89d9',
                                        label: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        color: '#9b89d9',
                                        label: {
                                            show: true
                                        }
                                    }
                                },
                                data: ['', '', '']
                            },
                            {
                                name: 'Pendientes a Ejecución',
                                type: 'bar',
                                stack: 'Total',
                                itemStyle: {
                                    normal: {
                                        color: '#74f791',
                                        label: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        color: '#74f791',
                                        label: {
                                            show: true
                                        }
                                    }
                                },
                                data: ['', '', '']
                            },
                            {
                                name: 'En Ejecución',
                                type: 'bar',
                                stack: 'Total',
                                itemStyle: {
                                    normal: {
                                        color: '#a1de78',
                                        label: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        color: '#a1de78',
                                        label: {
                                            show: true
                                        }
                                    }
                                },
                                data: ['', '', '']
                            },
                            {
                                name: 'Detenidas',
                                type: 'bar',
                                stack: 'Total',
                                itemStyle: {
                                    normal: {
                                        color: '#ffe287',
                                        label: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        color: '#ffe287',
                                        label: {
                                            show: true
                                        }
                                    }
                                },
                                data: ['', '', '']
                            },
                            {
                                name: 'Vencidas',
                                type: 'bar',
                                stack: 'Total',
                                itemStyle: {
                                    normal: {
                                        color: '#ff8a8a',
                                        label: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        color: '#ff8a8a',
                                        label: {
                                            show: true
                                        }
                                    }
                                },
                                data: ['', '', '']
                            },
                            {
                                name: 'Completadas',
                                type: 'bar',
                                stack: 'Total',
                                itemStyle: {
                                    normal: {
                                        color: '#737fff',
                                        label: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        color: '#737fff',
                                        label: {
                                            show: true
                                        }
                                    }
                                },
                                data: ['', '', '']
                            },
                            {
                                name: 'Canceladas',
                                type: 'bar',
                                stack: 'Total',
                                itemStyle: {
                                    normal: {
                                        color: '#8e8f91',
                                        label: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        color: '#8e8f91',
                                        label: {
                                            show: true
                                        }
                                    }
                                },
                                data: ['', '', '']
                            },
                        ]
                    };
                    dashboard_cofiguration.charts.bar2.refresh();
                }
            }
            SWEETALERT.stop();
        }
    };
    dashboard_cofiguration.line_data = {
        legend: [],
        down: [],
        data: []
    };
    dashboard_cofiguration.changeLine = function () {
        var dashboard_cofiguration_listInd = [];
        var dashboard_cofiguration_listIndN = [];
        if (dashboard_cofiguration.form.selectedMultiple('periodos') != null) {


            var wherecomun = DSON.OSO(dashboard_cofiguration.base);

            BASEAPI.listp('vw_dashboard_productosgrid_vs2', {limit: 0, where: wherecomun}).then(function (rs) {
                if (rs.data) {
                    console.log("coño", rs.data)
                    if (rs.data.length > 0) {
                        dashboard_cofiguration_listInd = rs.data;
                        dashboard_cofiguration.line_data = {};
                        dashboard_cofiguration.line_data = {
                            legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                            down: dashboard_cofiguration_listIndN,
                            data: [


                                {
                                    name: 'Proyectado',
                                    type: dashboard_cofiguration.tipodelinea,
                                    //stack: 'Total',
                                    data: [],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                position: 'top',
                                                show: true,
                                                textStyle: {
                                                    fontSize: '11',

                                                }
                                            }, color: '#9b89d9',
                                        }
                                    }
                                }, {
                                    name: 'Alcanzado',
                                    type: dashboard_cofiguration.tipodelinea,
                                    //stack: 'Total',
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
                                },
                                {
                                    name: 'Diferencia',
                                    type: dashboard_cofiguration.tipodelinea,
                                    ////stack: 'Total',
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
                                            }, color: '#ff8a8a', areaStyle: {type: 'default', color: '#ff8a8a',}
                                        }
                                    }
                                }

                            ]
                        };

                        dashboard_cofiguration.line_data.data[0].data = createArray(dashboard_cofiguration_listIndN.length, '');
                        dashboard_cofiguration.line_data.data[1].data = createArray(dashboard_cofiguration_listIndN.length, '');
                        dashboard_cofiguration.line_data.data[2].data = createArray(dashboard_cofiguration_listIndN.length, '');

                        for (var p = 0; p < dashboard_cofiguration_listInd.length; p++) {
                            dashboard_cofiguration_listIndN.push(dashboard_cofiguration_listInd[p].indicador);
                            dashboard_cofiguration.line_data.data[1].data[p] = dashboard_cofiguration_listInd[p].alcanzado ? dashboard_cofiguration_listInd[p].alcanzado : 0;
                            dashboard_cofiguration.line_data.data[0].data[p] = dashboard_cofiguration_listInd[p].acumulado ? dashboard_cofiguration_listInd[p].acumulado : 0;
                            dashboard_cofiguration.line_data.data[2].data[p] = dashboard_cofiguration_listInd[p].alcanzado - dashboard_cofiguration_listInd[p].acumulado ? parseFloat(dashboard_cofiguration_listInd[p].alcanzado - dashboard_cofiguration_listInd[p].acumulado).toFixed(2) : 0;

                            if (dashboard_cofiguration.line_data.data[2].data[p] < 0)
                                dashboard_cofiguration.line_data.data[2].data[p] *= -1;

                        }
                        dashboard_cofiguration.refreshAngular();
                        dashboard_cofiguration.charts.line.refresh();
                        SWEETALERT.stop();
                    } else {
                        dashboard_cofiguration.line_data = {};
                        dashboard_cofiguration.line_data = {
                            legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                            down: ['No existen indicadores'],
                            data: [
                                {
                                    name: 'Diferencia',
                                    type: dashboard_cofiguration.tipodelinea,
                                    //stack: 'Total',
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
                                    type: dashboard_cofiguration.tipodelinea,
                                    //stack: 'Total',
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
                                    type: dashboard_cofiguration.tipodelinea,
                                    //stack: 'Total',
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
                        dashboard_cofiguration.refreshAngular();
                        dashboard_cofiguration.charts.line.refresh();
                        SWEETALERT.stop();
                    }
                } else {
                    dashboard_cofiguration.line_data = {};
                    dashboard_cofiguration.line_data = {
                        legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                        down: ['No existen indicadores'],
                        data: [
                            {
                                name: 'Diferencia',
                                type: dashboard_cofiguration.tipodelinea,
                                //stack: 'Total',
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
                                type: dashboard_cofiguration.tipodelinea,
                                //stack: 'Total',
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
                                type: dashboard_cofiguration.tipodelinea,
                                //stack: 'Total',
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
                    dashboard_cofiguration.refreshAngular();
                    dashboard_cofiguration.charts.line.refresh();
                    SWEETALERT.stop();
                }
            });
        } else {
            if (dashboard_cofiguration.charts) {
                if (dashboard_cofiguration.charts.line) {
                    dashboard_cofiguration.line_data = {
                        legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                        down: dashboard_cofiguration_listIndN,
                        data: [
                            {
                                name: 'Diferencia',
                                type: dashboard_cofiguration.tipodelinea,
                                //stack: 'Total',
                                data: [""],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            position: 'top',
                                            show: true,
                                            textStyle: {
                                                fontSize: '11',
                                                color: '#000000'
                                            }
                                        }, color: '#ff8a8a', areaStyle: {type: 'default', color: '#ff8a8a',}
                                    }
                                }
                            },
                            {
                                name: 'Alcanzado',
                                type: dashboard_cofiguration.tipodelinea,
                                //stack: 'Total',
                                data: [""],
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
                            },
                            {
                                name: 'Proyectado',
                                type: dashboard_cofiguration.tipodelinea,
                                stack: 'Total',
                                data: [""],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            position: 'top',
                                            show: true,
                                            textStyle: {
                                                fontSize: '11',

                                            }
                                        }, color: '#9b89d9',
                                    }
                                }
                            }
                        ]
                    };
                    dashboard_cofiguration.charts.line.refresh();
                }
            }
            SWEETALERT.stop();
        }
    };
    dashboard_cofiguration.refresBars = function () {
        SWEETALERT.loading({message: 'Refrescando'});
        dashboard_cofiguration.changePie();
        dashboard_cofiguration.changeBar();
        dashboard_cofiguration.changeLine();
    };
    dashboard_cofiguration.openReport = function () {
        dashboard_cofiguration.modal.modalView("resumen_poa", {
            header: {
                title: "PLAN OPERATIVO ANUAL (POA)",
                icon: "html5"
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: 'resumen_poa'
            },
        });
    };
});
