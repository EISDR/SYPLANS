app.controller("documentos_asociados_status", function ($scope, $http, $compile) {
    documentos_asociados_status = this;
    //documentos_asociados_status.fixFilters = [];
    documentos_asociados_status.singular = "Documento Asociado";
    documentos_asociados_status.plural = "Documentos Asociados";
    //documentos_asociados_status.headertitle = "Hola Title";
    //documentos_asociados_status.destroyForm = false;
    //documentos_asociados_status.permissionTable = "tabletopermission";
    RUNCONTROLLER("documentos_asociados_status", documentos_asociados_status, $scope, $http, $compile);
    documentos_asociados_status.formulary = function (data, mode, defaultData) {
        if (documentos_asociados_status !== undefined) {
            RUN_B("documentos_asociados_status", documentos_asociados_status, $scope, $http, $compile);
            documentos_asociados_status.form.modalWidth = ENUM.modal.width.full;
            documentos_asociados_status.form.readonly = {};
            documentos_asociados_status.form.titles = {
                new: "Nuevo Estatus de Documento Asociados",
                edit: "Editar Estatus de Documento Asociados",
                view: "Ver Estatus de Documento Asociados"
            };
            documentos_asociados_status.createForm(data, mode, defaultData);
            $scope.$watch("documentos_asociados_status.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_asociados_status, 'nombre', rules);
            });
            $scope.$watch("documentos_asociados_status.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_asociados_status, 'descripcion', rules);
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
