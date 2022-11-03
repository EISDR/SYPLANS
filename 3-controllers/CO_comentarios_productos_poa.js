app.controller("comentarios_productos_poa", function ($scope, $http, $compile) {
    comentarios_productos_poa = this;

    // comentarios_productos_poa.destroyForm = false;
    if (typeof productos_poa !== 'undefined'){
        if (typeof productos_poa !== 'not defined'){
            if (productos_poa){
                if (productos_poa.id_para_comentarios) {
                    comentarios_productos_poa.fixFilters = [
                        {
                            "field": "type",
                            "value": 6
                        },
                        {
                            "field": "value",
                            "value": productos_poa.id_para_comentarios
                        }
                    ];
                } else {
                    comentarios_productos_poa.fixFilters = [
                        {
                            "field": "type",
                            "value": 6
                        },
                        {
                            "field": "value",
                            "value": typeof productos_poa != "undefined" ? productos_poa.id : -1
                        }
                    ];
                }
            }
        }
    }
    if (typeof drp_productos_poa !== 'undefined'){
        if (typeof drp_productos_poa !== 'not defined'){
            if (drp_productos_poa){
                comentarios_productos_poa.fixFilters = [
                    {
                        "field": "type",
                        "value": 6
                    },
                    {
                        "field": "value",
                        "value": typeof drp_productos_poa != "undefined" ? drp_productos_poa.id : -1
                    }
                ];
            }
        }
    }
    if (typeof vw_productos_poa_resultado !== 'undefined'){
        if (typeof vw_productos_poa_resultado !== 'not defined'){
            if (vw_productos_poa_resultado){
                comentarios_productos_poa.fixFilters = [
                    {
                        "field": "type",
                        "value": 6
                    },
                    {
                        "field": "value",
                        "value": typeof vw_productos_poa_resultado != "undefined" ? (typeof vw_productos_poa_resultado.id != "undefined" ?vw_productos_poa_resultado.id:vw_productos_poa_resultado.id_para_comentarios ) : -1
                    }
                ];
            }
        }
    }

    if (typeof mega_producto !== 'undefined'){
        if (typeof mega_producto !== 'not defined'){
            if (mega_producto){
                comentarios_productos_poa.fixFilters = [
                    {
                        "field": "type",
                        "value": 6
                    },
                    {
                        "field": "value",
                        "value": typeof mega_producto != "undefined" ? mega_producto.id_para_comentarios : -1
                    }
                ];
            }
        }
    }

    RUNCONTROLLER("comentarios_productos_poa", comentarios_productos_poa, $scope, $http, $compile);
    RUN_B("comentarios_productos_poa", comentarios_productos_poa, $scope, $http, $compile);
    comentarios_productos_poa.headertitle = "Comentarios";
    comentarios_productos_poa.plural = "Comentarios";
    comentarios_productos_poa.singular = "Comentario";
    comentarios_productos_poa.formulary = function (data, mode, defaultData) {
        if (comentarios_productos_poa !== undefined) {
            RUN_B("comentarios_productos_poa", comentarios_productos_poa, $scope, $http, $compile);
            comentarios_productos_poa.form.readonly = {};
            comentarios_productos_poa.createForm(data, mode, defaultData);

        }
    };
});