app.controller("mega_estrategia", function ($scope, $http, $compile) {
    mega_estrategia = this;

    mega_estrategia.fixFilters = [
        {
            "field": "id",
            "operator": "=",
            "value": "0"
        }
    ];

    RUNCONTROLLER("mega_estrategia", mega_estrategia, $scope, $http, $compile);
    mega_estrategia.headertitle = "Estrategia";
    mega_estrategia.plural = "Estrategias";
    mega_estrategia.singular = "Estrategia";
    mega_estrategia.filter_estrategia = () => new Promise( async (resolve, reject)=> {
        mega_estrategia.fixFilters = [];
        mega_estrategia.fixFilters = [
            {
                field: 'pei',
                operator: "=",
                value: filtros_pei.pei
            }
        ];
        if (!DSON.oseaX(filtros_pei.eje_estrategico_pei)) {
            mega_estrategia.fixFilters.push(
                {
                    field: 'eje_estrategico_id',
                    operator: '=',
                    value: filtros_pei.eje_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.objetivo_estrategico_pei)) {
            mega_estrategia.fixFilters.push(
                {
                    field: 'objetivo_estrategico_id',
                    operator: '=',
                    value: filtros_pei.objetivo_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.estrategia_pei)) {
            mega_estrategia.fixFilters.push(
                {
                    field: 'id',
                    operator: '=',
                    value: filtros_pei.estrategia_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.resultado_pei)) {
            var resultado = await BASEAPI.firstp("resultado", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_pei.resultado_pei
                }]
            });
            if(resultado){
                mega_estrategia.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: resultado.estrategia
                    }
                );
            }
        }
        if (parseInt(filtros_poa.departamento) > 0) {
            var id_estrategias_departamento = [];
            await BASEAPI.listp("vw_productos_poa_detalles_mega", {
                where:[{
                    field:"id_departamento",
                    operator: "=",
                    value: filtros_poa.departamento
                }]
            }).then( function (res) {
                for (var i in res.data ){
                    id_estrategias_departamento.push(res.data[i].id_estrategia);
                }
            });
            if(id_estrategias_departamento.length > 0){
                mega_estrategia.fixFilters.push(
                    {
                        field: 'id',
                        value: id_estrategias_departamento
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.productos_poa)) {
            var vw_mega_estrategia = await BASEAPI.firstp("vw_productos_poa_detalles_mega", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.productos_poa
                }]
            });
            if(vw_mega_estrategia){
                mega_estrategia.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_estrategia.id_estrategia
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.actividades_poa)) {
            var vw_mega_estrategia = await BASEAPI.firstp("vw_actividades_poa", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.actividades_poa
                }]
            });
            if(vw_mega_estrategia){
                mega_estrategia.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_estrategia.id_estrategia
                    }
                );
            }
        }
        resolve (1);
    });


    mega_estrategia.relateditems = async function(id) {
        mega_estrategia.dataValuesIDs = [];
        mega_estrategia.pestaDvaluesIDs = [];
        mega_estrategia.dataValues =  await getRelationData('estrategia_foda', "estrategia", id);
        mega_estrategia.pestaDvalues = await getRelationData('estrategia_pesta', 'estrategia', id);
        for (var i of mega_estrategia.dataValues) {
            mega_estrategia.dataValuesIDs.push(i.foda);
        }
        for (var i of mega_estrategia.pestaDvalues) {
            mega_estrategia.pestaDvaluesIDs.push(i.pesta);
        }
    };
});