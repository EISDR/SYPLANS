CRUD_mega_producto_adtividades = {};
DSON.keepmerge(CRUD_mega_producto_adtividades, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_producto_adtividades, {
    table: {
        engine: 'my',
        view: "vw_actividades_poa",
        width: "width: 2000px;",
        sort: "id",
        order: "desc",
        batch: false,
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            no2: {
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    mega_productos_actividades_apoyo.fixFilters = [
                        {
                            "field": "actividades_poa",
                            "value": key.row.id
                        }
                    ];
                    mega_productos_actividades_apoyo.refresh();
                    animation.loading(`#animationMegaPresupuesto`, "Cargando ", ``, '200');
                    animation.stoploading(`#animationMegaPresupuesto`, ``);
                },
            },
            cantidad_actividades: {
                visible: false,
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    mega_productos_actividades_apoyo.fixFilters = [
                        {
                            "field": "actividades_poa",
                            "value": key.row.id
                        }
                    ];
                    mega_productos_actividades_apoyo.refresh();
                    animation.loading(`#animationMegaPresupuesto`, "Cargando ", ``, '200');
                    animation.stoploading(`#animationMegaPresupuesto`, ``);
                },
            },
            actividad: {
                shorttext: 370,
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    mega_productos_actividades_apoyo.fixFilters = [
                        {
                            "field": "actividades_poa",
                            "value": key.row.id
                        }
                    ];
                    mega_productos_actividades_apoyo.refresh();
                    animation.loading(`#animationMegaPresupuesto`, "Cargando ", ``, '200');
                    animation.stoploading(`#animationMegaPresupuesto`, ``);
                },
            },
            responsable: {
                shorttext: 370,
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    mega_productos_actividades_apoyo.fixFilters = [
                        {
                            "field": "actividades_poa",
                            "value": key.row.id
                        }
                    ];
                    mega_productos_actividades_apoyo.refresh();
                    animation.loading(`#animationMegaPresupuesto`, "Cargando ", ``, '200');
                    animation.stoploading(`#animationMegaPresupuesto`, ``);
                },
            },
            presupuesto: {
                formattype: "money",
                exportExample: "[money]",
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    mega_productos_actividades_apoyo.fixFilters = [
                        {
                            "field": "actividades_poa",
                            "value": key.row.id
                        }
                    ];
                    mega_productos_actividades_apoyo.refresh();
                    animation.loading(`#animationMegaPresupuesto`, "Cargando ", ``, '200');
                    animation.stoploading(`#animationMegaPresupuesto`, ``);
                },
            },
            fecha_inicio: {
                sorttype: "date",
                formattype: "date",
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    mega_productos_actividades_apoyo.fixFilters = [
                        {
                            "field": "actividades_poa",
                            "value": key.row.id
                        }
                    ];
                    mega_productos_actividades_apoyo.refresh();
                    animation.loading(`#animationMegaPresupuesto`, "Cargando ", ``, '200');
                    animation.stoploading(`#animationMegaPresupuesto`, ``);
                },
            },
            fecha_fin: {
                sorttype: "date",
                formattype: "date",
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    mega_productos_actividades_apoyo.fixFilters = [
                        {
                            "field": "actividades_poa",
                            "value": key.row.id
                        }
                    ];
                    mega_productos_actividades_apoyo.refresh();
                    animation.loading(`#animationMegaPresupuesto`, "Cargando ", ``, '200');
                    animation.stoploading(`#animationMegaPresupuesto`, ``);
                },
            }
        },
        options: [
            {
                text: (data) => {
                    return "Ver lista";
                },
                title: (data) => {
                    return "Ver lista";
                },
                icon: (data) => {
                    return "eye";
                },
                permission: (data) => {
                    return ['viewlist'];
                },
                characterist: (data) => {
                    return '';
                },
                click: function (data) {
                    mega_productos_actividades_apoyo.fixFilters = [
                        {
                            "field": 'actividades_poa',
                            "value": data.row.id
                        }
                    ];

                    mega_productos_actividades_apoyo.refresh();
                }

            },


        ]

    }
});
CRUD_mega_producto_adtividades.table.options[0].show = function (data) {
    return data.row.cantidad_actividades !== 0;
};
