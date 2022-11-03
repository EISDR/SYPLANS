app.controller("denominacion_pnpsp", function ($scope, $http, $compile) {
    denominacion_pnpsp = this;
    //denominacion_pnpsp.fixFilters = [];
    //denominacion_pnpsp.singular = "singular";
    //denominacion_pnpsp.plural = "plural";
    denominacion_pnpsp.headertitle = "Denominación Resultados PNPSP";
    //denominacion_pnpsp.destroyForm = false;
    //denominacion_pnpsp.permissionTable = "tabletopermission";
    denominacion_pnpsp.session = new SESSION().current();
    var do_once = false;
    RUNCONTROLLER("denominacion_pnpsp", denominacion_pnpsp, $scope, $http, $compile);
    denominacion_pnpsp.formulary = function (data, mode, defaultData) {
        if (denominacion_pnpsp !== undefined) {
            RUN_B("denominacion_pnpsp", denominacion_pnpsp, $scope, $http, $compile);
            denominacion_pnpsp.form.modalWidth = ENUM.modal.width.full;
            denominacion_pnpsp.form.readonly = {};
            denominacion_pnpsp.createForm(data, mode, defaultData);

            denominacion_pnpsp.triggers.table.after.control = function (data) {
                if (!do_once) {
                    if (mode === 'new' && data == 'impacto_denominacion') {
                        denominacion_pnpsp.impacto_denominacion = [];
                        denominacion_pnpsp.form.loadDropDown('impacto_denominacion');
                        do_once = true;
                    }
                }
                //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
            };
            $scope.$watch("denominacion_pnpsp.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(denominacion_pnpsp, 'nombre', rules);
            });
            $scope.$watch("denominacion_pnpsp.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(denominacion_pnpsp, 'descripcion', rules);
            });
            //ms_product.selectQueries['pnpsp'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("denominacion_pnpsp.pnpsp", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(denominacion_pnpsp, 'pnpsp', rules);
            });
            $scope.$watch("denominacion_pnpsp.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(denominacion_pnpsp, 'tempid', rules);
            });
            $scope.$watch("denominacion_pnpsp.no_secuencia", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(denominacion_pnpsp, 'no_secuencia', rules);
            });
        }
    };
    denominacion_pnpsp.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        if (typeof pnpsp != "undefined") {
            if (pnpsp) {
                if (typeof pnpsp !== 'not defined') {
                    var validatett = await BASEAPI.firstp("denominacion_pnpsp", {
                        where: [
                            {
                                field: "no_secuencia",
                                operator: "=",
                                value: data.inserting.no_secuencia
                            },
                            {
                                open: "(",
                                field: "pnpsp",
                                operator: "=",
                                value: pnpsp.id ? pnpsp.id : "$null",
                                connector: "OR"
                            },
                            {
                                close: ")",
                                field: "tempid",
                                operator: "=",
                                value: `politica_gobierno${pnpsp.form.options.denominacion_pnpsp.tempId}`
                            },
                        ]
                    });
                    if (validatett) {
                        SWEETALERT.show({
                            type: "error",
                            title: "",
                            message: "Ya existe un registro con el No. Secuencia: " + data.inserting.no_secuencia
                        });
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    }else {
                        resolve(true);
                    }
                }
            }
        }
    });
    denominacion_pnpsp.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (denominacion_pnpsp.no_secuencia)
            data.updating.no_secuencia = denominacion_pnpsp.no_secuencia;
        var validatett = await BASEAPI.firstp("denominacion_pnpsp", {
            where: [
                {
                    field: "no_secuencia",
                    operator: "=",
                    value: data.updating.no_secuencia
                },
                {
                    open: "(",
                    field: "pnpsp",
                    operator: "=",
                    value: pnpsp.id,
                    connector: "OR"
                },
                {

                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: `politica_gobierno${pnpsp.form.options.denominacion_pnpsp.tempId}`
                },
                {
                    field: "id",
                    operator: "!=",
                    value: denominacion_pnpsp.id
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un registro con el No. Secuencia: " + data.updating.no_secuencia
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    denominacion_pnpsp.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        denominacion_pnpsp.runMagicManyToMany('impacto_politica', 'vw_impacto_politica',
            'denominacion_pnpsp', 'id', 'nombre_sec', 'politica_denominacion_pnpsp',
            'impacto_politica', 'id');
    };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    denominacion_pnpsp.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        do_once = false;
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
    // $scope.triggers.table.after.open = function (data) {
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