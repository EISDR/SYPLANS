app.controller("programa_objetivo", function ($scope, $http, $compile) {
    programa_objetivo = this;
    //programa_objetivo.fixFilters = [];
    programa_objetivo.session = new SESSION().current();
    //programa_objetivo.fixFilters = [{
    //    field: "compania",
    //    value: programa_objetivo.session.compania_id
    //}];
    programa_objetivo.singular = "Objetivos del Programa";
    programa_objetivo.plural = "Objetivos del Programa";
    programa_objetivo.headertitle = "Objetivos del Programa";
    //programa_objetivo.destroyForm = false;
    //programa_objetivo.permissionTable = "tabletopermission";
    RUNCONTROLLER("programa_objetivo", programa_objetivo, $scope, $http, $compile);
    programa_objetivo.formulary = function (data, mode, defaultData) {
        if (programa_objetivo !== undefined) {
            RUN_B("programa_objetivo", programa_objetivo, $scope, $http, $compile);
            programa_objetivo.form.modalWidth = ENUM.modal.width.full;
            programa_objetivo.form.readonly = {};
            programa_objetivo.form.titles = {
                new: "Agregar Objetivos del Programa " + programa_localizacion.nombre,
                edit: "Editar Objetivos del Programa " + programa_localizacion.nombre,
                view: "Ver Objetivos del Programa"
            };
            programa_objetivo.createForm(data, mode, defaultData);
            //ms_product.selectQueries['programa_localizacion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("programa_objetivo.programa_localizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(programa_objetivo, 'programa_localizacion', rules);
            });
            $scope.$watch("programa_objetivo.ods_localizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(programa_objetivo, 'ods_localizacion', rules);
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