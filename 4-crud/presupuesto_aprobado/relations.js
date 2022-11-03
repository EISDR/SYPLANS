CRUD_presupuesto_aprobado = DSON.merge(CRUD_presupuesto_aprobado,
    {
        table: {
            single: [
                {
                    "table": "departamento",
                    "base": "departamento_id",
                    "field": "id",
                    "columns": ["id", "nombre"]
                }
            ],
            multiple: {}
        }
    }
);