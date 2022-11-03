CRUD_drp_eje_estrategico = {};
DSON.keepmerge(CRUD_drp_eje_estrategico, CRUDDEFAULTS);
DSON.keepmerge(CRUD_drp_eje_estrategico, {
    table: {
        engine: 'my',
        view: 'drp_eje_estrategico_2',
        method:"eje_estrategico",
        sort: 'no_orden',
        deletekeys: ['id'],
        dragrow: 'no_orden',
        sortable: false,
        batch:false,
        width: "width:1700px;",
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            no_orden: {
                label: "No.",
                sorttype: "numeric",
                class: "text-left",
                drag: true,
            },
            nombre: {
                label: function (row) {
                    return MESSAGE.i('planificacion.titleEjeEstrategico');
                },
                shorttext: 370
            },
            descripcion: {
                label: function () { return "Descripción" },
                shorttext: 370
            },
            end_nombre_mul: {
                label: function () {
                    return MESSAGE.i('planificacion.titleEjeEnd');
                },
                shorttext: 80000,
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false : true : false
            },
            relation_end: {
                label: "Estrategia Nacional de Desarrollo",
                visible: false,
                visibleDetail: false,
                export:  new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                exportExample: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                checkExport: true,
                dead: true
            },
            pnpsp_nombre_mul: {
                label: function () {
                    return MESSAGE.i('planificacion.titlePNPSP');
                },
                shorttext: 80000,
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false : true : false
            },
            relation_pnpsp: {
                label: "Plan Nacional Plurianual del Sector Público",
                visible: false,
                visibleDetail: false,
                export: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                exportExample: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                checkExport: true,
                dead: true
            },
            ods_nombre_mul: {
                label: function () {
                    return MESSAGE.i('planificacion.titleODS');
                },
                shorttext: 80000,
                visible: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                visibleDetail: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? false : true : false
            },
            relation_ods: {
                label: "Compromiso Institucional",
                visible: false,
                visibleDetail: false,
                export: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                exportExample: new SESSION().current() ? new SESSION().current().tipo_institucion == 1 ? true : false : false,
                checkExport: true,
                dead: true
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