app.controller("vw_auditoria_lista_correctiva", function ($scope, $http, $compile) {
    vw_auditoria_lista_correctiva = this;
    vw_auditoria_lista_correctiva.session = new SESSION().current();
    if (window.location.href.split('?').length > 0)
        vw_auditoria_lista_correctiva.accion = window.location.href.split('?')[1] === "evento";
    //vw_auditoria_lista_correctiva.fixFilters = [];
    vw_auditoria_lista_correctiva.singular = "singular";
    vw_auditoria_lista_correctiva.plural = "plural";
    vw_auditoria_lista_correctiva.headertitle = "Seguimiento de Acciones de Mejora";
    vw_auditoria_lista_correctiva.destroyForm = false;
    if (vw_auditoria_lista_correctiva.accion) {
        CRUD_vw_auditoria_lista_correctiva = {};
        DSON.keepmerge(CRUD_vw_auditoria_lista_correctiva, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_vw_auditoria_lista_correctiva, {
            table: {
                width: "width:1800px;",
                //view: 'vw_vw_auditoria_lista_correctiva',
                //method: 'vw_auditoria_lista_correctiva',
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
                    evento_nombre: {
                        label: function () {
                            if (vw_auditoria_lista_correctiva.records.data.length > 0 ){
                                return vw_auditoria_lista_correctiva.records.data[0].relacion == 2 ? "Salida No Conforme" : vw_auditoria_lista_correctiva.records.data[0].relacion == 3 ? "Indicador Génerico" : "Evento"
                            }else {
                                return "Evento"
                            }
                        }
                    },
                    evento_riesgo_nombre: {
                        label: function () {
                            return "Plan de acción"
                        }
                    },
                    nombre: {
                        label: function () {
                            return "Acción de Mejora"
                        }
                    },
                    departamento_list: {
                        label: function () {
                            return "Departamentos"
                        }
                    },
                    responsable_list: {
                        label: function () {
                            return "Responsables"
                        }
                    },
                    condition: {
                        export: true,
                        label: "Condición",
                        format: function (row) {
                            var nom = row.condition;
                            $(`.Retrazado`).css('background', '#FF0000');
                            $(`.Enejecucion`).css('background', '#5de362');
                            $(`.Finalizado`).css('background', '#548235');
                            $(`.PendienteaTrabajar`).css('background', '#CECECE');
                            return `<div title="${row.condition.replaceAll('Ninguno', 'Ninguna Condición')}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                        }
                    },
                    fecha_inicio: {formattype: ENUM.FORMAT.datetime},
                    fecha_fin: {formattype: ENUM.FORMAT.datetime},
                    estatus: {
                        label: function () {
                            return "Estatus"
                        }
                    },
                    archivos: {
                        label: "Archivos",
                        format: function (row) {
                            if (typeof vw_auditoria_lista_correctiva !== 'null') {
                                if (vw_auditoria_lista_correctiva) {
                                    var info = vw_auditoria_lista_correctiva.fileSI.filter(data => {
                                        return data.id == row.id;
                                    });
                                    if (info.length) {
                                        return "<a title='Vizualizar'><i class='icon-files-empty'></i></a>";
                                    } else {
                                        return '';
                                    }
                                }

                            }
                        }
                    },
                },
                options: [
                    {
                        text: (data) => {
                            return "";
                        },
                        title: (data) => {
                            if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.view) {
                                return MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.view) {
                                return MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            }
                        },
                        icon: (data) => {
                            return "cog2";
                        },
                        permission: (data) => {
                            return ['edit', 'remove', 'active', 'view', 'copy'];
                        },
                        characterist: (data) => {
                            return '';
                        },
                        menus: [
                            {
                                text: (data) => {
                                    return MESSAGE.i('planificacion.titleTrabajar');
                                },
                                icon: (data) => {
                                    return "hammer-wrench";
                                },
                                permission: (data) => {
                                    return 'work';
                                },
                                show: (data) => {
                                    if (typeof vw_auditoria_lista_correctiva !== "undefined")
                                        return vw_auditoria_lista_correctiva.allowAction("Trabajar AR", "auditoria_lista_correctiva", data.row.estatus_id);
                                },
                                characterist: (data) => {
                                    return "";
                                },
                                click: function (data) {
                                    data.$scope.my_true_estatus = data.row.estatus_id;
                                    data.$scope.ver = false;
                                    data.$scope.form.titles = {
                                        edit: `Trabajar Acción de Mejora a la NO Conformidad "${data.row.elemento_nombre}" de la auditoria "${data.row.programa_plan_name}"`
                                    };
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
                                    return MESSAGE.i('planificacion.titleTrabajar');
                                },
                                icon: (data) => {
                                    return "hammer-wrench";
                                },
                                permission: (data) => {
                                    return 'work';
                                },
                                show: (data) => {
                                    if (typeof vw_auditoria_lista_correctiva !== "undefined")
                                        return vw_auditoria_lista_correctiva.allowAction("Trabajar RP", "auditoria_lista_correctiva", data.row.estatus_id);
                                },
                                characterist: (data) => {
                                    return "";
                                },
                                click: function (data) {
                                    data.$scope.my_true_estatus = data.row.estatus_id;
                                    data.$scope.ver = false;
                                    data.$scope.form.titles = {
                                        edit: `Trabajar Acción de Mejora a la NO Conformidad "${data.row.elemento_nombre}" de la auditoria "${data.row.programa_plan_name}"`
                                    };
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
                                    return MESSAGE.i('planificacion.titleTrabajar');
                                },
                                icon: (data) => {
                                    return "hammer-wrench";
                                },
                                permission: (data) => {
                                    return 'work';
                                },
                                show: (data) => {
                                    if (typeof vw_auditoria_lista_correctiva !== "undefined")
                                        return vw_auditoria_lista_correctiva.allowAction("Trabajar RG", "auditoria_lista_correctiva", data.row.estatus_id);
                                },
                                characterist: (data) => {
                                    return "";
                                },
                                click: function (data) {
                                    data.$scope.my_true_estatus = data.row.estatus_id;
                                    data.$scope.ver = false;
                                    data.$scope.form.titles = {
                                        edit: `Trabajar Acción de Mejora a la NO Conformidad "${data.row.elemento_nombre}" de la auditoria "${data.row.programa_plan_name}"`
                                    };
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
                                show: (data) => {
                                    return true
                                },
                                click: function (data) {
                                    data.$scope.ver = true;
                                    data.$scope.formulary({
                                        edit: "Ver - " + data.row.nombre,
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
                                        confirm: function () {
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
                                                eval(`formatRow.${alter} = '${realValue}';`);
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
                                                        eval(`row.${key} = '${value}';`);
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
                                show: (data) => {
                                    if (typeof vw_auditoria_lista_correctiva !== "undefined")
                                        return vw_auditoria_lista_correctiva.allowAction("Auditoría", "auditoria_lista_correctiva", data.row.estatus_id);
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
                            }
                        ]
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('planificacion.comentarios');
                        },
                        title: (data) => {
                            return MESSAGE.i('planificacion.comentarios');
                        },
                        icon: (data) => {
                            return 'comment';
                        },
                        permission: (data) => {
                            return "comment";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: (data) => {
                            return (data.row.comentarios == 'si');
                        },
                        click: function (data) {
                            data.$scope.id = data.row.id;
                            data.$scope.modal.modalView("vw_auditoria_lista_correctiva/viewComments", {
                                width: 'modal-full',
                                header: {
                                    title: "Ver comentarios de la Acción Correctiva",
                                    icon: "comment"
                                },
                                footer: {
                                    cancelButton: true
                                },
                                content: {
                                    loadingContentText: MESSAGE.i('actions.Loading'),
                                    sameController: true
                                },
                            });
                        }
                    }
                ],
                filters: {
                    columns: true
                }
            }
        });
    } else {
        CRUD_vw_auditoria_lista_correctiva = {};
        DSON.keepmerge(CRUD_vw_auditoria_lista_correctiva, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_vw_auditoria_lista_correctiva, {
            table: {
                width: "width:1800px;",
                //view: 'vw_vw_auditoria_lista_correctiva',
                //method: 'vw_auditoria_lista_correctiva',
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
                    programa_plan_name: {
                        label: function () {
                            return "Auditoría"
                        }
                    },
                    proceso: {
                        label: function () {
                            return "Proceso"
                        }
                    },
                    documento_asociado: {
                        label: function () {
                            return "Documento Asociado"
                        }
                    },
                    elemento_nombre: {
                        label: function () {
                            return "Punto Auditado"
                        }
                    },
                    observacion: {
                        label: function () {
                            return "Observación"
                        }
                    },
                    nombre: {
                        label: function () {
                            return "Acción de Mejora"
                        }
                    },
                    departamento_list: {
                        label: function () {
                            return "Departamentos"
                        }
                    },
                    responsable_list: {
                        label: function () {
                            return "Responsables"
                        }
                    },
                    condition: {
                        export: true,
                        label: "Condición",
                        format: function (row) {
                            var nom = row.condition;
                            $(`.Retrazado`).css('background', '#FF0000');
                            $(`.Enejecucion`).css('background', '#5de362');
                            $(`.Finalizado`).css('background', '#548235');
                            $(`.PendienteaTrabajar`).css('background', '#CECECE');
                            return `<div title="${row.condition.replaceAll('Ninguno', 'Ninguna Condición')}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                        }
                    },
                    fecha_inicio: {formattype: ENUM.FORMAT.datetime},
                    fecha_fin: {formattype: ENUM.FORMAT.datetime},
                    estatus: {
                        label: function () {
                            return "Estatus"
                        }
                    },
                    archivos: {
                        label: "Archivos",
                        format: function (row) {
                            if (typeof vw_auditoria_lista_correctiva !== 'null') {
                                if (vw_auditoria_lista_correctiva) {
                                    var info = vw_auditoria_lista_correctiva.fileSI.filter(data => {
                                        return data.id == row.id;
                                    });
                                    if (info.length) {
                                        return "<a title='Vizualizar'><i class='icon-files-empty'></i></a>";
                                    } else {
                                        return '';
                                    }
                                }

                            }
                        }
                    },
                },
                options: [
                    {
                        text: (data) => {
                            return "";
                        },
                        title: (data) => {
                            if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.view) {
                                return MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit) {
                                return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                                    MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.remove) {
                                return MESSAGE.i('actions.audit');
                            } else if (PERMISSIONS.mypermission.actividades_apoyo.allow.view) {
                                return MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.audit');
                            }
                        },
                        icon: (data) => {
                            return "cog2";
                        },
                        permission: (data) => {
                            return ['edit', 'remove', 'active', 'view', 'copy'];
                        },
                        characterist: (data) => {
                            return '';
                        },
                        menus: [
                            {
                                text: (data) => {
                                    return MESSAGE.i('planificacion.titleTrabajar');
                                },
                                icon: (data) => {
                                    return "hammer-wrench";
                                },
                                permission: (data) => {
                                    return 'work';
                                },
                                show: (data) => {
                                    if (typeof vw_auditoria_lista_correctiva !== "undefined")
                                        return vw_auditoria_lista_correctiva.allowAction("Trabajar AR", "auditoria_lista_correctiva", data.row.estatus_id);
                                },
                                characterist: (data) => {
                                    return "";
                                },
                                click: function (data) {
                                    data.$scope.my_true_estatus = data.row.estatus_id;
                                    data.$scope.ver = false;
                                    data.$scope.form.titles = {
                                        edit: `Trabajar Acción de Mejora a la NO Conformidad "${data.row.elemento_nombre}" de la auditoria "${data.row.programa_plan_name}"`
                                    };
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
                                    return MESSAGE.i('planificacion.titleTrabajar');
                                },
                                icon: (data) => {
                                    return "hammer-wrench";
                                },
                                permission: (data) => {
                                    return 'work';
                                },
                                show: (data) => {
                                    if (typeof vw_auditoria_lista_correctiva !== "undefined")
                                        return vw_auditoria_lista_correctiva.allowAction("Trabajar RP", "auditoria_lista_correctiva", data.row.estatus_id);
                                },
                                characterist: (data) => {
                                    return "";
                                },
                                click: function (data) {
                                    data.$scope.my_true_estatus = data.row.estatus_id;
                                    data.$scope.ver = false;
                                    data.$scope.form.titles = {
                                        edit: `Trabajar Acción de Mejora a la NO Conformidad "${data.row.elemento_nombre}" de la auditoria "${data.row.programa_plan_name}"`
                                    };
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
                                    return MESSAGE.i('planificacion.titleTrabajar');
                                },
                                icon: (data) => {
                                    return "hammer-wrench";
                                },
                                permission: (data) => {
                                    return 'work';
                                },
                                show: (data) => {
                                    if (typeof vw_auditoria_lista_correctiva !== "undefined")
                                        return vw_auditoria_lista_correctiva.allowAction("Trabajar RG", "auditoria_lista_correctiva", data.row.estatus_id);
                                },
                                characterist: (data) => {
                                    return "";
                                },
                                click: function (data) {
                                    data.$scope.my_true_estatus = data.row.estatus_id;
                                    data.$scope.ver = false;
                                    data.$scope.form.titles = {
                                        edit: `Trabajar Acción de Mejora a la NO Conformidad "${data.row.elemento_nombre}" de la auditoria "${data.row.programa_plan_name}"`
                                    };
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
                                show: (data) => {
                                    return true
                                },
                                click: function (data) {
                                    data.$scope.ver = true;
                                    data.$scope.formulary({
                                        edit: "Ver - " + data.row.nombre,
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
                                        confirm: function () {
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
                                                eval(`formatRow.${alter} = '${realValue}';`);
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
                                                        eval(`row.${key} = '${value}';`);
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
                                show: (data) => {
                                    if (typeof vw_auditoria_lista_correctiva !== "undefined")
                                        return vw_auditoria_lista_correctiva.allowAction("Auditoría", "auditoria_lista_correctiva", data.row.estatus_id);
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
                            }
                        ]
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('planificacion.comentarios');
                        },
                        title: (data) => {
                            return MESSAGE.i('planificacion.comentarios');
                        },
                        icon: (data) => {
                            return 'comment';
                        },
                        permission: (data) => {
                            return "comment";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: (data) => {
                            return (data.row.comentarios == 'si');
                        },
                        click: function (data) {
                            data.$scope.id = data.row.id;
                            data.$scope.modal.modalView("vw_auditoria_lista_correctiva/viewComments", {
                                width: 'modal-full',
                                header: {
                                    title: "Ver comentarios de la Acción Correctiva",
                                    icon: "comment"
                                },
                                footer: {
                                    cancelButton: true
                                },
                                content: {
                                    loadingContentText: MESSAGE.i('actions.Loading'),
                                    sameController: true
                                },
                            });
                        }
                    }
                ],
                filters: {
                    columns: true
                }
            }
        });
    }
    //vw_auditoria_lista_correctiva.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_auditoria_lista_correctiva", vw_auditoria_lista_correctiva, $scope, $http, $compile);
    RUN_B("vw_auditoria_lista_correctiva", vw_auditoria_lista_correctiva, $scope, $http, $compile);
    $scope.$watch("vw_auditoria_lista_correctiva.plan", async function (value) {
        var rules = [];
        //rules here
        SWEETALERT.loading({message: "Listando Acciones Correctivas"});
        vw_auditoria_lista_correctiva.fixFilters = [
            {
                field: 'programa_plan',
                value: vw_auditoria_lista_correctiva.plan,
            }
        ];
        vw_auditoria_lista_correctiva.refresh(async () => {
            if (vw_auditoria_lista_correctiva.plan_object) {
                vw_auditoria_lista_correctiva.estatus_plan_accion = vw_auditoria_lista_correctiva.plan_object.estatus_plan_accion + "";
                vw_auditoria_lista_correctiva.form.loadDropDown('estatus_plan_accion');
            }
            SWEETALERT.stop();
            vw_auditoria_lista_correctiva.refreshAngular();
        });
    });
    $scope.$watch("vw_auditoria_lista_correctiva.evento", async function (value) {
        var rules = [];
        //rules here
        SWEETALERT.loading({message: "Listando Acciones Correctivas"});
        vw_auditoria_lista_correctiva.fixFilters = [
            {
                field: 'evento_riesgo',
                value: vw_auditoria_lista_correctiva.evento,
            }
        ];
        vw_auditoria_lista_correctiva.refresh(async () => {
            SWEETALERT.stop();
            vw_auditoria_lista_correctiva.refreshAngular();
        });
    });
    vw_auditoria_lista_correctiva.formulary = function (data, mode, defaultData) {
        if (vw_auditoria_lista_correctiva !== undefined) {
            vw_auditoria_lista_correctiva.form.modalWidth = ENUM.modal.width.full;
            vw_auditoria_lista_correctiva.form.readonly = {};
            vw_auditoria_lista_correctiva.createForm(data, mode, defaultData);
            vw_auditoria_lista_correctiva.selectQueries['estatus_id'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: vw_auditoria_lista_correctiva.session.groups[0].id
                },
                {
                    field: 'entidad',
                    operator: '=',
                    value: "auditoria_lista_correctiva"
                }
            ];
            // $scope.$watch("vw_auditoria_lista_correctiva.nombre", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_auditoria_lista_correctiva, 'nombre', rules);
            // });
            // $scope.$watch("vw_auditoria_lista_correctiva.descripcion", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_auditoria_lista_correctiva, 'descripcion', rules);
            // });
            // $scope.$watch("vw_auditoria_lista_correctiva.elemento", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_auditoria_lista_correctiva, 'elemento', rules);
            // });
            //ms_product.selectQueries['riesgo'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            // $scope.$watch("vw_auditoria_lista_correctiva.riesgo", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_auditoria_lista_correctiva, 'riesgo', rules);
            // });
            // $scope.$watch("vw_auditoria_lista_correctiva.tempid", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_auditoria_lista_correctiva, 'tempid', rules);
            // });
            //ms_product.selectQueries['departamento'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            // $scope.$watch("vw_auditoria_lista_correctiva.departamento", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_auditoria_lista_correctiva, 'departamento', rules);
            // });
            $scope.$watch("vw_auditoria_lista_correctiva.comment", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_lista_correctiva, 'comment', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_auditoria_lista_correctiva.responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_lista_correctiva, 'responsable', rules);
            });
            // $scope.$watch("vw_auditoria_lista_correctiva.responsable_name", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_auditoria_lista_correctiva, 'responsable_name', rules);
            // });
            $scope.$watch("vw_auditoria_lista_correctiva.ejecucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_lista_correctiva, 'ejecucion', rules);
            });
            // $scope.$watch("vw_auditoria_lista_correctiva.estatus", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(vw_auditoria_lista_correctiva, 'estatus', rules);
            // });
            $scope.$watch("vw_auditoria_lista_correctiva.estatus_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_lista_correctiva, 'estatus_id', rules);
            });
            $scope.$watch("vw_auditoria_lista_correctiva.programa_plan", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_lista_correctiva, 'programa_plan', rules);
            });
            vw_auditoria_lista_correctiva.triggers.table.after.control = async function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
                if (data == 'presupuesto') {
                    vw_auditoria_lista_correctiva.presupuesto = LAN.money(vw_auditoria_lista_correctiva.presupuesto).format(true);
                }
            }
        }
    };
    vw_auditoria_lista_correctiva.saveAccionCorrectiva = function () {
        VALIDATION.save(vw_auditoria_lista_correctiva, async function () {
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
            // if (drp_actividades_apoyo.estatus == ENUM_2.actividad_apoyo_estatus.Cancelada) {
            //     if (LAN.money(drp_actividades_apoyo.presupuesto_consumido).value > 0) {
            //         SWEETALERT.show({
            //             type: 'error',
            //             message: "La actividad de apoyo no puede ser cancelada puesto que tiene presupuesto consumido. Favor Revisar"
            //         });
            //         var buttons = document.getElementsByClassName("btn btn-labeled");
            //         for (var item of buttons) {
            //             item.disabled = false;
            //         }
            //         return;
            //     }
            // }
            for (var item of buttons) {
                item.disabled = true;
            }
            SWEETALERT.loading({message: MESSAGE.i('mono.procesing')});
            BASEAPI.updateall('auditoria_lista_correctiva', {
                estatus: vw_auditoria_lista_correctiva.estatus_id,
                where: [{
                    field: "id",
                    value: vw_auditoria_lista_correctiva.id
                }]
            }, async function (result) {
                var rs = await BASEAPI.insertIDp('comentarios', {
                    "comentario": vw_auditoria_lista_correctiva.comment,
                    "type": 27,
                    "created_by": vw_auditoria_lista_correctiva.session.usuario_id,
                    "value": vw_auditoria_lista_correctiva.estatus_id,
                    "value2": vw_auditoria_lista_correctiva.id
                }, '', '');
                if (typeof riesgo_a !== "undefined") {
                    if (typeof riesgo_a !== "not defined") {
                        if (riesgo_a) {
                            var alllista = await BASEAPI.listf("auditoria_lista_correctiva", [
                                {field: "riesgo", value: riesgo_a.id},
                                {field: "estatus", operator: "!=", value: 4}
                            ]);
                            console.log(alllista, 'ay all lista');
                            if (alllista) {
                                if (alllista.length === 0) {
                                    BASEAPI.updateallp('auditoria_lista_correctiva', {
                                        ejecucion: "$now()",
                                        where: [{field: "riesgo", value: riesgo_a.id}]
                                    });
                                }
                            }
                        }
                    }
                }

                if (rs.data)
                    if (rs.data.data)
                        if (rs.data.data[0])
                            if (rs.data.data[0].id) {
                                vw_auditoria_lista_correctiva.comment = "";
                                vw_auditoria_lista_correctiva.refreshAngular();
                                await BASEAPI.ajax.postp(new HTTP().path(["files", "api", "copy"]), {
                                    moves: [{
                                        from: `${FOLDERS.files}/vw_auditoria_lista_correctiva/correctivafile/${vw_auditoria_lista_correctiva.id}`,
                                        to: `${FOLDERS.files}/comentarios_acciones_correctivas/correctivafile/${rs.data.data[0].id}`
                                    }]
                                });
                            }
                var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                for (var item of buttons) {
                    item.disabled = false;
                }
                NOTIFY.success("Comentario agregado");
                MODAL.close();
                vw_auditoria_lista_correctiva.refresh();
                SWEETALERT.stop();
            });

        }, ["estatus_id", "comment"]);
    };
    vw_auditoria_lista_correctiva.triggers.table.after.load = async function (records) {
        vw_auditoria_lista_correctiva.runMagicManyToMany('departamento_list', 'departamento',
            'auditoria_lista_correctiva', 'id', 'nombre', 'auditoria_lista_correctiva_departamento',
            'departamento', 'id');
        vw_auditoria_lista_correctiva.runMagicManyToMany('responsable_list', 'vw_usuario',
            'auditoria_lista_correctiva', 'id', 'completo', 'auditoria_lista_correctiva_responsable',
            'responsable', 'id');

        if (typeof riesgo_a !== "undefined") {
            if (typeof riesgo_a !== "not defined") {
                if (riesgo_a) {
                    setTimeout(() => {
                        riesgo_a.refreshAngular();
                    }, 500);
                }
            }
        }
        if (typeof riesgo !== "undefined") {
            if (typeof riesgo !== "not defined") {
                if (riesgo) {
                    if (riesgo.esplan) {
                        riesgo.list_acciones_correctivas = await BASEAPI.listp('auditoria_lista_correctiva', {
                            limit: 0,
                            order: "desc",
                            where: [
                                {
                                    field: "riesgo",
                                    value: Matriz_id
                                }
                            ]
                        });
                        riesgo.list_acciones_correctivas = riesgo.list_acciones_correctivas.data;
                        riesgo_a.list_acciones_correctivas = riesgo.list_acciones_correctivas;

                    }
                    if (riesgo.todasaccionescorrectivas()) {
                        if (MODAL.current())
                            if (MODAL.current().id.indexOf("_view_") !== -1)
                                return;
                        if (riesgo.soyamfe) {
                            SWEETALERT.show({
                                type: 'warning',
                                message: "Para cerrar esta acción de mejora debe actualizar los valores de Gravedad (G), Ocurrencia (O) y Detección (D), en el entendido que con las acciones implementadas dichos valores hayan sufrido cambios",
                                confirm: function () {
                                    auditoria_lista_correctiva.refreshAngular();
                                    riesgo.refreshAngular();
                                }
                            });
                        } else {
                            SWEETALERT.show({
                                type: 'warning',
                                message: "Para cerrar esta acción de mejora debe actualizar los valores de Probabilidad e Impacto, en el entendido que con las acciones implementadas dichos valores hayan sufrido cambios",
                                confirm: function () {
                                    riesgo_a.fin_plan_accion = true;
                                    auditoria_lista_correctiva.refreshAngular();
                                    riesgo.refreshAngular();
                                }
                            });
                        }

                    }
                    setTimeout(() => {
                        riesgo.refreshAngular();
                    }, 500);
                }
            }
        }

        vw_auditoria_lista_correctiva.fileSI = [];
        for (var items of records.data) {
            vw_auditoria_lista_correctiva.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/vw_auditoria_lista_correctiva/correctivafile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        vw_auditoria_lista_correctiva.fileSI.push({id: items.id});
                        resolve(true);
                    } else {
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for (var item of buttons) {
                            item.disabled = false;
                        }
                        resolve(false);
                    }
                }, $('#invisible'));
            });
            await vw_auditoria_lista_correctiva.files();
            vw_auditoria_lista_correctiva.refreshAngular();
        }
    };
    vw_auditoria_lista_correctiva.verFile = function (key, value, row) {
        vw_auditoria_lista_correctiva.setPermission("file.upload", false);
        vw_auditoria_lista_correctiva.setPermission("file.download", true);
        if (vw_auditoria_lista_correctiva.group_caracteristica !== ENUM_2.Grupos.director_general) {
            vw_auditoria_lista_correctiva.setPermission("file.remove", false);
        } else {
            vw_auditoria_lista_correctiva.setPermission("file.remove", true);
        }
        if (typeof vw_auditoria_lista_correctiva !== 'null') {
            if (vw_auditoria_lista_correctiva) {
                var info = vw_auditoria_lista_correctiva.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/vw_auditoria_lista_correctiva/correctivafile/" + row.id, row);
                    vw_auditoria_lista_correctiva.showfiletypes = function () {
                        var modal = {
                            width: "modal-full",
                            header: {
                                title: "Ver tipos de archivos permitidos a ser cargados",
                                icon: "file-eye"
                            },
                            footer: {
                                cancelButton: false,
                                buttons: [
                                    {
                                        color: "btn bg-<%= COLOR.info %> btn-labeled btn-xs pull-rightm",
                                        title: "<b><i class='icon-arrow-right8'></i></b>Continuar",
                                        action: function () {
                                            MODAL.close();
                                        }
                                    }
                                ]
                            },
                            content: {
                                loadingContentText: MESSAGE.i('actions.Loading')
                            },
                            event: {
                                show: {
                                    begin: function (data) {
                                        data.permitted_files = [];
                                        for (var i in CONFIG.fileType_general) {
                                            for (var j in CONFIG.fileType_general[i]) {
                                                if (typeof data.permitted_files[j] == "undefined") {
                                                    data.permitted_files[j] = {};
                                                }
                                                data.permitted_files[j][i] = CONFIG.fileType_general[i][j];
                                            }
                                        }
                                    }
                                },
                                hide: {
                                    begin: function (data) {

                                    }
                                }
                            }
                        };
                        vw_auditoria_lista_correctiva.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'vw_auditoria_lista_correctiva',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    vw_auditoria_lista_correctiva.modal.modalView("templates/components/gallery", {
                        width: 'modal-full',
                        header: {
                            title: MESSAGE.ic("mono.files"),
                            icon: "file-eye"
                        },
                        footer: {
                            cancelButton: false
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading')
                        },
                    });
                }
            }
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
    // vw_auditoria_lista_correctiva.triggers.table.after.open = async function (data) {
    //
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    vw_auditoria_lista_correctiva.triggers.table.after.close = function (data) {
        vw_auditoria_lista_correctiva.departamentos = undefined;
        vw_auditoria_lista_correctiva.responsables = undefined;
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    };
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
    // vw_auditoria_lista_correctiva.triggers.table.after.control = async function (data) {
    //
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