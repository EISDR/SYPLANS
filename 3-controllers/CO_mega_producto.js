app.controller("mega_producto", function ($scope, $http, $compile) {
    mega_producto = this;

    var session = new SESSION().current();
    mega_producto.session = session;
    mega_producto.usuario_id =  session.usuario_id;
    mega_producto.fixFilters = [
        {
            "field": "id",
            "operator": "=",
            "value": "-1"
        }
    ];
    if (typeof presupuesto_aprobado !== 'undefined'){
        if (typeof presupuesto_aprobado !== 'not define') {
            if (presupuesto_aprobado.departamento) {
                mega_producto.fixFilters = [
                    {
                        "field": "id_departamento",
                        "value": presupuesto_aprobado.departamento.id
                    }
                ];
            }
        }
    }

    if (typeof mega_presupuesto_aprobado !== 'undefined'){
        if (typeof mega_presupuesto_aprobado !== 'not define') {
            if (mega_presupuesto_aprobado.departamento) {
                mega_producto.fixFilters = [
                    {
                        "field": "id_departamento",
                        "value": mega_presupuesto_aprobado.departamento.id
                    },
                    {
                        "field": "poa_id",
                        "value":  filtros_poa.form.selected('poa') ?  filtros_poa.form.selected('poa').id : -1
                    },
                ];
            }
        }
    }

    mega_producto.filter_mega_producto = () => new Promise(async (resolve, reject) => {
        mega_producto.fixFilters = [];
        mega_producto.fixFilters.push({
            "field": "poa_id",
            "operator": "=",
            "value": filtros_poa.poa
        });
        if (!DSON.oseaX(filtros_pei.eje_estrategico_pei)) {
            mega_producto.fixFilters.push(
                {
                    field: 'id_eje_estrategico',
                    value: filtros_pei.eje_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.objetivo_estrategico_pei)) {
            mega_producto.fixFilters.push(
                {
                    field: 'id_objetivo_estrategico',
                    value: filtros_pei.objetivo_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.estrategia_pei)) {
            mega_producto.fixFilters.push(
                {
                    field: 'id_estrategia',
                    value: filtros_pei.estrategia_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.resultado_pei)) {
            mega_producto.fixFilters.push(
                {
                    field: 'id_resultado',
                    value: filtros_pei.resultado_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.departamento)) {
            mega_producto.fixFilters.push(
                {
                    field: 'id_departamento',
                    operator: '=',
                    value: filtros_poa.departamento
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.productos_poa)) {
            mega_producto.fixFilters.push(
                {
                    field: 'id',
                    operator: '=',
                    value: filtros_poa.productos_poa
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.actividades_poa)) {
            var vw_mega_actividades_poa = await BASEAPI.firstp("vw_actividades_poa", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.actividades_poa
                }]
            });
            if (vw_mega_actividades_poa) {
                console.log(vw_mega_actividades_poa);
                mega_producto.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_actividades_poa.producto
                    }
                );
            }
        }
        resolve(1);
    });

    mega_producto.workProduct = function (data, status, producto) {

        mega_producto.id_producto = data;
        mega_producto.id_status = status;

        var modal = {
            width: 'modal-full',
            header: {
                title: ( mega_producto.session.tipo_institucion === 1 ? "Proyecto/Producto - " : "Proyecto/Plan de Acción - ") + producto
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'mega_producto_adtividades'
            },
        };
        mega_producto.modal.modalView("mega_producto_adtividades", modal);

    };

    RUNCONTROLLER("mega_producto", mega_producto, $scope, $http, $compile);

    if (filtros_poa.form.selected('poa') && filtros_poa.form.selected('pei')){
        mega_producto.title_mega = MESSAGE.i('planificacion.title_mega_consulta') + " / PEI " + filtros_pei.form.selected('pei').periodo_desde + " - " + filtros_pei.form.selected('pei').periodo_hasta + " / POA " + filtros_poa.form.selected('poa').periodo_poa;
    }else{
        if (filtros_poa.form.selected('pei')) {
            mega_producto.title_mega = MESSAGE.i('planificacion.title_mega_consulta') + " / PEI " + filtros_pei.form.selected('pei').periodo_desde + " - " + filtros_pei.form.selected('pei').periodo_hasta;
        }
        else{
            mega_producto.title_mega = MESSAGE.i('planificacion.title_mega_consulta');
        }
    }

    $('.modal-title:eq(0)').html(`<i class="icon-lifebuoy"></i> ${mega_producto.title_mega}`);

    RUN_B("mega_producto", mega_producto, $scope, $http, $compile);

    mega_producto.headertitle = mega_producto.session.tipo_institucion === 1 ? "Proyecto/Producto" : "Proyecto/Plan de Acción";
    mega_producto.singular = "Proyecto/Producto";
    mega_producto.plural = "Proyecto/Producto";

    mega_producto.triggers.table.after.load = async function (record) {
        mega_producto.runMagicManyToMany('involucrado', "involucrados", "producto", "id",'nombre_completo', "prudcto_involucrado", "involucrado", "id");
    };

});
