CRUD_pesta_items = DSON.merge(CRUD_pesta_items,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción',
                        maxlength: 1000
                    }
                ]
            }
        }
    });