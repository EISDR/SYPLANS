CRUD_actividades_asociadas_view = {};
DSON.keepmerge(CRUD_actividades_asociadas_view, CRUDDEFAULTS);
DSON.keepmerge(CRUD_actividades_asociadas_view, {
    table: {
        engine: 'my',
        width: "width:1800px;",
        batch: false,
        view: "drp_actividades_apoyo",
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead:true
            },
            nombre: {
                label: function () {
                    return "Actividad Apoyo";
                },
                shorttext: 370,
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_actividad_apoyo !== 'not defined') {
                            if (comentarios_actividad_apoyo) {
                                comentarios_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Actividades_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            descripcion: {
                label: "Descripción",
                shorttext: 370,
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_actividad_apoyo !== 'not defined') {
                            if (comentarios_actividad_apoyo) {
                                comentarios_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Actividades_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            departamento_nombre: {
                label: "Dpto.Solicitado",
                format: {
                    table: "departamento",
                    from: "departamento",
                    modal: {
                        header: {
                            title: MESSAGE.i(`planificacion.nombre`, 'nombre'),
                            // icon: "archive"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.loading')
                        }
                    }
                },
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_actividad_apoyo !== 'not defined') {
                            if (comentarios_actividad_apoyo) {
                                comentarios_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Actividades_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            view_presupuesto: {
                label: "Presupuesto Asignado",
                sorttype: "money",
                formattype: "money",
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_actividad_apoyo !== 'not defined') {
                            if (comentarios_actividad_apoyo) {
                                comentarios_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Actividades_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            condicion: {
                export: true,
                label: "Condición",
                format: function (row) {
                    var nom = row.condicion;
                    $(`.Vencida`).css('background', '#FF0000');
                    $(`.Enejecucion`).css('background', '#548235');
                    $(`.Planificada`).css('background', '#5F5FAF');
                    $(`.Ninguno`).css('background', '#CECECE');
                    return `<div title="${row.condicion.replaceAll('Ninguno', 'Ninguna Condición')}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },
            usuario: {
                label: function(){
                    return "Responsable"
                },
                shorttext: 370,
                format: function (row){
                    return row.usuario_nombre + " " + row.usuario_apellido;
                },
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_actividad_apoyo !== 'not defined') {
                            if (comentarios_actividad_apoyo) {
                                comentarios_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Actividades_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            estatus_nombre: {
                label: function () {
                    return "Estatus"
                }
            },
            fecha_inicio: {
                label: "Fecha Inicio",
                sorttype: "date",
                formattype: "date",
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_actividad_apoyo !== 'not defined') {
                            if (comentarios_actividad_apoyo) {
                                comentarios_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Actividades_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            fecha_fin: {
                label: "Fecha Fin",
                sorttype: "date",
                formattype: "date",
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_actividad_apoyo !== 'not defined') {
                            if (comentarios_actividad_apoyo) {
                                comentarios_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Actividades_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view){
                        return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.view){
                        return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit){
                        return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.view){
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.view && PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.edit){
                        return MESSAGE.i('planificacion.titleTrabajar') + ", " +
                            MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.remove){
                        return MESSAGE.i('actions.audit');
                    } else if(PERMISSIONS.mypermission.actividades_apoyo.allow.view){
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
                            return (data.row.estatus == ENUM_2.actividad_apoyo_estatus.Pendiente);
                        },
                        characterist: (data) => {
                            return "";
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
                            return MESSAGE.i('actions.edit');
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
                    data.$scope.modal.modalView("actividades_asociadas_view/viewComments", {
                        width: 'modal-full',
                        header: {
                            title: "Ver comentarios de la actividad apoyo",
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
        single: [
            {
                "table": "actividades_poa",
                "base": "actividades_poa",
                "field": "id",
                "columns": ["id", "nombre"]
            },
            {
                "table": "departamento",
                "base": "departamento",
                "field": "id",
                "columns": ["id", "nombre"]
            },
            {
                table: "usuario",
                base: "responsable",
                field: "id",
                columns: ["id","nombre","apellido"]
            }
        ],
        filters: {
            columns: false
        }
    }
});
