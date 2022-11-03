CRUD_indicador_producto_poa = {};
DSON.keepmerge(CRUD_indicador_producto_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_indicador_producto_poa, {
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
            }
        },
    }
});