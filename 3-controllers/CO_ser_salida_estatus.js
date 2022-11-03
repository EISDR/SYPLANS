app.controller("ser_salida_estatus", function ($scope, $http, $compile) {
    ser_salida_estatus = this;
    //ser_salida_estatus.fixFilters = [];
    ser_salida_estatus.session = new SESSION().current();
    //ser_salida_estatus.fixFilters = [{
    //    field: "compania",
    //    value: ser_salida_estatus.session.compania_id
    //}];
    //ser_salida_estatus.singular = "singular";
    //ser_salida_estatus.plural = "plural";
    //ser_salida_estatus.headertitle = "Hola Title";
    //ser_salida_estatus.destroyForm = false;
    //ser_salida_estatus.permissionTable = "tabletopermission";
    RUNCONTROLLER("ser_salida_estatus", ser_salida_estatus, $scope, $http, $compile);
    ser_salida_estatus.formulary = function (data, mode, defaultData) {
        if (ser_salida_estatus !== undefined) {
            RUN_B("ser_salida_estatus", ser_salida_estatus, $scope, $http, $compile);
            ser_salida_estatus.form.modalWidth = ENUM.modal.width.full;
            ser_salida_estatus.form.readonly = {compania: ser_salida_estatus.session.compania_id};
            ser_salida_estatus.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            ser_salida_estatus.createForm(data, mode, defaultData);
            $scope.$watch("ser_salida_estatus.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida_estatus, 'nombre', rules);
            });
            $scope.$watch("ser_salida_estatus.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida_estatus, 'descripcion', rules);
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