app.controller("monitoreo_proceso", function ($scope, $http, $compile) {
    monitoreo_proceso = this;
    monitoreo_proceso.destroyForm = false;
    var user = new SESSION().current();
    monitoreo_proceso.session = user;
    //monitoreo_proceso.fixFilters = [];
    //monitoreo_proceso.singular = "singular";
    //monitoreo_proceso.plural = "plural";
    monitoreo_proceso.headertitle = monitoreo_proceso.session.tipo_institucion == 1 ? "Monitoreo y Seguimiento - Procesos" : "Monitoreo y Seguimiento - Proyecto/Plan de Acción";
    //monitoreo_proceso.destroyForm = false;
    //monitoreo_proceso.permissionTable = "tabletopermission";
    RUNCONTROLLER("monitoreo_proceso", monitoreo_proceso, $scope, $http, $compile);
    RUN_B("monitoreo_proceso", monitoreo_proceso, $scope, $http, $compile);
    monitoreo_proceso.colors = COLOR.secundary;
    monitoreo_proceso.resumen_pei_list = [];
    monitoreo_proceso.tipeExport = '';
    monitoreo_proceso.modover = location.href.indexOf('?ver') !== -1;
    var animation1 = new ANIMATION();

    monitoreo_proceso.rowspanme = function (field, value, list) {
        var r = 0;
        r = list.filter(d => {
            if (value != ' ')
                return eval(`d.${field}==value`)
        }).length;
        return r ? r : 1;
    };
    monitoreo_proceso.seeme = function (field, value, key, list) {
        if (list[key - 1])
            if (value != ' ')
                return list[key - 1][field] != value;
        return true;
    };
    // monitoreo_proceso.tipometa = function (id) {
    //     return baseController.list_tipo_meta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    // };
    monitoreo_proceso.tipometa = function (id) {
        return monitoreo_proceso.session.tipoMenta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    };

    monitoreo_proceso.cumplen = function (rows, conditions) {
        if (!rows)
            return false;

        if (rows.filter(row => ((monitoreo_proceso.institucion != '[NULL]' ? monitoreo_proceso.institucion == (row.institucion || row.compania) : true))).length > 0) {
            return true
        }
        return false;
    };
    monitoreo_proceso.validar = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea validar el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_proceso.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_proceso.send_email_indicador(true, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_proceso", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_proceso.permission(row.indicador_id, peri, null);
                        }
                    });
                else
                    monitoreo_proceso.send_email_indicador(true, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_proceso", undefined, async function () {
                        if (peri) {
                            await monitoreo_proceso.permission(row.indicador_id, peri, null);
                        }
                    });


                row.indicador_condition = null;
                monitoreo_proceso.refreshAngular();
                SWEETALERT.stop();
            }
        });

    };
    monitoreo_proceso.devolver = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea devolver el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_proceso.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_proceso.send_email_indicador(false, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_proceso", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_proceso.permission(row.indicador_id, peri, 1);
                        }
                    });
                else
                    monitoreo_proceso.send_email_indicador(false, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_proceso", undefined, async function () {
                        if (peri) {
                            await monitoreo_proceso.permission(row.indicador_id, peri, 1);
                        }
                    });
                row.indicador_condition = 1;

                monitoreo_proceso.refreshAngular();
                SWEETALERT.stop();
            }
        });
    };
    monitoreo_proceso.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
        send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_poa_periodo', periodo, callback);
    };
    monitoreo_proceso.direccionmeta = function (val) {
        if (val == 1) {
            return "Ascendente";
        } else if (val == 2) {
            return "Descendente";
        } else {
            return "No Varianza";
        }
    };
    monitoreo_proceso.openIndicador = function (type, indicador) {
        open_ficha_indicador(type, indicador)
    };
    monitoreo_proceso.openIndicadorComment = async function (type, indicador, allow, periodo) {
        var allowver = false;
        if (periodo === undefined) {
            allowver = true;
        }
        var permi = await monitoreo_proceso.permission(indicador, periodo);
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
    monitoreo_proceso.openProductoComment = function (type, indicador, cond, estatus) {
        var allow = false;
        if (estatus !== 'Completado') {
            allow = true;
        }
        open_comments_indicador(type, indicador, allow);
    };
    monitoreo_proceso.statusText = function (cond, estatus) {
        var text = estatus;
        if (estatus === 'Abierto') {
            text = cond;
        }
        return text;
    };
    monitoreo_proceso.statusColor = function (cond, estatus) {
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
    monitoreo_proceso.indicadorColor = function (row) {
        if (row.indicador_condition == 1) {
            return "red";
        }
        return "white";
    };
    monitoreo_proceso.statusColorFont = function (cond, estatus) {
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
    monitoreo_proceso.desableDepa = function (val) {
        monitoreo_proceso.disabledepa = val;
        monitoreo_proceso.refreshAngular();
    };

    monitoreo_proceso.permission = async function (indicador, periodo, set) {
        var exist = monitoreo_proceso.poa_permission.filter(d => d.indicador_poa == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: monitoreo_proceso.session.tipo_instuticion == 1 ? "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Procesos" : "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Proyecto/Plan de Acción"
            };
        } else {
            if (set !== undefined) {
                animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
                monitoreo_proceso.poa_permission = await BASEAPI.listp('vw_permission_proceso', {
                    limit: 0,
                    orderby: "$ compania",
                    order: "asc",
                    where: [{
                        field: "compania",
                        value: user.compania_id
                    }]
                });
                monitoreo_proceso.poa_permission = monitoreo_proceso.poa_permission.data;
                monitoreo_proceso.refreshAngular();
                animation1.stoploading(`.subcontent`);
                //
                // exist[0].condition = set;
            }
            return exist[0];
        }
    };

    monitoreo_proceso.permissionNormal = function (indicador, periodo) {
        var exist = monitoreo_proceso.poa_permission.filter(d => d.indicador_poa == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: monitoreo_proceso.session.tipo_instuticion == 1 ? "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Procesos" : "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Proyecto/Plan de Acción"
            };
        } else {
            return exist[0];
        }
    };

    monitoreo_proceso.monitoreo_proceso_get = async function () {


        var user = new SESSION().current();

        monitoreo_proceso.poa_permission = await BASEAPI.listp('vw_permission_poa', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
        monitoreo_proceso.poa_permission = monitoreo_proceso.poa_permission.data;
        monitoreo_proceso.poa_data = await BASEAPI.listp('vw_monitoreo_proceso', {
            limit: 0,
            orderby: "$ compania,periodo_poa,r1,actividad,indicador",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            },
                {
                    field: "indicador_id",
                    operator: parseInt(monitoreo_proceso.indicador) ? "=" : ">",
                    value: parseInt(monitoreo_proceso.indicador) || 0
                }]
        });
        monitoreo_proceso.poa_data = monitoreo_proceso.poa_data.data;

        // monitoreo_proceso.indicadores = [...new Set(monitoreo_proceso.poa_data.map(d => {
        //     return d.indicador
        // }).filter(d => {
        //     return (d || "").trim() !== ''
        // }))];
        // monitoreo_proceso.indicadores = monitoreo_proceso.indicadores.map(d => {
        //     return {nombre: d, id: d}
        // });
        // monitoreo_proceso.indicador = "[NULL]";
        // monitoreo_proceso.form.options.indicador.data = [];
        // monitoreo_proceso.form.options.indicador.data = monitoreo_proceso.indicadores;
        // monitoreo_proceso.refreshAngular();
        // monitoreo_proceso.form.loadDropDown('indicador');

        monitoreo_proceso.poa_calc = await BASEAPI.listp('vw_aii_pro', {
            limit: 0,
            orderby: "$ compania,r1, r2",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        monitoreo_proceso.poa_calc = monitoreo_proceso.poa_calc.data;

        monitoreo_proceso.anos = [];
        for (var item of monitoreo_proceso.poa_data) {
            if (monitoreo_proceso.anos.filter(d =>
                d.periodo_poa == item.periodo_poa &&
                d.eje_estrategico == item.eje_estrategico &&
                d.objetivo_estrategico == item.objetivo_estrategico &&
                d.estrategia == item.estrategia &&
                d.resultado == item.resultado &&
                d.entidad == item.entidad
            ).length === 0) {
                monitoreo_proceso.anos.push({
                    periodo_poa: item.periodo_poa,
                    eje_estrategico: item.eje_estrategico,
                    objetivo_estrategico: item.objetivo_estrategico,
                    estrategia: item.estrategia,
                    resultado: item.resultado,
                    entidad: item.entidad,
                    compania_nombre: item.compania_nombre,
                    records: monitoreo_proceso.poa_data.filter(d =>
                        d.periodo_poa == item.periodo_poa &&
                        d.eje_estrategico == item.eje_estrategico &&
                        d.objetivo_estrategico == item.objetivo_estrategico &&
                        d.estrategia == item.estrategia &&
                        d.resultado == item.resultado &&
                        d.entidad == item.entidad
                    )
                });
                for (var indicador in monitoreo_proceso.anos[monitoreo_proceso.anos.length - 1].records) {
                    var record = monitoreo_proceso.anos[monitoreo_proceso.anos.length - 1].records[indicador];
                    if (monitoreo_proceso.poa_calc.filter(d => d.indicador_id == record.indicador_id).length > 0) {
                        var indi = monitoreo_proceso.poa_calc.filter(d => d.indicador_id == record.indicador_id)[0];
                        record.indicador_data = indi;
                    }
                }
            }
        }

        var capi = 5;
        if (monitoreo_proceso.modover)
            capi--;
        monitoreo_proceso.capi = capi;
        if (monitoreo_proceso.poa_calc) {
            monitoreo_proceso.poa_anos = monitoreo_proceso.extract_anos(monitoreo_proceso.poa_calc);
            monitoreo_proceso.poa_anos = monitoreo_proceso.poa_anos.map(d => parseInt(d));
            monitoreo_proceso.poa_anos.sort(function (a, b) {
                if (a === Infinity)
                    return 1;
                else if (isNaN(a))
                    return -1;
                else
                    return a - b;
            });
            monitoreo_proceso.poa_valor = [];

            for (var a = 0; a < (monitoreo_proceso.poa_anos.length * capi); a++) {
                var indica = ((a + 1) % capi);
                if (indica === 1) indica = {id: monitoreo_proceso.poa_anos[Math.floor(a / capi)], value: "P"};
                if (indica === 2) indica = {id: monitoreo_proceso.poa_anos[Math.floor(a / capi)], value: "A"};
                if (indica === 3) indica = {id: monitoreo_proceso.poa_anos[Math.floor(a / capi)], value: "D"};
                if (indica === (monitoreo_proceso.modover ? 0 : 4)) indica = {
                    id: monitoreo_proceso.poa_anos[Math.floor(a / capi)],
                    value: "%"
                };
                if (indica === (monitoreo_proceso.modover ? 4 : 0)) indica = {
                    id: monitoreo_proceso.poa_anos[Math.floor(a / capi)],
                    value: "Alerta"
                };
                monitoreo_proceso.poa_valor[a] = indica;
            }
        }

        monitoreo_proceso.colspaninit = 10;
        monitoreo_proceso.colspaninit += monitoreo_proceso.poa_anos.length * capi;

        setTimeout(function () {
            $('#minusubcontent').floatingScrollbar();
        }, 1000);

        animation1.stoploading(`.subcontent`);
        monitoreo_proceso.refreshAngular();
    };

    monitoreo_proceso.detallePeriodo = function (row, PD, tipo_meta) {
        var ul = "<ul>";
        for (var i of PD) {
            ul += `<li>${i.periodo}: ${monitoreo_proceso.format(i.valor, tipo_meta)}</li>`;
        }
        ul += "</ul>";
        monitoreo_proceso.modal.simpleModal(ul,
            {
                header: {
                    title: `Detalles del Indicador "${row.indicador}" para el año ${PD[0].ano}`
                }
            }
            , true);
    };
    monitoreo_proceso.format_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_proceso.format(eval(`${calc}`), tipo_meta);
    };
    monitoreo_proceso.raw_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_proceso.format(eval(`${calc}`), tipo_meta);
    };

    monitoreo_proceso.pasado = function (row, periodo) {
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


    monitoreo_proceso.dif = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_proceso.ano_singleraw(row.indicador_data.anos, ra.id) && monitoreo_proceso.ano_singleraw(row.indicador_data.anos_a, ra.id))
            return monitoreo_proceso.format_calc(monitoreo_proceso.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_proceso.ano_singleraw(row.indicador_data.anos_a, ra.id) || 0, row.indicador_data.tipo_meta, "b-a");
        return "";
    };
    monitoreo_proceso.difraw = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        return monitoreo_proceso.raw_calc(monitoreo_proceso.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_proceso.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
    };
    monitoreo_proceso.alert_color = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_proceso.percent(row, ra) >= 95 ? "#009900" : monitoreo_proceso.percent(row, ra) >= 75 ? "#eae42dfc" : "#FF0000"
        return "";
    };
    monitoreo_proceso.alert_tootip = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_proceso.percent(row, ra) >= 95 ? "Logrado" : monitoreo_proceso.percent(row, ra) >= 75 ? "En observación" : "No logrado";
        return "";
    };
    monitoreo_proceso.percent = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_proceso.ano_single(row.indicador_data.anos_a, ra.id) == null) {
            return 0;
        }
        var base = parseFloat(monitoreo_proceso.ano_singleraw(row.indicador_data.anos, ra.id));
        var variable = parseFloat(monitoreo_proceso.ano_singleraw(row.indicador_data.anos_a, ra.id));
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
    monitoreo_proceso.ano_single = function (anos, ano, tipo_meta) {
        if (anos) {
            var rows = anos.split(';');
            for (var row of rows) {
                if (row) {
                    var data = row.split('=');
                    if (data[0] == ano) {
                        return monitoreo_proceso.format(data[1], tipo_meta);
                    }
                }
            }
        }
        return null;
    };
    monitoreo_proceso.ano_singleraw = function (anos, ano, tipo_meta) {
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
    monitoreo_proceso.format = function (valor, tipo_meta) {

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

    monitoreo_proceso.extract_companies = function (list) {
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
    monitoreo_proceso.extract_companies_id = function (list) {
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

    monitoreo_proceso.extract_anos_periodo = function (list) {
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
    monitoreo_proceso.extract_anos = function (list) {
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

    monitoreo_proceso.exportXLS = function () {
        var url = $("#monitoreo_procesoExport").excelexportjs({
            containerid: "monitoreo_procesoExportXLS",
            datatype: 'table',
            worksheetName: monitoreo_proceso.session.tipo_institucion == 1 ? `Monitoreo y Seguimiento de Procesos` : `Monitoreo y Seguimiento de Proyecto/Plan de Acción`,
            returnUri: true
        });
        DOWNLOAD.excel(`${monitoreo_proceso.session.tipo_institucion == 1 ? 'Monitoreo y Seguimiento de Procesos' : 'Monitoreo y Seguimiento de Proyecto/Plan de Acción'}`, url);
    };

    monitoreo_proceso.exportPDF = function () {

        $("#monitoreo_procesoExport").printThis({
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

    //monitoreo_proceso.monitoreo_proceso_get();

    monitoreo_proceso.openmodalField = function (value) {

        monitoreo_proceso.tipeExport = value.toString();

        monitoreo_proceso.modal.modalView("monitoreo_proceso/export", {

            width: 'modal-full',
            header: {
                title: monitoreo_proceso.session.tipo_institucion == 1 ? `Vista Previa monitoreo y seguimiento de Procesos.` : `Vista Previa monitoreo y seguimiento de Proyecto/Plan de Acción.`,
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

    monitoreo_proceso.limitPeriod = (row, period) => {
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
