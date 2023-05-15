app.controller("end", function ($scope, $http, $compile) {
    end = this;
    end.id_end = [];
    var session = new SESSION().current();
    end.from_eje = false;
    BASEAPI.list('end', {
        limit: 0,
        where: [{
            "field": "compania",
            "value": session.compania_id ? session.compania_id : 0
        }]
    }, function (result) {
        for (var value of result.data) {
            end.id_end.push(value.id);
        }
    });
    end.fixFilters = [
        {
            "field": "compania",
            "value": session.compania_id ? session.compania_id : 0
        }
    ];
    RUNCONTROLLER("end", end, $scope, $http, $compile);
    end.singular = MESSAGE.i('columns.end_singular');
    end.formulary = function (data, mode, defaultData) {
        if (end !== undefined) {
            RUN_B("end", end, $scope, $http, $compile);
            end.form.titles = {
                new: MESSAGE.i('planificacion.titleEjeEnd'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titleEjeEnd')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleEjeEnd')}`
            };
            end.form.schemas.insert = {};
            end.form.schemas.select = {};
            end.form.readonly = {};
            end.createForm(data, mode, defaultData);
            if (typeof eje_estrategico != "undefined") {
                if (eje_estrategico) {
                    if (typeof eje_estrategico !== 'not defined') {
                        end.from_eje = true;
                    }
                }
            }

            end.$scope.$watch('end.edt', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(end, "edt", rules);
            });


            end.$scope.$watch('end.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(end, "nombre", rules);
            });
            end.$scope.$watch('end.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(end, "descripcion", rules);
            });
        }
    };
    end.triggers.table.after.control = function (data) {
        if (data === 'objetivo') {
            objetivo.setPermission("add", true);
            objetivo.setPermission("edit", true);
            objetivo.setPermission("remove", true);
            objetivo.setPermission("view", true);
            objetivo.setPermission("import", true);
            objetivo.setPermission("copy", true);
            objetivo.setPermission("actions", true);
        }
    };
    end.triggers.table.after.load = function () {
        end.runMagicOneToMany('objetivo', 'vw_objetivos_edt', 'end', 'final', 'id');
    }
    end.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        var session = new SESSION().current();
        var edt = await BASEAPI.firstp("end", {
            where: [
                {
                    field: "edt",
                    operator: "=",
                    value: data.inserting.edt
                },
                {
                    field: "compania",
                    operator: "=",
                    value: new SESSION().current() ? (CONFIGCOMPANY.sectorial|| new SESSION().current().compania_id) : -1
                },
            ]
        });
        if (edt) {
            SWEETALERT.show({
                type: "warning",
                title: "Validación",
                message: "Ya existe un registro con el No. Secuencia: " + data.inserting.edt
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    end.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        var session = new SESSION().current();
        var edt = await BASEAPI.firstp("end", {
            where: [
                {
                    field: "edt",
                    operator: "=",
                    value: data.updating.edt
                },
                {
                    field: "compania",
                    operator: "=",
                    value: new SESSION().current().compania_id
                },
                {
                    "field": "institucion",
                    "operator": new SESSION().current().institucion_id ? "=" : "is",
                    "value": new SESSION().current().institucion_id ? new SESSION().current().session.institucion_id : "$null"
                },
                {
                    field: "id",
                    operator: "!=",
                    value: end.id
                },
            ]
        });
        if (edt) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un registro con el No. Secuencia: " + data.updating.edt
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    end.refreshme = function (){
        if (typeof objetivo != "undefined") {
            if (objetivo) {
                if (typeof objetivo !== 'not defined') {
                    objetivo.refresh();
                }
            }
        }
        if (typeof objetivo_especifico != "undefined") {
            if (objetivo_especifico) {
                if (typeof objetivo_especifico !== 'not defined') {
                    objetivo_especifico.refresh();
                }
            }
        }
        if (typeof linea_accion != "undefined") {
            if (linea_accion) {
                if (typeof linea_accion !== 'not defined') {
                    linea_accion.refresh();
                }
            }
        }
    }
});
