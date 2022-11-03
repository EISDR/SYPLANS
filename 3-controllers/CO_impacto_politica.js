app.controller("impacto_politica", function ($scope, $http, $compile) {
    impacto_politica = this;
    impacto_politica.singular = "singular";
    impacto_politica.plural = "plural";
    impacto_politica.headertitle = "Impacto de la Política";
    //impacto_politica.destroyForm = false;
    //impacto_politica.permissionTable = "tabletopermission";
    impacto_politica.session = new SESSION().current();
    var do_once = false;
    //impacto_politica.fixFilters = [];
    RUNCONTROLLER("impacto_politica", impacto_politica, $scope, $http, $compile);
    impacto_politica.formulary = function (data, mode, defaultData) {
        if (impacto_politica !== undefined) {
            RUN_B("impacto_politica", impacto_politica, $scope, $http, $compile);
            impacto_politica.form.modalWidth = ENUM.modal.width.full;
            impacto_politica.form.readonly = {};
            impacto_politica.createForm(data, mode, defaultData);

            impacto_politica.triggers.table.after.control = function (data) {
                if (!do_once){
                    if (mode === 'new' && data == 'impacto_denominacion') {
                        impacto_politica.impacto_denominacion = [];
                        impacto_politica.form.loadDropDown('impacto_denominacion');
                        do_once = true;
                    }
                }
                //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
            };
            $scope.$watch("impacto_politica.no_secuencia", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(impacto_politica, 'no_secuencia', rules);
            });
            $scope.$watch("impacto_politica.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(impacto_politica, 'nombre', rules);
            });
            $scope.$watch("impacto_politica.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(impacto_politica, 'descripcion', rules);
            });
            //ms_product.selectQueries['politica_gobierno'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
        }
    };
    impacto_politica.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        if (typeof politica_gobierno != "undefined") {
            if (politica_gobierno) {
                if (typeof politica_gobierno !== 'not defined') {
                    var validatett = await BASEAPI.firstp("impacto_politica", {
                        where: [
                            {
                                field: "no_secuencia",
                                operator: "=",
                                value: data.inserting.no_secuencia
                            },
                            {
                                open: "(",
                                field: "politica_gobierno",
                                operator: "=",
                                value: politica_gobierno.id ? politica_gobierno.id : "$null",
                                connector: "OR"
                            },
                            {
                                close: ")",
                                field: "tempid",
                                operator: "=",
                                value: `politica_gobierno${politica_gobierno.form.options.impacto_politica.tempId}`
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
    impacto_politica.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (impacto_politica.no_secuencia)
            data.updating.no_secuencia = impacto_politica.no_secuencia;
        var validatett = await BASEAPI.firstp("impacto_politica", {
            where: [
                {
                    field: "no_secuencia",
                    operator: "=",
                    value: data.updating.no_secuencia
                },
                {
                    open: "(",
                    field: "politica_gobierno",
                    operator: "=",
                    value: politica_gobierno.id,
                    connector: "OR"
                },
                {

                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: `politica_gobierno${politica_gobierno.form.options.impacto_politica.tempId}`
                },
                {
                    field: "id",
                    operator: "!=",
                    value: impacto_politica.id
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
    impacto_politica.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        impacto_politica.runMagicManyToMany('denominacion_pnpsp', 'vw_denominacion_pnpsp',
            'impacto_politica', 'id', 'nombre_sec', 'politica_denominacion_pnpsp',
            'denominacion_pnpsp', 'id');
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
    impacto_politica.triggers.table.after.close = function (data) {
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