lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_mega_producto = DSON.merge(CRUD_mega_producto,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_eje',
                        label: 'No. eje estratégico',
                        type: FILTER.types.integer,
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
                        type: FILTER.types.integer,
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
                        type: FILTER.types.integer,
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
                        label: function () {
                            return "No. Resultado esperado";
                        },
                        type: FILTER.types.integer,
                        placeholder: 'No. Resultado esperado'
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
                        label: function () {
                            return lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción';
                        },
                        type: FILTER.types.integer,
                        placeholder: lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción'
                    },
                    {
                        key: 'producto',
                        label: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
                        type: FILTER.types.string,
                        placeholder: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
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