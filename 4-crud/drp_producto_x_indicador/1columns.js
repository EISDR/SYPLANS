CRUD_drp_producto_x_indicador = {};
DSON.keepmerge(CRUD_drp_producto_x_indicador, CRUDDEFAULTS);
DSON.keepmerge(CRUD_drp_producto_x_indicador, {
    table: {
        engine: 'my',
        view: 'drp_producto_x_indicador',
        columns: {
            id: {
                label: "id",
                sorttype: "numeric",
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