lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_mega_presupuesto_aprobado = DSON.merge(CRUD_mega_presupuesto_aprobado,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'departamento_id',
                        placeholder: 'Departamento',
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
                        key: 'asignado',
                        type: FILTER.types.decimal,
                    },
                    {
                        key: 'por_asignar',
                        type: FILTER.types.decimal,
                    },
                    {
                        key: 'estatus_id',
                        type: FILTER.types.relation,
                        table: 'presupuesto_aprobado_estatus',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        }
                    }
                ]
            }
        }
    });