app.controller("proyecto_actividad", function ($scope, $http, $compile) {
    proyecto_actividad = this;
    //proyecto_actividad.fixFilters = [];
    //proyecto_actividad.singular = "singular";
    //proyecto_actividad.plural = "plural";
    proyecto_actividad.headertitle = "Actividades";
    //proyecto_actividad.destroyForm = false;
    //proyecto_actividad.permissionTable = "tabletopermission";
    RUNCONTROLLER("proyecto_actividad", proyecto_actividad, $scope, $http, $compile);
    proyecto_actividad.formulary = function (data, mode, defaultData) {
        if (proyecto_actividad !== undefined) {
            RUN_B("proyecto_actividad", proyecto_actividad, $scope, $http, $compile);
            proyecto_actividad.form.modalWidth = ENUM.modal.width.full;
            proyecto_actividad.form.readonly = {};
            proyecto_actividad.createForm(data, mode, defaultData);
            //ms_product.selectQueries['poa'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_actividad.poa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'poa', rules);
            });
            $scope.$watch("proyecto_actividad.proyecto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'proyecto', rules);
            });
            $scope.$watch("proyecto_actividad.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'nombre', rules);
            });
            $scope.$watch("proyecto_actividad.fecha_inicio", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'fecha_inicio', rules);
            });
            $scope.$watch("proyecto_actividad.fecha_fin", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'fecha_fin', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_actividad.responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'responsable', rules);
            });
            $scope.$watch("proyecto_actividad.presupuesto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'presupuesto', rules);
            });
            $scope.$watch("proyecto_actividad.completa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'completa', rules);
            });
            $scope.$watch("proyecto_actividad.comentario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'comentario', rules);
            });
            //ms_product.selectQueries['razon'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_actividad.razon", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'razon', rules);
            });
            $scope.$watch("proyecto_actividad.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'estatus', rules);
            });
            $scope.$watch("proyecto_actividad.originalid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'originalid', rules);
            });
            //ms_product.selectQueries['departamento'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_actividad.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'departamento', rules);
            });
            //ms_product.selectQueries['tipo_inversion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_actividad.tipo_inversion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'tipo_inversion', rules);
            });
            $scope.$watch("proyecto_actividad.maneja_presupuesto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'maneja_presupuesto', rules);
            });
            $scope.$watch("proyecto_actividad.order_at", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'order_at', rules);
            });
            $scope.$watch("proyecto_actividad.calificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'calificacion', rules);
            });
            $scope.$watch("proyecto_actividad.presupuesto_proyectado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'presupuesto_proyectado', rules);
            });
            $scope.$watch("proyecto_actividad.cantidad_completa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_actividad, 'cantidad_completa', rules);
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
    proyecto_actividad.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        if (moment(proyecto_actividad.fecha_inicio) >= moment(proyecto_item.from) && moment(proyecto_actividad.fecha_fin) <= moment(proyecto_item.to)) {
            resolve(true);
        } else {
            var template = `Las fechas desde y hasta de esta actividad deben estar comprendida entre el ${LAN.date(proyecto_item.from)} y el ${LAN.date(proyecto_item.to)}`;
            SWEETALERT.show({type: 'error', message: `${template}`});
            resolve(false);
        }
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    proyecto_actividad.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        if (moment(proyecto_actividad.fecha_inicio) >= moment(proyecto_item.from) && moment(proyecto_actividad.fecha_fin) <= moment(proyecto_item.to)) {
            resolve(true);
        } else {
            var template = `Las fechas desde y hasta de esta actividad deben estar comprendida entre el ${LAN.date(proyecto_item.from)} y el ${LAN.date(proyecto_item.to)}`;
            SWEETALERT.show({type: 'error', message: `${template}`});
            resolve(false);
        }
    });
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