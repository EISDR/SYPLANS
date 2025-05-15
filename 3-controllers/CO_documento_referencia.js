app.controller("documento_referencia", function ($scope, $http, $compile) {
    documento_referencia = this;
    //documento_referencia.fixFilters = [];
    //documento_referencia.singular = "singular";
    //documento_referencia.plural = "plural";
    documento_referencia.headertitle = "Documentos de Referencia";
    //documento_referencia.destroyForm = false;
    //documento_referencia.permissionTable = "tabletopermission";
    RUNCONTROLLER("documento_referencia", documento_referencia, $scope, $http, $compile);
    documento_referencia.formulary = function (data, mode, defaultData) {
        if (documento_referencia !== undefined) {
            RUN_B("documento_referencia", documento_referencia, $scope, $http, $compile);
            documento_referencia.form.modalWidth = ENUM.modal.width.full;
            documento_referencia.form.titles = {
                new: "Nuevo Documento de referencia",
                edit: "Editar Documento de referencia",
                view: "Ver Documento de referencia"
            };
            documento_referencia.form.readonly = {};
            documento_referencia.createForm(data, mode, defaultData);
            $scope.$watch("documento_referencia.no_orden", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_referencia, 'no_orden', rules);
            });
            $scope.$watch("documento_referencia.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_referencia, 'nombre', rules);
            });
            $scope.$watch("documento_referencia.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_referencia, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            // $scope.$watch("cuenta.compania", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(cuenta, 'compania', rules);
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
    documento_referencia.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        var validatett = await BASEAPI.firstp("documento_referencia", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.inserting.no_orden
                },
                {
                    open: "(",
                    field: "documento_asociado",
                    operator: "=",
                    value: documentos_asociados.id ? documentos_asociados.id : "$null",
                    connector: "OR"
                },
                {
                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: `documentos_asociados${documentos_asociados.form.options.documentos_referencia.tempId}`
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para este Documento Asociado existe un Documento de Referencia con el No. Secuencia: " + data.inserting.no_orden
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
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    documento_referencia.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        var validatett = await BASEAPI.firstp("documento_referencia", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.updating.no_orden
                },
                {
                    open: "(",
                    field: "documento_asociado",
                    operator: "=",
                    value: documentos_asociados.id ? documentos_asociados.id : "$null",
                    connector: "OR"
                },
                {
                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: `documentos_asociados${documentos_asociados.form.options.documentos_referencia.tempId}`
                },
                {
                    field: "id",
                    operator: "!=",
                    value: documento_referencia.id
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para este Documento Asociado existe un Documento de Referencia con el No. Secuencia: " + data.updating.no_orden
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