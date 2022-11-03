app.controller("resumen_indicador_pei", function ($scope, $http, $compile) {
    resumen_indicador_pei = this;
    resumen_indicador_pei.destroyForm = false;
    var user = new SESSION().current();
    RUNCONTROLLER("resumen_indicador_pei", resumen_indicador_pei, $scope, $http, $compile);
    resumen_indicador_pei.session = user;
    resumen_indicador_pei.colors = COLOR.secundary;
    resumen_indicador_pei.tipeExport = '';
    resumen_indicador_pei.resumen_indicador_pei_list = [];
    resumen_indicador_pei.headerBody_list = [];

    resumen_indicador_pei.tipo_meta_list = [];
    resumen_indicador_pei.direccion_meta_list = [];
    resumen_indicador_pei.indicador_pei_ano_list = [];

    var count1 = 1;

    resumen_indicador_pei.arr_rs = [];
    resumen_indicador_pei.countSpan = ((user.periodo_hasta - user.periodo_desde) + 1) * 3;
    var rs2 = resumen_indicador_pei.countSpan;
    var contador = 0;
    var arr_indc = ['Projectadas', 'Alcanzadas', 'Diferencias'];
    for (var i = 0; i < rs2; i++) {
        resumen_indicador_pei.arr_rs.push(arr_indc[contador] + i);
        contador += 1;
        if (contador > 2) {
            contador = 0;
        }
    }

    resumen_indicador_pei.removeNumbers = function (str) {
        var rs = str.replace(/[0-9]/g, '');
        return rs;
    };

    var animation3 = new ANIMATION();

    resumen_indicador_pei.cantidad = 0;

    resumen_indicador_pei.resumen_indicador_pei_get = async function () {
        resumen_indicador_pei.headerBody_list = [];
        animation3.loading(`#tabs_resumen`, "", ``, '120');
        BASEAPI.listp('resumen_indicador_pei', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: [{
                field: "pei",
                value: user.pei_id
            }]
        }).then(async function (rs_data) {
            resumen_indicador_pei.tipo_meta_list = await BASEAPI.listp('tipoMeta', {
                limit: 0,
                orderby: "id",
                order: "asc"
            });
            resumen_indicador_pei.direccion_meta_list = await BASEAPI.listp('direccionMeta', {
                limit: 0,
                orderby: "id",
                order: "asc"
            });
            resumen_indicador_pei.indicador_pei_ano_list = await BASEAPI.listp('vw_indicador_pei_ano', {
                limit: 0,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "pei",
                    value: user.pei_id
                }]
            });
            resumen_indicador_pei.perspectiva_list = await BASEAPI.listp('perspectiva', {
                limit: 0
            });
            resumen_indicador_pei.tipo_meta_list = resumen_indicador_pei.tipo_meta_list.data;
            resumen_indicador_pei.direccion_meta_list = resumen_indicador_pei.direccion_meta_list.data;
            resumen_indicador_pei.indicador_pei_ano_list = resumen_indicador_pei.indicador_pei_ano_list.data;
            resumen_indicador_pei.resumen_indicador_pei_list = rs_data.data;

            for (var ip of resumen_indicador_pei.resumen_indicador_pei_list) {
                ip.tipo_meta = resumen_indicador_pei.tipo_meta_list.filter(r1_data => {
                    return (ip.tipo_meta === r1_data.id);
                });

                ip.tipo_meta = ip.tipo_meta[0].nombre;

                ip.direccion_meta = resumen_indicador_pei.direccion_meta_list.filter(r2_data => {
                    return (ip.direccion_meta === r2_data.id);
                });

                ip.direccion_meta = ip.direccion_meta[0].nombre;

            }
            if (user.tipo_institucion == 1) {
                for (var i of resumen_indicador_pei.resumen_indicador_pei_list) {
                    if (i.perspectiva != " ") {
                        i.perspectiva = resumen_indicador_pei.perspectiva_list.data.filter(r1_data => {
                            return (i.perspectiva == r1_data.id);
                        })[0].nombre;
                    }
                }
            }else{
                for (var i of resumen_indicador_pei.resumen_indicador_pei_list) {
                    if (i.perspectiva != " ") {
                        i.perspectiva = resumen_indicador_pei.perspectiva_list.data.filter(r1_data => {
                            return (i.perspectiva == r1_data.id);
                        })[0].nombre_privada;
                    }
                }
            }
            var selected = [];
            for (var a = user.periodo_desde; a <= user.periodo_hasta; a++) {
                eval(` resumen_indicador_pei.headerBody_list.push({name: "${a}", ano: a });`);
                count1++;
                resumen_indicador_pei.cantidad += 1;
                for (var ip of resumen_indicador_pei.resumen_indicador_pei_list) {
                    selected = resumen_indicador_pei.indicador_pei_ano_list.filter(rs_data => {
                        if (rs_data.indicador_pei == ip.id && rs_data.ano == a) {
                            return true;
                        }
                    });
                    eval(`
                        if( typeof ip.ano == 'undefined'){
                            ip.ano = [];
                        }
                    `);
                    if (selected.length > 0) {
                        eval(`ip.ano.push("${selected[0].valor}")`);
                        eval(`ip.ano.push("${selected[0].valor_alcanzado}")`);
                        eval(`ip.ano.push("${selected[0].varianzas}")`);

                        eval(`ip.ano${a}P = selected[0].valor`);
                        eval(`ip.ano${a}A = selected[0].valor_alcanzado`);
                        eval(`ip.ano${a}V = selected[0].varianzas`);
                        eval(`ip.ano${a}color = resumen_indicador_pei.alert_color(selected[0].valor,selected[0].valor_alcanzado,ip.direccion_meta,a)`);

                        eval(`ip.ano${a} = "${selected[0].valor + ' | ' + selected[0].valor_alcanzado + ' | ' + selected[0].varianzas}";`);
                    } else {
                        eval(`ip.ano.push("")`);
                        eval(`ip.ano.push("")`);
                        eval(`ip.ano.push("")`);
                        eval(`ip.ano${a} = "";`);
                    }
                }
            }
            animation3.stoploading(`#tabs_resumen`);
            resumen_indicador_pei.refreshAngular();
        });
    };

    resumen_indicador_pei.alert_color = function (P, A, dir, ano) {
        if (ano > new Date().getFullYear()) {
            return "#000000";
        }
        return resumen_indicador_pei.percent(P, A, dir) >= 95 ? "#009900" : resumen_indicador_pei.percent(P, A, dir) >= 75 ? "#eae42dfc" : "#FF0000"
    };
    resumen_indicador_pei.percent = function (P, A, dir) {
        if (A == null) {
            return 0;
        }
        var base = parseFloat(P);
        var variable = parseFloat(A);

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
    resumen_indicador_pei.exportXLS = function () {
        var url = $("#resumen_indicador_peiTable").excelexportjs({
            containerid: "resumen_indicador_peiTable",
            datatype: 'table',
            worksheetName: `Indicadores PEI.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Indicadores PEI", url);
    };
    resumen_indicador_pei.exportPDF = function () {
        var fileName = `Indicadores PEI.xls`;
        var url = $("#table1").excelexportjs({
            containerid: "table1",
            datatype: 'table',
            worksheetName: `Indicadores PEI`,
            returnUri: true
        });
        DOWNLOAD.excel(fileName, url);
        //
        // $(".resumen_indicador_peiTable").printThis({
        //     importCSS: false,                // import parent page css
        //     loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
        //     printDelay: 333,
        // });
    };


    resumen_indicador_pei.openmodalField = function (value) {

        resumen_indicador_pei.tipeExport = value.toString();


        resumen_indicador_pei.modal.modalView("resumen_indicador_pei/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Resumen Indicadores del Plan Estratégico`,
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
