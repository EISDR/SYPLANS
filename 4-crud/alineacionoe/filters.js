CRUD_alineacionoe = DSON.merge(CRUD_alineacionoe,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombreObjetivo',
                        label: 'Nombre',
                        type: FILTER.types.string,
                        placeholder: 'Nombre'
                    },
                    {
                        key:'descipcionObejtivo',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción'
                    }
                ]
            }
        }
    });