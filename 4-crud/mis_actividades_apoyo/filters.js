CRUD_mis_actividades_apoyo = DSON.merge(CRUD_mis_actividades_apoyo,
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
                    ,
                    {
                        key: 'departamento',
                        label: 'Departamento',
                        type: FILTER.types.string,
                        placeholder: 'Departamento'
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