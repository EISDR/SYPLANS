CRUD_caracteristica = {};
DSON.keepmerge(CRUD_caracteristica, CRUDDEFAULTS);
DSON.keepmerge(CRUD_caracteristica, {
    table: {
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            nombre: {},
            description: {},
            code: {}
        },
        filters: {
            columns: true
        }
    }
});