CRUD_backup_ejecucion = {};
DSON.keepmerge(CRUD_backup_ejecucion, CRUDDEFAULTS);
DSON.keepmerge(CRUD_backup_ejecucion, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_vw_cargo',
        //method: 'vw_cargo',
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
                exportExample: false,
                dead: true
            },
            ruta_archivo: {
                label: "Ruta del archivo",
                format: function(row) {
                    return !row.ruta_archivo ? "Ejecutando backup..." : row.ruta_archivo;
                }
            },
            fecha: {
                formattype: ENUM.FORMAT.date,
                sorttype: ENUM.FORMATFILTER.date,
            },
            compania_nombre: {
                label: "Compañía"
            }
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'compania',
                'base': 'compania',
                'field': 'id',
                'columns': ['id', 'nombre']
            },]
    }
});
//modify methods that existing option
//CRUD_backup_ejecucion.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
CRUD_backup_ejecucion.table.options[0].menus.push({
    text: (data) => {
        return "Restaurar a esta versión"
    },
    icon: (data) => {
        return "list";
    },
    permission: (data) => {
        return 'extra';
    },
    characterist: (data) => {
        return "";
    },
    show: function (data) {
        return true;
    },
    click: function (data) {
        SWEETALERT.confirm({
            message: "¿Está seguro que desea restaurar a esta versión?",
            confirm: async function () {
                SWEETALERT.loading({message: "Restaurando base de datos..."});
                BASEAPI.insert('backup_ejecucion',{
                    fecha: moment().format('YYYY-MM-DD'),
                    ruta_archivo: `Restore del backup: "${data.row.ruta_archivo}"`,
                    compania: data.row.compania,
                    restore: 1
                }, function(result){
                    if (result)
                    SWEETALERT.show({message:"El proceso de restore iniciará en unos segundos, por favor espere."});
                })
            }
        });
        //extra function
        return false;
    }
});