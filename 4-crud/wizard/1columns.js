CRUD_wizard = {};
DSON.keepmerge(CRUD_wizard, CRUDDEFAULTS);
DSON.keepmerge(CRUD_wizard, {
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
            name: {
                label: "Name",
                shorttext: 20
            },
            cant_records_require: {
                label: "Records requeridos"
            },
            parent_entity: {
                label: "Entidad padre",
                shorttext: 20,
            }

        },
    }
});