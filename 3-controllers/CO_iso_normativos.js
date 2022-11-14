app.controller("iso_normativos", function ($scope, $http, $compile) {
    iso_normativos = this;
    //iso_normativos.fixFilters = [];
    iso_normativos.session = new SESSION().current();
    // iso_normativos.fixFilters = [
    //     {
    //         field: "compania",
    //         value: iso_normativos.session.compania_id
    //     },
    //     {
    //         field: "institucion",
    //         operator: iso_normativos.session.institucion_id ? "=" : "is",
    //         value: iso_normativos.session.institucion_id ? iso_normativos.session.institucion_id : "$null"
    //     }
    // ];
    //iso_normativos.singular = "singular";
    //iso_normativos.plural = "plural";
    iso_normativos.headertitle = "Normativas ISO";
    //iso_normativos.destroyForm = false;
    //iso_normativos.permissionTable = "tabletopermission";
    RUNCONTROLLER("iso_normativos", iso_normativos, $scope, $http, $compile);
    iso_normativos.formulary = function (data, mode, defaultData) {
        if (iso_normativos !== undefined) {
            RUN_B("iso_normativos", iso_normativos, $scope, $http, $compile);
            iso_normativos.form.modalWidth = ENUM.modal.width.full;
            iso_normativos.form.readonly = {compania: iso_normativos.session.compania_id};
            iso_normativos.form.titles = {
                new: "Agregar Nueva Normativa",
                edit: "Editar Normativa",
                view: "Ver Normativa"
            };
            iso_normativos.createForm(data, mode, defaultData);
            $scope.$watch("iso_normativos.secuencia", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(iso_normativos, 'secuencia', rules);
            });
            $scope.$watch("iso_normativos.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(iso_normativos, 'nombre', rules);
            });
            $scope.$watch("iso_normativos.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(iso_normativos, 'descripcion', rules);
            });
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
    iso_normativos.triggers.table.after.load = function () {
        iso_normativos.runMagicOneToMany('estructuras', 'vw_iso_estructura', 'normativo', 'nombre_edt', 'id');
    }
    iso_normativos.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        var validatet = await BASEAPI.firstp("iso_normativos", {
            where: [
                {
                    field: "secuencia",
                    operator: "=",
                    value: data.inserting.secuencia
                },
                // {
                //     field: "compania",
                //     operator: "=",
                //     value: new SESSION().current() ? (new SESSION().current().sectorial|| new SESSION().current().compania_id) : -1
                // },
                // {
                //     "field": "institucion",
                //     "operator": new SESSION().current().institucion_id ? "=" : "is",
                //     "value": new SESSION().current().institucion_id ? new SESSION().current().session.institucion_id : "$null"
                // }
            ]
        });
        if (validatet) {
            SWEETALERT.show({
                type: "warning",
                title: "Validación",
                message: "Ya existe un registro con el No. Secuencia: " + data.inserting.secuencia
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    iso_normativos.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        var validatet = await BASEAPI.firstp("iso_normativos", {
            where: [
                {
                    field: "secuencia",
                    operator: "=",
                    value: data.updating.secuencia
                },
                // {
                //     field: "compania",
                //     operator: "=",
                //     value: new SESSION().current().compania_id
                // },
                // {
                //     "field": "institucion",
                //     "operator": new SESSION().current().institucion_id ? "=" : "is",
                //     "value": new SESSION().current().institucion_id ? new SESSION().current().session.institucion_id : "$null"
                // },
                {
                    field: "id",
                    operator: "!=",
                    value: iso_normativos.id
                },
            ]
        });
        if (validatet) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un registro con el No. Secuencia: " + data.updating.secuencia
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
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