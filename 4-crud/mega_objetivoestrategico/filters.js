CRUD_mega_objetivoestrategico = DSON.merge(CRUD_mega_objetivoestrategico,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_orden',
                        label: function () {
                            return "No. eje estratégico";
                        },
                        type: FILTER.types.integer,
                        placeholder: 'No. eje estratégico'
                    },
                    {
                        key: 'no_orden',
                        label: function () {
                            return "No.";
                        },
                        type: FILTER.types.integer,
                        placeholder: 'No.'
                    },
                    {
                        key: 'nombre',
                        label: 'Nombre',
                        type: FILTER.types.string,
                        placeholder: 'Nombre'
                    },
                    {
                        key: 'eje_estrategico_id',
                        label: function () {
                            return "Eje estratégico";
                        },
                        type: FILTER.types.relation,
                        table: 'eje_estrategico',
                        value: "id",
                        text: "item.no_orden + ' ' + item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei",
                                "value": new SESSION().current() ? new SESSION().current().pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
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