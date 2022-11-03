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
                label: function() {
                    return "No.";
                },
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
                label: function (){
                    return lachechon ? lachechon.tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto" : "Proyecto"
                },
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
                label: function() {
                    return "Fecha de inicio";
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
            },
            fecha_fin: {
                label: function() {
                    return "Fecha de fin";
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
            },
            poa_id: {formattype: ENUM.FORMAT.numeric, visible: false, visibleDetail: false, export: false, exportExample: false},
            estado_en_producto: {formattype: ENUM.FORMAT.numeric, visible: false, visibleDetail: false, export: false, exportExample: false},
            nombre: {
                label: function() {
                    return "Estatus";
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
                     label: function () { return  lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción'},
                     type: FILTER.types.integer,
                     placeholder: lachechon.tipo_institucion === 1 ? 'No. Proyecto/Producto' : 'No. Proyecto/Plan de Acción'
                 },
                 {
                     key: 'producto',
                     label: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción',
                     type: FILTER.types.string,
                     placeholder: lachechon.tipo_institucion === 1 ? 'Proyecto/Producto' : 'Proyecto/Plan de Acción'
                 },
                 {
                     key: 'estado_en_producto',
                     label: 'Estado',
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
                        label: 'Fecha Inicio',
                    type: FILTER.types.date,
                    placeholder: 'Fecha Inicio'
                },
                 {
                    key: 'fecha_fin_f',
                        label: 'Fecha Fin',
                    type: FILTER.types.date,
                    placeholder: 'Fecha Fin'
                }
            ]
        }
    }
});
