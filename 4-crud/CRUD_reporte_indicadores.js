CRUD_reporte_indicadores = {};
DSON.keepmerge(CRUD_reporte_indicadores, CRUDDEFAULTS);
DSON.keepmerge(CRUD_reporte_indicadores, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_reporte_indicadores',
        //method: 'reporte_indicadores',
        //limits: [10, 50, 100, 0],
        //report: true,
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
            producto: {
            },
            actividad: {
            },
            registro: {
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
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_reporte_indicadores.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
// add options example, remember add new item in allow object at admin/0-config/security/permission.json
CRUD_reporte_indicadores.table.options.push({
    text: (data) => {
        return "Ver Ficha de Cumplimiento del indicador";
    },
    icon: (data) => {
        return "eye";
    },
    characterist: (data) => {
        return "";
    },
    show: function (data) {
        return true;
    },
    click: function (data) {
        if (data.row.cumplidor)
            if (data.row.cumplidor.ficha) {
                data.$scope.FICHA = data.row.cumplidor.ficha.FICHA;
                data.$scope.modal.modalView("aacontroldemando/fichaindicador", {
                    header: {
                        title: data.row.indicador,
                    },
                    footer: {
                        cancelButton: true
                    },
                    content: {
                        loadingContentText: `${MESSAGE.i('actions.Loading')}...`
                    },
                });
            }
        return false;
    }
});