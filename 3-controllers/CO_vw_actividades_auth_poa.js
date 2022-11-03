app.controller("vw_actividades_auth_poa", function ($scope, $http, $compile) {
    vw_actividades_auth_poa = this;
    vw_actividades_auth_poa.headertitle = "Actividades";
    vw_actividades_auth_poa.destroyForm = false;
    vw_actividades_auth_poa.fixFilters = [
        {
            "field": "producto",
            "value": -1
        }
    ];
    RUNCONTROLLER("vw_actividades_auth_poa", vw_actividades_auth_poa, $scope, $http, $compile);
    RUN_B("vw_actividades_auth_poa", vw_actividades_auth_poa, $scope, $http, $compile);
});