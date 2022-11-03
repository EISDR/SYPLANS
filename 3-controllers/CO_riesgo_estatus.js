app.controller("riesgo_estatus", function ($scope, $http, $compile) {
    riesgo_estatus = this;
    riesgo_estatus.session = new SESSION().current();
    // riesgo_estatus.fixFilters = [
    //     {
    //         field: "compania",
    //         value: riesgo_estatus.session.compania_id
    //     },
    //     {
    //         "field": "institucion",
    //         "operator": riesgo_estatus.session.institucion_id ? "=" : "is",
    //         "value":  riesgo_estatus.session.institucion_id ?  riesgo_estatus.session.institucion_id : "$null"
    //     }
    // ];
    riesgo_estatus.singular = "Estatus de Riesgo";
    riesgo_estatus.plural = "Estatus de Riesgo";
    riesgo_estatus.headertitle = "Estatus de Riesgo";
    //riesgo_estatus.destroyForm = false;
    //riesgo_estatus.permissionTable = "tabletopermission";
    RUNCONTROLLER("riesgo_estatus", riesgo_estatus, $scope, $http, $compile);
    riesgo_estatus.formulary = function (data, mode, defaultData) {
        if (riesgo_estatus !== undefined) {
            RUN_B("riesgo_estatus", riesgo_estatus, $scope, $http, $compile);
            riesgo_estatus.form.modalWidth = ENUM.modal.width.full;
            // riesgo_estatus.form.readonly = {compania: riesgo_estatus.session.compania_id, institucion: riesgo_estatus.session.institucion};
            riesgo_estatus.createForm(data, mode, defaultData);
            $scope.$watch("riesgo_estatus.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_estatus, 'nombre', rules);
            });
            $scope.$watch("riesgo_estatus.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_estatus, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_estatus.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_estatus, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_estatus.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_estatus, 'institucion', rules);
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