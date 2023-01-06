app.controller("monitoreo_actividad", function ($scope, $http, $compile) {
    monitoreo_actividad = this;
    monitoreo_actividad.destroyForm = false;
    var user = new SESSION().current();
    //monitoreo_actividad.fixFilters = [];
    //monitoreo_actividad.singular = "singular";
    //monitoreo_actividad.plural = "plural";
    monitoreo_actividad.headertitle = "Monitoreo y Seguimiento - Actividades";
    //monitoreo_actividad.destroyForm = false;
    //monitoreo_actividad.permissionTable = "tabletopermission";
    RUNCONTROLLER("monitoreo_actividad", monitoreo_actividad, $scope, $http, $compile);
    RUN_B("monitoreo_actividad", monitoreo_actividad, $scope, $http, $compile);
    monitoreo_actividad.colors = COLOR.secundary;
    monitoreo_actividad.resumen_pei_list = [];
    monitoreo_actividad.tipeExport = '';
    monitoreo_actividad.session = user;
    monitoreo_actividad.modover = location.href.indexOf('?ver') !== -1;
    var animation1 = new ANIMATION();

    monitoreo_actividad.rowspanme = function (field, value, ally) {
        var r = 0;
        let list = ally.filter(row => ((monitoreo_actividad.institucion != '[NULL]' ? monitoreo_actividad.institucion == (row.institucion || row.compania) : true)
        ));
        r = list.filter(d => {
            return eval(`d.${field} == value`)
        }).length;
        return r ? r : 1;
    };
    monitoreo_actividad.seeme = function (field, value, key, ally) {
        let list = ally.filter(row => ((monitoreo_actividad.institucion != '[NULL]' ? monitoreo_actividad.institucion == (row.institucion || row.compania) : true)
        ));
        if (list[key - 1])
            return list[key - 1][field] != value;
        return true;
    };
    monitoreo_actividad.soya = function (rows) {
        return rows.filter(row => ((monitoreo_actividad.institucion != '[NULL]' ? monitoreo_actividad.institucion == (row.institucion || row.compania) : true)
        ));
    };
    monitoreo_actividad.tipometa = function (id) {
        return monitoreo_actividad.session.tipoMenta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    };

    monitoreo_actividad.cumplen = function (rows, conditions) {
        if (!rows) {
            monitoreo_actividad.show_me_btn = false;
            return false;
        }
        if (rows.filter(row => ((monitoreo_actividad.institucion != '[NULL]' ? monitoreo_actividad.institucion == (row.institucion || row.compania) : true))).length > 0) {
            monitoreo_actividad.show_me_btn = true;
            return true
        }
        return false;
    };
    monitoreo_actividad.validar = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea validar el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_actividad.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_actividad.send_email_indicador(true, 'indicador actividad', 'indicador_actividad', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_actividad", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_actividad.permission(row.indicador_id, peri, null);
                        }
                    });
                else
                    monitoreo_actividad.send_email_indicador(true, 'indicador actividad', 'indicador_actividad', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_actividad", undefined, async function () {
                        if (peri) {
                            await monitoreo_actividad.permission(row.indicador_id, peri, null);
                        }
                    });


                row.indicador_condition = null;
                monitoreo_actividad.refreshAngular();
                SWEETALERT.stop();
            }
        });

    };
    monitoreo_actividad.devolver = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea devolver el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_actividad.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_actividad.send_email_indicador(false, 'indicador actividad', 'indicador_actividad', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_actividad", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_actividad.permission(row.indicador_id, peri, 1);
                        }
                    });
                else
                    monitoreo_actividad.send_email_indicador(false, 'indicador actividad', 'indicador_actividad', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_actividad", undefined, async function () {
                        if (peri) {
                            await monitoreo_actividad.permission(row.indicador_id, peri, 1);
                        }
                    });
                row.indicador_condition = 1;

                monitoreo_actividad.refreshAngular();
                SWEETALERT.stop();
            }
        });
    };
    monitoreo_actividad.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
        send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_actividad_periodo', periodo, callback);
    };
    monitoreo_actividad.direccionmeta = function (val) {
        if (val == 1) {
            return "Ascendente";
        } else if (val == 2) {
            return "Descendente";
        } else {
            return "No Varianza";
        }
    };
    monitoreo_actividad.openIndicador = function (type, indicador) {
        open_ficha_indicador(type, indicador)
    };
    monitoreo_actividad.openIndicadorComment = async function (type, indicador, allow, periodo) {
        var allowver = false;
        if (periodo === undefined) {
            allowver = true;
        }
        var permi = await monitoreo_actividad.permission(indicador, periodo);
        if (1== 1) {
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
    monitoreo_actividad.openProductoComment = function (type, indicador, cond, estatus) {
        var allow = false;
        if (estatus !== 'Completado') {
            allow = true;
        }
        open_comments_indicador(type, indicador, allow);
    };
    monitoreo_actividad.openActividadComment = function (type, indicador, cond, estatus) {
        var allow = false;
        if (estatus !== 'Completado') {
            allow = true;
        }
        open_comments_indicador(type, indicador, allow);
    };
    monitoreo_actividad.statusText = function (cond, estatus) {
        var text = estatus;
        if (estatus === 'Abierto' || estatus === 'Abierta') {
            text = cond;
        }
        return text;
    };
    monitoreo_actividad.statusColor = function (cond, estatus) {
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

    monitoreo_actividad.indicadorColor = function (row) {
        if (row.indicador_condition == 1) {
            return "red";
        }
        return "white";
    };
    monitoreo_actividad.statusColorFont = function (cond, estatus) {
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
    monitoreo_actividad.desableDepa = function (val) {
        monitoreo_actividad.disabledepa = val;
        monitoreo_actividad.refreshAngular();
    };

    monitoreo_actividad.permission = async function (indicador, periodo, set) {
        var exist = monitoreo_actividad.poa_permission.filter(d => d.indicador_actividad == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Prodcutos"
            };
        } else {
            if (set !== undefined) {
                animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
                monitoreo_actividad.poa_permission = await BASEAPI.listp('vw_permission_actividad', {
                    limit: 0,
                    orderby: "$ compania",
                    order: "asc",
                    where: [{
                        field: "compania",
                        value: user.compania_id
                    }]
                });
                monitoreo_actividad.poa_permission = monitoreo_actividad.poa_permission.data;
                monitoreo_actividad.refreshAngular();
                animation1.stoploading(`.subcontent`);
                //
                // exist[0].condition = set;
            }
            return exist[0];
        }
    };

    monitoreo_actividad.permissionNormal = function (indicador, periodo) {
        var exist = monitoreo_actividad.poa_permission.filter(d => d.indicador_actividad == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Prodcutos"
            };
        } else {
            return exist[0];
        }
    };

    monitoreo_actividad.monitoreo_actividad_get = async function () {


        var user = new SESSION().current();

        monitoreo_actividad.poa_permission = await BASEAPI.listp('vw_permission_actividad', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
        monitoreo_actividad.poa_permission = monitoreo_actividad.poa_permission.data;
        monitoreo_actividad.poa_data = await BASEAPI.listp('vw_monitoreo_actividad', {
            limit: 0,
            orderby: "$ compania,periodo_poa,r1,objetivo_estrategico,estrategia,resultado,departamento,producto_id,estatus,actividad,indicador",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            },
                {
                    field: "poa",
                    value: monitoreo_actividad.session.poa_id
                },
                {
                    field: "id_departamento",
                    operator: (monitoreo_actividad.departamento || []).length > 0 ? " in " : ">",
                    value: (monitoreo_actividad.departamento || []).length > 0 ? monitoreo_actividad.departamento : "0",
                },
                {
                    field: "indicador_id",
                    operator: parseInt(monitoreo_actividad.indicador) ? "=" : ">",
                    value: parseInt(monitoreo_actividad.indicador) || 0
                }
            ]
        });
        monitoreo_actividad.poa_data = monitoreo_actividad.poa_data.data;

        // monitoreo_actividad.indicadores = [...new Set(monitoreo_actividad.poa_data.map(d => {
        //     return d.indicador
        // }).filter(d => {
        //     return (d||"").trim() !== ''
        // }))];
        // monitoreo_actividad.indicadores = monitoreo_actividad.indicadores.map(d => {
        //     return {nombre: d, id: d}
        // });
        // monitoreo_actividad.indicador = "[NULL]";
        // monitoreo_actividad.form.options.indicador.data = [];
        // monitoreo_actividad.form.options.indicador.data = monitoreo_actividad.indicadores;
        // monitoreo_actividad.refreshAngular();
        // monitoreo_actividad.form.loadDropDown('indicador');
        monitoreo_actividad.poa_calc = await BASEAPI.listp('vw_aii_act', {
            limit: 0,
            orderby: "$ compania,r1, r2",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        monitoreo_actividad.poa_calc = monitoreo_actividad.poa_calc.data;

        monitoreo_actividad.anos = [];
        monitoreo_actividad.pequenoHistorial = [];
        for (var item of monitoreo_actividad.poa_data) {
            if (monitoreo_actividad.anos.filter(d =>
                d.periodo_poa == item.periodo_poa &&
                d.eje_estrategico == item.eje_estrategico &&
                d.objetivo_estrategico == item.objetivo_estrategico &&
                d.estrategia == item.estrategia &&
                d.resultado == item.resultado &&
                d.entidad == item.entidad
            ).length === 0) {
                monitoreo_actividad.anos.push({
                    periodo_poa: item.periodo_poa,
                    eje_estrategico: item.eje_estrategico,
                    objetivo_estrategico: item.objetivo_estrategico,
                    estrategia: item.estrategia,
                    resultado: item.resultado,
                    entidad: item.entidad,
                    compania_nombre: item.compania_nombre,
                    records: monitoreo_actividad.poa_data.filter(d =>
                        d.periodo_poa == item.periodo_poa &&
                        d.eje_estrategico == item.eje_estrategico &&
                        d.objetivo_estrategico == item.objetivo_estrategico &&
                        d.estrategia == item.estrategia &&
                        d.resultado == item.resultado &&
                        d.entidad == item.entidad
                    )
                });
                for (var indicador in monitoreo_actividad.anos[monitoreo_actividad.anos.length - 1].records) {
                    var record = monitoreo_actividad.anos[monitoreo_actividad.anos.length - 1].records[indicador];
                    if (monitoreo_actividad.poa_calc.filter(d => d.indicador_id == record.indicador_id).length > 0) {
                        var indi = monitoreo_actividad.poa_calc.filter(d => d.indicador_id == record.indicador_id)[0];
                        record.indicador_data = indi;
                        if (!monitoreo_actividad.pequenoHistorial[record.indicador_id]) {
                            monitoreo_actividad.pequenoHistorial[record.indicador_id] = await aacontroldemandofalso.cumplimiento(
                                "vw_report_indicadores_actividad",
                                baseController.session,
                                "indicador_actividad",
                                record.indicador_id);
                        }
                    }
                }
                if (monitoreo_actividad.anos[0]) {
                    monitoreo_actividad.eje_estrategico_filter = monitoreo_actividad.anos[0].eje_estrategico;
                    monitoreo_actividad.form.loadDropDown("eje_estrategico_filter");
                }
            }
        }

        var capi = 5;
        if (monitoreo_actividad.modover)
            capi--;
        monitoreo_actividad.capi = capi;
        if (monitoreo_actividad.poa_calc) {
            monitoreo_actividad.poa_anos = monitoreo_actividad.extract_anos(monitoreo_actividad.poa_calc);
            monitoreo_actividad.poa_anos.sort(function (a, b) {
                if (a === Infinity)
                    return 1;
                else if (isNaN(a))
                    return -1;
                else
                    return a - b;
            });

            monitoreo_actividad.poa_valor = [];

            for (var a = 0; a < (monitoreo_actividad.poa_anos.length * capi); a++) {
                var indica = ((a + 1) % capi);
                if (indica === 1) indica = {id: monitoreo_actividad.poa_anos[Math.floor(a / capi)], value: "P"};
                if (indica === 2) indica = {id: monitoreo_actividad.poa_anos[Math.floor(a / capi)], value: "A"};
                if (indica === 3) indica = {id: monitoreo_actividad.poa_anos[Math.floor(a / capi)], value: "D"};
                if (indica === (monitoreo_actividad.modover ? 0 : 4)) indica = {
                    id: monitoreo_actividad.poa_anos[Math.floor(a / capi)],
                    value: "%"
                };
                if (indica === (monitoreo_actividad.modover ? 4 : 0)) indica = {
                    id: monitoreo_actividad.poa_anos[Math.floor(a / capi)],
                    value: "Alerta"
                };
                monitoreo_actividad.poa_valor[a] = indica;
            }
        }

        monitoreo_actividad.colspaninit = 12;
        monitoreo_actividad.colspaninit += monitoreo_actividad.poa_anos.length * capi;
        setTimeout(function () {
            $('#minusubcontent').floatingScrollbar();
        }, 1000);

        animation1.stoploading(`.subcontent`);
        monitoreo_actividad.refreshAngular();
    };

    monitoreo_actividad.detallePeriodo = function (row, PD, tipo_meta) {
        var ul = "<ul>";
        for (var i of PD) {
            ul += `<li>${i.periodo}: ${monitoreo_actividad.format(i.valor, tipo_meta)}</li>`;
        }
        ul += "</ul>";
        monitoreo_actividad.modal.simpleModal(ul,
            {
                header: {
                    title: `Detalles del Indicador "${row.indicador}" para el año ${PD[0].ano}`
                }
            }
            , true);
    };
    monitoreo_actividad.format_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_actividad.format(eval(`${calc}`), tipo_meta);
    };
    monitoreo_actividad.raw_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_actividad.format(eval(`${calc}`), tipo_meta);
    };

    monitoreo_actividad.pasado = function (row, periodo) {
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

    monitoreo_actividad.dif = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_actividad.ano_singleraw(row.indicador_data.anos, ra.id) && monitoreo_actividad.ano_singleraw(row.indicador_data.anos_a, ra.id))
            return monitoreo_actividad.format_calc(monitoreo_actividad.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_actividad.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
        return "";
    };
    monitoreo_actividad.difraw = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        return monitoreo_actividad.raw_calc(monitoreo_actividad.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_actividad.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
    };
    monitoreo_actividad.alert_color = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_actividad.percent(row, ra) >= 95 ? "#009900" : monitoreo_actividad.percent(row, ra) >= 75 ? "#eae42dfc" : "#FF0000"
        return "";
    };
    monitoreo_actividad.alert_tootip = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_actividad.percent(row, ra) >= 95 ? "Logrado" : monitoreo_actividad.percent(row, ra) >= 75 ? "En observación" : "No logrado";
        return "";
    };
    monitoreo_actividad.percent = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_actividad.ano_single(row.indicador_data.anos_a, ra.id) == null) {
            return 0;
        }
        var base = parseFloat(monitoreo_actividad.ano_singleraw(row.indicador_data.anos, ra.id));
        var variable = parseFloat(monitoreo_actividad.ano_singleraw(row.indicador_data.anos_a, ra.id));
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
    monitoreo_actividad.ano_single = function (anos, ano, tipo_meta) {
        if (anos) {
            var rows = anos.split(';');
            for (var row of rows) {
                if (row) {
                    var data = row.split('=');
                    if (data[0] == ano) {
                        return monitoreo_actividad.format(data[1], tipo_meta);
                    }
                }
            }
        }
        return null;
    };

    monitoreo_actividad.ano_singleraw = function (anos, ano, tipo_meta) {
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
    monitoreo_actividad.format = function (valor, tipo_meta) {

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

    monitoreo_actividad.extract_companies = function (list) {
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
    monitoreo_actividad.extract_companies_id = function (list) {
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

    monitoreo_actividad.extract_anos_periodo = function (list) {
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
    monitoreo_actividad.extract_anos = function (list) {
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

    monitoreo_actividad.exportXLS = function () {
        var url = $("#monitoreo_actividadExportXLS").excelexportjs({
            containerid: "monitoreo_actividadExportXLS",
            datatype: 'table',
            worksheetName: `Monitoreo y Seguimiento de Actividades`,
            returnUri: true
        });
        DOWNLOAD.excel("Monitoreo y Seguimiento de Actividades", url);
    };

    monitoreo_actividad.exportPDF = function () {


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

    //monitoreo_actividad.monitoreo_actividad_get();

    monitoreo_actividad.openmodalField = function (value) {

        monitoreo_actividad.tipeExport = value.toString();

        monitoreo_actividad.modal.modalView("monitoreo_actividad/export", {

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
