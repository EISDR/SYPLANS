app.controller("indicador_generico", function ($scope, $http, $compile) {
    indicador_generico = this;
    var user = new SESSION().current();
    indicador_generico.session = user;
    indicador_generico.destroyForm = false;
    indicador_generico.colspan = user.cantidad * 3;
    indicador_generico.working = false;
    indicador_generico.periodolist = [];
    for (var p = 1; p <= user.cantidad; p++) {
        indicador_generico.periodolist.push({periodo: user.monitoreo_nombre + ' ' + p});
    }
    indicador_generico.colpad = [];
    indicador_generico.entidad = window.location.href.split('?')[1].replaceAll('RF', '');
    var rs_pad = indicador_generico.colspan, count_pda = 0,
        arr_pad = ['P', 'A', 'D'];
    for (var i = 0; i < rs_pad; i++) {
        indicador_generico.colpad.push(arr_pad[count_pda]);
        count_pda += 1;
        if (count_pda > 2) {
            count_pda = 0;
        }
    }

    indicador_generico.set_border = function (column) {
        if (column == 'P') {
            return {'border-left': "1px solid"};
        } else if (column == 'D') {
            return {'border-right': "1px solid"};
        }
    };

    indicador_generico.set_title = function (column) {
        switch (column) {
            case "P":
                return "Proyectado";
                break;
            case "A":
                return "Alcanzado";
                break;
            case "D":
                return "Diferencia";
                break;
        }
    };

    indicador_generico.conditionPoa = {
        poa_id: user.poa_id,
        compania_id: user.compania_id
    };
    indicador_generico.group_caracteristica = user.groups[0] ? user.groups[0].caracteristica : '';
    indicador_generico.paso = true;

    indicador_generico.delete_relation = (id) => new Promise((resolve, reject) => {

        BASEAPI.list('indicador_generico_periodo', {
            "where": [
                {
                    "field": "indicador_generico",
                    "value": id,
                }
            ]
        }, function (response) {

            indicador_generico.eliminar = false;
            indicador_generico.rs = response.data;

            for (var i = 0; i < indicador_generico.rs.length; i++) {
                if (indicador_generico.rs[i].valor_alcanzado && indicador_generico.rs[i].valor_alcanzado != "0.00") {
                    indicador_generico.eliminar = true;
                    break;
                }
            }
            resolve(1);
            if (indicador_generico.eliminar == false) {
                // SERVICE.planificacion_transfer.deleteindicadorpoa({indicador_generico_id: id}, function (result) {
                //     if (result.data.error == false) {
                //         resolve(1);
                //     } else
                //         resolve(0);
                // });
            } else {
                resolve(0);
            }
        });
    });

    BASEAPI.list('tipoMeta', {}, function (rsm) {
        indicador_generico.list_tipo_meta = rsm.data;
    });
    BASEAPI.list('direccionMeta', {}, function (rsd) {
        indicador_generico.list_direccion_meta = rsd.data;
    });
    indicador_generico.changeIndicador = function (table) {
        location.href = location.href.split('?')[0] + '?' + table;
    };
    RUNCONTROLLER("indicador_generico", indicador_generico, $scope, $http, $compile);
    RUN_B("indicador_generico", indicador_generico, $scope, $http, $compile);
    indicador_generico.plural = "Indicadores " + indicador_generico.entidad;
    indicador_generico.headertitle = "Indicadores " + indicador_generico.entidad;
    indicador_generico.setPermission("export", false);
    getPOAstatus(indicador_generico, user.poa_id);
    indicador_generico.clearModel("sortcolumn");
    //title_header_table_poa(indicador_generico, MESSAGE.i('planificacion.titleindicadores_poa'));

    indicador_generico.eltipo = false;
    indicador_generico.triggers.table.after.load = async function (records) {
        indicador_generico.tipo_meta_list = await BASEAPI.listp('tipoMeta', {
            limit: 0,
            orderby: "id",
            order: "asc"
        });
        indicador_generico.tipo_meta_list = indicador_generico.tipo_meta_list.data;
        indicador_generico.direccion_meta_list = await BASEAPI.listp('direccionMeta', {
            limit: 0,
            orderby: "id",
            order: "asc"
        });
        indicador_generico.direccion_meta_list = indicador_generico.direccion_meta_list.data;
        if (indicador_generico.entidad == 'vw_proyecto_item'){
            indicador_generico.proyectos_list = await BASEAPI.listp('vw_proyecto_item', {
                limit: 0,
                orderby: "id",
                order: "asc",
                where: [
                    {
                        field: "compania_id",
                        value:  indicador_generico.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator":  indicador_generico.session.institucion_id ? "=" : "is",
                        "value":  indicador_generico.session.institucion_id ?  indicador_generico.session.institucion_id : "$null"
                    },
                ]
            });
            indicador_generico.proyectos_list = indicador_generico.proyectos_list.data;
        }
        if (!indicador_generico.eltipo) {
            indicador_generico.entidadobj = await BASEAPI.firstp('indicador_generico_entidad', {
                where: [{
                    field: "table_",
                    value: indicador_generico.entidad
                }]
            });
            if (indicador_generico.entidad == "vw_mods") {
                indicador_generico.fixFilters = [
                    {
                        "field": "table_",
                        "value": indicador_generico.entidadobj.id
                    },
                ];
                CRUD_indicador_generico.table.columns = columns = {
                    id: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        dead: true
                    },
                    edt_ods: {
                        label: function () {
                            return "No."
                        },
                        sorttype: ENUM.FORMATFILTER.numeric
                    },
                    ods_nombre: {
                        label: function () {
                            return "Objetivo de Desarrollo Sostenible"
                        },
                        sortable: false,
                    },
                    edt_mod: {
                        label: function () {
                            return "No."
                        },
                        sorttype: ENUM.FORMATFILTER.numeric,
                    },
                    mod_nombre: {
                        label: function () {
                            return "Meta Objetivo de Desarrollo Sostenible"
                        },
                        sortable: false,
                    },
                    edt_indicador: {
                        label: function () {
                            return "No."
                        },
                        sorttype: ENUM.FORMATFILTER.numeric,
                    },
                    nombre_indicador: {
                        // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        label: function () {
                            return "Nombre del Indicador"
                        },
                        shorttext: 370
                    },
                    departamento_nombre: {
                        label: function () {
                            return "Departamento"
                        }
                    },
                    descripcion_indicador: {
                        label: function () {
                            return "Descripción del Indicador"
                        },
                        shorttext: 370
                    },
                    fuente: {
                        label: function () {
                            return "Fuente del Indicador"
                        },
                        shorttext: 370
                    },
                    metodo: {
                        label: function () {
                            return "Método de Cálculo"
                        },
                        shorttext: 370
                    },
                    desagregacion_demografica_geografia: {
                        label: function () {
                            return "Desagregación Demográfica Geográfica";
                        },
                        shorttext: 370
                    },
                    caracteristica: {
                        label: function () {
                            return "Características del Indicador";
                        },
                        shorttext: 370
                    },
                    tipo_meta: {
                        label: function () {
                            return "Tipo de dato de la Meta";
                        }
                    },
                    direccion_meta: {
                        label: function () {
                            return "Dirección de la Meta"
                        }
                    },
                    ano: {
                        label: function () {
                            return "Año a evaluar"
                        }
                    },
                    ano_linea_base: {
                        label: function () {
                            return "Año Línea Base"
                        }
                    },
                    linea: {
                        label: function () {
                            return "Línea Base";
                        },
                        shorttext: 370,
                        format: function (row) {
                            if (row.linea) {
                                switch (row.tipo_meta) {
                                    case 'Porcentaje':
                                        return row.linea + '%';
                                        break;
                                    case 'Decimal':
                                        return LAN.money(row.linea).format(false);
                                        break;
                                    case 'Dinero':
                                        return `${LAN.money(row.linea).format(true)}`;
                                        break;
                                    default : {
                                        return row.linea;
                                    }
                                }
                            }
                        },
                    },
                    medio_verificacion: {
                        // label: "Medio de Verificación",
                        label: function () {
                            return "Medio de Verificación"
                        },
                        shorttext: 370
                    },
                    observacion: {
                        label: "Observación",
                        shorttext: 370
                    }
                };
                if (indicador_generico.session.tipo_institucion == 2) {
                    if (indicador_generico2.form)
                        if (indicador_generico2.form.options)
                            if (indicador_generico2.form.options.indicador_generico_entidad)
                                indicador_generico2.form.options.indicador_generico_entidad.disabled = true;
                }
            } else if (indicador_generico.entidad == "vw_proyecto_item") {
                indicador_generico.fixFilters = [
                    {
                        "field": "table_",
                        "value": indicador_generico.entidadobj.id
                    },
                    {
                        "field": "compania",
                        "value": indicador_generico.session.compania_id
                    }
                ];
                CRUD_indicador_generico.table.columns = columns = {
                    id: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        dead: true
                    },
                    registro: {
                        label: "Registro",
                    },
                    nombre_indicador: {
                        // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        label: function () {
                            return "Nombre del Indicador"
                        },
                        shorttext: 370
                    },
                    departamento_nombre: {
                        label: function () {
                            return "Departamento"
                        }
                    },
                    descripcion_indicador: {
                        label: function () {
                            return "Descripción del Indicador"
                        },
                        shorttext: 370
                    },
                    fuente: {
                        label: function () {
                            return "Fuente del Indicador"
                        },
                        shorttext: 370
                    },
                    metodo: {
                        label: function () {
                            return "Método de Cálculo"
                        },
                        shorttext: 370
                    },
                    desagregacion_demografica_geografia: {
                        label: function () {
                            return "Desagregación Demográfica Geográfica";
                        },
                        shorttext: 370
                    },
                    caracteristica: {
                        label: function () {
                            return "Características del Indicador";
                        },
                        shorttext: 370
                    },
                    tipo_meta: {
                        label: function () {
                            return "Tipo de dato de la Meta";
                        }
                    },
                    direccion_meta: {
                        label: function () {
                            return "Dirección de la Meta"
                        }
                    },
                    ano: {
                        label: function () {
                            return "Año a evaluar"
                        }
                    },
                    ano_linea_base: {
                        label: function () {
                            return "Año Línea Base"
                        }
                    },
                    linea: {
                        label: function () {
                            return "Línea Base";
                        },
                        shorttext: 370,
                        format: function (row) {
                            if (row.linea) {
                                switch (row.tipo_meta) {
                                    case 'Porcentaje':
                                        return row.linea + '%';
                                        break;
                                    case 'Decimal':
                                        return LAN.money(row.linea).format(false);
                                        break;
                                    case 'Dinero':
                                        return `${LAN.money(row.linea).format(true)}`;
                                        break;
                                    default : {
                                        return row.linea;
                                    }
                                }
                            }
                        },
                    },
                    medio_verificacion: {
                        // label: "Medio de Verificación",
                        label: function () {
                            return "Medio de Verificación"
                        },
                        shorttext: 370
                    },
                    observacion: {
                        label: "Observación",
                        shorttext: 370
                    }
                };
                if (indicador_generico2.form)
                    if (indicador_generico2.form.options)
                        if (indicador_generico2.form.options.indicador_generico_entidad)
                            indicador_generico2.form.options.indicador_generico_entidad.disabled = true;
            } else if (indicador_generico.entidad == "vw_procesos") {
                indicador_generico.getMapaProceso = async function (callback) {
                    var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
                        order: "desc",
                        where: [
                            {
                                field: "compania",
                                value: indicador_generico.session.compania_id
                            },
                            {
                                "field": "institucion",
                                "operator": indicador_generico.session.institucion_id ? "=" : "is",
                                "value": indicador_generico.session.institucion_id ? indicador_generico.session.institucion_id : "$null"
                            },
                            {
                                field: "estatus",
                                operator: "!=",
                                value: 4
                            }
                        ]
                    });
                    if (mapaData) {
                        indicador_generico.mapa_id = mapaData.id;
                        indicador_generico.mapa_ano = mapaData.ano;
                        indicador_generico.fixFilters = [
                            {
                                "field": "table_",
                                "value": indicador_generico.entidadobj.id
                            },
                            {
                                "field": "compania",
                                "value": indicador_generico.session.compania_id
                            },
                            {
                                field: "mapa_proceso",
                                value: indicador_generico.mapa_id ? indicador_generico.mapa_id : -1
                            }
                        ];
                    } else {
                        indicador_generico.fixFilters = [
                            {
                                "field": "table_",
                                "value": indicador_generico.entidadobj.id
                            },
                            {
                                "field": "compania",
                                "value": indicador_generico.session.compania_id
                            },
                            {
                                field: "mapa_proceso",
                                value: indicador_generico.mapa_id ? indicador_generico.mapa_id : -1
                            }
                        ];
                    }
                    if (callback)
                        callback();
                }
                indicador_generico.getMapaProceso(function () {
                    indicador_generico.refresh();
                });
                CRUD_indicador_generico.table.columns = columns = {
                    id: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        dead: true
                    },
                    mapa_proceso_nombre: {
                        // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        label: function () {
                            return "Mapa de Proceso"
                        },
                        shorttext: 370
                    },
                    registro: {
                        label: "Registro",
                    },
                    nombre_indicador: {
                        // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        label: function () {
                            return "Nombre del Indicador"
                        },
                        shorttext: 370
                    },
                    departamento_nombre: {
                        label: function () {
                            return "Departamento"
                        }
                    },
                    descripcion_indicador: {
                        label: function () {
                            return "Descripción del Indicador"
                        },
                        shorttext: 370
                    },
                    fuente: {
                        label: function () {
                            return "Fuente del Indicador"
                        },
                        shorttext: 370
                    },
                    metodo: {
                        label: function () {
                            return "Método de Cálculo"
                        },
                        shorttext: 370
                    },
                    desagregacion_demografica_geografia: {
                        label: function () {
                            return "Desagregación Demográfica Geográfica";
                        },
                        shorttext: 370
                    },
                    caracteristica: {
                        label: function () {
                            return "Características del Indicador";
                        },
                        shorttext: 370
                    },
                    tipo_meta: {
                        label: function () {
                            return "Tipo de dato de la Meta";
                        }
                    },
                    direccion_meta: {
                        label: function () {
                            return "Dirección de la Meta"
                        }
                    },
                    ano: {
                        label: function () {
                            return "Año a evaluar"
                        }
                    },
                    ano_linea_base: {
                        label: function () {
                            return "Año Línea Base"
                        }
                    },
                    linea: {
                        label: function () {
                            return "Línea Base";
                        },
                        shorttext: 370,
                        format: function (row) {
                            if (row.linea) {
                                switch (row.tipo_meta) {
                                    case 'Porcentaje':
                                        return row.linea + '%';
                                        break;
                                    case 'Decimal':
                                        return LAN.money(row.linea).format(false);
                                        break;
                                    case 'Dinero':
                                        return `${LAN.money(row.linea).format(true)}`;
                                        break;
                                    default : {
                                        return row.linea;
                                    }
                                }
                            }
                        },
                    },
                    medio_verificacion: {
                        // label: "Medio de Verificación",
                        label: function () {
                            return "Medio de Verificación"
                        },
                        shorttext: 370
                    },
                    observacion: {
                        label: "Observación",
                        shorttext: 370
                    }
                };
                CRUD_indicador_generico.table.filters = {
                    columns: [
                        {
                            key: 'registro',
                            label: 'Registro',
                            type: FILTER.types.relation,
                            table: 'pnpsp',
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
                            key: 'nombre_indicador',
                            label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                            type: FILTER.types.string,
                            placeholder: MESSAGE.i('planificacion.titleIndicadorPOA'),
                            maxlength: 255
                        },
                        {
                            key: 'descripcion_indicador',
                            label: 'Descripción',
                            type: FILTER.types.string,
                            placeholder: 'Descripción',
                            maxlength: 4000
                        },
                        {
                            key: 'fuente',
                            label: 'Fuente',
                            type: FILTER.types.string,
                            placeholder: 'Fuente',
                            maxlength: 255
                        },
                        {
                            key: 'metodo',
                            label: 'Método Cálculo',
                            type: FILTER.types.string,
                            placeholder: 'Método Cálculo',
                            maxlength: 255
                        },
                        {
                            key: 'tipo_meta',
                            label: 'Tipo de meta',
                            type: FILTER.types.relation,
                            table: 'tipoMeta',
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
                            key: 'direccion_meta',
                            label: 'Dirección de la meta',
                            type: FILTER.types.relation,
                            table: 'direccionMeta',
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
                            key: 'linea',
                            label: 'Línea Base',
                            type: FILTER.types.integer,
                            placeholder: 'Línea Base',
                            maxlength: 30
                        },
                        {
                            key: 'medio_verificacion',
                            label: 'Medio de Verificación',
                            type: FILTER.types.string,
                            placeholder: 'Medio Verificación',
                            maxlength: 255
                        },
                        {
                            key: 'mapa_proceso',
                            label: 'Mapa de proceso',
                            type: FILTER.types.relation,
                            table: 'mapa_proceso',
                            value: "id",
                            text: "item.nombre",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [
                                    {
                                        "field": "compania",
                                        "value": indicador_generico.session.compania_id
                                    },
                                    {
                                        "field": "estatus",
                                        "operator": "!=",
                                        "value": 4
                                    }
                                ],
                                orderby: "id",
                                order: "asc",
                                distinct: false
                            },
                        },
                    ]
                }
                FILTER.run(indicador_generico);
                CRUD_indicador_generico.table.single = [
                    {
                        'table': 'departamento',
                        'base': 'departamento',
                        'field': 'id',
                        'columns': ['id', 'nombre']
                    }
                ];
                if (indicador_generico2.form)
                    if (indicador_generico2.form.options)
                        if (indicador_generico2.form.options.indicador_generico_entidad)
                            indicador_generico2.form.options.indicador_generico_entidad.disabled = true;
            } else if (indicador_generico.entidad == "vw_evento_indicador") {
                indicador_generico.getRiesgo = async function (callback) {
                    var riesgoData = await BASEAPI.firstp('vw_riesgo_historico', {
                        order: "desc",
                        where: [
                            {
                                field: "compania",
                                value: indicador_generico.session.compania_id
                            },
                            {
                                "field": "institucion",
                                "operator": indicador_generico.session.institucion_id ? "=" : "is",
                                "value": indicador_generico.session.institucion_id ? indicador_generico.session.institucion_id : "$null"
                            },
                            {
                                field: "estatus",
                                operator: "!=",
                                value: 4
                            }
                        ]
                    });
                    if (riesgoData) {
                        indicador_generico.riesgo_id = riesgoData.id;
                        indicador_generico.riesgo_ano = riesgoData.ano;
                    }
                    if (callback)
                        callback();
                };
                indicador_generico.getRiesgo(function () {
                    indicador_generico.refresh();
                });
                if (STORAGE.exist('evento')) {
                    indicador_generico2.evento_indicador = STORAGE.get('evento');
                    indicador_generico2.form.loadDropDown('evento_indicador');
                    if (indicador_generico2.evento_indicador.includes('r')) {
                        indicador_generico.fixFilters = [
                            {
                                "field": "table_",
                                "value": indicador_generico.entidadobj.id
                            },
                            {
                                "field": "registro",
                                "value": indicador_generico2.evento_indicador.replaceAll('r', '')
                            },
                            {
                                "field": "related",
                                "value": 1
                            },
                            {
                                "field": "compania",
                                "value": indicador_generico.session.compania_id
                            }
                        ];
                    } else if (indicador_generico2.evento_indicador.includes('s')) {
                        indicador_generico.fixFilters = [
                            {
                                "field": "table_",
                                "value": indicador_generico.entidadobj.id
                            },
                            {
                                "field": "registro",
                                "value": indicador_generico2.evento_indicador.replaceAll('s', '')
                            },
                            {
                                "field": "related",
                                "value": 2
                            },
                            {
                                "field": "compania",
                                "value": indicador_generico.session.compania_id
                            }
                        ];
                    } else if (indicador_generico2.evento_indicador.includes('g')) {
                        indicador_generico.fixFilters = [
                            {
                                "field": "table_",
                                "value": indicador_generico.entidadobj.id
                            },
                            {
                                "field": "registro",
                                "value": indicador_generico2.evento_indicador.replaceAll('g', '')
                            },
                            {
                                "field": "related",
                                "value": 3
                            },
                            {
                                "field": "compania",
                                "value": indicador_generico.session.compania_id
                            }
                        ];
                    } else {
                        indicador_generico.fixFilters = [
                            {
                                "field": "table_",
                                "value": indicador_generico.entidadobj.id
                            },
                            {
                                "field": "registro",
                                "value": indicador_generico2.evento_indicador
                            },
                            {
                                "field": "related",
                                "value": 0
                            },
                            {
                                "field": "compania",
                                "value": indicador_generico.session.compania_id
                            }
                        ];
                    }
                }
                CRUD_indicador_generico.table.columns = columns = {
                    id: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        dead: true
                    },
                    registro: {
                        label: "Registro",
                    },
                    nombre_indicador: {
                        // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        label: function () {
                            return "Nombre del Indicador"
                        },
                        shorttext: 370
                    },
                    departamento_nombre: {
                        label: function () {
                            return "Departamento"
                        }
                    },
                    descripcion_indicador: {
                        label: function () {
                            return "Descripción del Indicador"
                        },
                        shorttext: 370
                    },
                    fuente: {
                        label: function () {
                            return "Fuente del Indicador"
                        },
                        shorttext: 370
                    },
                    metodo: {
                        label: function () {
                            return "Método de Cálculo"
                        },
                        shorttext: 370
                    },
                    desagregacion_demografica_geografia: {
                        label: function () {
                            return "Desagregación Demográfica Geográfica";
                        },
                        shorttext: 370
                    },
                    caracteristica: {
                        label: function () {
                            return "Características del Indicador";
                        },
                        shorttext: 370
                    },
                    tipo_meta: {
                        label: function () {
                            return "Tipo de dato de la Meta";
                        }
                    },
                    direccion_meta: {
                        label: function () {
                            return "Dirección de la Meta"
                        }
                    },
                    ano: {
                        label: function () {
                            return "Año a evaluar"
                        }
                    },
                    ano_linea_base: {
                        label: function () {
                            return "Año Línea Base"
                        }
                    },
                    linea: {
                        label: function () {
                            return "Línea Base";
                        },
                        shorttext: 370,
                        format: function (row) {
                            if (row.linea) {
                                switch (row.tipo_meta) {
                                    case 'Porcentaje':
                                        return row.linea + '%';
                                        break;
                                    case 'Decimal':
                                        return LAN.money(row.linea).format(false);
                                        break;
                                    case 'Dinero':
                                        return `${LAN.money(row.linea).format(true)}`;
                                        break;
                                    default : {
                                        return row.linea;
                                    }
                                }
                            }
                        },
                    },
                    medio_verificacion: {
                        // label: "Medio de Verificación",
                        label: function () {
                            return "Medio de Verificación"
                        },
                        shorttext: 370
                    },
                    observacion: {
                        label: "Observación",
                        shorttext: 370
                    }
                };
                if (indicador_generico2.form)
                    if (indicador_generico2.form.options)
                        if (indicador_generico2.form.options.indicador_generico_entidad)
                            indicador_generico2.form.options.indicador_generico_entidad.disabled = true;
            } else {
                indicador_generico.fixFilters = [
                    {
                        "field": "compania",
                        "value": user.compania_id
                    },
                    {
                        "field": "table_",
                        "value": indicador_generico.entidadobj.id
                    },
                ];
                CRUD_indicador_generico.table.columns = columns = {
                    id: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        dead: true
                    },
                    registro: {
                        label: "Registro",
                    },
                    nombre_indicador: {
                        // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        label: function () {
                            return "Nombre del Indicador"
                        },
                        shorttext: 370
                    },
                    descripcion_indicador: {
                        label: function () {
                            return "Descripción del Indicador"
                        },
                        shorttext: 370
                    },
                    fuente: {
                        label: function () {
                            return "Fuente del Indicador"
                        },
                        shorttext: 370
                    },
                    metodo: {
                        label: function () {
                            return "Método de Cálculo"
                        },
                        shorttext: 370
                    },
                    desagregacion_demografica_geografia: {
                        label: function () {
                            return "Desagregación Demográfica Geográfica";
                        },
                        shorttext: 370
                    },
                    caracteristica: {
                        label: function () {
                            return "Características del Indicador";
                        },
                        shorttext: 370
                    },
                    tipo_meta: {
                        label: function () {
                            return "Tipo de dato de la Meta";
                        }
                    },
                    direccion_meta: {
                        label: function () {
                            return "Dirección de la Meta"
                        }
                    },
                    ano: {
                        label: function () {
                            return "Año a evaluar"
                        }
                    },
                    ano_linea_base: {
                        label: function () {
                            return "Año Línea Base"
                        }
                    },
                    linea: {
                        label: function () {
                            return "Línea Base";
                        },
                        shorttext: 370,
                        format: function (row) {
                            if (row.linea) {
                                switch (row.tipo_meta) {
                                    case 'Porcentaje':
                                        return row.linea + '%';
                                        break;
                                    case 'Decimal':
                                        return LAN.money(row.linea).format(false);
                                        break;
                                    case 'Dinero':
                                        return `${LAN.money(row.linea).format(true)}`;
                                        break;
                                    default : {
                                        return row.linea;
                                    }
                                }
                            }
                        },
                    },
                    medio_verificacion: {
                        // label: "Medio de Verificación",
                        label: function () {
                            return "Medio de Verificación"
                        },
                        shorttext: 370
                    },
                    observacion: {
                        label: "Observación",
                        shorttext: 370
                    }
                };
            }

            indicador_generico2.indicador_generico_entidad = indicador_generico.entidadobj.table_;
            indicador_generico.refresh();
            indicador_generico.eltipo = true;
        } else {
            indicador_generico.tipos = await BASEAPI.listp('indicador_generico_entidad', {limit: 0});
            indicador_generico.tipos = indicador_generico.tipos.data;
            indicador_generico.plural = indicador_generico.entidadobj.name + ` `;
            if (indicador_generico.entidad == "vw_evento_indicador") {
                indicador_generico.singular = indicador_generico.entidadobj.name + ' del evento: ' + indicador_generico2.form.selected('evento_indicador').nombre;
            } else {
                indicador_generico.singular = indicador_generico.entidadobj.name + ` `;
            }
            indicador_generico.headertitle = indicador_generico.entidadobj.name + ` `;
            indicador_generico.runMagicColum('tipo_meta', 'tipoMeta', "id", "nombre");
            indicador_generico.runMagicColum('direccion_meta', 'direccionMeta', "id", "nombre");
            if (indicador_generico.entidad == "vw_evento_indicador") {
                if (indicador_generico2.evento_indicador.includes('r')) {
                    indicador_generico.runMagicColum('registro', "evento_indicador_relacion", "id", indicador_generico.entidadobj.label);
                } else if (indicador_generico2.evento_indicador.includes('s')) {
                    indicador_generico.runMagicColum('registro', "ser_salida", "id", indicador_generico.entidadobj.label);
                    CRUD_indicador_generico.table.columns.registro.label = function () {
                        return "Salida No Conforme";
                    };
                } else if (indicador_generico2.evento_indicador.includes('g')) {
                    indicador_generico.runMagicColum('registro', "riesgo_a", "id", indicador_generico.entidadobj.label);
                    CRUD_indicador_generico.table.columns.registro.label = function () {
                        return "Riesgo";
                    };
                } else {
                    indicador_generico.runMagicColum('registro', indicador_generico.entidadobj.table_, "id", indicador_generico.entidadobj.label);
                }
            } else {
                indicador_generico.runMagicColum('registro', indicador_generico.entidadobj.table_, "id", indicador_generico.entidadobj.label);
                CRUD_indicador_generico.table.columns.registro.label = function () {
                    return indicador_generico.entidadobj.name;
                };
            }
            CRUD_indicador_generico.table.filters.columns[0].label = indicador_generico.entidadobj.name;
            CRUD_indicador_generico.table.filters.columns[0].table = indicador_generico.entidadobj.table_;
            CRUD_indicador_generico.table.filters.columns[0].text = `item.${indicador_generico.entidadobj.label}`;
            CRUD_indicador_generico.table.filters.columns[0].query.where = eval(indicador_generico.entidadobj.where);
            indicador_generico.runMagicManyToMany('caracteristica', "caracteristica_indicador", "indicador_generico", "id", 'nombre', "caracteristica_indicador_generico", "caracteristica", "id");
            check_poa_close(indicador_generico, user);
            $('.has-colspan').attr('rowspan', 3);
            $('.has-colspan').css('vertical-align', 'middle');
            BASEAPI.listp('vw_indicador_generico_periodo', {
                limit: 0
            }).then(function (rs) {
                if (rs.data) {
                    indicador_generico.pei_ano = rs.data;
                    for (var c = 1; c <= user.cantidad; c++) {
                        for (var l = 0; l < indicador_generico.records.data.length; l++) {
                            selected = indicador_generico.pei_ano.filter(information => {
                                if (information.indicador_generico == indicador_generico.records.data[l].id && information.periodo == c) {
                                    return true;
                                }
                            });
                            eval(`
                                if (typeof indicador_generico.records.data[${l}].periodo == 'undefined') {
                                    indicador_generico.records.data[${l}].periodo = [];
                                }
                            `);
                            if (selected.length > 0) {
                                eval(`indicador_generico.records.data[${l}].periodo.push("${selected[0].valor}")`);
                                eval(`indicador_generico.records.data[${l}].periodo.push("${selected[0].valor_alcanzado}")`);
                                eval(`indicador_generico.records.data[${l}].periodo.push("${selected[0].varianzas}")`);
                            } else {
                                eval(`indicador_generico.records.data[${l}].periodo.push("")`);
                                eval(`indicador_generico.records.data[${l}].periodo.push("")`);
                                eval(`indicador_generico.records.data[${l}].periodo.push("")`);
                            }

                        }
                    }
                    indicador_generico.refreshAngular();
                }
            });
            for (var i of indicador_generico.records.data) {
                if (i.id_estatus == ENUM_2.presupuesto_estatus.Completado || i.id_estatus == ENUM_2.presupuesto_estatus.Trabajado) {
                    if (user.groups[0].caracteristica == ENUM_2.Grupos.director_departamental || user.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                        indicador_generico.dont_show = true;
                    } else {
                        indicador_generico.dont_show = false;
                    }
                }
            }
            indicador_generico.refreshAngular();
        }
    };
    indicador_generico.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        // if (LAN.money(indicador_generico.ano_linea_base).value > LAN.money(indicador_generico.session.periodo_poa).value) {
        //     SWEETALERT.show({
        //         type: "error",
        //         message: "El Año Línea Base no puede ser mayor al año del POA que se está trabajando"
        //     });
        //     var buttons = document.getElementsByClassName("btn btn-labeled");
        //     for (var item of buttons) {
        //         item.disabled = false;
        //     }
        //     resolve(false);
        // } else {
        resolve(true);
        // }
    });
    indicador_generico.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        // if (LAN.money(indicador_generico.ano_linea_base).value > LAN.money(indicador_generico.session.periodo_poa).value) {
        //     SWEETALERT.show({
        //         type: "error",
        //         message: "El Año Línea Base no puede ser mayor al año del POA que se está trabajando"
        //     });
        //     var buttons = document.getElementsByClassName("btn btn-labeled");
        //     for (var item of buttons) {
        //         item.disabled = false;
        //     }
        //     resolve(false);
        // } else {
        for (var i in indicador_generico.validate) {
            if (LAN.money(i.split("periodos").pop()).value > 12) {
                delete indicador_generico.validate[i];
            }
        }
        if (indicador_generico.ano_linea_base)
            data.updating.ano_linea_base = indicador_generico.ano_linea_base;
        if (indicador_generico.linea_base)
            data.updating.linea_base = indicador_generico.linea_base;
        resolve(true);
        // }
    });

    indicador_generico.list_indicador_generico_periodo = [];
    indicador_generico.list_indicador_generico_periodo_unchanged = [];
    indicador_generico.valores = [];
    indicador_generico.list_mes = [];

    if (indicador_generico.entidad != "vw_ods") {
        indicador_generico.fixFilters = [
            {
                "field": "compania",
                "value": user.compania_id
            }
        ];
    }


    indicador_generico.getIMesNew = function () {
        //agregar el parametro de periodo a la funcion si se va a utilizar los periodos dinamicos
        indicador_generico.list_mes = [];
        indicador_generico.valores = [];
        indicador_generico.limpiar = false;
        for (var s = 1; s <= user.cantidad; s++) {
            indicador_generico.list_mes.push(s);
        }
        for (var i of indicador_generico.list_mes) {
            eval(`indicador_generico.form.schemas.insert.periodos${i} = FORM.schemasType.calculated`);
        }
        indicador_generico.control.input("#subcontainerLineaBase", "linea_base", {
            maxlength: 11, popover: {
                title: "Línea Base",
                content: "Captura la  Línea Base"
            }
        }, false, '', "Línea Base", false);
        $(".clearHtml").html('');
        indicador_generico.applyMasks();
        indicador_generico.refreshAngular();
    };


    indicador_generico.getIDedit = function () {
        if (indicador_generico.form.mode === FORM.modes.edit) {
            indicador_generico.list_indicador_generico_periodo = [];
            indicador_generico.list_indicador_generico_periodo_unchanged = [];
            indicador_generico.valores = [];
            indicador_generico.limpiar = false;
            BASEAPI.listp('indicador_generico_periodo', {
                limit: 0,
                page: 1,
                orderby: "id",
                order: "asc",
                where: [{
                    field: "indicador_generico",
                    value: indicador_generico.id || -1
                }]
            }).then(function (result) {
                let exist = baseController.poa_monitorieo.filter(d => {
                    return d.cantidad === result.data.length
                })[0];
                if (exist) {
                    user.monitoreo_nombre = exist.nombre_mostrar;
                } else {
                    user.monitoreo_nombre = "Periodo ";
                }
                indicador_generico.list_indicador_generico_periodo_unchanged = result.data;
                indicador_generico.list_indicador_generico_periodo = result.data;
                for (var key in indicador_generico.list_indicador_generico_periodo) {
                    indicador_generico.valores[indicador_generico.list_indicador_generico_periodo[key].id] = indicador_generico.list_indicador_generico_periodo[key].valor;
                    eval(`indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id} = indicador_generico.list_indicador_generico_periodo[key].valor`);
                    eval(`indicador_generico.form.schemas.insert.periodos${indicador_generico.list_indicador_generico_periodo[key].id} = FORM.schemasType.calculated`);

                }
                indicador_generico.applyMasks();
                indicador_generico.refreshAngular();
            });
        }
    };

    indicador_generico.no_trabaja_poa = function () {
        if (indicador_generico.group_caracteristica != ENUM_2.Grupos.analista_departamental && indicador_generico.group_caracteristica != ENUM_2.Grupos.director_departamental) {
            return true;
        } else {
            return false;
        }
    };

    indicador_generico.triggers.table.after.insert = function (data) {
        var groupInsert = [];
        for (let i = 0; i < indicador_generico.list_mes.length; i++) {
            groupInsert.push({
                "indicador_generico": data.inserted.id,
                "created_at": "$now()",
                "created_by": user.usuario_id,
                "valor": (indicador_generico.tipo_meta == "5" && eval(`indicador_generico.periodos${indicador_generico.list_mes[i]}`) ? eval(`indicador_generico.periodos${indicador_generico.list_mes[i]}`).replace('$', '') : eval(`indicador_generico.periodos${indicador_generico.list_mes[i]}`)) || 0,
                "periodo": indicador_generico.list_mes[i]
            });
        }
        console.log(indicador_generico.list_mes, groupInsert, "entré?")
        BASEAPI.insert('indicador_generico_periodo', groupInsert, function (result) {

        });
        indicador_generico.linea_base = indicador_generico.linea_base ? indicador_generico.linea_base.replace('$', '') : "";
        indicador_generico.list_mes = [];
        for (var i in indicador_generico) if (i.indexOf("periodos") !== -1) eval(`delete indicador_generico.${i}`);
        setTimeout(function () {
            location.reload()
        }, 500);

        return false;
    };


    indicador_generico.triggers.table.after.update = async function (data) {
        if (indicador_generico.list_indicador_generico_periodo.some(d => {
            return typeof d == "object"
        })) {
            for (var key in indicador_generico.list_indicador_generico_periodo) {
                indicador_generico.valores[indicador_generico.list_indicador_generico_periodo[key].id] = indicador_generico.list_indicador_generico_periodo[key].valor;
            }
            for (var key in indicador_generico.valores) {
                await BASEAPI.updateallp('indicador_generico_periodo', {
                    "valor": indicador_generico.tipo_meta == "5" && eval(`indicador_generico.periodos${key}`) ? eval(`indicador_generico.periodos${key}`).replace('$', '') : eval(`indicador_generico.periodos${key}`),
                    "updated_at": "$now()",
                    "created_by": user.usuario_id,
                    where: [{
                        "field": "id",
                        "value": key
                    }]
                });
            }
        } else {
            let groupInsert = [];
            for (let i = 0; i < indicador_generico.list_mes.length; i++) {
                groupInsert.push({
                    "indicador_generico": indicador_generico.id,
                    "created_at": "$now()",
                    "created_by": user.usuario_id,
                    "valor": (indicador_generico.tipo_meta == "5" && eval(`indicador_generico.periodos${indicador_generico.list_mes[i]}`) ? eval(`indicador_generico.periodos${indicador_generico.list_mes[i]}`).replace('$', '') : eval(`indicador_generico.periodos${indicador_generico.list_mes[i]}`)) || 0,
                    "periodo": indicador_generico.list_mes[i]
                });
            }
            BASEAPI.deleteall('indicador_generico_periodo', [
                {
                    field: "indicador_generico",
                    value: indicador_generico.id
                }
            ], (result) => {
                console.log(indicador_generico.list_mes, groupInsert, "entré?")
                if (result) {
                    BASEAPI.insert('indicador_generico_periodo', groupInsert, function (result) {

                    });
                }
            });
        }
        if (indicador_generico.linea_base)
            indicador_generico.linea_base = indicador_generico.linea_base ? indicador_generico.linea_base.replace('$', '') : "";
        indicador_generico.list_indicador_generico_periodo = [];
        for (var i in indicador_generico) if (i.indexOf("periodos") !== -1) eval(`delete indicador_generico.${i}`);
        setTimeout(function () {
            location.href = location.href;
            location.reload();
        }, 500);
        return false;
    };
    indicador_generico.formulary = async function (data, mode, defaultData) {
        if (indicador_generico !== undefined) {
            indicador_generico.initiation = true;
            var do_once = false;
            var do_once_tp = false;
            var do_once_dp = false;
            indicador_generico.triggers.table.after.control = function (data) {

                if (data == "tipo_meta" && mode != "new" && indicador_generico.initiation) {
                    $(".subcontainer2").html('');
                    indicador_generico.getIDedit();
                    indicador_generico.initiation = false;
                }
                if (data == "tipo_meta" && mode == "new" && indicador_generico.initiation) {
                    $(".subcontainer1").html('');
                    indicador_generico.getIMesNew();
                    indicador_generico.initiation = false;
                }
                if (data == 'poa_monitoreo') {
                    if (mode === "new" && !do_once) {
                        if (!indicador_generico.poa_monitoreo || indicador_generico.poa_monitoreo === '[NULL]') {
                            indicador_generico.form.loadDropDown('poa_monitoreo');
                            do_once = true;
                        }
                    }
                    if (mode === "edit" && !do_once) {
                        indicador_generico.form.loadDropDown('poa_monitoreo');
                        do_once = true;
                    }
                }
                if (data == 'tipo_meta') {
                    if (mode === "new" && !do_once_tp) {
                        if (!indicador_generico.tipo_meta || indicador_generico.tipo_meta === '[NULL]') {
                            indicador_generico.form.loadDropDown('tipo_meta');
                            do_once_tp = true;
                        }
                    }
                    if (mode === "edit" && !do_once_tp) {
                        indicador_generico.form.loadDropDown('tipo_meta');
                        do_once_tp = true;
                    }
                }
                if (data == 'direccion_meta') {
                    if (mode === "edit" && !do_once_dp) {
                        do_once_dp = true;
                        indicador_generico.oldData_forAudit = indicador_generico.form.getAudit();
                    }
                }
                if (data == 'registro') {
                    indicador_generico.form.options.registro.label = indicador_generico.entidadobj.name;
                    indicador_generico.refreshAngular();
                }
            };
            indicador_generico.form.titles = {
                new: "Nuevo Indicador - " + indicador_generico.entidadobj.name,
                edit: "Editar Indicador - " + indicador_generico.entidadobj.name,
                view: "Ver ALL Indicador - " + indicador_generico.entidadobj.name
            };
            indicador_generico.triggers.table.after.close = function () {
                indicador_generico.paso = true;
                RUN_B("indicador_generico", indicador_generico, $scope, $http, $compile);
            };
            RUN_B("indicador_generico", indicador_generico, $scope, $http, $compile);
            if (indicador_generico.entidad == "vw_evento_indicador") {
                if (indicador_generico2.evento_indicador.includes('r')) {
                    indicador_generico.form.readonly = {
                        table_: indicador_generico.entidadobj.id,
                        compania: indicador_generico.session.compania_id,
                        institucion: indicador_generico.session.institucion_id,
                        poa: indicador_generico.session.poa_id,
                        registro: indicador_generico2.evento_indicador.replaceAll('r', ''),
                        related: 1
                    };
                } else if (indicador_generico2.evento_indicador.includes('s')) {
                    indicador_generico.form.readonly = {
                        table_: indicador_generico.entidadobj.id,
                        compania: indicador_generico.session.compania_id,
                        institucion: indicador_generico.session.institucion_id,
                        poa: indicador_generico.session.poa_id,
                        registro: indicador_generico2.evento_indicador.replaceAll('s', ''),
                        related: 2
                    };
                } else if (indicador_generico2.evento_indicador.includes('g')) {
                    indicador_generico.form.readonly = {
                        table_: indicador_generico.entidadobj.id,
                        compania: indicador_generico.session.compania_id,
                        institucion: indicador_generico.session.institucion_id,
                        poa: indicador_generico.session.poa_id,
                        registro: indicador_generico2.evento_indicador.replaceAll('g', ''),
                        related: 3,
                        ano: indicador_generico.riesgo_ano
                    };
                } else {
                    indicador_generico.form.readonly = {
                        table_: indicador_generico.entidadobj.id,
                        compania: indicador_generico.session.compania_id,
                        institucion: indicador_generico.session.institucion_id,
                        poa: indicador_generico.session.poa_id,
                        registro: indicador_generico2.evento_indicador,
                        related: 0
                    };
                }
            } else if (indicador_generico.entidad == "vw_procesos") {
                indicador_generico.form.readonly = {
                    table_: indicador_generico.entidadobj.id,
                    compania: indicador_generico.session.compania_id,
                    institucion: indicador_generico.session.institucion_id,
                    poa: indicador_generico.session.poa_id,
                    ano: indicador_generico.mapa_ano
                };
            } else {
                indicador_generico.form.readonly = {
                    table_: indicador_generico.entidadobj.id,
                    compania: indicador_generico.session.compania_id,
                    institucion: indicador_generico.session.institucion_id,
                    poa: indicador_generico.session.poa_id,
                };
            }
            if (indicador_generico.entidadobj) {
                if (indicador_generico.entidad !== "vw_mods")
                    indicador_generico.selectQueries["registro"] = eval(indicador_generico.entidadobj.where);
            }
            indicador_generico.form.mode = mode;
            indicador_generico.createForm(data, mode, defaultData, undefined, function () {
                indicador_generico.tipo_meta_old = indicador_generico.tipo_meta;
                indicador_generico.direccion_meta_old = indicador_generico.direccion_meta;
                indicador_generico.poa_monitoreo_old = indicador_generico.poa_monitoreo;
            });

            indicador_generico.applyMasks = async function () {
                if (indicador_generico.working)
                    return;
                indicador_generico.working = true;
                indicador_generico.applyMasksfalse = true;
                switch (indicador_generico.tipo_meta) {
                    case "2": {
                        await indicador_generico.control.indice("#subcontainerLineaBase", "linea_base", {
                            maxlength: 1, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_generico.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_generico.list_mes) {
                                await indicador_generico.control.indice(".subcontainer1", "periodos" + indicador_generico.list_mes[key], {
                                    maxlength: 1, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_mes[key]}`, `periodos${indicador_generico.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_generico.poa_monitoreo_viejo == indicador_generico.poa_monitoreo && !indicador_generico.done) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.indice(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key].id, {
                                        maxlength: 1, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id}`, `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                                indicador_generico.done = true;
                            } else {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    delete indicador_generico.validate[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    delete indicador_generico[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    indicador_generico.form.fileds = indicador_generico.form.fileds.filter(x => x !== `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                }
                                indicador_generico.list_indicador_generico_periodo = indicador_generico.list_mes;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.indice(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key], {
                                        maxlength: 1, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]}`, `periodos${indicador_generico.list_indicador_generico_periodo[key]}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_generico.limpiar = true;
                        break;
                    }
                    case "5": {
                        await indicador_generico.control.money("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_generico.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_generico.list_mes) {
                                await indicador_generico.control.money(".subcontainer1", "periodos" + indicador_generico.list_mes[key], {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_mes[key]}`, `periodos${indicador_generico.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_generico.poa_monitoreo_viejo == indicador_generico.poa_monitoreo && !indicador_generico.done) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.money(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key].id, {
                                        maxlength: 22, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id}`, `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                                indicador_generico.done = true;
                            } else {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    delete indicador_generico.validate[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    delete indicador_generico[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    indicador_generico.form.fileds = indicador_generico.form.fileds.filter(x => x !== `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                }
                                indicador_generico.list_indicador_generico_periodo = indicador_generico.list_mes;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.money(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key], {
                                        maxlength: 22, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]}`, `periodos${indicador_generico.list_indicador_generico_periodo[key]}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_generico.limpiar = true;
                        break;
                    }
                    case "4": {
                        await indicador_generico.control.decimal("#subcontainerLineaBase", "linea_base", {
                            maxlength: 22, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_generico.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_generico.list_mes) {
                                await indicador_generico.control.decimal(".subcontainer1", "periodos" + indicador_generico.list_mes[key], {
                                    maxlength: 22, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_mes[key]}`, `periodos${indicador_generico.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_generico.poa_monitoreo_viejo == indicador_generico.poa_monitoreo && !indicador_generico.done) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.decimal(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key].id, {
                                        maxlength: 22, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id}`, `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                                indicador_generico.done = true;
                            } else {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    delete indicador_generico.validate[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    delete indicador_generico[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    indicador_generico.form.fileds = indicador_generico.form.fileds.filter(x => x !== `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                }
                                indicador_generico.list_indicador_generico_periodo = indicador_generico.list_mes;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.decimal(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key], {
                                        maxlength: 22, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]}`, `periodos${indicador_generico.list_indicador_generico_periodo[key]}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_generico.limpiar = true;
                        break;
                    }
                    case "1": {
                        await indicador_generico.control.percentage("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_generico.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_generico.list_mes) {
                                await indicador_generico.control.percentage(".subcontainer1", "periodos" + indicador_generico.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_mes[key]}`, `periodos${indicador_generico.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_generico.poa_monitoreo_viejo == indicador_generico.poa_monitoreo && !indicador_generico.done) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.percentage(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key].id, {
                                        popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id}`, `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                                indicador_generico.done = true;
                            } else {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    delete indicador_generico.validate[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    delete indicador_generico[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    indicador_generico.form.fileds = indicador_generico.form.fileds.filter(x => x !== `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                }
                                indicador_generico.list_indicador_generico_periodo = indicador_generico.list_mes;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.percentage(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key], {
                                        popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]}`, `periodos${indicador_generico.list_indicador_generico_periodo[key]}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_generico.limpiar = true;
                        break;
                    }
                    case "6": {
                        await indicador_generico.control.integer("#subcontainerLineaBase", "linea_base", {
                            popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);
                        if (indicador_generico.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_generico.list_mes) {
                                await indicador_generico.control.integer(".subcontainer1", "periodos" + indicador_generico.list_mes[key], {
                                    popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_mes[key]}`, `periodos${indicador_generico.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_generico.poa_monitoreo_viejo == indicador_generico.poa_monitoreo && !indicador_generico.done) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.integer(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key].id, {
                                        popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id}`, `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                                indicador_generico.done = true;
                            } else {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    delete indicador_generico.validate[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    delete indicador_generico[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    indicador_generico.form.fileds = indicador_generico.form.fileds.filter(x => x !== `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                }
                                indicador_generico.list_indicador_generico_periodo = indicador_generico.list_mes;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.integer(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key], {
                                        popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadores(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]}`, `periodos${indicador_generico.list_indicador_generico_periodo[key]}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_generico.limpiar = true;
                        break;
                    }
                    case "3": {
                        //absoluto
                        await indicador_generico.control.valor_absoluto("#subcontainerLineaBase", "linea_base", {
                            maxlength: 11, popover: {
                                title: "Línea Base",
                                content: "Captura la  Línea Base"
                            }
                        }, false, '', "Línea Base", false);

                        if (indicador_generico.form.mode !== FORM.modes.edit) {
                            var conuntPeriodo2 = 1;
                            for (var key in indicador_generico.list_mes) {
                                await indicador_generico.control.valor_absoluto(".subcontainer1", "periodos" + indicador_generico.list_mes[key], {
                                    maxlength: 11, popover: {
                                        title: user.monitoreo_nombre + ' ' + conuntPeriodo2,
                                        content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo2
                                    }
                                }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo2, false);
                                watchIndicadoresValorAbsoluto(indicador_generico, `indicador_generico.periodos${indicador_generico.list_mes[key]}`, `periodos${indicador_generico.list_mes[key]}`);
                                conuntPeriodo2++;
                            }
                        } else {
                            if (indicador_generico.poa_monitoreo_viejo == indicador_generico.poa_monitoreo && !indicador_generico.done) {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.valor_absoluto(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key].id, {
                                        maxlength: 11, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadoresValorAbsoluto(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id}`, `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key].id} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                                indicador_generico.done = true;
                            } else {
                                var conuntPeriodo = 1;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    delete indicador_generico.validate[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    delete indicador_generico[`periodos${indicador_generico.list_indicador_generico_periodo[key].id}`];
                                    indicador_generico.form.fileds = indicador_generico.form.fileds.filter(x => x !== `periodos${indicador_generico.list_indicador_generico_periodo[key].id}`);
                                }
                                indicador_generico.list_indicador_generico_periodo = indicador_generico.list_mes;
                                for (var key in indicador_generico.list_indicador_generico_periodo) {
                                    await indicador_generico.control.valor_absoluto(".subcontainer2", "periodos" + indicador_generico.list_indicador_generico_periodo[key], {
                                        maxlength: 11, popover: {
                                            title: user.monitoreo_nombre + ' ' + conuntPeriodo,
                                            content: "Captura el " + user.monitoreo_nombre + ' ' + conuntPeriodo
                                        }
                                    }, true, 3, user.monitoreo_nombre + ' ' + conuntPeriodo, false);
                                    watchIndicadoresValorAbsoluto(indicador_generico, `indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]}`, `periodos${indicador_generico.list_indicador_generico_periodo[key]}`);
                                    eval(`
                                        if (indicador_generico.limpiar) {
                                            indicador_generico.periodos${indicador_generico.list_indicador_generico_periodo[key]} = "";
                                            indicador_generico.linea_base = "";
                                        }
                                    `);
                                    conuntPeriodo++;
                                }
                            }
                        }
                        indicador_generico.limpiar = true;
                        break;
                    }
                    default: {

                    }

                }
                indicador_generico.applyMasksfalse = false;
                indicador_generico.refreshAngular();
                indicador_generico.working = false;
                delete indicador_generico.yadata;
                indicador_generico.form.oldData['Nombre'] = indicador_generico.oldData_forAudit['Nombre'];
                indicador_generico.form.oldData['Año'] = indicador_generico.oldData_forAudit['Año'];
                indicador_generico.form.oldData['Año Línea Base'] = indicador_generico.oldData_forAudit['Año Línea Base'];
                indicador_generico.form.oldData['Característica de indicador '] = indicador_generico.oldData_forAudit['Característica de indicador '];
                indicador_generico.form.oldData['Departamentos'] = indicador_generico.oldData_forAudit['Departamentos'];
                indicador_generico.form.oldData['Desagregacion_demografica_geografia'] = indicador_generico.oldData_forAudit['Desagregacion_demografica_geografia'];
                indicador_generico.form.oldData['Descripción'] = indicador_generico.oldData_forAudit['Descripción'];
                indicador_generico.form.oldData['Dirección de la meta'] = indicador_generico.oldData_forAudit['Dirección de la meta'];
                indicador_generico.form.oldData['Fuente'] = indicador_generico.oldData_forAudit['Fuente'];
                indicador_generico.form.oldData['Medio de verificación'] = indicador_generico.oldData_forAudit['Medio de verificación'];
                indicador_generico.form.oldData['Método cálculo'] = indicador_generico.oldData_forAudit['Método cálculo'];
                indicador_generico.form.oldData['Observación'] = indicador_generico.oldData_forAudit['Observación'];
                indicador_generico.form.oldData.Periodicidad = indicador_generico.poa_monitoreo_old_audit;
                indicador_generico.form.oldData['Dirección de la meta'] = indicador_generico.oldData_forAudit['Dirección de la meta']
                indicador_generico.form.oldData['Tipo de dato de la meta'] = indicador_generico.oldData_forAudit['Tipo de dato de la meta']
            };

            indicador_generico.form.schemas.insert.fecha_inicio = FORM.schemasType.calculated;
            indicador_generico.form.schemas.insert.fecha_fin = FORM.schemasType.calculated;

            var f = new Date();
            var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();


            indicador_generico.$scope.$watch('indicador_generico.registro', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                if (indicador_generico.entidad == "vw_proyecto_item"){
                    rules.push(VALIDATION.yariel.noStatus(value, indicador_generico.proyectos_list, 3));
                }
                VALIDATION.validate(indicador_generico, "registro", rules)
            });

            indicador_generico.$scope.$watch('indicador_generico.nombre', function (value) {
                var rules = [];
                if (value == "" || value == null) {
                    rules.push(VALIDATION.general.required(value));
                }
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_generico, "nombre", rules)
            });

            indicador_generico.$scope.$watch('indicador_generico.poa_monitoreo', async function (value) {
                var rules = [];
                if (indicador_generico.list_indicador_generico_periodo_unchanged.length > 0 && indicador_generico.form.mode == "edit") {
                    rules.push(VALIDATION.yariel.meta_alcanzada_indicador(indicador_generico.list_indicador_generico_periodo_unchanged, "Periodicidad", indicador_generico.poa_monitoreo_old, indicador_generico.poa_monitoreo, function (result) {
                        if (!result) {
                            indicador_generico.initiation = true;
                        }
                    }));
                }
                if ((value !== undefined || value !== "[NULL]") && !indicador_generico.initiation) {
                    if (indicador_generico.form.selected('poa_monitoreo')) {
                        user.cantidad = indicador_generico.form.selected('poa_monitoreo').cantidad;
                        user.monitoreo_nombre = indicador_generico.form.selected('poa_monitoreo').nombre_mostrar;
                        indicador_generico.periodolist = [];
                        for (var p = 1; p <= 12; p++) {
                            if (indicador_generico.validate["periodos" + p])
                                delete indicador_generico.validate["periodos" + p];
                        }
                        for (var p = 1; p <= user.cantidad; p++) {
                            indicador_generico.periodolist.push({periodo: user.monitoreo_nombre + ' ' + p});
                        }
                        $(".subcontainer2").html('');
                        indicador_generico.getIMesNew();
                        indicador_generico.applyMasks();
                    }
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_generico, "poa_monitoreo", rules);
            });

            indicador_generico.$scope.$watch('indicador_generico.fuente', function (value) {
                var rules = [];

                VALIDATION.validate(indicador_generico, "fuente", rules)
            });


            indicador_generico.$scope.$watch('indicador_generico.tipo_meta', function (value) {
                var rules = [];
                if (indicador_generico.list_indicador_generico_periodo_unchanged.length > 0 && indicador_generico.form.mode == "edit") {
                    rules.push(VALIDATION.yariel.meta_alcanzada_indicador(indicador_generico.list_indicador_generico_periodo_unchanged, "Tipo de dato de la meta", indicador_generico.tipo_meta_old, indicador_generico.tipo_meta, function (result) {
                        if (!result) {
                            indicador_generico.initiation = true;
                        }
                    }));
                }
                if (value && !indicador_generico.initiation) {
                    indicador_generico.tipo_meta = value + "";
                    $(".subcontainer2").html('');
                    indicador_generico.getIMesNew();
                    indicador_generico.applyMasks();
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_generico, "tipo_meta", rules);
            });

            indicador_generico.$scope.$watch('indicador_generico.direccion_meta', function (value) {
                var rules = [];
                if (indicador_generico.list_indicador_generico_periodo_unchanged.length > 0 && indicador_generico.form.mode == "edit") {
                    rules.push(VALIDATION.yariel.meta_alcanzada_indicador(indicador_generico.list_indicador_generico_periodo_unchanged, "Dirección de la meta", indicador_generico.direccion_meta_old, indicador_generico.direccion_meta));
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_generico, "direccion_meta", rules)
            });

            indicador_generico.$scope.$watch('indicador_generico.ano_linea_base', function (value) {
                var rules = [];
                VALIDATION.validate(indicador_generico, "ano_linea_base", rules)
            });
            indicador_generico.$scope.$watch('indicador_generico.linea_base', function (value) {
                indicador_generico.linea_base = value ? value.replace("$", "") : value;
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_generico, "linea_base", rules)
            });

            indicador_generico.$scope.$watch('indicador_generico.medio_verificacion', function (value) {
                var rules = [];

                VALIDATION.validate(indicador_generico, "medio_verificacion", rules)
                VALIDATION.validate(indicador_generico, "medio_verificacion", rules)
            });

            indicador_generico.$scope.$watch('indicador_generico.metodo_calculo', function (value) {
                var rules = [];

                VALIDATION.validate(indicador_generico, "metodo_calculo", rules)
                VALIDATION.validate(indicador_generico, "metodo_calculo", rules)

            });
            indicador_generico.$scope.$watch('indicador_generico.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(indicador_generico, "descripcion", rules)
            });
            indicador_generico.$scope.$watch('indicador_generico.ano', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(indicador_generico, "ano", rules)
            });

        }
    };
    indicador_generico.refreshAngularCustom = function () {
        indicador_generico.refreshAngular();
    }
});
