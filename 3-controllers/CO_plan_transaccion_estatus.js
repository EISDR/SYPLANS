app.controller("plan_transaccion_estatus", function ($scope, $http, $compile) {
    plan_transaccion_estatus = this;
    //plan_transaccion_estatus.fixFilters = [];
    //plan_transaccion_estatus.singular = "singular";
    //plan_transaccion_estatus.plural = "plural";
    //plan_transaccion_estatus.headertitle = "Hola Title";
    //plan_transaccion_estatus.destroyForm = false;
    //plan_transaccion_estatus.permissionTable = "tabletopermission";
    RUNCONTROLLER("plan_transaccion_estatus", plan_transaccion_estatus, $scope, $http, $compile);
    plan_transaccion_estatus.formulary = function (data, mode, defaultData) {
        if (plan_transaccion_estatus !== undefined) {
            RUN_B("plan_transaccion_estatus", plan_transaccion_estatus, $scope, $http, $compile);
            plan_transaccion_estatus.form.modalWidth = ENUM.modal.width.full;
            plan_transaccion_estatus.form.readonly = {};
            plan_transaccion_estatus.createForm(data, mode, defaultData);
            $scope.$watch("plan_transaccion_estatus.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion_estatus, 'nombre', rules);
            });
            $scope.$watch("plan_transaccion_estatus.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_transaccion_estatus, 'descripcion', rules);
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