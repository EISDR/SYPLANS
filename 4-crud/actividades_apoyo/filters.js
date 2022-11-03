lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_actividades_apoyo = DSON.merge(CRUD_actividades_apoyo,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: 'Nombre',
                        type: FILTER.types.string,
                        placeholder: 'Nombre',
                        maxlength: 64
                    },
                    {
                        key: 'departamento',
                        label: 'Departamento',
                        placeholder: 'Departamento',
                        type: FILTER.types.relation,
                        value: "id",
                        table: 'departamento',
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
                        key: 'responsable',
                        label: 'Responsable',
                        type: FILTER.types.relation,
                        table: 'usuario',
                        value: "id",
                        text: "item.nombre + ' ' + item.apellido",
                        query: {
                            limit: 0,
                            page: 1,
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
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'fecha_inicio',
                        label: 'Fecha Inicio',
                        type: FILTER.types.string,
                        placeholder: 'Fecha Inicio'
                    },
                    {
                        key: 'fecha_fin',
                        label: 'Fecha Fin',
                        type: FILTER.types.string,
                        placeholder: 'Fecha Fin'
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
                    },
                ]
            }
        }
    });