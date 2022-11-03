app.controller("auditoria_solicitud_status", function ($scope, $http, $compile) {
    auditoria_solicitud_status = this;
    //auditoria_solicitud_status.fixFilters = [];
    auditoria_solicitud_status.singular = "Estatus de Solicitud para Auditoría";
    auditoria_solicitud_status.plural = "Estatus de Solicitud para Auditoría";
    //auditoria_solicitud_status.headertitle = "Hola Title";
    //auditoria_solicitud_status.destroyForm = false;
    //auditoria_solicitud_status.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_solicitud_status", auditoria_solicitud_status, $scope, $http, $compile);
    auditoria_solicitud_status.formulary = function (data, mode, defaultData) {
        if (auditoria_solicitud_status !== undefined) {
            RUN_B("auditoria_solicitud_status", auditoria_solicitud_status, $scope, $http, $compile);
            auditoria_solicitud_status.form.modalWidth = ENUM.modal.width.full;
            auditoria_solicitud_status.form.readonly = {};
            auditoria_solicitud_status.form.titles = {
                new: "Nueva Estatus de Solicitud para Auditoría",
                edit: "Editar Estatus de Solicitud para Auditoría",
                view: "Ver"
            };
            auditoria_solicitud_status.createForm(data, mode, defaultData);
            $scope.$watch("auditoria_solicitud_status.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_solicitud_status, 'nombre', rules);
            });
            $scope.$watch("auditoria_solicitud_status.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_solicitud_status, 'descripcion', rules);
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
