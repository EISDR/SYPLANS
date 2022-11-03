app.controller("vw_denominacion_pnpsp", function ($scope, $http, $compile) {
    vw_denominacion_pnpsp = this;
    //vw_denominacion_pnpsp.singular = "singular";
    //vw_denominacion_pnpsp.plural = "plural";
    vw_denominacion_pnpsp.headertitle = "Denominación Resultados PNPSP";
    //vw_denominacion_pnpsp.destroyForm = false;
    //vw_denominacion_pnpsp.permissionTable = "tabletopermission";
    if (typeof politica_gobierno != 'undefined') {
        if (typeof politica_gobierno != 'not defined') {
            if (politica_gobierno) {
                vw_denominacion_pnpsp.fixFilters = [
                    {
                        field: "id",
                        value: politica_gobierno.dataForView.lista_denominacion_pnpsp ? eval(politica_gobierno.dataForView.lista_denominacion_pnpsp) : -1
                    }
                ];
            }
        }
    }
    RUNCONTROLLER("vw_denominacion_pnpsp", vw_denominacion_pnpsp, $scope, $http, $compile);
    vw_denominacion_pnpsp.formulary = function (data, mode, defaultData) {
        if (vw_denominacion_pnpsp !== undefined) {
            RUN_B("vw_denominacion_pnpsp", vw_denominacion_pnpsp, $scope, $http, $compile);
            vw_denominacion_pnpsp.form.modalWidth = ENUM.modal.width.full;
            vw_denominacion_pnpsp.form.readonly = {};
            vw_denominacion_pnpsp.createForm(data, mode, defaultData);
            $scope.$watch("vw_denominacion_pnpsp.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_denominacion_pnpsp, 'nombre', rules);
            });
            $scope.$watch("vw_denominacion_pnpsp.nombre_sec", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_denominacion_pnpsp, 'nombre_sec', rules);
            });
            $scope.$watch("vw_denominacion_pnpsp.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_denominacion_pnpsp, 'descripcion', rules);
            });
            //ms_product.selectQueries['pnpsp'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_denominacion_pnpsp.pnpsp", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_denominacion_pnpsp, 'pnpsp', rules);
            });
            $scope.$watch("vw_denominacion_pnpsp.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_denominacion_pnpsp, 'tempid', rules);
            });
            $scope.$watch("vw_denominacion_pnpsp.no_secuencia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_denominacion_pnpsp, 'no_secuencia', rules);
            });
            $scope.$watch("vw_denominacion_pnpsp.no_sec", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_denominacion_pnpsp, 'no_sec', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_denominacion_pnpsp.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_denominacion_pnpsp, 'compania', rules);
            });
            $scope.$watch("vw_denominacion_pnpsp.impactos_politica", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_denominacion_pnpsp, 'impactos_politica', rules);
            });
        }
    };
    vw_denominacion_pnpsp.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        vw_denominacion_pnpsp.runMagicManyToMany('impacto_politica', 'vw_impacto_politica',
            'denominacion_pnpsp', 'id', 'nombre_sec', 'politica_denominacion_pnpsp',
            'impacto_politica', 'id');
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