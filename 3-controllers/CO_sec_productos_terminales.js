app.controller("sec_productos_terminales", function ($scope, $http, $compile) {
    sec_productos_terminales = this;
    sec_productos_terminales.custom_title = "Producto Terminal Sectorial";
    //sec_productos_terminales.plural = "plural";
    sec_productos_terminales.headertitle = "Productos Terminales Sectoriales";
    //sec_productos_terminales.destroyForm = false;
    //sec_productos_terminales.permissionTable = "tabletopermission";
    sec_productos_terminales.session = new SESSION().current();
    sec_productos_terminales.fixFilters = [
        {
            field: "sector_id",
            value: sec_productos_terminales.session.sector_id
        }
    ];
    RUNCONTROLLER("sec_productos_terminales", sec_productos_terminales, $scope, $http, $compile);
    sec_productos_terminales.formulary = function (data, mode, defaultData) {
        if (sec_productos_terminales !== undefined) {
            RUN_B("sec_productos_terminales", sec_productos_terminales, $scope, $http, $compile);
            sec_productos_terminales.form.modalWidth = ENUM.modal.width.full;
            sec_productos_terminales.form.readonly = {compania: sec_productos_terminales.session.compania_id, active: 1};
            sec_productos_terminales.createForm(data, mode, defaultData);
            sec_productos_terminales.form.titles = {
                new: "Agregar - " + sec_productos_terminales.custom_title,
                edit: "Editar - "+ sec_productos_terminales.custom_title,
                view: "Ver ALL - "+ sec_productos_terminales.custom_title
            };
            $scope.$watch("sec_productos_terminales.no_orden", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(sec_productos_terminales, 'no_orden', rules);
            });
            $scope.$watch("sec_productos_terminales.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_productos_terminales, 'nombre', rules);
            });
            $scope.$watch("sec_productos_terminales.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_productos_terminales, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("sec_productos_terminales.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_productos_terminales, 'compania', rules);
            });
            $scope.$watch("sec_productos_terminales.supuestos", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_productos_terminales, 'supuestos', rules);
            });
            $scope.$watch("sec_productos_terminales.involucrados", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_productos_terminales, 'involucrados', rules);
            });
            $scope.$watch("sec_productos_terminales.fecha_desde", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_productos_terminales, 'fecha_desde', rules);
            });
            $scope.$watch("sec_productos_terminales.fecha_hasta", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_productos_terminales, 'fecha_hasta', rules);
            });
            $scope.$watch('sec_productos_terminales.range_date', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_productos_terminales, "fecha_desde", rules);
                VALIDATION.validate(sec_productos_terminales, "range_date", rules);
            });
            $scope.$watch("sec_productos_terminales.programa_sectorial", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_productos_terminales, 'programa_sectorial', rules);
            });
        }
    };
    sec_productos_terminales.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        sec_productos_terminales.runMagicManyToMany('involucrado', 'involucrados',
            'producto_terminal', 'id', 'nombre_completo', 'sec_productos_terminales_involucrados',
            'involucrado', 'id');
        sec_productos_terminales.runMagicManyToMany('responsable', 'institucion',
            'producto_terminal', 'id', 'nombre', 'sec_productos_terminales_responsable',
            'institucion', 'id');
        sec_productos_terminales.runMagicManyToMany('objetivo_estrategico', 'drp_objetivo_estrategico',
            'producto_terminal', 'id', 'nombre_sin_hijos', 'objetivo_estrategico_productos_terminales',
            'objetivo_estrategico', 'id');
    };
    sec_productos_terminales.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        var validatett = await BASEAPI.firstp("sec_productos_terminales", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.inserting.no_orden
                },
                {
                    field: "proyecto_sectorial",
                    value: data.inserting.proyecto_sectorial
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
    sec_productos_terminales.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (sec_productos_terminales.no_orden)
            data.updating.no_orden = sec_productos_terminales.no_orden;
        var validatett = await BASEAPI.firstp("sec_productos_terminales", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.updating.no_orden
                },
                {
                    field: "proyecto_sectorial",
                    value: data.updating.proyecto_sectorial
                },
                {
                    field: "id",
                    operator: "!=",
                    value: sec_productos_terminales.id
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