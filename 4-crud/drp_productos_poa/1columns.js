CRUD_drp_productos_poa = {};
DSON.keepmerge(CRUD_drp_productos_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_drp_productos_poa, {
    table: {
        engine: 'my',
        method: 'productos_poa',
        view: "vw_productos_poa_detalles",
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            no2: {
                label: "No.",
            },
            resultado: {
                label: "Resultado Esperado",
                shorttext: 370
            },
            no1: {
                label: "No.",
            },
            producto: {
                label: function () {
                    return new SESSION().current().tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto"
                },
                shorttext: 370
            },
            departamento: {
                label: "Departamento",
                shorttext: 370
            },
            estado_producto:{
                label: "estado",
                shorttext: 370
            },
            fecha_inicio: {
                label: "Fecha Inicio",
                sorttype: "numeric"
            },
            fecha_fin: {
                label: "Fecha Fin",
                sorttype: "numeric"
            }
        },
    }
});