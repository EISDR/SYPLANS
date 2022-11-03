app.controller("proyecto_estatus", function ($scope, $http, $compile) {
    proyecto_estatus = this;
    //proyecto_estatus.fixFilters = [];
    proyecto_estatus.singular = "Estatus";
    proyecto_estatus.plural = "Estatus";
    //proyecto_estatus.headertitle = "Hola Title";
    //proyecto_estatus.destroyForm = false;
    //proyecto_estatus.permissionTable = "tabletopermission";
    RUNCONTROLLER("proyecto_estatus", proyecto_estatus, $scope, $http, $compile);
    proyecto_estatus.formulary = function (data, mode, defaultData) {
        if (proyecto_estatus !== undefined) {
            RUN_B("proyecto_estatus", proyecto_estatus, $scope, $http, $compile);
            proyecto_estatus.form.titles = {
                new: "Nuevo Estatus de Proyecto",
                edit: "Editar Estatus de Proyecto",
                view: "Ver"
            };
            proyecto_estatus.form.modalWidth = ENUM.modal.width.full;
            proyecto_estatus.form.readonly = {};
            proyecto_estatus.createForm(data, mode, defaultData);
            $scope.$watch("proyecto_estatus.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_estatus, 'nombre', rules);
            });
            $scope.$watch("proyecto_estatus.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_estatus, 'descripcion', rules);
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
