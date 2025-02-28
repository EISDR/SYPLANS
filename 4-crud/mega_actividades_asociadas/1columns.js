CRUD_mega_actividades_asociadas = {};
DSON.keepmerge(CRUD_mega_actividades_asociadas, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_actividades_asociadas, {
    table: {
        engine: 'my',
        view: 'vw_mega_actividades_asociadas',
        width: '3000px',
        sort: "id",
        order: "desc",
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            no_eje: {
                sorttype: "numeric",
                class: "text-left"
            },
            eje_estrategico:{
                shorttext: 370
            },
            no_objetivo: {
                class: "text-left",
            },
            objetivo_estrategico:{
                shorttext: 370
            },
            no_estrategia: {
                class: "text-left"
            },
            estrategia:{
                shorttext: 370
            },
            no_resultado: {
                class: "text-left"
            },
            resultado_esperado:{
                shorttext: 370
            },
            no_producto: {
                class: "text-left"
            },
            producto_nombre:{
                shorttext: 370
            },
            no2:{
                shorttext: 370
            },
            actividad_poa_nombre:{
                shorttext: 370
            },
            nombre: {
                shorttext: 370
            },
            descripcion: {
                shorttext: 370
            },
            presupuesto: {
                sorttype: "money",
                formattype: "money",
            },
            estado: {
                shorttext: 370
            },
            razon: {
                shorttext: 370
            },
            area_apoyo: {
                shorttext: 370
            },
            fecha_inicio: {
                sorttype: "date",
                formattype: "date",
            },
            fecha_fin: {
                sorttype: "date",
                formattype: "date",
            }
        },
        allow: {
            menu: true,
            add: true,
            edit: true,
            view: true,
            remove: true,
            active: true,
            filter: true,
            import: true,
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
        options: [

            {
                text: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                title: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                icon: (data) => {
                    return 'comment';
                },
                permission: (data) => {
                    return "comment";
                },
                characterist: (data) => {
                    return "";
                },
                show: (data) => {
                    return (data.row.comentarios == 'si');
                },
                click: function (data) {
                    data.$scope.id = data.row.id;
                    data.$scope.modal.modalView("actividades_apoyo/viewComments", {
                        width: 'modal-full',
                        header: {
                            title: "Ver comentarios de la actividad apoyo",
                            icon: "comment"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading'),
                            sameController: true
                        },
                    });
                }
            }
        ]

    }
});