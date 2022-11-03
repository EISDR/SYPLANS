CRUD_actividades_view = {};
DSON.keepmerge(CRUD_actividades_view, CRUDDEFAULTS);
DSON.keepmerge(CRUD_actividades_view, {
    table: {
        engine: 'my',
        view: "vw_actividades_poa_grid",
        width: "width:1600px;",
        batch: false,
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            departamento: {
                sorttype: "numeric",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            no1: {
                label: "No.",
            },
            producto_nombre: {
                label: function () {
                    return new SESSION().current().tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto"
                },
                shorttext: 370
            },
            no2: {
                label: "No.",
            },
            actividad: {
                label: "Actividad",
                shorttext: 370
            },
            responsable: {
                label: "Responsable",
                shorttext: 370
            },
            condition: {
                export: true,
                label: "Condición",
                format: function (row) {
                    var nom = row.condition;
                    $(`.Vencida`).css('background', '#FF0000');
                    $(`.Enejecucion`).css('background', '#548235');
                    $(`.Planificada`).css('background', '#5F5FAF');
                    $(`.Ninguno`).css('background', '#CECECE');
                    return `<div title="${row.condition.replaceAll('Ninguno', 'Ninguna Condición')}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
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
            },
            presupuesto: {
                label: "Presupuesto",
                formattype: "money",
                exportExample: "[money]",
            },
            estatus: {
                label: "Estatus",
                shorttext: 370
            },
            estatus_actividad: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            }
        },
        filters: {
            columns: false
        }
    }
});