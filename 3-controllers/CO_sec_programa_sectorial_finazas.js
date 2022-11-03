app.controller("sec_programa_sectorial_finazas", function ($scope, $http, $compile) {
    sec_programa_sectorial_finazas = this;
    //sec_programa_sectorial_finazas.fixFilters = [];
    //sec_programa_sectorial_finazas.singular = "singular";
    //sec_programa_sectorial_finazas.plural = "plural";
    sec_programa_sectorial_finazas.headertitle = "Finanzas";
    //sec_programa_sectorial_finazas.destroyForm = false;
    //sec_programa_sectorial_finazas.permissionTable = "tabletopermission";
    RUNCONTROLLER("sec_programa_sectorial_finazas", sec_programa_sectorial_finazas, $scope, $http, $compile);
    sec_programa_sectorial_finazas.formulary = function (data, mode, defaultData) {
        if (sec_programa_sectorial_finazas !== undefined) {
            RUN_B("sec_programa_sectorial_finazas", sec_programa_sectorial_finazas, $scope, $http, $compile);
            sec_programa_sectorial_finazas.form.modalWidth = ENUM.modal.width.full;
            sec_programa_sectorial_finazas.form.readonly = {};
            sec_programa_sectorial_finazas.createForm(data, mode, defaultData);
            sec_programa_sectorial_finazas.lista_ano = [];

            for (var a = 2018; a <= 3000; a++) {
                sec_programa_sectorial_finazas.lista_ano.push(a);
            }
            $scope.$watch("sec_programa_sectorial_finazas.ano", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial_finazas, 'ano', rules);
            });
            $scope.$watch("sec_programa_sectorial_finazas.valor", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial_finazas, 'valor', rules);
            });
            $scope.$watch("sec_programa_sectorial_finazas.producto_terminal", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial_finazas, 'producto_terminal', rules);
            });
            $scope.$watch("sec_programa_sectorial_finazas.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial_finazas, 'tempid', rules);
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
    sec_programa_sectorial_finazas.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        if (sec_programa_sectorial_finazas.ano > 0) {
            data.inserting.ano = sec_programa_sectorial_finazas.ano;
        } else {
            SWEETALERT.show({
                type: "error",
                message: `Existen campos en el formulario con errores, favor revisarlos.`
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false)
        }
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    sec_programa_sectorial_finazas.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);

        if (sec_programa_sectorial_finazas.ano > 0) {
            data.updating.ano = sec_programa_sectorial_finazas.ano;
        } else {
            SWEETALERT.show({
                type: "error",
                message: `Existen campos en el formulario con errores, favor revisarlos.`
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false)
        }
        resolve(true);
    });
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
