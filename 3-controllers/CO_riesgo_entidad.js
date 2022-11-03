app.controller("riesgo_entidad", function ($scope, $http, $compile) {
    riesgo_entidad = this;
    //riesgo_entidad.fixFilters = [];
    //riesgo_entidad.singular = "singular";
    //riesgo_entidad.plural = "plural";
    //riesgo_entidad.headertitle = "Hola Title";
    //riesgo_entidad.destroyForm = false;
    //riesgo_entidad.permissionTable = "tabletopermission";
    RUNCONTROLLER("riesgo_entidad", riesgo_entidad, $scope, $http, $compile);
    riesgo_entidad.formulary = function (data, mode, defaultData) {
        if (riesgo_entidad !== undefined) {
            RUN_B("riesgo_entidad", riesgo_entidad, $scope, $http, $compile);
            riesgo_entidad.form.modalWidth = ENUM.modal.width.full;
            riesgo_entidad.form.readonly = {};
            riesgo_entidad.createForm(data, mode, defaultData);
            $scope.$watch("riesgo_entidad.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_entidad, 'name', rules);
            });
            $scope.$watch("riesgo_entidad.table_", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_entidad, 'table_', rules);
            });
            $scope.$watch("riesgo_entidad.where", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_entidad, 'where', rules);
            });
            $scope.$watch("riesgo_entidad.label", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_entidad, 'label', rules);
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