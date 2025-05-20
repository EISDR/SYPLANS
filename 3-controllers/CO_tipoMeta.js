app.controller("tipoMeta", function ($scope, $http, $compile) {
    tipoMeta = this;
    RUNCONTROLLER("tipoMeta", tipoMeta, $scope, $http, $compile);
    tipoMeta.plural = MESSAGE.i('planificacion.titleTipoMeta');
    tipoMeta.singular = "Tipo de Meta";
    // tipoMeta.modalTitle = MESSAGE.i('planificacion.titleTipoMeta');
    // tipoMeta.fixFilters = [
    //     {
    //         "field": "compania",
    //         "value": SESSION.current().compania
    //     }
    // ];4
    setTimeout(function (){
        if(new SESSION().current().groups[0].caracteristica == 'SL'){
            tipoMeta.setPermission("add", false);
            tipoMeta.setPermission("edit", false);
            tipoMeta.setPermission("active", false);
            tipoMeta.setPermission("remove", false);
            tipoMeta.refreshAngular();
        }
    }, 500);
    tipoMeta.formulary = function (data, mode, defaultData) {
        if (tipoMeta !== undefined) {
            RUN_B("tipoMeta", tipoMeta, $scope, $http, $compile);
            tipoMeta.form.titles = {
                new: MESSAGE.i('planificacion.titleTipoMeta'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titleTipoMeta')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleTipoMeta')}`
            };
            tipoMeta.form.readonly = {};
            tipoMeta.createForm(data, mode, defaultData);
            tipoMeta.$scope.$watch('tipoMeta.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(tipoMeta, "nombre", rules)
            });
            tipoMeta.$scope.$watch('tipoMeta.valor', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipoMeta, "valor", rules)
            });
        }
    };
});