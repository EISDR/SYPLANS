CRUD_vw_dashboard_productosgrid_proceso = DSON.merge(CRUD_vw_dashboard_productosgrid_proceso,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'indicador',
                        label: 'Indicador',
                        type: FILTER.types.relation,
                        table: 'vw_indicador_proceso',
                        value: "id",
                        text: "item.nombre_indicador",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "poa",
                                "value": new SESSION().current() ? new SESSION().current().poa_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'acumulado',
                        label: 'Acumulado',
                        type: FILTER.types.integer,
                        placeholder: 'Acumulado'
                    },
                    {
                        key: 'alcanzado',
                        label: 'Alcanzado',
                        type: FILTER.types.integer,
                        placeholder: 'Alcanzado'
                    },
                    {
                        key: 'varianza',
                        label: 'Varianza',
                        type: FILTER.types.integer,
                        placeholder: 'Varianza'
                    },
                ]
            }
        }
    });
