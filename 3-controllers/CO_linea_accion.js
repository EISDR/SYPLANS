app.controller("linea_accion", function ($scope, $http, $compile) {
    linea_accion = this;
    linea_accion.id_objetivo = [];
    // BASEAPI.list('end',{
    //     limit: 0,
    //     page: 1,
    //     orderby: "id",
    //     order: "asc",
    //     where: [{
    //         "field": "compania",
    //         "value": new SESSION().current().compania_id
    //     }]
    // },function (result) {
    // linea_accion.refresh();
    // if(!result.data.length > 0){
    // } else {
    //     for(var value of result.data){
    //         linea_accion.id_end.push(value.id);
    //     }
    // }
    // });
    // linea_accion.fixFilters = [
    //     {
    //         "field": "end",
    //         "value": linea_accion.id_end
    //     }
    // ];
    // linea_accion.destroyForm = false;
    linea_accion.session = new SESSION().current();
    RUNCONTROLLER("linea_accion", linea_accion, $scope, $http, $compile);
    RUN_B("linea_accion", linea_accion, $scope, $http, $compile);
    linea_accion.triggers.table.after.load = () => new Promise((resolve, reject) => {
        for (var i in linea_accion.records.data) {
            linea_accion.records.data[i].edt = end.edt
                + (linea_accion.records.data[i].objetivo_edt ? `.${linea_accion.records.data[i].objetivo_edt}` : '')
                + (linea_accion.records.data[i].objetivo_especifico_edt ? `.${linea_accion.records.data[i].objetivo_especifico_edt}` : '')
                + (linea_accion.records.data[i].edt ? `.${linea_accion.records.data[i].edt}` : '');
        }
        setTimeout(function () {
            MESSAGE.run();
            resolve(true);
        }, 500);
        linea_accion.runMagicManyToMany('politica_gobierno', 'vw_politica_gobierno',
            'linea_accion', 'id', 'nom_sec', 'linea_accion_politica',
            'politica_gobierno', 'id');
    });
    linea_accion.headertitle = "Líneas de Acción";
    linea_accion.formulary = function (data, mode, defaultData) {
        if (linea_accion !== undefined) {
            RUN_B("linea_accion", linea_accion, $scope, $http, $compile);

            linea_accion.form.titles = {
                new: "Agregar Línea de Acción al END: " + end.nombre,
                edit: "Editar Línea de Acción del END: " + end.nombre,
                view: "Ver Línea de Acción del END: " + end.nombre
            };
            linea_accion.form.readonly = {};
            if (RELATIONS.anonymous[$scope.modelName] !== undefined) {
                linea_accion.form.getfilter = {
                    field: RELATIONS.anonymous[$scope.modelName].fieldKey
                };
            }
            linea_accion.createForm(data, mode, defaultData);
            //linea_accion.form.titles.new = "Agregar Línea de Acción al END. " + end.nombre;

            linea_accion.$scope.$watch('linea_accion.objetivo', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(linea_accion, "objetivo", rules)
            });
            linea_accion.$scope.$watch('linea_accion.objetivo_especifico', function (value) {
                var rules = [];
                if (linea_accion.form.selected('objetivo_especifico')) {
                    if (linea_accion.form.selected('objetivo_especifico').lista_objetivos_sectoriales) {
                        linea_accion.lista_objetivos_sectoriales = eval(linea_accion.form.selected('objetivo_especifico').lista_objetivos_sectoriales);
                        linea_accion.selectQueries["programa_sectoriales"] = [
                            {
                                field: "objetivo_sectorial",
                                value: linea_accion.lista_objetivos_sectoriales
                            }
                        ];
                    } else {
                        linea_accion.selectQueries["programa_sectoriales"] = [
                            {
                                field: "id",
                                value: -1
                            }
                        ];
                    }
                } else {
                    linea_accion.selectQueries["programa_sectoriales"] = [
                        {
                            field: "id",
                            value: -1
                        }
                    ];
                }
                linea_accion.lista_objetivos_sectoriales = [];
                if (mode === "new"){
                    linea_accion.programa_sectoriales = [];
                }
                linea_accion.form.loadDropDown('programa_sectoriales');
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(linea_accion, "objetivo_especifico", rules)
            });
            linea_accion.$scope.$watch('linea_accion.edt', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(linea_accion, "edt", rules);
            });
            linea_accion.$scope.$watch('linea_accion.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(linea_accion, "nombre", rules)
            });
            linea_accion.$scope.$watch('linea_accion.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(linea_accion, "descripcion", rules);
            });

            linea_accion.triggers.table.after.control = function (data) {
                //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
                if (data === "objetivo_especifico" && mode === "edit") {
                    if (linea_accion.form.selected('objetivo_especifico')) {
                        if (linea_accion.form.selected('objetivo_especifico').lista_objetivos_sectoriales) {
                            linea_accion.lista_objetivos_sectoriales = eval(linea_accion.form.selected('objetivo_especifico').lista_objetivos_sectoriales);
                            linea_accion.selectQueries["programa_sectoriales"] = [
                                {
                                    field: "objetivo_sectorial",
                                    value: linea_accion.lista_objetivos_sectoriales
                                }
                            ];
                        } else {
                            linea_accion.selectQueries["programa_sectoriales"] = [
                                {
                                    field: "id",
                                    value: -1
                                }
                            ];
                        }
                    } else {
                        linea_accion.selectQueries["programa_sectoriales"] = [
                            {
                                field: "id",
                                value: -1
                            }
                        ];
                    }
                    linea_accion.lista_objetivos_sectoriales = [];
                    linea_accion.form.loadDropDown('programa_sectoriales');
                }else if (data === "objetivo_especifico" && mode === "new"){
                    // console.log("Coñazo entre aquí en un edit", linea_accion.programa_sectoriales)
                    // linea_accion.programa_sectoriales = [];
                }
            };
        }
    };

    linea_accion.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {

        var validatett = await BASEAPI.firstp("linea_accion", {
            where: [
                {
                    field: "edt",
                    operator: "=",
                    value: data.inserting.edt
                },
                {
                    open: "(",
                    field: "end",
                    operator: "=",
                    value: end.id ? end.id : "$null",
                    connector: "OR"
                },
                {
                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: `end${end.form.options.linea_accion.tempId}`
                },
                {
                    field: "objetivo_especifico",
                    value: linea_accion.objetivo_especifico
                }
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para este objetivo especifico existe una linea de acción con el No. secuencia: " + data.inserting.edt
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    linea_accion.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (linea_accion.edt)
            data.updating.edt = linea_accion.edt;
        var validatett = await BASEAPI.firstp("linea_accion", {
            where: [
                {
                    field: "edt",
                    operator: "=",
                    value: data.updating.edt
                },
                {
                    open: "(",
                    field: "end",
                    operator: "=",
                    value: end.id ? end.id : "$null",
                    connector: "OR"
                },
                {
                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: `end${end.form.options.linea_accion.tempId}`
                },
                {
                    field: "objetivo_especifico",
                    value: linea_accion.objetivo_especifico
                },
                {
                    field: "id",
                    operator: "!=",
                    value: linea_accion.id
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para este objetivo especifico existe una linea de acción con el No. secuencia: " + data.updating.edt
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
});
