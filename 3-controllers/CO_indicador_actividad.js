app.controller("indicador_actividad", function ($scope, $http, $compile) {
    indicador_actividad = this;
    var user = new SESSION().current();
    indicador_actividad.colspan = user.cantidad * 3;
    indicador_actividad.periodolist = [];
    indicador_actividad.session = user;
    for (var p = 1; p <= user.cantidad; p++) {
        indicador_actividad.periodolist.push({periodo: user.monitoreo_nombre + ' ' + p});
    }
    indicador_actividad.colpad = [];
    var rs_pad = indicador_actividad.colspan, count_pda = 0,
        arr_pad = ['P', 'A', 'D'];
    for (var i = 0; i < rs_pad; i++) {
        indicador_actividad.colpad.push(arr_pad[count_pda]);
        count_pda += 1;
        if (count_pda > 2) {
            count_pda = 0;
        }
    }
    indicador_actividad.set_border = function (column) {
        if (column == 'P') {
            return {'border-left': "1px solid"};
        } else if (column == 'D') {
            return {'border-right': "1px solid"};
        }
    };

    indicador_actividad.set_title = function (column) {
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

    indicador_actividad.conditionPoa = {
        poa_id: user.poa_id,
        compania_id: user.compania_id
    };
    indicador_actividad.group_caracteristica = user.groups[0] ? user.groups[0].caracteristica : '';
    indicador_actividad.paso = true;

    indicador_actividad.delete_relation = (id) => new Promise((resolve, reject) => {

        BASEAPI.list('indicador_actividad_periodo', {
            "where": [
                {
                    "field": "indicador_actividad",
                    "value": id,
                }
            ]
        }, function (response) {

            indicador_actividad.eliminar = false;
            indicador_actividad.rs = response.data;

            for (var i = 0; i < indicador_actividad.rs.length; i++) {
                if (indicador_actividad.rs[i].valor_alcanzado && indicador_actividad.rs[i].valor_alcanzado != "0.00") {
                    indicador_actividad.eliminar = true;
                    break;
                }
            }
            resolve(1);
            if (indicador_actividad.eliminar == false) {
                // SERVICE.planificacion_transfer.deleteindicadorpoa({indicador_actividad_id: id}, function (result) {
                //     if (result.data.error == false) {
                //         resolve(1);
                //     } else
                //         resolve(0);
                // });
            } else {
                resolve(0);
            }
        });
    });

    BASEAPI.list('tipoMeta', {}, function (rsm) {
        indicador_actividad.list_tipo_meta = rsm.data;
    });
    BASEAPI.list('direccionMeta', {}, function (rsd) {
        indicador_actividad.list_direccion_meta = rsd.data;
    });
    indicador_actividad.check_poa = function () {
        BASEAPI.list("vw_poa", {
            where: [
                {
                    field: "id",
                    value: user.poa_id
                }
            ]
        }, function (results) {
            console.log(results.data[0].activo);
            indicador_actividad.poa_activo = results.data[0].activo;
        });
        if (indicador_actividad.group_caracteristica == ENUM_2.Grupos.director_departamental || indicador_actividad.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
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
                indicador_actividad.dpto_unico_autorizado = res.data.length;
                indicador_actividad.refreshAngular();

                if (indicador_actividad.dpto_unico_autorizado == 0) {
                    $('.icon-plus-circle2 ').parent().show();
                    indicador_actividad.setPermission("edit", true);
                    indicador_actividad.setPermission("remove", true);
                } else {
                    $('.icon-plus-circle2 ').parent().hide();
                    indicador_actividad.setPermission("edit", false);
                    indicador_actividad.setPermission("remove", false);
                    indicador_actividad.setPermission("active", false);
                    indicador_actividad.setPermission("disable", false);
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
                indicador_actividad.total_departamentos = res.data.length;
                console.log(indicador_actividad.total_departamentos);
                indicador_actividad.refreshAngular();
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
                    indicador_actividad.departamentos_autorizados = res.data.length;
                    console.log(indicador_actividad.departamentos_autorizados);
                    indicador_actividad.refreshAngular();

                    if (indicador_actividad.total_departamentos == indicador_actividad.departamentos_autorizados) {
                        $('.icon-plus-circle2 ').parent().hide();
                    } else {
                        $('.icon-plus-circle2 ').parent().show();
                    }
                });
            });
        }
    };

    RUNCONTROLLER("indicador_actividad", indicador_actividad, $scope, $http, $compile);
    indicador_actividad.plural = "Indicadores de Actividades";
    indicador_actividad.singular = "Indicadores de Actividades";
    getPOAstatus(indicador_actividad, user.poa_id);

    title_header_table_poa(indicador_actividad, "Indicadores de Actividades");
    indicador_actividad.triggers.table.after.load = async function (records) {
        if (user.presupuesto_id === null)
            $('.icon-plus-circle2 ').parent().hide();
        indicador_actividad.runMagicColum('tipo_meta', 'tipoMeta', "id", "nombre");
        indicador_actividad.runMagicColum('direccion_meta', 'direccionMeta', "id", "nombre");
        indicador_actividad.runMagicManyToMany('caracteristica', "caracteristica_indicador", "indicador_actividad", "id", 'nombre', "caracteristica_indicador_actividad", "caracteristica", "id");
        indicador_actividad.check_poa();
        check_poa_close(indicador_actividad, user);
        indicador_actividad.tipo_meta_list = await BASEAPI.listp('tipoMeta', {
            limit: 0,
            orderby: "id",
            order: "asc"
        });
        indicador_actividad.tipo_meta_list = indicador_actividad.tipo_meta_list.data;
        indicador_actividad.direccion_meta_list = await BASEAPI.listp('direccionMeta', {
            limit: 0,
            orderby: "id",
            order: "asc"
        });
        indicador_actividad.direccion_meta_list = indicador_actividad.direccion_meta_list.data;
        indicador_actividad.columns().metas = {
            label: "metas",
            shorttext: 370,
            sorted: false,
            order: "asc",
            sortable: false
        };
        $('.has-colspan').attr('rowspan', 3);
        $('.has-colspan').css('vertical-align', 'middle');
        BASEAPI.listp('vw_indicador_actividad_periodo', {
            limit: 0,
            where: [{
                field: "poa",
                value: user.poa_id
            }]
        }).then(function (rs) {
            if (rs.data) {
                indicador_actividad.pei_ano = rs.data;
                for (var c = 1; c <= user.cantidad; c++) {
                    for (var l = 0; l < indicador_actividad.records.data.length; l++) {
                        selected = indicador_actividad.pei_ano.filter(information => {
                            if (information.indicador_actividad == indicador_actividad.records.data[l].id && information.periodo == c) {
                                return true;
                            }
                        });
                        eval(`
							if( typeof indicador_actividad.records.data[${l}].periodo == 'undefined'){
								indicador_actividad.records.data[${l}].periodo = [];
							}
                    	`);
                        if (selected.length > 0) {
                            eval(`indicador_actividad.records.data[${l}].periodo.push("${selected[0].valor}")`);
                            eval(`indicador_actividad.records.data[${l}].periodo.push("${selected[0].valor_alcanzado}")`);
                            eval(`indicador_actividad.records.data[${l}].periodo.push("${selected[0].varianzas}")`);
                        } else {
                            eval(`indicador_actividad.records.data[${l}].periodo.push("")`);
                            eval(`indicador_actividad.records.data[${l}].periodo.push("")`);
                            eval(`indicador_actividad.records.data[${l}].periodo.push("")`);
                        }

                    }
                }
                indicador_actividad.refreshAngular();
            }
        });
        for (var i of indicador_actividad.records.data) {
            if (i.id_estatus == ENUM_2.presupuesto_estatus.Completado || i.id_estatus == ENUM_2.presupuesto_estatus.Trabajado) {
                console.log("entre");
                if (user.groups[0].caracteristica == ENUM_2.Grupos.director_departamental || user.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                    indicador_actividad.dont_show = true;
                } else {
                    indicador_actividad.dont_show = false;
                }
            }
        }
    };
    indicador_actividad.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        if (LAN.money(indicador_actividad.ano_linea_base).value > LAN.money(indicador_actividad.session.periodo_poa).value) {
            SWEETALERT.show({
                type: "error",
                message: "El Año Línea Base no puede ser mayor al año del POA que se está trabajando"
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        } else {
            resolve(true);
        }
    });
    indicador_actividad.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        if (LAN.money(indicador_actividad.ano_linea_base).value > LAN.money(indicador_actividad.session.periodo_poa).value) {
            SWEETALERT.show({
                type: "error",
                message: "El Año Línea Base no puede ser mayor al año del POA que se está trabajando"
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        } else {
            if (indicador_actividad.ano_linea_base)
                data.updating.ano_linea_base = indicador_actividad.ano_linea_base;
            if (indicador_actividad.linea_base)
                data.updating.linea_base = indicador_actividad.linea_base;

            var f = new Date();
            var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
            var user = new SESSION().current();
            for (var key in indicador_actividad.valores) {
                await BASEAPI.updateallp('indicador_actividad_periodo', {
                    "valor": indicador_actividad.tipo_meta == "5" && eval(`indicador_actividad.periodos${key}`) ? eval(`indicador_actividad.periodos${key}`).replace('$', '') : eval(`indicador_actividad.periodos${key}`),
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

    indicador_actividad.list_indicador_actividad_periodo = [];
    indicador_actividad.valores = [];
    indicador_actividad.list_mes = [];


    if (indicador_actividad.group_caracteristica == ENUM_2.Grupos.director_departamental || indicador_actividad.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
        indicador_actividad.departamento = user.departamento;
        var departamentoss = new SESSION().current().departamentos_y_secundarios;


        if (departamentoss) {

            indicador_actividad.fixFilters = [
                {
                    "field": "poa",
                    "value": user.poa_id
                },
                {
                    "field": "departamento",
                    "value": indicador_actividad.departamento,
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
            indicador_actividad.fixFilters = [
                {
                    "field": "poa",
                    "value": user.poa_id
                },
                {
                    "field": "departamento",
                    "value": indicador_actividad.departamento
                }
            ];
        }
    } else {
        if (!new SESSION().current().intersectorial) {
            indicador_actividad.fixFilters = [
                {
                    "field": "poa",
                    "value": user.poa_id
                }
            ];
        }
    }

    indicador_actividad.getIMesNew = function () {
        //agregar el parametro de periodo a la funcion si se va a utilizar los periodos dinamicos
        if (indicador_actividad.form.mode === FORM.modes.new) {
            indicador_actividad.list_mes = [];
            indicador_actividad.valores = [];
            indicador_actividad.limpiar = false;
            for (var s = 1; s <= user.cantidad; s++) {
                indicador_actividad.list_mes.push(s);
            }
            for (var i of indicador_actividad.list_mes) {
                eval(`indicador_actividad.form.schemas.insert.periodos${i} = FORM.schemasType.calculated`);
            }
            indicador_actividad.control.input("#subcontainerLineaBase", "linea_base", {
                maxlength: 11, popover: {
                    title: "Línea Base",
                    content: "Captura la  Línea Base"
                }
            }, false, '', "Línea Base", false);
        }
    };

    indicador_actividad.getIDedit = function () {
        if (indicador_actividad.form.mode === FORM.modes.edit) {
            indicador_actividad.list_indicador_actividad_periodo = [];
            indicador_actividad.valores = [];
            indicador_actividad.limpiar = false;
            BASEAPI.listp('indicador_actividad_periodo', {
                limit: 0,
                page: 1,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "indicador_actividad",
                    value: indicador_actividad.id
                }]
            }).then(function (result) {
                indicador_actividad.list_indicador_actividad_periodo = result.data;

                for (var key in indicador_actividad.list_indicador_actividad_periodo) {
                    indicador_actividad.valores[indicador_actividad.list_indicador_actividad_periodo[key].id] = indicador_actividad.list_indicador_actividad_periodo[key].valor;
                    eval(`indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id} = indicador_actividad.list_indicador_actividad_periodo[key].valor`);
                    eval(`indicador_actividad.form.schemas.insert.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id} = FORM.schemasType.calculated`);

                }
                indicador_actividad.applyMasks();
                indicador_actividad.refreshAngular();
            });
        }
    };

    indicador_actividad.formulary = function (data, mode, defaultData) {
        if (indicador_actividad !== undefined) {
            indicador_actividad.initiation = true;
            var do_once_dp = false;
            indicador_actividad.triggers.table.after.control = function (data) {
                if (data == 'producto') {
                    if (indicador_actividad.form.selected('producto') !== null) {
                        indicador_actividad.fecha_inicio = indicador_actividad.form.selected('producto').fecha_inicio;
                        indicador_actividad.fecha_fin = indicador_actividad.form.selected('producto').fecha_fin;
                        indicador_actividad.range_date = LAN.date(indicador_actividad.fecha_inicio) + " - " + LAN.date(indicador_actividad.fecha_fin);
                    }
                    if (indicador_actividad.paso) {
                        if (mode == 'edit') {
                            if (indicador_actividad.form.selected('producto') != null) {
                                indicador_actividad.departamento = indicador_actividad.form.selected('producto').departamento;
                            }
                            indicador_actividad.form.loadDropDown('departamento');
                            indicador_actividad.paso = false;
                        }
                    }
                }
                if (data == 'departamento') {
                    if (indicador_actividad.paso) {
                        if (indicador_actividad.group_caracteristica == ENUM_2.Grupos.analista_departamental || indicador_actividad.group_caracteristica == ENUM_2.Grupos.director_departamental) {
                            indicador_actividad.departamento = new SESSION().current().departamento.toString();
                            indicador_actividad.form.loadDropDown('departamento');
                            indicador_actividad.paso = false;
                        } else if (mode == 'new') {
                            indicador_actividad.form.loadDropDown('departamento');
                            indicador_actividad.paso = false;
                        }
                    }
                }
                if (data == "tipo_meta" && mode != "new" && indicador_actividad.initiation) {
                    $(".subcontainer2").html('');
                    indicador_actividad.getIDedit();
                    indicador_actividad.initiation = false;
                }
                if (data == "tipo_meta" && mode == "new" && indicador_actividad.initiation) {
                    $(".subcontainer1").html('');
                    indicador_actividad.getIMesNew();
                    indicador_actividad.initiation = false;
                }

                if (data == 'indicador_poa') {
                    console.log(indicador_actividad.form.selected("indicador_poa"));
                    if (indicador_actividad.form.selected("indicador_poa")) {
                        indicador_actividad.tipo_meta = indicador_actividad.form.selected("indicador_poa").tipo_meta + "";
                        indicador_actividad.form.options.tipo_meta.disabled = true;
                        indicador_actividad.form.loadDropDown('tipo_meta');

                    }
                }
                if (data == 'direccion_meta') {
                    if (mode === "edit" && !do_once_dp) {
                        do_once_dp = true;
                        indicador_actividad.oldData_forAudit = indicador_actividad.form.getAudit();
                    }
                }
                // if (data == "actividad_monitoreo" && mode != "new") {
                //     indicador_actividad.form.options.actividad_monitoreo.disabled = true;
                //     indicador_actividad.form.options.indicador_poa.allonull =
                //         indicador_actividad.refreshAngular();
                // }
            };
            indicador_actividad.triggers.table.after.close = function () {
                indicador_actividad.paso = true;
            };
            RUN_B("indicador_actividad", indicador_actividad, $scope, $http, $compile);
            indicador_actividad.selectQueries["producto"] = [
                {
                    field: "poa",
                    operator: "=",
                    value: user.poa_id ? user.poa_id : 0
                }
            ];
            indicador_actividad.form.schemas.insert.departamento = FORM.schemasType.calculated;


            indicador_actividad.no_trabaja_poa = function () {
                if (indicador_actividad.group_caracteristica != ENUM_2.Grupos.analista_departamental && indicador_actividad.group_caracteristica != ENUM_2.Grupos.director_departamental) {
                    return true;
                } else {
                    return false;
                }
            };
            indicador_actividad.form.titles = {
                new: "Nuevo - " + MESSAGE.i('planificacion.titleindicador_actividad'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titleindicador_actividad')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleindicador_actividad')}`
            };

            indicador_actividad.applyMasks = async function () {
                indicador_actividad.applyMasksfalse = true;
                switch (indicador_actividad.tipo_meta) {
                    case "2": {
                        await indicador_actividad.control.indice("#subcontainerLineaBase", "linea_base", {
                            maxlength: 1, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_actividad.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_actividad.list_mes) {
                                await indicador_actividad.control.indice(".subcontainer1", "periodos" + indicador_actividad.list_mes[key], {
                                    maxlength: 1, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_mes[key]}`, `periodos${indicador_actividad.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_actividad.list_indicador_actividad_periodo) {
                                await indicador_actividad.control.indice(".subcontainer2", "periodos" + indicador_actividad.list_indicador_actividad_periodo[key].id, {
                                    maxlength: 1, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`, `periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`);
                                eval(`
						            if(indicador_actividad.limpiar){
							            indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id} = "";
							            indicador_actividad.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_actividad.limpiar = true;
                        break;
                    }
                    case "5": {
                        await indicador_actividad.control.money("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_actividad.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_actividad.list_mes) {
                                await indicador_actividad.control.money(".subcontainer1", "periodos" + indicador_actividad.list_mes[key], {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_mes[key]}`, `periodos${indicador_actividad.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_actividad.list_indicador_actividad_periodo) {
                                await indicador_actividad.control.money(".subcontainer2", "periodos" + indicador_actividad.list_indicador_actividad_periodo[key].id, {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`, `periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`);
                                eval(`
						            if(indicador_actividad.limpiar){
							            indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id} = "";
							            indicador_actividad.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_actividad.limpiar = true;
                        break;
                    }
                    case "4": {
                        await indicador_actividad.control.decimal("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_actividad.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_actividad.list_mes) {
                                await indicador_actividad.control.decimal(".subcontainer1", "periodos" + indicador_actividad.list_mes[key], {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_mes[key]}`, `periodos${indicador_actividad.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_actividad.list_indicador_actividad_periodo) {
                                await indicador_actividad.control.decimal(".subcontainer2", "periodos" + indicador_actividad.list_indicador_actividad_periodo[key].id, {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`, `periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`);
                                eval(`
						            if(indicador_actividad.limpiar){
							            indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id} = "";
							            indicador_actividad.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_actividad.limpiar = true;
                        break;
                    }
                    case "1": {
                        await indicador_actividad.control.percentage("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_actividad.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_actividad.list_mes) {
                                await indicador_actividad.control.percentage(".subcontainer1", "periodos" + indicador_actividad.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_mes[key]}`, `periodos${indicador_actividad.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_actividad.list_indicador_actividad_periodo) {
                                await indicador_actividad.control.percentage(".subcontainer2", "periodos" + indicador_actividad.list_indicador_actividad_periodo[key].id, {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`, `periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`);
                                eval(`
						            if(indicador_actividad.limpiar){
							            indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id} = "";
							            indicador_actividad.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_actividad.limpiar = true;
                        break;
                    }
                    case "6": {
                        await indicador_actividad.control.integer("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_actividad.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_actividad.list_mes) {
                                await indicador_actividad.control.integer(".subcontainer1", "periodos" + indicador_actividad.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_mes[key]}`, `periodos${indicador_actividad.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_actividad.list_indicador_actividad_periodo) {
                                await indicador_actividad.control.integer(".subcontainer2", "periodos" + indicador_actividad.list_indicador_actividad_periodo[key].id, {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`, `periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`);
                                eval(`
						            if(indicador_actividad.limpiar){
							            indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id} = "";
							            indicador_actividad.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_actividad.limpiar = true;
                        break;
                    }
                    case "3": {
                        //absoluto
                        await indicador_actividad.control.valor_absoluto("#subcontainerLineaBase", "linea_base", {
                            maxlength: 11, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_actividad.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_actividad.list_mes) {
                                await indicador_actividad.control.valor_absoluto(".subcontainer1", "periodos" + indicador_actividad.list_mes[key], {
                                    maxlength: 11, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadoresValorAbsoluto(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_mes[key]}`, `periodos${indicador_actividad.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_actividad.list_indicador_actividad_periodo) {
                                await indicador_actividad.control.valor_absoluto(".subcontainer2", "periodos" + indicador_actividad.list_indicador_actividad_periodo[key].id, {
                                    maxlength: 11, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadoresValorAbsoluto(indicador_actividad, `indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`, `periodos${indicador_actividad.list_indicador_actividad_periodo[key].id}`);
                                eval(`
						            if(indicador_actividad.limpiar){
							            indicador_actividad.periodos${indicador_actividad.list_indicador_actividad_periodo[key].id} = "";
							            indicador_actividad.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_actividad.limpiar = true;
                        break;
                    }
                    default: {

                    }

                }
                indicador_actividad.applyMasksfalse = false;
                indicador_actividad.refreshAngular();
                delete indicador_actividad.yadata;
                if (indicador_actividad)
                    if (indicador_actividad.currentModel)
                        indicador_actividad.currentModel.clicaalgo();
                indicador_actividad.form.oldData['Nombre'] = indicador_actividad.oldData_forAudit['Nombre'];
                indicador_actividad.form.oldData['Año'] = indicador_actividad.oldData_forAudit['Año'];
                indicador_actividad.form.oldData['Año Línea Base'] = indicador_actividad.oldData_forAudit['Año Línea Base'];
                indicador_actividad.form.oldData['Característica de indicador '] = indicador_actividad.oldData_forAudit['Característica de indicador '];
                indicador_actividad.form.oldData['Proyecto/Producto'] = indicador_actividad.oldData_forAudit['Proyecto/Producto'];
                indicador_actividad.form.oldData['Desagregacion_demografica_geografia'] = indicador_actividad.oldData_forAudit['Desagregacion_demografica_geografia'];
                indicador_actividad.form.oldData['Descripción'] = indicador_actividad.oldData_forAudit['Descripción'];
                indicador_actividad.form.oldData['Dirección de la meta'] = indicador_actividad.oldData_forAudit['Dirección de la meta'];
                indicador_actividad.form.oldData['Fuente'] = indicador_actividad.oldData_forAudit['Fuente'];
                indicador_actividad.form.oldData['Medio de verificación'] = indicador_actividad.oldData_forAudit['Medio de verificación'];
                indicador_actividad.form.oldData['Método cálculo'] = indicador_actividad.oldData_forAudit['Método cálculo'];
                indicador_actividad.form.oldData['Observación'] = indicador_actividad.oldData_forAudit['Observación'];
                indicador_actividad.form.oldData['Dirección de la meta'] = indicador_actividad.oldData_forAudit['Dirección de la meta']
                indicador_actividad.form.oldData['Tipo de dato de la meta'] = indicador_actividad.oldData_forAudit['Tipo de dato de la meta']
            };

            indicador_actividad.form.readonly = {};

            indicador_actividad.createForm(data, mode, defaultData, undefined, function(){
                indicador_actividad.tipo_meta_old = indicador_actividad.tipo_meta;
                indicador_actividad.direccion_meta_old = indicador_actividad.direccion_meta;
            });

            indicador_actividad.form.schemas.insert.fecha_inicio = FORM.schemasType.calculated;
            indicador_actividad.form.schemas.insert.fecha_fin = FORM.schemasType.calculated;

            var f = new Date();
            var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();


            indicador_actividad.form.after.insert = function (data) {
                var groupInsert = [];
                for (let i = 0; i < indicador_actividad.list_mes.length; i++) {
                    try {
                        groupInsert.push({
                            "indicador_actividad": data.inserted.id,
                            "created_at": fecha,
                            "created_by": user.usuario_id,
                            "valor": DSON.OSO((indicador_actividad.tipo_meta == "5" && eval(`indicador_actividad.periodos${indicador_actividad.list_mes[i]}`) ? eval(`indicador_actividad.periodos${indicador_actividad.list_mes[i]}`).replace('$', '') : eval(`indicador_actividad.periodos${indicador_actividad.list_mes[i]}`)) || ""),
                            "periodo": indicador_actividad.list_mes[i]
                        });
                    } catch (e) {
                        groupInsert.push({
                            "indicador_actividad": data.inserted.id,
                            "created_at": fecha,
                            "created_by": user.usuario_id,
                            "valor": "",
                            "periodo": indicador_actividad.list_mes[i]
                        });
                    }
                }

                BASEAPI.insert('indicador_actividad_periodo', groupInsert, function (result) {
                    indicador_actividad.linea_base = indicador_actividad.linea_base.replace('$', '');
                    indicador_actividad.list_mes = [];
                    for (var i in indicador_actividad) if (i.indexOf("periodos") !== -1) eval(`delete indicador_actividad.${i}`);
                });

                return false;
            };


            indicador_actividad.form.after.update = function (data) {

                indicador_actividad.linea_base = indicador_actividad.linea_base.replace('$', '');
                indicador_actividad.list_indicador_actividad_periodo = [];
                for (var i in indicador_actividad) if (i.indexOf("periodos") !== -1) eval(`delete indicador_actividad.${i}`);
                return false;
            };

            indicador_actividad.$scope.$watch('indicador_actividad.ws_connection_field', async function (value) {
                await indicador_actividad.runws(value, "resultExterno");
                indicador_actividad.refreshAngular();
            });

            indicador_actividad.$scope.$watch('indicador_actividad.departamento', function (value) {
                // indicador_actividad.range_date = "";
                // indicador_actividad.refreshAngular();
                if (value == undefined || value === "[NULL]") {
                    console.log("diomedes 01");
                    if (indicador_actividad.producto) {
                        console.log("diomedes 02");
                        indicador_actividad.range_date = "";
                    } else if (indicador_actividad.producto == "[NULL]") {
                        console.log("diomedes 03");
                        indicador_actividad.range_date = "";
                    }
                }
            });

            indicador_actividad.$scope.$watch('indicador_actividad.nombre', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_actividad, "nombre", rules)
            });

            indicador_actividad.$scope.$watch('indicador_actividad.producto', function (value) {
                if (value == undefined || value === "[NULL]") {
                    indicador_actividad.range_date = "";
                }
                if (indicador_actividad.form.selected('producto') != null) {
                    indicador_actividad.fecha_inicio = indicador_actividad.form.selected('producto').fecha_inicio;
                    indicador_actividad.fecha_fin = indicador_actividad.form.selected('producto').fecha_fin;
                    indicador_actividad.range_date = LAN.date(indicador_actividad.fecha_inicio) + " - " + LAN.date(indicador_actividad.fecha_fin);
                } else {
                    indicador_actividad.range_date = "";
                    indicador_actividad.refreshAngularCustom();
                }
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_actividad, "producto", rules)
            });

            indicador_actividad.$scope.$watch('indicador_actividad.fuente', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_actividad, "fuente", rules)
            });


            indicador_actividad.$scope.$watch('indicador_actividad.tipo_meta', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                if (indicador_actividad.list_indicador_actividad_periodo.length > 0 && indicador_actividad.form.mode == "edit"){
                    rules.push(VALIDATION.yariel.meta_alcanzada_indicador(indicador_actividad.list_indicador_actividad_periodo, "Tipo de dato de la meta",indicador_actividad.tipo_meta_old,indicador_actividad.tipo_meta, function (result){
                        if (!result){
                            indicador_actividad.initiation = true;
                        }
                    }));
                }
                VALIDATION.validate(indicador_actividad, "tipo_meta", rules);
                if (value && (!indicador_actividad.initiation)) {
                    $(".clearHtml").html('');
                    indicador_actividad.applyMasks();
                }
            });

            indicador_actividad.$scope.$watch('indicador_actividad.direccion_meta', function (value) {
                var rules = [];
                if (indicador_actividad.list_indicador_actividad_periodo.length > 0 && indicador_actividad.form.mode == "edit"){
                    rules.push(VALIDATION.yariel.meta_alcanzada_indicador(indicador_actividad.list_indicador_actividad_periodo, "Dirección de la meta",indicador_actividad.direccion_meta_old,indicador_actividad.direccion_meta));
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_actividad, "direccion_meta", rules)
            });

            indicador_actividad.$scope.$watch('indicador_actividad.ano_linea_base', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_actividad, "ano_linea_base", rules)
            });
            indicador_actividad.$scope.$watch('indicador_actividad.linea_base', function (value) {
                indicador_actividad.linea_base = value ? value.replace("$", "") : value;
                var rules = [];
                if (value == "" || value == null)
                    rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_actividad, "linea_base", rules)
            });
            indicador_actividad.$scope.$watch('indicador_actividad.actividades_poa', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_actividad, "actividades_poa", rules)
            });
            indicador_actividad.$scope.$watch('indicador_actividad.medio_verificacion', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_actividad, "medio_verificacion", rules)
                VALIDATION.validate(indicador_actividad, "medio_verificacion", rules)
            });
            // indicador_actividad.$scope.$watch('indicador_actividad.actividad_monitoreo', function (value) {
            //     var rules = [];
            //     VALIDATION.validate(indicador_actividad, "actividad_monitoreo", rules);
            //     if (indicador_actividad.actividad_monitoreo == "[NULL]") {
            //         $(".clearHtml").html('');
            //         indicador_actividad.getIMesNew(user.cantidad);
            //     }
            //     else {
            //         if ((indicador_actividad.tipo_meta != "[NULL]" && value) && (!indicador_actividad.initiation)) {
            //             indicador_actividad.getIMesNew(indicador_actividad.form.selected('actividad_monitoreo').cantidad);
            //             $(".clearHtml").html('');
            //             indicador_actividad.applyMasks();
            //         }
            //     }
            // });
            indicador_actividad.$scope.$watch('indicador_actividad.metodo_calculo', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_actividad, "metodo_calculo", rules)
                VALIDATION.validate(indicador_actividad, "metodo_calculo", rules)

            });
            indicador_actividad.$scope.$watch('indicador_actividad.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_actividad, "descripcion", rules)
            });
            // indicador_actividad.$scope.$watch('indicador_actividad.indicador_poa', function (value) {
            //     var rules = [];
            //     VALIDATION.validate(indicador_actividad, "indicador_poa", rules);
            //     // if (indicador_actividad.indicador_poa == "[NULL]") {
            //     //     $(".clearHtml").html('');
            //     // }
            //     // else {
            //     //     console.log("este es el else");
            //     //     if ((indicador_actividad.tipo_meta != "[NULL]" && value) && (!indicador_actividad.initiation)) {
            //     //         $(".clearHtml").html('');
            //     //         indicador_actividad.applyMasks();
            //     //     }
            //     // }
            // });
            indicador_actividad.$scope.$watch('indicador_actividad.indicador_poa', function (value) {
                var rules = [];
                if (indicador_actividad.form.selected("indicador_poa")) {
                    indicador_actividad.tipo_meta = indicador_actividad.form.selected("indicador_poa").tipo_meta + "";
                    indicador_actividad.form.loadDropDown('tipo_meta');
                    indicador_actividad.form.options.tipo_meta.disabled = true;
                } else {
                    if (indicador_actividad.form.options.tipo_meta) {
                        indicador_actividad.form.options.tipo_meta.disabled = false;
                        indicador_actividad.form.loadDropDown('tipo_meta');
                    }
                }
                indicador_actividad.refreshAngular();
            });


        }
    };
    indicador_actividad.refreshAngularCustom = function () {
        indicador_actividad.refreshAngular();
    }
});
