app.controller("vw_estrategia_foda", function ($scope, $http, $compile) {
    vw_estrategia_foda = this;
    vw_estrategia_foda.fixFilters = [];
    vw_estrategia_foda.singular = "Estrategia";
    vw_estrategia_foda.plural = "Estrategias";
    vw_estrategia_foda.headertitle = "Estrategias";
    //vw_estrategia_foda.destroyForm = false;
    //vw_estrategia_foda.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_estrategia_foda", vw_estrategia_foda, $scope, $http, $compile);
    if (typeof foda_items != 'undefined') {
        if (typeof foda_items != 'not defined'){
            if (foda_items) {
                vw_estrategia_foda.fixFilters = [{
                    field: "id",
                    value: foda_items.dataValuesIDs
                }];
            }
        }
    }
    if (typeof pesta_items != 'undefined') {
        if (typeof pesta_items != 'not defined'){
            if (pesta_items){
                vw_estrategia_foda.fixFilters = [{
                    field: "id",
                    value: pesta_items.dataValuesIDs
                }];
            }
        }
    }
    vw_estrategia_foda.formulary = function (data, mode, defaultData) {
        if (vw_estrategia_foda !== undefined) {
            RUN_B("vw_estrategia_foda", vw_estrategia_foda, $scope, $http, $compile);
            vw_estrategia_foda.form.modalWidth = ENUM.modal.width.full;
            vw_estrategia_foda.form.readonly = {};
            vw_estrategia_foda.createForm(data, mode, defaultData);
            //ms_product.selectQueries['foda'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            // $scope.$watch("vw_estrategia_foda.foda", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_estrategia_foda, 'foda', rules);
            // });
            // $scope.$watch("vw_estrategia_foda.type", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_estrategia_foda, 'type', rules);
            // });
            // $scope.$watch("vw_estrategia_foda.description", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_estrategia_foda, 'description', rules);
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