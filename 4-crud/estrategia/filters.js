CRUD_estrategia = DSON.merge(CRUD_estrategia,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_eje',
                        type: FILTER.types.integer,
                        maxlength: 15
                    },
                    {
                        key: 'no_objetivo',
                        type: FILTER.types.integer,
                        maxlength: 15
                    },
                    {
                        key: 'no_estrategia',
                        type: FILTER.types.integer,
                        maxlength: 15
                    },
                    {
                        key: 'estrategia',
                        type: FILTER.types.string,
                        maxlength: 255
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
                        key: 'objetivo_estrategico_id',
                        type: FILTER.types.relation,
                        table: 'vw_objetivo_estrategico',
                        value: "id",
                        text: "item.no_objetivo + ' ' + item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei_id" +
                                    "",
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
