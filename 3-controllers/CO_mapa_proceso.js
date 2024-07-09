app.controller("mapa_proceso", function ($scope, $http, $compile) {
    mapa_proceso = this;
    mapa_proceso.session = new SESSION().current();
    mapa_proceso.fixFilters = [
        {
            field: "estatus",
            value: "4"
        },
        {
            field: "compania",
            value:  mapa_proceso.session.compania_id
        },
        {
            "field": "institucion",
            "operator":  mapa_proceso.session.institucion_id ? "=" : "is",
            "value":  mapa_proceso.session.institucion_id ?  mapa_proceso.session.institucion_id : "$null"
        }
    ];
    //mapa_proceso.singular = "singular";
    //mapa_proceso.plural = "plural";
    mapa_proceso.headertitle = "Mapas de procesos Anteriores";
    mapa_proceso.destroyForm = false;
    mapa_proceso.show_diagram = true;
    //mapa_proceso.permissionTable = "tabletopermission";
    mapa_proceso.current_year = moment().format('YYYY');
    var do_me_once = false;
    RUNCONTROLLER("mapa_proceso", mapa_proceso, $scope, $http, $compile);
    RUN_B("mapa_proceso", mapa_proceso, $scope, $http, $compile);
    mapa_proceso.getMapa = async function () {
        var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value:  mapa_proceso.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  mapa_proceso.session.institucion_id ? "=" : "is",
                    "value":  mapa_proceso.session.institucion_id ?  mapa_proceso.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (mapaData) {
            mapa_proceso.created = true;
            mapa_proceso.id = mapaData.id;
            mapa_proceso.nombre = mapaData.nombre;
            mapa_proceso.descripcion = mapaData.descripcion;
            mapa_proceso.ano = mapaData.ano + "";
            mapa_proceso.ano_view = mapaData.ano + '';
            mapa_proceso.estatus = mapaData.estatus + '';
            mapa_proceso.current_estatus = mapaData.estatus;
            mapa_proceso.estatus_nombre = mapaData.estatus_nombre;
            mapa_proceso.compania = mapaData.compania;
            mapa_proceso.institucion = mapaData.institucion;
            mapa_proceso.lista_ano = [];
            for (var a = 2018; a <= 3000; a++) {
                mapa_proceso.lista_ano.push(a);
            }
            mapa_proceso.form.loadDropDown('estatus')
        }else{
            mapa_proceso.created = false;
            mapa_proceso.estatus_nombre = "Abierto";
            mapa_proceso.current_estatus = 1;
            mapa_proceso.lista_ano = [];
            for (var a = 2018; a <= 3000; a++) {
                mapa_proceso.lista_ano.push(a);
            }
        }
        mapa_proceso.refreshAngular();
    };
    mapa_proceso.getMapa();
    mapa_proceso.selectQueries['estatus'] = [
        {
            field: 'rol',
            operator: '=',
            value: mapa_proceso.session.groups[0].id
        }
    ];
    $scope.$watch("mapa_proceso.nombre", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(mapa_proceso, 'nombre', rules);
    });
    $scope.$watch("mapa_proceso.ano", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(mapa_proceso, 'ano', rules);
    });
    $scope.$watch("mapa_proceso.estatus", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(mapa_proceso, 'estatus', rules);
    });
    $scope.$watch("mapa_proceso.descripcion", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(mapa_proceso, 'descripcion', rules);
    });
    mapa_proceso.formulary = function (data, mode, defaultData) {
        if (mapa_proceso !== undefined) {
            RUN_B("mapa_proceso", mapa_proceso, $scope, $http, $compile);
            mapa_proceso.form.modalWidth = ENUM.modal.width.full;
            mapa_proceso.form.readonly = {compania: mapa_proceso.session.compania_id};
            mapa_proceso.form.titles = {
                new: `Transferir ${mapa_proceso.nombre} ${mapa_proceso.ano_view} a un nuevo mapa de proceso`,
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            mapa_proceso.ano = '[NULL]';
            mapa_proceso.form.fileds.push('ano')
            mapa_proceso.createForm(data, mode, defaultData);

        }
    };
    mapa_proceso.cleanFields = function (){
        mapa_proceso.nombre = "";
        mapa_proceso.descripcion = "";
        mapa_proceso.ano = "[NULL]";
        mapa_proceso.refresh();
        mapa_proceso.refreshAngular();
    }
    mapa_proceso.saveData = function () {
        if (mapa_proceso.created){
            VALIDATION.save(mapa_proceso, async function () {
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                BASEAPI.updateall('mapa_proceso', {
                    nombre: mapa_proceso.nombre ? mapa_proceso.nombre : "$null",
                    descripcion: mapa_proceso.descripcion ? mapa_proceso.descripcion : "$null",
                    ano: mapa_proceso.ano ?  mapa_proceso.ano  : "$null",
                    estatus: mapa_proceso.estatus ? mapa_proceso.estatus : 1,
                    compania: mapa_proceso.session.compania_id ? mapa_proceso.session.compania_id : "$null",
                    institucion: mapa_proceso.session.institucion_id ? mapa_proceso.session.institucion_id : "$null",
                    where: [
                        {
                            field: "id",
                            value: mapa_proceso.id
                        }
                    ]
                }, function (result) {
                    mapa_proceso.current_estatus = mapa_proceso.estatus;
                    mapa_proceso.last_estatus = mapa_proceso.estatus;
                    if (mapa_proceso.firsttime ){
                        SWEETALERT.show({
                            message: "Mapa de Proceso ha sido Creado",
                            confirm: function(){
                                if (mapa_proceso.last_estatus == 4){
                                    location.reload();
                                }
                            }
                        });
                        mapa_proceso.firsttime = false;
                    }else {
                        SWEETALERT.show({
                            message: "Mapa de Proceso ha sido modificado",
                            confirm: function(){
                                if (mapa_proceso.last_estatus == 4){
                                    location.reload();
                                }
                            }
                        });
                    }
                    if (mapa_proceso.estatus == 2){
                        titulo_push = `El Mapa de Proceso "${mapa_proceso.nombre}" ha sido Elaborado.`;
                        cuerpo_push = `Se ha Elaborado el Mapa de Proceso "${mapa_proceso.nombre}"`;
                        titulo = `El Mapa de Proceso "${mapa_proceso.nombre}" ha sido Elaborado`
                        cuerpo = `Se ha elaborado el mapa de proceso  "${ mapa_proceso.nombre }".
                            
Los Supervisores y Anlistas de Calidad deben proceder a definir los planes de auditoría.
                            
Gracias.`;
                        function_send_email_custom_group(titulo_push, cuerpo_push, titulo, cuerpo, mapa_proceso.session.compania_id, mapa_proceso.session.institucion_id, [18,17], 4);
                    }
                    mapa_proceso.cleanFields();
                    mapa_proceso.getMapa()
                });
            },["nombre", "ano", 'estatus']);
        }else {
            VALIDATION.save(mapa_proceso, async function () {
                BASEAPI.insertID('mapa_proceso', {
                    nombre: mapa_proceso.nombre,
                    descripcion: mapa_proceso.descripcion ? mapa_proceso.descripcion : "$null",
                    ano: mapa_proceso.ano ?  mapa_proceso.ano  : "$null",
                    estatus: 1,
                    compania: mapa_proceso.session.compania_id ? mapa_proceso.session.compania_id : "$null",
                    institucion: mapa_proceso.session.institucion_id ? mapa_proceso.session.institucion_id : "$null",
                }, '','',async function (result) {
                    if (result.data.data.length > 0) {
                        SWEETALERT.stop();
                        mapa_proceso.firsttime = true;
                        mapa_proceso.estatus = "1";
                        mapa_proceso.form.loadDropDown('estatus');
                        mapa_proceso.refreshAngular();
                        var auditoriaData = await BASEAPI.firstp('vw_mapa_proceso', {
                            order: "desc",
                            where: [
                                {
                                    field: "compania",
                                    value: mapa_proceso.session.compania_id
                                },
                                {
                                    "field": "institucion",
                                    "operator":  mapa_proceso.session.institucion_id ? "=" : "is",
                                    "value":  mapa_proceso.session.institucion_id ?  mapa_proceso.session.institucion_id : "$null"
                                },
                                {
                                    field: "estatus",
                                    operator: "!=",
                                    value: 4
                                }
                            ]
                        });
                        if (auditoriaData) {
                            mapa_proceso.created = true;
                            mapa_proceso.id = auditoriaData.id;
                            mapa_proceso.nombre = auditoriaData.nombre;
                            mapa_proceso.descripcion = auditoriaData.descripcion;
                            mapa_proceso.ano = auditoriaData.ano + "";
                            mapa_proceso.ano_view = auditoriaData.ano + "";
                            mapa_proceso.estatus = auditoriaData.estatus + '';
                            mapa_proceso.current_estatus = auditoriaData.estatus;
                            mapa_proceso.estatus_nombre = auditoriaData.estatus_nombre;
                            mapa_proceso.compania = auditoriaData.compania;
                            mapa_proceso.institucion = auditoriaData.institucion;
                            SWEETALERT.show({message: "Mapa de Proceso ha sido Creado"});
                            mapa_proceso.getMapa()
                            mapa_proceso.form.loadDropDown('estatus')
                        }else{
                            mapa_proceso.created = false;
                            mapa_proceso.estatus_nombre = "En elaboración";
                            mapa_proceso.current_estatus = 1;
                        }
                        SWEETALERT.show({message: "Mapa de Proceso ha sido Creado"});
                        mapa_proceso.refreshAngular();
                    }
                });
            },["nombre", "ano", 'estatus']);
        }
    }
    mapa_proceso.cancelar = function (){
        location.reload();
    };
    mapa_proceso.downloadDiagram = () => {
        let image = mapa_proceso.myDiagram.makeImage({
            scale: 1
        });
        var a = document.createElement("a"); //Create <a>
        a.href = image.src; //Image Base64 Goes here
        a.download = "Flujo de Trabajo - Mapa de proceso.png";
        a.click();
    };
    mapa_proceso.diagram = () => {
        mapa_proceso.modal.modalView("mapa_proceso/diagram", {
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
                sameController: 'mapa_proceso',
            },
            event: {
                show: {
                    end: async function (data) {
                        SWEETALERT.loading({message: "Cargando Diagrama"});
                        mapa_proceso.statusList = await BASEAPI.listp('vw_modulo_estatus', {
                            limit: 0,
                            orderby: "entidad",
                            order: "asc",
                            where: [
                                {
                                    "field": "entidad",
                                    "value": "Mapa de Procesos"
                                }
                            ]
                        });
                        mapa_proceso.statusList = mapa_proceso.statusList.data;
                        setTimeout(async function () {
                            const $$$ = go.GraphObject.make;
                            let statusList = mapa_proceso.statusList;
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

                            mapa_proceso.myDiagram = new go.Diagram(
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
                            mapa_proceso.myDiagram.div.style.backgroundColor = colors.background;
                            mapa_proceso.myDiagram.nodeTemplate = new go.Node('Auto', {
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
                            mapa_proceso.myDiagram.linkTemplate = new go.Link(
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
                            mapa_proceso.myDiagram.model = go.Model.fromJson(JSON.stringify(thejson));
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
    mapa_proceso.triggers.table.after.insert = function (data) {
        //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        let queryTopas = `insert into procesos_categoria(nombre, descripcion,compania,institucion,mapa_proceso,herencia)

select nombre,descripcion,compania,institucion,(select max(r.id) from mapa_proceso r),id from procesos_categoria where compania=${mapa_proceso.session.compania_id} and mapa_proceso=${mapa_proceso.id};
update mapa_proceso set estatus = 4 where id = ${mapa_proceso.id};
insert into procesos(nombre, descripcion,procesos_categoria,objetivo,alcance,responsable,recursos,active,estatus,mapa_proceso,proceso_general,herencia)

select nombre, descripcion, (select id from procesos_categoria where herencia=procesos.procesos_categoria limit 1), objetivo,alcance,responsable,recursos,1,estatus,(select max(id) from mapa_proceso),proceso_general,id from procesos where mapa_proceso=${mapa_proceso.id} and estatus not in (4,5);

insert into documentos_asociados(codigo,nombre, descripcion,proceso, procesos_categoria, observacion, tipo_documento, estatus, active, objetivo, alcance, marco_legal, resultado_esperado, documento_general,trabaja_marco_legal)

select codigo, nombre, descripcion,  (select id from procesos where herencia=documentos_asociados.proceso limit 1), (select id from procesos_categoria where herencia=documentos_asociados.procesos_categoria limit 1), observacion,tipo_documento,estatus,1,objetivo,alcance,marco_legal,resultado_esperado,documento_general,trabaja_marco_legal from documentos_asociados where proceso in (select id from procesos where mapa_proceso=${mapa_proceso.id}) and estatus not in (4,5);

insert into procesos_elemento(nombre, descripcion,proceso, funcion)

select nombre, descripcion, (select id from procesos where herencia=procesos_elemento.proceso limit 1), funcion from procesos_elemento where proceso in (select id from procesos where mapa_proceso=${mapa_proceso.id});

insert into indicador_generico(table_, registro, nombre, descripcion,fuente,metodo_calculo,tipo_meta,direccion_meta,linea_base,medio_verificacion,periodo,indicador_pei,ano_linea_base,caracteristica,desagregacion_demografica_geografia,observacion,compania,institucion,poa,indicador_generico_entidad,poa_monitoreo,edt,ano,departamento,herencia)

select table_, (select id from procesos where herencia=indicador_generico.registro limit 1),nombre,descripcion,fuente,metodo_calculo,tipo_meta,direccion_meta,linea_base,medio_verificacion,periodo,indicador_pei,ano_linea_base,caracteristica,desagregacion_demografica_geografia,observacion,compania,institucion,poa,indicador_generico_entidad,poa_monitoreo,edt,${mapa_proceso.ano},departamento,id from indicador_generico where registro in (select id from procesos where mapa_proceso=${mapa_proceso.id}) and table_=10;

insert into indicador_generico_periodo(periodo, valor,indicador_generico)

select periodo, valor, (select id from indicador_generico where herencia=indicador_generico_periodo.indicador_generico limit 1) from indicador_generico_periodo where indicador_generico in (select id from indicador_generico where registro in (select id from procesos where mapa_proceso=${mapa_proceso.id}) and table_=10);

`;


        SERVICE.base_db.directQuery({query: queryTopas}, (data) => {
            return true;
        });
        return true;
    };
    mapa_proceso.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        data.inserting.ano = mapa_proceso.ano;
        data.inserting.estatus = 1;
        var ano = await BASEAPI.firstp("mapa_proceso", {
            where: [
                {
                    field: "ano",
                    operator: "=",
                    value: data.inserting.ano
                },
                {
                    field: "compania",
                    operator: "=",
                    value: mapa_proceso.session.compania_id
                },
            ]
        });
        if (ano) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un Mapa de proceso con el año: " + data.inserting.ano
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
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
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    mapa_proceso.triggers.table.after.close = async function (data) {
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        if (CONFIG.mysqlactive)
            SERVICE.base_db.directQuery({query: `call createCache('vw_procesados')`}, (data) => {
                console.log("me ejecute mysql")
                SWEETALERT.stop()
                location.reload();
            });
        else
            SERVICE.base_db.directQuery({query:`select createcache('vw_procesados')`}, (data) => {
                console.log("me ejecute postgre")
                SWEETALERT.stop()
                location.reload();
            });

    };
    mapa_proceso.triggers.table.after.control = function (data) {
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        if (data == 'range_date') {
            mapa_proceso.range_date = "";
            var rango_minimo = moment().format("YYYY-MM-DD");
            mapa_proceso.range_date_min(rango_minimo);
            mapa_proceso.refreshAngular();
        }
        if (data == 'estatus'){
            if (!mapa_proceso.created){
                if (!do_me_once) {
                    mapa_proceso.estatus = "1";
                    mapa_proceso.form.loadDropDown('estatus')
                    do_me_once = true;
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
    //$scope.afterDelete = function (data) {
    //};
});