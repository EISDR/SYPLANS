CRUD_comentarios_productos_poa = {};
DSON.keepmerge(CRUD_comentarios_productos_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_comentarios_productos_poa, {
    table: {
        engine: 'my',
        view: 'vw_comentarios',
        method: 'comentarios',
        batch:false,
        // sort: "created_at",
        sort: "id",
        order: "desc",
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            comentario: {
                label: "Comentario",
            },
            usuario_nombre: {
                label: "Responsable",
            },
            created_at: {
                label: "Creado en",
                formattype: ENUM.FORMAT.date,
            },
            value2:{
                label: "Estado",
                format: function(row){
                    if (row.value2 == "1"){
                        return "Abierto";
                    } else{
                        return "Detenido";
                    }
                },
                shorttext: 370
            }
        },
        filters: {
            columns: false
        }
    }
});