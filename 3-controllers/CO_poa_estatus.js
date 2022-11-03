app.controller("poa_estatus", function ($scope, $http, $compile) {
    poa_estatus = this;

    RUNCONTROLLER("poa_estatus", poa_estatus, $scope, $http, $compile);
    poa_estatus.plural = " poa_estatus";
    poa_estatus.formulary = function (data, mode, defaultData) {
        if (poa_estatus !== undefined) {
            RUN_B("poa_estatus", poa_estatus, $scope, $http, $compile);
            poa_estatus.form.titles = {
                new: MESSAGE.i('planificacion.titlepoa_estatus'),
                edit: "Editar - " + poa_estatus.singular,
                view: "Ver ALL - " + poa_estatus.singular
            };
            poa_estatus.form.readonly = {};
            poa_estatus.createForm(data, mode, defaultData);
            poa_estatus.$scope.$watch('poa_estatus.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa_estatus, "nombre", rules)
            });
        }
    };
});