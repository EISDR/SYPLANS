app.controller("proyecto_actividad_estatus", function ($scope, $http, $compile) {
    proyecto_actividad_estatus = this;
    //proyecto_actividad_estatus.fixFilters = [];
    proyecto_actividad_estatus.singular = "Estatus";
    proyecto_actividad_estatus.plural = "Estatus";
    //proyecto_actividad_estatus.headertitle = "Hola Title";
    //proyecto_actividad_estatus.destroyForm = false;
    //proyecto_actividad_estatus.permissionTable = "tabletopermission";
    RUNCONTROLLER("proyecto_actividad_estatus", proyecto_actividad_estatus, $scope, $http, $compile);
    proyecto_actividad_estatus.formulary = function (data, mode, defaultData) {
        if (proyecto_actividad_estatus !== undefined) {
            RUN_B("proyecto_actividad_estatus", proyecto_actividad_estatus, $scope, $http, $compile);
            proyecto_actividad_estatus.form.modalWidth = ENUM.modal.width.full;
            proyecto_actividad_estatus.form.titles = {
                new: "Nuevo Estatus de Actividad para Proyectos",
                edit: "Editar Actividad para Proyecto",
                view: "Ver"
            };
            proyecto_actividad_estatus.form.readonly = {};
            proyecto_actividad_estatus.createForm(data, mode, defaultData);
            $scope.$watch("proyecto_actividad_estatus.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_estatus, 'nombre', rules);
            });
            $scope.$watch("proyecto_actividad_estatus.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad_estatus, 'descripcion', rules);
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
