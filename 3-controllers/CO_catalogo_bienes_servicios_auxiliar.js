app.controller("catalogo_bienes_servicios_auxiliar", function ($scope, $http, $compile) {
    catalogo_bienes_servicios_auxiliar = this;
    //catalogo_bienes_servicios_auxiliar.fixFilters = [];
    //catalogo_bienes_servicios_auxiliar.singular = "singular";
    //catalogo_bienes_servicios_auxiliar.plural = "plural";
    //catalogo_bienes_servicios_auxiliar.headertitle = "Hola Title";
    //catalogo_bienes_servicios_auxiliar.destroyForm = false;
    //catalogo_bienes_servicios_auxiliar.permissionTable = "tabletopermission";
    RUNCONTROLLER("catalogo_bienes_servicios_auxiliar", catalogo_bienes_servicios_auxiliar, $scope, $http, $compile);
    catalogo_bienes_servicios_auxiliar.formulary = function (data, mode, defaultData) {
        if (catalogo_bienes_servicios_auxiliar !== undefined) {
            RUN_B("catalogo_bienes_servicios_auxiliar", catalogo_bienes_servicios_auxiliar, $scope, $http, $compile);
            catalogo_bienes_servicios_auxiliar.form.modalWidth = ENUM.modal.width.full;
            catalogo_bienes_servicios_auxiliar.form.readonly = {};
            catalogo_bienes_servicios_auxiliar.createForm(data, mode, defaultData);
            $scope.$watch("catalogo_bienes_servicios_auxiliar.material", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(catalogo_bienes_servicios_auxiliar, 'material', rules);
            });
            $scope.$watch("catalogo_bienes_servicios_auxiliar.cuenta_auxiliar", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(catalogo_bienes_servicios_auxiliar, 'cuenta_auxiliar', rules);
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