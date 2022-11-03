CRUD_plantilla_registro = {};
DSON.keepmerge(CRUD_plantilla_registro, CRUDDEFAULTS);
DSON.keepmerge(CRUD_plantilla_registro, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_plantilla_registro',
        //method: 'plantilla_registro',
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
            plantilla_nombre: {
                link: {table: 'plantilla', from: 'plantilla'}, label: function () {
                    return "Plantilla";
                }
            },
            nombre: {},
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'plantilla',
                'base': 'plantilla',
                'field': 'id',
                'columns': ['id', 'nombre']
            }]
    }
});
//modify methods that existing option
//CRUD_plantilla_registro.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
CRUD_plantilla_registro.table.options[0].menus.splice(1, 1);
CRUD_plantilla_registro.table.options[0].menus.splice(2, 1);
CRUD_plantilla_registro.table.options[0].menus.push({
    text: (data) => {
        return "Generar";
    },
    icon: (data) => {
        return "list";
    },
    permission: (data) => {
        return 'generate';
    },
    characterist: (data) => {
        return "";
    },
    show: function (data) {
        return true;
    },
    click: async function (data) {
        //extra function
        $("#eluniquex").html();
        SWEETALERT.loading({message: `Generando <b>"${data.row.nombre}"</b> con la plantilla "${data.row.plantilla_nombre}"`});
        if (!plantilla_registro.plantillas) {
            plantilla_registro.plantillas = await BASEAPI.listp("vw_planitilla_fields", {
                orderby: "$ orden, label",
                order: "asc",
                limit: 0,
                page: 1
            });
            plantilla_registro.plantillas = plantilla_registro.plantillas.data;
        }
        let planti = await BASEAPI.firstp("plantilla", {
            where: [{value: data.row.plantilla}]
        });
        let register = await BASEAPI.firstp("plantilla_registro", {
            where: [{value: data.row.id}]
        });
        if (planti) {
            let contendiofinal = planti.contenido;
            let fields = plantilla_registro.getFields(planti.id);
            fields.forEach(d => {
                console.log(`@${d.key}@`, register[d.field]);
                if (d.tipo === "imagen") {
                    contendiofinal = contendiofinal.replaceAll(`@${d.key}@`, `<img src="${register[d.field]}">`);
                } else
                    contendiofinal = contendiofinal.replaceAll(`@${d.key}@`, register[d.field])
            });
            $("#eluniquex").html(contendiofinal);
            $("#eluniquex").printThis({
                importCSS: false,
                printDelay: 333,
            });
        }
        SWEETALERT.stop();
        return false;
    }
});