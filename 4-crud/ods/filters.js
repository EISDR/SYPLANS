CRUD_ods = DSON.merge(CRUD_ods,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: function() {return MESSAGE.i('planificacion.titleODS'); },
                        type: FILTER.types.string,
                        placeholder: 'Nombre'
                    }
                    ,
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