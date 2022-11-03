app.controller("auditoria_programa_plan_action_function", function ($scope, $http, $compile) {
    auditoria_programa_plan_action_function = this;
    //auditoria_programa_plan_action_function.fixFilters = [];
    auditoria_programa_plan_action_function.singular = "Función o Característica";
    auditoria_programa_plan_action_function.plural = "Funciones y Características";
    auditoria_programa_plan_action_function.headertitle = "Funciones y Características";
    //auditoria_programa_plan_action_function.destroyForm = false;
    //auditoria_programa_plan_action_function.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_programa_plan_action_function", auditoria_programa_plan_action_function, $scope, $http, $compile);
    auditoria_programa_plan_action_function.formulary = function (data, mode, defaultData) {
        if (auditoria_programa_plan_action_function !== undefined) {
            RUN_B("auditoria_programa_plan_action_function", auditoria_programa_plan_action_function, $scope, $http, $compile);
            auditoria_programa_plan_action_function.form.modalWidth = ENUM.modal.width.full;
            auditoria_programa_plan_action_function.form.readonly = {};
            auditoria_programa_plan_action_function.form.titles = {
                new: "Nueva Función o Característica",
                edit: "Editar Función o Característica",
                view: "Ver Función o Característica"
            };
            if (mode === "new") {
                delete auditoria_programa_plan_action_function.id;
            }
            auditoria_programa_plan_action_function.createForm(data, mode, defaultData);
            $scope.$watch("auditoria_programa_plan_action_function.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_action_function, 'nombre', rules);
            });
            $scope.$watch("auditoria_programa_plan_action_function.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_action_function, 'descripcion', rules);
            });
            $scope.$watch("auditoria_programa_plan_action_function.actionid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_action_function, 'actionid', rules);
            });
            $scope.$watch("auditoria_programa_plan_action_function.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_action_function, 'tempid', rules);
            });
            $scope.$watch("auditoria_programa_plan_action_function.addconditions", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_action_function, 'addconditions', rules);
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
