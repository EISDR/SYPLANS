app.controller("listaverificacion_history", function ($scope, $http, $compile) {
    listaverificacion_history = this;
    //listaverificacion_history.fixFilters = [];
    listaverificacion_history.session = new SESSION().current();
    //listaverificacion_history.fixFilters = [{
    //    field: "compania",
    //    value: listaverificacion_history.session.compania_id
    //}];
    //listaverificacion_history.singular = "singular";
    //listaverificacion_history.plural = "plural";
    //listaverificacion_history.headertitle = "Hola Title";
    //listaverificacion_history.destroyForm = false;
    //listaverificacion_history.permissionTable = "tabletopermission";
    RUNCONTROLLER("listaverificacion_history", listaverificacion_history, $scope, $http, $compile);
    listaverificacion_history.formulary = function (data, mode, defaultData) {
        if (listaverificacion_history !== undefined) {
            RUN_B("listaverificacion_history", listaverificacion_history, $scope, $http, $compile);
            listaverificacion_history.form.modalWidth = ENUM.modal.width.full;
            listaverificacion_history.form.readonly = {compania: listaverificacion_history.session.compania_id};
            listaverificacion_history.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            listaverificacion_history.createForm(data, mode, defaultData);
            $scope.$watch("listaverificacion_history.id_verificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(listaverificacion_history, 'id_verificacion', rules);
            });
            $scope.$watch("listaverificacion_history.ap_documento_asociado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(listaverificacion_history, 'ap_documento_asociado', rules);
            });
            //ms_product.selectQueries['usuario'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("listaverificacion_history.usuario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(listaverificacion_history, 'usuario', rules);
            });
            $scope.$watch("listaverificacion_history.cumple", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(listaverificacion_history, 'cumple', rules);
            });
            $scope.$watch("listaverificacion_history.fecha", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(listaverificacion_history, 'fecha', rules);
            });
            $scope.$watch("listaverificacion_history.observaciones", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(listaverificacion_history, 'observaciones', rules);
            });
            //ms_product.selectQueries['tipo_inconformidad'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("listaverificacion_history.tipo_inconformidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(listaverificacion_history, 'tipo_inconformidad', rules);
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