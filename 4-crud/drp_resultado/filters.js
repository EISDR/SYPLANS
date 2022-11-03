CRUD_drp_resultado = DSON.merge(CRUD_drp_resultado,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: 'Nombre',
                        type: FILTER.types.string,
                        placeholder: 'Nombre'
                    },
                    {
                        key: 'estrategia',
                        label: 'Estartegia',
                        type: FILTER.types.relation,
                        table: 'vw_estrategia',
                        value: "id",
                        text: "item.estrategia",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei",
                                "value": new SESSION().current() ? new SESSION().current().pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                ]
            }
        }
    });