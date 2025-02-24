CRUD_marco_estrategico_valores = DSON.merge(CRUD_marco_estrategico_valores,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                        maxlength: 255
                    }
                    ,
                    {
                        key: 'descripcion',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'conductas',
                        type: FILTER.types.relation,
                        multi: {
                            to: 'marco_estrategico_valor',
                            table: 'vw_marco_estrategico_virtudes',
                            adjacent: 'id'
                        },
                        table: 'vw_marco_estrategico_virtudes',
                        value: "id",
                        text: "item.nombre",
                        //storage:true,
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                field: "pei",
                                value: new SESSION().current() ? new SESSION().current().pei_id : -1
                            }],
                            orderby: "nombre",
                            order: "asc",
                            distinct: true
                        },
                    },
                ]
            }
        }
    });
