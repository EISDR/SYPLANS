CRUD_poa_admin = DSON.merge(CRUD_poa_admin,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: function () {
                            return "POA"
                        },
                        type: FILTER.types.string,
                        placeholder: 'POA'
                    },
                    {
                        key: 'periodo_poa',
                        label: function () {
                            return "Periodo POA"
                        },
                        type: FILTER.types.string,
                        placeholder: 'Periodo POA'
                    },
                    {
                        key: 'pei_id',
                        label: 'Periodo PEI',
                        type: FILTER.types.relation,
                        table: 'pei',
                        value: "id",
                        text: "item.nombre + ' ' + item.periodo_desde + ' - ' + item.periodo_hasta",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                field: "compania",
                                value: new SESSION().current() ? new SESSION().current().compania_id : -1
                            }],
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
                    },
                    {
                        key: 'monitoreo_id',
                        label: 'Monitoreo',
                        type: FILTER.types.relation,
                        table: 'poa_monitoreo',
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

                ]
            }
        }
    });