app.controller("vw_departamento_not_exists_presupuesto", function ($scope, $http, $compile) {
    vw_departamento_not_exists_presupuesto = this;
    var info = new SESSION().current();

    vw_departamento_not_exists_presupuesto.fixFilters = [
        {
            "field": "compania",
            "value": info.compania_id
        },
        {
            "field": "poa",
            "value": info.poa_id ? info.poa_id : -1
        }
    ];
    RUNCONTROLLER("vw_departamento_not_exists_presupuesto", vw_departamento_not_exists_presupuesto, $scope, $http, $compile);
    vw_departamento_not_exists_presupuesto.plural = " Departamentos"
    vw_departamento_not_exists_presupuesto.formulary = function (data, mode, defaultData) {
        if (vw_departamento_not_exists_presupuesto !== undefined) {
            RUN_B("vw_departamento_not_exists_presupuesto", vw_departamento_not_exists_presupuesto, $scope, $http, $compile);
            vw_departamento_not_exists_presupuesto.form.titles = {
                new: MESSAGE.i('planificacion.titleDepartamento'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titleDepartamento')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleDepartamento')}`
            };

            vw_departamento_not_exists_presupuesto.form.readonly = {};
            vw_departamento_not_exists_presupuesto.createForm(data, mode, defaultData);
            vw_departamento_not_exists_presupuesto.$scope.$watch('vw_departamento_not_exists_presupuesto.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(vw_departamento_not_exists_presupuesto, "nombre", rules);
            });

        }
    };
});