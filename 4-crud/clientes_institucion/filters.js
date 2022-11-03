CRUD_clientes_institucion = DSON.merge(CRUD_clientes_institucion,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: function () {
                            return MESSAGE.i('planificacion.titleClienteNombre');
                        },
                        type: FILTER.types.string,
                        placeholder: MESSAGE.i('planificacion.titleClienteNombre'),
                        maxlength: 64
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción',
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
                        label: 'Compromiso Institucional',
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