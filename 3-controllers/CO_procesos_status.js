app.controller("procesos_status", function ($scope, $http, $compile) {
    procesos_status = this;
    //procesos_status.fixFilters = [];
    procesos_status.singular = "Estatus de Proceso";
    procesos_status.plural = "Estatus de Procesos";
    //procesos_status.headertitle = "Hola Title";
    //procesos_status.destroyForm = false;
    //procesos_status.permissionTable = "tabletopermission";
    RUNCONTROLLER("procesos_status", procesos_status, $scope, $http, $compile);
    procesos_status.formulary = function (data, mode, defaultData) {
        if (procesos_status !== undefined) {
            RUN_B("procesos_status", procesos_status, $scope, $http, $compile);
            procesos_status.form.modalWidth = ENUM.modal.width.full;
            procesos_status.form.titles = {
                new: "Nuevo Estatus de Proceso",
                edit: "Editar Estatus de Proceso",
                view: "Ver Estatus de Proceso"
            };
            procesos_status.form.readonly = {};
            procesos_status.createForm(data, mode, defaultData);
            $scope.$watch("procesos_status.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(procesos_status, 'nombre', rules);
            });
            $scope.$watch("procesos_status.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(procesos_status, 'descripcion', rules);
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
