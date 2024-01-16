app.controller("tipo_inconformidad", function ($scope, $http, $compile) {
    tipo_inconformidad = this;
    tipo_inconformidad.session = new SESSION().current();
    tipo_inconformidad.fixFilters = [
        {
            field: "compania",
            value: tipo_inconformidad.session.compania_id
        },
        {
            "field": "institucion",
            "operator": tipo_inconformidad.session.institucion_id ? "=" : "is",
            "value":  tipo_inconformidad.session.institucion_id ?  tipo_inconformidad.session.institucion_id : "$null"
        }
    ];
    //tipo_inconformidad.singular = "singular";
    //tipo_inconformidad.plural = "plural";
    tipo_inconformidad.headertitle = "Tipos de hallazgos";
    //tipo_inconformidad.destroyForm = false;
    //tipo_inconformidad.permissionTable = "tabletopermission";
    RUNCONTROLLER("tipo_inconformidad", tipo_inconformidad, $scope, $http, $compile);
    tipo_inconformidad.formulary = function (data, mode, defaultData) {
        if (tipo_inconformidad !== undefined) {
            RUN_B("tipo_inconformidad", tipo_inconformidad, $scope, $http, $compile);
            tipo_inconformidad.form.modalWidth = ENUM.modal.width.full;
            tipo_inconformidad.form.readonly = {compania: tipo_inconformidad.session.compania_id, institucion: tipo_inconformidad.session.institucion};
            tipo_inconformidad.createForm(data, mode, defaultData);
            $scope.$watch("tipo_inconformidad.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_inconformidad, 'nombre', rules);
            });
            $scope.$watch("tipo_inconformidad.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_inconformidad, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("tipo_inconformidad.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_inconformidad, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("tipo_inconformidad.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_inconformidad, 'institucion', rules);
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