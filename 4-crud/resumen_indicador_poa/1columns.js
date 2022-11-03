CRUD_resumen_indicador_poa = {};
DSON.keepmerge(CRUD_resumen_indicador_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_resumen_indicador_poa, {
    table: {
        engine: 'my',
        view: 'resumen_indicador_poa',
        // sort: "no_orden",
        sort: "id",
        order: "desc",
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
        },
    }
});