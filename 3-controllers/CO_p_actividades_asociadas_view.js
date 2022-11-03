app.controller("p_actividades_asociadas_view", function ($scope, $http, $compile) {
    p_actividades_asociadas_view = this;
    //p_actividades_asociadas_view.fixFilters = [];
    //p_actividades_asociadas_view.singular = "singular";
    //p_actividades_asociadas_view.plural = "plural";
    //p_actividades_asociadas_view.headertitle = "Hola Title";
    //p_actividades_asociadas_view.destroyForm = false;
    //p_actividades_asociadas_view.permissionTable = "tabletopermission";
    RUNCONTROLLER("p_actividades_asociadas_view", p_actividades_asociadas_view, $scope, $http, $compile);
    p_actividades_asociadas_view.headertitle = "Actividades de Apoyo";
    if (typeof vw_proyecto_item_actividad !== 'undefined') {
        if (typeof vw_proyecto_item_actividad !== 'not defined') {
            if (vw_proyecto_item_actividad) {
                p_actividades_asociadas_view.setPermission('actions', false);
                p_actividades_asociadas_view.setPermission('comment', false);
            }
        }
    }
});