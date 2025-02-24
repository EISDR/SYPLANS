CRUD_resultado = DSON.merge(CRUD_resultado,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'resultado_esperado',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'perspectiva',
                        type: FILTER.types.relation,
                        table: 'perspectiva',
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
                    }
                ]
            }
        }
    });