app.controller("plan_precio_frecuencia", function ($scope, $http, $compile) {
    plan_precio_frecuencia = this;
    //plan_precio_frecuencia.fixFilters = [];
    //plan_precio_frecuencia.singular = "singular";
    //plan_precio_frecuencia.plural = "plural";
    //plan_precio_frecuencia.headertitle = "Hola Title";
    //plan_precio_frecuencia.destroyForm = false;
    //plan_precio_frecuencia.permissionTable = "tabletopermission";
    RUNCONTROLLER("plan_precio_frecuencia", plan_precio_frecuencia, $scope, $http, $compile);
    plan_precio_frecuencia.formulary = function (data, mode, defaultData) {
        if (plan_precio_frecuencia !== undefined) {
            RUN_B("plan_precio_frecuencia", plan_precio_frecuencia, $scope, $http, $compile);
            plan_precio_frecuencia.form.modalWidth = ENUM.modal.width.full;
            plan_precio_frecuencia.form.readonly = {};
            plan_precio_frecuencia.createForm(data, mode, defaultData);
            $scope.$watch("plan_precio_frecuencia.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_precio_frecuencia, 'nombre', rules);
            });
            $scope.$watch("plan_precio_frecuencia.calculo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_precio_frecuencia, 'calculo', rules);
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