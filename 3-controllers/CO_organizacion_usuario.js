app.controller("organizacion_usuario", function ($scope, $http, $compile) {
    organizacion_usuario = this;
    //organizacion_usuario.fixFilters = [];
    organizacion_usuario.session = new SESSION().current();
    //organizacion_usuario.fixFilters = [{
    //    field: "compania",
    //    value: organizacion_usuario.session.compania_id
    //}];
    //organizacion_usuario.singular = "singular";
    //organizacion_usuario.plural = "plural";
    organizacion_usuario.headertitle = "Usuarios Permitidos";
    //organizacion_usuario.destroyForm = false;
    //organizacion_usuario.permissionTable = "tabletopermission";
    RUNCONTROLLER("organizacion_usuario", organizacion_usuario, $scope, $http, $compile);
    organizacion_usuario.formulary = function (data, mode, defaultData) {
        if (organizacion_usuario !== undefined) {
            RUN_B("organizacion_usuario", organizacion_usuario, $scope, $http, $compile);
            organizacion_usuario.form.modalWidth = ENUM.modal.width.full;
            organizacion_usuario.form.readonly = {};
            organizacion_usuario.form.titles = {
                new: "Agregar Usuario Permitido",
                edit: "Editar Usuario Permitido",
                view: "Ver Usuario Permitido"
            };
            organizacion_usuario.createForm(data, mode, defaultData);
            organizacion_usuario.selectQueries['usuario'] = [
                {
                    field: 'compania',
                    operator: '=',
                    value: organizacion_usuario.session.compania_id
                }
            ];
            $scope.$watch("organizacion_usuario.usuario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion_usuario, 'usuario', rules);
            });
            //ms_product.selectQueries['organizacion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("organizacion_usuario.organizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion_usuario, 'organizacion', rules);
            });
            $scope.$watch("organizacion_usuario.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion_usuario, 'tempid', rules);
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