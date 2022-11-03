app.controller("mega_comentarios_resultado_esperado", function ($scope, $http, $compile) {
    mega_comentarios_resultado_esperado = this;
    mega_comentarios_resultado_esperado.fixFilters = [
        {
            "field": "type",
            "value": 5
        },
        {
            "field": "value",
            "value": typeof mega_resultado_esperado != "undefined" ? mega_resultado_esperado.ids : -1
        }
    ];
    RUNCONTROLLER("mega_comentarios_resultado_esperado", mega_comentarios_resultado_esperado, $scope, $http, $compile);
    mega_comentarios_resultado_esperado.headertitle = "Comentarios";
    mega_comentarios_resultado_esperado.plural = "Comentarios";
    mega_comentarios_resultado_esperado.singular = "Comentario";
    mega_comentarios_resultado_esperado.setPermission('actions', false);
});