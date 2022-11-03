app.controller("caracteristica_indicador", function ($scope, $http, $compile) {
    caracteristica_indicador = this;
    var session = new SESSION().current();
    // caracteristica_indicador.fixFilters = [
    //     {
    //         field: "compania",
    //         value: session.compania_id
    //     }
    // ];
    caracteristica_indicador.singular = "Características de Indicadores";
    caracteristica_indicador.custom_title = "Característica de Indicador";
    caracteristica_indicador.plural = "Características de Indicadores";
    caracteristica_indicador.headertitle = "Características de Indicadores";
    //caracteristica_indicador.destroyForm = false;
    //caracteristica_indicador.permissionTable = "tabletopermission";
    RUNCONTROLLER("caracteristica_indicador", caracteristica_indicador, $scope, $http, $compile);
    caracteristica_indicador.formulary = function (data, mode, defaultData) {
        if (caracteristica_indicador !== undefined) {
            RUN_B("caracteristica_indicador", caracteristica_indicador, $scope, $http, $compile);
            caracteristica_indicador.form.modalWidth = ENUM.modal.width.full;
            caracteristica_indicador.form.readonly = {compania: session.compania_id, active: 1, institucion: session.institucion_id};
            caracteristica_indicador.createForm(data, mode, defaultData);
            caracteristica_indicador.form.titles = {
                new: "Agregar - " + caracteristica_indicador.custom_title,
                edit: "Editar - "+ caracteristica_indicador.custom_title,
                view: "Ver ALL - "+ caracteristica_indicador.custom_title
            };
            $scope.$watch("caracteristica_indicador.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(caracteristica_indicador, 'nombre', rules);
            });
            $scope.$watch("caracteristica_indicador.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(caracteristica_indicador, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
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
