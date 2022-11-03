app.controller("cargo", function ($scope, $http, $compile) {
    cargo = this;
    cargo.fixFilters = [];
    if (typeof institucion === "undefined") {
        cargo.fixFilters.push(
            {
                "field": "institucion",
                "operator": "IS",
                "value": "$NULL"
            }
        );
    } else {
        if (institucion === null) {
            cargo.fixFilters.push(
                {
                    "field": "institucion",
                    "operator": "IS",
                    "value": "$NULL"
                }
            );
        }
    }
    cargo.headertitle = "Cargos";

    RUNCONTROLLER("cargo", cargo, $scope, $http, $compile);
    cargo.setPermission('active', true);
    if (typeof compania === "undefined")
        compania = {id: undefined};
    cargo.formulary = function (data, mode, defaultData) {
        if (cargo !== undefined) {
            RUN_B("cargo", cargo, $scope, $http, $compile);
            cargo.form.titles = {
                new: MESSAGE.i('planificacion.titleCargo'),
                edit: "Editar - " + cargo.singular,
                view: "Ver ALL - " + cargo.singular
            };
            cargo.form.schemas.insert = {};
            cargo.form.schemas.select = {};
            cargo.form.schemas.select = {};
            if ((compania || {id: undefined}).id) {
                cargo.compania = compania.id;
                cargo.form.readonly = {compania: compania.id, active: 1};
            } else
                cargo.form.readonly = {active: 1};

            if (typeof institucion !== "undefined")
                if (institucion)
                    if (institucion.form) {
                        cargo.form.readonly.compania = institucion.compania;
                    }
            cargo.createForm(data, mode, defaultData);
            cargo.$scope.$watch('cargo.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(cargo, "nombre", rules)
            });
        }
    };
    cargo.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        if (compania)
            data.inserting.compania = (compania || {id: undefined}).id || compania.id;
        else {
            if (institucion) {
                data.inserting.compania = baseController.lacompania;
            }
        }
        resolve(true);
    });
    cargo.triggers.table.after.load = function (records) {
        cargo.setPermission("import", false);
    };
});
