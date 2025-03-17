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
            },
            resultado_esperado: {
                shorttext: 370
            },
            no_producto: {
            },
            producto: {
                shorttext: 370
            },
            no_actividad: {
            },
            actividad_poa: {
                shorttext: 370
            },
            no_indicador: {
            },
            nombre_indicador: {
                shorttext: 370
            },
            descripcion_indicador: {
                shorttext: 370
            },
            fuente: {
                shorttext: 370
            },
            metodo: {
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
            linea: {
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
                shorttext: 370
            },
            observacion: {
                shorttext: 370
            }
        },
        filters: {
            columns: [
                {
                    key: 'no',
                    type: FILTER.types.integer,
                    maxlength: 15
                },
                {
                    key: 'no_producto',
                    type: FILTER.types.integer,
                    maxlength: 15
                },
                {
                    key: 'nombre_indicador',
                    type: FILTER.types.string,
                    maxlength: 255
                },
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
                    key: 'metodo',
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
                    key: 'linea',
                    type: FILTER.types.integer,
                    maxlength: 30
                },
                {
                    key: 'medio_verificacion',
                    type: FILTER.types.string,
                    maxlength: 255
                },
                {
                    key: 'id_resultado',
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
