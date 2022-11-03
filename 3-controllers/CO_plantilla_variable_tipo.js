app.controller("plantilla_variable_tipo", function ($scope, $http, $compile) {
    plantilla_variable_tipo = this;
    //plantilla_variable_tipo.fixFilters = [];
    //plantilla_variable_tipo.singular = "singular";
    //plantilla_variable_tipo.plural = "plural";
    //plantilla_variable_tipo.headertitle = "Hola Title";
    //plantilla_variable_tipo.destroyForm = false;
    //plantilla_variable_tipo.permissionTable = "tabletopermission";
    RUNCONTROLLER("plantilla_variable_tipo", plantilla_variable_tipo, $scope, $http, $compile);
    plantilla_variable_tipo.formulary = function (data, mode, defaultData) {
        if (plantilla_variable_tipo !== undefined) {
            RUN_B("plantilla_variable_tipo", plantilla_variable_tipo, $scope, $http, $compile);
            plantilla_variable_tipo.form.modalWidth = ENUM.modal.width.full;
            plantilla_variable_tipo.form.readonly = {};
            plantilla_variable_tipo.createForm(data, mode, defaultData);
            $scope.$watch("plantilla_variable_tipo.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plantilla_variable_tipo, 'nombre', rules);
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