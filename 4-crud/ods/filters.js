CRUD_ods = DSON.merge(CRUD_ods,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                    }
                    ,
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                    }
                ]
            }
        }
    });