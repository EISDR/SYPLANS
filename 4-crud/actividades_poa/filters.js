lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_actividades_poa = DSON.merge(CRUD_actividades_poa,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no1',
                        type: FILTER.types.integer,
                        maxlength: 15
                    },
                    {
                        key: 'no2',
                        type: FILTER.types.integer,
                        maxlength: 15
                    },
                    {
                        key: 'departamento',
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
                        key: 'producto',
                        type: FILTER.types.relation,
                        table: 'vw_productos_poa_detalles',
                        value: "id",
                        text: "item.no1 + ' ' + item.producto",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "poa_id",
                                "value": lachechon ? lachechon.poa_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'actividad',
                        type: FILTER.types.string,
                        maxlength: 64
                    },
                    {
                        key: 'responsable_id',
                        type: FILTER.types.relation,
                        table: 'usuario',
                        value: "id",
                        text: "item.nombre + ' ' + item.apellido",
                        query: {
                            limit: 0,
                            page: 1,
                            where:[
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
                        key: 'presupuesto',
                        type: FILTER.types.decimal,
                        maxlength: 20
                    },
                    {
                        key: 'estatus_actividad',
                        type: FILTER.types.relation,
                        table: 'auditoria_programa_plan_estatus',
                        value: "code",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [
                                {
                                    "field": "entidad",
                                    "value": 10
                                }
                            ],
                            orderby: "orden",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'tipo_inversion',
                        type: FILTER.types.relation,
                        table: 'tipo_inversion',
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
                    }
                ]
            }
        }
    });