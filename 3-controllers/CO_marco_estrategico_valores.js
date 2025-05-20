app.controller("marco_estrategico_valores", function ($scope, $http, $compile) {
    marco_estrategico_valores = this;
    var user = new SESSION().current();
    marco_estrategico_valores.pei = user.pei_id === null ? 0: user.pei_id;
    marco_estrategico_valores.session = user;
    marco_estrategico_valores.not_exists_pie = 0;
    marco_estrategico_valores.modo_view = false; // para cuando se haga el dropdown general
    marco_estrategico_valores.pulica = true;
    marco_estrategico_valores.destroyForm = false;
    if (user.tipo_institucion == ENUM_2.COMPANY_TYPE.privada){
        marco_estrategico_valores.pulica = false;
    }
    TRIGGER.run(marco_estrategico_valores);
    marco_estrategico_valores.triggers.table.before.load = () => new Promise((resolve, reject) => {
        BASEAPI.first('marco_estrategico', {
            where: [{
                field: "pei",
                value: marco_estrategico_valores.pei
            }]
        },function (result) {
            // este if es para confirmar si hay registro correspondiente al pei y de ser asi llenas las variables correspondiente
            if (result) {
                marco_estrategico_valores.id_marco = result.id;
                marco_estrategico_valores.mision = result.mision;
                marco_estrategico_valores.vision = result.vision;
                marco_estrategico_valores.historia = result.historia;
                marco_estrategico_valores.misionDisabled = result.mision;
                marco_estrategico_valores.visionDisabled = result.vision;
                marco_estrategico_valores.historiaDisabled = result.historia;
            } else {
                // id_marco lo utilizo mas adelante para validar si existe un registro relacionado con el pei
                BASEAPI.insertID('marco_estrategico',[{
                    "pei": marco_estrategico_valores.pei,
                    "created_at": new date().now(),
                    "created_by": user.usuario_id
                }],'','',function (result) {
                    marco_estrategico_valores.id_marco = result.data.data[0].id;
                    marco_estrategico_valores.refresh();
                    console.log(result);
                });
            }
            // filtro de la tabla de valores
            marco_estrategico_valores.fixFilters = [
                {
                    "field": "marco_estrategico",
                    "value": marco_estrategico_valores.id_marco
                }
            ];
            // begin tabla custom para ver valores - conductas
            BASEAPI.list('marco_estrategico_valores',{
                join: [
                    {
                        "table": "marco_estrategicos_virtudes",
                        "base": "id",
                        "field": "marco_estrategico_valor",
                        "columns": ["id", "nombre"]
                    },
                ],
                where:[{
                    field: "marco_estrategico",
                    value: marco_estrategico_valores.id_marco
                }]
            },function (resultado) {
                marco_estrategico_valores.data = {};
                var data = {};
                if(resultado.data.length > 0){
                    for (item in resultado.data){
                        if (!data[resultado.data[item].id])
                            data[resultado.data[item].id] = {};
                        data[resultado.data[item].id]['nombre'] = {};
                        data[resultado.data[item].id]['nombre']['valor'] = resultado.data[item].nombre;
                        if (!data[resultado.data[item].id]["data"])
                            data[resultado.data[item].id]["data"] = {};
                        if(!data[resultado.data[item].id]["data"][item])
                            data[resultado.data[item].id]["data"][item] ={};
                        data[resultado.data[item].id]["data"][item]['conducta'] = resultado.data[item].marco_estrategicos_virtudes_nombre;

                    }
                    marco_estrategico_valores.data = data;
                }

                resolve(true);
            });
            // end tabla custom para ver valores - conductas
        });

    });
    marco_estrategico_valores.triggers.table.after.audit = () => new Promise(async (resolve, reject) => {
        if (dragon_audit.storageModel == "vw_marco_estrategico_valores") {
            if (dragon_audit.dataForView.action == "insert") {
                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "nombre","descripcion"]);
            }

            if (dragon_audit.dataForView.action == "update") {

                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "type","descripcion"]);

                dragon_audit.dataForView.updatedJson = DSON.removeOther(dragon_audit.dataForView.updatedJson,
                    ["id", "type","descripcion"]);
            }

            if (dragon_audit.dataForView.action == "delete") {

                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "type","descripcion"]);
            }
        }
        resolve(true);
    });
    // despues de que la tabla carga yo le asigno el atou-size de los textarea
    marco_estrategico_valores.triggers.table.after.load = function (record) {
        marco_estrategico_valores.runMagicOneToMany('me_virtudes', 'marco_estrategicos_virtudes', 'marco_estrategico_valor', 'nombre', 'id');
        marco_estrategico_valores.refreshAngular();
        marco_estrategico_valores.actualizar_autosize_textarea();
        check_active_PEI(user.pei_id, marco_estrategico_valores);
    };

    RUNCONTROLLER("marco_estrategico_valores", marco_estrategico_valores, $scope, $http, $compile);
    marco_estrategico_valores.destroyForm = false;
    // marco_estrategico_valores.plural = MESSAGE.i('planificacion.titleMarcoEstrategicoValores');

    title_header_table_pei(marco_estrategico_valores,MESSAGE.i('planificacion.titleMarcoEstrategico'));
    marco_estrategico_valores.triggers.table.after.control = function (data) {
        if (data === "mision") {
            console.log(data);
        };
        //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        // };
    }

    marco_estrategico_valores.singular = "Valores";
    // este es una variables para guardar los objectos de los input porque al abrir un modal los demas pierden su funcionalidad
    marco_estrategico_valores.objecto = {};

    if (user.estatus){
        marco_estrategico_valores.not_exists_pie = 1;
    } else {
        marco_estrategico_valores.not_exists_pie = 0;
    }


    marco_estrategico_valores.plural = " "+MESSAGE.i('planificacion.titleMarcoEstrategicoValores');

    RUN_B("marco_estrategico_valores", marco_estrategico_valores, $scope, $http, $compile);
    marco_estrategico_valores.objecto = marco_estrategico_valores.form.options;
    marco_estrategico_valores.formulary = function (data, mode, defaultData) {
        if (marco_estrategico_valores !== undefined) {
            RUN_B("marco_estrategico_valores", marco_estrategico_valores, $scope, $http, $compile);
            marco_estrategico_valores.form.titles = {
                new: " "+marco_estrategico_valores.singular,
                edit: "Editar - "+marco_estrategico_valores.singular,
                view: "Ver ALL - "+marco_estrategico_valores.singular
            };
            // para poder funcional los relation
            if (RELATIONS.anonymous[$scope.modelName] !== undefined) {
                marco_estrategico_valores.form.getfilter = {
                    field: RELATIONS.anonymous[$scope.modelName].fieldKey
                };
            }

            marco_estrategico_valores.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                if (marco_estrategico_valores.not_exists_pie === 0) {
                    SWEETALERT.show({message: "No existe un PEI activo"});
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for(var item of buttons){
                        item.disabled = false;
                    }
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for(var item of buttons){
                        item.disabled = false;
                    }
                    resolve(false);
                }else  {
                    resolve(true);
                }
            });
            // marco_estrategico_valores.form.before.insert = function(data){
            //     // en estos 2 if es que hago la comprobacion de las variables antes mencionadas que utilizo para validar, cree esta pequeña validacion por si primero se cread un valor antes de la vision o mision
            //     if (marco_estrategico_valores.not_exists_pie === 1){
            //         if (marco_estrategico_valores.id_marco === 0){
            //             BASEAPI.insertID('marco_estrategico',[{
            //                 "pei": marco_estrategico_valores.pei,
            //                 "created_at": new date().now(),
            //                 "created_by": user.usuario_id
            //             }],'','',function (result) {
            //                 marco_estrategico_valores.id_marco = result.data.data[0].id;
            //                 BASEAPI.insert('marco_estrategico_valores',[{
            //                     "nombre": data.inserting.nombre,
            //                     "descripcion": data.inserting.descripcion,
            //                     "marco_estrategico": result.data.data[0].id,
            //                     "created_at": new date().now(),
            //                     "created_by": user.usuario_id
            //                 }],function (result) {
            //                     marco_estrategico_valores.fixFilters = [
            //                         {
            //                             "field": "marco_estrategico",
            //                             "value": marco_estrategico_valores.id_marco
            //                         }
            //                     ];
            //                     //  forma para cerrar un modal manual
            //                     marco_estrategico_valores.refresh();
            //                     marco_estrategico_valores.form.mode = FORM.modes.edit;
            //                     marco_estrategico_valores.pages.form.close();
            //                     SWEETALERT.stop();
            //                 });
            //             });
            //             return true;
            //         }
            //     } else {
            //         SWEETALERT.show({message: "No existe un pei activo"});
            //         return true;
            //     }
            //
            //     return false;
            // };

            // metodos para devolverles las propiedades de los objetos
            marco_estrategico_valores.form.after.insert = function (data) {
                marco_estrategico_valores.actualizarInput();
                return false;
            };

            marco_estrategico_valores.form.after.update = function (data) {
                marco_estrategico_valores.actualizarInput();
                return false;
            };

            marco_estrategico_valores.afterDelete = function (data) {
                marco_estrategico_valores.actualizarInput();
                return false;
            };
            marco_estrategico_valores.form.readonly = {marco_estrategico: marco_estrategico_valores.id_marco};
            marco_estrategico_valores.createForm(data, mode, defaultData);
            marco_estrategico_valores.$scope.$watch('marco_estrategico_valores.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(marco_estrategico_valores, "nombre", rules)
            });
            marco_estrategico_valores.$scope.$watch('marco_estrategico_valores.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(marco_estrategico_valores, "descripcion", rules)
            });
        }
    };

    //marco estrategico para devolverles las propiedades de los objetos
    marco_estrategico_valores.triggers.table.before.close = function (data){
        marco_estrategico_valores.actualizarInput();
    };


    marco_estrategico_valores.actualizarInput = function(){
        marco_estrategico_valores.form.options.mision = marco_estrategico_valores.objecto.mision;
        marco_estrategico_valores.form.options.vision = marco_estrategico_valores.objecto.vision;
    };
    // Funcion para actualizar mision y vision
    marco_estrategico_valores.saveMision = function (value) {
        if (marco_estrategico_valores.not_exists_pie === 1){
            BASEAPI.first('marco_estrategico',{
                where:[{
                    field: "pei",
                    value: marco_estrategico_valores.pei
                }]
            },function (result) {
                if(result){
                    BASEAPI.updateall('marco_estrategico',{
                        "mision": marco_estrategico_valores.mision,
                        "pei": marco_estrategico_valores.pei,
                        where:[{
                            "field": "id",
                            "value": result.id
                        }]
                    },function(result){
                        marco_estrategico_valores.misionDisabled = marco_estrategico_valores.mision;
                        SWEETALERT.show({message: "Misión trabajada"});
                        marco_estrategico_valores.refresh();
                        marco_estrategico_valores.refreshAngular();
                    });
                } else {
                    BASEAPI.insert('marco_estrategico',{
                        "mision": marco_estrategico_valores.mision,
                        "pei": marco_estrategico_valores.pei
                    },function(result){
                        marco_estrategico_valores.misionDisabled = marco_estrategico_valores.mision;
                        SWEETALERT.show({message: "Misión trabajada"});
                        marco_estrategico_valores.refresh();
                        marco_estrategico_valores.refreshAngular();
                    });
                }
            });
        } else {
            SWEETALERT.show({message: "No existe un pei activo"});
        }
    };
    marco_estrategico_valores.saveHistoria = function (value) {
        if (marco_estrategico_valores.not_exists_pie === 1){
            BASEAPI.first('marco_estrategico',{
                where:[{
                    field: "pei",
                    value: marco_estrategico_valores.pei
                }]
            },function (result) {
                if(result){
                    BASEAPI.updateall('marco_estrategico',{
                        "historia": marco_estrategico_valores.historia,
                        "pei": marco_estrategico_valores.pei,
                        where:[{
                            "field": "id",
                            "value": result.id
                        }]
                    },function(result){
                        marco_estrategico_valores.historiaDisabled = marco_estrategico_valores.historia;
                        SWEETALERT.show({message: "Historia trabajada"});
                        marco_estrategico_valores.refresh();
                        marco_estrategico_valores.refreshAngular();
                    });
                } else {
                    BASEAPI.insert('marco_estrategico',{
                        "historia": marco_estrategico_valores.historia,
                        "pei": marco_estrategico_valores.pei
                    },function(result){
                        marco_estrategico_valores.historiaDisabled = marco_estrategico_valores.historia;
                        SWEETALERT.show({message: "Historia trabajada"});
                        marco_estrategico_valores.refresh();
                        marco_estrategico_valores.refreshAngular();
                    });
                }
            });
        } else {
            SWEETALERT.show({message: "No existe un pei activo"});
        }
    };
    marco_estrategico_valores.saveVision = function (value) {
        if (marco_estrategico_valores.not_exists_pie === 1){
            BASEAPI.first('marco_estrategico',{
                where:[{
                    field: "pei",
                    value: marco_estrategico_valores.pei
                }]
            },function (result) {
                if(result){
                    BASEAPI.updateall('marco_estrategico',{
                        "vision": marco_estrategico_valores.vision,
                        "pei": marco_estrategico_valores.pei,
                        where:[{
                            "field": "id",
                            "value": result.id
                        }]
                    },function(result){
                        marco_estrategico_valores.visionDisabled = marco_estrategico_valores.vision;
                        SWEETALERT.show({message: "Visión trabajada"});
                        marco_estrategico_valores.refresh();
                        marco_estrategico_valores.refreshAngular();
                    });
                } else {

                    BASEAPI.insert('marco_estrategico',{
                        "vision": marco_estrategico_valores.vision,
                        "pei": marco_estrategico_valores.pei
                    },function(result){
                        marco_estrategico_valores.visionDisabled = marco_estrategico_valores.vision;
                        SWEETALERT.show({message: "Visión trabajada"});
                        marco_estrategico_valores.refresh();
                        marco_estrategico_valores.refreshAngular();
                    });
                }
            });
        } else {
            SWEETALERT.show({message: "No existe un pei activo"});
        }

    };
    // end
    // Este metodo le añader el autosize a los textarea
    marco_estrategico_valores.actualizar_autosize_textarea = function (){
        setTimeout(function () {
            autosize($('#textareaMision'));
        },100);
    };
    marco_estrategico_valores.modo_view_fun = function (data) {
        if(!marco_estrategico_valores.allow([data]) || marco_estrategico_valores.session.groups[0].caracteristica == 'SL'){
            $('#textareaMision').prop("disabled", true);
            $('#textareaVision').prop("disabled", true);
            $('#textareaHistoria').prop("disabled", true);
            return false;
        } else {
            return true;
        }
    };

});