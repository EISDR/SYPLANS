CRUD_actividades_poa_estatus = {};
DSON.keepmerge(CRUD_actividades_poa_estatus, CRUDDEFAULTS);
DSON.keepmerge(CRUD_actividades_poa_estatus, {
    table: {
        engine: 'my',
        sort: "id",
        order: "desc",
        columns: {
            id: {
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                dead: true
            },
            nombre: {
                shorttext: 370
            },
            descripcion: {
                shorttext: 370
            },
            created_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            updated_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            deleted_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            created_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            updated_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            deleted_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
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