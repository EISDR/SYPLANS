app.controller("documentos_asociados_mapa_conceptual", function ($scope, $http, $compile) {
    documentos_asociados_mapa_conceptual = this;
    //documentos_asociados_mapa_conceptual.fixFilters = [];
    //documentos_asociados_mapa_conceptual.singular = "singular";
    //documentos_asociados_mapa_conceptual.plural = "plural";
    documentos_asociados_mapa_conceptual.headertitle = 'Mapas Conceptuales';
    //documentos_asociados_mapa_conceptual.destroyForm = false;
    //documentos_asociados_mapa_conceptual.permissionTable = "tabletopermission";
    RUNCONTROLLER("documentos_asociados_mapa_conceptual", documentos_asociados_mapa_conceptual, $scope, $http, $compile);
    documentos_asociados_mapa_conceptual.formulary = function (data, mode, defaultData) {
        if (documentos_asociados_mapa_conceptual !== undefined) {
            RUN_B("documentos_asociados_mapa_conceptual", documentos_asociados_mapa_conceptual, $scope, $http, $compile);
            documentos_asociados_mapa_conceptual.form.modalWidth = ENUM.modal.width.full;
            documentos_asociados_mapa_conceptual.form.titles = {
                new: "Nuevo Mapa Conceptual",
                edit: "Editar Mapa Conceptual",
                view: "Ver Mapa Conceptual"
            };
            documentos_asociados_mapa_conceptual.form.readonly = {};
            if (mode == 'new')
                documentos_asociados_mapa_conceptual.diagrama = null;
            documentos_asociados_mapa_conceptual.createForm(data, mode, defaultData);
            $scope.$watch("documentos_asociados_mapa_conceptual.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_asociados_mapa_conceptual, 'nombre', rules);
            });
            $scope.$watch("documentos_asociados_mapa_conceptual.descripcion", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_asociados_mapa_conceptual, 'descripcion', rules);
            });
            //ms_product.selectQueries['tipo_documentos_asociados_mapa_conceptual'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
        }
    };
    documentos_asociados_mapa_conceptual.mapa_conceptual = () => {
        SWEETALERT.loading({message: "Cargando Diagrama"});
        setTimeout(async function () {
            // These parameters need to be set before defining the templates.
            const MINLENGTH = 200; // this controls the minimum length of any swimlane
            const MINBREADTH = 20; // this controls the minimum breadth of any non-collapsed swimlane

            // some shared functions
            // this may be called to force the lanes to be laid out again
            function relayoutLanes() {
                documentos_asociados_mapa_conceptual.myDiagram.nodes.each((lane) => {
                    if (!(lane instanceof go.Group)) return;
                    if (lane.category === 'Pool') return;
                    lane.layout.isValidLayout = false; // force it to be invalid
                });
                documentos_asociados_mapa_conceptual.myDiagram.layoutDiagram();
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

            documentos_asociados_mapa_conceptual.myDiagram = new go.Diagram('myDiagramDiv', {
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
            documentos_asociados_mapa_conceptual.myDiagram.model = new go.GraphLinksModel({
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

            documentos_asociados_mapa_conceptual.myDiagram.nodeTemplate = new go.Node('Auto', {

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
            documentos_asociados_mapa_conceptual.myDiagram.groupTemplateMap.add(
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
            documentos_asociados_mapa_conceptual.myDiagram.groupTemplateMap.get('Lane').resizeAdornmentTemplate = new go.Adornment('Spot')
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

            documentos_asociados_mapa_conceptual.myDiagram.groupTemplateMap.add(
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

            documentos_asociados_mapa_conceptual.myDiagram.linkTemplate = new go.Link({
                routing: go.Routing.Orthogonal,  // may be either Orthogonal or AvoidsNodes
                curve: go.Curve.JumpOver,
                corner: 5,
                relinkableFrom: true,
                relinkableTo: true,
                doubleClick: function(e, link) {
                    documentos_asociados_mapa_conceptual.myDiagram.startTransaction("edit text");
                    const tb = link.findObject("LABEL");
                    if (tb !== null) documentos_asociados_mapa_conceptual.myDiagram.commandHandler.editTextBlock(tb);
                    documentos_asociados_mapa_conceptual.myDiagram.commitTransaction("edit text");
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
                documentos_asociados_mapa_conceptual.loadMapa(documentos_asociados_mapa_conceptual.diagrama);
            } catch (e) {

            }




            const colors = {
                pink: '#facbcb',
                blue: '#b7d8f7',
                green: '#b9e1c8',
                yellow: '#faeb98',
                background: '#e8e8e8',
            };
            documentos_asociados_mapa_conceptual.myDiagram.div.style.backgroundColor = colors.background;

            // Show the diagram's model in JSON format
            function save() {
                documentos_asociados_mapa_conceptual.diagrama = documentos_asociados_mapa_conceptual.myDiagram.model.toJson();
                documentos_asociados_mapa_conceptual.myDiagram.isModified = false;
            }
            function load() {
                documentos_asociados_mapa_conceptual.myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);
                documentos_asociados_mapa_conceptual.myDiagram.delayInitialization(relayoutDiagram);
            }

            SWEETALERT.stop();
        }, 1000)
    }

    documentos_asociados_mapa_conceptual.saveMapa = function (){
        documentos_asociados_mapa_conceptual.myDiagram.nodes.each(function(node) {
            var textBlock = node.findObject("TEXTBLOCK"); // Asegúrate de que este nombre coincide con el nombre del TextBlock
            if (textBlock !== null) {
                node.data.text = encodeURIComponent(textBlock.text);
            }
        });

        documentos_asociados_mapa_conceptual.myDiagram.links.each(function(link) {
            if (link.points !== null) {
                // Convertir la lista de puntos en un array de números
                var pointsArray = link.points.toArray().flatMap(point => [point.x, point.y]);
                link.data.points = pointsArray;
            }
        });
        return documentos_asociados_mapa_conceptual.myDiagram.model.toJson();
    }

    // Luego, decodificar el texto cuando cargues el diagrama
    documentos_asociados_mapa_conceptual.loadMapa = function (json) {
        documentos_asociados_mapa_conceptual.myDiagram.model = go.Model.fromJson(json);

        documentos_asociados_mapa_conceptual.myDiagram.nodes.each(function(node) {
            var textBlock = node.findObject("TEXTBLOCK");
            if (textBlock !== null && node.data.text) {
                textBlock.text = decodeURIComponent(node.data.text);
            }
        });
    }

    //función para añadir pools
    documentos_asociados_mapa_conceptual.addNewPool = function(diagram, poolName) {
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
    documentos_asociados_mapa_conceptual.addNewLane = function(diagram, laneName) {
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
    documentos_asociados_mapa_conceptual.addNode = function (diagram, nodeName, figure) {
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

    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    documentos_asociados_mapa_conceptual.triggers.table.after.open = function (data) {
        documentos_asociados_mapa_conceptual.mapa_conceptual();
        //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    };
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
    documentos_asociados_mapa_conceptual.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        data.inserting.diagrama = documentos_asociados_mapa_conceptual.saveMapa();
        data.inserting.documento_asociado = typeof documentos_asociados !== 'undefined' ? documentos_asociados?.id : undefined;
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    documentos_asociados_mapa_conceptual.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        data.updating.diagrama = documentos_asociados_mapa_conceptual.saveMapa();
        data.updating.documento_asociado = typeof documentos_asociados !== 'undefined' ? documentos_asociados?.id : undefined;
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
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
});