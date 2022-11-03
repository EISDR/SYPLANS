app.controller("direcciones_area", function ($scope, $http, $compile) {
    direcciones_area = this;
    //direcciones_area.singular = "singular";
    //direcciones_area.plural = "plural";
    direcciones_area.headertitle = "Direcciones de Áreas";
    //direcciones_area.destroyForm = false;
    //direcciones_area.permissionTable = "tabletopermission";
    direcciones_area.show_field = false;
    RUNCONTROLLER("direcciones_area", direcciones_area, $scope, $http, $compile);
    direcciones_area.formulary = function (data, mode, defaultData) {
        if (direcciones_area !== undefined) {
            RUN_B("direcciones_area", direcciones_area, $scope, $http, $compile);
            direcciones_area.form.modalWidth = ENUM.modal.width.full;
            direcciones_area.form.readonly = {compania: compania.id};
            direcciones_area.createForm(data, mode, defaultData);
            direcciones_area.selectQueries["direccion_general"] = [
                {
                    field: 'compania',
                    operator: "=",
                    value: compania.id,
                    connector:'OR'
                },
                {
                    "field": "tempid",
                    "operator":'=',
                    "value": compania.direcciones_generales
                }
            ];
            $scope.$watch("direcciones_area.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(direcciones_area, 'nombre', rules);
            });
            $scope.$watch("direcciones_area.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(direcciones_area, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("direcciones_area.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(direcciones_area, 'compania', rules);
            });
            $scope.$watch("direcciones_area.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(direcciones_area, 'tempid', rules);
            });
            direcciones_area.triggers.table.after.control = function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
                if (data === "nombre" && mode === "edit"){
                    VALIDATION.validate(direcciones_area, "nombre", [{
                        valid: (!DSON.oseaX0(direcciones_area.nombre)),
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
    // direcciones_area.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    direcciones_area.triggers.table.after.insert = function (data) {
        //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        direcciones_area.refresh()
        return true;
    };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    direcciones_area.triggers.table.after.update = function (data) {
        //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        direcciones_area.refresh();
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