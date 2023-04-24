app.controller("modulo_formulario_registro", function ($scope, $http, $compile) {
    modulo_formulario_registro = this;
    //modulo_formulario_registro.fixFilters = [];
    modulo_formulario_registro.session = new SESSION().current();
    //modulo_formulario_registro.fixFilters = [{
    //    field: "compania",
    //    value: modulo_formulario_registro.session.compania_id
    //}];
    //modulo_formulario_registro.singular = "singular";
    //modulo_formulario_registro.plural = "plural";
    modulo_formulario_registro.headertitle = "Respuestas";
    //modulo_formulario_registro.destroyForm = false;
    //modulo_formulario_registro.permissionTable = "tabletopermission";
    RUNCONTROLLER("modulo_formulario_registro", modulo_formulario_registro, $scope, $http, $compile);
    modulo_formulario_registro.formulary = function (data, mode, defaultData) {
        if (modulo_formulario_registro !== undefined) {
            RUN_B("modulo_formulario_registro", modulo_formulario_registro, $scope, $http, $compile);
            modulo_formulario_registro.form.modalWidth = ENUM.modal.width.full;
            modulo_formulario_registro.form.readonly = {compania: modulo_formulario_registro.session.compania_id};
            modulo_formulario_registro.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            modulo_formulario_registro.createForm(data, mode, defaultData);
            //ms_product.selectQueries['modulo_formulario'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("modulo_formulario_registro.modulo_formulario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_formulario_registro, 'modulo_formulario', rules);
            });
            $scope.$watch("modulo_formulario_registro.respuestas", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_formulario_registro, 'respuestas', rules);
            });
            $scope.$watch("modulo_formulario_registro.fecha", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_formulario_registro, 'fecha', rules);
            });
            $scope.$watch("modulo_formulario_registro.ip", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_formulario_registro, 'ip', rules);
            });
            $scope.$watch("modulo_formulario_registro.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_formulario_registro, 'nombre', rules);
            });
            $scope.$watch("modulo_formulario_registro.origen", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_formulario_registro, 'origen', rules);
            });
            //ms_product.selectQueries['usuario'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("modulo_formulario_registro.usuario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_formulario_registro, 'usuario', rules);
            });
            $scope.$watch("modulo_formulario_registro.browser", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_formulario_registro, 'browser', rules);
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