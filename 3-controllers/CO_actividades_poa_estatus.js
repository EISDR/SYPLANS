app.controller("actividades_poa_estatus", function ($scope, $http, $compile) {
    actividades_poa_estatus = this;

    RUNCONTROLLER("actividades_poa_estatus", actividades_poa_estatus, $scope, $http, $compile);
    actividades_poa_estatus.plural = " actividades_poa_estatus";
    actividades_poa_estatus.formulary = function (data, mode, defaultData) {
        if (actividades_poa_estatus !== undefined) {
            RUN_B("actividades_poa_estatus", actividades_poa_estatus, $scope, $http, $compile);
            actividades_poa_estatus.form.titles = {
                new: "Nuevo - " + MESSAGE.i('planificacion.titleactividades_poa_estatus'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titleactividades_poa_estatus')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleactividades_poa_estatus')}`
            };
            // actividades_poa_estatus.form.schemas.insert = {};
            // actividades_poa_estatus.form.schemas.select = {};
            actividades_poa_estatus.form.readonly = {};
            actividades_poa_estatus.createForm(data, mode, defaultData);
            actividades_poa_estatus.$scope.$watch('actividades_poa_estatus.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(actividades_poa_estatus, "nombre", rules)
            });
        }
    };
});
