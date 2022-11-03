app.controller("resultado", function ($scope, $http, $compile) {
    resultado = this;
    var session = new SESSION().current();
    resultado.session = session;
    RUNCONTROLLER("resultado", resultado, $scope, $http, $compile);
    resultado.triggers.table.after.load = async function (records) {
        resultado.runMagicColum('perspectiva', 'perspectiva', "id", "nombre");
        check_PEI("resultado", session.pei_id);
        resultado.refreshAngular();
    };
    // resultado.triggers.table.after.open = async function (data) {
    //
    //     $('.modal-title').html();
    // };
    resultado.triggers.table.after.close = async function () {
        // $('.modal-title').html(estrategia.current_title);

    }
    resultado.headertitle = "Resultado Esperado";
    resultado.formulary = function (data, mode, defaultData) {
        resultado.plural = "Resultado Esperado";
        resultado.alt = [];
        resultado.eje_estrategico = estrategia.eje_estrategico;
        resultado.objetivo_estrategico = estrategia.objetivo_estrategico;
        if (resultado !== undefined) {
            delete resultado.id;
            RUN_B("resultado", resultado, $scope, $http, $compile);
            if (estrategia)
                if (estrategia.objetivos_especificos)
                    if ((estrategia.objetivos_especificos !== "[NULL]" && estrategia.objetivos_especificos.length > 0)) {
                        resultado.selectQueries["objetivos_especificos"] = [
                            {
                                field: "id",
                                value: estrategia.objetivos_especificos
                            },
                        ];
                        resultado.alt = estrategia.objetivos_especificos;
                    }
            resultado.eje = estrategia.form.selected('eje_estrategico') ? estrategia.form.selected('eje_estrategico').nombre_sin_hijos : "";
            resultado.objetivo = estrategia.form.selected('objetivo_estrategico') ? estrategia.form.selected('objetivo_estrategico').nombre_sin_hijos : "";
            resultado.form.titles = {
                new: "Crear " + 'RESULTADO ESPERADO - Eje Estratégico ( ' + resultado.eje + ' ) / Objetivo Estratégico ( ' + resultado.objetivo + ' )',
                edit: "Editar " + 'RESULTADO ESPERADO - Eje Estratégico ( ' + resultado.eje + ' ) / Objetivo Estratégico ( ' + resultado.objetivo + ' )',
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleResultado')}`
            };

            resultado.createForm(data, mode, defaultData);

            resultado.$scope.$watch('resultado.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(resultado, "nombre", rules)
            });
            resultado.$scope.$watch('resultado.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(resultado, "descripcion", rules)
            });
            resultado.$scope.$watch('resultado.perspectiva', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(resultado, "perspectiva", rules);
            });

            resultado.triggers.table.after.control = function (data) {
                if (data === "perspectiva" && mode === "edit") {
                    if (resultado.fromView){
                        resultado.form.options.nombre.disabled = true;
                        resultado.form.options.descripcion.disabled = true;
                        resultado.form.options.perspectiva.disabled = true;
                        resultado.form.options.lineas_accion.disabled = true;
                        resultado.form.options.metasshi.disabled = true;
                        resultado.form.options.compromisos_nacionales.disabled = true;
                        resultado.form.options.compromisos_internacionales.disabled = true;
                        resultado.form.options.metas_compromisos_nacionales.disabled = true;
                        resultado.form.options.metas_compromisos_internacionales.disabled = true;
                        resultado.form.options.supuestos.disabled = true;
                        resultado.form.options.denominacion_pnpsp.disabled = true;
                        resultado.refreshAngular();
                    }
                }
                if (data === 'denominacion_pnpsp') {
                    var lista_pnpsp = [];
                    if (estrategia.form.selected('eje_estrategico')) {
                        if (estrategia.form.selected('eje_estrategico').lista_pnpsp) {
                            lista_pnpsp = eval(estrategia.form.selected('eje_estrategico').lista_pnpsp);
                            resultado.lista_pnpsp = lista_pnpsp;
                            resultado.selectQueries["denominacion_pnpsp"] = [
                                {
                                    field: "pnpsp",
                                    value: lista_pnpsp
                                }
                            ];
                        }
                    }
                }
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
            };
        }
    };
});
