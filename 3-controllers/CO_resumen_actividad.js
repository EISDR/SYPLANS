app.controller("resumen_actividad", function ($scope, $http, $compile) {
    resumen_actividad = this;
    resumen_actividad.destroyForm = false;
    var user = new SESSION().current();
    RUNCONTROLLER("resumen_actividad", resumen_actividad, $scope, $http, $compile);
    resumen_actividad.colors = COLOR.secundary;
    resumen_actividad.resumen_actividad_list = [];
    resumen_actividad.tipeExport = '';
    indicador_poa_periodo_list = [];
    resumen_actividad.group_caracteristica = user.groups[0] ? user.groups[0].caracteristica : "";
    resumen_actividad.tipo_meta_list = [];
    resumen_actividad.direccion_meta_list = [];
    resumen_actividad.resumen_pei_list = [];
    resumen_actividad.resumen_actividad_fin = [];
    resumen_actividad.resumen_actividad_finx = {};
    resumen_actividad.LAN = LAN;
    resumen_actividad.periodoName = user.monitoreo_nombre;
    resumen_actividad.getYear = function getYear() {
        var d = new Date();
        var n = d.getFullYear();
        return n;
    };
    resumen_actividad.headerBody_list = [];
    var count2 = 1;
    resumen_actividad.cantidad = user.cantidad;

    resumen_actividad.arr_rs = [];
    var rs = resumen_actividad.cantidad * 3;
    var count = 0;
    var arr_ind = ['Projectadas', 'Alcanzadas', 'Diferencias'];
    for (var i = 0; i < rs; i++) {
        resumen_actividad.arr_rs.push(arr_ind[count] + i);
        count += 1;
        if (count > 2) {
            count = 0;
        }
    }
    resumen_actividad.removeNumbers = function (str) {
        var rs = str.replace(/[0-9]/g, '');
        return rs;
    };


    var animation2 = new ANIMATION();
    resumen_actividad.rowspanme = function (field, value, arr) {
        return arr.filter(d => {
            if (value != 'Sin Data')
                return eval(`d.${field}==value`)
        }).length;
    };
    resumen_actividad.seeme = function (field, value, key, arr) {
        if (arr[key - 1])
            if (value != 'Sin Data')
                return arr[key - 1][field] != value;
        return true;
    };
    resumen_actividad.resumen_actividad_get = async function () {
        resumen_actividad.headerBody_list = [];
        animation2.loading(`#resumen_actividadTable`, "", ``, '30');
        BASEAPI.listp('vw_resumen_actividad', {
            distinct: true,
            limit: 0,
            orderby: "producto",
            order: "asc",
            where: [{
                field: "poa",
                value: user.poa_id
            }]
        }).then(async function (data) {
            resumen_actividad.tipo_meta_list = await BASEAPI.listp('tipoMeta', {
                limit: 0,
                orderby: "id",
                order: "asc"
            });
            resumen_actividad.direccion_meta_list = await BASEAPI.listp('direccionMeta', {
                limit: 0,
                orderby: "id",
                order: "asc"
            });
            resumen_actividad.indicador_poa_periodo_list = await BASEAPI.listp('vw_indicador_actividad_periodo', {
                limit: 0,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "poa",
                    value: user.poa_id
                }]
            });
            resumen_actividad.resumen_pei_list = await BASEAPI.listp('vw_resumen_pei', {
                limit: 0,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "pei",
                    value: user.pei_id
                }]
            });

            resumen_actividad.excelData = [];
            resumen_actividad.tipo_meta_list = resumen_actividad.tipo_meta_list.data;
            resumen_actividad.direccion_meta_list = resumen_actividad.direccion_meta_list.data;
            resumen_actividad.indicador_poa_periodo_list = resumen_actividad.indicador_poa_periodo_list.data;
            resumen_actividad.resumen_pei_list = resumen_actividad.resumen_pei_list.data;
            resumen_actividad.resumen_actividad_list = data.data;

            resumen_actividad.resumen_actividad_finx = Array.from(new Set(resumen_actividad.resumen_pei_list.map(a => a.id_resultado)))
                .map(id_resultado => {
                    return resumen_actividad.resumen_pei_list.find(a => a.id_resultado === id_resultado)
                });
            var count = 0;
            if (resumen_actividad.group_caracteristica == ENUM_2.Grupos.director_departamental || resumen_actividad.group_caracteristica == ENUM_2.Grupos.analista_departamental){
                for (var i of resumen_actividad.resumen_actividad_finx) {
                    resumen_actividad.resumen_actividad_fin[count] = {
                        header: i,
                        data: resumen_actividad.resumen_actividad_list.filter(d => d.resultado === i.id_resultado && d.id_departamento == user.departamento)
                    };
                    count++;
                }
            }else {
                for (var i of resumen_actividad.resumen_actividad_finx) {
                    resumen_actividad.resumen_actividad_fin[count] = {
                        header: i,
                        data: resumen_actividad.resumen_actividad_list.filter(d => d.resultado === i.id_resultado)
                    };
                    count++;
                }
            }
            for (var i of resumen_actividad.resumen_actividad_fin) {
                for (var ip of i.data) {
                    ip.tipo_meta = resumen_actividad.tipo_meta_list.filter(r1_data => {
                        return (ip.tipo_meta == r1_data.id);
                    });

                    ip.direccion_meta = resumen_actividad.direccion_meta_list.filter(r2_data => {
                        return (ip.direccion_meta == r2_data.id);
                    });
                }
            }


            selected = [];
            for (var a = 1; a <= user.cantidad; a++) {
                eval(` resumen_actividad.headerBody_list.push({name: "${resumen_actividad.periodoName + ' ' + count2}", periodo: a });`);
                count2++;
                for (var ip of resumen_actividad.resumen_actividad_list) {
                    selected = resumen_actividad.indicador_poa_periodo_list.filter(data => {
                        if (data.indicador_actividad == ip.indicador_actividad_id && data.periodo == a) {
                            return true;
                        }
                        ;
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
                        eval(`ip.periodo${a} = "${selected[0].valor + ' | ' + selected[0].valor_alcanzado + ' | ' + selected[0].varianzas}";`);
                    } else {
                        eval(`ip.periodo.push("")`);
                        eval(`ip.periodo.push("")`);
                        eval(`ip.periodo.push("")`);
                        eval(`ip.periodo${a} = "";`);
                    }
                }
            }

            resumen_actividad.excelData = resumen_actividad.resumen_actividad_list;

            for (var header of resumen_actividad.excelData) {
                header.header_data = resumen_actividad.resumen_actividad_fin.filter(data => {
                    return (header.resultado === data.id_resultado);
                });
            }

            for (var header of resumen_actividad.excelData) {
                header.header_data = resumen_actividad.resumen_actividad_fin.filter(data => {
                    return (header.resultado === data.header.id_resultado);
                });
            }

            animation2.stoploading(`.resumen_actividadTable`);
            resumen_actividad.refreshAngular();
        });

    };
    resumen_actividad.exportXLS = function () {
        let resumen_actividadTable = $("#resumen_actividadTable");
        resumen_actividadTable.css({'display': 'block', 'visibility': 'hidden'});
        var url = resumen_actividadTable.excelexportjs({
            containerid: "resumen_actividadTable",
            datatype: 'table',
            worksheetName: `ResumenPOA.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Resumen POA", url);
        resumen_actividadTable.css('display', 'none');
    };
    resumen_actividad.exportPDF = function () {

        var fileName = `Resumen POA.xls`;
        var url = $("#generalpdf").excelexportjs({
            containerid: "generalpdf",
            datatype: 'table',
            worksheetName: `Resumen POA`,
            returnUri: true
        });
        DOWNLOAD.excel(fileName, url);

        // $(".resumen_actividadTable").printThis({
        //     importCSS: false,                // import parent page css
        //     loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
        //     printDelay: 333,
        // });
    };
    resumen_actividad.resumen_actividad_get();

    resumen_actividad.openmodalField = function (value) {

        resumen_actividad.tipeExport = value.toString();


        resumen_actividad.modal.modalView("resumen_actividad/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Resumen POA`,
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
