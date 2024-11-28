CRUD_tipoMeta = {};
DSON.keepmerge(CRUD_tipoMeta, CRUDDEFAULTS);
DSON.keepmerge(CRUD_tipoMeta, {
    table: {
        engine: 'st',
        isStorage: true,
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
            nombre: {
                label: MESSAGE.i('planificacion.titleTipoMeta'),
                shorttext: 370
            },
            descripcion: {
                label: "Descripción",
                shorttext: 370
            },
            valor: {
                label: function () {
                    return "Valor"
                },
            },
            comentario_obligatorio: {
                label: function () {
                    return "¿Comentario Obligatorio?"
                },
                formattype: ENUM.FORMAT.bool,
                sorttype: ENUM.FORMATFILTER.bool,
            },
            ocultar: {
                label: function () {
                    return "¿Oculto?"
                },
                formattype: ENUM.FORMAT.bool,
                sorttype: ENUM.FORMATFILTER.bool,
            }
        },
        allow: {
            menu: true,
            add: true,
            edit: true,
            view: true,
            remove: true,
            active: false,
            filter: true,
            import: false,
            copy: true,
            export: {
                Clipboard: true,
                PDF: true,
                CSV: true,
                XLS: true,
                DOC: true
            },
            actions: true,
        },
    }
});