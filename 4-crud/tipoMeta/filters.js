CRUD_tipoMeta = DSON.merge(CRUD_tipoMeta,
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
                        key: 'descripcion',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'comentario_obligatorio',
                        type: FILTER.types.bool,
                    }
                ]
            }
        }
    });