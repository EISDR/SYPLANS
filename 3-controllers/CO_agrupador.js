app.controller("agrupador", function ($scope, $http, $compile) {
    agrupador = this;
    //agrupador.fixFilters = [];
    agrupador.session = new SESSION().current();
    //agrupador.fixFilters = [{
    //    field: "compania",
    //    value: agrupador.session.compania_id
    //}];
    //agrupador.singular = "singular";
    //agrupador.plural = "plural";
    //agrupador.headertitle = "Hola Title";
    //agrupador.destroyForm = false;
    //agrupador.permissionTable = "tabletopermission";
    RUNCONTROLLER("agrupador", agrupador, $scope, $http, $compile);
    agrupador.formulary = function (data, mode, defaultData) {
        if (agrupador !== undefined) {
            RUN_B("agrupador", agrupador, $scope, $http, $compile);
            agrupador.form.modalWidth = ENUM.modal.width.full;
            agrupador.form.readonly = {compania: agrupador.session.compania_id};
            agrupador.form.titles = {
                new: "Agregar Agrupador",
                edit: "Editar Agrupador",
                view: "Ver Agrupador"
            };
            agrupador.createForm(data, mode, defaultData);
            $scope.$watch("agrupador.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(agrupador, 'nombre', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("agrupador.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(agrupador, 'compania', rules);
            });
            $scope.$watch("agrupador.definicion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(agrupador, 'definicion', rules);
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