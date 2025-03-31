app.controller("documento_terminos_condiciones", function ($scope, $http, $compile) {
    documento_terminos_condiciones = this;
    //documento_terminos_condiciones.fixFilters = [];
    //documento_terminos_condiciones.singular = "singular";
    //documento_terminos_condiciones.plural = "plural";
    documento_terminos_condiciones.headertitle = "Terminos y Condiciones";
    //documento_terminos_condiciones.destroyForm = false;
    //documento_terminos_condiciones.permissionTable = "tabletopermission";
    RUNCONTROLLER("documento_terminos_condiciones", documento_terminos_condiciones, $scope, $http, $compile);
    documento_terminos_condiciones.formulary = function (data, mode, defaultData) {
        if (documento_terminos_condiciones !== undefined) {
            RUN_B("documento_terminos_condiciones", documento_terminos_condiciones, $scope, $http, $compile);
            documento_terminos_condiciones.form.modalWidth = ENUM.modal.width.full;
            documento_terminos_condiciones.form.titles = {
                new: "Nuevo Término y condición",
                edit: "Editar Término y condición",
                view: "Ver Término y condición"
            };
            documento_terminos_condiciones.form.readonly = {};
            documento_terminos_condiciones.createForm(data, mode, defaultData);
            $scope.$watch("documento_terminos_condiciones.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_terminos_condiciones, 'nombre', rules);
            });
            $scope.$watch("documento_terminos_condiciones.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_terminos_condiciones, 'descripcion', rules);
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