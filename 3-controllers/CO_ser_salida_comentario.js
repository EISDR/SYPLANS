app.controller("ser_salida_comentario", function ($scope, $http, $compile) {
    ser_salida_comentario = this;
    //ser_salida_comentario.fixFilters = [];
    ser_salida_comentario.session = new SESSION().current();

    //ser_salida_comentario.fixFilters = [{
    //    field: "compania",
    //    value: ser_salida_comentario.session.compania_id
    //}];
    ser_salida_comentario.singular = "Comentario";
    ser_salida_comentario.plural = "Comentarios";
    ser_salida_comentario.headertitle = "Comentarios de la Salida no Conforme";
    //ser_salida_comentario.destroyForm = false;
    //ser_salida_comentario.permissionTable = "tabletopermission";
    RUNCONTROLLER("ser_salida_comentario", ser_salida_comentario, $scope, $http, $compile);
    ser_salida_comentario.formulary = function (data, mode, defaultData) {
        if (ser_salida_comentario !== undefined) {
            RUN_B("ser_salida_comentario", ser_salida_comentario, $scope, $http, $compile);
            ser_salida_comentario.form.modalWidth = ENUM.modal.width.full;
            ser_salida_comentario.form.readonly = {
                fecha: moment(new Date()).format("YYYY/MM/DD hh:mm"),
                usuario: ser_salida.session.usuario
            };
            ser_salida_comentario.form.titles = {
                new: "Agregar Comentario",
                edit: "Editar Comentario",
                view: "Ver Comentario"
            };
            ser_salida_comentario.createForm(data, mode, defaultData);
            $scope.$watch("ser_salida_comentario.comentario", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida_comentario, 'comentario', rules);
            });
            //ms_product.selectQueries['ser_salida'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("ser_salida_comentario.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida_comentario, 'tempid', rules);
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
    // ser_salida_comentario.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //
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
    ser_salida_comentario.setPermission("actions", false);
});