app.controller("vw_departamentos_dashboard", function ($scope, $http, $compile) {
    vw_departamentos_dashboard = this;
    vw_departamentos_dashboard.fixFilters = [
        {
            "field": "compania",
            "value": new SESSION().current().compania_id
        }
    ];
    RUNCONTROLLER("vw_departamentos_dashboard", vw_departamentos_dashboard, $scope, $http, $compile);
    vw_departamentos_dashboard.plural = " vw_departamentos_dashboard";
    vw_departamentos_dashboard.formulary = function (data, mode, defaultData) {
        if (vw_departamentos_dashboard !== undefined) {
            RUN_B("vw_departamentos_dashboard", vw_departamentos_dashboard, $scope, $http, $compile);
            vw_departamentos_dashboard.form.titles = {
                new: MESSAGE.i('planificacion.titlevw_departamentos_dashboard'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titlevw_departamentos_dashboard')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titlevw_departamentos_dashboard')}`
            };
            // vw_departamentos_dashboard.form.schemas.insert = {};
            // vw_departamentos_dashboard.form.schemas.select = {};
            vw_departamentos_dashboard.form.readonly = {};
            vw_departamentos_dashboard.createForm(data, mode, defaultData);
            vw_departamentos_dashboard.$scope.$watch('vw_departamentos_dashboard.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_departamentos_dashboard, "nombre", rules)
            });
        }
    };
});