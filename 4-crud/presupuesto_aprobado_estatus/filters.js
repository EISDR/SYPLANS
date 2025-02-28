CRUD_presupuesto_aprobado_estatus = DSON.merge(CRUD_presupuesto_aprobado_estatus,
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
                    ,
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                    }
                ]
            }
        }
    });