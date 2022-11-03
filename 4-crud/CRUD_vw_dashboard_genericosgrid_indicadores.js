CRUD_vw_dashboard_genericosgrid_indicadores = {};
DSON.keepmerge(CRUD_vw_dashboard_genericosgrid_indicadores, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_dashboard_genericosgrid_indicadores, {
    table: {
        engine: 'ms',
        report: true,
        view: 'vw_dashboard_genericosgrid_indicadores',
        method: "indicador_proceso",
        batch: false,
        sortable: false,
        distinct: false,
        allow: {
            add: false,
            edit: false,
            view: false,
            remove: false,
            active: false,
            filter: true,
            import: false,
            copy: false,
            clone: false,
            export: {
                Clipboard: true,
                PDF: true,
                CSV: true,
                XLS: true,
                DOC: true
            },
            actions: false,
        },
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                dead: true
            },
            direccion_meta: {
                exportExample: false,
                visible: false,
                dead: true
            },
            indicador: {
                label: "Indicador",
            },
            flecha: {
                label: function () {
                    return "Dirección Meta"
                },
                anonymous: true,
                value: function (data) {
                    var icon = "";
                    var color = "text-";
                    var vari = data.row.alcanzado - data.row.acumulado;

                    if (data.row.direccion_meta == 1) {
                        icon = "icon-arrow-up7";
                        if ((vari || 0) == 0) {
                            color += "gray";
                        } else if (vari > 0) {
                            color += "gray";
                        } else {
                            color += "gray";
                        }
                    } else if (data.row.direccion_meta == 2) {
                        icon = "icon-arrow-down7";
                        if ((vari || 0) == 0) {
                            color += "gray";
                        }
                        if (vari < 0) {
                            color += "gray";
                        } else {
                            color += "gray";
                        }
                    } else if (data.row.direccion_meta == 3) {
                        icon = "icon-minus3";
                        if ((vari || 0) == 0) {
                            color += "gray";
                        } else {
                            color += "gray";
                        }
                    }
                    let varimoney = vari;
                    if (vari < 0)
                        vari = `(${vari})`;

                    switch (data.row.tipo_meta) {
                        case 2:
                            return ` <i class=\"${icon} ${color}\"></i>`;
                            break;
                        case 1:
                            return ` <i class=\"${icon} ${color}\"></i>`;
                            break;
                        case 4:
                            return ` <i class=\"${icon} ${color}\"></i>`;
                            break;
                        case 5:
                            return ` <i class=\"${icon} ${color}\"></i>`;
                            break;
                        default: {
                            return ` <i class=\"${icon} ${color}\"></i>`;
                        }
                    }

                }
            },
            acumulado: {
                label: function () {
                    return "Proyectado"
                },
                format: function (row) {
                    if (row.acumulado) {
                        switch (row.tipo_meta) {
                            case 2:
                                return "Índice: " + (row.acumulado > 1 ? 1 : 0);
                                break;
                            case 1:
                                return (row.acumulado || 0) + '%';
                                break;
                            case 4:
                                return LAN.money(row.acumulado).format(false);
                                break;
                            case 5:
                                return  LAN.money(row.acumulado).format(true);
                                break;

                            default : {
                                return LAN.money(row.acumulado).format(false);
                            }
                        }
                    }
                },
                sorttype: "numeric",
                // formattype: ENUM.FORMAT.numeric
            },
            alcanzado: {
                label: "Alcanzada",
                sorttype: "numeric",
                format: function (row) {
                    if (row.alcanzado !== undefined && row.alcanzado !== 'null' && row.alcanzado !== null) {
                        switch (row.tipo_meta) {
                            case 2:
                                return (row.alcanzado > 1 ? 1 : 0);
                                break;
                            case 1:
                                return (row.alcanzado || 0) + '%';
                                break;
                            case 4:
                                return LAN.money(row.alcanzado || 0).format(false);
                                break;
                            case 5:
                                return  LAN.money(row.alcanzado || 0).format(true);
                                break;
                            default : {
                                return  LAN.money(row.alcanzado || 0).format(false) || 0;
                            }
                        }
                    } else {
                        return "";
                    }
                },
                // formattype: ENUM.FORMAT.numeric
            },
            // varianza: {
            //     label: function () {
            //         return "Diferencia"
            //     },
            //     anonymous: true,
            //     value: function (data) {
            //         if (!data.row.alcanzado || !data.row.acumulado) {
            //             return "";
            //         }
            //         var icon = "";
            //         var color = "text-";
            //         var vari = data.row.alcanzado - data.row.acumulado;
            //
            //         if (data.row.direccion_meta == 1) {
            //             icon = "icon-arrow-up7";
            //             if ((vari || 0) == 0) {
            //                 color += "gray";
            //             } else if (vari > 0) {
            //                 color += "green";
            //             } else {
            //                 color += "red";
            //             }
            //         } else if (data.row.direccion_meta == 2) {
            //             icon = "icon-arrow-down7";
            //             if ((vari || 0) == 0) {
            //                 color += "gray";
            //             }
            //             if (vari < 0) {
            //                 color += "green";
            //             } else {
            //                 color += "red";
            //             }
            //         } else if (data.row.direccion_meta == 3) {
            //             icon = "icon-minus3";
            //             if ((vari || 0) == 0) {
            //                 color += "green";
            //             } else {
            //                 color += "red";
            //             }
            //         }
            //         let varimoney = vari;
            //         if (vari < 0)
            //             vari = `(${vari})`;
            //
            //         if (vari === "null")
            //             vari = 0;
            //         switch (data.row.tipo_meta) {
            //             case 2:
            //                 return ` <span class="${color}" >${LAN.money(varimoney || vari).format(false)}</span> `;
            //                 break;
            //             case 1:
            //                 return ` <span class="${color}" >${LAN.money(varimoney || vari).format(false) || 0}%</span> `;
            //                 break;
            //             case 4:
            //                 return ` <span class="${color}" > ${LAN.money(vari).format(false)}</span>`;
            //                 break;
            //             case 5:
            //                 return ` <span class="${color}" >${LAN.money(varimoney).format(true)}</span> `;
            //                 break;
            //             default: {
            //                 return ` <span class="${color}" > ${LAN.money(varimoney || vari).format(false)}</span>`;
            //             }
            //         }
            //
            //     }
            // },
            detalle: {
                label: function () {
                    return "Acciones"
                },
                format: function (row) {
                    return `<a class="ng-binding" title="Ver Detalle" data-action="Ver">
                        <i class="icon-eye "></i>
                    </a>`
                },
                click: async function (data) {
                    console.log(data)
                    vw_dashboard_genericosgrid_indicadores.list_indicador_generico_periodo_view = [];
                    vw_dashboard_genericosgrid_indicadores.detalleapd = [];
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
                        vw_dashboard_genericosgrid_indicadores.list_indicador_generico_periodo_view = result.data;
                        for (var key of vw_dashboard_genericosgrid_indicadores.list_indicador_generico_periodo_view) {
                            vw_dashboard_genericosgrid_indicadores.detalleapd.push({
                                column: 'Proyectado ' + periodo + ' ' + contador,
                                row: key.valor
                            });
                            vw_dashboard_genericosgrid_indicadores.detalleapd.push({
                                column: 'Alcanzado ' + periodo + ' ' + contador,
                                row: key.valor_alcanzado
                            });
                            contador++;
                        }
                        if (!DSON.oseaX(data.row)) {
                            data.$scope.dataForView = data.row;
                            data.$scope.modal.modalView(String.format("{0}/view_meta", data.$scope.modelName), {
                                header: {
                                    title: MESSAGE.i('mono.Viewof') + " " + "Indicadores Génericos",
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
            }
        },
    }
});
//modify methods that existing option
//CRUD_vw_dashboard_genericosgrid_indicadores.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_dashboard_genericosgrid_indicadores.table.options[0].menus.push({
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