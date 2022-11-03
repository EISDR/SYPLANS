app.controller("pacc_auditoria", function ($scope, $http, $compile) {
    pacc_auditoria = this;
    user = new SESSION().current();
    pacc_auditoria.fixFilters = [
        {
            field: user.institucion_id ? "institucion_id" : "compania_id",
            value: user.institucion_id || user.compania_id
        }
    ];
    if (!user.institucion_id) {
        pacc_auditoria.fixFilters.push({
            field: "institucion_id",
            operator: "is",
            value: "$null",
        })
    }
    if (IDDELPACC) {
        pacc_auditoria.fixFilters.push({
            field: "relation",
            value: IDDELPACC,
        })
    }
    //pacc_auditoria.singular = "singular";
    //pacc_auditoria.plural = "plural";
    //pacc_auditoria.headertitle = "Hola Title";
    //pacc_auditoria.destroyForm = false;
    //pacc_auditoria.permissionTable = "tabletopermission";
    RUNCONTROLLER("pacc_auditoria", pacc_auditoria, $scope, $http, $compile);
    pacc_auditoria.formulary = function (data, mode, defaultData) {
        if (pacc_auditoria !== undefined) {
            RUN_B("pacc_auditoria", pacc_auditoria, $scope, $http, $compile);
            pacc_auditoria.form.modalWidth = ENUM.modal.width.full;
            pacc_auditoria.form.readonly = {};
            pacc_auditoria.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("pacc_auditoria.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_auditoria, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("pacc_auditoria.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_auditoria, 'institucion', rules);
            });
            $scope.$watch("pacc_auditoria.campo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_auditoria, 'campo', rules);
            });
            $scope.$watch("pacc_auditoria.valoranterior", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_auditoria, 'valoranterior', rules);
            });
            $scope.$watch("pacc_auditoria.valornuevo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_auditoria, 'valornuevo', rules);
            });
            $scope.$watch("pacc_auditoria.cambiadoen", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_auditoria, 'cambiadoen', rules);
            });
            //ms_product.selectQueries['usuario'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("pacc_auditoria.usuario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_auditoria, 'usuario', rules);
            });
            //ms_product.selectQueries['pacc_departamental_detail'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("pacc_auditoria.pacc_departamental_detail", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_auditoria, 'pacc_departamental_detail', rules);
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
