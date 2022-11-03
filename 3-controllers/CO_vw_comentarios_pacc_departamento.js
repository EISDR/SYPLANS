app.controller("vw_comentarios_pacc_departamento", function ($scope, $http, $compile) {
    vw_comentarios_pacc_departamento = this;
    //vw_comentarios_pacc_departamento.fixFilters = [];
    //vw_comentarios_pacc_departamento.singular = "singular";
    //vw_comentarios_pacc_departamento.plural = "plural";
    //vw_comentarios_pacc_departamento.headertitle = "Hola Title";
    //vw_comentarios_pacc_departamento.destroyForm = false;
    //vw_comentarios_pacc_departamento.permissionTable = "tabletopermission";
    if (typeof vw_pacc != "undefined") {
        if (vw_pacc) {
            if (typeof vw_pacc !== 'not defined') {
                vw_comentarios_pacc_departamento.pacc_departamento = vw_pacc.pacc_dept_id;
                vw_comentarios_pacc_departamento.fixFilters = [
                    {
                        field: "pacc_departamental",
                        value: vw_comentarios_pacc_departamento.pacc_departamento
                    }
                ];
            }
        }
    }

    if (typeof consolidacion != "undefined") {
        if (consolidacion) {
            if (typeof consolidacion !== 'not defined') {
                vw_comentarios_pacc_departamento.pacc_departamento = consolidacion.pacc_dept_id;
                vw_comentarios_pacc_departamento.fixFilters = [
                    {
                        field: "pacc_departamental",
                        value: vw_comentarios_pacc_departamento.pacc_departamento
                    }
                ];
            }
        }
    }

    vw_comentarios_pacc_departamento.singular = "Comentario";
    vw_comentarios_pacc_departamento.plural = "Comentarios";
    vw_comentarios_pacc_departamento.headertitle = "Comentarios";

    RUNCONTROLLER("vw_comentarios_pacc_departamento", vw_comentarios_pacc_departamento, $scope, $http, $compile);
    vw_comentarios_pacc_departamento.formulary = function (data, mode, defaultData) {
        if (vw_comentarios_pacc_departamento !== undefined) {
            RUN_B("vw_comentarios_pacc_departamento", vw_comentarios_pacc_departamento, $scope, $http, $compile);
            vw_comentarios_pacc_departamento.form.modalWidth = ENUM.modal.width.full;
            vw_comentarios_pacc_departamento.form.readonly = {};
            vw_comentarios_pacc_departamento.createForm(data, mode, defaultData);
            $scope.$watch("vw_comentarios_pacc_departamento.comentario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios_pacc_departamento, 'comentario', rules);
            });
            $scope.$watch("vw_comentarios_pacc_departamento.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios_pacc_departamento, 'type', rules);
            });
            $scope.$watch("vw_comentarios_pacc_departamento.pacc_dept_detail", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios_pacc_departamento, 'pacc_dept_detail', rules);
            });
            $scope.$watch("vw_comentarios_pacc_departamento.revision", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios_pacc_departamento, 'revision', rules);
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