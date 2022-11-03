CRUD_objetivo_especifico = DSON.merge(CRUD_objetivo_especifico,
    {
        table: {
            single: [
                {
                    "table": "objetivo",
                    "base": "objetivo",
                    "field": "id",
                    "columns": ["id", "nombre","edt"]
                }
            ],

            multiple: {}
        }
    }
);
