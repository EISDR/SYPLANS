CRUD_objetivo = DSON.merge(CRUD_objetivo,
    {
        table: {
            single: [
                {
                    "table": "end",
                    "base": "end",
                    "field": "id",
                    "columns": ["id", "nombre"]
                }
            ],
            multiple: {}
        }
    }
);