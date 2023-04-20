app.controller("modulo_notificacion_cache", function ($scope, $http, $compile) {
    modulo_notificacion_cache = this;
    //modulo_notificacion_cache.fixFilters = [];
    modulo_notificacion_cache.session = new SESSION().current();
    //modulo_notificacion_cache.fixFilters = [{
    //    field: "compania",
    //    value: modulo_notificacion_cache.session.compania_id
    //}];
    //modulo_notificacion_cache.singular = "singular";
    //modulo_notificacion_cache.plural = "plural";
    //modulo_notificacion_cache.headertitle = "Hola Title";
    //modulo_notificacion_cache.destroyForm = false;
    //modulo_notificacion_cache.permissionTable = "tabletopermission";
    RUNCONTROLLER("modulo_notificacion_cache", modulo_notificacion_cache, $scope, $http, $compile);
    modulo_notificacion_cache.formulary = function (data, mode, defaultData) {
        if (modulo_notificacion_cache !== undefined) {
            RUN_B("modulo_notificacion_cache", modulo_notificacion_cache, $scope, $http, $compile);
            modulo_notificacion_cache.form.modalWidth = ENUM.modal.width.full;
            modulo_notificacion_cache.form.readonly = {compania: modulo_notificacion_cache.session.compania_id};
            modulo_notificacion_cache.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            modulo_notificacion_cache.createForm(data, mode, defaultData);
            $scope.$watch("modulo_notificacion_cache.code", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_notificacion_cache, 'code', rules);
            });
            $scope.$watch("modulo_notificacion_cache.module_notification", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_notificacion_cache, 'module_notification', rules);
            });
            $scope.$watch("modulo_notificacion_cache.date", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_notificacion_cache, 'date', rules);
            });
            $scope.$watch("modulo_notificacion_cache.permanent", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_notificacion_cache, 'permanent', rules);
            });
            $scope.$watch("modulo_notificacion_cache.to", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_notificacion_cache, 'to', rules);
            });
            $scope.$watch("modulo_notificacion_cache.cc", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_notificacion_cache, 'cc', rules);
            });
            $scope.$watch("modulo_notificacion_cache.subject", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_notificacion_cache, 'subject', rules);
            });
            $scope.$watch("modulo_notificacion_cache.email", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.email(value));
                VALIDATION.validate(modulo_notificacion_cache, 'email', rules);
            });
            $scope.$watch("modulo_notificacion_cache.sendDate", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_notificacion_cache, 'sendDate', rules);
            });
            $scope.$watch("modulo_notificacion_cache.push", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(modulo_notificacion_cache, 'push', rules);
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