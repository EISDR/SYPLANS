lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_documentos_asociados = {};
DSON.keepmerge(CRUD_documentos_asociados, CRUDDEFAULTS);
DSON.keepmerge(CRUD_documentos_asociados, {
    table: {
        width: "width:2400px;",
        view: 'vw_documentos_asociados',
        //method: 'documentos_asociados',
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
                label: function () {
                    return "Número del Documento"
                }
            },
            codigor: {
                label: function () {
                    return "Código"
                },
                format: (row) => {
                    return baseController.COD("Módulo de Calidad -> Documentos", row.id, row.aprobado_en);
                },
                sortable: false
            },
            nombre: {},
            descripcion: {shorttext: 360},
            estatus: {shorttext: 360},
            observacion: {
                label: function () {
                    return "Observación"
                },
                shorttext: 360,
                // visible: false,
                // visibleDetail: false,
                // export: false,
                // exportExample: false,
            },
            tipo_documento: {
                label: function () {
                    return 'Tipo de Documento'
                },
                shorttext: 360
            },
            objetivo: {
                label: function () {
                    return "Objetivo"
                },
                shorttext: 360
            },
            alcance: {shorttext: 360},
            resultado_esperado: {shorttext: 360},
            creado_por_nombre: {
                label: function () {
                    return "Elaborado Por"
                },
                // visible: false,
                // visibleDetail: false,
                // export: false,
                // exportExample: false,
            },
            creado_en: {
                shorttext: 360,
                label: function () {
                    return "Elaborado En"
                },
                formattype: ENUM.FORMAT.datetime,
            },
            aprobado_por_nombre: {
                label: function () {
                    return "Autorizado Por"
                }
                // visible: false,
                // visibleDetail: false,
                // export: false,
                // exportExample: false,
            },
            aprobado_en: {
                label: function () {
                    return "Autorizado En"
                },
                shorttext: 360,
                formattype: ENUM.FORMAT.datetime,
                // visible: false,
                // visibleDetail: false,
                // export: false,
                // exportExample: false,
            },
            archivo: {
                label: function () {
                    return "Archivo Adjunto"
                },
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
                    if (typeof documentos_asociados !== 'null') {
                        if (documentos_asociados) {
                            var info = documentos_asociados.fileSI.filter(data => {
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
            }
        },
        filters: {
            columns: [
                {
                    key: 'version_documento',
                    label: 'Versión del Documento',
                    type: FILTER.types.string,
                    placeholder: 'Versión del Documento'
                },
                {
                    key: 'id',
                    label: function () {
                        return 'Código Automático'
                    },
                    type: FILTER.types.string,
                    placeholder: 'Código Automático'
                },
                {
                    key: 'procesos_categoria',
                    label: function () {
                        return 'Macroproceso'
                    },
                    type: FILTER.types.relation,
                    table: 'vw_procesos_categoria',
                    value: "id",
                    text: "item.nombre",
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
                            },
                            {
                                field: "estatus_mapa",
                                operator: "!=",
                                value: 4
                            },
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'proceso',
                    label: 'Proceso',
                    type: FILTER.types.relation,
                    table: 'vw_procesos',
                    value: "id",
                    text: "item.nombre",
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
                            },
                            {
                                field: "estatus_mapa",
                                operator: "!=",
                                value: 4
                            },
                            {
                                field: "estatus_id",
                                operator: "!=",
                                value: 4
                            },
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'codigo',
                    label: 'Código Manual',
                    type: FILTER.types.string,
                    placeholder: 'Código Manual'
                },
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
                                "value": 2
                            },
                        ],
                        orderby: "id",
                        order: "asc"
                    },
                },
                {
                    key: 'observacion',
                    label: 'Observación',
                    type: FILTER.types.string,
                    placeholder: 'Observación'
                },
                {
                    key: 'tipo_documento_id',
                    label: function () {
                        return 'Tipo de Documento'
                    },
                    type: FILTER.types.relation,
                    table: 'tipo_documento',
                    value: "id",
                    text: "item.nombre",
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
                    key: 'objetivo',
                    label: function () {
                        return 'Objetivo'
                    },
                    type: FILTER.types.string,
                    placeholder: 'Objetivo'
                },
                {
                    key: 'alcance',
                    label: 'Alcance',
                    type: FILTER.types.string,
                    placeholder: 'Alcance'
                },
                {
                    key: 'trabaja_marco_legal',
                    label: function () {
                        return '¿Trabaja Marco Legal?'
                    },
                    type: FILTER.types.bool,
                    placeholder: '¿Trabaja Marco Legal?'
                },
                {
                    key: 'marco_legal',
                    label: 'Marco Legal',
                    type: FILTER.types.string,
                    placeholder: 'Marco Legal'
                },
                {
                    key: 'resultado_esperado',
                    label: 'Resultado Esperado',
                    type: FILTER.types.string,
                    placeholder: 'Resultado Esperado'
                },
                {
                    key: 'creado_por',
                    label: 'Creado por',
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
                    key: 'creado_en',
                    label: 'Creado En',
                    type: FILTER.types.date,
                    placeholder: 'Creado En'
                },
                {
                    key: 'aprobado_por',
                    label: 'Aprobado por',
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
                    key: 'aprobado_en',
                    label: 'Aprobado En',
                    type: FILTER.types.date,
                    placeholder: 'Aprobado En'
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
                            return "Trabajar";
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
                            return documentos_asociados.allowAction("Trabajar", "documentos_asociados", data.row.estatus_id);
                        },
                        click: function (data) {
                            data.$scope.my_true_estatus = data.row.estatus_id;
                            data.$scope.solicitante = data.row.solicitante;
                            data.$scope.nombre_solicitante = data.row.solicitante_nombre;
                            data.$scope.departamento_solicitante = data.row.solicitante_departamento;
                            data.$scope.fecha_solicitante = LAN.date(data.row.fecha_solicitud);
                            data.$scope.marco_required = data.row.trabaja_marco_legal === 1;
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            if (typeof procesos !== 'undefined') {
                                if (typeof procesos !== 'not defined') {
                                    if (procesos) {
                                        data.$scope.form.titles = {
                                            edit: 'Trabajar Documento: "' + data.row.nombre + '" del Proceso: "' + procesos.nombre + '"',
                                        };
                                    }
                                }
                            }
                            return false;
                        }
                    },
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
                            return documentos_asociados.allowAction("Editar", "documentos_asociados", data.row.estatus_id);
                        },
                        click: function (data) {
                            data.$scope.my_true_estatus = data.row.estatus_id;
                            data.$scope.solicitante = data.row.solicitante;
                            data.$scope.nombre_solicitante = data.row.solicitante_nombre;
                            data.$scope.departamento_solicitante = data.row.solicitante_departamento;
                            data.$scope.fecha_solicitante = LAN.date(data.row.fecha_solicitud);
                            data.$scope.marco_required = data.row.trabaja_marco_legal === 1;
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            if (typeof procesos !== 'undefined') {
                                if (typeof procesos !== 'not defined') {
                                    if (procesos) {
                                        data.$scope.form.titles = {
                                            edit: 'Editar Documento: "' + data.row.nombre + '" del Proceso: "' + procesos.nombre + '"',
                                        };
                                    }
                                }
                            }
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
                        show: (data) => {
                            return documentos_asociados.allowAction("Ver", "documentos_asociados", data.row.estatus_id);
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                    header: {
                                        title: typeof procesos !== "undefined" ? 'Ver Documento: "' + data.row.nombre + '" del Proceso: "' + procesos.nombre + '"' : MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
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
                            return "Imprimir desde plantilla"
                        },
                        icon: (data) => {
                            return "printer2";
                        },
                        permission: (data) => {
                            return 'view';
                        },
                        show: (data) => {
                            return true;
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            console.log(data.row);
                            $("#eluniquex").html();
                            SWEETALERT.loading({message: `Generando documento.`});
                            let plantilla = "";

                            if (!DSON.oseaX(data.row)) {
                                plantilla = data.row.plantilla||"";

                                Object.keys(data.row).forEach(d => {
                                    plantilla = plantilla.replaceAll(`@${d}@`, data.row[d] || "");
                                });
                            }
                            $("#eluniquex").html(plantilla);
                            if (data.row.estatus !== 'Autorizado')
                                $("#eluniquex").attr('data-before', data.row.estatus);
                            $("#eluniquex").printThis({
                                printDelay: 333,
                                loadCSS: "styles/zfrola/mathquill.css",
                            });
                            SWEETALERT.stop();
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
                        show: function (data) {
                            return data.$scope.activeColumn() && documentos_asociados.allowAction("Habilitar", "documentos_asociados", data.row.estatus_id);
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
                        show: function (data) {
                            return data.$scope.activeColumn() && documentos_asociados.allowAction("Deshabilitar", "documentos_asociados", data.row.estatus_id);
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
                        }
                    },
                    // {
                    //     text: (data) => {
                    //         return MESSAGE.i('actions.Copy');
                    //     },
                    //     icon: (data) => {
                    //         return "copy3";
                    //     },
                    //     permission: (data) => {
                    //         return 'copy';
                    //     },
                    //     characterist: (data) => {
                    //         return "";
                    //     },
                    //     click: function (data) {
                    //
                    //         var formatRow = {};
                    //
                    //         for (var i in eval(`CRUD_${data.$scope.modelName}`).table.columns) {
                    //             var column = eval(`CRUD_${data.$scope.modelName}`).table.columns[i];
                    //             var key = i;
                    //             var alter = column.exportKey !== undefined ? column.exportKey : i;
                    //             if (eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample !== false) {
                    //                 var exampleText = eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample;
                    //                 exampleText = exampleText === undefined ? "[string]" : exampleText;
                    //                 var realValue = eval(`data.row.${key};`);
                    //                 if (!DSON.oseaX(realValue)) {
                    //                     if (column.link !== undefined) {
                    //                         realValue = eval(`data.row.${key.split('_')[0]}_${key.split('_')[1]}_id;`);
                    //                     }
                    //                     if (column.formattype === "datetime") {
                    //                         realValue = moment(realValue).format(DSON.UNIVERSALTIME);
                    //                     }
                    //                     if (column.formattype === "date") {
                    //                         realValue = moment(realValue).format(DSON.UNIVERSAL);
                    //                     }
                    //                     eval(`formatRow.${alter} = \`${realValue}\`;`);
                    //                 }
                    //             }
                    //         }
                    //         SWEETALERT.confirm({
                    //             title: MESSAGE.i('actions.CopyRecords'),
                    //             message: MESSAGE.i('alerts.Copy'),
                    //             confirm: function () {
                    //                 SWEETALERT.loading({message: MESSAGE.i('actions.CopyngRecord')});
                    //                 var records = [formatRow];
                    //                 var columns = eval(`CRUD_${data.$scope.modelName}`).table.columns;
                    //                 var inserts = [];
                    //                 for (var i in records) {
                    //                     var record = records[i];
                    //                     var row = {};
                    //                     for (var i in record) {
                    //                         var key = i;
                    //                         var value = record[i];
                    //                         for (var c in columns) {
                    //                             var column = false;
                    //                             if (c === key || key === columns[c].exportKey)
                    //                                 column = columns[c];
                    //                             if (column === false) continue;
                    //                             eval(`row.${key} = \`${value}\`;`);
                    //                             break;
                    //                         }
                    //                     }
                    //                     inserts.push({row: row, relations: []});
                    //                 }
                    //                 data.$scope.importing(inserts);
                    //             }
                    //         });
                    //         return false;
                    //     }
                    // },
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
                        show: (data) => {
                            return documentos_asociados.allowAction("Auditoría", "documentos_asociados", data.row.estatus_id);
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/audit", data.$scope.modelName), {
                                    header: {
                                        title: typeof procesos !== "undefined" ? 'Auditoría del Documento: "' + data.row.nombre + '" del Proceso: "' + procesos.nombre + '"' : MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
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
                        show: (data) => {
                            return false;
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
                    }
                ]
            },
            {
                text: (data) => {
                    return "Cambiar versión del documento";
                },
                title: (data) => {
                    return "Cambiar versión del documento";
                },
                icon: (data) => {
                    return "switch22";
                },
                permission: (data) => {
                    return 'edit';
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    return documentos_asociados.allowAction("Cambiar Versión", "documentos_asociados", data.row.estatus_id);
                },
                click: function (data) {
                    data.$scope.my_true_estatus = data.row.estatus_id;
                    data.$scope.solicitante = data.row.solicitante;
                    data.$scope.nombre_solicitante = data.row.solicitante_nombre;
                    data.$scope.departamento_solicitante = data.row.solicitante_departamento;
                    data.$scope.fecha_solicitante = LAN.date(data.row.fecha_solicitud);
                    data.$scope.marco_required = data.row.trabaja_marco_legal === 1;
                    data.$scope.formulary({
                        where: [{
                            field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                            value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                        }]
                    }, FORM.modes.edit, {}, "ver_edit");
                    data.$scope.form.titles = {
                        edit: "Cambiar Versión del Documento",
                    };
                    return false;
                }
            },
        ]
    }
});
//modify methods that existing option
//CRUD_documentos_asociados.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_documentos_asociados.table.options[0].menus.push({
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
