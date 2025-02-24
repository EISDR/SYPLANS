lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_vw_dashboard_productosgrid_pei = DSON.merge(CRUD_vw_dashboard_productosgrid_pei,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'producto',
                        type: FILTER.types.relation,
                        table: 'productos_poa',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "poa",
                                "value": lachechon ? lachechon.poa_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'indicador',
                        type: FILTER.types.relation,
                        table: 'vw_indicador_poa',
                        value: "id",
                        text: "item.nombre_indicador",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "poa",
                                "value": lachechon ? lachechon.poa_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'acumulado',
                        type: FILTER.types.integer,
                    },
                    {
                        key: 'alcanzado',
                        type: FILTER.types.integer,
                    },
                    {
                        key: 'varianza',
                        type: FILTER.types.integer,
                    },
                ]
            }
        }
    });
