app.controller("iso_estructura", function ($scope, $http, $compile) {
    iso_estructura = this;
    //iso_estructura.fixFilters = [];
    iso_estructura.session = new SESSION().current();
    // iso_estructura.fixFilters = [
    //     {
    //        field: "compania",
    //        value: iso_estructura.session.compania_id
    //     },
    //     {
    //         field: "institucion",
    //         operator: iso_estructura.session.institucion_id ? "=" : "is",
    //         value: iso_estructura.session.institucion_id ? iso_estructura.session.institucion_id : "$null"
    //     }
    // ];
    //iso_estructura.singular = "singular";
    //iso_estructura.plural = "plural";
    iso_estructura.headertitle = "Estructuras ISO";
    //iso_estructura.destroyForm = false;
    //iso_estructura.permissionTable = "tabletopermission";
    RUNCONTROLLER("iso_estructura", iso_estructura, $scope, $http, $compile);
    iso_estructura.formulary = function (data, mode, defaultData) {
        if (iso_estructura !== undefined) {
            RUN_B("iso_estructura", iso_estructura, $scope, $http, $compile);
            iso_estructura.form.modalWidth = ENUM.modal.width.full;
            iso_estructura.form.readonly = {};
            iso_estructura.form.titles = {
                new: "Agregar Nueva Estructura",
                edit: "Editar Estructura",
                view: "Ver Estructuras"
            };
            iso_estructura.createForm(data, mode, defaultData);
            $scope.$watch("iso_estructura.secuencia", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(iso_estructura, 'secuencia', rules);
            });
            $scope.$watch("iso_estructura.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(iso_estructura, 'nombre', rules);
            });
            $scope.$watch("iso_estructura.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(iso_estructura, 'descripcion', rules);
            });
            $scope.$watch("iso_estructura.normativo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(iso_estructura, 'normativo', rules);
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
    iso_estructura.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        var validatett = await BASEAPI.firstp("iso_estructura", {
            where: [
                {
                    field: "secuencia",
                    operator: "=",
                    value: data.inserting.secuencia
                },
                {
                    open: "(",
                    field: "normativo",
                    operator: "=",
                    value: iso_normativos.id ? iso_normativos.id : "$null",
                    connector: "OR"
                },
                {
                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: `iso_normativos${iso_normativos.form.options.iso_estructuras.tempId}`
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para esta Normativa ISO existe una Estructura ISO con el No. Secuencia: " + data.inserting.secuencia
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    iso_estructura.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        var validatett = await BASEAPI.firstp("iso_estructura", {
            where: [
                {
                    field: "secuencia",
                    operator: "=",
                    value: data.updating.secuencia
                },
                {
                    open: "(",
                    field: "normativo",
                    operator: "=",
                    value: iso_normativos.id ? iso_normativos.id : "$null",
                    connector: "OR"
                },
                {
                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: `end${iso_normativos.form.options.iso_estructuras.tempId}`
                },
                {
                    field: "id",
                    operator: "!=",
                    value: iso_estructura.id
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para esta Normativa ISO existe una Estructura ISO con el No. Secuencia: " + data.updating.secuencia
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
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