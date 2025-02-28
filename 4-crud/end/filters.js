CRUD_end = DSON.merge(CRUD_end,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                        maxlength: 64
                    },
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                        maxlength: 255
                    }

                ]
            }
        }
    });