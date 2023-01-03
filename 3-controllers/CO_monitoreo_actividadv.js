app.controller("monitoreo_actividadv", function ($scope, $http, $compile) {
    monitoreo_actividadv = this;
    monitoreo_actividadv.destroyForm = false;
    var user = new SESSION().current();
    monitoreo_actividadv.session = user;
    //monitoreo_actividadv.fixFilters = [];
    //monitoreo_actividadv.singular = "singular";
    //monitoreo_actividadv.plural = "plural";
    //monitoreo_actividadv.headertitle = "Hola Title";
    //monitoreo_actividadv.destroyForm = false;
    //monitoreo_actividadv.permissionTable = "tabletopermission";
    RUNCONTROLLER("monitoreo_actividadv", monitoreo_actividadv, $scope, $http, $compile);
    RUN_B("monitoreo_actividadv", monitoreo_actividadv, $scope, $http, $compile);
    monitoreo_actividadv.colors = COLOR.secundary;
    monitoreo_actividadv.resumen_pei_list = [];
    monitoreo_actividadv.tipeExport = '';
    monitoreo_actividadv.modover = true;
    var animation1 = new ANIMATION();

    monitoreo_actividadv.rowspanme = function (field, value, list) {
        var r = 0;
        r = list.filter(d => {
            if (value != ' ')
                return eval(`d.${field} == value`)
        }).length;
        return r ? r : 1;
    };
    monitoreo_actividadv.seeme = function (field, value, key, list) {
        if (list[key - 1])
            if (value != ' ')
                return list[key - 1][field] != value;
        return true;
    };
    monitoreo_actividadv.tipometa = function (id) {
        return baseController.list_tipo_meta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    };
    monitoreo_actividadv.tipometa = function (id) {
        return monitoreo_actividadv.session.tipoMenta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    };

    monitoreo_actividadv.cumplen = function (rows, conditions) {
        if (!rows) {
            monitoreo_actividadv.show_me_btn = false;
            return false;
        }
        if (rows.filter(row => ((monitoreo_actividadv.institucion != '[NULL]' ? monitoreo_actividadv.institucion == (row.institucion || row.compania) : true))).length > 0) {
            monitoreo_actividadv.show_me_btn = true;
            return true
        }
        return false;
    };
    monitoreo_actividadv.validar = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea validar el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_actividadv.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_actividadv.send_email_indicador(true, 'indicador actividad', 'indicador_actividad', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_actividadv", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_actividadv.permission(row.indicador_id, peri, null);
                        }
                    });
                else
                    monitoreo_actividadv.send_email_indicador(true, 'indicador actividad', 'indicador_actividad', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_actividadv", undefined, async function () {
                        if (peri) {
                            await monitoreo_actividadv.permission(row.indicador_id, peri, null);
                        }
                    });


                row.indicador_condition = null;
                monitoreo_actividadv.refreshAngular();
                SWEETALERT.stop();
            }
        });

    };
    monitoreo_actividadv.devolver = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea devolver el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_actividadv.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_actividadv.send_email_indicador(false, 'indicador actividad', 'indicador_actividad', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_actividadv", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_actividadv.permission(row.indicador_id, peri, 1);
                        }
                    });
                else
                    monitoreo_actividadv.send_email_indicador(false, 'indicador actividad', 'indicador_actividad', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_actividadv", undefined, async function () {
                        if (peri) {
                            await monitoreo_actividadv.permission(row.indicador_id, peri, 1);
                        }
                    });
                row.indicador_condition = 1;

                monitoreo_actividadv.refreshAngular();
                SWEETALERT.stop();
            }
        });
    };
    monitoreo_actividadv.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
        send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_actividad_periodo', periodo, callback);
    };
    monitoreo_actividadv.direccionmeta = function (val) {
        if (val == 1) {
            return "Ascendente";
        } else if (val == 2) {
            return "Descendente";
        } else {
            return "No Varianza";
        }
    };
    monitoreo_actividadv.openIndicador = function (type, indicador) {
        open_ficha_indicador(type, indicador)
    };
    monitoreo_actividadv.openIndicadorComment = async function (type, indicador, allow, periodo) {
        var allowver = false;
        if (periodo === undefined) {
            allowver = true;
        }
        var permi = await monitoreo_actividadv.permission(indicador, periodo);
        if (2== 1) {
            open_comments_indicador(type, indicador, false, periodo);
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
    monitoreo_actividadv.openProductoComment = function (type, indicador, cond, estatus) {
        var allow = false;
        if (estatus !== 'Completado') {
            allow = true;
        }
        open_comments_indicador(type, indicador, false);
    };
    monitoreo_actividadv.openActividadComment = function (type, indicador, cond, estatus) {
        var allow = false;
        if (estatus !== 'Completado') {
            allow = true;
        }
        open_comments_indicador(type, indicador, allow);
    };
    monitoreo_actividadv.statusText = function (cond, estatus) {
        var text = estatus;
        if (estatus === 'Abierto' || estatus === 'Abierta') {
            text = cond;
        }
        return text;
    };
    monitoreo_actividadv.statusColor = function (cond, estatus) {
        var text = estatus;
        var color = "white";
        if (estatus === 'Abierto' || estatus === 'Abierta') {
            text = cond;
        }
        if (text === "Vencido" || text === "Vencida") {
            color = "red";
        }
        return color;
    };

    monitoreo_actividadv.indicadorColor = function (row) {
        if (row.indicador_condition == 1) {
            return "red";
        }
        return "white";
    };
    monitoreo_actividadv.statusColorFont = function (cond, estatus) {
        var text = estatus;
        var color = "black";
        if (estatus === 'Abierto' || estatus === 'Abierta') {
            text = cond;
        }
        if (text === "Vencido" || text === 'Vencida') {
            color = "white";
        }
        return color;
    };
    monitoreo_actividadv.desableDepa = function (val) {
        monitoreo_actividadv.disabledepa = val;
        monitoreo_actividadv.refreshAngular();
    };

    monitoreo_actividadv.permission = async function (indicador, periodo, set) {
        var exist = monitoreo_actividadv.poa_permission.filter(d => d.indicador_actividad == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Prodcutos"
            };
        } else {
            if (set !== undefined) {
                animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
                monitoreo_actividadv.poa_permission = await BASEAPI.listp('vw_permission_actividad', {
                    limit: 0,
                    orderby: "$ compania",
                    order: "asc",
                    where: [{
                        field: "compania",
                        value: user.compania_id
                    }]
                });
                monitoreo_actividadv.poa_permission = monitoreo_actividadv.poa_permission.data;
                monitoreo_actividadv.refreshAngular();
                animation1.stoploading(`.subcontent`);
                //
                // exist[0].condition = set;
            }
            return exist[0];
        }
    };

    monitoreo_actividadv.permissionNormal = function (indicador, periodo) {
        var exist = monitoreo_actividadv.poa_permission.filter(d => d.indicador_actividad == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Prodcutos"
            };
        } else {
            return exist[0];
        }
    };

    monitoreo_actividadv.monitoreo_actividadv_get = async function () {


        var user = new SESSION().current();

        monitoreo_actividadv.poa_permission = await BASEAPI.listp('vw_permission_actividad', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
        monitoreo_actividadv.poa_permission = monitoreo_actividadv.poa_permission.data;
        monitoreo_actividadv.poa_data = await BASEAPI.listp('vw_monitoreo_actividadv', {
            limit: 0,
            orderby: "$ compania,periodo_poa,r1,objetivo_estrategico,estrategia,resultado,departamento,producto_id,estatus,actividad,indicador",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            },
                {
                    field: "poa",
                    value: monitoreo_actividadv.session.poa_id
                },
                {
                    field: "id_departamento",
                    operator: (monitoreo_actividadv.departamento || []).length > 0 ? " in " : ">",
                    value: (monitoreo_actividadv.departamento || []).length > 0 ? monitoreo_actividadv.departamento : "0",
                },
                {
                    field: "indicador_id",
                    operator: parseInt(monitoreo_actividadv.indicador) ? "=" : ">",
                    value: parseInt(monitoreo_actividadv.indicador) || 0
                }
            ]
        });
        monitoreo_actividadv.poa_data = monitoreo_actividadv.poa_data.data;

        // monitoreo_actividadv.indicadores = [...new Set(monitoreo_actividadv.poa_data.map(d => {
        //     return d.indicador
        // }).filter(d => {
        //     return (d || "").trim() !== ''
        // }))];
        // monitoreo_actividadv.indicadores = monitoreo_actividadv.indicadores.map(d => {
        //     return {nombre: d, id: d}
        // });
        // monitoreo_actividadv.indicador = "[NULL]";
        // monitoreo_actividadv.form.options.indicador.data = [];
        // monitoreo_actividadv.form.options.indicador.data = monitoreo_actividadv.indicadores;
        // monitoreo_actividadv.refreshAngular();
        // monitoreo_actividadv.form.loadDropDown('indicador');
        monitoreo_actividadv.poa_calc = await BASEAPI.listp('vw_aii_act', {
            limit: 0,
            orderby: "$ compania,r1, r2",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        monitoreo_actividadv.poa_calc = monitoreo_actividadv.poa_calc.data;

        monitoreo_actividadv.anos = [];
        monitoreo_actividadv.pequenoHistorial = [];
        for (var item of monitoreo_actividadv.poa_data) {
            if (monitoreo_actividadv.anos.filter(d =>
                d.periodo_poa == item.periodo_poa &&
                d.eje_estrategico == item.eje_estrategico &&
                d.objetivo_estrategico == item.objetivo_estrategico &&
                d.estrategia == item.estrategia &&
                d.resultado == item.resultado &&
                d.entidad == item.entidad
            ).length === 0) {
                monitoreo_actividadv.anos.push({
                    periodo_poa: item.periodo_poa,
                    eje_estrategico: item.eje_estrategico,
                    objetivo_estrategico: item.objetivo_estrategico,
                    estrategia: item.estrategia,
                    resultado: item.resultado,
                    entidad: item.entidad,
                    compania_nombre: item.compania_nombre,
                    records: monitoreo_actividadv.poa_data.filter(d =>
                        d.periodo_poa == item.periodo_poa &&
                        d.eje_estrategico == item.eje_estrategico &&
                        d.objetivo_estrategico == item.objetivo_estrategico &&
                        d.estrategia == item.estrategia &&
                        d.resultado == item.resultado &&
                        d.entidad == item.entidad
                    )
                });
                for (var indicador in monitoreo_actividadv.anos[monitoreo_actividadv.anos.length - 1].records) {
                    var record = monitoreo_actividadv.anos[monitoreo_actividadv.anos.length - 1].records[indicador];
                    if (monitoreo_actividadv.poa_calc.filter(d => d.indicador_id == record.indicador_id).length > 0) {
                        var indi = monitoreo_actividadv.poa_calc.filter(d => d.indicador_id == record.indicador_id)[0];
                        record.indicador_data = indi;
                        if (!monitoreo_actividadv.pequenoHistorial[record.indicador_id]) {
                            monitoreo_actividadv.pequenoHistorial[record.indicador_id] = await aacontroldemandofalso.cumplimiento(
                                "vw_report_indicadores_actividad",
                                baseController.session,
                                "indicador_actividad",
                                record.indicador_id);
                        }
                    }
                }
            }
        }

        var capi = 5;
        monitoreo_actividadv.capi = capi;
        if (monitoreo_actividadv.poa_calc) {
            monitoreo_actividadv.poa_anos = monitoreo_actividadv.extract_anos(monitoreo_actividadv.poa_calc);
            monitoreo_actividadv.poa_anos.sort(function (a, b) {
                if (a === Infinity)
                    return 1;
                else if (isNaN(a))
                    return -1;
                else
                    return a - b;
            });

            monitoreo_actividadv.poa_valor = [];

            for (var a = 0; a < (monitoreo_actividadv.poa_anos.length * capi); a++) {
                var indica = ((a + 1) % capi);
                if (indica === 1) indica = {id: monitoreo_actividadv.poa_anos[Math.floor(a / capi)], value: "P"};
                if (indica === 2) indica = {id: monitoreo_actividadv.poa_anos[Math.floor(a / capi)], value: "A"};
                if (indica === 3) indica = {id: monitoreo_actividadv.poa_anos[Math.floor(a / capi)], value: "D"};
                if (indica === (4)) indica = {id: monitoreo_actividadv.poa_anos[Math.floor(a / capi)], value: "%"};
                if (indica === (0)) indica = {id: monitoreo_actividadv.poa_anos[Math.floor(a / capi)], value: "Alerta"};
                monitoreo_actividadv.poa_valor[a] = indica;
            }
        }

        monitoreo_actividadv.colspaninit = 12;
        monitoreo_actividadv.colspaninit += monitoreo_actividadv.poa_anos.length * capi;
        setTimeout(function () {
            $('#minusubcontent').floatingScrollbar();
        }, 1000);

        animation1.stoploading(`.subcontent`);
        monitoreo_actividadv.refreshAngular();
    };

    monitoreo_actividadv.detallePeriodo = function (row, PD, tipo_meta) {
        var ul = "<ul>";
        for (var i of PD) {
            ul += `<li>${i.periodo}: ${monitoreo_actividadv.format(i.valor, tipo_meta)}</li>`;
        }
        ul += "</ul>";
        monitoreo_actividadv.modal.simpleModal(ul,
            {
                header: {
                    title: `Detalles del Indicador "${row.indicador}" para el año ${PD[0].ano}`
                }
            }
            , true);
    };
    monitoreo_actividadv.format_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_actividadv.format(eval(`${calc}`), tipo_meta);
    };
    monitoreo_actividadv.raw_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_actividadv.format(eval(`${calc}`), tipo_meta);
    };

    monitoreo_actividadv.pasado = function (row, periodo) {
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


    monitoreo_actividadv.dif = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_actividadv.ano_singleraw(row.indicador_data.anos, ra.id) && monitoreo_actividadv.ano_singleraw(row.indicador_data.anos_a, ra.id))
            return monitoreo_actividadv.format_calc(monitoreo_actividadv.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_actividadv.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
        return "";
    };
    monitoreo_actividadv.difraw = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        return monitoreo_actividadv.raw_calc(monitoreo_actividadv.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_actividadv.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
    };
    monitoreo_actividadv.alert_color = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_actividadv.percent(row, ra) >= 95 ? "#009900" : monitoreo_actividadv.percent(row, ra) >= 75 ? "#eae42dfc" : "#FF0000"
        return "";
    };
    monitoreo_actividadv.alert_tootip = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_actividadv.percent(row, ra) >= 95 ? "Logrado" : monitoreo_actividadv.percent(row, ra) >= 75 ? "En observación" : "No logrado";
        return "";
    };
    monitoreo_actividadv.percent = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_actividadv.ano_single(row.indicador_data.anos_a, ra.id) == null) {
            return 0;
        }
        var base = parseFloat(monitoreo_actividadv.ano_singleraw(row.indicador_data.anos, ra.id));
        var variable = parseFloat(monitoreo_actividadv.ano_singleraw(row.indicador_data.anos_a, ra.id));
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
    monitoreo_actividadv.ano_single = function (anos, ano, tipo_meta) {
        if (anos) {
            var rows = anos.split(';');
            for (var row of rows) {
                if (row) {
                    var data = row.split('=');
                    if (data[0] == ano) {
                        return monitoreo_actividadv.format(data[1], tipo_meta);
                    }
                }
            }
        }
        return null;
    };
    monitoreo_actividadv.ano_singleraw = function (anos, ano, tipo_meta) {
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
    monitoreo_actividadv.format = function (valor, tipo_meta) {

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

    monitoreo_actividadv.extract_companies = function (list) {
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
    monitoreo_actividadv.extract_companies_id = function (list) {
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

    monitoreo_actividadv.extract_anos_periodo = function (list) {
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
    monitoreo_actividadv.extract_anos = function (list) {
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

    monitoreo_actividadv.exportXLS = function () {
        var url = $("#monitoreo_actividadExportXLS").excelexportjs({
            containerid: "monitoreo_actividadExportXLS",
            datatype: 'table',
            worksheetName: `Monitoreo y Seguimiento de Actividades`,
            returnUri: true
        });
        DOWNLOAD.excel("Monitoreo y Seguimiento de Actividades", url);
    };

    monitoreo_actividadv.exportPDF = function () {


        $("#monitoreo_actividadExport").printThis({
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

    //monitoreo_actividadv.monitoreo_actividadv_get();

    monitoreo_actividadv.openmodalField = function (value) {

        monitoreo_actividadv.tipeExport = value.toString();

        monitoreo_actividadv.modal.modalView("monitoreo_actividadv/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa monitoreo y seguimiento de Actividad".`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    }
});
