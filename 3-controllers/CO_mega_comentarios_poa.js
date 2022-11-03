app.controller("mega_comentarios_poa", function ($scope, $http, $compile) {
    mega_comentarios_poa = this;
    var session = new SESSION().current();
    mega_comentarios_poa.fixFilters = [
        {
            "field": "type",
            "value": ENUM_2.sin_dato.valor_default
        }
    ];
    //

    //
    RUNCONTROLLER("mega_comentarios_poa", mega_comentarios_poa, $scope, $http, $compile);
    RUN_B("mega_comentarios_poa", mega_comentarios_poa, $scope, $http, $compile);
    mega_comentarios_poa.condiction = filtros_poa.form.selected('poa') ? filtros_poa.form.selected('poa').poa_id : -1;
    mega_comentarios_poa.director_general = ENUM_2.Grupos.director_general;
    mega_comentarios_poa.director_general = ENUM_2.Grupos.director_general;
    mega_comentarios_poa.analista_de_planificacion = ENUM_2.Grupos.analista_de_planificacion;
    mega_comentarios_poa.director_departamental = ENUM_2.Grupos.director_departamental;
    mega_comentarios_poa.analista_departamental  = ENUM_2.Grupos.analista_departamental;
    mega_comentarios_poa.solo_lectura = ENUM_2.Grupos.solo_lectura;
    mega_comentarios_poa.mygroup = session.groups[0] ? session.groups[0].caracteristica : '';
    mega_comentarios_poa.show_comment = true;
    mega_comentarios_poa.$scope.$watch('mega_comentarios_poa.comentario', function (value) {
        var rules = [];
        rules.push(VALIDATION.yariel.maliciousCode(value));
        VALIDATION.validate(mega_comentarios_poa, "comentario", rules);
    });
    mega_comentarios_poa.$scope.$watch('mega_comentarios_poa.departamento', function (value) {
        if (!DSON.oseaX(value)){
            if (mega_comentarios_poa.form.selected('departamento') !== null){
                mega_comentarios_poa.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.POA_Presupuesto
                    },
                    {
                        "field": "value",
                        "value": mega_comentarios_poa.form.selected('departamento').id_presupuesto,
                        "connector":"or",
                    },
                    // {
                    //     "open":"(",
                    //     "field": "type",
                    //     "value": ENUM_2.tipo_comentario.POA_General
                    // },
                    // {
                    //     "field": "value",
                    //     "value": filtros_poa.form.selected('poa') ? filtros_poa.form.selected('poa').poa_id : -1,
                    //     "close":")"
                    // },
                    {
                        "open":"(",
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Liberar_Presupuesto
                    },
                    {
                        "field": "value",
                        "value":  mega_comentarios_poa.form.selected('departamento').id_presupuesto,
                        "close":")"
                    }
                ];
            }

        } else {
            mega_comentarios_poa.fixFilters = [
                {
                    "field": "type",
                    "value": ENUM_2.sin_dato.valor_default
                }
            ];
        }
        mega_comentarios_poa.refresh();
    });
    mega_comentarios_poa.triggers.table.after.control = function (data) {
        if (!DSON.oseaX(mega_comentarios_poa.departamento)){
            mega_comentarios_poa.fixFilters = [
                {
                    "field": "type",
                    "value": ENUM_2.tipo_comentario.POA_Presupuesto
                },
                {
                    "field": "value",
                    "value": mega_comentarios_poa.form.selected('departamento').id_presupuesto,
                    "connector":"or",
                },
                // {
                //     "open":"(",
                //     "field": "type",
                //     "value": ENUM_2.tipo_comentario.POA_General
                // },
                // {
                //     "field": "value",
                //     "value": filtros_poa.form.selected('poa') ? filtros_poa.form.selected('poa').poa_id : -1,
                //     "connector":"or",
                //     "close":")"
                // },
                {
                    "open":"(",
                    "field": "type",
                    "value": ENUM_2.tipo_comentario.Liberar_Presupuesto
                },
                {
                    "field": "value",
                    "value":  mega_comentarios_poa.form.selected('departamento').id_presupuesto,
                    "close":")"
                }
            ];
            mega_comentarios_poa.refresh();
        } else {
            mega_comentarios_poa.fixFilters = [
                {
                    "field": "type",
                    "value": ENUM_2.sin_dato.valor_default
                }
            ];
            mega_comentarios_poa.refresh();
        }
        mega_comentarios_poa.refresh();
    };

    mega_comentarios_poa.anadirComentario = async function(){
        if (filtros_poa.form.selected('poa')) {
            if(!mega_comentarios_poa.comentario){
                SWEETALERT.show({message: `Debe agregar un comentario.`});
            } else if( maliciousCode(mega_comentarios_poa.comentario)){
                SWEETALERT.show({message: `Código malicioso.`});
            } else if(DSON.oseaX(mega_comentarios_poa.form.selected('departamento')) ){
                SWEETALERT.show({message: "Debes seleccionar un departamento."});
            } else {
                BASEAPI.insertp('comentarios',
                    {
                        "comentario": mega_comentarios_poa.comentario,
                        "type": ENUM_2.tipo_comentario.POA_Presupuesto,
                        "created_by": session.usuario_id,
                        "value": mega_comentarios_poa.form.selected('departamento').id_presupuesto,
                        "value2": mega_comentarios_poa.form.selected('departamento').estatus
                    }).then(function (rs) {
                    mega_comentarios_poa.refresh();
                    mega_comentarios_poa.comentario = "";
                    mega_comentarios_poa.refreshAngular();
                });
            }
        }else{
            SWEETALERT.show({message: `Debe seleccionar un POA.`});
        }
    };

    mega_comentarios_poa.get_departamento = async function () {
        mega_comentarios_poa.id_presupuesto = [];
        mega_comentarios_poa.get_data_depto = await BASEAPI.listp('usuario_departamento', {
            where: [{
                field: "usuario",
                value: session.usuario_id
            }]
        });
        mega_comentarios_poa.base = [
            {
                field: "poa",
                value: filtros_poa.form.selected('poa') ? filtros_poa.form.selected('poa').poa_id : -1
            },
            {
                field: "id",
                value: session.departamento,
                connector: "OR"
            }
        ];
        mega_comentarios_poa.template = [
            {
                open: "(",
                field: "id",
                value: '',
                close: ")"
            }
        ];
        if (mega_comentarios_poa.get_data_depto.data.length > 0) {
            mega_comentarios_poa.get_data_depto.data.forEach(item => {
                var where = DSON.OSO(mega_comentarios_poa.template);
                where[0].value = item.departamento;
                where[0].connector = "OR";
                mega_comentarios_poa.base.push(where[0]);
            });
            mega_comentarios_poa.base[mega_comentarios_poa.base.length - 1].connector = undefined;
        }

        mega_comentarios_poa.get_data_depto_presupuesto = await BASEAPI.listp('vw_presupuesto_departamento', {
            where: mega_comentarios_poa.base
        });
        if (mega_comentarios_poa.get_data_depto_presupuesto.data.length > 0) {
            mega_comentarios_poa.get_data_depto_presupuesto.data.forEach(item => {
                mega_comentarios_poa.id_presupuesto.push(item.id);
            });
        }
        mega_comentarios_poa.form.loadDropDown('departamento');
    };
    mega_comentarios_poa.soy = function(dr){
        if (mega_comentarios_poa.permitir()){return true;}
        else if (DSON.oseaX(mega_comentarios_poa.id_presupuesto)){
            return false;
        } else {
            if(mega_comentarios_poa.id_presupuesto.indexOf(dr.id) != ENUM_2.sin_dato.valor_default ){
                return true;
            } else return false;
        }
    };
    mega_comentarios_poa.search_dept = async function(){
        if (mega_comentarios_poa.permitir()){
            mega_comentarios_poa.fixFilters = [
                {
                    "field": "type",
                    "value": ENUM_2.tipo_comentario.POA_Presupuesto
                },
                {
                    "field": "value",
                    "value": mega_comentarios_poa.form.selected('departamento').id_presupuesto,
                    "connector":"or",
                },
                // {
                //     "open":"(",
                //     "field": "type",
                //     "value": ENUM_2.tipo_comentario.POA_General
                // },
                // {
                //     "field": "value",
                //     "value": filtros_poa.form.selected('poa') ? filtros_poa.form.selected('poa').poa_id : -1,
                //     "connector":"or",
                //     "close":")"
                // },
                {
                    "open":"(",
                    "field": "type",
                    "value": ENUM_2.tipo_comentario.Liberar_Presupuesto
                },
                {
                    "field": "value",
                    "value":  mega_comentarios_poa.form.selected('departamento').id_presupuesto,
                    "close":")"
                }
            ];
        }
        else {
            mega_comentarios_poa.fixFilters = [
                {
                    "field": "type",
                    "value": ENUM_2.tipo_comentario.POA_Presupuesto
                },
                {
                    "field": "value",
                    "value": mega_comentarios_poa.id_presupuesto? mega_comentarios_poa.id_presupuesto:-1,
                    "connector": "or",
                },
                // {
                //     "open": "(",
                //     "field": "type",
                //     "value": ENUM_2.tipo_comentario.POA_General
                // },
                // {
                //     "field": "value",
                //     "value": filtros_poa.form.selected('poa') ? filtros_poa.form.selected('poa').poa_id : -1,
                //     "connector":"or",
                //     "close":")"
                // },
                {
                    "open":"(",
                    "field": "type",
                    "value": ENUM_2.tipo_comentario.Liberar_Presupuesto
                },
                {
                    "field": "value",
                    "value":  mega_comentarios_poa.id_presupuesto ? mega_comentarios_poa.id_presupuesto:-1,
                    "close":")"
                }
            ];
        }
        mega_comentarios_poa.refresh();
    };

    mega_comentarios_poa.permitir = function(){
        if ( mega_comentarios_poa.director_general == mega_comentarios_poa.mygroup || mega_comentarios_poa.analista_de_planificacion == mega_comentarios_poa.mygroup){
            mega_comentarios_poa.show_comment = true;
            return true;
        } else {
            mega_comentarios_poa.show_comment = false;
            return false;
        }
    };
    mega_comentarios_poa.headertitle = "Comentarios";
    mega_comentarios_poa.plural = "Comentarios";
    mega_comentarios_poa.singular = "Comentarios";
});
