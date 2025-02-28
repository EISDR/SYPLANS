CRUD_departamento_poa = DSON.merge(CRUD_departamento_poa,
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