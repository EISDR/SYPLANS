lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_indicador_producto = DSON.merge(CRUD_indicador_producto,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'departamento',
                        label: 'Departamento',
                        placeholder: 'Departamento',
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
                        key: 'no',
                        label: 'No. Resultado Esperado',
                        type: FILTER.types.integer,
                        placeholder: 'No. Resultado Esperado',
                        maxlength: 15
                    },
                    {
                        key: 'no_producto',
                        label:  lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción',
                        type: FILTER.types.integer,
                        placeholder: lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción',
                        maxlength: 15
                    },
                    {
                        key: 'nombre_indicador',
                        label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        type: FILTER.types.string,
                        placeholder: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        maxlength: 255
                    },
                    {
                        key: 'id_producto',
                        label:  lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
                        type: FILTER.types.relation,
                        table: 'vw_productos_poa_detalles',
                        value: "id",
                        text: "item.no1 + ' ' + item.producto",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [
                                {
                                "field": "poa_id",
                                "value": lachechon ? lachechon.poa_id : -1
                            }
                            ],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'actividades_poa',
                        label: 'Actividad',
                        type: FILTER.types.relation,
                        table: 'vw_actividades_poa',
                        value: "id",
                        text: "item.no2 + ' ' + item.actividad",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [
                                {
                                    "field": "poa",
                                    "value": lachechon ? lachechon.poa_id : -1
                                }
                            ],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'descripcion_indicador',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción',
                        maxlength: 4000
                    },
                    {
                        key: 'fuente',
                        label: 'Fuente',
                        type: FILTER.types.string,
                        placeholder: 'Fuente',
                        maxlength: 255
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
                        placeholder: 'Método Cálculo',
                        maxlength: 255
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
                        placeholder: 'Línea Base',
                        maxlength: 30
                    },
                    {
                        key: 'medio_verificacion',
                        label: 'Medio de Verificación',
                        type: FILTER.types.string,
                        placeholder: 'Medio Verificación',
                        maxlength: 255
                    },
                    {
                        key: 'id_resultado',
                        label: 'Resultado esperado',
                        type: FILTER.types.relation,
                        table: 'vw_resultado',
                        value: "id",
                        text: "item.resultado_esperado",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [
                                {
                                "field": "pei",
                                "value": lachechon ? lachechon.pei_id : -1
                            }
                            ],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                ]
            }
        }
    });
