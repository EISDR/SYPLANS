app.controller("vw_eje_estrategico_ods", function ($scope, $http, $compile) {
    vw_eje_estrategico_ods = this;
    vw_eje_estrategico_ods.destroyForm = false;
    var user = new SESSION().current();
    //vw_eje_estrategico_ods.fixFilters = [];
    //vw_eje_estrategico_ods.singular = "singular";
    //vw_eje_estrategico_ods.plural = "plural";
    //vw_eje_estrategico_ods.headertitle = "Hola Title";
    //vw_eje_estrategico_ods.destroyForm = false;
    //vw_eje_estrategico_ods.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_eje_estrategico_ods", vw_eje_estrategico_ods, $scope, $http, $compile);
    RUN_B("vw_eje_estrategico_ods", vw_eje_estrategico_ods, $scope, $http, $compile);
    vw_eje_estrategico_ods.colors = COLOR.secundary;
    vw_eje_estrategico_ods.resumen_pei_list = [];
    vw_eje_estrategico_ods.tipeExport = '';
    var animation1 = new ANIMATION();


    vw_eje_estrategico_ods.rowspanme = function (field, value) {
        var r = 0;
        r = vw_eje_estrategico_ods.vw_eje_estrategico_ods_list.filter(d => {
            if (value != ' ')
                return eval(`d.${field}==value`)
        }).length;
        return r ? r : 1;
    };

    vw_eje_estrategico_ods.seeme = function (field, value, key) {
        if (vw_eje_estrategico_ods.vw_eje_estrategico_ods_list[key - 1])
            if (value != ' ')
                return vw_eje_estrategico_ods.vw_eje_estrategico_ods_list[key - 1][field] != value;
        return true;
    };


    vw_eje_estrategico_ods.afterInstitucion = function () {
        vw_eje_estrategico_ods.vw_eje_estrategico_ods_get();
    };

    vw_eje_estrategico_ods.vw_eje_estrategico_ods_get = async function () {
        animation1.loading(`.subcontent`, "", ``, '30');
        vw_eje_estrategico_ods.vw_eje_estrategico_ods_list = await BASEAPI.listp('vw_eje_estrategico_ods', {
            limit: 0,
            orderby: "$ compania, no_orden, oeid, esid, odsedt, metaedt",
            order: "asc",
            where: vw_eje_estrategico_ods.institucion !== '[NULL]' ?
                [{
                    field: "compania",
                    value: vw_eje_estrategico_ods.institucion
                }]
                :
                [{
                    field: "compania_base",
                    value: vw_eje_estrategico_ods.companiasel
                }]
        });
        vw_eje_estrategico_ods.vw_eje_estrategico_ods_list = vw_eje_estrategico_ods.vw_eje_estrategico_ods_list.data;

        vw_eje_estrategico_ods.companiaeje = [];
        vw_eje_estrategico_ods.companiaesje = [];
        if (vw_eje_estrategico_ods.vw_eje_estrategico_ods_list) {
            for (var item of vw_eje_estrategico_ods.vw_eje_estrategico_ods_list) {
                if (!vw_eje_estrategico_ods.companiaesje[`${item.compania_nombre}x${item.eje_estrategico}`]) {
                    vw_eje_estrategico_ods.companiaeje.push({
                        compania_nombre: item.compania_nombre,
                        eje_estrategico: item.eje_estrategico,
                        records: vw_eje_estrategico_ods.vw_eje_estrategico_ods_list.filter(e => {
                            return (e.compania_nombre === item.compania_nombre && e.eje_estrategico === item.eje_estrategico)
                        })
                    });
                    vw_eje_estrategico_ods.companiaesje[`${item.compania_nombre}x${item.eje_estrategico}`] = true;
                }

            }
        }

        animation1.stoploading(`.subcontent`);
        vw_eje_estrategico_ods.refreshAngular();
    };

    vw_eje_estrategico_ods.exportXLS = function () {
        var url = $("#vw_eje_estrategico_odsTable").excelexportjs({
            containerid: "vw_eje_estrategico_odsTable",
            datatype: 'table',
            worksheetName: `Alineación ODS con Ejes estratégicos.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Alineación ODS con Ejes estratégicos", url);
    };

    vw_eje_estrategico_ods.exportPDF = function () {

        $("#vw_eje_estrategico_odsExport").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };

    vw_eje_estrategico_ods.openmodalField = function (value) {

        vw_eje_estrategico_ods.tipeExport = value.toString();

        vw_eje_estrategico_ods.modal.modalView("vw_eje_estrategico_ods/export", {

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
