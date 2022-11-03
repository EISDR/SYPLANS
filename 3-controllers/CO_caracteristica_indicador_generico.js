app.controller("caracteristica_indicador_generico", function ($scope, $http, $compile) {
    caracteristica_indicador_generico = this;
    //caracteristica_indicador_generico.fixFilters = [];
    //caracteristica_indicador_generico.singular = "singular";
    //caracteristica_indicador_generico.plural = "plural";
    //caracteristica_indicador_generico.headertitle = "Hola Title";
    //caracteristica_indicador_generico.destroyForm = false;
    //caracteristica_indicador_generico.permissionTable = "tabletopermission";
    RUNCONTROLLER("caracteristica_indicador_generico", caracteristica_indicador_generico, $scope, $http, $compile);
    caracteristica_indicador_generico.formulary = function (data, mode, defaultData) {
        if (caracteristica_indicador_generico !== undefined) {
            RUN_B("caracteristica_indicador_generico", caracteristica_indicador_generico, $scope, $http, $compile);
            caracteristica_indicador_generico.form.modalWidth = ENUM.modal.width.full;
            caracteristica_indicador_generico.form.readonly = {};
            caracteristica_indicador_generico.createForm(data, mode, defaultData);
            //ms_product.selectQueries['indicador_generico'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("caracteristica_indicador_generico.indicador_generico", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(caracteristica_indicador_generico, 'indicador_generico', rules);
            });
            //ms_product.selectQueries['caracteristica'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("caracteristica_indicador_generico.caracteristica", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(caracteristica_indicador_generico, 'caracteristica', rules);
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