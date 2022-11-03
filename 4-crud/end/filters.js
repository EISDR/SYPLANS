CRUD_end = DSON.merge(CRUD_end,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: function() { return MESSAGE.i('planificacion.titleEjeEnd'); },
                        type: FILTER.types.string,
                        placeholder: MESSAGE.i('planificacion.titleEjeEnd'),
                        maxlength: 64
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción',
                        maxlength: 255
                    }

                ]
            }
        }
    });