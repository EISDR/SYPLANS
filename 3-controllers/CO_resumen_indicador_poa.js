app.controller("resumen_indicador_poa", function ($scope, $http, $compile) {
    resumen_indicador_poa = this;
    resumen_indicador_poa.destroyForm = false;
    var user = new SESSION().current();
    resumen_indicador_poa.session = user;
    RUNCONTROLLER("resumen_indicador_poa", resumen_indicador_poa, $scope, $http, $compile);

    resumen_indicador_poa.colors = COLOR.secundary;
    resumen_indicador_poa.tipeExport = '';
    resumen_indicador_poa.group_caracteristica = user.groups[0] ? user.groups[0].caracteristica : "";
    resumen_indicador_poa.resumen_indicador_poa_list = [];
    resumen_indicador_poa.headerBody_list = [];

    resumen_indicador_poa.tipo_meta_list = [];
    resumen_indicador_poa.direccion_meta_list = [];
    resumen_indicador_poa.indicador_poa_periodo_list = [];

    var count1 = 1;
    resumen_indicador_poa.cantidad = user.cantidad;
    resumen_indicador_poa.periodoName = user.monitoreo_nombre;

    resumen_indicador_poa.arr_rs = [];
    var rs2 = resumen_indicador_poa.cantidad * 3;
    var contador = 0;
    var arr_indc = ['Projectadas', 'Alcanzadas', 'Diferencias'];
    for (var i = 0; i < rs2; i++) {
        resumen_indicador_poa.arr_rs.push(arr_indc[contador] + i);
        contador += 1;
        if (contador > 2) {
            contador = 0;
        }
    }

    resumen_indicador_poa.removeNumbers = function (str) {
        var rs = str.replace(/[0-9]/g, '');
        return rs;
    };

    var animation4 = new ANIMATION();

    resumen_indicador_poa.alert_color = function (P, A, dir, ano) {
        var mon = new Date().getMonth() + 1;
        mon = Math.ceil((mon / (12 / user.cantidad)));
        if (ano > mon) {
            return "#000000";
        }
        return resumen_indicador_poa.percent(P, A, dir) >= 95 ? "#009900" : resumen_indicador_poa.percent(P, A, dir) >= 75 ? "#eae42dfc" : "#FF0000"
    };
    resumen_indicador_poa.percent = function (P, A, dir) {
        if (A == null) {
            return 0;
        }
        var base = parseFloat(P);
        var variable = parseFloat(A);
        if (!variable)
            return 0;
        if (dir == "Ascendente") {
            var calc = (variable * 100) / (base || 1);
            return calc > 100 ? 100 : Math.floor(calc);
        } else if (dir == "Descendente") {
            var calc = ((base || 1) * 100) / (variable || 1);
            return calc > 100 ? 100 : Math.floor(calc);
        } else {
            if ((base || 1) == (variable || 1))
                return 100;
            var calc = ((base || 1) * 100) / (variable || 1);
            return calc > 100 ? Math.floor(100 - (calc - 100)) : Math.floor(calc);
        }

    };

    resumen_indicador_poa.resumen_indicador_poa_get = async function () {
        resumen_indicador_poa.headerBody_list = [];
        animation4.loading(`#tabs_resumen`, "", ``, '120');
        BASEAPI.listp('resumen_indicador_poa', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: [{
                field: "poa",
                value: user.poa_id
            }]
        }).then(async function (rs_data) {
            resumen_indicador_poa.tipo_meta_list = await BASEAPI.listp('tipoMeta', {
                limit: 0,
                orderby: "id",
                order: "asc"
            });
            resumen_indicador_poa.direccion_meta_list = await BASEAPI.listp('direccionMeta', {
                limit: 0,
                orderby: "id",
                order: "asc"
            });
            resumen_indicador_poa.indicador_poa_periodo_list = await BASEAPI.listp('vw_indicador_poa_periodo', {
                limit: 0,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "poa",
                    value: user.poa_id
                }]
            });

            resumen_indicador_poa.tipo_meta_list = resumen_indicador_poa.tipo_meta_list.data;
            resumen_indicador_poa.direccion_meta_list = resumen_indicador_poa.direccion_meta_list.data;
            resumen_indicador_poa.indicador_poa_periodo_list = resumen_indicador_poa.indicador_poa_periodo_list.data;
            if (resumen_indicador_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || resumen_indicador_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                resumen_indicador_poa.resumen_indicador_poa_list = rs_data.data.filter(data => {
                    return (data.departamento == user.departamento);
                });
            } else {
                resumen_indicador_poa.resumen_indicador_poa_list = rs_data.data;
            }


            for (var ip of resumen_indicador_poa.resumen_indicador_poa_list) {
                ip.tipo_meta = resumen_indicador_poa.tipo_meta_list.filter(r1_data => {
                    return (ip.tipo_meta === r1_data.id);
                });

                ip.tipo_meta = ip.tipo_meta[0].nombre;

                ip.direccion_meta = resumen_indicador_poa.direccion_meta_list.filter(r2_data => {
                    return (ip.direccion_meta === r2_data.id);
                });

                ip.direccion_meta = ip.direccion_meta[0].nombre;

            }


            var selected = [];
            for (var a = 1; a <= user.cantidad; a++) {
                eval(` resumen_indicador_poa.headerBody_list.push({name: "${resumen_indicador_poa.periodoName + ' ' + count1}", periodo: a });`);
                count1++;
                for (var ip of resumen_indicador_poa.resumen_indicador_poa_list) {
                    selected = resumen_indicador_poa.indicador_poa_periodo_list.filter(rs_data => {
                        if (rs_data.indicador_poa == ip.id && rs_data.periodo == a) {
                            return true;
                        }
                    });
                    eval(`
                        if( typeof ip.periodo == 'undefined'){
                            ip.periodo = [];
                        }
                    `);
                    if (selected.length > 0) {
                        eval(`ip.periodo.push("${selected[0].valor}")`);
                        eval(`ip.periodo.push("${selected[0].valor_alcanzado}")`);
                        eval(`ip.periodo.push("${selected[0].varianzas}")`);

                        eval(`ip.periodo${a}P = selected[0].valor`);
                        eval(`ip.periodo${a}A = selected[0].valor_alcanzado`);
                        eval(`ip.periodo${a}V = selected[0].varianzas`);
                        eval(`ip.periodo${a}color = resumen_indicador_poa.alert_color(selected[0].valor,selected[0].valor_alcanzado,ip.direccion_meta,a)`);

                        eval(`ip.periodo${a} = "${selected[0].valor + ' | ' + selected[0].valor_alcanzado + ' | ' + selected[0].varianzas}";`);
                    } else {
                        eval(`ip.periodo.push("")`);
                        eval(`ip.periodo.push("")`);
                        eval(`ip.periodo.push("")`);
                        eval(`ip.periodo${a} = "";`);
                    }
                }
            }
            animation4.stoploading(`#tabs_resumen`);
            resumen_indicador_poa.refreshAngular();
        });
    };
    resumen_indicador_poa.exportXLS = function () {
        var url = $("#resumen_indicador_poaTable").excelexportjs({
            containerid: "resumen_indicador_poaTable",
            datatype: 'table',
            worksheetName: resumen_indicador_poa.session.tipo_institucion === 1 ?`Indicadores de Proyecto/Producto.xls` : `Indicadores de Proyecto/Plan de Acción.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Indicadores de Proyecto/Producto", url);
    };
    resumen_indicador_poa.exportPDF = function () {

        var fileName = `Indicadores de Proyecto/Producto.xls`;
        var url = $("#resumen_indicador_poaTableexport").excelexportjs({
            containerid: "resumen_indicador_poaTableexport",
            datatype: 'table',
            worksheetName: resumen_indicador_poa.session.tipo_institucion === 1 ?`Indicadores de Proyecto/Producto.xls` : `Indicadores de Proyecto/Plan de Acción.xls`,
            returnUri: true
        });
        DOWNLOAD.excel(fileName, url);
        //
        // $(".resumen_indicador_poaTable").printThis({
        //     importCSS: false,                // import parent page css
        //     loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
        //     printDelay: 333,
        // });
    };




    resumen_indicador_poa.openmodalField = function (value) {

        resumen_indicador_poa.tipeExport = value.toString();


        resumen_indicador_poa.modal.modalView("resumen_indicador_poa/export", {

            width: 'modal-full',
            header: {
                title: resumen_indicador_poa.session.tipo_institucion === 1 ?`Vista Previa Resumen Indicadores de Proyecto/Producto` : `Vista Previa Resumen Indicadores de Proyecto/Plan de Acción`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
            event: {
                show: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                },
                hide: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                }
            },
        });
    }

});
