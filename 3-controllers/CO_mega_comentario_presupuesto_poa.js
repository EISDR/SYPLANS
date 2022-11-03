app.controller("mega_comentario_presupuesto_poa", function ($scope, $http, $compile) {
    mega_comentario_presupuesto_poa = this;

    RUNCONTROLLER("mega_comentario_presupuesto_poa", mega_comentario_presupuesto_poa, $scope, $http, $compile);
    mega_comentario_presupuesto_poa.headertitle = "Comentarios";
    mega_comentario_presupuesto_poa.plural = "Comentarios";
    mega_comentario_presupuesto_poa.singular = "Comentarios";
    RUN_B("mega_comentario_presupuesto_poa", mega_comentario_presupuesto_poa, $scope, $http, $compile);
    mega_comentario_presupuesto_poa.formulary = function (data, mode, defaultData) {
        mega_comentario_presupuesto_poa.form.readonly = {};
        mega_comentario_presupuesto_poa.createForm(data, mode, defaultData);
    };
    if (typeof mega_presupuesto_aprobado != 'undefined') {
        if (typeof mega_presupuesto_aprobado != 'not defined'){
            if (mega_presupuesto_aprobado){
                mega_comentario_presupuesto_poa.fixFilters = [
                    {
                        "field": "value",
                        "value":  mega_presupuesto_aprobado.VALUES.idPresupuesto
                    },
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.POA_Presupuesto
                    }
                ];
            }
        }
    }
    if (typeof departamento_poa != 'undefined') {
        if (typeof departamento_poa != 'not defined') {
            if (departamento_poa) {
                baseController.viaja_depto = departamento_poa.departamento;
                baseController.viaja_status = departamento_poa.estatus;
                if (departamento_poa.form.selected('departamento') != null){
                    $('.modal-title').html(MESSAGE.i('planificacion.comentarios')+' Depto '+departamento_poa.form.selected('departamento').nombre);
                } else {
                    $('.modal-title').html(MESSAGE.i('planificacion.comentarios'));
                }

                if (departamento_poa.verComentario_liberado){
                    mega_comentario_presupuesto_poa.fixFilters = [
                        {
                            "field": "value",
                            "value": departamento_poa.form.selected('departamento') ? departamento_poa.form.selected('departamento').id_presupuesto: '-1'
                        },
                        {
                            "field": "type",
                            "value": ENUM_2.tipo_comentario.Liberar_Presupuesto
                        }
                    ];
                    // departamento_poa.verComentario_liberado = false;
                } else {
                    mega_comentario_presupuesto_poa.fixFilters = [
                        {
                            "field": "value",
                            "value": departamento_poa.form.selected('departamento') ? departamento_poa.form.selected('departamento').id_presupuesto: '-1'
                        },
                        {
                            "field": "type",
                            "value": ENUM_2.tipo_comentario.POA_Presupuesto
                        }
                    ];
                }
            }
        }
    }
});