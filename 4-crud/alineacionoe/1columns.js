CRUD_alineacionoe = {};
DSON.keepmerge(CRUD_alineacionoe, CRUDDEFAULTS);
DSON.keepmerge(CRUD_alineacionoe, {
    table: {
        engine: 'my',
        method: 'objetivo',
        sort: "id",
        order: "desc",
        columns: {
            id: {
                label: "id",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            idObjetivo: {
                label: "id",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            nombreObjetivo: {
                label: "Nombre",
                shorttext: 370
            },
            descripcionObjetivo: {
                label: "Descripción",
            }
        },
    }
});