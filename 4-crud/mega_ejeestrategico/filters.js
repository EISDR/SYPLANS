CRUD_mega_ejeestrategico = DSON.merge(CRUD_mega_ejeestrategico,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_orden',
                        label: 'No.',
                        type: FILTER.types.integer,
                        placeholder: 'No.'
                    },
                    {
                        key: 'nombre',
                        label: 'Eje estratégico',
                        type: FILTER.types.string,
                        placeholder: 'Eje estratégico'
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción'
                    }
                ]
            }
        }
    });