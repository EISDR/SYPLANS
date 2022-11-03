CRUD_resultado = DSON.merge(CRUD_resultado,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'resultado_esperado',
                        label: 'Resultado',
                        type: FILTER.types.string,
                        placeholder: 'Resultado'
                    },
                    {
                        key: 'descripcion',
                        label: 'Resultado',
                        type: FILTER.types.string,
                        placeholder: 'Resultado'
                    },
                    {
                        key: 'perspectiva',
                        label: 'Perspectiva',
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