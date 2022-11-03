app.controller("poa_monitoreo", function ($scope, $http, $compile) {
    poa_monitoreo = this;

    RUNCONTROLLER("poa_monitoreo", poa_monitoreo, $scope, $http, $compile);
    // poa_monitoreo.modalTitle = MESSAGE.i('planificacion.poa_monitoreo');
    poa_monitoreo.fixFilters = [
        {
            "field": "deleted_at",
            "value": null
        }
    ];
    poa_monitoreo.formulary = function (data, mode, defaultData) {
        if (poa_monitoreo !== undefined) {
            console.log("sd'");
            RUN_B("poa_monitoreo", poa_monitoreo, $scope, $http, $compile);
            poa_monitoreo.form.schemas.insert = {};
            poa_monitoreo.form.schemas.select = {};
            poa_monitoreo.form.readonly = {};
            poa_monitoreo.createForm(data, mode, defaultData);
            poa_monitoreo.$scope.$watch('poa_monitoreo.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(poa_monitoreo, "nombre", rules)
            });
        }
    };
});