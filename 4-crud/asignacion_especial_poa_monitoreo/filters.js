CRUD_asignacion_especial_poa_monitoreo = DSON.merge(CRUD_asignacion_especial_poa_monitoreo,
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
                        key: 'departamento_solicitante',
                        label: 'Departamento Solicitante',
                        type: FILTER.types.string,
                        placeholder: 'Departamento Solicitante'
                    },
                    {
                        key: 'responsable',
                        label: 'Responsable',
                        type: FILTER.types.string,
                        placeholder: 'Responsable'
                    },
                    {
                        key: 'comentario',
                        label: 'Comentario',
                        type: FILTER.types.string,
                        placeholder: 'Comentario'
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