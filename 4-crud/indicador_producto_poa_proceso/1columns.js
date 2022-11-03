CRUD_indicador_producto_poa_proceso = {};
DSON.keepmerge(CRUD_indicador_producto_poa_proceso, CRUDDEFAULTS);
DSON.keepmerge(CRUD_indicador_producto_poa_proceso, {
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
