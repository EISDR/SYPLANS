app.controller("aconfig_configuracion", function ($scope, $http, $compile) {
    aconfig_configuracion = this;
    //aconfig_configuracion.fixFilters = [];
    aconfig_configuracion.session = new SESSION().current();
    aconfig_configuracion.fixFilters = [{
        field: "compania",
        value: aconfig_configuracion.session.compania_id
    }];
    aconfig_configuracion.singular = "Reporte Configurado";
    aconfig_configuracion.plural = "Reportes Configurado";
    //aconfig_configuracion.headertitle = "Hola Title";
    //aconfig_configuracion.destroyForm = false;
    //aconfig_configuracion.permissionTable = "tabletopermission";
    RUNCONTROLLER("aconfig_configuracion", aconfig_configuracion, $scope, $http, $compile);
    aconfig_configuracion.formulary = function (data, mode, defaultData) {
        if (aconfig_configuracion !== undefined) {
            RUN_B("aconfig_configuracion", aconfig_configuracion, $scope, $http, $compile);
            aconfig_configuracion.form.modalWidth = ENUM.modal.width.full;
            aconfig_configuracion.form.readonly = {
                compania: aconfig_configuracion.session.compania_id,
                usuario: aconfig_configuracion.session.usuario_id
            };
            aconfig_configuracion.form.titles = {
                new: "Agregar Reporte",
                edit: "Editar Reporte",
                view: "Ver Reporte"
            };
            aconfig_configuracion.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("aconfig_configuracion.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(aconfig_configuracion, 'nombre', rules);
            });
            $scope.$watch("aconfig_configuracion.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(aconfig_configuracion, 'descripcion', rules);
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