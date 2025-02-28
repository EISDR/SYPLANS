lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_mega_actividades_asociadas = DSON.merge(CRUD_mega_actividades_asociadas,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_eje',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'id_eje_estrategico',
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
                        type: FILTER.types.string,
                    },
                    {
                        key: 'id_objetivo_estrategico',
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
                        type: FILTER.types.string,
                    },
                    {
                        key: 'id_estrategia',
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
                        type: FILTER.types.string,
                    },
                    {
                        key: 'id_resultado_esperado',
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
                        type: FILTER.types.integer,
                    },
                    {
                        key: 'producto',
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
                        key: 'no2',
                        type: FILTER.types.integer,
                    },
                    {
                        key: 'actividad_poa',
                        type: FILTER.types.relation,
                        value: "id",
                        table:'vw_actividades_poa',
                        text: "item.no2 + ' ' + item.actividad",
                        query: {
                            limit: 0,
                            page: 1,
                            orderby: "id",
                            order: "asc",
                            distinct: false,
                            where: [{
                                "field": "poa",
                                "value": lachechon ? lachechon.poa_id : -1
                            }],
                        }
                    },
                    {
                        key: 'presupuesto',
                        type: FILTER.types.decimal,
                    },
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'departamento',
                        type: FILTER.types.relation,
                        value: "id",
                        table:'departamento',
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            orderby: "id",
                            order: "asc",
                            distinct: false,
                            where: [
                                {
                                    "field": "compania",
                                    "value": lachechon ? lachechon.compania_id : -1
                                },
                                {
                                    "field": "institucion",
                                    "operator": lachechon.institucion_id ? "=" : "is",
                                    "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                                }
                            ],
                        }
                    },
                    {
                        key: 'fecha_inicio',
                        type: FILTER.types.date,
                    },
                    {
                        key: 'fecha_fin',
                        type: FILTER.types.date,
                    },
                ]
            }
        }
    });