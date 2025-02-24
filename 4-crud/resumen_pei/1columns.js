CRUD_resumen_pei = {};
DSON.keepmerge(CRUD_resumen_pei, CRUDDEFAULTS);
DSON.keepmerge(CRUD_resumen_pei, {
    table: {
        engine: 'my',
        view: 'resumen_pei',
        sort: "$ no_orden, eje_estrategico, objetivo_estrategico, estrategia, resultado",
        order: "desc",
        piemessage: false,
        batch: false,
        sortable: false,
        fixheader:true,
        actions: false,
        columns: {
            id: {
                visible: false,
                dead: true,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            eje_estrategico: {
                shorttext: 370,
                rowspan: function (index, list, category, fromreport) {
                    return (category === "span") ? resumen_pei_poa.sp_('d.eje_estrategico', index, list)
                        : resumen_pei_poa.sm_('d.eje_estrategico', index, list);
                }
            },
            objetivo_estrategico: {
                shorttext: 370,
                rowspan: function (index, list, category, fromreport) {
                    return (category === "span") ? resumen_pei_poa.sp_('d.eje_estrategico + d.objetivo_estrategico', index, list)
                        : resumen_pei_poa.sm_('d.eje_estrategico + d.objetivo_estrategico', index, list);
                }
            },
            estrategia: {
                shorttext: 370,
                rowspan: function (index, list, category, fromreport) {
                    return (category === "span") ? resumen_pei_poa.sp_('d.eje_estrategico + d.objetivo_estrategico + d.estrategia', index, list)
                        : resumen_pei_poa.sm_('d.eje_estrategico + d.objetivo_estrategico + d.estrategia', index, list);
                }
            },
            resultado: {
                shorttext: 370,
                rowspan: function (index, list, category, fromreport) {
                    return (category === "span") ? resumen_pei_poa.sp_('d.eje_estrategico + d.objetivo_estrategico + d.estrategia + d.resultado', index, list)
                        : resumen_pei_poa.sm_('d.eje_estrategico + d.objetivo_estrategico + d.estrategia + d.resultado', index, list);
                }
            },
            indicador: {
                shorttext: 370
            },
            pei: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
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