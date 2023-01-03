app.controller("monitoreo_peiv", function ($scope, $http, $compile) {
    monitoreo_peiv = this;
    monitoreo_peiv.destroyForm = false;
    var user = new SESSION().current();
    monitoreo_peiv.session = user;
    //monitoreo_peiv.fixFilters = [];
    //monitoreo_peiv.singular = "singular";
    //monitoreo_peiv.plural = "plural";
    //monitoreo_peiv.headertitle = "Hola Title";
    //monitoreo_peiv.destroyForm = false;
    //monitoreo_peiv.permissionTable = "tabletopermission";
    RUNCONTROLLER("monitoreo_peiv", monitoreo_peiv, $scope, $http, $compile);
    RUN_B("monitoreo_peiv", monitoreo_peiv, $scope, $http, $compile);
    monitoreo_peiv.colors = COLOR.secundary;
    monitoreo_peiv.resumen_pei_list = [];
    monitoreo_peiv.tipeExport = '';
    monitoreo_peiv.yearactual = new Date().getFullYear();
    monitoreo_peiv.modover = true;
    var animation1 = new ANIMATION();

    monitoreo_peiv.rowspanme = function (field, value, list) {
        var r = 0;
        r = list.filter(d => {
            if (value != ' ')
                return eval(`d.${field} == value`)
        }).length;
        return r ? r : 1;
    };
    monitoreo_peiv.seeme = function (field, value, key, list) {
        if (list[key - 1])
            if (value != ' ')
                return list[key - 1][field] != value;
        return true;
    };
    monitoreo_peiv.tipometa = function (id) {
        return baseController.list_tipo_meta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    };
    monitoreo_peiv.tipometa = function (id) {
        return monitoreo_peiv.session.tipoMenta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    };

    monitoreo_peiv.cumplen = function (rows, conditions) {
        if (!rows) {
            monitoreo_peiv.show_me_btn = false;
            return false;
        }
        if (rows.filter(row => ((monitoreo_peiv.institucion != '[NULL]' ? monitoreo_peiv.institucion == (row.institucion || row.compania) : true))).length > 0) {
            monitoreo_peiv.show_me_btn = true;
            return true
        }
        return false;
    };
    monitoreo_peiv.validar = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea validar el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_peiv.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_peiv.send_email_indicador(true, 'indicador pei', 'indicador_pei', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_peiv", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_peiv.permission(row.indicador_id, peri, null);
                        }
                    });
                else
                    monitoreo_peiv.send_email_indicador(true, 'indicador pei', 'indicador_pei', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_peiv", undefined, async function () {
                        if (peri) {
                            await monitoreo_peiv.permission(row.indicador_id, peri, null);
                        }
                    });


                row.indicador_condition = null;
                monitoreo_peiv.refreshAngular();
                SWEETALERT.stop();
            }
        });

    };
    monitoreo_peiv.devolver = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea devolver el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_peiv.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_pei === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_peiv.send_email_indicador(false, 'indicador pei', 'indicador_pei', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_peiv", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_peiv.permission(row.indicador_id, peri, 1);
                        }
                    });
                else
                    monitoreo_peiv.send_email_indicador(false, 'indicador pei', 'indicador_pei', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_peiv", undefined, async function () {
                        if (peri) {
                            await monitoreo_peiv.permission(row.indicador_id, peri, 1);
                        }
                    });
                row.indicador_condition = 1;

                monitoreo_peiv.refreshAngular();
                SWEETALERT.stop();
            }
        });
    };
    monitoreo_peiv.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
        send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_pei_ano', periodo, callback);
    };
    monitoreo_peiv.direccionmeta = function (val) {
        if (val == 1) {
            return "Ascendente";
        } else if (val == 2) {
            return "Descendente";
        } else {
            return "No Varianza";
        }
    };
    monitoreo_peiv.openIndicador = function (type, indicador) {
        open_ficha_indicador(type, indicador)
    };
    monitoreo_peiv.openIndicadorComment = async function (type, indicador, allow, periodo) {
        var allowver = false;
        if (periodo === undefined) {
            allowver = true;
        }
        var permi = await monitoreo_peiv.permission(indicador, periodo);
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
    monitoreo_peiv.openProductoComment = function (type, indicador, cond, estatus) {
        var allow = false;
        if (estatus !== 'Completado') {
            allow = true;
        }
        open_comments_indicador(type, indicador, false);
    };
    monitoreo_peiv.statusText = function (cond, estatus) {
        var text = estatus;
        if (estatus === 'Abierto') {
            text = cond;
        }
        return text;
    };
    monitoreo_peiv.statusColor = function (cond, estatus) {
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
    monitoreo_peiv.indicadorColor = function (row) {
        if (row.indicador_condition == 1) {
            return "red";
        }
        return "white";
    };
    monitoreo_peiv.statusColorFont = function (cond, estatus) {
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
    monitoreo_peiv.desableDepa = function (val) {
        monitoreo_peiv.disabledepa = val;
        monitoreo_peiv.refreshAngular();
    };

    monitoreo_peiv.permission = async function (indicador, periodo, set) {
        var exist = monitoreo_peiv.poa_permission.filter(d => d.indicador_pei == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Prodcutos"
            };
        } else {
            if (set !== undefined) {
                animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
                monitoreo_peiv.poa_permission = await BASEAPI.listp('vw_permission_pei', {
                    limit: 0,
                    orderby: "$ compania",
                    order: "asc",
                    where: [{
                        field: "compania",
                        value: user.compania_id
                    }]
                });
                monitoreo_peiv.poa_permission = monitoreo_peiv.poa_permission.data;
                monitoreo_peiv.refreshAngular();
                animation1.stoploading(`.subcontent`);
                //
                // exist[0].condition = set;
            }
            return exist[0];
        }
    };

    monitoreo_peiv.permissionNormal = function (indicador, periodo) {
        var exist = monitoreo_peiv.poa_permission.filter(d => d.indicador_pei == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Prodcutos"
            };
        } else {
            return exist[0];
        }
    };

    monitoreo_peiv.monitoreo_peiv_get = async function () {


        var user = new SESSION().current();

        monitoreo_peiv.poa_permission = await BASEAPI.listp('vw_permission_pei', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
        monitoreo_peiv.poa_permission = monitoreo_peiv.poa_permission.data;
        monitoreo_peiv.poa_data = await BASEAPI.listp('vw_monitoreo_peiv', {
            limit: 0,
            orderby: "$ compania,periodo_poa,r1,objetivo_estrategico,estrategia,resultado,indicador",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            },
                {
                    field: "indicador_id",
                    operator: parseInt(monitoreo_peiv.indicador) ? "=" : ">",
                    value: parseInt(monitoreo_peiv.indicador) || 0
                }]
        });
        monitoreo_peiv.poa_data = monitoreo_peiv.poa_data.data;

        // monitoreo_peiv.indicadores = [...new Set(monitoreo_peiv.poa_data.map(d => {
        //     return d.indicador
        // }).filter(d => {
        //     return (d || "").trim() !== ''
        // }))];
        // monitoreo_peiv.indicadores = monitoreo_peiv.indicadores.map(d => {
        //     return {nombre: d, id: d}
        // });
        // monitoreo_peiv.indicador = "[NULL]";
        // monitoreo_peiv.form.options.indicador.data = [];
        // monitoreo_peiv.form.options.indicador.data = monitoreo_peiv.indicadores;
        // monitoreo_peiv.refreshAngular();
        // monitoreo_peiv.form.loadDropDown('indicador');
        monitoreo_peiv.poa_calc = await BASEAPI.listp('vw_aii_pei', {
            limit: 0,
            orderby: "$ compania,r1, r2",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        monitoreo_peiv.poa_calc = monitoreo_peiv.poa_calc.data;

        monitoreo_peiv.anos = [];
        monitoreo_peiv.pequenoHistorial = [];
        for (var item of monitoreo_peiv.poa_data) {
            if (monitoreo_peiv.anos.filter(d =>
                d.eje_estrategico == item.eje_estrategico &&
                d.objetivo_estrategico == item.objetivo_estrategico &&
                d.estrategia == item.estrategia &&
                d.resultado == item.resultado &&
                d.entidad == item.entidad
            ).length === 0) {
                monitoreo_peiv.anos.push({
                    eje_estrategico: item.eje_estrategico,
                    objetivo_estrategico: item.objetivo_estrategico,
                    estrategia: item.estrategia,
                    resultado: item.resultado,
                    entidad: item.entidad,
                    compania_nombre: item.compania_nombre,
                    records: monitoreo_peiv.poa_data.filter(d =>
                        d.eje_estrategico == item.eje_estrategico &&
                        d.objetivo_estrategico == item.objetivo_estrategico &&
                        d.estrategia == item.estrategia &&
                        d.resultado == item.resultado &&
                        d.entidad == item.entidad
                    )
                });
                for (var indicador in monitoreo_peiv.anos[monitoreo_peiv.anos.length - 1].records) {
                    var record = monitoreo_peiv.anos[monitoreo_peiv.anos.length - 1].records[indicador];
                    if (monitoreo_peiv.poa_calc.filter(d => d.indicador_id == record.indicador_id).length > 0) {
                        var indi = monitoreo_peiv.poa_calc.filter(d => d.indicador_id == record.indicador_id)[0];
                        record.indicador_data = indi;
                        if (!monitoreo_peiv.pequenoHistorial[record.indicador_id]) {
                            monitoreo_peiv.pequenoHistorial[record.indicador_id] = await aacontroldemandofalso.cumplimiento(
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
        monitoreo_peiv.capi = capi;
        if (monitoreo_peiv.poa_calc) {
            monitoreo_peiv.poa_anos = monitoreo_peiv.extract_anos(monitoreo_peiv.poa_calc);
            monitoreo_peiv.poa_anos.sort(function (a, b) {
                if (a === Infinity)
                    return 1;
                else if (isNaN(a))
                    return -1;
                else
                    return a - b;
            });

            monitoreo_peiv.poa_valor = [];

            for (var a = 0; a < (monitoreo_peiv.poa_anos.length * capi); a++) {
                var indica = ((a + 1) % capi);

                if (indica === 1) indica = {id: monitoreo_peiv.poa_anos[Math.floor(a / capi)], value: "P"};
                if (indica === 2) indica = {id: monitoreo_peiv.poa_anos[Math.floor(a / capi)], value: "A"};
                if (indica === 3) indica = {id: monitoreo_peiv.poa_anos[Math.floor(a / capi)], value: "D"};
                if (indica === (4)) indica = {id: monitoreo_peiv.poa_anos[Math.floor(a / capi)], value: "%"};
                if (indica === (0)) indica = {id: monitoreo_peiv.poa_anos[Math.floor(a / capi)], value: "Alerta"};
                monitoreo_peiv.poa_valor[a] = indica;
            }
        }

        monitoreo_peiv.colspaninit = 9;
        monitoreo_peiv.colspaninit += monitoreo_peiv.poa_anos.length * capi;
        setTimeout(function () {
            $('#minusubcontent').floatingScrollbar();
        }, 1000);

        animation1.stoploading(`.subcontent`);
        monitoreo_peiv.refreshAngular();
    };

    monitoreo_peiv.detallePeriodo = function (row, PD, tipo_meta) {
        var ul = "<ul>";
        for (var i of PD) {
            ul += `<li>${i.periodo}: ${monitoreo_peiv.format(i.valor, tipo_meta)}</li>`;
        }
        ul += "</ul>";
        monitoreo_peiv.modal.simpleModal(ul,
            {
                header: {
                    title: `Detalles del Indicador "${row.indicador}" para el año ${PD[0].ano}`
                }
            }
            , true);
    };
    monitoreo_peiv.format_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_peiv.format(eval(`${calc}`), tipo_meta);
    };
    monitoreo_peiv.raw_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_peiv.format(eval(`${calc}`), tipo_meta);
    };

    monitoreo_peiv.pasado = function (row, periodo) {
        var year = new Date().getFullYear();
        if (!row.indicador_data)
            return false;
        return (parseInt(row.indicador_data.ano) <= year);
    };

    monitoreo_peiv.dif = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_peiv.ano_singleraw(row.indicador_data.anos, ra.id) && monitoreo_peiv.ano_singleraw(row.indicador_data.anos_a, ra.id))
            return monitoreo_peiv.format_calc(monitoreo_peiv.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_peiv.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
        return "";
    };
    monitoreo_peiv.difraw = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        return monitoreo_peiv.raw_calc(monitoreo_peiv.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_peiv.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
    };
    monitoreo_peiv.alert_color = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_peiv.percent(row, ra) >= 95 ? "#009900" : monitoreo_peiv.percent(row, ra) >= 75 ? "#eae42dfc" : "#FF0000"
        return "";
    };
    monitoreo_peiv.alert_tootip = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_peiv.percent(row, ra) >= 95 ? "Logrado" : monitoreo_peiv.percent(row, ra) >= 75 ? "En observación" : "No logrado";
        return "";
    };
    monitoreo_peiv.percent = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_peiv.ano_single(row.indicador_data.anos_a, ra.id) == null) {
            return 0;
        }
        var base = parseFloat(monitoreo_peiv.ano_singleraw(row.indicador_data.anos, ra.id));
        var variable = parseFloat(monitoreo_peiv.ano_singleraw(row.indicador_data.anos_a, ra.id));
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
    monitoreo_peiv.ano_single = function (anos, ano, tipo_meta) {
        if (anos) {
            var rows = anos.split(';');
            for (var row of rows) {
                if (row) {
                    var data = row.split('=');
                    if (data[0] == ano) {
                        return monitoreo_peiv.format(data[1], tipo_meta);
                    }
                }
            }
        }
        return null;
    };
    monitoreo_peiv.ano_singleraw = function (anos, ano, tipo_meta) {
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
    monitoreo_peiv.format = function (valor, tipo_meta) {

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

    monitoreo_peiv.extract_companies = function (list) {
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
    monitoreo_peiv.extract_companies_id = function (list) {
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

    monitoreo_peiv.extract_anos_periodo = function (list) {
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
    monitoreo_peiv.extract_anos = function (list) {
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

    monitoreo_peiv.exportXLS = function () {
        var url = $("#monitoreo_peiExportXLS").excelexportjs({
            containerid: "monitoreo_peiExportXLS",
            datatype: 'table',
            worksheetName: `Monitoreo y Seguimiento PEI`,
            returnUri: true
        });
        DOWNLOAD.excel("Monitoreo y Seguimiento PEI", url);
    };

    monitoreo_peiv.exportPDF = function () {
        //
        $("#monitoreo_peiExport").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333
        });
    };

    //monitoreo_peiv.monitoreo_peiv_get();

    monitoreo_peiv.openmodalField = function (value) {

        monitoreo_peiv.tipeExport = value.toString();

        monitoreo_peiv.modal.modalView("monitoreo_peiv/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa monitoreo y seguimiento - PEI.`,
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
