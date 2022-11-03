app.controller("vw_dashboard_genericosgrid_indicadores", function ($scope, $http, $compile) {
    vw_dashboard_genericosgrid_indicadores = this;
    vw_dashboard_genericosgrid_indicadores.automatic = false;
    vw_dashboard_genericosgrid_indicadores.headertitle = "Indicadores de Génericos";
    vw_dashboard_genericosgrid_indicadores.destroyForm = false;
    //vw_dashboard_genericosgrid_indicadores.fixFilters = [];
    vw_dashboard_genericosgrid_indicadores.session = new SESSION().current();
    var paso = true;
    //vw_dashboard_genericosgrid_indicadores.fixFilters = [{
    //    field: "compania",
    //    value: vw_dashboard_genericosgrid_indicadores.session.compania_id
    //}];
    vw_dashboard_genericosgrid_indicadores.singular = "Indicadores Génericos";
    vw_dashboard_genericosgrid_indicadores.plural = "Indicadores Génericos";
    //vw_dashboard_genericosgrid_indicadores.headertitle = "Hola Title";
    //vw_dashboard_genericosgrid_indicadores.destroyForm = false;
    //vw_dashboard_genericosgrid_indicadores.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_dashboard_genericosgrid_indicadores", vw_dashboard_genericosgrid_indicadores, $scope, $http, $compile);
    vw_dashboard_genericosgrid_indicadores.formulary = function (data, mode, defaultData) {
        if (vw_dashboard_genericosgrid_indicadores !== undefined) {
            RUN_B("vw_dashboard_genericosgrid_indicadores", vw_dashboard_genericosgrid_indicadores, $scope, $http, $compile);
            vw_dashboard_genericosgrid_indicadores.form.modalWidth = ENUM.modal.width.full;
            vw_dashboard_genericosgrid_indicadores.form.readonly = {compania: vw_dashboard_genericosgrid_indicadores.session.compania_id};
            vw_dashboard_genericosgrid_indicadores.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            vw_dashboard_genericosgrid_indicadores.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'institucion', rules);
            });
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.entidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'entidad', rules);
            });
            //ms_product.selectQueries['evento_indicador'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.evento_indicador", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'evento_indicador', rules);
            });
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.indicador", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'indicador', rules);
            });
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.direccion_meta", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'direccion_meta', rules);
            });
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.acumulado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'acumulado', rules);
            });
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.alcanzado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'alcanzado', rules);
            });
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.alcanzado2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'alcanzado2', rules);
            });
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.tipo_meta", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'tipo_meta', rules);
            });
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.month_inicio", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'month_inicio', rules);
            });
            $scope.$watch("vw_dashboard_genericosgrid_indicadores.tipo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_dashboard_genericosgrid_indicadores, 'tipo', rules);
            });
        }
    };
    vw_dashboard_genericosgrid_indicadores.triggers.table.after.load = function (records) {
        if (paso) {
            paso = false;
        }
        setTimeout(function () {
            $("#vw_dashboard_genericosgrid_indicadores .pagination li:eq(0)").hide();
        }, 2000);
    }
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