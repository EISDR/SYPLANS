app.controller("procedimiento_seleccion", function ($scope, $http, $compile) {
    procedimiento_seleccion = this;
    //
    procedimiento_seleccion.singular = "singular";
    procedimiento_seleccion.plural = "plural";
    procedimiento_seleccion.headertitle = "Procedimiento de Selección";
    //procedimiento_seleccion.destroyForm = false;
    //procedimiento_seleccion.permissionTable = "tabletopermission";
    procedimiento_seleccion.session = new SESSION().current();
    procedimiento_seleccion.fixFilters = [
        {
            field: "compania",
            value: procedimiento_seleccion.session.compania_id
        },
        {
            "field": "institucion",
            "operator": procedimiento_seleccion.session.institucion_id ? "=" : "is",
            "value": procedimiento_seleccion.session.institucion_id ? procedimiento_seleccion.session.institucion_id : "$null"
        }
    ];
    RUNCONTROLLER("procedimiento_seleccion", procedimiento_seleccion, $scope, $http, $compile);
    procedimiento_seleccion.formulary = function (data, mode, defaultData) {
        if (procedimiento_seleccion !== undefined) {
            RUN_B("procedimiento_seleccion", procedimiento_seleccion, $scope, $http, $compile);
            procedimiento_seleccion.form.modalWidth = ENUM.modal.width.full;
            procedimiento_seleccion.form.readonly = {compania: procedimiento_seleccion.session.compania_id, institucion: procedimiento_seleccion.session.institucion};
            procedimiento_seleccion.createForm(data, mode, defaultData);
            $scope.$watch("procedimiento_seleccion.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(procedimiento_seleccion, 'nombre', rules);
            });
            $scope.$watch("procedimiento_seleccion.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(procedimiento_seleccion, 'descripcion', rules);
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