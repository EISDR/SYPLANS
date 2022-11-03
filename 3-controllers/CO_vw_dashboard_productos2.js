app.controller("vw_dashboard_productos2", function ($scope, $http, $compile) {
    vw_dashboard_productos2 = this;
    vw_dashboard_productos2.session = new SESSION().current();
    vw_dashboard_productos2.singular = "Producto";
    vw_dashboard_productos2.plural = "Productos";
    vw_dashboard_productos2.destroyForm = false;
    var paso = true;
    RUNCONTROLLER("vw_dashboard_productos2", vw_dashboard_productos2, $scope, $http, $compile);
    RUN_B("vw_dashboard_productos2", vw_dashboard_productos2, $scope, $http, $compile);
    if (vw_dashboard_productos2.session.tipo_institucion == 1){
        vw_dashboard_productos2.headertitle = 'Proyecto/Producto';
    }else{
        vw_dashboard_productos2.headertitle = "Proyecto/Plan de Acción";
    }
    vw_dashboard_productos2.fixFilters = [
        {
        field: 'poa',
        value:  -1
        }
    ];
    // vw_dashboard_productos2.triggers.table.after.load = function (records) {
    //     if (paso){
    //         $('.breadcrumb-line ul.breadcrumb.visible-lg.ng-scope').html('<i class="icon-graduation2 position-left"></i> <strong style="font-size: large">Productos</strong>');
    //         paso = false;
    //     }
    // }
});