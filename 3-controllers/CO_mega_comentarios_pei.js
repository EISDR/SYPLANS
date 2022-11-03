app.controller("mega_comentarios_pei", function ($scope, $http, $compile) {
    mega_comentarios_pei = this;
    var session = new SESSION().current();
    mega_comentarios_pei.director_general = ENUM_2.Grupos.director_general;
    mega_comentarios_pei.analista_de_planificacion = ENUM_2.Grupos.analista_de_planificacion;
    mega_comentarios_pei.mygroup = session.groups[0] ? session.groups[0].caracteristica : '';
    mega_comentarios_pei.show_comment = true;
    mega_comentarios_pei.fixFilters = [
        {
            "field": "type",
            "value": 1
        },
        {
            "field": "value",
            "value": filtros_pei.form.selected('pei') ? filtros_pei.form.selected('pei').pei_id : -1
        }
    ];
    RUNCONTROLLER("mega_comentarios_pei", mega_comentarios_pei, $scope, $http, $compile);
    mega_comentarios_pei.$scope.$watch('mega_comentarios_pei.comentario', function (value) {
        var rules = [];
        rules.push(VALIDATION.yariel.maliciousCode(value));
        VALIDATION.validate(mega_comentarios_pei, "comentario", rules);
    });
    mega_comentarios_pei.anadirComentario = async function(){
        if (filtros_pei.form.selected('pei')) {
            if (!mega_comentarios_pei.comentario) {
                SWEETALERT.show({message: `Debe agregar un comentario.`});
            } else if (maliciousCode(mega_comentarios_pei.comentario)){
                SWEETALERT.show({message: `Código malicioso.`});
            }else {
                BASEAPI.insertp('comentarios',
                    {
                        "comentario": mega_comentarios_pei.comentario,
                        "type": 1,
                        "created_by": session.usuario_id,
                        "value": filtros_pei.form.selected('pei') ? filtros_pei.form.selected('pei').pei_id : -1,
                        "value2": filtros_pei.form.selected('pei') ? filtros_pei.form.selected('pei').pei_id : 0
                    }).then(function (rs) {
                    mega_comentarios_pei.refresh();
                    mega_comentarios_pei.comentario = "";
                    mega_comentarios_pei.refreshAngular();
                });
            }
        }else{
            SWEETALERT.show({message: `Debe seleccionar un PEI.`});
        }
    };
    mega_comentarios_pei.headertitle = "Comentarios";
    mega_comentarios_pei.plural = "Comentarios";
    mega_comentarios_pei.singular = "Comentario";
    mega_comentarios_pei.permitir = function(){
        if ( mega_comentarios_pei.director_general == mega_comentarios_pei.mygroup || mega_comentarios_pei.analista_de_planificacion == mega_comentarios_pei.mygroup){
            mega_comentarios_pei.show_comment = true;
            return true;
        } else {
            mega_comentarios_pei.show_comment = false;
            return false;
        }
    };
    mega_comentarios_pei.permitir();
});