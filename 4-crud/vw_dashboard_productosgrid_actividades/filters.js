lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_vw_dashboard_productosgrid_actividades = DSON.merge(CRUD_vw_dashboard_productosgrid_actividades,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'producto',
                        label: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
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
                        label: 'Indicador',
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
