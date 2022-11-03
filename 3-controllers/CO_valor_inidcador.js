app.controller("valor_inidcador", function ($scope, $http, $compile) {
    valor_inidcador = this;
    //valor_inidcador.fixFilters = [];
    valor_inidcador.session = new SESSION().current();
    //valor_inidcador.fixFilters = [{
    //    field: "compania",
    //    value: valor_inidcador.session.compania_id
    //}];
    valor_inidcador.singular = "Valor";
    valor_inidcador.plural = "Valores";
    valor_inidcador.headertitle = "Valores del Indicador";
    //valor_inidcador.destroyForm = false;
    //valor_inidcador.permissionTable = "tabletopermission";
    RUNCONTROLLER("valor_inidcador", valor_inidcador, $scope, $http, $compile);
    valor_inidcador.formulary = function (data, mode, defaultData) {
        if (valor_inidcador !== undefined) {
            RUN_B("valor_inidcador", valor_inidcador, $scope, $http, $compile);
            valor_inidcador.form.modalWidth = ENUM.modal.width.full;
            valor_inidcador.form.readonly = {};
            valor_inidcador.form.titles = {
                new: "Agregar Valor al Indicador",
                edit: "Editar Valor del Indicador",
                view: "Ver Valor del indicador"
            };
            valor_inidcador.createForm(data, mode, defaultData);
            $scope.$watch("valor_inidcador.indicador_compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador, 'indicador_compania', rules);
            });
            $scope.$watch("valor_inidcador.ano_referencia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador, 'ano_referencia', rules);
            });
            $scope.$watch("valor_inidcador.definicion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador, 'definicion', rules);
            });
            $scope.$watch("valor_inidcador.fuente_datos", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador, 'fuente_datos', rules);
            });
            $scope.$watch("valor_inidcador.valor", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador, 'valor', rules);
            });
            $scope.$watch("valor_inidcador.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador, 'tempid', rules);
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