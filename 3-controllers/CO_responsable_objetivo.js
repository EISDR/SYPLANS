app.controller("responsable_objetivo", function ($scope, $http, $compile) {
    responsable_objetivo = this;
    //responsable_objetivo.fixFilters = [];
    responsable_objetivo.session = new SESSION().current();
    //responsable_objetivo.fixFilters = [{
    //    field: "compania",
    //    value: responsable_objetivo.session.compania_id
    //}];
    responsable_objetivo.singular = "Responsables";
    responsable_objetivo.plural = "Responsables";
    responsable_objetivo.headertitle = "Responsables";
    //responsable_objetivo.destroyForm = false;
    //responsable_objetivo.permissionTable = "tabletopermission";
    RUNCONTROLLER("responsable_objetivo", responsable_objetivo, $scope, $http, $compile);
    responsable_objetivo.formulary = function (data, mode, defaultData) {
        if (responsable_objetivo !== undefined) {
            RUN_B("responsable_objetivo", responsable_objetivo, $scope, $http, $compile);
            responsable_objetivo.form.modalWidth = ENUM.modal.width.full;
            responsable_objetivo.form.readonly = {};
            responsable_objetivo.form.titles = {
                new: "Agregar Responsable",
                edit: "Editar Responsable",
                view: "Ver Responsable"
            };
            responsable_objetivo.createForm(data, mode, defaultData);
            //ms_product.selectQueries['programa_objetivo'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("responsable_objetivo.programa_objetivo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(responsable_objetivo, 'programa_objetivo', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("responsable_objetivo.responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(responsable_objetivo, 'responsable', rules);
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