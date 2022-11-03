app.controller("politica_gobierno", function ($scope, $http, $compile) {
    politica_gobierno = this;
    politica_gobierno.singular = "singular";
    politica_gobierno.plural = "plural";
    politica_gobierno.headertitle = "Política de Gobierno";
    //politica_gobierno.destroyForm = false;
    //politica_gobierno.permissionTable = "tabletopermission";
    var session = new SESSION().current();
    politica_gobierno.fixFilters = [
        {
            field: "compania",
            value: session.compania_id
        }
    ];
    RUNCONTROLLER("politica_gobierno", politica_gobierno, $scope, $http, $compile);
    politica_gobierno.formulary = function (data, mode, defaultData) {
        if (politica_gobierno !== undefined) {
            RUN_B("politica_gobierno", politica_gobierno, $scope, $http, $compile);
            politica_gobierno.form.modalWidth = ENUM.modal.width.full;
            politica_gobierno.form.readonly = {compania: session.compania_id};
            politica_gobierno.createForm(data, mode, defaultData);
            $scope.$watch("politica_gobierno.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(politica_gobierno, 'nombre', rules);
            });
            $scope.$watch("politica_gobierno.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(politica_gobierno, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("politica_gobierno.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(politica_gobierno, 'compania', rules);
            });
            $scope.$watch("politica_gobierno.linea_base", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(politica_gobierno, 'linea_base', rules);
            });
            $scope.$watch("politica_gobierno.linea_base_ano", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(politica_gobierno, 'linea_base_ano', rules);
            });
            $scope.$watch("politica_gobierno.meta", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(politica_gobierno, 'meta', rules);
            });
            $scope.$watch("politica_gobierno.meta_ano", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(politica_gobierno, 'meta_ano', rules);
            });
            $scope.$watch("politica_gobierno.no_secuencia", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(politica_gobierno, 'no_secuencia', rules);
            });
        }
    };
    politica_gobierno.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        var validatett = await BASEAPI.firstp("politica_gobierno", {
            where: [
                {
                    field: "no_secuencia",
                    operator: "=",
                    value: data.inserting.no_secuencia
                },
                {
                    field: "compania",
                    value: new SESSION().current() ? new SESSION().current().compania_id : -1
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
        }
        resolve(true);
    });
    politica_gobierno.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (politica_gobierno.no_secuencia)
            data.updating.no_secuencia = politica_gobierno.no_secuencia;
        var validatett = await BASEAPI.firstp("politica_gobierno", {
            where: [
                {
                    field: "no_secuencia",
                    operator: "=",
                    value: data.updating.no_secuencia
                },
                {
                    field: "compania",
                    value: new SESSION().current() ? new SESSION().current().compania_id : -1
                },
                {
                    field: "id",
                    operator: "!=",
                    value: politica_gobierno.id
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
    politica_gobierno.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        politica_gobierno.runMagicOneToMany('impacto_politica', 'vw_impacto_politica', 'politica_gobierno', 'nombre_sec', 'id');
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