CRUD_drp_eje_estrategico = DSON.merge(CRUD_drp_eje_estrategico,
    {
        table: {
            single: [
                {
                    "table": "end",
                    "base": "end",
                    "field": "id",
                    "columns": ["id", "nombre", "compania"]
                }
                ,
                {
                    "table": "pnpsp",
                    "base": "pnpsp",
                    "field": "id",
                    "columns": ["id", "nombre"]
                }
                ,
                {
                    "table": "ods",
                    "base": "ods",
                    "field": "id",
                    "columns": ["id", "nombre"]
                }
             ],

            multiple: {}
        }
    }
);