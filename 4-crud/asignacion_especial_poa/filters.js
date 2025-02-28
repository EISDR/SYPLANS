lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_asignacion_especial_poa = DSON.merge(CRUD_asignacion_especial_poa,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'descripción',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'depaid',
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
                        key: 'responsableid',
                        type: FILTER.types.relation,
                        table: 'usuario',
                        value: "id",
                        text: "item.nombre + ' ' + item.apellido",
                        query: {
                            limit: 0,
                            page: 1,
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
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'fecha_inicio',
                        type: FILTER.types.date,
                    },
                    {
                        key: 'fecha_fin',
                        type: FILTER.types.date,
                    },
                    {
                        key: 'estatus_id',
                        type: FILTER.types.relation,
                        value: "id",
                        table:'asignacion_especial_poa_estatus',
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            orderby: "id",
                            order: "asc",
                            distinct: false,
                            where: [],
                        }
                    },
                    {
                        key: 'razon_id',
                        type: FILTER.types.relation,
                        value: "id",
                        table:'razon',
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            orderby: "id",
                            order: "asc",
                            distinct: false,
                            where: [
                                {
                                    field: "tipo",
                                    value: 3
                                }
                            ],
                        }
                    }
                ]
            }
        }
    });