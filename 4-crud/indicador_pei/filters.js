lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_indicador_pei = DSON.merge(CRUD_indicador_pei,
    {
        table: {
            filters: {
                columns: [
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
                        key: 'nombre',
                        label: function () {
                            return MESSAGE.i('planificacion.titleTablaIndicadorPEI');
                        },
                        type: FILTER.types.string,
                        placeholder: 'Estrategia'
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción'
                    },
                    {
                        key: 'fuente',
                        label: 'Fuente',
                        type: FILTER.types.string,
                        placeholder: 'Fuente'
                    },
                    {
                        key: 'desagregacion_demografica_geografia',
                        label: 'Desagregación Demográfica Geográfica',
                        type: FILTER.types.string,
                        placeholder: 'Desagregación Demográfica Geográfica'
                    },
                    {
                        key: 'metodo',
                        label: 'Método Cálculo',
                        type: FILTER.types.string,
                        placeholder: 'Método Cálculo'
                    },
                    {
                        key: 'tipo_meta',
                        label: 'Tipo de meta',
                        type: FILTER.types.relation,
                        table: 'tipoMeta',
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
                        key: 'direccion_meta',
                        label: 'Dirección de la meta',
                        type: FILTER.types.relation,
                        table: 'direccionMeta',
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
                        key: 'linea',
                        label: 'Línea Base',
                        type: FILTER.types.integer,
                        placeholder: 'Línea Base'
                    },
                    {
                        key: 'medio',
                        label: 'Medio Verificación',
                        type: FILTER.types.string,
                        placeholder: 'Medio Verificación'
                    },
                    {
                        key: 'unidad_ejecutora',
                        label: 'Unidad Ejecutora',
                        placeholder: 'Unidad Ejecutora',
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
                    }
                ]
            }
        }
    });