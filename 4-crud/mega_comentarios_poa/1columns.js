CRUD_mega_comentarios_poa = {};
DSON.keepmerge(CRUD_mega_comentarios_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_comentarios_poa, {
    table: {
        engine: 'my',
        view: 'vw_comentarios',
        method: 'comentarios',
        batch:false,
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
                label: "Fecha",
                sorttype: "datetime",
                formattype: "datetime",
            }
        },
    }
});