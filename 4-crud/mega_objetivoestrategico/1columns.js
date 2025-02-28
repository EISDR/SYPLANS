CRUD_mega_objetivoestrategico = {};
DSON.keepmerge(CRUD_mega_objetivoestrategico, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_objetivoestrategico, {
    table: {
        engine: 'my',
        view: "vw_objetivo_estrategico",
        sort: "no_objetivo",
        order: "desc",
        width: "width:1500px;",
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            no_orden:{
                sorttype: "numeric",
                class: "text-left"
            },
            eje_estrategico: {
                shorttext: 370
            },
            no_objetivo: {
                class: "text-left",
            },
            nombre: {
                shorttext: 370
            },
            descripcion: {
                shorttext: 370
            },
            objetivo_end: {
                sortable: false,
                export: false,
                exportExample: false,
                shorttext: 370,
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false :false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false: true : false
            },
            objetivos_end: {
                sortable: false,
                shorttext: 370,
                visible: false,
                visibleDetail: false,
                checkExport: true,
                export: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false :false,
                exportExample: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false : false,
                dead: true
            },
            objetivo_especifico: {
                sortable: false,
                export: false,
                exportExample: false,
                shorttext: 370
            },
            objetivos_especificos: {
                sortable: false,
                shorttext: 370,
                visible: false,
                visibleDetail: false,
                export: true,
                exportExample: true,
                checkExport: true,
                dead: true
            },
        },
    }
});