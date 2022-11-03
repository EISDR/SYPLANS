app.controller("vw_estrategia_pesta", function ($scope, $http, $compile) {
    vw_estrategia_pesta = this;
    //vw_estrategia_pesta.fixFilters = [];
    //vw_estrategia_pesta.singular = "singular";
    //vw_estrategia_pesta.plural = "plural";
    //vw_estrategia_pesta.headertitle = "Hola Title";
    //vw_estrategia_pesta.destroyForm = false;
    //vw_estrategia_pesta.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_estrategia_pesta", vw_estrategia_pesta, $scope, $http, $compile);
    vw_estrategia_pesta.formulary = function (data, mode, defaultData) {
        if (vw_estrategia_pesta !== undefined) {
            RUN_B("vw_estrategia_pesta", vw_estrategia_pesta, $scope, $http, $compile);
            vw_estrategia_pesta.form.modalWidth = ENUM.modal.width.full;
            vw_estrategia_pesta.form.readonly = {};
            vw_estrategia_pesta.createForm(data, mode, defaultData);
            //ms_product.selectQueries['pesta'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_estrategia_pesta.pesta", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_estrategia_pesta, 'pesta', rules);
            });
            $scope.$watch("vw_estrategia_pesta.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_estrategia_pesta, 'type', rules);
            });
            $scope.$watch("vw_estrategia_pesta.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(vw_estrategia_pesta, 'descripcion', rules);
            });
            //ms_product.selectQueries['pei'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_estrategia_pesta.pei", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_estrategia_pesta, 'pei', rules);
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