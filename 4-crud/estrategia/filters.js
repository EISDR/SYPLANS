CRUD_estrategia = DSON.merge(CRUD_estrategia,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_eje',
                        label: 'No. Eje estratégico',
                        type: FILTER.types.integer,
                        placeholder: 'No. Eje estratégico',
                        maxlength: 15
                    },
                    {
                        key: 'no_objetivo',
                        label: 'No. Objetivo',
                        type: FILTER.types.integer,
                        placeholder: 'No. Objetivo',
                        maxlength: 15
                    },
                    {
                        key: 'no_estrategia',
                        label: 'No. Estrategia',
                        type: FILTER.types.integer,
                        placeholder: 'No. Estrategia',
                        maxlength: 15
                    },
                    {
                        key: 'estrategia',
                        label: 'Estrategia',
                        type: FILTER.types.string,
                        placeholder: 'Estrategia',
                        maxlength: 255
                    },
                    {
                        key: 'eje_estrategico_id',
                        label: 'Eje Estratégico',
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
                        label: 'Objetivo Estratégico',
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
