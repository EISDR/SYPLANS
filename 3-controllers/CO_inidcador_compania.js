app.controller("inidcador_compania", function ($scope, $http, $compile) {
    inidcador_compania = this;
    //inidcador_compania.fixFilters = [];
    inidcador_compania.session = new SESSION().current();
    // inidcador_compania.fixFilters = [{
    //     field: "compania",
    //     value: inidcador_compania.session.compania_id
    // }];
    inidcador_compania.singular = "Indicadores de las Metas";
    inidcador_compania.plural = "Indicadores de las Metas";
    inidcador_compania.headertitle = "Indicadores de las Metas";
    //inidcador_compania.destroyForm = false;
    //inidcador_compania.permissionTable = "tabletopermission";
    RUNCONTROLLER("inidcador_compania", inidcador_compania, $scope, $http, $compile);
    inidcador_compania.formulary = function (data, mode, defaultData) {
        if (inidcador_compania !== undefined) {
            RUN_B("inidcador_compania", inidcador_compania, $scope, $http, $compile);
            inidcador_compania.form.modalWidth = ENUM.modal.width.full;
            inidcador_compania.form.readonly = {};
            inidcador_compania.form.titles = {
                new: "Agregar Indicador",
                edit: "Editar Indicador",
                view: "Ver Indicador"
            };
            inidcador_compania.createForm(data, mode, defaultData);
            $scope.$watch("inidcador_compania.ods", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(inidcador_compania, 'ods', rules);
            });
            $scope.$watch("inidcador_compania.meta", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(inidcador_compania, 'meta', rules);
            });
            $scope.$watch("inidcador_compania.indicador", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(inidcador_compania, 'indicador', rules);
            });
            $scope.$watch("inidcador_compania.definicion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(inidcador_compania, 'definicion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("inidcador_compania.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(inidcador_compania, 'compania', rules);
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