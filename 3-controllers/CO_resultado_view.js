app.controller("resultado_view", function ($scope, $http, $compile) {
    resultado_view = this;
    var session = new SESSION().current();

    RUNCONTROLLER("resultado_view", resultado_view, $scope, $http, $compile);
    resultado_view.headertitle = MESSAGE.i('columns.resultado_view_plural');
    resultado_view.triggers.table.after.load = async function (records) {
        resultado_view.runMagicColum('perspectiva', 'perspectiva', "id", "nombre");
        check_PEI("resultado_view", session.pei_id);
        resultado_view.refreshAngular();
    };
    // resultado_view.headertitle = "resultado_view Esperado";
    resultado_view.formulary = function (data, mode, defaultData) {
        // resultado_view.plural = "resultado_view Esperado";
        if (resultado_view !== undefined) {
            RUN_B("resultado_view", resultado_view, $scope, $http, $compile);

            // resultado_view.form.titles = {
            //     new: MESSAGE.i('planificacion.titleresultado_view'),
            //     edit: "Editar - "+`${MESSAGE.i('planificacion.titleresultado_view')}`,
            //     view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleresultado_view')}`
            // };

            resultado_view.createForm(data, mode, defaultData);

            resultado_view.$scope.$watch('resultado_view.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(resultado_view, "nombre", rules)
            });

            resultado_view.$scope.$watch('resultado_view.perspectiva', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(resultado_view, "perspectiva", rules);
            });
        }
    };
});