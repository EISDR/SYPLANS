CRUD_usuario = DSON.merge(CRUD_usuario,
    {
        table: {
            single: [
                {
                    "table": "cargo",
                    "base": "cargo",
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
                    "table":"compania",
                    "base": "compania",
                    "field": "id",
                    "columns": ["id","nombre"]
                },
                {
                    "table":"tipo_auditores",
                    "base": "tipo_auditor",
                    "field": "id",
                    "columns": ["id","nombre"]
                }
            ],
            multiple: {}
        }
    }
);