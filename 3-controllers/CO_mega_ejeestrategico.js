app.controller("mega_ejeestrategico", function ($scope, $http, $compile) {
    mega_ejeestrategico = this;
    var session = new SESSION().current();
    mega_ejeestrategico.fixFilters = [
        {
            field: 'id',
            operator: "=",
            value: -1
        }
    ];
    RUNCONTROLLER("mega_ejeestrategico", mega_ejeestrategico, $scope, $http, $compile);
    mega_ejeestrategico.headertitle = "Eje estratégico";
    mega_ejeestrategico.plural = "Ejes estratégicos";
    mega_ejeestrategico.singular = "Ejes estratégicos";
    mega_ejeestrategico.tipo_institucion = session.tipo_institucion;
    mega_ejeestrategico.filter_ejeestrategico = () => new Promise(async (resolve, reject) => {
        mega_ejeestrategico.fixFilters = [];
        mega_ejeestrategico.fixFilters = [
            {
                field: 'pei',
                operator: "=",
                value: filtros_pei.pei
            }
        ];
        if (!DSON.oseaX(filtros_pei.eje_estrategico_pei)) {
            mega_ejeestrategico.fixFilters.push(
                {
                    field: 'id',
                    operator: '=',
                    value: filtros_pei.eje_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.objetivo_estrategico_pei)) {
            var vw_mega_ejeestrategico = await BASEAPI.firstp("vw_mega_ejeestrategico", {
                where: [{
                    field: "objetivo_estrategico_id",
                    operator: "=",
                    value: filtros_pei.objetivo_estrategico_pei
                }]
            });
            if (vw_mega_ejeestrategico) {
                mega_ejeestrategico.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_ejeestrategico.id
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_pei.estrategia_pei)) {
            var vw_mega_ejeestrategico = await BASEAPI.firstp("vw_mega_ejeestrategico", {
                where: [{
                    field: "estrategia_id",
                    operator: "=",
                    value: filtros_pei.estrategia_pei
                }]
            });
            if (vw_mega_ejeestrategico) {
                mega_ejeestrategico.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_ejeestrategico.id
                    }
                );
            }

        }
        if (!DSON.oseaX(filtros_pei.resultado_pei)) {
            var vw_mega_ejeestrategico = await BASEAPI.firstp("vw_mega_ejeestrategico", {
                where: [{
                    field: "resultado_id",
                    operator: "=",
                    value: filtros_pei.resultado_pei
                }]
            });
            if (vw_mega_ejeestrategico) {
                mega_ejeestrategico.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_ejeestrategico.id
                    }
                );
            }
        }
        if (parseInt(filtros_poa.departamento) > 0) {
            var id_ejes_departamento = [];
            await BASEAPI.listp("vw_productos_poa_detalles_mega", {
                where: [{
                    field: "id_departamento",
                    operator: "=",
                    value: filtros_poa.departamento
                }]
            }).then(function (res) {
                for (var i in res.data) {
                    id_ejes_departamento.push(res.data[i].id_eje_estrategico);
                }
            });
            if (id_ejes_departamento.length > 0) {
                mega_ejeestrategico.fixFilters.push(
                    {
                        field: 'id',
                        value: id_ejes_departamento
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.productos_poa)) {
            var vw_mega_ejeestrategico = await BASEAPI.firstp("vw_productos_poa_detalles_mega", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.productos_poa
                }]
            });
            if (vw_mega_ejeestrategico) {
                mega_ejeestrategico.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_ejeestrategico.id_eje_estrategico
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.actividades_poa)) {
            var vw_mega_ejeestrategico = await BASEAPI.firstp("vw_actividades_poa", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.actividades_poa
                }]
            });
            if (vw_mega_ejeestrategico) {
                mega_ejeestrategico.fixFilters.push(
                    {
                        field: 'id',
                        operator: '=',
                        value: vw_mega_ejeestrategico.id_eje_estrategico
                    }
                );
            }
        }
        resolve(1);
    });
    mega_ejeestrategico.triggers.table.after.load = async function (records) {
        mega_ejeestrategico.runMagicOneToMany('ods', 'drp_eje_estrategico_ods', 'eje_estrategico', 'nombre', 'id');
        mega_ejeestrategico.runMagicOneToMany('end', 'drp_eje_estrategico_end2', 'eje_estrategico', 'nombre', 'id');
    };
    if (session.tipo_institucion !== ENUM_2.COMPANY_TYPE.publica) {
        if (CRUD_mega_ejeestrategico.table)
            if (CRUD_mega_ejeestrategico.table.columns)
                if (CRUD_mega_ejeestrategico.table.columns.end_nombre) {
                    CRUD_mega_ejeestrategico.table.columns.end_nombre.visible = false;
                    CRUD_mega_ejeestrategico.table.columns.pnpsp_nombre.visible = false;
                    CRUD_mega_ejeestrategico.table.columns.ods_nombre.visible = false;

                    CRUD_mega_ejeestrategico.table.columns.end_nombre.visibleDetail = false;
                    CRUD_mega_ejeestrategico.table.columns.pnpsp_nombre.visibleDetail = false;
                    CRUD_mega_ejeestrategico.table.columns.ods_nombre.visibleDetail = false;

                    CRUD_mega_ejeestrategico.table.columns.end_nombre.export = false;
                    CRUD_mega_ejeestrategico.table.columns.pnpsp_nombre.export = false;
                    CRUD_mega_ejeestrategico.table.columns.ods_nombre.export = false;

                    CRUD_mega_ejeestrategico.table.columns.end_nombre.exportExample = false;
                    CRUD_mega_ejeestrategico.table.columns.pnpsp_nombre.exportExample = false;
                    CRUD_mega_ejeestrategico.table.columns.ods_nombre.exportExample = false;

                    CRUD_mega_ejeestrategico.table.filters.columns.splice(3, 3);
                }
    }
});
