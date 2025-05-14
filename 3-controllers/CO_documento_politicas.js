app.controller("documento_politicas", function ($scope, $http, $compile) {
    documento_politicas = this;
    //documento_politicas.fixFilters = [];
    documento_politicas.session = new SESSION().current();
    //documento_politicas.fixFilters = [{
    //    field: "compania",
    //    value: documento_politicas.session.compania_id
    //}];
    //documento_politicas.singular = "singular";
    //documento_politicas.plural = "plural";
    documento_politicas.headertitle = "Políticas";
    //documento_politicas.destroyForm = false;
    //documento_politicas.permissionTable = "tabletopermission";
    RUNCONTROLLER("documento_politicas", documento_politicas, $scope, $http, $compile);
    documento_politicas.formulary = function (data, mode, defaultData) {
        if (documento_politicas !== undefined) {
            RUN_B("documento_politicas", documento_politicas, $scope, $http, $compile);
            documento_politicas.form.modalWidth = ENUM.modal.width.full;
            documento_politicas.form.readonly = {};
            documento_politicas.form.titles = {
                new: "Agregar Política",
                edit: "Editar Política",
                view: "Ver Política"
            };
            documento_politicas.createForm(data, mode, defaultData);
            $scope.$watch("documento_politicas.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_politicas, 'nombre', rules);
            });
            $scope.$watch("documento_politicas.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_politicas, 'descripcion', rules);
            });
            $scope.$watch("documento_politicas.documento_asociado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_politicas, 'documento_asociado', rules);
            });
            $scope.$watch("documento_politicas.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_politicas, 'tempid', rules);
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