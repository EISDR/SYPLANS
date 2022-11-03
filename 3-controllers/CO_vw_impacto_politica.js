app.controller("vw_impacto_politica", function ($scope, $http, $compile) {
    vw_impacto_politica = this;
    //vw_impacto_politica.fixFilters = [];
    //vw_impacto_politica.singular = "singular";
    //vw_impacto_politica.plural = "plural";
    vw_impacto_politica.headertitle = "Impacto de la Política";
    //vw_impacto_politica.destroyForm = false;
    // vw_impacto_politica.permissionTable = "tabletopermission";
    if (typeof pnpsp != 'undefined') {
        if (typeof pnpsp != 'not defined') {
            if (pnpsp) {
                vw_impacto_politica.fixFilters = [
                    {
                        field: "id",
                        value: pnpsp.dataForView.lista_impacto_politica ? eval(pnpsp.dataForView.lista_impacto_politica) : -1
                    }
                ];
            }
        }
    }
    RUNCONTROLLER("vw_impacto_politica", vw_impacto_politica, $scope, $http, $compile);
    vw_impacto_politica.formulary = function (data, mode, defaultData) {
        if (vw_impacto_politica !== undefined) {
            RUN_B("vw_impacto_politica", vw_impacto_politica, $scope, $http, $compile);
            vw_impacto_politica.form.modalWidth = ENUM.modal.width.full;
            vw_impacto_politica.form.readonly = {};
            vw_impacto_politica.createForm(data, mode, defaultData);
            $scope.$watch("vw_impacto_politica.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_impacto_politica, 'nombre', rules);
            });
            $scope.$watch("vw_impacto_politica.nombre_sec", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_impacto_politica, 'nombre_sec', rules);
            });
            $scope.$watch("vw_impacto_politica.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_impacto_politica, 'descripcion', rules);
            });
            //ms_product.selectQueries['politica_gobierno'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_impacto_politica.politica_gobierno", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_impacto_politica, 'politica_gobierno', rules);
            });
            $scope.$watch("vw_impacto_politica.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_impacto_politica, 'tempid', rules);
            });
            $scope.$watch("vw_impacto_politica.no_secuencia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_impacto_politica, 'no_secuencia', rules);
            });
            $scope.$watch("vw_impacto_politica.no_sec", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_impacto_politica, 'no_sec', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_impacto_politica.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_impacto_politica, 'compania', rules);
            });
            $scope.$watch("vw_impacto_politica.denominaciones_pnpsp", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_impacto_politica, 'denominaciones_pnpsp', rules);
            });
        }
    };
    vw_impacto_politica.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        vw_impacto_politica.runMagicManyToMany('denominacion_pnpsp', 'vw_denominacion_pnpsp',
            'impacto_politica', 'id', 'nombre_sec', 'politica_denominacion_pnpsp',
            'denominacion_pnpsp', 'id');
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