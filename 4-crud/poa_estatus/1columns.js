CRUD_poa_estatus = {};
DSON.keepmerge(CRUD_poa_estatus, CRUDDEFAULTS);
DSON.keepmerge(CRUD_poa_estatus, {
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
    }
});