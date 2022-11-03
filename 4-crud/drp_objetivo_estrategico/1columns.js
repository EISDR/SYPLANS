CRUD_drp_objetivo_estrategico = {};
DSON.keepmerge(CRUD_drp_objetivo_estrategico, CRUDDEFAULTS);
DSON.keepmerge(CRUD_drp_objetivo_estrategico, {
    table: {
        engine: 'my',
        method: 'objetivo_estrategico',
        batch:false,
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
                label: function () {
                    return MESSAGE.i('planificacion.titleObjetivoEstrategico');
                },
                shorttext: 370
            },
            eje_estrategico_nombre:{
                label: "Eje Estratégico",
                shorttext: 370
            },
            ends: {
                label: "Objetivos END",
                shorttext: 370
            }

        },
        options: [{
            text: (data) => { return ''; },
            title: (data) => { return ''; },
            icon: (data) => { return ''; },
            show: (data) => { return true; },
            permission: (data) => { return false; },
            characterist: (data) => { return false; },
            menus:[]
        }]
    }
});