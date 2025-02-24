CRUD_foda_items = DSON.merge(CRUD_foda_items,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'descripción',
                        type: FILTER.types.string,
                        maxlength: 1000
                    }
                ]
            }
        }
    });