app.controller("vw_trans_pacc_audit", function ($scope, $http, $compile) {
    vw_trans_pacc_audit = this;
    //vw_trans_pacc_audit.singular = "singular";
    //vw_trans_pacc_audit.plural = "plural";
    //vw_trans_pacc_audit.headertitle = "Hola Title";
    //vw_trans_pacc_audit.destroyForm = false;
    //vw_trans_pacc_audit.permissionTable = "tabletopermission";
    vw_trans_pacc_audit.session = new SESSION().current();
    if (typeof transfer_pacc != "undefined") {
        if (transfer_pacc) {
            if (typeof transfer_pacc !== 'not defined') {
                if (transfer_pacc.departamento != '[NULL]'){
                    vw_trans_pacc_audit.fixFilters = [
                        {
                            field: "id_departamento",
                            value: transfer_pacc.departamento
                        }
                    ];
                }else{
                    vw_trans_pacc_audit.fixFilters = [
                        {
                            field: "compania",
                            value: vw_trans_pacc_audit.session.compania_id
                        },
                        {
                            "field": "institucion",
                            "operator": vw_trans_pacc_audit.session.institucion_id ? "=" : "is",
                            "value":  vw_trans_pacc_audit.session.institucion_id ?  vw_trans_pacc_audit.session.institucion_id : "$null"
                        }
                    ];
                }
            }
        }
    }
    RUNCONTROLLER("vw_trans_pacc_audit", vw_trans_pacc_audit, $scope, $http, $compile);
    vw_trans_pacc_audit.formulary = function (data, mode, defaultData) {
        if (vw_trans_pacc_audit !== undefined) {
            RUN_B("vw_trans_pacc_audit", vw_trans_pacc_audit, $scope, $http, $compile);
            vw_trans_pacc_audit.form.modalWidth = ENUM.modal.width.full;
            vw_trans_pacc_audit.form.readonly = {};
            vw_trans_pacc_audit.createForm(data, mode, defaultData);
            $scope.$watch("vw_trans_pacc_audit.id_departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_trans_pacc_audit, 'id_departamento', rules);
            });
            $scope.$watch("vw_trans_pacc_audit.Departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_trans_pacc_audit, 'Departamento', rules);
            });
            $scope.$watch("vw_trans_pacc_audit.responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_trans_pacc_audit, 'responsable', rules);
            });
            $scope.$watch("vw_trans_pacc_audit.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_trans_pacc_audit, 'type', rules);
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