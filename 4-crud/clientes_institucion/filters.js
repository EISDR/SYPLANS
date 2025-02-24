CRUD_clientes_institucion = DSON.merge(CRUD_clientes_institucion,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                        maxlength: 64
                    },
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                        maxlength: 800
                    },
                    // {
                    //     key: 'compromisos',
                    //     label: 'Compromiso Institucional',
                    //     type: FILTER.types.string,
                    //     placeholder: 'Compromiso Institucional',
                    //     maxlength: 10000
                    // },
                    {
                        key: 'compromiso_id',
                        type: FILTER.types.relation,
                        multi: {
                            to: 'cliente',
                            table: 'vw_clientes_compromisos',
                            adjacent: 'id'
                        },
                        table: 'vw_clientes_compromisos',
                        value: "id",
                        text: "item.compromiso",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei",
                                "value": new SESSION().current() ? new SESSION().current().pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: true
                        },
                    },
                ]
            }
        }
    });