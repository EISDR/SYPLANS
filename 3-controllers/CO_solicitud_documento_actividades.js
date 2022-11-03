app.controller("solicitud_documento_actividades", function ($scope, $http, $compile) {
    solicitud_documento_actividades = this;
    solicitud_documento_actividades.session = new SESSION().current();
    //solicitud_documento_actividades.fixFilters = [];
    //solicitud_documento_actividades.singular = "singular";
    //solicitud_documento_actividades.plural = "plural";
    solicitud_documento_actividades.headertitle = "Actividades";
    //solicitud_documento_actividades.destroyForm = false;
    //solicitud_documento_actividades.permissionTable = "tabletopermission";
    RUNCONTROLLER("solicitud_documento_actividades", solicitud_documento_actividades, $scope, $http, $compile);
    solicitud_documento_actividades.formulary = function (data, mode, defaultData) {
        if (solicitud_documento_actividades !== undefined) {
            RUN_B("solicitud_documento_actividades", solicitud_documento_actividades, $scope, $http, $compile);
            solicitud_documento_actividades.form.modalWidth = ENUM.modal.width.full;
            solicitud_documento_actividades.form.readonly = {};
            solicitud_documento_actividades.createForm(data, mode, defaultData);
            solicitud_documento_actividades.form.titles = {
                new: 'Nueva Actividad de la Solicitud del Documento: "' + solicitud_documento.nombre + '"'
            };
            $scope.$watch("solicitud_documento_actividades.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_documento_actividades, 'nombre', rules);
            });
            $scope.$watch("solicitud_documento_actividades.responsable", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_documento_actividades, 'responsable', rules);
            });
            $scope.$watch("solicitud_documento_actividades.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_documento_actividades, 'descripcion', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
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