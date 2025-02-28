CRUD_mega_objetivoestrategico = DSON.merge(CRUD_mega_objetivoestrategico,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_orden',
                        type: FILTER.types.integer,
                    },
                    {
                        key: 'no_orden',
                        type: FILTER.types.integer,
                    },
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'eje_estrategico_id',
                        type: FILTER.types.relation,
                        table: 'eje_estrategico',
                        value: "id",
                        text: "item.no_orden + ' ' + item.nombre",
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
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                    }
                ]
            }
        }
    });