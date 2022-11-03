app.controller("presupuesto_aprobado_estatus", function ($scope, $http, $compile) {
    presupuesto_aprobado_estatus = this;
    presupuesto_aprobado_estatus.fixFilters = [
        {
            "field": "compania",
            "value": new SESSION().current().compania_id
        }
    ];
    RUNCONTROLLER("presupuesto_aprobado_estatus", presupuesto_aprobado_estatus, $scope, $http, $compile);
    presupuesto_aprobado_estatus.plural = " presupuesto_aprobado_estatus";
    presupuesto_aprobado_estatus.formulary = function (data, mode, defaultData) {
        if (presupuesto_aprobado_estatus !== undefined) {
            RUN_B("presupuesto_aprobado_estatus", presupuesto_aprobado_estatus, $scope, $http, $compile);
            presupuesto_aprobado_estatus.form.titles = {
                new: MESSAGE.i('planificacion.titlepresupuesto_aprobado_estatus'),
                edit: "Editar - " + presupuesto_aprobado_estatus.singular,
                view: "Ver ALL - " + presupuesto_aprobado_estatus.singular
            };
            // presupuesto_aprobado_estatus.form.schemas.insert = {};
            // presupuesto_aprobado_estatus.form.schemas.select = {};
            presupuesto_aprobado_estatus.form.readonly = {};
            presupuesto_aprobado_estatus.createForm(data, mode, defaultData);
            presupuesto_aprobado_estatus.$scope.$watch('presupuesto_aprobado_estatus.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(presupuesto_aprobado_estatus, "nombre", rules)
            });
        }
    };
});