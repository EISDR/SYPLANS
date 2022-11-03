CRUD_vw_departamentos_dashboard = {};
DSON.keepmerge(CRUD_vw_departamentos_dashboard, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_departamentos_dashboard, {
    table: {
        engine: 'my',
        view: 'vw_departamentos_dashboard',
        method: 'departamento',
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false
            },
            nombre: {
                label: "Nombre",
            },
            descripcion: {
                label: "Descripción",
            },
            compania: {
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