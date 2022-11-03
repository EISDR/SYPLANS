CRUD_resumen_indicador_pei = {};
DSON.keepmerge(CRUD_resumen_indicador_pei, CRUDDEFAULTS);
DSON.keepmerge(CRUD_resumen_indicador_pei, {
    table: {
        engine: 'my',
        view: 'resumen_indicador_pei',
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
            indicadores: {
                label: "Indicadores",
                shorttext: 370
            },

            resultado_esperado: {
                label: "Resultado Esperado",
                shorttext: 370
            },
            no_orden: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },

        },
    }
});