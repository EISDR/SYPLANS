CRUD_pesta_items = DSON.merge(CRUD_pesta_items,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                        maxlength: 1000
                    }
                ]
            }
        }
    });