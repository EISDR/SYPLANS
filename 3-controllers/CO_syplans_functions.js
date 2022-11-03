app.controller("syplans_functions", function ($scope, $http, $compile) {
    syplans_functions = this;
    //syplans_functions.fixFilters = [];
    //syplans_functions.singular = "singular";
    //syplans_functions.plural = "plural";
    //syplans_functions.headertitle = "Hola Title";
    //syplans_functions.destroyForm = false;
    //syplans_functions.permissionTable = "tabletopermission";
    RUNCONTROLLER("syplans_functions", syplans_functions, $scope, $http, $compile);
    RUN_B("syplans_functions", syplans_functions, $scope, $http, $compile);
    $scope.$watch("syplans_functions.compania_pei", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        syplans_functions.institucion_pei = '[NULL]';
        syplans_functions.form.loadDropDown('institucion_pei');
        syplans_functions.select_pei = '[NULL]';
        syplans_functions.form.loadDropDown('select_pei');
        VALIDATION.validate(syplans_functions, 'compania_pei', rules);
    });
    $scope.$watch("syplans_functions.institucion_pei", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        syplans_functions.select_pei = '[NULL]';
        syplans_functions.form.loadDropDown('select_pei');
        VALIDATION.validate(syplans_functions, 'institucion_pei', rules);
    });
    $scope.$watch("syplans_functions.select_pei", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        if (syplans_functions.form.selected('select_pei')) {
            syplans_functions.pei_estatus = syplans_functions.form.selected('select_pei').estatus;
        }else{
            syplans_functions.pei_estatus = "";
        }
        VALIDATION.validate(syplans_functions, 'select_pei', rules);
    });
    $scope.$watch("syplans_functions.compania_pacc", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        syplans_functions.institucion_pacc = '[NULL]';
        syplans_functions.form.loadDropDown('institucion_pacc');
        syplans_functions.select_pacc = '[NULL]';
        syplans_functions.form.loadDropDown('select_pacc');
        VALIDATION.validate(syplans_functions, 'compania_pacc', rules);
    });
    $scope.$watch("syplans_functions.institucion_pacc", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        syplans_functions.select_pacc = '[NULL]';
        syplans_functions.form.loadDropDown('select_pacc');
        VALIDATION.validate(syplans_functions, 'institucion_pacc', rules);
    });
    $scope.$watch("syplans_functions.select_pacc", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(syplans_functions, 'select_pacc', rules);
    });
    $scope.$watch("syplans_functions.compania_poa", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        syplans_functions.institucion_poa = '[NULL]';
        syplans_functions.form.loadDropDown('institucion_poa');
        syplans_functions.select_poa = '[NULL]';
        syplans_functions.form.loadDropDown('select_poa');
        syplans_functions.select_departamento = '[NULL]';
        syplans_functions.form.loadDropDown('select_departamento');
        syplans_functions.poa_estatus = '[NULL]';
        syplans_functions.form.loadDropDown('poa_estatus');
        VALIDATION.validate(syplans_functions, 'compania_poa', rules);
    });
    $scope.$watch("syplans_functions.institucion_poa", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        syplans_functions.select_poa = '[NULL]';
        syplans_functions.form.loadDropDown('select_poa');
        syplans_functions.select_departamento = '[NULL]';
        syplans_functions.form.loadDropDown('select_departamento');
        syplans_functions.poa_estatus = '[NULL]';
        syplans_functions.form.loadDropDown('poa_estatus');
        VALIDATION.validate(syplans_functions, 'institucion_poa', rules);
    });
    $scope.$watch("syplans_functions.select_poa", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        syplans_functions.select_departamento = '[NULL]';
        syplans_functions.form.loadDropDown('select_departamento');
        syplans_functions.poa_estatus = '[NULL]';
        syplans_functions.form.loadDropDown('poa_estatus');
        VALIDATION.validate(syplans_functions, 'select_poa', rules);
    });
    $scope.$watch("syplans_functions.select_departamento", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        syplans_functions.poa_estatus = '[NULL]';
        syplans_functions.form.loadDropDown('poa_estatus');
        VALIDATION.validate(syplans_functions, 'select_departamento', rules);
    });
    $scope.$watch("syplans_functions.institucion_pacc", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(syplans_functions, 'institucion_pacc', rules);
    });
    syplans_functions.formulary = function (data, mode, defaultData) {
        if (syplans_functions !== undefined) {
            RUN_B("syplans_functions", syplans_functions, $scope, $http, $compile);
            syplans_functions.form.modalWidth = ENUM.modal.width.full;
            syplans_functions.form.readonly = {};
            syplans_functions.createForm(data, mode, defaultData);
            $scope.$watch("syplans_functions.1", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(syplans_functions, '1', rules);
            });
        }
    };
    syplans_functions.update_pei = function (pei_estatus){
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        BASEAPI.updateall('pei',{
            estatus: pei_estatus,
            where: [{
                field: "id",
                value: syplans_functions.select_pei
            }]
        },function (result){
            if (result) {
                SWEETALERT.stop();
                if (pei_estatus == 3) {
                    SWEETALERT.show({
                        message: "PEI ha sido Desautorizado",
                        confirm: function (){
                            syplans_functions.compania_pei = '[NULL]';
                            syplans_functions.form.loadDropDown('compania_pei');
                            syplans_functions.institucion_pei = '[NULL]';
                            syplans_functions.form.loadDropDown('institucion_pei');
                            syplans_functions.select_pei = '[NULL]';
                            syplans_functions.form.loadDropDown('select_pei');
                        }
                    });
                }else{
                    SWEETALERT.show({
                        message: "PEI ha sido Autorizado",
                        confirm: function (){
                            syplans_functions.compania_pei = '[NULL]';
                            syplans_functions.form.loadDropDown('compania_pei');
                            syplans_functions.institucion_pei = '[NULL]';
                            syplans_functions.form.loadDropDown('institucion_pei');
                            syplans_functions.select_pei = '[NULL]';
                            syplans_functions.form.loadDropDown('select_pei');
                        }
                    });
                }
            }
        })
    }
    syplans_functions.delete_pacc = function(){
        BASEAPI.list('pacc_departamental',{
            limit: 0,
            where: [
                {
                    field: "pacc",
                    value: syplans_functions.select_pacc
                }
            ]
        }, function (result){
            var pacc_departamentos = [];
            if (result){
                for (var i of result.data){
                    pacc_departamentos.push(i.id);
                }
                if (pacc_departamentos.length > 0) {
                    BASEAPI.deleteall('pacc_departamental_detail', [
                            {
                                field: "pacc_departamento",
                                value: pacc_departamentos
                            }
                        ], function (result){
                        if (result) {
                            BASEAPI.deleteall('pacc_departamental', [
                                    {
                                        field: "id",
                                        value: pacc_departamentos
                                    }
                                ], function (result) {
                                if (result) {
                                    BASEAPI.updateall('pacc', {
                                        estatus: 1,
                                        where: [
                                            {
                                                field: "id",
                                                value: syplans_functions.select_pacc
                                            }
                                        ]
                                    }, function (result) {
                                        if (result) {
                                            SWEETALERT.stop();
                                            SWEETALERT.show({
                                                message: "Se han borrado todos los datos del PACC",
                                                confirm: function () {
                                                    syplans_functions.compania_pacc = '[NULL]';
                                                    syplans_functions.form.loadDropDown('compania_pacc');
                                                    syplans_functions.institucion_pacc = '[NULL]';
                                                    syplans_functions.form.loadDropDown('institucion_pacc');
                                                    syplans_functions.select_pacc = '[NULL]';
                                                    syplans_functions.form.loadDropDown('select_pacc');
                                                }
                                            });
                                        }
                                    });
                                }
                            })
                        }
                    })
                }else{
                    BASEAPI.updateall('pacc', {
                        estatus: 1,
                        where: [
                            {
                                field: "id",
                                value: syplans_functions.select_pacc
                            }
                        ]
                    }, function (result) {
                        if (result) {
                            SWEETALERT.stop();
                            SWEETALERT.show({
                                message: "El PACC seleccionado no tiene PACC Departamentales ni Unidades de Compra creadas.",
                                confirm: function () {
                                    syplans_functions.compania_pacc = '[NULL]';
                                    syplans_functions.form.loadDropDown('compania_pacc');
                                    syplans_functions.institucion_pacc = '[NULL]';
                                    syplans_functions.form.loadDropDown('institucion_pacc');
                                    syplans_functions.select_pacc = '[NULL]';
                                    syplans_functions.form.loadDropDown('select_pacc');
                                }
                            });
                        }
                    });
                }
            }
        })
    }
    syplans_functions.update_poa_dept = function(){
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        BASEAPI.updateall('presupuesto_aprobado',{
            estatus: syplans_functions.poa_estatus,
            where: [{
                field: "id",
                value: syplans_functions.select_departamento
            }]
        },function (result){
            if (result) {
                SWEETALERT.stop();
                SWEETALERT.show({
                    message: 'El POA del Departamento: "' + syplans_functions.form.selected('select_departamento').departamento + '" ha sido actualizado',
                    confirm: function () {
                        syplans_functions.compania_poa = '[NULL]';
                        syplans_functions.form.loadDropDown('compania_poa');
                        syplans_functions.institucion_poa = '[NULL]';
                        syplans_functions.form.loadDropDown('institucion_poa');
                        syplans_functions.select_poa = '[NULL]';
                        syplans_functions.form.loadDropDown('select_poa');
                        syplans_functions.select_departamento = '[NULL]';
                        syplans_functions.form.loadDropDown('select_departamento');
                        syplans_functions.poa_estatus = '[NULL]';
                        syplans_functions.form.loadDropDown('poa_estatus');
                    }
                });
            }
        });
    }
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