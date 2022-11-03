CRUD_dashboard_indicadores = {};
DSON.keepmerge(CRUD_dashboard_indicadores, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dashboard_indicadores, {
    table: {
        engine: 'st',
        isStorage: true,
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
            name: {
                label: "Name",
                shorttext: 20
            },
            active: {
                visible: true,
                sorttype: "bool",
                formattype: "bool"
            },
            created: {
                visible: false,
                sorttype: "time",
                formattype: "datetime>DD-MM-YYYY hh:mm a",
                exportExample: false,
                dead: true
            },
            updated: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            deleted: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            user_created: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            user_updated: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            user_deleted: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            }
        },
    }
});
