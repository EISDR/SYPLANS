app.controller("documento_responsabilidades", function ($scope, $http, $compile) {
    documento_responsabilidades = this;
    //documento_responsabilidades.fixFilters = [];
    //documento_responsabilidades.singular = "singular";
    //documento_responsabilidades.plural = "plural";
    documento_responsabilidades.headertitle = "Responsabilidades";
    //documento_responsabilidades.destroyForm = false;
    //documento_responsabilidades.permissionTable = "tabletopermission";
    RUNCONTROLLER("documento_responsabilidades", documento_responsabilidades, $scope, $http, $compile);
    documento_responsabilidades.formulary = function (data, mode, defaultData) {
        if (documento_responsabilidades !== undefined) {
            RUN_B("documento_responsabilidades", documento_responsabilidades, $scope, $http, $compile);
            documento_responsabilidades.form.modalWidth = ENUM.modal.width.full;
            documento_responsabilidades.form.titles = {
                new: "Nueva Responsabilidad",
                edit: "Editar Responsabilidad",
                view: "Ver Responsabilidad"
            };
            documento_responsabilidades.form.readonly = {};
            documento_responsabilidades.createForm(data, mode, defaultData);
            $scope.$watch("documento_responsabilidades.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_responsabilidades, 'nombre', rules);
            });
            $scope.$watch("documento_responsabilidades.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_responsabilidades, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            // $scope.$watch("cuenta.compania", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(cuenta, 'compania', rules);
            // });
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