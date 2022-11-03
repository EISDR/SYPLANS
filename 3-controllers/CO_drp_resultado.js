app.controller("drp_resultado", function ($scope, $http, $compile) {
    drp_resultado = this;
    drp_resultado.singular = "Resultado";
    drp_resultado.plural = "Resultados";
    drp_resultado.headertitle = "Resultados";
    drp_resultado.auditModel = "vw_resultado";
    var paso= true;
    var session = new SESSION().current();
    RUNCONTROLLER("drp_resultado", drp_resultado, $scope, $http, $compile);
    getPEIstatus(drp_resultado, session.pei_id);
        drp_resultado.triggers.table.after.load = function (records) {
            drp_resultado.runMagicColum('perspectiva', 'perspectiva', "id", "nombre");
            drp_resultado.refreshAngular();
            // if (drp_resultado.condicion_pei == ENUM_2.pei_estatus.Inactivo) {
            //     drp_resultado.setPermission("add",false);
            // }
            check_PEI("drp_resultado", session.pei_id);
        };
        drp_resultado.fixFilters = [
            {
                field: "pei",
                value: new SESSION().current().pei_id
            }
        ];
    drp_resultado.formulary = function (data, mode, defaultData) {
        if (drp_resultado !== undefined) {
            RUN_B("drp_resultado", drp_resultado, $scope, $http, $compile);
            drp_resultado.form.titles = {
                new: "Nuevo - " + MESSAGE.i('planificacion.titleResultado'),
                edit: "Editar - "+ MESSAGE.i('planificacion.titleResultado'),
                view: "Ver ALL - "+ MESSAGE.i('planificacion.titleResultado')
            };
            drp_resultado.selectQueries["estrategia"] = [
                {
                    field: "pei_id",
                    operator: "=",
                    value: new SESSION().current().pei_id
                }
            ];

            drp_resultado.form.readonly = {};
            drp_resultado.createForm(data, mode, defaultData);
            drp_resultado.$scope.$watch('drp_resultado.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(drp_resultado, "nombre", rules);
            });
            drp_resultado.$scope.$watch('drp_resultado.perspectiva', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_resultado, "perspectiva", rules);
            });
            drp_resultado.$scope.$watch('drp_resultado.estrategia',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_resultado, "estrategia", rules)
            });
        }
    };
});