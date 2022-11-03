app.controller("ods_compania", function ($scope, $http, $compile) {
    ods_compania = this;
    //ods_compania.fixFilters = [];
    ods_compania.session = new SESSION().current();
    ods_compania.fixFilters = [{
        field: "compania",
        value: ods_compania.session.compania_id
    }];
    ods_compania.singular = "Objetovs de " + ods_compania.session.compania;
    ods_compania.plural = "Objetovs de " + ods_compania.session.compania;
    ods_compania.headertitle = "Objetovs de " + ods_compania.session.compania;
    //ods_compania.destroyForm = false;
    //ods_compania.permissionTable = "tabletopermission";
    RUNCONTROLLER("ods_compania", ods_compania, $scope, $http, $compile);
    ods_compania.formulary = function (data, mode, defaultData) {
        if (ods_compania !== undefined) {
            RUN_B("ods_compania", ods_compania, $scope, $http, $compile);
            ods_compania.form.modalWidth = ENUM.modal.width.full;
            ods_compania.form.readonly = {compania: ods_compania.session.compania_id};
            ods_compania.form.titles = {
                new: "Agregar Objetivo",
                edit: "Editar Objetivo",
                view: "Ver Objetivo"
            };
            ods_compania.createForm(data, mode, defaultData);
            //ms_product.selectQueries['ods'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("ods_compania.ods", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ods_compania, 'ods', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("ods_compania.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ods_compania, 'compania', rules);
            });
            $scope.$watch("ods_compania.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ods_compania, 'descripcion', rules);
            });
            $scope.$watch("ods_compania.definicion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ods_compania, 'definicion', rules);
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