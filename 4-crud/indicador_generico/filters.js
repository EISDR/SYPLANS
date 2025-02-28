CRUD_indicador_generico = DSON.merge(CRUD_indicador_generico,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'registro',
                        type: FILTER.types.relation,
                        table: 'pnpsp',
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
                        key: 'nombre_indicador',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'descripcion_indicador',
                        type: FILTER.types.string,
                        maxlength: 4000
                    },
                    {
                        key: 'fuente',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'metodo',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'tipo_meta',
                        type: FILTER.types.relation,
                        table: 'tipoMeta',
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
                        key: 'direccion_meta',
                        type: FILTER.types.relation,
                        table: 'direccionMeta',
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
                        key: 'linea',
                        type: FILTER.types.integer,
                        maxlength: 30
                    },
                    {
                        key: 'medio_verificacion',
                        type: FILTER.types.string,
                        maxlength: 255
                    }
                ]
            }
        }
    });
