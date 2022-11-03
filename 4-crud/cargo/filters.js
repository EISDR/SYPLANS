CRUD_cargo = DSON.merge(CRUD_cargo,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: 'Nombre',
                        type: FILTER.types.string,
                        placeholder: 'Nombre',
                        maxlength: 64
                    }
                    ,
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción',
                        maxlength: 225
                    }
                ]
            }
        }
    });