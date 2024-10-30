CRUD_tipoMeta = DSON.merge(CRUD_tipoMeta,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'id',
                        label: 'ID',
                        type: FILTER.types.integer,
                        placeholder: 'ID'
                    },
                    {
                        key: 'nombre',
                        label: 'Nombre',
                        type: FILTER.types.string,
                        placeholder: 'Nombre'
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción'
                    },
                    {
                        key: 'comentario_obligatorio',
                        label: '¿Comentario Obligatorio?',
                        type: FILTER.types.bool,
                        placeholder: '¿Comentario Obligatorio?'
                    }
                ]
            }
        }
    });