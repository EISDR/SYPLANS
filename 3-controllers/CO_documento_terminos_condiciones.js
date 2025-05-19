app.controller("documento_terminos_condiciones", function ($scope, $http, $compile) {
    documento_terminos_condiciones = this;
    //documento_terminos_condiciones.fixFilters = [];
    //documento_terminos_condiciones.singular = "singular";
    //documento_terminos_condiciones.plural = "plural";
    documento_terminos_condiciones.headertitle = "Términos y Definiciones";
    //documento_terminos_condiciones.destroyForm = false;
    //documento_terminos_condiciones.permissionTable = "tabletopermission";
    RUNCONTROLLER("documento_terminos_condiciones", documento_terminos_condiciones, $scope, $http, $compile);
    documento_terminos_condiciones.formulary = function (data, mode, defaultData) {
        if (documento_terminos_condiciones !== undefined) {
            RUN_B("documento_terminos_condiciones", documento_terminos_condiciones, $scope, $http, $compile);
            documento_terminos_condiciones.form.modalWidth = ENUM.modal.width.full;
            documento_terminos_condiciones.form.titles = {
                new: "Nuevo Término y definición",
                edit: "Editar Término y definición",
                view: "Ver Término y definición"
            };
            documento_terminos_condiciones.form.readonly = {};
            documento_terminos_condiciones.createForm(data, mode, defaultData);
            $scope.$watch("documento_terminos_condiciones.no_orden", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_terminos_condiciones, 'no_orden', rules);
            });
            $scope.$watch("documento_terminos_condiciones.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_terminos_condiciones, 'nombre', rules);
            });
            $scope.$watch("documento_terminos_condiciones.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_terminos_condiciones, 'descripcion', rules);
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
    documento_terminos_condiciones.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        var validatett = await BASEAPI.firstp("documento_terminos_condiciones", {
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
                    value: `documentos_asociados${documentos_asociados.form.options.termino_condiciones.tempId}`
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para este Documento Asociado existe un Término o Condición con el No. Secuencia: " + data.inserting.no_orden
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
    documento_terminos_condiciones.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        var validatett = await BASEAPI.firstp("documento_terminos_condiciones", {
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
                    value: `documentos_asociados${documentos_asociados.form.options.termino_condiciones.tempId}`
                },
                {
                    field: "id",
                    operator: "!=",
                    value: documento_terminos_condiciones.id
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para este Documento Asociado existe un Término o Condición con el No. Secuencia: " + data.updating.no_orden
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