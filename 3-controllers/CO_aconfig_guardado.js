app.controller("aconfig_guardado", function ($scope, $http, $compile) {
    aconfig_guardado = this;
    //aconfig_guardado.fixFilters = [];
    aconfig_guardado.session = new SESSION().current();
    //aconfig_guardado.fixFilters = [{
    //    field: "compania",
    //    value: aconfig_guardado.session.compania_id
    //}];
    //aconfig_guardado.singular = "singular";
    //aconfig_guardado.plural = "plural";
    //aconfig_guardado.headertitle = "Hola Title";
    //aconfig_guardado.destroyForm = false;
    //aconfig_guardado.permissionTable = "tabletopermission";
    RUNCONTROLLER("aconfig_guardado", aconfig_guardado, $scope, $http, $compile);
    aconfig_guardado.formulary = function (data, mode, defaultData) {
        if (aconfig_guardado !== undefined) {
            RUN_B("aconfig_guardado", aconfig_guardado, $scope, $http, $compile);
            aconfig_guardado.form.modalWidth = ENUM.modal.width.full;
            aconfig_guardado.form.readonly = {compania: aconfig_guardado.session.compania_id};
            aconfig_guardado.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            aconfig_guardado.createForm(data, mode, defaultData);
            $scope.$watch("aconfig_guardado.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(aconfig_guardado, 'nombre', rules);
            });
            $scope.$watch("aconfig_guardado.fecha", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(aconfig_guardado, 'fecha', rules);
            });
            //ms_product.selectQueries['aconfig_configuracion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("aconfig_guardado.aconfig_configuracion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(aconfig_guardado, 'aconfig_configuracion', rules);
            });
            $scope.$watch("aconfig_guardado.datos", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(aconfig_guardado, 'datos', rules);
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