CRUD_actividades_poa_monitoreo = DSON.merge(CRUD_actividades_poa_monitoreo,
    {
        table: {
            single: [
                {
                    "table": "razon",
                    "base": "razon",
                    "field": "id",
                    "columns": ["id", "nombre_razon"]
                },
                {
                    "table": "departamento",
                    "base": "departamento",
                    "field": "id",
                    "columns": ["id", "nombre"]
                }
            ],
            multiple: {}
        }
    }
);
