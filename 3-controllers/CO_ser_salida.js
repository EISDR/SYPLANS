app.controller("ser_salida", function ($scope, $http, $compile) {
    ready = async () => {
        ser_salida = this;
        //ser_salida.fixFilters = [];
        ser_salida.session = new SESSION().current();
        ser_salida.trabajando = false;
        ser_salida.showmerelations = false;
        ser_salida.fixFilters = [
            {
                field: "compania",
                value: ser_salida.session.compania_id
            }
        ];
        ser_salida.singular = "Salida no Conforme";
        ser_salida.plural = "Salidas no Conforme";
        ser_salida.headertitle = "Salidas no Conforme";
        ser_salida.show_diagram = true;
        ser_salida.my_true_estatus = 1;
        //ser_salida.destroyForm = false;
        //ser_salida.permissionTable = "tabletopermission";
        RUNCONTROLLER("ser_salida", ser_salida, $scope, $http, $compile);
        ser_salida.predeterminado = { color:"#969696", nombre: "Nivel Indeterminado"};
        ser_salida.niveles = await BASEAPI.listf("nivel_riesgo_salida", [
            {
                field: "compania",
                value: ser_salida.session.compania_id
            },
            {
                field: "institucion",
                operator: ser_salida.session.institucion_id ? "=" : "is",
                value: ser_salida.session.institucion_id ? ser_salida.session.institucion_id : "$null"
            }
        ]);
        ser_salida.formulary = function (data, mode, defaultData, trabajando, view) {
            if (ser_salida !== undefined) {
                ser_salida.trabajando = trabajando;
                RUN_B("ser_salida", ser_salida, $scope, $http, $compile);
                ser_salida.form.modalWidth = ENUM.modal.width.full;
                ser_salida.form.readonly = {compania: ser_salida.session.compania_id};
                ser_salida.form.titles = {
                    new: (!trabajando ? "Agregar" : "Trabajar") + " Salida no Conforme",
                    edit: (!trabajando ? "Editar" : "Trabajar") + " Salida no Conforme",
                    view: "Ver Salida no Conforme"
                };

                ser_salida.createForm(data, mode, defaultData, view);
                ser_salida.mode = mode;
                //ms_product.selectQueries['compania'] = [
                //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
                //    }
                //];
                ser_salida.selectQueries['ser_salida_estatus'] = [
                    {
                        field: 'rol',
                        operator: '=',
                        value: ser_salida.session.groups[0].id
                    }
                ];
                $scope.$watch("ser_salida.nombre", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'nombre', rules);
                });
                $scope.$watch("ser_salida.descripcion", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'descripcion', rules);
                });
                //ms_product.selectQueries['ser_salida_tipo'] = [
                //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
                //    }
                //];
                $scope.$watch("ser_salida.esproceso", function (value) {
                    var rules = [];
                    //rules here
                    if (value) {
                        var rules_proceso = [];
                        ser_salida.validate['ser_servicio'] = {
                            messages: "",
                            type: "success",
                            valid: true
                        };
                        ser_salida.nivel_urgencia = ser_salida.nivel_urgencia == "[NULL]" ? "" : ser_salida.nivel_urgencia;
                        ser_salida.nivel_impacto = ser_salida.nivel_impacto== "[NULL]" ? "" : ser_salida.nivel_impacto;
                        ser_salida.refreshAngular();
                        rules_proceso.push(VALIDATION.general.required(ser_salida.proceso));
                        VALIDATION.validate(ser_salida, 'proceso', rules_proceso);
                    } else {
                        var rules_ser_servicio = [];
                        ser_salida.validate['proceso'] = {
                            messages: "",
                            type: "success",
                            valid: true
                        };
                        rules_ser_servicio.push(VALIDATION.general.required(ser_salida.ser_servicio));
                        VALIDATION.validate(ser_salida, 'ser_servicio', rules_ser_servicio);
                    }
                });
                $scope.$watch("ser_salida.ser_salida_tipo", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'ser_salida_tipo', rules);
                });
                $scope.$watch("ser_salida.ser_servicio", function (value) {
                    var rules = [];
                    //rules here
                    if (!ser_salida.esproceso) {
                        rules.push(VALIDATION.general.required(value));
                    } else {
                        ser_salida.validate['ser_servicio'] = {
                            messages: "",
                            type: "success",
                            valid: true
                        };
                    }
                    VALIDATION.validate(ser_salida, 'ser_servicio', rules);
                });
                $scope.$watch("ser_salida.proceso", function (value) {
                    var rules = [];
                    //rules here
                    if (!ser_salida.esproceso) {
                        ser_salida.validate['proceso'] = {
                            messages: "",
                            type: "success",
                            valid: true
                        };
                    } else {
                        rules.push(VALIDATION.general.required(value));
                    }
                    VALIDATION.validate(ser_salida, 'proceso', rules);
                });
                $scope.$watch("ser_salida.nivel_urgencia", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'nivel_urgencia', rules);
                });
                $scope.$watch("ser_salida.nivel_impacto", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'nivel_impacto', rules);
                });
                //ms_product.selectQueries['ser_salida_estatus'] = [
                //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
                //    }
                //];
                $scope.$watch("ser_salida.ser_salida_estatus", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'ser_salida_estatus', rules);
                });
                $scope.$watch("ser_salida.nombre_queja", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'nombre_queja', rules);
                });
                $scope.$watch("ser_salida.telefono_queja", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'telefono_queja', rules);
                });
                $scope.$watch("ser_salida.correo_queja", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    rules.push(VALIDATION.text.email(value));
                    VALIDATION.validate(ser_salida, 'correo_queja', rules);
                });
                $scope.$watch("ser_salida.detalle_reporte", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'detalle_reporte', rules);
                });
                $scope.$watch("ser_salida.fecha_queja", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'fecha_queja', rules);
                });
                $scope.$watch("ser_salida.fecha_solucion", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'fecha_solucion', rules);
                });
                $scope.$watch("ser_salida.comentario_cerrar", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'comentario_cerrar', rules);
                });
                $scope.$watch("ser_salida.fecha_compromiso", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(ser_salida, 'fecha_compromiso', rules);
                });
            }
        };
        ser_salida.currentNivel = () => {
            let proceso = ser_salida.esproceso ? 1 : 0;
            if (!ser_salida.esproceso) {
                let p = (ser_salida.nivel_urgencia_object ? ser_salida.nivel_urgencia_object.valor : 0) / 100;
                let i = (ser_salida.nivel_impacto_object ? ser_salida.nivel_impacto_object.valor : 0);
                let n = p * i;
                ser_salida.predeterminado.calc = Number(n).toFixed(2);
                let nivel = ser_salida.niveles.filter(d => {
                    return n >= d.valor && n <= d.valor_to && d.proceso === proceso;
                })[0];
                if (nivel) {
                    nivel.calc = Number(n).toFixed(2);
                }
                return nivel || ser_salida.predeterminado;
            }else{
                let g = ser_salida.nivel_urgencia || 0;
                let o = ser_salida.nivel_impacto || 0;
                let d = ser_salida.nivel_detectabilidad || 0;
                let n = g * o * d;
                ser_salida.predeterminado.calc = Number(n).toFixed(2);
                let nivel = ser_salida.niveles.filter(d => {
                    return n >= d.valor && n <= d.valor_to && d.proceso === proceso;
                })[0];
                if (nivel) {
                    nivel.calc = Number(n).toFixed(2);
                }
                return nivel || ser_salida.predeterminado;
            }
            return undefined;
        };

        ser_salida.triggers.table.after.load = async function (records) {
            ser_salida.niveles = await BASEAPI.listf("nivel_riesgo_salida", [
                {
                    field: "compania",
                    value: ser_salida.session.compania_id
                },
                {
                    field: "institucion",
                    operator: ser_salida.session.institucion_id ? "=" : "is",
                    value: ser_salida.session.institucion_id ? ser_salida.session.institucion_id : "$null"
                }
            ]);
        };
        ser_salida.downloadDiagram = () => {
            let image = ser_salida.myDiagram.makeImage({
                scale: 1
            });
            var a = document.createElement("a"); //Create <a>
            a.href = image.src; //Image Base64 Goes here
            a.download = "Flujo de Trabajo - Salidas no conformes.png";
            a.click();
        };
        ser_salida.diagram = () => {
            ser_salida.modal.modalView("ser_salida/diagram", {
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
                    sameController: 'ser_salida',
                },
                event: {
                    show: {
                        end: async function (data) {
                            SWEETALERT.loading({message: "Cargando Diagrama"});
                            ser_salida.statusList = await BASEAPI.listp('vw_modulo_estatus', {
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
                            ser_salida.statusList = ser_salida.statusList.data;
                            setTimeout(async function () {
                                const $$$ = go.GraphObject.make;
                                let statusList = ser_salida.statusList;
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

                                ser_salida.myDiagram = new go.Diagram(
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
                                ser_salida.myDiagram.div.style.backgroundColor = colors.background;
                                ser_salida.myDiagram.nodeTemplate = new go.Node('Auto', {
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
                                ser_salida.myDiagram.linkTemplate = new go.Link(
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
                                ser_salida.myDiagram.model = go.Model.fromJson(JSON.stringify(thejson));
                                SWEETALERT.stop();
                            }, 1000)
                        }
                    }
                }
            });
        }
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
        ser_salida.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
            //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
            if (!ser_salida.esproceso) {
                data.inserting.proceso = "$null";
            } else {
                data.inserting.ser_servicio = "$null";
            }
            const format = "YYYY-MM-DD";
            if (moment(ser_salida.fecha_compromiso, format).isBefore(moment(ser_salida.fecha_queja, format))) {
                SWEETALERT.show({
                    type: "error",
                    message: "La fecha límite de compromiso no puede ser menor a la fecha de creación de la queja",
                })
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
            }
            resolve(true);
        });
        //
        // $scope.triggers.table.after.update = function (data) {
        //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        // };
        ser_salida.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
            if (!ser_salida.esproceso) {
                data.updating.proceso = "$null";
            } else {
                data.updating.ser_servicio = "$null";
            }
            const format = "YYYY-MM-DD";
            if (moment(ser_salida.fecha_compromiso, format).isBefore(moment(ser_salida.fecha_queja, format))) {
                SWEETALERT.show({
                    type: "error",
                    message: "La fecha límite de compromiso no puede ser menor a la fecha de creación de la queja",
                })
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
            }
            if (ser_salida.estatusbefore !== ser_salida.ser_salida_estatus) {
                let elcoment = data.updating.comentario + "";
                data.updating.comentario = "";
                BASEAPI.insertp('ser_salida_comentario',
                    {
                        "comentario": elcoment,
                        "ser_salida": ser_salida.id,
                        "fecha": "$now()",
                        "usuario": ser_salida.session.usuario,
                        "estatus": ser_salida.ser_salida_estatus_object.nombre,
                    }).then(d => {
                    resolve(true);
                });
            }
            resolve(true);
        });
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
    }
    ready();
});