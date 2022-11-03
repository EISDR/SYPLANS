CRUD_vw_departamento_not_exists_presupuesto = DSON.merge(CRUD_vw_departamento_not_exists_presupuesto,
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
                    }
                ]
            }
        }
    });