app.controller("mega_resultado_esperado", function ($scope, $http, $compile) {
    mega_resultado_esperado = this;
    mega_resultado_esperado.user_info = new SESSION().current();

    mega_resultado_esperado.fixFilters = [
        {
            "field": "pei",
            "operator": '=',
            "value": "0"
        }
    ];

    mega_resultado_esperado.filter_resultado_esperado = () => new Promise( async (resolve, reject)=> {
        mega_resultado_esperado.fixFilters = [];
        mega_resultado_esperado.fixFilters = [
            {
                field: 'pei',
                operator: "=",
                value: filtros_pei.pei
            }
        ];
        if (!DSON.oseaX(filtros_pei.eje_estrategico_pei)) {
            mega_resultado_esperado.fixFilters.push(
                {
                    field: 'eje_estrategico_id',
                    operator: '=',
                    value: filtros_pei.eje_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.objetivo_estrategico_pei)) {
            mega_resultado_esperado.fixFilters.push(
                {
                    field: 'objetivo_estrategico_id',
                    operator: '=',
                    value: filtros_pei.objetivo_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.estrategia_pei)) {
            mega_resultado_esperado.fixFilters.push(
                {
                    field: 'estrategia_id',
                    operator: '=',
                    value: filtros_pei.estrategia_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.resultado_pei)) {
            mega_resultado_esperado.fixFilters.push(
                {
                    field: 'id',
                    operator: '=',
                    value: filtros_pei.resultado_pei
                }
            );
        }
        if (parseInt(filtros_poa.departamento) > 0) {
            var id_resultado_esperado_departamento = [];
            await BASEAPI.listp("vw_productos_poa_detalles_mega", {
                where:[{
                    field:"id_departamento",
                    operator: "=",
                    value: filtros_poa.departamento
                }]
            }).then( function (res) {
                for (var i in res.data ){
                    id_resultado_esperado_departamento.push(res.data[i].id_resultado);
                }
            });
            if(id_resultado_esperado_departamento.length > 0){
                mega_resultado_esperado.fixFilters.push(
                    {
                        field: 'id',
                        value: id_resultado_esperado_departamento
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.productos_poa)) {
            var vw_mega_resultado_esperado = await BASEAPI.firstp("vw_productos_poa_detalles_mega", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.productos_poa
                }]
            });
            if(vw_mega_resultado_esperado){
                mega_resultado_esperado.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_resultado_esperado.id_resultado
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.actividades_poa)) {
            var vw_mega_resultado_esperado = await BASEAPI.firstp("vw_actividades_poa", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.actividades_poa
                }]
            });
            if(vw_mega_resultado_esperado){
                mega_resultado_esperado.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_resultado_esperado.id_resultado
                    }
                );
            }
        }
        resolve (1);
    });

    
    RUNCONTROLLER("mega_resultado_esperado", mega_resultado_esperado, $scope, $http, $compile);
    mega_resultado_esperado.headertitle = "Resultado Esperado";
    mega_resultado_esperado.plural = "Resultado Esperado";
    mega_resultado_esperado.singular = "Resultado Esperado";
    mega_resultado_esperado.anadirComentario = async function(){
        if( mega_resultado_esperado.comentario == ""){
            SWEETALERT.show({message: `Debe agregar un comentario.`});
        }else{
            BASEAPI.insertp('comentarios',
                {
                    "comentario": mega_resultado_esperado.comentario,
                    "type": 5,
                    "created_by": mega_resultado_esperado.user_info.usuario_id,
                    "value": mega_resultado_esperado.ids
                }).then(function (rs) {
                mega_comentarios_resultado_esperado.refresh();
                mega_resultado_esperado.comentario = "";
                mega_resultado_esperado.refreshAngular();
            });
        }
    };
    mega_resultado_esperado.openmodalField = function (value1,value2) {
        mega_resultado_esperado.ids = value1;
        mega_resultado_esperado.nombres = value2;
        mega_resultado_esperado.comentario= "";
        mega_resultado_esperado.modal.modalView("mega_resultado_esperado/indicador", {
            width: 'modal-full',
            header: {
                title: typeof mega_resultado_esperado != "undefined" ? "Indicadores - " + mega_resultado_esperado.nombres : "Indicadores PEI",
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    };

});