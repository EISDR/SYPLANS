CRUD_vw_actividades_auth_poa = {};
DSON.keepmerge(CRUD_vw_actividades_auth_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_actividades_auth_poa, {
    table: {
        view: 'vw_actividades_auth_poa',
        report: true,
        batch: false,
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            no2: {
                shorttext: 360,
                label: function() {
                    return "No.";
                }
            },
            actividad: {
                label: function() {
                    return "Actividades";
                }
            },
            presupuesto: {
                label: function() {
                    return "Presupuesto";
                },
                formattype: "money"
            },
            fecha_inicio: {
                formattype: ENUM.FORMAT.date,
                label: function() {
                    return "Fecha de inicio";
                }
            },
            fecha_fin: {
                formattype: ENUM.FORMAT.date,
                label: function() {
                    return "Fecha de fin";
                }
            },
            //poa_name: {link: {table: 'poa',from: 'poa'}},
            estatus_actividad: {formattype: ENUM.FORMAT.numeric, visible:false},
            nombre: {
                label: function() {
                    return "Estatus";
                }
            }
        },
        filters: {
            columns: [
                {
                    key: 'no2',
                    label: function () { return 'No. Actividad'},
                    type: FILTER.types.integer,
                    placeholder: 'No. Actividad'
                },
                {
                    key: 'actividad',
                    label: 'Actividad',
                    type: FILTER.types.string,
                    placeholder: 'Actividad'
                },
                {
                    key: 'estatus_actividad',
                    label: 'Estado',
                    type: FILTER.types.relation,
                    table: 'actividades_poa_estatus',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'fecha_inicio',
                    label: 'Fecha Inicio',
                    type: FILTER.types.date,
                    placeholder: 'Fecha Inicio'
                },
                {
                    key: 'fecha_fin',
                    label: 'Fecha Fin',
                    type: FILTER.types.date,
                    placeholder: 'Fecha Fin'
                }
            ]
        },
    }
});
