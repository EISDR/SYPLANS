app.controller("perspectiva", function ($scope, $http, $compile) {
    perspectiva = this;
    perspectiva.session = new SESSION().current();
    if (perspectiva.session.super) {
        perspectiva.fixFilters = [];
    }else{
        perspectiva.fixFilters = [
            {
                "field": "compania",
                "value": perspectiva.session.compania_id
            },
            {
                "field": "institucion",
                "operator": perspectiva.session.institucion_id ? "=" : "is",
                "value":  perspectiva.session.institucion_id ?  perspectiva.session.institucion_id : "$null"
            }
        ];
    }
    perspectiva.headertitle = "Perspectiva";
    RUNCONTROLLER("perspectiva", perspectiva, $scope, $http, $compile);
    perspectiva.setPermission('export', false);
    perspectiva.formulary = function (data, mode, defaultData) {
        if (perspectiva !== undefined) {
            RUN_B("perspectiva", perspectiva, $scope, $http, $compile);
            perspectiva.form.titles = {
                new: MESSAGE.i('planificacion.titlePerspectiva'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titlePerspectiva')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titlePerspectiva')}`
            };
            if (perspectiva.session.super){
                perspectiva.form.readonly = {};
            }
            perspectiva.createForm(data, mode, defaultData);
            perspectiva.$scope.$watch('perspectiva.no_orden', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(perspectiva, "no_orden", rules)
            });
            perspectiva.$scope.$watch('perspectiva.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(perspectiva, "nombre", rules)
            });
            perspectiva.$scope.$watch('perspectiva.descripcion', function (value) {
                var rules = [];
                // rules.push(VALIDATION.general.required(value));
                // rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(perspectiva, "descripcion", rules)
            });
            if (perspectiva.session.super){
                perspectiva.$scope.$watch('perspectiva.compania', function (value) {
                    var rules = [];
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(perspectiva, "compania", rules)
                });
            }

        }
    };
    perspectiva.triggers.table.after.load = function (records) {
        perspectiva.runMagicColum('compania', 'compania', "id", "nombre");
        perspectiva.runMagicColum('institucion', 'institucion', "id", "nombre");
    };
    perspectiva.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        const esSuper = perspectiva.session.super;
        const institucionValida = perspectiva.institucion != '[NULL]';
        const institucionId = perspectiva.session.institucion_id;

        const operator = esSuper
            ? (institucionValida ? "=" : institucionId ? "=" : "is")
            : "is";

        const value = esSuper
            ? (institucionValida ? perspectiva.institucion : institucionId ? institucionId : "$null")
            : "$null";

        var no_orden = await BASEAPI.firstp("perspectiva", {
            where: [
                {
                    field: "no_orden",
                    operator: "=",
                    value: data.inserting.no_orden
                },
                {
                    field: "compania",
                    operator: "=",
                    value: perspectiva.session.super ? perspectiva.compania : perspectiva.session.compania_id
                },
                {
                    field: "institucion",
                    operator: operator,
                    value: value
                }
            ]
        });
        if (perspectiva.session.super){
            data.inserting.compania = perspectiva.compania;
            data.inserting.institucion = perspectiva.institucion != '[NULL]' ? perspectiva.institucion : "$null";
        }else{
            data.inserting.compania = perspectiva.session.compania_id;
            data.inserting.institucion = perspectiva.session.institucion_id;
        }
        if (no_orden) {
            SWEETALERT.show({
                type: "warning",
                title: "Validación",
                message: "Ya existe un registro con el No. orden: " + perspectiva.no_orden
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        data.inserting.no_orden = perspectiva.no_orden;
        resolve(true);
    });
    perspectiva.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        const esSuper = perspectiva.session.super;
        const institucionValida = perspectiva.institucion != '[NULL]';
        const institucionId = perspectiva.session.institucion_id;

        const operator = esSuper
            ? (institucionValida ? "=" : institucionId ? "=" : "is")
            : "is";

        const value = esSuper
            ? (institucionValida ? perspectiva.institucion : institucionId ? institucionId : "$null")
            : "$null";

        var no_orden = await BASEAPI.firstp("perspectiva", {
            where: [
                {
                    field: "id",
                    operator: "!=",
                    value: perspectiva.id
                },
                {
                    field: "no_orden",
                    operator: "=",
                    value: perspectiva.no_orden
                },
                {
                    field: "compania",
                    operator: "=",
                    value: perspectiva.session.super ? perspectiva.compania : perspectiva.session.compania_id
                },
                {
                    field: "institucion",
                    operator: operator,
                    value: value
                }
            ]
        });
        if (perspectiva.session.super){
            data.updating.compania = perspectiva.compania;
            data.updating.institucion = perspectiva.institucion != '[NULL]' ? perspectiva.institucion : "$null";
        }else{
            data.updating.compania = perspectiva.session.compania_id;
            data.updating.institucion = perspectiva.session.institucion_id;
        }
        if (no_orden) {
            SWEETALERT.show({
                type: "warning",
                title: "Validación",
                message: "Ya existe un registro con el No. orden: " + perspectiva.no_orden
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        data.updating.no_orden = perspectiva.no_orden;
        resolve(true);
    });
});