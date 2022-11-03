CRUD_drp_eje_estrategico_end = {};
DSON.keepmerge(CRUD_drp_eje_estrategico_end, CRUDDEFAULTS);
DSON.keepmerge(CRUD_drp_eje_estrategico_end, {
    table: {
        engine: 'my',
        method:"eje_estrategico",
        columns: {
            id: {
                label: "id",
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
                shorttext: 370
            },


        },
    }
});