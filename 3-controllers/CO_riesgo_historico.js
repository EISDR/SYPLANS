app.controller("riesgo_historico", function ($scope, $http, $compile) {
    riesgo_historico = this;
    //riesgo_historico.fixFilters = [];
    riesgo_historico.session = new SESSION().current();
    riesgo_historico.fixFilters = [
        {
            field: "estatus",
            value: 4
        },
        {
            field: "compania",
            value: riesgo_historico.session.compania_id
        },
        {
            "field": "institucion",
            "operator": riesgo_historico.session.institucion_id ? "=" : "is",
            "value": riesgo_historico.session.institucion_id ? riesgo_historico.session.institucion_id : "$null"
        }
    ];
    //riesgo_historico.fixFilters = [{
    //    field: "compania",
    //    value: riesgo_historico.session.compania_id
    //}];
    //riesgo_historico.singular = "singular";
    //riesgo_historico.plural = "plural";
    riesgo_historico.headertitle = "Gestiones de Riesgo Pasadas";
    riesgo_historico.destroyForm = false;
    //riesgo_historico.permissionTable = "tabletopermission";
    riesgo_historico.current_year = moment().format('YYYY');
    riesgo_historico.entidad = window.location.href.split('?')[1] || "amfe";
    var do_me_once = false;
    RUNCONTROLLER("riesgo_historico", riesgo_historico, $scope, $http, $compile);
    RUN_B("riesgo_historico", riesgo_historico, $scope, $http, $compile);
    riesgo_historico.selectQueries['estatus'] = [
        {
            field: 'rol',
            operator: '=',
            value: riesgo_historico.session.groups[0].id
        }
    ];
    $scope.$watch("riesgo_historico.nombre", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_historico, 'nombre', rules);
    });
    $scope.$watch("riesgo_historico.descripcion", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_historico, 'descripcion', rules);
    });
    $scope.$watch("riesgo_historico.ano", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_historico, 'ano', rules);
    });
    $scope.$watch("riesgo_historico.estatus", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_historico, 'estatus', rules);
    });
    riesgo_historico.getRiesgo = async function () {
        var riesgoData = await BASEAPI.firstp('vw_riesgo_historico', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value: riesgo_historico.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": riesgo_historico.session.institucion_id ? "=" : "is",
                    "value": riesgo_historico.session.institucion_id ? riesgo_historico.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (riesgoData) {
            riesgo_historico.created = true;
            riesgo_historico.id = riesgoData.id;
            riesgo_historico.nombre = riesgoData.nombre;
            riesgo_historico.descripcion = riesgoData.descripcion;
            riesgo_historico.ano = riesgoData.ano + '';
            riesgo_historico.ano_view = riesgoData.ano + '';
            riesgo_historico.estatus = riesgoData.estatus + '';
            riesgo_historico.current_estatus = riesgoData.estatus;
            riesgo_historico.estatus_nombre = riesgoData.estatus_nombre;
            riesgo_historico.compania = riesgoData.compania;
            riesgo_historico.institucion = riesgoData.institucion;
            riesgo_historico.form.loadDropDown('estatus')
            riesgo_historico.lista_ano = [];
            for (var a = 2018; a <= 3000; a++) {
                riesgo_historico.lista_ano.push(a);
            }
        } else {
            riesgo_historico.created = false;
            riesgo_historico.ano = '[NULL]';
            riesgo_historico.estatus_nombre = "Abierto";
            riesgo_historico.current_estatus = 1;
            riesgo_historico.lista_ano = [];
            for (var a = 2018; a <= 3000; a++) {
                riesgo_historico.lista_ano.push(a);
            }
        }
        riesgo_historico.refreshAngular();
    };
    riesgo_historico.getRiesgo();
    riesgo_historico.formulary = function (data, mode, defaultData) {
        if (riesgo_historico !== undefined) {
            RUN_B("riesgo_historico", riesgo_historico, $scope, $http, $compile);
            riesgo_historico.form.modalWidth = ENUM.modal.width.full;
            riesgo_historico.form.readonly = {compania: riesgo_historico.session.compania_id};
            riesgo_historico.form.titles = {
                new: `Transferir ${riesgo_historico.nombre} ${riesgo_historico.ano_view} a una nueva gestión de riesgo`,
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            riesgo_historico.ano = "[NULL]";
            riesgo_historico.form.fileds.push('ano');
            riesgo_historico.createForm(data, mode, defaultData);


            $scope.$watch("riesgo_historico.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_historico, 'nombre', rules);
            });


        }
    };
    riesgo_historico.triggers.table.after.control = function (data) {
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        if (data == 'estatus') {
            if (!riesgo_historico.created) {
                if (!do_me_once) {
                    riesgo_historico.estatus = "1";
                    riesgo_historico.form.loadDropDown('estatus')
                    do_me_once = true;
                }
            }
        }
    };
    riesgo_historico.saveData = function () {
        if (riesgo_historico.created) {
            VALIDATION.save(riesgo_historico, async function () {
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                BASEAPI.updateall('riesgo_historico', {
                    nombre: riesgo_historico.nombre ? riesgo_historico.nombre : "$null",
                    descripcion: riesgo_historico.descripcion ? riesgo_historico.descripcion : "$null",
                    ano: riesgo_historico.ano ? riesgo_historico.ano : "$null",
                    estatus: riesgo_historico.estatus ? riesgo_historico.estatus : 1,
                    compania: riesgo_historico.session.compania_id ? riesgo_historico.session.compania_id : "$null",
                    institucion: riesgo_historico.session.institucion_id ? riesgo_historico.session.institucion_id : "$null",
                    where: [
                        {
                            field: "id",
                            value: riesgo_historico.id
                        }
                    ]
                }, function (result) {
                    riesgo_historico.current_estatus = riesgo_historico.estatus;
                    riesgo_historico.last_estatus = riesgo_historico.estatus;
                    if (riesgo_historico.firsttime) {
                        SWEETALERT.show({
                            message: "La gestión de riesgo ha sido Creada",
                            confirm: function(){
                                location.reload();
                            }
                        });
                        riesgo_historico.firsttime = false;
                    } else {
                        SWEETALERT.show({
                            message: "La gestión de riesgo ha sido Modificada",
                            confirm: function(){
                                location.reload();
                            }
                        });
                    }
//                     if (mapa_proceso.estatus == 2){
//                         titulo_push = `El Mapa de Proceso "${mapa_proceso.nombre}" ha sido Elaborado.`;
//                         cuerpo_push = `Se ha Elaborado el Mapa de Proceso "${mapa_proceso.nombre}"`;
//                         titulo = `El Mapa de Proceso "${mapa_proceso.nombre}" ha sido Elaborado`
//                         cuerpo = `Se ha elaborado el mapa de proceso  "${ mapa_proceso.nombre }".
//
// Los Supervisores y Anlistas de Calidad deben proceder a definir los planes de auditoría.
//
// Gracias.`;
//                         function_send_email_custom_group(titulo_push, cuerpo_push, titulo, cuerpo, mapa_proceso.session.compania_id, mapa_proceso.session.institucion_id, [18,17], 4);
//                     }
                    riesgo_historico.cleanFields();
                    riesgo_historico.getRiesgo()
                });
            }, ["nombre", "ano", 'estatus']);
        } else {
            VALIDATION.save(riesgo_historico, async function () {
                BASEAPI.insertID('riesgo_historico', {
                    nombre: riesgo_historico.nombre,
                    descripcion: riesgo_historico.descripcion ? riesgo_historico.descripcion : "$null",
                    ano: riesgo_historico.ano ? riesgo_historico.ano : "$null",
                    estatus: 1,
                    compania: riesgo_historico.session.compania_id ? riesgo_historico.session.compania_id : "$null",
                    institucion: riesgo_historico.session.institucion_id ? riesgo_historico.session.institucion_id : "$null",
                }, '', '', async function (result) {
                    if (result.data.data.length > 0) {
                        SWEETALERT.stop();
                        riesgo_historico.firsttime = true;
                        riesgo_historico.estatus = "1";
                        riesgo_historico.form.loadDropDown('estatus');
                        riesgo_historico.refreshAngular();
                        var riesgoData = await BASEAPI.firstp('vw_riesgo_historico', {
                            order: "desc",
                            where: [
                                {
                                    field: "compania",
                                    value: riesgo_historico.session.compania_id
                                },
                                {
                                    "field": "institucion",
                                    "operator": riesgo_historico.session.institucion_id ? "=" : "is",
                                    "value": riesgo_historico.session.institucion_id ? riesgo_historico.session.institucion_id : "$null"
                                },
                                {
                                    field: "estatus",
                                    operator: "!=",
                                    value: 4
                                }
                            ]
                        });
                        if (riesgoData) {
                            riesgo_historico.created = true;
                            riesgo_historico.id = riesgoData.id;
                            riesgo_historico.nombre = riesgoData.nombre;
                            riesgo_historico.descripcion = riesgoData.descripcion;
                            riesgo_historico.ano = riesgoData.ano;
                            riesgo_historico.estatus = riesgoData.estatus + '';
                            riesgo_historico.current_estatus = riesgoData.estatus;
                            riesgo_historico.estatus_nombre = riesgoData.estatus_nombre;
                            riesgo_historico.compania = riesgoData.compania;
                            riesgo_historico.institucion = riesgoData.institucion;
                            SWEETALERT.show({message: "La gestión de riesgo ha sido Creada"});
                            riesgo_historico.form.loadDropDown('estatus')
                        } else {
                            riesgo_historico.created = false;
                            riesgo_historico.estatus_nombre = "En elaboración";
                            riesgo_historico.current_estatus = 1;
                        }
                        SWEETALERT.show({message: "La gestión de riesgo ha sido Creada"});
                        riesgo_historico.refreshAngular();
                    }
                });
            }, ["nombre", "ano", 'estatus']);
        }
    }
    riesgo_historico.cancelar = function () {
        location.reload();
    };
    riesgo_historico.show_diagram = true;
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    riesgo_historico.triggers.table.after.close = function (data) {
        location.reload();
    };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    riesgo_historico.triggers.table.after.insert = function (data) {
        //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        let queryTopas = `insert into riesgo(table_,nombre,descripcion,probabilidad,impacto,factor_riesgo,consecuencia,compania,institucion,registro,riesgo_entidad,riesgo_a,factor_riesgotext,causa_debilidad,proceso,procesotext,estrategia,observacion,ocurrencia,supuestos,mamfe_efecto,mamfe_causa,mamfe_deteccion,mamfe_gravedad,mamfe_ocurrencia,mamfe_deteccion_current,mamfe_gravedad_current,mamfe_ocurrencia_current,mamfe_elemento,mamfe,condicion,departamento,riesgo_historico,probabilidad_current,impacto_current,herencia)

select table_,nombre,descripcion,probabilidad,impacto,factor_riesgo,consecuencia,compania,institucion,registro,riesgo_entidad,riesgo_a,factor_riesgotext,causa_debilidad,proceso,procesotext,estrategia,observacion,NULL,supuestos,mamfe_efecto,mamfe_causa,mamfe_deteccion,mamfe_gravedad,mamfe_ocurrencia,mamfe_deteccion_current,mamfe_gravedad_current,mamfe_ocurrencia_current,mamfe_elemento,mamfe,condicion,departamento,(select max(r.id) from riesgo_historico r),probabilidad_current,impacto_current,id from riesgo where compania=${riesgo_historico.session.compania_id} and riesgo_historico=${riesgo_historico.id} and mamfe=1;
update riesgo_historico set estatus = 4 where id = ${riesgo_historico.id};
insert into  riesgo_matriz_control(riesgo,nombre,descripcion,efectividad,responsable,fecha_desde,fecha_hasta,recursos_financieros,riesgo_control,mamfe_correctiva,mamfe_fechacumplimiento,mamfe_accion_implantada,mamfe_estatus,mamfe)

select (select id from riesgo  where herencia=riesgo_matriz_control.riesgo limit 1),nombre,descripcion,efectividad,responsable,fecha_desde,fecha_hasta,recursos_financieros,riesgo_control,mamfe_correctiva,mamfe_fechacumplimiento,mamfe_accion_implantada,1,mamfe from riesgo_matriz_control where riesgo in (select id from riesgo where compania=${riesgo_historico.session.compania_id} and riesgo_historico=${riesgo_historico.id} and mamfe=1);`;


        SERVICE.base_db.directQuery({query: queryTopas}, (data) => {
            return true;
        });
    };
    riesgo_historico.triggers.table.before.insert = (data) => new Promise(async(resolve, reject) => {
        data.inserting.ano = riesgo_historico.ano;
        data.inserting.estatus = 1;
        var ano = await BASEAPI.firstp("riesgo_historico", {
            where: [
                {
                    field: "ano",
                    operator: "=",
                    value: data.inserting.ano
                },
                {
                    field: "compania",
                    operator: "=",
                    value: riesgo_historico.session.compania_id
                },
            ]
        });
        if (ano) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un un periodo de gestión de riesgo con el año: " + data.inserting.ano
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    riesgo_historico.downloadDiagram = () => {
        let image = riesgo_historico.myDiagram.makeImage({
            scale: 1
        });
        var a = document.createElement("a"); //Create <a>
        a.href = image.src; //Image Base64 Goes here
        a.download = "Flujo de Trabajo - Periodo Gestión de Riesgo.png";
        a.click();
    };
    riesgo_historico.diagram = () => {
        riesgo_historico.modal.modalView("riesgo_historico/diagram", {
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
                sameController: 'riesgo_historico',
            },
            event: {
                show: {
                    end: async function (data) {
                        SWEETALERT.loading({message: "Cargando Diagrama"});
                        riesgo_historico.statusList = await BASEAPI.listp('vw_modulo_estatus', {
                            limit: 0,
                            orderby: "entidad",
                            order: "asc",
                            where: [
                                {
                                    "field": "entidad",
                                    "value": "Período Gestión de Riesgo"
                                }
                            ]
                        });
                        riesgo_historico.statusList = riesgo_historico.statusList.data;
                        setTimeout(async function () {
                            const $$$ = go.GraphObject.make;
                            let statusList = riesgo_historico.statusList;
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

                            riesgo_historico.myDiagram = new go.Diagram(
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
                            riesgo_historico.myDiagram.div.style.backgroundColor = colors.background;
                            riesgo_historico.myDiagram.nodeTemplate = new go.Node('Auto', {
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
                            riesgo_historico.myDiagram.linkTemplate = new go.Link(
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
                            riesgo_historico.myDiagram.model = go.Model.fromJson(JSON.stringify(thejson));
                            SWEETALERT.stop();
                        }, 1000)
                    }
                }
            }
        });
    }
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
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
});