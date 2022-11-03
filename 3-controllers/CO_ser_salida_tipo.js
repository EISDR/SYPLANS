app.controller("ser_salida_tipo", function ($scope, $http, $compile) {
    ser_salida_tipo = this;
    //ser_salida_tipo.fixFilters = [];
    ser_salida_tipo.session = new SESSION().current();
    ser_salida_tipo.fixFilters = [{
        field: "compania",
        value: ser_salida_tipo.session.compania_id
    }];
    ser_salida_tipo.singular = "Tipo Salida no Conforme";
    ser_salida_tipo.plural = "Tipos Salidas no Conformes";
    ser_salida_tipo.headertitle = "Tipos Salidas no Conformes";
    //ser_salida_tipo.destroyForm = false;
    //ser_salida_tipo.permissionTable = "tabletopermission";
    RUNCONTROLLER("ser_salida_tipo", ser_salida_tipo, $scope, $http, $compile);
    ser_salida_tipo.formulary = function (data, mode, defaultData) {
        if (ser_salida_tipo !== undefined) {
            RUN_B("ser_salida_tipo", ser_salida_tipo, $scope, $http, $compile);
            ser_salida_tipo.form.modalWidth = ENUM.modal.width.full;
            ser_salida_tipo.form.readonly = {compania: ser_salida_tipo.session.compania_id};
            ser_salida_tipo.form.titles = {
                new: "Agregar Tipo de Salida no Conforme",
                edit: "Editar Tipo de Salida no Conforme",
                view: "Ver Tipo de Salida no Conforme"
            };
            ser_salida_tipo.createForm(data, mode, defaultData);
            $scope.$watch("ser_salida_tipo.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida_tipo, 'nombre', rules);
            });
            $scope.$watch("ser_salida_tipo.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida_tipo, 'descripcion', rules);
            });
            $scope.$watch("ser_salida_tipo.nececita_fecha_solucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida_tipo, 'nececita_fecha_solucion', rules);
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