app.controller("indicador_proceso", function ($scope, $http, $compile) {
    indicador_proceso = this;
    var user = new SESSION().current();
    indicador_proceso.colspan = user.cantidad * 3;
    indicador_proceso.periodolist = [];
    indicador_proceso.headertitle = "Indicadores";
    indicador_proceso.session = user;
    for (var p = 1; p <= user.cantidad; p++) {
        indicador_proceso.periodolist.push({periodo: user.monitoreo_nombre + ' ' + p});
    }
    indicador_proceso.colpad = [];
    var rs_pad = indicador_proceso.colspan, count_pda = 0,
        arr_pad = ['P', 'A', 'D'];
    for (var i = 0; i < rs_pad; i++) {
        indicador_proceso.colpad.push(arr_pad[count_pda]);
        count_pda += 1;
        if (count_pda > 2) {
            count_pda = 0;
        }
    }
    indicador_proceso.set_border = function (column) {
        if (column == 'P') {
            return {'border-left': "1px solid"};
        } else if (column == 'D') {
            return {'border-right': "1px solid"};
        }
    };

    indicador_proceso.set_title = function (column) {
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

    indicador_proceso.conditionPoa = {
        poa_id: user.poa_id,
        compania_id: user.compania_id
    };
    indicador_proceso.group_caracteristica = user.groups[0] ? user.groups[0].caracteristica : '';
    indicador_proceso.paso = true;

    indicador_proceso.delete_relation = (id) => new Promise((resolve, reject) => {

        BASEAPI.list('indicador_proceso_periodo', {
            "where": [
                {
                    "field": "indicador_proceso",
                    "value": id,
                }
            ]
        }, function (response) {

            indicador_proceso.eliminar = false;
            indicador_proceso.rs = response.data;

            for (var i = 0; i < indicador_proceso.rs.length; i++) {
                if (indicador_proceso.rs[i].valor_alcanzado && indicador_proceso.rs[i].valor_alcanzado != "0.00") {
                    indicador_proceso.eliminar = true;
                    break;
                }
            }

            if (indicador_proceso.eliminar == false) {
                SERVICE.planificacion_transfer.deleteindicadorpoa({indicador_proceso_id: id}, function (result) {
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

    BASEAPI.list('tipoMeta', {}, function (rsm) {
        indicador_proceso.list_tipo_meta = rsm.data;
    });
    BASEAPI.list('direccionMeta', {}, function (rsd) {
        indicador_proceso.list_direccion_meta = rsd.data;
    });
    indicador_proceso.check_poa = function () {
        BASEAPI.list("vw_poa", {
            where: [
                {
                    field: "id",
                    value: user.poa_id
                }
            ]
        }, function (results) {
            console.log(results.data[0].activo);
            indicador_proceso.poa_activo = results.data[0].activo;
        });
        if (indicador_proceso.group_caracteristica == ENUM_2.Grupos.director_departamental || indicador_proceso.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            BASEAPI.list("vw_presupuesto_aprobado", {
                where: [
                    {
                        field: "poa",
                        value: user.poa_id
                    },
                    {
                        field: 'departamento_id',
                        value: user.departamento
                    },
                    {
                        open: "(",
                        field: 'id_estatus',
                        value: ENUM_2.presupuesto_estatus.Completo,
                        connector: "OR"
                    },
                    {
                        close: ")",
                        field: 'id_estatus',
                        value: ENUM_2.presupuesto_estatus.Trabajado
                    },
                ]
            }, function (res) {
                indicador_proceso.dpto_unico_autorizado = res.data.length;
                indicador_proceso.refreshAngular();

                if (indicador_proceso.poa_activo == ENUM_2.poa_estatus.Activo && indicador_proceso.dpto_unico_autorizado == 0) {
                    $('.icon-plus-circle2 ').parent().show();
                    indicador_proceso.setPermission("edit", true);
                    indicador_proceso.setPermission("remove", true);
                } else {
                    $('.icon-plus-circle2 ').parent().hide();
                    // indicador_proceso.setPermission("edit", false);
                    // indicador_proceso.setPermission("remove", false);
                    indicador_proceso.setPermission("active", false);
                    indicador_proceso.setPermission("disable", false);
                }
                console.log(res.data.length);
            });
        } else {
            BASEAPI.list("vw_presupuesto_aprobado", {
                where: [
                    {
                        field: "poa",
                        value: user.poa_id
                    }
                ]
            }, function (res) {
                indicador_proceso.total_departamentos = res.data.length;
                console.log(indicador_proceso.total_departamentos);
                indicador_proceso.refreshAngular();
                BASEAPI.list("vw_presupuesto_departamento", {
                    where: [
                        {
                            field: "poa",
                            value: user.poa_id
                        },
                        {
                            field: 'estatus',
                            value: ENUM_2.presupuesto_estatus.Completo
                        }
                    ]
                }, function (res) {
                    indicador_proceso.departamentos_autorizados = res.data.length;
                    console.log(indicador_proceso.departamentos_autorizados);
                    indicador_proceso.refreshAngular();

                    if (indicador_proceso.poa_activo == ENUM_2.poa_estatus.Inactivo || indicador_proceso.total_departamentos == indicador_proceso.departamentos_autorizados) {
                        $('.icon-plus-circle2 ').parent().hide();
                    } else {
                        $('.icon-plus-circle2 ').parent().show();
                    }
                });
            });
        }
    };

    RUNCONTROLLER("indicador_proceso", indicador_proceso, $scope, $http, $compile);
    indicador_proceso.plural = "Indicadores de Proceso";
    indicador_proceso.singular = "Indicadores de Proceso";
    getPOAstatus(indicador_proceso, user.poa_id);

    indicador_proceso.triggers.table.after.load = async function (records) {
        indicador_proceso.runMagicColum('tipo_meta', 'tipoMeta', "id", "nombre");
        indicador_proceso.runMagicColum('direccion_meta', 'direccionMeta', "id", "nombre");
        indicador_proceso.runMagicManyToMany('caracteristica', "caracteristica_indicador", "indicador_proceso", "id", 'nombre', "caracteristica_indicador_proceso", "caracteristica", "id");
        check_poa_close(indicador_proceso, user);
        // indicador_proceso.columns().metas = {
        //     label: "metas",
        //     shorttext: 370,
        //     sorted: false,
        //     order: "asc",
        //     sortable: false
        // };
        $('.has-colspan').attr('rowspan', 3);
        $('.has-colspan').css('vertical-align', 'middle');
        for (var i of indicador_proceso.records.data) {
            if (i.id_estatus == ENUM_2.presupuesto_estatus.Completado || i.id_estatus == ENUM_2.presupuesto_estatus.Trabajado) {
                console.log("entre");
                if (user.groups[0].caracteristica == ENUM_2.Grupos.director_departamental || user.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                    indicador_proceso.dont_show = true;
                } else {
                    indicador_proceso.dont_show = false;
                }
            }
        }
    };
    indicador_proceso.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        // if (LAN.money(indicador_proceso.ano_linea_base).value > LAN.money(indicador_proceso.session.periodo_poa).value) {
        //     SWEETALERT.show({
        //         type: "error",
        //         message: "El Año Línea Base no puede ser mayor al año del POA que se está trabajando"
        //     });
        //     var buttons = document.getElementsByClassName("btn btn-labeled");
        //     for (var item of buttons) {
        //         item.disabled = false;
        //     }
        //     resolve(false);
        // } else {
            resolve(true);
        // }
    });
    indicador_proceso.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        // if (LAN.money(indicador_proceso.ano_linea_base).value > LAN.money(indicador_proceso.session.periodo_poa).value) {
        //     SWEETALERT.show({
        //         type: "error",
        //         message: "El Año Línea Base no puede ser mayor al año del POA que se está trabajando"
        //     });
        //     var buttons = document.getElementsByClassName("btn btn-labeled");
        //     for (var item of buttons) {
        //         item.disabled = false;
        //     }
        //     resolve(false);
        // } else {
            if (indicador_proceso.ano_linea_base)
                data.updating.ano_linea_base = indicador_proceso.ano_linea_base;
            if (indicador_proceso.linea_base)
                data.updating.linea_base = indicador_proceso.linea_base;

            var f = new Date();
            var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
            var user = new SESSION().current();
            for (var key in indicador_proceso.valores) {
                await BASEAPI.updateallp('indicador_proceso_periodo', {
                    "valor": indicador_proceso.tipo_meta == "5" && eval(`indicador_proceso.periodos${key}`) ? eval(`indicador_proceso.periodos${key}`).replace('$', '') : eval(`indicador_proceso.periodos${key}`),
                    "updated_at": fecha,
                    "created_by": user.usuario_id,
                    where: [{
                        "field": "id",
                        "value": key
                    }]
                });
            }

            resolve(true);
        // }
    });

    indicador_proceso.list_indicador_proceso_periodo = [];
    indicador_proceso.valores = [];
    indicador_proceso.list_mes = [];


    if (indicador_proceso.group_caracteristica == ENUM_2.Grupos.director_departamental || indicador_proceso.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
        indicador_proceso.departamento = user.departamento;
        var departamentoss = new SESSION().current().departamentos_y_secundarios;


        if (departamentoss) {

            indicador_proceso.fixFilters = [
                {
                    "field": "compania",
                    "value": user.compania_id
                },
                {
                    "field": "departamento",
                    "value": indicador_proceso.departamento,
                    "open": "(",
                    "connector": "or",
                },
                {
                    "field": "departamento",
                    "value": eval(departamentoss),
                    "close": ")"
                }
            ];
        } else {
            indicador_proceso.fixFilters = [
                {
                    "field": "compania",
                    "value": user.compania_id
                },
                {
                    "field": "departamento",
                    "value": indicador_proceso.departamento
                }
            ];
        }
    } else {
        if (!new SESSION().current().intersectorial) {
            indicador_proceso.fixFilters = [
                {
                    "field": "compania",
                    "value": user.compania_id
                }
            ];
        }
    }

    indicador_proceso.getIMesNew = function () {
        //agregar el parametro de periodo a la funcion si se va a utilizar los periodos dinamicos
        indicador_proceso.list_mes = [];
        indicador_proceso.valores = [];
        indicador_proceso.limpiar = false;
        for (var s = 1; s <= user.cantidad; s++) {
            indicador_proceso.list_mes.push(s);
        }
        for (var i of indicador_proceso.list_mes) {
            eval(`indicador_proceso.form.schemas.insert.periodos${i} = FORM.schemasType.calculated`);
        }
        indicador_proceso.control.input("#subcontainerLineaBase", "linea_base", {
            maxlength: 11, popover: {
                title: "Línea Base",
                content: "Captura la  Línea Base"
            }
        }, false, '', "Línea Base", false);
    };

    indicador_proceso.getIDedit = function () {
        if (indicador_proceso.form.mode === FORM.modes.edit) {
            indicador_proceso.list_indicador_proceso_periodo = [];
            indicador_proceso.valores = [];
            indicador_proceso.limpiar = false;
            BASEAPI.listp('indicador_proceso_periodo', {
                limit: 0,
                page: 1,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "indicador_proceso",
                    value: indicador_proceso.id
                }]
            }).then(function (result) {
                indicador_proceso.list_indicador_proceso_periodo = result.data;

                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                    indicador_proceso.valores[indicador_proceso.list_indicador_proceso_periodo[key].id] = indicador_proceso.list_indicador_proceso_periodo[key].valor;
                    eval(`indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = indicador_proceso.list_indicador_proceso_periodo[key].valor`);
                    eval(`indicador_proceso.form.schemas.insert.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = FORM.schemasType.calculated`);

                }
                indicador_proceso.applyMasks();
                indicador_proceso.refreshAngular();
            });
        }
    };

    indicador_proceso.formulary = function (data, mode, defaultData) {
        if (indicador_proceso !== undefined) {
            indicador_proceso.initiation = true;
            var do_once = false;
            indicador_proceso.triggers.table.after.control = function (data) {
                if (data == 'producto') {
                    if (indicador_proceso.form.selected('producto') !== null) {
                        indicador_proceso.fecha_inicio = indicador_proceso.form.selected('producto').fecha_inicio;
                        indicador_proceso.fecha_fin = indicador_proceso.form.selected('producto').fecha_fin;
                        indicador_proceso.range_date = LAN.date(indicador_proceso.fecha_inicio) + " - " + LAN.date(indicador_proceso.fecha_fin);
                    }
                    if (indicador_proceso.paso) {
                        if (mode == 'edit') {
                            if (indicador_proceso.form.selected('producto') != null) {
                                indicador_proceso.departamento = indicador_proceso.form.selected('producto').departamento;
                            }
                            indicador_proceso.form.loadDropDown('departamento');
                            indicador_proceso.paso = false;
                        }
                    }
                }
                if (data == 'poa_monitoreo') {
                    if (mode === "new") {
                        if (!indicador_proceso.poa_monitoreo || indicador_proceso.poa_monitoreo === '[NULL]') {
                            indicador_proceso.poa_monitoreo = user.monitoreo_id + '';
                            indicador_proceso.form.loadDropDown('poa_monitoreo');
                        }
                    }
                    if (mode === "edit" && !do_once) {
                        do_once = true;
                    }
                }
                if (data == 'departamento') {
                    if (indicador_proceso.paso) {
                        if (indicador_proceso.group_caracteristica == ENUM_2.Grupos.analista_departamental || indicador_proceso.group_caracteristica == ENUM_2.Grupos.director_departamental) {
                            indicador_proceso.departamento = new SESSION().current().departamento.toString();
                            indicador_proceso.form.loadDropDown('departamento');
                            indicador_proceso.paso = false;
                        } else if (mode == 'new') {
                            indicador_proceso.form.loadDropDown('departamento');
                            indicador_proceso.paso = false;
                        }
                    }
                }
                if (data == "tipo_meta" && mode != "new" && indicador_proceso.initiation) {
                    $(".subcontainer2").html('');
                    indicador_proceso.getIDedit();
                    indicador_proceso.initiation = false;
                }
                if (data == "tipo_meta" && mode == "new" && indicador_proceso.initiation) {
                    $(".subcontainer1").html('');
                    indicador_proceso.getIMesNew();
                    indicador_proceso.initiation = false;
                }

                if (data == 'indicador_poa') {
                    console.log(indicador_proceso.form.selected("indicador_poa"));
                    if (indicador_proceso.form.selected("indicador_poa")) {
                        indicador_proceso.tipo_meta = indicador_proceso.form.selected("indicador_poa").tipo_meta + "";
                        indicador_proceso.form.options.tipo_meta.disabled = true;
                        indicador_proceso.form.loadDropDown('tipo_meta');

                    }
                }
                // if (data == "actividad_monitoreo" && mode != "new") {
                //     indicador_proceso.form.options.actividad_monitoreo.disabled = true;
                //     indicador_proceso.form.options.indicador_poa.allonull =
                //         indicador_proceso.refreshAngular();
                // }
            };
            indicador_proceso.triggers.table.after.close = function () {
                indicador_proceso.paso = true;
            };
            RUN_B("indicador_proceso", indicador_proceso, $scope, $http, $compile);
            indicador_proceso.selectQueries["producto"] = [
                {
                    field: "poa",
                    operator: "=",
                    value: user.poa_id ? user.poa_id : 0
                }
            ];
            indicador_proceso.form.schemas.insert.departamento = FORM.schemasType.calculated;


            indicador_proceso.no_trabaja_poa = function () {
                if (indicador_proceso.group_caracteristica != ENUM_2.Grupos.analista_departamental && indicador_proceso.group_caracteristica != ENUM_2.Grupos.director_departamental) {
                    return true;
                } else {
                    return false;
                }
            };
            indicador_proceso.form.titles = {
                new: "Nuevo - " + "Indicador de Proceso",
                edit: "Editar - " + "Indicador de Proceso",
                view: "Ver ALL - " + "Indicador de Proceso"
            };

            indicador_proceso.applyMasks_viejo = async function () {
                indicador_proceso.applyMasksfalse = true;
                switch (indicador_proceso.tipo_meta) {
                    case "2": {
                        await indicador_proceso.control.indice("#subcontainerLineaBase", "linea_base", {
                            maxlength: 1, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.indice(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    maxlength: 1, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                await indicador_proceso.control.indice(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                    maxlength: 1, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                eval(`
						            if(indicador_proceso.limpiar){
							            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
							            indicador_proceso.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    case "5": {
                        await indicador_proceso.control.money("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.money(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                await indicador_proceso.control.money(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                eval(`
						            if(indicador_proceso.limpiar){
							            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
							            indicador_proceso.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    case "4": {
                        await indicador_proceso.control.decimal("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.decimal(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                await indicador_proceso.control.decimal(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                eval(`
						            if(indicador_proceso.limpiar){
							            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
							            indicador_proceso.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    case "1": {
                        await indicador_proceso.control.percentage("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.percentage(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                await indicador_proceso.control.percentage(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                eval(`
						            if(indicador_proceso.limpiar){
							            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
							            indicador_proceso.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    case "6": {
                        await indicador_proceso.control.integer("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.integer(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                await indicador_proceso.control.integer(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                eval(`
						            if(indicador_proceso.limpiar){
							            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
							            indicador_proceso.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    case "3": {
                        //absoluto
                        await indicador_proceso.control.valor_absoluto("#subcontainerLineaBase", "linea_base", {
                            maxlength: 11, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.valor_absoluto(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    maxlength: 11, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo2, false);
                                watchIndicadoresValorAbsoluto(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                await indicador_proceso.control.valor_absoluto(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                    maxlength: 11, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar + ' ' + conuntPeriodo, false);
                                watchIndicadoresValorAbsoluto(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                eval(`
						            if(indicador_proceso.limpiar){
							            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
							            indicador_proceso.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    default: {

                    }

                }
                indicador_proceso.applyMasksfalse = false;
                indicador_proceso.refreshAngular();
                delete indicador_proceso.yadata;
                indicador_proceso.currentModel.clicaalgo();
            };

            indicador_proceso.applyMasks = async function () {
                if (indicador_proceso.working)
                    return;
                indicador_proceso.working = true;
                indicador_proceso.applyMasksfalse = true;
                switch (indicador_proceso.tipo_meta) {
                    case "2": {
                        await indicador_proceso.control.indice("#subcontainerLineaBase", "linea_base", {
                            maxlength: 1, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.indice(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    maxlength: 1, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_proceso.poa_monitoreo_viejo == indicador_proceso.poa_monitoreo) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.indice(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                        maxlength: 1, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }else {
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    delete indicador_proceso.validate[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    delete indicador_proceso[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    indicador_proceso.form.fileds = indicador_proceso.form.fileds.filter( x => x !== `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                }
                                indicador_proceso.list_indicador_proceso_periodo = indicador_proceso.list_mes;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.indice(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key], {
                                        maxlength: 1, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    case "5": {
                        await indicador_proceso.control.money("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.money(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_proceso.poa_monitoreo_viejo == indicador_proceso.poa_monitoreo) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.money(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                        maxlength: 22, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }else {
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    delete indicador_proceso.validate[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    delete indicador_proceso[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    indicador_proceso.form.fileds = indicador_proceso.form.fileds.filter( x => x !== `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                }
                                indicador_proceso.list_indicador_proceso_periodo = indicador_proceso.list_mes;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.money(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key], {
                                        maxlength: 22, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    case "4": {
                        await indicador_proceso.control.decimal("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.decimal(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_proceso.poa_monitoreo_viejo == indicador_proceso.poa_monitoreo) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.decimal(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                        maxlength: 22, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            } else {
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    delete indicador_proceso.validate[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    delete indicador_proceso[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    indicador_proceso.form.fileds = indicador_proceso.form.fileds.filter( x => x !== `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                }
                                indicador_proceso.list_indicador_proceso_periodo = indicador_proceso.list_mes;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.decimal(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key], {
                                        maxlength: 22, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    case "1": {
                        await indicador_proceso.control.percentage("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.percentage(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_proceso.poa_monitoreo_viejo == indicador_proceso.poa_monitoreo) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.percentage(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                        popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }else{
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    delete indicador_proceso.validate[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    delete indicador_proceso[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    indicador_proceso.form.fileds = indicador_proceso.form.fileds.filter( x => x !== `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                }
                                indicador_proceso.list_indicador_proceso_periodo = indicador_proceso.list_mes;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.percentage(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key], {
                                        popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    case "6": {
                        await indicador_proceso.control.integer("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.integer(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_proceso.poa_monitoreo_viejo == indicador_proceso.poa_monitoreo) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.integer(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                        popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }else{
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    delete indicador_proceso.validate[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    delete indicador_proceso[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    indicador_proceso.form.fileds = indicador_proceso.form.fileds.filter( x => x !== `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                }
                                indicador_proceso.list_indicador_proceso_periodo = indicador_proceso.list_mes;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.integer(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key], {
                                        popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    case "3": {
                        //absoluto
                        await indicador_proceso.control.valor_absoluto("#subcontainerLineaBase", "linea_base", {
                            maxlength: 11, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_proceso.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_proceso.list_mes) {
                                await indicador_proceso.control.valor_absoluto(".subcontainer1", "periodos" + indicador_proceso.list_mes[key], {
                                    maxlength: 11, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadoresValorAbsoluto(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_mes[key]}`, `periodos${indicador_proceso.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_proceso.poa_monitoreo_viejo == indicador_proceso.poa_monitoreo) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.valor_absoluto(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key].id, {
                                        maxlength: 11, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadoresValorAbsoluto(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key].id} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            } else {
                                var conuntPeriodo = 1;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    delete indicador_proceso.validate[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    delete indicador_proceso[`periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`];
                                    indicador_proceso.form.fileds = indicador_proceso.form.fileds.filter( x => x !== `periodos${indicador_proceso.list_indicador_proceso_periodo[key].id}`);
                                }
                                indicador_proceso.list_indicador_proceso_periodo = indicador_proceso.list_mes;
                                for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                                    await indicador_proceso.control.valor_absoluto(".subcontainer2", "periodos" + indicador_proceso.list_indicador_proceso_periodo[key], {
                                        maxlength: 11, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadoresValorAbsoluto(indicador_proceso, `indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`, `periodos${indicador_proceso.list_indicador_proceso_periodo[key]}`);
                                    eval(`
                                        if (indicador_proceso.limpiar) {
                                            indicador_proceso.periodos${indicador_proceso.list_indicador_proceso_periodo[key]} = "";
                                            indicador_proceso.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_proceso.limpiar = true;
                        break;
                    }
                    default: {

                    }

                }
                indicador_proceso.applyMasksfalse = false;
                indicador_proceso.refreshAngular();
                indicador_proceso.working = false;
                delete indicador_proceso.yadata;
            };

            indicador_proceso.form.readonly = {};
            indicador_proceso.createForm(data, mode, defaultData);

            indicador_proceso.form.schemas.insert.fecha_inicio = FORM.schemasType.calculated;
            indicador_proceso.form.schemas.insert.fecha_fin = FORM.schemasType.calculated;

            var f = new Date();
            var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();


            indicador_proceso.form.after.insert = function (data) {
                var groupInsert = [];
                for (let i = 0; i < indicador_proceso.list_mes.length; i++) {
                    try {
                        groupInsert.push({
                            "indicador_proceso": data.inserted.id,
                            "created_at": fecha,
                            "created_by": user.usuario_id,
                            "valor": DSON.OSO((indicador_proceso.tipo_meta == "5" && eval(`indicador_proceso.periodos${indicador_proceso.list_mes[i]}`) ? eval(`indicador_proceso.periodos${indicador_proceso.list_mes[i]}`).replace('$', '') : eval(`indicador_proceso.periodos${indicador_proceso.list_mes[i]}`)) || ""),
                            "periodo": indicador_proceso.list_mes[i]
                        });
                    } catch (e) {
                        groupInsert.push({
                            "indicador_proceso": data.inserted.id,
                            "created_at": fecha,
                            "created_by": user.usuario_id,
                            "valor": "",
                            "periodo": indicador_proceso.list_mes[i]
                        });
                    }
                }

                BASEAPI.insert('indicador_proceso_periodo', groupInsert, function (result) {
                    indicador_proceso.linea_base = indicador_proceso.linea_base.replace('$', '');
                    indicador_proceso.list_mes = [];
                    for (var i in indicador_proceso) if (i.indexOf("periodos") !== -1) eval(`delete indicador_proceso.${i}`);
                });

                return false;
            };


            indicador_proceso.form.after.update = async function (data) {
                if(indicador_proceso.list_indicador_proceso_periodo.some(d => { return typeof d == "object"})){
                    for (var key in indicador_proceso.list_indicador_proceso_periodo) {
                        indicador_proceso.valores[indicador_proceso.list_indicador_proceso_periodo[key].id] = indicador_proceso.list_indicador_proceso_periodo[key].valor;
                    }
                    for (var key in indicador_proceso.valores) {
                        await BASEAPI.updateallp('indicador_proceso_periodo', {
                            "valor": indicador_proceso.tipo_meta == "5" && eval(`indicador_proceso.periodos${key}`) ? eval(`indicador_proceso.periodos${key}`).replace('$', '') : eval(`indicador_proceso.periodos${key}`),
                            "updated_at": "$now()",
                            "created_by": user.usuario_id,
                            where: [{
                                "field": "id",
                                "value": key
                            }]
                        });
                    }
                }else{
                    let groupInsert = [];
                    for (let i = 0; i < indicador_proceso.list_mes.length; i++) {
                        groupInsert.push({
                            "indicador_proceso": indicador_proceso.id,
                            "created_at": "$now()",
                            "created_by": user.usuario_id,
                            "valor": (indicador_proceso.tipo_meta == "5" && eval(`indicador_proceso.periodos${indicador_proceso.list_mes[i]}`) ? eval(`indicador_proceso.periodos${indicador_proceso.list_mes[i]}`).replace('$', '') : eval(`indicador_proceso.periodos${indicador_proceso.list_mes[i]}`)) || 0,
                            "periodo": indicador_proceso.list_mes[i]
                        });
                    }
                    BASEAPI.deleteall('indicador_proceso_periodo', [
                        {
                            field: "indicador_proceso",
                            value: indicador_proceso.id
                        }
                    ],  (result) => {
                        console.log(indicador_proceso.list_mes, groupInsert, "entré?")
                        if(result) {
                            BASEAPI.insert('indicador_proceso_periodo', groupInsert, function (result) {

                            });
                        }
                    });
                }
                indicador_proceso.linea_base = indicador_proceso.linea_base.replace('$', '');
                indicador_proceso.list_indicador_proceso_periodo = [];
                for (var i in indicador_proceso) if (i.indexOf("periodos") !== -1) eval(`delete indicador_proceso.${i}`);
                return false;
            };


            indicador_proceso.$scope.$watch('indicador_proceso.poa_monitoreo', function (value) {
                var rules = [];
                if (value !== undefined || value !== "[NULL]") {
                    if (indicador_proceso.form.selected('poa_monitoreo')) {
                        user.cantidad = indicador_proceso.form.selected('poa_monitoreo').cantidad;
                        user.monitoreo_nombre = indicador_proceso.form.selected('poa_monitoreo').nombre_mostrar;

                        indicador_proceso.periodolist = [];
                        for (var p = 1; p <= 12; p++) {
                            if (indicador_proceso.validate["periodos" + p])
                                delete indicador_proceso.validate["periodos" + p];
                        }
                        for (var p = 1; p <= user.cantidad; p++) {
                            indicador_proceso.periodolist.push({periodo: user.monitoreo_nombre + ' ' + p});
                        }

                        $(".subcontainer2").html('');
                        $(".clearHtml").html('');
                        indicador_proceso.getIMesNew();
                        indicador_proceso.applyMasks();
                    }
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_proceso, "poa_monitoreo", rules);
            });


            indicador_proceso.$scope.$watch('indicador_proceso.ws_connection_field', async function (value) {
                await indicador_proceso.runws(value, "resultExterno");
                indicador_proceso.refreshAngular();
            });


            indicador_proceso.$scope.$watch('indicador_proceso.nombre', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_proceso, "nombre", rules)
            });
            indicador_proceso.$scope.$watch('indicador_proceso.actividades_poa', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_proceso, "actividades_poa", rules)
            });


            indicador_proceso.$scope.$watch('indicador_proceso.fuente', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_proceso, "fuente", rules)
            });


            indicador_proceso.$scope.$watch('indicador_proceso.tipo_meta', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_proceso, "tipo_meta", rules);
                if (value && (!indicador_proceso.initiation)) {
                    $(".clearHtml").html('');
                    indicador_proceso.applyMasks();
                }
            });

            indicador_proceso.$scope.$watch('indicador_proceso.direccion_meta', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_proceso, "direccion_meta", rules)
            });

            indicador_proceso.$scope.$watch('indicador_proceso.ano_linea_base', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_proceso, "ano_linea_base", rules)
            });
            indicador_proceso.$scope.$watch('indicador_proceso.linea_base', function (value) {
                indicador_proceso.linea_base = value ? value.replace("$", "") : value;
                var rules = [];
                if (value == "" || value == null)
                    rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_proceso, "linea_base", rules)
            });
            indicador_proceso.$scope.$watch('indicador_proceso.medio_verificacion', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_proceso, "medio_verificacion", rules)
                VALIDATION.validate(indicador_proceso, "medio_verificacion", rules)
            });
            // indicador_proceso.$scope.$watch('indicador_proceso.actividad_monitoreo', function (value) {
            //     var rules = [];
            //     VALIDATION.validate(indicador_proceso, "actividad_monitoreo", rules);
            //     if (indicador_proceso.actividad_monitoreo == "[NULL]") {
            //         $(".clearHtml").html('');
            //         indicador_proceso.getIMesNew(user.cantidad);
            //     }
            //     else {
            //         if ((indicador_proceso.tipo_meta != "[NULL]" && value) && (!indicador_proceso.initiation)) {
            //             indicador_proceso.getIMesNew(indicador_proceso.form.selected('actividad_monitoreo').cantidad);
            //             $(".clearHtml").html('');
            //             indicador_proceso.applyMasks();
            //         }
            //     }
            // });
            indicador_proceso.$scope.$watch('indicador_proceso.metodo_calculo', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_proceso, "metodo_calculo", rules)
                VALIDATION.validate(indicador_proceso, "metodo_calculo", rules)

            });
            indicador_proceso.$scope.$watch('indicador_proceso.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_proceso, "descripcion", rules)
            });
            // indicador_proceso.$scope.$watch('indicador_proceso.indicador_poa', function (value) {
            //     var rules = [];
            //     VALIDATION.validate(indicador_proceso, "indicador_poa", rules);
            //     // if (indicador_proceso.indicador_poa == "[NULL]") {
            //     //     $(".clearHtml").html('');
            //     // }
            //     // else {
            //     //     console.log("este es el else");
            //     //     if ((indicador_proceso.tipo_meta != "[NULL]" && value) && (!indicador_proceso.initiation)) {
            //     //         $(".clearHtml").html('');
            //     //         indicador_proceso.applyMasks();
            //     //     }
            //     // }
            // });
            indicador_proceso.$scope.$watch('indicador_proceso.indicador_poa', function (value) {
                var rules = [];
                if (indicador_proceso.form.selected("indicador_poa")) {
                    indicador_proceso.tipo_meta = indicador_proceso.form.selected("indicador_poa").tipo_meta + "";
                    indicador_proceso.form.loadDropDown('tipo_meta');
                    indicador_proceso.form.options.tipo_meta.disabled = true;
                } else {
                    if (indicador_proceso.form.options.tipo_meta) {
                        indicador_proceso.form.options.tipo_meta.disabled = false;
                        indicador_proceso.form.loadDropDown('tipo_meta');
                    }
                }
                indicador_proceso.refreshAngular();
            });


        }
    };
    indicador_proceso.refreshAngularCustom = function () {
        indicador_proceso.refreshAngular();
    }
});
