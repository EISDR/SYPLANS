CRUD_actividades_apoyo = DSON.merge(CRUD_actividades_apoyo,
    {
        table: {
            single: [
                {
                    "table": "actividades_poa",
                    "base": "actividades_poa",
                    "field": "id",
                    "columns": ["id", "nombre"]
                },
                {
                    "table": "departamento",
                    "base": "departamento",
                    "field": "id",
                    "columns": ["id", "nombre"]
                },
                {
                    table: "usuario",
                    base: "responsable",
                    field: "id",
                    columns: ["id", "nombre", "apellido"]
                },
                {
                    "table": "razon",
                    "base": "razon",
                    "field": "id",
                    "columns": ["id", "nombre_razon"]
                },
                {
                    "table": "tipo_inversion",
                    "base": "tipo_inversion",
                    "field": "id",
                    "columns": ["id", "nombre"]
                },
                {
                    "table": "clasificadores",
                    "base": "clasificador_id",
                    "field": "id",
                    "columns": ["id", "nombre_clasificador", "code"]
                },
            ],
            multiple: {}
        }
    }
);
