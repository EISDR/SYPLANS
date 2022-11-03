app.controller("drp_eje_estrategico_end", function ($scope, $http, $compile) {
    drp_eje_estrategico_end = this;
    drp_eje_estrategico_end.session =  new SESSION().current();
    var session =  new SESSION().current();
    drp_eje_estrategico_end.publica = ENUM_2.COMPANY_TYPE.publica;
    drp_eje_estrategico_end.singular = "Eje estratégico";
    drp_eje_estrategico_end.plural = "Ejes estratégicos";
    drp_eje_estrategico_end.headertitle = "Ejes estratégicos";
    drp_eje_estrategico_end.fixFilters = [{
        field: "pei",
        value: session.pei_id
    }];
    RUNCONTROLLER("drp_eje_estrategico_end", drp_eje_estrategico_end, $scope, $http, $compile);
    drp_eje_estrategico_end.triggers.table.after.load = async function (records) {
        check_PEI("drp_eje_estrategico_end", session.pei_id);
    };
    drp_eje_estrategico_end.formulary = function (data, mode, defaultData) {
        if (drp_eje_estrategico_end !== undefined) {
            RUN_B("drp_eje_estrategico_end", drp_eje_estrategico_end, $scope, $http, $compile);

            drp_eje_estrategico_end.form.titles = {
                new: MESSAGE.i('planificacion.titleEjeEstrategico'),
                edit: "Editar - "+` ${MESSAGE.i('planificacion.titleEjeEstrategico')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleEjeEstrategico')}`
            };
            drp_eje_estrategico_end.selectQueries["aliniacion_end"] = [
                {
                    field: "compania",
                    operator: "=",
                    value: session.compania_id
                }
            ];
            drp_eje_estrategico_end.selectQueries["aliniacion_ods"] = [
                {
                    field: "compania",
                    operator: "=",
                    value: session.compania_id
                }
            ];
            drp_eje_estrategico_end.selectQueries["aliniacion_pnpsp"] = [
                {
                    field: "compania",
                    operator: "=",
                    value: session.compania_id
                }
            ];

            drp_eje_estrategico_end.form.readonly = {pei:new SESSION().current().pei_id};
            drp_eje_estrategico_end.createForm(data, mode, defaultData);
            drp_eje_estrategico_end.$scope.$watch('drp_eje_estrategico_end.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(drp_eje_estrategico_end, "nombre", rules);
            });

            drp_eje_estrategico_end.$scope.$watch('drp_eje_estrategico_end.no_orden', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_eje_estrategico_end, "no_orden", rules);
            });

            drp_eje_estrategico_end.$scope.$watch('drp_eje_estrategico_end.aliniacion_end', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_eje_estrategico_end, "aliniacion_end", rules);
            });

            drp_eje_estrategico_end.$scope.$watch('drp_eje_estrategico_end.aliniacion_pnpsp', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_eje_estrategico_end, "aliniacion_pnpsp", rules);
            });

            drp_eje_estrategico_end.$scope.$watch('drp_eje_estrategico_end.aliniacion_ods', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_eje_estrategico_end, "aliniacion_ods", rules);
            });
        }
    };
});