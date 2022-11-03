CRUD_actividades_poa = DSON.merge(CRUD_actividades_poa,
    {
        table: {
            single: [
                {
                    "table": "departamento",
                    "base": "departamento",
                    "field": "id",
                    "columns": ["id", "nombre"]
                },
                {
                    "table": "productos_poa",
                    "base": "producto",
                    "field": "id",
                    "columns": ["id", "nombre"]
                }
            ],
            multiple: {}
        }
    }
);
