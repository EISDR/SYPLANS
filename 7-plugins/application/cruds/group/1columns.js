CRUD_group = {};
DSON.keepmerge(CRUD_group, CRUDDEFAULTS);
DSON.keepmerge(CRUD_group, {
    table: {
        width: "width:1350px;",
        engine: 'ms',
        columns: {
            id: {visible: false, visibleDetail: false, export: false, exportExample: false},
            name: {
                shorttext: 40
            },
            description: {
                sortable: false,
                shorttext: 80,
                null: "<span class='text-grey'>[NULL]</span>"
            },
            homePage: {
                shorttext: 40
            },
            isAdmin: {
                visible: true,
                sorttype: "bool",
                formattype: "bool"
            },
            caracteristica: {
            },
            notificaciones: {
                format: function (row) {
                    if(row.notificaciones == 1){
                        return "Sí"
                    }else {
                        return "No"
                    }
                }
            },
            gracia: {
            },
            repeat: {
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