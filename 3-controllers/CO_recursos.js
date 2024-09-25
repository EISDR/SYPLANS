app.controller("recursos", function ($scope, $http, $compile) {
    recursos = this;
    //recursos.fixFilters = [];
    recursos.session = new SESSION().current();
    //recursos.fixFilters = [{
    //    field: "compania",
    //    value: recursos.session.compania_id
    //}];
    recursos.singular = "Recurso";
    recursos.plural = "Recursos";
    recursos.headertitle = "Recursos";
    //recursos.destroyForm = false;
    //recursos.permissionTable = "tabletopermission";
    RUNCONTROLLER("recursos", recursos, $scope, $http, $compile);
    recursos.formulary = function (data, mode, defaultData) {
        if (recursos !== undefined) {
            RUN_B("recursos", recursos, $scope, $http, $compile);
            recursos.form.modalWidth = ENUM.modal.width.full;
            recursos.form.readonly = {};
            recursos.form.titles = {
                new: "Agregar Recurso",
                edit: "Editar Recurso",
                view: "Ver Recurso"
            };
            recursos.createForm(data, mode, defaultData);
            $scope.$watch("recursos.descripcion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(recursos, 'descripcion', rules);
            });
            $scope.$watch("recursos.tipo", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(recursos, 'tipo', rules);
            });
            $scope.$watch("recursos.proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(recursos, 'proceso', rules);
            });
            recursos.selectQueries["tipo"] = [
                {
                    field: "compania",
                    value: recursos.session.compania_id
                }
            ];
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