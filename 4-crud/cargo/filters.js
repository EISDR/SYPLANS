CRUD_cargo = DSON.merge(CRUD_cargo,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                        maxlength: 64
                    }
                    ,
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                        maxlength: 225
                    }
                ]
            }
        }
    });