app.controller("vw_alineacion_lineaestrategica", function ($scope, $http, $compile) {
    vw_alineacion_lineaestrategica = this;
    vw_alineacion_lineaestrategica.destroyForm = false;
    var user = new SESSION().current();
    //vw_alineacion_lineaestrategica.fixFilters = [];
    //vw_alineacion_lineaestrategica.singular = "singular";
    //vw_alineacion_lineaestrategica.plural = "plural";
    //vw_alineacion_lineaestrategica.headertitle = "Hola Title";
    //vw_alineacion_lineaestrategica.destroyForm = false;
    //vw_alineacion_lineaestrategica.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_alineacion_lineaestrategica", vw_alineacion_lineaestrategica, $scope, $http, $compile);
    RUN_B("vw_alineacion_lineaestrategica", vw_alineacion_lineaestrategica, $scope, $http, $compile);
    vw_alineacion_lineaestrategica.colors = COLOR.secundary;
    vw_alineacion_lineaestrategica.resumen_pei_list = [];
    vw_alineacion_lineaestrategica.tipeExport = '';
    var animation1 = new ANIMATION();

    vw_alineacion_lineaestrategica.rowspanme = function (field, value) {
        var r = 0;
        r = vw_alineacion_lineaestrategica.vw_alineacion_lineaestrategica_list.filter(d => {
            if (value != ' ')
                return eval(`d.${field}==value`)
        }).length;
        return r ? r : 1;
    };

    vw_alineacion_lineaestrategica.seeme = function (field, value, key) {
        if (vw_alineacion_lineaestrategica.vw_alineacion_lineaestrategica_list[key - 1])
            if (value != ' ')
                return vw_alineacion_lineaestrategica.vw_alineacion_lineaestrategica_list[key - 1][field] != value;
        return true;
    };


    vw_alineacion_lineaestrategica.afterInstitucion = function () {
        vw_alineacion_lineaestrategica.vw_alineacion_lineaestrategica_get();
    };

    vw_alineacion_lineaestrategica.vw_alineacion_lineaestrategica_get = async function () {
        animation1.loading(`.subcontent`, "", ``, '30');
        vw_alineacion_lineaestrategica.ODSDATA = await BASEAPI.listp("ods", {
            limit: 0,
            page: 1
        });
        vw_alineacion_lineaestrategica.ODSDATA = vw_alineacion_lineaestrategica.ODSDATA.data;
        vw_alineacion_lineaestrategica.vw_alineacion_lineaestrategica_list = await BASEAPI.listp('vw_alineacion_lineaestrategica', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: vw_alineacion_lineaestrategica.institucion !== '[NULL]' ?
                [{
                    field: "compania",
                    value: vw_alineacion_lineaestrategica.institucion
                }]
                :
                [{
                    field: "compania_base",
                    value: vw_alineacion_lineaestrategica.companiasel
                }]
        });
        vw_alineacion_lineaestrategica.vw_alineacion_lineaestrategica_list = vw_alineacion_lineaestrategica.vw_alineacion_lineaestrategica_list.data;

        vw_alineacion_lineaestrategica.companiaeje = [];
        vw_alineacion_lineaestrategica.companiaesje = [];

        for (var item of vw_alineacion_lineaestrategica.vw_alineacion_lineaestrategica_list) {
            if (!vw_alineacion_lineaestrategica.companiaesje[`${item.compania_nombre}x${item.eje_estrategico}`]) {
                item.ods = item.ods.split('=>').map(d => {
                    if (d) return {id: d.split(';;;;;')[0], nombre: d.split(';;;;;')[1]}; else return {};
                });
                for (const ods of item.ods) {
                    let existe = vw_alineacion_lineaestrategica.ODSDATA.filter(d => {
                        return ods.id == d.id
                    })[0];
                    if (!vw_alineacion_lineaestrategica.odsimages[existe.id])
                        if (existe) {
                            let files = await FILE.serverp(`ods/odsimage/${existe.id}`, undefined, "notLoad");
                            let image = files.filter(e => {
                                return e.original.indexOf(".png") !== -1 || e.original.indexOf(".jpg") !== -1
                            })[0];
                            if (image)
                                vw_alineacion_lineaestrategica.odsimages[existe.id] = encodelast(image.url);

                        }
                    ods.image = vw_alineacion_lineaestrategica.odsimages[existe.id];
                }
                vw_alineacion_lineaestrategica.companiaeje.push(item);
            }

        }

        animation1.stoploading(`.subcontent`);
        vw_alineacion_lineaestrategica.refreshAngular();
    };
    vw_alineacion_lineaestrategica.odsimages = {};

    vw_alineacion_lineaestrategica.exportXLS = function () {
        var url = $("#vw_alineacion_lineaestrategicaTable").excelexportjs({
            containerid: "vw_alineacion_lineaestrategicaTable",
            datatype: 'table',
            worksheetName: `Alineación con las Líneas Estratégicas.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Alineación con las Líneas Estratégicas", url);
    };

    vw_alineacion_lineaestrategica.exportPDF = function () {

        $("#vw_alineacion_lineaestrategicaExport").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    vw_alineacion_lineaestrategica.money = (val) => {
        return LAN.money(val).format(true);
    };
    vw_alineacion_lineaestrategica.openmodalField = function (value) {

        vw_alineacion_lineaestrategica.tipeExport = value.toString();

        vw_alineacion_lineaestrategica.modal.modalView("vw_alineacion_lineaestrategica/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Alineación con las Líneas Estratégicas`,
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
