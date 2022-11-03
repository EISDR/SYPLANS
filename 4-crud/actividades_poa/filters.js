lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_actividades_poa = DSON.merge(CRUD_actividades_poa,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'no1',
                        label: function () {
                            return lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción'
                        },
                        type: FILTER.types.integer,
                        placeholder: lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción',
                        maxlength: 15
                    },
                    {
                        key: 'no2',
                        label: function () {
                            return 'No. Actividad';
                        },
                        type: FILTER.types.integer,
                        placeholder: 'No. Actividad',
                        maxlength: 15
                    },
                    {
                        key: 'departamento',
                        label: 'Departamento',
                        placeholder: 'Departamento',
                        type: FILTER.types.relation,
                        value: "id",
                        table:'departamento',
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            orderby: "id",
                            order: "asc",
                            distinct: false,
                            where: [
                                {
                                    "field": "compania",
                                    "value": lachechon ? lachechon.compania_id : -1
                                },
                                {
                                    "field": "institucion",
                                    "operator": lachechon.institucion_id ? "=" : "is",
                                    "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                                }
                            ],
                        }
                    },
                    {
                        key: 'producto',
                        label: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
                        type: FILTER.types.relation,
                        table: 'vw_productos_poa_detalles',
                        value: "id",
                        text: "item.no1 + ' ' + item.producto",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "poa_id",
                                "value": lachechon ? lachechon.poa_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'actividad',
                        label: 'Actividad',
                        type: FILTER.types.string,
                        placeholder: 'Actividad',
                        maxlength: 64
                    },
                    {
                        key: 'responsable_id',
                        label: 'Responsable',
                        type: FILTER.types.relation,
                        table: 'usuario',
                        value: "id",
                        text: "item.nombre + ' ' + item.apellido",
                        query: {
                            limit: 0,
                            page: 1,
                            where:[
                                {
                                    "field": "compania",
                                    "value": lachechon ? lachechon.compania_id : -1
                                },
                                {
                                    "field": "institucion",
                                    "operator": lachechon.institucion_id ? "=" : "is",
                                    "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                                }
                            ],
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
                    },
                    {
                        key: 'presupuesto',
                        label: 'Presupuesto',
                        type: FILTER.types.decimal,
                        placeholder: 'Presupuesto',
                        maxlength: 20
                    },
                    {
                        key: 'estatus_actividad',
                        label: 'Estatus',
                        type: FILTER.types.relation,
                        table: 'auditoria_programa_plan_estatus',
                        value: "code",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [
                                {
                                    "field": "entidad",
                                    "value": 10
                                }
                            ],
                            orderby: "orden",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'tipo_inversion',
                        label: 'Tipo Inversión',
                        type: FILTER.types.relation,
                        table: 'tipo_inversion',
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
                        key: 'bienes_permiso',
                        label: 'Código de Bienes y Servicios',
                        type: FILTER.types.relation,
                        table: 'vw_bienes_servicio',
                        value: "id",
                        text: "item.id",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: true
                        },
                    },
                    {
                        key: 'bienes_permiso_nombre',
                        label: 'Descripción de Bienes y Servicios',
                        type: FILTER.types.relation,
                        table: 'vw_bienes_servicio',
                        value: "nombre",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: true
                        },
                    }
                ]
            }
        }
    });