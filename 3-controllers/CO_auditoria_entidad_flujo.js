app.controller("auditoria_entidad_flujo", function ($scope, $http, $compile) {
    auditoria_entidad_flujo = this;
    //auditoria_entidad_flujo.fixFilters = [];
    auditoria_entidad_flujo.singular = "singular";
    auditoria_entidad_flujo.plural = "plural";
    auditoria_entidad_flujo.headertitle = "Entidades";
    //auditoria_entidad_flujo.destroyForm = false;
    //auditoria_entidad_flujo.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_entidad_flujo", auditoria_entidad_flujo, $scope, $http, $compile);
    RUN_B("auditoria_entidad_flujo", auditoria_entidad_flujo, $scope, $http, $compile);
    auditoria_entidad_flujo.formulary = function (data, mode, defaultData) {
        if (auditoria_entidad_flujo !== undefined) {
            RUN_B("auditoria_entidad_flujo", auditoria_entidad_flujo, $scope, $http, $compile);
            auditoria_entidad_flujo.form.modalWidth = ENUM.modal.width.full;
            auditoria_entidad_flujo.form.readonly = {};
            auditoria_entidad_flujo.createForm(data, mode, defaultData);
            $scope.$watch("auditoria_entidad_flujo.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_entidad_flujo, 'nombre', rules);
            });
            $scope.$watch("auditoria_entidad_flujo.controller", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_entidad_flujo, 'controller', rules);
            });
            $scope.$watch("auditoria_entidad_flujo.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_entidad_flujo, 'descripcion', rules);
            });
        }
    };
    auditoria_entidad_flujo.downloadDiagram = (entidad) => {
        let image = vw_correctiva.myDiagram.makeImage({
            scale: 1
        });
        var a = document.createElement("a"); //Create <a>
        a.href = image.src; //Image Base64 Goes here
        a.download = `Flujo de Trabajo - ${entidad}.png`;
        a.click();
    };
    auditoria_entidad_flujo.diagram = (entidad) => {
        auditoria_entidad_flujo.modal.modalView("auditoria_entidad_flujo/diagram", {
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
                sameController: 'auditoria_entidad_flujo',
            },
            event: {
                show: {
                    end: async function (data) {
                        SWEETALERT.loading({message: "Cargando Diagrama"});
                        auditoria_entidad_flujo.statusList = await BASEAPI.listp('vw_modulo_estatus', {
                            limit: 0,
                            orderby: "entidad",
                            order: "asc",
                            where: [
                                {
                                    "field": "entidad",
                                    "value":  entidad
                                }
                            ]
                        });
                        auditoria_entidad_flujo.statusList = auditoria_entidad_flujo.statusList.data;
                        auditoria_entidad_flujo.nombre_entidad = entidad;
                        setTimeout(async function () {
                            const $$$ = go.GraphObject.make;
                            let statusList = auditoria_entidad_flujo.statusList;
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

                            auditoria_entidad_flujo.myDiagram = new go.Diagram(
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
                            auditoria_entidad_flujo.myDiagram.div.style.backgroundColor = colors.background;
                            auditoria_entidad_flujo.myDiagram.nodeTemplate = new go.Node('Auto', {
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
                            auditoria_entidad_flujo.myDiagram.linkTemplate = new go.Link(
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
                            auditoria_entidad_flujo.myDiagram.model = go.Model.fromJson(JSON.stringify(thejson));
                            SWEETALERT.stop();
                        }, 1000)
                    }
                }
            }
        });
    }
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
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
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