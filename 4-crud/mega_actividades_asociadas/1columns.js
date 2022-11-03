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
                label: "No.",
                sorttype: "numeric",
                class: "text-left"
            },
            eje_estrategico:{
                label: function(){
                    return "Eje Estratégico"
                },
                shorttext: 370
            },
            no_objetivo: {
                label: function () {
                    return "No.";
                },
                class: "text-left",
            },
            objetivo_estrategico:{
                label: function(){
                    return "Objetivo Estratégico"
                },
                shorttext: 370
            },
            no_estrategia: {
                label: "No.",
                class: "text-left"
            },
            estrategia:{
                label: "Estrategia",
                shorttext: 370
            },
            no_resultado: {
                label: "No.",
                class: "text-left"
            },
            resultado_esperado:{
                label: function(){
                    return "Resultados Esperados"
                },
                shorttext: 370
            },
            no_producto: {
                label: "No.",
                class: "text-left"
            },
            producto_nombre:{
                label: function () {
                    return new SESSION().current().tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto";
                },
                shorttext: 370
            },
            no2:{
                label: "No.",
                shorttext: 370
            },
            actividad_poa_nombre:{
                label: "Actividad",
                shorttext: 370
            },
            nombre: {
                label: function (row) {
                    return MESSAGE.i('planificacion.titleTablaActividadApoyo');
                },
                shorttext: 370
            },
            descripcion: {
                label: function(){ return "Descripción"},
                shorttext: 370
            },
            presupuesto: {
                sorttype: "money",
                formattype: "money",
            },
            estado: {
                label: function(){ return "Estado"},
                shorttext: 370
            },
            razon: {
                label: function(){ return "Condición de Cierre"},
                shorttext: 370
            },
            area_apoyo: {
                label: "Área de apoyo",
                shorttext: 370
            },
            fecha_inicio: {
                label: "Fecha Inicio",
                sorttype: "date",
                formattype: "date",
            },
            fecha_fin: {
                label: "Fecha Fin",
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