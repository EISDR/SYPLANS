app.controller("sec_resultado_sectorial", function ($scope, $http, $compile) {
    sec_resultado_sectorial = this;
    sec_resultado_sectorial.custom_title = "Resultado Sectorial";
    //sec_resultado_sectorial.plural = "plural";
    sec_resultado_sectorial.headertitle = "Resultados Sectoriales";
    //sec_resultado_sectorial.destroyForm = false;
    //sec_resultado_sectorial.permissionTable = "tabletopermission";
    sec_resultado_sectorial.session = new SESSION().current();
    sec_resultado_sectorial.fixFilters = [
        {
            field: "sector_id",
            value: sec_resultado_sectorial.session.sector_id
        }
    ];
    sec_resultado_sectorial.refreshed = false;
    RUNCONTROLLER("sec_resultado_sectorial", sec_resultado_sectorial, $scope, $http, $compile);
    sec_resultado_sectorial.formulary = function (data, mode, defaultData) {
        if (sec_resultado_sectorial !== undefined) {
            RUN_B("sec_resultado_sectorial", sec_resultado_sectorial, $scope, $http, $compile);
            sec_resultado_sectorial.form.modalWidth = ENUM.modal.width.full;
            sec_resultado_sectorial.form.readonly = {compania: sec_resultado_sectorial.session.compania_id, active: 1};
            sec_resultado_sectorial.createForm(data, mode, defaultData);
            sec_resultado_sectorial.form.titles = {
                new: "Agregar - " + sec_resultado_sectorial.custom_title,
                edit: "Editar - "+ sec_resultado_sectorial.custom_title,
                view: "Ver ALL - "+ sec_resultado_sectorial.custom_title
            };
            $scope.$watch("sec_resultado_sectorial.no_orden", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(sec_resultado_sectorial, 'no_orden', rules);
            });
            $scope.$watch("sec_resultado_sectorial.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_resultado_sectorial, 'nombre', rules);
            });
            $scope.$watch("sec_resultado_sectorial.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_resultado_sectorial, 'descripcion', rules);
            });
            $scope.$watch("sec_resultado_sectorial.objetivo_sectorial", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_resultado_sectorial, 'objetivo_sectorial', rules);
            });
            $scope.$watch("sec_resultado_sectorial.poblacion_objetivo", function (value) {
                var rules = [];
                //rules here
                VALIDATION.validate(sec_resultado_sectorial, 'poblacion_objetivo', rules);
            });
            $scope.$watch("sec_resultado_sectorial.sector_economico_social", function (value) {
                var rules = [];
                //rules here
                VALIDATION.validate(sec_resultado_sectorial, 'sector_economico_social', rules);
            });
            $scope.$watch('sec_resultado_sectorial.fecha_desde', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_resultado_sectorial, "fecha_desde", rules)
            });
            $scope.$watch('sec_resultado_sectorial.fecha_hasta', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_resultado_sectorial, "fecha_hasta", rules)
            });
            $scope.$watch('sec_resultado_sectorial.range_date', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_resultado_sectorial, "fecha_desde", rules);
                VALIDATION.validate(sec_resultado_sectorial, "range_date", rules);

            });
            $scope.$watch("sec_resultado_sectorial.supuestos", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_resultado_sectorial, 'supuestos', rules);
            });
            $scope.$watch("sec_resultado_sectorial.involucrados", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(sec_resultado_sectorial, 'involucrados', rules);
            });

            sec_resultado_sectorial.triggers.table.after.control = function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
                if (mode === 'new' && data == 'range_date') {
                    sec_resultado_sectorial.range_date = "";
                    var rango_minimo = moment(("01-02-" + sec_resultado_sectorial.session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + sec_resultado_sectorial.session.periodo_poa).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        rango_minimo = moment(("01-02-" + session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    }

                    sec_resultado_sectorial.range_date_min(rango_minimo);
                    sec_resultado_sectorial.range_date_max(rango_maximo);
                    //cambio placebo
                    if ( moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        sec_resultado_sectorial.range_date_start(rango_minimo);
                        sec_resultado_sectorial.range_date_end(rango_minimo);
                    }
                    sec_resultado_sectorial.refreshAngular();
                }

                if (mode === 'edit' && data == 'range_date') {
                    var rango_minimo = moment(("01-02-" + sec_resultado_sectorial.session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + sec_resultado_sectorial.session.periodo_poa).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        rango_minimo = moment(("01-02-" + session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    }

                    sec_resultado_sectorial.range_date_min(rango_minimo);
                    sec_resultado_sectorial.range_date_max(rango_maximo);
                    sec_resultado_sectorial.refreshAngular();
                }
            };
        }
    };
    sec_resultado_sectorial.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        sec_resultado_sectorial.runMagicManyToMany('involucrado', 'involucrados',
            'resultado_sectorial', 'id', 'nombre_completo', 'sec_resultado_sectorial_involucrados',
            'involucrado', 'id');
        sec_resultado_sectorial.runMagicManyToMany('responsable', 'institucion',
            'resultado_sectorial', 'id', 'nombre', 'sec_resultado_sectorial_responsable',
            'institucion', 'id');
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
    sec_resultado_sectorial.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        sec_resultado_sectorial.refreshed = false;
    };
    sec_resultado_sectorial.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        var validatett = await BASEAPI.firstp("sec_resultado_sectorial", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.inserting.no_orden
                },
                {
                    field: "objetivo_sectorial",
                    value: data.inserting.objetivo_sectorial
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
    sec_resultado_sectorial.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (sec_resultado_sectorial.no_orden)
            data.updating.no_orden = sec_resultado_sectorial.no_orden;
        var validatett = await BASEAPI.firstp("sec_resultado_sectorial", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.updating.no_orden
                },
                {
                    field: "objetivo_sectorial",
                    value: data.updating.objetivo_sectorial
                },
                {
                    field: "id",
                    operator: "!=",
                    value: sec_resultado_sectorial.id
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