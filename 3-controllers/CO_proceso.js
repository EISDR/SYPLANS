app.controller("proceso", function ($scope, $http, $compile) {
    proceso = this;
    proceso.session = new SESSION().current();
    proceso.fixFilters = [
        {
            field: "compania",
            value: proceso.session.compania_id
        },
        {
            "field": "institucion",
            "operator": "=",
            "value": proceso.session.institucion_id ? proceso.session.institucion_id : "null"
        }
    ];
    // proceso.fixFilters = [
    //     {
    //         "field": "compania",
    //         "value": SESSION.current().compania
    //     }
    // ];
    RUNCONTROLLER("proceso", proceso, $scope, $http, $compile);

    proceso.formulary = function (data, mode, defaultData) {
        if (proceso !== undefined) {
            RUN_B("proceso", proceso, $scope, $http, $compile);
            proceso.form.titles = {
                new: MESSAGE.i('planificacion.titleproceso'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titleproceso')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleproceso')}`
            };
            proceso.form.readonly = {compania: proceso.session.compania_id, institucion: proceso.session.institucion_id ? proceso.session.institucion_id : 'null' };
            proceso.createForm(data, mode, defaultData);
            proceso.$scope.$watch('proceso.nombre', function (value) {
               var rules = [];
               rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
               VALIDATION.validate(proceso, "nombre", rules)
            });

        }
    };
});