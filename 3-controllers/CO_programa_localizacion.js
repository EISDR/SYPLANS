app.controller("programa_localizacion", function ($scope, $http, $compile) {
    programa_localizacion = this;
    //programa_localizacion.fixFilters = [];
    programa_localizacion.session = new SESSION().current();
    //programa_localizacion.fixFilters = [{
    //    field: "compania",
    //    value: programa_localizacion.session.compania_id
    //}];
    programa_localizacion.singular = "Programa";
    programa_localizacion.plural = "Programas";
    programa_localizacion.headertitle = "Programas";
    //programa_localizacion.destroyForm = false;
    //programa_localizacion.permissionTable = "tabletopermission";
    RUNCONTROLLER("programa_localizacion", programa_localizacion, $scope, $http, $compile);
    programa_localizacion.formulary = function (data, mode, defaultData) {
        if (programa_localizacion !== undefined) {
            RUN_B("programa_localizacion", programa_localizacion, $scope, $http, $compile);
            programa_localizacion.form.modalWidth = ENUM.modal.width.full;
            programa_localizacion.form.readonly = {};
            programa_localizacion.form.titles = {
                new: "Agregar Programa",
                edit: "Editar Programa",
                view: "Ver Programa"
            };
            programa_localizacion.createForm(data, mode, defaultData);
            //ms_product.selectQueries['localizacion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("programa_localizacion.localizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(programa_localizacion, 'localizacion', rules);
            });
            $scope.$watch("programa_localizacion.programa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(programa_localizacion, 'programa', rules);
            });
            $scope.$watch("programa_localizacion.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(programa_localizacion, 'nombre', rules);
            });
            $scope.$watch("programa_localizacion.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(programa_localizacion, 'descripcion', rules);
            });
            $scope.$watch("programa_localizacion.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(programa_localizacion, 'tempid', rules);
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