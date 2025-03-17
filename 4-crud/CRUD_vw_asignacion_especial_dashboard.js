var sessionValue = new SESSION().current();
CRUD_vw_asignacion_especial_dashboard = {};
DSON.keepmerge(CRUD_vw_asignacion_especial_dashboard, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_asignacion_especial_dashboard, {
    table: {
        width: "width:2800px;",
        report: true,
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            poa: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
            },
            nombre_poa: {},
            nombre_departamento_solicitante: {},
            nombre_departamento_solicitado: {},
            nombre: {},
            descripcion: {},
            fecha_inicio: {formattype: ENUM.FORMAT.date, },
            fecha_fin: {formattype: ENUM.FORMAT.date},
            nombre_responsable: {},
            // completa: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            nombre_razon: {},
            comentario: {shorttext: 360},
            created_at: {visible: false,visibleDetail: false,export: false,exportExample: false},
            updated_at: {visible: false,visibleDetail: false,export: false,exportExample: false},
            created_by: {visible: false,visibleDetail: false,export: false,exportExample: false},
            updated_by: {visible: false,visibleDetail: false,export: false,exportExample: false},
            nombre_estatus: {}
        },
        filters: {
            columns: [
                {
                    key: 'nombre_poa',
                    type: FILTER.types.relation,
                    table: 'poa',
                    value: "nombre",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [{
                            "field": "pei",
                            "value": new SESSION().current()? new SESSION().current().super ? -1: new SESSION().current().compania_id : -1
                        }],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'nombre_departamento_solicitante',
                    type: FILTER.types.relation,
                    table: 'departamento',
                    value: "nombre",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [{
                            "field": "compania",
                            "value": new SESSION().current()? new SESSION().current().super ? -1: new SESSION().current().compania_id : -1
                        }],
                        orderby: "nombre",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'nombre_departamento_solicitado',
                    type: FILTER.types.relation,
                    table: 'departamento',
                    value: "nombre",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [{
                            "field": "compania",
                            "value": new SESSION().current()? new SESSION().current().super ? -1: new SESSION().current().compania_id : -1
                        }],
                        orderby: "nombre",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'nombre',
                    type: FILTER.types.string,
                    maxlength:  100
                },
                {
                    key: 'descripcion',
                    type: FILTER.types.string,
                    maxlength:  255
                },
                {
                    key: 'fecha_inicio',
                    type: FILTER.types.date,
                },
                {
                    key: 'fecha_fin',
                    type: FILTER.types.date,
                },
                {
                    key: 'nombre_responsable',
                    type: FILTER.types.relation,
                    table: 'usuario',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [{
                            "field": "compania",
                            "value": new SESSION().current()? new SESSION().current().super ? -1: new SESSION().current().compania_id : -1
                        }],
                        orderby: "nombre",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'nombre_razon',
                    type: FILTER.types.relation,
                    table: 'razon',
                    value: "nombre",
                    text: "item.nombre_razon",
                    query: {
                        limit: 0,
                        page: 1,
                        orderby: "nombre",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'comentario',
                    type: FILTER.types.string,
                    maxlength:  255
                },
                {
                    key: 'nombre_estatus',
                    type: FILTER.types.relation,
                    table: 'asignacion_especial_poa_estatus',
                    value: "nombre",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        orderby: "nombre",
                        order: "asc",
                        distinct: false
                    },
                },
            // {
            //     key: 'producto',
            //     label: 'Producto',
            //     type: FILTER.types.relation,
            //     table: 'productos_poa',
            //     value: "id",
            //     text: "item.nombre",
            //     query: {
            //         limit: 0,
            //         page: 1,
            //         where: [{
            //             "field": "poa",
            //             "value": new SESSION().current() ? new SESSION().current().poa_id : -1
            //         }],
            //         orderby: "id",
            //         order: "asc",
            //         distinct: false
            //     },
            // },
            // {
            //     key: 'actividad',
            //     label: 'Actividad',
            //     type: FILTER.types.string,
            //     placeholder: 'Actividad',
            //     maxlength: 64
            // },
            // {
            //     key: 'responsable_id',
            //     label: 'Responsable',
            //     type: FILTER.types.relation,
            //     table: 'usuario',
            //     value: "id",
            //     text: "item.nombre + ' ' + item.apellido",
            //     query: {
            //         limit: 0,
            //         page: 1,
            //         where: [{
            //             "field": "compania",
            //             "value": new SESSION().current() ? new SESSION().current().compania_id : -1
            //         }],
            //         orderby: "id",
            //         order: "asc",
            //         distinct: false
            //     },
            // },
            // {
            //     key: 'fecha_inicio',
            //     label: 'Fecha Inicio',
            //     type: FILTER.types.date,
            //     placeholder: 'Fecha Inicio'
            // },
            // {
            //     key: 'fecha_fin',
            //     label: 'Fecha Fin',
            //     type: FILTER.types.date,
            //     placeholder: 'Fecha Fin'
            // },
            // {
            //     key: 'presupuesto',
            //     label: 'Presupuesto',
            //     type: FILTER.types.decimal,
            //     placeholder: 'Presupuesto',
            //     maxlength: 20
            // },
            // {
            //     key: 'estatus_actividad',
            //     label: 'Estatus',
            //     type: FILTER.types.relation,
            //     table: 'actividades_poa_estatus',
            //     value: "id",
            //     text: "item.nombre",
            //     query: {
            //         limit: 0,
            //         page: 1,
            //         where: [],
            //         orderby: "id",
            //         order: "asc",
            //         distinct: false
            //     },
            // },
            // {
            //     key: 'tipo_inversion',
            //     label: 'Tipo Inversión',
            //     type: FILTER.types.relation,
            //     table: 'tipo_inversion',
            //     value: "id",
            //     text: "item.nombre",
            //     query: {
            //         limit: 0,
            //         page: 1,
            //         where: [],
            //         orderby: "id",
            //         order: "asc",
            //         distinct: false
            //     },
            // }
            ]
        }
    }
});