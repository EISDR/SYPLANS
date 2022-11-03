CRUD_mega_comentarios_pei = {};
DSON.keepmerge(CRUD_mega_comentarios_pei, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_comentarios_pei, {
    table: {
        engine: 'my',
        view: 'vw_comentarios',
        method: 'comentarios',
        batch:false,
        // sort: "created_at",
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
                shorttext: 370
            },
            created_at: {
                label: "Fecha",
                sorttype: "datetime",
                formattype: "datetime",
            },
            usuario_nombre: {
                label: "Responsable",
            }
        },
        // allow: {
        //     menu: true,
        //     add: true,
        //     edit: true,
        //     view: true,
        //     remove: true,
        //     active: false,
        //     filter: true,
        //     import: false,
        //     copy: true,
        //     export: {
        //         Clipboard: true,
        //         PDF: true,
        //         CSV: true,
        //         XLS: true,
        //         DOC: true
        //     },
        //     actions: true,
        // },
    }
});