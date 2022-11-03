app.controller("vw_pacc_departamental_detail", function ($scope, $http, $compile) {
    vw_pacc_departamental_detail = this;
    //vw_pacc_departamental_detail.fixFilters = [];
    //vw_pacc_departamental_detail.singular = "singular";
    //vw_pacc_departamental_detail.plural = "plural";
    vw_pacc_departamental_detail.headertitle = "Evaluar PACC Departamentales";
    vw_pacc_departamental_detail.destroyForm = false;
    //vw_pacc_departamental_detail.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_pacc_departamental_detail", vw_pacc_departamental_detail, $scope, $http, $compile);
    vw_pacc_departamental_detail.formulary = function (data, mode, defaultData) {
        if (vw_pacc_departamental_detail !== undefined) {
            RUN_B("vw_pacc_departamental_detail", vw_pacc_departamental_detail, $scope, $http, $compile);
            vw_pacc_departamental_detail.form.modalWidth = ENUM.modal.width.full;
            vw_pacc_departamental_detail.form.readonly = {};
            vw_pacc_departamental_detail.createForm(data, mode, defaultData);
            $scope.$watch("vw_pacc_departamental_detail.pacc_departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'pacc_departamento', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.pacc_descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'pacc_descripcion', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.unidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'unidad', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.cuatrimestre_1", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'cuatrimestre_1', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.cuatrimestre_2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'cuatrimestre_2', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.cuatrimestre_3", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'cuatrimestre_3', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.cuatrimestre_4", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'cuatrimestre_4', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.cantidad_total", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'cantidad_total', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'estatus', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.cbs", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'cbs', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.familia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'familia', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.precio_unitario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'precio_unitario', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.costo_total", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'costo_total', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.costo_total_real", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'costo_total_real', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.procedimiento_seleccion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'procedimiento_seleccion', rules);
            });
            //ms_product.selectQueries['fuente_financiamiento'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_pacc_departamental_detail.fuente_financiamiento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'fuente_financiamiento', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.valor_adquirido", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'valor_adquirido', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.fecha_necesidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'fecha_necesidad', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.observacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'observacion', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.revision", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'revision', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.actividad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'actividad', rules);
            });
            $scope.$watch("vw_pacc_departamental_detail.actividad_apoyo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc_departamental_detail, 'actividad_apoyo', rules);
            });
        }
    };
    vw_pacc_departamental_detail.triggers.table.after.load = async function (records) {
        vw_pacc_departamental_detail.runMagicColum('unidad', 'unidad_medida', "id", "nombre");
        // if (current_data.data.length > 0){
        //     vw_pacc.EP = 2;
        //     vw_pacc.EV = 0;
        // }else {
        //     vw_pacc.EP = 0;
        //     vw_pacc.EV = 4;
        // }
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    };
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