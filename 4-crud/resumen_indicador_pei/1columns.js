CRUD_resumen_indicador_pei = {};
DSON.keepmerge(CRUD_resumen_indicador_pei, CRUDDEFAULTS);
DSON.keepmerge(CRUD_resumen_indicador_pei, {
    table: {
        width: "width:2000px;",
        engine: 'my',
        view: 'resumen_indicador_pei',
        // sort: "no_orden",
        sort: "id",
        order: "desc",
        batch: false,
        sortable: false,
        actions: false,
        fixheader: true,
        columnsOrder: [
            [
                {label: "Indicadores", row: 3},
                {label: "Resultado Esperado", row: 3},
                {label: "Fuente", row: 3},
                {label: "Método Calculo", row: 3},
                {label: "Unidad / Escala de Medición", row: 3},
                {label: "Dirección Meta", row: 3},
                {label: "Línea Base", row: 3},
                {label: "Medio Verificación", row: 3},
                {label: "Descripción", row: 3},
                // {label: "Metas", col: 4},
            ],
            [
                // {label: "Projectadas / Alcanzadas / Varianzas", col: 4},
            ],
            [
                // {label: "2021"},
                // {label: "2022"},
                // {label: "2023"},
                // {label: "2024"}
            ]
        ],
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            indicadores: {
                label: () => {
                    return "Indicadores"
                },
                shorttext: 370
            },
            resultado_esperado: {
                label: () => {
                    return "Resultado Esperado"
                },
                shorttext: 370
            },
            fuente: {
                label: () => {
                    return "Fuente"
                },
                shorttext: 370
            },
            metodo_calculo: {
                label: () => {
                    return "Método Calculo"
                },
                shorttext: 370
            },
            tipo_meta: {
                label: () => {
                    return "Unidad / Escala de Medición"
                },
                format: function (row) {
                    return (resumen_pei_poa.session.tipoMenta.filter(d => d.id == row.tipo_meta)[0] || {}).nombre;
                },
            },
            direccion_meta: {
                label: () => {
                    return "Dirección Meta"
                },
                format: function (row) {
                    return (resumen_pei_poa.session.direccionMeta.filter(d => d.id == row.direccion_meta)[0] || {}).nombre;
                },
            },
            linea_base: {
                label: () => {
                    return "Línea Base"
                },
            },
            medio_verificacion: {
                label: () => {
                    return "Medio Verificación"
                },
                shorttext: 370
            },
            descripcion: {
                label: () => {
                    return "Descripción"
                },
                shorttext: 370
            },
            no_orden: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },

        },
    }
});