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
                label: function () { return "POA_id"} },
            nombre_poa: { label: function () { return "POA" } },
            nombre_departamento_solicitante: {label: function () { return "Departamento solicitante"} },
            nombre_departamento_solicitado: {label: function () { return "Departamento solicitado"} },
            nombre: {},
            descripcion: {label: function () { return "Descripción" } },
            fecha_inicio: {formattype: ENUM.FORMAT.date, },
            fecha_fin: {formattype: ENUM.FORMAT.date},
            nombre_responsable: {label: function () { return "Responsable" } },
            // completa: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            nombre_razon: {label: function () { return "Razón"}},
            comentario: {shorttext: 360},
            created_at: {visible: false,visibleDetail: false,export: false,exportExample: false},
            updated_at: {visible: false,visibleDetail: false,export: false,exportExample: false},
            created_by: {visible: false,visibleDetail: false,export: false,exportExample: false},
            updated_by: {visible: false,visibleDetail: false,export: false,exportExample: false},
            nombre_estatus: {label: function () { return "Estatus" } }
        },
        filters: {
            columns: [
                {
                    key: 'nombre_poa',
                    label: function () {
                        return 'POA';
                    },
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
                    label: function () {
                        return 'Departamento solicitante';
                    },
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
                    label: function () {
                        return 'Departamento solicitado';
                    },
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
                    label: function () {
                        return 'Asignación Especial';
                    },
                    type: FILTER.types.string,
                    placeholder: 'Asignación Especial',
                    maxlength:  100
                },
                {
                    key: 'descripcion',
                    label: function () {
                        return 'Descripción';
                    },
                    type: FILTER.types.string,
                    placeholder: 'Descripción',
                    maxlength:  255
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
                },
                {
                    key: 'nombre_responsable',
                    label: function () {
                        return 'Responsable';
                    },
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
                    label: function () {
                        return 'Razón';
                    },
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
                    label: function () {
                        return 'Comentario';
                    },
                    type: FILTER.types.string,
                    placeholder: 'Comentario',
                    maxlength:  255
                },
                {
                    key: 'nombre_estatus',
                    label: function () {
                        return 'Estatus';
                    },
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
        },
        single: [
            {
                'table': 'poa',
                'base': 'poa',
                'field': 'id',
                'columns': ['id', 'nombre']
            },

            {
                'table': 'razon',
                'base': 'razon',
                'field': 'id',
                'columns': ['id', 'nombre_razon']
            }
            ]
    }
});