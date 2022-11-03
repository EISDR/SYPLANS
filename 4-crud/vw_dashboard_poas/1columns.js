CRUD_vw_dashboard_poas = {};
DSON.keepmerge(CRUD_vw_dashboard_poas, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_dashboard_poas, {
    table: {
        engine: 'st',
        isStorage: true,
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false
            },
            name: {
                label: "Name",
            },
            active: {
                visible: true,
                sorttype: "bool",
                formattype: "bool"
            }
        },
    }
});