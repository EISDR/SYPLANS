CRUD_mis_actividades_apoyo = DSON.merge(CRUD_mis_actividades_apoyo,
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
                    "base": "departamento_solicitante",
                    "field": "id",
                    "columns": ["id", "nombre"]
                },
                {
                    table: "usuario",
                    base: "created_by",
                    field: "id",
                    columns: ["id","nombre","apellido"]
                },
                {
                    table: "vw_usuario",
                    base: "responsable",
                    field: "id",
                    columns: ["id","nombre","apellido"]
                }

            ],
            multiple: {}
        }
    }
);