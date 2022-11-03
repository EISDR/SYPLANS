CRUD_linea_accion = DSON.merge(CRUD_linea_accion,
    {
        table: {
            single: [
                {
                    "table": "objetivo_especifico",
                    "base": "objetivo_especifico",
                    "field": "id",
                    "columns": ["id", "nombre", "edt"]
                },
                {
                    "table": "objetivo",
                    "base": "objetivo",
                    "field": "id",
                    "columns": ["id", "nombre", "edt"]
                }
            ],
            multiple: {}
        }
    }
);
