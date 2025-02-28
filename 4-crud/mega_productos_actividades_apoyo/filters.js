CRUD_mega_productos_actividades_apoyo = DSON.merge(CRUD_mega_productos_actividades_apoyo,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'actividad_apoyo',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'area_apoyo',
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