app.controller("riesgo_impacto", function ($scope, $http, $compile) {
    riesgo_impacto = this;
    riesgo_impacto.session = new SESSION().current();
    riesgo_impacto.entidad = window.location.href.split('?')[1].replaceAll('RF', '');
    riesgo_impacto.fixFilters = [
        {
            field: "compania",
            value: riesgo_impacto.session.compania_id
        },
        {
            field: "institucion",
            operator: riesgo_impacto.session.institucion_id ? "=" : "is",
            value: riesgo_impacto.session.institucion_id ? riesgo_impacto.session.institucion_id : "$null"
        },
        {
            field: "entidad",
            value: riesgo_impacto.entidad
        }
    ];
    if (window.location.href.split('?').length > 2) {
        riesgo_impacto.soyamfe = true;
        CRUD_riesgo_impacto = {};
        DSON.keepmerge(CRUD_riesgo_impacto, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_riesgo_impacto, {
            table: {
                //width: "width:3000px;",
                //view: 'vw_riesgo_impacto',
                //method: 'riesgo_impacto',
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
                        exportExample: false,
                        dead: true
                    },
                    nombre: {
                        label: function () {
                            return "Gravedad"
                        },
                    },
                    descripcion: {
                        label: function () {
                            return "Criterio"
                        },
                        shorttext: 360
                    },
                    valor: {
                        exportExample: "[int]",
                        label: function () {
                            return "Valor"
                        },
                        format: function (row) {
                            return `${row.valor}`;
                        }
                    },
                    compania: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        exportfix: "new SESSION().current().compania_id",
                        dead: true
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
                            key: 'descripcion',
                            label: 'Descripción',
                            type: FILTER.types.string,
                            placeholder: 'Descripción'
                        },
                        {
                            key: 'valor',
                            label: function() {
                                return 'Valor';
                            },
                            type: FILTER.types.decimal,
                            placeholder: 'Valor'
                        },
                    ]
                },
                options: [
                    {
                        text: (data) => {
                            return "";
                        },
                        title: (data) => {
                            if (typeof eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`) != "undefined") {
                                if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit) {
                                    return MESSAGE.i('actions.Edit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                                    return MESSAGE.i('actions.View');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Remove');
                                }
                            } else {
                                return MESSAGE.i('actions.Edit') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.Remove') + ", " +
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
            },
        });
        riesgo_impacto.fixFilters.push({
            field: "mamfe",
            value: 1
        });
    } else {
        CRUD_riesgo_impacto = {};
        DSON.keepmerge(CRUD_riesgo_impacto, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_riesgo_impacto, {
            table: {
                //width: "width:3000px;",
                //view: 'vw_riesgo_impacto',
                //method: 'riesgo_impacto',
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
                        exportExample: false,
                        dead: true
                    },
                    nombre: {},
                    descripcion: {shorttext: 360},
                    valor: {
                        exportExample: "[int]",
                        label: function () {
                            return "Valor"
                        },
                        format: function (row) {
                            return parseInt(row.valor) + "";
                        }
                    },
                    compania: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        exportfix: "new SESSION().current().compania_id",
                        dead: true
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
                            key: 'descripcion',
                            label: 'Descripción',
                            type: FILTER.types.string,
                            placeholder: 'Descripción'
                        },
                        {
                            key: 'valor',
                            label: function() {
                                return 'Valor';
                            },
                            type: FILTER.types.decimal,
                            placeholder: 'Valor'
                        },
                    ]
                },
                options: [
                    {
                        text: (data) => {
                            return "";
                        },
                        title: (data) => {
                            if (typeof eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`) != "undefined") {
                                if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit) {
                                    return MESSAGE.i('actions.Edit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                                    return MESSAGE.i('actions.View');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Remove');
                                }
                            } else {
                                return MESSAGE.i('actions.Edit') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.Remove') + ", " +
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
            },
        });
        riesgo_impacto.fixFilters.push({
            field: "mamfe",
            operator: "IS",
            value: "$NULL"
        });
    }
    //riesgo_impacto.singular = "singular";
    //riesgo_impacto.plural = "plural";
    riesgo_impacto.headertitle = "Impacto";
    if (riesgo_impacto.soyamfe)
        riesgo_impacto.headertitle = "Gravedad";
    //riesgo_impacto.destroyForm = false;
    //riesgo_impacto.permissionTable = "tabletopermission";
    RUNCONTROLLER("riesgo_impacto", riesgo_impacto, $scope, $http, $compile);
    riesgo_impacto.formulary = function (data, mode, defaultData) {
        if (riesgo_impacto !== undefined) {
            RUN_B("riesgo_impacto", riesgo_impacto, $scope, $http, $compile);
            riesgo_impacto.entidad = window.location.href.split('?')[1].replaceAll('RF', '');
            riesgo_impacto.form.modalWidth = ENUM.modal.width.full;
            riesgo_impacto.form.readonly = {
                compania: riesgo_impacto.session.compania_id,
                institucion: riesgo_impacto.session.institucion_id,
                entidad: riesgo_impacto.entidad
            };
            if (riesgo_impacto.soyamfe) {
                riesgo_impacto.form.titles = {
                    new: "Nueva Gravedad",
                    edit: "Editar Gravedad",
                    view: "Ver Gravedad"
                };
            }
            if (riesgo_impacto.soyamfe) {
                riesgo_impacto.form.readonly.mamfe = 1;
            }
            riesgo_impacto.createForm(data, mode, defaultData, riesgo_impacto.soyamfe ? "form_mamfe" : undefined);
            $scope.$watch("riesgo_impacto.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_impacto, 'nombre', rules);
            });
            $scope.$watch("riesgo_impacto.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_impacto, 'descripcion', rules);
            });
            if (riesgo_impacto.soyamfe){
                $scope.$watch("riesgo_impacto.valor", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.yariel.mayorOigualCero(value, "Valor"));
                    rules.push(VALIDATION.yariel.menorQue(value, 10,"Valor", "10"));
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(riesgo_impacto, 'valor', rules);
                });
            }else{
                $scope.$watch("riesgo_impacto.valor", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(riesgo_impacto, 'valor', rules);
                });
            }

            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_impacto.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_impacto, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_impacto.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_impacto, 'institucion', rules);
            });
        }
    };
    riesgo_impacto.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        if (riesgo_impacto.soyamfe) {
            var exist = await BASEAPI.listp("riesgo_impacto", {
                where: [
                    {
                        field: 'compania',
                        value: new SESSION().current().compania_id
                    },
                    {
                        field: 'institucion',
                        operator: new SESSION().current().institucion_id ? "=" : '',
                        value: new SESSION().current().institucion_id || "$ is NULL"
                    },
                    {
                        field: "entidad",
                        value: riesgo_impacto.entidad
                    },
                    {
                        field: "valor",
                        value: data.inserting.valor
                    }
                ]
            });
            if (exist.data)
                if (exist.data.length) {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `El valor existe en la gravedad "${exist.data[0].nombre}"`
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                }
        }
        resolve(true);
    });
    //

    riesgo_impacto.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (riesgo_impacto.soyamfe) {
            var exist = await BASEAPI.listp("riesgo_impacto", {
                where: [
                    {
                        field: 'id',
                        operator: '!=',
                        value: riesgo_impacto.id
                    },
                    {
                        field: 'compania',
                        value: new SESSION().current().compania_id
                    },
                    {
                        field: 'institucion',
                        operator: new SESSION().current().institucion_id ? "=" : '',
                        value: new SESSION().current().institucion_id || "$ is NULL"
                    },
                    {
                        field: "entidad",
                        value: riesgo_impacto.entidad
                    },
                    {
                        field: "valor",
                        value: data.updating.valor
                    }
                ]
            });
            if (exist.data)
                if (exist.data.length) {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `El valor existe en la gravedad "${exist.data[0].nombre}"`
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                }
        }
        resolve(true);
    });
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});
