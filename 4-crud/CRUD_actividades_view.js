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
            },
            producto_nombre: {
                shorttext: 370
            },
            no2: {
            },
            actividad: {
                shorttext: 370
            },
            responsable: {
                shorttext: 370
            },
            condition: {
                export: true,
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
                sorttype: "date",
                formattype: "date",
            },
            fecha_fin: {
                sorttype: "date",
                formattype: "date",
            },
            presupuesto: {
                formattype: "money",
                exportExample: "[money]",
            },
            estatus: {
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