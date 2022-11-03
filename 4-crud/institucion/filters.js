CRUD_institucion = DSON.merge(CRUD_institucion,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'id',
                        label: 'id',
                        type: FILTER.types.integer,
                        placeholder: 'id'
                    },
                    {
                        key: 'nombre',
                        label: 'Nombre',
                        type: FILTER.types.string,
                        placeholder: 'Nombre'
                    },
                    {
                        key: 'tipo_institucion__id',
                        label: 'Tipo Insitución',
                        type: FILTER.types.relation,
                        table: 'tipo_institucion',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'usuario__id',
                        label: 'Responsable',
                        type: FILTER.types.relation,
                        table: 'usuario',
                        value: "id",
                        text: "item.nombre + ' ' + item.apellido",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                ]
            }
        }
    });
