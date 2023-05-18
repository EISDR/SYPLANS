app.controller("riesgo_a", function ($scope, $http, $compile) {
    riesgo_a = this;
    var user = new SESSION().current();
    riesgo_a.session = new SESSION().current();
    if (typeof Matriz_id !== "undefined")
        riesgo_a.id = Matriz_id;
    if (typeof riesgo !== "undefined")
        riesgo_a.esplan = riesgo.esplan;

    riesgo_a.entidad = window.location.href.split('?')[1].replaceAll('RF', '');

    if (window.location.href.indexOf('mamfe') !== -1) {
        riesgo_a.soyamfe = true;
        CRUD_riesgo_a = {};
        DSON.keepmerge(CRUD_riesgo_a, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_riesgo_a, {
            table: {
                width: "width:1600px;",
                view: 'vw_riesgo_a',
                //method: 'riesgo',
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
                            return "Modo de Fallo"
                        },
                    },
                    descripcion: {
                        label: function () {
                            return "Descripción del modo de Fallo"
                        },
                        shorttext: 360
                    },
                    mamfe_efecto: {
                        shorttext: 360,
                        label: function () {
                            return "Efecto"
                        },
                    },
                    mamfe_causa: {
                        shorttext: 360,
                        label: function () {
                            return "Causa"
                        },
                    },
                    riesgo_control: {
                        label: function () {
                            return "Controles Actuales del Riesgo"
                        },
                        export: false,
                        exportExample: false
                    },
                    mamfe_gravedad: {
                        label: function () {
                            return "Gravedad (G)"
                        }
                    },
                    mamfe_ocurrencia: {
                        label: function () {
                            return "Ocurrencia (O)"
                        }
                    },
                    mamfe_deteccion: {
                        label: function () {
                            return "Detección (D)"
                        }
                    },
                    indice: {
                        label: function () {
                            return "Índice de Prioridad de Riesgos (IPR=GxOxD)"
                        },
                        format: function (row) {
                            return (row.mamfe_gravedad || 0) * (row.mamfe_ocurrencia || 0) * (row.mamfe_deteccion || 0);
                        }
                    },
                    // mamfe_gravedad_current: {
                    //     label: function () {
                    //         return "Valoración (G)"
                    //     }
                    // },
                    // mamfe_ocurrencia_current: {
                    //     label: function () {
                    //         return "Valoración (O)"
                    //     }
                    // },
                    // mamfe_deteccion_current: {
                    //     label: function () {
                    //         return "Valoración (D)"
                    //     }
                    // },
                    riesgo_controls: {
                        label: function () {
                            return "Controles de Riesgo"
                        },
                        visible: false,
                        visibleDetail: false,
                        export: true,
                        exportExample: true,
                        checkExport: true,
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
                            key: 'probabilidad',
                            label: 'Probabilidad',
                            type: FILTER.types.relation,
                            table: 'riesgo_probabilidad',
                            value: "id",
                            text: "item.nombre",
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
                            key: 'impacto',
                            label: 'Impacto',
                            type: FILTER.types.relation,
                            table: 'riesgo_impacto',
                            value: "id",
                            text: "item.nombre",
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
                            key: 'factor_riesgo',
                            label: 'Factor de Riesgo',
                            type: FILTER.types.decimal,
                            placeholder: 'Factor de Riesgo'
                        },
                        {
                            key: 'consecuencia',
                            label: 'Consecuencia',
                            type: FILTER.types.string,
                            placeholder: 'Consecuencia'
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
                                    data.row.mamfe_ocurrencia = parseFloat(data.row.mamfe_ocurrencia);
                                    data.row.mamfe_gravedad = parseFloat(data.row.mamfe_gravedad);
                                    data.row.mamfe_deteccion = parseFloat(data.row.mamfe_deteccion);
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
                                show: function (data) {
                                    return data.row.matriz_riesgo_count === 0;
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
        CRUD_riesgo_a = {};
        DSON.keepmerge(CRUD_riesgo_a, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_riesgo_a, {
            table: {
                width: "width:1600px;",
                view: 'vw_riesgo_a',
                //method: 'riesgo',
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
                    probabilidad_nombre: {
                        label: function () {
                            return "Probalidad"
                        },
                        format: function (row) {
                            return row.probabilidad_nombre + " - " + parseInt(row.probabilidad_valor) + "%";
                        }
                    },
                    impacto_nombre: {
                        label: function () {
                            return "Impacto"
                        },
                        format: function (row) {
                            return row.impacto_nombre + " - " + parseInt(row.impacto_valor) + "";
                        }
                    },
                    factor_riesgo: {
                        label: function () {
                            return "Factor de Riesgo"
                        },
                    },
                    causa_debilidad: {
                        label: function () {
                            return "Causa o Debilidad"
                        }
                    },
                    consecuencia: {
                        label: function () {
                            return "Efecto"
                        }
                    },
                    riesgo_control: {
                        label: function () {
                            return "Controles de Riesgo"
                        },
                        export: false,
                        exportExample: false
                    },
                    riesgo_controls: {
                        label: function () {
                            return "Controles de Riesgo"
                        },
                        visible: false,
                        visibleDetail: false,
                        export: true,
                        exportExample: true,
                        checkExport: true,
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
                            key: 'probabilidad',
                            label: 'Probabilidad',
                            type: FILTER.types.relation,
                            table: 'riesgo_probabilidad',
                            value: "id",
                            text: "item.nombre",
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
                            key: 'impacto',
                            label: 'Impacto',
                            type: FILTER.types.relation,
                            table: 'riesgo_impacto',
                            value: "id",
                            text: "item.nombre",
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
                            key: 'factor_riesgo',
                            label: 'Factor de Riesgo',
                            type: FILTER.types.decimal,
                            placeholder: 'Factor de Riesgo'
                        },
                        {
                            key: 'consecuencia',
                            label: 'Consecuencia',
                            type: FILTER.types.string,
                            placeholder: 'Consecuencia'
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
                                show: function (data) {
                                    return data.row.riesgo_controls_count === 0 && data.row.matriz_riesgo_count === 0;
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

    if (riesgo_a.entidad == "vw_procesos") {
        riesgo_a.drp_entidad = "proceso";
    } else if (riesgo_a.entidad == "proceso") {
        riesgo_a.drp_entidad = riesgo_a.entidad;
    } else {
        riesgo_a.drp_entidad = "pei_poa";
    }

    // riesgo_a.from_matriz = false;
    //riesgo_a.singular = "singular";
    //riesgo_a.plural = "plural";
    riesgo_a.headertitle = "Riesgo";
    if (riesgo_a.soyamfe)
        riesgo_a.headertitle = "Riesgo";
    //riesgo_a.destroyForm = false;
    //riesgo_a.permissionTable = "tabletopermission";
    RUNCONTROLLER("riesgo_a", riesgo_a, $scope, $http, $compile);
    RUN_B("riesgo_a", riesgo_a, $scope, $http, $compile);
    riesgo_a.plural = "Riesgos";
    riesgo_a.singular = "Riesgos";
    riesgo_a.headertitle = "Riesgos";
    if (riesgo_a.soyamfe) {
        riesgo_a.fixFilters = [
            {
                field: "compania",
                value: riesgo_a.session.compania_id
            },
            {
                field: "institucion",
                operator: riesgo_a.session.institucion_id ? "=" : "is",
                value: riesgo_a.session.institucion_id ? riesgo_a.session.institucion_id : "$null"
            },
            {
                field: "entidad",
                value: riesgo_a.entidad
            },
            {
                field: "mamfe",
                value: 1
            }
        ];

    } else {
        riesgo_a.fixFilters = [
            {
                field: "compania",
                value: riesgo_a.session.compania_id
            },
            {
                field: "institucion",
                operator: riesgo_a.session.institucion_id ? "=" : "is",
                value: riesgo_a.session.institucion_id ? riesgo_a.session.institucion_id : "$null"
            },
            {
                field: "entidad",
                value: riesgo_a.entidad
            },
            {
                field: "mamfe",
                operator: "IS",
                value: "$NULL"
            }
        ];
    }
    if (riesgo_a.soyamfe)
        riesgo_a.headertitle = "Modo de fallos";
    riesgo_a.setPermission("export", false);
    riesgo_a.setPermission("active", true);
    riesgo_a.formulary = function (data, mode, defaultData) {
        if (riesgo_a !== undefined) {
            RUN_B("riesgo_a", riesgo_a, $scope, $http, $compile);
            riesgo_a.entidad = window.location.href.split('?')[1].replaceAll('RF', '');
            if (riesgo_a.entidad == "vw_procesos") {
                riesgo_a.drp_entidad = "proceso";
            } else if (riesgo_a.entidad == "proceso") {
                riesgo_a.drp_entidad = riesgo_a.entidad;
            } else {
                riesgo_a.drp_entidad = "pei_poa";
            }
            riesgo_a.form.modalWidth = ENUM.modal.width.full;
            riesgo_a.form.titles = {
                new: "Nuevo Riesgo",
                edit: "Editar Riesgo",
                view: "Ver Riesgo"
            };
            if (riesgo_a.soyamfe) {
                riesgo_a.form.titles = {
                    new: "Nuevo Modo de Fallo",
                    edit: "Editar Modo de Fallo",
                    view: "Ver Modo de Fallo"
                };
            }


            riesgo_a.form.readonly = {
                compania: riesgo_a.session.compania_id,
                institucion: riesgo_a.session.institucion_id,
                entidad: riesgo_a.entidad,
                active: 1
            };
            if (riesgo_a.soyamfe) {
                riesgo_a.form.readonly.mamfe = 1;
            }

            riesgo_a.createForm(data, mode, defaultData, riesgo_a.soyamfe ? "form_mamfe" : undefined);


            $scope.$watch("riesgo_a.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_a, 'nombre', rules);
            });
            $scope.$watch("riesgo_a.causa_debilidad", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_a, 'causa_debilidad', rules);
            });
            $scope.$watch("riesgo_a.supuestos", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_a, 'supuestos', rules);
            });
            $scope.$watch("riesgo_a.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_a, 'descripcion', rules);
            });
            $scope.$watch("riesgo_a.probabilidad", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_a, 'probabilidad', rules);
            });
            $scope.$watch("riesgo_a.impacto", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_a, 'impacto', rules);
            });
            $scope.$watch("riesgo_a.factor_riesgo", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_a, 'factor_riesgo', rules);
            });
            $scope.$watch("riesgo_a.consecuencia", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_a, 'consecuencia', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_a.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_a, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_a.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_a, 'institucion', rules);
            });
            if (riesgo_a.soyamfe) {
                $scope.$watch("riesgo_a.mamfe_elemento", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(riesgo_a, 'mamfe_elemento', rules);
                });
                $scope.$watch("riesgo_a.mamfe_efecto", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(riesgo_a, 'mamfe_efecto', rules);
                });
                $scope.$watch("riesgo_a.mamfe_causa", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(riesgo_a, 'mamfe_causa', rules);
                });
                $scope.$watch("riesgo_a.mamfe_gravedad", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(riesgo_a, 'mamfe_gravedad', rules);
                });
                $scope.$watch("riesgo_a.mamfe_ocurrencia", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(riesgo_a, 'mamfe_ocurrencia', rules);
                });
                $scope.$watch("riesgo_a.mamfe_deteccion", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(riesgo_a, 'mamfe_deteccion', rules);
                });
            }
            riesgo_a.triggers.table.after.control = function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
                // if (data === "view_descripcion"){
                //     if (typeof vw_riesgo !== 'undefined') {
                //         if (typeof vw_riesgo !== 'not defined') {
                //             if (vw_riesgo) {
                //                 riesgo_control.fixFilters = [{field: 'riesgo', value: vw_riesgo.id},{field: "real", value: 1}];
                //             }
                //         }
                //     }
                // }
                if (!CONFIG.mysqlactive) {
                    if (data === 'mamfe_deteccion' && mode === 'edit') {
                        riesgo_a.mamfe_deteccion = riesgo_a.mamfe_deteccion + '.00'
                    }
                    if (data === 'mamfe_gravedad' && mode === 'edit') {
                        riesgo_a.mamfe_gravedad = riesgo_a.mamfe_gravedad + '.00'
                    }
                    if (data === 'mamfe_ocurrencia' && mode === 'edit') {
                        riesgo_a.mamfe_ocurrencia = riesgo_a.mamfe_ocurrencia + '.00'
                    }
                }
            };
        }
    };
    riesgo_a.selectQueries['estado_plan_accion'] = [
        {
            field: 'rol',
            operator: '=',
            value: riesgo_a.session.groups[0].id
        },
        {
            field: 'entidad',
            operator: '=',
            value: "riesgo"
        }
    ];
    $scope.$watch("riesgo_a.detail_comentario", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_a, 'detail_comentario', rules);
    });
    $scope.$watch("riesgo_a.estado_plan_accion", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_a, 'estado_plan_accion', rules);
    });
    $scope.$watch("riesgo_a.estrategia", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_a, 'estrategia', rules);
    });
    $scope.$watch("riesgo_a.comentario_comment", function (value) {
        var rules = [];
        //rules here
        // rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_a, 'comentario_comment', rules);
    });
    $scope.$watch("riesgo_a.fin_plan_accion", function (value) {
        var rules = [];
        //rules here
        // rules.push(VALIDATION.general.required(value));
        if (!DSON.oseaX(riesgo_a.condicion)) {
            checkboxriesgo_a_fin_plan_accion.setPosition(2);
        }
        VALIDATION.validate(riesgo_a, 'fin_plan_accion', rules);
    });
    if(riesgo_a.soyamfe && riesgo_a.esplan){
        $scope.$watch("riesgo_a.mamfe_gravedad_current", function (value) {
            var rules = [];
            //rules here
            rules.push(VALIDATION.yariel.mayorCero(value, "Valoración Gravedad (G)"));
            VALIDATION.validate(riesgo_a, 'mamfe_gravedad_current', rules);
        });
        $scope.$watch("riesgo_a.mamfe_ocurrencia_current", function (value) {
            var rules = [];
            //rules here
            rules.push(VALIDATION.yariel.mayorCero(value, "Valoración Ocurrencia (O)"));
            VALIDATION.validate(riesgo_a, 'mamfe_ocurrencia_current', rules);
        });
        $scope.$watch("riesgo_a.mamfe_deteccion_current", function (value) {
            var rules = [];
            //rules here
            rules.push(VALIDATION.yariel.mayorCero(value, "Valoración Detección (D)"));
            VALIDATION.validate(riesgo_a, 'mamfe_deteccion_current', rules);
        });
        $scope.$watch("riesgo_a.observacion", function (value) {
            var rules = [];
            //rules here
            rules.push(VALIDATION.general.required(value));
            VALIDATION.validate(riesgo_a, 'observacion', rules);
        });
    }
    if(!riesgo_a.soyamfe && riesgo_a.esplan){

        $scope.$watch("riesgo_a.probabilidad_current", function (value) {
            var rules = [];
            //rules here
            rules.push(VALIDATION.general.required(value));
            VALIDATION.validate(riesgo_a, 'probabilidad_current', rules);
        });
        $scope.$watch("riesgo_a.impacto_current", function (value) {
            var rules = [];
            //rules here
            rules.push(VALIDATION.general.required(value));
            VALIDATION.validate(riesgo_a, 'impacto_current', rules);
        });
        $scope.$watch("riesgo_a.observacion", function (value) {
            var rules = [];
            //rules here
            rules.push(VALIDATION.general.required(value));
            VALIDATION.validate(riesgo_a, 'observacion', rules);
        });
    }
    riesgo_a.eltipo = false;
    riesgo_a.changeIndicador = function (table) {
        location.href = location.href.split('?')[0] + '?' + table;
    };
    riesgo_a.triggers.table.after.load = async function (records) {
        riesgo_a.runMagicOneToMany('riesgo_control', 'riesgo_control', 'riesgo', 'nombre', 'id');
        riesgo_a.runMagicColum('factor_riesgo', 'perspectiva', "id", "nombre");
        riesgo_a.runMagicColum('proceso', 'proceso', "id", "nombre");
        riesgo_a.refreshAngular();
    };
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
    riesgo_a.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        data.inserting.mamfe_deteccion = parseInt(data.inserting.mamfe_deteccion)
        data.inserting.mamfe_gravedad = parseInt(data.inserting.mamfe_gravedad)
        data.inserting.mamfe_ocurrencia = parseInt(data.inserting.mamfe_ocurrencia)
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    riesgo_a.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        data.updating.mamfe_deteccion = parseInt(data.updating.mamfe_deteccion)
        data.updating.mamfe_gravedad = parseInt(data.updating.mamfe_gravedad)
        data.updating.mamfe_ocurrencia = parseInt(data.updating.mamfe_ocurrencia)
        resolve(true);
    });
    //
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
    riesgo_a.getFromView = function (row) {
        riesgo_a.fromWhere = From_where;
        riesgo_a.tolorow = row;
        riesgo_a.view_entidad = row.entidad;
        riesgo_a.view_registro = row.registro_nombre;
        riesgo_a.view_riesgo_a = row.riesgo_a;
        riesgo_a.view_nombre = row.nombre;
        riesgo_a.view_causa_debilidad = row.causa_debilidad;
        riesgo_a.view_consecuencia = row.consecuencia;
        riesgo_a.view_factor_riesgo = row.factor_riesgo;
        riesgo_a.view_supuestos = row.supuestos;
        riesgo_a.probabilidad_current = row.probabilidad_current ? row.probabilidad_current + "" : "[NULL]";
        riesgo_a.impacto_current = row.impacto_current ? row.impacto_current + "" : "[NULL]";
        riesgo_a.view_probabilidad = row.probabilidad_nombre + " - " + row.probabilidad_valor + "%";
        riesgo_a.view_impacto = row.impacto_nombre + " - " + row.impacto_valor;
        riesgo_a.view_descripcion = row.descripcion;
        riesgo_a.estrategia_nombre = row.estrategia_nombre;
        riesgo_a.estrategia = riesgo_a.estrategia !== '[NULL]' ? riesgo_a.estrategia : row.estrategia ? row.estrategia + "" : "[NULL]";
        riesgo_a.estado_plan_accion_nombre = row.estado_plan_accion_nombre;
        riesgo_a.estado_plan_accion = riesgo_a.estado_plan_accion !== '[NULL]' ? riesgo_a.estado_plan_accion : row.estado_plan_accion ? row.estado_plan_accion + "" : "[NULL]";
        riesgo_a.my_true_estatus = riesgo_a.estado_plan_accion !== '[NULL]' ? riesgo_a.estado_plan_accion : row.estado_plan_accion ? row.estado_plan_accion + "" : "[NULL]";
        riesgo_a.observacion = row.observacion;
        riesgo_a.condicion = row.condicion;
        riesgo_a.fin_plan_accion = row.condicion === 1;
        if (!riesgo_a.ocurrencia)
            riesgo_a.ocurrencia = row.ocurrencia;

        riesgo_a.mamfe_efecto = row.mamfe_efecto;
        riesgo_a.mamfe_causa = row.mamfe_causa;
        riesgo_a.mamfe_deteccion = row.mamfe_deteccion;
        riesgo_a.mamfe_gravedad = row.mamfe_gravedad;
        riesgo_a.mamfe_ocurrencia = row.mamfe_ocurrencia;
        riesgo_a.mamfe_deteccion_current = row.mamfe_deteccion_current;
        riesgo_a.mamfe_gravedad_current = row.mamfe_gravedad_current;
        riesgo_a.mamfe_ocurrencia_current = row.mamfe_ocurrencia_current;
        riesgo_a.mamfe_elemento = row.mamfe_elemento + "";
        riesgo_a.mamfe = row.mamfe;

        riesgo_a.id_matriz = row.id;
        riesgo_a.refreshAngular();
    };
    riesgo_a.save_coment = async function () {
        VALIDATION.save(riesgo_a, async function () {
            SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
            BASEAPI.insert('comentarios', {
                "comentario": riesgo_a.detail_comentario,
                "type": 21,
                "created_by": riesgo_a.session.usuario_id,
                "value": vw_comentarios.riesgo_id
            }, function (result) {
                SWEETALERT.stop();

                if (typeof riesgo !== "undefined") {
                    if (riesgo.soyamfe) {
                        SWEETALERT.show({
                            message: "El fallo ha sido evaluado",
                            confirm: function () {
                                MODAL.close();
                                riesgo.refresh();
                            }
                        });
                        return;
                    }
                }
                SWEETALERT.show({
                    message: "Riesgo ha sido evaluado",
                    confirm: function () {
                        MODAL.close();
                        riesgo.refresh();
                    }
                });
            });
        }, ["detail_comentario"]);
    }
    riesgo_a.work_plan = function (id) {
        VALIDATION.save(riesgo_a, async function () {
            SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
            BASEAPI.updateall('riesgo', {
                "estado_plan_accion": riesgo_a.estado_plan_accion ? riesgo_a.estado_plan_accion : "$null",
                "estrategia": riesgo_a.estrategia ? riesgo_a.estrategia : "$null",
                "ocurrencia": riesgo_a.ocurrencia ? 1 : "$null",
                where: [
                    {
                        field: "id",
                        value: id
                    }
                ]
            }, function (result) {
                SWEETALERT.stop();
                SWEETALERT.show({
                    message: "Se ha trabajado la Respuesta al Riesgo monitoreado",
                    confirm: function () {
                        MODAL.close();
                        if (typeof riesgo !== 'undefined') {
                            if (typeof riesgo !== 'not defined') {
                                if (riesgo) {
                                    riesgo.refresh();
                                }
                            }
                        }

                        if (typeof vw_riesgo !== 'undefined') {
                            if (typeof vw_riesgo !== 'not defined') {
                                if (vw_riesgo) {
                                    vw_riesgo.refresh();
                                }
                            }
                        }
                    }
                });
            })
        }, ["estado_plan_accion", "estrategia"]);
    }
    riesgo_a.SaveComent = function (id) {
        BASEAPI.insert('comentarios', {
            "comentario": riesgo_a.comentario_comment,
            "type": 22,
            "created_by": riesgo_a.session.usuario_id,
            "value": id
        }, function (result) {
            if (result) {
                riesgo_a.comentario_comment = "";
                vw_comentario_plan_accion.refresh();
                riesgo_a.refreshAngular();
                NOTIFY.success("Comentario agregado");
            }
        });
    }
    riesgo_a.todasaccionescorrectivas = () => {
        if (riesgo_a.list_acciones_correctivas) {
            if (riesgo_a.list_acciones_correctivas.length) {
                return riesgo_a.list_acciones_correctivas.filter(d => {
                    return d.estatus == 4
                }).length === riesgo_a.list_acciones_correctivas.length;
            }
        }
        return false;
    };
    riesgo_a.updateAndContinue = () => {
        riesgo_a.modal.closeAll();
        if (typeof riesgo !== "undefined")
            riesgo.refresh();
        SWEETALERT.stop();
    };
    riesgo_a.saveImprovisado = () => {
        VALIDATION.save(riesgo_a, async function () {
            SWEETALERT.loading({message: MESSAGE.ic('mono.loading') + "..."});
            BASEAPI.updateall('riesgo', {
                mamfe_gravedad_current: parseInt(riesgo_a.mamfe_gravedad_current),
                mamfe_ocurrencia_current: parseInt(riesgo_a.mamfe_ocurrencia_current),
                mamfe_deteccion_current: parseInt(riesgo_a.mamfe_deteccion_current),
                observacion: riesgo_a.observacion,
                where: [
                    {
                        field: "id",
                        value: riesgo_a.id_matriz
                    },
                ]
            }, function (result) {
                riesgo_a.modal.closeAll();
                if (typeof riesgo !== "undefined")
                    riesgo.refresh();
                SWEETALERT.stop();
            });
        }, ["mamfe_gravedad_current","mamfe_ocurrencia_current","mamfe_deteccion_current","observacion"]);
    };
    riesgo_a.saveImprovisadoVaR = () => {
        VALIDATION.save(riesgo_a, async function () {
            SWEETALERT.loading({message: MESSAGE.ic('mono.loading') + "..."});
            BASEAPI.updateall('riesgo', {
                probabilidad_current: riesgo_a.probabilidad_current,
                impacto_current: riesgo_a.impacto_current,
                observacion: riesgo_a.observacion,
                condicion: 1,
                where: [
                    {
                        field: "id",
                        value: riesgo_a.id_matriz
                    },
                ]
            }, function (result) {
                riesgo_a.modal.closeAll();
                if (typeof riesgo !== "undefined")
                    riesgo.refresh();
                SWEETALERT.stop();
            });
        }, ["probabilidad_current","impacto_current","observacion"]);
    };
});
