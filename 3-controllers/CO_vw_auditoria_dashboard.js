app.controller("vw_auditoria_dashboard", function ($scope, $http, $compile) {
    vw_auditoria_dashboard = this;
    vw_auditoria_dashboard.session = new SESSION().current();
    //vw_auditoria_dashboard.fixFilters = [];
    vw_auditoria_dashboard.singular = "Dashboard de Auditoría";
    vw_auditoria_dashboard.plural = "Dashboard de Auditoría";
    vw_auditoria_dashboard.headertitle = "Dashboard de Auditoría";
    vw_auditoria_dashboard.destroyForm = false;
    vw_auditoria_dashboard.created = false;
    vw_auditoria_dashboard.firsttime = false;
    vw_auditoria_dashboard.planes_auditoria = [];
    var animation = new ANIMATION();
    //vw_auditoria_dashboard.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_auditoria_dashboard", vw_auditoria_dashboard, $scope, $http, $compile);
    RUN_B("vw_auditoria_dashboard", vw_auditoria_dashboard, $scope, $http, $compile);
    vw_auditoria_dashboard.getPlanesAuditoria = function (callback, noloading) {
        if (!noloading)
            animation.loading(`#PlanAuditoria`, "", ``, '30');
        vw_auditoria_dashboard.condition_plan = [
            {
                field: "id",
                value: vw_auditoria_dashboard.id
            }
        ];
        vw_auditoria_dashboard.planes = {
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
        BASEAPI.listp('vw_dashboard_plan_auditoria', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: vw_auditoria_dashboard.condition_plan
        }).then(async function (result) {
            vw_auditoria_dashboard.nombre_estatus_plan = await BASEAPI.listp('auditoria_programa_plan_estatus', {
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
            vw_auditoria_dashboard.nombre_estatus_plan = vw_auditoria_dashboard.nombre_estatus_plan.data;
            vw_auditoria_dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');
            vw_auditoria_dashboard.listplanes = result;
            vw_auditoria_dashboard.array_planes = [];
            vw_auditoria_dashboard.planes.cantidad = 0;
            vw_auditoria_dashboard.planes.preplanificacion = 0;
            vw_auditoria_dashboard.planes.planificadas = 0;
            vw_auditoria_dashboard.planes.enproceso = 0;
            vw_auditoria_dashboard.planes.autorizadas = 0;
            vw_auditoria_dashboard.planes.recoleccionfinalizadas = 0;
            vw_auditoria_dashboard.planes.informepreliminar = 0;
            vw_auditoria_dashboard.planes.finalizadas = 0;
            vw_auditoria_dashboard.planes.cerradas = 0;
            if (vw_auditoria_dashboard.listplanes.data) {
                if (vw_auditoria_dashboard.listplanes.data.length > 0) {
                    for (var pr = 0; pr < vw_auditoria_dashboard.listplanes.data.length; pr++) {
                        vw_auditoria_dashboard.planes.preplanificacion += vw_auditoria_dashboard.listplanes.data[pr].preplanificacion;
                        vw_auditoria_dashboard.planes.planificadas += vw_auditoria_dashboard.listplanes.data[pr].planificadas;
                        vw_auditoria_dashboard.planes.enproceso += vw_auditoria_dashboard.listplanes.data[pr].enproceso;
                        vw_auditoria_dashboard.planes.autorizadas += vw_auditoria_dashboard.listplanes.data[pr].autorizadas;
                        vw_auditoria_dashboard.planes.recoleccionfinalizadas += vw_auditoria_dashboard.listplanes.data[pr].recoleccionfinalizadas;
                        vw_auditoria_dashboard.planes.informepreliminar += vw_auditoria_dashboard.listplanes.data[pr].informepreliminar;
                        vw_auditoria_dashboard.planes.finalizadas += vw_auditoria_dashboard.listplanes.data[pr].finalizadas;
                        vw_auditoria_dashboard.planes.cerradas += vw_auditoria_dashboard.listplanes.data[pr].cerradas;
                        vw_auditoria_dashboard.planes.cantidad += vw_auditoria_dashboard.listplanes.data[pr].cantidad;
                    }

                    for (var i in vw_auditoria_dashboard.planes) {
                        vw_auditoria_dashboard.planes[i] = parseInt(vw_auditoria_dashboard.planes[i]) < 10 ? ('0' + vw_auditoria_dashboard.planes[i]) : vw_auditoria_dashboard.planes[i];
                        if (i !== 'cantidad')
                            vw_auditoria_dashboard.array_planes.push(
                                {
                                    name: i == 'preplanificacion' ? vw_auditoria_dashboard.nombre_estatus_plan[0].nombre : i == 'autorizadas' ? vw_auditoria_dashboard.nombre_estatus_plan[2].nombre : i == 'recoleccionfinalizadas' ? vw_auditoria_dashboard.nombre_estatus_plan[5].nombre : i == 'informepreliminar' ? vw_auditoria_dashboard.nombre_estatus_plan[6].nombre : i == 'enproceso' ? vw_auditoria_dashboard.nombre_estatus_plan[3].nombre : i == "planificadas" ? vw_auditoria_dashboard.nombre_estatus_plan[1].nombre : i == "finalizadas" ? vw_auditoria_dashboard.nombre_estatus_plan[4].nombre : i == "cerradas" ? vw_auditoria_dashboard.nombre_estatus_plan[7].nombre :"????",
                                    value: LAN.money(vw_auditoria_dashboard.planes[i]).value,
                                    percent: vw_auditoria_dashboard.planes.cantidad > 0 ? Math.round((LAN.money(vw_auditoria_dashboard.planes[i]).value / LAN.money(vw_auditoria_dashboard.planes.cantidad).value) * 100) + '%' : '0%',
                                    total: LAN.money(vw_auditoria_dashboard.planes.cantidad).value,
                                    icon:  i == 'informepreliminar' ? 'icon-certificate' : i == 'recoleccionfinalizadas' ? 'icon-stack-check' : i == 'finalizadas' ? 'icon-checkmark4' : i == 'preplanificacion' ? 'icon-strategy' : i == 'planificadas' ? 'icon-arrow-right16' : i == 'autorizadas' ? 'icon-clipboard2' : i == 'enproceso' ? ' icon-cogs' : i == 'cerradas' ? ' icon-switch' : 'icon-question3',
                                    color: i == 'informepreliminar' ? '#6a46e0' : i == 'recoleccionfinalizadas' ? '#543070' : i == 'finalizadas' ? '#4451DB' : i == 'preplanificacion' ? '#5F5FAF' : i == 'planificadas' ? '#84a379' : i == 'autorizadas' ? '#548235' : i == 'enproceso' ? '#6b4d82' : i == 'cerradas' ? '#4613ed' :'#CCCCCC',
                                    order: i == 'informepreliminar' ? '6' : i == 'recoleccionfinalizadas' ? '5' : i == 'finalizadas' ? '7' : i == 'preplanificacion' ? '1' : i == 'planificadas' ? '2' : i == 'autorizadas' ? '3' : i == 'enproceso' ? '4' : i == 'cerradas' ? '8' : '9',
                                    light_color: i == 'informepreliminar' ? '#7c65c9' : i == 'recoleccionfinalizadas' ? '#995ccc' : i == 'finalizadas' ? '#7784FF' : i == 'preplanificacion' ? '#9292E2' : i == 'planificadas' ? '#a4de90' : i == 'autorizadas' ? '#87B568' : i == 'enproceso' ? '#a87dc9' : i == 'cerradas' ? '#7373ff' :  '#CCCCCC',
                                    font_color: 'white',
                                    title: "Hacer clic para ver detalle"
                                }
                            )
                    }
                }
            }
            if (!noloading)
                animation.stoploading(`#PlanAuditoria`);
            vw_auditoria_dashboard.refreshAngular();
            if (callback)
                callback();
        });
    }
    vw_auditoria_dashboard.getPrograma = async function () {
        var auditoriaData = await BASEAPI.firstp('vw_auditoria_programa', {
            order: "desc",
            where: [
                {
                    field: "estatus",
                    operator: "!=",
                    value: 8
                },
                {
                    field: "compania",
                    value: vw_auditoria_dashboard.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": vw_auditoria_dashboard.session.institucion_id ? "=" : "is",
                    "value": vw_auditoria_dashboard.session.institucion_id ? vw_auditoria_dashboard.session.institucion_id : "$null"
                },
            ]
        });
        if (auditoriaData) {
            vw_auditoria_dashboard.created = true;
            vw_auditoria_dashboard.id = auditoriaData.id;
            vw_auditoria_dashboard.nombre = auditoriaData.nombre;
            vw_auditoria_dashboard.descripcion = auditoriaData.descripcion;
            vw_auditoria_dashboard.fecha_inicio = auditoriaData.fecha_inicio;
            vw_auditoria_dashboard.fecha_fin = auditoriaData.fecha_fin;
            vw_auditoria_dashboard.range_date = auditoriaData.fecha_inicio ? LAN.date(auditoriaData.fecha_inicio) + " - " + LAN.date(auditoriaData.fecha_fin) : "";
            vw_auditoria_dashboard.estatus = auditoriaData.estatus + '';
            vw_auditoria_dashboard.current_estatus = auditoriaData.estatus;
            vw_auditoria_dashboard.estatus_nombre = auditoriaData.estatus_nombre;
            vw_auditoria_dashboard.compania = auditoriaData.compania;
            vw_auditoria_dashboard.institucion = auditoriaData.institucion;
            if (auditoriaData.estatus == 5) {
                vw_auditoria_dashboard.form.options.fecha_fin.disabled = true;
                vw_auditoria_dashboard.form.options.fecha_inicio.disabled = true;
                vw_auditoria_dashboard.refreshAngular();
            }
            vw_auditoria_dashboard.planes_auditoria = await BASEAPI.listp('vw_auditoria_programa_plan', {
                limit: 0,
                where: [
                    {
                        field: "auditoria_programa",
                        value: vw_auditoria_dashboard.id
                    }
                ]
            })
            vw_auditoria_dashboard.planes_auditoria = vw_auditoria_dashboard.planes_auditoria.data;
            vw_auditoria_dashboard.form.loadDropDown('estatus')
            vw_auditoria_dashboard.getPlanesAuditoria();
        } else {
            vw_auditoria_dashboard.created = false;
            vw_auditoria_dashboard.estatus_nombre = "Abierto";
            vw_auditoria_dashboard.current_estatus = 1;
            vw_auditoria_dashboard.planes = [];
        }
        vw_auditoria_dashboard.refreshAngular();
    };
    vw_auditoria_dashboard.getPrograma();
    vw_auditoria_dashboard.selectQueries['estatus'] = [
        {
            field: 'rol',
            operator: '=',
            value: vw_auditoria_dashboard.session.groups[0].id
        }
    ];
    vw_auditoria_dashboard.$scope.$watch("vw_auditoria_dashboard.nombre", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_auditoria_dashboard, 'nombre', rules);
    });
    vw_auditoria_dashboard.$scope.$watch("vw_auditoria_dashboard.ano_planificacion", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_auditoria_dashboard, 'ano_planificacion', rules);
    });
    vw_auditoria_dashboard.$scope.$watch("vw_auditoria_dashboard.descripcion", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_auditoria_dashboard, 'descripcion', rules);
    });
    vw_auditoria_dashboard.$scope.$watch('vw_auditoria_dashboard.fecha_inicio', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_auditoria_dashboard, "fecha_inicio", rules)
    });
    vw_auditoria_dashboard.$scope.$watch('vw_auditoria_dashboard.fecha_fin', function (value) {
        // var rules = [];
        // rules.push(VALIDATION.general.required(value));
        // VALIDATION.validate(productos_poa, "fecha_fin", rules)
    });
    vw_auditoria_dashboard.$scope.$watch('vw_auditoria_dashboard.range_date', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_auditoria_dashboard, "fecha_inicio", rules);
        VALIDATION.validate(vw_auditoria_dashboard, "range_date", rules);
    });
    vw_auditoria_dashboard.triggers.table.after.control = function (data) {
        if (data == 'range_date') {
            vw_auditoria_dashboard.range_date = "";
            var elano = new SESSION().current().periodo_poa;
            var rango_minimo = moment(("01-02-" + moment().format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
            var rango_maximo = moment(("01-01-" + moment().add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");

            if (moment().format('YYYY') != elano) {
                rango_minimo = moment(("01-02-" + elano)).add(-1, 'day').format("YYYY-MM-DD");
                vw_auditoria_dashboard.range_date_start(moment(("01-01-" + elano)));
                vw_auditoria_dashboard.range_date_end(moment(("01-01-" + elano)));
                rango_maximo = moment(("01-01-" + (elano + 1))).add(-1, 'day').format("YYYY-MM-DD");
            }

            vw_auditoria_dashboard.range_date_min(rango_minimo);
            vw_auditoria_dashboard.range_date_max(rango_maximo);
            vw_auditoria_dashboard.refreshAngular();
        }
    };
    vw_auditoria_dashboard.formulary = function (data, mode, defaultData) {
        if (vw_auditoria_dashboard !== undefined) {
            RUN_B("vw_auditoria_dashboard", vw_auditoria_dashboard, $scope, $http, $compile);
            vw_auditoria_dashboard.form.modalWidth = ENUM.modal.width.full;
            vw_auditoria_dashboard.form.readonly = {};
            vw_auditoria_dashboard.createForm(data, mode, defaultData);
            $scope.$watch("vw_auditoria_dashboard.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_dashboard, 'nombre', rules);
            });
            $scope.$watch("vw_auditoria_dashboard.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_dashboard, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_auditoria_dashboard.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_dashboard, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_auditoria_dashboard.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_dashboard, 'institucion', rules);
            });
            $scope.$watch("vw_auditoria_dashboard.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_dashboard, 'estatus', rules);
            });
        }
    };
    vw_auditoria_dashboard.cancelar = function () {
        location.reload();
    };
    vw_auditoria_dashboard.allow_action = function (estatus) {
        if (vw_auditoria_dashboard.allowAction("Autorizar", "vw_auditoria_dashboard", estatus)) {
            if (vw_auditoria_dashboard.planes_auditoria) {
                if (vw_auditoria_dashboard.planes_auditoria.length > 0) {
                    var planes_pendientes = vw_auditoria_dashboard.planes_auditoria.filter(d => {
                        return d.estatus == 2 || d.estatus == 1;
                    });
                    return planes_pendientes.length === 0;
                } else {
                    return false
                }
            } else {
                return false
            }
        } else if (vw_auditoria_dashboard.allowAction("Cerrar", "vw_auditoria_dashboard", estatus)) {
            if (vw_auditoria_dashboard.planes_auditoria) {
                if (vw_auditoria_dashboard.planes_auditoria.length > 0) {
                    var planes_finalizados = vw_auditoria_dashboard.planes_auditoria.filter(d => {
                        return d.estatus == 5;
                    });
                    return planes_finalizados.length === vw_auditoria_dashboard.planes_auditoria.length;
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return true;
        }
    }
    vw_auditoria_dashboard.openmodalplanes = function (value) {
        vw_auditoria_dashboard.Mplanes = value;
        console.log("Entre", vw_auditoria_dashboard.Mplanes)
        vw_auditoria_dashboard.modal.modalView("auditoria_programa_plan", {
            width: 'modal-full',
            header: {
                title: "Auditorías " + vw_auditoria_dashboard.Mplanes,
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
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};

    vw_auditoria_dashboard.tipodashboard = "bar";

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

    vw_auditoria_dashboard.callDataLinea = async function () {
        vw_auditoria_dashboard.prototipos = [];

        var dashboard_proceso_listInd4N = [];

        vw_auditoria_dashboard.whereCondition = [
            {
                field: "compania",
                value: vw_auditoria_dashboard.session.compania_id,
            }
        ];
        dashboard_proceso_listInd4 = await BASEAPI.listp('vw_auditoria_dashboard', {
            limit: 0,
            where: [
                {
                    field: vw_auditoria_dashboard.session.institucion_id ? "institucion" : "compania",
                    value: vw_auditoria_dashboard.session.institucion_id || vw_auditoria_dashboard.session.compania_id
                }]
        });


        if (dashboard_proceso_listInd4.data) {
            vw_auditoria_dashboard.ejeX = dashboard_proceso_listInd4.data.map(d => {
                return d.nombre
            });

            let colors = {
                1: "#9292E2",
                2: "#a4de90",
                3: "#87B568",
                4: "#a87dc9",
                5: "#7784FF",
                6: "#995ccc",
                7: "#7c65c",
                28: "#E57373",
            };
            vw_auditoria_dashboard.ejeY = dashboard_proceso_listInd4.data.map(d => {
                return {
                    type: vw_auditoria_dashboard.tipodashboard,
                    data: 0,
                    itemStyle: {
                        normal: {
                            label: {
                                position: 'top',
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    color: '#000000'
                                }
                            },
                            color: '',
                            areaStyle: {type: 'default', color: '',}
                        }
                    },
                };
            });
            if (dashboard_proceso_listInd4.data.length > 0) {
                dashboard_proceso_listInd4 = dashboard_proceso_listInd4.data;
                vw_auditoria_dashboard.area4_data = {};
                vw_auditoria_dashboard.area4_data = {
                    legend: vw_auditoria_dashboard.ejeX,
                    down: vw_auditoria_dashboard.ejeX,
                    data: [{
                        data: dashboard_proceso_listInd4.map(d => {
                            return {
                                value: d.cantidad,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            position: 'top',
                                            show: true,
                                            textStyle: {
                                                fontSize: '12',
                                                color: '#000000'
                                            }
                                        },
                                        color: colors[d.id],
                                        areaStyle: {type: 'default', color: colors[d.id]}
                                    }
                                },
                            }
                        }),
                        type: vw_auditoria_dashboard.tipodashboard
                    }]
                };
                vw_auditoria_dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');

                vw_auditoria_dashboard.refreshAngular();
                vw_auditoria_dashboard.charts.area4.refresh();
            } else {
                vw_auditoria_dashboard.area4_data = {};
                vw_auditoria_dashboard.area4_data = {
                    legend: vw_auditoria_dashboard.ejeX,
                    down: ['No existen datos para la selección'],
                    data: vw_auditoria_dashboard.prototipos
                };
                vw_auditoria_dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');
                vw_auditoria_dashboard.refreshAngular();
                vw_auditoria_dashboard.charts.area4.refresh();
            }
        } else {
            vw_auditoria_dashboard.area4_data = {};
            vw_auditoria_dashboard.area4_data = {
                legend: vw_auditoria_dashboard.ejeX,
                down: ['Aún no existen auditorías.'],
                data: vw_auditoria_dashboard.prototipos
            };
            vw_auditoria_dashboard.actualizacion = moment().format('DD/MM/YYYY h:mm');
            vw_auditoria_dashboard.refreshAngular();
            vw_auditoria_dashboard.charts.area4.refresh();
        }
    };
    vw_auditoria_dashboard.callDataLinea();
    // ELINTERVALAUDITORIA = setInterval(d => {
    //     if (location.href.indexOf('vw_auditoria_dashboard') === -1)
    //         if (ELINTERVALAUDITORIA)
    //             clearInterval(ELINTERVALAUDITORIA);
    //     vw_auditoria_dashboard.callDataLinea();
    // }, 2000);

});
ELINTERVALAUDITORIA = undefined;
