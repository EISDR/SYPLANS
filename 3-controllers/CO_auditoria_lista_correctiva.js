app.controller("auditoria_lista_correctiva", function ($scope, $http, $compile) {
    auditoria_lista_correctiva = this;
    auditoria_lista_correctiva.session = new SESSION().current();
    auditoria_lista_correctiva.singular = "Asignar acciones de Mejora";
    auditoria_lista_correctiva.plural = "Asignar acciones de Mejora";
    auditoria_lista_correctiva.headertitle = "Asignar acciones de Mejora";
    auditoria_lista_correctiva.group_caracteristica = auditoria_lista_correctiva.session.groups[0] ? auditoria_lista_correctiva.session.groups[0].caracteristica : "";
    auditoria_lista_correctiva.Checked = false;
    auditoria_lista_correctiva.show_diagram = true;
    auditoria_lista_correctiva.check_responsables = async function () {
        if (typeof riesgo != "undefined") {
            if (riesgo) {
                if (typeof riesgo !== 'not defined') {
                    if (!riesgo.agrega_acciones) {
                        if (auditoria_lista_correctiva.group_caracteristica != ENUM_2.Grupos.director_general && auditoria_lista_correctiva.group_caracteristica != ENUM_2.Grupos.analista_de_calidad && auditoria_lista_correctiva.group_caracteristica != ENUM_2.Grupos.supervisor_de_calidad) {
                            auditoria_lista_correctiva.cargos_responsables = await BASEAPI.listp('vw_auditoria_lista_correctiva', {
                                limit: 0,
                                join: [
                                    {
                                        "table": "auditoria_lista_correctiva_cargo",
                                        "base": "id",
                                        "field": "auditoria_lista_correctiva",
                                        "columns": ["id", "cargo"]
                                    }
                                ],
                                where: [
                                    {
                                        field: "riesgo",
                                        value: riesgo_a.id
                                    },
                                    {
                                        field: "auditoria_lista_correctiva_cargo.cargo",
                                        value: auditoria_lista_correctiva.session.cargo
                                    }
                                ]
                            });
                            auditoria_lista_correctiva.cargos_responsables = auditoria_lista_correctiva.cargos_responsables.data;
                            auditoria_lista_correctiva.usuarios_responsables = await BASEAPI.listp('vw_auditoria_lista_correctiva', {
                                limit: 0,
                                join: [
                                    {
                                        "table": "auditoria_lista_correctiva_responsable",
                                        "base": "id",
                                        "field": "auditoria_lista_correctiva",
                                        "columns": ["id", "responsable"]
                                    }
                                ],
                                where: [
                                    {
                                        field: "riesgo",
                                        value: riesgo_a.id
                                    },
                                    {
                                        field: "auditoria_lista_correctiva_responsable.responsable",
                                        value: auditoria_lista_correctiva.session.id
                                    }
                                ]
                            });
                            auditoria_lista_correctiva.usuarios_responsables = auditoria_lista_correctiva.usuarios_responsables.data;

                            const cargosResponsables = Array.isArray(auditoria_lista_correctiva.cargos_responsables) ? auditoria_lista_correctiva.cargos_responsables.map(item => item.id) : [];
                            const usuariosResponsables = Array.isArray(auditoria_lista_correctiva.usuarios_responsables) ? auditoria_lista_correctiva.usuarios_responsables.map(item => item.id) : [];

                            const idsSinDuplicados = [...new Set([...cargosResponsables, ...usuariosResponsables])];
                            if (idsSinDuplicados.length > 0) {
                                auditoria_lista_correctiva.fixFilters = [
                                    {
                                        field: 'riesgo',
                                        value: riesgo_a.id,
                                    },
                                    {
                                        "field": "id",
                                        "value": idsSinDuplicados
                                    }
                                ];
                            } else {
                                auditoria_lista_correctiva.fixFilters = [
                                    {
                                        field: 'id',
                                        value: -1,
                                    }
                                ];

                            }
                            setTimeout(function () {
                                auditoria_lista_correctiva.refresh();
                            }, 100)
                        }
                    }
                }
            }
        }
    }
    //auditoria_lista_correctiva.destroyForm = false;
    //auditoria_lista_correctiva.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_lista_correctiva", auditoria_lista_correctiva, $scope, $http, $compile);
    auditoria_lista_correctiva.formulary = async function (data, mode, defaultData, view) {
        if (auditoria_lista_correctiva !== undefined) {
            delete auditoria_lista_correctiva.causa;
            RUN_B("auditoria_lista_correctiva", auditoria_lista_correctiva, $scope, $http, $compile);
            auditoria_lista_correctiva.form.modalWidth = ENUM.modal.width.full;
            auditoria_lista_correctiva.form.readonly = {};
            auditoria_lista_correctiva.firststatus = await BASEAPI.firstp('auditoria_lista_status', {
                order: "asc",
                where: [
                    {
                        field: "id",
                        value: 1
                    }
                ]
            });
            auditoria_lista_correctiva.createForm(data, mode, defaultData, view, () => {
                setTimeout(() => {

                    let larealdata = false;
                    try {
                        larealdata = JSON.parse(auditoria_lista_correctiva.causa);
                    } catch (e) {

                    }
                    auditoria_lista_correctiva.mind = new MindElixir({
                        el: '#map',
                        direction: MindElixir.LEFT,
                        draggable: true, // default true
                        contextMenu: true, // default true
                        toolBar: true, // default true
                        nodeMenu: true, // default true
                        keypress: true, // default true
                    });
                    if (larealdata)
                        auditoria_lista_correctiva.mind.init(larealdata);
                    else
                        auditoria_lista_correctiva.mind.init(MindElixir.new('Raíz'));
                }, 1000);
            });
            if (mode === 'new') {
                console.log("entre")
                auditoria_lista_correctiva.from_work = false;
            }
            auditoria_lista_correctiva.selectQueries['estatus_id'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: auditoria_lista_correctiva.session.groups[0].id
                },
                {
                    field: 'entidad',
                    operator: '=',
                    value: "auditoria_lista_correctiva"
                }
            ];
            auditoria_lista_correctiva.form.titles = {
                new: "Agregar Nueva Acción Correctiva",
                edit: "Editar Nueva Acción Correctiva"
            };
            if (typeof vw_correctiva != "undefined") {
                if (vw_correctiva) {
                    if (typeof vw_correctiva != "not defined") {
                        auditoria_lista_correctiva.form.titles = {
                            new: `Agregar nueva Acción de Mejora al hallazgo "${auditoria_programa_plan_documentos_asociados_listaverificacion.descripcion}" de la auditoria "${vw_correctiva.auditoria_nombre}"`,
                            edit: `Editar nueva Acción de Mejora al hallazgo "${auditoria_programa_plan_documentos_asociados_listaverificacion.descripcion}" de la auditoria "${vw_correctiva.auditoria_nombre}"`
                        };
                    }
                }
            }
            $scope.$watch("auditoria_lista_correctiva.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_lista_correctiva, 'nombre', rules);
            });
            $scope.$watch("auditoria_lista_correctiva.presupuesto", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                // rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_lista_correctiva, 'presupuesto', rules);
            });
            $scope.$watch("auditoria_lista_correctiva.descripcion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_lista_correctiva, 'descripcion', rules);
            });
            $scope.$watch("auditoria_lista_correctiva.elemento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_lista_correctiva, 'elemento', rules);
            });
            if (typeof vw_correctiva != "undefined") {
                if (vw_correctiva) {
                    if (typeof vw_correctiva != "not defined") {
                        $scope.$watch("auditoria_lista_correctiva.range_date", function (value) {
                            var rules = [];
                            //rules here
                            rules.push(VALIDATION.general.required(value));
                            VALIDATION.validate(auditoria_lista_correctiva, 'range_date', rules);
                        });
                        $scope.$watch("auditoria_lista_correctiva.fecha_inicio", function (value) {
                            var rules = [];
                            //rules here
                            rules.push(VALIDATION.general.required(value));
                            VALIDATION.validate(auditoria_lista_correctiva, 'fecha_inicio', rules);
                        });
                    }
                }
            }
            //ms_product.selectQueries['departamento'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("auditoria_lista_correctiva.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));

                // auditoria_lista_correctiva.form.loadDropDown('responsable');
                VALIDATION.validate(auditoria_lista_correctiva, 'departamento', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("auditoria_lista_correctiva.responsable", function (value) {
                var rules = [];
                //rules here
                VALIDATION.validate(auditoria_lista_correctiva, 'responsable', rules);
            });
            $scope.$watch("auditoria_lista_correctiva.comment", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_lista_correctiva, 'comment', rules);
            });
        }
    };
    auditoria_lista_correctiva.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        auditoria_lista_correctiva.runMagicManyToMany('departamento_list', 'departamento',
            'auditoria_lista_correctiva', 'id', 'nombre', 'auditoria_lista_correctiva_departamento',
            'departamento', 'id');
        auditoria_lista_correctiva.runMagicManyToMany('cargos_list', 'cargo',
            'auditoria_lista_correctiva', 'id', 'nombre', 'auditoria_lista_correctiva_cargo',
            'cargo', 'id');
        auditoria_lista_correctiva.runMagicManyToMany('responsable_list', 'vw_usuario',
            'auditoria_lista_correctiva', 'id', 'completo', 'auditoria_lista_correctiva_responsable',
            'responsable', 'id');
        auditoria_lista_correctiva.fileSI = [];
        if (typeof riesgo_a !== "undefined") {
            if (typeof riesgo_a !== "not defined") {
                if (riesgo_a) {
                    setTimeout(() => {
                        riesgo_a.refreshAngular();
                    }, 500);
                }
            }
        }
        if (typeof riesgo !== "undefined") {
            if (typeof riesgo !== "not defined") {
                if (riesgo) {
                    if (riesgo.esplan) {
                        riesgo.list_acciones_correctivas = await BASEAPI.listp('auditoria_lista_correctiva', {
                            limit: 0,
                            order: "desc",
                            where: [
                                {
                                    field: "riesgo",
                                    value: Matriz_id
                                }
                            ]
                        });
                        riesgo.list_acciones_correctivas = riesgo.list_acciones_correctivas.data;
                        riesgo_a.list_acciones_correctivas = riesgo.list_acciones_correctivas;

                    }
                    if (riesgo.todasaccionescorrectivas() && !riesgo.agrega_acciones) {
                        if (MODAL.current())
                            if (MODAL.current().id.indexOf("_view_") !== -1)
                                return;
                        if (riesgo.soyamfe) {
                            SWEETALERT.show({
                                type: 'warning',
                                message: "Para cerrar esta acción de mejora debe actualizar los valores de Gravedad (G), Ocurrencia (O) y Detección (D), en el entendido que con las acciones implementadas dichos valores hayan sufrido cambios",
                                confirm: function () {
                                    auditoria_lista_correctiva.refreshAngular();
                                    riesgo.refreshAngular();
                                }
                            });
                        } else {
                            SWEETALERT.show({
                                type: 'warning',
                                message: "Para cerrar esta acción de mejora debe actualizar los valores de Probabilidad e Impacto, en el entendido que con las acciones implementadas dichos valores hayan sufrido cambios",
                                confirm: function () {
                                    riesgo_a.fin_plan_accion = true;
                                    auditoria_lista_correctiva.refreshAngular();
                                    riesgo.refreshAngular();
                                }
                            });
                        }

                    }
                    setTimeout(() => {
                        riesgo.refreshAngular();
                    }, 500);
                }
            }
        }

        for (var items of records.data) {
            auditoria_lista_correctiva.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/auditoria_lista_correctiva/correctivafile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        auditoria_lista_correctiva.fileSI.push({id: items.id});
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
            await auditoria_lista_correctiva.files();
            auditoria_lista_correctiva.refreshAngular();
        }
        if (!auditoria_lista_correctiva.Checked) {
            auditoria_lista_correctiva.check_responsables();
            auditoria_lista_correctiva.Checked = true;
        }

    };
    auditoria_lista_correctiva.downloadDiagram = () => {
        let image = auditoria_lista_correctiva.myDiagram.makeImage({
            scale: 1
        });
        var a = document.createElement("a"); //Create <a>
        a.href = image.src; //Image Base64 Goes here
        a.download = "Flujo de Trabajo - Acciones de mejora.png";
        a.click();
    };
    auditoria_lista_correctiva.diagram = () => {
        auditoria_lista_correctiva.modal.modalView("auditoria_lista_correctiva/diagram", {
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
                sameController: 'auditoria_lista_correctiva',
            },
            event: {
                show: {
                    end: async function (data) {
                        SWEETALERT.loading({message: "Cargando Diagrama"});
                        auditoria_lista_correctiva.statusList = await BASEAPI.listp('vw_modulo_estatus', {
                            limit: 0,
                            orderby: "entidad",
                            order: "asc",
                            where: [
                                {
                                    "field": "entidad",
                                    "value": "Salidas No Conformes"
                                }
                            ]
                        });
                        auditoria_lista_correctiva.statusList = auditoria_lista_correctiva.statusList.data;
                        setTimeout(async function () {
                            const $$$ = go.GraphObject.make;
                            let statusList = auditoria_lista_correctiva.statusList;
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

                            auditoria_lista_correctiva.myDiagram = new go.Diagram(
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
                            auditoria_lista_correctiva.myDiagram.div.style.backgroundColor = colors.background;
                            auditoria_lista_correctiva.myDiagram.nodeTemplate = new go.Node('Auto', {
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
                            auditoria_lista_correctiva.myDiagram.linkTemplate = new go.Link(
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
                            auditoria_lista_correctiva.myDiagram.model = go.Model.fromJson(JSON.stringify(thejson));
                            SWEETALERT.stop();
                        }, 1000)
                    }
                }
            }
        });
    }
    auditoria_lista_correctiva.saveAccionCorrectiva = function () {
        VALIDATION.save(auditoria_lista_correctiva, async function () {
            var auditVar = auditoria_lista_correctiva.form.getAudit();
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
            // if (drp_actividades_apoyo.estatus == ENUM_2.actividad_apoyo_estatus.Cancelada) {
            //     if (LAN.money(drp_actividades_apoyo.presupuesto_consumido).value > 0) {
            //         SWEETALERT.show({
            //             type: 'error',
            //             message: "La actividad de apoyo no puede ser cancelada puesto que tiene presupuesto consumido. Favor Revisar"
            //         });
            //         var buttons = document.getElementsByClassName("btn btn-labeled");
            //         for (var item of buttons) {
            //             item.disabled = false;
            //         }
            //         return;
            //     }
            // }
            for (var item of buttons) {
                item.disabled = true;
            }
            SWEETALERT.loading({message: MESSAGE.i('mono.procesing')});
            BASEAPI.updateall('auditoria_lista_correctiva', {
                estatus: auditoria_lista_correctiva.estatus_id,
                where: [{
                    field: "id",
                    value: auditoria_lista_correctiva.id
                }]
            }, async function (result) {
                var rs = await BASEAPI.insertIDp('comentarios', {
                    "comentario": auditoria_lista_correctiva.comment,
                    "type": 27,
                    "created_by": auditoria_lista_correctiva.session.usuario_id,
                    "value": auditoria_lista_correctiva.estatus_id,
                    "value2": auditoria_lista_correctiva.id
                }, '', '');

                var alllista = await BASEAPI.listf("auditoria_lista_correctiva", [
                    {field: "riesgo", value: riesgo_a.id},
                    {field: "estatus", operator: "!=", value: 4}
                ]);
                console.log(alllista, 'ay all lista');
                if (alllista) {
                    if (alllista.length === 0) {
                        BASEAPI.updateallp('auditoria_lista_correctiva', {
                            ejecucion: "$now()",
                            where: [{field: "riesgo", value: riesgo_a.id}]
                        });
                    }
                }

                if (rs.data)
                    if (rs.data.data)
                        if (rs.data.data[0])
                            if (rs.data.data[0].id) {
                                auditoria_lista_correctiva.comment = "";
                                auditoria_lista_correctiva.refreshAngular();
                                await BASEAPI.ajax.postp(new HTTP().path(["files", "api", "copy"]), {
                                    moves: [{
                                        from: `${FOLDERS.files}/auditoria_lista_correctiva/correctivafile/${auditoria_lista_correctiva.id}`,
                                        to: `${FOLDERS.files}/comentarios_acciones_correctivas/correctivafile/${rs.data.data[0].id}`
                                    }]
                                });
                            }
                var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                for (var item of buttons) {
                    item.disabled = false;
                }
                NOTIFY.success("Comentario agregado");
                MODAL.close();
                await AUDIT.LOG(AUDIT.ACTIONS.update, 'vw_auditoria_lista_correctiva', auditVar, auditoria_lista_correctiva.form.oldData);
                auditoria_lista_correctiva.refresh();
                riesgo_a.refreshAngular();
                SWEETALERT.stop();
            });

        }, ["estatus_id", "comment"]);
    };
    auditoria_lista_correctiva.verFile = function (key, value, row) {
        auditoria_lista_correctiva.setPermission("file.upload", false);
        auditoria_lista_correctiva.setPermission("file.download", true);
        if (auditoria_lista_correctiva.group_caracteristica !== ENUM_2.Grupos.director_general) {
            auditoria_lista_correctiva.setPermission("file.remove", false);
        } else {
            auditoria_lista_correctiva.setPermission("file.remove", true);
        }
        if (typeof auditoria_lista_correctiva !== 'null') {
            if (auditoria_lista_correctiva) {
                var info = auditoria_lista_correctiva.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/auditoria_lista_correctiva/correctivafile/" + row.id, row);
                    auditoria_lista_correctiva.showfiletypes = function () {
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
                        auditoria_lista_correctiva.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'auditoria_lista_correctiva',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    auditoria_lista_correctiva.modal.modalView("templates/components/gallery", {
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
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    auditoria_lista_correctiva.triggers.table.after.open = async function (data) {
        auditoria_lista_correctiva.lista_responsables = await BASEAPI.listp('auditoria_lista_correctiva_responsable', {
            limit: 0,
            where: [
                {
                    field: "auditoria_lista_correctiva",
                    value: auditoria_lista_correctiva.id
                }
            ]
        });
        auditoria_lista_correctiva.lista_responsables = auditoria_lista_correctiva.lista_responsables.data;
        auditoria_lista_correctiva.lista_cargos = await BASEAPI.listp('auditoria_lista_correctiva_cargo', {
            limit: 0,
            where: [
                {
                    field: "auditoria_lista_correctiva",
                    value: auditoria_lista_correctiva.id
                }
            ]
        });
        auditoria_lista_correctiva.lista_cargos = auditoria_lista_correctiva.lista_cargos.data;
        // if (auditoria_lista_correctiva.lista_responsables.length === 0) {
        //     BASEAPI.insert('auditoria_lista_correctiva_responsable', {
        //         responsable: auditoria_lista_correctiva.session.id,
        //         auditoria_lista_correctiva: auditoria_lista_correctiva.id
        //     }, async function (result) {
        //         auditoria_lista_correctiva.responsable.push(auditoria_lista_correctiva.session.id + '')
        //         auditoria_lista_correctiva.form.loadDropDown('responsable');
        //     })
        // }
        // if (auditoria_lista_correctiva.lista_cargos.length === 0) {
        //     BASEAPI.insert('auditoria_lista_correctiva_cargo', {
        //         cargo: auditoria_lista_correctiva.session.cargo,
        //         auditoria_lista_correctiva: auditoria_lista_correctiva.id
        //     }, async function (result) {
        //         auditoria_lista_correctiva.cargos.push(auditoria_lista_correctiva.session.cargo + '')
        //         auditoria_lista_correctiva.form.loadDropDown('cargos');
        //     })
        // }
        await auditoria_lista_correctiva.get_list_data()
        //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    };
    auditoria_lista_correctiva.triggers.table.before.open = () => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
        if (auditoria_lista_correctiva.form.mode === "new")
            auditoria_lista_correctiva.id = undefined;
        resolve(true);
    });
    //
    auditoria_lista_correctiva.triggers.table.after.close = function (data) {
        auditoria_lista_correctiva.Checked = false;
        auditoria_lista_correctiva.refresh();
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    auditoria_lista_correctiva.triggers.table.after.insert = function (data) {
        //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        if (typeof vw_correctiva !== "undefined") {
            console.log(data)
            BASEAPI.insert('modulo_notificacion_task', {
                accion: "CSNC",
                record_id: data.inserted.id,
                date: moment().format("YYYY-MM-DD")
            }, function (result) {
                if (result)
                    vw_correctiva.refresh();
            })

        }
        if (typeof riesgo !== "undefined") {
            riesgo_a.refreshAngular();
            riesgo.refresh();
        }
        return true;
    };
    auditoria_lista_correctiva.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);

        let cargosSeleccionados = auditoria_lista_correctiva.cargos !== "[NULL]" ?
            (auditoria_lista_correctiva.cargos || []) : [];
        cargosSeleccionados = cargosSeleccionados.map(d => parseInt(d) || 0);
        
        let usuariosSeleccionados = auditoria_lista_correctiva.responsable !== "[NULL]" ?
            (auditoria_lista_correctiva.responsable || []) : [];
        usuariosSeleccionados = usuariosSeleccionados.map(d => parseInt(d) || 0);

        if (!cargosSeleccionados.length && !usuariosSeleccionados.length) {
            SWEETALERT.show({
                type: 'error',
                message: `Debe de agregar al menos un cargo o persona responsable`,
            });
            let buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        }
        if (auditoria_lista_correctiva.mind)
            data.inserting.causa = JSON.stringify(auditoria_lista_correctiva.mind.getAllData());

        if (auditoria_lista_correctiva.presupuesto === "") {
            data.inserting.presupuesto = 0;
        }
        if ((auditoria_lista_correctiva.responsable == '[NULL]' || auditoria_lista_correctiva.responsable.length === 0) && (auditoria_lista_correctiva.cargos == '[NULL]' || auditoria_lista_correctiva.cargos.length === 0)) {
            SWEETALERT.show({
                type: 'error',
                message: `Debe de agregar al menos un cargo o persona responsable`,
            });
            let buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        }
        data.inserting.estatus = 1;
        resolve(true);
    });
    //
    auditoria_lista_correctiva.triggers.table.after.update = function (data) {
        //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        if (typeof vw_correctiva !== "undefined")
            vw_correctiva.refresh();
        if (typeof riesgo !== "undefined") {
            riesgo_a.refreshAngular();
            riesgo.refresh();
        }
    };
    auditoria_lista_correctiva.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);

        if (auditoria_lista_correctiva.mind)
            data.updating.causa = JSON.stringify(auditoria_lista_correctiva.mind.getAllData());

        if ((auditoria_lista_correctiva.responsable == '[NULL]' || auditoria_lista_correctiva.responsable.length === 0) && (auditoria_lista_correctiva.cargos == '[NULL]' || auditoria_lista_correctiva.cargos.length === 0)) {
            SWEETALERT.show({
                type: 'error',
                message: `Debe de agregar al menos un cargo o persona responsable`,
            });
            let buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        }
        if (auditoria_lista_correctiva.estatus == 4) {
            data.updating.ejecucion = moment().format('YYYY-MM-DD hh:mm:ss');
        }
        resolve(true);
    });
    //
    auditoria_lista_correctiva.triggers.table.after.control = function (data) {
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        if (data == "range_date") {
            if (typeof riesgo != "undefined") {
                if (riesgo) {
                    if (typeof riesgo !== 'not defined') {
                        var rango_minimo = moment("01-01-" + riesgo.ano_historico).format("YYYY-MM-DD");
                        var rango_maximo = moment(("01-01-" + moment("01-01-" + riesgo.ano_historico).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                        auditoria_lista_correctiva.range_date_min(rango_minimo);
                        auditoria_lista_correctiva.range_date_max(rango_maximo);
                        //cambio placebo
                        if (moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                            auditoria_lista_correctiva.range_date_start(rango_minimo);
                            auditoria_lista_correctiva.range_date_end(rango_minimo);
                        }
                        auditoria_lista_correctiva.refreshAngular();
                    }
                }
            }
        }
    };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    auditoria_lista_correctiva.afterDelete = async function (data) {
        if (typeof riesgo !== "undefined") {
            if (typeof riesgo !== "not defined") {
                if (riesgo) {
                    if (riesgo.esplan) {
                        riesgo.list_acciones_correctivas = await BASEAPI.listp('auditoria_lista_correctiva', {
                            limit: 0,
                            order: "desc",
                            where: [
                                {
                                    field: "riesgo",
                                    value: Matriz_id
                                }
                            ]
                        });
                        riesgo.list_acciones_correctivas = riesgo.list_acciones_correctivas.data;
                        riesgo_a.list_acciones_correctivas = riesgo.list_acciones_correctivas;
                        riesgo_a.refreshAngular();
                    }
                }
            }
        }
    };

    auditoria_lista_correctiva.cargosInDepartamentos = function (cargoID) {
        let cargos = auditoria_lista_correctiva.form?.options?.cargos?.data || [];
        let usuarios = auditoria_lista_correctiva.form?.options?.responsable?.data || [];
        let departamentosSeleccionados = auditoria_lista_correctiva.departamento !== "[NULL]" ?
            (auditoria_lista_correctiva.departamento || []) : [];
        departamentosSeleccionados = departamentosSeleccionados.map(d => parseInt(d, 10)).filter(id => !isNaN(id) && id > 0);
        if (!departamentosSeleccionados.length)
            return true;
        let usuariosConDepartamentosSeleccionads = usuarios.filter(d => departamentosSeleccionados.indexOf(d.departamento) !== -1);
        let cargosDeUsuariosDeLosDepartamentosSel = usuariosConDepartamentosSeleccionads.map(d => d.cargo);
        return cargosDeUsuariosDeLosDepartamentosSel.indexOf(cargoID) !== -1;
    };
    auditoria_lista_correctiva.usuariosDelCargoYODepartamento = function (departamentoID, cargoID) {
        let cargos = auditoria_lista_correctiva.form?.options?.cargos?.data || [];
        let usuarios = auditoria_lista_correctiva.form?.options?.responsable?.data || [];
        let cargosSeleccionados = auditoria_lista_correctiva.cargos !== "[NULL]" ?
            (auditoria_lista_correctiva.cargos || []) : [];
        let departamentosSeleccionados = auditoria_lista_correctiva.departamento !== "[NULL]" ?
            (auditoria_lista_correctiva.departamento || []) : [];
        cargosSeleccionados = cargosSeleccionados.map(d => parseInt(d, 10)).filter(id => !isNaN(id) && id > 0);

        departamentosSeleccionados = departamentosSeleccionados.map(d => parseInt(d, 10)).filter(id => !isNaN(id) && id > 0);

        if (!departamentosSeleccionados.length && !cargosSeleccionados.length)
            return true;
        if (departamentosSeleccionados.length && !cargosSeleccionados.length) {
            return departamentosSeleccionados.indexOf(departamentoID) !== -1;
        } else if (!departamentosSeleccionados.length && cargosSeleccionados.length) {
            return cargosSeleccionados.indexOf(cargoID) !== -1;
        } else if (departamentosSeleccionados.length && cargosSeleccionados.length) {
            return cargosSeleccionados.indexOf(cargoID) !== -1 && departamentosSeleccionados.indexOf(departamentoID) !== -1;
        }
    };

    auditoria_lista_correctiva.check_if_exists = function (item) {
        if (auditoria_lista_correctiva.departamento !== "[NULL]") {
            const departmentList = auditoria_lista_correctiva.departamento.map(String);
            let cargis = auditoria_lista_correctiva.cargos;
            if (cargis === "[NULL]")
                cargis = [];
            const jobList = (cargis || []).map(String);

            switch (true) {
                case (departmentList.length > 0 && jobList.length > 0):
                    return departmentList.includes(String(item.departamento)) && jobList.includes(String(item.cargo));
                case (departmentList.length > 0):
                    return departmentList.includes(String(item.departamento));
                case (jobList.length > 0):
                    return jobList.includes(String(item.cargo));
                default:
                    return false;
            }
        }
    }
    auditoria_lista_correctiva.get_list_data = async function () {
        auditoria_lista_correctiva.responsables = await BASEAPI.listp('vw_usuario', {
            limit: 0,
            where: [
                {
                    field: "id",
                    value: auditoria_lista_correctiva.responsable
                }
            ]
        });
        auditoria_lista_correctiva.cargos_list = await BASEAPI.listp('cargo', {
            limit: 0,
            where: [
                {
                    field: "id",
                    value: auditoria_lista_correctiva.cargos
                }
            ]
        });
        auditoria_lista_correctiva.refreshAngular();
    }
});
