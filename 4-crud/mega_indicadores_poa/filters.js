lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_mega_indicadores_poa = DSON.merge(CRUD_mega_indicadores_poa,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_eje',
                        label: 'No. eje estratégico',
                        type: FILTER.types.string,
                        placeholder: 'No. eje estratégico'
                    },
                    {
                        key: 'id_eje_estrategico',
                        label: 'Eje Estratégico',
                        type: FILTER.types.relation,
                        table: 'eje_estrategico',
                        value: "id",
                        text: "item.no_orden + ' ' + item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei",
                                "value": lachechon ? lachechon.pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'no_objetivo',
                        label: 'No. objetivo estratégico',
                        type: FILTER.types.string,
                        placeholder: 'No. objetivo estratégico'
                    },
                    {
                        key: 'id_objetivo_estrategico',
                        label: 'Objetivo Estratégico',
                        type: FILTER.types.relation,
                        table: 'vw_objetivo_estrategico',
                        value: "id",
                        text: "item.no_objetivo + ' ' + item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei_id",
                                "value": lachechon ? lachechon.pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'no_estrategia',
                        label: 'No. Estrategia',
                        type: FILTER.types.string,
                        placeholder: 'No. Estrategia'
                    },
                    {
                        key: 'id_estrategia',
                        label: 'Estrategia',
                        type: FILTER.types.relation,
                        table: 'vw_estrategia',
                        value: "id",
                        text: "item.no_estrategia + ' ' + item.estrategia",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei",
                                "value": lachechon ? lachechon.pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'no2',
                        label: function() { return 'No. Resultado esperado' },
                        type: FILTER.types.string,
                        placeholder: 'No. Resultado esperado'
                    },
                    {
                        key: 'id_resultado_esperado',
                        label: 'Resultado esperado',
                        type: FILTER.types.relation,
                        table: 'vw_resultado',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei",
                                "value": lachechon ? lachechon.pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'no1',
                        label: function() { return lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción' },
                        type: FILTER.types.string,
                        placeholder: lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción'
                    },
                    {
                        key: 'producto_id',
                        label: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
                        type: FILTER.types.relation,
                        table: 'vw_productos_poa_detalles',
                        value: "id",
                        text: "item.no1 + ' ' + item.producto",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "poa_id",
                                "value": lachechon ? lachechon.poa_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'nombre_indicador',
                        label: 'Indicador',
                        type: FILTER.types.string,
                        placeholder: 'Indicador'
                    },
                    {
                        key: 'fuente',
                        label: 'Fuente del Indicador',
                        type: FILTER.types.string,
                        placeholder: 'Fuente del Indicador'
                    },
                    {
                        key: 'desagregacion_demografica_geografia',
                        label: 'Desagregación Demográfica Geográfica',
                        type: FILTER.types.string,
                        placeholder: 'Desagregación Demográfica Geográfica'
                    },
                    {
                        key: 'metodo',
                        label: 'Método Cálculo',
                        type: FILTER.types.string,
                        placeholder: 'Método Cálculo'
                    },
                    {
                        key: 'tipo_meta',
                        label: 'Tipo de meta',
                        type: FILTER.types.relation,
                        table: 'tipoMeta',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'direccion_meta',
                        label: 'Dirección de la meta',
                        type: FILTER.types.relation,
                        table: 'direccionMeta',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'linea',
                        label: 'Línea base',
                        type: FILTER.types.string,
                        placeholder: 'Línea Base'
                    },
                    {
                        key: 'medio',
                        label: 'Medio Verificación',
                        type: FILTER.types.string,
                        placeholder: 'Medio Verificación'
                    },
                ]
            }
        }
    });
