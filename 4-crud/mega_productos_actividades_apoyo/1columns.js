CRUD_mega_productos_actividades_apoyo = {};
DSON.keepmerge(CRUD_mega_productos_actividades_apoyo, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_productos_actividades_apoyo, {
    table: {
        engine: 'my',
        view: "vw_mega_actividades_apoyo",
        // width: "width: 2000px;",
        sort: "id",
        order: "desc",
        batch: false,
        columns: {
            id: {
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            actividad_apoyo: {
                shorttext: 370
            },
            descripcion: {
                shorttext: 370
            },
            area_apoyo: {
                shorttext: 370
            },
            fecha_inicio: {
                sorttype: "date",
                formattype: "date",
            },
            fecha_fin: {
                sorttype: "date",
                formattype: "date",
            }
        },

    }
});