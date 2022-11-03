CRUD_vw_presupuesto_departamento = {};
DSON.keepmerge(CRUD_vw_presupuesto_departamento, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_presupuesto_departamento, {
    table: {
        engine: 'my',
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            departamento: {
                label: MESSAGE.i(`planificacion.titleDepartamento`),
                shorttext: 370
            },
            compania: {
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