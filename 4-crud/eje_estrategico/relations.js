CRUD_eje_estrategico = DSON.merge(CRUD_eje_estrategico,
    {
        table: {
            single: [
                {
                    "table": "end",
                    "base": "aliniacion_end",
                    "field": "id",
                    "columns": ["id", "nombre", "compania"]
                }
                ,
                {
                    "table": "pnpsp",
                    "base": "aliniacion_pnpsp",
                    "field": "id",
                    "columns": ["id", "nombre"]
                }
                ,
                {
                    "table": "ods",
                    "base": "aliniacion_ods",
                    "field": "id",
                    "columns": ["id", "nombre"]
                }
             ],

            multiple: {}
        }
    }
);