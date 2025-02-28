lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_indicador_actividad = DSON.merge(CRUD_indicador_actividad,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'departamento',
                        type: FILTER.types.relation,
                        value: "id",
                        table: 'departamento',
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
                        key: 'no',
                        type: FILTER.types.integer,
                        maxlength: 15
                    },
                    {
                        key: 'no_producto',
                        type: FILTER.types.integer,
                        maxlength: 15
                    },
                    {
                        key: 'nombre_indicador',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'id_producto',
                        type: FILTER.types.relation,
                        table: 'vw_productos_poa_detalles',
                        value: "id",
                        text: "item.no1 + ' ' + item.producto",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [
                                {
                                "field": "poa_id",
                                "value": lachechon ? lachechon.poa_id : -1
                            }
                            ],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'actividades_poa',
                        type: FILTER.types.relation,
                        table: 'vw_actividades_poa',
                        value: "id",
                        text: "item.no2 + ' ' + item.actividad",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [
                                {
                                    "field": "poa",
                                    "value": lachechon ? lachechon.poa_id : -1
                                }
                            ],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'descripcion_indicador',
                        type: FILTER.types.string,
                        maxlength: 4000
                    },
                    {
                        key: 'fuente',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'desagregacion_demografica_geografia',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'metodo',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'tipo_meta',
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
                        type: FILTER.types.integer,
                        maxlength: 30
                    },
                    {
                        key: 'medio_verificacion',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'id_resultado',
                        type: FILTER.types.relation,
                        table: 'vw_resultado',
                        value: "id",
                        text: "item.resultado_esperado",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [
                                {
                                "field": "pei",
                                "value": lachechon ? lachechon.pei_id : -1
                            }
                            ],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                ]
            }
        }
    });
