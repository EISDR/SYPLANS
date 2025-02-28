CRUD_mega_comentario_presupuesto_poa = {};
DSON.keepmerge(CRUD_mega_comentario_presupuesto_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_comentario_presupuesto_poa, {
    table: {
        engine: 'my',
        view:'vw_comentarios_presupuesto_poa',
        batch: false,
        columns: {
            id: {
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                exportExample: false,
                dead: true
            },
            comentario:{
                shorttext: 370
            },
            estatus:{
                shorttext: 370
            },
            Responsable: {
                format:function (data) {
                    return data.nombre+' '+ data.apellido;
                }
            },
            fecha: {
                sorttype: "datetime",
                formattype: "datetime",
            },
        }
    }
});