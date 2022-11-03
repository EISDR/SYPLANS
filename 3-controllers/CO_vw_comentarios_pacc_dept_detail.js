app.controller("vw_comentarios_pacc_dept_detail", function ($scope, $http, $compile) {
    vw_comentarios_pacc_dept_detail = this;
    vw_comentarios_pacc_dept_detail.pacc_dept_id = Row_id ? Row_id : null;
    vw_comentarios_pacc_dept_detail.Trimestre = Trimestre ? Trimestre : null;

    if (typeof pacc_departamental_detail != "undefined") {
        if (pacc_departamental_detail) {
            if (typeof pacc_departamental_detail !== 'not defined') {

                vw_comentarios_pacc_dept_detail.fixFilters = [
                    {
                        field: "pacc_dept_detail",
                        value: vw_comentarios_pacc_dept_detail.pacc_dept_id
                    }
                ];
                if (vw_comentarios_pacc_dept_detail.Trimestre) {
                    vw_comentarios_pacc_dept_detail.fixFilters.push({
                        "field": "$trimestre",
                        "value": `trimestre ${vw_comentarios_pacc_dept_detail.Trimestre}`
                    });

                } else {
                    // vw_comentarios_pacc_dept_detail.fixFilters.push({
                    //     "field": "$trimestre",
                    //     "operator": "is",
                    //     "value": "$NULL"
                    // });

                }
            } else {
                // vw_comentarios_pacc_dept_detail.fixFilters.push({
                //     "field": "$trimestre",
                //     "operator": "is",
                //     "value": "$NULL"
                // });

            }
        } else {
            // vw_comentarios_pacc_dept_detail.fixFilters.push({
            //     "field": "$trimestre",
            //     "operator": "is",
            //     "value": "$NULL"
            // });

        }
    } else {
        // vw_comentarios_pacc_dept_detail.fixFilters.push({
        //     "field": "$trimestre",
        //     "operator": "is",
        //     "value": "$NULL"
        // });

    }
    vw_comentarios_pacc_dept_detail.singular = "Comentario";
    vw_comentarios_pacc_dept_detail.plural = "Comentarios";
    vw_comentarios_pacc_dept_detail.headertitle = "Comentarios";
    //vw_comentarios_pacc_dept_detail.destroyForm = false;
    //vw_comentarios_pacc_dept_detail.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_comentarios_pacc_dept_detail", vw_comentarios_pacc_dept_detail, $scope, $http, $compile);
    vw_comentarios_pacc_dept_detail.formulary = function (data, mode, defaultData) {
        if (vw_comentarios_pacc_dept_detail !== undefined) {
            RUN_B("vw_comentarios_pacc_dept_detail", vw_comentarios_pacc_dept_detail, $scope, $http, $compile);
            vw_comentarios_pacc_dept_detail.form.modalWidth = ENUM.modal.width.full;
            vw_comentarios_pacc_dept_detail.form.readonly = {};
            vw_comentarios_pacc_dept_detail.createForm(data, mode, defaultData);
            $scope.$watch("vw_comentarios_pacc_dept_detail.comentario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios_pacc_dept_detail, 'comentario', rules);
            });
            $scope.$watch("vw_comentarios_pacc_dept_detail.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios_pacc_dept_detail, 'type', rules);
            });
            $scope.$watch("vw_comentarios_pacc_dept_detail.revision", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios_pacc_dept_detail, 'revision', rules);
            });
            $scope.$watch("vw_comentarios_pacc_dept_detail.value2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios_pacc_dept_detail, 'value2', rules);
            });
        }
    };
    vw_comentarios_pacc_dept_detail.triggers.table.after.load = function (records) {
        if (!vw_comentarios_pacc_dept_detail.Trimestre) {
            vw_comentarios_pacc_dept_detail.showColumn('trimestre');
            vw_comentarios_pacc_dept_detail.refreshAngular();
        } else {
            vw_comentarios_pacc_dept_detail.hideColumn('trimestre');
            vw_comentarios_pacc_dept_detail.refreshAngular();
        }
    };
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
