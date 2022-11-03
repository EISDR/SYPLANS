app.controller("tipo_auditores", function ($scope, $http, $compile) {
    tipo_auditores = this;
    tipo_auditores.session = new SESSION().current();
    tipo_auditores.fixFilters = [
        {
            field: "compania",
            value: tipo_auditores.session.compania_id
        },
        {
            "field": "institucion",
            "operator": tipo_auditores.session.institucion_id ? "=" : "is",
            "value":  tipo_auditores.session.institucion_id ?  tipo_auditores.session.institucion_id : "$null"
        }
    ];
    //tipo_auditores.singular = "singular";
    //tipo_auditores.plural = "plural";
    tipo_auditores.headertitle = "Tipo de Auditores";
    //tipo_auditores.destroyForm = false;
    //tipo_auditores.permissionTable = "tabletopermission";
    RUNCONTROLLER("tipo_auditores", tipo_auditores, $scope, $http, $compile);
    tipo_auditores.formulary = function (data, mode, defaultData) {
        if (tipo_auditores !== undefined) {
            RUN_B("tipo_auditores", tipo_auditores, $scope, $http, $compile);
            tipo_auditores.form.modalWidth = ENUM.modal.width.full;
            tipo_auditores.form.readonly = {compania: tipo_auditores.session.compania_id, institucion: tipo_auditores.session.institucion};
            tipo_auditores.createForm(data, mode, defaultData);
            $scope.$watch("tipo_auditores.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_auditores, 'nombre', rules);
            });
            $scope.$watch("tipo_auditores.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_auditores, 'descripcion', rules);
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