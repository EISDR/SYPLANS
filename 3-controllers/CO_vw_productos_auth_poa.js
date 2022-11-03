app.controller("vw_productos_auth_poa", function ($scope, $http, $compile) {
    vw_productos_auth_poa = this;
    vw_productos_auth_poa.session = new SESSION().current();
    //vw_productos_auth_poa.fixFilters = [];
    //vw_productos_auth_poa.singular = "singular";
    //vw_productos_auth_poa.plural = "plural";
    vw_productos_auth_poa.destroyForm = false;
    if (vw_productos_auth_poa.session.tipo_institucion == 1) {
        vw_productos_auth_poa.headertitle = "Proyecto/Producto";
    }else{
        vw_productos_auth_poa.headertitle = "Proyecto/Plan de Acción";
    }
    vw_productos_auth_poa.fixFilters = [
        {
            "field": "producto",
            "value": -1
        }
    ];
    var animation = new ANIMATION();
    RUNCONTROLLER("vw_productos_auth_poa", vw_productos_auth_poa, $scope, $http, $compile);
    RUN_B("vw_productos_auth_poa", vw_productos_auth_poa, $scope, $http, $compile);

    vw_productos_auth_poa.triggers.table.after.load = function (record){
        if (vw_productos_auth_poa.records.data.length > 0){
            $('#vw_productos_auth_poaTableBody .dragon-rows:eq(0)').addClass('alpha-secundary');
            animation.stoploading(`#panelEstatus`);
            animation.stoploading("#panelDepartamento");
            departamento_poa.refreshAngular();
            // console.log('antes de un segundo');
            // setTimeout(function(){
            //     console.log('despues de un segundo');
            //     $('#vw_productos_auth_poaTableBody .dragon-rows:eq(0)').addClass('alpha-secundary');
            // },500);
        }
        departamento_poa.poa_activo();
    };
});