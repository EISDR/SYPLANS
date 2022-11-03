CRUD_vw_marco_estrategico = {};
DSON.keepmerge(CRUD_vw_marco_estrategico, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_marco_estrategico, {
    table: {
        engine: 'my',
        method:"marco_estrategico_valores",
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
            }
        },
    }
});