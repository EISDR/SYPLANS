app.controller("reporte_indicadores", function ($scope, $http, $compile) {
    reporte_indicadores = this;
    //reporte_indicadores.fixFilters = [];
    var user = new SESSION().current();
    reporte_indicadores.fixFilters = [{
        field: "id",
        value: -1
    }];
    reporte_indicadores.session = user;
    indicador_generico = null;
    //reporte_indicadores.singular = "singular";
    //reporte_indicadores.plural = "plural";
    //reporte_indicadores.headertitle = "Hola Title";
    reporte_indicadores.destroyForm = false;
    //reporte_indicadores.permissionTable = "tabletopermission";
    RUNCONTROLLER("reporte_indicadores", reporte_indicadores, $scope, $http, $compile);
    RUN_B("reporte_indicadores", reporte_indicadores, $scope, $http, $compile);
    reporte_indicadores.formulary = function (data, mode, defaultData) {
        if (reporte_indicadores !== undefined) {

            reporte_indicadores.form.modalWidth = ENUM.modal.width.full;
            reporte_indicadores.form.readonly = {compania: reporte_indicadores.session.compania_id};
            reporte_indicadores.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            reporte_indicadores.createForm(data, mode, defaultData);
            $scope.$watch("reporte_indicadores.1", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(reporte_indicadores, '1', rules);
            });
        }
    };
    reporte_indicadores.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        reporte_indicadores.entidadobj = await BASEAPI.firstp('vw_indicador_generico_entidad', {
            where: [{
                field: "table_",
                value: indicador_generico2.indicador_generico_entidad
            }]
        });

        if (indicador_generico2.indicador_generico_entidad == 'indicador_pei'){
            for (const d of reporte_indicadores.records.data) {
                d.cumplidor = await aacontroldemandofalso.cumplimiento(
                    "vw_report_indicadores_pei",
                    baseController.session,
                    "indicador_pei",
                    CONFIG.mysqlactive ? d.ID : d.id);
            }
            CRUD_reporte_indicadores.table.columns = {
                id: {
                    visible: false,
                    visibleDetail: false,
                    export: false,
                    exportExample: false,
                    dead: true
                },
                eje_estrategico: {
                    label: function() {
                        return "Eje Estrategico"
                    },
                },
                objetivo_estrategico: {
                    label: "Objetivo Estrategico",
                },
                estrategia: {
                    label: "Estrategia",
                },
                resultado: {
                    label: "Resultado",
                },
                indicador: {
                    // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                    label: function () {
                        return "Nombre del Indicador"
                    },
                    shorttext: 370
                },
                departamento: {
                    label: function () {
                        return "Unidad Ejecutora"
                    }
                },
                descripcion: {
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
                metodo_calculo: {
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
                ano_linea_base: {
                    label: function () {
                        return "Año Línea Base"
                    }
                },
                linea_base: {
                    label: function () {
                        return "Línea Base";
                    },
                    shorttext: 370,
                    format: function (row) {
                        if (row.linea_base) {
                            switch (row.tipo_meta) {
                                case 'Porcentaje':
                                    return row.linea_base + '%';
                                    break;
                                case 'Decimal':
                                    return LAN.money(row.linea_base).format(false);
                                    break;
                                case 'Dinero':
                                    return `${LAN.money(row.linea_base).format(true)}`;
                                    break;
                                default : {
                                    return row.linea_base;
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
            CRUD_reporte_indicadores.table.filters = {
                columns: [
                    {
                        key: 'id_eje_estrategico',
                        label: 'Eje Estratégico',
                        type: FILTER.types.relation,
                        table: 'eje_estrategico',
                        value: "id",
                        text: "item.no_orden + ' ' + item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei",
                                "value": reporte_indicadores.session ? reporte_indicadores.session.pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'id_objetivo_estrategico',
                        label: 'Objetivo Estratégico',
                        type: FILTER.types.relation,
                        table: 'vw_objetivo_estrategico',
                        value: "id",
                        text: "item.no_objetivo + ' ' + item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei_id",
                                "value": reporte_indicadores.session ? reporte_indicadores.session.pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'id_estrategia',
                        label: 'Estrategia',
                        type: FILTER.types.relation,
                        table: 'vw_estrategia',
                        value: "id",
                        text: "item.no_estrategia + ' ' + item.estrategia",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei",
                                "value": reporte_indicadores.session ? reporte_indicadores.session.pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'id_resultado',
                        label: 'Resultado esperado',
                        type: FILTER.types.relation,
                        table: 'vw_resultado',
                        value: "id",
                        text: "item.nombre",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [{
                                "field": "pei",
                                "value": reporte_indicadores.session ? reporte_indicadores.session.pei_id : -1
                            }],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'nombre',
                        label: function () {
                            return MESSAGE.i('planificacion.titleTablaIndicadorPEI');
                        },
                        type: FILTER.types.string,
                        placeholder: 'Estrategia'
                    },
                    {
                        key: 'id_departamento',
                        label: 'Unidad Ejecutora',
                        placeholder: 'Unidad Ejecutora',
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
                                    "value": reporte_indicadores.session ? reporte_indicadores.session.compania_id : -1
                                },
                                {
                                    "field": "institucion",
                                    "operator": reporte_indicadores.session.institucion_id ? "=" : "is",
                                    "value": reporte_indicadores.session ? reporte_indicadores.session.institucion_id ? reporte_indicadores.session.institucion_id : "$null" : -1
                                }
                            ],
                        }
                    },
                    {
                        key: 'descripcion',
                        label: 'Descripción',
                        type: FILTER.types.string,
                        placeholder: 'Descripción'
                    },
                    {
                        key: 'fuente',
                        label: 'Fuente',
                        type: FILTER.types.string,
                        placeholder: 'Fuente'
                    },
                    {
                        key: 'metodo_calculo',
                        label: 'Método Cálculo',
                        type: FILTER.types.string,
                        placeholder: 'Método Cálculo'
                    },
                    {
                        key: 'desagregacion_demografica_geografia',
                        label: 'Desagregación Demográfica Geográfica',
                        type: FILTER.types.string,
                        placeholder: 'Desagregación Demográfica Geográfica'
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
                        key: 'linea_base',
                        label: 'Línea Base',
                        type: FILTER.types.integer,
                        placeholder: 'Línea Base'
                    },
                    {
                        key: 'medio_verificacion',
                        label: 'Medio Verificación',
                        type: FILTER.types.string,
                        placeholder: 'Medio Verificación'
                    },
                    {
                        key: 'observacion',
                        label: 'Observación',
                        type: FILTER.types.string,
                        placeholder: 'Observación',
                        maxlength: 255
                    },
                ]
            }
        }else if (indicador_generico2.indicador_generico_entidad == 'productos_poa'){
            for (const d of reporte_indicadores.records.data) {
                d.cumplidor = await aacontroldemandofalso.cumplimiento(
                    "vw_report_indicadores_producto",
                    baseController.session,
                    "indicador_producto",
                    CONFIG.mysqlactive ? d.ID : d.id);
            }
            CRUD_reporte_indicadores.table.columns = {
                id: {
                    visible: false,
                    visibleDetail: false,
                    export: false,
                    exportExample: false,
                    dead: true
                },
                producto: {
                    label: "Producto",
                },
                indicador: {
                    // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                    label: function () {
                        return "Nombre del Indicador"
                    },
                    shorttext: 370
                },
                departamento: {
                    label: function () {
                        return "Unidad Ejecutora"
                    }
                },
                descripcion: {
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
                metodo_calculo: {
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
                ano_linea_base: {
                    label: function () {
                        return "Año Línea Base"
                    }
                },
                linea_base: {
                    label: function () {
                        return "Línea Base";
                    },
                    shorttext: 370,
                    format: function (row) {
                        if (row.linea_base) {
                            switch (row.tipo_meta) {
                                case 'Porcentaje':
                                    return row.linea_base + '%';
                                    break;
                                case 'Decimal':
                                    return LAN.money(row.linea_base).format(false);
                                    break;
                                case 'Dinero':
                                    return `${LAN.money(row.linea_base).format(true)}`;
                                    break;
                                default : {
                                    return row.linea_base;
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
            CRUD_reporte_indicadores.table.filters = {
                columns: [
                    {
                        key: 'id_producto',
                        label: reporte_indicadores.session.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
                        type: FILTER.types.relation,
                        table: 'vw_productos_poa_detalles',
                        value: "id",
                        text: "item.no1 + ' ' + item.producto",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [
                                {
                                    "field": "poa_id",
                                    "value": reporte_indicadores.session ? reporte_indicadores.session.poa_id : -1
                                }
                            ],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'nombre',
                        label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        type: FILTER.types.string,
                        placeholder: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        maxlength: 255
                    },
                    {
                        key: 'id_departamento',
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
                                    "value": reporte_indicadores.session ? reporte_indicadores.session.compania_id : -1
                                },
                                {
                                    "field": "institucion",
                                    "operator": reporte_indicadores.session.institucion_id ? "=" : "is",
                                    "value": reporte_indicadores.session ? reporte_indicadores.session.institucion_id ? reporte_indicadores.session.institucion_id : "$null" : -1
                                }
                            ],
                        }
                    },
                    {
                        key: 'descripcion',
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
                        key: 'desagregacion_demografica_geografia',
                        label: 'Desagregación Demográfica Geográfica',
                        type: FILTER.types.string,
                        placeholder: 'Desagregación Demográfica Geográfica'
                    },
                    {
                        key: 'metodo_calculo',
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
                        key: 'linea_base',
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
                        key: 'observacion',
                        label: 'Observación',
                        type: FILTER.types.string,
                        placeholder: 'Observación',
                        maxlength: 255
                    },
                ]
            }
        }else if (indicador_generico2.indicador_generico_entidad == 'actividades_poa'){
            for (const d of reporte_indicadores.records.data) {
                d.cumplidor = await aacontroldemandofalso.cumplimiento(
                    "vw_report_indicadores_actividad",
                    baseController.session,
                    "indicador_actividad",
                    CONFIG.mysqlactive ? d.ID : d.id);
            }
            CRUD_reporte_indicadores.table.columns = {
                id: {
                    visible: false,
                    visibleDetail: false,
                    export: false,
                    exportExample: false,
                    dead: true
                },
                actividad: {
                    label: "Actividad",
                },
                indicador: {
                    // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                    label: function () {
                        return "Nombre del Indicador"
                    },
                    shorttext: 370
                },
                descripcion: {
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
                metodo_calculo: {
                    label: function () {
                        return "Método de Cálculo"
                    },
                    shorttext: 370
                },
                departamento: {
                    label: function () {
                        return "Unidad Ejecutora"
                    }
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
                ano_linea_base: {
                    label: function () {
                        return "Año Línea Base"
                    }
                },
                linea_base: {
                    label: function () {
                        return "Línea Base";
                    },
                    shorttext: 370,
                    format: function (row) {
                        if (row.linea_base) {
                            switch (row.tipo_meta) {
                                case 'Porcentaje':
                                    return row.linea_base + '%';
                                    break;
                                case 'Decimal':
                                    return LAN.money(row.linea_base).format(false);
                                    break;
                                case 'Dinero':
                                    return `${LAN.money(row.linea_base).format(true)}`;
                                    break;
                                default : {
                                    return row.linea_base;
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
            CRUD_reporte_indicadores.table.filters = {
                columns: [
                    {
                        key: 'id_actividades_poa',
                        label: 'Actividad',
                        type: FILTER.types.relation,
                        table: 'vw_actividades_poa',
                        value: "id",
                        text: "item.no2 + ' ' + item.actividad",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [
                                {
                                    "field": "poa",
                                    "value": reporte_indicadores.session ? reporte_indicadores.session.poa_id : -1
                                }
                            ],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
                    },
                    {
                        key: 'nombre',
                        label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        type: FILTER.types.string,
                        placeholder: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        maxlength: 255
                    },
                    {
                        key: 'id_departamento',
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
                                    "value": reporte_indicadores.session ? reporte_indicadores.session.compania_id : -1
                                },
                                {
                                    "field": "institucion",
                                    "operator": reporte_indicadores.session.institucion_id ? "=" : "is",
                                    "value": reporte_indicadores.session ? reporte_indicadores.session.institucion_id ? reporte_indicadores.session.institucion_id : "$null" : -1
                                }
                            ],
                        }
                    },
                    {
                        key: 'descripcion',
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
                        key: 'desagregacion_demografica_geografia',
                        label: 'Desagregación Demográfica Geográfica',
                        type: FILTER.types.string,
                        placeholder: 'Desagregación Demográfica Geográfica'
                    },
                    {
                        key: 'metodo_calculo',
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
                        key: 'linea_base',
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
                        key: 'observacion',
                        label: 'Observación',
                        type: FILTER.types.string,
                        placeholder: 'Observación',
                        maxlength: 255
                    },
                ]
            }
        }else{
            for (const d of reporte_indicadores.records.data) {
                d.cumplidor = await aacontroldemandofalso.cumplimiento(
                    "vw_report_indicadores_generico",
                    baseController.session,
                    "indicador_generico",
                    CONFIG.mysqlactive ? d.ID : d.id);
            }
            CRUD_reporte_indicadores.table.columns = {
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
                indicador: {
                    // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                    label: function () {
                        return "Nombre del Indicador"
                    },
                    shorttext: 370
                },
                departamento: {
                    label: function () {
                        return "Departamento"
                    }
                },
                descripcion: {
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
                metodo_calculo: {
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
                linea_base: {
                    label: function () {
                        return "Línea Base";
                    },
                    shorttext: 370,
                    format: function (row) {
                        if (row.linea_base) {
                            switch (row.tipo_meta) {
                                case 'Porcentaje':
                                    return row.linea_base + '%';
                                    break;
                                case 'Decimal':
                                    return LAN.money(row.linea_base).format(false);
                                    break;
                                case 'Dinero':
                                    return `${LAN.money(row.linea_base).format(true)}`;
                                    break;
                                default : {
                                    return row.linea_base;
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
            CRUD_reporte_indicadores.table.filters = {
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
                        key: 'indicador',
                        label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        type: FILTER.types.string,
                        placeholder: MESSAGE.i('planificacion.titleIndicadorPOA'),
                        maxlength: 255
                    },
                    {
                        key: 'id_departamento',
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
                                    "value": reporte_indicadores.session ? reporte_indicadores.session.compania_id : -1
                                },
                                {
                                    "field": "institucion",
                                    "operator": reporte_indicadores.session.institucion_id ? "=" : "is",
                                    "value": reporte_indicadores.session ? reporte_indicadores.session.institucion_id ? reporte_indicadores.session.institucion_id : "$null" : -1
                                }
                            ],
                        }
                    },
                    {
                        key: 'descripcion',
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
                        key: 'metodo_calculo',
                        label: 'Método Cálculo',
                        type: FILTER.types.string,
                        placeholder: 'Método Cálculo',
                        maxlength: 255
                    },
                    {
                        key: 'desagregacion_demografica_geografia',
                        label: 'Desagregación Demográfica Geográfica',
                        type: FILTER.types.string,
                        placeholder: 'Desagregación Demográfica Geográfica'
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
                        key: 'linea_base',
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
                        key: 'observacion',
                        label: 'Observación',
                        type: FILTER.types.string,
                        placeholder: 'Observación',
                        maxlength: 255
                    },
                ]
            }
            CRUD_reporte_indicadores.table.filters.columns[0].label = reporte_indicadores.entidadobj.name;
            CRUD_reporte_indicadores.table.filters.columns[0].table = reporte_indicadores.entidadobj.table_;
            CRUD_reporte_indicadores.table.filters.columns[0].text = `item.${reporte_indicadores.entidadobj.label}`;
            CRUD_reporte_indicadores.table.filters.columns[0].query.where = eval(reporte_indicadores.entidadobj.where);
            CRUD_reporte_indicadores.table.columns.registro.label = function () {
                return reporte_indicadores.entidadobj.name;
            };
        }
        FILTER.run(reporte_indicadores);
        // CRUD_reporte_indicadores.table.filters = {
        //     columns: [
        //         {
        //             key: 'registro',
        //             label: 'Registro',
        //             type: FILTER.types.relation,
        //             table: 'pnpsp',
        //             value: "id",
        //             text: "item.nombre",
        //             query: {
        //                 limit: 0,
        //                 page: 1,
        //                 where: [],
        //                 orderby: "id",
        //                 order: "asc",
        //                 distinct: false
        //             },
        //         },
        //         {
        //             key: 'nombre_indicador',
        //             label: MESSAGE.i('planificacion.titleIndicadorPOA'),
        //             type: FILTER.types.string,
        //             placeholder: MESSAGE.i('planificacion.titleIndicadorPOA'),
        //             maxlength: 255
        //         },
        //         {
        //             key: 'descripcion_indicador',
        //             label: 'Descripción',
        //             type: FILTER.types.string,
        //             placeholder: 'Descripción',
        //             maxlength: 4000
        //         },
        //         {
        //             key: 'fuente',
        //             label: 'Fuente',
        //             type: FILTER.types.string,
        //             placeholder: 'Fuente',
        //             maxlength: 255
        //         },
        //         {
        //             key: 'metodo',
        //             label: 'Método Cálculo',
        //             type: FILTER.types.string,
        //             placeholder: 'Método Cálculo',
        //             maxlength: 255
        //         },
        //         {
        //             key: 'tipo_meta',
        //             label: 'Tipo de meta',
        //             type: FILTER.types.relation,
        //             table: 'tipoMeta',
        //             value: "id",
        //             text: "item.nombre",
        //             query: {
        //                 limit: 0,
        //                 page: 1,
        //                 where: [],
        //                 orderby: "id",
        //                 order: "asc",
        //                 distinct: false
        //             },
        //         },
        //         {
        //             key: 'direccion_meta',
        //             label: 'Dirección de la meta',
        //             type: FILTER.types.relation,
        //             table: 'direccionMeta',
        //             value: "id",
        //             text: "item.nombre",
        //             query: {
        //                 limit: 0,
        //                 page: 1,
        //                 where: [],
        //                 orderby: "id",
        //                 order: "asc",
        //                 distinct: false
        //             },
        //         },
        //         {
        //             key: 'linea',
        //             label: 'Línea Base',
        //             type: FILTER.types.integer,
        //             placeholder: 'Línea Base',
        //             maxlength: 30
        //         },
        //         {
        //             key: 'medio_verificacion',
        //             label: 'Medio de Verificación',
        //             type: FILTER.types.string,
        //             placeholder: 'Medio Verificación',
        //             maxlength: 255
        //         },
        //         {
        //             key: 'mapa_proceso',
        //             label: 'Mapa de proceso',
        //             type: FILTER.types.relation,
        //             table: 'mapa_proceso',
        //             value: "id",
        //             text: "item.nombre",
        //             query: {
        //                 limit: 0,
        //                 page: 1,
        //                 where: [
        //                     {
        //                         "field": "compania",
        //                         "value": indicador_generico.session.compania_id
        //                     },
        //                     {
        //                         "field": "estatus",
        //                         "operator": "!=",
        //                         "value": 4
        //                     }
        //                 ],
        //                 orderby: "id",
        //                 order: "asc",
        //                 distinct: false
        //             },
        //         },
        //     ]
        // }
        // if (reporte_indicadores) {
        //     indicador_generico.runMagicColum('registro', "evento_indicador_relacion", "id", indicador_generico.entidadobj.label);
        // }
        reporte_indicadores.runMagicColum('registro', reporte_indicadores.entidadobj.table_, "id", reporte_indicadores.entidadobj.label);
        reporte_indicadores.runMagicColum('tipo_meta', 'tipoMeta', "id", "nombre");
        reporte_indicadores.runMagicColum('direccion_meta', 'direccionMeta', "id", "nombre");

    };

    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};

});