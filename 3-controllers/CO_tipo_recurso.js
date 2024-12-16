app.controller("tipo_recurso", function ($scope, $http, $compile) {
    tipo_recurso = this;
    //tipo_recurso.fixFilters = [];
    tipo_recurso.session = new SESSION().current();
    tipo_recurso.fixFilters = [
        {
           field: "compania",
           value: tipo_recurso.session.compania_id
        },
        {
            "field": "institucion",
            "operator":  "=",
            "value":  tipo_recurso.session.institucion_id ?  tipo_recurso.session.institucion_id : "null"
        }
    ];
    tipo_recurso.singular = "Tipo de recurso";
    tipo_recurso.plural = "Tipos de recursos";
    tipo_recurso.headertitle = "Tipos de recursos";
    //tipo_recurso.destroyForm = false;
    //tipo_recurso.permissionTable = "tabletopermission";
    RUNCONTROLLER("tipo_recurso", tipo_recurso, $scope, $http, $compile);
    tipo_recurso.formulary = function (data, mode, defaultData) {
        if (tipo_recurso !== undefined) {
            RUN_B("tipo_recurso", tipo_recurso, $scope, $http, $compile);
            tipo_recurso.form.modalWidth = ENUM.modal.width.full;
            tipo_recurso.form.readonly = {compania: tipo_recurso.session.compania_id, institucion: tipo_recurso.session.institucion_id};
            tipo_recurso.form.titles = {
                new: "Agregar Tipo de recurso",
                edit: "Editar Tipo de recurso",
                view: "Ver Tipos de recursos"
            };
            tipo_recurso.createForm(data, mode, defaultData);
            $scope.$watch("tipo_recurso.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_recurso, 'nombre', rules);
            });
            $scope.$watch("tipo_recurso.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_recurso, 'descripcion', rules);
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