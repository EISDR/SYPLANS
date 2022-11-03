app.controller("tipo_auditorias", function ($scope, $http, $compile) {
    tipo_auditorias = this;
    tipo_auditorias.session = new SESSION().current();
    tipo_auditorias.fixFilters = [
        {
            field: "compania",
            value: tipo_auditorias.session.compania_id
        },
        {
            "field": "institucion",
            "operator": tipo_auditorias.session.institucion_id ? "=" : "is",
            "value":  tipo_auditorias.session.institucion_id ?  tipo_auditorias.session.institucion_id : "$null"
        }
    ];
    //tipo_auditorias.singular = "singular";
    //tipo_auditorias.plural = "plural";
    tipo_auditorias.headertitle = "Tipos de Auditorías";
    //tipo_auditorias.destroyForm = false;
    //tipo_auditorias.permissionTable = "tabletopermission";
    RUNCONTROLLER("tipo_auditorias", tipo_auditorias, $scope, $http, $compile);
    tipo_auditorias.formulary = function (data, mode, defaultData) {
        if (tipo_auditorias !== undefined) {
            RUN_B("tipo_auditorias", tipo_auditorias, $scope, $http, $compile);
            tipo_auditorias.form.modalWidth = ENUM.modal.width.full;
            tipo_auditorias.form.readonly = {compania: tipo_auditorias.session.compania_id, institucion: tipo_auditorias.session.institucion};
            tipo_auditorias.createForm(data, mode, defaultData);
            $scope.$watch("tipo_auditorias.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_auditorias, 'nombre', rules);
            });
            $scope.$watch("tipo_auditorias.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_auditorias, 'descripcion', rules);
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