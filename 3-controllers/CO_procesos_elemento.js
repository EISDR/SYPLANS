app.controller("procesos_elemento", function ($scope, $http, $compile) {
    procesos_elemento = this;
    //procesos_elemento.fixFilters = [];
    //procesos_elemento.singular = "singular";
    //procesos_elemento.plural = "plural";
    procesos_elemento.headertitle = "Elementos del Proceso";
    //procesos_elemento.destroyForm = false;
    //procesos_elemento.permissionTable = "tabletopermission";
    RUNCONTROLLER("procesos_elemento", procesos_elemento, $scope, $http, $compile);
    procesos_elemento.formulary = function (data, mode, defaultData) {
        if (procesos_elemento !== undefined) {
            RUN_B("procesos_elemento", procesos_elemento, $scope, $http, $compile);
            procesos_elemento.form.modalWidth = ENUM.modal.width.full;
            procesos_elemento.form.readonly = {};
            procesos_elemento.form.titles = {
                new: "Nuevo Elemento del Proceso",
                edit: "Editar Elemento del Proceso"
            };
            procesos_elemento.createForm(data, mode, defaultData);
            $scope.$watch("procesos_elemento.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(procesos_elemento, 'nombre', rules);
            });
            $scope.$watch("procesos_elemento.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(procesos_elemento, 'descripcion', rules);
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
