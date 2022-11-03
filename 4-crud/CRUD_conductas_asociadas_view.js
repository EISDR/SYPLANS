CRUD_conductas_asociadas_view = {};
DSON.keepmerge(CRUD_conductas_asociadas_view, CRUDDEFAULTS);
DSON.keepmerge(CRUD_conductas_asociadas_view, {
    table: {
        engine: 'my',
        view: "marco_estrategicos_virtudes",
        batch: false,
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            nombre: {
                label: function (row) {
                    return MESSAGE.i('planificacion.titleMarcoEstrategicoValor');
                },
                shorttext: 370
            },
            descripcion: {
                label: function () { return "Descripción" },
                shorttext: 370
            }
        },
        filters: {
            columns: false
        }
    }
});