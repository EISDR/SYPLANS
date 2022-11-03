CRUD_vw_foda_items = DSON.merge(CRUD_vw_foda_items,
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
                        key: 'descripcion',
                        label: 'Nombre',
                        type: FILTER.types.string,
                        placeholder: 'Nombre'
                    }
                ]
            }
        }
    });