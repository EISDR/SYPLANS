app.controller("direccionMeta", function ($scope, $http, $compile) {
    direccionMeta = this;
    // direccionMeta.fixFilters = [
    //     {
    //         "field": "compania",
    //         "value": new SESSION().current().compania
    //     }
    // ];
    RUNCONTROLLER("direccionMeta", direccionMeta, $scope, $http, $compile);
    direccionMeta.plural = MESSAGE.i('planificacion.titleDireccionMeta');
    direccionMeta.singular = "Dirección de Meta";
    direccionMeta.formulary = function (data, mode, defaultData) {
        if (direccionMeta !== undefined) {
            RUN_B("direccionMeta", direccionMeta, $scope, $http, $compile);
            direccionMeta.form.titles = {
                new: MESSAGE.i('planificacion.titleDireccionMeta'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titleDireccionMeta')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleDireccionMeta')}`
            };
            direccionMeta.form.readonly = {};
            direccionMeta.createForm(data, mode, defaultData);
            direccionMeta.$scope.$watch('direccionMeta.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(direccionMeta, "nombre", rules)
            });
            direccionMeta.$scope.$watch('direccionMeta.valor',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(direccionMeta, "valor", rules)
            });
        }
    };
});