lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_usuario = DSON.merge(CRUD_usuario,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'nombre',
                        label: 'Nombre',
                        type: FILTER.types.string,
                        placeholder: 'Nombre',
                        maxlength: 255
                    },
                    {
                        key: 'apellido',
                        label: 'Apellido',
                        type: FILTER.types.string,
                        placeholder: 'Apellido',
                        maxlength: 255
                    },
                    {
                        key: 'correo',
                        label: 'Correo',
                        type: FILTER.types.string,
                        placeholder: 'Correo',
                        maxlength: 255
                    },
                    {
                        key: 'cargo',
                        label: 'Cargo',
                        type: FILTER.types.relation,
                        table: 'cargo',
                        value: "id",
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
                                    "operator": "=",
                                    "value": lachechon ? lachechon.compania_id : -1
                                },
                                {
                                    "field": "institucion",
                                    "operator": lachechon.institucion_id ? "=" : "is",
                                    "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                                }
                            ]
                        },
                    },
                    {
                        key: 'departamento',
                        label: function (){
                            return 'Departamento'
                        },
                        type: FILTER.types.relation,
                        table: 'departamento',
                        value: "id",
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
                                    "operator": "=",
                                    "value": lachechon ? lachechon.compania_id : -1
                                },
                                {
                                    "field": "institucion",
                                    "operator": lachechon.institucion_id ? "=": "is",
                                    "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id :  "$null" : -1
                                }
                            ]
                        },
                    },
                    {
                        key: 'profile',
                        label: 'Grupo',
                        type: FILTER.types.relation,
                        table: 'group',
                        value: "id",
                        text: "item.name",
                        query: {
                            limit: 0,
                            page: 1,
                            orderby: "id",
                            order: "asc",
                            distinct: false,
                            where: []
                        },
                    },
                    {
                        key: 'compania',
                        label: 'Compañía',
                        type: FILTER.types.relation,
                        table: 'compania',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    }
                ]
            }
        }
    });