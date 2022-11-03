CRUD_marco_estrategicos_virtudes = DSON.merge(CRUD_marco_estrategicos_virtudes,
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
                        label: function () {
                            return MESSAGE.i('planificacion.titleMarcoEstrategicoVirtude');
                        },
                        type: FILTER.types.string,
                        placeholder: MESSAGE.i('planificacion.titleMarcoEstrategicoVirtude')
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