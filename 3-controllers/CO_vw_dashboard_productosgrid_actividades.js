app.controller("vw_dashboard_productosgrid_actividades", function ($scope, $http, $compile) {
    vw_dashboard_productosgrid_actividades = this;
    vw_dashboard_productosgrid_actividades.automatic = false;
    vw_dashboard_productosgrid_actividades.headertitle = "Indicadores de Actividades";
    vw_dashboard_productosgrid_actividades.singular = "Indicadores de Actividades";
    vw_dashboard_productosgrid_actividades.plural = "Indicadores de Actividades";
    var user = new SESSION().current();
    var paso = true;
    // typeof compania != "undefined" && compania != null ? compania.refrescar_responsable() : 0;
    if (typeof dashboard_indicadores != "undefined" && dashboard_indicadores != null) {
        vw_dashboard_productosgrid_actividades.fixFilters = [{
            field: "poa",
            value: user.poa_id,
        }, {
            field: "departamento",
            value: (dashboard_indicadores.departamento === '[NULL]' ? -50 : dashboard_indicadores.departamento)
        }];
    } else if (typeof dashboard_departamento_especifico != "undefined" && dashboard_departamento_especifico != null && user.departamento != 0) {
        vw_dashboard_productosgrid_actividades.fixFilters = [{
            field: "poa",
            value: user.poa_id,
        }, {
            field: "departamento",
            value: user.departamento
        }];
    }


    RUNCONTROLLER("vw_dashboard_productosgrid_actividades", vw_dashboard_productosgrid_actividades, $scope, $http, $compile);
    RUN_B("vw_dashboard_productosgrid_actividades", vw_dashboard_productosgrid_actividades, $scope, $http, $compile);

    vw_dashboard_productosgrid_actividades.triggers.table.after.load = async function (records) {
        if (paso) {
            paso = false;
            setTimeout(function () {
                $("#vw_dashboard_productosgrid_actividades .pagination li:eq(0)").hide();
            }, 2000);

        }
        for (const d of vw_dashboard_productosgrid_actividades.records.data) {
            d.cumplidor = await aacontroldemandofalso.cumplimiento(
                "vw_report_indicadores_actividad",
                baseController.session,
                "indicador_actividad",
                d.id);
        }
        vw_dashboard_productosgrid_actividades.refreshAngular();
    }
});
