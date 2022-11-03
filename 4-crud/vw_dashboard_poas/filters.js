CRUD_vw_dashboard_poas = DSON.merge(CRUD_vw_dashboard_poas,
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