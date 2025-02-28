CRUD_departamento = DSON.merge(CRUD_departamento,
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