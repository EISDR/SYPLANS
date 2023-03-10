app.controller("procesos", function ($scope, $http, $compile) {
    ready = async () => {
        procesos = this;
        //procesos.fixFilters = [];
        procesos.session = new SESSION().current();
        procesos.singular = "singular";
        procesos.plural = "plural";
        procesos.headertitle = "Procesos";
        procesos.fileSI = [];
        procesos.paso = false;
        procesos.directo = !$(".modal").length;
        procesos.my_true_estatus = 1;
        //procesos.destroyForm = false;
        //procesos.permissionTable = "tabletopermission";
        procesos.getMapaProceso = async function (callback) {
            var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
                order: "desc",
                where: [
                    {
                        field: "compania",
                        value: procesos.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator": procesos.session.institucion_id ? "=" : "is",
                        "value": procesos.session.institucion_id ? procesos.session.institucion_id : "$null"
                    },
                    {
                        field: "estatus",
                        operator: "!=",
                        value: 4
                    }
                ]
            });
            if (mapaData) {
                procesos.mapa_id = mapaData.id;
                if (MODAL.history.length > 0) {
                    if (typeof dashboard_proceso != "undefined") {
                        if (dashboard_proceso) {
                            if (typeof dashboard_proceso !== 'not defined') {
                                if (!procesos.paso) {
                                    procesos.fixFilters = [];
                                    procesos.fixFilters = [
                                        {
                                            "field": "estatus",
                                            "value": dashboard_proceso.Mprocesos
                                        },
                                        {
                                            "field": "estatus_id",
                                            "operator": "!=",
                                            "value": 4
                                        },
                                        {
                                            field: "mapa_proceso",
                                            value: dashboard_proceso.mapa_id ? dashboard_proceso.mapa_id : -1
                                        }
                                    ];
                                    if (dashboard_proceso.session.institucion) {
                                        procesos.fixFilters.push({
                                            "field": "institucion",
                                            "value": dashboard_proceso.session.institucion_id
                                        });
                                        procesos.fixFilters.push({
                                            "field": "compania",
                                            "value": dashboard_proceso.session.compania_id
                                        });
                                    } else {
                                        procesos.fixFilters.push({
                                            "field": "compania",
                                            "value": dashboard_proceso.session.compania_id
                                        });
                                        procesos.fixFilters.push({
                                            "field": "institucion",
                                            "operator": "is",
                                            "value": "$null"
                                        });
                                    }
                                    procesos.paso = true;
                                }
                            }
                        }
                    }
                } else {
                    procesos.fixFilters = [
                        {
                            field: "compania",
                            value: procesos.session.compania_id
                        },
                        {
                            "field": "institucion",
                            "operator": procesos.session.institucion_id ? "=" : "is",
                            "value": procesos.session.institucion_id ? procesos.session.institucion_id : "$null"
                        },
                        {
                            "field": "estatus_id",
                            "operator": "!=",
                            "value": 4
                        },
                        {
                            field: "mapa_proceso",
                            value: procesos.mapa_id ? procesos.mapa_id : -1
                        }
                    ];
                }
            } else {
                procesos.fixFilters = [
                    {
                        field: "compania",
                        value: procesos.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator": procesos.session.institucion_id ? "=" : "is",
                        "value": procesos.session.institucion_id ? procesos.session.institucion_id : "$null"
                    },
                    {
                        "field": "estatus_id",
                        "operator": "!=",
                        "value": 4
                    },
                    {
                        field: "mapa_proceso",
                        value: -1
                    }
                ];
            }
            if (callback)
                callback();
        }
        procesos.get_estatus_nombre = async function () {
            procesos.nombre_estatus_plan = await BASEAPI.listp('auditoria_programa_plan_estatus', {
                limit: 0,
                orderby: "code",
                order: "asc",
                where: [
                    {
                        field: "entidad",
                        value: 1
                    }
                ]
            });
        }
        await procesos.getMapaProceso();
        await procesos.get_estatus_nombre();
        if (!procesos.directo) {
            CRUD_procesos.table.columns = columns = {
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
                codigor: {
                    label: function () {
                        return "Código"
                    },
                    format: (row) => {
                        return baseController.COD("Módulo de Calidad -> Procesos", row.id, row.fecha_solicitud);
                    },
                    sortable: false
                },
                nombre: {
                    label: function () {
                        return "Nombre del Proceso"
                    },
                },
                descripcion: {shorttext: 360},
                responsable_nombre: {
                    label: function () {
                        return "Responsable";
                    }
                },
                estatus: {
                    label: function () {
                        return "Estado";
                    }
                },
                objetivo: {
                    label: function () {
                        return "Objetivos"
                    },
                    shorttext: 360
                },
                alcance: {
                    label: function () {
                        return "Alcance"
                    },
                    shorttext: 360
                },
                recursos: {
                    label: function () {
                        return "Recursos (Humanos, Tecnológicos, etc)"
                    },
                    shorttext: 360
                },
                archivo: {
                    label: function () {
                        return "Imagen Adjunta"
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
                        if (typeof procesos !== 'null') {
                            if (procesos) {
                                var info = procesos.fileSI.filter(data => {
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
                doc_asoc: {
                    label: function () {
                        return "Documentos Asociados"
                    },
                    export: false,
                    exportExample: false,
                    shorttext: 360,
                },
                doc_asoc_exp: {
                    label: function () {
                        return "Documentos Asociados"
                    },
                    visible: false,
                    visibleDetail: false,
                    export: true,
                    exportExample: true,
                    checkExport: true,
                    dead: true
                }
            };
        } else {
            CRUD_procesos.table.columns = columns = {
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
                    visibleDetail: true,
                    export: false,
                    exportExample: false,
                    dead: true
                },

                nombre_mapa: {
                    label: () => {
                        return "Mapa de Proceso"
                    },
                },
                procesos_categoria_nombre: {
                    label: () => {
                        return "Macroproceso"
                    },
                },
                codigor: {
                    label: function () {
                        return "Código"
                    },
                    format: (row) => {
                        return baseController.COD("Módulo de Calidad -> Procesos", row.id, row.fecha_solicitud);
                    },
                    sortable: false
                },
                nombre: {
                    label: function () {
                        return "Nombre del Proceso"
                    },
                },
                descripcion: {shorttext: 360},
                estatus: {shorttext: 360},
                objetivo: {
                    label: function () {
                        return "Objetivo"
                    },
                    shorttext: 360,
                    // visible: false,
                    // visibleDetail: false,
                    // export: false,
                    // exportExample: false,
                },
                alcance: {
                    label: function () {
                        return "Alcance"
                    },
                    shorttext: 360,
                },
                responsable_nombre: {
                    label: function () {
                        return "Responsable"
                    }
                },
                recursos: {
                    label: function () {
                        return "Recursos (Humanos, Tecnológicos, etc)"
                    },
                    shorttext: 360
                },
                archivo: {
                    label: function () {
                        return "Imagen Adjunta"
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
                        if (typeof procesos !== 'null') {
                            if (procesos) {
                                var info = procesos.fileSI.filter(data => {
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
                doc_asoc: {
                    label: function () {
                        return "Documentos Asociados"
                    },
                    export: false,
                    exportExample: false,
                    shorttext: 360,
                },
                doc_asoc_exp: {
                    label: function () {
                        return "Documentos Asociados"
                    },
                    visible: false,
                    visibleDetail: false,
                    export: true,
                    exportExample: true,
                    checkExport: true,
                    dead: true
                }
            };
        }
        RUNCONTROLLER("procesos", procesos, $scope, $http, $compile);
        procesos.formulary = async function (data, mode, defaultData) {
            if (procesos !== undefined) {
                RUN_B("procesos", procesos, $scope, $http, $compile);
                procesos.form.modalWidth = ENUM.modal.width.full;
                procesos.form.readonly = {active: 1};
                procesos.firststatus = await BASEAPI.firstp('auditoria_programa_plan_estatus', {
                    order: "asc",
                    where: [
                        {
                            field: "entidad",
                            value: 3
                        },
                        {
                            field: "code",
                            value: 1
                        }
                    ]
                });
                procesos.createForm(data, mode, defaultData);
                procesos.selectQueries['estatus'] = [
                    {
                        field: 'rol',
                        operator: '=',
                        value: procesos.session.groups[0].id
                    }
                ];
                $scope.$watch("procesos.nombre", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(procesos, 'nombre', rules);
                });
                $scope.$watch("procesos.descripcion", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(procesos, 'descripcion', rules);
                });
                $scope.$watch("procesos.objetivo", function (value) {
                    var rules = [];
                    //rules here
                    // rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(procesos, 'objetivo', rules);
                });
                $scope.$watch("procesos.recursos", function (value) {
                    var rules = [];
                    //rules here
                    // rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(procesos, 'recursos', rules);
                });
                $scope.$watch("procesos.alcance", function (value) {
                    var rules = [];
                    //rules here
                    // rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(procesos, 'alcance', rules);
                });
                $scope.$watch("procesos.responsable", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(procesos, 'responsable', rules);
                });
                if (procesos.directo) {
                    $scope.$watch("procesos.procesos_categoria", function (value) {
                        var rules = [];
                        //rules here
                        rules.push(VALIDATION.general.required(value));
                        VALIDATION.validate(procesos, 'procesos_categoria', rules);
                    });
                    $scope.$watch("procesos.mapa_proceso", function (value) {
                        var rules = [];
                        //rules here
                        rules.push(VALIDATION.general.required(value));
                        VALIDATION.validate(procesos, 'mapa_proceso', rules);
                    });
                }
            }
            procesos.triggers.table.after.open = async function (data) {
                if (mode === 'new') {
                    if (procesos.id)
                        delete procesos.id

                }
                if (mode === 'edit') {
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
            };

        };
        RUNTABLE("procesos");
        procesos.triggers.table.after.load = async function (records) {
            //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
            procesos.fileSI = [];
            procesos.runMagicOneToMany('doc_asoc', 'vw_documentos_asociados', 'proceso', 'nombre', 'id');
            procesos.setPermission("add", false);
            for (var items of records.data) {
                procesos.files = () => new Promise(async (resolve, reject) => {
                    BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/procesos/procesofile/' + items.id}, function (result) {
                        if (result.data.count > 0) {
                            procesos.fileSI.push({id: items.id});
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
                await procesos.files();

                procesos.refreshAngular();
            }
        };
        // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
        //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
        //     resolve(true);
        // });
        //
        // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
        //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
        //     resolve(true);
        // });
        //
        procesos.triggers.table.after.close = function (data) {
            //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
            procesos.refresh();
        };
        // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
        //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
        //     resolve(true);
        // });
        //
        // procesos.triggers.table.after.insert = function (data) {
        //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        //     if(data.inserting.estatus == 2){
        //
        //     }
        //     return true;
        // };
        procesos.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
            if (typeof procesos_categoria !== "undefined")
                if (procesos_categoria)
                    if (procesos_categoria.mapa_id)
                        data.inserting.mapa_proceso = procesos_categoria.mapa_id;
            data.inserting.estatus = 1;
            resolve(true);
        });
        //
        procesos.triggers.table.after.update = function (data) {
            //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
            let titulo_push = "";
            let cuerpo_push = "";
            let titulo = "";
            let cuerpo = "";
            let cuerpo2 = "";
            if (data.updating.estatus == 3) {
                titulo_push = `El proceso "${data.updating.nombre}" ha sido Autorizado.`;
                cuerpo_push = `El proceso "${data.updating.nombre}" ha sido Autorizado.`;
                titulo = `El proceso "${data.updating.nombre}" ha sido Autorizado`
                cuerpo = `Ha sido Autorizado por ${procesos.session.fullName()}.`;
                cuerpo2 = "Gracias.";
                BASEAPI.insertID('documentos_asociados', {
                    proceso: procesos.id || "$null",
                    procesos_categoria: procesos.procesos_categoria || "$null",
                    codigo: ("DOC_ISO_PRO-" + procesos.id) || "$null",
                    nombre: `Norma ISO (${procesos.nombre})` || "$null",
                    objetivo: "$null",
                    alcance: "$null",
                    trabaja_marco_legal: "$null",
                    marco_legal: "$null",
                    resultado_esperado: "$null",
                    tipo_documento: "$null",
                    estatus: 2,
                    active: 1,
                    creado_en: moment().format('YYYY-MM-DD hh:mm:ss'),
                    creado_por: procesos.session.id,
                    documento_general: 1
                }, '', '', function (result) {

                });
                function_send_email_custom_group_res_list(titulo_push, cuerpo_push, titulo, cuerpo, procesos.session.compania_id, procesos.session.institucion_id, procesos.solicitante, 18, 4, null, cuerpo2);
            } else if (data.updating.estatus == 2) {
                titulo_push = `El proceso "${data.updating.nombre}" ha sido Elaborado.`;
                cuerpo_push = `Uno de los supervisores de calidad deben proceder a Revisar y Autorizar el mismo.`;
                titulo = `El proceso "${data.updating.nombre}" ha sido Elaborado.`
                cuerpo = `Ha sido Elaborado por ${procesos.session.fullName()}. 

Un supervisor de calidad debe proceder a Revisar y Autorizar la creación de dicho Proceso. Los supervisores de calidad son :`;
                cuerpo2 = "Gracias.";
                function_send_email_custom_group_res_list(titulo_push, cuerpo_push, titulo, cuerpo, procesos.session.compania_id, procesos.session.institucion_id, procesos.solicitante, 18, 4, 18, cuerpo2);
            }
        };
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
        procesos.verFile = function (key, value, row) {
            if (key != "archivo")
                return;

            procesos.setPermission("file.upload", false);
            procesos.setPermission("file.remove", false);
            // if (row.estatus_actividad == ENUM_2.actividad_poa_estatus.Completada || row.estatus_actividad == ENUM_2.actividad_poa_estatus.Cancelada) {
            //     actividades_poa_monitoreo.setPermission("file.upload", false);
            //     actividades_poa_monitoreo.setPermission("file.remove", false);
            // } else {
            //     actividades_poa_monitoreo.setPermission("file.upload", true);
            //     actividades_poa_monitoreo.setPermission("file.remove", true);
            // }
            if (typeof procesos !== 'null') {
                if (procesos) {
                    var info = procesos.fileSI.filter(data2 => {
                        return data2.id == row.id;
                    });
                    if (info.length) {
                        var root = DSON.template("/procesos/procesofile/" + row.id, row);
                        procesos.showfiletypes = function () {
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
                            actividades_poa_monitoreo.modal.modalView("templates/components/filetype", modal);
                        }
                        baseController.viewData = {
                            root: root,
                            scope: 'actividades_poa_monitoreo',
                            maxsize: 20,
                            maxfiles: 1,
                            acceptedFiles: null,
                            columns: 4,
                        };

                        procesos.modal.modalView("templates/components/gallery", {
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
        procesos.allow_auth = function (estatus) {
            if (procesos.allowAction("Autorizar", "procesos", estatus)) {
                var documentos_autorizados = procesos.documentos.filter(d => {
                    return d.estatus == 2;
                })
                if (procesos.documentos.length > 0) {
                    return documentos_autorizados.length === procesos.documentos.length;
                } else {
                    return false
                }
            } else {
                return true;
            }
        }
    }
    ready();
});
