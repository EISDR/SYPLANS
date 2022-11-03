app.controller("sec_programa_sectorial", function ($scope, $http, $compile) {
    sec_programa_sectorial = this;
    sec_programa_sectorial.custom_title = "Programa Sectorial";
    //sec_programa_sectorial.plural = "plural";
    sec_programa_sectorial.headertitle = "Programas Sectoriales";
    //sec_programa_sectorial.destroyForm = false;
    //sec_programa_sectorial.permissionTable = "tabletopermission";
    sec_programa_sectorial.session = new SESSION().current();
    sec_programa_sectorial.fixFilters = [
        {
            field: "sector_id",
            value: sec_programa_sectorial.session.sector_id
        }
    ];
    RUNCONTROLLER("sec_programa_sectorial", sec_programa_sectorial, $scope, $http, $compile);
    sec_programa_sectorial.formulary = function (data, mode, defaultData) {
        if (sec_programa_sectorial !== undefined) {
            RUN_B("sec_programa_sectorial", sec_programa_sectorial, $scope, $http, $compile);
            sec_programa_sectorial.form.modalWidth = ENUM.modal.width.full;
            sec_programa_sectorial.form.readonly = {compania: sec_programa_sectorial.session.compania_id, active: 1};
            sec_programa_sectorial.createForm(data, mode, defaultData);
            sec_programa_sectorial.form.titles = {
                new: "Agregar - " + sec_programa_sectorial.custom_title,
                edit: "Editar - "+ sec_programa_sectorial.custom_title,
                view: "Ver ALL - "+ sec_programa_sectorial.custom_title
            };
            $scope.$watch("sec_programa_sectorial.no_orden", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(sec_programa_sectorial, 'no_orden', rules);
            });
            $scope.$watch("sec_programa_sectorial.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial, 'nombre', rules);
            });
            $scope.$watch("sec_programa_sectorial.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("sec_programa_sectorial.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial, 'compania', rules);
            });
            $scope.$watch("sec_programa_sectorial.supuestos", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial, 'supuestos', rules);
            });
            $scope.$watch("sec_programa_sectorial.involucrados", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial, 'involucrados', rules);
            });
            $scope.$watch("sec_resultado_sectorial.poblacion_objetivo", function (value) {
                var rules = [];
                //rules here
                VALIDATION.validate(sec_programa_sectorial, 'poblacion_objetivo', rules);
            });
            $scope.$watch("sec_resultado_sectorial.sector_economico_social", function (value) {
                var rules = [];
                //rules here
                VALIDATION.validate(sec_programa_sectorial, 'sector_economico_social', rules);
            });
            $scope.$watch("sec_programa_sectorial.fecha_desde", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial, 'fecha_desde', rules);
            });
            $scope.$watch("sec_programa_sectorial.fecha_hasta", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial, 'fecha_hasta', rules);
            });
            $scope.$watch('sec_programa_sectorial.range_date', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial, "fecha_desde", rules);
                VALIDATION.validate(sec_programa_sectorial, "range_date", rules);
            });
            $scope.$watch("sec_programa_sectorial.resultado_sectorial", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_programa_sectorial, 'resultado_sectorial', rules);
            });
            sec_programa_sectorial.triggers.table.after.control = function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
                if (mode === 'new' && data == 'range_date') {
                    sec_programa_sectorial.range_date = "";
                    var rango_minimo = moment().format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + sec_programa_sectorial.session.periodo_poa).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        rango_minimo = moment(("01-02-" + session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    }

                    sec_programa_sectorial.range_date_min(rango_minimo);
                    sec_programa_sectorial.range_date_max(rango_maximo);
                    //cambio placebo
                    if ( moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        sec_programa_sectorial.range_date_start(rango_minimo);
                        sec_programa_sectorial.range_date_end(rango_minimo);
                    }
                    sec_programa_sectorial.refreshAngular();
                }

                if (mode === 'edit' && data == 'range_date') {
                    var rango_minimo = moment().format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + sec_programa_sectorial.session.periodo_poa).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        rango_minimo = moment(("01-02-" + session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    }

                    sec_programa_sectorial.range_date_min(rango_minimo);
                    sec_programa_sectorial.range_date_max(rango_maximo);
                    sec_programa_sectorial.refreshAngular();
                }
            };
        }
    };
    sec_programa_sectorial.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        sec_programa_sectorial.runMagicManyToMany('responsable', 'institucion',
            'programa_sectorial', 'id', 'nombre', 'sec_programa_sectorial_responsable',
            'institucion', 'id');
        sec_programa_sectorial.runMagicManyToMany('eje_estrategico', 'drp_eje_estrategico',
            'programa_sectorial', 'id', 'nombre_sin_hijos', 'sec_programa_sectorial_eje_estrategico',
            'eje_estrategico', 'id');
        sec_programa_sectorial.runMagicManyToMany('involucrado', 'involucrados',
            'programa_sectorial', 'id', 'nombre_completo', 'sec_programa_sectorial_involucrados',
            'involucrado', 'id');
    };
    sec_programa_sectorial.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        if (DSON.oseaX(sec_programa_sectorial.estimacion_presupuestaria))
            data.inserting.estimacion_presupuestaria = undefined;
        var validatett = await BASEAPI.firstp("sec_programa_sectorial", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.inserting.no_orden
                },
                {
                    field: "resultado_sectorial",
                    value: data.inserting.resultado_sectorial
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
    sec_programa_sectorial.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (DSON.oseaX(sec_programa_sectorial.estimacion_presupuestaria))
            data.updating.estimacion_presupuestaria = undefined;
        if (sec_programa_sectorial.no_orden)
            data.updating.no_orden = sec_programa_sectorial.no_orden;
        var validatett = await BASEAPI.firstp("sec_programa_sectorial", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.updating.no_orden
                },
                {
                    field: "resultado_sectorial",
                    value: data.updating.resultado_sectorial
                },
                {
                    field: "id",
                    operator: "!=",
                    value: sec_programa_sectorial.id
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
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});