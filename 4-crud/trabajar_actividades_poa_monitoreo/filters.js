CRUD_trabajar_actividades_poa_monitoreo = DSON.merge(CRUD_trabajar_actividades_poa_monitoreo,
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
                    },
                    {
                        key: 'actividad',
                        label: 'Actividad',
                        type: FILTER.types.string,
                        placeholder: 'Actividad'
                    },
                    {
                        key: 'responsable',
                        label: 'Responsable',
                        type: FILTER.types.string,
                        placeholder: 'Responsable'
                    },
                    {
                        key: 'comentario',
                        label: 'Comentatio',
                        type: FILTER.types.string,
                        placeholder: 'Comentatio'
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
                    },
                ]
            }
        }
    });