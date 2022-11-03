app.controller("mega_objetivoestrategico", function ($scope, $http, $compile) {
    mega_objetivoestrategico = this;
    mega_objetivoestrategico.enviar = [];
    var validar = false;
    mega_objetivoestrategico.fixFilters = [
        {
            field: 'id',
            operator: "=",
            value: "0"
        }
    ];

    RUNCONTROLLER("mega_objetivoestrategico", mega_objetivoestrategico, $scope, $http, $compile);
    mega_objetivoestrategico.headertitle = "Objetivo estratégico";
    mega_objetivoestrategico.plural = "Objetivo Estratégico";
    mega_objetivoestrategico.singular = "Objetivos Estratégicos";
    mega_objetivoestrategico.triggers.table.after.load = async function (records) {
        mega_objetivoestrategico.runMagicManyToMany('objetivo_end', 'objetivo', 'objetivo_estrategico', 'id', 'nombre', 'objetivo_estrategico_oe_end','objetivo','id');
        mega_objetivoestrategico.runMagicOneToMany('objetivo_especifico','vw_objetivo_estrategico_especifico_grid','objetivo_estrategico','nombre_edt','id');
    };
    mega_objetivoestrategico.filter_objetivoestrategico = () => new Promise( async (resolve, reject)=> {
        mega_objetivoestrategico.fixFilters = [];
        mega_objetivoestrategico.fixFilters = [
            {
                field: 'pei_id',
                operator: "=",
                value: filtros_pei.pei
            }
        ];
        if (!DSON.oseaX(filtros_pei.eje_estrategico_pei)) {
            mega_objetivoestrategico.fixFilters.push(
                {
                    field: 'eje_estrategico_id',
                    operator: '=',
                    value: filtros_pei.eje_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.objetivo_estrategico_pei)) {
            mega_objetivoestrategico.fixFilters.push(
                {
                    field: 'id',
                    operator: '=',
                    value: filtros_pei.objetivo_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.estrategia_pei)) {
            var vw_mega_objetivoestrategico = await BASEAPI.firstp("vw_mega_objetivoestrategico", {
                where: [{
                    field: "estrategia_id",
                    operator: "=",
                    value: filtros_pei.estrategia_pei
                }]
            });
            if(vw_mega_objetivoestrategico){
                mega_objetivoestrategico.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_objetivoestrategico.id
                    }
                );
            }

        }
        if (!DSON.oseaX(filtros_pei.resultado_pei)) {
            var vw_mega_objetivoestrategico = await BASEAPI.firstp("vw_mega_objetivoestrategico", {
                where: [{
                    field: "resultado_id",
                    operator: "=",
                    value: filtros_pei.resultado_pei
                }]
            });
            if(vw_mega_objetivoestrategico){
                mega_objetivoestrategico.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_objetivoestrategico.id
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.departamento)) {
            var id_objetivos_departamento = [];
            await BASEAPI.listp("vw_productos_poa_detalles_mega", {
                where:[{
                    field:"id_departamento",
                    operator: "=",
                    value: filtros_poa.departamento
                }]
            }).then( function (res) {
                for (var i in res.data ){
                    id_objetivos_departamento.push(res.data[i].id_objetivo_estrategico);
                }
            });
            if(id_objetivos_departamento.length > 0){
                mega_objetivoestrategico.fixFilters.push(
                    {
                        field: 'id',
                        value: id_objetivos_departamento
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.productos_poa)) {
            var vw_mega_objetivoestrategico = await BASEAPI.firstp("vw_productos_poa_detalles_mega", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.productos_poa
                }]
            });
            if(vw_mega_objetivoestrategico){
                mega_objetivoestrategico.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_objetivoestrategico.id_objetivo_estrategico
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.actividades_poa)) {
            var vw_mega_objetivoestrategico = await BASEAPI.firstp("vw_actividades_poa", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.actividades_poa
                }]
            });
            if(vw_mega_objetivoestrategico){
                mega_objetivoestrategico.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_objetivoestrategico.id_objetivo_estrategico
                    }
                );
            }
        }
        resolve (1);
    });
});