app.controller("pacc_status", function ($scope, $http, $compile) {
    pacc_status = this;
    //pacc_status.fixFilters = [];
    pacc_status.singular = "singular";
    pacc_status.plural = "plural";
    pacc_status.headertitle = "Estatus de PACC";
    //pacc_status.destroyForm = false;
    //pacc_status.permissionTable = "tabletopermission";
    RUNCONTROLLER("pacc_status", pacc_status, $scope, $http, $compile);
    pacc_status.formulary = function (data, mode, defaultData) {
        if (pacc_status !== undefined) {
            RUN_B("pacc_status", pacc_status, $scope, $http, $compile);
            pacc_status.form.modalWidth = ENUM.modal.width.full;
            pacc_status.form.readonly = {active: 1};
            pacc_status.createForm(data, mode, defaultData);
            pacc_status.form.titles = {
                new: "Agregar - Estatus del PACC",
                edit: "Editar - Estatus del PACC",
                view: "Ver ALL - Estatus del PACC"
            };
            $scope.$watch("pacc_status.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_status, 'nombre', rules);
            });
            $scope.$watch("pacc_status.before_descripcion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_status, 'before_descripcion', rules);
            });
            $scope.$watch("pacc_status.before_descripcion_larga", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_status, 'before_descripcion_larga', rules);
            });
            $scope.$watch("pacc_status.next_descripcion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_status, 'next_descripcion', rules);
            });
            $scope.$watch("pacc_status.next_descripcion_larga", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_status, 'next_descripcion_larga', rules);
            });
            $scope.$watch("pacc_status.active", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_status, 'active', rules);
            });
            $scope.$watch("pacc_status.color", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_status, 'color', rules);
            });
        }
    };
    pacc_status.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        pacc_status.runMagicManyToMany('next_status', 'vw_pacc_status',
            'pacc_status', 'id', 'nombre_desc_next', 'pacc_status_next',
            'pacc_status_next', 'id');
        pacc_status.runMagicManyToMany('before_status', 'vw_pacc_status',
            'pacc_status', 'id', 'nombre_desc_before', 'pacc_status_before',
            'pacc_status_before', 'id');
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