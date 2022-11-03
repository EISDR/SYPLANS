app.controller("valor_inidcador_localizacion", function ($scope, $http, $compile) {
    valor_inidcador_localizacion = this;
    //valor_inidcador_localizacion.fixFilters = [];
    valor_inidcador_localizacion.session = new SESSION().current();
    //valor_inidcador_localizacion.fixFilters = [{
    //    field: "compania",
    //    value: valor_inidcador_localizacion.session.compania_id
    //}];
    valor_inidcador_localizacion.singular = "Valores de los Indicadores Por Localización";
    valor_inidcador_localizacion.plural = "Valores de los Indicadores Por Localización";
    valor_inidcador_localizacion.headertitle = "Valores de los Indicadores Por Localización";
    //valor_inidcador_localizacion.destroyForm = false;
    //valor_inidcador_localizacion.permissionTable = "tabletopermission";
    RUNCONTROLLER("valor_inidcador_localizacion", valor_inidcador_localizacion, $scope, $http, $compile);
    valor_inidcador_localizacion.formulary = function (data, mode, defaultData) {
        if (valor_inidcador_localizacion !== undefined) {
            RUN_B("valor_inidcador_localizacion", valor_inidcador_localizacion, $scope, $http, $compile);
            valor_inidcador_localizacion.form.modalWidth = ENUM.modal.width.full;
            valor_inidcador_localizacion.form.readonly = {};

            valor_inidcador_localizacion.form.titles = {
                new: "Agregar Valor Por Indicador para" + localizacion.nombre,
                edit: "Editar Valor Por Indicador para " + localizacion.nombre,
                view: "Ver Valor Por Indicador en la Localización"
            };
            valor_inidcador_localizacion.createForm(data, mode, defaultData);
            //ms_product.selectQueries['localizacion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("valor_inidcador_localizacion.localizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador_localizacion, 'localizacion', rules);
            });
            $scope.$watch("valor_inidcador_localizacion.ods_localizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador_localizacion, 'ods_localizacion', rules);
            });
            //ms_product.selectQueries['meta_localizacion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("valor_inidcador_localizacion.meta_localizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador_localizacion, 'meta_localizacion', rules);
            });
            //ms_product.selectQueries['inidcador_compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("valor_inidcador_localizacion.inidcador_compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador_localizacion, 'inidcador_compania', rules);
            });
            $scope.$watch("valor_inidcador_localizacion.valor_organizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador_localizacion, 'valor_organizacion', rules);
            });
            $scope.$watch("valor_inidcador_localizacion.valor_referencia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador_localizacion, 'valor_referencia', rules);
            });
            $scope.$watch("valor_inidcador_localizacion.consideraciones", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(valor_inidcador_localizacion, 'consideraciones', rules);
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