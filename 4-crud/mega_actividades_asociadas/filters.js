lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_mega_actividades_asociadas = DSON.merge(CRUD_mega_actividades_asociadas,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_eje',
                        label: 'No. eje estratégico',
                        type: FILTER.types.string,
                        placeholder: 'No. eje estratégico'
                    },
                    {
                        key: 'id_eje_estrategico',
                        label: 'Eje Estratégico',
                        type: FILTER.types.relation,
                        table: 'eje_estrategico',
                        value: "id",
                        text: "item.no_orden + ' ' + item.nombre",
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
                        key: 'no_objetivo',
                        label: 'No. objetivo estratégico',
                        type: FILTER.types.string,
                        placeholder: 'No. objetivo estratégico'
                    },
                    {
                        key: 'id_objetivo_estrategico',
                        label: 'Objetivo Estratégico',
                        type: FILTER.types.relation,
                        table: 'vw_objetivo_estrategico',
                        value: "id",
                        text: "item.no_objetivo + ' ' + item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei_id",
                                "value": lachechon ? lachechon.pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'no_estrategia',
                        label: 'No. Estrategia',
                        type: FILTER.types.string,
                        placeholder: 'No. Estrategia'
                    },
                    {
                        key: 'id_estrategia',
                        label: 'Estrategia',
                        type: FILTER.types.relation,
                        table: 'vw_estrategia',
                        value: "id",
                        text: "item.no_estrategia + ' ' + item.estrategia",
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
                        key: 'no2',
                        label: 'No. Resultado esperado',
                        type: FILTER.types.string,
                        placeholder: 'No. Resultado esperado'
                    },
                    {
                        key: 'id_resultado_esperado',
                        label: 'Resultado Esperado',
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
                        label:  lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción',
                        type: FILTER.types.integer,
                        placeholder: lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción',
                    },
                    {
                        key: 'producto',
                        label: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
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
                        key: 'no2',
                        label: 'No. Actividad',
                        type: FILTER.types.integer,
                        placeholder: 'No. Actividad'
                    },
                    {
                        key: 'actividad_poa',
                        label: 'Actividad',
                        placeholder: 'Actividad',
                        type: FILTER.types.relation,
                        value: "id",
                        table:'vw_actividades_poa',
                        text: "item.no2 + ' ' + item.actividad",
                        query: {
                            limit: 0,
                            page: 1,
                            orderby: "id",
                            order: "asc",
                            distinct: false,
                            where: [{
                                "field": "poa",
                                "value": lachechon ? lachechon.poa_id : -1
                            }],
                        }
                    },
                    {
                        key: 'presupuesto',
                        label: 'Presupuesto',
                        type: FILTER.types.decimal,
                        placeholder: 'Presupuesto'
                    },
                    {
                        key: 'nombre',
                        label: function (row) {
                            return MESSAGE.i('planificacion.titleTablaActividadApoyo');
                        },
                        type: FILTER.types.string,
                        placeholder: 'Actividad de apoyo'
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción'
                    },
                    {
                        key: 'departamento',
                        label: 'Área de apoyo',
                        placeholder: 'Área de apoyo',
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
                        key: 'fecha_inicio',
                        label: 'Fecha Inicio',
                        type: FILTER.types.date,
                        placeholder: 'Fecha Inicio'
                    },
                    {
                        key: 'fecha_fin',
                        label: 'Fecha Fin',
                        type: FILTER.types.date,
                        placeholder: 'Fecha Fin'
                    },
                ]
            }
        }
    });