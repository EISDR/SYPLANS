app.controller("auditoria_solicitud_proceso", function ($scope, $http, $compile) {
    auditoria_solicitud_proceso = this;
    //auditoria_solicitud_proceso.fixFilters = [];
    //auditoria_solicitud_proceso.singular = "singular";
    //auditoria_solicitud_proceso.plural = "plural";
    //auditoria_solicitud_proceso.headertitle = "Hola Title";
    //auditoria_solicitud_proceso.destroyForm = false;
    //auditoria_solicitud_proceso.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_solicitud_proceso", auditoria_solicitud_proceso, $scope, $http, $compile);
    auditoria_solicitud_proceso.formulary = function (data, mode, defaultData) {
        if (auditoria_solicitud_proceso !== undefined) {
            RUN_B("auditoria_solicitud_proceso", auditoria_solicitud_proceso, $scope, $http, $compile);
            auditoria_solicitud_proceso.form.modalWidth = ENUM.modal.width.full;
            auditoria_solicitud_proceso.form.readonly = {};
            auditoria_solicitud_proceso.createForm(data, mode, defaultData);
            //ms_product.selectQueries['auditoria_solicitud'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("auditoria_solicitud_proceso.auditoria_solicitud", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_solicitud_proceso, 'auditoria_solicitud', rules);
            });
            $scope.$watch("auditoria_solicitud_proceso.proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_solicitud_proceso, 'proceso', rules);
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