app.controller("modulo_notificacion_usuario", function ($scope, $http, $compile) {
    modulo_notificacion_usuario = this;
    //modulo_notificacion_usuario.fixFilters = [];
    modulo_notificacion_usuario.session = new SESSION().current();
    //modulo_notificacion_usuario.fixFilters = [{
    //    field: "compania",
    //    value: modulo_notificacion_usuario.session.compania_id
    //}];
    //modulo_notificacion_usuario.singular = "singular";
    //modulo_notificacion_usuario.plural = "plural";
    //modulo_notificacion_usuario.headertitle = "Hola Title";
    //modulo_notificacion_usuario.destroyForm = false;
    //modulo_notificacion_usuario.permissionTable = "tabletopermission";
    RUNCONTROLLER("modulo_notificacion_usuario", modulo_notificacion_usuario, $scope, $http, $compile);
    modulo_notificacion_usuario.formulary = function (data, mode, defaultData) {
        if (modulo_notificacion_usuario !== undefined) {
            RUN_B("modulo_notificacion_usuario", modulo_notificacion_usuario, $scope, $http, $compile);
            modulo_notificacion_usuario.form.modalWidth = ENUM.modal.width.full;
            modulo_notificacion_usuario.form.readonly = {compania: modulo_notificacion_usuario.session.compania_id};
            modulo_notificacion_usuario.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            modulo_notificacion_usuario.createForm(data, mode, defaultData);
            //ms_product.selectQueries['modulo_notificacion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("modulo_notificacion_usuario.modulo_notificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_notificacion_usuario, 'modulo_notificacion', rules);
            });
            //ms_product.selectQueries['usuario'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("modulo_notificacion_usuario.usuario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_notificacion_usuario, 'usuario', rules);
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