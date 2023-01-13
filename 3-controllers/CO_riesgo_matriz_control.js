app.controller("riesgo_matriz_control", function ($scope, $http, $compile) {
    riesgo_matriz_control = this;
    riesgo_matriz_control.session = new SESSION().current();
    //riesgo_matriz_control.fixFilters = [];
    //riesgo_matriz_control.singular = "singular";
    //riesgo_matriz_control.plural = "plural";
    if (typeof riesgo_a === "undefined")
        riesgo_a = null;
    if (typeof riesgo === "undefined")
        riesgo = null;
    riesgo_matriz_control.headertitle = "Control de Riesgos Reales";
    //riesgo_matriz_control.destroyForm = false;
    //riesgo_matriz_control.permissionTable = "tabletopermission";

    if ((riesgo_a || riesgo).soyamfe) {
        riesgo_matriz_control.soyamfe = true;
        CRUD_riesgo_matriz_control = {};
        DSON.keepmerge(CRUD_riesgo_matriz_control, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_riesgo_matriz_control, {
            table: {
                width: "width:1500px;",
                view: 'vw_riesgo_matriz_control',
                //method: 'riesgo_control',
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
                    nombre: {
                        label: function () {
                            return "Medida Control"
                        }
                    },
                    descripcion: {shorttext: 360},
                    responsable_nombre: {
                        label: function () {
                            return "Responsable"
                        }
                    },
                    fecha_desde: {
                        label: function () {
                            return "Fecha Inicio Ejecución Programada"
                        },
                        formattype: ENUM.FORMAT.date
                    },
                    fecha_hasta: {
                        label: function () {
                            return "Fecha Fin Ejecución Programada"
                        },
                        formattype: ENUM.FORMAT.date
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
                            key: 'efectividad',
                            label: 'Efectividad',
                            type: FILTER.types.decimal,
                            placeholder: 'Efectividad'
                        },
                        {
                            key: 'responsable',
                            label: 'Responsable',
                            type: FILTER.types.relation,
                            table: 'usuario',
                            value: "id",
                            text: "item.nombre + ' ' + item.apellido",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [{
                                    "field": new SESSION().current().institucion_id ? "institucion" : "compania",
                                    "value": new SESSION().current() ? new SESSION().current().institucion_id ? new SESSION().current().institucion_id : new SESSION().current().compania_id : -1
                                }],
                                orderby: "id",
                                order: "asc",
                                distinct: false
                            },
                        },
                        {
                            key: 'fecha_inicio',
                            label: 'Fecha Inicio',
                            type: FILTER.types.date,
                            placeholder: 'Fecha Inicio'
                        },
                        {
                            key: 'fecha_fin',
                            label: 'Fecha Fin',
                            type: FILTER.types.date,
                            placeholder: 'Fecha Fin'
                        },
                        {
                            key: 'recursos_financieros',
                            label: 'Recursos Financieros',
                            type: FILTER.types.string,
                            placeholder: 'Recursos Financieros'
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
            }
        });
    } else {
        CRUD_riesgo_matriz_control = {};
        DSON.keepmerge(CRUD_riesgo_matriz_control, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_riesgo_matriz_control, {
            table: {
                width: "width:1500px;",
                view: 'vw_riesgo_matriz_control',
                //method: 'riesgo_control',
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
                    nombre: {},
                    descripcion: {shorttext: 360},
                    efectividad: {formattype: ENUM.FORMAT.percentage},
                    responsable_nombre: {
                        label: function () {
                            return "Responsable"
                        }
                    },
                    fecha_desde: {formattype: ENUM.FORMAT.date},
                    fecha_hasta: {formattype: ENUM.FORMAT.date},
                    recursos_financieros: {
                        label: function () {
                            return "Recursos financieros"
                        },
                        formattype: ENUM.FORMAT.decimal
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
                            key: 'efectividad',
                            label: 'Efectividad',
                            type: FILTER.types.decimal,
                            placeholder: 'Efectividad'
                        },
                        {
                            key: 'responsable',
                            label: 'Responsable',
                            type: FILTER.types.relation,
                            table: 'usuario',
                            value: "id",
                            text: "item.nombre + ' ' + item.apellido",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [{
                                    "field": new SESSION().current().institucion_id ? "institucion" : "compania",
                                    "value": new SESSION().current() ? new SESSION().current().institucion_id ? new SESSION().current().institucion_id : new SESSION().current().compania_id : -1
                                }],
                                orderby: "id",
                                order: "asc",
                                distinct: false
                            },
                        },
                        {
                            key: 'fecha_inicio',
                            label: 'Fecha Inicio',
                            type: FILTER.types.date,
                            placeholder: 'Fecha Inicio'
                        },
                        {
                            key: 'fecha_fin',
                            label: 'Fecha Fin',
                            type: FILTER.types.date,
                            placeholder: 'Fecha Fin'
                        },
                        {
                            key: 'recursos_financieros',
                            label: 'Recursos Financieros',
                            type: FILTER.types.string,
                            placeholder: 'Recursos Financieros'
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
            }
        });
    }
    if (riesgo_matriz_control.soyamfe) {
        riesgo_matriz_control.headertitle = "Medidas Control Reales";
    }

    riesgo_matriz_control.getRiesgo = async function () {
        var riesgoData = await BASEAPI.firstp('vw_riesgo_historico', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value: riesgo_matriz_control.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": riesgo_matriz_control.session.institucion_id ? "=" : "is",
                    "value": riesgo_matriz_control.session.institucion_id ? riesgo_matriz_control.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (riesgoData) {
            riesgo_matriz_control.mapa_id = riesgoData.id;
            riesgo_matriz_control.mapa_ano = riesgoData.ano;
        }
        riesgo_matriz_control.refreshAngular();
    };
    riesgo_matriz_control.getRiesgo();
    RUNCONTROLLER("riesgo_matriz_control", riesgo_matriz_control, $scope, $http, $compile);
    riesgo_matriz_control.formulary = function (data, mode, defaultData) {
        if (riesgo_matriz_control !== undefined) {
            RUN_B("riesgo_matriz_control", riesgo_matriz_control, $scope, $http, $compile);
            riesgo_matriz_control.form.modalWidth = ENUM.modal.width.full;
            riesgo_matriz_control.form.readonly = {riesgo_control: Matriz_id, riesgo: Row_id};
            if (riesgo_matriz_control.soyamfe) {
                riesgo_matriz_control.form.readonly.mamfe = 1;
            }

            riesgo_matriz_control.form.titles = {
                new: "Nuevo Control de Riesgo Real",
                edit: "Editar Control de  Riesgo Real",
                view: "Ver Control de  Riesgo Real"
            };
            if (riesgo_matriz_control.soyamfe) {
                riesgo_matriz_control.form.titles = {
                    new: "Nueva Medida de Control Real",
                    edit: "Editar Medida de Control Real",
                    view: "Ver Medida de Control Real"
                };
            }
            riesgo_matriz_control.createForm(data, mode, defaultData, riesgo_matriz_control.soyamfe ? "form_mamfe" : undefined);
            //ms_product.selectQueries['riesgo'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_matriz_control.riesgo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_matriz_control, 'riesgo', rules);
            });
            $scope.$watch("riesgo_matriz_control.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_matriz_control, 'nombre', rules);
            });
            $scope.$watch("riesgo_matriz_control.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_matriz_control, 'descripcion', rules);
            });
            $scope.$watch("riesgo_matriz_control.efectividad", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.menorQue(value, 100, "Efectividad", "100"))
                rules.push(VALIDATION.yariel.mayorOigualCero(value, "Efectividad"))
                VALIDATION.validate(riesgo_matriz_control, 'efectividad', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_matriz_control.responsable", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_matriz_control, 'responsable', rules);
            });
            $scope.$watch("riesgo_matriz_control.range_date", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_matriz_control, 'range_date', rules);
            });
            $scope.$watch("riesgo_matriz_control.fecha_desde", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_matriz_control, 'fecha_desde', rules);
            });
            $scope.$watch("riesgo_matriz_control.fecha_hasta", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_matriz_control, 'fecha_hasta', rules);
            });
            $scope.$watch("riesgo_matriz_control.recursos_financieros", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_matriz_control, 'recursos_financieros', rules);
            });

            riesgo_matriz_control.triggers.table.after.control = function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
                if (mode === 'new' && data == 'range_date') {
                    riesgo_matriz_control.range_date = "";
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + parseInt(riesgo_matriz_control.mapa_ano)).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    var rango_minimo = moment(("01-02-" + parseInt(riesgo_matriz_control.mapa_ano))).add(-1, 'day').format("YYYY-MM-DD");
                    // if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                    //
                    //     riesgo_matriz_control.range_date_min(rango_minimo);
                    //     riesgo_matriz_control.range_date_max(moment('01-01-10000').add(-1,'day').format("YYYY-MM-DD"));
                    //     riesgo_matriz_control.refreshAngular();
                    // }else{
                    riesgo_matriz_control.range_date_min(rango_minimo);
                    riesgo_matriz_control.range_date_max(rango_maximo);
                    if (moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        riesgo_matriz_control.range_date_start(rango_minimo);
                    }
                    riesgo_matriz_control.refreshAngular();
                    // }
                }
                if (mode === 'edit' && data == 'range_date') {
                    var rango_minimo = moment(("01-02-" + parseInt(riesgo_matriz_control.mapa_ano))).add(-1, 'day').format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + parseInt(riesgo_matriz_control.mapa_ano)).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    // if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                    //
                    //     riesgo_matriz_control.range_date_min(rango_minimo);
                    //     riesgo_matriz_control.range_date_max(moment('01-01-10000').add(-1,'day').format("YYYY-MM-DD"));
                    //     riesgo_matriz_control.refreshAngular();
                    // }else{
                    if (moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        rango_minimo = moment(("01-02-" + parseInt(riesgo_matriz_control.mapa_ano))).add(-1, 'day').format("YYYY-MM-DD");
                        riesgo_matriz_control.range_date_start(rango_minimo);
                    }
                    riesgo_matriz_control.range_date_min(rango_minimo);
                    riesgo_matriz_control.range_date_max(rango_maximo);
                    riesgo_matriz_control.refreshAngular();
                    // }
                }
            };
        }
    };
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
    // riesgo_matriz_control.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    riesgo_matriz_control.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        data.updating.efectividad = riesgo_matriz_control.efectividad;
        resolve(true);
    });
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
