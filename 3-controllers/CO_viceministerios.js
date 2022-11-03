app.controller("viceministerios", function ($scope, $http, $compile) {
    viceministerios = this;
    //viceministerios.fixFilters = [];
    //viceministerios.singular = "singular";
    //viceministerios.plural = "plural";
    viceministerios.headertitle = "Viceministerios";
    //viceministerios.destroyForm = false;
    //viceministerios.permissionTable = "tabletopermission";
    RUNCONTROLLER("viceministerios", viceministerios, $scope, $http, $compile);
    viceministerios.formulary = function (data, mode, defaultData) {
        if (viceministerios !== undefined) {
            RUN_B("viceministerios", viceministerios, $scope, $http, $compile);
            viceministerios.form.modalWidth = ENUM.modal.width.full;
            viceministerios.form.readonly = {};
            viceministerios.createForm(data, mode, defaultData);
            $scope.$watch("viceministerios.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(viceministerios, 'nombre', rules);
            });
            $scope.$watch("viceministerios.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(viceministerios, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("viceministerios.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(viceministerios, 'compania', rules);
            });
            $scope.$watch("viceministerios.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(viceministerios, 'tempid', rules);
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
    viceministerios.triggers.table.after.insert = function (data) {
        //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        BASEAPI.updateall('direcciones_generales',{
            compania: compania.id ? compania.id : '$null',
            tempid: compania.id ? "$null" : compania.direcciones_generales,
            where: [
                {
                    field: "viceministerio",
                    value: data.inserted.id
                }
            ]
        }, function (){

        })
        return true;
    };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    viceministerios.triggers.table.after.update = function (data) {
        //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        BASEAPI.updateall('direcciones_generales',{
            compania: compania.id ? compania.id : '$null',
            tempid: compania.id ? "$null" : compania.direcciones_generales,
            where: [
                {
                    field: "direccion_general",
                    value: viceministerios.id
                }
            ]
        }, function (){

        });
    };
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