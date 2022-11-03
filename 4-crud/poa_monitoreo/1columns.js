CRUD_poa_monitoreo = {};
DSON.keepmerge(CRUD_poa_monitoreo, CRUDDEFAULTS);
DSON.keepmerge(CRUD_poa_monitoreo, {
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
                label: "Nombre",
                shorttext: 370
            },
            descripcion: {
                label: "Descripción",
                shorttext: 370
            },
            cantidad: {
                label: "Cantidad",
            }
        },
    }
});