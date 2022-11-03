app.controller("vw_chart_eje", function ($scope, $http, $compile) {
    vw_chart_eje = this;
    //vw_chart_eje.fixFilters = [];
    //vw_chart_eje.singular = "singular";
    //vw_chart_eje.plural = "plural";
    //vw_chart_eje.headertitle = "Hola Title";
    //vw_chart_eje.destroyForm = false;
    //vw_chart_eje.permissionTable = "tabletopermission";
    vw_chart_eje.session = new SESSION().current();
    RUNCONTROLLER("vw_chart_eje", vw_chart_eje, $scope, $http, $compile);
    vw_chart_eje.formulary = function (data, mode, defaultData) {
        if (vw_chart_eje !== undefined) {
            RUN_B("vw_chart_eje", vw_chart_eje, $scope, $http, $compile);
            vw_chart_eje.form.modalWidth = ENUM.modal.width.full;
            vw_chart_eje.form.readonly = {};
            vw_chart_eje.createForm(data, mode, defaultData);
            $scope.$watch("vw_chart_eje.key", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_chart_eje, 'key', rules);
            });
            $scope.$watch("vw_chart_eje.origen", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_chart_eje, 'origen', rules);
            });
            $scope.$watch("vw_chart_eje.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_chart_eje, 'nombre', rules);
            });
            $scope.$watch("vw_chart_eje.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_chart_eje, 'descripcion', rules);
            });
            $scope.$watch("vw_chart_eje.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_chart_eje, 'type', rules);
            });
            $scope.$watch("vw_chart_eje.parent", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_chart_eje, 'parent', rules);
            });
        }
    };
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
    vw_chart_eje.loadDiagram3 = async function(origen,key,type,childrenArray){
        var key = key || null;
        var type = type || null;
        if (vw_chart_eje.session.tipo_institucion == 1) {
            var request = await BASEAPI.listp('vw_chart_eje', {
                limit: 0,
                orderby: '',
                where: [
                    {
                        field: "origen",
                        value: origen,
                    }
                ]
            })
        }else {
            var request = await BASEAPI.listp('vw_chart_eje_privada', {
                limit: 0,
                orderby: '',
                where: [
                    {
                        field: "origen",
                        value: origen,
                    }
                ]
            })
        }
        var prueba = [];
        var parentsArray = [];
        var myNode = request.data.filter(d => {
            return d.key == key;
        })
        var childrensArray = childrenArray || [];
        console.log(myNode[0]);
        if (myNode[0])
                parentsArray.push(myNode[0].parent);
        // debugger
        if (key){
            var prueba2 = [];
            var myParent = myNode[0].parent;
            var me = [myNode[0].key];
            // debugger
            if(type){
                for (var i in request.data){
                    if (request.data[i].key == key){
                        if (request.data[i].has_children !== 0) {
                            prueba.push(request.data[i]);
                        }
                    }else{
                        if (request.data[i].type != type){
                            if (request.data[i].parent == key ){
                                if (request.data[i].has_children !== 0){
                                    prueba.push(request.data[i]);
                                    parentsArray.push(request.data[i].key);
                                }
                            }else{
                                if (!childrensArray.includes(request.data[i].type)) {
                                    if (request.data[i].has_children !== 0) {
                                        prueba.push(request.data[i]);
                                    }
                                }else{
                                    if (parentsArray.includes(request.data[i].parent)){
                                        if (request.data[i].has_children !== 0) {
                                            prueba.push(request.data[i]);
                                            parentsArray.push(request.data[i].key)
                                        }
                                    }
                                }
                            }
                        }else {
                            if (request.data[i].type !== 'END' && request.data[i].type !== 'ODS' && request.data[i].type !== 'PNPSP'){
                                if (!parentsArray.includes(request.data[i].parent)){
                                    if (request.data[i].has_children !== 0) {
                                        prueba.push(request.data[i]);
                                        parentsArray.push(request.data[i].key)
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else{
                for (var i in request.data) {
                    if (request.data[i].has_children !== 0) {
                        prueba.push(request.data[i]);
                    }
                }
            }
        }else{
            for (var i in request.data) {
                if (request.data[i].has_children !== 0) {
                    prueba.push(request.data[i]);
                }
            }
        }


        if (vw_chart_eje.session.tipo_institucion == 1){
            if(prueba.some(d => d.parent === 'OBJ0')){
                prueba.push(
                    {
                    key: "PRU001",
                    nombre: "",
                    origen: "",
                    descripcion: "Opciones Institucionales",
                    type: "OI",
                    parent:  `EJE${origen}`
                    },
                    {
                    key: "OBJ0",
                    origen: "",
                    descripcion: "Objetivo Estratégico Institucional",
                    type: "PRU_OBJ",
                    parent:  `PRU001`
                    }
                );
            }
            if(prueba.some(d => d.parent === 'END0' || d.parent === 'ODS0' || d.parent === 'PNPSP0' )){
                prueba.push({
                        key: "PRU002",
                        nombre: "",
                        origen: "",
                        descripcion: "Instrumentos de Planificación Nacional",
                        type: "OG",
                        parent:  `EJE${origen}`
                    });
                if (prueba.some(d => d.parent === 'END0')){
                    prueba.push({
                            key: "END0",
                            origen: "",
                            descripcion: "Estrategia Nacional de Desarrollo",
                            type: "PRU_END",
                            parent:  `PRU002`
                        });
                }
                if (prueba.some(d => d.parent === 'ODS0')){
                    prueba.push({
                            key: "ODS0",
                            origen: "",
                            descripcion: "Objetivo de Desarrollo Sostenible",
                            type: "PRU_ODS",
                            parent:  `PRU002`
                        });
                }
                if (prueba.some(d => d.parent === 'PNPSP0')){
                    prueba.push({
                        key: "PNPSP0",
                        origen: "",
                        descripcion: "Plan Nacional Plurianual del Sector Público",
                        type: "PRU_PNPSP",
                        parent:  `PRU002`
                    });
                }
            }
        }else {
            if(prueba.some(d => d.parent === 'OBJ0')){
                prueba.push(
                    {
                        key: "PRU001",
                        nombre: "",
                        origen: "",
                        descripcion: "Opciones Institucionales",
                        type: "OI",
                        parent:  `EJE${origen}`
                    },
                    {
                        key: "OBJ0",
                        origen: "",
                        descripcion: "Objetivo Estratégico Institucional",
                        type: "PRU_OBJ",
                        parent:  `PRU001`
                    }
                );
            }
            if(prueba.some(d => d.parent === 'ODS0')){
                // prueba.push({
                //     key: "PRU002",
                //     nombre: "",
                //     origen: "",
                //     descripcion: "Instrumentos de Planificación Nacional",
                //     type: "OG",
                //     parent:  `EJE${origen}`
                // });
                prueba.push({
                    key: "ODS0",
                    origen: "",
                    descripcion: "Objetivo de Desarrollo Sostenible",
                    type: "PRU_ODS",
                    parent:  `EJE${origen}`
                });
            }
        }
        if (key) {
            if (key.slice(0, 3) !== "ODS" && key.slice(0, 3) !== "END" && key.slice(0, 5) !== "PNPSP") {
                do {
                    for (var i in prueba) {
                        if (myNode[0].type !== "RES" && myNode[0].type !== "IND") {
                            if (!prueba2.some(d => d.parent === prueba[i].parent && d.key === prueba[i].key)) {
                                if (prueba[i].key == myParent) {
                                    prueba2.push(prueba[i]);
                                    myParent = prueba[i].parent;
                                }
                                if (me.includes(prueba[i].key) || me.includes(prueba[i].parent)) {
                                    prueba2.push(prueba[i]);
                                    me.push(prueba[i].key);
                                }
                            }
                        } else {
                            if (!prueba2.some(d => d.key === prueba[i].key)) {
                                if (prueba[i].key == myParent) {
                                    prueba2.push(prueba[i]);
                                    myParent = prueba[i].parent;
                                }
                                if (me.includes(prueba[i].key) || me.includes(prueba[i].parent)) {
                                    prueba2.push(prueba[i]);
                                    me.push(prueba[i].key);
                                }
                            }
                        }
                    }
                    ;
                } while (myParent !== "")
            } else {
                prueba2 = undefined;
            }
        }

        var $ = go.GraphObject.make;  // for conciseness in defining templates

        var compareArray = prueba;
        // var exceptions = [`PRU001`, `PRU002`, "OBJ0", "END0", "ODS0", "PNPSP0", ""]
        // vw_chart_eje.new_data = [];
        // // debugger
        // for (var i in prueba) {
        //     console.log(compareArray.findIndex(x => x.parent == prueba[i].key ) )
        //     if (exceptions.indexOf(prueba[i].parent)) {
        //         vw_chart_eje.new_data.push(prueba[i])
        //     }else{
        //         vw_chart_eje.new_data.push(prueba[compareArray.findIndex(x => x.parent == prueba[i].key )])
        //     }
        // }
        myDiagram =
            $(go.Diagram, "myDiagramDiv",  // must be the ID or reference to div
                {
                    "toolManager.hoverDelay": 100,  // 100 milliseconds instead of the default 850
                    allowCopy: false,
                    layout:  // create a TreeLayout for the family tree
                        $(go.TreeLayout,
                            {
                                arrangement: go.TreeLayout.ArrangementHorizontal,
                                angle: 90,
                                nodeSpacing: 20,
                                layerSpacing: 80,
                                layerStyle: go.TreeLayout.LayerUniform,
                                sorting: go.TreeLayout.SortingDescending,
                                comparer: function(data) {
                                    var node_data = data.node.data;
                                    if (node_data.key == 'PRU001') {
                                        return 1;
                                    }
                                    else {
                                        return -1;
                                    }
                                    // if (da.someProperty > db.someProperty) return 1;
                                    return 0;
                                }
                            })
                });

        var Eje_estrategico = '#F48FB1';
        var Objetivo_estrategico = '#90CAF9';
        var Objetivo_estrategico_especifico = '#435d99';
        var Estrategia = '#F2EE82';
        var Resultado_esperado = '#80FF80';
        var End = '#ff3333';
        var Ods = '#3366cc';
        var Pnpsp = '#cc9900';
        var Oe = '#009900';
        var Indicador_pei = '#aa80ff';
        var opciones_gubernamentales = '#f542bc';
        var opciones_institucionales = '#42f5f2';
        var compromiso_nacional = '#6c82a3';
        var compromiso_internacional = '#6ca387';
        var objetivos_especificos = '#ffbe8c';
        var supuesto = '#825575';
        var linea_accion = '#e87b5f';
        var compromiso = '#b8abab';
        var politica = '#32a883';
        var Meta = '#a1fc03';
        var Denominacion = '#f59b42';


        if (vw_chart_eje.session.tipo_institucion == 1) {
            myDiagram.add(
                $(go.Part, "Table",
                    { position: new go.Point(-350, 20), selectable: false },
                    $(go.TextBlock, "Key",
                        { row: 0, font: "700 14px Droid Serif, sans-serif" }),  // end row 0
                    $(go.Panel, "Horizontal",
                        { row: 1, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: End, margin: 5 }),
                        $(go.TextBlock, "Estrategia Nacional de Desarrollo",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),  // end row 1
                    $(go.Panel, "Horizontal",
                        { row: 2, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Ods, margin: 5 }),
                        $(go.TextBlock, "Objetivo de Desarrollo Sostenible",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),  // end row 2
                    $(go.Panel, "Horizontal",
                        { row: 3, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Pnpsp, margin: 5 }),
                        $(go.TextBlock, "Plan Nacional Plurianual del Sector Público",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),  // end row 3
                    $(go.Panel, "Horizontal",
                        { row: 4, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Oe, margin: 5 }),
                        $(go.TextBlock, "Objetivo General END",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),  // end row 4
                    $(go.Panel, "Horizontal",
                        { row: 5, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Eje_estrategico, margin: 5 }),
                        $(go.TextBlock, "Eje Estratégico",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ), // end row 4
                    $(go.Panel, "Horizontal",
                        { row: 6, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Objetivo_estrategico, margin: 5 }),
                        $(go.TextBlock, "Objetivo Estratégico",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),  // end row 4
                    $(go.Panel, "Horizontal",
                        { row: 7, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Objetivo_estrategico_especifico, margin: 5 }),
                        $(go.TextBlock, "Objetivo Estratégico Específico",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),  // end row 4
                    $(go.Panel, "Horizontal",
                        { row: 8, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Estrategia, margin: 5 }),
                        $(go.TextBlock, "Estrategia",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),  // end row 4
                    $(go.Panel, "Horizontal",
                        { row: 9, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: objetivos_especificos, margin: 5 }),
                        $(go.TextBlock, "Objetivos Específicos END",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),
                    $(go.Panel, "Horizontal",
                        { row: 10, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Resultado_esperado, margin: 5 }),
                        $(go.TextBlock, "Resultado Esperado",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ), // end row 4
                    $(go.Panel, "Horizontal",
                        { row: 11, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: linea_accion, margin: 5 }),
                        $(go.TextBlock, "Línea de Acción",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ), // end row 4
                    $(go.Panel, "Horizontal",
                        { row: 12, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Indicador_pei, margin: 5 }),
                        $(go.TextBlock, "Indicador",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),
                    $(go.Panel, "Horizontal",
                        { row: 13, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: compromiso, margin: 5 }),
                        $(go.TextBlock, "Compromisos Nacionales e Internacionales",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),
                    $(go.Panel, "Horizontal",
                        { row: 14, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: compromiso_nacional, margin: 5 }),
                        $(go.TextBlock, "Compromiso Nacional",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),
                    $(go.Panel, "Horizontal",
                        { row: 15, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: compromiso_internacional, margin: 5 }),
                        $(go.TextBlock, "Compromiso Internacional",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),
                    $(go.Panel, "Horizontal",
                        { row: 16, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: supuesto, margin: 5 }),
                        $(go.TextBlock, "Supuesto",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),
                    $(go.Panel, "Horizontal",
                        { row: 17, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: politica, margin: 5 }),
                        $(go.TextBlock, "Política de Gobierno",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),
                    $(go.Panel, "Horizontal",
                        { row: 18, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Meta, margin: 5 }),
                        $(go.TextBlock, "Metas del Objetivo de Desarrollo Sostenible",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),
                    $(go.Panel, "Horizontal",
                        { row: 19, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Denominacion, margin: 5 }),
                        $(go.TextBlock, "Denominación del Plan Nacional Plurianual del Séctor Público",
                            { font: "700 13px Droid Serif, sans-serif" })
                    )
                ));
        }else {
            // Set up a Part as a legend, and place it directly on the diagram
            myDiagram.add(
                $(go.Part, "Table",
                    {position: new go.Point(-300, 10), selectable: false},
                    $(go.TextBlock, "Key",
                        {row: 0, font: "700 14px Droid Serif, sans-serif"}),  // end row 0
                    $(go.Panel, "Horizontal",
                        { row: 1, alignment: go.Spot.Left },
                        $(go.Shape, "Rectangle",
                            { desiredSize: new go.Size(30, 30), fill: Ods, margin: 5 }),
                        $(go.TextBlock, "Objetivo de Desarrollo Sostenible",
                            { font: "700 13px Droid Serif, sans-serif" })
                    ),  // end row 2
                    $(go.Panel, "Horizontal",
                        {row: 2, alignment: go.Spot.Left},
                        $(go.Shape, "Rectangle",
                            {desiredSize: new go.Size(30, 30), fill: Eje_estrategico, margin: 5}),
                        $(go.TextBlock, "Eje Estratégico",
                            {font: "700 13px Droid Serif, sans-serif"})
                    ), // end row 4
                    $(go.Panel, "Horizontal",
                        {row: 3, alignment: go.Spot.Left},
                        $(go.Shape, "Rectangle",
                            {desiredSize: new go.Size(30, 30), fill: Objetivo_estrategico, margin: 5}),
                        $(go.TextBlock, "Objetivo Estratégico",
                            {font: "700 13px Droid Serif, sans-serif"})
                    ),  // end row 4
                    $(go.Panel, "Horizontal",
                        {row: 4, alignment: go.Spot.Left},
                        $(go.Shape, "Rectangle",
                            {desiredSize: new go.Size(30, 30), fill: Objetivo_estrategico_especifico, margin: 5}),
                        $(go.TextBlock, "Objetivo Estratégico Específico",
                            {font: "700 13px Droid Serif, sans-serif"})
                    ),  // end row 4
                    $(go.Panel, "Horizontal",
                        {row: 5, alignment: go.Spot.Left},
                        $(go.Shape, "Rectangle",
                            {desiredSize: new go.Size(30, 30), fill: Estrategia, margin: 5}),
                        $(go.TextBlock, "Estrategia",
                            {font: "700 13px Droid Serif, sans-serif"})
                    ),  // end row 4
                    $(go.Panel, "Horizontal",
                        {row: 6, alignment: go.Spot.Left},
                        $(go.Shape, "Rectangle",
                            {desiredSize: new go.Size(30, 30), fill: Resultado_esperado, margin: 5}),
                        $(go.TextBlock, "Resultado Esperado",
                            {font: "700 13px Droid Serif, sans-serif"})
                    ), // end row 4
                    $(go.Panel, "Horizontal",
                        {row: 7, alignment: go.Spot.Left},
                        $(go.Shape, "Rectangle",
                            {desiredSize: new go.Size(30, 30), fill: Indicador_pei, margin: 5}),
                        $(go.TextBlock, "Indicador",
                            {font: "700 13px Droid Serif, sans-serif"})
                    )
                ));
        }

        // get tooltip text from the object's data
        function tooltipTextConverter(node_data) {
            return node_data.descripcion;
        }

        // define tooltips for nodes
        var tooltiptemplate =
            $("ToolTip",
                { "Border.fill": "whitesmoke", "Border.stroke": "black" },
                $(go.TextBlock,
                    {
                        font: "bold 8pt Helvetica, bold Arial, sans-serif",
                        wrap: go.TextBlock.WrapFit,
                        margin: 5,
                        maxSize: new go.Size(400, NaN)
                    },
                    new go.Binding("text", "", tooltipTextConverter))
            );

        // define Converters to be used for Bindings
        function typeBrushConverter(type) {
            if (type === "EJE") return Eje_estrategico;
            if (type === "OBJ" || type === "PRU_OBJ") return Objetivo_estrategico;
            if (type === "EST" || type === "OBJ_EST") return Estrategia;
            if (type === "OEF" || type === "OEF_OBJ") return Objetivo_estrategico_especifico;
            if (type === "END" || type === "PRU_END") return End;
            if (type === "ODS" || type === "PRU_ODS") return Ods;
            if (type === "PNPSP" || type === "PRU_PNPSP") return Pnpsp;
            if (type === "OE" || type === "OBJ_OE") return Oe;
            if (type === "RES" || type === "RES_EST") return Resultado_esperado;
            if (type === "OES" || type === "OES_EST") return objetivos_especificos;
            if (type === "LA" || type === "LA_RES") return linea_accion;
            if (type === "IND" || type === "IND_RES") return Indicador_pei;
            if (type === "CNI_RES") return compromiso;
            if (type === "CN" || type === "CN_RES") return compromiso_nacional;
            if (type === "CI" || type === "CI_RES") return compromiso_internacional;
            if (type === "SUS" || type === "SUS_RES") return supuesto;
            if (type === "OG") return opciones_gubernamentales;
            if (type === "OI") return opciones_institucionales;
            if (type === "POL_OBJ" || type === "POL") return politica;
            if (type === "MODS_RES" || type === "MODS") return Meta;
            if (type === "DPNPSP_RES" || type === "DPNPSP") return Denominacion;
            return "orange";
        }
        function typeNameConverter(type) {
            if (type === "EJE") return "Eje Estratégico";
            if (type === "OBJ") return "Objetivo Estratégico";
            if (type === "PRU_OBJ") return "Objetivos Estratégicos";
            if (type === "EST") return "Estrategia";
            if (type === "OBJ_EST") return "Estrategias";
            if (type === "OEF") return "Objetivo Estratégico Específico";
            if (type === "OEF_OBJ") return "Objetivos Estratégicos Específicos";
            if (type === "END") return "Estrategia Nacional de Desarrollo";
            if (type === "PRU_END") return "Estrategias Nacionales de Desarrollo";
            if (type === "ODS") return "Objetivo de Desarrollo Sostenible";
            if (type === "PRU_ODS") return "Objetivos de Desarrollo Sostenible";
            if (type === "PNPSP") return "Plan Nacional Plurianual del Sector Público";
            if (type === "PRU_PNPSP") return "Planes Nacionales Plurianuales del Sector Público";
            if (type === "OE") return "Objetivo General END";
            if (type === "OBJ_OE") return "Objetivos Generales END";
            if (type === "OES_EST") return "Objetivos Específicos";
            if (type === "OES") return "Objetivo Específico";
            if (type === "RES_EST") return "Resultados Esperados";
            if (type === "RES") return "Resultado Esperado";
            if (type === "LA") return "Línea de Acción";
            if (type === "LA_RES") return "Líneas de Acción";
            if (type === "CNI_RES") return "Compromisos Nacionales e Internacionales";
            if (type === "CN_RES") return "Compromisos Nacionales";
            if (type === "CN") return "Compromiso Nacional";
            if (type === "CI_RES") return "Compromisos Internacionales";
            if (type === "CI") return "Compromiso Internacional";
            if (type === "SUS_RES") return "Supuestos";
            if (type === "SUS") return "Supuesto";
            if (type === "IND") return "Indicador";
            if (type === "IND_RES") return "Indicadores";
            if (type === "OG") return "Instrumentos de Planificación Nacional";
            if (type === "OI") return "Opciones Institucionales";
            if (type === "POL") return "Política de Gobierno";
            if (type === "POL_OBJ") return "Políticas de Gobierno";
            if (type === "MODS_RES") return "Metas de Objetivos de Desarrollo Sostenible";
            if (type === "MODS") return "Meta de Objetivo de Desarrollo Sostenible";;
            if (type === "DPNPSP_RES") return "Denominaciones del Plan Nacional Plurianual del Séctor Público";
            if (type === "DPNPSP") return "Denominación del Plan Nacional Plurianual del Séctor Público";
            return "";
        }
        // replace the default Node template in the nodeTemplateMap
        myDiagram.nodeTemplate =
            $(go.Node, "Auto",
                { deletable: false, toolTip: tooltiptemplate },
                new go.Binding("text", "nombre"),
                new go.Binding("location", "loc").makeTwoWay(),
                $(go.Shape, "Rectangle",
                    {
                        fill: "lightgray",
                        stroke: null, strokeWidth: 0,
                        stretch: go.GraphObject.Fill,
                        alignment: go.Spot.Center
                    },
                    new go.Binding("fill", "type", typeBrushConverter)),
                $(go.Panel, "Table",
                    { defaultAlignment: go.Spot.Left, margin: 4 },
                    $(go.RowColumnDefinition, { column: 1, width: 4 }),
                    $(go.TextBlock,
                        {row: 0, column: 0, columnSpan: 3, alignment: go.Spot.Center},
                        {
                            font: "700 12px Droid Serif, sans-serif",
                            textAlign: "left",
                            margin: 10, maxSize: new go.Size(200, NaN)
                        },
                        new go.Binding("text", "type", typeNameConverter)),
                    $(go.TextBlock,
                        { row: 1, column: 0 },
                        {
                            font: "12px Droid Serif, sans-serif",
                            textAlign: "left",
                            margin: 10, maxSize: new go.Size(200, NaN)
                        },
                        new go.Binding("text", "nombre")),
                )
            );

        // define the Link template
        myDiagram.linkTemplate =
            $(go.Link,  // the whole link panel
                { routing: go.Link.Orthogonal, corner: 5, selectable: false },
                $(go.Shape, { strokeWidth: 3, stroke: '#424242' }));  // the gray link shape

        // here's the family data
        console.log(prueba2, prueba);
        var nodeDataArray = prueba2 ? prueba2 : prueba;

        // create the model for the family tree
        myDiagram.model = new go.TreeModel(nodeDataArray);
    }
    vw_chart_eje.zoom_to_fit = function () {
        myDiagram.commandHandler.zoomToFit();
    }
    vw_chart_eje.zoom_in = function () {
        myDiagram.commandHandler.increaseZoom();
    }
    vw_chart_eje.zoom_out = function () {
        myDiagram.commandHandler.decreaseZoom();
    }
});