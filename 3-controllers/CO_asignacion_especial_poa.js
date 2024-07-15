app.controller("asignacion_especial_poa", function ($scope, $http, $compile) {
    asignacion_especial_poa = this;
    var session = new SESSION().current();
    var titulo_push = "";
    var cuerpo_push = "";
    var titulo_email = "";
    var cuerpo_email = "";
    asignacion_especial_poa.session = session;
    asignacion_especial_poa.poa_id = session.poa_id === null ? 0 : session.poa_id;
    asignacion_especial_poa.compania_id = session.compania_id;
    asignacion_especial_poa.not_exists_poa = 0;
    asignacion_especial_poa.view_option_first = true;
    asignacion_especial_poa.currentdate = moment().format("YYYY-MM-DD");
    asignacion_especial_poa.paso = false;
    asignacion_especial_poa.destroyForm = false;
    asignacion_especial_poa.insert_readonly = {};
    asignacion_especial_poa.insert_readonly = {
        poa: session.poa_id,
        departamento_solicitante: session.departamento,
        estatus: 2
    };
    asignacion_especial_poa.requireFIlter = {
        "field": "poa_id",
        "value": asignacion_especial_poa.poa_id
    };
    asignacion_especial_poa.fixFilters = [asignacion_especial_poa.requireFIlter];

    var carac = undefined;
    if (session.groups.length > 0)
        carac = session.groups[0] ? session.groups[0].caracteristica : '';
    var mydepa = session.departamento;
    var myID = session.getID();

    if (carac === ENUM_2.Grupos.director_departamental || carac === ENUM_2.Grupos.analista_departamental) {
        asignacion_especial_poa.fixFilters.push({field: 'departamento_createdby_id', value: mydepa});
    }

    RUNCONTROLLER("asignacion_especial_poa", asignacion_especial_poa, $scope, $http, $compile);

    // asignacion_especial_poa.triggers.table.after.load = async function (record) {
    //
    // }
    asignacion_especial_poa.check_date = function () {
        if (session.estado == 0){
            SWEETALERT.show({message:'Para poder crear una asignación especial debe seleccionar un POA Activo'})
        }else{
            asignacion_especial_poa.formulary(null,'new')
        }
    }
    asignacion_especial_poa.singular = "Asignación Especial POA";
    asignacion_especial_poa.plural = MESSAGE.i('planificacion.titleAsignacion');

    title_header_table_poa(asignacion_especial_poa, "Asignaciones Creadas");
    asignacion_especial_poa.formulary = function (data, mode, defaultData) {
        if (asignacion_especial_poa !== undefined) {
            RUN_B("asignacion_especial_poa", asignacion_especial_poa, $scope, $http, $compile);
            asignacion_especial_poa.form.titles = {
                new: MESSAGE.i('planificacion.titleAsignacion'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titleAsignacion')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleAsignacion')}`
            };
            asignacion_especial_poa.form.before.insert = function () {
                if (asignacion_especial_poa.poa_id === 0) {
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
            asignacion_especial_poa.form.after.insert = function (data) {
                asignacion_especial_poa.data_json = {
                    title: "Se le ha asiganado una asignación especial",
                    content: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`,
                    user: [data.inserted.responsable],
                    url: 'asignacion_especial_poa'
                };
                BASEAPI.mail({
                    "to": asignacion_especial_poa.form.selected('responsable').correo,
                    "subject": "Se le ha asiganado una asignación especial",
                    "name": "noReply",
                    "template": 'email/plane',
                    "fields": { //estos campos se utilizarán en el template
                        message: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`,
                    }
                }, function (result) {
                    SWEETALERT.stop();
                    SWEETALERT.show({message: "Se asignó la tarea éxitosamente"});
                });
                send_notification.send.send(asignacion_especial_poa.data_json);

                // titulo_push = "Se le ha asiganado una asignación especial";
                // cuerpo_push = `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`;
                //
                // titulo_email = MESSAGE.i('planificacion.asignacion_especial_titulo_add_email');
                // cuerpo_email = `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`;
                // function_send_email_group(titulo_push, cuerpo_push, titulo_email, cuerpo_email, session.compania_id, asignacion_especial_poa.form.selected('responsable').departamento);
            };
            asignacion_especial_poa.form.before.update = function (data) {
                asignacion_especial_poa.insert_readonly = {};
                return false;
            };
            asignacion_especial_poa.form.after.update = function (data) {
                if (data.updating.responsable != asignacion_especial_poa.data_user.id) {
                    var array_correo = [];
                    asignacion_especial_poa.data_json = {
                        title: "Se le ha asiganado una asignación especial",
                        content: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`,
                        user: [data.updating.responsable],
                        url: 'asignacion_especial_poa'
                    };
                    send_notification.send.send(asignacion_especial_poa.data_json);
                    BASEAPI.mail({
                        "to": asignacion_especial_poa.form.selected('responsable').correo,
                        "subject": "Se le ha asiganado una asignación especial",
                        "name": "noReply",
                        "template": 'email/plane',
                        "fields": { //estos campos se utilizarán en el template
                            message: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, se le ha asignado la asignación especial: ${data.inserted.nombre}. La misma deberá trabajarse durante el rango de fecha de ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}.`,
                        }
                    }, function (result) {
                    });
                    //
                    asignacion_especial_poa.data_json2 = {
                        title: `Ha sido removido de la asignación especial: "${data.updating.nombre}"`,
                        content: `${asignacion_especial_poa.data_user.nombre + ' ' + asignacion_especial_poa.data_user.apellido} ha sido removido de la asignación especial: "${data.updating.nombre}", dicha actividad fué asignada a ${asignacion_especial_poa.form.selected('responsable').nombre + " " + asignacion_especial_poa.form.selected('responsable').apellido}.`,
                        user: [asignacion_especial_poa.data_user.id],
                        url: 'asignacion_especial_poa'
                    };
                    send_notification.send.send(asignacion_especial_poa.data_json2);
                    // BASEAPI.mail({
                    //     "to": asignacion_especial_poa.data_user.correo,
                    //     "subject": `Ha sido removido de la asignación especial: "${data.updating.nombre}"`,
                    //     "name": "noReply",
                    //     "template": 'email/plane',
                    //     "fields": { //estos campos se utilizarán en el template
                    //         message: `${asignacion_especial_poa.data_user.nombre + ' ' + asignacion_especial_poa.data_user.apellido} ha sido removido de la asignación especial: "${data.updating.nombre}", dicha actividad fué asignada a ${asignacion_especial_poa.form.selected('responsable').nombre + " " + asignacion_especial_poa.form.selected('responsable').apellido}.`
                    //     }
                    // }, function (result) {
                    // });
                    titulo_push = `Ha sido removido de la asignación especial: "${data.updating.nombre}"`;
                    cuerpo_push = `${asignacion_especial_poa.data_user.nombre + ' ' + asignacion_especial_poa.data_user.apellido} ha sido removido de la asignación especial: "${data.updating.nombre}", dicha actividad fué asignada a ${asignacion_especial_poa.form.selected('responsable').nombre + " " + asignacion_especial_poa.form.selected('responsable').apellido}.`;
                    array_correo.push(asignacion_especial_poa.data_user.correo, asignacion_especial_poa.form.selected('responsable').correo)
                    titulo_email = `Ha sido removido de la asignación especial: "${data.updating.nombre}"`;
                    cuerpo_email = `${asignacion_especial_poa.data_user.nombre + ' ' + asignacion_especial_poa.data_user.apellido} ha sido removido de la asignación especial: "${data.updating.nombre}", dicha actividad fué asignada a ${asignacion_especial_poa.form.selected('responsable').nombre + " " + asignacion_especial_poa.form.selected('responsable').apellido}.`;

                    function_send_email_director_user(titulo_push, cuerpo_email, titulo_push, cuerpo_email, session.compania_id,  asignacion_especial_poa.form.selected('responsable').departamento, array_correo);
                } else {
                    asignacion_especial_poa.data_json = {
                        title: "Hubo un cambio de fecha en la asignación especial",
                        content: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, Ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde  ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}. Proceder a tomar las acciones que considre pertinente.`,
                        user: [data.updating.responsable],
                        url: 'asignacion_especial_poa'
                    };
                    send_notification.send.send(asignacion_especial_poa.data_json);
                    BASEAPI.mail({
                        "to": asignacion_especial_poa.form.selected('responsable').correo,
                        "subject": "Hubo un cambio de fecha en la asignación especial",
                        "name": "noReply",
                        "template": 'email/plane',
                        "fields": { //estos campos se utilizarán en el template
                            message: `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, Ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde  ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}. Proceder a tomar las acciones que considre pertinente.`,
                        }
                    }, function (result) {
                    });

                    // titulo_push = "Hubo un cambio de fecha en la asignación especial asignada a usted";
                    // cuerpo_push = `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, Ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde  ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}. Proceder a tomar las acciones que considre pertinente.`;
                    //
                    // titulo_email = "Hubo un cambio de fecha en la asignación especial asignada a usted";
                    // cuerpo_email = `${asignacion_especial_poa.form.selected('responsable').nombre + ' ' + asignacion_especial_poa.form.selected('responsable').apellido}, Ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde  ${asignacion_especial_poa.fecha_inicio} hasta ${asignacion_especial_poa.fecha_fin}. Proceder a tomar las acciones que considre pertinente.`;
                    // function_send_email_group(titulo_push, cuerpo_push, titulo_email, cuerpo_email, session.compania_id, asignacion_especial_poa.form.selected('responsable').departamento);
                }
            };
            // end
            asignacion_especial_poa.triggers.table.after.close = function (data) {
                MENUMODAL = true;
            };

            asignacion_especial_poa.triggers.table.after.control = function (data) {
                if (mode === 'new' && data == 'range_date') {
                    asignacion_especial_poa.range_date = "";
                    var rango_minimo = moment().format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + session.periodo_poa).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        rango_minimo = moment(("01-02-" + session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    }

                    asignacion_especial_poa.range_date_min(rango_minimo);
                    asignacion_especial_poa.range_date_max(rango_maximo);
                    //cambio placebo
                    if ( moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        asignacion_especial_poa.range_date_start(rango_minimo);
                        asignacion_especial_poa.range_date_end(rango_minimo);
                    }
                    asignacion_especial_poa.refreshAngular();
                }

                if (mode === 'edit' && data == 'range_date') {
                    var rango_minimo = moment().format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + session.periodo_poa).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        rango_minimo = moment(("01-02-" + session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    }

                    asignacion_especial_poa.range_date_min(rango_minimo);
                    asignacion_especial_poa.range_date_max(rango_maximo);
                    asignacion_especial_poa.refreshAngular();
                }

                if (mode === 'edit' && data === 'responsable') {
                    asignacion_especial_poa.data_user = asignacion_especial_poa.form.selected('responsable');
                    asignacion_especial_poa.insert_readonly = {};
                }
            };
            asignacion_especial_poa.form.readonly = asignacion_especial_poa.insert_readonly;
            asignacion_especial_poa.createForm(data, mode, defaultData);

            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(asignacion_especial_poa, "nombre", rules)
            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.departamento_solicitado', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(asignacion_especial_poa, "departamento_solicitado", rules);
            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.responsable', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(asignacion_especial_poa, "responsable", rules)
            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.fecha_inicio', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(asignacion_especial_poa, "fecha_inicio", rules)
            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.fecha_fin', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(asignacion_especial_poa, "fecha_fin", rules)
            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.range_date', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(asignacion_especial_poa, "fecha_inicio", rules);
                VALIDATION.validate(asignacion_especial_poa, "range_date", rules);

            });
            asignacion_especial_poa.$scope.$watch('asignacion_especial_poa.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(asignacion_especial_poa, "descripcion", rules)
            });
        }
    };
    asignacion_especial_poa.downloadDiagram = () => {
        let image = asignacion_especial_poa.myDiagram.makeImage({
            scale: 1
        });
        var a = document.createElement("a"); //Create <a>
        a.href = image.src; //Image Base64 Goes here
        a.download = "Flujo de Trabajo - Asignaciones Especiales.png";
        a.click();
    };
    asignacion_especial_poa.diagram = () => {
        asignacion_especial_poa.modal.modalView("asignacion_especial_poa/diagram", {
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
                sameController: 'asignacion_especial_poa',
            },
            event: {
                show: {
                    end: async function (data) {
                        SWEETALERT.loading({message: "Cargando Diagrama"});
                        asignacion_especial_poa.statusList = await BASEAPI.listp('vw_modulo_estatus', {
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
                        asignacion_especial_poa.statusList = asignacion_especial_poa.statusList.data;
                        setTimeout(async function () {
                            const $$$ = go.GraphObject.make;
                            let statusList = asignacion_especial_poa.statusList;
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

                            asignacion_especial_poa.myDiagram = new go.Diagram(
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
                            asignacion_especial_poa.myDiagram.div.style.backgroundColor = colors.background;
                            asignacion_especial_poa.myDiagram.nodeTemplate = new go.Node('Auto', {
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
                            asignacion_especial_poa.myDiagram.linkTemplate = new go.Link(
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
                            asignacion_especial_poa.myDiagram.model = go.Model.fromJson(JSON.stringify(thejson));
                            SWEETALERT.stop();
                        }, 1000)
                    }
                }
            }
        });
    }
});
