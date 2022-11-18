app.controller("involucrados", function ($scope, $http, $compile) {
    involucrados = this;
    involucrados.session = new SESSION().current();
    involucrados.entidad = window.location.href.split('?')[1].replaceAll('RF', '');
    if (involucrados.entidad == "proyectos"){
        involucrados.fixFilters = [
            {
                field: "tipo",
                value: 6
            }
        ];
    }else{
        involucrados.fixFilters = [
            {
                field: "tipo",
                operator: "!=",
                value: 6
            }
        ];
    }
    involucrados.singular = "Involucrado";
    involucrados.plural = "Involucrados";
    involucrados.headertitle = "Involucrados";
    //involucrados.destroyForm = false;
    //involucrados.permissionTable = "tabletopermission";
    RUNCONTROLLER("involucrados", involucrados, $scope, $http, $compile);
    involucrados.formulary = function (data, mode, defaultData) {
        if (involucrados !== undefined) {
            RUN_B("involucrados", involucrados, $scope, $http, $compile);
            involucrados.form.modalWidth = ENUM.modal.width.full;
            if (involucrados.entidad == "proyectos") {
                involucrados.form.readonly = {
                    compania: involucrados.session.compania_id,
                    active: 1,
                    institucion: involucrados.session.institucion_id,
                    tipo: 6
                };
            }else{
                involucrados.form.readonly = {
                    compania: involucrados.session.compania_id,
                    active: 1,
                    institucion: involucrados.session.institucion_id
                };
            }
            involucrados.createForm(data, mode, defaultData);
            $scope.$watch("involucrados.nombre_completo", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(involucrados, 'nombre_completo', rules);
            });
            $scope.$watch("involucrados.correo", async function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.email(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(involucrados, 'correo', rules);
            });
            $scope.$watch("involucrados.tipo", function (value) {
                var rules = [];
                //rules here
                if (involucrados.session.tipo_institucion === 1)
                    rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(involucrados, 'tipo', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];;
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
