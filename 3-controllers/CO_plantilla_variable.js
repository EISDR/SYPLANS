app.controller("plantilla_variable", function ($scope, $http, $compile) {
    plantilla_variable = this;
    //plantilla_variable.fixFilters = [];
    plantilla_variable.singular = "Variable";
    plantilla_variable.plural = "Variables";
    plantilla_variable.headertitle = "Variables";
    //plantilla_variable.destroyForm = false;
    //plantilla_variable.permissionTable = "tabletopermission";
    RUNCONTROLLER("plantilla_variable", plantilla_variable, $scope, $http, $compile);
    plantilla_variable.formulary = function (data, mode, defaultData) {
        if (plantilla_variable !== undefined) {
            RUN_B("plantilla_variable", plantilla_variable, $scope, $http, $compile);
            plantilla_variable.form.modalWidth = ENUM.modal.width.full;
            plantilla_variable.form.readonly = {};
            plantilla_variable.form.titles = {
                new: "Agregar variable",
                edit: "Editar variable",
                view: "Ver variable"
            };
            plantilla_variable.createForm(data, mode, defaultData);
            $scope.$watch("plantilla_variable.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plantilla_variable, 'nombre', rules);
            });
            $scope.$watch("plantilla_variable.tipo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plantilla_variable, 'tipo', rules);
            });
            //ms_product.selectQueries['plantilla'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("plantilla_variable.plantilla", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plantilla_variable, 'plantilla', rules);
            });
            $scope.$watch("plantilla_variable.requerido", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plantilla_variable, 'requerido', rules);
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