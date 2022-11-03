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
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            actividad_apoyo: {
                label: "Actividad de Apoyo",
                shorttext: 370
            },
            descripcion: {
                label: "Descripción",
                shorttext: 370
            },
            area_apoyo: {
                label: "Área de Ápoyo",
                shorttext: 370
            },
            fecha_inicio: {
                label: "Fecha Inicio",
                sorttype: "date",
                formattype: "date",
            },
            fecha_fin: {
                label: "Fecha Fin",
                sorttype: "date",
                formattype: "date",
            }
        },

    }
});