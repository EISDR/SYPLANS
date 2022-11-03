app.controller("asignaciones", function ($scope, $http, $compile) {
    asignaciones = this;
    asignaciones.destroyForm = false;
    var session = new SESSION().current();
    var carac2 = undefined;
    if (session.groups.length > 0)
        carac2 = session.groups[0]? session.groups[0].caracteristica: '';
    RUNCONTROLLER("asignaciones", asignaciones, $scope, $http, $compile);
    RUN_B("asignaciones", asignaciones, $scope, $http, $compile);
    if (session.poa_id) {
        asignaciones.headertitle2 = MESSAGE.i('planificacion.titleAsignacion') + " / " + session.periodo_pei_msj + " / " + session.periodo_poa_msj;
    } else if (session.pei_id) {
        asignaciones.headertitle2 = MESSAGE.i('planificacion.titleAsignacion') + " / " + session.periodo_pei_msj;
    } else {
        asignaciones.headertitle2 = MESSAGE.i('planificacion.titleAsignacion') + " / PEI ";
    }
    asignaciones.nameMisAsig = '';

    if (carac2 === "DP" || carac2 === "AD" ) {
        asignaciones.nameMisAsig = "Mis Asignaciones";
    }
    else{
        asignaciones.nameMisAsig = "Mis Asignaciones";
        asignaciones.nameMisAsig = "Mis Asignaciones";
    }
    if (carac2 === "SL") {
        asignaciones.setPermission('add', false);
    }
    asignaciones.active_asignacion = 'active';
    asignaciones.active_mi_asignacion = '';

    asignaciones.evaluate_asignacion = function(){
        return (asignaciones.allow(['Asignaciones_Creadas']));
    };
    asignaciones.evaluate_mi_asignacion = function(){
        return (asignaciones.allow(['Mis_Asignaciones']));
    };

    asignaciones.mostrar_asignacion = async function () {
        if (await asignaciones.evaluate_asignacion()) {
            asignaciones.active_mi_asignacion = '';
            asignaciones.active_asignacion = 'active';
            asignaciones.refreshAngular();
        }
    };
    asignaciones.mostrar_mi_asignacion = async function () {
        if (await asignaciones.evaluate_mi_asignacion()) {
            asignaciones.active_asignacion = '';
            asignaciones.active_mi_asignacion = 'active';
            asignaciones.refreshAngular();
        }
    };
});
