lachechon = new SESSION().current();
lachechon = lachechon || {};
var periodo = lachechon ? lachechon.monitoreo_nombre : 0;
CRUD_vw_mega_indicadores_actividad = {};
DSON.keepmerge(CRUD_vw_mega_indicadores_actividad, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_mega_indicadores_actividad, {
    table: {
        engine: 'my',
        view: "vw_mega_indicadores_actividad",
        width: "width:2150px;",
        sort: "id",
        order: "desc",
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            no: {
                label: "No.",
            },
            resultado_esperado: {
                label: "Resultado Esperado",
                shorttext: 370
            },
            no_producto: {
                label: "No.",
            },
            producto: {
                label: function () {
                    return lachechon.tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto"
                },
                shorttext: 370
            },
            no_actividad: {
                label: function() {
                    return "No. Actividad"
                },
            },
            actividad_poa: {
                label: "Actividad POA",
                shorttext: 370
            },
            no_indicador: {
                label: function() {
                    return "No. Indicador"
                },
            },
            nombre_indicador: {
                label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                shorttext: 370
            },
            descripcion_indicador: {
                label: "Descripción",
                shorttext: 370
            },
            fuente: {
                label: "Fuente del Indicador",
                shorttext: 370
            },
            metodo: {
                label: "Método de Cálculo",
                shorttext: 370
            },
            desagregacion_demografica_geografia: {
                label: function() {
                    return "Desagregación Demográfica Geográfica";
                },
                shorttext: 370
            },
            tipo_meta: {
                label: "Tipo de Meta"
            },
            direccion_meta: {
                label: "Dirección de la Meta"
            },
            ano_linea_base: {
                label: function (row) {
                    return "Año Línea Base"
                }
            },
            linea: {
                label: function (row) {
                    return "Línea Base"
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
                label: "Medio de Verificación",
                shorttext: 370
            },
            observacion: {
                label: "Observación",
                shorttext: 370
            }
        },
        filters: {
            columns: [
                {
                    key: 'no',
                    label: 'No. Resultado Esperado',
                    type: FILTER.types.integer,
                    placeholder: 'No. Resultado Esperado',
                    maxlength: 15
                },
                {
                    key: 'no_producto',
                    label: 'No. Producto',
                    type: FILTER.types.integer,
                    placeholder: 'No. Producto',
                    maxlength: 15
                },
                {
                    key: 'nombre_indicador',
                    label: MESSAGE.i('planificacion.titleIndicadorPOA'),
                    type: FILTER.types.string,
                    placeholder: MESSAGE.i('planificacion.titleIndicadorPOA'),
                    maxlength: 255
                },
                {
                    key: 'id_producto',
                    label: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
                    type: FILTER.types.relation,
                    table: 'vw_productos_poa_detalles',
                    value: "id",
                    text: "item.no1 + ' ' + item.producto",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "poa",
                                "value": lachechon ? lachechon.poa_id : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'id_actividad_poa',
                    label: 'Actividades POA',
                    type: FILTER.types.relation,
                    table: 'vw_actividades_poa',
                    value: "id",
                    text: "item.no2 + ' ' + item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "poa",
                                "value": lachechon ? lachechon.poa_id : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
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
                    key: 'desagregacion_demografica_geografia',
                    label: 'Desagregación Demográfica Geográfica',
                    type: FILTER.types.string,
                    placeholder: 'Desagregación Demográfica Geográfica'
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
                    key: 'id_resultado',
                    label: 'Resultado esperado',
                    type: FILTER.types.relation,
                    table: 'vw_resultado',
                    value: "id",
                    text: "item.resultado_esperado",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "pei",
                                "value": lachechon ? lachechon.pei_id : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
            ]
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    return MESSAGE.i('actions.Edit') + ", " +
                        MESSAGE.i('actions.View') + ", " +
                        MESSAGE.i('actions.Remove');
                },
                icon: (data) => {
                    return "cog2";
                },
                show: function(){
                    return false;
                },
                permission: (data) => {
                    return ['edit', 'remove', 'active', 'view', 'copy'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [

                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Remove');
                        },
                        icon: (data) => {
                            return "trash";
                        },
                        permission: (data) => {
                            return 'remove';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function(){
                            return false;
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: async function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                    data.$scope.deleteRow(data.row).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        }
                    },

                ]
            },
            {
                text: (data) => {
                    return MESSAGE.i('actions.Eye');
                },
                title: (data) => {
                    return MESSAGE.i('actions.Eye');
                },
                icon: (data) => {
                    return "eye";
                },
                permission: (data) => {
                    return ['eye','comment'];
                },
                show:(data)=>{
                    return true;
                },
                characterist: (data) => {
                    return "";
                },
                click: function (data) {
                    vw_mega_indicadores_actividad.list_indicador_poa_periodo = [];
                    vw_mega_indicadores_actividad.detalleapd = [];
                    var contador = 1;
                    BASEAPI.listp('vw_indicador_poa_periodo', {
                        limit: 0,
                        orderby: "periodo",
                        order: "asc",
                        where: [{
                            field: "indicador_poa",
                            value: data.row.id
                        }]
                    }).then(function (result) {
                        vw_mega_indicadores_actividad.list_indicador_poa_periodo = result.data;
                        for (var key of vw_mega_indicadores_actividad.list_indicador_poa_periodo) {
                            vw_mega_indicadores_actividad.detalleapd.push({column: 'Proyectado ' + periodo + ' ' + contador , row: key.valor });
                            vw_mega_indicadores_actividad.detalleapd.push({column: 'Alcanzado ' +  periodo + ' ' + contador, row: key.valor_alcanzado });
                            vw_mega_indicadores_actividad.detalleapd.push({column: 'Diferencia ' + periodo + ' ' + contador, row: key.varianzas });
                            contador++;
                        }
                        if (!DSON.oseaX(data.row)) {
                            data.$scope.dataForView = data.row;
                            data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                header: {
                                    title: vw_mega_indicadores_actividad.plural = MESSAGE.i('planificacion.title_mega_indicadores_poa') + " - "+data.row.nombre_indicador,
                                    icon: "user"
                                },
                                footer: {
                                    cancelButton: true
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                    sameController: true
                                },
                            });
                        }

                    });

                },
            },
            {
                text: (data) => {
                    return MESSAGE.i('actions.Comment');
                },
                title: (data) => {
                    return MESSAGE.i('actions.Comment');
                },
                icon: (data) => {
                    return "comment";
                },
                permission: (data) => {
                    return 'comment';
                },
                show:(data)=>{
                    return true;
                },
                characterist: (data) => {
                    return "";
                },
                click: function (data) {
                    var animationCRUD = new ANIMATION();
                    animationCRUD.loading(`#vw_mega_indicadores_actividadTablePanel`, "Por favor espere", ``, '300');
                    vw_mega_indicadores_actividad.openmodalField(data.row.id, data.row.nombre_indicador);
                    return false;
                }
            },
        ]
    }
});
//modify methods that existing option
//CRUD_vw_mega_indicadores_actividad.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_mega_indicadores_actividad.table.options[0].menus.push({
//     text: (data) => {
//         return MESSAGE.i('actions.Extra');
//     },
//     icon: (data) => {
//         return "list";
//     },
//     permission: (data) => {
//         return 'extra';
//     },
//     characterist: (data) => {
//         return "";
//     },
//     show: function (data) {
//         return true;
//     },
//     click: function (data) {
//         //extra function
//         return false;
//     }
// });
