CRUD_vw_departamento_not_exists_presupuesto = {};
DSON.keepmerge(CRUD_vw_departamento_not_exists_presupuesto, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_departamento_not_exists_presupuesto, {
    table: {
        engine: 'my',
        method: 'departamento',
        columns: {
            id: {
                label: "id",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                export: false,
                dead:true
            },
            nombre: {
                label: "Nombre",
                shorttext: 370
            },
            descripcion: {
                label: "Descripción",
                shorttext: 370
            },
            compania: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead:true
            },

        },
    }
});