app.controller("evento_riesgo_generico2", function ($scope, $http, $compile) {
    evento_riesgo_generico2 = this;
    //evento_riesgo_generico2.fixFilters = [];
    evento_riesgo_generico2.session = new SESSION().current();
    evento_riesgo_generico2.destroyForm = false;
    evento_riesgo_generico2.myfirsttime = 0;
    //evento_riesgo_generico2.fixFilters = [{
    //    field: "compania",
    //    value: evento_riesgo_generico2.session.compania_id
    //}];
    //evento_riesgo_generico2.singular = "singular";
    //evento_riesgo_generico2.plural = "plural";
    //evento_riesgo_generico2.headertitle = "Hola Title";
    //evento_riesgo_generico2.destroyForm = false;
    //evento_riesgo_generico2.permissionTable = "tabletopermission";
    RUNCONTROLLER("evento_riesgo_generico2", evento_riesgo_generico2, $scope, $http, $compile);
    RUN_B("evento_riesgo_generico2", evento_riesgo_generico2, $scope, $http, $compile);
    evento_riesgo_generico2.selectQueries['evento_indicador'] = [
        {
            "field": "compania",
            "value": evento_riesgo_generico2.session.compania_id
        },
        {
            "field": "tipo",
            "value": [2,3,4]
        }
    ];
    evento_riesgo_generico2.$scope.$watch("evento_riesgo_generico2.evento_indicador", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        if (evento_riesgo_generico2.myfirsttime > 0) {
            STORAGE.add('evento2', evento_riesgo_generico2.evento_indicador);
        }
        evento_riesgo_generico2.myfirsttime++
        if (evento_riesgo_generico2.evento_indicador){
            if (evento_riesgo_generico2.evento_indicador.includes('r')) {
                evento_riesgo_generico.fixFilters = [
                    {
                        "field": "evento",
                        "value": evento_riesgo_generico2.evento_indicador.replaceAll('r', '')
                    },
                    {
                        "field": "related",
                        "value": 1
                    },
                    {
                        "field": "compania",
                        "value": evento_riesgo_generico.session.compania_id
                    }
                ];
            } else if (evento_riesgo_generico2.evento_indicador.includes('s')) {
                evento_riesgo_generico.fixFilters = [
                    {
                        "field": "evento",
                        "value": evento_riesgo_generico2.evento_indicador.replaceAll('s', '')
                    },
                    {
                        "field": "related",
                        "value": 2
                    },
                    {
                        "field": "compania",
                        "value": evento_riesgo_generico.session.compania_id
                    }
                ];
            } else if (evento_riesgo_generico2.evento_indicador.includes('i')) {
                evento_riesgo_generico.fixFilters = [
                    {
                        "field": "evento",
                        "value": evento_riesgo_generico2.evento_indicador.replaceAll('i', '')
                    },
                    {
                        "field": "related",
                        "value": 3
                    },
                    {
                        "field": "compania",
                        "value": evento_riesgo_generico.session.compania_id
                    }
                ];
            } else {
                evento_riesgo_generico.fixFilters = [
                    {
                        "field": "evento",
                        "value": evento_riesgo_generico2.evento_indicador
                    },
                    {
                        "field": "related",
                        "value": 0
                    },
                    {
                        "field": "compania",
                        "value": evento_riesgo_generico.session.compania_id
                    }
                ];
            }
        }else{
            evento_riesgo_generico.fixFilters = [
                {
                    field: "id",
                    value: -1
                }
            ]
        }
        evento_riesgo_generico.refresh();
        VALIDATION.validate(evento_riesgo_generico2, 'evento_indicador', rules);
    });
    evento_riesgo_generico2.formulary = function (data, mode, defaultData) {
        if (evento_riesgo_generico2 !== undefined) {
            evento_riesgo_generico2.form.modalWidth = ENUM.modal.width.full;
            evento_riesgo_generico2.form.readonly = {compania: evento_riesgo_generico2.session.compania_id};
            evento_riesgo_generico2.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            evento_riesgo_generico2.createForm(data, mode, defaultData);

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