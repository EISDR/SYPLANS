app.controller("documento_instrucciones", function ($scope, $http, $compile) {
    documento_instrucciones = this;
    //documento_instrucciones.fixFilters = [];
    documento_instrucciones.session = new SESSION().current();
    //documento_instrucciones.fixFilters = [{
    //    field: "compania",
    //    value: documento_instrucciones.session.compania_id
    //}];
    //documento_instrucciones.singular = "singular";
    //documento_instrucciones.plural = "plural";
    documento_instrucciones.headertitle = "Instrucciones";
    //documento_instrucciones.destroyForm = false;
    //documento_instrucciones.permissionTable = "tabletopermission";
    RUNCONTROLLER("documento_instrucciones", documento_instrucciones, $scope, $http, $compile);
    documento_instrucciones.formulary = function (data, mode, defaultData) {
        if (documento_instrucciones !== undefined) {
            RUN_B("documento_instrucciones", documento_instrucciones, $scope, $http, $compile);
            documento_instrucciones.form.modalWidth = ENUM.modal.width.full;
            documento_instrucciones.form.readonly = {};
            documento_instrucciones.form.titles = {
                new: "Agregar Instrucción",
                edit: "Editar Instrucción",
                view: "Ver Instrucción"
            };
            documento_instrucciones.createForm(data, mode, defaultData);
            $scope.$watch("documento_instrucciones.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_instrucciones, 'nombre', rules);
            });
            $scope.$watch("documento_instrucciones.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_instrucciones, 'descripcion', rules);
            });
            $scope.$watch("documento_instrucciones.documento_asociado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_instrucciones, 'documento_asociado', rules);
            });
            $scope.$watch("documento_instrucciones.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_instrucciones, 'tempid', rules);
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