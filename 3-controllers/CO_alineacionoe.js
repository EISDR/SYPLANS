app.controller("alineacionoe", function ($scope, $http, $compile) {
    alineacionoe = this;
    alineacionoe.nom = '';
    alineacionoe.desc = '';
    alineacionoe.singular = "Alineación OE-END";
    alineacionoe.plural = "Alineaciones OE-END";
    alineacionoe.fixFilters = [{
        field: "pei",
        value: new SESSION().current().pei_id
    }];
    RUNCONTROLLER("alineacionoe", alineacionoe, $scope, $http, $compile);
    alineacionoe.formulary = function (data, mode, defaultData) {
        if (alineacionoe !== undefined) {
            RUN_B("alineacionoe", alineacionoe, $scope, $http, $compile);
            alineacionoe.form.titles = {
                new: "Nueva - Alineación OE-END" ,
                edit: "Editar -"+` Alineación OE-END`,
                view: "Ver ALL - "+`Alineación OE-END`
            };
            alineacionoe.form.readonly = {};
            alineacionoe.createForm(data, mode, defaultData);

            // alineacionoe.form.schemas.insert['nombre'] = FORM.schemasType.calculated;
            alineacionoe.valid = false;

            alineacionoe.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
                var validatett = await BASEAPI.firstp("objetivo", {
                    where: [
                        {
                            field: "edt",
                            operator: "=",
                            value: data.inserting.edt
                        },
                        {
                            field: "end",
                            operator: "=",
                            value: alineacionoe.end
                        },
                    ]
                });
                if (validatett) {
                    SWEETALERT.show({
                        type: "error",
                        title: "",
                        message: "Para esta Estrategia de Desarrollo Nacional existe un objetivo general con el No. Secuencia: " + data.inserting.edt
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for(var item of buttons){
                        item.disabled = false;
                    }
                    resolve(false);
                }
                resolve(true);
            });
            alineacionoe.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
                var validatett = await BASEAPI.firstp("objetivo", {
                    where: [
                        {
                            field: "edt",
                            operator: "=",
                            value: data.updating.edt
                        },
                        {
                            field: "end",
                            operator: "=",
                            value: alineacionoe.end
                        },
                        {
                            field: "id",
                            operator: "!=",
                            value: alineacionoe.id
                        },
                    ]
                });
                if (validatett) {
                    SWEETALERT.show({
                        type: "error",
                        title: "",
                        message: "Para esta Estrategia de Desarrollo Nacional existe un objetivo general con el No. Secuencia: " + data.updating.edt
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for(var item of buttons){
                        item.disabled = false;
                    }
                    resolve(false);
                }
                resolve(true);
            });
            alineacionoe.triggers.table.after.insert = function (data) {
                if (typeof objetivo_estrategico != "undefined") {
                    if (objetivo_estrategico) {
                        if (typeof objetivo_estrategico !== 'not defined') {
                            objetivo_estrategico.selectQueries["alineacionoe"] = [
                                {
                                    field: "end",
                                    value: objetivo_estrategico.lista_end
                                }
                            ];
                            objetivo_estrategico.form.loadDropDown('alineacionoe');
                        }
                    }
                }
                VALIDATION.validate(objetivo_estrategico, "alineacionoe", [{
                    valid: (!DSON.oseaX0(objetivo_estrategico.alineacionoe) && objetivo_estrategico.alineacionoe !== "[NULL]"),
                    message: MESSAGE.i('validations.Fieldisrequired'),
                    type: VALIDATION.types.error,
                    visible: false
                }]);
                return true;
            };
            alineacionoe.triggers.table.after.update = function (data) {
                if (typeof objetivo_estrategico != "undefined") {
                    if (objetivo_estrategico) {
                        if (typeof objetivo_estrategico !== 'not defined') {
                            objetivo_estrategico.selectQueries["alineacionoe"] = [
                                {
                                    field: "end",
                                    value: objetivo_estrategico.lista_end
                                }
                            ];
                            objetivo_estrategico.form.loadDropDown('alineacionoe');
                        }
                    }
                }
                VALIDATION.validate(objetivo_estrategico, "alineacionoe", [{
                    valid: (!DSON.oseaX0(objetivo_estrategico.alineacionoe) && objetivo_estrategico.alineacionoe !== "[NULL]"),
                    message: MESSAGE.i('validations.Fieldisrequired'),
                    type: VALIDATION.types.error,
                    visible: false
                }]);
                return true;
            };
            alineacionoe.$scope.$watch('alineacionoe.end', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(alineacionoe, "end", rules);
            });
            alineacionoe.$scope.$watch('alineacionoe.edt', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(alineacionoe, "edt", rules);
            });
            alineacionoe.$scope.$watch('alineacionoe.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(alineacionoe, "nombre", rules);
            });
        }
    };
    alineacionoe.triggers.table.after.open = function (data) {
        if (typeof objetivo_estrategico != "undefined") {
            if (objetivo_estrategico) {
                if (typeof objetivo_estrategico !== 'not defined') {
                    if (objetivo_estrategico.lista_end.length > 0){
                        alineacionoe.selectQueries["end"] = [
                            {
                                field: "id",
                                value: objetivo_estrategico.lista_end
                            }
                        ];
                    }else{
                        alineacionoe.selectQueries["end"] = [
                            {
                                field: "id",
                                value: -1
                            }
                        ];
                    }
                    alineacionoe.form.loadDropDown('end');
                }
            }
        }
        //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    };
    alineacionoe.insertOE_END = function(){
        // drp_objetivo_estrategico.eje_estrategico_object.aliniacion_end

        if(typeof objetivo_estrategico !== 'undefined' && objetivo_estrategico !== null && objetivo_estrategico.eje_estrategico_object !== null){
            if (objetivo_estrategico){
                alineacionoe.id_end = objetivo_estrategico.eje_estrategico_object.aliniacion_end;
                console.log("por fin a",alineacionoe.id_end,alineacionoe.nombre,alineacionoe.descripcion);
            }

        }

        if(typeof drp_objetivo_estrategico !== 'undefined' && drp_objetivo_estrategico !== null && drp_objetivo_estrategico.eje_estrategico_object !== null ){
            if(drp_objetivo_estrategico){
                alineacionoe.id_end = drp_objetivo_estrategico.eje_estrategico_object.aliniacion_end;
                console.log("por fin b",alineacionoe.id_end,alineacionoe.nombre,alineacionoe.descripcion);
            }

        }

        if(alineacionoe.id_end ){
            if( alineacionoe.nombre){
                console.log("por fin c",alineacionoe.id_end);
                BASEAPI.insert('objetivo',{
                    "edt": alineacionoe.edt,
                    "nombre": alineacionoe.nombre,
                    "descripcion": alineacionoe.descripcion ? alineacionoe.descripcion: '',
                    "end": alineacionoe.end,
                },function(result){
                    console.log(result);
                    alineacionoe.form.mode = FORM.modes.edit;
                    alineacionoe.pages.form.close();
                    SWEETALERT.stop();
                });
            } else {
                SWEETALERT.show({message: "Nombre esta en blanco"});
            }
        } else {
            SWEETALERT.show({message: "Debe seleccionar un Eje Estratégico"});
        }
    };

});