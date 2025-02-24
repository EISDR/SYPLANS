CRUD_eje_estrategico = DSON.merge(CRUD_eje_estrategico,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_orden',
                        type: FILTER.types.integer,
                        maxlength: 15
                    },
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                        maxlength: 1000
                    }
                ]
            }
        }
    });