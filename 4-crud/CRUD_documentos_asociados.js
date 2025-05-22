lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_documentos_asociados = {};
DSON.keepmerge(CRUD_documentos_asociados, CRUDDEFAULTS);
DSON.keepmerge(CRUD_documentos_asociados, {
    table: {
        width: "width:3000px;",
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
                    label: function () {
                        return 'Código Manual'
                    },
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
                {
                    key: 'vigencia',
                    label: function () {
                        return 'Vigencia del documento'
                    },
                    type: FILTER.types.date,
                    placeholder: 'Vigencia del documento'
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
                        click: async function (data) {
                            console.log(data.row);
                            $("#eluniquex").html();
                            SWEETALERT.loading({message: `Generando documento.`});
                            let plantilla = "";
                            if (!DSON.oseaX(data.row)) {
                                plantilla = data.row.plantilla || "";
                                data.row.instrucciones = "";
                                data.row.actividades = "";
                                data.row.politicas = "";
                                data.row.documento_referencia = "";
                                data.row.responsabilidades = "";
                                data.row.termino_definiciones = "";
                                data.row.diagrama = "";

                                let dataActividades = await BASEAPI.listp('vw_solicitud_documento_actividades', {
                                    limit: 0,
                                    where: [
                                        {
                                            field: "documento_asociado",
                                            value: data.row.id
                                        }
                                    ],
                                });
                                dataActividades = dataActividades.data;
                                if (dataActividades.length > 0) {
                                    let htmldeactividades = dataActividades.map(d => `<tr><td>${d.no_orden || ""}</td><td>${d.responsable_nombre || ""}</td><td>${d.nombre || ""}</td></tr>`).join('');;
                                    let tabla = `<table class="table table-bordered"><thead><tr><th style="background-color: #038cfc !important; color: white !important"><span style=" color: white !important;"> Paso </span></th><th style="background-color: #038cfc !important;"><th style="background-color: #038cfc !important; color: white !important"><span style=" color: white !important;"> Responsable </span></th<span style=" color: white !important;"> Descripción </span></th>></tr></thead><tbody>${htmldeactividades}</tbody></table>`;
                                    data.row.actividades = tabla;
                                }
                                let dataPoliticas = await BASEAPI.listp('documento_politicas', {
                                    limit: 0,
                                    where: [
                                        {
                                            field: "documento_asociado",
                                            value: data.row.id
                                        }
                                    ],
                                });
                                dataPoliticas = dataPoliticas.data;
                                if (dataPoliticas.length > 0) {
                                    let htmlpoliticas = dataPoliticas.map(d=>`<ul style="list-style: none; margin: 0; padding: 0;"><li>${d.no_orden || ""}&nbsp;&nbsp;&nbsp;&nbsp;<strong>${d.nombre  || ""}</strong></li></ul>`).join('');
                                    data.row.politicas = htmlpoliticas;
                                }
                                let dataReferencia = await BASEAPI.listp('documento_referencia', {
                                    limit: 0,
                                    where: [
                                        {
                                            field: "documento_asociado",
                                            value: data.row.id
                                        }
                                    ],
                                });
                                dataReferencia = dataReferencia.data;
                                if (dataReferencia.length > 0) {
                                    let htmlreferencia = dataReferencia.map(d=>`<ul style="list-style: none; margin: 0; padding: 0;"><li>${d.no_orden || ""}&nbsp;&nbsp;&nbsp;&nbsp;<strong>${d.nombre  || ""}</strong></li></ul>`).join('');
                                    data.row.documento_referencia = htmlreferencia;
                                }
                                let dataResponsabilidades = await BASEAPI.listp('documento_responsabilidades', {
                                    limit: 0,
                                    where: [
                                        {
                                            field: "documento_asociado",
                                            value: data.row.id
                                        }
                                    ],
                                });
                                dataResponsabilidades = dataResponsabilidades.data;
                                if (dataResponsabilidades.length > 0) {
                                    let htmlresponsabilidades = dataResponsabilidades.map(d=>`<ul style="list-style: none; margin: 0; padding: 0;"><li>${d.no_orden || ""}&nbsp;&nbsp;&nbsp;&nbsp;<strong>${d.nombre  || ""}</strong></li></ul>`).join('');
                                    data.row.responsabilidades = htmlresponsabilidades;
                                }
                                let dataTerminos_definiciones = await BASEAPI.listp('documento_terminos_condiciones', {
                                    limit: 0,
                                    where: [
                                        {
                                            field: "documento_asociado",
                                            value: data.row.id
                                        }
                                    ],
                                });
                                dataTerminos_definiciones = dataTerminos_definiciones.data;
                                if (dataTerminos_definiciones.length > 0) {
                                    let htmlterminos_definiciones = dataTerminos_definiciones.map(d=>`<ul style="list-style: none; margin: 0; padding: 0;"><li>${d.no_orden || ""}&nbsp;&nbsp;&nbsp;&nbsp;<strong>${d.nombre  || ""}</strong>&nbsp;&nbsp;&nbsp;&nbsp;${d.descripcion || ""}</li></ul>`).join('');
                                    data.row.termino_definiciones = htmlterminos_definiciones;
                                }
                                let dataInstrucciones = await BASEAPI.listp('documento_instrucciones', {
                                    limit: 0,
                                    where: [
                                        {
                                            field: "documento_asociado",
                                            value: data.row.id
                                        }
                                    ],
                                });
                                dataInstrucciones = dataInstrucciones.data;
                                if (dataInstrucciones.length > 0) {
                                    let htmlinstrucciones = dataInstrucciones.map(d=>`<ul style="list-style: none; margin: 0; padding: 0;"><li>${d.no_orden || ""}&nbsp;&nbsp;&nbsp;&nbsp; <strong>${d.nombre  || ""}</strong></li></ul>`).join('');
                                    data.row.instrucciones = htmlinstrucciones;
                                }
                                let diagramaList = await BASEAPI.listp('documentos_asociados_mapa_conceptual', {
                                    limit: 0,
                                    where: [
                                        {
                                            field: "documento_asociado",
                                            value: data.row.id
                                        }
                                    ],
                                });
                                diagramaList = diagramaList.data;
                                if (diagramaList.length > 0){
                                    let htmldiagrama = diagramaList.map(d => {
                                        data.$scope.image = "";
                                        let diagramCanvas = `<h1>${d.nombre}</h1><div name="myDiagramDiv${d.id}" id="myDiagramDiv${d.id}" style="width: auto; max-width: 100%; height: auto; display: none"></div> <img id="myDiagramImg${d.id}" style="width: auto; max-width: 100%; height: auto; -webkit-print-color-adjust: exact !important;">`;
                                        setTimeout(async function () {
                                            // These parameters need to be set before defining the templates.
                                            const MINLENGTH = 200; // this controls the minimum length of any swimlane
                                            const MINBREADTH = 20; // this controls the minimum breadth of any non-collapsed swimlane

                                            // some shared functions
                                            // this may be called to force the lanes to be laid out again
                                            function relayoutLanes() {
                                                myDiagram.nodes.each((lane) => {
                                                    if (!(lane instanceof go.Group)) return;
                                                    if (lane.category === 'Pool') return;
                                                    lane.layout.isValidLayout = false; // force it to be invalid
                                                });
                                                documentos_asociados_mapa_conceptual.myDiagram.layoutDiagram();
                                            }

                                            // this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again
                                            function relayoutDiagram(diagram) {
                                                diagram.layout.invalidateLayout();
                                                diagram.findTopLevelGroups().each((g) => {
                                                    if (g.category === 'Pool') g.layout.invalidateLayout();
                                                });
                                                diagram.layoutDiagram();
                                            }

                                            // compute the minimum size of a Pool Group needed to hold all of the Lane Groups
                                            function computeMinPoolSize(pool) {
                                                // assert(pool instanceof go.Group && pool.category === "Pool");
                                                let len = MINLENGTH;
                                                pool.memberParts.each((lane) => {
                                                    // pools ought to only contain lanes, not plain Nodes
                                                    if (!(lane instanceof go.Group)) return;
                                                    const holder = lane.placeholder;
                                                    if (holder !== null) {
                                                        len = Math.max(len, holder.actualBounds.width);
                                                    }
                                                });
                                                return new go.Size(len, NaN);
                                            }

                                            // compute the minimum size for a particular Lane Group
                                            function computeLaneSize(lane) {
                                                // assert(lane instanceof go.Group && lane.category !== "Pool");
                                                const sz = computeMinLaneSize(lane);
                                                if (lane.isSubGraphExpanded) {
                                                    const holder = lane.placeholder;
                                                    if (holder !== null) {
                                                        sz.height = Math.ceil(Math.max(sz.height, holder.actualBounds.height));
                                                    }
                                                }
                                                // minimum breadth needs to be big enough to hold the header
                                                const hdr = lane.findObject('HEADER');
                                                if (hdr !== null) sz.height = Math.ceil(Math.max(sz.height, hdr.actualBounds.height));
                                                return sz;
                                            }

                                            // determine the minimum size of a Lane Group, even if collapsed
                                            function computeMinLaneSize(lane) {
                                                if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);
                                                return new go.Size(MINLENGTH, MINBREADTH);
                                            }

                                            // define a custom ResizingTool to limit how far one can shrink a lane Group
                                            class LaneResizingTool extends go.ResizingTool {
                                                constructor(init) {
                                                    super();
                                                    if (init) Object.assign(this, init);
                                                }

                                                isLengthening() {
                                                    return this.handle.alignment === go.Spot.Right;
                                                }

                                                computeMinSize() {
                                                    const lane = this.adornedObject.part;
                                                    // assert(lane instanceof go.Group && lane.category !== "Pool");
                                                    const msz = computeMinLaneSize(lane); // get the absolute minimum size
                                                    if (this.isLengthening()) {
                                                        // compute the minimum length of all lanes
                                                        const sz = computeMinPoolSize(lane.containingGroup);
                                                        msz.width = Math.max(msz.width, sz.width);
                                                    } else {
                                                        // find the minimum size of this single lane
                                                        const sz = computeLaneSize(lane);
                                                        msz.width = Math.max(msz.width, sz.width);
                                                        msz.height = Math.max(msz.height, sz.height);
                                                    }
                                                    return msz;
                                                }

                                                resize(newr) {
                                                    const lane = this.adornedObject.part;
                                                    if (this.isLengthening()) {
                                                        // changing the length of all of the lanes
                                                        lane.containingGroup.memberParts.each((lane) => {
                                                            if (!(lane instanceof go.Group)) return;
                                                            const shape = lane.resizeObject;
                                                            if (shape !== null) {
                                                                // set its desiredSize length, but leave each breadth alone
                                                                shape.width = newr.width;
                                                            }
                                                        });
                                                    } else {
                                                        // changing the breadth of a single lane
                                                        super.resize(newr);
                                                    }
                                                    relayoutDiagram(this.diagram); // now that the lane has changed size, layout the pool again
                                                }
                                            }
                                            // end LaneResizingTool class

                                            // define a custom grid layout that makes sure the length of each lane is the same
                                            // and that each lane is broad enough to hold its subgraph
                                            class PoolLayout extends go.GridLayout {
                                                constructor(init) {
                                                    super();
                                                    this.cellSize = new go.Size(1, 1);
                                                    this.wrappingColumn = 1;
                                                    this.wrappingWidth = Infinity;
                                                    this.isRealtime = false; // don't continuously layout while dragging
                                                    this.alignment = go.GridAlignment.Position;
                                                    // This sorts based on the location of each Group.
                                                    // This is useful when Groups can be moved up and down in order to change their order.
                                                    this.comparer = (a, b) => {
                                                        const ay = a.location.y;
                                                        const by = b.location.y;
                                                        if (isNaN(ay) || isNaN(by)) return 0;
                                                        if (ay < by) return -1;
                                                        if (ay > by) return 1;
                                                        return 0;
                                                    };
                                                    this.boundsComputation = (part, layout, rect) => {
                                                        part.getDocumentBounds(rect);
                                                        rect.inflate(-1, -1); // negative strokeWidth of the border Shape
                                                        return rect;
                                                    };
                                                    if (init) Object.assign(this, init);
                                                }

                                                doLayout(coll) {
                                                    const diagram = this.diagram;
                                                    if (diagram === null) return;
                                                    diagram.startTransaction('PoolLayout');
                                                    const pool = this.group;
                                                    if (pool !== null && pool.category === 'Pool') {
                                                        // make sure all of the Group Shapes are big enough
                                                        const minsize = computeMinPoolSize(pool);
                                                        pool.memberParts.each((lane) => {
                                                            if (!(lane instanceof go.Group)) return;
                                                            if (lane.category !== 'Pool') {
                                                                const shape = lane.resizeObject;
                                                                if (shape !== null) {
                                                                    // change the desiredSize to be big enough in both directions
                                                                    const sz = computeLaneSize(lane);
                                                                    shape.width = isNaN(shape.width)
                                                                        ? minsize.width
                                                                        : Math.max(shape.width, minsize.width);
                                                                    shape.height = !isNaN(shape.height) ? Math.max(shape.height, sz.height) : sz.height;
                                                                    const cell = lane.resizeCellSize;
                                                                    if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0)
                                                                        shape.width = Math.ceil(shape.width / cell.width) * cell.width;
                                                                    if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0)
                                                                        shape.height = Math.ceil(shape.height / cell.height) * cell.height;
                                                                }
                                                            }
                                                        });
                                                    }
                                                    // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
                                                    super.doLayout(coll);
                                                    diagram.commitTransaction('PoolLayout');
                                                }
                                            }
                                            // end PoolLayout class

                                            let myDiagram = new go.Diagram(`myDiagramDiv${d.id}`, {
                                                // use a custom ResizingTool (along with a custom ResizeAdornment on each Group)
                                                resizingTool: new LaneResizingTool(),
                                                // use a simple layout that ignores links to stack the top-level Pool Groups next to each other
                                                layout: new PoolLayout(),
                                                // don't allow dropping onto the diagram's background unless they are all Groups (lanes or pools)
                                                mouseDragOver: (e) => {
                                                    if (!e.diagram.selection.all((n) => n instanceof go.Group)) {
                                                        e.diagram.currentCursor = 'not-allowed';
                                                    }
                                                },
                                                mouseDrop: (e) => {
                                                    if (!e.diagram.selection.all((n) => n instanceof go.Group)) {
                                                        e.diagram.currentTool.doCancel();
                                                    }
                                                },
                                                // a clipboard copied node is pasted into the original node's group (i.e. lane).
                                                'commandHandler.copiesGroupKey': true,
                                                // automatically re-layout the swim lanes after dragging the selection
                                                SelectionMoved: (e) => relayoutDiagram(e.diagram),
                                                SelectionCopied: (e) => relayoutDiagram(e.diagram),
                                                'animationManager.isEnabled': false,
                                                // enable undo & redo
                                                'undoManager.isEnabled': true
                                            });


                                            // Configuración del modelo para que incluya la posición de los nodos
                                            myDiagram.model = new go.GraphLinksModel({
                                                linkKeyProperty: 'key',  // especifica que la propiedad 'key' será la clave de los enlaces
                                                nodeDataArray: [
                                                    // tus datos de nodos aquí
                                                ],
                                                linkDataArray: [
                                                    // tus datos de enlaces aquí
                                                ]
                                            });
                                            // this is a Part.dragComputation function for limiting where a Node may be dragged
                                            // use GRIDPT instead of PT if DraggingTool.isGridSnapEnabled and movement should snap to grid
                                            function stayInGroup(part, pt, gridpt) {
                                                // don't constrain top-level nodes
                                                const grp = part.containingGroup;
                                                if (grp === null) return pt;
                                                // try to stay within the background Shape of the Group
                                                const back = grp.resizeObject;
                                                if (back === null) return pt;
                                                // allow dragging a Node out of a Group if the Shift key is down
                                                if (part.diagram.lastInput.shift) return pt;
                                                const r = back.getDocumentBounds();
                                                const b = part.actualBounds;
                                                const loc = part.location;
                                                // find the padding inside the group's placeholder that is around the member parts
                                                const m = grp.placeholder.padding;
                                                // now limit the location appropriately
                                                const x =
                                                    Math.max(r.x + m.left, Math.min(pt.x, r.right - m.right - b.width - 1)) + (loc.x - b.x);
                                                const y =
                                                    Math.max(r.y + m.top, Math.min(pt.y, r.bottom - m.bottom - b.height - 1)) + (loc.y - b.y);
                                                return new go.Point(x, y);
                                            }

                                            myDiagram.nodeTemplate = new go.Node('Auto', {

                                                // limit dragging of Nodes to stay within the containing Group, defined above
                                                dragComputation: stayInGroup
                                            })
                                                .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
                                                .add(
                                                    new go.Shape('Rectangle', {
                                                        fill: 'white',
                                                        portId: '',
                                                        cursor: 'pointer',
                                                        fromLinkable: true,
                                                        toLinkable: true
                                                    }).bind('figure', 'figure').bind('fill', 'fill'),

                                                    new go.TextBlock({
                                                        name: "TEXTBLOCK", // Nombre para el TextBlock
                                                        margin: 5,
                                                        editable: true, // Habilitar la edición del texto,
                                                        textAlign: 'center',  // Centralizar el texto
                                                        verticalAlignment: go.Spot.Center
                                                    }).bind('text', 'text').bindTwoWay('text'),
                                                    // Puertos
                                                    makePort('T', go.Spot.Top, true, true),
                                                    makePort('L', go.Spot.Left, true, true),
                                                    makePort('R', go.Spot.Right, true, true),
                                                    makePort('B', go.Spot.Bottom, true, true)
                                                );

                                            function makePort(name, spot, output, input) {
                                                return new go.Shape('Circle', {
                                                    fill: 'transparent',
                                                    stroke: null,
                                                    desiredSize: new go.Size(8, 8),
                                                    alignment: spot,
                                                    alignmentFocus: spot,  // Desplazamiento desde el borde del nodo
                                                    portId: name,  // Identificador del puerto
                                                    fromSpot: spot,  // Lado del nodo desde donde puede salir el enlace
                                                    toSpot: spot,  // Lado del nodo en donde puede llegar el enlace
                                                    fromLinkable: output,  // Si los enlaces pueden salir de este puerto
                                                    toLinkable: input,  // Si los enlaces pueden llegar a este puerto
                                                    cursor: 'pointer'  // Indicar que es un puerto interactivo
                                                });
                                            }

                                            function groupStyle(obj) {
                                                // common settings for both Lane and Pool Groups
                                                let obj2 = {
                                                    layerName: 'Background', // all pools and lanes are always behind all nodes and links
                                                    background: 'transparent', // can grab anywhere in bounds
                                                    movable: true, // allows users to re-order by dragging
                                                    copyable: false, // can't copy lanes or pools
                                                    avoidable: false, // don't impede AvoidsNodes routed Links
                                                    minLocation: new go.Point(NaN, -Infinity), // only allow vertical movement
                                                    maxLocation: new go.Point(NaN, Infinity)
                                                };

                                                // apply settings to given obj
                                                if (!obj) return obj2;
                                                Object.keys(obj2).forEach((p) => {
                                                    if (obj[p]) return; // dont change things already defined
                                                    obj[p] = obj2[p];
                                                });
                                                return obj;
                                            }

                                            // hide links between lanes when either lane is collapsed
                                            function updateCrossLaneLinks(group) {
                                                group.findExternalLinksConnected().each((l) => {
                                                    l.visible = l.fromNode.isVisible() && l.toNode.isVisible();
                                                });
                                            }

                                            // each Group is a "swimlane" with a header on the left and a resizable lane on the right
                                            myDiagram.groupTemplateMap.add(
                                                'Lane',
                                                new go.Group('Horizontal',
                                                    groupStyle({
                                                        selectionObjectName: 'SHAPE', // selecting a lane causes the body of the lane to be highlit, not the label
                                                        resizable: true,
                                                        resizeObjectName: 'SHAPE', // the custom resizeAdornmentTemplate only permits two kinds of resizing
                                                        layout: new go.LayeredDigraphLayout({
                                                            // automatically lay out the lane's subgraph
                                                            isInitial: false, // don't even do initial layout
                                                            isOngoing: false, // don't invalidate layout when nodes or links are added or removed
                                                            direction: 90,
                                                            columnSpacing: 10,
                                                            layeringOption: go.LayeredDigraphLayering.LongestPathSource
                                                        }),
                                                        computesBoundsAfterDrag: true, // needed to prevent recomputing Group.placeholder bounds too soon
                                                        computesBoundsIncludingLinks: false, // to reduce occurrences of links going briefly outside the lane
                                                        computesBoundsIncludingLocation: true, // to support empty space at top-left corner of lane
                                                        handlesDragDropForMembers: true, // don't need to define handlers on member Nodes and Links
                                                        mouseDrop: (e, grp) => {
                                                            // dropping a copy of some Nodes and Links onto this Group adds them to this Group
                                                            if (!e.shift) return; // cannot change groups with an unmodified drag-and-drop
                                                            // don't allow drag-and-dropping a mix of regular Nodes and Groups
                                                            if (!e.diagram.selection.any((n) => n instanceof go.Group)) {
                                                                const ok = grp.addMembers(grp.diagram.selection, true);
                                                                if (ok) {
                                                                    updateCrossLaneLinks(grp);
                                                                } else {
                                                                    grp.diagram.currentTool.doCancel();
                                                                }
                                                            } else {
                                                                e.diagram.currentTool.doCancel();
                                                            }
                                                        },
                                                        subGraphExpandedChanged: (grp) => {
                                                            const shp = grp.resizeObject;
                                                            if (grp.diagram.undoManager.isUndoingRedoing) return;
                                                            if (grp.isSubGraphExpanded) {
                                                                shp.height = grp.data.savedBreadth;
                                                            } else {
                                                                if (!isNaN(shp.height)) grp.diagram.model.set(grp.data, 'savedBreadth', shp.height);
                                                                shp.height = NaN;
                                                            }
                                                            updateCrossLaneLinks(grp);
                                                        }
                                                    })
                                                )
                                                    .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
                                                    .bindTwoWay('isSubGraphExpanded', 'expanded')
                                                    .add(
                                                        // the lane header consisting of a Shape and a TextBlock
                                                        new go.Panel('Horizontal', {
                                                            name: 'HEADER',
                                                            angle: 270, // maybe rotate the header to read sideways going up
                                                            alignment: go.Spot.Center
                                                        })
                                                            .add(
                                                                new go.Panel('Horizontal') // this is hidden when the swimlane is collapsed
                                                                    .bindObject('visible', 'isSubGraphExpanded')
                                                                    .add(
                                                                        new go.Shape('Diamond', { width: 8, height: 8, fill: 'white' })
                                                                            .bind('fill', 'color'),
                                                                        new go.TextBlock({
                                                                            font: 'bold 13pt sans-serif',
                                                                            editable: true,
                                                                            margin: new go.Margin(2, 0, 0, 0)
                                                                        }).bindTwoWay('text',"text", function (t){ return decodeURIComponent(t);})
                                                                    ),
                                                                go.GraphObject.build('SubGraphExpanderButton', { margin: 5 }) // but this remains always visible!
                                                            ), // end Horizontal Panel
                                                        new go.Panel('Auto') // the lane consisting of a background Shape and a Placeholder representing the subgraph
                                                            .add(
                                                                new go.Shape('Rectangle', { // this is the resized object
                                                                    name: 'SHAPE',
                                                                    fill: 'white'
                                                                })
                                                                    .bind('fill', 'color')
                                                                    .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify),
                                                                new go.Placeholder({ padding: 12, alignment: go.Spot.TopLeft }),
                                                                new go.TextBlock({
                                                                    // this TextBlock is only seen when the swimlane is collapsed
                                                                    name: 'LABEL',
                                                                    font: 'bold 13pt sans-serif',
                                                                    editable: true,
                                                                    angle: 0,
                                                                    alignment: go.Spot.TopLeft,
                                                                    margin: new go.Margin(2, 0, 0, 4)
                                                                })
                                                                    .bindObject('visible', 'isSubGraphExpanded', (e) => !e)
                                                                    .bindTwoWay('text')
                                                            ) // end Auto Panel
                                                    )
                                            ); // end Group

                                            // define a custom resize adornment that has two resize handles if the group is expanded
                                            myDiagram.groupTemplateMap.get('Lane').resizeAdornmentTemplate = new go.Adornment('Spot')
                                                .add(
                                                    new go.Placeholder(),
                                                    new go.Shape({
                                                        // for changing the length of a lane
                                                        alignment: go.Spot.Right,
                                                        desiredSize: new go.Size(7, 50),
                                                        fill: 'lightblue',
                                                        stroke: 'dodgerblue',
                                                        cursor: 'col-resize'
                                                    }).bindObject('visible', '', (ad) => {
                                                        if (ad.adornedPart === null) return false;
                                                        return ad.adornedPart.isSubGraphExpanded;
                                                    }),
                                                    new go.Shape({
                                                        // for changing the breadth of a lane
                                                        alignment: go.Spot.Bottom,
                                                        desiredSize: new go.Size(50, 7),
                                                        fill: 'lightblue',
                                                        stroke: 'dodgerblue',
                                                        cursor: 'row-resize'
                                                    }).bindObject('visible', '', (ad) => {
                                                        if (ad.adornedPart === null) return false;
                                                        return ad.adornedPart.isSubGraphExpanded;
                                                    })
                                                );

                                            myDiagram.groupTemplateMap.add(
                                                'Pool',
                                                new go.Group('Auto',
                                                    groupStyle({
                                                        // use a simple layout that ignores links to stack the "lane" Groups on top of each other
                                                        layout: new PoolLayout({ spacing: new go.Size(0, 0) }) // no space between lanes
                                                    })
                                                )
                                                    .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
                                                    .add(
                                                        new go.Shape({ fill: 'white' }).bind('fill', 'color'),
                                                        new go.Panel('Table', { defaultColumnSeparatorStroke: 'black' })
                                                            .add(
                                                                new go.Panel('Horizontal', { column: 0, angle: 270 })
                                                                    .add(
                                                                        new go.TextBlock({
                                                                            font: 'bold 16pt sans-serif',
                                                                            editable: true,
                                                                            margin: new go.Margin(2, 0, 0, 0)
                                                                        }).bindTwoWay('text',"text", function (t){ return decodeURIComponent(t);})
                                                                    ),
                                                                new go.Placeholder({ column: 1 })
                                                            )
                                                    )
                                            );

                                            myDiagram.linkTemplate = new go.Link({
                                                routing: go.Routing.Orthogonal,  // may be either Orthogonal or AvoidsNodes
                                                curve: go.Curve.JumpOver,
                                                corner: 5,
                                                relinkableFrom: true,
                                                relinkableTo: true,
                                                doubleClick: function(e, link) {
                                                    myDiagram.startTransaction("edit text");
                                                    const tb = link.findObject("LABEL");
                                                    if (tb !== null) myDiagram.commandHandler.editTextBlock(tb);
                                                    myDiagram.commitTransaction("edit text");
                                                }
                                            }).bind(
                                                new go.Binding("points").makeTwoWay()
                                            ).add(
                                                new go.Shape(),
                                                new go.Shape({ toArrow: 'Standard' }),
                                                new go.Panel("Auto").add(
                                                    new go.Shape({ fill: "transparent" }), // Fondo transparente para detectar clics
                                                    new go.TextBlock({
                                                        name: "LABEL", // Nombre para referenciar el TextBlock
                                                        editable: true,
                                                        textAlign: 'center',
                                                        font: '14px Roboto',
                                                        segmentOffset: new go.Point(0, -10)
                                                    }).bind(new go.Binding("text").makeTwoWay())
                                                )
                                            );



                                            try {
                                                myDiagram.model = go.Model.fromJson(d.diagrama);

                                                myDiagram.nodes.each(function(node) {
                                                    var textBlock = node.findObject("TEXTBLOCK");
                                                    if (textBlock !== null && node.data.text) {
                                                        textBlock.text = decodeURIComponent(node.data.text);
                                                    }
                                                });
                                                let imgData = myDiagram.makeImageData({
                                                    scale: 1,
                                                    background: "white",
                                                    type: "image/png",
                                                    position: myDiagram.documentBounds.position,
                                                    maxSize: new go.Size(Infinity, Infinity)
                                                });
                                                document.getElementById(`myDiagramImg${d.id}`).src = imgData;
                                            } catch (e) {

                                            }




                                            const colors = {
                                                pink: '#facbcb',
                                                blue: '#b7d8f7',
                                                green: '#b9e1c8',
                                                yellow: '#faeb98',
                                                background: '#e8e8e8',
                                            };
                                            myDiagram.div.style.backgroundColor = colors.background;

                                            // Show the diagram's model in JSON format
                                            function save() {
                                                data.$scope.diagrama = myDiagram.model.toJson();
                                                myDiagram.isModified = false;
                                            }
                                            function load() {
                                                myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);
                                                myDiagram.delayInitialization(relayoutDiagram);
                                            }

                                            SWEETALERT.stop();
                                        }, 10.00)
                                        console.log(data.$scope.image);
                                        return diagramCanvas;
                                    }).join('');

                                    data.row.diagrama = htmldiagrama;
                                }
                                Object.keys(data.row).forEach(d => {
                                    plantilla = plantilla.replaceAll(`@${d}@`, data.row[d] || "");
                                });
                            }
                            $("#eluniquex").html(plantilla);
                            $("#eluniquex").show();
                            if (data.row.estatus !== 'Autorizado')
                                $("#eluniquex").attr('data-before', data.row.estatus);

                            $("#eluniquex").printThis({
                                printDelay: 500,
                                loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
                                importCSS: true
                            });
                            setTimeout(() => {
                                SWEETALERT.stop();
                            }, 500);

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
