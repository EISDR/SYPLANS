lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_resumen_actividad = {};
DSON.keepmerge(CRUD_resumen_actividad, CRUDDEFAULTS);
DSON.keepmerge(CRUD_resumen_actividad, {
    table: {
        engine: 'my',
        view: 'resumen_actividad',
        sort: "no_producto",
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
            producto: {
                shorttext: 370
            },
            actividad: {
                shorttext: 370
            },
            actividades_apoyo: {
                shorttext: 370
            },
            no_producto: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },

        },
    }
});