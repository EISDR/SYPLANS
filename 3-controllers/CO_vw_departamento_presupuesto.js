app.controller("vw_departamento_presupuesto", function ($scope, $http, $compile) {
    vw_departamento_presupuesto = this;
    vw_departamento_presupuesto.destroyForm = false;
    var user = new SESSION().current();
    //vw_departamento_presupuesto.fixFilters = [];
    //vw_departamento_presupuesto.singular = "singular";
    //vw_departamento_presupuesto.plural = "plural";
    //vw_departamento_presupuesto.headertitle = "Hola Title";
    //vw_departamento_presupuesto.destroyForm = false;
    //vw_departamento_presupuesto.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_departamento_presupuesto", vw_departamento_presupuesto, $scope, $http, $compile);
    RUN_B("vw_departamento_presupuesto", vw_departamento_presupuesto, $scope, $http, $compile);
    vw_departamento_presupuesto.colors = COLOR.secundary;
    vw_departamento_presupuesto.resumen_pei_list = [];
    vw_departamento_presupuesto.tipeExport = '';
    var animation1 = new ANIMATION();

    vw_departamento_presupuesto.rowspanme = function (field, value) {
        var r = 0;
        r = vw_departamento_presupuesto.vw_departamento_presupuesto_list.filter(d => {
            if (value != ' ')
                return eval(`d.${field}==value`)
        }).length;
        return r ? r : 1;
    };

    vw_departamento_presupuesto.seeme = function (field, value, key) {
        if (vw_departamento_presupuesto.vw_departamento_presupuesto_list[key - 1])
            if (value != ' ')
                return vw_departamento_presupuesto.vw_departamento_presupuesto_list[key - 1][field] != value;
        return true;
    };


    vw_departamento_presupuesto.afterInstitucion = function () {
        vw_departamento_presupuesto.vw_departamento_presupuesto_get();
    };

    vw_departamento_presupuesto.vw_departamento_presupuesto_get = async function () {
        animation1.loading(`.subcontent`, "", ``, '30');
        vw_departamento_presupuesto.vw_departamento_presupuesto_list = await BASEAPI.listp('vw_departamento_presupuesto', {
            limit: 0,
            orderby: "$ compania, departamento, producto",
            order: "asc",
            where: vw_departamento_presupuesto.institucion !== '[NULL]' ?
                [{
                    field: "compania",
                    value: vw_departamento_presupuesto.institucion
                }]
                :
                [{
                    field: "compania_base",
                    value: vw_departamento_presupuesto.companiasel
                }]
        });
        vw_departamento_presupuesto.vw_departamento_presupuesto_list = vw_departamento_presupuesto.vw_departamento_presupuesto_list.data;

        vw_departamento_presupuesto.companiaeje = [];
        vw_departamento_presupuesto.companiaesje = [];

        for (var item of vw_departamento_presupuesto.vw_departamento_presupuesto_list) {
            if (!vw_departamento_presupuesto.companiaesje[`${item.compania_nombre}x${item.eje_estrategico}`]) {
                vw_departamento_presupuesto.companiaeje.push({
                    compania_nombre: item.compania_nombre,
                    eje_estrategico: item.eje_estrategico,
                    records: vw_departamento_presupuesto.vw_departamento_presupuesto_list.filter(e => {
                        return (e.compania_nombre === item.compania_nombre && e.eje_estrategico === item.eje_estrategico)
                    })
                });
                vw_departamento_presupuesto.companiaesje[`${item.compania_nombre}x${item.eje_estrategico}`] = true;
            }

        }

        animation1.stoploading(`.subcontent`);
        vw_departamento_presupuesto.refreshAngular();
    };

    vw_departamento_presupuesto.exportXLS = function () {
        var url = $("#vw_departamento_presupuestoTable").excelexportjs({
            containerid: "vw_departamento_presupuestoTable",
            datatype: 'table',
            worksheetName: `Presupuestos por Departamentos.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Presupuestos por Departamentos", url);
    };

    vw_departamento_presupuesto.exportPDF = function () {

        $("#vw_departamento_presupuestoExport").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    vw_departamento_presupuesto.money = (val) => {
        return LAN.money(val).format(true);
    };
    vw_departamento_presupuesto.openmodalField = function (value) {

        vw_departamento_presupuesto.tipeExport = value.toString();

        vw_departamento_presupuesto.modal.modalView("vw_departamento_presupuesto/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Presupuestos por Departamentos`,
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
