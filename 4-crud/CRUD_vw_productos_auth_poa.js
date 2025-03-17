lachechon = new SESSION().current();
lachechon = lachechon || {};
CRUD_vw_productos_auth_poa = {};
DSON.keepmerge(CRUD_vw_productos_auth_poa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_productos_auth_poa, {
    table: {
         view: 'vw_productos_auth_poa',
        report: true,
        batch: false,
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            no1: {
                shorttext: 360,
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    vw_actividades_auth_poa.fixFilters = [
                        {
                            "field": "producto",
                            "value": key.row.id
                        }
                    ];
                    vw_actividades_auth_poa.refresh();
                    animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                    animation.stoploading(`#animationDepartamento`, ``);
                },
                dblclick: function(key,value,row){
                }
            },
            producto: {
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    vw_actividades_auth_poa.fixFilters = [
                        {
                            "field": "producto",
                            "value": key.row.id
                        }
                    ];
                    vw_actividades_auth_poa.refresh();
                    animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                    animation.stoploading(`#animationDepartamento`, ``);
                },
                dblclick: function(key,value,row){
                }
            },
            fecha_inicio: {
                click: function (key,value,rowdata) {
                    vw_actividades_auth_poa.fixFilters = [
                        {
                            "field": "producto",
                            "value": key.row.id
                        }
                    ];
                    vw_actividades_auth_poa.refresh();
                },
                dblclick: function(key,value,row){
                }
            },
            fecha_fin: {
                click: function (key,value,rowdata) {
                    vw_actividades_auth_poa.fixFilters = [
                        {
                            "field": "producto",
                            "value": key.row.id
                        }
                    ];
                    vw_actividades_auth_poa.refresh();
                },
                dblclick: function(key,value,row){
                }
            },
            poa_id: {formattype: ENUM.FORMAT.numeric, visible: false, visibleDetail: false, export: false, exportExample: false, dead: true, nofilter: true},
            estado_en_producto: {formattype: ENUM.FORMAT.numeric, visible: false, visibleDetail: false, export: false, exportExample: false, dead: true},
            nombre: {
                label: function (){
                    return MESSAGE.i('columns.estado')
                },
                click: function (key,value,rowdata) {
                    vw_actividades_auth_poa.fixFilters = [
                        {
                            "field": "producto",
                            "value": key.row.id
                        }
                    ];
                    vw_actividades_auth_poa.refresh();
                },
                dblclick: function(key,value,row){
                }
            }
        },
        filters: {
             columns: [
                 {
                     key: 'no1',
                     type: FILTER.types.integer,
                 },
                 {
                     key: 'producto',
                     type: FILTER.types.string,
                 },
                 {
                     key: 'estado_en_producto',
                     type: FILTER.types.relation,
                     table: 'productos_poa_status',
                     value: "id",
                     text: "item.nombre",
                     query: {
                         limit: 0,
                         page: 1,
                         where: [],
                         orderby: "id",
                         order: "asc",
                         distinct: false
                     },
                 },
                 {
                    key: 'fecha_inicio_f',
                    type: FILTER.types.date,
                },
                 {
                    key: 'fecha_fin_f',
                    type: FILTER.types.date,
                }
            ]
        }
    }
});
