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
        procesos.show_diagram = true;
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
                recursos_n: {
                    label: function () {
                        return "Recursos (Humanos, Tecnológicos, etc)"
                    },
                    shorttext: 360
                },
                // proceso_padre_nombre: {
                //     label: function () {
                //         return "Proceso Padre"
                //     },
                //     shorttext: 360
                // },
                proceso_entrada: {
                    label: function () {
                        return "Procesos de Entrada"
                    },
                    shorttext: 360
                },
                proceso_salida: {
                    label: function () {
                        return "Proceso de Salida"
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
            if (typeof procesos_categoria != "undefined") {
                if (procesos_categoria) {
                    if (typeof procesos_categoria !== 'not defined') {
                        procesos.fixFilters = [
                            {
                                "field": "estatus_id",
                                "operator": "!=",
                                "value": 4
                            },
                        ]
                    }
                }
            }
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
                recursos_n: {
                    label: function () {
                        return "Recursos (Humanos, Tecnológicos, etc)"
                    },
                    shorttext: 360
                },
                // proceso_padre_nombre: {
                //     label: function () {
                //         return "Proceso Padre"
                //     },
                //     shorttext: 360
                // },
                proceso_entrada: {
                    label: function () {
                        return "Procesos de Entrada"
                    },
                    shorttext: 360
                },
                proceso_salida: {
                    label: function () {
                        return "Proceso de Salida"
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
                $scope.$watch("procesos.unidad_tiempo", function (value) {
                    var rules = [];
                    //rules here
                    // rules.push(VALIDATION.general.required(value));
                    if(procesos.form.selected('unidad_tiempo')){
                        setTimeout(function (){
                            procesos.tiempo_ejecucion = "";
                            procesos.refreshAngular();
                        },10)
                    }
                    VALIDATION.validate(procesos, 'unidad_tiempo', rules);
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
            procesos.runMagicOneToMany('doc_asoc', 'vw_documentos_asociados_mp', 'proceso', 'nombre', 'id');
            procesos.runMagicOneToMany('recursos_n', 'vw_recursos', 'proceso', 'tipo_descripcion', 'id');
            procesos.runMagicManyToMany('proceso_entrada', 'procesos',
                'proceso', 'id', 'nombre', 'procesos_entrada',
                'proceso_entrada', 'id');
            procesos.runMagicManyToMany('proceso_salida', 'procesos',
                'proceso', 'id', 'nombre', 'procesos_salida',
                'proceso_salida', 'id');
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
        procesos.downloadDiagram = () => {
            let image = procesos.myDiagram.makeImage({
                scale: 1
            });
            var a = document.createElement("a"); //Create <a>
            a.href = image.src; //Image Base64 Goes here
            a.download = "Flujo de Trabajo - Procesos.png";
            a.click();
        };
        procesos.diagram = () => {
            procesos.modal.modalView("procesos/diagram", {
                width: 'modal-full',
                header: {
                    title: "Vista del Flujo de Trabajo",
                    icon: "icon-repo-forked"
                },
                footer: {
                    cancelButton: false
                },
                content: {
                    loadingContentText: MESSAGE.i('actions.Loading'),
                    sameController: 'procesos',
                },
                event: {
                    show: {
                        end: async function (data) {
                            SWEETALERT.loading({message: "Cargando Diagrama"});
                            procesos.statusList = await BASEAPI.listp('vw_modulo_estatus', {
                                limit: 0,
                                orderby: "entidad",
                                order: "asc",
                                where: [
                                    {
                                        "field": "entidad",
                                        "value": "Procesos"
                                    }
                                ]
                            });
                            procesos.statusList = procesos.statusList.data;
                            setTimeout(async function () {
                                const $$$ = go.GraphObject.make;
                                let statusList = procesos.statusList;
                                let thejson = {
                                    class: "go.GraphLinksModel",
                                    "nodeKeyProperty": "id",
                                    "nodeDataArray": [],
                                    "linkDataArray": []
                                };

                                statusList.forEach((d) => {
                                    let item = {
                                        "id": d.id,
                                        "text": d.nombre
                                    };
                                    thejson.nodeDataArray.push(item);
                                });

                                statusList?.forEach((d) => {
                                    let uniq = a => [...new Set(a)];
                                    let posteriores = uniq(eval(d.estatus_posterior));

                                    posteriores?.forEach((e) => {
                                        let posterior = statusList.filter(f => f.id === e)[0];
                                        if (posterior) {
                                            let isprogress = true;
                                            let item = {
                                                "from": d.id,
                                                "to": e,
                                                "progress": isprogress,
                                                "text": posterior.action
                                            };
                                            thejson.linkDataArray.push(item);
                                        }
                                    });
                                });

                                procesos.myDiagram = new go.Diagram(
                                    'myDiagramDiv', // must name or refer to the DIV HTML element
                                    {
                                        'animationManager.initialAnimationStyle': go.AnimationStyle.None,
                                        InitialAnimationStarting: (e) => {
                                            var animation = e.subject.defaultAnimation;
                                            animation.easing = go.Animation.EaseOutExpo;
                                            animation.duration = 800;
                                            animation.add(e.diagram, 'scale', 0.3, 1);
                                            animation.add(e.diagram, 'opacity', 0, 1);
                                        },

                                        // have mouse wheel events zoom in and out instead of scroll up and down
                                        'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
                                        // support double-click in background creating a new node
                                        'clickCreatingTool.archetypeNodeData': {text: 'new node'},
                                        // enable undo & redo
                                        'undoManager.isEnabled': true,
                                        layout: new go.LayeredDigraphLayout({
                                            layerSpacing: 100,
                                            columnSpacing: 100,
                                            direction: 0,
                                            setsPortSpot: false,
                                            setsChildPortSpot: false,
                                            arrangement: go.TreeArrangement.Horizontal,
                                        }),
                                    }
                                );
                                const colors = {
                                    pink: '#facbcb',
                                    blue: '#b7d8f7',
                                    green: '#b9e1c8',
                                    yellow: '#faeb98',
                                    background: '#e8e8e8',
                                };
                                procesos.myDiagram.div.style.backgroundColor = colors.background;
                                procesos.myDiagram.nodeTemplate = new go.Node('Auto', {
                                    isShadowed: true,
                                    shadowBlur: 0,
                                    shadowOffset: new go.Point(5, 5),
                                    shadowColor: 'black',
                                }).bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify).add(
                                    new go.Shape('RoundedRectangle', {
                                        strokeWidth: 1.5,
                                        fill: colors.blue,
                                    }).bind('fill', 'type', (type) => {
                                        if (type === 'Start') return colors.green;
                                        if (type === 'End') return colors.pink;
                                        return colors.blue;
                                    }).bind('figure', 'type', (type) => {
                                        return 'RoundedRectangle';
                                    }),
                                    new go.TextBlock({
                                        shadowVisible: false,
                                        margin: 8,
                                        font: 'bold 14px sans-serif',
                                        stroke: '#333',
                                    }).bind('text')
                                );

                                // replace the default Link template in the linkTemplateMap
                                procesos.myDiagram.linkTemplate = new go.Link(
                                    {
                                        isShadowed: true,
                                        shadowBlur: 0,
                                        shadowColor: 'black',
                                        shadowOffset: new go.Point(2.5, 2.5),
                                        curve: go.Curve.Bezier,
                                        curviness: 40,
                                        adjusting: go.LinkAdjusting.Stretch,
                                        reshapable: true,
                                        relinkableFrom: true,
                                        relinkableTo: true,
                                        fromShortLength: 8,
                                        toShortLength: 10,
                                    }).bindTwoWay('points').bind('curviness').add(
                                    new go.Shape({strokeWidth: 2, shadowVisible: false, stroke: 'black'})
                                        .bind('strokeDashArray', 'progress', (progress) => (progress ? [] : [5, 6]))
                                        .bind('opacity', 'progress', (progress) => (progress ? 1 : 0.5)),
                                    new go.Shape({
                                        fromArrow: 'circle',
                                        strokeWidth: 1.5,
                                        fill: 'white'
                                    }).bind('opacity', 'progress', (progress) => (progress ? 1 : 0.5)),
                                    new go.Shape({
                                        toArrow: 'standard',
                                        stroke: null,
                                        scale: 1.5,
                                        fill: 'black'
                                    }).bind('opacity', 'progress', (progress) => (progress ? 1 : 0.5))
                                );


                                // read in the JSON data from the "mySavedModel" element
                                procesos.myDiagram.model = go.Model.fromJson(JSON.stringify(thejson));
                                SWEETALERT.stop();
                            }, 1000)
                        }
                    }
                }
            });
        }
        procesos.downloadMapa = () => {
            let image = procesos.myDiagram.makeImage({
                scale: 1
            });
            var a = document.createElement("a"); //Create <a>
            a.href = image.src; //Image Base64 Goes here
            a.download = "Flujo de Trabajo - Procesos.png";
            a.click();
        };
        procesos.mapa_conceptual = () => {
            procesos.modal.modalView("procesos/mapa_conceptual", {
                width: 'modal-full',
                header: {
                    title: "Vista del Flujo de Trabajo",
                    icon: "icon-repo-forked"
                },
                footer: {
                    cancelButton: false
                },
                content: {
                    loadingContentText: MESSAGE.i('actions.Loading'),
                    sameController: 'procesos',
                },
                event: {
                    show: {
                        end: async function (data) {
                            SWEETALERT.loading({message: "Cargando Diagrama"});
                            setTimeout(async function () {
                                // These parameters need to be set before defining the templates.
                                const MINLENGTH = 200; // this controls the minimum length of any swimlane
                                const MINBREADTH = 20; // this controls the minimum breadth of any non-collapsed swimlane

                                // some shared functions
                                        // this may be called to force the lanes to be laid out again
                                function relayoutLanes() {
                                    procesos.myDiagram.nodes.each((lane) => {
                                        if (!(lane instanceof go.Group)) return;
                                        if (lane.category === 'Pool') return;
                                        lane.layout.isValidLayout = false; // force it to be invalid
                                    });
                                    procesos.myDiagram.layoutDiagram();
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

                                procesos.myDiagram = new go.Diagram('myDiagramDiv', {
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
                                procesos.myDiagram.model = new go.GraphLinksModel({
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

                                procesos.myDiagram.nodeTemplate = new go.Node('Auto', {

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
                                procesos.myDiagram.groupTemplateMap.add(
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
                                                            }).bindTwoWay('text')
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
                                procesos.myDiagram.groupTemplateMap.get('Lane').resizeAdornmentTemplate = new go.Adornment('Spot')
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

                                procesos.myDiagram.groupTemplateMap.add(
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
                                                            }).bindTwoWay('text')
                                                        ),
                                                    new go.Placeholder({ column: 1 })
                                                )
                                        )
                                );

                                procesos.myDiagram.linkTemplate = new go.Link({
                                    routing: go.Routing.Orthogonal,  // may be either Orthogonal or AvoidsNodes
                                    curve: go.Curve.JumpOver,
                                    corner: 5,
                                    relinkableFrom: true,
                                    relinkableTo: true,
                                    doubleClick: function(e, link) {
                                        procesos.myDiagram.startTransaction("edit text");
                                        const tb = link.findObject("LABEL");
                                        if (tb !== null) procesos.myDiagram.commandHandler.editTextBlock(tb);
                                        procesos.myDiagram.commitTransaction("edit text");
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
                                    procesos.loadMapa(procesos.recursos);
                                } catch (e) {

                                }




                                const colors = {
                                    pink: '#facbcb',
                                    blue: '#b7d8f7',
                                    green: '#b9e1c8',
                                    yellow: '#faeb98',
                                    background: '#e8e8e8',
                                };
                                procesos.myDiagram.div.style.backgroundColor = colors.background;

                                // Show the diagram's model in JSON format
                                function save() {
                                    procesos.recursos = procesos.myDiagram.model.toJson();
                                    procesos.myDiagram.isModified = false;
                                }
                                function load() {
                                    procesos.myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);
                                    procesos.myDiagram.delayInitialization(relayoutDiagram);
                                }

                                SWEETALERT.stop();
                            }, 1000)
                        }
                    }
                }
            });
        }

        procesos.saveMapa = function (){
            SWEETALERT.loading({message: MESSAGE.i('mono.procesing')})

            procesos.myDiagram.nodes.each(function(node) {
                var textBlock = node.findObject("TEXTBLOCK"); // Asegúrate de que este nombre coincide con el nombre del TextBlock
                if (textBlock !== null) {
                    node.data.text = encodeURIComponent(textBlock.text);
                }
            });

            procesos.myDiagram.links.each(function(link) {
                if (link.points !== null) {
                    // Convertir la lista de puntos en un array de números
                    var pointsArray = link.points.toArray().flatMap(point => [point.x, point.y]);
                    link.data.points = pointsArray;
                }
            });

            procesos.recursos = procesos.myDiagram.model.toJson();

            BASEAPI.updateall('procesos', {
                recursos: procesos.recursos,
                where: [
                    {
                        field: "id",
                        value: procesos.id
                    },
                ]
            }, async function (result) {
                if (result) {
                    SWEETALERT.stop();
                    SWEETALERT.show({
                        message: "Se ha guardado el mapa conceptual correctamente",
                        confirm: function(){
                            MODAL.close();
                        }
                    });
                }
            });
        }

        // Luego, decodificar el texto cuando cargues el diagrama
        procesos.loadMapa = function (json) {
            procesos.myDiagram.model = go.Model.fromJson(json);

            procesos.myDiagram.nodes.each(function(node) {
                var textBlock = node.findObject("TEXTBLOCK");
                if (textBlock !== null && node.data.text) {
                    textBlock.text = decodeURIComponent(node.data.text);
                }
            });
        }

        //función para añadir pools
        procesos.addNewPool = function(diagram, poolName) {
            diagram.startTransaction("add new pool");

            // Create a new Pool Group
            const newPool = {
                key: poolName,
                category: "Pool",
                isGroup: true,
                text: poolName,
                layout: go.GraphObject.make(go.LayeredDigraphLayout, { direction: 0 }) // Layout horizontal
            };

            // Add the new Pool to the diagram
            diagram.model.addNodeData(newPool);

            diagram.commitTransaction("add new pool");
        }

        //función para añadir lines
        procesos.addNewLane = function(diagram, laneName) {
            diagram.startTransaction("add new lane");

            // Obtener el pool seleccionado o el último pool creado
            let selectedPool = diagram.selection.first();

            if (!DSON.oseaX(selectedPool)) {
                // Crear un nuevo Lane Group
                const newLane = {
                    key: laneName,
                    category: "Lane",
                    isGroup: true,
                    text: laneName,
                    group: selectedPool.key, // Asignar el lane al pool seleccionado
                    layout: go.GraphObject.make(go.LayeredDigraphLayout, { direction: 90 }) // Layout vertical
                };

                // Añadir el nuevo Lane al diagrama
                diagram.model.addNodeData(newLane);

                // Forzar la actualización del layout del pool
                selectedPool.layout.invalidateLayout();
                diagram.layoutDiagram(true);
            } else {
                SWEETALERT.show({
                    type: 'warning',
                    message: `<p>No se encontró un grupo para agregar la nueva línea.</p>
<p>Por favor, agregar un nuevo grupo y seleccione dando clic sobre el objeto en el diagrama</p>`,
                })
            }

            diagram.commitTransaction("add new lane");
        }

        //función para añadir node
        procesos.addNode = function (diagram, nodeName, figure) {
            diagram.startTransaction("add new node");

            // Obtener la lane seleccionada
            let selectedLane = diagram.selection.first();
            if (!(selectedLane instanceof go.Group) || selectedLane.category !== "Lane") {
                console.error("No se encontró una lane seleccionada para agregar el nuevo nodo.");
                diagram.commitTransaction("add new node");
                return;
            }

            // Crear un nuevo nodo circular
            const newNode = {
                key: nodeName,
                text: nodeName,
                group: selectedLane.key, // Asignar el nodo a la lane seleccionada
                figure: figure || "Circle", // Forma del nodo
                fill: "white", // Color de relleno del nodo
                editable: true // Habilitar la edición del texto
            };

            // Añadir el nuevo nodo al diagrama
            diagram.model.addNodeData(newNode);

            // Forzar la actualización del layout de la lane
            selectedLane.layout.invalidateLayout();
            diagram.layoutDiagram(true);

            diagram.commitTransaction("add new node");
        }

        // procesos.triggers.table.before.load = () => new Promise(async (resolve, reject) => {
        //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
        //
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
