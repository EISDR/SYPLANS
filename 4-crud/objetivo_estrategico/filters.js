CRUD_objetivo_estrategico = DSON.merge(CRUD_objetivo_estrategico,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no_orden',
                        label: function () {
                            return 'No. Objetivo';
                        },
                        type: FILTER.types.integer,
                        placeholder: 'No.'
                    },
                    {
                        key: 'nombre',
                        label: function () {
                            return MESSAGE.i('planificacion.titleObjetivoEstrategico');
                        },
                        type: FILTER.types.string,
                        placeholder: 'Objetivo Estratégico'
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción'
                    },
                    {
                        key: 'eje_estrategico_id',
                        label: 'Eje Estratégico',
                        type: FILTER.types.relation,
                        table: 'eje_estrategico',
                        value: "id",
                        text: "item.no_orden +' '+ item.nombre",
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
                    }
                ]
            }
        }
    });