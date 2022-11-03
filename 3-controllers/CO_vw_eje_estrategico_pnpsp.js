app.controller("vw_eje_estrategico_pnpsp", function ($scope, $http, $compile) {
    vw_eje_estrategico_pnpsp = this;
    vw_eje_estrategico_pnpsp.destroyForm = false;
    var user = new SESSION().current();
    //vw_eje_estrategico_pnpsp.fixFilters = [];
    //vw_eje_estrategico_pnpsp.singular = "singular";
    //vw_eje_estrategico_pnpsp.plural = "plural";
    //vw_eje_estrategico_pnpsp.headertitle = "Hola Title";
    //vw_eje_estrategico_pnpsp.destroyForm = false;
    //vw_eje_estrategico_pnpsp.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_eje_estrategico_pnpsp", vw_eje_estrategico_pnpsp, $scope, $http, $compile);
    RUN_B("vw_eje_estrategico_pnpsp", vw_eje_estrategico_pnpsp, $scope, $http, $compile);
    vw_eje_estrategico_pnpsp.colors = COLOR.secundary;
    vw_eje_estrategico_pnpsp.resumen_pei_list = [];
    vw_eje_estrategico_pnpsp.tipeExport = '';
    var animation1 = new ANIMATION();

    vw_eje_estrategico_pnpsp.rowspanme = function (field, value) {
        var r = 0;
        r = vw_eje_estrategico_pnpsp.vw_eje_estrategico_pnpsp_list.filter(d => {
            if (value != ' ')
                return eval(`d.${field}==value`)
        }).length;
        return r ? r : 1;
    };

    vw_eje_estrategico_pnpsp.seeme = function (field, value, key) {
        if (vw_eje_estrategico_pnpsp.vw_eje_estrategico_pnpsp_list[key - 1])
            if (value != ' ')
                return vw_eje_estrategico_pnpsp.vw_eje_estrategico_pnpsp_list[key - 1][field] != value;
        return true;
    };


    vw_eje_estrategico_pnpsp.afterInstitucion = function () {
        vw_eje_estrategico_pnpsp.vw_eje_estrategico_pnpsp_get();
    };

    vw_eje_estrategico_pnpsp.vw_eje_estrategico_pnpsp_get = async function () {
        animation1.loading(`.subcontent`, "", ``, '30');
        vw_eje_estrategico_pnpsp.vw_eje_estrategico_pnpsp_list = await BASEAPI.listp('vw_eje_estrategico_pnpsp', {
            limit: 0,
            orderby: "$ compania, no_orden, oeid, esid, odsedt, metaedt",
            order: "asc",
            where: vw_eje_estrategico_pnpsp.institucion !== '[NULL]' ?
                [{
                    field: "compania",
                    value: vw_eje_estrategico_pnpsp.institucion
                }]
                :
                [{
                    field: "compania_base",
                    value: vw_eje_estrategico_pnpsp.companiasel
                }]
        });
        vw_eje_estrategico_pnpsp.vw_eje_estrategico_pnpsp_list = vw_eje_estrategico_pnpsp.vw_eje_estrategico_pnpsp_list.data;

        vw_eje_estrategico_pnpsp.companiaeje = [];
        vw_eje_estrategico_pnpsp.companiaesje = [];

        for (var item of vw_eje_estrategico_pnpsp.vw_eje_estrategico_pnpsp_list) {
            if (!vw_eje_estrategico_pnpsp.companiaesje[`${item.compania_nombre}x${item.eje_estrategico}`]) {
                vw_eje_estrategico_pnpsp.companiaeje.push({
                    compania_nombre: item.compania_nombre,
                    eje_estrategico: item.eje_estrategico,
                    records: vw_eje_estrategico_pnpsp.vw_eje_estrategico_pnpsp_list.filter(e => {
                        return (e.compania_nombre === item.compania_nombre && e.eje_estrategico === item.eje_estrategico)
                    })
                });
                vw_eje_estrategico_pnpsp.companiaesje[`${item.compania_nombre}x${item.eje_estrategico}`] = true;
            }

        }

        animation1.stoploading(`.subcontent`);
        vw_eje_estrategico_pnpsp.refreshAngular();
    };

    vw_eje_estrategico_pnpsp.exportXLS = function () {
        var url = $("#vw_eje_estrategico_pnpspTable").excelexportjs({
            containerid: "vw_eje_estrategico_pnpspTable",
            datatype: 'table',
            worksheetName: `Alineación PNPSP con Ejes estratégicos.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Alineación PNPSP con Ejes estratégicos", url);
    };

    vw_eje_estrategico_pnpsp.exportPDF = function () {

        $("#vw_eje_estrategico_pnpspExport").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };

    vw_eje_estrategico_pnpsp.openmodalField = function (value) {

        vw_eje_estrategico_pnpsp.tipeExport = value.toString();

        vw_eje_estrategico_pnpsp.modal.modalView("vw_eje_estrategico_pnpsp/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Alineación PNPSP con Ejes estratégicos`,
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
