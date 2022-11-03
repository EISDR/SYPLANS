app.controller("vw_dashboard_productosgrid", function ($scope, $http, $compile) {
    vw_dashboard_productosgrid = this;
    vw_dashboard_productosgrid.automatic = false;
    vw_dashboard_productosgrid.singular = "Indicadores de Proyecto/Producto";
    vw_dashboard_productosgrid.plural = "Indicadores de Proyecto/Producto";
    var user = new SESSION().current();
    if (user.tipo_institucion == 1) {
        vw_dashboard_productosgrid.headertitle = "Indicadores de Proyecto/Producto";
    } else if (user.tipo_institucion == 2) {
        vw_dashboard_productosgrid.headertitle = "Indicadores de Proyecto/Plan de Acción";
    }
    var paso = true;
    // typeof compania != "undefined" && compania != null ? compania.refrescar_responsable() : 0;
    if (typeof dashboard != "undefined" && dashboard != null) {
        vw_dashboard_productosgrid.fixFilters = [{
            field: "poa",
            value: user.poa_id,
        }, {
            field: "departamento",
            value: (dashboard.departamento === '[NULL]' ? -50 : dashboard.departamento)
        }];
    } else if (typeof dashboard_indicadores != "undefined" && dashboard_indicadores != null) {
        vw_dashboard_productosgrid.fixFilters = [{
            field: "poa",
            value: user.poa_id,
        }, {
            field: "departamento",
            value: (dashboard_indicadores.departamento === '[NULL]' ? -50 : dashboard_indicadores.departamento)
        }];
    } else if (typeof dashboard_departamento_especifico != "undefined" && dashboard_departamento_especifico != null) {
        vw_dashboard_productosgrid.fixFilters = [{
            field: "poa",
            value: user.poa_id,
        }, {
            field: "departamento",
            value: user.departamento
        }];
    }


    RUNCONTROLLER("vw_dashboard_productosgrid", vw_dashboard_productosgrid, $scope, $http, $compile);
    RUN_B("vw_dashboard_productosgrid", vw_dashboard_productosgrid, $scope, $http, $compile);
    vw_dashboard_productosgrid.firsttime = false;

    vw_dashboard_productosgrid.triggers.table.after.load = async function (records) {
        if (paso) {
            paso = false;
            setTimeout(function () {
                $("#vw_dashboard_productosgrid .pagination li:eq(0)").hide();
                if (vw_dashboard_productosgrid.firsttime) {
                    if (typeof dashboard_indicadores !== "undefined")
                        if (dashboard_indicadores.searchData)
                            dashboard_indicadores.searchData();
                    vw_dashboard_productosgrid.firsttime = false;
                }
            }, 2000);
        }
        for (const d of vw_dashboard_productosgrid.records.data) {
            d.cumplidor = await aacontroldemandofalso.cumplimiento(
                "vw_report_indicadores_producto",
                baseController.session,
                "indicador_producto",
                d.id);
        }
        vw_dashboard_productosgrid.refreshAngular();
    }
});
