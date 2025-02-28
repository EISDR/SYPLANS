CRUD_mega_comentario_presupuesto_poa = DSON.merge(CRUD_mega_comentario_presupuesto_poa,
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
                ]
            }
        }
    });