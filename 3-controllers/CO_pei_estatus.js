app.controller("pei_estatus", function ($scope, $http, $compile) {
    pei_estatus = this;

    RUNCONTROLLER("pei_estatus", pei_estatus, $scope, $http, $compile);
    pei_estatus.plural = " pei_estatus";
    pei_estatus.formulary = function (data, mode, defaultData) {
        if (pei_estatus !== undefined) {
            RUN_B("pei_estatus", pei_estatus, $scope, $http, $compile);
            pei_estatus.form.titles = {
                new: MESSAGE.i('planificacion.titlepei_estatus'),
                edit: "Editar - " + pei_estatus.singular,
                view: "Ver ALL - " + pei_estatus.singular
            };
            pei_estatus.form.readonly = {};
            pei_estatus.createForm(data, mode, defaultData);
            pei_estatus.$scope.$watch('pei_estatus.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(pei_estatus, "nombre", rules)
            });
        }
    };
});