CRUD_vw_dashboard_productos2 = {};
DSON.keepmerge(CRUD_vw_dashboard_productos2, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_dashboard_productos2, {
    table: {
        engine: 'my',
        width: "width:3000px",
        report: true,
        batch: false,
        sortable: false,
        allow: {
            add: false,
            edit: false,
            view: false,
            remove: false,
            active: false,
            filter: true,
            import: false,
            copy: false,
            clone: false,
            export: {
                Clipboard: true,
                PDF: true,
                CSV: true,
                XLS: true,
                DOC: true
            },
            actions: false,
        },
        columns: {
            id: {
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            nombre: {
            },
            resultado_nombre: {
            },
            departamento_nombre: {
            },
            estatus: {
            },
            condition: {
                export: true,
                format: function (row) {
                    var nom = row.condition;
                    $(`.Vencido`).css('background', '#FF0000');
                    $(`.Enejecucion`).css('background', '#548235');
                    $(`.Planificado`).css('background', '#5F5FAF');
                    $(`.Ninguno`).css('background', '#CECECE');
                    return `<div title="${row.condition.replaceAll('Ninguno', 'Ninguna Condición')}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },
            nocompletas: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true,
            },
            completas: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true,
            },
            fecha_inicio: {
                sorttype: "time",
                formattype: "datetime>DD-MM-YYYY",
                exportExample: false
            },
            fecha_fin: {
                sorttype: "time",
                formattype: "datetime>DD-MM-YYYY",
                exportExample: false
            },
            presupuesto: {
                formattype: "money",
                exportExample: "[money]"
            }
        },
        single: [
            {
                "table": "departamento",
                "base": "departamento",
                "field": "id",
                "columns": ["id", "nombre"]
            },
            {
                table: "resultado",
                base: "resultado",
                field: "id",
                columns: ["id", "nombre"]
            }
        ],
    }
});
