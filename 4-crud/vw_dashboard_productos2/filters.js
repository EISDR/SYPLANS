lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_vw_dashboard_productos2 = DSON.merge(CRUD_vw_dashboard_productos2,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: function () {return lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción'},
                        type: FILTER.types.string,
                        placeholder: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
                    },
                    {
                        key: 'resultado',
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
                        key: 'departamento',
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
                        key: 'estatus',
                        label: 'Estatus',
                        type: FILTER.types.string,
                        placeholder: 'Estatus'
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
                        type: FILTER.types.string,
                        placeholder: 'Presupuesto'
                    }
                ]
            }
        }
    });