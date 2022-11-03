CRUD_configuration_wizard = DSON.merge(CRUD_configuration_wizard,
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