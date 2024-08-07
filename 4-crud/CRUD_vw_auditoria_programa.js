CRUD_vw_auditoria_programa = {};
DSON.keepmerge(CRUD_vw_auditoria_programa, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_auditoria_programa, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_vw_auditoria_programa',
        //method: 'vw_auditoria_programa',
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
            nombre: {},
            descripcion: {shorttext: 360},
            estatus_nombre: {},
            fecha_inicio: {formattype: ENUM.FORMAT.datetime},
            fecha_fin: {formattype: ENUM.FORMAT.datetime}
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_vw_auditoria_programa.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
CRUD_vw_auditoria_programa.table.options.push({
    title: (data) => {
        return "Ver lista de Auditorías";
    },
    icon: (data) => {
        return "list";
    },
    characterist: (data) => {
        return "";
    },
    show: function (data) {
        return true;
    },
    click: function (data) {
        //extra function
        vw_auditoria_programa.dataForView = data.row;
        vw_auditoria_programa.modal.modalView("vw_auditoria_programa/view_planes", {

            width: 'modal-full',
            header: {
                title: `Ver auditorías del programa de auditoría: "${data.row.nombre}" `,
                icon: "list"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'vw_auditoria_programa_plan'
            },
            event: {
                // show: {
                //     begin: function (data) {
                //
                //     },
                //     end: async function (eData) {
                //
                //     }
                // },
                // hide: {
                //     begin: function (data) {
                //
                //     },
                //     end: function (data) {
                //     }
                // }
            },
        });
        return false;
    }
});