CRUD_direccionMeta = {};
DSON.keepmerge(CRUD_direccionMeta, CRUDDEFAULTS);
DSON.keepmerge(CRUD_direccionMeta, {
    table: {
        engine: 'st',
        isStorage: true,
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                dead: true
            },
            nombre: {
                label: MESSAGE.i('planificacion.titleDireccionMeta'),
                shorttext: 370
            },
            descripcion: {
                label: "Descripción",
                shorttext: 370
            },
            valor: {
                label: "Valor",
                shorttext: 370
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