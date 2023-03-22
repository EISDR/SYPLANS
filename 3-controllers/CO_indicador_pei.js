app.controller("indicador_pei", function ($scope, $http, $compile) {
    indicador_pei = this;
    var user = new SESSION().current();
    indicador_pei.colspan = ((user.periodo_hasta - user.periodo_desde) + 1) * 3;
    indicador_pei.anolist = [];
    indicador_pei.session = user;
    for (var a = user.periodo_desde; a <= user.periodo_hasta; a++) {
        indicador_pei.anolist.push({ano: a});
    }
    indicador_pei.colpad = [];
    var rs_pad = indicador_pei.colspan, count_pda = 0,
        arr_pad = ['P', 'A', 'D'];
    for (var i = 0; i < rs_pad; i++) {
        indicador_pei.colpad.push(arr_pad[count_pda]);
        count_pda += 1;
        if (count_pda > 2) {
            count_pda = 0;
        }
    }
    indicador_pei.set_border = function (column) {
        if (column == 'P') {
            return {'border-left': "1px solid"};
        } else if (column == 'D') {
            return {'border-right': "1px solid"};
        }
    };
    indicador_pei.set_title = function (column) {
        switch (column) {
            case "P":
                return "Proyectado";
                break;
            case "A":
                return "Alcanzado";
                break;
            case "D":
                return "Diferencia";
                break;
        }
    };

    indicador_pei.conditionPei = {pei: user.pei_id, estatus: user.estatus};
    indicador_pei.delete_relation = (id) => new Promise((resolve, reject) => {
        BASEAPI.list('indicador_pei_ano', {
            "where": [
                {
                    "field": "indicador_pei",
                    "value": id,
                }
            ]
        }, function (response) {

            indicador_pei.eliminar = false;
            indicador_pei.rs = response.data;

            for (var i = 0; i < indicador_pei.rs.length; i++) {
                if (indicador_pei.rs[i].valor_alcanzado && indicador_pei.rs[i].valor_alcanzado != "0.00") {
                    indicador_pei.eliminar = true;
                    break;
                }
            }

            if (indicador_pei.eliminar == false) {
                SERVICE.planificacion_transfer.deleteindicadorpei({indicador_pei_id: id}, function (result) {
                    if (result.data.error == false) {
                        resolve(1);
                    } else
                        resolve(0);
                });
            } else {
                resolve(0);
            }

        });
    });

    RUNCONTROLLER("indicador_pei", indicador_pei, $scope, $http, $compile);
    indicador_pei.plural = "Indicador PEI";
    indicador_pei.singular = "Indicador PEI";
    indicador_pei.setPermission("export", false);
    getPEIstatus(indicador_pei, user.pei_id);

    indicador_pei.list_indicador_pei_anos = [];
    indicador_pei.metas = [];
    indicador_pei.list_ano = [];

    title_header_table_pei(indicador_pei, MESSAGE.i('planificacion.titleindicadores_pei'));
    indicador_pei.triggers.table.after.load = async function (records) {
        if (user.presupuesto_id === null)
            $('.icon-plus-circle2 ').parent().hide();
        indicador_pei.runMagicColum('tipo_meta', 'tipoMeta', "id", "nombre");
        indicador_pei.runMagicColum('direccion_meta', 'direccionMeta', "id", "nombre");
        indicador_pei.runMagicManyToMany('caracteristica', "caracteristica_indicador", "indicador_pei", "id", 'nombre', "caracteristica_indicador_pei", "caracteristica", "id");
        if (indicador_pei.estatus_pei && indicador_pei.condicion_pei == ENUM_2.pei_estatus.Inactivo) {
            indicador_pei.setPermission("add", false);
        }
        check_PEI("indicador_pei", user.pei_id);
        indicador_pei.columns().metas = {label: "metas", shorttext: 370, sorted: false, order: "asc", sortable: false};
        $('.has-colspan').attr('rowspan', 3);
        $('.has-colspan').css('vertical-align', 'middle');
        BASEAPI.listp('vw_indicador_pei_ano', {
            limit: 0,
            where: [{
                field: "pei",
                value: user.pei_id
            }]
        }).then(function (rs) {
            if (rs.data) {
                indicador_pei.pei_periodo = rs.data;
                for (var c = user.periodo_desde; c <= user.periodo_hasta; c++) {
                    for (var l = 0; l < indicador_pei.records.data.length; l++) {
                        selected = indicador_pei.pei_periodo.filter(information => {
                            if (information.indicador_pei == indicador_pei.records.data[l].id && information.ano == c) {
                                return true;
                            }
                        });
                        eval(`
							if( typeof indicador_pei.records.data[${l}].ano == 'undefined'){
								indicador_pei.records.data[${l}].ano = [];
							}
                    	`);
                        if (selected.length > 0) {
                            eval(`indicador_pei.records.data[${l}].ano.push("${selected[0].valor}")`);
                            eval(`indicador_pei.records.data[${l}].ano.push("${selected[0].valor_alcanzado}")`);
                            eval(`indicador_pei.records.data[${l}].ano.push("${selected[0].varianzas}")`);
                        } else {
                            eval(`indicador_pei.records.data[${l}].ano.push("")`);
                            eval(`indicador_pei.records.data[${l}].ano.push("")`);
                            eval(`indicador_pei.records.data[${l}].ano.push("")`);
                        }

                    }
                }
                indicador_pei.refreshAngular();
            }
        });

    };
    if (!new SESSION().current().intersectorial) {
        indicador_pei.fixFilters = [
            {
                "field": "pei",
                "value": user.estatus ? user.pei_id : 0
            }
        ];
    }

    indicador_pei.getIAnoNew = function () {
        if (indicador_pei.form.mode === FORM.modes.new) {
            indicador_pei.list_ano = [];
            indicador_pei.metas = [];
            indicador_pei.limpiar = false;
            for (var i = user.periodo_desde; i <= user.periodo_hasta; i++) {
                indicador_pei.list_ano.push(i);
                eval(`indicador_pei.form.schemas.insert.metas${i} = FORM.schemasType.calculated`);
            }
            indicador_pei.control.input("#subcontainerLineaBase", "linea_base", {
                maxlength: 11, popover: {
                    title: "Línea Base",
                    content: "Captura la  Línea Base"
                }
            }, false, '', "Línea Base", false);
        }
    };
    indicador_pei.getIDedit = function () {
        if (indicador_pei.form.mode === FORM.modes.edit) {
            indicador_pei.list_indicador_pei_anos = [];
            indicador_pei.metas = [];
            indicador_pei.limpiar = false;
            BASEAPI.listp('indicador_pei_ano', {
                limit: 0,
                page: 1,
                orderby: "ano",
                order: "asc",
                where: [{
                    field: "indicador_pei",
                    value: indicador_pei.id
                }]
            }).then(function (result) {
                indicador_pei.list_indicador_pei_anos = result.data;
                for (var key in indicador_pei.list_indicador_pei_anos) {
                    indicador_pei.metas[indicador_pei.list_indicador_pei_anos[key].id] = indicador_pei.list_indicador_pei_anos[key].valor;
                    eval(`indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id} = indicador_pei.list_indicador_pei_anos[key].valor`);
                    eval(`indicador_pei.form.schemas.insert.metas${indicador_pei.list_indicador_pei_anos[key].id} = FORM.schemasType.calculated`);
                }
                indicador_pei.applyMasks();
                indicador_pei.refreshAngular();
            });
        }
    };
    indicador_pei.formulary = function (data, mode, defaultData) {
        if (indicador_pei !== undefined) {
            RUN_B("indicador_pei", indicador_pei, $scope, $http, $compile);

            indicador_pei.initiation = true;
            indicador_pei.triggers.table.after.control = function (data) {
                if (data == "tipo_meta" && mode != "new" && indicador_pei.initiation) {
                    $(".subcontainer2").html('');
                    indicador_pei.getIDedit();
                    indicador_pei.initiation = false;
                }
                if (data == "tipo_meta" && mode == "new" && indicador_pei.initiation) {
                    $(".subcontainer1").html('');
                    indicador_pei.getIAnoNew();
                    indicador_pei.initiation = false;
                }
            };

            indicador_pei.form.titles = {
                new: "Nuevo - " + MESSAGE.i('planificacion.titleindicador_pei'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titleindicador_pei')}`,
                view: "Ver ALL - " + `{MESSAGE.i('planificacion.titleindicador_pei')}`
            };

            indicador_pei.applyMasks = async function () {
                indicador_pei.applyMasksfalse = true;
                switch (indicador_pei.tipo_meta) {
                    case "2": {
                        //Indice
                        await indicador_pei.control.indice("#subcontainerLineaBase", "linea_base", {
                            maxlength: 1, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_pei.form.mode !== FORM.modes.edit) {
                            for (var key in indicador_pei.list_ano) {
                                await indicador_pei.control.indice(".subcontainer1", "metas" + indicador_pei.list_ano[key], {
                                    maxlength: 1, popover: {
                                        title: "Meta Año " + indicador_pei.list_ano[key],
                                        content: "Captura la  Meta Año " + indicador_pei.list_ano[key]
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_ano[key], false);
                                watchIndicadores(indicador_pei, `indicador_pei.metas${indicador_pei.list_ano[key]}`, `metas${indicador_pei.list_ano[key]}`);
                            }
                        } else {
                            for (var key in indicador_pei.list_indicador_pei_anos) {
                                await indicador_pei.control.indice(".subcontainer2", "metas" + indicador_pei.list_indicador_pei_anos[key].id, {
                                    maxlength: 1, popover: {
                                        title: "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano,
                                        content: "Captura la Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano, false);
                                watchIndicadores(indicador_pei, `indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id}`, `metas${indicador_pei.list_indicador_pei_anos[key].id}`);
                                eval(`	
									if(indicador_pei.limpiar){
										indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id} = "";		
										indicador_pei.linea_base = "";					
									}
								`);
                            }
                        }
                        indicador_pei.limpiar = true;
                        break;
                    }
                    case "5": {
                        //Dinero
                        await indicador_pei.control.money("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_pei.form.mode !== FORM.modes.edit) {
                            for (var key in indicador_pei.list_ano) {
                                await indicador_pei.control.money(".subcontainer1", "metas" + indicador_pei.list_ano[key], {
                                    maxlength: 22, popover: {
                                        title: "Meta Año " + indicador_pei.list_ano[key],
                                        content: "Captura la  Meta Año " + indicador_pei.list_ano[key]
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_ano[key], false);
                                watchIndicadores(indicador_pei, `indicador_pei.metas${indicador_pei.list_ano[key]}`, `metas${indicador_pei.list_ano[key]}`);
                            }
                        } else {
                            for (var key in indicador_pei.list_indicador_pei_anos) {
                                await indicador_pei.control.money(".subcontainer2", "metas" + indicador_pei.list_indicador_pei_anos[key].id, {
                                    maxlength: 22, popover: {
                                        title: "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano,
                                        content: "Captura la Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano, false);
                                watchIndicadores(indicador_pei, `indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id}`, `metas${indicador_pei.list_indicador_pei_anos[key].id}`);
                                eval(`
									if(indicador_pei.limpiar){
										indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id} = "";	
										indicador_pei.linea_base = "";				
									}
								`);
                            }
                        }
                        indicador_pei.limpiar = true;
                        break;
                    }
                    case "4": {
                        //decimal
                        await indicador_pei.control.decimal("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_pei.form.mode !== FORM.modes.edit) {
                            for (var key in indicador_pei.list_ano) {
                                await indicador_pei.control.decimal(".subcontainer1", "metas" + indicador_pei.list_ano[key], {
                                    maxlength: 22, popover: {
                                        title: "Meta Año " + indicador_pei.list_ano[key],
                                        content: "Captura la  Meta Año " + indicador_pei.list_ano[key]
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_ano[key], false);
                                watchIndicadores(indicador_pei, `indicador_pei.metas${indicador_pei.list_ano[key]}`, `metas${indicador_pei.list_ano[key]}`);
                            }
                        } else {
                            for (var key in indicador_pei.list_indicador_pei_anos) {
                                await indicador_pei.control.decimal(".subcontainer2", "metas" + indicador_pei.list_indicador_pei_anos[key].id, {
                                    maxlength: 22, popover: {
                                        title: "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano,
                                        content: "Captura la Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano, false);
                                watchIndicadores(indicador_pei, `indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id}`, `metas${indicador_pei.list_indicador_pei_anos[key].id}`);
                                eval(`
									if(indicador_pei.limpiar){
										indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id} = "";	
										indicador_pei.linea_base = "";				
									}
								`);
                            }
                        }
                        indicador_pei.limpiar = true;
                        break;
                    }
                    case "1": {
                        //porcent
                        await indicador_pei.control.percentage("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_pei.form.mode !== FORM.modes.edit) {
                            for (var key in indicador_pei.list_ano) {
                                await indicador_pei.control.percentage(".subcontainer1", "metas" + indicador_pei.list_ano[key], {
                                    popover: {
                                        title: "Meta Año " + indicador_pei.list_ano[key],
                                        content: "Captura la  Meta Año " + indicador_pei.list_ano[key]
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_ano[key], false);
                                watchIndicadores(indicador_pei, `indicador_pei.metas${indicador_pei.list_ano[key]}`, `metas${indicador_pei.list_ano[key]}`);
                            }
                        } else {
                            for (var key in indicador_pei.list_indicador_pei_anos) {
                                await indicador_pei.control.percentage(".subcontainer2", "metas" + indicador_pei.list_indicador_pei_anos[key].id, {
                                    popover: {
                                        title: "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano,
                                        content: "Captura la Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano, false);
                                watchIndicadores(indicador_pei, `indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id}`, `metas${indicador_pei.list_indicador_pei_anos[key].id}`);
                                eval(`
									if(indicador_pei.limpiar){
										indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id} = "";		
										indicador_pei.linea_base = "";			
									}
								`);
                            }
                        }
                        indicador_pei.limpiar = true;
                        break;
                    }
                    case "6": {
                        //Entero

                        await indicador_pei.control.integer("#subcontainerLineaBase", "linea_base", {
                            maxlength: 11, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_pei.form.mode !== FORM.modes.edit) {
                            for (var key in indicador_pei.list_ano) {
                                await indicador_pei.control.integer(".subcontainer1", "metas" + indicador_pei.list_ano[key], {
                                    maxlength: 11, popover: {
                                        title: "Meta Año " + indicador_pei.list_ano[key],
                                        content: "Captura la  Meta Año " + indicador_pei.list_ano[key]
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_ano[key], false);
                                watchIndicadores(indicador_pei, `indicador_pei.metas${indicador_pei.list_ano[key]}`, `metas${indicador_pei.list_ano[key]}`);
                            }
                        } else {
                            for (var key in indicador_pei.list_indicador_pei_anos) {
                                await indicador_pei.control.integer(".subcontainer2", "metas" + indicador_pei.list_indicador_pei_anos[key].id, {
                                    maxlength: 11, popover: {
                                        title: "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano,
                                        content: "Captura la Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano, false);
                                watchIndicadores(indicador_pei, `indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id}`, `metas${indicador_pei.list_indicador_pei_anos[key].id}`);
                                eval(`
									if(indicador_pei.limpiar){
										indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id} = "";		
										indicador_pei.linea_base = "";						
									}
								`);
                            }
                        }
                        indicador_pei.limpiar = true;
                        break;
                    }
                    case "3": {
                        //absoluto
                        await indicador_pei.control.valor_absoluto("#subcontainerLineaBase", "linea_base", {
                            maxlength: 11, popover: {
                                title: "Línea Base",
                                content: "Captura la Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_pei.form.mode !== FORM.modes.edit) {
                            for (var key in indicador_pei.list_ano) {
                                await indicador_pei.control.valor_absoluto(".subcontainer1", "metas" + indicador_pei.list_ano[key], {
                                    maxlength: 11, popover: {
                                        title: "Meta Año " + indicador_pei.list_ano[key],
                                        content: "Captura la  Meta Año " + indicador_pei.list_ano[key]
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_ano[key], false);
                                watchIndicadoresValorAbsoluto(indicador_pei, `indicador_pei.metas${indicador_pei.list_ano[key]}`, `metas${indicador_pei.list_ano[key]}`);
                            }
                        } else {
                            for (var key in indicador_pei.list_indicador_pei_anos) {
                                await indicador_pei.control.valor_absoluto(".subcontainer2", "metas" + indicador_pei.list_indicador_pei_anos[key].id, {
                                    maxlength: 11, popover: {
                                        title: "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano,
                                        content: "Captura la Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano
                                    }
                                }, true, 3, "Meta Año " + indicador_pei.list_indicador_pei_anos[key].ano, false);
                                watchIndicadoresValorAbsoluto(indicador_pei, `indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id}`, `metas${indicador_pei.list_indicador_pei_anos[key].id}`);
                                eval(`
									if(indicador_pei.limpiar){
										indicador_pei.metas${indicador_pei.list_indicador_pei_anos[key].id} = "";
										indicador_pei.linea_base = "";
									}
								`);
                            }
                        }
                        indicador_pei.limpiar = true;
                        break;
                    }
                    default: {
                    }
                }
                indicador_pei.applyMasksfalse = false;
                indicador_pei.refreshAngular();
                delete indicador_pei.yadata;
                indicador_pei.currentModel.clicaalgo();
            };

            indicador_pei.form.readonly = {};
            indicador_pei.createForm(data, mode, defaultData, undefined, function(){
                indicador_pei.tipo_meta_old = indicador_pei.tipo_meta;
                indicador_pei.direccion_meta_old = indicador_pei.direccion_meta;
            });

            indicador_pei.$scope.$watch('indicador_pei.ws_connection_field', async function (value) {
                await indicador_pei.runws(value, "resultExterno");
                indicador_pei.refreshAngular();
            });

            indicador_pei.$scope.$watch('indicador_pei.nombre', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_pei, "nombre", rules)

            });

            indicador_pei.$scope.$watch('indicador_pei.eje_estrategico', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_pei, "eje_estrategico", rules)
            });

            indicador_pei.$scope.$watch('indicador_pei.objetivo_estrategico', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_pei, "objetivo_estrategico", rules)
            });

            indicador_pei.$scope.$watch('indicador_pei.estrategia', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_pei, "estrategia", rules)
            });

            indicador_pei.$scope.$watch('indicador_pei.resultado', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_pei, "resultado", rules)
            });

            indicador_pei.$scope.$watch('indicador_pei.fuente', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_pei, "fuente", rules)
            });

            indicador_pei.$scope.$watch('indicador_pei.medio_verificacion', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_pei, "medio_verificacion", rules)
            });

            indicador_pei.$scope.$watch('indicador_pei.tipo_meta', function (value) {
                var rules = [];
                if (indicador_pei.list_indicador_pei_anos.length > 0 && indicador_pei.form.mode == "edit"){
                    rules.push(VALIDATION.yariel.meta_alcanzada_indicador(indicador_pei.list_indicador_pei_anos, "Tipo de dato de la meta",indicador_pei.tipo_meta_old,indicador_pei.tipo_meta));
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_pei, "tipo_meta", rules)
                if (value && (!indicador_pei.initiation)) {
                    $(".clearHtml").html('');
                    indicador_pei.applyMasks();
                }

            });
            indicador_pei.$scope.$watch('indicador_pei.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_pei, "descripcion", rules)
            });
            indicador_pei.$scope.$watch('indicador_pei.direccion_meta', function (value) {
                var rules = [];
                if (indicador_pei.list_indicador_pei_anos.length > 0 && indicador_pei.form.mode == "edit"){
                    rules.push(VALIDATION.yariel.meta_alcanzada_indicador(indicador_pei.list_indicador_pei_anos, "Dirección de la meta", indicador_pei.direccion_meta_old, indicador_pei.direccion_meta));
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_pei, "direccion_meta", rules)
            });
            indicador_pei.$scope.$watch('indicador_pei.ano_linea_base', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_pei, "ano_linea_base", rules)
            });
            indicador_pei.$scope.$watch('indicador_pei.linea_base', function (value) {
                indicador_pei.linea_base = value ? value.replace("$", "") : value;
                var rules = [];
                if (value == "" || value == null)
                    rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_pei, "linea_base", rules)
            });

            indicador_pei.$scope.$watch('indicador_pei.medio_verificacion', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_pei, "medio_verificacion", rules)
            });

            indicador_pei.$scope.$watch('indicador_pei.metodo_calculo', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_pei, "metodo_calculo", rules)
            });

            var f = new Date();
            var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
            indicador_pei.form.after.insert = function (data) {
                var groupInsert = [];
                for (let i = 0; i < indicador_pei.list_ano.length; i++) {
                    groupInsert.push({
                        "ano": indicador_pei.list_ano[i],
                        "indicador_pei": data.inserted.id,
                        "created_at": fecha,
                        "created_by": user.usuario_id,
                        "valor": indicador_pei.tipo_meta == "5" && eval(`indicador_pei.metas${indicador_pei.list_ano[i]}`) ? eval(`indicador_pei.metas${indicador_pei.list_ano[i]}`).replace("$", "") : eval(`indicador_pei.metas${indicador_pei.list_ano[i]}`)

                    });
                }

                BASEAPI.insert('indicador_pei_ano', groupInsert, function (result) {

                });

                indicador_pei.list_ano = [];
                return false;
            };

            indicador_pei.form.after.update = function (data) {

                indicador_pei.list_indicador_pei_anos = [];
                return false;
            };
            indicador_pei.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
                if (LAN.money(indicador_pei.ano_linea_base).value > LAN.money(indicador_pei.session.periodo_poa).value) {
                    SWEETALERT.show({
                        type: "error",
                        message: "El Año Línea Base no puede ser mayor al año del POA que se está trabajando"
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for(var item of buttons){
                        item.disabled = false;
                    }
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
            indicador_pei.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
                //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
                if (LAN.money(indicador_pei.ano_linea_base).value > LAN.money(indicador_pei.session.periodo_poa).value) {
                    SWEETALERT.show({
                        type: "error",
                        message: "El Año Línea Base no puede ser mayor al año del POA que se está trabajando"
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for(var item of buttons){
                        item.disabled = false;
                    }
                    resolve(false);
                } else {
                    if (indicador_pei.ano_linea_base)
                        data.updating.ano_linea_base = indicador_pei.ano_linea_base;
                    if (indicador_pei.linea_base)
                        data.updating.linea_base = indicador_pei.linea_base;

                    for (var key in indicador_pei.metas) {
                        await BASEAPI.updateallp('indicador_pei_ano', {
                            "valor": indicador_pei.tipo_meta == "5" && eval(`indicador_pei.metas${key}`) ? eval(`indicador_pei.metas${key}`).replace("$", "") : eval(`indicador_pei.metas${key}`),
                            "updated_at": fecha,
                            "created_by": user.usuario_id,
                            where: [{
                                "field": "id",
                                "value": key
                            }]
                        });
                    }
                    resolve(true);
                }
            });
        }
    };

});
