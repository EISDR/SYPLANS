app.controller("ficha_indicador", function ($scope, $http, $compile) {
    ficha_indicador = this;
    //ficha_indicador.fixFilters = [];
    //ficha_indicador.singular = "singular";
    //ficha_indicador.plural = "plural";
    //ficha_indicador.headertitle = "Hola Title";
    //ficha_indicador.destroyForm = false;
    //ficha_indicador.permissionTable = "tabletopermission";
    ficha_indicador.session = new SESSION().current();
    RUNCONTROLLER("ficha_indicador", ficha_indicador, $scope, $http, $compile);
    RUN_B("ficha_indicador", ficha_indicador, $scope, $http, $compile);
    var monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    $scope.$watch('dashboard_cofiguration.vw_dashboard_poas', function (value) {
        if (value === '[NULL]')
            return;
    });
    ficha_indicador.formulary = function (data, mode, defaultData) {
        if (ficha_indicador !== undefined) {
            ficha_indicador.form.modalWidth = ENUM.modal.width.full;
            ficha_indicador.form.readonly = {};
            ficha_indicador.createForm(data, mode, defaultData);
            // ficha_indicador.$watch("ficha_indicador.tipo_meta", function (value) {
            //     var rules = [];
            //     ficha_indicador.unidad_medida =
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(ficha_indicador, 'tipo_meta', rules);
            // });
        }
    };
    ficha_indicador.getIndicador_info = async function (type, indicador) {
        console.log("Entre", type, indicador);
        ficha_indicador.eltype = type;
        console.log("Coniooooo", ficha_indicador.eltype, indicador);
        if (type == "indicador pei") {
            var indicador = await BASEAPI.firstp('vw_indicador_pei_2', {
                where: [
                    {
                        field: "id",
                        value: indicador
                    }
                ]
            });
            ficha_indicador.monitoreo = "Anual";
            ficha_indicador.dataIndicador = indicador;
            ficha_indicador.dataIndicador.departamento_nombre = ficha_indicador.dataIndicador.unidad_ejecutora_nombre || ficha_indicador.session.departamento_nombre;
            ficha_indicador.newArray = [
                {
                    periodo: ficha_indicador.dataIndicador.ano_meta,
                    valor: ficha_indicador.dataIndicador.valor_meta
                }
            ];
            ficha_indicador.rowspan = ficha_indicador.newArray.length + 1;
            ficha_indicador.tipo_meta = indicador.tipo_meta + "";
            ficha_indicador.form.loadDropDown('tipo_meta');
            ficha_indicador.refreshAngular();
        } else if (type == "indicador generico") {

            var metas = await BASEAPI.listp('indicador_generico_periodo', {
                limit: 0,
                where: [
                    {
                        field: "indicador_generico",
                        value: indicador
                    }
                ]
            });
            ficha_indicador.metas = metas.data;
            var indicador = await BASEAPI.firstp('vw_indicador_generico', {
                where: [
                    {
                        field: "id",
                        value: indicador
                    }
                ]
            });
            var monthNames = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            BASEAPI.firstp('vw_dashboard_meses', {where: [{value: indicador.poa}]}).then(function (result) {
                var data = [];
                if (result !== undefined) {
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
                    ficha_indicador.monitoreo = result.nombre_monitoreo;
                    ficha_indicador.form.options.periodos.data = data;
                    if (data.length > 0) {
                        ficha_indicador.newArray = [];
                        ficha_indicador.newObject = {};
                        for (var i in ficha_indicador.metas) {
                            ficha_indicador.newObject = {};
                            ficha_indicador.newObject.periodo = data[i].name;
                            ficha_indicador.newObject.valor = ficha_indicador.metas[i].valor;
                            ficha_indicador.newArray.push(ficha_indicador.newObject);
                        }
                        ficha_indicador.rowspan = ficha_indicador.newArray.length + 1;
                        ficha_indicador.refreshAngular();
                        ficha_indicador.form.loadDropDown('periodos');
                    }
                }
            });
            ficha_indicador.dataIndicador = indicador;
            ficha_indicador.dataIndicador.ano_meta = null;
            ficha_indicador.tipo_meta = indicador.tipo_meta + "";
            ficha_indicador.form.loadDropDown('tipo_meta');
            ficha_indicador.eltype = "indicador generico";
            ficha_indicador.refreshAngular();
        } else if (type == "indicador poa") {
            var metas = await BASEAPI.listp('indicador_poa_periodo', {
                limit: 0,
                where: [
                    {
                        field: "indicador_poa",
                        value: indicador
                    }
                ]
            });
            ficha_indicador.metas = metas.data;
            var indicador = await BASEAPI.firstp('vw_indicador_poa_2', {
                where: [
                    {
                        field: "id",
                        value: indicador
                    }
                ]
            });
            var monthNames = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            BASEAPI.firstp('vw_dashboard_meses', {where: [{value: indicador.poa}]}).then(function (result) {
                var data = [];
                if (result !== undefined) {
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
                    ficha_indicador.monitoreo = result.nombre_monitoreo;
                    ficha_indicador.form.options.periodos.data = data;
                    if (data.length > 0) {
                        ficha_indicador.newArray = [];
                        ficha_indicador.newObject = {};
                        for (var i in ficha_indicador.metas) {
                            ficha_indicador.newObject = {};
                            ficha_indicador.newObject.periodo = data[i].name;
                            ficha_indicador.newObject.valor = ficha_indicador.metas[i].valor;
                            ficha_indicador.newArray.push(ficha_indicador.newObject);
                        }
                        ficha_indicador.rowspan = ficha_indicador.newArray.length + 1;
                        ficha_indicador.refreshAngular();
                        ficha_indicador.form.loadDropDown('periodos');
                    }
                }
            });
            ficha_indicador.dataIndicador = indicador;
            ficha_indicador.dataIndicador.ano_meta = null;
            ficha_indicador.tipo_meta = indicador.tipo_meta + "";
            ficha_indicador.form.loadDropDown('tipo_meta');
            ficha_indicador.refreshAngular();
        } else if (type == "indicador actividad") {
            var metas = await BASEAPI.listp('indicador_actividad_periodo', {
                limit: 0,
                where: [
                    {
                        field: "indicador_actividad",
                        value: indicador
                    }
                ]
            });
            ficha_indicador.metas = metas.data;
            var indicador = await BASEAPI.firstp('vw_indicador_actividad_2', {
                where: [
                    {
                        field: "id",
                        value: indicador
                    }
                ]
            });
            var monthNames = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            BASEAPI.firstp('vw_dashboard_meses', {where: [{value: indicador.poa}]}).then(function (result) {
                var data = [];
                if (result !== undefined) {
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
                    ficha_indicador.monitoreo = result.nombre_monitoreo;
                    ficha_indicador.form.options.periodos.data = data;
                    if (data.length > 0) {
                        ficha_indicador.newArray = [];
                        ficha_indicador.newObject = {};
                        for (var i in ficha_indicador.metas) {
                            ficha_indicador.newObject = {};
                            ficha_indicador.newObject.periodo = data[i].name;
                            ficha_indicador.newObject.valor = ficha_indicador.metas[i].valor;
                            ficha_indicador.newArray.push(ficha_indicador.newObject);
                        }
                        ficha_indicador.rowspan = ficha_indicador.newArray.length + 1;
                        ficha_indicador.refreshAngular();
                        ficha_indicador.form.loadDropDown('periodos');
                    }
                }
            });
            ficha_indicador.dataIndicador = indicador;
            ficha_indicador.dataIndicador.ano_meta = null;
            ficha_indicador.tipo_meta = indicador.tipo_meta + "";
            ficha_indicador.form.loadDropDown('tipo_meta');
            ficha_indicador.refreshAngular();
        }
    }
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