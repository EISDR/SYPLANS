CRUD_resumen_poa = {};
DSON.keepmerge(CRUD_resumen_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_resumen_poa, {
    table: {
        engine: 'my',
        view: 'resumen_poa',
        sort: "$ no_orden, eje_estrategico, objetivo_estrategico, estrategia, resultado",
        order: "desc",
        piemessage: false,
        batch: false,
        sortable: false,
        fixheader:true,
        actions: false,
        columns: {
            id: {
                visible: false,
                dead: true,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            producto: {
                label: function () {
                    return new SESSION().current().tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto";
                },
                shorttext: 370
            },
            actividad: {
                label: "Actividad",
                shorttext: 370
            },
            actividades_apoyo: {
                label: "Actividad Apoyo",
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