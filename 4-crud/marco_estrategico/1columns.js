CRUD_marco_estrategico = {};
DSON.keepmerge(CRUD_marco_estrategico, CRUDDEFAULTS);
DSON.keepmerge(CRUD_marco_estrategico, {
    table: {
        engine: 'my',
        method:"marco_estrategico_valores",
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
            }
        },
    }
});