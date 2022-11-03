app.controller("mods", function ($scope, $http, $compile) {
    mods = this;
    //mods.fixFilters = [];
    mods.singular = "Meta";
    mods.plural = "Metas";
    mods.headertitle = "Metas";
    //mods.destroyForm = false;
    //mods.permissionTable = "tabletopermission";
    mods.session = new SESSION().current();
    RUNCONTROLLER("mods", mods, $scope, $http, $compile);
    mods.formulary = function (data, mode, defaultData) {
        if (mods !== undefined) {
            RUN_B("mods", mods, $scope, $http, $compile);
            if (typeof estrategia != "undefined") {
                if (estrategia) {
                    if (typeof estrategia !== 'not defined') {
                        mods.show_me = true;
                    }
                }
            }else {
                mods.show_me = false;
            }
            mods.form.modalWidth = ENUM.modal.width.full;
            mods.form.readonly = {compania: mods.session.compania_id};
            mods.createForm(data, mode, defaultData);
            $scope.$watch("mods.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mods, 'nombre', rules);
            });
            $scope.$watch("mods.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mods, 'descripcion', rules);
            });
            $scope.$watch("mods.edt", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mods, 'edt', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            // $scope.$watch("mods.compania", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(mods, 'compania', rules);
            // });
            //ms_product.selectQueries['ods'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("mods.ods", function (value) {
                var rules = [];
                //rules here
                if (typeof estrategia != "undefined") {
                    if (estrategia) {
                        if (typeof estrategia !== 'not defined') {
                            rules.push(VALIDATION.general.required(value));
                        }
                    }
                }
                VALIDATION.validate(mods, 'ods', rules);
            });
            // $scope.$watch("mods.tempid", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(mods, 'tempid', rules);
            // });
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
    mods.triggers.table.after.close = function (data) {
        if (typeof resultado != "undefined") {
            if (resultado) {
                if (typeof resultado !== 'not defined') {
                    resultado.form.loadDropDown('metasshi');
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
    mods.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        if (typeof estrategia != "undefined") {
            if (estrategia) {
                if (typeof estrategia !== 'not defined') {
                    var validatett = await BASEAPI.firstp("mods", {
                        where: [
                            {
                                field: "edt",
                                operator: "=",
                                value: data.inserting.edt
                            },
                            {
                                field: "compania",
                                value: new SESSION().current() ? new SESSION().current().compania_id : -1
                            },
                            {
                                field: "ods",
                                operator: "=",
                                value: mods.ods
                            }
                        ]
                    });
                    if (validatett) {
                        SWEETALERT.show({
                            type: "error",
                            title: "",
                            message: "Ya existe un registro con el No. Secuencia: " + data.inserting.edt
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
        if (typeof ods != "undefined") {
            if (ods) {
                if (typeof ods !== 'not defined') {
                    var validatett = await BASEAPI.firstp("mods", {
                        where: [
                            {
                                field: "edt",
                                operator: "=",
                                value: data.inserting.edt
                            },
                            {
                                field: "compania",
                                value: new SESSION().current() ? new SESSION().current().compania_id : -1
                            },
                            {
                                open: "(",
                                field: "ods",
                                operator: "=",
                                value: ods.id ? ods.id : "$null",
                                connector: "OR"
                            },
                            {
                                close: ")",
                                field: "tempid",
                                operator: "=",
                                value: `ods${ods.form.options.metas.tempId}`
                            },
                        ]
                    });
                    if (validatett) {
                        SWEETALERT.show({
                            type: "error",
                            title: "",
                            message: "Ya existe un registro con el No. Secuencia: " + data.inserting.edt
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
    mods.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (mods.edt)
            data.updating.edt = mods.edt;
        var validatett = await BASEAPI.firstp("mods", {
            where: [
                {
                    field: "edt",
                    operator: "=",
                    value: data.updating.edt
                },
                {
                    field: "compania",
                    value: new SESSION().current() ? new SESSION().current().compania_id : -1
                },
                {
                    open: "(",
                    field: "ods",
                    operator: "=",
                    value: ods.id,
                    connector: "OR"
                },
                {

                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: `ods${ods.form.options.metas.tempId}`
                },
                {
                    field: "id",
                    operator: "!=",
                    value: mods.id
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un registro con el No. Secuencia: " + data.updating.edt
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
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