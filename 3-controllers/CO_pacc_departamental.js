app.controller("pacc_departamental", function ($scope, $http, $compile) {
    pacc_departamental = this;
    pacc_departamental.fixFilters = [
        {
            "field": "id",
            "value": -1
        },
    ];
    //pacc_departamental.singular = "singular";
    //pacc_departamental.plural = "plural";
    pacc_departamental.headertitle = "Evaluar PACC Departamentales";
    pacc_departamental.destroyForm = false;
    //pacc_departamental.permissionTable = "tabletopermission";
    pacc_departamental.pacc_id_dept = 0;
    RUNCONTROLLER("pacc_departamental", pacc_departamental, $scope, $http, $compile);
    RUN_B("pacc_departamental", pacc_departamental, $scope, $http, $compile);
    pacc_departamental.formulary = function (data, mode, defaultData) {
        if (pacc_departamental !== undefined) {

            pacc_departamental.form.modalWidth = ENUM.modal.width.full;
            pacc_departamental.form.readonly = {};
            pacc_departamental.createForm(data, mode, defaultData);
            //ms_product.selectQueries['pacc'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("pacc_departamental.pacc", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental, 'pacc', rules);
            });
            //ms_product.selectQueries['departamento'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("pacc_departamental.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental, 'departamento', rules);
            });
            $scope.$watch("pacc_departamental.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental, 'nombre', rules);
            });
            $scope.$watch("pacc_departamental.codigo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental, 'codigo', rules);
            });
            $scope.$watch("pacc_departamental.cantidadtotal", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental, 'cantidadtotal', rules);
            });
            $scope.$watch("pacc_departamental.version", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental, 'version', rules);
            });
            $scope.$watch("pacc_departamental.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc_departamental, 'estatus', rules);
            });
        }
    };
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };

    pacc_departamental.triggers.table.before.load = () => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
        if (typeof vw_pacc !== 'undefined') {
            if (typeof vw_pacc !== 'not defined') {
                if (vw_pacc) {
                    if (pacc_departamental.pacc_id_dept > 0) {
                        pacc_departamental.fixFilters = [
                            {
                                "field": "departamento",
                                "value": pacc_departamental.pacc_id_dept
                            },
                            {
                                "field": "pacc",
                                "value": pacc_departamental.pacc_id
                            },
                            {
                                field: "estatus",
                                value: 3
                            }
                        ];
                    } else {
                        if (pacc_departamental.pacc_id) {
                            pacc_departamental.fixFilters = [
                                {
                                    "field": "pacc",
                                    "value": pacc_departamental.pacc_id
                                },
                                {
                                    field: "estatus",
                                    value: 3
                                }
                            ];
                        } else {
                            pacc_departamental.fixFilters = [
                                {
                                    "field": "pacc",
                                    "value": -1
                                }
                            ];
                        }
                    }
                }
            }
        }
        if (typeof consolidacion !== 'undefined') {
            if (typeof consolidacion !== 'not defined') {
                if (consolidacion) {
                    if (pacc_departamental.pacc_id_dept > 0) {
                        pacc_departamental.fixFilters = [
                            {
                                "field": "departamento",
                                "value": pacc_departamental.pacc_id_dept
                            },
                            {
                                "field": "pacc",
                                "value": pacc_departamental.pacc_id
                            },
                            {
                                field: "estatus",
                                value: 5
                            }
                        ];
                    } else {
                        if (pacc_departamental.pacc_id) {
                            pacc_departamental.fixFilters = [
                                {
                                    "field": "pacc",
                                    "value": pacc_departamental.pacc_id
                                },
                                {
                                    field: "estatus",
                                    value: 5
                                }
                            ];
                        } else {
                            pacc_departamental.fixFilters = [
                                {
                                    "field": "pacc",
                                    "value": -1
                                }
                            ];
                        }
                    }
                }
            }
        }

        pacc_departamental.refreshAngular();
        resolve(true);
    });
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