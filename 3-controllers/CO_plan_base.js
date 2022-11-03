app.controller("plan_base", function ($scope, $http, $compile) {
    plan_base = this;
    //plan_base.fixFilters = [];
    plan_base.singular = "Plan";
    plan_base.plural = "Planes";
    plan_base.headertitle = "Planes";
    //plan_base.destroyForm = false;
    //plan_base.permissionTable = "tabletopermission";
    RUNCONTROLLER("plan_base", plan_base, $scope, $http, $compile);
    plan_base.formulary = function (data, mode, defaultData) {
        if (plan_base !== undefined) {
            RUN_B("plan_base", plan_base, $scope, $http, $compile);
            plan_base.form.modalWidth = ENUM.modal.width.full;
            plan_base.form.readonly = {};
            plan_base.form.titles = {
                new: 'Nuevo Plan',
                edit: 'Editar Plan',
                view: "Detalle del Plan"
            };
            plan_base.createForm(data, mode, defaultData);
            $scope.$watch("plan_base.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'nombre', rules);
            });
            $scope.$watch("plan_base.descripcion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'descripcion', rules);
            });
            $scope.$watch("plan_base.features", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'features', rules);
            });
            $scope.$watch("plan_base.pacc", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'pacc', rules);
            });
            $scope.$watch("plan_base.riesgo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'riesgo', rules);
            });
            $scope.$watch("plan_base.privada", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'privada', rules);
            });
            $scope.$watch("plan_base.multianual", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'multianual', rules);
            });
            $scope.$watch("plan_base.cantidad_usuario_departamental", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(plan_base, 'cantidad_usuario_departamental', rules);
            });
            $scope.$watch("plan_base.cantidad_usuario_planificacion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'cantidad_usuario_planificacion', rules);
            });
            $scope.$watch("plan_base.cantidad_admin", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'cantidad_admin', rules);
            });
            $scope.$watch("plan_base.multiinstitucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'multiinstitucion', rules);
            });
            $scope.$watch("plan_base.creacion_poa_flexibles", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'creacion_poa_flexibles', rules);
            });
            $scope.$watch("plan_base.evidencias_flexibles", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'evidencias_flexibles', rules);
            });
            $scope.$watch("plan_base.activo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'activo', rules);
            });
            $scope.$watch("plan_base.precio", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(plan_base, 'precio', rules);
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
