app.controller("tematica_objetivo", function ($scope, $http, $compile) {
    tematica_objetivo = this;
    //tematica_objetivo.fixFilters = [];
    tematica_objetivo.session = new SESSION().current();
    //tematica_objetivo.fixFilters = [{
    //    field: "compania",
    //    value: tematica_objetivo.session.compania_id
    //}];
    tematica_objetivo.singular = "Temática Objetivo";
    tematica_objetivo.plural = "Temática Objetivos";
    tematica_objetivo.headertitle = "Objetivos de la Temática";
    //tematica_objetivo.destroyForm = false;
    //tematica_objetivo.permissionTable = "tabletopermission";
    RUNCONTROLLER("tematica_objetivo", tematica_objetivo, $scope, $http, $compile);
    tematica_objetivo.formulary = function (data, mode, defaultData) {
        if (tematica_objetivo !== undefined) {
            RUN_B("tematica_objetivo", tematica_objetivo, $scope, $http, $compile);
            tematica_objetivo.form.modalWidth = ENUM.modal.width.full;
            tematica_objetivo.form.readonly = {};
            tematica_objetivo.form.titles = {
                new: "Agregar Objetivo a la Temática",
                edit: "Editar Objetivo de la Temática",
                view: "Ver Objetivo de la Temática"
            };
            tematica_objetivo.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("tematica_objetivo.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tematica_objetivo, 'compania', rules);
            });
            //ms_product.selectQueries['localizacion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("tematica_objetivo.localizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tematica_objetivo, 'localizacion', rules);
            });
            //ms_product.selectQueries['tematica'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("tematica_objetivo.tematica", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tematica_objetivo, 'tematica', rules);
            });
            //ms_product.selectQueries['ods'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("tematica_objetivo.ods", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tematica_objetivo, 'ods', rules);
            });
            $scope.$watch("tematica_objetivo.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tematica_objetivo, 'tempid', rules);
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