app.controller("mega_indicadores_pei_resultado", function ($scope, $http, $compile) {
    mega_indicadores_pei_resultado = this;

    mega_indicadores_pei_resultado.fixFilters = [
        {
            "field": "resultado",
            "value": typeof mega_resultado_esperado != "undefined" ? mega_resultado_esperado.ids : -1
        }
    ];
    RUNCONTROLLER("mega_indicadores_pei_resultado", mega_indicadores_pei_resultado, $scope, $http, $compile);
    // mega_indicadores_pei_resultado.headertitle =  typeof mega_resultado_esperado != "undefined" ? "Indicadores - " + mega_resultado_esperado.nombres : "Indicadores PEI";
    mega_indicadores_pei_resultado.plural =   typeof mega_resultado_esperado != "undefined" ? "Indicadores - " + mega_resultado_esperado.nombres : "Indicadores PEI";
    mega_indicadores_pei_resultado.singular =   typeof mega_resultado_esperado != "undefined" ? "Indicadores - " + mega_resultado_esperado.nombres : "Indicadores PEI";
    mega_indicadores_pei_resultado.triggers.table.after.load = async function (records) {
        mega_indicadores_pei_resultado.runMagicColum('tipo_meta', 'tipoMeta',"id","nombre");
        mega_indicadores_pei_resultado.runMagicColum('direccion_meta', 'direccionMeta',"id","nombre");

        // SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        BASEAPI.listp('vw_indicador_pei_resultado', {
            limit: 0,
            where: [{
                field: "resultado_id",
                value: typeof mega_resultado_esperado != "undefined" ? mega_resultado_esperado.ids : -1
            }]
        }).then(function (rs_indicador_pei_ano) {
            if(rs_indicador_pei_ano.data){
                mega_indicadores_pei_resultado.list_pei_ano =  rs_indicador_pei_ano.data;
                var inicio = filtros_pei.form.selected('pei').periodo_desde;
                var fin = filtros_pei.form.selected('pei').periodo_hasta;
                var selected = [];
                for (var key in mega_indicadores_pei_resultado.columns()) {
                    if (key.indexOf("anos") != -1) {
                        delete mega_indicadores_pei_resultado.columns()[key];
                    }
                }
                for(inicio; inicio <= fin; inicio++){
                    eval(`mega_indicadores_pei_resultado.columns().anos${inicio} = {label: "Año ${inicio}",sortable: false};`);
                    for(var l = 0; l < mega_indicadores_pei_resultado.records.data.length; l++ ){
                        selected = mega_indicadores_pei_resultado.list_pei_ano.filter(information => {
                            if(information.indicador_pei == mega_indicadores_pei_resultado.records.data[l].id && information.ano ==inicio){
                                return true;
                            }
                        });
                        if(selected.length > 0){
                            eval(`mega_indicadores_pei_resultado.records.data[${l}].anos${inicio} = "${selected[0].valor}";`);
                        }else{
                            eval(`mega_indicadores_pei_resultado.records.data[${l}].anos${inicio} = "N/A";`);
                        }
                    }
                }
                mega_indicadores_pei_resultado.refreshAngular();
            }
        });
    };
    mega_indicadores_pei_resultado.formulary = function (data, mode, defaultData) {
        if (mega_indicadores_pei_resultado !== undefined) {
            RUN_B("departamento", departamento, $scope, $http, $compile);
            mega_indicadores_pei_resultado.form.titles = {
                new: MESSAGE.i('planificacion.titlemega_indicadores_pei_resultado'),
                edit: "Editar - " + mega_indicadores_pei_resultado.singular,
                view: "Ver ALL - " + mega_indicadores_pei_resultado.singular
            };
            // mega_indicadores_pei_resultado.form.schemas.insert = {};
            // mega_indicadores_pei_resultado.form.schemas.select = {};
            mega_indicadores_pei_resultado.form.readonly = {};
            mega_indicadores_pei_resultado.createForm(data, mode, defaultData);
            mega_indicadores_pei_resultado.$scope.$watch('mega_indicadores_pei_resultado.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(mega_indicadores_pei_resultado, "nombre", rules)
            });
        }
    };

});