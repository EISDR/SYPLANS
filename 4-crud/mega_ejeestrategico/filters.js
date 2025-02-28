CRUD_mega_ejeestrategico = DSON.merge(CRUD_mega_ejeestrategico,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_orden',
                        type: FILTER.types.integer,
                    },
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                    }
                ]
            }
        }
    });