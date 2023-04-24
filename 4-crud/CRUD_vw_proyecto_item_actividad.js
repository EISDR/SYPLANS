CRUD_vw_proyecto_item_actividad = {};
DSON.keepmerge(CRUD_vw_proyecto_item_actividad, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_proyecto_item_actividad, {
    table: {
        engine: 'my',
        width: 'width:2000px;',
        view: 'vw_proyecto_item_actividad',
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            departamento: {},
            proyecto_item_nombre: {
                label: function () {
                    return "Proyecto Especial"
                },
                shorttext: 370
            },
            nombre: {
                label: function () {
                    return "Actividad"
                },
                shorttext: 370
            },
            responsable: {
                label: "Responsable",
                shorttext: 370,
            },
            from: {
                label: "Fecha Inicio",
                sorttype: "date",
                formattype: "date",
            },
            to: {
                label: "Fecha Fin",
                sorttype: "date",
                formattype: "date",
            },
            presupuesto: {
                label: "Presupuesto",
                formattype: "money",
                exportExample: "[money]",
                shorttext: 370,
            },
            avance_porcentaje: {
                label: function () {
                    return "Porcentaje de avance"
                },
                sorttype: "percentage",
                formattype: "percentage",
            },
            razon_nombre: {
                label: function () {
                    return "Evaluación de cierre"
                },
                shorttext: 370,
            },
            estatus: {
                label: "Estatus",
                shorttext: 370
            },
            archivo: {
                label: function () {
                    return "Documento Adjunto"
                },
                // click: function (d,d2,d3) {
                //     console.log(d,d2,d3,"xc");
                //     if(data.row.estatus == "Completado"){
                //         vw_proyecto_item_actividad.setPermission("file.upload",false);
                //         vw_proyecto_item_actividad.setPermission("file.remove",false);
                //     } else {
                //         vw_proyecto_item_actividad.setPermission("file.upload",true);
                //         vw_proyecto_item_actividad.setPermission("file.remove",true);
                //     }
                //     // if (typeof vw_proyecto_item_actividad !== 'null'){
                //     //     if (vw_proyecto_item_actividad){
                //             var info = vw_proyecto_item_actividad.fileSI.filter(data2 => {
                //                 return data2.id == data.row.id;
                //             });
                //             console.log("klk",info);
                //             if(info.length){
                //                 var root = DSON.template( "/vw_proyecto_item_actividad/actividadfile/"+data.row.id, data.row);
                //                 baseController.viewData = {
                //                     root: root,
                //                     scope: 'vw_proyecto_item_actividad',
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
                    if (typeof vw_proyecto_item_actividad !== 'null') {
                        if (vw_proyecto_item_actividad) {
                            var info = vw_proyecto_item_actividad.fileSI.filter(data => {
                                return data.id == row.id;
                            });
                            if (info.length) {
                                return "<a title='Ver imagen'><i class='icon-files-empty'></i></a>";

                            } else {
                                return '';
                            }
                        }

                    }
                }
            },
        },
        filters: {
            columns: [
                {
                    key: 'proyecto_item',
                    label: 'Proyecto Especial',
                    type: FILTER.types.relation,
                    table: 'proyecto_item',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [{
                            "field": "compania",
                            "value": new SESSION().current() ? new SESSION().current().compania_id : -1
                        }],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'nombre',
                    label: function () {
                        return 'Actividad'
                    },
                    type: FILTER.types.string,
                    placeholder: 'Actividad'
                },
                {
                    key: 'responsable_id',
                    label: function () {
                        return 'Responsable'
                    },
                    type: FILTER.types.relation,
                    table: 'vw_usuario',
                    value: "id",
                    text: "item.completo",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "compania",
                                "value": new SESSION().current() ? new SESSION().current().compania_id : -1
                            },
                            {
                                "field": "institucion",
                                "operator": new SESSION().current() ? (new SESSION().current().institucion_id ? "=" : "is") : "=",
                                "value": new SESSION().current() ? new SESSION().current().institucion_id ? new SESSION().current().institucion_id : "$null" : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'from',
                    label: 'Fecha Inicio',
                    type: FILTER.types.date,
                    placeholder: 'Fecha Inicio'
                },
                {
                    key: 'to',
                    label: 'Fecha Fin',
                    type: FILTER.types.date,
                    placeholder: 'Fecha Fin'
                },
                {
                    key: 'presupuesto',
                    label: 'Presupuesto',
                    type: FILTER.types.decimal,
                    placeholder: 'Presupuesto',
                    maxlength: 20
                },
                {
                    key: 'avance_porcentaje',
                    label: 'Procentaje de Avance',
                    type: FILTER.types.integer,
                    placeholder: 'Procentaje de Avance',
                    maxlength: 20
                },
                {
                    key: 'razon',
                    label: function () {
                        return 'Evaluación de cierre'
                    },
                    type: FILTER.types.relation,
                    table: 'razon',
                    value: "id",
                    text: "item.nombre_razon",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "compania",
                                "value": new SESSION().current() ? new SESSION().current().compania_id : -1
                            },
                            {
                                "field": "institucion",
                                "operator": new SESSION().current() ? (new SESSION().current().institucion_id ? "=" : "is") : "=",
                                "value": new SESSION().current() ? new SESSION().current().institucion_id ? new SESSION().current().institucion_id : "$null" : -1
                            },
                            {
                                "field": "tipo",
                                "value": 1
                            },
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'estatus_id',
                    label: function () {
                        return 'Estado'
                    },
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
                                "value": 12
                            },
                        ],
                        orderby: "id",
                        order: "asc"
                    },
                },
            ]
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {

                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['work', 'view'];
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
                            if (typeof vw_proyecto_item_actividad !== "undefined")
                                return vw_proyecto_item_actividad.allowAction("Trabajar AR", "proyecto_item_actividad", data.row.estatus_id);
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.my_true_estatus = data.row.estatus_id;
                            data.$scope.presupuesto_restante = data.row.presupuesto;
                            data.$scope.condition = data.row.condition;
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            data.$scope.form.titles = {
                                edit: "Trabajar - Actividad",
                            };
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
                            if (typeof vw_proyecto_item_actividad !== "undefined")
                                return vw_proyecto_item_actividad.allowAction("Trabajar RP", "proyecto_item_actividad", data.row.estatus_id);
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.my_true_estatus = data.row.estatus_id;
                            data.$scope.presupuesto_restante = data.row.presupuesto;
                            data.$scope.condition = data.row.condition;
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            data.$scope.form.titles = {
                                edit: "Trabajar - Actividad",
                            };
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
                            if (typeof vw_proyecto_item_actividad !== "undefined")
                                return vw_proyecto_item_actividad.allowAction("Trabajar RG", "proyecto_item_actividad", data.row.estatus_id);
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.my_true_estatus = data.row.estatus_id;
                            data.$scope.presupuesto_restante = data.row.presupuesto;
                            data.$scope.condition = data.row.condition;
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            data.$scope.form.titles = {
                                edit: "Trabajar - Actividad",
                            };
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
                            if (typeof vw_proyecto_item_actividad !== "undefined")
                                return vw_proyecto_item_actividad.allowAction("Ver", "proyecto_item_actividad", data.row.estatus_id);
                        },
                        click: function (data) {
                            // if (!DSON.oseaX(data.row)) {
                            //     data.$scope.dataForView = data.row;
                            //     data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                            //         header: {
                            //             title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
                            //             icon: "user"
                            //         },
                            //         footer: {
                            //             cancelButton: true
                            //         },
                            //         content: {
                            //             loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                            //             sameController: true
                            //         },
                            //     });
                            // }
                            data.$scope.presupuesto_restante = data.row.presupuesto_restante;
                            data.$scope.my_true_estatus = data.row.estatus_id;
                            data.$scope.dataooo = true;

                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {}, "view_act");
                            data.$scope.form.titles = {
                                edit: "Ver - Actividad",
                            };
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
                        show: (data) => {
                            return false
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
                        show: (data) => {
                            return false
                        },
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
                        show: (data) => {
                            return false
                        },
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
                        show: (data) => {
                            return false
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
                        show: (data) => {
                            if (typeof vw_proyecto_item_actividad !== "undefined")
                                return vw_proyecto_item_actividad.allowAction("Auditoría", "proyecto_item_actividad", data.row.estatus_id);
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
                    return "comment";
                },
                permission: (data) => {
                    return 'comment_activities';
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    if (data.row.comentarios > 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                click: function (data) {
                    mega_actividades = undefined;
                    vw_proyecto_item_actividad.id_para_comentarios = data.row.id;
                    vw_proyecto_item_actividad.modalAction('comentarios_p_actividad', MESSAGE.i('planificacion.comentarios'), 'comment', 'list', {});
                    return false;
                }
            }
        ]
    }
});
