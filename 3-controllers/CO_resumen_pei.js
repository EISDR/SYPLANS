app.controller(
    "resumen_pei", function ($scope, $http, $compile) {
        resumen_pei = this;
        resumen_pei.destroyForm = false;
        var user = new SESSION().current();
        RUNCONTROLLER("resumen_pei", resumen_pei, $scope, $http, $compile);
        resumen_pei.colors = COLOR.secundary;
        resumen_pei.resumen_pei_list = [];
        resumen_pei.tipeExport = '';
        var animation1 = new ANIMATION();
        resumen_pei.session = user;


        resumen_pei.resumen_pei_get = async function () {
            animation1.loading(`#tabs_resumen`, "", ``, '120');
            resumen_pei.resumen_pei_list = await BASEAPI.listp('resumen_pei', {
                limit: 0,
                distinct: true,
                columns: ["no_orden", "eje_estrategico", "objetivo_estrategico", "estrategia", "perspectiva", "resultado", "indicador"],
                orderby: "$ no_orden",
                order: "asc",
                where: [{
                    field: "pei",
                    value: user.pei_id
                }]
            });
            resumen_pei.perspectiva_list = await BASEAPI.listp('perspectiva', {
                limit: 0
            });
            resumen_pei.resumen_pei_list = resumen_pei.resumen_pei_list.data;
            if (resumen_pei.resumen_pei_list)
                for (var i of resumen_pei.resumen_pei_list) {
                    if (i.perspectiva != " ") {
                        i.perspectiva = (resumen_pei.perspectiva_list.data.filter(r1_data => {
                            return (i.perspectiva == r1_data.id);
                        })[0] || {}).nombre;
                    }
                }
            animation1.stoploading(`#tabs_resumen`);
            resumen_pei.refreshAngular();
        };

        resumen_pei.exportXLS = function () {
            var url = $("#resumen_peiTable").excelexportjs({
                containerid: "resumen_peiTable",
                datatype: 'table',
                worksheetName: `Planificación Estrategica (PEI).xls`,
                returnUri: true
            });
            DOWNLOAD.excel("Planificación Estrategica (PEI)", url);
        };

        resumen_pei.exportPDF = function () {


            var fileName = `Planificación Estrategica (PEI).xls`;
            var url = $("#ResumenPEIExport").excelexportjs({
                containerid: "ResumenPEIExport",
                datatype: 'table',
                worksheetName: `Planificación Estrategica (PEI)`,
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

        resumen_pei.resumen_pei_get();

        resumen_pei.openmodalField = function (value) {

            resumen_pei.tipeExport = value.toString();

            resumen_pei.modal.modalView("resumen_pei/export", {

                width: 'modal-full',
                header: {
                    title: `Vista Previa Planificación Estrategica (PEI)`,
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
