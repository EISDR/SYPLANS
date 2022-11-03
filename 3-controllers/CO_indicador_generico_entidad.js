app.controller("indicador_generico_entidad", function ($scope, $http, $compile) {
    indicador_generico_entidad = this;
    //indicador_generico_entidad.fixFilters = [];
    //indicador_generico_entidad.singular = "singular";
    //indicador_generico_entidad.plural = "plural";
    //indicador_generico_entidad.headertitle = "Hola Title";
    //indicador_generico_entidad.destroyForm = false;
    //indicador_generico_entidad.permissionTable = "tabletopermission";
    RUNCONTROLLER("indicador_generico_entidad", indicador_generico_entidad, $scope, $http, $compile);
    indicador_generico_entidad.formulary = function (data, mode, defaultData) {
        if (indicador_generico_entidad !== undefined) {
            RUN_B("indicador_generico_entidad", indicador_generico_entidad, $scope, $http, $compile);
            indicador_generico_entidad.form.modalWidth = ENUM.modal.width.full;
            indicador_generico_entidad.form.readonly = {};
            indicador_generico_entidad.createForm(data, mode, defaultData);
            $scope.$watch("indicador_generico_entidad.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_generico_entidad, 'name', rules);
            });
            $scope.$watch("indicador_generico_entidad.table_", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_generico_entidad, 'table_', rules);
            });
            $scope.$watch("indicador_generico_entidad.where", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_generico_entidad, 'where', rules);
            });
            $scope.$watch("indicador_generico_entidad.label", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_generico_entidad, 'label', rules);
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