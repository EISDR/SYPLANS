app.controller("vw_indicadores_notificacion", function ($scope, $http, $compile) {
    vw_indicadores_notificacion = this;
    vw_indicadores_notificacion.fixFilters = [
        {
            field: 'entidad',
            value: notificacion.institucion,
        }
    ];
    if (notificacion.departamento !== '[NULL]') {
        vw_indicadores_notificacion.fixFilters.push({
            field: 'departamento',
            operator: 'like',
            value: `%(${notificacion.departamento})%`
        })
    }
    if (notificacion.poadd !== '[NULL]') {
        vw_indicadores_notificacion.fixFilters.push({
            field: 'poa',
            value: notificacion.poadd
        })
    }
    //vw_indicadores_notificacion.singular = "singular";
    //vw_indicadores_notificacion.plural = "plural";
    vw_indicadores_notificacion.headertitle = "-";
    //vw_indicadores_notificacion.destroyForm = false;
    //vw_indicadores_notificacion.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_indicadores_notificacion", vw_indicadores_notificacion, $scope, $http, $compile);
    vw_indicadores_notificacion.formulary = function (data, mode, defaultData) {
        if (vw_indicadores_notificacion !== undefined) {
            RUN_B("vw_indicadores_notificacion", vw_indicadores_notificacion, $scope, $http, $compile);
            vw_indicadores_notificacion.form.modalWidth = ENUM.modal.width.full;
            vw_indicadores_notificacion.form.readonly = {};
            vw_indicadores_notificacion.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_indicadores_notificacion.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicadores_notificacion, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_indicadores_notificacion.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicadores_notificacion, 'institucion', rules);
            });
            $scope.$watch("vw_indicadores_notificacion.entidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicadores_notificacion, 'entidad', rules);
            });
            //ms_product.selectQueries['poa'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_indicadores_notificacion.poa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicadores_notificacion, 'poa', rules);
            });
            $scope.$watch("vw_indicadores_notificacion.indicador", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicadores_notificacion, 'indicador', rules);
            });
            $scope.$watch("vw_indicadores_notificacion.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicadores_notificacion, 'departamento', rules);
            });
            $scope.$watch("vw_indicadores_notificacion.direccion_meta", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicadores_notificacion, 'direccion_meta', rules);
            });
            $scope.$watch("vw_indicadores_notificacion.proyectado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicadores_notificacion, 'proyectado', rules);
            });
            $scope.$watch("vw_indicadores_notificacion.alcanzado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicadores_notificacion, 'alcanzado', rules);
            });
        }
    };
    vw_indicadores_notificacion.triggers.table.after.load = async function (records) {
        for (const d of vw_indicadores_notificacion.records.data) {
            d.cumplidor = await aacontroldemandofalso.cumplimiento(
                "vw_report_indicadores_producto",
                baseController.session,
                "indicador_producto",
                d.id);
        }
        vw_indicadores_notificacion.refreshAngular();
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
