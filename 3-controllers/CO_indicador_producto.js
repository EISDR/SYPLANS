app.controller("indicador_producto", function ($scope, $http, $compile) {
    indicador_producto = this;
    var user = new SESSION().current();
    indicador_producto.colspan = user.cantidad * 3;
    indicador_producto.periodolist = [];
    indicador_producto.headertitle = "Indicadores de Proyectos Especiales";
    indicador_producto.session = user;
    for (var p = 1; p <= user.cantidad; p++) {
        indicador_producto.periodolist.push({periodo: user.monitoreo_nombre + ' ' + p});
    }
    indicador_producto.colpad = [];
    var rs_pad = indicador_producto.colspan, count_pda = 0,
        arr_pad = ['P', 'A', 'D'];
    for (var i = 0; i < rs_pad; i++) {
        indicador_producto.colpad.push(arr_pad[count_pda]);
        count_pda += 1;
        if (count_pda > 2) {
            count_pda = 0;
        }
    }
    indicador_producto.set_border = function (column) {
        if (column == 'P') {
            return {'border-left': "1px solid"};
        } else if (column == 'D') {
            return {'border-right': "1px solid"};
        }
    };

    indicador_producto.set_title = function (column) {
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

    indicador_producto.conditionPoa = {
        poa_id: user.poa_id,
        compania_id: user.compania_id
    };
    indicador_producto.group_caracteristica = user.groups[0] ? user.groups[0].caracteristica : '';
    indicador_producto.paso = true;

    indicador_producto.delete_relation = (id) => new Promise((resolve, reject) => {

        BASEAPI.list('indicador_producto_periodo', {
            "where": [
                {
                    "field": "indicador_proceso",
                    "value": id,
                }
            ]
        }, function (response) {

            indicador_producto.eliminar = false;
            indicador_producto.rs = response.data;

            for (var i = 0; i < indicador_producto.rs.length; i++) {
                if (indicador_producto.rs[i].valor_alcanzado && indicador_producto.rs[i].valor_alcanzado != "0.00") {
                    indicador_producto.eliminar = true;
                    break;
                }
            }

            if (indicador_producto.eliminar == false) {
                SERVICE.planificacion_transfer.deleteindicadorpoa({indicador_producto_id: id}, function (result) {
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
        indicador_producto.list_tipo_meta = rsm.data;
    });
    BASEAPI.list('direccionMeta', {}, function (rsd) {
        indicador_producto.list_direccion_meta = rsd.data;
    });

    RUNCONTROLLER("indicador_producto", indicador_producto, $scope, $http, $compile);
    indicador_producto.plural = "Indicadores de Proyecto/Producto Estratégicos";
    indicador_producto.singular = "Indicadores de Proyecto/Producto Estratégicos";
    getPOAstatus(indicador_producto, user.poa_id);

    indicador_producto.triggers.table.after.load = async function (records) {
        indicador_producto.runMagicColum('tipo_meta', 'tipoMeta', "id", "nombre");
        indicador_producto.runMagicColum('direccion_meta', 'direccionMeta', "id", "nombre");
        indicador_producto.runMagicManyToMany('caracteristica', "caracteristica_indicador", "indicador_producto", "id", 'nombre', "caracteristica_indicador_producto", "caracteristica", "id");
        check_poa_close(indicador_producto, user);
        // indicador_producto.columns().metas = {
        //     label: "metas",
        //     shorttext: 370,
        //     sorted: false,
        //     order: "asc",
        //     sortable: false
        // };
        $('.has-colspan').attr('rowspan', 3);
        $('.has-colspan').css('vertical-align', 'middle');
        for (var i of indicador_producto.records.data) {
            if (i.id_estatus == ENUM_2.presupuesto_estatus.Completado || i.id_estatus == ENUM_2.presupuesto_estatus.Trabajado) {
                console.log("entre");
                if (user.groups[0].caracteristica == ENUM_2.Grupos.director_departamental || user.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                    indicador_producto.dont_show = true;
                } else {
                    indicador_producto.dont_show = false;
                }
            }
        }
    };
    indicador_producto.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        // if (LAN.money(indicador_producto.ano_linea_base).value > LAN.money(indicador_producto.session.periodo_poa).value) {
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
        //     resolve(true);
        // }
        resolve(true)
    });
    indicador_producto.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        // if (LAN.money(indicador_producto.ano_linea_base).value > LAN.money(indicador_producto.session.periodo_poa).value) {
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
        if (indicador_producto.ano_linea_base)
            data.updating.ano_linea_base = indicador_producto.ano_linea_base;
        if (indicador_producto.linea_base)
            data.updating.linea_base = indicador_producto.linea_base;

        var f = new Date();
        var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
        var user = new SESSION().current();
        for (var key in indicador_producto.valores) {
            await BASEAPI.updateallp('indicador_producto_periodo', {
                "valor": indicador_producto.tipo_meta == "5" && eval(`indicador_producto.periodos${key}`) ? eval(`indicador_producto.periodos${key}`).replace('$', '') : eval(`indicador_producto.periodos${key}`),
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

    indicador_producto.list_indicador_producto_periodo = [];
    indicador_producto.valores = [];
    indicador_producto.list_mes = [];


    if (indicador_producto.group_caracteristica == ENUM_2.Grupos.director_departamental || indicador_producto.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
        indicador_producto.departamento = user.departamento;
        var departamentoss = new SESSION().current().departamentos_y_secundarios;


        if (departamentoss) {

            indicador_producto.fixFilters = [
                {
                    "field": "compania",
                    "value": user.compania_id
                },
                {
                    "field": "departamento",
                    "value": indicador_producto.departamento,
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
            indicador_producto.fixFilters = [
                {
                    "field": "compania",
                    "value": user.compania_id
                },
                {
                    "field": "departamento",
                    "value": indicador_producto.departamento
                }
            ];
        }
    } else {
        if (!new SESSION().current().intersectorial) {
            indicador_producto.fixFilters = [
                {
                    "field": "compania",
                    "value": user.compania_id
                }
            ];
        }
    }

    indicador_producto.getIMesNew = function () {
        //agregar el parametro de periodo a la funcion si se va a utilizar los periodos dinamicos
        if (indicador_producto.form.mode === FORM.modes.new) {
            indicador_producto.list_mes = [];
            indicador_producto.valores = [];
            indicador_producto.limpiar = false;
            for (var s = 1; s <= user.cantidad; s++) {
                indicador_producto.list_mes.push(s);
            }
            for (var i of indicador_producto.list_mes) {
                eval(`indicador_producto.form.schemas.insert.periodos${i} = FORM.schemasType.calculated`);
            }
            indicador_producto.control.input("#subcontainerLineaBase", "linea_base", {
                maxlength: 11, popover: {
                    title: "Línea Base",
                    content: "Captura la  Línea Base"
                }
            }, false, '', "Línea Base", false);
            $(".clearHtml").html('');
            indicador_producto.applyMasks();
            indicador_producto.refreshAngular();
        }
    };

    indicador_producto.getIDedit = function () {
        if (indicador_producto.form.mode === FORM.modes.edit) {
            indicador_producto.list_indicador_producto_periodo = [];
            indicador_producto.valores = [];
            indicador_producto.limpiar = false;
            BASEAPI.listp('indicador_producto_periodo', {
                limit: 0,
                page: 1,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "indicador_proceso",
                    value: indicador_producto.id
                }]
            }).then(function (result) {
                indicador_producto.list_indicador_producto_periodo = result.data;
                let exist = baseController.poa_monitorieo.filter(d => {
                    return d.cantidad === result.data.length
                })[0];
                if (exist) {
                    user.monitoreo_nombre = exist.nombre_mostrar;
                } else {
                    user.monitoreo_nombre = "Periodo ";
                }
                for (var key in indicador_producto.list_indicador_producto_periodo) {
                    indicador_producto.valores[indicador_producto.list_indicador_producto_periodo[key].id] = indicador_producto.list_indicador_producto_periodo[key].valor;
                    eval(`indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id} = indicador_producto.list_indicador_producto_periodo[key].valor`);
                    eval(`indicador_producto.form.schemas.insert.periodos${indicador_producto.list_indicador_producto_periodo[key].id} = FORM.schemasType.calculated`);

                }
                indicador_producto.applyMasks();
                indicador_producto.refreshAngular();
            });
        }
    };

    indicador_producto.formulary = function (data, mode, defaultData) {
        if (indicador_producto !== undefined) {
            indicador_producto.initiation = true;
            var do_once = false;
            var do_once_tp = false;
            var validar = false;
            indicador_producto.triggers.table.after.control = function (data) {
                if (data == 'actividades_poa') {
                    if (validar === false && mode === "edit") {
                        validar = true;
                        var lista_mods = [];
                        if (indicador_producto.form.selected('actividades_poa')) {
                            if (indicador_producto.form.selected('actividades_poa').lista_mods) {
                                lista_mods = eval(indicador_producto.form.selected('actividades_poa').lista_mods);
                                indicador_producto.lista_mods = lista_mods;
                                indicador_producto.selectQueries["indicador_ods"] = [
                                    {
                                        field: "registro",
                                        value: lista_mods
                                    },
                                    {
                                        field: "table_",
                                        value: 3
                                    }
                                ];
                            } else {
                                indicador_producto.selectQueries["indicador_ods"] = [
                                    {
                                        field: "id",
                                        value: -1
                                    }
                                ];
                            }
                        } else {
                            indicador_producto.selectQueries["indicador_ods"] = [
                                {
                                    field: "id",
                                    value: -1
                                }
                            ];
                        }
                        indicador_producto.form.loadDropDown('indicador_ods');
                    }
                }
                if (data == 'poa_monitoreo') {
                    if (mode === "new" && !do_once) {
                        if (!indicador_producto.poa_monitoreo || indicador_producto.poa_monitoreo === '[NULL]') {
                            indicador_producto.form.loadDropDown('poa_monitoreo');
                            do_once = true;
                        }
                    }
                    if (mode === "edit" && !do_once) {
                        indicador_producto.form.options.poa_monitoreo.disabled = true;
                        indicador_producto.form.loadDropDown('poa_monitoreo');
                        do_once = true;
                    }
                }
                if (data == 'tipo_meta') {
                    if (mode === "new" && !do_once_tp) {
                        if (!indicador_producto.tipo_meta || indicador_producto.tipo_meta === '[NULL]') {
                            indicador_producto.form.loadDropDown('tipo_meta');
                            do_once_tp = true;
                        }
                    }
                    if (mode === "edit" && !do_once_tp) {
                        indicador_producto.form.options.tipo_meta.disabled = true;
                        indicador_producto.form.loadDropDown('tipo_meta');
                        do_once_tp = true;
                    }
                }
                if (data == 'departamento') {
                    if (indicador_producto.paso) {
                        if (indicador_producto.group_caracteristica == ENUM_2.Grupos.analista_departamental || indicador_producto.group_caracteristica == ENUM_2.Grupos.director_departamental) {
                            indicador_producto.departamento = new SESSION().current().departamento.toString();
                            indicador_producto.form.loadDropDown('departamento');
                            indicador_producto.paso = false;
                        } else if (mode == 'new') {
                            indicador_producto.form.loadDropDown('departamento');
                            indicador_producto.paso = false;
                        }
                    }
                }
                if (data == "tipo_meta" && mode != "new" && indicador_producto.initiation) {
                    $(".subcontainer2").html('');
                    indicador_producto.getIDedit();
                    indicador_producto.initiation = false;
                }
                if (data == "tipo_meta" && mode == "new" && indicador_producto.initiation) {
                    $(".subcontainer1").html('');
                    indicador_producto.getIMesNew();
                    indicador_producto.initiation = false;
                }

                if (data == 'indicador_ods') {
                    if (indicador_producto.form.selected("indicador_ods")) {
                        indicador_producto.poa_monitoreo = indicador_producto.form.selected("indicador_ods").poa_monitoreo + "";
                        indicador_producto.tipo_meta = indicador_producto.form.selected("indicador_ods").tipo_meta + "";
                        indicador_producto.form.options.poa_monitoreo.disabled = true;
                        indicador_producto.form.options.tipo_meta.disabled = true;
                        indicador_producto.form.loadDropDown('poa_monitoreo');
                        indicador_producto.form.loadDropDown('tipo_meta');

                    }
                }
                // if (data == "actividad_monitoreo" && mode != "new") {
                //     indicador_producto.form.options.actividad_monitoreo.disabled = true;
                //     indicador_producto.form.options.indicador_poa.allonull =
                //         indicador_producto.refreshAngular();
                // }
            };
            indicador_producto.triggers.table.after.close = function () {
                indicador_producto.paso = true;
            };
            RUN_B("indicador_producto", indicador_producto, $scope, $http, $compile);
            indicador_producto.selectQueries["producto"] = [
                {
                    field: "poa",
                    operator: "=",
                    value: user.poa_id ? user.poa_id : 0
                }
            ];
            indicador_producto.form.schemas.insert.departamento = FORM.schemasType.calculated;


            indicador_producto.no_trabaja_poa = function () {
                if (indicador_producto.group_caracteristica != ENUM_2.Grupos.analista_departamental && indicador_producto.group_caracteristica != ENUM_2.Grupos.director_departamental) {
                    return true;
                } else {
                    return false;
                }
            };
            indicador_producto.form.titles = {
                new: "Nuevo - " + "Indicador de Proyecto Especial",
                edit: "Editar - " + "Indicador de Proyecto Especial",
                view: "Ver ALL - " + "Indicador de Proyecto Especial"
            };

            indicador_producto.applyMasks = async function () {
                console.log("applyMasks");
                indicador_producto.applyMasksfalse = true;
                switch (indicador_producto.tipo_meta) {
                    case "2": {
                        await indicador_producto.control.indice("#subcontainerLineaBase", "linea_base", {
                            maxlength: 1, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_producto.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_producto.list_mes) {
                                await indicador_producto.control.indice(".subcontainer1", "periodos" + indicador_producto.list_mes[key], {
                                    maxlength: 1, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_producto, `indicador_producto.periodos${indicador_producto.list_mes[key]}`, `periodos${indicador_producto.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_producto.list_indicador_producto_periodo) {
                                await indicador_producto.control.indice(".subcontainer2", "periodos" + indicador_producto.list_indicador_producto_periodo[key].id, {
                                    maxlength: 1, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_producto, `indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id}`, `periodos${indicador_producto.list_indicador_producto_periodo[key].id}`);
                                eval(`
						            if(indicador_producto.limpiar){
							            indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id} = "";
							            indicador_producto.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_producto.limpiar = true;
                        break;
                    }
                    case "5": {
                        await indicador_producto.control.money("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_producto.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_producto.list_mes) {
                                await indicador_producto.control.money(".subcontainer1", "periodos" + indicador_producto.list_mes[key], {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_producto, `indicador_producto.periodos${indicador_producto.list_mes[key]}`, `periodos${indicador_producto.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_producto.list_indicador_producto_periodo) {
                                await indicador_producto.control.money(".subcontainer2", "periodos" + indicador_producto.list_indicador_producto_periodo[key].id, {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_producto, `indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id}`, `periodos${indicador_producto.list_indicador_producto_periodo[key].id}`);
                                eval(`
						            if(indicador_producto.limpiar){
							            indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id} = "";
							            indicador_producto.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_producto.limpiar = true;
                        break;
                    }
                    case "4": {
                        await indicador_producto.control.decimal("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_producto.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_producto.list_mes) {
                                await indicador_producto.control.decimal(".subcontainer1", "periodos" + indicador_producto.list_mes[key], {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_producto, `indicador_producto.periodos${indicador_producto.list_mes[key]}`, `periodos${indicador_producto.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_producto.list_indicador_producto_periodo) {
                                await indicador_producto.control.decimal(".subcontainer2", "periodos" + indicador_producto.list_indicador_producto_periodo[key].id, {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_producto, `indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id}`, `periodos${indicador_producto.list_indicador_producto_periodo[key].id}`);
                                eval(`
						            if(indicador_producto.limpiar){
							            indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id} = "";
							            indicador_producto.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_producto.limpiar = true;
                        break;
                    }
                    case "1": {
                        await indicador_producto.control.percentage("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_producto.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_producto.list_mes) {
                                await indicador_producto.control.percentage(".subcontainer1", "periodos" + indicador_producto.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_producto, `indicador_producto.periodos${indicador_producto.list_mes[key]}`, `periodos${indicador_producto.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_producto.list_indicador_producto_periodo) {
                                await indicador_producto.control.percentage(".subcontainer2", "periodos" + indicador_producto.list_indicador_producto_periodo[key].id, {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_producto, `indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id}`, `periodos${indicador_producto.list_indicador_producto_periodo[key].id}`);
                                eval(`
						            if(indicador_producto.limpiar){
							            indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id} = "";
							            indicador_producto.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_producto.limpiar = true;
                        break;
                    }
                    case "6": {
                        await indicador_producto.control.integer("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_producto.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_producto.list_mes) {
                                await indicador_producto.control.integer(".subcontainer1", "periodos" + indicador_producto.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_producto, `indicador_producto.periodos${indicador_producto.list_mes[key]}`, `periodos${indicador_producto.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_producto.list_indicador_producto_periodo) {
                                await indicador_producto.control.integer(".subcontainer2", "periodos" + indicador_producto.list_indicador_producto_periodo[key].id, {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadores(indicador_producto, `indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id}`, `periodos${indicador_producto.list_indicador_producto_periodo[key].id}`);
                                eval(`
						            if(indicador_producto.limpiar){
							            indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id} = "";
							            indicador_producto.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_producto.limpiar = true;
                        break;
                    }
                    case "3": {
                        //absoluto
                        await indicador_producto.control.valor_absoluto("#subcontainerLineaBase", "linea_base", {
                            maxlength: 11, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_producto.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_producto.list_mes) {
                                await indicador_producto.control.valor_absoluto(".subcontainer1", "periodos" + indicador_producto.list_mes[key], {
                                    maxlength: 11, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadoresValorAbsoluto(indicador_producto, `indicador_producto.periodos${indicador_producto.list_mes[key]}`, `periodos${indicador_producto.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            var conuntPeriodo = 1;
                            for (var key in indicador_producto.list_indicador_producto_periodo) {
                                await indicador_producto.control.valor_absoluto(".subcontainer2", "periodos" + indicador_producto.list_indicador_producto_periodo[key].id, {
                                    maxlength: 11, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                watchIndicadoresValorAbsoluto(indicador_producto, `indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id}`, `periodos${indicador_producto.list_indicador_producto_periodo[key].id}`);
                                eval(`
						            if(indicador_producto.limpiar){
							            indicador_producto.periodos${indicador_producto.list_indicador_producto_periodo[key].id} = "";
							            indicador_producto.linea_base = "";
								    }
					            `);
                                conuntPeriodo++;
                            }
                        }
                        indicador_producto.limpiar = true;
                        break;
                    }
                    default: {

                    }

                }
                indicador_producto.applyMasksfalse = false;
                indicador_producto.refreshAngular();
                delete indicador_producto.yadata;
                indicador_producto.clicaalgo();
            };

            indicador_producto.form.readonly = {};
            indicador_producto.createForm(data, mode, defaultData);

            indicador_producto.form.schemas.insert.fecha_inicio = FORM.schemasType.calculated;
            indicador_producto.form.schemas.insert.fecha_fin = FORM.schemasType.calculated;

            var f = new Date();
            var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();


            indicador_producto.form.after.insert = function (data) {
                var groupInsert = [];
                for (let i = 0; i < indicador_producto.list_mes.length; i++) {
                    try {
                        groupInsert.push({
                            "indicador_proceso": data.inserted.id,
                            "created_at": fecha,
                            "created_by": user.usuario_id,
                            "valor": DSON.OSO((indicador_producto.tipo_meta == "5" && eval(`indicador_producto.periodos${indicador_producto.list_mes[i]}`) ? eval(`indicador_producto.periodos${indicador_producto.list_mes[i]}`).replace('$', '') : eval(`indicador_producto.periodos${indicador_producto.list_mes[i]}`)) || ""),
                            "periodo": indicador_producto.list_mes[i]
                        });
                    } catch (e) {
                        groupInsert.push({
                            "indicador_proceso": data.inserted.id,
                            "created_at": fecha,
                            "created_by": user.usuario_id,
                            "valor": "",
                            "periodo": indicador_producto.list_mes[i]
                        });
                    }
                }

                BASEAPI.insert('indicador_producto_periodo', groupInsert, function (result) {
                    indicador_producto.linea_base = indicador_producto.linea_base.replace('$', '');
                    indicador_producto.list_mes = [];
                    for (var i in indicador_producto) if (i.indexOf("periodos") !== -1) eval(`delete indicador_producto.${i}`);
                });

                return false;
            };


            indicador_producto.form.after.update = function (data) {

                indicador_producto.linea_base = indicador_producto.linea_base.replace('$', '');
                indicador_producto.list_indicador_producto_periodo = [];
                for (var i in indicador_producto) if (i.indexOf("periodos") !== -1) eval(`delete indicador_producto.${i}`);
                return false;
            };


            indicador_producto.$scope.$watch('indicador_producto.poa_monitoreo', function (value) {
                var rules = [];
                if (value !== undefined || value !== "[NULL]") {
                    if (indicador_producto.form.selected('poa_monitoreo')) {
                        user.cantidad = indicador_producto.form.selected('poa_monitoreo').cantidad;
                        user.monitoreo_nombre = indicador_producto.form.selected('poa_monitoreo').nombre_mostrar;
                        indicador_producto.periodolist = [];
                        for (var p = 1; p <= 12; p++) {
                            if (indicador_producto.validate["periodos" + p])
                                delete indicador_producto.validate["periodos" + p];
                        }
                        for (var p = 1; p <= user.cantidad; p++) {
                            indicador_producto.periodolist.push({periodo: user.monitoreo_nombre + ' ' + p});
                        }
                        indicador_producto.getIMesNew();
                        indicador_producto.refreshAngular();
                    }
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_producto, "poa_monitoreo", rules);
            });


            indicador_producto.$scope.$watch('indicador_producto.ws_connection_field', async function (value) {
                await indicador_producto.runws(value, "resultExterno");
                indicador_producto.refreshAngular();
            });


            indicador_producto.$scope.$watch('indicador_producto.nombre', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_producto, "nombre", rules)
            });
            indicador_producto.$scope.$watch('indicador_producto.actividades_poa', function (value) {
                var rules = [];
                var lista_mods = [];
                if (indicador_producto.form.selected('actividades_poa')) {
                    if (indicador_producto.form.selected('actividades_poa').lista_mods) {
                        lista_mods = eval(indicador_producto.form.selected('actividades_poa').lista_mods);
                        indicador_producto.lista_mods = lista_mods;
                        indicador_producto.selectQueries["indicador_ods"] = [
                            {
                                field: "registro",
                                value: lista_mods
                            },
                            {
                                field: "table_",
                                value: 3
                            }
                        ];
                    } else {
                        indicador_producto.selectQueries["indicador_ods"] = [
                            {
                                field: "id",
                                value: -1
                            }
                        ];
                    }
                } else {
                    indicador_producto.selectQueries["indicador_ods"] = [
                        {
                            field: "id",
                            value: -1
                        }
                    ];
                }
                indicador_producto.form.loadDropDown('indicador_ods');
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_producto, "actividades_poa", rules)
            });


            indicador_producto.$scope.$watch('indicador_producto.fuente', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_producto, "fuente", rules)
            });


            indicador_producto.$scope.$watch('indicador_producto.tipo_meta', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_producto, "tipo_meta", rules);
                if ((value && (!indicador_producto.initiation)) && DSON.oseaX(indicador_producto.indicador_ods)) {
                    $(".clearHtml").html('');
                    indicador_producto.getIMesNew();
                }
            });

            indicador_producto.$scope.$watch('indicador_producto.direccion_meta', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_producto, "direccion_meta", rules)
            });

            indicador_producto.$scope.$watch('indicador_producto.ano_linea_base', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_producto, "ano_linea_base", rules)
            });
            indicador_producto.$scope.$watch('indicador_producto.linea_base', function (value) {
                indicador_producto.linea_base = value ? value.replace("$", "") : value;
                var rules = [];
                if (value == "" || value == null)
                    rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_producto, "linea_base", rules)
            });
            indicador_producto.$scope.$watch('indicador_producto.medio_verificacion', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_producto, "medio_verificacion", rules)
                VALIDATION.validate(indicador_producto, "medio_verificacion", rules)
            });

            indicador_producto.$scope.$watch('indicador_producto.metodo_calculo', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(indicador_producto, "metodo_calculo", rules)
                VALIDATION.validate(indicador_producto, "metodo_calculo", rules)

            });
            indicador_producto.$scope.$watch('indicador_producto.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_producto, "descripcion", rules)
            });

            indicador_producto.$scope.$watch('indicador_producto.indicador_ods', function (value) {
                var rules = [];
                if (indicador_producto.form.selected("indicador_ods")) {
                    indicador_producto.poa_monitoreo = indicador_producto.form.selected("indicador_ods").poa_monitoreo + "";
                    indicador_producto.tipo_meta = indicador_producto.form.selected("indicador_ods").tipo_meta + "";
                    indicador_producto.form.options.poa_monitoreo.disabled = true;
                    indicador_producto.form.options.tipo_meta.disabled = true;
                    indicador_producto.form.loadDropDown('poa_monitoreo');
                    indicador_producto.form.loadDropDown('tipo_meta');
                } else {
                    if (indicador_producto.form.options.tipo_meta) {
                        indicador_producto.form.options.poa_monitoreo.disabled = false;
                        indicador_producto.form.options.tipo_meta.disabled = false;
                        indicador_producto.form.loadDropDown('poa_monitoreo');
                        indicador_producto.form.loadDropDown('tipo_meta');
                    }
                }
                indicador_producto.refreshAngular();
            });


        }
    };
    indicador_producto.refreshAngularCustom = function () {
        indicador_producto.refreshAngular();
    }
});
