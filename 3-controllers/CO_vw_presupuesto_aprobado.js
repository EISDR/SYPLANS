app.controller("vw_presupuesto_aprobado", function ($scope, $http, $compile) {
    vw_presupuesto_aprobado = this;

    vw_presupuesto_aprobado.fixFilters = [
        {
            "field": "compania",
            "value": new SESSION().current().compania_id
        }
    ];
    RUNCONTROLLER("vw_presupuesto_aprobado", vw_presupuesto_aprobado, $scope, $http, $compile);

    vw_presupuesto_aprobado.formulary = function (data, mode, defaultData) {
        if (vw_presupuesto_aprobado !== undefined) {
            RUN_B("vw_presupuesto_aprobado", vw_presupuesto_aprobado, $scope, $http, $compile);
            vw_presupuesto_aprobado.form.titles = {
                new: MESSAGE.i('planificacion.titlevw_presupuesto_aprobado'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titlevw_presupuesto_aprobado')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titlevw_presupuesto_aprobado')}`
            };
            vw_presupuesto_aprobado.form.schemas.insert = {};
            vw_presupuesto_aprobado.form.schemas.select = {};
            vw_presupuesto_aprobado.form.readonly = {};
            vw_presupuesto_aprobado.createForm(data, mode, defaultData);


        }
    };
});