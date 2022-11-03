CRUD_vw_reporte_francis = {};
DSON.keepmerge(CRUD_vw_reporte_francis, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_reporte_francis, {
    table: {
        width: "width:3000px;",
        //view: 'vw_vw_reporte_francis',
        //method: 'vw_reporte_francis',
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
            ano: {
                label: () => {
                    return "Año"
                }
            },
            departamento: {
                label: () => {
                    return "Departamento"
                }
            },
            presupuesto_departamento: {
                label: () => {
                    return "Presupuesto del Departamento"
                },
                formattype: ENUM.FORMAT.money
            },
            producto: {
                label: () => {
                    return "Producto"
                }
            },
            presupuesto_producto: {
                label: () => {
                    return "Presupuesto del Producto"
                },
                formattype: ENUM.FORMAT.money
            },
            fecha_inicio: {
                label: () => {
                    return "Fecha Inicio"
                }, formattype: ENUM.FORMAT.date,
                export: (value) => {
                    return (moment(value).format("DD-MM-YYYY")).replaceAll("-", "_");
                }
            },
            fecha_fin: {
                label: () => {
                    return "Fecha Fin"
                }, formattype: ENUM.FORMAT.date,
                export: (value) => {
                    return (moment(value).format("DD-MM-YYYY")).replaceAll("-", "_");
                }
            },
            actividad: {
                label: () => {
                    return "Actividades"
                },
                format: (row) => {
                    if (row.actividad) {
                        return DSON.ULALIA(row.actividad.split(";;"));
                    }
                },
                export: (value) => {
                    return "*" + ((value || "").replaceAll(";;", "<br>"));
                }
            },
            indicador: {
                label: () => {
                    return "Indicador de Producto"
                }
            },
            medio_verificacion: {
                label: () => {
                    return "Medio de Verificación"
                }
            },
            meta_trimestre_1: {
                label: () => {
                    return "Meta - Primer Trimestre"
                }
            },
            meta_trimestre_2: {
                label: () => {
                    return "Meta - Segundo Trimestre"
                }
            },
            meta_trimestre_3: {
                label: () => {
                    return "Meta - Tercer Trimestre"
                }
            },
            meta_trimestre_4: {
                label: () => {
                    return "Meta - Cuarto Trimestre"
                }
            },
            alcanzada_trimestre_1: {
                label: () => {
                    return "Meta Alcanzada - Primer Trimestre"
                }
            },
            alcanzada_trimestre_2: {
                label: () => {
                    return "Meta Alcanzada - Segundo Trimestre"
                }
            },
            alcanzada_trimestre_3: {
                label: () => {
                    return "Meta Alcanzada - Tercer Trimestre"
                }
            },
            alcanzada_trimestre_4: {
                label: () => {
                    return "Meta Alcanzada - Cuarto Trimestre"
                }
            }
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_vw_reporte_francis.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_reporte_francis.table.options[0].menus.push({
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