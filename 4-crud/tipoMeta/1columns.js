CRUD_tipoMeta = {};
DSON.keepmerge(CRUD_tipoMeta, CRUDDEFAULTS);
DSON.keepmerge(CRUD_tipoMeta, {
    table: {
        engine: 'st',
        isStorage: true,
        columns: {
            id: {
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            nombre: {
                shorttext: 370
            },
            descripcion: {
                shorttext: 370
            },
            valor: {
            },
            comentario_obligatorio: {
                formattype: ENUM.FORMAT.bool,
                sorttype: ENUM.FORMATFILTER.bool,
            },
            ocultar: {
                formattype: ENUM.FORMAT.bool,
                sorttype: ENUM.FORMATFILTER.bool,
            }
        },
        allow: {
            menu: true,
            add: true,
            edit: true,
            view: true,
            remove: true,
            active: false,
            filter: true,
            import: false,
            copy: true,
            export: {
                Clipboard: true,
                PDF: true,
                CSV: true,
                XLS: true,
                DOC: true
            },
            actions: true,
        },
    }
});