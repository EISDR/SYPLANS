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
                },
                objetivo_estrategico: {
                },
                estrategia: {
                },
                resultado: {
                },
                indicador: {
                    // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                    shorttext: 370
                },
                departamento: {
                },
                descripcion: {
                    shorttext: 370
                },
                fuente: {
                    shorttext: 370
                },
                metodo_calculo: {
                    shorttext: 370
                },
                desagregacion_demografica_geografia: {
                    shorttext: 370
                },
                tipo_meta: {
                },
                direccion_meta: {
                },
                ano_linea_base: {
                },
                linea_base: {
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
                    shorttext: 370
                },
                observacion: {
                    shorttext: 370
                }
            };
            CRUD_reporte_indicadores.table.filters = {
                columns: [
                    {
                        key: 'id_eje_estrategico',
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
                        type: FILTER.types.string,
                    },
                    {
                        key: 'id_departamento',
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
                        type: FILTER.types.string,
                    },
                    {
                        key: 'fuente',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'metodo_calculo',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'desagregacion_demografica_geografia',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'tipo_meta',
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
                        type: FILTER.types.integer,
                    },
                    {
                        key: 'medio_verificacion',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'observacion',
                        type: FILTER.types.string,
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
                },
                indicador: {
                    // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                    shorttext: 370
                },
                departamento: {
                },
                descripcion: {
                    shorttext: 370
                },
                fuente: {
                    shorttext: 370
                },
                metodo_calculo: {
                    shorttext: 370
                },
                desagregacion_demografica_geografia: {
                    shorttext: 370
                },
                tipo_meta: {
                },
                direccion_meta: {
                },
                ano_linea_base: {
                },
                linea_base: {
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
                    shorttext: 370
                },
                observacion: {
                    shorttext: 370
                }
            };
            CRUD_reporte_indicadores.table.filters = {
                columns: [
                    {
                        key: 'id_producto',
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
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'id_departamento',
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
                        type: FILTER.types.string,
                        maxlength: 4000
                    },
                    {
                        key: 'fuente',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'desagregacion_demografica_geografia',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'metodo_calculo',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'tipo_meta',
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
                        type: FILTER.types.integer,
                        maxlength: 30
                    },
                    {
                        key: 'medio_verificacion',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'observacion',
                        type: FILTER.types.string,
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
                },
                indicador: {
                    // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                    shorttext: 370
                },
                descripcion: {
                    shorttext: 370
                },
                fuente: {
                    shorttext: 370
                },
                metodo_calculo: {
                    shorttext: 370
                },
                departamento: {
                },
                desagregacion_demografica_geografia: {
                    shorttext: 370
                },
                caracteristica: {
                    shorttext: 370
                },
                tipo_meta: {
                },
                direccion_meta: {
                },
                ano_linea_base: {
                },
                linea_base: {
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
                    shorttext: 370
                },
                observacion: {
                    shorttext: 370
                }
            };
            CRUD_reporte_indicadores.table.filters = {
                columns: [
                    {
                        key: 'id_actividades_poa',
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
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'id_departamento',
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
                        type: FILTER.types.string,
                        maxlength: 4000
                    },
                    {
                        key: 'fuente',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'desagregacion_demografica_geografia',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'metodo_calculo',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'tipo_meta',
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
                        type: FILTER.types.integer,
                        maxlength: 30
                    },
                    {
                        key: 'medio_verificacion',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'observacion',
                        type: FILTER.types.string,
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
                },
                indicador: {
                    // label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                    shorttext: 370
                },
                departamento: {
                },
                descripcion: {
                    shorttext: 370
                },
                fuente: {
                    shorttext: 370
                },
                metodo_calculo: {
                    shorttext: 370
                },
                desagregacion_demografica_geografia: {
                    shorttext: 370
                },
                caracteristica: {
                    shorttext: 370
                },
                tipo_meta: {
                },
                direccion_meta: {
                },
                ano: {
                },
                ano_linea_base: {
                },
                linea_base: {
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
                    shorttext: 370
                },
                observacion: {
                    shorttext: 370
                }
            };
            CRUD_reporte_indicadores.table.filters = {
                columns: [
                    {
                        key: 'registro',
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
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'id_departamento',
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
                        type: FILTER.types.string,
                        maxlength: 4000
                    },
                    {
                        key: 'fuente',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'metodo_calculo',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'desagregacion_demografica_geografia',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'tipo_meta',
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
                        type: FILTER.types.integer,
                        maxlength: 30
                    },
                    {
                        key: 'medio_verificacion',
                        type: FILTER.types.string,
                        maxlength: 255
                    },
                    {
                        key: 'observacion',
                        type: FILTER.types.string,
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
    reporte_indicadores.validate_entidad = function (tipo) {
        let IPN = ['vw_denominacion_pnpsp_gg','vw_mods', 'vw_linea_accion_gg','vw_ods'];
        let PEI_POA = ['indicador_pei', 'productos_poa', 'actividades_poa']
        let SECTORIAL = ['sec_resultado_sectorial', 'sec_programa_sectorial']
        if (IPN.includes(tipo)) {
            return CONFIGCOMPANY.ipn === 1;
        } else if (PEI_POA.includes(tipo)) {
            return CONFIGCOMPANY.planificacion === 1;
        } else if (SECTORIAL.includes(tipo)) {
            return CONFIGCOMPANY.sectorial === 1;
        } else if (tipo === 'vw_evento_indicador_riesgo') {
            return CONFIGCOMPANY.riesgo_var === 1 || CONFIGCOMPANY.riesgo_amfe === 1;
        } else if (tipo === 'vw_procesos') {
            return CONFIGCOMPANY.proceso === 1;
        } else if (tipo === 'vw_proyecto_item') {
            return CONFIGCOMPANY.proyectos_especiales === 1;
        } else if (tipo === 'vw_evento_indicador_salida') {
            return CONFIGCOMPANY.salidas === 1;
        } else if (tipo === 'vw_evento_indicador') {
            return CONFIGCOMPANY.gestion_indicadores === 1;
        } else {
            return false;
        }
    }
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