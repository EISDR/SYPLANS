app.controller("fuente_financiamiento", function ($scope, $http, $compile) {
    fuente_financiamiento = this;
    fuente_financiamiento.singular = "singular";
    fuente_financiamiento.plural = "plural";
    fuente_financiamiento.headertitle = "Fuente de Financiamiento";
    //fuente_financiamiento.destroyForm = false;
    //fuente_financiamiento.permissionTable = "tabletopermission";
    fuente_financiamiento.session = new SESSION().current();
    fuente_financiamiento.fixFilters = [
        {
            field: "compania",
            value: fuente_financiamiento.session.compania_id
        },
        {
            "field": "institucion",
            "operator": fuente_financiamiento.session.institucion_id ? "=" : "is",
            "value": fuente_financiamiento.session.institucion_id ? fuente_financiamiento.session.institucion_id : "$null"
        }
    ];
    RUNCONTROLLER("fuente_financiamiento", fuente_financiamiento, $scope, $http, $compile);
    fuente_financiamiento.formulary = function (data, mode, defaultData) {
        if (fuente_financiamiento !== undefined) {
            RUN_B("fuente_financiamiento", fuente_financiamiento, $scope, $http, $compile);
            fuente_financiamiento.form.modalWidth = ENUM.modal.width.full;
            fuente_financiamiento.form.readonly = {compania: fuente_financiamiento.session.compania_id, institucion: fuente_financiamiento.session.institucion};
            fuente_financiamiento.createForm(data, mode, defaultData);
            $scope.$watch("fuente_financiamiento.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(fuente_financiamiento, 'nombre', rules);
            });
            $scope.$watch("fuente_financiamiento.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(fuente_financiamiento, 'descripcion', rules);
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