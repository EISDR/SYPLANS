CRUD_pei_admin = DSON.merge(CRUD_pei_admin,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: function () {
                            return "PEI"
                        },
                        type: FILTER.types.string,
                        placeholder: 'PEI'
                    },
                    {
                        key: 'periodo_desde',
                        label: 'Periodo Desde',
                        type: FILTER.types.datetime,
                        placeholder: 'Periodo Desde'
                    },
                    {
                        key: 'periodo_hasta',
                        label: 'Periodo Hasta',
                        type: FILTER.types.datetime,
                        placeholder: 'Periodo Hasta'
                    },
                    {
                        key: 'estatus_id',
                        label: 'Estatus',
                        type: FILTER.types.relation,
                        table: 'pei_estatus',
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
                        key: 'activo',
                        label: 'Activo',
                        type: FILTER.types.string,
                        placeholder: 'Activo'
                    }
                ]
            }
        }
    });