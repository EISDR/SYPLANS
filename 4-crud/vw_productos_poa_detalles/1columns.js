lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_vw_productos_poa_resultado = {};
DSON.keepmerge(CRUD_vw_productos_poa_resultado, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_productos_poa_resultado, {
    table: {
        engine: 'my',
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
            producto: {
                label: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
            },
            departamento: {
                label: "Departamento",
            },
            resultado: {
                label: "resultado",
            }
        },
    }
});