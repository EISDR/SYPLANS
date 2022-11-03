CRUD_resumen_indicador_actividad = {};
DSON.keepmerge(CRUD_resumen_indicador_actividad, CRUDDEFAULTS);
DSON.keepmerge(CRUD_resumen_indicador_actividad, {
    table: {
        engine: 'my',
        view: 'resumen_indicador_actividad',
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