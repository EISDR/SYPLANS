CRUD_eje_estrategico = DSON.merge(CRUD_eje_estrategico,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_orden',
                        label: 'No.',
                        type: FILTER.types.integer,
                        placeholder: 'No.',
                        maxlength: 15
                    },
                    {
                        key: 'nombre',
                        label: function () {
                            return MESSAGE.i('planificacion.titleEjeEstrategico');
                        },
                        type: FILTER.types.string,
                        placeholder: 'Eje Estratégico',
                        maxlength: 255
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción',
                        maxlength: 1000
                    }
                ]
            }
        }
    });