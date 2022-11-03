app.controller("monitoreo_producto", function ($scope, $http, $compile) {
    monitoreo_producto = this;
    monitoreo_producto.destroyForm = false;
    var user = new SESSION().current();
    monitoreo_producto.session = user;
    //monitoreo_producto.fixFilters = [];
    //monitoreo_producto.singular = "singular";
    //monitoreo_producto.plural = "plural";
    monitoreo_producto.headertitle = monitoreo_producto.session.tipo_institucion == 1 ? "Monitoreo y Seguimiento - Proyecto/Producto" : "Monitoreo y Seguimiento - Proyecto/Plan de Acción";
    //monitoreo_producto.destroyForm = false;
    //monitoreo_producto.permissionTable = "tabletopermission";
    RUNCONTROLLER("monitoreo_producto", monitoreo_producto, $scope, $http, $compile);
    RUN_B("monitoreo_producto", monitoreo_producto, $scope, $http, $compile);
    monitoreo_producto.colors = COLOR.secundary;
    monitoreo_producto.resumen_pei_list = [];
    monitoreo_producto.tipeExport = '';
    monitoreo_producto.modover = location.href.indexOf('?ver') !== -1;
    var animation1 = new ANIMATION();

    monitoreo_producto.rowspanme = function (field, value, list) {
        var r = 0;
        r = list.filter(d => {
            if (value != ' ')
                return eval(`d.${field} == value`)
        }).length;
        return r ? r : 1;
    };
    monitoreo_producto.seeme = function (field, value, key, list) {
        if (list[key - 1])
            if (value != ' ')
                return list[key - 1][field] != value;
        return true;
    };
    monitoreo_producto.tipometa = function (id) {
        return monitoreo_producto.session.tipoMenta.filter(d => {
            return d.id == id
        })[0] || {nombre: "N/A"};
    };

    monitoreo_producto.cumplen = function (rows, conditions) {
        if (!rows)
            return false;

        if (rows.filter(row => ((monitoreo_producto.institucion != '[NULL]' ? monitoreo_producto.institucion == (row.institucion || row.compania) : true))).length > 0) {
            return true
        }
        return false;
    };
    monitoreo_producto.validar = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea validar el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_producto.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_producto.send_email_indicador(true, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_producto", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_producto.permission(row.indicador_id, peri, null);
                        }
                    });
                else
                    monitoreo_producto.send_email_indicador(true, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_producto", undefined, async function () {
                        if (peri) {
                            await monitoreo_producto.permission(row.indicador_id, peri, null);
                        }
                    });


                row.indicador_condition = null;
                monitoreo_producto.refreshAngular();
                SWEETALERT.stop();
            }
        });

    };
    monitoreo_producto.devolver = function (row, peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea devolver el indicador ${row.indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                var mes = new Date().getMonth() + 1;
                var monitoreo = row.indicador_data.monitoreo;
                var actual = Math.ceil((mes / (12 / monitoreo)));
                var permissions = await monitoreo_producto.permission(row.indicador_id, actual);
                var esactual = false;
                if (permissions.ano_poa === permissions.actual) {
                    if (permissions.periodo === permissions.periodo_actual) {
                        esactual = true;
                    }
                }
                if (esactual || peri)
                    monitoreo_producto.send_email_indicador(false, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_producto", peri || actual, async function () {
                        if (peri) {
                            await monitoreo_producto.permission(row.indicador_id, peri, 1);
                        }
                    });
                else
                    monitoreo_producto.send_email_indicador(false, 'indicador poa', 'indicador_poa', row.indicador_id, row.indicador, row.id_departamento, "#monitoreo_producto", undefined, async function () {
                        if (peri) {
                            await monitoreo_producto.permission(row.indicador_id, peri, 1);
                        }
                    });
                row.indicador_condition = 1;

                monitoreo_producto.refreshAngular();
                SWEETALERT.stop();
            }
        });
    };
    monitoreo_producto.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
        send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_poa_periodo', periodo, callback);
    };
    monitoreo_producto.direccionmeta = function (val) {
        if (val == 1) {
            return "Ascendente";
        } else if (val == 2) {
            return "Descendente";
        } else {
            return "No Varianza";
        }
    };
    monitoreo_producto.openIndicador = function (type, indicador) {
        open_ficha_indicador(type, indicador)
    };
    monitoreo_producto.openIndicadorComment = async function (type, indicador, allow, periodo) {
        var allowver = false;
        if (periodo === undefined) {
            allowver = true;
        }
        var permi = await monitoreo_producto.permission(indicador, periodo);
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
    monitoreo_producto.openProductoComment = function (type, indicador, cond, estatus) {
        var allow = false;
        if (estatus !== 'Completado') {
            allow = true;
        }
        open_comments_indicador(type, indicador, allow);
    };
    monitoreo_producto.statusText = function (cond, estatus) {
        var text = estatus;
        if (estatus === 'Abierto') {
            text = cond;
        }
        return text;
    };
    monitoreo_producto.statusColor = function (cond, estatus) {
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
    monitoreo_producto.indicadorColor = function (row) {
        if (row.indicador_condition == 1) {
            return "red";
        }
        return "white";
    };
    monitoreo_producto.statusColorFont = function (cond, estatus) {
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
    monitoreo_producto.desableDepa = function (val) {
        monitoreo_producto.disabledepa = val;
        monitoreo_producto.refreshAngular();
    };

    monitoreo_producto.permission = async function (indicador, periodo, set) {
        var exist = monitoreo_producto.poa_permission.filter(d => d.indicador_poa == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: monitoreo_producto.session.tipo_instuticion == 1 ? "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Proyecto/Producto" : "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Proyecto/Plan de Acción"
            };
        } else {
            if (set !== undefined) {
                animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
                monitoreo_producto.poa_permission = await BASEAPI.listp('vw_permission_poa', {
                    limit: 0,
                    orderby: "$ compania",
                    order: "asc",
                    where: [{
                        field: "compania",
                        value: user.compania_id
                    }]
                });
                monitoreo_producto.poa_permission = monitoreo_producto.poa_permission.data;
                monitoreo_producto.refreshAngular();
                animation1.stoploading(`.subcontent`);
                //
                // exist[0].condition = set;
            }
            return exist[0];
        }
    };

    monitoreo_producto.permissionNormal = function (indicador, periodo) {
        var exist = monitoreo_producto.poa_permission.filter(d => d.indicador_poa == indicador && d.periodo == periodo);

        if (exist.length === 0) {
            return {
                allow: 0,
                debug: monitoreo_producto.session.tipo_instuticion == 1 ? "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Proyecto/Producto" : "Puede que este indicador esté dañado, puede solucionar este problema en la opción de Evaluación y Carga de Evidencias => Indicadores de Proyecto/Plan de Acción"
            };
        } else {
            return exist[0];
        }
    };

    monitoreo_producto.monitoreo_producto_get = async function () {


        var user = new SESSION().current();

        monitoreo_producto.poa_permission = await BASEAPI.listp('vw_permission_poa', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        animation1.loading(`.subcontent`, "", ``, '200', undefined, true);
        monitoreo_producto.poa_permission = monitoreo_producto.poa_permission.data;
        monitoreo_producto.poa_data = await BASEAPI.listp('vw_monitoreo_producto', {
            limit: 0,
            orderby: "$ compania,periodo_poa,r1,objetivo_estrategico,estrategia,resultado,departamento,producto_id,estatus,indicador",
            order: "asc",
            where: [
                {
                    field: "compania",
                    value: user.compania_id
                },
                {
                    field: "poa",
                    value: monitoreo_producto.session.poa_id
                },
                {
                    field: "id_departamento",
                    operator: (monitoreo_producto.departamento || []).length > 0 ? " in " : ">",
                    value: (monitoreo_producto.departamento || []).length > 0 ? monitoreo_producto.departamento : "0",
                },
                {
                    field: "indicador_id",
                    operator: parseInt(monitoreo_producto.indicador) ? "=" : ">",
                    value: parseInt(monitoreo_producto.indicador) || 0
                }
            ]
        });
        monitoreo_producto.poa_data = monitoreo_producto.poa_data.data;

        // monitoreo_producto.indicadores = [...new Set(monitoreo_producto.poa_data.map(d => {
        //     return d.indicador
        // }).filter(d => {
        //     return (d || "").trim() !== ''
        // }))];
        // monitoreo_producto.indicadores = monitoreo_producto.indicadores.map(d => {
        //     let department = monitoreo_producto.poa_data.filter(e => {
        //         return e.indicador === d
        //     })[0];
        //     return {nombre: d, id: d, departamento: (department || {}).departamento}
        // });
        // monitoreo_producto.indicador = "[NULL]";
        // monitoreo_producto.form.options.indicador.data = [];
        // monitoreo_producto.form.options.indicador.data = monitoreo_producto.indicadores;
        // monitoreo_producto.refreshAngular();
        // monitoreo_producto.form.loadDropDown('indicador');


        monitoreo_producto.poa_calc = await BASEAPI.listp('vw_aii_poa', {
            limit: 0,
            orderby: "$ compania,r1, r2",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        monitoreo_producto.poa_calc = monitoreo_producto.poa_calc.data;

        monitoreo_producto.anos = [];
        monitoreo_producto.pequenoHistorial = [];

        for (var item of monitoreo_producto.poa_data) {
            if (monitoreo_producto.anos.filter(d =>
                d.periodo_poa == item.periodo_poa &&
                d.eje_estrategico == item.eje_estrategico &&
                d.objetivo_estrategico == item.objetivo_estrategico &&
                d.estrategia == item.estrategia &&
                d.resultado == item.resultado &&
                d.entidad == item.entidad
            ).length === 0) {
                monitoreo_producto.anos.push({
                    periodo_poa: item.periodo_poa,
                    eje_estrategico: item.eje_estrategico,
                    objetivo_estrategico: item.objetivo_estrategico,
                    estrategia: item.estrategia,
                    resultado: item.resultado,
                    entidad: item.entidad,
                    compania_nombre: item.compania_nombre,
                    records: monitoreo_producto.poa_data.filter(d =>
                        d.periodo_poa == item.periodo_poa &&
                        d.eje_estrategico == item.eje_estrategico &&
                        d.objetivo_estrategico == item.objetivo_estrategico &&
                        d.estrategia == item.estrategia &&
                        d.resultado == item.resultado &&
                        d.entidad == item.entidad
                    )
                });
                for (var indicador in monitoreo_producto.anos[monitoreo_producto.anos.length - 1].records) {
                    var record = monitoreo_producto.anos[monitoreo_producto.anos.length - 1].records[indicador];
                    if (monitoreo_producto.poa_calc.filter(d => d.indicador_id == record.indicador_id).length > 0) {
                        var indi = monitoreo_producto.poa_calc.filter(d => d.indicador_id == record.indicador_id)[0];
                        record.indicador_data = indi;
                        if (!monitoreo_producto.pequenoHistorial[record.indicador_id]) {
                            monitoreo_producto.pequenoHistorial[record.indicador_id] = await aacontroldemandofalso.cumplimiento(
                                "vw_report_indicadores_producto",
                                baseController.session,
                                "indicador_producto",
                                record.indicador_id);
                        }
                    }
                }
                if (monitoreo_producto.anos[0]) {
                    monitoreo_producto.eje_estrategico_filter = monitoreo_producto.anos[0].eje_estrategico;
                    monitoreo_producto.form.loadDropDown("eje_estrategico_filter");
                }
            }
        }

        var capi = 5;
        if (monitoreo_producto.modover)
            capi--;
        monitoreo_producto.capi = capi;
        if (monitoreo_producto.poa_calc) {
            monitoreo_producto.poa_anos = monitoreo_producto.extract_anos(monitoreo_producto.poa_calc);
            monitoreo_producto.poa_anos.sort(function (a, b) {
                if (a === Infinity)
                    return 1;
                else if (isNaN(a))
                    return -1;
                else
                    return a - b;
            });

            monitoreo_producto.poa_valor = [];
            for (var a = 0; a < (monitoreo_producto.poa_anos.length * capi); a++) {
                var indica = ((a + 1) % capi);
                if (indica === 1) indica = {id: monitoreo_producto.poa_anos[Math.floor(a / capi)], value: "P"};
                if (indica === 2) indica = {id: monitoreo_producto.poa_anos[Math.floor(a / capi)], value: "A"};
                if (indica === 3) indica = {id: monitoreo_producto.poa_anos[Math.floor(a / capi)], value: "D"};
                if (indica === (monitoreo_producto.modover ? 0 : 4)) indica = {
                    id: monitoreo_producto.poa_anos[Math.floor(a / capi)],
                    value: "%"
                };
                if (indica === (monitoreo_producto.modover ? 4 : 0)) indica = {
                    id: monitoreo_producto.poa_anos[Math.floor(a / capi)],
                    value: "Alerta"
                };
                monitoreo_producto.poa_valor[a] = indica;
            }
        }

        monitoreo_producto.colspaninit = 10;
        monitoreo_producto.colspaninit += monitoreo_producto.poa_anos.length * capi;

        setTimeout(function () {
            $('#minusubcontent').floatingScrollbar();
        }, 1000);

        animation1.stoploading(`.subcontent`);
        monitoreo_producto.refreshAngular();
    };

    monitoreo_producto.detallePeriodo = function (row, PD, tipo_meta) {
        var ul = "<ul>";
        for (var i of PD) {
            ul += `<li>${i.periodo}: ${monitoreo_producto.format(i.valor, tipo_meta)}</li>`;
        }
        ul += "</ul>";
        monitoreo_producto.modal.simpleModal(ul,
            {
                header: {
                    title: `Detalles del Indicador "${row.indicador}" para el año ${PD[0].ano}`
                }
            }
            , true);
    };
    monitoreo_producto.format_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_producto.format(eval(`${calc}`), tipo_meta);
    };
    monitoreo_producto.raw_calc = function (a, b, tipo_meta, calc) {
        return monitoreo_producto.format(eval(`${calc}`), tipo_meta);
    };

    monitoreo_producto.pasado = function (row, periodo) {
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


    monitoreo_producto.dif = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_producto.ano_singleraw(row.indicador_data.anos, ra.id) && monitoreo_producto.ano_singleraw(row.indicador_data.anos_a, ra.id))
            return monitoreo_producto.format_calc(monitoreo_producto.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_producto.ano_singleraw(row.indicador_data.anos_a, ra.id) || 0, row.indicador_data.tipo_meta, "b-a");
        return "";
    };
    monitoreo_producto.difraw = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        return monitoreo_producto.raw_calc(monitoreo_producto.ano_singleraw(row.indicador_data.anos, ra.id), monitoreo_producto.ano_singleraw(row.indicador_data.anos_a, ra.id), row.indicador_data.tipo_meta, "b-a");
    };
    monitoreo_producto.alert_color = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_producto.percent(row, ra) >= 95 ? "#009900" : monitoreo_producto.percent(row, ra) >= 75 ? "#eae42dfc" : "#FF0000"
        return "";
    };
    monitoreo_producto.alert_tootip = function (row, ra) {
        if (ra.value === 'Alerta')
            return monitoreo_producto.percent(row, ra) >= 95 ? "Logrado" : monitoreo_producto.percent(row, ra) >= 75 ? "En observación" : "No logrado";
        return "";
    };
    monitoreo_producto.percent = function (row, ra) {
        if (row.indicador_data === undefined)
            return 0;
        if (monitoreo_producto.ano_single(row.indicador_data.anos_a, ra.id) == null) {
            return 0;
        }
        var base = parseFloat(monitoreo_producto.ano_singleraw(row.indicador_data.anos, ra.id));
        var variable = parseFloat(monitoreo_producto.ano_singleraw(row.indicador_data.anos_a, ra.id));
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
    monitoreo_producto.ano_single = function (anos, ano, tipo_meta) {
        if (anos) {
            var rows = anos.split(';');
            for (var row of rows) {
                if (row) {
                    var data = row.split('=');
                    if (data[0] == ano) {
                        return monitoreo_producto.format(data[1], tipo_meta);
                    }
                }
            }
        }
        return null;
    };
    monitoreo_producto.ano_singleraw = function (anos, ano, tipo_meta) {
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
    monitoreo_producto.format = function (valor, tipo_meta) {

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

    monitoreo_producto.extract_companies = function (list) {
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
    monitoreo_producto.extract_companies_id = function (list) {
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

    monitoreo_producto.extract_anos_periodo = function (list) {
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
    monitoreo_producto.extract_anos = function (list) {
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

    monitoreo_producto.exportXLS = function () {
        var url = $("#monitoreo_productoExport").excelexportjs({
            containerid: "monitoreo_productoExportXLS",
            datatype: 'table',
            worksheetName: monitoreo_producto.session.tipo_institucion == 1 ? `Monitoreo y Seguimiento de Proyecto/Producto` : `Monitoreo y Seguimiento de Proyecto/Plan de Acción`,
            returnUri: true
        });
        DOWNLOAD.excel(`${monitoreo_producto.session.tipo_institucion == 1 ? 'Monitoreo y Seguimiento de Proyecto/Producto' : 'Monitoreo y Seguimiento de Proyecto/Plan de Acción'}`, url);
    };

    monitoreo_producto.exportPDF = function () {

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

    //monitoreo_producto.monitoreo_producto_get();

    monitoreo_producto.openmodalField = function (value) {

        monitoreo_producto.tipeExport = value.toString();

        monitoreo_producto.modal.modalView("monitoreo_producto/export", {

            width: 'modal-full',
            header: {
                title: monitoreo_producto.session.tipo_institucion == 1 ? `Vista Previa monitoreo y seguimiento de Proyecto/Producto.` : `Vista Previa monitoreo y seguimiento de Proyecto/Plan de Acción.`,
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
