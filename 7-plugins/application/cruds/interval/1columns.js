CRUD_interval = {};
DSON.keepmerge(CRUD_interval, CRUDDEFAULTS);
DSON.keepmerge(CRUD_interval, {
    table: {
        engine: 'ms',
        columns: {
            id: {                 visible: false,                 visibleDetail: false,                 export: false,                 exportExample: false             },
            name: {
                label: "name",
                shorttext: 80
            },
            code: {
                label: "code",
                shorttext: 80
            },
            description: {
                label: "description",
                sortable: false,
                shorttext: 80,
                null: "<span class='text-grey'>[NULL]</span>"
            },
            created: {
                visible: false,
                sorttype: "time",
                formattype: "datetime>DD-MM-YYYY hh:mm a"
            },
            updated: {
                visible: false,
                exportExample: false
            },
            user_created: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            user_updated: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            }
        }
    }
});