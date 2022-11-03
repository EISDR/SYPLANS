app.controller("objetivo_localizacion", function ($scope, $http, $compile) {
    objetivo_localizacion = this;
    //objetivo_localizacion.fixFilters = [];
    objetivo_localizacion.session = new SESSION().current();
    //objetivo_localizacion.fixFilters = [{
    //    field: "compania",
    //    value: objetivo_localizacion.session.compania_id
    //}];
    objetivo_localizacion.singular = "Objetivo de laLocalización";
    objetivo_localizacion.plural = "Objetivos de laLocalización";
    objetivo_localizacion.headertitle = "Objetivos de laLocalización";
    //objetivo_localizacion.destroyForm = false;
    //objetivo_localizacion.permissionTable = "tabletopermission";
    RUNCONTROLLER("objetivo_localizacion", objetivo_localizacion, $scope, $http, $compile);
    objetivo_localizacion.formulary = function (data, mode, defaultData) {
        if (objetivo_localizacion !== undefined) {
            RUN_B("objetivo_localizacion", objetivo_localizacion, $scope, $http, $compile);
            objetivo_localizacion.form.modalWidth = ENUM.modal.width.full;
            objetivo_localizacion.form.readonly = {};
            objetivo_localizacion.form.titles = {
                new: "Agregar Objetivo a " + localizacion.nombre,
                edit: "Editar Objetivo de " + localizacion.nombre,
                view: "Ver Objetivo"
            };
            objetivo_localizacion.createForm(data, mode, defaultData);
            //ms_product.selectQueries['localizacion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("objetivo_localizacion.localizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_localizacion, 'localizacion', rules);
            });
            //ms_product.selectQueries['ods'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("objetivo_localizacion.ods", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_localizacion, 'ods', rules);
            });
            $scope.$watch("objetivo_localizacion.consideraciones", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_localizacion, 'consideraciones', rules);
            });
            $scope.$watch("objetivo_localizacion.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_localizacion, 'tempid', rules);
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