app.controller("vw_riesgo", function ($scope, $http, $compile) {
    vw_riesgo = this;
    vw_riesgo.session = new SESSION().current();
    if (!vw_riesgo.session.institucion_id) {
        vw_riesgo.fixFilters = [
            {
                field: "estado",
                value: "Monitoreado"

            },
            {
                field: "compania",
                operator: "=",
                value: vw_riesgo.session.compania_id
            },
            {
                field: "institucion",
                operator: "is",
                value: "$null"
            }
        ];
    } else {
        vw_riesgo.fixFilters = [
            {
                field: "institucion",
                value: vw_riesgo.session.institucion_id
            }
        ];
    }
    vw_riesgo.singular = "Plan de Acción";
    vw_riesgo.plural = "Planes de Acción";
    vw_riesgo.headertitle = "Planes de Acción";
    //vw_riesgo.destroyForm = false;
    //vw_riesgo.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_riesgo", vw_riesgo, $scope, $http, $compile);
    vw_riesgo.formulary = function (data, mode, defaultData) {
        if (vw_riesgo !== undefined) {
            RUN_B("vw_riesgo", vw_riesgo, $scope, $http, $compile);
            vw_riesgo.form.modalWidth = ENUM.modal.width.full;
            vw_riesgo.form.readonly = {};
            vw_riesgo.createForm(data, mode, defaultData);
            $scope.$watch("vw_riesgo.table_", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'table_', rules);
            });
            $scope.$watch("vw_riesgo.riesgo_a_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'riesgo_a_id', rules);
            });
            $scope.$watch("vw_riesgo.riesgo_a", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'riesgo_a', rules);
            });
            $scope.$watch("vw_riesgo.registro", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'registro', rules);
            });
            $scope.$watch("vw_riesgo.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'nombre', rules);
            });
            $scope.$watch("vw_riesgo.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'descripcion', rules);
            });
            $scope.$watch("vw_riesgo.probabilidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'probabilidad', rules);
            });
            $scope.$watch("vw_riesgo.probabilidad_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'probabilidad_nombre', rules);
            });
            $scope.$watch("vw_riesgo.probabilidad_valor", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'probabilidad_valor', rules);
            });
            $scope.$watch("vw_riesgo.impacto_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'impacto_nombre', rules);
            });
            $scope.$watch("vw_riesgo.impacto_valor", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'impacto_valor', rules);
            });
            $scope.$watch("vw_riesgo.impacto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'impacto', rules);
            });
            $scope.$watch("vw_riesgo.factor_riesgo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'factor_riesgo', rules);
            });
            $scope.$watch("vw_riesgo.proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'proceso', rules);
            });
            $scope.$watch("vw_riesgo.causa_debilidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'causa_debilidad', rules);
            });
            $scope.$watch("vw_riesgo.consecuencia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'consecuencia', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_riesgo.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_riesgo.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'institucion', rules);
            });
            $scope.$watch("vw_riesgo.estado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'estado', rules);
            });
            $scope.$watch("vw_riesgo.evaluacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'evaluacion', rules);
            });
            $scope.$watch("vw_riesgo.riesgo_controls", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo, 'riesgo_controls', rules);
            });
        }
    };
    vw_riesgo.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        vw_riesgo.runMagicOneToMany('riesgo_control', 'vw_riesgo_control_real', 'riesgo_control', 'nombre', 'id');
        vw_riesgo.runMagicColum('factor_riesgo', 'perspectiva', "id", "nombre");
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