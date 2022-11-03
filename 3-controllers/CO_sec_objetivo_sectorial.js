app.controller("sec_objetivo_sectorial", function ($scope, $http, $compile) {
    sec_objetivo_sectorial = this;
    //sec_objetivo_sectorial.fixFilters = [];
    //sec_objetivo_sectorial.singular = "singular";
    //sec_objetivo_sectorial.plural = "plural";
    sec_objetivo_sectorial.headertitle = "Objetivo Sectorial";
    //sec_objetivo_sectorial.destroyForm = false;
    //sec_objetivo_sectorial.permissionTable = "tabletopermission";
    sec_objetivo_sectorial.session = new SESSION().current();
    sec_objetivo_sectorial.fixFilters = [
        {
            field: "sector_id",
            value: sec_objetivo_sectorial.session.sector_id
        }
    ];
    sec_objetivo_sectorial.lista_objetivos_generales = [];
    sec_objetivo_sectorial.refreshed = false;
    RUNCONTROLLER("sec_objetivo_sectorial", sec_objetivo_sectorial, $scope, $http, $compile);
    sec_objetivo_sectorial.formulary = function (data, mode, defaultData) {
        if (sec_objetivo_sectorial !== undefined) {
            RUN_B("sec_objetivo_sectorial", sec_objetivo_sectorial, $scope, $http, $compile);
            sec_objetivo_sectorial.form.modalWidth = ENUM.modal.width.full;
            sec_objetivo_sectorial.form.readonly = {};
            sec_objetivo_sectorial.createForm(data, mode, defaultData);
            sec_objetivo_sectorial.form.titles = {
                new: "Agregar - " + sec_objetivo_sectorial.headertitle,
                edit: "Editar - "+ sec_objetivo_sectorial.headertitle,
                view: "Ver ALL - "+ sec_objetivo_sectorial.headertitle
            };
            $scope.$watch("sec_objetivo_sectorial.no_orden", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(sec_objetivo_sectorial, 'no_orden', rules);
            });
            $scope.$watch("sec_objetivo_sectorial.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_objetivo_sectorial, 'nombre', rules);
            });
            $scope.$watch("sec_objetivo_sectorial.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_objetivo_sectorial, 'descripcion', rules);
            });
            $scope.$watch("sec_objetivo_sectorial.eje_sectorial", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_objetivo_sectorial, 'eje_sectorial', rules);
            });

            sec_objetivo_sectorial.triggers.table.after.control = function (data) {
                //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
            };
        }
    };
    sec_objetivo_sectorial.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    };
    sec_objetivo_sectorial.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        var validatett = await BASEAPI.firstp("sec_objetivo_sectorial", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.inserting.no_orden
                },
                {
                    field: "eje_sectorial",
                    value: data.inserting.eje_sectorial
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un registro con el No. Secuencia: " + data.inserting.no_orden
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    sec_objetivo_sectorial.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (sec_objetivo_sectorial.no_orden)
            data.updating.no_orden = sec_objetivo_sectorial.no_orden;
        var validatett = await BASEAPI.firstp("sec_objetivo_sectorial", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.updating.no_orden
                },
                {
                    field: "eje_sectorial",
                    value: data.updating.eje_sectorial
                },
                {
                    field: "id",
                    operator: "!=",
                    value: sec_objetivo_sectorial.id
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un registro con el No. Secuencia: " + data.updating.no_orden
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
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
    sec_objetivo_sectorial.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        sec_objetivo_sectorial.refreshed = false;
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
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
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