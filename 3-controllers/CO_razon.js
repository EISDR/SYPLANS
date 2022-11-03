app.controller("razon", function ($scope, $http, $compile) {
    razon = this;
    razon.session = new SESSION().current();
    var paso = false;
    //razon.fixFilters = [];
    razon.singular = "Condición de Cierre";
    razon.plural = "Condiciones de Cierre";
    razon.headertitle = "Condiciones de Cierre";
    // razon.fixFilters = [
    //     {
    //         "field": "compania",
    //         "value": new SESSION().current().compania_id
    //     }
    // ];
    //razon.destroyForm = false;
    //razon.permissionTable = "tabletopermission";
    RUNCONTROLLER("razon", razon, $scope, $http, $compile);
    razon.formulary = function (data, mode, defaultData) {
        if (razon !== undefined) {
            RUN_B("razon", razon, $scope, $http, $compile);
            razon.form.modalWidth = ENUM.modal.width.full;

            razon.form.readonly = {active: 1, compania: razon.session.compania_id, institucion: razon.session.institucion_id};
            razon.form.titles = {
                new: 'Nueva - Condición',
                edit: "Editar - Condición" ,
                view: "Ver todas - Condiciones"
            };
            razon.createForm(data, mode, defaultData);
            $scope.$watch("razon.nombre_razon", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(razon, 'nombre_razon', rules);
            });
            $scope.$watch("razon.tipo", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(razon, 'tipo', rules);
            });
        }
    };
    razon.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    razon.triggers.table.after.open = function (data) {
        //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
        paso = false;
    };
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
    razon.triggers.table.after.control = function (data) {
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        if (data == "compania") {
            if (!paso) {
                razon.compania = razon.session.compania_id + "";
                razon.form.loadDropDown("compania");
                paso = true
            }
        }
    };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});
