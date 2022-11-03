app.controller("actividades_apoyo_estatus", function ($scope, $http, $compile) {
    actividades_apoyo_estatus = this;
    //actividades_apoyo_estatus.fixFilters = [];
    //actividades_apoyo_estatus.singular = "singular";
    //actividades_apoyo_estatus.plural = "plural";
    actividades_apoyo_estatus.headertitle = "Estatus";
    //actividades_apoyo_estatus.destroyForm = false;
    //actividades_apoyo_estatus.permissionTable = "tabletopermission";
    RUNCONTROLLER("actividades_apoyo_estatus", actividades_apoyo_estatus, $scope, $http, $compile);
    actividades_apoyo_estatus.formulary = function (data, mode, defaultData) {
        if (actividades_apoyo_estatus !== undefined) {
            RUN_B("actividades_apoyo_estatus", actividades_apoyo_estatus, $scope, $http, $compile);
            actividades_apoyo_estatus.form.modalWidth = ENUM.modal.width.full;
            actividades_apoyo_estatus.form.readonly = {};
            actividades_apoyo_estatus.createForm(data, mode, defaultData);
            $scope.$watch("actividades_apoyo_estatus.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(actividades_apoyo_estatus, 'nombre', rules);
            });
            $scope.$watch("actividades_apoyo_estatus.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(actividades_apoyo_estatus, 'descripcion', rules);
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