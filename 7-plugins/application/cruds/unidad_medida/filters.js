CRUD_unidad_medida = DSON.merge(CRUD_unidad_medida,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: 'Nombre',
                        type: FILTER.types.string,
                        placeholder: 'Nombre',
                        maxlength: 255
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripcion',
                        type: FILTER.types.string,
                        maxlength: 200
                    }
                ]
            }
        }
    });