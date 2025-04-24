CRUD_mega_objetivoestrategico = DSON.merge(CRUD_mega_objetivoestrategico,
    {
        table: {
            single: [
                {
                    "table": "eje_estrategico",
                    "base": "eje_estrategico_id",
                    "field": "id",
                    "columns": ["id", "nombre", "no_orden"]
                }
             ],
            multiple: {}
        }
    }
);