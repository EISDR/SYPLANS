CRUD_tipo_institucion = {};
DSON.keepmerge(CRUD_tipo_institucion, CRUDDEFAULTS);
DSON.keepmerge(CRUD_tipo_institucion, {
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
            nombre: {
                label: MESSAGE.i(`planificacion.titleTipoInstitucion`),
                shorttext: 370
            },
            descripcion: {
                label: "Descripción",
                shorttext: 370
            }
        },
    }
});