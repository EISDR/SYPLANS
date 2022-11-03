CRUD_mega_productos_actividades_apoyo = DSON.merge(CRUD_mega_productos_actividades_apoyo,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'actividad_apoyo',
                        label: 'Actividad de Apoyo',
                        type: FILTER.types.string,
                        placeholder: 'Actividad de Apoyo'
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción'
                    },
                    {
                        key: 'area_apoyo',
                        label: 'Área de Ápoyo',
                        type: FILTER.types.string,
                        placeholder: 'Área de Ápoyo'
                    },
                    {
                        key: 'fecha_inicio',
                        label: 'Fecha Inicio',
                        type: FILTER.types.string,
                        placeholder: 'Fecha Inicio'
                    },
                    {
                        key: 'fecha_fin',
                        label: 'Fecha Fin',
                        type: FILTER.types.string,
                        placeholder: 'Fecha Fin'
                    }
                ]
            }
        }
    });