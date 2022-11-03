app.controller("auditoria_programa_plan_prioridad", function ($scope, $http, $compile) {
    auditoria_programa_plan_prioridad = this;
    auditoria_programa_plan_prioridad.session = new SESSION().current();
    auditoria_programa_plan_prioridad.fixFilters = [
        {
            field: "compania",
            value: auditoria_programa_plan_prioridad.session.compania_id
        },
        {
            "field": "institucion",
            "operator": auditoria_programa_plan_prioridad.session.institucion_id ? "=" : "is",
            "value":  auditoria_programa_plan_prioridad.session.institucion_id ?  auditoria_programa_plan_prioridad.session.institucion_id : "$null"
        }
    ];
    auditoria_programa_plan_prioridad.singular = "singular";
    auditoria_programa_plan_prioridad.plural = "plural";
    auditoria_programa_plan_prioridad.headertitle = "Prioridad de la Auditoría";
    //auditoria_programa_plan_prioridad.destroyForm = false;
    //auditoria_programa_plan_prioridad.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_programa_plan_prioridad", auditoria_programa_plan_prioridad, $scope, $http, $compile);
    auditoria_programa_plan_prioridad.formulary = function (data, mode, defaultData) {
        if (auditoria_programa_plan_prioridad !== undefined) {
            RUN_B("auditoria_programa_plan_prioridad", auditoria_programa_plan_prioridad, $scope, $http, $compile);
            auditoria_programa_plan_prioridad.form.modalWidth = ENUM.modal.width.full;
            auditoria_programa_plan_prioridad.form.readonly = {compania: auditoria_programa_plan_prioridad.session.compania_id, institucion: auditoria_programa_plan_prioridad.session.institucion};
            auditoria_programa_plan_prioridad.createForm(data, mode, defaultData);
            $scope.$watch("auditoria_programa_plan_prioridad.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_prioridad, 'nombre', rules);
            });
            $scope.$watch("auditoria_programa_plan_prioridad.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_prioridad, 'descripcion', rules);
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