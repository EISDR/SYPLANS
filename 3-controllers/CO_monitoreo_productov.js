app.controller("monitoreo_productov", function ($scope, $http, $compile) {
    monitoreo_productov = this;
    monitoreo_productov.destroyForm = false;
    var user = new SESSION().current();
    monitoreo_productov.session = user;
    //monitoreo_productov.fixFilters = [];
    //monitoreo_productov.singular = "singular";
    //monitoreo_productov.plural = "plural";
    //monitoreo_productov.headertitle = "Hola Title";
    //monitoreo_productov.destroyForm = false;
    //monitoreo_productov.permissionTable = "tabletopermission";
    RUNCONTROLLER("monitoreo_productov", monitoreo_productov, $scope, $http, $compile);
    RUN_B("monitoreo_productov", monitoreo_productov, $scope, $http, $compile);
    monitoreo_productov.colors = COLOR.secundary;
    monitoreo_productov.resumen_pei_list = [];
    monitoreo_productov.tipeExport = '';
    monitoreo_productov.modover = true;
    var animation1 = new ANIMATION();

    monitoreo_productov.rowspanme = function (field, value, list) {
        var r = 0;
        r = list.filter(d => {
            if (value != ' ')
                return eval(`d.${field} == value`)
        }).length;
        return r ? r : 1;
    };
    monitoreo_productov.seeme = function (field, value, key, list) {
        if (list[key - 1])
            if (value != ' ')
                return list[key - 1][field] != value;
        return true;
    };
    monitoreo_productov.tipometa = function (id) {
        return baseController.list_tipo_meta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    };
    monitoreo_productov.tipometa = function (id) {
        return monitoreo_productov.session.tipoMenta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    };

    monitoreo_productov.cumplen = function (rows, conditions) {
        if (!rows) {
            monitoreo_productov.show_me_btn = false;
            return false;
        }
        if (rows.filter(row => ((monitoreo_productov.institucion != '[NULL]' ? monitoreo_productov.institucion == (row.institucion || row.compania) : true))).length > 0) {
            monitoreo_productov.show_me_btn = true;
            return true
        }
        return false;
    };
    monitoreo_productov.validar = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea validar el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_productov.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_productov.send_email_indicador(true, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_productov", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_productov.permission(row.indicador_id, peri, null);
                        }
                    });
                else
                    monitoreo_productov.send_email_indicador(true, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_productov", undefined, async function () {
                        if (peri) {
                            await monitoreo_productov.permission(row.indicador_id, peri, null);
                        }
                    });


                row.indicador_condition = null;
                monitoreo_productov.refreshAngular();
                SWEETALERT.stop();
            }
        });

    };
    monitoreo_productov.devolver = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea devolver el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_productov.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_productov.send_email_indicador(false, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_productov", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_productov.permission(row.indicador_id, peri, 1);
                        }
                    });
                else
                    monitoreo_productov.send_email_indicador(false, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_productov", undefined, async function () {
                        if (peri) {
                            await monitoreo_productov.permission(row.indicador_id, peri, 1);
                        }
                    });
                row.indicador_condition = 1;

                monitoreo_productov.refreshAngular();
                SWEETALERT.stop();
            }
        });
    };
    monitoreo_productov.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
        send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_poa_periodo', periodo, callback);
    };
    monitoreo_productov.direccionmeta = function (val) {
        if (val == 1) {
            return "Ascendente";
        } else if (val == 2) {
            return "Descendente";
        } else {
            return "No Varianza";
        }
    };
    monitoreo_productov.openIndicador = function (type, indicador) {
        open_ficha_indicador(type, indicador)
    };
    monitoreo_productov.openIndicadorComment = async function (type, indicador, allow, periodo) {
        var allowver = false;
        if (periodo === undefined) {
            allowver = true;
        }
        var permi = await monitoreo_productov.permission(indicador, periodo);
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
    monitoreo_productov.openProductoComment = function (type, indicador, cond, estatus) {
        var allow = false;
        if (estatus !== 'Completado') {
            allow = true;
        }
        open_comments_indicador(type, indicador, false);
    };
    monitoreo_productov.statusText = function (cond, estatus) {
        var text = estatus;
        if (estatus === 'Abierto') {
            text = cond;
        }
        return text;
    };
    monitoreo_productov.statusColor = function (cond, estatus) {
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
    monitoreo_productov.indicadorColor = function (row) {
        if (row.indicador_condition == 1) {
            return "red";
        }
        return "white";
    };
    monitoreo_productov.statusColorFont = function (cond, estatus) {
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
    monitoreo_productov.desableDepa = function (val) {
        monitoreo_productov.disabledepa = val;
        monitoreo_productov.refreshAngular();
    };

    monitoreo_productov.permission = async function (indicador, periodo, set) {
        var exist = monitoreo_productov.poa_permission.filter(d => d.indicador_poa == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Proyecto/Producto"
            };
        } else {
            if (set !== undefined) {
                animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
                monitoreo_productov.poa_permission = await BASEAPI.listp('vw_permission_poa', {
                    limit: 0,
                    orderby: "$ compania",
                    order: "asc",
                    where: [{
                        field: "compania",
                        value: user.compania_id
                    }]
                });
                monitoreo_productov.poa_permission = monitoreo_productov.poa_permission.data;
                monitoreo_productov.refreshAngular();
                animation1.stoploading(`.subcontent`);
                //
                // exist[0].condition = set;
            }
            return exist[0];
        }
    };

    monitoreo_productov.permissionNormal = function (indicador, periodo) {
        var exist = monitoreo_productov.poa_permission.filter(d => d.indicador_poa == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: monitoreo_productov.session.tipo_institucion == 1 ? "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Proyecto/Producto" : "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Proyecto/Plan de Acción"
            };
        } else {
            return exist[0];
        }
    };

    monitoreo_productov.monitoreo_productov_get = async function () {


        var user = new SESSION().current();

        monitoreo_productov.poa_permission = await BASEAPI.listp('vw_permission_poa', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
        monitoreo_productov.poa_permission = monitoreo_productov.poa_permission.data;
        monitoreo_productov.poa_data = await BASEAPI.listp('vw_monitoreo_productov', {
            limit: 0,
            orderby: "$ compania,periodo_poa,r1,objetivo_estrategico,estrategia,resultado,departamento,producto_id,estatus,indicador",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            },
                {
                    field: "poa",
                    value: monitoreo_productov.session.poa_id
                },
                {
                    field: "id_departamento",
                    operator: (monitoreo_productov.departamento || []).length > 0 ? " in " : ">",
                    value: (monitoreo_productov.departamento || []).length > 0 ? monitoreo_productov.departamento : "0",
                },
                {
                    field: "indicador_id",
                    operator: parseInt(monitoreo_productov.indicador) ? "=" : ">",
                    value: parseInt(monitoreo_productov.indicador) || 0
                }
            ]
        });
        monitoreo_productov.poa_data = monitoreo_productov.poa_data.data;

        // monitoreo_productov.indicadores = [...new Set(monitoreo_productov.poa_data.map(d => {
        //     return d.indicador
        // }).filter(d => {
        //     return (d || "").trim() !== ''
        // }))];
        // monitoreo_productov.indicadores = monitoreo_productov.indicadores.map(d => {
        //     return {nombre: d, id: d}
        // });
        // monitoreo_productov.indicador = "[NULL]";
        // monitoreo_productov.form.options.indicador.data = [];
        // monitoreo_productov.form.options.indicador.data = monitoreo_productov.indicadores;
        // monitoreo_productov.refreshAngular();
        // monitoreo_productov.form.loadDropDown('indicador');
        monitoreo_productov.poa_calc = await BASEAPI.listp('vw_aii_poa', {
            limit: 0,
            orderby: "$ compania,r1, r2",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        monitoreo_productov.poa_calc = monitoreo_productov.poa_calc.data;

        monitoreo_productov.anos = [];
        monitoreo_productov.pequenoHistorial = [];
        for (var item of monitoreo_productov.poa_data) {
            if (monitoreo_productov.anos.filter(d =>
                d.periodo_poa == item.periodo_poa &&
                d.eje_estrategico == item.eje_estrategico &&
                d.objetivo_estrategico == item.objetivo_estrategico &&
                d.estrategia == item.estrategia &&
                d.resultado == item.resultado &&
                d.entidad == item.entidad
            ).length === 0) {
                monitoreo_productov.anos.push({
                    periodo_poa: item.periodo_poa,
                    eje_estrategico: item.eje_estrategico,
                    objetivo_estrategico: item.objetivo_estrategico,
                    estrategia: item.estrategia,
                    resultado: item.resultado,
                    entidad: item.entidad,
                    compania_nombre: item.compania_nombre,
                    records: monitoreo_productov.poa_data.filter(d =>
                        d.periodo_poa == item.periodo_poa &&
                        d.eje_estrategico == item.eje_estrategico &&
                        d.objetivo_estrategico == item.objetivo_estrategico &&
                        d.estrategia == item.estrategia &&
                        d.resultado == item.resultado &&
                        d.entidad == item.entidad
                    )
                });
                for (var indicador in monitoreo_productov.anos[monitoreo_productov.anos.length - 1].records) {
                    var record = monitoreo_productov.anos[monitoreo_productov.anos.length - 1].records[indicador];
                    if (monitoreo_productov.poa_calc.filter(d => d.indicador_id == record.indicador_id).length > 0) {
                        var indi = monitoreo_productov.poa_calc.filter(d => d.indicador_id == record.indicador_id)[0];
                        record.indicador_data = indi;
                        if (!monitoreo_productov.pequenoHistorial[record.indicador_id]) {
                            monitoreo_productov.pequenoHistorial[record.indicador_id] = await aacontroldemandofalso.cumplimiento(
                                "vw_report_indicadores_producto",
                                baseController.session,
                                "indicador_producto",
                                record.indicador_id);
                        }
                    }
                }
            }
        }

        var capi = 5;
        monitoreo_productov.capi = capi;
        if (monitoreo_productov.poa_calc) {
            monitoreo_productov.poa_anos = monitoreo_productov.extract_anos(monitoreo_productov.poa_calc);
            monitoreo_productov.poa_anos.sort(function (a, b) {
                if (a === Infinity)
                    return 1;
                else if (isNaN(a))
                    return -1;
                else
                    return a - b;
            });

            monitoreo_productov.poa_valor = [];

            for (var a = 0; a < (monitoreo_productov.poa_anos.length * capi); a++) {
                var indica = ((a + 1) % capi);
                if (indica === 1) indica = {id: monitoreo_productov.poa_anos[Math.floor(a / capi)], value: "P"};
                if (indica === 2) indica = {id: monitoreo_productov.poa_anos[Math.floor(a / capi)], value: "A"};
                if (indica === 3) indica = {id: monitoreo_productov.poa_anos[Math.floor(a / capi)], value: "D"};
                if (indica === (4)) indica = {id: monitoreo_productov.poa_anos[Math.floor(a / capi)], value: "%"};
                if (indica === (0)) indica = {id: monitoreo_productov.poa_anos[Math.floor(a / capi)], value: "Alerta"};
                monitoreo_productov.poa_valor[a] = indica;
            }
        }

        monitoreo_productov.colspaninit = 10;
        monitoreo_productov.colspaninit += monitoreo_productov.poa_anos.length * capi;
        setTimeout(function () {
            $('#minusubcontent').floatingScrollbar();
        }, 1000);

        animation1.stoploading(`.subcontent`);
        monitoreo_productov.refreshAngular();
    };

    monitoreo_productov.detallePeriodo = function (row, PD, tipo_meta) {
        var ul = "<ul>";
        for (var i of PD) {
            ul += `<li>${i.periodo}: ${monitoreo_productov.format(i.valor, tipo_meta)}</li>`;
        }
        ul += "</ul>";
        monitoreo_productov.modal.simpleModal(ul,
            {
                header: {
                    title: `Detalles del Indicador "${row.indicador}" para el año ${PD[0].ano}`
                }
            }
            , true);
    };
    monitoreo_productov.format_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_productov.format(eval(`${calc}`), tipo_meta);
    };
    monitoreo_productov.raw_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_productov.format(eval(`${calc}`), tipo_meta);
    };
    monitoreo_productov.pasado = function (row, periodo) {
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
    monitoreo_productov.dif = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_productov.ano_singleraw(row.indicador_data.anos, ra.id) && monitoreo_productov.ano_singleraw(row.indicador_data.anos_a, ra.id))
            return monitoreo_productov.format_calc(monitoreo_productov.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_productov.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
        return "";
    };
    monitoreo_productov.difraw = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        return monitoreo_productov.raw_calc(monitoreo_productov.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_productov.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
    };
    monitoreo_productov.alert_color = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_productov.percent(row, ra) >= 95 ? "#009900" : monitoreo_productov.percent(row, ra) >= 75 ? "#eae42dfc" : "#FF0000"
        return "";
    };
    monitoreo_productov.alert_tootip = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_productov.percent(row, ra) >= 95 ? "Logrado" : monitoreo_productov.percent(row, ra) >= 75 ? "En observación" : "No logrado";
        return "";
    };
    monitoreo_productov.percent = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_productov.ano_single(row.indicador_data.anos_a, ra.id) == null) {
            return 0;
        }
        var base = parseFloat(monitoreo_productov.ano_singleraw(row.indicador_data.anos, ra.id));
        var variable = parseFloat(monitoreo_productov.ano_singleraw(row.indicador_data.anos_a, ra.id));
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
    monitoreo_productov.ano_single = function (anos, ano, tipo_meta) {
        if (anos) {
            var rows = anos.split(';');
            for (var row of rows) {
                if (row) {
                    var data = row.split('=');
                    if (data[0] == ano) {
                        return monitoreo_productov.format(data[1], tipo_meta);
                    }
                }
            }
        }
        return null;
    };

    monitoreo_productov.ano_singleraw = function (anos, ano, tipo_meta) {
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
    monitoreo_productov.format = function (valor, tipo_meta) {

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

    monitoreo_productov.extract_companies = function (list) {
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
    monitoreo_productov.extract_companies_id = function (list) {
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

    monitoreo_productov.extract_anos_periodo = function (list) {
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
    monitoreo_productov.extract_anos = function (list) {
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

    monitoreo_productov.exportXLS = function () {
        var url = $("#monitoreo_productoExport").excelexportjs({
            containerid: "monitoreo_productoExportXLS",
            datatype: 'table',
            worksheetName: monitoreo_productov.session.tipo_institucion == 1 ? `Monitoreo y Seguimiento de Proyecto/Producto` : `Monitoreo y Seguimiento de Proyecto/Plan de Acción`,
            returnUri: true
        });
        DOWNLOAD.excel(`${monitoreo_productov.session.tipo_institucion == 1 ? 'Monitoreo y Seguimiento de Proyecto/Producto' : 'Monitoreo y Seguimiento de Proyecto/Plan de Acción'}`, url);
    };

    monitoreo_productov.exportPDF = function () {

        $("#monitoreo_productoExport").printThis({
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

    //monitoreo_productov.monitoreo_productov_get();

    monitoreo_productov.openmodalField = function (value) {

        monitoreo_productov.tipeExport = value.toString();

        monitoreo_productov.modal.modalView("monitoreo_productov/export", {

            width: 'modal-full',
            header: {
                title: monitoreo_productov.session.tipo_institucion == 1 ? `Vista Previa monitoreo y seguimiento de Proyecto/Producto.` : `Vista Previa monitoreo y seguimiento de Proyecto/Plan de Acción`,
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
