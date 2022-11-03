app.controller("vw_foda_items", function ($scope, $http, $compile) {
    vw_foda_items = this;
    vw_foda_items.fixFilters = [
        {
            "field": "compania",
            "value": new SESSION().current().compania_id
        }
    ];
    RUNCONTROLLER("vw_foda_items", vw_foda_items, $scope, $http, $compile);

    vw_foda_items.formulary = function (data, mode, defaultData) {
        if (vw_foda_items !== undefined) {
            RUN_B("vw_foda_items", vw_foda_items, $scope, $http, $compile);
            vw_foda_items.form.titles = {
                new: MESSAGE.i('planificacion.titlevw_foda_items'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titlevw_foda_items')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titlevw_foda_items')}`
            };
            vw_foda_items.form.schemas.insert = {};
            vw_foda_items.form.schemas.select = {};
            vw_foda_items.form.readonly = {};
            vw_foda_items.createForm(data, mode, defaultData);
            vw_foda_items.$scope.$watch('vw_foda_items.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(vw_foda_items, "nombre", rules);
            });

        }
    };
});