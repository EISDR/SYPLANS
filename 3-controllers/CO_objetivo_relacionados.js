app.controller("objetivo_relacionados", function ($scope, $http, $compile) {
    objetivo_relacionados = this;
    //objetivo_relacionados.fixFilters = [];
    objetivo_relacionados.session = new SESSION().current();
    //objetivo_relacionados.fixFilters = [{
    //    field: "compania",
    //    value: objetivo_relacionados.session.compania_id
    //}];
    objetivo_relacionados.singular = "Objetivo Relacionado";
    objetivo_relacionados.plural = "Objetivos Relacionados";
    objetivo_relacionados.headertitle = "Objetivos Relacionados";
    //objetivo_relacionados.destroyForm = false;
    //objetivo_relacionados.permissionTable = "tabletopermission";
    RUNCONTROLLER("objetivo_relacionados", objetivo_relacionados, $scope, $http, $compile);
    objetivo_relacionados.formulary = function (data, mode, defaultData) {
        if (objetivo_relacionados !== undefined) {
            RUN_B("objetivo_relacionados", objetivo_relacionados, $scope, $http, $compile);
            objetivo_relacionados.form.modalWidth = ENUM.modal.width.full;
            objetivo_relacionados.form.readonly = {};
            objetivo_relacionados.form.titles = {
                new: "Relacionar Objetivos",
                edit: "Editar Relación de Objetivos",
                view: "Ver Relación de Objetivos"
            };
            objetivo_relacionados.createForm(data, mode, defaultData);
            //ms_product.selectQueries['localizacion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("objetivo_relacionados.localizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_relacionados, 'localizacion', rules);
            });
            //ms_product.selectQueries['ods_compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("objetivo_relacionados.ods_compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_relacionados, 'ods_compania', rules);
            });
            $scope.$watch("objetivo_relacionados.ods_compania2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_relacionados, 'ods_compania2', rules);
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