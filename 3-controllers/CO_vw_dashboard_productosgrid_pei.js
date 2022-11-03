app.controller("vw_dashboard_productosgrid_pei", function ($scope, $http, $compile) {
    vw_dashboard_productosgrid_pei = this;
    vw_dashboard_productosgrid_pei.automatic = false;
    vw_dashboard_productosgrid_pei.headertitle = "Indicadores del Plan Estratégico";
    var user = new SESSION().current();
    var paso = true;
    // typeof compania != "undefined" && compania != null ? compania.refrescar_responsable() : 0;
    if (typeof dashboard_indicadores != "undefined" && dashboard_indicadores != null) {
        vw_dashboard_productosgrid_pei.fixFilters = [{
            field: dashboard_indicadores.institucion === '[NULL]' || user.institucion_id === null ? "compania" : "entidad",
            value: dashboard_indicadores.institucion === '[NULL]' || user.institucion_id === null ? user.compania_id : dashboard_indicadores.institucion,
        }];
    } else if (typeof dashboard_departamento_especifico != "undefined" && dashboard_departamento_especifico != null) {
        vw_dashboard_productosgrid_pei.fixFilters = [
            {
                field: dashboard_indicadores.institucion === '[NULL]' || user.institucion_id === null ? "compania" : "entidad",
                value: dashboard_indicadores.institucion === '[NULL]' || user.institucion_id === null ? user.compania_id : dashboard_indicadores.institucion,
            }];
    } else {
        vw_dashboard_productosgrid_pei.fixFilters = [{
            field: dashboard_indicadores.institucion === '[NULL]' || user.institucion_id === null ? "compania" : "entidad",
            value: dashboard_indicadores.institucion === '[NULL]' || user.institucion_id === null ? user.compania_id : dashboard_indicadores.institucion,
        }];
    }


    RUNCONTROLLER("vw_dashboard_productosgrid_pei", vw_dashboard_productosgrid_pei, $scope, $http, $compile);
    RUN_B("vw_dashboard_productosgrid_pei", vw_dashboard_productosgrid_pei, $scope, $http, $compile);

    vw_dashboard_productosgrid_pei.triggers.table.after.load = async function (records) {
        if (paso) {
            paso = false;
        }
        setTimeout(function () {
            $("#vw_dashboard_productosgrid_pei .pagination li:eq(0)").hide();
        }, 2000);
        for (const d of vw_dashboard_productosgrid_pei.records.data) {
            d.cumplidor = await aacontroldemandofalso.cumplimiento(
                "vw_report_indicadores_pei",
                baseController.session,
                "indicador_pei",
                d.id);
        }
        vw_dashboard_productosgrid_pei.refreshAngular();
        vw_dashboard_productosgrid_pei.refreshAngular();
    }
    // setTimeout(function () {
    //     vw_dashboard_productosgrid_pei.refresh();
    // }, 1000);

});
