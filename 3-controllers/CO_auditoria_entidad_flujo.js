app.controller("auditoria_entidad_flujo", function ($scope, $http, $compile) {
    auditoria_entidad_flujo = this;
    //auditoria_entidad_flujo.fixFilters = [];
    auditoria_entidad_flujo.singular = "singular";
    auditoria_entidad_flujo.plural = "plural";
    auditoria_entidad_flujo.headertitle = "Entidades";
    //auditoria_entidad_flujo.destroyForm = false;
    //auditoria_entidad_flujo.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_entidad_flujo", auditoria_entidad_flujo, $scope, $http, $compile);
    RUN_B("auditoria_entidad_flujo", auditoria_entidad_flujo, $scope, $http, $compile);
    auditoria_entidad_flujo.formulary = function (data, mode, defaultData) {
        if (auditoria_entidad_flujo !== undefined) {
            RUN_B("auditoria_entidad_flujo", auditoria_entidad_flujo, $scope, $http, $compile);
            auditoria_entidad_flujo.form.modalWidth = ENUM.modal.width.full;
            auditoria_entidad_flujo.form.readonly = {};
            auditoria_entidad_flujo.createForm(data, mode, defaultData);
            $scope.$watch("auditoria_entidad_flujo.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_entidad_flujo, 'nombre', rules);
            });
            $scope.$watch("auditoria_entidad_flujo.controller", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_entidad_flujo, 'controller', rules);
            });
            $scope.$watch("auditoria_entidad_flujo.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_entidad_flujo, 'descripcion', rules);
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