CRUD_foda_items = DSON.merge(CRUD_foda_items,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'descripción',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción',
                        maxlength: 1000
                    }
                ]
            }
        }
    });