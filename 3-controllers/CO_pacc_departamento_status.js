app.controller("pacc_departamento_status", function ($scope, $http, $compile) {
    pacc_departamento_status = this;
    //pacc_departamento_status.fixFilters = [];
    pacc_departamento_status.singular = "singular";
    pacc_departamento_status.plural = "plural";
    pacc_departamento_status.headertitle = "Estatus del PACC departamental";
    //pacc_departamento_status.destroyForm = false;
    //pacc_departamento_status.permissionTable = "tabletopermission";
    RUNCONTROLLER("pacc_departamento_status", pacc_departamento_status, $scope, $http, $compile);
    pacc_departamento_status.formulary = function (data, mode, defaultData) {
        if (pacc_departamento_status !== undefined) {
            RUN_B("pacc_departamento_status", pacc_departamento_status, $scope, $http, $compile);
            pacc_departamento_status.form.modalWidth = ENUM.modal.width.full;
            pacc_departamento_status.form.readonly = {active: 1};
            pacc_departamento_status.createForm(data, mode, defaultData);
            pacc_departamento_status.form.titles = {
                new: "Agregar - Estatus del PACC Departamental",
                edit: "Editar - Estatus del PACC Departamental",
                view: "Ver ALL - Estatus del PACC Departamental"
            };
            $scope.$watch("pacc_departamento_status.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamento_status, 'nombre', rules);
            });
            $scope.$watch("pacc_departamento_status.descripcion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamento_status, 'descripcion', rules);
            });
            $scope.$watch("pacc_departamento_status.descripcion_larga", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamento_status, 'descripcion_larga', rules);
            });
            $scope.$watch("pacc_departamento_status.descripcion_before", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamento_status, 'descripcion_before', rules);
            });
            $scope.$watch("pacc_departamento_status.descripcion_larga_before", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamento_status, 'descripcion_larga_before', rules);
            });
            $scope.$watch("pacc_departamento_status.active", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamento_status, 'active', rules);
            });
            $scope.$watch("pacc_departamento_status.color", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamento_status, 'color', rules);
            });
        }
    };
    pacc_departamento_status.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        pacc_departamento_status.runMagicManyToMany('next_status', 'vw_pacc_departamento_status',
            'pacc_departamento_status', 'id', 'nombre_desc', 'pacc_departamento_status_next',
            'pacc_departamento_status_next', 'id');
        pacc_departamento_status.runMagicManyToMany('before_status', 'vw_pacc_departamento_status',
            'pacc_departamento_status', 'id', 'nombre_desc_before', 'pacc_departamento_status_before',
            'pacc_departamento_status_before', 'id');
    };
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