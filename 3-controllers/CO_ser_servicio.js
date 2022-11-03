app.controller("ser_servicio", function ($scope, $http, $compile) {
    ser_servicio = this;
    //ser_servicio.fixFilters = [];
    ser_servicio.session = new SESSION().current();
    ser_servicio.fixFilters = [{
        field: "compania",
        value: ser_servicio.session.compania_id
    }];
    ser_servicio.singular = "Servicio";
    ser_servicio.plural = "Servicios";
    ser_servicio.headertitle = "Servicios";
    //ser_servicio.destroyForm = false;
    //ser_servicio.permissionTable = "tabletopermission";
    RUNCONTROLLER("ser_servicio", ser_servicio, $scope, $http, $compile);
    ser_servicio.formulary = function (data, mode, defaultData) {
        if (ser_servicio !== undefined) {
            RUN_B("ser_servicio", ser_servicio, $scope, $http, $compile);
            ser_servicio.form.modalWidth = ENUM.modal.width.full;
            ser_servicio.form.readonly = {compania: ser_servicio.session.compania_id};
            ser_servicio.form.titles = {
                new: "Agregar Servicio",
                edit: "Editar Servicio",
                view: "Ver Servicio"
            };
            ser_servicio.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("ser_servicio.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'nombre', rules);
            });
            $scope.$watch("ser_servicio.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'descripcion', rules);
            });
            $scope.$watch("ser_servicio.ser_servicio_direccion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'ser_servicio_direccion', rules);
            });
            //ms_product.selectQueries['departamento'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("ser_servicio.departamento", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'departamento', rules);
            });
            //ms_product.selectQueries['usuario'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("ser_servicio.usuario", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'usuario', rules);
            });
            $scope.$watch("ser_servicio.base_legal", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'base_legal', rules);
            });
            $scope.$watch("ser_servicio.requerimientos", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'requerimientos', rules);
            });
            $scope.$watch("ser_servicio.pasos_solicitud", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'pasos_solicitud', rules);
            });
            $scope.$watch("ser_servicio.tiempo_respuesta", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'tiempo_respuesta', rules);
            });
            $scope.$watch("ser_servicio.tiempo_entrega", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'tiempo_entrega', rules);
            });
            $scope.$watch("ser_servicio.formas_acceder", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'formas_acceder', rules);
            });
            $scope.$watch("ser_servicio.horario_prestacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'horario_prestacion', rules);
            });
            $scope.$watch("ser_servicio.costo", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'costo', rules);
            });
            $scope.$watch("ser_servicio.informacion_adicional", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_servicio, 'informacion_adicional', rules);
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