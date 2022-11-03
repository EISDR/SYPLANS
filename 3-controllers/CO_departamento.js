app.controller("departamento", function ($scope, $http, $compile) {
    departamento = this;
    departamento.fixFilters = [];
    if (typeof institucion === "undefined") {
        departamento.fixFilters.push(
            {
                "field": "institucion",
                "operator": "IS",
                "value": "$NULL"
            }
        );
    } else {
        if (institucion === null) {
            departamento.fixFilters.push(
                {
                    "field": "institucion",
                    "operator": "IS",
                    "value": "$NULL"
                }
            );
        }
    }
    departamento.headertitle = "Departamentos";


    if (typeof compania === "undefined")
        compania = {id: undefined};
    RUNCONTROLLER("departamento", departamento, $scope, $http, $compile);
    departamento.setPermission('active', true);
    departamento.plural = " Departamentos";
    departamento.formulary = function (data, mode, defaultData) {
        if (departamento !== undefined) {
            RUN_B("departamento", departamento, $scope, $http, $compile);
            departamento.form.titles = {
                new: MESSAGE.i('planificacion.titleDepartamento'),
                edit: "Editar - " + departamento.singular,
                view: "Ver ALL - " + departamento.singular
            };
            // departamento.form.schemas.insert = {};
            // departamento.form.schemas.select = {};
            if ((compania || {id: undefined}).id) {
                departamento.compania = compania.id;
                departamento.form.readonly = {compania: compania.id, active: 1};
            } else
                departamento.form.readonly = {active: 1};

            if (typeof institucion !== "undefined")
                if (institucion)
                    if (institucion.form) {
                        departamento.form.readonly.compania = departamento.compania;
                    }
            departamento.createForm(data, mode, defaultData);
            departamento.$scope.$watch('departamento.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(departamento, "nombre", rules)
            });
            departamento.$scope.$watch('departamento.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(departamento, "descripcion", rules);
            });
            departamento.selectQueries["direccion_area"] = [
                {
                    field: 'compania',
                    operator: "=",
                    value: compania.id
                }
            ];
        }
    };
    departamento.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {

        if (compania)
            data.inserting.compania = (compania || {id: undefined}).id || compania.id;
        else {
            if (institucion) {
                data.inserting.compania = baseController.lacompania;
            }
        }
        resolve(true);
    });
    departamento.triggers.table.before.update = (data) => new Promise((resolve, reject) => {

        if (compania)
            data.updating.compania = (compania || {id: undefined}).id || compania.id;
        else {
            if (institucion) {
                data.updating.compania = baseController.lacompania;
            }
        }
        resolve(true);
    });
    departamento.triggers.table.after.load = function (records) {
        departamento.setPermission("import", false);
    };
});
