app.controller("supuestos", function ($scope, $http, $compile) {
    supuestos = this;
    supuestos.session = new SESSION().current();
    // supuestos.fixFilters = [
    //     {
    //         field: "compania",
    //         value: supuestos.session.compania_id
    //     }
    // ];
    //supuestos.singular = "singular";
    //supuestos.plural = "plural";
    //supuestos.headertitle = "Hola Title";
    //supuestos.destroyForm = false;
    //supuestos.permissionTable = "tabletopermission";
    RUNCONTROLLER("supuestos", supuestos, $scope, $http, $compile);
    supuestos.formulary = function (data, mode, defaultData) {
        if (supuestos !== undefined) {
            RUN_B("supuestos", supuestos, $scope, $http, $compile);
            supuestos.form.modalWidth = ENUM.modal.width.full;
            supuestos.form.readonly = {compania: supuestos.session.compania_id, active: 1};
            supuestos.createForm(data, mode, defaultData);
            $scope.$watch("supuestos.nombre_completo", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(supuestos, 'nombre_completo', rules);
            });
            // $scope.$watch("supuestos.correo", async function (value) {
            //     var rules = [];
            //     //rules here
            //     if (supuestos.form.mode === "edit") {
            //         var result = await BASEAPI.firstp('supuestos', {
            //             "where": [
            //                 // {
            //                 //     "field": "compania",
            //                 //     "value": usuario.compania_id
            //                 // },
            //                 {
            //                     "field": "correo",
            //                     "value": value
            //                 },
            //                 {
            //                     "field": "id",
            //                     "operator": "!=",
            //                     "value": supuestos.id
            //                 }
            //             ]
            //         });
            //         console.log("En el watch del edit", supuestos.result);
            //     } else {
            //         var result = await BASEAPI.firstp('supuestos', {
            //             "where": [
            //                 // {
            //                 //     "field": "compania",
            //                 //     "value": usuario.compania_id
            //                 // },
            //                 {
            //                     "field": "correo",
            //                     "value": value
            //                 }
            //             ]
            //         });
            //     }
            //     rules.push(VALIDATION.general.required(value));
            //     rules.push(VALIDATION.text.email(value));
            //     rules.push(VALIDATION.yariel.maliciousCode(value));
            //     rules.push(VALIDATION.yariel.duplicateEmail(value, result ? result.correo : ""));
            //     VALIDATION.validate(supuestos, 'correo', rules);
            // });
            //ms_product.selectQueries['compania'] = [
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
    supuestos.triggers.table.after.close = function (data) {
        if (typeof resultado != "undefined") {
            if (resultado) {
                if (typeof resultado !== 'not defined') {
                    resultado.form.loadDropDown('supuestos');
                }
            }
        }
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    };
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
