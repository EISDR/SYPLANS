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
                label: "No.",
                sorttype: "numeric",
                class: "text-left"
            },
            eje_estrategico: {
                label: function(){
                    return "Eje Estratégico";
                },
                shorttext: 370
            },
            no_objetivo: {
                label: function () {
                    return "No.";
                },
                class: "text-left",
            },
            nombre: {
                label: function() { return MESSAGE.i('planificacion.titleObjetivoEstrategico')},
                shorttext: 370
            },
            descripcion: {
                label: function() { return "Descripción" },
                shorttext: 370
            },
            objetivo_end: {
                sortable: false,
                label: function() {
                    return "Objetivos Generales END";
                },
                export: false,
                exportExample: false,
                shorttext: 370,
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true:  false :false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false: true : false
            },
            objetivos_end: {
                sortable: false,
                label: function() {
                    return "Objetivos END";
                },
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
                label: function() {
                    return "Objetivos Específicos Institucionales";
                },
                export: false,
                exportExample: false,
                shorttext: 370
            },
            objetivos_especificos: {
                sortable: false,
                label: function() {
                    return "Objetivos Específicos Institucionales";
                },
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