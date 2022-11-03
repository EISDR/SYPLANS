app.controller("vw_riesgo_proceso", function ($scope, $http, $compile) {
    vw_riesgo_proceso = this;
    vw_riesgo_proceso.session = new SESSION().current();
    if (!vw_riesgo_proceso.session.institucion_id) {
        vw_riesgo_proceso.fixFilters = [
            {
                field: "estado",
                value: "Monitoreado"

            },
            {
                field: "compania",
                operator: "=",
                value: vw_riesgo_proceso.session.compania_id
            },
            {
                field: "institucion",
                operator: "is",
                value: "$null"
            }
        ];
    } else {
        vw_riesgo_proceso.fixFilters = [
            {
                field: "institucion",
                value: vw_riesgo_proceso.session.institucion_id
            }
        ];
    }
    vw_riesgo_proceso.singular = "Plan de Acción";
    vw_riesgo_proceso.plural = "Planes de Acción";
    vw_riesgo_proceso.headertitle = "Planes de Acción";
    //vw_riesgo_proceso.destroyForm = false;
    //vw_riesgo_proceso.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_riesgo_proceso", vw_riesgo_proceso, $scope, $http, $compile);
    vw_riesgo_proceso.formulary = function (data, mode, defaultData) {
        if (vw_riesgo_proceso !== undefined) {
            RUN_B("vw_riesgo_proceso", vw_riesgo_proceso, $scope, $http, $compile);
            vw_riesgo_proceso.form.modalWidth = ENUM.modal.width.full;
            vw_riesgo_proceso.form.readonly = {};
            vw_riesgo_proceso.createForm(data, mode, defaultData);
            $scope.$watch("vw_riesgo_proceso.table_", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'table_', rules);
            });
            $scope.$watch("vw_riesgo_proceso.riesgo_a_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'riesgo_a_id', rules);
            });
            $scope.$watch("vw_riesgo_proceso.riesgo_a", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'riesgo_a', rules);
            });
            $scope.$watch("vw_riesgo_proceso.registro", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'registro', rules);
            });
            $scope.$watch("vw_riesgo_proceso.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'nombre', rules);
            });
            $scope.$watch("vw_riesgo_proceso.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'descripcion', rules);
            });
            $scope.$watch("vw_riesgo_proceso.probabilidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'probabilidad', rules);
            });
            $scope.$watch("vw_riesgo_proceso.probabilidad_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'probabilidad_nombre', rules);
            });
            $scope.$watch("vw_riesgo_proceso.probabilidad_valor", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'probabilidad_valor', rules);
            });
            $scope.$watch("vw_riesgo_proceso.impacto_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'impacto_nombre', rules);
            });
            $scope.$watch("vw_riesgo_proceso.impacto_valor", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'impacto_valor', rules);
            });
            $scope.$watch("vw_riesgo_proceso.impacto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'impacto', rules);
            });
            $scope.$watch("vw_riesgo_proceso.factor_riesgo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'factor_riesgo', rules);
            });
            $scope.$watch("vw_riesgo_proceso.proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'proceso', rules);
            });
            $scope.$watch("vw_riesgo_proceso.causa_debilidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'causa_debilidad', rules);
            });
            $scope.$watch("vw_riesgo_proceso.consecuencia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'consecuencia', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_riesgo_proceso.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_riesgo_proceso.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'institucion', rules);
            });
            $scope.$watch("vw_riesgo_proceso.estado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'estado', rules);
            });
            $scope.$watch("vw_riesgo_proceso.evaluacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'evaluacion', rules);
            });
            $scope.$watch("vw_riesgo_proceso.riesgo_controls", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_proceso, 'riesgo_controls', rules);
            });
        }
    };
    vw_riesgo_proceso.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        vw_riesgo_proceso.runMagicOneToMany('riesgo_control', 'vw_riesgo_control_real', 'riesgo_control', 'nombre', 'id');
        vw_riesgo_proceso.runMagicColum('factor_riesgo', 'perspectiva', "id", "nombre");
        vw_riesgo_proceso.runMagicColum('proceso', 'proceso', "id", "nombre");
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