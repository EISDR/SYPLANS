app.controller("marco_estrategicos_virtudes", function ($scope, $http, $compile) {
    marco_estrategicos_virtudes = this;

    RUNCONTROLLER("marco_estrategicos_virtudes", marco_estrategicos_virtudes, $scope, $http, $compile);
    marco_estrategicos_virtudes.triggers.table.after.load = () => new Promise((resolve, reject) => {
        setTimeout(function (){
            MESSAGE.run();
            resolve(true);
        },500);
    });
    marco_estrategicos_virtudes.triggers.table.after.audit = () => new Promise(async (resolve, reject) => {
        if (dragon_audit.storageModel == "vw_marco_estrategico_valores") {
            if (dragon_audit.dataForView.action == "insert") {
                dragon_audit.dataForView.dataJson.marco_estrategico_valor =
                    await marco_estrategicos_virtudes.runMagicColumAudit('marco_estrategico_valores',
                        dragon_audit.dataForView.dataJson.marco_estrategico_valor,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "nombre","descripcion", "marco_estrategico_valor"]);
            }

            if (dragon_audit.dataForView.action == "update") {
                dragon_audit.dataForView.dataJson.marco_estrategico_valor =
                    await marco_estrategicos_virtudes.runMagicColumAudit('marco_estrategico_valores',
                        dragon_audit.dataForView.dataJson.marco_estrategico_valor,
                        'id', 'nombre');

                dragon_audit.dataForView.updatedJson.marco_estrategico_valor =
                    await marco_estrategicos_virtudes.runMagicColumAudit('marco_estrategico_valores',
                        dragon_audit.dataForView.updatedJson.marco_estrategico_valor,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "nombre","descripcion", "marco_estrategico_valor"]);

                dragon_audit.dataForView.updatedJson = DSON.removeOther(dragon_audit.dataForView.updatedJson,
                    ["id", "type","descripcion", "marco_estrategico_valor"]);
            }

            if (dragon_audit.dataForView.action == "delete") {
                dragon_audit.dataForView.dataJson.marco_estrategico_valor =
                    await marco_estrategicos_virtudes.runMagicColumAudit('marco_estrategico_valores',
                        dragon_audit.dataForView.dataJson.marco_estrategico_valor,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "nombre","descripcion", "marco_estrategico_valor"]);
            }
        }
        resolve(true);
    });
    marco_estrategicos_virtudes.headertitle = MESSAGE.i('planificacion.titleMarcoEstrategicoVirtudes');
    marco_estrategicos_virtudes.plural = MESSAGE.i('planificacion.titleMarcoEstrategicoVirtudes');
    marco_estrategicos_virtudes.formulary = function (data, mode, defaultData) {
        if (marco_estrategicos_virtudes !== undefined) {
            RUN_B("marco_estrategicos_virtudes", marco_estrategicos_virtudes, $scope, $http, $compile);
            marco_estrategicos_virtudes.form.titles = {
                new: MESSAGE.i('planificacion.titleMarcoEstrategicoVirtudes'),
                edit: "Editar - "+ `${MESSAGE.i('planificacion.titleMarcoEstrategicoVirtudes')}`,
                view: "Ver ALL - "+ `${MESSAGE.i('planificacion.titleMarcoEstrategicoVirtudes')}`
            };
            if (RELATIONS.anonymous[$scope.modelName] !== undefined) {
                marco_estrategicos_virtudes.form.getfilter = {
                    field: RELATIONS.anonymous[$scope.modelName].fieldKey
                };
            }

            marco_estrategicos_virtudes.form.readonly = {};
            marco_estrategicos_virtudes.createForm(data, mode, defaultData);
            marco_estrategicos_virtudes.$scope.$watch('marco_estrategicos_virtudes.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(marco_estrategicos_virtudes, "nombre", rules)
            });
            marco_estrategicos_virtudes.$scope.$watch('marco_estrategicos_virtudes.marco_estrategico_valor',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(marco_estrategicos_virtudes, "marco_estrategico_valor", rules)
            });
            marco_estrategicos_virtudes.$scope.$watch('marco_estrategicos_virtudes.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(marco_estrategicos_virtudes, "descripcion", rules)
            });
        }
    };
});