app.controller("vw_dashboard_indicador_generico", function ($scope, $http, $compile) {
    vw_dashboard_indicador_generico = this;
    //vw_dashboard_indicador_generico.fixFilters = [];
    vw_dashboard_indicador_generico.session = new SESSION().current();
    var animation = new ANIMATION();
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
    vw_dashboard_indicador_generico.loadCharts = true;
    //vw_dashboard_indicador_generico.fixFilters = [{
    //    field: "compania",
    //    value: vw_dashboard_indicador_generico.session.compania_id
    //}];
    //vw_dashboard_indicador_generico.singular = "singular";
    //vw_dashboard_indicador_generico.plural = "plural";
    //vw_dashboard_indicador_generico.headertitle = "Hola Title";
    vw_dashboard_indicador_generico.destroyForm = false;
    //vw_dashboard_indicador_generico.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_dashboard_indicador_generico", vw_dashboard_indicador_generico, $scope, $http, $compile);
    vw_dashboard_indicador_generico.formulary = function (data, mode, defaultData) {
        if (vw_dashboard_indicador_generico !== undefined) {
            RUN_B("vw_dashboard_indicador_generico", vw_dashboard_indicador_generico, $scope, $http, $compile);
            vw_dashboard_indicador_generico.form.modalWidth = ENUM.modal.width.full;
            vw_dashboard_indicador_generico.form.readonly = {compania: vw_dashboard_indicador_generico.session.compania_id};
            vw_dashboard_indicador_generico.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            vw_dashboard_indicador_generico.createForm(data, mode, defaultData);
            $scope.$watch("vw_dashboard_indicador_generico.1", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_indicador_generico, '1', rules);
            });
        }
    };
    vw_dashboard_indicador_generico.tipodashboard = "bar";
    vw_dashboard_indicador_generico.callDataLinea = async function () {
        vw_dashboard_indicador_generico.prototipos = [
            {
                name: 'Proyectado',
                type: vw_dashboard_indicador_generico.tipodashboard,
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
                type: vw_dashboard_indicador_generico.tipodashboard,
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
                type: vw_dashboard_indicador_generico.tipodashboard,
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
            }
        ];
        var dashboard_proceso_listInd4N = [];
        dashboard_proceso_listInd4 = await BASEAPI.listp('vw_dashboard_dato_indicador_generico', {
            limit: 0,
            orderby: "indicador",
            order: "asc",
            where: [
                {
                    field: "entidad",
                    value: !vw_dashboard_indicador_generico.session.institucion ? vw_dashboard_indicador_generico.session.compania_id : vw_dashboard_indicador_generico.session.institucion
                }]
        });

        if (dashboard_proceso_listInd4.data) {
            if (dashboard_proceso_listInd4.data.length > 0) {
                dashboard_proceso_listInd4 = dashboard_proceso_listInd4.data;
                vw_dashboard_indicador_generico.area4_data = {};
                vw_dashboard_indicador_generico.area4_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: dashboard_proceso_listInd4N,
                    data: [
                        {
                            name: 'Diferencia',
                            type: vw_dashboard_indicador_generico.tipodashboard,
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
                            type: vw_dashboard_indicador_generico.tipodashboard,
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
                            type: vw_dashboard_indicador_generico.tipodashboard,
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
                vw_dashboard_indicador_generico.actualizacion = moment().format('DD/MM/YYYY h:mm');

                vw_dashboard_indicador_generico.area4_data.data[0].data = createArray(dashboard_proceso_listInd4N.length, 0);
                vw_dashboard_indicador_generico.area4_data.data[1].data = createArray(dashboard_proceso_listInd4N.length, 0);
                vw_dashboard_indicador_generico.area4_data.data[2].data = createArray(dashboard_proceso_listInd4N.length, 0);

                for (var p = 0; p < dashboard_proceso_listInd4.length; p++) {
                    dashboard_proceso_listInd4N.push(dashboard_proceso_listInd4[p].indicador);
                    vw_dashboard_indicador_generico.area4_data.data[1].data[p] = dashboard_proceso_listInd4[p].alcanzado ? dashboard_proceso_listInd4[p].alcanzado : 0;
                    vw_dashboard_indicador_generico.area4_data.data[0].data[p] = dashboard_proceso_listInd4[p].acumulado ? dashboard_proceso_listInd4[p].acumulado : 0;
                    vw_dashboard_indicador_generico.area4_data.data[2].data[p] = dashboard_proceso_listInd4[p].alcanzado - dashboard_proceso_listInd4[p].acumulado ? parseFloat(dashboard_proceso_listInd4[p].alcanzado - dashboard_proceso_listInd4[p].acumulado).toFixed(2) : 0;
                    if (vw_dashboard_indicador_generico.area4_data.data[2].data[p] < 0)
                        vw_dashboard_indicador_generico.area4_data.data[2].data[p] *= -1;

                }
                vw_dashboard_indicador_generico.refreshAngular();
                vw_dashboard_indicador_generico.charts.area4.refresh();
            } else {
                vw_dashboard_indicador_generico.area4_data = {};
                vw_dashboard_indicador_generico.area4_data = {
                    legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                    down: ['No existen datos para la selección'],
                    data: vw_dashboard_indicador_generico.prototipos
                };
                vw_dashboard_indicador_generico.actualizacion = moment().format('DD/MM/YYYY h:mm');
                vw_dashboard_indicador_generico.refreshAngular();
                vw_dashboard_indicador_generico.charts.area4.refresh();
            }
        } else {
            vw_dashboard_indicador_generico.area4_data = {};
            vw_dashboard_indicador_generico.area4_data = {
                legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                down: ['Este departamento no contiene Indicadores'],
                data: vw_dashboard_indicador_generico.prototipos
            };
            vw_dashboard_indicador_generico.actualizacion = moment().format('DD/MM/YYYY h:mm');
            vw_dashboard_indicador_generico.refreshAngular();
            vw_dashboard_indicador_generico.charts.area4.refresh();
        }
        setTimeout(function () {
            animation.stoploading(`#graficos`, ``);
        }, 1000)
    };
    vw_dashboard_indicador_generico.getIndicadores = function () {

        vw_dashboard_indicador_generico.condition = [
            {
                field: "compania",
                value: vw_dashboard_indicador_generico.compania_id,
            }
        ];


        // var usersss = new SESSION().current();
        vw_dashboard_genericosgrid_indicadores.changeFilter([
            {
                field: !vw_dashboard_indicador_generico.session.institucion ? "compania" : "entidad",
                value: !vw_dashboard_indicador_generico.session.institucion ? vw_dashboard_indicador_generico.session.compania_id :  vw_dashboard_indicador_generico.session.institucion
            }]);
        setTimeout(function () {
            animation.stoploading(`#graficos`, ``);
        }, 1000)
    };
    vw_dashboard_indicador_generico.getAll = function () {
        animation.loading(`#graficos`, "", ``, '60');
        vw_dashboard_indicador_generico.getIndicadores();
        vw_dashboard_indicador_generico.callDataLinea();
    };
    vw_dashboard_indicador_generico.callDataLinea();
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
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});