CRUD_indicador_resultado_pei = {};
DSON.keepmerge(CRUD_indicador_resultado_pei, CRUDDEFAULTS);
DSON.keepmerge(CRUD_indicador_resultado_pei, {
    table: {
        engine: 'my',
        view: "vw_indicador_resultado_pei",
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