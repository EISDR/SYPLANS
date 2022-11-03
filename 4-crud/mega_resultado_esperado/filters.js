CRUD_mega_resultado_esperado = DSON.merge(CRUD_mega_resultado_esperado,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_eje',
                        label: 'No. eje estratégico',
                        type: FILTER.types.integer,
                        placeholder: 'No. eje estratégico'
                    },
                    {
                        key: 'no_objetivo',
                        label: 'No. objetivo estratégico',
                        type: FILTER.types.integer,
                        placeholder: 'No. objetivo estratégico'
                    },
                    {
                        key: 'no_estrategia',
                        label: 'No. Estrategia',
                        type: FILTER.types.integer,
                        placeholder: 'No. Estrategia'
                    },
                    {
                        key: 'no_resultado',
                        label: 'No. Resultado',
                        type: FILTER.types.integer,
                        placeholder: 'No. Resultado'
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
                        label: 'Objetivo estratégico',
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
                        key: 'estrategia_id',
                        label: 'Estrategias',
                        type: FILTER.types.relation,
                        table: 'vw_estrategia',
                        value: "id",
                        text: "item.no_estrategia + ' ' + item.estrategia",
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
                        key: 'resultado_nombre',
                        label: function(){
                            return 'Resultados Esperados'
                        },
                        type: FILTER.types.string,
                        placeholder: 'Resultados Esperados'
                    }
                ]
            }
        }
    });