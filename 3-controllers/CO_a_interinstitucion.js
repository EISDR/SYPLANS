app.controller("a_interinstitucion", function ($scope, $http, $compile) {
    a_interinstitucion = this;
    a_interinstitucion.destroyForm = false;
    var user = new SESSION().current();
    a_interinstitucion.session = user;
    //a_interinstitucion.fixFilters = [];
    //a_interinstitucion.singular = "singular";
    //a_interinstitucion.plural = "plural";
    //a_interinstitucion.headertitle = "Hola Title";
    //a_interinstitucion.destroyForm = false;
    //a_interinstitucion.permissionTable = "tabletopermission";
    RUNCONTROLLER("a_interinstitucion", a_interinstitucion, $scope, $http, $compile);
    RUN_B("a_interinstitucion", a_interinstitucion, $scope, $http, $compile);
    a_interinstitucion.colors = COLOR.secundary;
    a_interinstitucion.resumen_pei_list = [];
    a_interinstitucion.tipeExport = '';
    var animation1 = new ANIMATION();

    a_interinstitucion.tipometa = function (id) {
        return baseController.list_tipo_meta.filter(d => d.id == id)[0] || {nombre: "N/A"};
    };
    a_interinstitucion.direccionmeta = function (val) {
        if (val == 1) {
            return "Ascendente";
        } else if (val == 2) {
            return "Descendente";
        } else {
            return "No Varianza";
        }
    };
    a_interinstitucion.rowspanme = function (field, value, list) {
        var r = 0;
        r = list.filter(d => {
            if (value != ' ')
                return eval(`d.${field}==value`)
        }).length;
        return r ? r : 1;
    };
    a_interinstitucion.seeme = function (field, value, key, list) {
        if (list[key - 1])
            if (value != ' ')
                return list[key - 1][field] != value;
        return true;
    };

    a_interinstitucion.openIndicador = function (type, indicador) {
        open_ficha_indicador(type, indicador)
    };
    a_interinstitucion.openIndicadorComment = function (type, indicador, allow) {
        open_comments_indicador(type, indicador, allow)
    };
    a_interinstitucion.desableDepa = function (val) {
        a_interinstitucion.disabledepa = val;
        a_interinstitucion.refreshAngular();
    };

    a_interinstitucion.a_interinstitucion_get = async function () {
        animation1.loading(`#resumen_peiTable`, "", ``, '30');

        var user = new SESSION().current();

        a_interinstitucion.pei = await BASEAPI.listp('vw_aii_pei', {
            limit: 0,
            orderby: "$ compania,r1, r2, r3, r4, r5",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        a_interinstitucion.poa = await BASEAPI.listp('vw_aii_poa', {
            limit: 0,
            orderby: "$ compania,institucion,poa,r1,departamento, r2",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });

        a_interinstitucion.actividad = await BASEAPI.listp('vw_aii_act', {
            limit: 0,
            orderby: "$ compania,institucion,poa,r1,departamento, r2",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        a_interinstitucion.pei = a_interinstitucion.pei.data;
        if (a_interinstitucion.pei) {
            a_interinstitucion.pei_anos = a_interinstitucion.extract_anos(a_interinstitucion.pei);
            a_interinstitucion.pei_valor = [];
            for (var a = 0; a < (a_interinstitucion.pei_anos.length * 3); a++) {
                var indica = ((a + 1) % 3);
                if (indica === 1) indica = {id: a_interinstitucion.pei_anos[Math.floor(a / 3)], value: "P"};
                if (indica === 2) indica = {id: a_interinstitucion.pei_anos[Math.floor(a / 3)], value: "A"};
                if (indica === 0) indica = {id: a_interinstitucion.pei_anos[Math.floor(a / 3)], value: "D"};
                a_interinstitucion.pei_valor[a] = indica;
            }
            a_interinstitucion.pei_companies = a_interinstitucion.extract_companies(a_interinstitucion.pei);

            a_interinstitucion.pei_companies_id = a_interinstitucion.extract_companies_id(a_interinstitucion.pei);
            for (var cid in a_interinstitucion.pei_companies_id) {
                var lacid = a_interinstitucion.pei_companies_id[cid];
                lacid.logo = 'assets/images/placeholder.jpg';
                var real = await FILE.serverp(`${lacid.tipo}/logo/${lacid.id}`);
                if (real[0]) {
                    if (real[0].url) {
                        lacid.logo = real[0].url;
                    }
                }
            }

        }
        var monthNames = ["",
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        a_interinstitucion.poa = a_interinstitucion.poa.data;
        if (a_interinstitucion.poa) {
            a_interinstitucion.poa_anos = a_interinstitucion.extract_anos(a_interinstitucion.poa);
            a_interinstitucion.poa_valor = [];
            for (var a = 0; a < (a_interinstitucion.poa_anos.length * 3); a++) {
                var indica = ((a + 1) % 3);
                if (indica === 1) indica = {id: a_interinstitucion.poa_anos[Math.floor(a / 3)], value: "P"};
                if (indica === 2) indica = {id: a_interinstitucion.poa_anos[Math.floor(a / 3)], value: "A"};
                if (indica === 0) indica = {id: a_interinstitucion.poa_anos[Math.floor(a / 3)], value: "D"};
                a_interinstitucion.poa_valor[a] = indica;
            }

            a_interinstitucion.poa_companies = a_interinstitucion.extract_companies(a_interinstitucion.poa);
            a_interinstitucion.poa_companies_id = a_interinstitucion.extract_companies_id(a_interinstitucion.poa);

            for (var cid in a_interinstitucion.poa_companies_id) {
                var lacid = a_interinstitucion.poa_companies_id[cid];
                lacid.logo = 'assets/images/placeholder.jpg';
                var real = await FILE.serverp(`${lacid.tipo}/logo/${lacid.id}`);
                if (real[0]) {
                    if (real[0].url) {
                        lacid.logo = real[0].url;
                    }
                }
            }
        }

        a_interinstitucion.actividad = a_interinstitucion.actividad.data;
        if (a_interinstitucion.actividad) {
            a_interinstitucion.actividad_anos = a_interinstitucion.extract_anos(a_interinstitucion.actividad);
            a_interinstitucion.actividad_valor = [];
            for (var a = 0; a < (a_interinstitucion.actividad_anos.length * 3); a++) {
                var indica = ((a + 1) % 3);
                if (indica === 1) indica = {id: a_interinstitucion.actividad_anos[Math.floor(a / 3)], value: "P"};
                if (indica === 2) indica = {id: a_interinstitucion.actividad_anos[Math.floor(a / 3)], value: "A"};
                if (indica === 0) indica = {id: a_interinstitucion.actividad_anos[Math.floor(a / 3)], value: "D"};
                a_interinstitucion.actividad_valor[a] = indica;
            }
            a_interinstitucion.actividad_companies = a_interinstitucion.extract_companies(a_interinstitucion.actividad);
            a_interinstitucion.actividad_companies_id = a_interinstitucion.extract_companies_id(a_interinstitucion.actividad);

            for (var cid in a_interinstitucion.actividad_companies_id) {
                var lacid = a_interinstitucion.actividad_companies_id[cid];
                lacid.logo = 'assets/images/placeholder.jpg';
                var real = await FILE.serverp(`${lacid.tipo}/logo/${lacid.id}`);
                if (real[0]) {
                    if (real[0].url) {
                        lacid.logo = real[0].url;
                    }
                }
            }
        }


        animation1.stoploading(`#a_interinstitucionTable`);
        a_interinstitucion.refreshAngular();
    };

    a_interinstitucion.detallePeriodo = function (row, PD, tipo_meta) {
        var ul = "<ul>";
        for (var i of PD) {
            ul += `<li>${i.periodo}: ${a_interinstitucion.format(i.valor, tipo_meta)}</li>`;
        }
        ul += "</ul>";
        a_interinstitucion.modal.simpleModal(ul,
            {
                header: {
                    title: `Detalles del Indicador "${row.indicador}" para el año ${PD[0].ano}`
                }
            }
            , true);
    };
    a_interinstitucion.format_calc = function (a, b, tipo_meta, calc) {
        return a_interinstitucion.format(eval(`${calc}`), tipo_meta);
    };
    a_interinstitucion.ano_single = function (anos, ano, tipo_meta) {
        if (anos) {
            var rows = anos.split(';');
            for (var row of rows) {
                if (row) {
                    var data = row.split('=');
                    if (data[0] == ano) {
                        return a_interinstitucion.format(data[1], tipo_meta);
                    }
                }
            }
        }
        return 0;
    };
    a_interinstitucion.format = function (valor, tipo_meta) {
        if (!valor)
            valor = 0;
        switch (tipo_meta) {
            case 1: {
                return valor + '%';
                break;
            }
            case 4: {
                return LAN.money(valor).format(false);
                break;
            }
            case 5: {
                return `${LAN.money(valor).format(true)}`;
                break;
            }
            default : {
                return valor || 0;
            }
        }

    };

    a_interinstitucion.extract_companies = function (list) {
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
    a_interinstitucion.extract_companies_id = function (list) {
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

    a_interinstitucion.extract_anos_periodo = function (list) {
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
    a_interinstitucion.extract_anos = function (list) {
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

    a_interinstitucion.exportXLS = function () {
        var url = $("#a_interinstitucionTable").excelexportjs({
            containerid: "a_interinstitucionTable",
            datatype: 'table',
            worksheetName: `Alineación ODS con Ejes estratégicos.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Alineación ODS con Ejes estratégicos", url);
    };

    a_interinstitucion.exportPDF = function () {


        var fileName = `Alineación ODS con Ejes estratégicos.pdf`;
        var url = $("#a_interinstitucionExport").excelexportjs({
            containerid: "a_interinstitucionExport",
            datatype: 'table',
            worksheetName: `Alineación ODS con Ejes estratégicos`,
            returnUri: true
        });
        DOWNLOAD.excel(fileName, url);
        //
        // $(".resumen_peiTable").printThis({
        //     importCSS: false,                // import parent page css
        //     loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
        //     printDelay: 333,
        // });
    };

    a_interinstitucion.a_interinstitucion_get();

    a_interinstitucion.openmodalField = function (value) {

        a_interinstitucion.tipeExport = value.toString();

        a_interinstitucion.modal.modalView("a_interinstitucion/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Alineación ODS con Ejes estratégicos`,
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
