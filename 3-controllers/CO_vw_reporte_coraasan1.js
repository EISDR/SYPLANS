app.controller("vw_reporte_coraasan1", function ($scope, $http, $compile) {
    vw_reporte_coraasan1 = this;
    vw_reporte_coraasan1.session = new SESSION().current();
    vw_reporte_coraasan1.animation = new ANIMATION();
    vw_reporte_coraasan1.loaded = false;
    vw_reporte_coraasan1.destroyForm = false;
    //vw_reporte_coraasan1.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_reporte_coraasan1", vw_reporte_coraasan1, $scope, $http, $compile);
    RUN_B("vw_reporte_coraasan1", vw_reporte_coraasan1, $scope, $http, $compile);
    vw_reporte_coraasan1.triggers.table.after.control = function (data) {
        if (data === 'filter_departamento') {
            if (!vw_reporte_coraasan1.loaded) {
                vw_reporte_coraasan1.filter_departamento = "0";
                if (vw_reporte_coraasan1.session.profile != 4 && vw_reporte_coraasan1.session.profile != 5) {
                    vw_reporte_coraasan1.form.options.filter_departamento.disabled = true;
                    vw_reporte_coraasan1.filter_departamento = vw_reporte_coraasan1.session.departamento + "";
                }

                vw_reporte_coraasan1.form.loadDropDown('filter_departamento');
                vw_reporte_coraasan1.loaded = true;
            }
        }
    };
    vw_reporte_coraasan1.report = [];
    vw_reporte_coraasan1.refreshAll = async () => {
        vw_reporte_coraasan1.loading = true;
        SWEETALERT.loading({message: "Calculando Resultados"});
        let filters = [{
            field: "poa_id",
            value: vw_reporte_coraasan1.session.poa_id
        }];
        if (vw_reporte_coraasan1.filter_departamento !== "0") {
            filters.push({
                field: "id",
                value: vw_reporte_coraasan1.filter_departamento
            });
        }
        vw_reporte_coraasan1.report = await vw_reporte_coraasan1.listp("vw_reporte_coraasan1", filters);
        vw_reporte_coraasan1.list = [...new Set(vw_reporte_coraasan1.report.map(d => d.departamento))];
        vw_reporte_coraasan1.list = vw_reporte_coraasan1.list.map(d => {
            return {departamento: d, registros: vw_reporte_coraasan1.byDepartamento(d)}
        });
        vw_reporte_coraasan1.loading = false;
        vw_reporte_coraasan1.refreshAngular();
        SWEETALERT.stop();
    };
    vw_reporte_coraasan1.byDepartamento = (departamento) => {
        if (vw_reporte_coraasan1.report) {
            return vw_reporte_coraasan1.report.filter(d => d.departamento == departamento);
        }
        return [];
    };
    vw_reporte_coraasan1.openmodalField = function (value) {

        vw_reporte_coraasan1.tipeExport = value.toString();


        vw_reporte_coraasan1.modal.modalView("vw_reporte_coraasan1/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Reporte de Eficiencia por Usuario`,
                icon: "ICON.classes.printer2"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    };
    vw_reporte_coraasan1.exportXLS = function () {
        var url = $("#desempenoTable").excelexportjs({
            containerid: "desempenoTable",
            datatype: 'table',
            worksheetName: (!vw_reporte_coraasan1.mode ? `Reporte de Productos e Indicadores de Producto` : 'Reporte de Actividades e Indicadores de Actividades'),
            returnUri: true
        });
        DOWNLOAD.excel((!vw_reporte_coraasan1.mode ? `Reporte de Productos e Indicadores de Producto` : 'Reporte de Actividades e Indicadores de Actividades'), url);
    };
    vw_reporte_coraasan1.exportPDF = function () {
        $("#TablePDF").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    vw_reporte_coraasan1.changeMode = () => {
        vw_reporte_coraasan1.mode = !vw_reporte_coraasan1.mode;
        vw_reporte_coraasan1.refreshAll();
    };
    vw_reporte_coraasan1.listp = async (api, where) => {
        let orderfinal = "$ departamento, poa_id, producto, indicador_producto";
        if (vw_reporte_coraasan1.mode)
            orderfinal = "$ departamento, poa_id, producto, actividad, indicador_actividad";
        let data = undefined;
        if (where)
            data = await BASEAPI.listp(api, {
                limit: 0,
                orderby: orderfinal,
                order: "asc",
                where: where
            });
        else
            data = await BASEAPI.listp(api, {
                limit: 0,
                orderby: "id",
                order: "asc",
            });
        return data.data;
    };

});