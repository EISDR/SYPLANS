CRUD_institucion = DSON.merge(CRUD_institucion,
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
                    "table": "usuario",
                    "base": "responsable",
                    "field": "id",
                    "columns": ["id", "nombre", "apellido", "cargo", "correo"]
                }
             ],


        }
    }
);
