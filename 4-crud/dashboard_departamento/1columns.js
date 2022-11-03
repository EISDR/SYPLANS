CRUD_dashboard_departamento = {};
DSON.keepmerge(CRUD_dashboard_departamento, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dashboard_departamento, {
    table: {
        engine: 'my',
        method: "departamento",
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
            nombre: {
                label: "Nombre",
                shorttext: 30
            },
            descripcion: {
                label: "Descripción",
                shorttext: 30
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
            compania: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
        },
    }
});