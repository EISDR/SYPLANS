app.controller("estrategia_tratamiento", function ($scope, $http, $compile) {
    estrategia_tratamiento = this;
    estrategia_tratamiento.session = new SESSION().current();
    estrategia_tratamiento.entidad = window.location.href.split('?')[1].replaceAll('RF', '');
    estrategia_tratamiento.fixFilters = [
        {
            field: "compania",
            value: estrategia_tratamiento.session.compania_id
        },
        {
            field: "institucion",
            operator: estrategia_tratamiento.session.institucion_id ? "=" : "is",
            value: estrategia_tratamiento.session.institucion_id ? estrategia_tratamiento.session.institucion_id : "$null"
        },
        {
            field: "entidad",
            value: estrategia_tratamiento.entidad
        }
    ];
    estrategia_tratamiento.singular = "Estrategia de Tratamiento";
    estrategia_tratamiento.plural = "Estrategias de Tratamientos";
    estrategia_tratamiento.headertitle = "Estrategias de Tratamientos";
    //estrategia_tratamiento.destroyForm = false;
    //estrategia_tratamiento.permissionTable = "tabletopermission";
    RUNCONTROLLER("estrategia_tratamiento", estrategia_tratamiento, $scope, $http, $compile);
    estrategia_tratamiento.formulary = function (data, mode, defaultData) {
        if (estrategia_tratamiento !== undefined) {
            RUN_B("estrategia_tratamiento", estrategia_tratamiento, $scope, $http, $compile);
            estrategia_tratamiento.entidad = window.location.href.split('?')[1].replaceAll('RF', '');
            estrategia_tratamiento.form.modalWidth = ENUM.modal.width.full;
            estrategia_tratamiento.form.readonly = {compania: estrategia_tratamiento.session.compania_id, institucion: estrategia_tratamiento.session.institucion, entidad: estrategia_tratamiento.entidad};
            estrategia_tratamiento.createForm(data, mode, defaultData);
            $scope.$watch("estrategia_tratamiento.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(estrategia_tratamiento, 'nombre', rules);
            });
            $scope.$watch("estrategia_tratamiento.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(estrategia_tratamiento, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("estrategia_tratamiento.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(estrategia_tratamiento, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("estrategia_tratamiento.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(estrategia_tratamiento, 'institucion', rules);
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