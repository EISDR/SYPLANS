app.controller("vw_razon_apoyo", function ($scope, $http, $compile) {
    vw_razon_apoyo = this;
    var session = new SESSION().current();
    vw_razon_apoyo.fixFilters = [
        {
            "field": "compania",
            "operator": "=",
            "value": session.compania_id
        }
    ];
    vw_razon_apoyo.singular = "Condición";
    vw_razon_apoyo.plural = "Condiciones";
    vw_razon_apoyo.headertitle = "Condición";
    //vw_razon_apoyo.destroyForm = false;
    //vw_razon_apoyo.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_razon_apoyo", vw_razon_apoyo, $scope, $http, $compile);
    vw_razon_apoyo.formulary = function (data, mode, defaultData) {
        if (vw_razon_apoyo !== undefined) {
            RUN_B("vw_razon_apoyo", vw_razon_apoyo, $scope, $http, $compile);
            vw_razon_apoyo.form.modalWidth = ENUM.modal.width.full;
            vw_razon_apoyo.form.readonly = {
                tipo: 2,
                compania: session.compania_id,
                institucion: session.institucion_id,
                active: 1
            };
            vw_razon_apoyo.createForm(data, mode, defaultData);
            $scope.$watch("vw_razon_apoyo.nombre_razon", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_razon_apoyo, 'nombre_razon', rules);
            });
            $scope.$watch("vw_razon_apoyo.description", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_razon_apoyo, 'description', rules);
            });
            $scope.$watch("vw_razon_apoyo.porcentaje", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_razon_apoyo, 'porcentaje', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_razon_apoyo.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_razon_apoyo, 'compania', rules);
            });
            $scope.$watch("vw_razon_apoyo.tipo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_razon_apoyo, 'tipo', rules);
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