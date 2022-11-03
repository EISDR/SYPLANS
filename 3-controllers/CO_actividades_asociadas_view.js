app.controller("actividades_asociadas_view", function ($scope, $http, $compile) {
    //
    actividades_asociadas_view = this;

    RUNCONTROLLER("actividades_asociadas_view", actividades_asociadas_view, $scope, $http, $compile);
    actividades_asociadas_view.headertitle = MESSAGE.i('planificacion.actividades_asociadas');
    if (typeof actividades_poa_monitoreo !== 'undefined') {
        if (typeof actividades_poa_monitoreo !== 'not defined') {
            if (actividades_poa_monitoreo) {
                if (actividades_poa_monitoreo.form.mode == "edit") {
                    actividades_asociadas_view.setPermission('actions', false);
                    actividades_asociadas_view.setPermission('comment', false);
                } else {
                    actividades_asociadas_view.setPermission('actions', true);
                    actividades_asociadas_view.setPermission('comment', true);
                }
            }
        }
    }
});
