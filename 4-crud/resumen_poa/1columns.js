CRUD_resumen_poa = {};
DSON.keepmerge(CRUD_resumen_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_resumen_poa, {
    table: {
        engine: 'my',
        view: 'vw_resumen_poa',
        sort: "$ eje_estrategico, objetivo_estrategico, estrategia, resultado, producto",
        order: "desc",
        piemessage: false,
        batch: false,
        sortable: false,
        fixheader: true,
        actions: false,
        width: "width:2000px;",
        columnsOrder: [
            [
                {label: "Eje estratégico", row: 2},
                {label: "Objetivo Estratégico", row: 2},
                {label: "Estrategia", row: 2},
                {label: "Resultado Esperado", row: 2},
                {label: "Proyecto/Producto", row: 2},
                {label: "Actividades", row: 2},
                {label: "Fecha Inicio", row: 2},
                {label: "Fecha Fin", row: 2},
                {label: "Recursos", col: 2},
            ],
            [
                {label: "No Financieros"},
                {label: "Financieros"},
            ]
        ],
        columns: {
            id: {
                visible: false,
                dead: true,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            eje_estrategico: {
                label: function () {
                    return "Eje estratégico"
                },
                shorttext: 370,
                rowspan: function (index, list, category) {
                    return (category === "span") ? resumen_poa.sp_('d.eje_estrategico', index, list)
                        : resumen_poa.sm_('d.eje_estrategico', index, list);
                }
            },
            objetivo_estrategico: {
                label: function () {
                    return "Objetivo Estratégico"
                },
                shorttext: 370,
                rowspan: function (index, list, category) {
                    return (category === "span") ? resumen_poa.sp_('d.objetivo_estrategico', index, list)
                        : resumen_poa.sm_('d.objetivo_estrategico', index, list);
                }
            },
            estrategia: {
                label: function () {
                    return "Estrategia"
                },
                shorttext: 370,
                rowspan: function (index, list, category) {
                    return (category === "span") ? resumen_poa.sp_('d.estrategia', index, list)
                        : resumen_poa.sm_('d.estrategia', index, list);
                }
            },
            resultado_nombre: {
                label: function () {
                    return "Resultado Esperado"
                },
                shorttext: 370,
                rowspan: function (index, list, category) {
                    return (category === "span") ? resumen_poa.sp_('d.resultado_nombre', index, list)
                        : resumen_poa.sm_('d.resultado_nombre', index, list);
                }
            },
            producto: {
                label: function () {
                    return new SESSION().current().tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto";
                },
                rowspan: function (index, list, category) {
                    return (category === "span") ? resumen_poa.sp_('d.producto', index, list)
                        : resumen_poa.sm_('d.producto', index, list);
                }
            },
            actividad: {
                label: "Actividad",
                shorttext: 370
            },
            fecha_inicio: {formattype: ENUM.FORMAT.date},
            fecha_fin: {formattype: ENUM.FORMAT.date},
            nofinancieros: {
                label: "No Financieros",
                format: (row) => {
                    let arrayx = [];
                    try {
                        arrayx = eval(row.nofinancieros);
                    } catch (e) {

                    }
                    return DSON.ULALIA(arrayx);
                }
            },
            financieros: {
                label: "Financieros",
                format: (row) => {
                    return LAN.money(row.presupuesto).format(false);
                }
            },
            no_producto: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },

        },
    }
});