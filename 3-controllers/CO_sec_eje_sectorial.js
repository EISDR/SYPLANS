app.controller("sec_eje_sectorial", function ($scope, $http, $compile) {
    sec_eje_sectorial = this;
    //sec_eje_sectorial.singular = "singular";
    //sec_eje_sectorial.plural = "plural";
    sec_eje_sectorial.headertitle = "Eje Sectorial";
    //sec_eje_sectorial.destroyForm = false;
    //sec_eje_sectorial.permissionTable = "tabletopermission";
    sec_eje_sectorial.session = new SESSION().current();
    sec_eje_sectorial.fixFilters = [
        {
            field: "sector_id",
            value: sec_eje_sectorial.session.sector_id
        }
    ];
    RUNCONTROLLER("sec_eje_sectorial", sec_eje_sectorial, $scope, $http, $compile);
    sec_eje_sectorial.formulary = function (data, mode, defaultData) {
        if (sec_eje_sectorial !== undefined) {
            RUN_B("sec_eje_sectorial", sec_eje_sectorial, $scope, $http, $compile);
            sec_eje_sectorial.form.modalWidth = ENUM.modal.width.full;
            sec_eje_sectorial.form.readonly = {sector: sec_eje_sectorial.session.sector_id};
            sec_eje_sectorial.createForm(data, mode, defaultData);
            sec_eje_sectorial.form.titles = {
                new: "Agregar - " + sec_eje_sectorial.headertitle,
                edit: "Editar - "+ sec_eje_sectorial.headertitle,
                view: "Ver ALL - "+ sec_eje_sectorial.headertitle
            };
            $scope.$watch("sec_eje_sectorial.no_orden", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(sec_eje_sectorial, 'no_orden', rules);
            });
            $scope.$watch("sec_eje_sectorial.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_eje_sectorial, 'nombre', rules);
            });
            $scope.$watch("sec_eje_sectorial.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_eje_sectorial, 'descripcion', rules);
            });
            //ms_product.selectQueries['sector'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
        }
    };
    sec_eje_sectorial.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        var validatett = await BASEAPI.firstp("sec_eje_sectorial", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.inserting.no_orden
                },
                {
                    field: "sector",
                    value: sec_eje_sectorial.session.sector_id
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
    sec_eje_sectorial.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (sec_eje_sectorial.no_orden)
            data.updating.no_orden = sec_eje_sectorial.no_orden;
        var validatett = await BASEAPI.firstp("sec_eje_sectorial", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.updating.no_orden
                },
                {
                    field: "sector",
                    value: sec_eje_sectorial.session.sector_id
                },
                {
                    field: "id",
                    operator: "!=",
                    value: sec_eje_sectorial.id
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
    sec_eje_sectorial.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
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
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
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