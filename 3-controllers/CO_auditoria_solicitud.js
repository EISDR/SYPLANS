app.controller("auditoria_solicitud", function ($scope, $http, $compile) {
    auditoria_solicitud = this;
    //auditoria_solicitud.fixFilters = [];
    auditoria_solicitud.singular = "Solicitudes de Auditoría";
    auditoria_solicitud.plural = "Solicitud de Auditoría";
    auditoria_solicitud.session = new SESSION().current();
    //auditoria_solicitud.headertitle = "Hola Title";
    //auditoria_solicitud.destroyForm = false;
    //auditoria_solicitud.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_solicitud", auditoria_solicitud, $scope, $http, $compile);
    auditoria_solicitud.formulary = function (data, mode, defaultData) {
        if (auditoria_solicitud !== undefined) {
            RUN_B("auditoria_solicitud", auditoria_solicitud, $scope, $http, $compile);
            auditoria_solicitud.form.modalWidth = ENUM.modal.width.full;
            auditoria_solicitud.form.titles = {
                new: "Nueva Solicitud de Auditoría",
                edit: "Editar Solicitud de Auditoría",
                view: "Ver"
            };
            auditoria_solicitud.form.readonly = {};
            auditoria_solicitud.form.readonly = {compania: auditoria_solicitud.session.compania_id, institucion: auditoria_solicitud.session.institucion};
            auditoria_solicitud.createForm(data, mode, defaultData);
            $scope.$watch("auditoria_solicitud.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_solicitud, 'nombre', rules);
            });
            $scope.$watch("auditoria_solicitud.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_solicitud, 'descripcion', rules);
            });
            $scope.$watch("auditoria_solicitud.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_solicitud, 'estatus', rules);
            });
        }
    };
    auditoria_solicitud.triggers.table.after.load = function (records) {

    };
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
