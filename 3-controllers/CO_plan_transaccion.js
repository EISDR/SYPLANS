app.controller("plan_transaccion", function ($scope, $http, $compile) {
    plan_transaccion = this;
    //plan_transaccion.fixFilters = [];
    //plan_transaccion.singular = "singular";
    //plan_transaccion.plural = "plural";
    //plan_transaccion.headertitle = "Hola Title";
    //plan_transaccion.destroyForm = false;
    //plan_transaccion.permissionTable = "tabletopermission";
    RUNCONTROLLER("plan_transaccion", plan_transaccion, $scope, $http, $compile);
    plan_transaccion.formulary = function (data, mode, defaultData) {
        if (plan_transaccion !== undefined) {
            RUN_B("plan_transaccion", plan_transaccion, $scope, $http, $compile);
            plan_transaccion.form.modalWidth = ENUM.modal.width.full;
            plan_transaccion.form.readonly = {};
            plan_transaccion.createForm(data, mode, defaultData);
            $scope.$watch("plan_transaccion.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'nombre', rules);
            });
            $scope.$watch("plan_transaccion.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'descripcion', rules);
            });
            $scope.$watch("plan_transaccion.features", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'features', rules);
            });
            $scope.$watch("plan_transaccion.pacc", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'pacc', rules);
            });
            $scope.$watch("plan_transaccion.riesgo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'riesgo', rules);
            });
            $scope.$watch("plan_transaccion.privada", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'privada', rules);
            });
            $scope.$watch("plan_transaccion.multianual", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'multianual', rules);
            });
            $scope.$watch("plan_transaccion.cantidad_usuario_departamental", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'cantidad_usuario_departamental', rules);
            });
            $scope.$watch("plan_transaccion.cantidad_usuario_planificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'cantidad_usuario_planificacion', rules);
            });
            $scope.$watch("plan_transaccion.cantidad_admin", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'cantidad_admin', rules);
            });
            $scope.$watch("plan_transaccion.multiinstitucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'multiinstitucion', rules);
            });
            $scope.$watch("plan_transaccion.creacion_poa_flexibles", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'creacion_poa_flexibles', rules);
            });
            $scope.$watch("plan_transaccion.evidencias_flexibles", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'evidencias_flexibles', rules);
            });
            $scope.$watch("plan_transaccion.frecuencia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'frecuencia', rules);
            });
            $scope.$watch("plan_transaccion.monto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'monto', rules);
            });
            $scope.$watch("plan_transaccion.monto_inicial", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'monto_inicial', rules);
            });
            $scope.$watch("plan_transaccion.descuento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'descuento', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("plan_transaccion.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'compania', rules);
            });
            $scope.$watch("plan_transaccion.end_date", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'end_date', rules);
            });
            $scope.$watch("plan_transaccion.date", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'date', rules);
            });
            $scope.$watch("plan_transaccion.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion, 'estatus', rules);
            });
        }
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