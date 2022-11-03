app.controller("organizacion", function ($scope, $http, $compile) {
    organizacion = this;
    //organizacion.fixFilters = [];
    organizacion.session = new SESSION().current();
    organizacion.fixFilters = [{
        field: "compania",
        value: organizacion.session.compania_id
    }];
    organizacion.singular = "Organización";
    organizacion.plural = "Organizaciones";
    organizacion.headertitle = "Organización";
    //organizacion.destroyForm = false;
    //organizacion.permissionTable = "tabletopermission";
    RUNCONTROLLER("organizacion", organizacion, $scope, $http, $compile);
    organizacion.formulary = function (data, mode, defaultData) {
        if (organizacion !== undefined) {
            RUN_B("organizacion", organizacion, $scope, $http, $compile);
            organizacion.form.modalWidth = ENUM.modal.width.full;
            organizacion.form.readonly = {compania: organizacion.session.compania_id};
            organizacion.form.titles = {
                new: "Agregar Organización",
                edit: "Editar Organización",
                view: "Ver Organización"
            };
            organizacion.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("organizacion.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion, 'compania', rules);
            });
            //ms_product.selectQueries['organizacion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("organizacion.organizacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion, 'organizacion', rules);
            });
            $scope.$watch("organizacion.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion, 'nombre', rules);
            });
            $scope.$watch("organizacion.direccion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion, 'direccion', rules);
            });
            $scope.$watch("organizacion.codigo_identificacion_fiscal", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion, 'codigo_identificacion_fiscal', rules);
            });
            $scope.$watch("organizacion.interlocutor", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion, 'interlocutor', rules);
            });
            $scope.$watch("organizacion.telefono1", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion, 'telefono1', rules);
            });
            $scope.$watch("organizacion.telefono2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion, 'telefono2', rules);
            });
            $scope.$watch("organizacion.email", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.email(value));
                VALIDATION.validate(organizacion, 'email', rules);
            });
            $scope.$watch("organizacion.cargo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(organizacion, 'cargo', rules);
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