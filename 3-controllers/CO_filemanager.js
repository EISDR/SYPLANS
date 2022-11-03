app.controller("filemanager", function ($scope, $http, $compile) {
    filemanager = this;
    //filemanager.fixFilters = [];
    //filemanager.singular = "singular";
    //filemanager.plural = "plural";
    //filemanager.headertitle = "Hola Title";
    //filemanager.destroyForm = false;
    //filemanager.permissionTable = "tabletopermission";
    RUNCONTROLLER("filemanager", filemanager, $scope, $http, $compile);
    filemanager.formulary = function (data, mode, defaultData) {
        if (filemanager !== undefined) {
            RUN_B("filemanager", filemanager, $scope, $http, $compile);
            filemanager.form.modalWidth = ENUM.modal.width.full;
            filemanager.form.readonly = {};
            filemanager.createForm(data, mode, defaultData);
            $scope.$watch("filemanager.title", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(filemanager, 'title', rules);
            });
            $scope.$watch("filemanager.entity", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(filemanager, 'entity', rules);
            });
            $scope.$watch("filemanager.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(filemanager, 'name', rules);
            });
            $scope.$watch("filemanager.plural", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(filemanager, 'plural', rules);
            });
            $scope.$watch("filemanager.isfolder", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(filemanager, 'isfolder', rules);
            });
            $scope.$watch("filemanager.where_filters", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(filemanager, 'where_filters', rules);
            });
            $scope.$watch("filemanager.level", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(filemanager, 'level', rules);
            });
            $scope.$watch("filemanager.golevel", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(filemanager, 'golevel', rules);
            });
            $scope.$watch("filemanager.govar", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(filemanager, 'govar', rules);
            });
            $scope.$watch("filemanager.dtext", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(filemanager, 'dtext', rules);
            });
            $scope.$watch("filemanager.dkey", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(filemanager, 'dkey', rules);
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