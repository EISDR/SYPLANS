app.controller("mega_actividades_asociadas", function ($scope, $http, $compile) {
    mega_actividades_asociadas = this;

    // filter_presupuesto_aprobado = function(){}

    RUNCONTROLLER("mega_actividades_asociadas", mega_actividades_asociadas, $scope, $http, $compile);
    mega_actividades_asociadas.headertitle = MESSAGE.i('planificacion.titleTablaActividadApoyo');
    mega_actividades_asociadas.singular = MESSAGE.i('planificacion.titleTablaActividadApoyo');
    mega_actividades_asociadas.plural = MESSAGE.i('planificacion.titleTablaActividadApoyo');
    if (mega_actividades.id_actividad){
        mega_actividades_asociadas.fixFilters =[
            {
                field: 'actividad_poa',
                operator: '=',
                value: mega_actividades.id_actividad
            }
        ];
    } else {
        mega_actividades_asociadas.fixFilters = [
            {
                "field": "id",
                "operator": "=",
                "value": "0"
            }
        ];
    }

    mega_actividades_asociadas.filter_mega_actividades_asociadas = () => new Promise ( async (resolve, reject) => {
        mega_actividades_asociadas.fixFilters = [];
        mega_actividades_asociadas.fixFilters.push({
            "field": "poa",
            "operator": "=",
            "value": filtros_poa.poa
        });
        if (!DSON.oseaX(filtros_pei.eje_estrategico_pei)) {
            mega_actividades_asociadas.fixFilters.push(
                {
                    field: 'id_eje_estrategico',
                    value: filtros_pei.eje_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.objetivo_estrategico_pei)) {
            mega_actividades_asociadas.fixFilters.push(
                {
                    field: 'id_objetivo_estrategico',
                    value: filtros_pei.objetivo_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.estrategia_pei)) {
            mega_actividades_asociadas.fixFilters.push(
                {
                    field: 'id_estrategia',
                    value: filtros_pei.estrategia_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.resultado_pei)) {
            mega_actividades_asociadas.fixFilters.push(
                {
                    field: 'id_resultado_esperado',
                    value: filtros_pei.resultado_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.departamento)) {
            mega_actividades_asociadas.fixFilters.push(
                {
                    field: 'departamento',
                    operator: '=',
                    value: filtros_poa.departamento
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.productos_poa)) {
            mega_actividades_asociadas.fixFilters.push(
                {
                    field: 'producto',
                    operator: '=',
                    value: filtros_poa.productos_poa
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.actividades_poa)) {
            mega_actividades_asociadas.fixFilters.push(
                {
                    field: 'actividad_poa',
                    operator: '=',
                    value: filtros_poa.actividades_poa
                }
            );
        }
        resolve(1);
    });

    mega_actividades_asociadas.formulary = function (data, mode, defaultData) {
        if (mega_actividades_asociadas !== undefined) {
            RUN_B("mega_actividades_asociadas", mega_actividades_asociadas, $scope, $http, $compile);
            mega_actividades_asociadas.form.titles = {
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.title_mega_actividades_asociadas')}`
            };
            mega_actividades_asociadas.createForm(data, mode, defaultData);
        }
    };
});