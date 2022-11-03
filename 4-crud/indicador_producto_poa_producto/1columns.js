CRUD_indicador_producto_poa_producto = {};
DSON.keepmerge(CRUD_indicador_producto_poa_producto, CRUDDEFAULTS);
DSON.keepmerge(CRUD_indicador_producto_poa_producto, {
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
