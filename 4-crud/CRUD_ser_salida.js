CRUD_ser_salida = {};
DSON.keepmerge(CRUD_ser_salida, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ser_salida, {
    table: {
        //width: "width:3000px;",
        view: 'vw_ser_salida',
        //method: 'ser_salida',
        //limits: [10, 50, 100, 0],
        //report: true,
        batch: false,
        //persist: false,
        sort: "ser_salida_tipo_nombre",
        sortable: false,
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
            ser_salida_tipo_nombre: {
                label: () => {
                    return "Tipo";
                },
                link: {table: 'ser_salida_tipo', from: 'ser_salida_tipo'},
                rowspan: function (index, list, category) {
                    if (category === "span")
                        return ser_salida.sp_('d.ser_salida_tipo_nombre', index, list);
                    if (category === "seeme")
                        return ser_salida.sm_('d.ser_salida_tipo_nombre', index, list);
                }
            },
            nombre: {},
            nombre_queja: {
                label: () => {
                    return "Nombre Solicitante";
                }
            },
            telefono_queja: {
                label: () => {
                    return "Teléfono";
                }
            },
            ser_salida_estatus_nombre: {
                label: () => {
                    return "Estatus";
                },
            },
            fecha_queja: {
                label: () => {
                    return "Fecha";
                }, formattype: ENUM.FORMAT.date
            }
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'ser_salida_tipo',
                'base': 'ser_salida_tipo',
                'field': 'id',
                'columns': ['id', 'nombre']
            }]
    }
});
//modify methods that existing option
//CRUD_ser_salida.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
CRUD_ser_salida.table.options[0].menus[0] = {
    text: (data) => {
        return "Editar";
    },
    icon: (data) => {
        return "pencil5";
    },
    permission: (data) => {
        return 'edit';
    },
    characterist: (data) => {
        return "";
    },
    show: function (data) {
        return data.row.ser_salida_estatus == "1";
    },
    click: function (data) {
        data.$scope.my_true_estatus = data.row.ser_salida_estatus;
        data.$scope.formulary({
            where: [{
                field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
            }]
        }, FORM.modes.edit, {});
        return false;
    }
};
CRUD_ser_salida.table.options[0].menus[2] = {
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
    show: function (data) {
        return data.row.ser_salida_estatus == "1";
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
};
CRUD_ser_salida.table.options[0].menus.push({
    text: (data) => {
        return "Trabajar";
    },
    icon: (data) => {
        return "hammer-wrench";
    },
    permission: (data) => {
        return 'edit';
    },
    characterist: (data) => {
        return "";
    },
    show: function (data) {
        return data.row.ser_salida_estatus_id != "3";
    },
    click: function (data) {
        data.$scope.my_true_estatus = data.row.ser_salida_estatus;
        data.$scope.formulary({
            where: [{
                field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
            }]
        }, FORM.modes.edit, {}, true);
        return false;
    }
});