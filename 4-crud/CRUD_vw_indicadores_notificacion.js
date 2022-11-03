CRUD_vw_indicadores_notificacion = {};
DSON.keepmerge(CRUD_vw_indicadores_notificacion, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_indicadores_notificacion, {
    table: {
        width: "height:15%; margin-bottom: 40px !important; ",
        //view: 'vw_vw_indicadores_notificacion',
        //method: 'vw_indicadores_notificacion',
        //limits: [10, 50, 100, 0],
        report: true,
        batch: false,
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
        columns: {
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
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            indicador: {},
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
            proyectado: {
                label: function () {
                    return "Proyectado"
                },
                format: function (row) {
                    if (row.proyectado) {
                        switch (row.tipo_meta) {
                            case 2:
                                return "Índice";
                                break;
                            case 1:
                                return row.proyectado + '%';
                                break;
                            case 4:
                                return LAN.money(row.proyectado).format(false);
                                break;
                            case 5:
                                return LAN.money(row.proyectado).format(true);
                                break;

                            default : {
                                return LAN.money(row.proyectado).format(false);
                            }
                        }
                    } else {
                        switch (row.tipo_meta) {
                            case 2:
                                return 0;
                                break;
                            case 1:
                                return (0) + '%';
                                break;
                            case 4:
                                return LAN.money(0).format(false);
                                break;
                            case 5:
                                return LAN.money(0).format(true);
                                break;
                            default : {
                                return 0;
                            }
                        }
                    }
                },
                sorttype: "numeric",
            },
            alcanzado: {
                label: "Alcanzada",
                sorttype: "numeric",
                format: function (row) {
                    if (row.alcanzado) {
                        switch (row.tipo_meta) {
                            case 2:
                                return "";
                                break;
                            case 1:
                                return row.alcanzado + '%';
                                break;
                            case 4:
                                return LAN.money(row.alcanzado).format(false);
                                break;
                            case 5:
                                return LAN.money(row.alcanzado).format(true);
                                break;
                            default : {
                                return LAN.money(row.alcanzado).format(false);
                            }
                        }
                    }
                },
                // formattype: ENUM.FORMAT.numeric
            },
            cumplimiento: {
                format: function (row) {
                    return row.cumplidor.cumplimiento + "%";
                },
                sortable: false
            }
            // ,
            // varianza: {
            //     label: function () {
            //         return "Diferencia"
            //     },
            //     anonymous: true,
            //     value: function (data) {
            //         if (!data.row.alcanzado || !data.row.proyectado) {
            //             return "";
            //         }
            //         var icon = "";
            //         var color = "text-";
            //         var vari = data.row.alcanzado - data.row.proyectado;
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
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_vw_indicadores_notificacion.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_indicadores_notificacion.table.options[0].menus.push({
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
