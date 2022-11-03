CRUD_compania = DSON.merge(CRUD_compania,
    {
        table: {
            single: [
                {
                    "table": "tipo_institucion",
                    "base": "tipo_institucion",
                    "field": "id",
                    "columns": ["id", "nombre"]
                },
                {
                    "table": "sector",
                    "base": "sector",
                    "field": "id",
                    "columns": ["id", "nombre"]
                },
                {
                    "table": "usuario",
                    "base": "responsable",
                    "field": "id",
                    "columns": ["id", "nombre", "apellido", "cargo", "correo"]
                }
             ],


        }
    }
);
