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
            },
            actividad: {
            },
            presupuesto: {
                formattype: "money"
            },
            fecha_inicio: {
                formattype: ENUM.FORMAT.date,
            },
            fecha_fin: {
                formattype: ENUM.FORMAT.date,
            },
            //poa_name: {link: {table: 'poa',from: 'poa'}},
            estatus_actividad: {formattype: ENUM.FORMAT.numeric, visible:false, dead: true},
            nombre: {

                label: function (){
                    return MESSAGE.i('columns.estado')
                },
            }
        },
        filters: {
            columns: [
                {
                    key: 'no2',
                    type: FILTER.types.integer,
                },
                {
                    key: 'actividad',
                    type: FILTER.types.string,
                },
                {
                    key: 'estatus_actividad',
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
                    type: FILTER.types.date,
                },
                {
                    key: 'fecha_fin',
                    type: FILTER.types.date,
                }
            ]
        },
    }
});
