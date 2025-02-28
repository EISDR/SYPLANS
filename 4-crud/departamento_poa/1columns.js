CRUD_departamento_poa = {};
DSON.keepmerge(CRUD_departamento_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_departamento_poa, {
    table: {
        engine: 'my',
        view: "vw_presupuesto_aprobado",
        method:"presupuesto_aprobado",
        columns: {
            id: {
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail:false,
                export: false,
                exportExample: false
            },
            departamento: {
                shorttext: 370
            },
            valor:{
                formattype: "money",
                exportExample: "[money]",
            },
            presupuesto_restante:{
                visible: false,
                formattype: "money",
                exportExample: "[money]",
            },
            estatus:{
            },
            created_at: {
                visible: false,
                visibleDetail:false,
                export: false,
                exportExample: false
            },
            updated_at: {
                visible: false,
                visibleDetail:false,
                export: false,
                exportExample: false
            },
            deleted_at: {
                visible: false,
                visibleDetail:false,
                export: false,
                exportExample: false
            },
            created_by: {
                visible: false,
                visibleDetail:false,
                export: false,
                exportExample: false
            },
            updated_by: {
                visible: false,
                visibleDetail:false,
                export: false,
                exportExample: false
            },
            deleted_by: {
                visible: false,
                visibleDetail:false,
                export: false,
                exportExample: false
            },
            poa:{
                visible: false,
                visibleDetail:false,
                export: false,
                exportExample: false
            }
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    return MESSAGE.i('planificacion.titleTablaPresupuestoAutorizar') + ", " +
                        MESSAGE.i('actions.View') + ", " +
                        MESSAGE.i('actions.Remove') + ", " +
                        MESSAGE.i('actions.Disable') + ", " +
                        MESSAGE.i('actions.Enable');
                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['remove', 'active', 'view', 'copy','authorize'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Edit');
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
                            return ((data.row.id_estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.id_estatus !== ENUM_2.presupuesto_estatus.Trabajado));
                        },
                        click: function (data) {
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            return false;
                        }
                    },
                    // {
                    //     text: (data) => {
                    //         return MESSAGE.i('planificacion.titleTablaPresupuestoAutorizar');
                    //     },
                    //     title: (data) => {
                    //         return MESSAGE.i('planificacion.titleTablaPresupuestoAutorizar');
                    //     },
                    //     icon: (data) => {
                    //         return "design";
                    //     },
                    //     permission: (data) => {
                    //         return ['authorize'];
                    //     },
                    //     show:(data)=>{
                    //         if(data.row){
                    //             return (data.row.id_estatus === ENUM_2.presupuesto_estatus.Pendiente);
                    //         }
                    //     },
                    //     characterist: (data) => {
                    //         return "";
                    //     },
                    //     click: function (data) {
                    //         departamento_poa.idDepto = data.row.departamento_id;
                    //         departamento_poa.idStatus = data.row.id_estatus;
                    //         departamento_poa.idPresupuesto = data.row.id;
                    //         departamento_poa.departamento = data.row.departamento;
                    //         departamento_poa.open_modal_autoriza_departamento(departamento_poa.idDepto,departamento_poa.idStatus,departamento_poa.idPresupuesto);
                    //         return false;
                    //     }
                    // },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.View');
                        },
                        icon: (data) => {
                            return "eye";
                        },
                        permission: (data) => {
                            return 'view';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            departamento_poa.departamento = data.row.departamento_id;
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                    header: {
                                        title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
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
                        }
                    },
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
                        show: function (data) {
                            return ((data.row.id_estatus !== ENUM_2.presupuesto_estatus.Completo) && (data.row.id_estatus !== ENUM_2.presupuesto_estatus.Trabajado));
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
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Enable');
                        },
                        icon: (data) => {
                            return "checkmark-circle";
                        },
                        permission: (data) => {
                            return 'active';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSEnable'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                    data.$scope.activeRow(data.row, 1).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        },
                        show: function (data) {
                            return data.$scope.activeColumn();
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Disable');
                        },
                        icon: (data) => {
                            return "circle";
                        },
                        permission: (data) => {
                            return 'active';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDisable'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                                    data.$scope.activeRow(data.row, 0).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        },
                        show: function (data) {
                            return data.$scope.activeColumn();
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Copy');
                        },
                        icon: (data) => {
                            return "copy3";
                        },
                        permission: (data) => {
                            return 'copy';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {

                            var formatRow = {};

                            for (var i in eval(`CRUD_${data.$scope.modelName}`).table.columns) {
                                var column = eval(`CRUD_${data.$scope.modelName}`).table.columns[i];
                                var key = i;
                                var alter = column.exportKey !== undefined ? column.exportKey : i;
                                if (eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample !== false) {
                                    var exampleText = eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample;
                                    exampleText = exampleText === undefined ? "[string]" : exampleText;
                                    var realValue = eval(`data.row.${key};`);
                                    if (!DSON.oseaX(realValue)) {
                                        if (column.link !== undefined) {
                                            realValue = eval(`data.row.${key.split('_')[0]}_${key.split('_')[1]}_id;`);
                                        }
                                        if (column.formattype === "datetime") {
                                            realValue = moment(realValue).format(DSON.UNIVERSALTIME);
                                        }
                                        if (column.formattype === "date") {
                                            realValue = moment(realValue).format(DSON.UNIVERSAL);
                                        }
                                        eval(`formatRow.${alter} = \`${realValue}\`;`);
                                    }
                                }
                            }
                            SWEETALERT.confirm({
                                title: MESSAGE.i('actions.CopyRecords'),
                                message: MESSAGE.i('alerts.Copy'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.i('actions.CopyngRecord')});
                                    var records = [formatRow];
                                    var columns = eval(`CRUD_${data.$scope.modelName}`).table.columns;
                                    var inserts = [];
                                    for (var i in records) {
                                        var record = records[i];
                                        var row = {};
                                        for (var i in record) {
                                            var key = i;
                                            var value = record[i];
                                            for (var c in columns) {
                                                var column = false;
                                                if (c === key || key === columns[c].exportKey)
                                                    column = columns[c];
                                                if (column === false) continue;
                                                eval(`row.${key} = \`${value}\`;`);
                                                break;
                                            }
                                        }
                                        inserts.push({row: row, relations: []});
                                    }
                                    data.$scope.importing(inserts);
                                }
                            });
                            return false;
                        }
                    }
                ]
            },

        ]

    }
});