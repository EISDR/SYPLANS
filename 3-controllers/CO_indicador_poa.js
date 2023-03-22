app.controller("indicador_poa", function ($scope, $http, $compile) {
    indicador_poa = this;
    var user = new SESSION().current();
    indicador_poa.session = user;
    indicador_poa.colspan = user.cantidad * 3;
    indicador_poa.periodolist = [];
    var paso = true;
    for (var p = 1; p <= user.cantidad; p++) {
        indicador_poa.periodolist.push({periodo: user.monitoreo_nombre + ' ' + p});
    }
    indicador_poa.colpad = [];
    var rs_pad = indicador_poa.colspan, count_pda = 0,
        arr_pad = ['P', 'A', 'D'];
    for (var i = 0; i < rs_pad; i++) {
        indicador_poa.colpad.push(arr_pad[count_pda]);
        count_pda += 1;
        if (count_pda > 2) {
            count_pda = 0;
        }
    }

    var ignore_once = true;


    indicador_poa.departamento_list = eval(indicador_poa.session.departamentos_y_secundarios) || indicador_poa.session.departamento;
    indicador_poa.dont_show_productos = false;
    indicador_poa.set_border = function (column) {
        if (column == 'P') {
            return {'border-left': "1px solid"};
        } else if (column == 'D') {
            return {'border-right': "1px solid"};
        }
    };

    indicador_poa.set_title = function (column) {
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

    indicador_poa.conditionPoa = {
        poa_id: user.poa_id,
        compania_id: user.compania_id
    };
    indicador_poa.group_caracteristica = user.groups[0] ? user.groups[0].caracteristica : '';
    indicador_poa.paso = true;

    indicador_poa.delete_relation = (id) => new Promise((resolve, reject) => {

        BASEAPI.list('indicador_poa_periodo', {
            limit: 0,
            "where": [
                {
                    "field": "indicador_poa",
                    "value": id,
                }
            ]
        }, function (response) {

            indicador_poa.eliminar = false;
            indicador_poa.rs = response.data;

            for (var i = 0; i < indicador_poa.rs.length; i++) {
                if (indicador_poa.rs[i].valor_alcanzado && indicador_poa.rs[i].valor_alcanzado != "0.00") {
                    indicador_poa.eliminar = true;
                    break;
                }
            }
            resolve(1);
            if (indicador_poa.eliminar == false) {
                // SERVICE.planificacion_transfer.deleteindicadorpoa({indicador_poa_id: id}, function (result) {
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
        indicador_poa.list_tipo_meta = rsm.data;
    });
    BASEAPI.list('direccionMeta', {}, function (rsd) {
        indicador_poa.list_direccion_meta = rsd.data;
    });
    indicador_poa.check_poa = function () {
        BASEAPI.list("vw_poa", {
            where: [
                {
                    field: "id",
                    value: user.poa_id
                }
            ]
        }, function (results) {
            console.log(results.data[0].activo);
            indicador_poa.poa_activo = results.data[0].activo;
        });
        if (indicador_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || indicador_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            BASEAPI.list("vw_presupuesto_aprobado", {
                limit: 0,
                where: [
                    {
                        field: "poa",
                        value: user.poa_id
                    },
                    {
                        field: 'departamento_id',
                        value: indicador_poa.departamento_list
                    }
                ]
            }, function (res) {
                indicador_poa.dpto_usuario = res.data.length;
                indicador_poa.dpto_usuario_autorizado = res.data.filter(d => {
                    return d.id_estatus === ENUM_2.presupuesto_estatus.Completo || d.id_estatus === ENUM_2.presupuesto_estatus.Trabajado
                }).length;
                indicador_poa.refreshAngular();
                if (MODAL.history.length > 0) {
                    $('.icon-plus-circle2 ').parent().hide();
                    if (typeof productos_poa !== 'undefined') {
                        if (typeof productos_poa !== 'not defined') {
                            if (productos_poa) {
                                indicador_poa.dont_show_productos = true;
                                $('.icon-plus-circle2 ').parent().show();
                            }
                        }
                    }
                } else {
                    if (indicador_poa.dpto_usuario != indicador_poa.dpto_usuario_autorizado) {
                        $('.icon-plus-circle2 ').parent().show();
                        indicador_poa.setPermission("edit", true);
                        indicador_poa.setPermission("remove", true);
                    } else {
                        $('.icon-plus-circle2 ').parent().hide();
                        indicador_poa.setPermission("edit", false);
                        indicador_poa.setPermission("remove", false);
                    }
                    console.log(res.data.length);
                }
            });
        } else {
            BASEAPI.list("vw_presupuesto_aprobado", {
                limit: 0,
                where: [
                    {
                        field: "poa",
                        value: user.poa_id
                    }
                ]
            }, function (res) {
                indicador_poa.total_departamentos = res.data.length;
                console.log(indicador_poa.total_departamentos);
                indicador_poa.refreshAngular();
                BASEAPI.list("vw_presupuesto_departamento", {
                    limit: 0,
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
                    indicador_poa.departamentos_autorizados = res.data.length;
                    console.log(indicador_poa.departamentos_autorizados);
                    indicador_poa.refreshAngular();

                    if (indicador_poa.total_departamentos == indicador_poa.departamentos_autorizados) {
                        $('.icon-plus-circle2 ').parent().hide();
                    } else {
                        $('.icon-plus-circle2 ').parent().show();
                    }
                });
            });
        }
    };

    RUNCONTROLLER("indicador_poa", indicador_poa, $scope, $http, $compile);
    indicador_poa.plural = "Indicadores de Proyecto/Producto";
    indicador_poa.singular = "Indicadores de Proyecto/Producto";
    indicador_poa.setPermission("export", false);
    getPOAstatus(indicador_poa, user.poa_id);

    title_header_table_poa(indicador_poa, indicador_poa.session.tipo_institucion == 1 ? MESSAGE.i('planificacion.titleindicadores_poa') : "Indicadores de Proyecto/Plan de Acción");


    indicador_poa.triggers.table.after.load = async function (records) {
        if (user.presupuesto_id === null)
            $('.icon-plus-circle2 ').parent().hide();
        indicador_poa.runMagicColum('tipo_meta', 'tipoMeta', "id", "nombre");
        indicador_poa.runMagicColum('direccion_meta', 'direccionMeta', "id", "nombre");
        indicador_poa.runMagicManyToMany('caracteristica', "caracteristica_indicador", "indicador_poa", "id", 'nombre', "caracteristica_indicador_poa", "caracteristica", "id");
        indicador_poa.check_poa();
        check_poa_close(indicador_poa, user);
        indicador_poa.columns().metas = {
            label: "metas", shorttext: 370, sorted: false, order: "asc", sortable: false, export: false
        };
        $('.has-colspan').attr('rowspan', 3);
        $('.has-colspan').css('vertical-align', 'middle');
        BASEAPI.listp('vw_indicador_poa_periodo', {
            limit: 0,
            where: [{
                field: "poa",
                value: user.poa_id
            }]
        }).then(function (rs) {
            if (rs.data) {
                indicador_poa.pei_ano = rs.data;
                for (var c = 1; c <= user.cantidad; c++) {
                    for (var l = 0; l < indicador_poa.records.data.length; l++) {
                        selected = indicador_poa.pei_ano.filter(information => {
                            if (information.indicador_poa == indicador_poa.records.data[l].id && information.periodo == c) {
                                return true;
                            }
                        });
                        eval(`
							if( typeof indicador_poa.records.data[${l}].periodo == 'undefined'){
								indicador_poa.records.data[${l}].periodo = [];
							}
                    	`);
                        if (selected.length > 0) {
                            eval(`indicador_poa.records.data[${l}].periodo.push("${selected[0].valor}")`);
                            eval(`indicador_poa.records.data[${l}].periodo.push("${selected[0].valor_alcanzado}")`);
                            eval(`indicador_poa.records.data[${l}].periodo.push("${selected[0].varianzas}")`);
                        } else {
                            eval(`indicador_poa.records.data[${l}].periodo.push("")`);
                            eval(`indicador_poa.records.data[${l}].periodo.push("")`);
                            eval(`indicador_poa.records.data[${l}].periodo.push("")`);
                        }

                    }
                }
                indicador_poa.refreshAngular();
            }
        });
        for (var i of indicador_poa.records.data) {
            if (i.id_estatus == ENUM_2.presupuesto_estatus.Completado || i.id_estatus == ENUM_2.presupuesto_estatus.Trabajado) {
                console.log("entre");
                if (user.groups[0].caracteristica == ENUM_2.Grupos.director_departamental || user.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                    indicador_poa.dont_show = true;
                } else {
                    indicador_poa.dont_show = false;
                }
            }
        }
    };
    indicador_poa.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        if (LAN.money(indicador_poa.ano_linea_base).value > LAN.money(indicador_poa.session.periodo_poa).value) {
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
    indicador_poa.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        if (LAN.money(indicador_poa.ano_linea_base).value > LAN.money(indicador_poa.session.periodo_poa).value) {
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
            if (indicador_poa.ano_linea_base)
                data.updating.ano_linea_base = indicador_poa.ano_linea_base;
            if (indicador_poa.linea_base)
                data.updating.linea_base = indicador_poa.linea_base;


            var f = new Date();
            var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
            var user = new SESSION().current();
            for (var key in indicador_poa.valores) {
                await BASEAPI.updateallp('indicador_poa_periodo', {
                    "valor": indicador_poa.tipo_meta == "5" && eval(`indicador_poa.periodos${key}`) ? eval(`indicador_poa.periodos${key}`).replace('$', '') : eval(`indicador_poa.periodos${key}`),
                    "updated_at": fecha,
                    "created_by": user.usuario_id,
                    where: [{
                        "field": "id",
                        "value": key
                    }]
                });
            }
            indicador_poa.linea_base = indicador_poa.linea_base.replace('$', '');
            indicador_poa.list_indicador_poa_periodo = [];
            for (var i in indicador_poa) if (i.indexOf("periodos") !== -1) eval(`delete indicador_poa.${i}`);
            resolve(true);
        }
    });

    indicador_poa.list_indicador_poa_periodo = [];
    indicador_poa.valores = [];
    indicador_poa.list_mes = [];


    if (indicador_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || indicador_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
        indicador_poa.departamento = user.departamento;
        var departamentoss = new SESSION().current().departamentos_y_secundarios;
        if (departamentoss) {
            indicador_poa.fixFilters = [
                {
                    "field": "poa",
                    "value": user.poa_id
                },
                {
                    "field": "departamento",
                    "value": eval(departamentoss)
                }
            ];
        } else {
            indicador_poa.fixFilters = [
                {
                    "field": "poa",
                    "value": user.poa_id
                },
                {
                    "field": "departamento",
                    "value": indicador_poa.departamento
                }
            ];
        }

    } else {

        if (!new SESSION().current().intersectorial) {
            indicador_poa.fixFilters = [
                {
                    "field": "poa",
                    "value": user.poa_id
                }
            ];
        }
    }

    if (typeof productos_poa != "undefined") {
        if (typeof productos_poa !== 'not defined') {
            if (productos_poa) {
                if (paso) {
                    indicador_poa.fixFilters = [];
                }
                paso = false;
            }
        }
    }
    indicador_poa.getIMesNew = function () {
        if (indicador_poa.form.mode === FORM.modes.new) {
            indicador_poa.list_mes = [];
            indicador_poa.valores = [];
            indicador_poa.limpiar = false;
            for (var s = 1; s <= user.cantidad; s++) {
                indicador_poa.list_mes.push(s);
            }
            for (var i of indicador_poa.list_mes) {
                eval(`indicador_poa.form.schemas.insert.periodos${i} = FORM.schemasType.calculated`);
            }
            indicador_poa.control.input("#subcontainerLineaBase", "linea_base", {
                maxlength: 11, popover: {
                    title: "Línea Base",
                    content: "Captura la  Línea Base"
                }
            }, false, '', "Línea Base", false);
        }
    };

    indicador_poa.getIDedit = function () {
        if (indicador_poa.form.mode === FORM.modes.edit) {
            indicador_poa.list_indicador_poa_periodo = [];
            indicador_poa.valores = [];
            indicador_poa.limpiar = false;
            BASEAPI.listp('indicador_poa_periodo', {
                limit: 0,
                page: 1,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "indicador_poa",
                    value: indicador_poa.id
                }]
            }).then(function (result) {
                indicador_poa.list_indicador_poa_periodo = result.data;

                for (var key in indicador_poa.list_indicador_poa_periodo) {
                    indicador_poa.valores[indicador_poa.list_indicador_poa_periodo[key].id] = indicador_poa.list_indicador_poa_periodo[key].valor;
                    eval(`indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id} = indicador_poa.list_indicador_poa_periodo[key].valor`);
                    eval(`indicador_poa.form.schemas.insert.periodos${indicador_poa.list_indicador_poa_periodo[key].id} = FORM.schemasType.calculated`);

                }
                indicador_poa.applyMasks();
                indicador_poa.refreshAngular();
            });
        }
    };

    indicador_poa.formulary = function (data, mode, defaultData) {
        if (indicador_poa !== undefined) {
            indicador_poa.initiation = true;
            indicador_poa.triggers.table.after.control = function (data) {
                if (data == 'producto') {
                    if (indicador_poa.form.selected('producto') !== null) {
                        indicador_poa.fecha_inicio = indicador_poa.form.selected('producto').fecha_inicio;
                        indicador_poa.fecha_fin = indicador_poa.form.selected('producto').fecha_fin;
                        indicador_poa.range_date = LAN.date(indicador_poa.fecha_inicio) + " - " + LAN.date(indicador_poa.fecha_fin);
                    }
                    if (indicador_poa.paso) {
                        if (mode == 'edit') {
                            if (indicador_poa.form.selected('producto') != null) {
                                indicador_poa.departamento = indicador_poa.form.selected('producto').departamento;
                            }
                            indicador_poa.form.loadDropDown('departamento');
                            indicador_poa.paso = false;
                        }
                    }
                }
                if (data == 'departamento') {
                    if (indicador_poa.paso) {
                        if (indicador_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental || indicador_poa.group_caracteristica == ENUM_2.Grupos.director_departamental) {
                            indicador_poa.form.loadDropDown('departamento');
                            indicador_poa.paso = false;
                        } else if (mode == 'new') {
                            indicador_poa.form.loadDropDown('departamento');
                            indicador_poa.paso = false;
                        }
                    }
                }

                if (data == 'indicador_pei') {
                    if (indicador_poa.form.selected("indicador_pei")) {
                        indicador_poa.tipo_meta = indicador_poa.form.selected("indicador_pei").tipo_meta + "";
                        indicador_poa.form.options.tipo_meta.disabled = true;
                        indicador_poa.form.loadDropDown('tipo_meta');

                    }
                }
                if (data == "tipo_meta" && mode != "new" && indicador_poa.initiation) {
                    $(".subcontainer2").html('');
                    indicador_poa.getIDedit();
                    indicador_poa.initiation = false;
                }
                if (data == "tipo_meta" && mode == "new" && indicador_poa.initiation) {
                    $(".subcontainer1").html('');
                    indicador_poa.getIMesNew();
                    indicador_poa.initiation = false;
                }
            };
            indicador_poa.triggers.table.after.close = function () {
                indicador_poa.paso = true;
                indicador_poa.dont_show_productos = false;
            };
            RUN_B("indicador_poa", indicador_poa, $scope, $http, $compile);
            indicador_poa.selectQueries["producto"] = [
                {
                    field: "poa",
                    operator: "=",
                    value: user.poa_id ? user.poa_id : 0
                }
            ];
            if (indicador_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || indicador_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                indicador_poa.selectQueries['departamento'] = [
                    {
                        "field": "compania",
                        "operator": "=",
                        "value": indicador_poa.session.compania_id
                    },
                    {
                        "field": "estatus",
                        "operator": "!=",
                        "value": 3
                    },
                    {
                        "field": "poa",
                        "operator": "=",
                        "value": indicador_poa.session.poa_id
                    },
                    {
                        "field": "id",
                        "value": indicador_poa.departamento_list
                    }
                ];
            } else {
                indicador_poa.selectQueries['departamento'] = [
                    {
                        "field": "compania",
                        "operator": "=",
                        "value": indicador_poa.session.compania_id
                    },
                    {
                        "field": "estatus",
                        "operator": "!=",
                        "value": 3
                    },
                    {
                        "field": "poa",
                        "operator": "=",
                        "value": indicador_poa.session.poa_id
                    }
                ];
            }
            indicador_poa.form.schemas.insert.departamento = FORM.schemasType.calculated;


            indicador_poa.no_trabaja_poa = function () {
                if (indicador_poa.group_caracteristica != ENUM_2.Grupos.analista_departamental && indicador_poa.group_caracteristica != ENUM_2.Grupos.director_departamental) {
                    return true;
                } else {
                    return false;
                }
            };
            indicador_poa.form.titles = {
                new: indicador_poa.session.tipo_institucion == 1 ? "Nuevo - " + MESSAGE.i('planificacion.titleindicador_poa') : "Nuevo - Indicador de Proyecto/Plan de Acción",
                edit: indicador_poa.session.tipo_institucion == 1 ? "Editar - " + `${MESSAGE.i('planificacion.titleindicador_poa')}` : "Editar - Indicador de Proyecto/Plan de Acción",
                view: indicador_poa.session.tipo_institucion == 1 ? "Ver ALL - " + `${MESSAGE.i('planificacion.titleindicador_poa')}` : "Ver - Indicador de Proyecto/Plan de Acción"
            };

            indicador_poa.applyMasks = async function () {
                indicador_poa.applyMasksfalse = true;
                switch (indicador_poa.tipo_meta) {
                    case "2": {
                        await indicador_poa.control.indice("#subcontainerLineaBase", "linea_base", {
                            maxlength: 1, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_poa.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_poa.list_mes) {
                                await indicador_poa.control.indice(".subcontainer1", "periodos" + indicador_poa.list_mes[key], {
                                    maxlength: 1, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_poa, `indicador_poa.periodos${indicador_poa.list_mes[key]}`, `periodos${indicador_poa.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_poa.list_indicador_poa_periodo) {
                                await indicador_poa.control.indice(".subcontainer2", "periodos" + indicador_poa.list_indicador_poa_periodo[key].id, {
                                    maxlength: 1, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_poa, `indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id}`, `periodos${indicador_poa.list_indicador_poa_periodo[key].id}`);
                                eval(`
						            if(indicador_poa.limpiar){
							            indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id} = "";
							            indicador_poa.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_poa.limpiar = true;
                        break;
                    }
                    case "5": {
                        await indicador_poa.control.money("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_poa.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_poa.list_mes) {
                                await indicador_poa.control.money(".subcontainer1", "periodos" + indicador_poa.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_poa, `indicador_poa.periodos${indicador_poa.list_mes[key]}`, `periodos${indicador_poa.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_poa.list_indicador_poa_periodo) {
                                await indicador_poa.control.money(".subcontainer2", "periodos" + indicador_poa.list_indicador_poa_periodo[key].id, {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_poa, `indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id}`, `periodos${indicador_poa.list_indicador_poa_periodo[key].id}`);
                                eval(`
						            if(indicador_poa.limpiar){
							            indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id} = "";
							            indicador_poa.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_poa.limpiar = true;
                        break;
                    }
                    case "4": {
                        await indicador_poa.control.decimal("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_poa.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_poa.list_mes) {
                                await indicador_poa.control.decimal(".subcontainer1", "periodos" + indicador_poa.list_mes[key], {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_poa, `indicador_poa.periodos${indicador_poa.list_mes[key]}`, `periodos${indicador_poa.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_poa.list_indicador_poa_periodo) {
                                await indicador_poa.control.decimal(".subcontainer2", "periodos" + indicador_poa.list_indicador_poa_periodo[key].id, {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_poa, `indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id}`, `periodos${indicador_poa.list_indicador_poa_periodo[key].id}`);
                                eval(`
						            if(indicador_poa.limpiar){
							            indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id} = "";
							            indicador_poa.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_poa.limpiar = true;
                        break;
                    }
                    case "1": {
                        await indicador_poa.control.percentage("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_poa.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_poa.list_mes) {
                                await indicador_poa.control.percentage(".subcontainer1", "periodos" + indicador_poa.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_poa, `indicador_poa.periodos${indicador_poa.list_mes[key]}`, `periodos${indicador_poa.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_poa.list_indicador_poa_periodo) {
                                await indicador_poa.control.percentage(".subcontainer2", "periodos" + indicador_poa.list_indicador_poa_periodo[key].id, {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_poa, `indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id}`, `periodos${indicador_poa.list_indicador_poa_periodo[key].id}`);
                                eval(`
						            if(indicador_poa.limpiar){
							            indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id} = "";
							            indicador_poa.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_poa.limpiar = true;
                        break;
                    }
                    case "6": {
                        await indicador_poa.control.integer("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_poa.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_poa.list_mes) {
                                await indicador_poa.control.integer(".subcontainer1", "periodos" + indicador_poa.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_poa, `indicador_poa.periodos${indicador_poa.list_mes[key]}`, `periodos${indicador_poa.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_poa.list_indicador_poa_periodo) {
                                await indicador_poa.control.integer(".subcontainer2", "periodos" + indicador_poa.list_indicador_poa_periodo[key].id, {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_poa, `indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id}`, `periodos${indicador_poa.list_indicador_poa_periodo[key].id}`);
                                eval(`
						            if(indicador_poa.limpiar){
							            indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id} = "";
							            indicador_poa.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_poa.limpiar = true;
                        break;
                    }
                    case "3": {
                        //absoluto
                        await indicador_poa.control.valor_absoluto("#subcontainerLineaBase", "linea_base", {
                            maxlength: 11, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_poa.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_poa.list_mes) {
                                await indicador_poa.control.valor_absoluto(".subcontainer1", "periodos" + indicador_poa.list_mes[key], {
                                    maxlength: 11, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadoresValorAbsoluto(indicador_poa, `indicador_poa.periodos${indicador_poa.list_mes[key]}`, `periodos${indicador_poa.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_poa.list_indicador_poa_periodo) {
                                await indicador_poa.control.valor_absoluto(".subcontainer2", "periodos" + indicador_poa.list_indicador_poa_periodo[key].id, {
                                    maxlength: 11, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadoresValorAbsoluto(indicador_poa, `indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id}`, `periodos${indicador_poa.list_indicador_poa_periodo[key].id}`);
                                eval(`
						            if(indicador_poa.limpiar){
							            indicador_poa.periodos${indicador_poa.list_indicador_poa_periodo[key].id} = "";
							            indicador_poa.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_poa.limpiar = true;
                        break;
                    }
                    default: {

                    }

                }
                indicador_poa.applyMasksfalse = false;
                indicador_poa.refreshAngular();
                delete indicador_poa.yadata;
                if (indicador_poa.clicaalgo)
                    indicador_poa.clicaalgo();
            };

            indicador_poa.form.readonly = {};

            indicador_poa.createForm(data, mode, defaultData,undefined, function(){
                indicador_poa.tipo_meta_old = indicador_pei.tipo_meta;
                indicador_poa.direccion_meta_old = indicador_pei.direccion_meta;
            });

            indicador_poa.form.schemas.insert.fecha_inicio = FORM.schemasType.calculated;
            indicador_poa.form.schemas.insert.fecha_fin = FORM.schemasType.calculated;

            var f = new Date();
            var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();


            indicador_poa.form.after.insert = function (data) {
                var groupInsert = [];
                for (let i = 0; i < indicador_poa.list_mes.length; i++) {
                    groupInsert.push({
                        "indicador_poa": data.inserted.id,
                        "created_at": fecha,
                        "created_by": user.usuario_id,
                        "valor": (indicador_poa.tipo_meta == "5" && eval(`indicador_poa.periodos${indicador_poa.list_mes[i]}`) ? eval(`indicador_poa.periodos${indicador_poa.list_mes[i]}`).replace('$', '') : eval(`indicador_poa.periodos${indicador_poa.list_mes[i]}`)) || 0,
                        "periodo": indicador_poa.list_mes[i]
                    });
                }
                BASEAPI.insert('indicador_poa_periodo', groupInsert, function (result) {

                });
                indicador_poa.linea_base = indicador_poa.linea_base.replace('$', '');
                indicador_poa.list_mes = [];
                for (var i in indicador_poa) if (i.indexOf("periodos") !== -1) eval(`delete indicador_poa.${i}`);
                return false;
            };


            indicador_poa.form.after.update = async function (data) {
                for (var key in indicador_poa.valores) {
                    await BASEAPI.updateallp('indicador_poa_periodo', {
                        "valor": indicador_poa.tipo_meta == "5" && eval(`indicador_poa.periodos${key}`) ? eval(`indicador_poa.periodos${key}`).replace('$', '') : eval(`indicador_poa.periodos${key}`),
                        "updated_at": fecha,
                        "created_by": user.usuario_id,
                        where: [{
                            "field": "id",
                            "value": key
                        }]
                    });
                }
                indicador_poa.linea_base = indicador_poa.linea_base.replace('$', '');
                indicador_poa.list_indicador_poa_periodo = [];
                for (var i in indicador_poa) if (i.indexOf("periodos") !== -1) eval(`delete indicador_poa.${i}`);
                return false;
            };

            indicador_poa.$scope.$watch('indicador_poa.ws_connection_field', async function (value) {
                await indicador_poa.runws(value, "resultExterno");
                indicador_poa.refreshAngular();
            });

            indicador_poa.$scope.$watch('indicador_poa.departamento', function (value) {
                // indicador_poa.range_date = "";
                // indicador_poa.refreshAngular();
                if (value == undefined || value === "[NULL]") {
                    console.log("diomedes 01");
                    if (indicador_poa.producto) {
                        console.log("diomedes 02");
                        indicador_poa.range_date = "";
                    } else if (indicador_poa.producto == "[NULL]") {
                        console.log("diomedes 03");
                        indicador_poa.range_date = "";
                    }
                }
            });

            indicador_poa.$scope.$watch('indicador_poa.nombre', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_poa, "nombre", rules)
            });

            indicador_poa.$scope.$watch('indicador_poa.producto', function (value) {
                if (value == undefined || value === "[NULL]") {
                    indicador_poa.range_date = "";
                }
                if (indicador_poa.form.selected('producto') != null) {
                    indicador_poa.fecha_inicio = indicador_poa.form.selected('producto').fecha_inicio;
                    indicador_poa.fecha_fin = indicador_poa.form.selected('producto').fecha_fin;
                    indicador_poa.range_date = LAN.date(indicador_poa.fecha_inicio) + " - " + LAN.date(indicador_poa.fecha_fin);
                } else {
                    indicador_poa.range_date = "";
                    indicador_poa.refreshAngularCustom();
                }
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_poa, "producto", rules)
            });
            if (typeof productos_poa != "undefined") {
                if (productos_poa) {
                    if (typeof productos_poa !== 'not defined') {
                        indicador_poa.$scope.$watch('indicador_poa.producto', function (value) {
                            if (value == undefined || value === "[NULL]") {
                                indicador_poa.range_date = "";
                            }
                            if (indicador_poa.form.selected('producto') != null) {
                                indicador_poa.fecha_inicio = indicador_poa.form.selected('producto').fecha_inicio;
                                indicador_poa.fecha_fin = indicador_poa.form.selected('producto').fecha_fin;
                                indicador_poa.range_date = LAN.date(indicador_poa.fecha_inicio) + " - " + LAN.date(indicador_poa.fecha_fin);
                            } else {
                                indicador_poa.range_date = "";
                                indicador_poa.refreshAngularCustom();
                            }
                            var rules = [];
                            VALIDATION.validate(indicador_poa, "producto", rules)
                        });
                    }
                }
            }
            indicador_poa.$scope.$watch('indicador_poa.fuente', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_poa, "fuente", rules)
            });


            indicador_poa.$scope.$watch('indicador_poa.tipo_meta', function (value) {
                var rules = [];
                if (indicador_poa.list_indicador_poa_periodo.length > 0 && indicador_poa.form.mode == "edit"){
                    rules.push(VALIDATION.yariel.meta_alcanzada_indicador(indicador_poa.list_indicador_poa_periodo, "Tipo de dato de la meta",indicador_poa.tipo_meta_old,indicador_poa.tipo_meta));
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_poa, "tipo_meta", rules)
                if (value && (!indicador_poa.initiation)) {
                    $(".clearHtml").html('');
                    indicador_poa.applyMasks();
                }
            });

            indicador_poa.$scope.$watch('indicador_poa.direccion_meta', function (value) {
                var rules = [];
                if (indicador_poa.list_indicador_poa_periodo.length > 0 && indicador_poa.form.mode == "edit"){
                    rules.push(VALIDATION.yariel.meta_alcanzada_indicador(indicador_poa.list_indicador_poa_periodo, "Dirección de la meta",indicador_poa.direccion_meta_old,indicador_poa.direccion_meta));
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_poa, "direccion_meta", rules)
            });

            indicador_poa.$scope.$watch('indicador_poa.ano_linea_base', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_poa, "ano_linea_base", rules)
            });
            indicador_poa.$scope.$watch('indicador_poa.linea_base', function (value) {
                indicador_poa.linea_base = value ? value.replace("$", "") : value;
                var rules = [];
                if (value == "" || value == null)
                    rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_poa, "linea_base", rules)
            });

            indicador_poa.$scope.$watch('indicador_poa.medio_verificacion', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_poa, "medio_verificacion", rules)
                VALIDATION.validate(indicador_poa, "medio_verificacion", rules)
            });

            indicador_poa.$scope.$watch('indicador_poa.metodo_calculo', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_poa, "metodo_calculo", rules)
                VALIDATION.validate(indicador_poa, "metodo_calculo", rules)

            });
            indicador_poa.$scope.$watch('indicador_poa.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_poa, "descripcion", rules)
            });

            indicador_poa.$scope.$watch('indicador_poa.indicador_pei', function (value) {
                var rules = [];
                if (indicador_poa.form.selected("indicador_pei")) {
                    indicador_poa.tipo_meta = indicador_poa.form.selected("indicador_pei").tipo_meta + "";
                    indicador_poa.form.loadDropDown('tipo_meta');
                    indicador_poa.form.options.tipo_meta.disabled = true;
                } else {
                    indicador_poa.form.loadDropDown('tipo_meta');
                    if (indicador_poa.form.options)
                        if (indicador_poa.form.options.tipo_meta)
                            indicador_poa.form.options.tipo_meta.disabled = false;
                }
                indicador_poa.refreshAngular();
            });

            indicador_poa.triggers.table.after.open = function (data) {
                if (typeof productos_poa !== 'undefined') {
                    if (typeof productos_poa !== 'not defined') {
                        if (productos_poa) {
                            indicador_poa.dont_show_productos = true;
                        }
                    }
                }
            };
            indicador_poa.triggers.table.before.open = () => new Promise((resolve, reject) => {
                if (typeof productos_poa != "undefined") {
                    if (productos_poa) {
                        if (typeof productos_poa !== 'not defined') {
                            if (productos_poa.departamento_object === null || productos_poa.resultado_object === null|| productos_poa.nombre === '' || productos_poa.fecha_inicio === null || productos_poa.fecha_fin === null || productos_poa.fecha_fin === "") {
                                indicador_poa.showMsjSi = true;
                                indicador_poa.showMsjNo = false;
                                resolve(true);
                                return
                            } else {
                                indicador_poa.showMsjSi = false;
                                indicador_poa.showMsjNo = true;
                                resolve(true);
                                return
                            }

                            resolve( false);
                            return
                        }
                    }
                }
                indicador_poa.showMsjNo = true;
                indicador_poa.showMsjSi = false;
                resolve(true);
            });
        }
    };
    indicador_poa.refreshAngularCustom = function () {
        indicador_poa.refreshAngular();
    }
});
