app.controller("mi_asignacion_especial_poa", function ($scope, $http, $compile) {
    mi_asignacion_especial_poa = this;
    var session = new SESSION().current();
    mi_asignacion_especial_poa.poa_id = session.poa_id === null ? 0 : session.poa_id;
    mi_asignacion_especial_poa.compania_id = session.compania_id;
    mi_asignacion_especial_poa.not_exists_poa = 0;
    mi_asignacion_especial_poa.view_option_first = true;
    mi_asignacion_especial_poa.fileSI = [];
    mi_asignacion_especial_poa.currentdate = moment().format("YYYY-MM-DD");
    mi_asignacion_especial_poa.paso = false;
    mi_asignacion_especial_poa.destroyForm = false;
    mi_asignacion_especial_poa.show_diagram = true;
    mi_asignacion_especial_poa.insert_readonly = {};
    mi_asignacion_especial_poa.insert_readonly = {
        poa: session.poa_id,
        departamento_solicitante: session.departamento,
        estatus: 2
    };
    mi_asignacion_especial_poa.fixFilters = [
        {
            "field": "poa_id",
            "value": mi_asignacion_especial_poa.poa_id
        },
        {
            field: "responsableid",
            value: session.usuario_id
        }
    ];

    var carac = undefined;
    if (session.groups.length > 0)
        carac = session.groups[0]? session.groups[0].caracteristica: '';
    var mydepa = session.departamento;
    var myID = session.getID();
    var header = '';


    // if (carac === "DP") {
    //     mi_asignacion_especial_poa.fixFilters.push({field: 'depaid', value: mydepa});
    //     header='Mis Asignaciones'
    // } else if (carac === "AD") {
    //     mi_asignacion_especial_poa.fixFilters.push({field: 'responsableid', value: myID});
    //     header='Mis Asignaciones'
    // }else{
    //     header='Asignaciones Asignadas'
    // }

    RUNCONTROLLER("mi_asignacion_especial_poa", mi_asignacion_especial_poa, $scope, $http, $compile);

    mi_asignacion_especial_poa.singular = "Asignación Especial POA";
    mi_asignacion_especial_poa.plural = MESSAGE.i('planificacion.titleAsignacion');
    if (session.poa_id) {
        mi_asignacion_especial_poa.headertitle = header + " / " + session.periodo_pei_msj + " / " + session.periodo_poa_msj;
    } else if (session.pei_id) {
        mi_asignacion_especial_poa.headertitle = header + " / " + session.periodo_pei_msj;
    } else {
        mi_asignacion_especial_poa.headertitle = header + " / PEI ";
    }

    mi_asignacion_especial_poa.formulary = function (data, mode, defaultData) {
        if (mi_asignacion_especial_poa !== undefined) {
            RUN_B("mi_asignacion_especial_poa", mi_asignacion_especial_poa, $scope, $http, $compile);
            mi_asignacion_especial_poa.form.titles = {
                new: MESSAGE.i('planificacion.titleAsignacion'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titleAsignacion')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleAsignacion')}`
            };
            mi_asignacion_especial_poa.form.before.insert = function () {
                if (mi_asignacion_especial_poa.poa_id === 0) {
                    SWEETALERT.show({message: "No existe un POA activo"});
                    return true;
                }
                if (!session.departamento) {
                    SWEETALERT.show({message: "Necesitas tener un departamento asignado"});
                    return true;
                }
                return false;
            };
            // implementacion de las notificaciones al momento de crear o actualizar una asignacion begin
            mi_asignacion_especial_poa.form.after.insert = function (data) {
                mi_asignacion_especial_poa.data_json = {
                    title: MESSAGE.i('planificacion.titleAsignacion'),
                    content: MESSAGE.ieval('planificacion.asignacion_especial_send_notification',{
                        field: mi_asignacion_especial_poa.form.selected('responsable').nombre +' '+mi_asignacion_especial_poa.form.selected('responsable').apellido,
                        field2: data.inserted.nombre,
                        field3: mi_asignacion_especial_poa.fecha_fin
                    }),
                    user: [data.inserted.responsable],
                    url: 'mi_asignacion_especial_poa'
                };
                send_notification.send.send(mi_asignacion_especial_poa.data_json);
            };
            mi_asignacion_especial_poa.form.after.update = function (data) {
                if (data.updating.responsable != mi_asignacion_especial_poa.data_user.id){
                    mi_asignacion_especial_poa.data_json = {
                        title: MESSAGE.i('planificacion.titleAsignacion'),
                        content: MESSAGE.ieval('planificacion.asignacion_especial_send_notification',{
                            field: mi_asignacion_especial_poa.form.selected('responsable').nombre +' '+mi_asignacion_especial_poa.form.selected('responsable').apellido,
                            field2: data.updating.nombre,
                            field3: mi_asignacion_especial_poa.fecha_fin
                        }),
                        user: [data.updating.responsable],
                        url: 'mi_asignacion_especial_poa'
                    };
                    send_notification.send.send(mi_asignacion_especial_poa.data_json);
                    //
                    mi_asignacion_especial_poa.data_json2 = {
                        title: MESSAGE.i('planificacion.titleAsignacion'),
                        content: MESSAGE.ieval('planificacion.asignacion_especial_remove_send_notification',{
                            field: mi_asignacion_especial_poa.data_user.nombre +' '+mi_asignacion_especial_poa.data_user.apellido,
                            field2: data.updating.nombre
                        }),
                        user: [mi_asignacion_especial_poa.data_user.id],
                        url: 'mi_asignacion_especial_poa'
                    };
                    send_notification.send.send(mi_asignacion_especial_poa.data_json2);
                } else {
                    mi_asignacion_especial_poa.data_json = {
                        title: MESSAGE.i('planificacion.titleAsignacion'),
                        content: MESSAGE.ieval('planificacion.asignacion_especial_update_send_notification',{
                            field: mi_asignacion_especial_poa.form.selected('responsable').nombre +' '+mi_asignacion_especial_poa.form.selected('responsable').apellido,
                            field2: data.updating.nombre,
                            field3: mi_asignacion_especial_poa.fecha_fin
                        }),
                        user: [data.updating.responsable],
                        url: 'mi_asignacion_especial_poa'
                    };
                    send_notification.send.send(mi_asignacion_especial_poa.data_json);
                }
            };
            // end
            mi_asignacion_especial_poa.triggers.table.after.control = function (data) {
                if (mode === 'new' && data == 'range_date') {
                    mi_asignacion_especial_poa.range_date = "";
                    mi_asignacion_especial_poa.refreshAngular();
                }
                if (mode === 'edit' && data === 'responsable'){
                    mi_asignacion_especial_poa.data_user = mi_asignacion_especial_poa.form.selected('responsable');
                }
            };
            mi_asignacion_especial_poa.form.readonly = mi_asignacion_especial_poa.insert_readonly;
            mi_asignacion_especial_poa.createForm(data, mode, defaultData);

            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "nombre", rules)
            });
            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.departamento_solicitado', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "departamento_solicitado", rules);
            });
            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.responsable', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "responsable", rules)
            });
            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.fecha_inicio', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "fecha_inicio", rules)
            });
            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.fecha_fin', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "fecha_fin", rules)
            });
            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.range_date', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "fecha_inicio", rules);
                VALIDATION.validate(mi_asignacion_especial_poa, "range_date", rules);
            });
        }
    };

    mi_asignacion_especial_poa.triggers.table.after.load = async function (records) {
        mi_asignacion_especial_poa.fileSI = [];
        for (var items of records.data) {
            mi_asignacion_especial_poa.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/asignacion_especial_poa_monitoreo/asignacionfile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        mi_asignacion_especial_poa.fileSI.push({id: items.id});
                        resolve(true);
                    } else {
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    }
                }, $('#invisible'));
                // SWEETALERT.stop();
            });
            await mi_asignacion_especial_poa.files();
            mi_asignacion_especial_poa.refreshAngular();

        }
    };
    mi_asignacion_especial_poa.downloadDiagram = () => {
        let image = mi_asignacion_especial_poa.myDiagram.makeImage({
            scale: 1
        });
        var a = document.createElement("a"); //Create <a>
        a.href = image.src; //Image Base64 Goes here
        a.download = "Flujo de Trabajo - Asignaciones Especiales.png";
        a.click();
    };
    mi_asignacion_especial_poa.diagram = () => {
        mi_asignacion_especial_poa.modal.modalView("mi_asignacion_especial_poa/diagram", {
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
                sameController: 'mi_asignacion_especial_poa',
            },
            event: {
                show: {
                    end: async function (data) {
                        SWEETALERT.loading({message: "Cargando Diagrama"});
                        mi_asignacion_especial_poa.statusList = await BASEAPI.listp('vw_modulo_estatus', {
                            limit: 0,
                            orderby: "entidad",
                            order: "asc",
                            where: [
                                {
                                    "field": "entidad",
                                    "value": "Asignaciones Especiales"
                                }
                            ]
                        });
                        mi_asignacion_especial_poa.statusList = mi_asignacion_especial_poa.statusList.data;
                        setTimeout(async function () {
                            const $$$ = go.GraphObject.make;
                            let statusList = mi_asignacion_especial_poa.statusList;
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

                            mi_asignacion_especial_poa.myDiagram = new go.Diagram(
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
                                        direction: 90,
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
                            mi_asignacion_especial_poa.myDiagram.div.style.backgroundColor = colors.background;
                            mi_asignacion_especial_poa.myDiagram.nodeTemplate = new go.Node('Auto', {
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
                            mi_asignacion_especial_poa.myDiagram.linkTemplate = new go.Link(
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
                            mi_asignacion_especial_poa.myDiagram.model = go.Model.fromJson(JSON.stringify(thejson));
                            SWEETALERT.stop();
                        }, 1000)
                    }
                }
            }
        });
    }
    mi_asignacion_especial_poa.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        mi_asignacion_especial_poa.refresh();
    };
    mi_asignacion_especial_poa.verFile = function (key, value, row) {
        if (key != "archivo")
            return;

        mi_asignacion_especial_poa.setPermission("file.upload", false);
        mi_asignacion_especial_poa.setPermission("file.remove", false);
        // if (row.estatus_actividad == ENUM_2.actividad_poa_estatus.Completada || row.estatus_actividad == ENUM_2.actividad_poa_estatus.Cancelada) {
        //     actividades_poa_monitoreo.setPermission("file.upload", false);
        //     actividades_poa_monitoreo.setPermission("file.remove", false);
        // } else {
        //     actividades_poa_monitoreo.setPermission("file.upload", true);
        //     actividades_poa_monitoreo.setPermission("file.remove", true);
        // }
        if (typeof mi_asignacion_especial_poa !== 'null') {
            if (mi_asignacion_especial_poa) {
                var info = mi_asignacion_especial_poa.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                console.log(row);
                if (info.length) {
                    var root = DSON.template("/asignacion_especial_poa_monitoreo/asignacionfile/" + row.id, row);
                    console.log(root);
                    mi_asignacion_especial_poa.showfiletypes = function () {
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
                                        action: function(){
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
                                    begin: function(data) {
                                        data.permitted_files = [];
                                        for (var i in CONFIG.fileType_general) {
                                            for (var j in CONFIG.fileType_general[i]) {
                                                if(typeof data.permitted_files[j] == "undefined"){
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
                        mi_asignacion_especial_poa.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'mi_asignacion_especial_poa',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    mi_asignacion_especial_poa.modal.modalView("templates/components/gallery", {
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
});