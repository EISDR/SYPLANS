CRUD_mega_ejeestrategico = {};
DSON.keepmerge(CRUD_mega_ejeestrategico, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_ejeestrategico, {
    table: {
        engine: 'my',
        view:"eje_estrategico",
        method: "eje_estrategico",
        sort: 'no_orden',
        order: "desc",
        deletekeys: ['id'],
        sortable: true,
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                drag: true,
                dead: true
            },

            no_orden: {
                sorttype: "numeric",
                class: "text-left",
                drag: true,
            },

            nombre: {
                shorttext: 370
            },

            descripcion: {
                shorttext: 370
            },

            end: {
                shorttext: 370,
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false :false,
                export: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false :false,
                exportExample: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false : false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false: true : false
            },


            pnpsp_nombre: {
                shorttext: 370,
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false :false,
                export: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false :false,
                exportExample: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false : false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false: true : false
            },


            ods: {
                shorttext: 370,
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false :false,
                export: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false :false,
                exportExample: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false : false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false: true : false
            }
        },
    }
});