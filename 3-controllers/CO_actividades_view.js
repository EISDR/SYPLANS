app.controller("actividades_view", function ($scope, $http, $compile) {
    actividades_view = this;
    var session = new SESSION().current();
    RUNCONTROLLER("actividades_view", actividades_view, $scope, $http, $compile);
    if (session.poa_id) {
        actividades_view.headertitle = MESSAGE.i('planificacion.titleActividades') + " / " + session.periodo_pei_msj + " / " + session.periodo_poa_msj;
    } else if (actividades_view.session.pei_id) {
        actividades_view.headertitle = MESSAGE.i('planificacion.titleActividades') + " / " + session.periodo_pei_msj;
    } else {
        actividades_view.headertitle = MESSAGE.i('planificacion.titleActividades') + " / PEI ";
    }
});