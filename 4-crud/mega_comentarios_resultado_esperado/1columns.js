CRUD_mega_comentarios_resultado_esperado = {};
DSON.keepmerge(CRUD_mega_comentarios_resultado_esperado, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_comentarios_resultado_esperado, {
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
            },
            usuario_nombre: {
            },
            created_at: {
                sorttype: "datetime",
                formattype: "datetime",
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