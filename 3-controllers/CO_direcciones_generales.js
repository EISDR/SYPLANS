app.controller("direcciones_generales", function ($scope, $http, $compile) {
    direcciones_generales = this;
    //direcciones_generales.fixFilters = [];
    //direcciones_generales.singular = "singular";
    //direcciones_generales.plural = "plural";
    direcciones_generales.headertitle = "Direcciones Generales";
    direcciones_generales.destroyForm = false;
    //direcciones_generales.permissionTable = "tabletopermission";
    RUNCONTROLLER("direcciones_generales", direcciones_generales, $scope, $http, $compile);
    direcciones_generales.formulary = function (data, mode, defaultData) {
        if (direcciones_generales !== undefined) {
            RUN_B("direcciones_generales", direcciones_generales, $scope, $http, $compile);
            direcciones_generales.form.modalWidth = ENUM.modal.width.full;
            direcciones_generales.form.readonly = {compania: compania.id};
            direcciones_generales.createForm(data, mode, defaultData);
            direcciones_generales.selectQueries["viceministerio"] = [
                {
                    field: 'compania',
                    operator: "=",
                    value: compania.id,
                    connector:'OR'
                },
                {
                    "field": "tempid",
                    "operator":'=',
                    "value": compania.viceministeriosd
                }
            ];
            $scope.$watch("direcciones_generales.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(direcciones_generales.nombre));
                VALIDATION.validate(direcciones_generales, 'nombre', rules);
            });
            $scope.$watch("direcciones_generales.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(direcciones_generales, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("direcciones_generales.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(direcciones_generales, 'compania', rules);
            });
            $scope.$watch("direcciones_generales.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(direcciones_generales, 'tempid', rules);
            });
            direcciones_generales.triggers.table.after.control = function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
                if (data === "nombre"){
                    VALIDATION.validate(direcciones_generales, "nombre", [{
                        valid: (!DSON.oseaX0(direcciones_generales.nombre)),
                        message: MESSAGE.i('validations.Fieldisrequired'),
                        type: VALIDATION.types.error,
                        visible: false
                    }]);
                }
            };
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
    direcciones_generales.triggers.table.after.insert = function (data) {
        //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        BASEAPI.updateall('direcciones_area',{
            compania: compania.id ? compania.id : '$null',
            tempid: compania.id ? "$null" : compania.direcciones_area,
            where: [
                {
                    field: "direccion_general",
                    value: data.inserted.id
                }
            ]
        }, function (){
            direcciones_generales.refresh()
        })
        return true;
    };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    direcciones_generales.triggers.table.after.update = function (data) {
        //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        BASEAPI.updateall('direcciones_area',{
            compania: compania.id ? compania.id : '$null',
            tempid: compania.id ? "$null" : compania.direcciones_area,
            where: [
                {
                    field: "direccion_general",
                    value: direcciones_generales.id
                }
            ]
        }, function (){
            direcciones_generales.refresh()
        });
    };
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});