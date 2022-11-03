app.controller("vw_dashboard_proyectosgrid", function ($scope, $http, $compile) {
    vw_dashboard_proyectosgrid = this;
    vw_dashboard_proyectosgrid.automatic = false;
    vw_dashboard_proyectosgrid.singular = "Indicadores de Proyecto/Producto";
    vw_dashboard_proyectosgrid.plural = "Indicadores de Proyecto/Producto";
    var user = new SESSION().current();
    vw_dashboard_proyectosgrid.headertitle = "Indicadores de Proyecto/Producto Estratégico";
    var paso = true;
    // typeof compania != "undefined" && compania != null ? compania.refrescar_responsable() : 0;
    if (typeof vw_dashboard_proyecto != "undefined" && vw_dashboard_proyecto != null) {
        vw_dashboard_proyectosgrid.fixFilters = [
            {
                field: "pei_id",
                value: user.pei_id,
            },
            {
                field: "departamento",
                value: (vw_dashboard_proyecto.departamento > 0 ? vw_dashboard_proyecto.departamento : undefined)
            }
        ];
    }


    RUNCONTROLLER("vw_dashboard_proyectosgrid", vw_dashboard_proyectosgrid, $scope, $http, $compile);
    RUN_B("vw_dashboard_proyectosgrid", vw_dashboard_proyectosgrid, $scope, $http, $compile);
    vw_dashboard_proyectosgrid.firsttime = false;

    vw_dashboard_proyectosgrid.triggers.table.after.load = function (records) {
        if (paso) {
            paso = false;
            setTimeout(function () {
                $("#vw_dashboard_proyectosgrid .pagination li:eq(0)").hide();
                if (vw_dashboard_proyectosgrid.firsttime) {
                    if (typeof dashboard_indicadores !== "undefined")
                        if (dashboard_indicadores.searchData)
                            dashboard_indicadores.searchData();
                    vw_dashboard_proyectosgrid.firsttime = false;
                }
            }, 2000);
        }
    }
});
