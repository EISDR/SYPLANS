CRUD_asignacion_especial_poa_monitoreo = DSON.merge(CRUD_asignacion_especial_poa_monitoreo,
    {
        table: {
            single: [
                {
                    "table": "razon",
                    "base": "razon",
                    "field": "id",
                    "columns": ["id", "nombre_razon"]
                }
            ],
            multiple: {}
        }
    }
);
