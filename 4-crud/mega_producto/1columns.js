CRUD_mega_producto = {};
DSON.keepmerge(CRUD_mega_producto, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_producto, {
    table: {
        engine: 'my',
        view: "vw_productos_poa_detalles_mega",
        width: "width: 2400px;",
        sort: "id",
        order: "desc",
        batch: false,
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                export: false,
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            no_eje: {
                label: "No.",
                sorttype: "numeric",
                class: "text-left"
            },
            eje_estrategico:{
                label: function(){
                    return "Eje Estratégico"
                },
                shorttext: 370
            },
            no_objetivo: {
                label: function () {
                    return "No.";
                },
                class: "text-left",
            },
            objetivo_estrategico:{
                label: function(){
                    return "Objetivo Estratégico"
                },
                shorttext: 370
            },
            no_estrategia: {
                label: "No.",
                class: "text-left"
            },
            estrategia:{
                label: "Estrategia",
                shorttext: 370
            },
            no2: {
                label: "No.",
            },
            resultado: {
                label: function(){
                    return "Resultado Esperado"
                },
                shorttext: 370
            },
            no1: {
                label: "No.",
            },
            producto: {
                label: function () {
                    return new SESSION().current().tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto";
                },
                shorttext: 370
            },
            estado_producto: {
                label: "estado",
                shorttext: 370
            },
            departamento: {
              label: "Departamento",
              shorttext: 370
            },
            fecha_inicio: {
                label: "Fecha Inicio",
                type: FILTER.types.string,
                placeholder: 'Fecha Inicio'
            },
            fecha_fin: {
                label: "Fecha Fin",
                type: FILTER.types.string,
                placeholder: 'Fecha Fin'
            },
            involucrado: {
                label: function () {
                    return "Involucrados";
                },
                shorttext:150,
                export: false,
                exportExample: false,
            },
            involucrados: {
                label: function () {
                    return "Involucrados";
                },
                visible: false,
                visibleDetail: false,
                checkExport: true,
                dead:true
            },
        },
        options: [
            {
                text: (data) => {
                    //
                    return "";
                },
                title: (data) => {
                    return "";
                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['view_details','comment_product'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [
                    {
                        text: (data) => {
                            return MESSAGE.i('planificacion.view_details');
                        },
                        icon: (data) => {
                            return "eye";
                        },
                        permission: (data) => {
                            return 'view_details';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            console.log(data.row.id_actividades_gro);
                            mega_producto.id_actividad_producto = data.row.id_actividades_gro ? data.row.id_actividades_gro: -1;
                            data.$scope.workProduct(data.row.id, data.row.id_status, data.row.producto);
                        }
                    }
                ]
            },
            {
                text: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                title: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                icon: (data) => {
                    return "comment";
                },
                permission: (data) => {
                    return ['comment_product'];
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    if(data.row.comentarios > 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                click: function (data) {
                    mega_producto.id_para_comentarios = data.row.id;
                    mega_producto.modalAction('comentarios_productos_poa', MESSAGE.i('planificacion.comentarios'), 'comment', 'list',{});
                    return false;
                }
            }

        ]
    }
});
