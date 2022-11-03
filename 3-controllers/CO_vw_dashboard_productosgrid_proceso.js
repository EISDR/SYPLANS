app.controller("vw_dashboard_productosgrid_proceso", function ($scope, $http, $compile) {
    vw_dashboard_productosgrid_proceso = this;
    vw_dashboard_productosgrid_proceso.automatic = false;
    vw_dashboard_productosgrid_proceso.headertitle = "Indicadores de Proceso";
    vw_dashboard_productosgrid_proceso.destroyForm = false;
    var user = new SESSION().current();
    var paso = true;
    // typeof compania != "undefined" && compania != null ? compania.refrescar_responsable() : 0;
    if (typeof dashboard_proceso != "undefined" && dashboard_proceso != null) {
        vw_dashboard_productosgrid_proceso.fixFilters = [{
            field: dashboard_proceso.institucion === '[NULL]' || user.institucion_id === null ? "compania" : "entidad",
            value: dashboard_proceso.institucion === '[NULL]' || user.institucion_id === null ? user.compania_id : dashboard_proceso.institucion,
        }];
    } else if (typeof dashboard_departamento_especifico != "undefined" && dashboard_departamento_especifico != null) {
        vw_dashboard_productosgrid_proceso.fixFilters = [
            {
                field: dashboard_proceso.institucion === '[NULL]' || user.institucion_id === null ? "compania" : "entidad",
                value: dashboard_proceso.institucion === '[NULL]' || user.institucion_id === null ? user.compania_id : dashboard_proceso.institucion,
            }];
    } else {
        vw_dashboard_productosgrid_proceso.fixFilters = [{
            field: dashboard_proceso.institucion === '[NULL]' || user.institucion_id === null ? "compania" : "entidad",
            value: dashboard_proceso.institucion === '[NULL]' || user.institucion_id === null ? user.compania_id : dashboard_proceso.institucion,
        }];
    }
    RUNCONTROLLER("vw_dashboard_productosgrid_proceso", vw_dashboard_productosgrid_proceso, $scope, $http, $compile);
    RUN_B("vw_dashboard_productosgrid_proceso", vw_dashboard_productosgrid_proceso, $scope, $http, $compile);

    vw_dashboard_productosgrid_proceso.triggers.table.after.load = function (records) {
        if (paso) {
            paso = false;
        }
        setTimeout(function () {
            $("#vw_dashboard_productosgrid_proceso .pagination li:eq(0)").hide();
        }, 2000);
    }
    // setTimeout(function () {
    //     vw_dashboard_productosgrid_proceso.refresh();
    // }, 1000);

});
