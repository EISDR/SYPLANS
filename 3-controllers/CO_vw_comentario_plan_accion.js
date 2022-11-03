app.controller("vw_comentario_plan_accion", function ($scope, $http, $compile) {
    vw_comentario_plan_accion = this;
    //vw_comentario_plan_accion.fixFilters = [];
    vw_comentario_plan_accion.singular = "Comentarios";
    vw_comentario_plan_accion.plural = "Comentarios";
    vw_comentario_plan_accion.headertitle = "Comentarios";
    //vw_comentario_plan_accion.destroyForm = false;
    //vw_comentario_plan_accion.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_comentario_plan_accion", vw_comentario_plan_accion, $scope, $http, $compile);
    vw_comentario_plan_accion.formulary = function (data, mode, defaultData) {
        if (vw_comentario_plan_accion !== undefined) {
            RUN_B("vw_comentario_plan_accion", vw_comentario_plan_accion, $scope, $http, $compile);
            vw_comentario_plan_accion.form.modalWidth = ENUM.modal.width.full;
            vw_comentario_plan_accion.form.readonly = {};
            vw_comentario_plan_accion.createForm(data, mode, defaultData);
            $scope.$watch("vw_comentario_plan_accion.comentario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentario_plan_accion, 'comentario', rules);
            });
            $scope.$watch("vw_comentario_plan_accion.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentario_plan_accion, 'type', rules);
            });
            $scope.$watch("vw_comentario_plan_accion.value", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentario_plan_accion, 'value', rules);
            });
            $scope.$watch("vw_comentario_plan_accion.value2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentario_plan_accion, 'value2', rules);
            });
            $scope.$watch("vw_comentario_plan_accion.value3", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentario_plan_accion, 'value3', rules);
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