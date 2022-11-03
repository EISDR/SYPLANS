app.controller("mega_productos_actividades_apoyo", function ($scope, $http, $compile) {
    mega_productos_actividades_apoyo = this;

    mega_productos_actividades_apoyo.headertitle = "Actividades de Apoyo";
    mega_productos_actividades_apoyo.plural = "Actividades de apoyo";
    mega_productos_actividades_apoyo.singular = "Actividad de apoyo";
    // mega_productos_actividades_apoyo.id_actividad;
    mega_productos_actividades_apoyo.fixFilters = [
        {
            "field": 'producto',
            "value": mega_producto.id_actividad_producto
        }
    ];
    RUNCONTROLLER("mega_productos_actividades_apoyo", mega_productos_actividades_apoyo, $scope, $http, $compile);
    RUN_B("mega_productos_actividades_apoyo", mega_productos_actividades_apoyo, $scope, $http, $compile);
});
