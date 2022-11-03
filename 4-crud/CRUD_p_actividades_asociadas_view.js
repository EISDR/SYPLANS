CRUD_p_actividades_asociadas_view = {};
DSON.keepmerge(CRUD_p_actividades_asociadas_view, CRUDDEFAULTS);
DSON.keepmerge(CRUD_p_actividades_asociadas_view, {
    table: {
        width: "width:1800px;",
        //view: 'vw_p_actividades_asociadas_view',
        //method: 'p_actividades_asociadas_view',
        //limits: [10, 50, 100, 0],
        //report: true,
        //batch: false,
        //persist: false,
        //sortable: false,
        //dragrow: 'num',
        //rowStyle: function (row, $scope) {
        //    return "color:red;";
        //},
        //rowClass: function (row, $scope) {
        //    return row.name === 'whatever' ? "bg-" + COLOR.danger + "-300" : "";
        //},
        //activeColumn: "active",
        //key: 'id',
        //deletekeys: ['id'],
        columns: {
            // dbcolumnname: {
            //     visible: false,
            //     visibleDetail: false,
            //     export: false,
            //     exportExample: false,
            //     sortable: false,
            //     shorttext: 360,
            //     dead:true,
            //     formattype: ENUM.FORMAT.numeric,
            //     sorttype: ENUM.FORMATFILTER.numeric,
            //     drag: true,
            //     click: function (data) {
            //         alert(data.row.id);
            //         //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
            //     },
            //     reference: "id",
            //     format: function (row) {
            //         return row.id + "*";
            //     }
            // },
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            proyecto_item: {
                label: function (){
                    return "Proyecto Especial"
                },
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_p_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_p_actividad_apoyo !== 'not defined') {
                            if (comentarios_p_actividad_apoyo) {
                                comentarios_p_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Proyecto_actividad_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_p_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            proyecto_actividad_nombre: {
                label: function (){
                    return "Actividad"
                },
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_p_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_p_actividad_apoyo !== 'not defined') {
                            if (comentarios_p_actividad_apoyo) {
                                comentarios_p_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Proyecto_actividad_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_p_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            nombre: {
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_p_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_p_actividad_apoyo !== 'not defined') {
                            if (comentarios_p_actividad_apoyo) {
                                comentarios_p_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Proyecto_actividad_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_p_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            descripcion: {
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_p_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_p_actividad_apoyo !== 'not defined') {
                            if (comentarios_p_actividad_apoyo) {
                                comentarios_p_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Proyecto_actividad_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_p_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            departamento: {
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_p_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_p_actividad_apoyo !== 'not defined') {
                            if (comentarios_p_actividad_apoyo) {
                                comentarios_p_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Proyecto_actividad_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_p_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            responsable: {
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_p_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_p_actividad_apoyo !== 'not defined') {
                            if (comentarios_p_actividad_apoyo) {
                                comentarios_p_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Proyecto_actividad_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_p_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            razon_nombre: {
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_p_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_p_actividad_apoyo !== 'not defined') {
                            if (comentarios_p_actividad_apoyo) {
                                comentarios_p_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Proyecto_actividad_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_p_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            estatus: {
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_p_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_p_actividad_apoyo !== 'not defined') {
                            if (comentarios_p_actividad_apoyo) {
                                comentarios_p_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Proyecto_actividad_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_p_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            fecha_inicio: {
                formattype: ENUM.FORMAT.date,
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_p_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_p_actividad_apoyo !== 'not defined') {
                            if (comentarios_p_actividad_apoyo) {
                                comentarios_p_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Proyecto_actividad_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_p_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
            fecha_fin: {
                formattype: ENUM.FORMAT.date,
                click: function (key,value,rowdata) {
                    var animation = new ANIMATION();
                    if (typeof comentarios_p_actividad_apoyo !== 'undefined') {
                        if (typeof comentarios_p_actividad_apoyo !== 'not defined') {
                            if (comentarios_p_actividad_apoyo) {
                                comentarios_p_actividad_apoyo.fixFilters = [
                                    {
                                        "field": "type",
                                        "value": ENUM_2.tipo_comentario.Proyecto_actividad_apoyo
                                    },
                                    {
                                        "field": "value2",
                                        "value": key.row.id
                                    },
                                ];
                                comentarios_p_actividad_apoyo.refresh();
                                animation.loading(`#animationDepartamento`, "Cargando ", ``, '800');
                                animation.stoploading(`#animationDepartamento`, ``);
                            }
                        }
                    }
                },
                dblclick: function(key,value,row){
                }
            },
        },
        filters: {
            columns: true
        },
    }
});
//modify methods that existing option
//CRUD_p_actividades_asociadas_view.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_p_actividades_asociadas_view.table.options[0].menus.push({
//     text: (data) => {
//         return MESSAGE.i('actions.Extra');
//     },
//     icon: (data) => {
//         return "list";
//     },
//     permission: (data) => {
//         return 'extra';
//     },
//     characterist: (data) => {
//         return "";
//     },
//     show: function (data) {
//         return true;
//     },
//     click: function (data) {
//         //extra function
//         return false;
//     }
// });