app.controller("objetivo_estrategico_especifico", function ($scope, $http, $compile) {
    objetivo_estrategico_especifico = this;
    //objetivo_estrategico_especifico.fixFilters = [];
    objetivo_estrategico_especifico.singular = "singular";
    objetivo_estrategico_especifico.plural = "plural";
    //objetivo_estrategico_especifico.destroyForm = false;
    //objetivo_estrategico_especifico.permissionTable = "tabletopermission";
    objetivo_estrategico_especifico.session = new SESSION().current();
    objetivo_estrategico_especifico.headertitle = objetivo_estrategico_especifico.session.tipo_institucion == 1 ? "Objetivos Específicos Institucionales": "Objetivos Específicos";
    RUNCONTROLLER("objetivo_estrategico_especifico", objetivo_estrategico_especifico, $scope, $http, $compile);
    objetivo_estrategico_especifico.formulary = function (data, mode, defaultData) {
        if (objetivo_estrategico_especifico !== undefined) {
            RUN_B("objetivo_estrategico_especifico", objetivo_estrategico_especifico, $scope, $http, $compile);
            if (objetivo_estrategico_especifico.session.tipo_institucion == 2) {
                objetivo_estrategico_especifico.form.titles = {
                    new: "Agregar Objetivo Específico",
                    edit: "Editar Objetivo Específico",
                    view: "Ver Objetivo Específico"
                };
            }
            objetivo_estrategico_especifico.form.modalWidth = ENUM.modal.width.full;
            objetivo_estrategico_especifico.form.readonly = {};
            objetivo_estrategico_especifico.createForm(data, mode, defaultData);
            $scope.$watch("objetivo_estrategico_especifico.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_estrategico_especifico, 'nombre', rules);
            });
            $scope.$watch("objetivo_estrategico_especifico.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_estrategico_especifico, 'descripcion', rules);
            });
            //ms_product.selectQueries['objetivo_estrategico'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
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