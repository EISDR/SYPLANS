lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_actividades_poa_monitoreo = DSON.merge(CRUD_actividades_poa_monitoreo,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no1',
                        label: function () {
                            return lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción';
                        },
                        type: FILTER.types.integer,
                        placeholder: lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción',
                        maxlength: 15
                    },
                    {
                        key: 'no2',
                        label: function () {
                            return 'No. Actividad';
                        },
                        type: FILTER.types.integer,
                        placeholder: 'No. Actividad',
                        maxlength: 15
                    },
                    {
                        key: 'producto',
                        label: 'Producto',
                        type: FILTER.types.relation,
                        table: 'productos_poa',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "poa",
                                "value": lachechon ? lachechon.poa_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        }
                    },
                    {
                        key: 'actividad',
                        label: 'Actividad',
                        type: FILTER.types.string,
                        placeholder: 'Actividad',
                        maxlength: 255
                    },
                    {
                        key: 'responsable_id',
                        label: 'Responsable',
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
                        }
                    },
                    {
                        key: 'fecha_inicio',
                        label: 'Fecha Inicio',
                        type: FILTER.types.datetime,
                        placeholder: 'Fecha Inicio'
                    },
                    {
                        key: 'fecha_fin',
                        label: 'Fecha Fin',
                        type: FILTER.types.datetime,
                        placeholder: 'Fecha Fin'
                    },
                    {
                        key: 'presupuesto',
                        label: 'Presupuesto',
                        type: FILTER.types.decimal,
                        placeholder: 'Presupuesto',
                        maxlength: 20
                    },
                    {
                        key: 'presupuesto_consumido',
                        label: 'Presupuesto Consumido',
                        type: FILTER.types.decimal,
                        placeholder: 'Presupuesto Consumido',
                        maxlength: 20
                    },
                    {
                        key: 'estatus_actividad',
                        label: 'Estatus',
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
                        key: 'razon',
                        label: 'Razón',
                        type: FILTER.types.relation,
                        table: 'razon',
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