CRUD_presupuesto_aprobado_estatus = {};
DSON.keepmerge(CRUD_presupuesto_aprobado_estatus, CRUDDEFAULTS);
DSON.keepmerge(CRUD_presupuesto_aprobado_estatus, {
    table: {
        engine: 'my',
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false
            },
            nombre: {
                label: "Nombre",
                shorttext: 370
            },
            descripcion: {
                label: "Descripción",
                shorttext: 370
            },
            created_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            updated_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            deleted_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            created_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            updated_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            deleted_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
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