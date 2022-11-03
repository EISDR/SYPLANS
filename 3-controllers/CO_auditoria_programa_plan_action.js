app.controller("auditoria_programa_plan_action", function ($scope, $http, $compile) {
    auditoria_programa_plan_action = this;
    //auditoria_programa_plan_action.fixFilters = [];
    auditoria_programa_plan_action.singular = "Acción";
    auditoria_programa_plan_action.plural = "Acciones";
    auditoria_programa_plan_action.headertitle = "Acciones";
    //auditoria_programa_plan_action.destroyForm = false;
    //auditoria_programa_plan_action.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_programa_plan_action", auditoria_programa_plan_action, $scope, $http, $compile);
    auditoria_programa_plan_action.formulary = function (data, mode, defaultData) {
        if (auditoria_programa_plan_action !== undefined) {
            RUN_B("auditoria_programa_plan_action", auditoria_programa_plan_action, $scope, $http, $compile);
            auditoria_programa_plan_action.form.modalWidth = ENUM.modal.width.full;
            auditoria_programa_plan_action.form.readonly = {};
            auditoria_programa_plan_action.form.titles = {
                new: "Nueva Acción",
                edit: "Editar Acción",
                view: "Ver Acción"
            };
            auditoria_programa_plan_action.createForm(data, mode, defaultData);
            if (mode === "new") {
                delete auditoria_programa_plan_action.id;
            }
            $scope.$watch("auditoria_programa_plan_action.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_action, 'nombre', rules);
            });
            $scope.$watch("auditoria_programa_plan_action.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_action, 'descripcion', rules);
            });
            $scope.$watch("auditoria_programa_plan_action.entidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_action, 'entidad', rules);
            });
            $scope.$watch("auditoria_programa_plan_action.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_action, 'tempid', rules);
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
