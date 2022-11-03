app.controller("resumen_poa", function ($scope, $http, $compile) {
    resumen_poa = this;
    resumen_poa.destroyForm = false;
    var user = new SESSION().current();
    resumen_poa.session = user;
    RUNCONTROLLER("resumen_poa", resumen_poa, $scope, $http, $compile);
    resumen_poa.colors = COLOR.secundary;
    resumen_poa.resumen_poa_list = [];
    resumen_poa.tipeExport = '';
    indicador_poa_periodo_list = [];
    resumen_poa.group_caracteristica = user.groups[0] ? user.groups[0].caracteristica : "";
    resumen_poa.tipo_meta_list = [];
    resumen_poa.direccion_meta_list = [];
    resumen_poa.resumen_pei_list = [];
    resumen_poa.resumen_poa_fin = [];
    resumen_poa.resumen_poa_finx = {};
    resumen_poa.LAN = LAN;
    resumen_poa.periodoName = user.monitoreo_nombre;
    resumen_poa.getYear = function getYear() {
        var d = new Date();
        var n = d.getFullYear();
        return n;
    };
    resumen_poa.headerBody_list = [];
    var count2 = 1;
    resumen_poa.cantidad = user.cantidad;
    resumen_poa.session = user;
    resumen_poa.arr_rs = [];
    var rs = resumen_poa.cantidad * 3;
    var count = 0;
    var arr_ind = ['Projectadas', 'Alcanzadas', 'Diferencias'];
    for (var i = 0; i < rs; i++) {
        resumen_poa.arr_rs.push(arr_ind[count] + i);
        count += 1;
        if (count > 2) {
            count = 0;
        }
    }
    resumen_poa.removeNumbers = function (str) {
        var rs = str.replace(/[0-9]/g, '');
        return rs;
    };


    var animation2 = new ANIMATION();
    resumen_poa.rowspanme = function (field, value, arr) {
        return arr.filter(d => {
            if (value != 'Sin Data')
                return eval(`d.${field}==value`)
        }).length;
    };
    resumen_poa.seeme = function (field, value, key, arr) {
        if (arr[key - 1])
            if (value != 'Sin Data')
                return arr[key - 1][field] != value;
        return true;
    };
    resumen_poa.resumen_poa_get = async function () {
        resumen_poa.headerBody_list = [];
        console.log("me ejecute")
        animation2.loading(`#tabs_resumen`, "", ``, '120');
        BASEAPI.listp('vw_resumen_poa', {
            distinct: true,
            limit: 0,
            orderby: "producto",
            order: "asc",
            where: [{
                field: "poa",
                value: user.poa_id
            }]
        }).then(async function (data) {
            resumen_poa.tipo_meta_list = await BASEAPI.listp('tipoMeta', {
                limit: 0,
                orderby: "id",
                order: "asc"
            });
            resumen_poa.direccion_meta_list = await BASEAPI.listp('direccionMeta', {
                limit: 0,
                orderby: "id",
                order: "asc"
            });
            resumen_poa.indicador_poa_periodo_list = await BASEAPI.listp('vw_indicador_poa_periodo', {
                limit: 0,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "poa",
                    value: user.poa_id
                }]
            });
            resumen_poa.resumen_pei_list = await BASEAPI.listp('vw_resumen_pei', {
                limit: 0,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "pei",
                    value: user.pei_id
                }]
            });

            resumen_poa.excelData = [];
            resumen_poa.tipo_meta_list = resumen_poa.tipo_meta_list.data;
            resumen_poa.direccion_meta_list = resumen_poa.direccion_meta_list.data;
            resumen_poa.indicador_poa_periodo_list = resumen_poa.indicador_poa_periodo_list.data;
            resumen_poa.resumen_pei_list = resumen_poa.resumen_pei_list.data;
            resumen_poa.perspectiva_list = await BASEAPI.listp('perspectiva', {
                limit: 0
            });
            if (user.tipo_institucion == 1) {
                for (var i of resumen_poa.resumen_pei_list) {
                    if (i.perspectiva != " ") {
                        i.perspectiva = resumen_poa.perspectiva_list.data.filter(r1_data => {
                            return (i.perspectiva == r1_data.id);
                        })[0].nombre;
                    }
                }
            }else{
                for (var i of resumen_poa.resumen_pei_list) {
                    if (i.perspectiva != " ") {
                        i.perspectiva = resumen_poa.perspectiva_list.data.filter(r1_data => {
                            return (i.perspectiva == r1_data.id);
                        })[0].nombre_privada;
                    }
                }
            }
            resumen_poa.resumen_poa_list = data.data;

            resumen_poa.resumen_poa_finx = Array.from(new Set(resumen_poa.resumen_pei_list.map(a => a.id_resultado)))
                .map(id_resultado => {
                    return resumen_poa.resumen_pei_list.find(a => a.id_resultado === id_resultado)
                });
            var count = 0;
            if (resumen_poa.group_caracteristica == ENUM_2.Grupos.director_departamental || resumen_poa.group_caracteristica == ENUM_2.Grupos.analista_departamental){
                for (var i of resumen_poa.resumen_poa_finx) {
                    resumen_poa.resumen_poa_fin[count] = {
                        header: i,
                        data: resumen_poa.resumen_poa_list.filter(d => d.resultado === i.id_resultado && d.id_departamento == user.departamento)
                    };
                    count++;
                }
            }else {
                for (var i of resumen_poa.resumen_poa_finx) {
                    resumen_poa.resumen_poa_fin[count] = {
                        header: i,
                        data: resumen_poa.resumen_poa_list.filter(d => d.resultado === i.id_resultado)
                    };
                    count++;
                }
            }
            for (var i of resumen_poa.resumen_poa_fin) {
                for (var ip of i.data) {
                    ip.nofinancieros = eval(ip.nofinancieros);
                    ip.tipo_meta = resumen_poa.tipo_meta_list.filter(r1_data => {
                        return (ip.tipo_meta == r1_data.id);
                    });

                    ip.direccion_meta = resumen_poa.direccion_meta_list.filter(r2_data => {
                        return (ip.direccion_meta == r2_data.id);
                    });
                }
            }


            selected = [];
            for (var a = 1; a <= user.cantidad; a++) {
                eval(` resumen_poa.headerBody_list.push({name: "${resumen_poa.periodoName + ' ' + count2}", periodo: a });`);
                count2++;
                for (var ip of resumen_poa.resumen_poa_list) {
                    selected = resumen_poa.indicador_poa_periodo_list.filter(data => {
                        if (data.indicador_poa == ip.indicador_poa_id && data.periodo == a) {
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

            resumen_poa.excelData = resumen_poa.resumen_poa_list;

            for (var header of resumen_poa.excelData) {
                header.header_data = resumen_poa.resumen_poa_fin.filter(data => {
                    return (header.resultado === data.id_resultado);
                });
            }

            for (var header of resumen_poa.excelData) {
                header.header_data = resumen_poa.resumen_poa_fin.filter(data => {
                    return (header.resultado === data.header.id_resultado);
                });
            }

            animation2.stoploading(`#tabs_resumen`);
            resumen_poa.refreshAngular();
        });

    };
    resumen_poa.exportXLS = function () {
        var url = $("#resumen_poaTable").excelexportjs({
            containerid: "resumen_poaTable",
            datatype: 'table',
            worksheetName: `POA - actividades - Proyecto/Producto.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("POA - actividades - Proyecto/Producto", url);
    };
    resumen_poa.exportPDF = function () {

        $("#generalpdf").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    // resumen_poa.resumen_poa_get();

    resumen_poa.openmodalField = function (value) {

        resumen_poa.tipeExport = value.toString();


        resumen_poa.modal.modalView("resumen_poa/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa POA - actividades / indicadores de Proyecto/Producto`,
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
