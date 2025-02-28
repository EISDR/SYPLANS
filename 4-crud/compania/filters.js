CRUD_compania = DSON.merge(CRUD_compania,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'id',
                        type: FILTER.types.integer,
                    },
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'tipo_institucion__id',
                        type: FILTER.types.relation,
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
                        key: 'usuario__id',
                        type: FILTER.types.relation,
                        table: 'usuario',
                        value: "id",
                        text: "item.nombre + ' ' + item.apellido",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                ]
            }
        }
    });