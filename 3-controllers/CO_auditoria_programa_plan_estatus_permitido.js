app.controller("auditoria_programa_plan_estatus_permitido", function ($scope, $http, $compile) {
    auditoria_programa_plan_estatus_permitido = this;
    //auditoria_programa_plan_estatus_permitido.fixFilters = [];
    //auditoria_programa_plan_estatus_permitido.singular = "singular";
    //auditoria_programa_plan_estatus_permitido.plural = "plural";
    //auditoria_programa_plan_estatus_permitido.headertitle = "Hola Title";
    //auditoria_programa_plan_estatus_permitido.destroyForm = false;
    //auditoria_programa_plan_estatus_permitido.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_programa_plan_estatus_permitido", auditoria_programa_plan_estatus_permitido, $scope, $http, $compile);
    auditoria_programa_plan_estatus_permitido.formulary = function (data, mode, defaultData) {
        if (auditoria_programa_plan_estatus_permitido !== undefined) {
            RUN_B("auditoria_programa_plan_estatus_permitido", auditoria_programa_plan_estatus_permitido, $scope, $http, $compile);
            auditoria_programa_plan_estatus_permitido.form.modalWidth = ENUM.modal.width.full;
            auditoria_programa_plan_estatus_permitido.form.readonly = {};
            auditoria_programa_plan_estatus_permitido.createForm(data, mode, defaultData);
            $scope.$watch("auditoria_programa_plan_estatus_permitido.estatus_permitido", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_estatus_permitido, 'estatus_permitido', rules);
            });
            $scope.$watch("auditoria_programa_plan_estatus_permitido.plan_status", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_estatus_permitido, 'plan_status', rules);
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