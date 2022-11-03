CRUD_dashboard_departamento_especifico = {};
DSON.keepmerge(CRUD_dashboard_departamento_especifico, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dashboard_departamento_especifico, {
    table: {
        engine: 'my',
        method: "departamento",
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false
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
            compania: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
        },
    }
});