CRUD_mega_indicadores_pei_resultado = DSON.merge(CRUD_mega_indicadores_pei_resultado,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: 'Indicador PEI',
                        type: FILTER.types.string,
                        placeholder: 'Indicador PEI'
                    },
                    {
                        key: 'tipo_meta',
                        label: 'Tipo Meta',
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
                        label: "Dirección Meta",
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
                        key: 'linea_base',
                        label: "Línea Base",
                        type: FILTER.types.string,
                        placeholder: "Línea Base",
                    }
                ]
            }
        }
    });