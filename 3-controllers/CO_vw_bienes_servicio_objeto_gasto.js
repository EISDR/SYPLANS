app.controller("vw_bienes_servicio_objeto_gasto", function ($scope, $http, $compile) {
    vw_bienes_servicio_objeto_gasto = this;
    //vw_bienes_servicio_objeto_gasto.fixFilters = [];
    //vw_bienes_servicio_objeto_gasto.singular = "singular";
    //vw_bienes_servicio_objeto_gasto.plural = "plural";
    //vw_bienes_servicio_objeto_gasto.headertitle = "Hola Title";
    //vw_bienes_servicio_objeto_gasto.destroyForm = false;
    //vw_bienes_servicio_objeto_gasto.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_bienes_servicio_objeto_gasto", vw_bienes_servicio_objeto_gasto, $scope, $http, $compile);
    vw_bienes_servicio_objeto_gasto.formulary = function (data, mode, defaultData) {
        if (vw_bienes_servicio_objeto_gasto !== undefined) {
            RUN_B("vw_bienes_servicio_objeto_gasto", vw_bienes_servicio_objeto_gasto, $scope, $http, $compile);
            vw_bienes_servicio_objeto_gasto.form.modalWidth = ENUM.modal.width.full;
            vw_bienes_servicio_objeto_gasto.form.readonly = {};
            vw_bienes_servicio_objeto_gasto.createForm(data, mode, defaultData);
            $scope.$watch("vw_bienes_servicio_objeto_gasto.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_bienes_servicio_objeto_gasto, 'nombre', rules);
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