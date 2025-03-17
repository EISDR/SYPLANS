lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_drp_actividades_apoyo = {};
DSON.keepmerge(CRUD_drp_actividades_apoyo, CRUDDEFAULTS);
DSON.keepmerge(CRUD_drp_actividades_apoyo, {
    table: {
        width: "width:3000px;",
        //view: 'vw_drp_actividades_apoyo',
        //method: 'drp_actividades_apoyo',
        //limits: [10, 50, 100, 0],
        //report: true,
        batch: false,
        sort: "id",
        order: "desc",
        //persist: true,
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
            },
            descripcion: {
                shorttext: 370
            },
            departamento_nombre: {
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
                }
            },
            actividades_poa_nombre: {
            },
            usuario_nombre: {
                shorttext: 370,
                format: function (row) {
                    return row.usuario_nombre + " " + row.usuario_apellido;
                }
            },
            estatus_nombre: {
            },
            condicion: {
                export: true,
                format: function (row) {
                    var nom = row.condicion;
                    $(`.Vencida`).css('background', '#FF0000');
                    $(`.Enejecucion`).css('background', '#548235');
                    $(`.Planificada`).css('background', '#5F5FAF');
                    $(`.Ninguno`).css('background', '#CECECE');
                    return `<div title="${row.condicion.replaceAll('Ninguno', 'Ninguna Condición')}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },
            fecha_inicio: {
                sorttype: "date",
                formattype: "date",
            },
            fecha_fin: {
                sorttype: "date",
                formattype: "date",
            },
            manejapresupuesto: {
            },
            act_apoyo_presupuesto: {
                sorttype: "money",
                formattype: "money",
            },
            presupuesto_consumido: {
                sorttype: "money",
                formattype: "money",
            },
            avance_porcentaje: {
                sorttype: "percentage",
                formattype: "percentage",
            },
            razon_nombre: {
            },
            tipo_inversion_nombre: {
                visible: lachechon ? lachechon.tipo_institucion == 1 ? true : false : false,
                visibleDetail: lachechon ? lachechon.tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: lachechon ? lachechon.tipo_institucion == 1 ? false : true : false
            },
            bienes_permiso:{
                visible: lachechon ? lachechon.tipo_institucion == 1 ? true : false : false,
                visibleDetail: lachechon ? lachechon.tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: lachechon ? lachechon.tipo_institucion == 1 ? false : true : false
            },
            bienes_permiso_nombre: {
                visible: lachechon ? lachechon.tipo_institucion == 1 ? true : false : false,
                visibleDetail: lachechon ? lachechon.tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: lachechon ? lachechon.tipo_institucion == 1 ? false : true : false
            },
            presupuestario: {
                visible: lachechon ? lachechon.tipo_institucion == 1 ? true : false : false,
                visibleDetail: lachechon ? lachechon.tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: lachechon ? lachechon.tipo_institucion == 1 ? false : true : false
            },
            presupuestario_nombre: {
                visible: lachechon ? lachechon.tipo_institucion == 1 ? true : false : false,
                visibleDetail: lachechon ? lachechon.tipo_institucion == 1 ? true : false : false,
                export: false,
                exportExample: false,
                dead: lachechon ? lachechon.tipo_institucion == 1 ? false : true : false
            },
            archivos: {
                // click: function (d,d2,d3) {
                //     console.log(d,d2,d3,"xc");
                //     if(data.row.estatus == "Completado"){
                //         actividades_poa_monitoreo.setPermission("file.upload",false);
                //         actividades_poa_monitoreo.setPermission("file.remove",false);
                //     } else {
                //         actividades_poa_monitoreo.setPermission("file.upload",true);
                //         actividades_poa_monitoreo.setPermission("file.remove",true);
                //     }
                //     // if (typeof actividades_poa_monitoreo !== 'null'){
                //     //     if (actividades_poa_monitoreo){
                //             var info = actividades_poa_monitoreo.fileSI.filter(data2 => {
                //                 return data2.id == data.row.id;
                //             });
                //             console.log("klk",info);
                //             if(info.length){
                //                 var root = DSON.template( "/actividades_poa_monitoreo/actividadfile/"+data.row.id, data.row);
                //                 baseController.viewData = {
                //                     root: root,
                //                     scope: 'actividades_poa_monitoreo',
                //                     maxsize: 20,
                //                     maxfiles: 1,
                //                     acceptedFiles: null,
                //                     columns: 1,
                //                 };
                //
                //                 data.$scope.modal.modalView("templates/components/gallery", {
                //                     width: 'modal-full',
                //                     header: {
                //                         title: MESSAGE.ic("mono.files"),
                //                         icon: "file-eye"
                //                     },
                //                     footer: {
                //                         cancelButton: false
                //                     },
                //                     content: {
                //                         loadingContentText: MESSAGE.i('actions.Loading')
                //                     },
                //                 });
                //             }
                //     //     }
                //     // }
                // },
                format: function (row) {
                    if (typeof drp_actividades_apoyo !== 'null') {
                        if (drp_actividades_apoyo) {
                            var info = drp_actividades_apoyo.fileSI.filter(data => {
                                return data.id == row.id;
                            });
                            if (info.length) {
                                return "<a title='Ver imagen'><i class='icon-files-empty'></i></a>";

                            } else {
                                return '';
                            }
                        }

                    }
                },
                click: function (e){
                    console.log(e)
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
                            if (typeof drp_actividades_apoyo !== "undefined")
                                return drp_actividades_apoyo.allowAction("Trabajar AR", "actividades_apoyo", data.row.estatus) && ( data.row.estatus_poa_dept == 3 && lachechon.estado == ENUM_2.poa_estatus.Activo);
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.my_true_estatus = data.row.estatus;
                            data.$scope.ver = false;
                            data.$scope.condicion = data.row.condicion;
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
                            if (typeof drp_actividades_apoyo !== "undefined")
                                return drp_actividades_apoyo.allowAction("Trabajar RP", "actividades_apoyo", data.row.estatus) && ( data.row.estatus_poa_dept == 3 && lachechon.estado == ENUM_2.poa_estatus.Activo);
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.my_true_estatus = data.row.estatus;
                            data.$scope.ver = false;
                            data.$scope.condicion = data.row.condicion;
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
                            if (typeof drp_actividades_apoyo !== "undefined")
                                return drp_actividades_apoyo.allowAction("Trabajar RG", "actividades_apoyo", data.row.estatus) && ( data.row.estatus_poa_dept == 3 && lachechon.estado == ENUM_2.poa_estatus.Activo);
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.my_true_estatus = data.row.estatus;
                            data.$scope.ver = false;
                            data.$scope.condicion = data.row.condicion;
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
                            data.$scope.ver = false;
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
                            if (typeof drp_actividades_apoyo !== "undefined")
                                return drp_actividades_apoyo.allowAction("Ver", "actividades_apoyo", data.row.estatus);
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
                            if (typeof drp_actividades_apoyo !== "undefined")
                                return drp_actividades_apoyo.allowAction("Auditoría", "actividades_apoyo", data.row.estatus);
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
                    data.$scope.modal.modalView("drp_actividades_apoyo/viewComments", {
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
        filters: {
            columns: [
                {
                    key: 'nombre',
                    type: FILTER.types.string,
                    maxlength: 64
                },
                {
                    key: 'departamento',
                    type: FILTER.types.relation,
                    value: "id",
                    table: 'departamento',
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        orderby: "id",
                        order: "asc",
                        distinct: false,
                        where: [
                            {
                            "field": "compania",
                            "value": lachechon ? lachechon.compania_id : -1
                            },
                            {
                                "field": "institucion",
                                "operator": lachechon.institucion_id ? "=": "is",
                                "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id :  "$null" : -1
                            }
                        ],
                    }
                },
                {
                    key: 'actividades_poa',
                    type: FILTER.types.relation,
                    table: 'actividades_poa',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "poa",
                                "value": lachechon ? lachechon.poa_id : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'responsable',
                    type: FILTER.types.relation,
                    table: 'usuario',
                    value: "id",
                    text: "item.nombre + ' ' + item.apellido",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "compania",
                                "value": lachechon ? lachechon.compania_id : -1
                            },
                            {
                                "field": "institucion",
                                "operator": lachechon.institucion_id ? "=" : "is",
                                "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : "$null" : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'act_apoyo_presupuesto',
                    type: FILTER.types.decimal,
                    maxlength: 20
                },
                {
                    key: 'fecha_inicio',
                    type: FILTER.types.string,
                },
                {
                    key: 'fecha_fin',
                    type: FILTER.types.string,
                },
                {
                    key: 'estatus',
                    type: FILTER.types.relation,
                    table: 'auditoria_programa_plan_estatus',
                    value: "code",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "entidad",
                                "value": 11
                            }
                        ],
                        orderby: "orden",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'clasificador_id',
                    label: 'Código del clasificador',
                    placeholder: 'Código del clasificador',
                    type: FILTER.types.relation,
                    value: "id",
                    table: 'clasificadores',
                    text: "item.code",
                    query: {
                        limit: 0,
                        page: 1,
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    }
                },
                {
                    key: 'clasificadores_id',
                    label: 'Nombre del clasificador',
                    placeholder: 'nombre del clasificador',
                    type: FILTER.types.relation,
                    value: "id",
                    table: 'clasificadores',
                    text: "item.nombre_clasificador",
                    query: {
                        limit: 0,
                        page: 1,
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    }
                },
            ]
        },
        single: [
            {
                'table': 'usuario',
                'base': 'responsable',
                'field': 'id',
                'columns': ['id', 'nombre', 'apellido']
            },
            {
                "table": "departamento",
                "base": "departamento",
                "field": "id",
                "columns": ["id", "nombre"]
            },
            {
                'table': 'actividades_poa',
                'base': 'actividades_poa',
                'field': 'id',
                'columns': ['id', 'nombre']
            }]
    }
});
//modify methods that existing option
//CRUD_drp_actividades_apoyo.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_drp_actividades_apoyo.table.options[0].menus.push({
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
