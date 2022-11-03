app.controller("reporte_indicador_config", function ($scope, $http, $compile) {
    reporte_indicador_config = this;
    reporte_indicador_config.session = new SESSION().current();
    reporte_indicador_config.fixFilters = [
        {
            "field": "compania",
            "value": reporte_indicador_config.session.compania_id
        }
    ];
    //reporte_indicador_config.singular = "singular";
    //reporte_indicador_config.plural = "plural";
    reporte_indicador_config.headertitle = "Configuración de Ponderaciones";
    //reporte_indicador_config.destroyForm = false;
    //reporte_indicador_config.permissionTable = "tabletopermission";
    RUNCONTROLLER("reporte_indicador_config", reporte_indicador_config, $scope, $http, $compile);
    reporte_indicador_config.formulary = function (data, mode, defaultData) {
        if (reporte_indicador_config !== undefined) {
            RUN_B("reporte_indicador_config", reporte_indicador_config, $scope, $http, $compile);
            reporte_indicador_config.form.modalWidth = ENUM.modal.width.full;
            reporte_indicador_config.form.readonly = {compania: reporte_indicador_config.session.compania_id};
            reporte_indicador_config.createForm(data, mode, defaultData);
            $scope.$watch("reporte_indicador_config.tipo_meta", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(reporte_indicador_config, 'tipo_meta', rules);
            });
            $scope.$watch("reporte_indicador_config.titulo", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(reporte_indicador_config, 'titulo', rules);
            });
            $scope.$watch("reporte_indicador_config.color", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(reporte_indicador_config, 'color', rules);
            });
            $scope.$watch("reporte_indicador_config.from", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(reporte_indicador_config, 'from', rules);
            });
            $scope.$watch("reporte_indicador_config.to", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(reporte_indicador_config, 'to', rules);
            });
            $scope.$watch("reporte_indicador_config.orden", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(reporte_indicador_config, 'orden', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("reporte_indicador_config.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(reporte_indicador_config, 'compania', rules);
            });
        }
    };
    reporte_indicador_config.triggers.table.after.load = function (records) {
        reporte_indicador_config.runMagicColum('tipo_meta', 'tipoMeta', "id", "nombre");
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    };
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
    reporte_indicador_config.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        var validatett = await BASEAPI.firstp("reporte_indicador_config", {
            where: [
                {
                    field: "orden",
                    operator: "=",
                    value: data.inserting.orden
                },
                {
                    field: 'tipo_meta',
                    operator: '=',
                    value: reporte_indicador_config.tipo_meta
                },
                {
                    field: "compania",
                    operator: "=",
                    value: reporte_indicador_config.session.compania_id
                }
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya xiste una ponderación con el orden: " + data.inserting.orden
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        var exist = await BASEAPI.listp("reporte_indicador_config", {
            where: [
                {
                    field: 'compania',
                    value: reporte_indicador_config.session.compania_id
                },
                {
                    field: 'tipo_meta',
                    operator: '=',
                    value: reporte_indicador_config.tipo_meta
                },
                {
                    open: '((',
                    field: "$" + data.inserting.from,
                    operator: 'BETWEEN',
                    value: "$ `from` and `to`"
                },
                {
                    field: "$" + data.inserting.from,
                    operator: 'BETWEEN',
                    connector: "OR",
                    value: "$ `from` and `to`",
                    close: ')'
                },
                {
                    open: '(',
                    field: "$" + data.inserting.to,
                    operator: 'BETWEEN',
                    value: "$ `from` and `to`"
                },
                {
                    field: "$" + data.inserting.to,
                    operator: 'BETWEEN',
                    value: "$ `from` and `to`",
                    close: '))'
                }
            ]
        });
        if (exist.data)
            if (exist.data.length) {
                SWEETALERT.show({
                    type: 'warning',
                    message: `El rango desde y hasta interfiere con la ponderación "${exist.data[0].titulo}"`
                });
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
            }
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    reporte_indicador_config.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        var validatett = await BASEAPI.firstp("reporte_indicador_config", {
            where: [
                {
                    field: 'id',
                    operator: '!=',
                    value: reporte_indicador_config.id
                },
                {
                    field: "orden",
                    operator: "=",
                    value: data.updating.orden
                },
                {
                    field: 'tipo_meta',
                    operator: '=',
                    value: reporte_indicador_config.tipo_meta
                },
                {
                    field: "compania",
                    operator: "=",
                    value: reporte_indicador_config.session.compania_id
                }
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya xiste una ponderación con el orden: " + data.updating.orden
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        var exist = await BASEAPI.listp("reporte_indicador_config", {
            where: [
                {
                    field: 'id',
                    operator: '!=',
                    value: reporte_indicador_config.id
                },
                {
                    field: 'compania',
                    value: new SESSION().current().compania_id
                },
                {
                    field: 'tipo_meta',
                    operator: '=',
                    value: reporte_indicador_config.tipo_meta
                },
                {
                    open: '((',
                    field: "$" + data.updating.from,
                    operator: 'BETWEEN',
                    value: "$ `from` and `to`"
                },
                {
                    field: "$" + data.updating.from,
                    operator: 'BETWEEN',
                    connector: "OR",
                    value: "$ `from` and `to`",
                    close: ')'
                },
                {
                    open: '(',
                    field: "$" + data.updating.to,
                    operator: 'BETWEEN',
                    value: "$ `from` and `to`"
                },
                {
                    field: "$" + data.updating.to,
                    operator: 'BETWEEN',
                    value: "$ `from` and `to`",
                    close: '))'
                }
            ]
        });
        if (exist.data)
            if (exist.data.length) {
                SWEETALERT.show({
                    type: 'warning',
                    message: `El rango desde y hasta interfiere con la ponderación"${exist.data[0].titulo}"`
                });
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
            }
        resolve(true);
    });
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