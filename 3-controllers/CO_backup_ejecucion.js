app.controller("backup_ejecucion", function ($scope, $http, $compile) {
    backup_ejecucion = this;
    backup_ejecucion.session = new SESSION().current();
    backup_ejecucion.fixFilters = [
        {
            field: "compania",
            value: backup_ejecucion.session.compania_id
        }
    ];
    backup_ejecucion.singular = "Lista de ejecuciones del backup";
    backup_ejecucion.plural = "Lista de ejecuciones del backup";
    backup_ejecucion.headertitle = "Lista de ejecuciones del backup";
    //backup_ejecucion.destroyForm = false;
    //backup_ejecucion.permissionTable = "tabletopermission";
    RUNCONTROLLER("backup_ejecucion", backup_ejecucion, $scope, $http, $compile);
    backup_ejecucion.formulary = function (data, mode, defaultData) {
        if (backup_ejecucion !== undefined) {
            RUN_B("backup_ejecucion", backup_ejecucion, $scope, $http, $compile);
            // backup_ejecucion.form.titles = {
            //     new: "Agregar - Configuración del backup",
            //     edit: "Editar - Configuración del backup",
            //     view: "Ver ALL - Configuración del backup"
            // };
            backup_ejecucion.form.modalWidth = ENUM.modal.width.full;
            backup_ejecucion.form.readonly = {};
            backup_ejecucion.createForm(data, mode, defaultData);
            $scope.$watch("backup_ejecucion.ruta_archivo", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(backup_ejecucion, 'ruta_archivo', rules);
            });
            $scope.$watch("backup_ejecucion.fecha", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(backup_ejecucion, 'fecha', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("backup_ejecucion.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(backup_ejecucion, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("backup_ejecucion.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(backup_ejecucion, 'institucion', rules);
            });
        }
    };
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load =  () => new Promise((resolve, reject) => {
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