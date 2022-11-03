CRUD_indicador_generico = DSON.merge(CRUD_indicador_generico,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'registro',
                        label: 'Registro',
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
                        label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        type: FILTER.types.string,
                        placeholder: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        maxlength: 255
                    },
                    {
                        key: 'descripcion_indicador',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción',
                        maxlength: 4000
                    },
                    {
                        key: 'fuente',
                        label: 'Fuente',
                        type: FILTER.types.string,
                        placeholder: 'Fuente',
                        maxlength: 255
                    },
                    {
                        key: 'metodo',
                        label: 'Método Cálculo',
                        type: FILTER.types.string,
                        placeholder: 'Método Cálculo',
                        maxlength: 255
                    },
                    {
                        key: 'tipo_meta',
                        label: 'Tipo de meta',
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
                        label: 'Dirección de la meta',
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
                        label: 'Línea Base',
                        type: FILTER.types.integer,
                        placeholder: 'Línea Base',
                        maxlength: 30
                    },
                    {
                        key: 'medio_verificacion',
                        label: 'Medio de Verificación',
                        type: FILTER.types.string,
                        placeholder: 'Medio Verificación',
                        maxlength: 255
                    }
                ]
            }
        }
    });
