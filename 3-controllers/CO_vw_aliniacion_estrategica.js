app.controller("vw_aliniacion_estrategica", function ($scope, $http, $compile) {
    vw_aliniacion_estrategica = this;
    vw_aliniacion_estrategica.destroyForm = false;
    var user = new SESSION().current();
    vw_aliniacion_estrategica.user = user;
    //vw_aliniacion_estrategica.fixFilters = [];
    //vw_aliniacion_estrategica.singular = "singular";
    //vw_aliniacion_estrategica.plural = "plural";
    //vw_aliniacion_estrategica.headertitle = "Hola Title";
    //vw_aliniacion_estrategica.destroyForm = false;
    //vw_aliniacion_estrategica.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_aliniacion_estrategica", vw_aliniacion_estrategica, $scope, $http, $compile);
    RUN_B("vw_aliniacion_estrategica", vw_aliniacion_estrategica, $scope, $http, $compile);
    vw_aliniacion_estrategica.colors = COLOR.secundary;
    vw_aliniacion_estrategica.resumen_pei_list = [];
    vw_aliniacion_estrategica.tipeExport = '';
    var animation1 = new ANIMATION();

    vw_aliniacion_estrategica.rowspanme = function (field, value) {
        var r = 0;
        r = vw_aliniacion_estrategica.vw_aliniacion_estrategica_list.filter(d => {
            if (value != ' ')
                return eval(`d.${field}==value`)
        }).length;
        return r ? r : 1;
    };
    vw_aliniacion_estrategica.seeme = function (field, value, key) {
        if (vw_aliniacion_estrategica.vw_aliniacion_estrategica_list[key - 1])
            if (value != ' ')
                return vw_aliniacion_estrategica.vw_aliniacion_estrategica_list[key - 1][field] != value;
        return true;
    };

    vw_aliniacion_estrategica.afterInstitucion = function () {
        vw_aliniacion_estrategica.vw_aliniacion_estrategica_get();
    };
    vw_aliniacion_estrategica.vw_aliniacion_estrategica_get = async function () {
        animation1.loading(`.subcontent`, "", ``, '30');

        var aymywhere = [{
            field: "compania_base",
            value: user.compania_id
        }];
        if (vw_aliniacion_estrategica.institucion !== "[NULL]") {
            aymywhere.push({
                field: "compania",
                value: vw_aliniacion_estrategica.institucion
            })
        }

        vw_aliniacion_estrategica.ends = await BASEAPI.listp('vw_aliniacion_estrategica', {
            limit: 0,
            distinct: true,
            columns: ["r1", 'end'],
            orderby: "$ r1",
            order: "asc",
            where: aymywhere
        });
        vw_aliniacion_estrategica.ends = vw_aliniacion_estrategica.ends.data;

        vw_aliniacion_estrategica.vw_aliniacion_estrategica_list = await BASEAPI.listp('vw_aliniacion_estrategica', {
            limit: 0,
            orderby: "$ r1,r2,r3,r4,r51,r52,r5,r6",
            order: "asc",
            where: aymywhere
        });
        vw_aliniacion_estrategica.vw_aliniacion_estrategica_list = vw_aliniacion_estrategica.vw_aliniacion_estrategica_list.data;
        animation1.stoploading(`.subcontent`);
        vw_aliniacion_estrategica.refreshAngular();
    };

    vw_aliniacion_estrategica.exportXLS = function () {
        var url = $("#vw_aliniacion_estrategicaTable").excelexportjs({
            containerid: "vw_aliniacion_estrategicaTable",
            datatype: 'table',
            worksheetName: `Alineación ODS con Ejes estratégicos.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Alineación ODS con Ejes estratégicos", url);
    };

    vw_aliniacion_estrategica.exportPDF = function () {
        $("#vw_aliniacion_estrategicaTable").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };

    vw_aliniacion_estrategica.openmodalField = function (value) {

        vw_aliniacion_estrategica.tipeExport = value.toString();

        vw_aliniacion_estrategica.modal.modalView("vw_aliniacion_estrategica/export", {

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
