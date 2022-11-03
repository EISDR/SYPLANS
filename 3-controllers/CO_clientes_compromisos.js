app.controller("clientes_compromisos", function ($scope, $http, $compile) {
    clientes_compromisos = this;

    // if (typeof estrategia !== 'undefined'  ){
    //     if (typeof estrategia !== 'not define'){
    //         if (estrategia) {
    //             if(estrategia.form.mode == "new"){
    //                 clientes_compromisos.fixFilters = [
    //                     {
    //                         "field": "tempid",
    //                         "value": 'estrategia' + estrategia.form.options.clientes_compromisos.tempId
    //                     }
    //                 ];
    //             }
    //         }
    //
    //     }
    //
    // } else {
    //     if(drp_estrategia.form.mode == "new"){
    //         clientes_compromisos.fixFilters = [
    //             {
    //                 "field": "tempid",
    //                 "value": 'estrategia' + drp_estrategia.form.options.clientes_compromisos.tempId
    //             }
    //         ];
    //     }
    // }

    RUNCONTROLLER("clientes_compromisos", clientes_compromisos, $scope, $http, $compile);
    clientes_compromisos.headertitle = "Compromiso Institucional";
    clientes_compromisos.plural = "Compromisos Institucionales";
    clientes_compromisos.singular = "Compromiso Institucional";
    clientes_compromisos.formulary = function (data, mode, defaultData) {
        clientes_compromisos.plural = "Compromiso Institucional";
        clientes_compromisos.singular = "Compromiso Institucional";
        if (clientes_compromisos !== undefined) {
            RUN_B("clientes_compromisos", clientes_compromisos, $scope, $http, $compile);

            if (RELATIONS.anonymous[$scope.modelName] !== undefined) {
                clientes_compromisos.form.getfilter = {
                    field: RELATIONS.anonymous[$scope.modelName].fieldKey
                };
            }
            clientes_compromisos.form.titles = {
                new: MESSAGE.i('planificacion.titleclientes_compromisos'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titleclientes_compromisos')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleclientes_compromisos')}`
            };

            clientes_compromisos.createForm(data, mode, defaultData);

            clientes_compromisos.$scope.$watch('clientes_compromisos.compromiso',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(clientes_compromisos, "compromiso", rules)
            });


        }
    };
});