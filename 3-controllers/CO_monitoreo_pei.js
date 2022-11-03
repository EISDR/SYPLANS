app.controller("monitoreo_pei", function ($scope, $http, $compile) {
    monitoreo_pei = this;
    monitoreo_pei.destroyForm = false;
    var user = new SESSION().current();
    monitoreo_pei.session = user;
    //monitoreo_pei.fixFilters = [];
    //monitoreo_pei.singular = "singular";
    //monitoreo_pei.plural = "plural";
    monitoreo_pei.headertitle = "Monitoreo y Seguimiento - PEI";
    //monitoreo_pei.destroyForm = false;
    //monitoreo_pei.permissionTable = "tabletopermission";
    RUNCONTROLLER("monitoreo_pei", monitoreo_pei, $scope, $http, $compile);
    RUN_B("monitoreo_pei", monitoreo_pei, $scope, $http, $compile);
    monitoreo_pei.colors = COLOR.secundary;
    monitoreo_pei.resumen_pei_list = [];
    monitoreo_pei.tipeExport = '';
    monitoreo_pei.yearactual = new Date().getFullYear();
    monitoreo_pei.modover = location.href.indexOf('?ver') !== -1;
    var animation1 = new ANIMATION();
    monitoreo_pei.rowspanme = function (field, value, list) {
        var r = 0;
        r = list.filter(d => {
            if (value != ' ')
                return eval(`d.${field} == value`)
        }).length;
        return r ? r : 1;
    };
    monitoreo_pei.seeme = function (field, value, key, list) {
        if (list[key - 1])
            if (value != ' ')
                return list[key - 1][field] != value;
        return true;
    };
    monitoreo_pei.tipometa = function (id) {
        return monitoreo_pei.session.tipoMenta.filter(d => {
            return d.id == id
        })[0] || {nombre: "N/A"};
    };
    monitoreo_pei.cumplen = function (rows, conditions) {
        if (!rows)
            return false;

        if (rows.filter(row => ((monitoreo_pei.institucion != '[NULL]' ? monitoreo_pei.institucion == (row.institucion || row.compania) : true))).length > 0) {
            return true
        }
        return false;
    };
    monitoreo_pei.validar = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea validar el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_pei.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_pei.send_email_indicador(true, 'indicador pei', 'indicador_pei', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_pei", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_pei.permission(row.indicador_id, peri, null);
                        }
                    });
                else
                    monitoreo_pei.send_email_indicador(true, 'indicador pei', 'indicador_pei', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_pei", undefined, async function () {
                        if (peri) {
                            await monitoreo_pei.permission(row.indicador_id, peri, null);
                        }
                    });


                row.indicador_condition = null;
                monitoreo_pei.refreshAngular();
                SWEETALERT.stop();
            }
        });

    };
    monitoreo_pei.devolver = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea devolver el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_pei.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_pei === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_pei.send_email_indicador(false, 'indicador pei', 'indicador_pei', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_pei", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_pei.permission(row.indicador_id, peri, 1);
                        }
                    });
                else
                    monitoreo_pei.send_email_indicador(false, 'indicador pei', 'indicador_pei', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_pei", undefined, async function () {
                        if (peri) {
                            await monitoreo_pei.permission(row.indicador_id, peri, 1);
                        }
                    });
                row.indicador_condition = 1;

                monitoreo_pei.refreshAngular();
                SWEETALERT.stop();
            }
        });
    };
    monitoreo_pei.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
        send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_pei_ano', periodo, callback);
    };
    monitoreo_pei.direccionmeta = function (val) {
        if (val == 1) {
            return "Ascendente";
        } else if (val == 2) {
            return "Descendente";
        } else {
            return "No Varianza";
        }
    };
    monitoreo_pei.openIndicador = function (type, indicador) {
        open_ficha_indicador(type, indicador)
    };
    monitoreo_pei.openIndicadorComment = async function (type, indicador, allow, periodo) {
        var allowver = false;
        if (periodo === undefined) {
            allowver = true;
        }
        var permi = await monitoreo_pei.permission(indicador, periodo);
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
    monitoreo_pei.openProductoComment = function (type, indicador, cond, estatus) {
        var allow = false;
        if (estatus !== 'Completado') {
            allow = true;
        }
        open_comments_indicador(type, indicador, allow);
    };
    monitoreo_pei.statusText = function (cond, estatus) {
        var text = estatus;
        if (estatus === 'Abierto') {
            text = cond;
        }
        return text;
    };
    monitoreo_pei.statusColor = function (cond, estatus) {
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
    monitoreo_pei.indicadorColor = function (row) {
        if (row.indicador_condition == 1) {
            return "red";
        }
        return "white";
    };
    monitoreo_pei.statusColorFont = function (cond, estatus) {
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
    monitoreo_pei.desableDepa = function (val) {
        monitoreo_pei.disabledepa = val;
        monitoreo_pei.refreshAngular();
    };
    monitoreo_pei.permission = async function (indicador, periodo, set) {
        var exist = monitoreo_pei.poa_permission.filter(d => d.indicador_pei == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Prodcutos"
            };
        } else {
            if (set !== undefined) {
                animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
                monitoreo_pei.poa_permission = await BASEAPI.listp('vw_permission_pei', {
                    limit: 0,
                    orderby: "$ compania",
                    order: "asc",
                    where: [{
                        field: "compania",
                        value: user.compania_id
                    }]
                });
                monitoreo_pei.poa_permission = monitoreo_pei.poa_permission.data;
                monitoreo_pei.refreshAngular();
                animation1.stoploading(`.subcontent`);
                //
                // exist[0].condition = set;
            }
            return exist[0];
        }
    };
    monitoreo_pei.permissionNormal = function (indicador, periodo) {
        var exist = monitoreo_pei.poa_permission.filter(d => d.indicador_pei == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Prodcutos"
            };
        } else {
            return exist[0];
        }
    };
    monitoreo_pei.monitoreo_pei_get = async function () {


        var user = new SESSION().current();

        monitoreo_pei.poa_permission = await BASEAPI.listp('vw_permission_pei', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
        monitoreo_pei.poa_permission = monitoreo_pei.poa_permission.data;

        monitoreo_pei.poa_data = await BASEAPI.listp('vw_monitoreo_pei', {
            limit: 0,
            orderby: "$ compania,periodo_poa,r1,objetivo_estrategico,estrategia,resultado,indicador",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }, {
                field: "indicador_id",
                operator: parseInt(monitoreo_pei.indicador) ? "=" : ">",
                value: parseInt(monitoreo_pei.indicador) || 0
            }
            ]
        });
        monitoreo_pei.poa_data = monitoreo_pei.poa_data.data;

        // monitoreo_pei.indicadores = [...new Set(monitoreo_pei.poa_data.map(d => {
        //     return d.indicador
        // }).filter(d => {
        //     return (d||"").trim() !== ''
        // }))];
        // monitoreo_pei.indicadores = monitoreo_pei.indicadores.map(d => {
        //     return {nombre: d, id: d}
        // });
        // monitoreo_pei.indicador = "[NULL]";
        // monitoreo_pei.form.options.indicador.data = [];
        // monitoreo_pei.form.options.indicador.data = monitoreo_pei.indicadores;
        // monitoreo_pei.refreshAngular();
        // monitoreo_pei.form.loadDropDown('indicador');
        monitoreo_pei.poa_calc = await BASEAPI.listp('vw_aii_pei', {
            limit: 0,
            orderby: "$ compania,r1, r2",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        monitoreo_pei.poa_calc = monitoreo_pei.poa_calc.data;

        monitoreo_pei.anos = [];
        monitoreo_pei.pequenoHistorial = [];
        for (var item of monitoreo_pei.poa_data) {
            if (monitoreo_pei.anos.filter(d =>
                d.eje_estrategico == item.eje_estrategico &&
                d.objetivo_estrategico == item.objetivo_estrategico &&
                d.estrategia == item.estrategia &&
                d.resultado == item.resultado &&
                d.entidad == item.entidad
            ).length === 0) {
                monitoreo_pei.anos.push({
                    eje_estrategico: item.eje_estrategico,
                    objetivo_estrategico: item.objetivo_estrategico,
                    estrategia: item.estrategia,
                    resultado: item.resultado,
                    entidad: item.entidad,
                    compania_nombre: item.compania_nombre,
                    records: monitoreo_pei.poa_data.filter(d =>
                        d.eje_estrategico == item.eje_estrategico &&
                        d.objetivo_estrategico == item.objetivo_estrategico &&
                        d.estrategia == item.estrategia &&
                        d.resultado == item.resultado &&
                        d.entidad == item.entidad
                    )
                });
                for (var indicador in monitoreo_pei.anos[monitoreo_pei.anos.length - 1].records) {
                    var record = monitoreo_pei.anos[monitoreo_pei.anos.length - 1].records[indicador];
                    if (monitoreo_pei.poa_calc.filter(d => d.indicador_id == record.indicador_id).length > 0) {
                        var indi = monitoreo_pei.poa_calc.filter(d => d.indicador_id == record.indicador_id)[0];
                        record.indicador_data = indi;
                        if (!monitoreo_pei.pequenoHistorial[record.indicador_id]) {
                            monitoreo_pei.pequenoHistorial[record.indicador_id] = await aacontroldemandofalso.cumplimiento(
                                "vw_report_indicadores_pei",
                                baseController.session,
                                "indicador_pei",
                                record.indicador_id);
                        }
                    }
                }
            }
        }

        var capi = 5;
        if (monitoreo_pei.modover)
            capi--;
        monitoreo_pei.capi = capi;
        if (monitoreo_pei.poa_calc) {
            monitoreo_pei.poa_anos = monitoreo_pei.extract_anos(monitoreo_pei.poa_calc);
            monitoreo_pei.poa_anos.sort(function (a, b) {
                if (a === Infinity)
                    return 1;
                else if (isNaN(a))
                    return -1;
                else
                    return a - b;
            });
            monitoreo_pei.poa_valor = [];

            for (var a = 0; a < (monitoreo_pei.poa_anos.length * capi); a++) {
                var indica = ((a + 1) % capi);

                if (indica === 1) indica = {id: monitoreo_pei.poa_anos[Math.floor(a / capi)], value: "P"};
                if (indica === 2) indica = {id: monitoreo_pei.poa_anos[Math.floor(a / capi)], value: "A"};
                if (indica === 3) indica = {id: monitoreo_pei.poa_anos[Math.floor(a / capi)], value: "D"};
                if (indica === (monitoreo_pei.modover ? 0 : 4)) indica = {
                    id: monitoreo_pei.poa_anos[Math.floor(a / capi)],
                    value: "%"
                };
                if (indica === (monitoreo_pei.modover ? 4 : 0)) indica = {
                    id: monitoreo_pei.poa_anos[Math.floor(a / capi)],
                    value: "Alerta"
                };
                monitoreo_pei.poa_valor[a] = indica;
            }
        }

        monitoreo_pei.colspaninit = 9;
        monitoreo_pei.colspaninit += monitoreo_pei.poa_anos.length * capi;
        setTimeout(function () {
            $('#minusubcontent').floatingScrollbar();
        }, 1000);

        animation1.stoploading(`.subcontent`);
        monitoreo_pei.refreshAngular();
    };
    monitoreo_pei.detallePeriodo = function (row, PD, tipo_meta) {
        var ul = "<ul>";
        for (var i of PD) {
            ul += `<li>${i.periodo}: ${monitoreo_pei.format(i.valor, tipo_meta)}</li>`;
        }
        ul += "</ul>";
        monitoreo_pei.modal.simpleModal(ul,
            {
                header: {
                    title: `Detalles del Indicador "${row.indicador}" para el año ${PD[0].ano}`
                }
            }
            , true);
    };
    monitoreo_pei.format_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_pei.format(eval(`${calc}`), tipo_meta);
    };
    monitoreo_pei.raw_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_pei.format(eval(`${calc}`), tipo_meta);
    };
    monitoreo_pei.pasado = function (row, periodo) {
        var year = new Date().getFullYear();
        if (!row.indicador_data)
            return false;
        return (parseInt(row.indicador_data.ano) <= year);
    };
    monitoreo_pei.dif = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_pei.ano_singleraw(row.indicador_data.anos, ra.id) && monitoreo_pei.ano_singleraw(row.indicador_data.anos_a, ra.id))
            return monitoreo_pei.format_calc(monitoreo_pei.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_pei.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
        return "";
    };
    monitoreo_pei.difraw = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        return monitoreo_pei.raw_calc(monitoreo_pei.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_pei.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
    };
    monitoreo_pei.alert_color = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_pei.percent(row, ra) >= 95 ? "#009900" : monitoreo_pei.percent(row, ra) >= 75 ? "#eae42dfc" : "#FF0000"
        return "";
    };
    monitoreo_pei.alert_tootip = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_pei.percent(row, ra) >= 95 ? "Logrado" : monitoreo_pei.percent(row, ra) >= 75 ? "En observación" : "No logrado";
        return "";
    };
    monitoreo_pei.percent = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_pei.ano_single(row.indicador_data.anos_a, ra.id) == null) {
            return 0;
        }
        var base = parseFloat(monitoreo_pei.ano_singleraw(row.indicador_data.anos, ra.id));
        var variable = parseFloat(monitoreo_pei.ano_singleraw(row.indicador_data.anos_a, ra.id));

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
    monitoreo_pei.ano_single = function (anos, ano, tipo_meta) {
        if (anos) {
            var rows = anos.split(';');
            for (var row of rows) {
                if (row) {
                    var data = row.split('=');
                    if (data[0] == ano) {
                        return monitoreo_pei.format(data[1], tipo_meta);
                    }
                }
            }
        }
        return null;
    };
    monitoreo_pei.ano_singleraw = function (anos, ano, tipo_meta) {
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
    monitoreo_pei.format = function (valor, tipo_meta) {

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
    monitoreo_pei.extract_companies = function (list) {
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
    monitoreo_pei.extract_companies_id = function (list) {
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
    monitoreo_pei.extract_anos_periodo = function (list) {
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
    monitoreo_pei.extract_anos = function (list) {
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
    monitoreo_pei.exportXLS = function () {
        var url = $("#monitoreo_peiExportXLS").excelexportjs({
            containerid: "monitoreo_peiExportXLS",
            datatype: 'table',
            worksheetName: `Monitoreo y Seguimiento PEI`,
            returnUri: true
        });
        DOWNLOAD.excel("Monitoreo y Seguimiento PEI", url);
    };
    monitoreo_pei.exportPDF = function () {
        //
        $("#monitoreo_peiExport").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333
        });
    };
    //monitoreo_pei.monitoreo_pei_get();


});
