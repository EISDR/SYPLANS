CRUD_pacc_departamento_status = {};
DSON.keepmerge(CRUD_pacc_departamento_status, CRUDDEFAULTS);
DSON.keepmerge(CRUD_pacc_departamento_status, {
    table: {
        width: "width:1600px;",
        //view: 'vw_pacc_departamento_status',
        //method: 'pacc_departamento_status',
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
            nombre: {},
            descripcion_before: {
                label: function () {
                    return "Descripción Anterior"
                }
            },
            descripcion_larga_before: {
                label: function() {
                    return "Decripción Larga Anterior"
                },
                shorttext: 360
            },
            descripcion: {
                label: function() {
                    return "Descripción Siguiente"
                }
            },
            descripcion_larga: {
                label: function() {
                    return "Decripción Larga Siguiente"
                },
                shorttext: 360
            },
            active: {
                visible: true,
                sorttype: ENUM.FORMAT.bool,
                formattype: ENUM.FORMAT.bool
            },
            color: {
                sortable: false,
                label: function (){
                    return "Color Anterior"
                },
                format: function (row) {
                    if (row.color){
                        var paint = row.nombre.replace(/[^a-z0-9]+/gi, '-');
                        var color = row.color;
                        $('.' + paint +'').css({'background-color': color, 'margin-left': 5});
                        return `<div title="" style="margin-left: 5px;" class='${paint} shape_element'> </div>`;
                    }
                }
            },
            color_next: {
                sortable: false,
                label: function() {
                    return "Color Siguiente"
                },
                format: function (row) {
                    if (row.color_next){
                        var paint = row.nombre.replace(/[^a-z0-9]+/gi, '-');
                        var color = row.color_next;
                        $('.' + paint +'_next').css({'background-color': color, 'margin-left': 5});
                        return `<div title="" style="margin-left: 5px;" class='${paint}_next shape_element'> </div>`;
                    }
                }
            },
            before_status: {
                label: function() {
                    return "Estatus Anteriores"
                }
            },
            next_status: {
                label: function() {
                    return "Estatus Siguientes"
                }
            }
        },
        filters: {
            columns: [
                {
                    key: 'nombre',
                    label: 'Nombre',
                    type: FILTER.types.string,
                    placeholder: 'Nombre'
                },
                {
                    key: 'descripcion_before',
                    label: 'Descripción Anterior',
                    type: FILTER.types.string,
                    placeholder: 'Descripción Anterior'
                },
                {
                    key: 'descripcion_larga_before',
                    label: 'Descripción Larga Anterior',
                    type: FILTER.types.string,
                    placeholder: 'Descripción Larga Anterior'
                },
                {
                    key: 'descripcion',
                    label: 'Descripción Siguiente',
                    type: FILTER.types.string,
                    placeholder: 'Descripción'
                },
                {
                    key: 'descripcion_larga',
                    label: 'Descripción Larga Siguiente',
                    type: FILTER.types.string,
                    placeholder: 'Descripción Larga Siguiente'
                },
                {
                    key: 'active',
                    label: 'Activo',
                    type: FILTER.types.bool,
                    placeholder: 'Activo'
                },
            ]
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (typeof eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`) != "undefined"){
                        if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }  else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit){
                            return MESSAGE.i('actions.Edit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view){
                            return MESSAGE.i('actions.View');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
                            return MESSAGE.i('actions.Remove');
                        }
                    } else {
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.Remove')+ ", " +
                            MESSAGE.i('actions.audit');
                    }
                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['edit', 'remove', 'active', 'view', 'copy', 'audit'];
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
                            return true;
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
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.audit');
                        },
                        title: (data) => {
                            return MESSAGE.i('actions.audit');
                        },
                        permission: (data) => {
                            return 'audit';
                        },
                        icon: (data) => {
                            return "stack-text";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/audit", data.$scope.modelName), {
                                    header: {
                                        title: MESSAGE.i('mono.auditof') + " " + data.$scope.plural,
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
                ]
            }
        ]
    }
});
//modify methods that existing option
//CRUD_pacc_departamento_status.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_pacc_departamento_status.table.options[0].menus.push({
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