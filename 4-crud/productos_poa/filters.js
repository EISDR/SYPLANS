lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_productos_poa = DSON.merge(CRUD_productos_poa,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no2',
                        label: function () { return 'No. Resultado'},
                        type: FILTER.types.integer,
                        placeholder: 'No. Resultado',
                        maxlength: 15
                    },
                    {
                        key: 'id_resultado',
                        label: 'Resultado esperado',
                        type: FILTER.types.relation,
                        table: 'vw_resultado',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei",
                                "value": lachechon ? lachechon.pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'no1',
                        label: function () { return lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción'},
                        type: FILTER.types.integer,
                        placeholder: lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción',
                        maxlength: 15
                    },
                    {
                        key: 'producto',
                        label: function () { return lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción'},
                        type: FILTER.types.string,
                        placeholder: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
                        maxlength: 255
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción',
                        maxlength: 1000
                    },
                    {
                        key: 'id_departamento',
                        label: 'Departamento',
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
                        key: 'estado_producto_id',
                        label: 'Estado',
                        type: FILTER.types.relation,
                        table: 'productos_poa_status',
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
                        key: 'fecha inicio',
                        label: 'Fecha Inicio',
                        type: FILTER.types.date,
                        placeholder: 'Fecha Inicio'
                    },
                    {
                        key: 'fecha fin',
                        label: 'Fecha Fin',
                        type: FILTER.types.date,
                        placeholder: 'Fecha Fin'
                    }
                ]
            }
        }
    });