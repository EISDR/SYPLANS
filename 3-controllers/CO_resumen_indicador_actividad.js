app.controller("resumen_indicador_actividad", function ($scope, $http, $compile) {
    resumen_indicador_actividad = this;
    resumen_indicador_actividad.destroyForm = false;
    var user = new SESSION().current();
    resumen_indicador_actividad.session = user;
    RUNCONTROLLER("resumen_indicador_actividad", resumen_indicador_actividad, $scope, $http, $compile);

    resumen_indicador_actividad.colors = COLOR.secundary;
    resumen_indicador_actividad.tipeExport = '';
    resumen_indicador_actividad.group_caracteristica = user.groups[0] ? user.groups[0].caracteristica : "";
    resumen_indicador_actividad.resumen_indicador_actividad_list = [];
    resumen_indicador_actividad.headerBody_list = [];

    resumen_indicador_actividad.tipo_meta_list = [];
    resumen_indicador_actividad.direccion_meta_list = [];
    resumen_indicador_actividad.indicador_poa_periodo_list = [];

    var count1 = 1;
    resumen_indicador_actividad.cantidad = user.cantidad;
    resumen_indicador_actividad.periodoName = user.monitoreo_nombre;

    resumen_indicador_actividad.arr_rs = [];
    var rs2 = resumen_indicador_actividad.cantidad * 3;
    var contador = 0;
    var arr_indc = ['Projectadas', 'Alcanzadas', 'Diferencias'];
    for (var i = 0; i < rs2; i++) {
        resumen_indicador_actividad.arr_rs.push(arr_indc[contador] + i);
        contador += 1;
        if (contador > 2) {
            contador = 0;
        }
    }

    resumen_indicador_actividad.removeNumbers = function (str) {
        var rs = str.replace(/[0-9]/g, '');
        return rs;
    };

    var animation4 = new ANIMATION();

    resumen_indicador_actividad.alert_color = function (P, A, dir, ano) {
        var mon = new Date().getMonth() + 1;
        mon = Math.ceil((mon / (12 / user.cantidad)));
        if (ano > mon) {
            return "#000000";
        }
        return resumen_indicador_poa.percent(P, A, dir) >= 95 ? "#009900" : resumen_indicador_actividad.percent(P, A, dir) >= 75 ? "#eae42dfc" : "#FF0000"
    };
    resumen_indicador_actividad.percent = function (P, A, dir) {
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

    resumen_indicador_actividad.resumen_indicador_actividad_get = async function () {
        resumen_indicador_actividad.headerBody_list = [];
        animation4.loading(`#tabs_resumen`, "", ``, '120');
        BASEAPI.listp('resumen_indicador_actividad', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: [{
                field: "poa",
                value: user.poa_id
            }]
        }).then(async function (rs_data) {
            resumen_indicador_actividad.tipo_meta_list = await BASEAPI.listp('tipoMeta', {
                limit: 0,
                orderby: "id",
                order: "asc"
            });
            resumen_indicador_actividad.direccion_meta_list = await BASEAPI.listp('direccionMeta', {
                limit: 0,
                orderby: "id",
                order: "asc"
            });
            resumen_indicador_actividad.indicador_poa_periodo_list = await BASEAPI.listp('vw_indicador_actividad_periodo', {
                limit: 0,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "poa",
                    value: user.poa_id
                }]
            });

            resumen_indicador_actividad.tipo_meta_list = resumen_indicador_actividad.tipo_meta_list.data;
            resumen_indicador_actividad.direccion_meta_list = resumen_indicador_actividad.direccion_meta_list.data;
            resumen_indicador_actividad.indicador_poa_periodo_list = resumen_indicador_actividad.indicador_poa_periodo_list.data;
            if (resumen_indicador_actividad.group_caracteristica == ENUM_2.Grupos.director_departamental || resumen_indicador_actividad.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                resumen_indicador_actividad.resumen_indicador_actividad_list = rs_data.data.filter(data => {
                    return (data.departamento == user.departamento);
                });
            } else {
                resumen_indicador_actividad.resumen_indicador_actividad_list = rs_data.data;
            }


            for (var ip of resumen_indicador_actividad.resumen_indicador_actividad_list) {
                ip.tipo_meta = resumen_indicador_actividad.tipo_meta_list.filter(r1_data => {
                    return (ip.tipo_meta === r1_data.id);
                });

                ip.tipo_meta = ip.tipo_meta[0].nombre;

                ip.direccion_meta = resumen_indicador_actividad.direccion_meta_list.filter(r2_data => {
                    return (ip.direccion_meta === r2_data.id);
                });

                ip.direccion_meta = ip.direccion_meta[0].nombre;

            }


            var selected = [];
            for (var a = 1; a <= user.cantidad; a++) {
                eval(` resumen_indicador_actividad.headerBody_list.push({name: "${resumen_indicador_actividad.periodoName + ' ' + count1}", periodo: a });`);
                count1++;
                for (var ip of resumen_indicador_actividad.resumen_indicador_actividad_list) {
                    selected = resumen_indicador_actividad.indicador_poa_periodo_list.filter(rs_data => {
                        if (rs_data.indicador_actividad == ip.id && rs_data.periodo == a) {
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
                        eval(`ip.periodo${a}color = resumen_indicador_actividad.alert_color(selected[0].valor,selected[0].valor_alcanzado,ip.direccion_meta,a)`);

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
            resumen_indicador_actividad.refreshAngular();
        });
    };
    resumen_indicador_actividad.exportXLS = function () {
        var url = $("#resumen_indicador_actividadTable").excelexportjs({
            containerid: "resumen_indicador_actividadTable",
            datatype: 'table',
            worksheetName: `Indicadores Actividades.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Indicadores Actividades", url);
    };
    resumen_indicador_actividad.exportPDF = function () {

        var fileName = `Indicadores Actividades.xls`;
        var url = $("#resumen_indicador_actividadTableexport").excelexportjs({
            containerid: "resumen_indicador_actividadTableexport",
            datatype: 'table',
            worksheetName: `Indicadores Actividades`,
            returnUri: true
        });
        DOWNLOAD.excel(fileName, url);
        //
        // $(".resumen_indicador_actividadTable").printThis({
        //     importCSS: false,                // import parent page css
        //     loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
        //     printDelay: 333,
        // });
    };




    resumen_indicador_actividad.openmodalField = function (value) {

        resumen_indicador_actividad.tipeExport = value.toString();


        resumen_indicador_actividad.modal.modalView("resumen_indicador_actividad/export", {

            width: 'modal-full',
            header: {
                title: resumen_indicador_actividad.session.tipo_institucion === 1 ?`Vista Previa Resumen Indicadores de Proyecto/Producto` : `Vista Previa Resumen Indicadores de Proyecto/Plan de Acción`,
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
