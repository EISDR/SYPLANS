CRUD_mega_producto_adtividades = DSON.merge(CRUD_mega_producto_adtividades,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no2',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'actividad',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'responsable',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'presupuesto',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'fecha_inicio',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'fecha_fin',
                        type: FILTER.types.string,
                    }
                ]
            }
        }
    });