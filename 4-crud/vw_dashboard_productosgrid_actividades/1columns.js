CRUD_vw_dashboard_productosgrid_actividades = {};
DSON.keepmerge(CRUD_vw_dashboard_productosgrid_actividades, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_dashboard_productosgrid_actividades, {
    table: {
        engine: 'ms',
        report: true,
        view: 'vw_dashboard_productosgrid_actividades',
        method: "indicador_poa",
        batch: false,
        width: "500px",
        sortable: false,
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
            producto: {
                label: function () {
                    return "Actividad"
                },
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
                                return row.alcanzado + '%';
                                break;
                            case 4:
                                return LAN.money(row.alcanzado).format(false);
                                break;
                            case 5:
                                return  LAN.money(row.alcanzado).format(true);
                                break;
                            default : {
                                return LAN.money(row.alcanzado).format(false);
                            }
                        }
                    } else {
                        return "";
                    }
                },
                // formattype: ENUM.FORMAT.numeric
            },
            cumplimiento: {
                format: function (row) {
                    return row.cumplidor.cumplimiento+ "%";
                },
                sortable: false
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
                click: function (data) {
                    vw_dashboard_productosgrid_actividades.forUseData = data.row;
                    vw_dashboard_productosgrid_actividades.selectedPEI = data.row.id;
                    baseController.modal.modalView("indicador_producto_poa_actividad", {
                        header: {
                            title: data.row.indicador,
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                            sameController: 'indicador_producto_poa_actividad'
                        },
                    });
                }
            }
        },
    }
});
