app.controller("monitoreo_generico", function ($scope, $http, $compile) {
    monitoreo_generico = this;
    monitoreo_generico.destroyForm = false;
    var user = new SESSION().current();
    monitoreo_generico.session = user;
    //monitoreo_generico.fixFilters = [];
    //monitoreo_generico.singular = "singular";
    //monitoreo_generico.plural = "plural";
    monitoreo_generico.headertitle = monitoreo_generico.session.tipo_institucion == 1 ? "Monitoreo y Seguimiento" : "Monitoreo y Seguimiento - Proyecto/Plan de Acción";
    //monitoreo_generico.destroyForm = false;
    //monitoreo_generico.permissionTable = "tabletopermission";
    RUNCONTROLLER("monitoreo_generico", monitoreo_generico, $scope, $http, $compile);
    RUN_B("monitoreo_generico", monitoreo_generico, $scope, $http, $compile);
    monitoreo_generico.colors = COLOR.secundary;
    monitoreo_generico.resumen_pei_list = [];
    monitoreo_generico.tipeExport = '';
    monitoreo_generico.modover = location.href.indexOf('?ver') !== -1;
    var animation1 = new ANIMATION();

    monitoreo_generico.rowspanme = function (field, value, list) {
        var r = 0;
        r = list.filter(d => {
            if (value != ' ')
                return eval(`d.${field}==value`)
        }).length;
        return r ? r : 1;
    };
    monitoreo_generico.seeme = function (field, value, key, list) {
        if (list[key - 1])
            if (value != ' ')
                return list[key - 1][field] != value;
        return true;
    };
    // monitoreo_generico.tipometa = function (id) {
    //     return baseController.list_tipo_meta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    // };
    monitoreo_generico.tipometa = function (id) {
        return monitoreo_generico.session.tipoMenta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    };

    monitoreo_generico.cumplen = function (rows, conditions) {
        if (!rows) {
            monitoreo_generico.show_me_btn = false;
            return false;
        }
        if (rows.filter(row => ((monitoreo_generico.institucion != '[NULL]' ? monitoreo_generico.institucion == (row.institucion || row.compania) : true))).length > 0) {
            monitoreo_generico.show_me_btn = true;
            return true
        }
        return false;
    };
    monitoreo_generico.validar = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea validar el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_generico.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_generico.send_email_indicador(true, 'indicador generico', 'indicador_generico', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_generico", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_generico.permission(row.indicador_id, peri, null);
                        }
                    });
                else
                    monitoreo_generico.send_email_indicador(true, 'indicador generico', 'indicador_generico', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_generico", undefined, async function () {
                        if (peri) {
                            await monitoreo_generico.permission(row.indicador_id, peri, null);
                        }
                    });


                row.indicador_condition = null;
                monitoreo_generico.refreshAngular();
                SWEETALERT.stop();
            }
        });

    };
    monitoreo_generico.devolver = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea devolver el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_generico.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_generico.send_email_indicador(false, 'indicador poa', 'indicador_generico', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_generico", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_generico.permission(row.indicador_id, peri, 1);
                        }
                    });
                else
                    monitoreo_generico.send_email_indicador(false, 'indicador poa', 'indicador_generico', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_generico", undefined, async function () {
                        if (peri) {
                            await monitoreo_generico.permission(row.indicador_id, peri, 1);
                        }
                    });
                row.indicador_condition = 1;

                monitoreo_generico.refreshAngular();
                SWEETALERT.stop();
            }
        });
    };
    monitoreo_generico.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
        send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_generico_periodo', periodo, callback);
    };
    monitoreo_generico.direccionmeta = function (val) {
        if (val == 1) {
            return "Ascendente";
        } else if (val == 2) {
            return "Descendente";
        } else {
            return "No Varianza";
        }
    };
    monitoreo_generico.openIndicador = function (type, indicador) {
        open_ficha_indicador(type, indicador)
    };
    monitoreo_generico.openIndicadorComment = async function (type, indicador, allow, periodo) {
        var allowver = false;
        if (periodo === undefined) {
            allowver = true;
        }
        var permi = await monitoreo_generico.permission(indicador, periodo);
        if (1 == 1) {
            open_comments_indicador(type, indicador, true, periodo);
        } else {
            // SWEETALERT.show({
            //     type: "warning",
            //     message: permi.debug.replace('modificar', 'hacer observaciones'),
            //     confirm: function () {
            //         open_comments_indicador(type, indicador, false, periodo);
            //     }
            // });
            open_comments_indicador(type, indicador, false, periodo);
        }
    };
    monitoreo_generico.openProductoComment = function (type, indicador, cond, estatus) {
        var allow = false;
        if (estatus !== 'Completado') {
            allow = true;
        }
        open_comments_indicador(type, indicador, allow);
    };
    monitoreo_generico.statusText = function (cond, estatus) {
        var text = estatus;
        if (estatus === 'Abierto') {
            text = cond;
        }
        return text;
    };
    monitoreo_generico.statusColor = function (cond, estatus) {
        var text = estatus;
        var color = "white";
        if (estatus === 'Abierto') {
            text = cond;
        }
        if (text === "Vencido") {
            color = "red";
        }
        return color;
    };
    monitoreo_generico.indicadorColor = function (row) {
        if (row.indicador_condition == 1) {
            return "red";
        }
        return "white";
    };
    monitoreo_generico.statusColorFont = function (cond, estatus) {
        var text = estatus;
        var color = "black";
        if (estatus === 'Abierto') {
            text = cond;
        }
        if (text === "Vencido") {
            color = "white";
        }
        return color;
    };
    monitoreo_generico.desableDepa = function (val) {
        monitoreo_generico.disabledepa = val;
        monitoreo_generico.refreshAngular();
    };

    monitoreo_generico.permission = async function (indicador, periodo, set) {
        var exist = monitoreo_generico.poa_permission.filter(d => d.indicador_generico == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: monitoreo_generico.session.tipo_instuticion == 1 ? "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores" : "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Proyecto/Plan de Acción"
            };
        } else {
            if (set !== undefined) {
                animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
                monitoreo_generico.poa_permission = await BASEAPI.listp('vw_permission_generico', {
                    limit: 0,
                    orderby: "$ compania",
                    order: "asc",
                    where: [
                        {
                            field: "compania",
                            value: user.compania_id
                        },
                        {
                            field: "table_",
                            value: monitoreo_generico.form.selected("entidad").id
                        }
                    ]
                });
                monitoreo_generico.poa_permission = monitoreo_generico.poa_permission.data;
                monitoreo_generico.refreshAngular();
                animation1.stoploading(`.subcontent`);
                //
                // exist[0].condition = set;
            }
            return exist[0];
        }
    };

    monitoreo_generico.permissionNormal = function (indicador, periodo) {
        var exist = monitoreo_generico.poa_permission.filter(d => d.indicador_generico == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: monitoreo_generico.session.tipo_instuticion == 1 ? "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores" : "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Proyecto/Plan de Acción"
            };
        } else {
            return exist[0];
        }
    };
    monitoreo_generico.elregistro = (id) => {
        if (monitoreo_generico.losregistriData) {
            if (monitoreo_generico.losregistriData[id + ""])
                return monitoreo_generico.losregistriData[id + ""][monitoreo_generico.entidad_object.label];
        }
        return "Este registro fue eliminado, por lo tanto este indicador se encuentra sin relación";
    };
    monitoreo_generico.monitoreo_generico_get = async function () {


        var user = new SESSION().current();

        monitoreo_generico.losregistri = await BASEAPI.listp(monitoreo_generico.entidad_object.table_, {
            limit: 0,
            where: eval(monitoreo_generico.entidad_object.where)
        });
        monitoreo_generico.losregistriData = {};
        if (monitoreo_generico.losregistri.data) {
            monitoreo_generico.losregistri.data.forEach(d => {
                monitoreo_generico.losregistriData[d.id + ""] = d;
            });
        }

        monitoreo_generico.poa_permission = await BASEAPI.listp('vw_permission_generico', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            },
                {
                    field: "table_",
                    value: monitoreo_generico.form.selected("entidad").id
                }]
        });
        animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
        monitoreo_generico.poa_permission = monitoreo_generico.poa_permission.data;
        monitoreo_generico.poa_data = [];

        if (monitoreo_generico.entidad === "vw_procesos") {
            monitoreo_generico.poa_data = await BASEAPI.listp('vw_monitoreo_generico', {
                limit: 0,
                orderby: "$ compania,indicador",
                order: "asc",
                join: [
                    {
                        table: "procesos",
                        base: "registro",
                        field: "id",
                        columns: ["id", "nombre", "mapa_proceso"]
                    },
                    {
                        table: "procesos_categoria",
                        base: "procesos.procesos_categoria",
                        field: "id",
                        columns: ["id", "nombre", "mapa_proceso"]
                    },
                    {
                        table: "mapa_proceso",
                        base: "procesos.mapa_proceso",
                        field: "id",
                        columns: ["id", "nombre", "estatus"]
                    }
                ],
                where: [
                    {
                        field: "compania",
                        value: user.compania_id
                    },
                    {
                        field: "table_",
                        value: monitoreo_generico.form.selected("entidad").id
                    },
                    {
                        field: "indicador_id",
                        operator: parseInt(monitoreo_generico.indicador) ? "=" : ">",
                        value: parseInt(monitoreo_generico.indicador) || 0
                    },
                    {
                        field: "$mapa_proceso.estatus",
                        operator: "!=",
                        value: 4
                    }
                ]
            });
        } else {
            monitoreo_generico.poa_data = await BASEAPI.listp('vw_monitoreo_generico', {
                limit: 0,
                orderby: "$ compania,indicador",
                order: "asc",
                where: [{
                    field: "compania",
                    value: user.compania_id
                },
                    {
                        field: "table_",
                        value: monitoreo_generico.form.selected("entidad").id
                    },
                    {
                        field: "indicador_id",
                        operator: parseInt(monitoreo_generico.indicador) ? "=" : ">",
                        value: parseInt(monitoreo_generico.indicador) || 0
                    }]
            });
        }
        monitoreo_generico.poa_data = monitoreo_generico.poa_data.data;

        // monitoreo_generico.indicadores = [...new Set(monitoreo_generico.poa_data.map(d => {
        //     return d.indicador
        // }).filter(d => {
        //     return (d || "").trim() !== ''
        // }))];
        // monitoreo_generico.indicadores = monitoreo_generico.indicadores.map(d => {
        //     return {nombre: d, id: d}
        // });
        // monitoreo_generico.indicador = "[NULL]";
        // monitoreo_generico.form.options.indicador.data = [];
        // monitoreo_generico.form.options.indicador.data = monitoreo_generico.indicadores;
        // monitoreo_generico.refreshAngular();
        // monitoreo_generico.form.loadDropDown('indicador');

        monitoreo_generico.poa_calc = await BASEAPI.listp('vw_aii_generico', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            },
                {
                    field: "table_",
                    value: monitoreo_generico.form.selected("entidad").id
                }]
        });
        monitoreo_generico.poa_calc = monitoreo_generico.poa_calc.data;

        monitoreo_generico.anos = [];
        monitoreo_generico.pequenoHistorial = [];
        for (var item of monitoreo_generico.poa_data) {
            if (monitoreo_generico.anos.filter(d =>
                d.entidad == item.entidad
            ).length === 0) {
                monitoreo_generico.anos.push({
                    entidad: item.entidad,
                    compania_nombre: item.compania_nombre,
                    records: monitoreo_generico.poa_data.filter(d =>
                        d.periodo_poa == item.periodo_poa &&
                        d.eje_estrategico == item.eje_estrategico &&
                        d.objetivo_estrategico == item.objetivo_estrategico &&
                        d.estrategia == item.estrategia &&
                        d.resultado == item.resultado &&
                        d.entidad == item.entidad
                    )
                });
                for (var indicador in monitoreo_generico.anos[monitoreo_generico.anos.length - 1].records) {
                    var record = monitoreo_generico.anos[monitoreo_generico.anos.length - 1].records[indicador];
                    if (monitoreo_generico.poa_calc.filter(d => d.indicador_id == record.indicador_id).length > 0) {
                        var indi = monitoreo_generico.poa_calc.filter(d => d.indicador_id == record.indicador_id)[0];
                        record.indicador_data = indi;
                        if (!monitoreo_generico.pequenoHistorial[record.indicador_id]) {
                            monitoreo_generico.pequenoHistorial[record.indicador_id] = await aacontroldemandofalso.cumplimiento(
                                "vw_report_indicadores_generico",
                                baseController.session,
                                "indicador_generico",
                                record.indicador_id);
                        }
                    }
                }
            }
        }

        var capi = 5;
        if (monitoreo_generico.modover)
            capi--;
        monitoreo_generico.capi = capi;
        if (monitoreo_generico.poa_calc) {
            monitoreo_generico.poa_anos = monitoreo_generico.extract_anos(monitoreo_generico.poa_calc);
            monitoreo_generico.poa_anos = monitoreo_generico.poa_anos.map(d => parseInt(d));
            monitoreo_generico.poa_anos.sort(function (a, b) {
                if (a === Infinity)
                    return 1;
                else if (isNaN(a))
                    return -1;
                else
                    return a - b;
            });
            monitoreo_generico.poa_valor = [];

            for (var a = 0; a < (monitoreo_generico.poa_anos.length * capi); a++) {
                var indica = ((a + 1) % capi);
                if (indica === 1) indica = {id: monitoreo_generico.poa_anos[Math.floor(a / capi)], value: "P"};
                if (indica === 2) indica = {id: monitoreo_generico.poa_anos[Math.floor(a / capi)], value: "A"};
                if (indica === 3) indica = {id: monitoreo_generico.poa_anos[Math.floor(a / capi)], value: "D"};
                if (indica === (monitoreo_generico.modover ? 0 : 4)) indica = {
                    id: monitoreo_generico.poa_anos[Math.floor(a / capi)],
                    value: "%"
                };
                if (indica === (monitoreo_generico.modover ? 4 : 0)) indica = {
                    id: monitoreo_generico.poa_anos[Math.floor(a / capi)],
                    value: "Alerta"
                };
                monitoreo_generico.poa_valor[a] = indica;
            }
        }

        monitoreo_generico.colspaninit = 10;
        monitoreo_generico.colspaninit += monitoreo_generico.poa_anos.length * capi;

        setTimeout(function () {
            $('#minusubcontent').floatingScrollbar();
        }, 1000);

        animation1.stoploading(`.subcontent`);
        monitoreo_generico.refreshAngular();
    };

    monitoreo_generico.detallePeriodo = function (row, PD, tipo_meta) {
        var ul = "<ul>";
        for (var i of PD) {
            ul += `<li>${i.periodo}: ${monitoreo_generico.format(i.valor, tipo_meta)}</li>`;
        }
        ul += "</ul>";
        monitoreo_generico.modal.simpleModal(ul,
            {
                header: {
                    title: `Detalles del Indicador "${row.indicador}" para el año ${PD[0].ano}`
                }
            }
            , true);
    };
    monitoreo_generico.format_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_generico.format(eval(`${calc}`), tipo_meta);
    };
    monitoreo_generico.raw_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_generico.format(eval(`${calc}`), tipo_meta);
    };

    monitoreo_generico.pasado = function (row, periodo) {
        var mes = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        if (!row.indicador_data)
            return false;
        var monitoreo = row.indicador_data.monitoreo;
        var actual = Math.ceil((mes / (12 / monitoreo)));
        if (row.indicador_data.periodo_poa < year)
            return true;
        return (parseInt(periodo.id) <= actual && parseInt(row.indicador_data.periodo_poa) <= year);
    };


    monitoreo_generico.dif = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_generico.ano_singleraw(row.indicador_data.anos, ra.id) && monitoreo_generico.ano_singleraw(row.indicador_data.anos_a, ra.id))
            return monitoreo_generico.format_calc(monitoreo_generico.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_generico.ano_singleraw(row.indicador_data.anos_a, ra.id) || 0, row.indicador_data.tipo_meta, "b-a");
        return "";
    };
    monitoreo_generico.difraw = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        return monitoreo_generico.raw_calc(monitoreo_generico.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_generico.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
    };
    monitoreo_generico.alert_color = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_generico.percent(row, ra) >= 95 ? "#009900" : monitoreo_generico.percent(row, ra) >= 75 ? "#eae42dfc" : "#FF0000"
        return "";
    };
    monitoreo_generico.alert_tootip = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_generico.percent(row, ra) >= 95 ? "Logrado" : monitoreo_generico.percent(row, ra) >= 75 ? "En observación" : "No logrado";
        return "";
    };
    monitoreo_generico.percent = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_generico.ano_single(row.indicador_data.anos_a, ra.id) == null) {
            return 0;
        }
        var base = parseFloat(monitoreo_generico.ano_singleraw(row.indicador_data.anos, ra.id));
        var variable = parseFloat(monitoreo_generico.ano_singleraw(row.indicador_data.anos_a, ra.id));
        if (!variable)
            return 0;
        var dir = row.indicador_data.dir;
        if (dir == 1) {
            var calc = (variable * 100) / (base || 1);
            return calc > 100 ? 100 : Math.floor(calc);
        } else if (dir == 2) {
            var calc = ((base || 1) * 100) / (variable || 1);
            return calc > 100 ? 100 : Math.floor(calc);
        } else {
            if ((base || 1) == (variable || 1))
                return 100;
            var calc = ((base || 1) * 100) / (variable || 1);
            var sum = (calc - 100) > 100 ? 100 : (calc - 100);
            return calc > 100 ? Math.floor(100 - (sum)) : Math.floor(calc);
        }

    };
    monitoreo_generico.ano_single = function (anos, ano, tipo_meta) {
        if (anos) {
            var rows = anos.split(';');
            for (var row of rows) {
                if (row) {
                    var data = row.split('=');
                    if (data[0] == ano) {
                        return monitoreo_generico.format(data[1], tipo_meta);
                    }
                }
            }
        }
        return null;
    };
    monitoreo_generico.ano_singleraw = function (anos, ano, tipo_meta) {
        if (anos) {
            var rows = anos.split(';');
            for (var row of rows) {
                if (row) {
                    var data = row.split('=');
                    if (data[0] == ano) {
                        return data[1].replaceAll(",", "");
                    }
                }
            }
        }
        return null;
    };
    monitoreo_generico.format = function (valor, tipo_meta) {

        switch (tipo_meta) {
            case 1: {
                return (valor === null || valor === '') ? '' : (valor + '%');
                break;
            }
            case 4: {
                return (valor === null || valor === '') ? '' : (LAN.money(valor).format(false));
                break;
            }
            case 5: {
                return (valor === null || valor === '') ? '' : `${LAN.money(valor).format(true)}`;
                break;
            }
            default : {
                return (valor === null || valor === '') ? '' : (valor || 0);
            }
        }

    };

    monitoreo_generico.extract_companies = function (list) {
        var anos = [];
        for (var item of list) {
            if (item.entidad) {
                if (anos.indexOf(item.entidad) === -1) {
                    anos.push(item.entidad);
                }
            }
        }
        return anos;
    };
    monitoreo_generico.extract_companies_id = function (list) {
        var anos = [];
        var anos2 = [];
        for (var item of list) {
            if (item.entidad) {
                if (anos.indexOf(item.entidad) === -1) {
                    anos.push(item.entidad);
                    anos2.push({
                        tipo: !item.institucion ? 'compania' : 'institucion',
                        id: item.institucion || item.compania
                    });
                }
            }
        }
        return anos2;
    };

    monitoreo_generico.extract_anos_periodo = function (list) {
        var anos = [];
        for (var item of list) {
            if (item.anos) {
                var rows = item.anos.split(';');
                for (var row of rows) {
                    var data = row.split('=');
                    if (anos.indexOf(data[0]) === -1) {
                        anos.push(data[0]);
                    }
                }
            }
        }
        return anos;
    };
    monitoreo_generico.extract_anos = function (list) {
        var anos = [];
        for (var item of list) {
            if (item.anos) {
                var rows = item.anos.split(';');
                for (var row of rows) {
                    var data = row.split('=');
                    if (anos.indexOf(data[0]) === -1) {
                        anos.push(data[0]);
                    }
                }
            }
        }
        return anos;
    };

    monitoreo_generico.exportXLS = function () {
        var url = $("#monitoreo_genericoExport").excelexportjs({
            containerid: "monitoreo_genericoExportXLS",
            datatype: 'table',
            worksheetName: monitoreo_generico.session.tipo_institucion == 1 ? `Monitoreo y Seguimiento` : `Monitoreo y Seguimiento de Proyecto/Plan de Acción`,
            returnUri: true
        });
        DOWNLOAD.excel(`${monitoreo_generico.session.tipo_institucion == 1 ? 'Monitoreo y Seguimiento' : 'Monitoreo y Seguimiento de Proyecto/Plan de Acción'}`, url);
    };

    monitoreo_generico.exportPDF = function () {

        $("#monitoreo_genericoExport").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333
        });
        //
        // $(".resumen_peiTable").printThis({
        //     importCSS: false,                // import parent page css
        //     loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
        //     printDelay: 333,
        // });
    };

    //monitoreo_generico.monitoreo_generico_get();

    monitoreo_generico.openmodalField = function (value) {

        monitoreo_generico.tipeExport = value.toString();

        monitoreo_generico.modal.modalView("monitoreo_generico/export", {

            width: 'modal-full',
            header: {
                title: monitoreo_generico.session.tipo_institucion == 1 ? `Vista Previa monitoreo y seguimiento.` : `Vista Previa monitoreo y seguimiento de Proyecto/Plan de Acción.`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    };

    monitoreo_generico.limitPeriod = (row, period) => {
        if (row) {
            if (row.indicador_data) {
                if (row.indicador_data.monitoreo) {
                    if (period <= row.indicador_data.monitoreo)
                        return true;
                }
            }
        }
        return false;
    };
});
