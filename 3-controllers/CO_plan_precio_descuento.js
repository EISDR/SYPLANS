app.controller("plan_precio_descuento", function ($scope, $http, $compile) {
    plan_precio_descuento = this;
    //plan_precio_descuento.fixFilters = [];
    //plan_precio_descuento.singular = "singular";
    //plan_precio_descuento.plural = "plural";
    //plan_precio_descuento.headertitle = "Hola Title";
    //plan_precio_descuento.destroyForm = false;
    //plan_precio_descuento.permissionTable = "tabletopermission";
    RUNCONTROLLER("plan_precio_descuento", plan_precio_descuento, $scope, $http, $compile);
    plan_precio_descuento.formulary = function (data, mode, defaultData) {
        if (plan_precio_descuento !== undefined) {
            RUN_B("plan_precio_descuento", plan_precio_descuento, $scope, $http, $compile);
            plan_precio_descuento.form.modalWidth = ENUM.modal.width.full;
            plan_precio_descuento.form.readonly = {};
            plan_precio_descuento.createForm(data, mode, defaultData);
            $scope.$watch("plan_precio_descuento.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_precio_descuento, 'nombre', rules);
            });
            $scope.$watch("plan_precio_descuento.plan", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_precio_descuento, 'plan', rules);
            });
            $scope.$watch("plan_precio_descuento.precio", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_precio_descuento, 'precio', rules);
            });
            $scope.$watch("plan_precio_descuento.cantidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_precio_descuento, 'cantidad', rules);
            });
            $scope.$watch("plan_precio_descuento.descuento_porcentaje", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_precio_descuento, 'descuento_porcentaje', rules);
            });
            $scope.$watch("plan_precio_descuento.descuento_upgrade", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_precio_descuento, 'descuento_upgrade', rules);
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