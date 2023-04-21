app.controller("documentos_asociados", function ($scope, $http, $compile) {
    documentos_asociados = this;
    //documentos_asociados.fixFilters = [];
    documentos_asociados.singular = "Documentos Asociado al Proceso";
    documentos_asociados.plural = "Documentos Asociado al Proceso";
    documentos_asociados.headertitle = "Documentos Asociado al Proceso";
    documentos_asociados.session = new SESSION().current();
    documentos_asociados.directo = !$(".modal").length;
    documentos_asociados.caracteristica = documentos_asociados.session.groups[0].caracteristica;
    documentos_asociados.cantStatus = [];
    documentos_asociados.my_true_estatus = 1;
    documentos_asociados.paso = false;
    if (!documentos_asociados.directo) {
        CRUD_documentos_asociados.table.columns = columns = {
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
            version_documento: {
                label: function () {
                    return "Versión del Documento"
                }
            },
            id: {
                label: function () {
                    return "Código Automático"
                }
            },
            nombre_mapa: {
                label: () => {
                    return "Macroproceso"
                },
                visible: false,
                visibleDetail: true,
            },
            nombre_proceso: {
                label: () => {
                    return "Proceso"
                },
                visible: false,
                visibleDetail: true,
            },
            codigo: {
                label: function () {
                    return "Código Manual"
                },
                format: (row) => {
                    return baseController.COD("Módulo de Calidad -> Documentos", row.id,row.aprobado_en);
                },
                sortable:false
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
            trabaja_marco_legal: {
                label: function () {
                    return "¿Trabaja Marco Legal?"
                },
                format: function (row) {
                    return row.trabaja_marco_legal === 1 ? 'Sí' : 'No'
                },
                shorttext: 360
            },
            marco_legal: {
                label: function () {
                    return "Marco Legal"
                },
                shorttext: 360
            },
            alcance: {shorttext: 360},
            resultado_esperado: {shorttext: 360},
            creado_por_nombre: {
                label: function () {
                    return "Creado Por"
                },
                // visible: false,
                // visibleDetail: false,
                // export: false,
                // exportExample: false,
            },
            creado_en: {
                shorttext: 360,
                label: function () {
                    return "Creado En"
                },
                formattype: ENUM.FORMAT.datetime,
            },
            aprobado_por_nombre: {
                label: function () {
                    return "Aprobado Por"
                }
                // visible: false,
                // visibleDetail: false,
                // export: false,
                // exportExample: false,
            },
            aprobado_en: {
                label: function () {
                    return "Apobado En"
                },
                shorttext: 360,
                formattype: ENUM.FORMAT.datetime,
                // visible: false,
                // visibleDetail: false,
                // export: false,
                // exportExample: false,
            },
            documentos_relacionados: {
                label: function () {
                    return "Documentos Relacionados"
                },
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
        };
    } else {
        CRUD_documentos_asociados.table.columns = columns = {
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
            version_documento: {
                label: function () {
                    return "Versión del Documento"
                }
            },
            id: {
                label: function () {
                    return "Código Automático"
                }
            },
            nombre_mapa: {
                label: () => {
                    return "Macroproceso"
                },
            },
            nombre_proceso: {
                label: () => {
                    return "Proceso"
                }
            },
            codigo: {
                label: function () {
                    return "Código Manual"
                },
                format: (row) => {
                    return baseController.COD("Módulo de Calidad -> Documentos", row.id, row.aprobado_en);
                },
                sortable:false
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
            trabaja_marco_legal: {
                label: function () {
                    return "¿Trabaja Marco Legal?"
                },
                format: function (row) {
                    return row.trabaja_marco_legal === 1 ? 'Sí' : 'No'
                },
                shorttext: 360
            },
            marco_legal: {
                label: function () {
                    return "Marco Legal"
                },
                shorttext: 360
            },
            resultado_esperado: {shorttext: 360},
            creado_por_nombre: {
                label: function () {
                    return "Creado Por"
                },
                // visible: false,
                // visibleDetail: false,
                // export: false,
                // exportExample: false,
            },
            creado_en: {
                shorttext: 360,
                label: function () {
                    return "Creado En"
                },
                formattype: ENUM.FORMAT.datetime,
            },
            aprobado_por_nombre: {
                label: function () {
                    return "Aprobado Por"
                }
                // visible: false,
                // visibleDetail: false,
                // export: false,
                // exportExample: false,
            },
            aprobado_en: {
                label: function () {
                    return "Apobado En"
                },
                shorttext: 360,
                formattype: ENUM.FORMAT.datetime,
                // visible: false,
                // visibleDetail: false,
                // export: false,
                // exportExample: false,
            },
            documentos_relacionados: {
                label: function () {
                    return "Documentos Relacionados"
                },
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
        };
    }
    documentos_asociados.fileSI = [];
    //documentos_asociados.destroyForm = false;
    //documentos_asociados.permissionTable = "tabletopermission";
    RUNCONTROLLER("documentos_asociados", documentos_asociados, $scope, $http, $compile);
    RUN_B("documentos_asociados", documentos_asociados, $scope, $http, $compile);
    documentos_asociados.getMapaProceso = async function (callback) {
        var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value:  documentos_asociados.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  documentos_asociados.session.institucion_id ? "=" : "is",
                    "value":  documentos_asociados.session.institucion_id ?  documentos_asociados.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (mapaData) {
            documentos_asociados.mapa_id = mapaData.id;
            var documentos_confidenciales = await BASEAPI.listp('vw_documentos_confidenciales', {
                limit:0,
                where: [
                    {
                        field: "compania",
                        value:  documentos_asociados.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator":  documentos_asociados.session.institucion_id ? "=" : "is",
                        "value":  documentos_asociados.session.institucion_id ?  documentos_asociados.session.institucion_id : "$null"
                    },
                    {
                        open:"(",
                        field: "rol",
                        operator: "=",
                        value: documentos_asociados.session.groups[0].id,
                        connector: "OR"
                    },
                    {
                        close:")",
                        field: "usuario",
                        operator: "=",
                        value: documentos_asociados.session.id,
                    }
                ]
            });
            documentos_confidenciales = documentos_confidenciales.data;
            const documentos_confidencialesIds = documentos_confidenciales.map(doc => doc.id)
            if (MODAL.history.length > 0) {
                if (typeof dashboard_proceso != "undefined") {
                    if (dashboard_proceso) {
                        if (typeof dashboard_proceso !== 'not defined') {
                            if (!documentos_asociados.paso) {
                                documentos_asociados.fixFilters = [];
                                documentos_asociados.fixFilters = [
                                    {
                                        "field": "documento_estatus",
                                        "value": dashboard_proceso.Mdocumentos
                                    },
                                    {
                                        field: "documento_general",
                                        operator: "is",
                                        value: "$null"
                                    },
                                    {
                                        field: "estatus_id",
                                        operator: "!=",
                                        value: ENUM_2.documentos_estatus.Eliminado
                                    },
                                    {
                                        field: "mapa_proceso",
                                        value: dashboard_proceso.mapa_id ? dashboard_proceso.mapa_id : -1
                                    },
                                    {
                                        field: "es_confidencial",
                                        operator: "is",
                                        value: "$null",
                                        connector: "OR"
                                    },
                                    {
                                        field: CONFIG.mysqlactive ? "id" : "$id::text",
                                        value: documentos_confidencialesIds,
                                    }
                                ];
                                if (dashboard_proceso.session.institucion) {
                                    documentos_asociados.fixFilters.push({
                                        "field": "institucion",
                                        "value": documentos_asociados.session.institucion_id
                                    });
                                    documentos_asociados.fixFilters.push({
                                        "field": "compania",
                                        "value": documentos_asociados.session.compania_id
                                    });
                                } else {
                                    documentos_asociados.fixFilters.push({
                                        "field": "compania",
                                        "value": documentos_asociados.session.compania_id
                                    });
                                    documentos_asociados.fixFilters.push({
                                        "field": "institucion",
                                        "operator": "",
                                        "value": "$ is NULL"
                                    });
                                }
                                documentos_asociados.paso = true;
                            }
                        }
                    }
                }
            }else{
                documentos_asociados.fixFilters = [
                    {
                        field: "compania",
                        value: documentos_asociados.session.compania_id
                    },
                    {
                        field: "documento_general",
                        operator: "is",
                        value: "$null"
                    },
                    {
                        "field": "institucion",
                        "operator": documentos_asociados.session.institucion_id ? "=" : "is",
                        "value": documentos_asociados.session.institucion_id ? documentos_asociados.session.institucion_id : "$null"
                    },
                    {
                        field: "estatus_id",
                        operator: "!=",
                        value: ENUM_2.documentos_estatus.Eliminado
                    },
                    {
                        field: "mapa_proceso",
                        value: documentos_asociados.mapa_id ? documentos_asociados.mapa_id : -1
                    },
                    {
                        field: "es_confidencial",
                        operator: "is",
                        value: "$null",
                        connector: "OR"
                    },
                    {
                        field: CONFIG.mysqlactive ? "id" : "$BASE.id::text",
                        value: documentos_confidencialesIds,
                    }
                ];
            }
        }else{
            documentos_asociados.fixFilters = [
                {
                    field: "compania",
                    value:  documentos_asociados.session.compania_id
                },
                {
                    field: "documento_general",
                    operator: "is",
                    value: "$null"
                },
                {
                    "field": "institucion",
                    "operator":  documentos_asociados.session.institucion_id ? "=" : "is",
                    "value":  documentos_asociados.session.institucion_id ?  documentos_asociados.session.institucion_id : "$null"
                },
                {
                    "field": "estatus_id",
                    "operator": "!=",
                    "value": ENUM_2.documentos_estatus.Eliminado
                },
                {
                    field: "mapa_proceso",
                    value:  -1
                }
            ];
        }
        documentos_asociados.refresh();
        if (callback)
            callback();
    }
    documentos_asociados.getMapaProceso();
    documentos_asociados.formulary = async function (data, mode, defaultData, view) {
        if (documentos_asociados !== undefined) {
            RUN_B("documentos_asociados", documentos_asociados, $scope, $http, $compile);
            documentos_asociados.form.modalWidth = ENUM.modal.width.full;
            documentos_asociados.form.readonly = {active: 1};
            if (typeof procesos !== 'undefined') {
                if (typeof procesos !== 'not defined') {
                    if (procesos) {
                        documentos_asociados.form.titles = {
                            new: 'Agregar Documento del Proceso: "' + procesos.nombre + '"',
                        };
                    }
                }
            }
            documentos_asociados.firststatus = await BASEAPI.firstp('auditoria_programa_plan_estatus', {
                order: "asc",
                where: [
                    {
                        field: "entidad",
                        value: 2
                    },
                    {
                        field: "code",
                        value: 1
                    }
                ]
            });
            documentos_asociados.createForm(data, mode, defaultData, view);
            documentos_asociados.documentos_creados = await BASEAPI.listp('vw_documentos_asociados', {
                limit: 0,
                "where": [
                    {
                        "field": "compania",
                        "value": documentos_asociados.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator": documentos_asociados.session.institucion_id ? "=" : "is",
                        "value": documentos_asociados.session.institucion_id ? documentos_asociados.session.institucion_id : "$null"
                    },
                    {
                        field: "mapa_proceso",
                        value: documentos_asociados.mapa_id ? documentos_asociados.mapa_id: -1
                    }
                ]
            });
            documentos_asociados.documentos_creados = documentos_asociados.documentos_creados.data;
            var do_me_once = false;
            documentos_asociados.selectQueries['estatus'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: documentos_asociados.session.groups[0].id
                }
            ];
            if (documentos_asociados.directo) {
                $scope.$watch("documentos_asociados.procesos_categoria", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(documentos_asociados, 'procesos_categoria', rules);
                });
                $scope.$watch("documentos_asociados.proceso", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(documentos_asociados, 'proceso', rules);
                });
            }
            $scope.$watch("documentos_asociados.codigo", async function (value) {
                var rules = [];
                //rules here
                var result;
                if (documentos_asociados.form.mode == "edit"){
                    result = documentos_asociados.documentos_creados.filter(d=> {
                        return d.codigo == value && d.id != documentos_asociados.id;
                    })[0];
                }else{
                    result = documentos_asociados.documentos_creados.filter(d=> {
                        return d.codigo == value;
                    })[0];
                }
                console.log(result)
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.duplicateCode(value, result ? result.codigo : ""));
                VALIDATION.validate(documentos_asociados, 'codigo', rules);
            });
            $scope.$watch("documentos_asociados.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_asociados, 'nombre', rules);
            });
            $scope.$watch("documentos_asociados.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_asociados, 'descripcion', rules);
            });
            $scope.$watch("documentos_asociados.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_asociados, 'tempid', rules);
            });
            $scope.$watch("documentos_asociados.tipo_documento", function (value) {
                var rules = [];
                //rules here
                if (value) {
                    if (documentos_asociados.form.selected('tipo_documento')) {
                        documentos_asociados.show_actividades = documentos_asociados.form.selected('tipo_documento').trabaja_actividades === 1;
                    }
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_asociados, 'tipo_documento', rules);
            });
            $scope.$watch("documentos_asociados.objetivo", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(documentos_asociados, 'objetivo', rules);
            });
            $scope.$watch("documentos_asociados.alcance", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(documentos_asociados, 'alcance', rules);
            });
            // $scope.$watch("documentos_asociados.responsabilidad", function (value) {
            //     var rules = [];
            //     //rules here
            //     rules.push(VALIDATION.general.required(value));
            //     rules.push(VALIDATION.yariel.maliciousCode(value));
            //     VALIDATION.validate(documentos_asociados, 'responsabilidad', rules);
            // });
            $scope.$watch("documentos_asociados.resultado_esperado", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(documentos_asociados, 'resultado_esperado', rules);
            });

            $scope.$watch("documentos_asociados.marco_legal", function (value) {
                var rules = [];
                //rules here
                if (documentos_asociados.marco_required) {
                    rules.push(VALIDATION.general.required(value));
                }
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(documentos_asociados, 'marco_legal', rules);
            });
        }
        documentos_asociados.triggers.table.after.open = function (data) {
            if (mode === 'new') {
                if (documentos_asociados.id)
                    delete documentos_asociados.id
            }
        };
        documentos_asociados.triggers.table.after.control = function (data) {
            if (data === "tipo_documento") {
                if (documentos_asociados.form.selected('tipo_documento')) {
                    documentos_asociados.show_actividades = documentos_asociados.form.selected('tipo_documento').trabaja_actividades === 1;
                }
            }
            if (data === "estatus" && !do_me_once) {
                documentos_asociados.form.loadDropDown('estatus')
                do_me_once = true;
            }
            //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        };
    };
    documentos_asociados.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        documentos_asociados.runMagicManyToMany('documentos_relacionados', 'documentos_asociados',
            'documento_asociado', 'id', 'nombre', 'documentos_asociados_relacionado',
            'documento_asociado_relacionado', 'id');
        documentos_asociados.fileSI = [];
        for (var items of records.data) {
            documentos_asociados.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/documentos_asociados/documento_asociadofile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        documentos_asociados.fileSI.push({id: items.id});
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
            await documentos_asociados.files();
            documentos_asociados.refreshAngular();
        }
        documentos_asociados.setPermission("add", false);
    };
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // documentos_asociados.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    documentos_asociados.afterclosing = false;
    documentos_asociados.triggers.table.after.close = function (data) {
        if (documentos_asociados.afterclosing)
            setTimeout(function () {

                if (typeof documental !== "undefined") {
                    SWEETALERT.loading({message: "Refrescando Repositorio"});
                    if (!$(".modal").length)
                        location.reload();
                }
            }, 200);
        documentos_asociados.refresh();
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
    documentos_asociados.custom_close = async function () {
        if (documentos_asociados.form.mode == "edit" && !documentos_asociados.documento_asociadofile_DragonCountFile) {
            SWEETALERT.show({type: 'error', message: "Antes de GUARDAR el registro debe subir la imagen del nuevo documento a ser creado"});
        } else {
            documentos_asociados.pages.form.close();
        }
    }
    documentos_asociados.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        if (!documentos_asociados.documento_asociadofile_DragonCountFile) {
            SWEETALERT.show({type: 'error', message: "Antes de GUARDAR el registro debe subir la imagen del nuevo documento a ser creado"});
            resolve(false);
        } else {
            if (typeof procesos_categoria !== "undefined")
                if (procesos_categoria)
                    if (procesos_categoria.id)
                        data.inserting.procesos_categoria = procesos_categoria.id;
            data.inserting.estatus = 1;
            data.inserting.creado_por = documentos_asociados.session.usuario_id;
            data.inserting.creado_en = moment().format("YYYY-MM-DD HH:mm:ss");
            resolve(true);
        }
    });
    documentos_asociados.check_estatus = function () {
        if (!DSON.oseaX(documentos_asociados.form.selected('estatus'))) {
            return documentos_asociados.form.selected('estatus').id == 2;
        } else {
            return false;
        }
    }
    //
    documentos_asociados.triggers.table.after.update = function (data) {
        //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        let titulo_push="";
        let cuerpo_push="";
        let titulo= "";
        let cuerpo="";
        let cuerpo2 = "";
        if (data.updating.estatus == 2){
            titulo_push = `El documento "${data.updating.nombre}" ha sido Autorizado.`;
            cuerpo_push = `El documento "${data.updating.nombre}" ha sido Autorizado.`;
            titulo = `El documento "${data.updating.nombre}" ha sido Autorizado`
            cuerpo = `Ha sido Autorizado por ${ documentos_asociados.session.fullName() }.`;
            cuerpo2 = "Gracias.";
            function_send_email_custom_group_res_list(titulo_push, cuerpo_push, titulo, cuerpo, documentos_asociados.session.compania_id, documentos_asociados.session.institucion_id, documentos_asociados.solicitante, 18, 4, null, cuerpo2);
        }else if (data.updating.estatus == 3){
            titulo_push = `El documento "${data.updating.nombre}" ha sido Elaborado.`;
            cuerpo_push = `Uno de los supervisores de calidad deben proceder a Revisar y Autorizar el mismo.`;
            titulo = `El documento "${data.updating.nombre}" ha sido Elaborado.`
            cuerpo = `Ha sido Elaborado por ${documentos_asociados.session.fullName()}. 

Un supervisor de calidad debe proceder a Revisar y Autorizar la creación de dicho Documento. Los supervisores de calidad son :`;
            cuerpo2 = "Gracias.";
            function_send_email_custom_group_res_list(titulo_push, cuerpo_push, titulo, cuerpo, documentos_asociados.session.compania_id, documentos_asociados.session.institucion_id, documentos_asociados.solicitante, 18, 4, 18, cuerpo2);
        }
    };
    // documentos_asociados.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    //
    // };
    documentos_asociados.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        if (!documentos_asociados.trabaja_marco_legal){
            data.updating.marco_legal = "";
        }
        if (!documentos_asociados.es_confidencial){
            data.relations[1].data = [];
            data.relations[2].data = [];
        }
        if (!documentos_asociados.documento_asociadofile_DragonCountFile) {
            SWEETALERT.show({type: 'error', message: "Antes de GUARDAR el registro debe subir la imagen del nuevo documento a ser creado"});
            resolve(false);
        } else {
            if (documentos_asociados.estatus == 2) {
                data.updating.folder = documentos_asociados.form.selected('procesos_categoria').nombre + "/" + documentos_asociados.form.selected('proceso').nombre + "/" + documentos_asociados.form.selected('tipo_documento').nombre;
                data.updating.aprobado_por = documentos_asociados.session.usuario_id;
                data.updating.aprobado_en = moment().format("YYYY-MM-DD HH:mm:ss");
                BASEAPI.first('documental', {
                    where: [
                        {
                            field: "nombre",
                            value: documentos_asociados.form.selected('procesos_categoria').nombre
                        },
                        {
                            field: "compania",
                            value: documentos_asociados.session.compania_id
                        }
                    ]
                }, function (first_categoria) {
                    if (!first_categoria) {
                        BASEAPI.insertID('documental', {
                            nombre: documentos_asociados.form.selected('procesos_categoria').nombre,
                            root: "/",
                            created: moment().format('YYYY-MM-DD H:mm:ss'),
                            created_by: documentos_asociados.session.usuario_id,
                            compania: documentos_asociados.session.compania_id,
                            type: 1
                        }, "", "", function (result_categoria) {

                        })
                    }
                });
                BASEAPI.first('documental', {
                    where: [
                        {
                            field: "nombre",
                            value: documentos_asociados.form.selected('proceso').nombre
                        },
                        {
                            field: "root",
                            value: documentos_asociados.form.selected('procesos_categoria').nombre
                        },
                        {
                            field: "compania",
                            value: documentos_asociados.session.compania_id
                        }
                    ]
                }, function (first_proceso) {
                    if (!first_proceso) {
                        BASEAPI.insertID('documental', {
                            nombre: documentos_asociados.form.selected('proceso').nombre,
                            root: documentos_asociados.form.selected('procesos_categoria').nombre,
                            created: moment().format('YYYY-MM-DD H:mm:ss'),
                            created_by: documentos_asociados.session.usuario_id,
                            compania: documentos_asociados.session.compania_id,
                            type: 1
                        }, "", "", function (result_proceso) {
                            if (result_proceso) {

                            }
                        })
                    }
                });
                BASEAPI.first('documental', {
                    where: [
                        {
                            field: "nombre",
                            value: documentos_asociados.form.selected('tipo_documento').nombre
                        },
                        {
                            field: "root",
                            value: documentos_asociados.form.selected('procesos_categoria').nombre + "/" + documentos_asociados.form.selected('proceso').nombre
                        },
                        {
                            field: "compania",
                            value: documentos_asociados.session.compania_id
                        }
                    ]
                }, function (first_tipo_documento) {
                    if (!first_tipo_documento) {
                        BASEAPI.insertID('documental', {
                            nombre: documentos_asociados.form.selected('tipo_documento').nombre,
                            root: documentos_asociados.form.selected('procesos_categoria').nombre + "/" + documentos_asociados.form.selected('proceso').nombre,
                            created: moment().format('YYYY-MM-DD H:mm:ss'),
                            created_by: documentos_asociados.session.usuario_id,
                            compania: documentos_asociados.session.compania_id,
                            type: 1
                        }, "", "", function (result_tipo_documento) {

                        })
                    }
                });
            }
            resolve(true);
        }
    });
    //
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    documentos_asociados.afterDelete = async function (data) {
        if (typeof procesos != "undefined") {
            if (procesos) {
                if (typeof procesos !== 'not defined') {
                    if (procesos.form.mode == 'edit') {
                        procesos.documentos = await BASEAPI.listp('documentos_asociados', {
                            limit: 0,
                            where: [
                                {
                                    field: "proceso",
                                    value: procesos.id
                                }
                            ]
                        })
                        procesos.documentos = procesos.documentos.data;
                    }
                }
            }
        }
    };
    documentos_asociados.verFile = function (key, value, row) {
        if (key != "archivo")
            return;

        documentos_asociados.setPermission("file.upload", false);
        documentos_asociados.setPermission("file.remove", false);
        if (typeof documentos_asociados !== 'null') {
            if (documentos_asociados) {
                var info = documentos_asociados.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/documentos_asociados/documento_asociadofile/" + row.id, row);
                    documentos_asociados.showfiletypes = function () {
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
                        documentos_asociados.modal.modalView("templates/components/filetype", modal);
                    };
                    baseController.viewData = {
                        root: root,
                        scope: 'actividades_poa_monitoreo',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    documentos_asociados.modal.modalView("templates/components/gallery", {
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
    documentos_asociados.check_if_exists = function (item) {
        if (documentos_asociados.roles_permitidos.length > 0){
            return documentos_asociados.roles_permitidos.includes(String(item.profile));
        }else{
            return true
        }
    }
});
