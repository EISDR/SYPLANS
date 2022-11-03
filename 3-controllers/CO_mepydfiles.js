app.controller("mepydfiles", function ($scope, $http, $compile) {
    mepydfiles = this;
    //mepydfiles.fixFilters = [];
    //mepydfiles.singular = "singular";
    //mepydfiles.plural = "plural";
    //mepydfiles.headertitle = "Hola Title";
    //mepydfiles.destroyForm = false;
    //mepydfiles.permissionTable = "tabletopermission";
    RUNCONTROLLER("mepydfiles", mepydfiles, $scope, $http, $compile);
    mepydfiles.formulary = function (data, mode, defaultData) {
        if (mepydfiles !== undefined) {
            RUN_B("mepydfiles", mepydfiles, $scope, $http, $compile);
            mepydfiles.form.modalWidth = ENUM.modal.width.full;
            mepydfiles.form.readonly = {};
            mepydfiles.createForm(data, mode, defaultData);
            $scope.$watch("mepydfiles.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mepydfiles, 'nombre', rules);
            });
            $scope.$watch("mepydfiles.fecha", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mepydfiles, 'fecha', rules);
            });
            $scope.$watch("mepydfiles.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mepydfiles, 'departamento', rules);
            });
            $scope.$watch("mepydfiles.poa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mepydfiles, 'poa', rules);
            });
            $scope.$watch("mepydfiles.estado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mepydfiles, 'estado', rules);
            });
            $scope.$watch("mepydfiles.correo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mepydfiles, 'correo', rules);
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