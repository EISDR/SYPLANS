CRUD_pnpsp = DSON.merge(CRUD_pnpsp,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: function(){ return MESSAGE.i('planificacion.titlePNPSP'); },
                        type: FILTER.types.string,
                        placeholder:  MESSAGE.i('planificacion.titlePNPSP')
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción'
                    }
                ]
            }
        }
    });