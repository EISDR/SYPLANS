lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_vw_dashboard_productos2 = DSON.merge(CRUD_vw_dashboard_productos2,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'resultado',
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
                        key: 'estatus',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'fecha_inicio',
                        type: FILTER.types.datetime,
                    },
                    {
                        key: 'fecha_fin',
                        type: FILTER.types.datetime,
                    },
                    {
                        key: 'presupuesto',
                        type: FILTER.types.string,
                    }
                ]
            }
        }
    });