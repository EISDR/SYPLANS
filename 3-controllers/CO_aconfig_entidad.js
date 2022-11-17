app.controller("aconfig_entidad", function ($scope, $http, $compile) {
    aconfig_entidad = this;
    //aconfig_entidad.fixFilters = [];
    aconfig_entidad.session = new SESSION().current();
    //aconfig_entidad.fixFilters = [{
    //    field: "compania",
    //    value: aconfig_entidad.session.compania_id
    //}];
    //aconfig_entidad.singular = "singular";
    //aconfig_entidad.plural = "plural";
    //aconfig_entidad.headertitle = "Hola Title";
    //aconfig_entidad.destroyForm = false;
    //aconfig_entidad.permissionTable = "tabletopermission";
    RUNCONTROLLER("aconfig_entidad", aconfig_entidad, $scope, $http, $compile);
    aconfig_entidad.formulary = function (data, mode, defaultData) {
        if (aconfig_entidad !== undefined) {
            RUN_B("aconfig_entidad", aconfig_entidad, $scope, $http, $compile);
            aconfig_entidad.form.modalWidth = ENUM.modal.width.full;
            aconfig_entidad.form.readonly = {compania: aconfig_entidad.session.compania_id};
            aconfig_entidad.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            aconfig_entidad.createForm(data, mode, defaultData);
            $scope.$watch("aconfig_entidad.tabla", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(aconfig_entidad, 'tabla', rules);
            });
            $scope.$watch("aconfig_entidad.companyField", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(aconfig_entidad, 'companyField', rules);
            });
            $scope.$watch("aconfig_entidad.fields", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(aconfig_entidad, 'fields', rules);
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