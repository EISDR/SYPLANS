CRUD_ser_servicio = {};
DSON.keepmerge(CRUD_ser_servicio, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ser_servicio, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_ser_servicio',
        //method: 'ser_servicio',
        //limits: [10, 50, 100, 0],
        //report: true,
        batch: false,
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
            nombre: {},
            descripcion: {shorttext: 360},
            ser_servicio_direccion: {
                label: function () {
                    return "A Quién va Dirigido"
                }, shorttext: 360
            },
            departamento: {
                label: function () {
                    return "Departamento"
                },
                format: function (row) {
                    return row.departamento_nombre
                }
            },
            usuario: {
                label: function () {
                    return "Responsable"
                },
                format: function (row) {
                    return row.usuario_nombre + ' ' + row.usuario_apellido
                }
            },
            costo: {formattype: ENUM.FORMAT.decimal},
        },
        filters: {
            columns: [
                {
                    key: 'nombre',
                    label: 'Nombre',
                    type: FILTER.types.string,
                    placeholder: 'Nombre'
                },
                {
                    key: 'descripcion',
                    label: 'Descripción',
                    type: FILTER.types.string,
                    placeholder: 'Descripción'
                },
                {
                    key: 'ser_servicio_direccion',
                    label: function(){
                        return 'A Quién va Dirigido'
                    },
                    type: FILTER.types.string,
                    placeholder: 'Descripción'
                },
                {
                    key: 'departamento',
                    label: function() {
                        return 'Departamento'
                    },
                    type: FILTER.types.relation,
                    table: 'departamento',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "compania",
                                "value": new SESSION().current() ? new SESSION().current().compania_id : -1
                            },
                            {
                                "field": "institucion",
                                "operator": new SESSION().current().institucion_id ? "=" : "is",
                                "value": new SESSION().current() ? new SESSION().current().institucion_id ? new SESSION().current().institucion_id : "$null" : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'usuario',
                    label: function() {
                        return 'Persona responsable'
                    },
                    type: FILTER.types.relation,
                    table: 'vw_usuario',
                    value: "id",
                    text: "item.completo",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [
                            {
                                "field": "compania",
                                "value": new SESSION().current() ? new SESSION().current().compania_id : -1
                            },
                            {
                                "field": "institucion",
                                "operator": new SESSION().current().institucion_id ? "=" : "is",
                                "value": new SESSION().current() ? new SESSION().current().institucion_id ? new SESSION().current().institucion_id : "$null" : -1
                            }
                        ],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'costo',
                    label: 'Costo',
                    type: FILTER.types.decimal,
                    placeholder: 'Costo',
                    maxlength: 20
                },
            ]
        },
        single: [
            {
                'table': 'departamento',
                'base': 'departamento',
                'field': 'id',
                'columns': ['id', 'nombre']
            },
            {
                'table': 'usuario',
                'base': 'usuario',
                'field': 'id',
                'columns': ['id', 'nombre', 'apellido']
            }]
    }
});
//modify methods that existing option
//CRUD_ser_servicio.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_ser_servicio.table.options[0].menus.push({
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