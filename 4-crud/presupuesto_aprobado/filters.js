lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_presupuesto_aprobado = DSON.merge(CRUD_presupuesto_aprobado,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'departamento_id',
                        type: FILTER.types.relation,
                        value: "id",
                        table:'departamento',
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            orderby: "id",
                            order: "asc",
                            distinct: false,
                            where: [
                                {
                                    "field": "compania",
                                    "value": lachechon ? lachechon.compania_id : -1
                                },
                                {
                                    "field": "institucion",
                                    "operator": lachechon.institucion_id ? "=" : "is",
                                    "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                                }
                            ],
                        }
                    },
                    {
                        key: 'valor',
                        type: FILTER.types.decimal,
                        maxlength: 20
                    },
                    {
                        key: 'presupuesto_restante',
                        type: FILTER.types.decimal,
                        maxlength: 20
                    },
                    {
                        key: 'presupuesto_asignado',
                        type: FILTER.types.decimal,
                        maxlength: 20
                    },
                    {
                        key: 'presupuesto_liberado',
                        type: FILTER.types.decimal,
                        maxlength: 20
                    }
                ]
            }
        }
    });