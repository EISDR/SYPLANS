app.controller("vw_presupuesto_departamento", function ($scope, $http, $compile) {
    vw_presupuesto_departamento = this;
    RUNCONTROLLER("vw_presupuesto_departamento", vw_presupuesto_departamento, $scope, $http, $compile);
    vw_presupuesto_departamento.formulary = function (data, mode, defaultData) {
        if (vw_presupuesto_departamento !== undefined) {
            RUN_B("vw_presupuesto_departamento", vw_presupuesto_departamento, $scope, $http, $compile);
            vw_presupuesto_departamento.form.readonly = {};
            vw_presupuesto_departamento.createForm(data, mode, defaultData);
        }
    };
});