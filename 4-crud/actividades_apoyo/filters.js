lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_actividades_apoyo = DSON.merge(CRUD_actividades_apoyo,
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
                        key: 'departamento',
                        type: FILTER.types.relation,
                        value: "id",
                        table: 'departamento',
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
                        key: 'responsable',
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
                        type: FILTER.types.string,
                    },
                    {
                        key: 'fecha_fin',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'bienes_permiso',
                        type: FILTER.types.relation,
                        table: 'vw_bienes_servicio',
                        value: "id",
                        text: "item.id",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: true
                        },
                    },
                    {
                        key: 'bienes_permiso_nombre',
                        type: FILTER.types.relation,
                        table: 'vw_bienes_servicio',
                        value: "nombre",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: true
                        },
                    },
                ]
            }
        }
    });