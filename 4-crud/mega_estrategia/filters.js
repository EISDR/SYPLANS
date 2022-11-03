CRUD_mega_estrategia = DSON.merge(CRUD_mega_estrategia,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_eje',
                        label: function () {
                            return "No. eje estratégico";
                        },
                        type: FILTER.types.integer,
                        placeholder: 'No. eje estratégico'
                    },
                    {
                        key: 'no_objetivo',
                        label: function () {
                            return "No.objetivo estratégico";
                        },
                        type: FILTER.types.integer,
                        placeholder: 'No. objetivo estratégico'
                    },
                    {
                        key: 'no_estrategia',
                        label: function () {
                            return "No. estrategia";
                        },
                        type: FILTER.types.integer,
                        placeholder: 'No. estrategia'
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
                        }
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
                                "field": "pei_id",
                                "value": new SESSION().current() ? new SESSION().current().pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        }
                    },
                    {
                        key: 'estrategia',
                        label: 'Estrategia',
                        type: FILTER.types.string,
                        placeholder: 'Estrategia'
                    }
                ]
            }
        }
    });