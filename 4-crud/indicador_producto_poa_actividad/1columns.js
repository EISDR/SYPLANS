CRUD_indicador_producto_poa_actividad = {};
DSON.keepmerge(CRUD_indicador_producto_poa_actividad, CRUDDEFAULTS);
DSON.keepmerge(CRUD_indicador_producto_poa_actividad, {
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
