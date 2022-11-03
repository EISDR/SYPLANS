CRUD_mega_producto_adtividades = DSON.merge(CRUD_mega_producto_adtividades,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no2',
                        label: 'No',
                        type: FILTER.types.string,
                        placeholder: 'No'
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
                        key: 'presupuesto',
                        label: 'Presupuesto',
                        type: FILTER.types.string,
                        placeholder: 'Presupuesto'
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