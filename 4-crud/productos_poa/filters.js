lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_productos_poa = DSON.merge(CRUD_productos_poa,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no2',
                        type: FILTER.types.integer,
                        maxlength: 15
                    },
                    {
                        key: 'id_resultado',
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
                        maxlength: 15
                    },
                    {
                        key: 'producto',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                        maxlength: 1000
                    },
                    {
                        key: 'id_departamento',
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
                        key: 'estado_producto_id',
                        type: FILTER.types.relation,
                        table: 'productos_poa_status',
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
                        key: 'fecha inicio',
                        type: FILTER.types.date,
                    },
                    {
                        key: 'fecha fin',
                        type: FILTER.types.date,
                    }
                ]
            }
        }
    });