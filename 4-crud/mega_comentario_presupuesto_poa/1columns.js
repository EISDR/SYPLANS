CRUD_mega_comentario_presupuesto_poa = {};
DSON.keepmerge(CRUD_mega_comentario_presupuesto_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_comentario_presupuesto_poa, {
    table: {
        engine: 'my',
        view:'vw_comentarios_presupuesto_poa',
        batch: false,
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                exportExample: false,
                dead: true
            },
            comentario:{
                label:"Comentario",
                shorttext: 370
            },
            estatus:{
                label: "Estatus",
                shorttext: 370
            },
            Responsable: {
                label: "Responsable",
                format:function (data) {
                    return data.nombre+' '+ data.apellido;
                }
            },
            fecha: {
                label: "Fecha",
                sorttype: "datetime",
                formattype: "datetime",
            },
        }
    }
});