app.controller("vw_pesta_items", function ($scope, $http, $compile) {
    vw_pesta_items = this;
    vw_pesta_items.fixFilters = [
        {
            "field": "compania",
            "value": new SESSION().current().compania_id
        }
    ];
    RUNCONTROLLER("vw_pesta_items", vw_pesta_items, $scope, $http, $compile);

    vw_pesta_items.formulary = function (data, mode, defaultData) {
        if (vw_pesta_items !== undefined) {
            RUN_B("vw_pesta_items", vw_pesta_items, $scope, $http, $compile);
            vw_pesta_items.form.titles = {
                new: MESSAGE.i('planificacion.titlevw_pesta_items'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titlevw_pesta_items')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titlevw_pesta_items')}`
            };
            vw_pesta_items.form.schemas.insert = {};
            vw_pesta_items.form.schemas.select = {};
            vw_pesta_items.form.readonly = {};
            vw_pesta_items.createForm(data, mode, defaultData);
            vw_pesta_items.$scope.$watch('vw_pesta_items.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(vw_pesta_items, "nombre", rules);
            });

        }
    };
});