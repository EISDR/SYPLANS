CRUD_vw_indicador_generico_v2 = {};
DSON.keepmerge(CRUD_vw_indicador_generico_v2, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_indicador_generico_v2, {
    table: {
        width: "width:3000px;",
        //view: 'vw_vw_indicador_generico_v2',
        //method: 'vw_indicador_generico_v2',
        //limits: [10, 50, 100, 0],
        //report: true,
        //batch: false,
        //persist: false,
        //sortable: false,
        //dragrow: 'num',
        //rowStyle: function (row, $scope) {
        //    return "color:red;";
        //},
        //rowClass: function (row, $scope) {
        //    return row.name === 'whatever' ? "bg-" + COLOR.danger + "-300" : "";
        //},
        //activeColumn: "active",
        //key: 'id',
        //deletekeys: ['id'],
        // dbcolumnname: {
        //     visible: false,
        //     visibleDetail: false,
        //     export: false,
        //     exportExample: false,
        //     sortable: false,
        //     shorttext: 360,
        //     dead:true,
        //     formattype: ENUM.FORMAT.numeric,
        //     sorttype: ENUM.FORMATFILTER.numeric,
        //     drag: true,
        //     click: function (data) {
        //         alert(data.row.id);
        //         //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
        //     },
        //     reference: "id",
        //     format: function (row) {
        //         return row.id + "*";
        //     }
        // },
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            procesos_nombre: {
                label: "Proceso",
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
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'procesos',
                'base': 'registro',
                'field': 'id',
                'columns': ['id', 'nombre']
            },
        ],

    }
});
//modify methods that existing option
//CRUD_vw_indicador_generico_v2.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
CRUD_vw_indicador_generico_v2.table.options.push( {
    title: (data) => {
        return "Ver periodos del indicador";
    },
    text: (data) => {
        return "Ver periodos del indicador";
    },
    icon: (data) => {
        return "list3";
    },
    show: (data) => {
        return true;
    },
    characterist: (data) => {
        return "";
    },
    click: function (data) {
        // if (!DSON.oseaX(data.row)) {
        //     data.$scope.dataForView = data.row;
        //     data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
        //         header: {
        //             title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
        //             icon: "user"
        //         },
        //         footer: {
        //             cancelButton: true
        //         },
        //         content: {
        //             loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
        //             sameController: true
        //         },
        //     });
        // }
        vw_indicador_generico_v2.list_indicador_generico_periodo_view = [];
        vw_indicador_generico_v2.detalleapd = [];
        var contador = 1;
        BASEAPI.listp('vw_indicador_generico_periodo', {
            limit: 0,
            orderby: "periodo",
            order: "asc",
            where: [{
                field: "indicador_generico",
                value: data.row.id
            }]
        }).then(function (result) {
            vw_indicador_generico_v2.list_indicador_generico_periodo_view = result.data;
            for (var key of vw_indicador_generico_v2.list_indicador_generico_periodo_view) {
                vw_indicador_generico_v2.detalleapd.push({
                    column: 'Proyectado ' + periodo + ' ' + contador,
                    row: key.valor
                });
                vw_indicador_generico_v2.detalleapd.push({
                    column: 'Alcanzado ' + periodo + ' ' + contador,
                    row: key.valor_alcanzado
                });
                contador++;
            }
            if (!DSON.oseaX(data.row)) {
                data.$scope.dataForView = data.row;
                data.$scope.modal.modalView(String.format("{0}/view_meta", data.$scope.modelName), {
                    header: {
                        title: `Ver Periodos del indicador: "${data.row.nombre_indicador}"`,
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
                // indicador_generico.refreshAngular();
            }
        });
    }
});