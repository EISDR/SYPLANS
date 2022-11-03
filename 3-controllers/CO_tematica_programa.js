app.controller("tematica_programa", function ($scope, $http, $compile) {
    tematica_programa = this;
    //tematica_programa.fixFilters = [];
    tematica_programa.session = new SESSION().current();
    //tematica_programa.fixFilters = [{
    //    field: "compania",
    //    value: tematica_programa.session.compania_id
    //}];
    tematica_programa.singular = "Programa de la Temática";
    tematica_programa.plural = "Programas de la Temática";
    tematica_programa.headertitle = "Programas de la Temática";
    //tematica_programa.destroyForm = false;
    //tematica_programa.permissionTable = "tabletopermission";
    RUNCONTROLLER("tematica_programa", tematica_programa, $scope, $http, $compile);
    tematica_programa.formulary = function (data, mode, defaultData) {
        if (tematica_programa !== undefined) {
            RUN_B("tematica_programa", tematica_programa, $scope, $http, $compile);
            tematica_programa.form.modalWidth = ENUM.modal.width.full;
            tematica_programa.form.readonly = {};
            tematica_programa.form.titles = {
                new: "Agregar Programas a la Temática",
                edit: "Editar Programas de la Temática",
                view: "Ver Programas de la Temática"
            };
            tematica_programa.createForm(data, mode, defaultData);
            //ms_product.selectQueries['tematica'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("tematica_programa.tematica", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tematica_programa, 'tematica', rules);
            });
            $scope.$watch("tematica_programa.programa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tematica_programa, 'programa', rules);
            });
            $scope.$watch("tematica_programa.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tematica_programa, 'tempid', rules);
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