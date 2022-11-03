app.controller("vw_reporte_francis", function ($scope, $http, $compile) {
    vw_reporte_francis = this;
    //vw_reporte_francis.fixFilters = [];
    vw_reporte_francis.session = new SESSION().current();
    vw_reporte_francis.fixFilters = [{
        field: "compania",
        value: vw_reporte_francis.session.compania_id
    }];
    vw_reporte_francis.singular = "Reporte de Departamento x Productos y Presupuestos";
    vw_reporte_francis.plural = "Reporte de Departamento x Productos y Presupuestos";
    vw_reporte_francis.headertitle = "Reporte de Departamento x Productos y Presupuestos";
    //vw_reporte_francis.destroyForm = false;
    //vw_reporte_francis.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_reporte_francis", vw_reporte_francis, $scope, $http, $compile);
    vw_reporte_francis.plural = "Reporte de Departamento x Productos y Presupuestos";
    vw_reporte_francis.formulary = function (data, mode, defaultData) {
        if (vw_reporte_francis !== undefined) {
            RUN_B("vw_reporte_francis", vw_reporte_francis, $scope, $http, $compile);
            vw_reporte_francis.form.modalWidth = ENUM.modal.width.full;
            vw_reporte_francis.form.readonly = {compania: vw_reporte_francis.session.compania_id};
            vw_reporte_francis.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            vw_reporte_francis.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_reporte_francis.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'compania', rules);
            });
            $scope.$watch("vw_reporte_francis.ano", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'ano', rules);
            });
            $scope.$watch("vw_reporte_francis.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'departamento', rules);
            });
            $scope.$watch("vw_reporte_francis.presupuesto_departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'presupuesto_departamento', rules);
            });
            $scope.$watch("vw_reporte_francis.producto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'producto', rules);
            });
            $scope.$watch("vw_reporte_francis.presupuesto_producto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'presupuesto_producto', rules);
            });
            $scope.$watch("vw_reporte_francis.fecha_inicio", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'fecha_inicio', rules);
            });
            $scope.$watch("vw_reporte_francis.fecha_fin", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'fecha_fin', rules);
            });
            $scope.$watch("vw_reporte_francis.indicador", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'indicador', rules);
            });
            $scope.$watch("vw_reporte_francis.actividad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'actividad', rules);
            });
            $scope.$watch("vw_reporte_francis.medio_verificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'medio_verificacion', rules);
            });
            $scope.$watch("vw_reporte_francis.meta_trimestre_1", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'meta_trimestre_1', rules);
            });
            $scope.$watch("vw_reporte_francis.meta_trimestre_2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'meta_trimestre_2', rules);
            });
            $scope.$watch("vw_reporte_francis.meta_trimestre_3", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'meta_trimestre_3', rules);
            });
            $scope.$watch("vw_reporte_francis.meta_trimestre_4", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'meta_trimestre_4', rules);
            });
            $scope.$watch("vw_reporte_francis.alcanzada_trimestre_1", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'alcanzada_trimestre_1', rules);
            });
            $scope.$watch("vw_reporte_francis.alcanzada_trimestre_2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'alcanzada_trimestre_2', rules);
            });
            $scope.$watch("vw_reporte_francis.alcanzada_trimestre_3", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'alcanzada_trimestre_3', rules);
            });
            $scope.$watch("vw_reporte_francis.alcanzada_trimestre_4", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_francis, 'alcanzada_trimestre_4', rules);
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