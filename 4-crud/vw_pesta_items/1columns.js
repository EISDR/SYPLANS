CRUD_vw_pesta_items = {};
DSON.keepmerge(CRUD_vw_pesta_items, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_pesta_items, {
    table: {
        engine: 'my',
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
            descripcion: {
                label: "Nombre",
                shorttext: 30
            },


        },
    }
});