CRUD_mega_indicadores_pei = DSON.merge(CRUD_mega_indicadores_pei,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_eje',
                        label: function () {
                            return "No. eje estratégico";
                        },
                        type: FILTER.types.string,
                        placeholder: 'No. eje estratégico'
                    },
                    {
                        key: 'no_objetivo',
                        label: function () {
                            return "No.objetivo estratégico";
                        },
                        type: FILTER.types.string,
                        placeholder: 'No. objetivo estratégico'
                    },
                    {
                        key: 'no_estrategia',
                        label: function () {
                            return "No. estrategia";
                        },
                        type: FILTER.types.string,
                        placeholder: 'No. estrategia'
                    },
                    {
                        key: 'no_resultado',
                        label: function () {
                            return "No. Resultado";
                        },
                        type: FILTER.types.string,
                        placeholder: 'No. Resultado'
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
                                "value": new SESSION().current() ? new SESSION().current().pei_id : -1
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
                                "value": new SESSION().current() ? new SESSION().current().pei_id : -1
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
                                "value": new SESSION().current() ? new SESSION().current().pei_id : -1
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
                                "value": new SESSION().current() ? new SESSION().current().pei_id : -1
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
                ]
            }
        }
    });