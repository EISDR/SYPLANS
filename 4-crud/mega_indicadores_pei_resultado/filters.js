CRUD_mega_indicadores_pei_resultado = DSON.merge(CRUD_mega_indicadores_pei_resultado,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'tipo_meta',
                        type: FILTER.types.relation,
                        table: 'tipoMeta',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'direccion_meta',
                        type: FILTER.types.relation,
                        table: 'direccionMeta',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'linea_base',
                        type: FILTER.types.string,
                    }
                ]
            }
        }
    });