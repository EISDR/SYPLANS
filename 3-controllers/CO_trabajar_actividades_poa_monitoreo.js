app.controller("trabajar_actividades_poa_monitoreo", function ($scope, $http, $compile) {
    trabajar_actividades_poa_monitoreo = this;
    trabajar_actividades_poa_monitoreo.id_actividad = [];
    trabajar_actividades_poa_monitoreo.poa_id = new SESSION().current().poa_id === null ? 0 : new SESSION().current().poa_id;


    trabajar_actividades_poa_monitoreo.fixFilters = [
        {
            "field": "poa",
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


    RUNCONTROLLER("trabajar_actividades_poa_monitoreo", trabajar_actividades_poa_monitoreo, $scope, $http, $compile);
    trabajar_actividades_poa_monitoreo.singular = "Actividades POA";
    trabajar_actividades_poa_monitoreo.plural = "Actividades POA";
    trabajar_actividades_poa_monitoreo.formulary = function (data, mode, defaultData) {
        if (trabajar_actividades_poa_monitoreo !== undefined) {
            RUN_B("trabajar_actividades_poa_monitoreo", trabajar_actividades_poa_monitoreo, $scope, $http, $compile);
            trabajar_actividades_poa_monitoreo.form.titles = {
                new: MESSAGE.i('planificacion.titletrabajar_actividades_poa_monitoreo'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titletrabajar_actividades_poa_monitoreo')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titletrabajar_actividades_poa_monitoreo')}`
            };
            trabajar_actividades_poa_monitoreo.form.readonly = {poa: new SESSION().current().poa_id};
            trabajar_actividades_poa_monitoreo.createForm(data, mode, defaultData);

            trabajar_actividades_poa_monitoreo.$scope.$watch('trabajar_actividades_poa_monitoreo.comentario', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(trabajar_actividades_poa_monitoreo, "comentario", rules)
            });
        }
    };

});