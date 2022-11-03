app.controller("trabajar_asignacion_especial_poa_monitoreo", function ($scope, $http, $compile) {
    trabajar_asignacion_especial_poa_monitoreo = this;
    trabajar_asignacion_especial_poa_monitoreo.id_actividad = [];
    trabajar_asignacion_especial_poa_monitoreo.poa_id = new SESSION().current().poa_id === null ? 0 : new SESSION().current().poa_id;
    RUNCONTROLLER("trabajar_asignacion_especial_poa_monitoreo", trabajar_asignacion_especial_poa_monitoreo, $scope, $http, $compile);
    trabajar_asignacion_especial_poa_monitoreo.singular = "Asignaciones POA";
    trabajar_asignacion_especial_poa_monitoreo.plural = "Asignaciones POA";

        trabajar_asignacion_especial_poa_monitoreo.fixFilters = [
            {
                "field": "poa_id",
                "value": typeof poa != "undefined" ? poa.ids : poa_admin.ids
            },
            {
                "open": "(",
                "field": "completa",
                "operator": "!=",
                "value": 1,
                "connector": "OR"
            },
            {
                "field": "completa",
                "operator": "",
                "value": "$IS NULL",
                "close": ")"
            }
        ];


    trabajar_asignacion_especial_poa_monitoreo.formulary = function (data, mode, defaultData) {
        if (trabajar_asignacion_especial_poa_monitoreo !== undefined) {
            RUN_B("trabajar_asignacion_especial_poa_monitoreo", trabajar_asignacion_especial_poa_monitoreo, $scope, $http, $compile);
            trabajar_asignacion_especial_poa_monitoreo.form.titles = {
                new: MESSAGE.i('planificacion.titletrabajar_asignacion_especial_poa_monitoreo'),
                edit: "Editar - "+` ${MESSAGE.i('planificacion.titletrabajar_asignacion_especial_poa_monitoreo')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titletrabajar_asignacion_especial_poa_monitoreo')}`
            };
            trabajar_asignacion_especial_poa_monitoreo.form.readonly = {poa: trabajar_asignacion_especial_poa_monitoreo.poa_id};
            trabajar_asignacion_especial_poa_monitoreo.createForm(data, mode, defaultData);

            trabajar_asignacion_especial_poa_monitoreo.$scope.$watch('trabajar_asignacion_especial_poa_monitoreo.comentario',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(trabajar_asignacion_especial_poa_monitoreo, "comentario", rules)
            });
        }
    };

});