app.controller("meta_localizacion", function ($scope, $http, $compile) {
    meta_localizacion = this;
    //meta_localizacion.fixFilters = [];
    meta_localizacion.session = new SESSION().current();
    //meta_localizacion.fixFilters = [{
    //    field: "compania",
    //    value: meta_localizacion.session.compania_id
    //}];
    meta_localizacion.singular = "Meta de la Lolacización";
    meta_localizacion.plural = "Metas de la Lolacización";
    meta_localizacion.headertitle = "Metas de la Lolacización";
    //meta_localizacion.destroyForm = false;
    //meta_localizacion.permissionTable = "tabletopermission";
    RUNCONTROLLER("meta_localizacion", meta_localizacion, $scope, $http, $compile);
    meta_localizacion.formulary = function (data, mode, defaultData) {
        if (meta_localizacion !== undefined) {
            RUN_B("meta_localizacion", meta_localizacion, $scope, $http, $compile);
            meta_localizacion.form.modalWidth = ENUM.modal.width.full;
            meta_localizacion.form.readonly = {};
            meta_localizacion.form.titles = {
                new: `Agregar Meta al Objetivo de ${objetivo_localizacion.consideraciones} -` + localizacion.nombre,
                edit: `Editar Meta al Objetivo de ${objetivo_localizacion.consideraciones} -` + localizacion.nombre,
                view: `Ver Meta`
            };
            meta_localizacion.createForm(data, mode, defaultData);
            //ms_product.selectQueries['localizacion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("meta_localizacion.localizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(meta_localizacion, 'localizacion', rules);
            });
            //ms_product.selectQueries['ods_compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("meta_localizacion.ods_compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(meta_localizacion, 'ods_compania', rules);
            });
            $scope.$watch("meta_localizacion.meta", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(meta_localizacion, 'meta', rules);
            });
            $scope.$watch("meta_localizacion.consideraciones", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(meta_localizacion, 'consideraciones', rules);
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