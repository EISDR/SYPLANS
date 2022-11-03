CRUD_dashboard_indicadores = DSON.merge(CRUD_dashboard_indicadores,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'id',
                        label: 'ID',
                        type: FILTER.types.integer,
                        placeholder: 'ID'
                    }
                ]
            }
        }
    });
