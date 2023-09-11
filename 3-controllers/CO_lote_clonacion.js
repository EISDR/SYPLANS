app.controller("lote_clonacion", function ($scope, $http, $compile) {
    lote_clonacion = this;
    //lote_clonacion.fixFilters = [];
    lote_clonacion.session = new SESSION().current();
    //lote_clonacion.fixFilters = [{
    //    field: "compania",
    //    value: lote_clonacion.session.compania_id
    //}];
    //lote_clonacion.singular = "singular";
    //lote_clonacion.plural = "plural";
    //lote_clonacion.headertitle = "Hola Title";
    //lote_clonacion.destroyForm = false;
    //lote_clonacion.permissionTable = "tabletopermission";
    lote_clonacion.condiction = lote_clonacion.session.poa_id ? lote_clonacion.session.poa_id : 0;
    RUNCONTROLLER("lote_clonacion", lote_clonacion, $scope, $http, $compile);
    lote_clonacion.formulary = function (data, mode, defaultData) {
        if (lote_clonacion !== undefined) {
            RUN_B("lote_clonacion", lote_clonacion, $scope, $http, $compile);
            lote_clonacion.form.modalWidth = ENUM.modal.width.full;
            lote_clonacion.form.readonly = {compania: lote_clonacion.session.compania_id};
            lote_clonacion.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            lote_clonacion.createForm(data, mode, defaultData);
            //ms_product.selectQueries['departamento'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("lote_clonacion.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(lote_clonacion, 'departamento', rules);
            });
            $scope.$watch("lote_clonacion.autor", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(lote_clonacion, 'autor', rules);
            });
            $scope.$watch("lote_clonacion.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(lote_clonacion, 'estatus', rules);
            });
            $scope.$watch("lote_clonacion.config", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(lote_clonacion, 'config', rules);
            });
            $scope.$watch("lote_clonacion.poa_desde", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(lote_clonacion, 'poa_desde', rules);
            });
            $scope.$watch("lote_clonacion.poa_destino", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(lote_clonacion, 'poa_destino', rules);
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