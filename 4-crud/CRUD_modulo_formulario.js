CRUD_modulo_formulario = {};
DSON.keepmerge(CRUD_modulo_formulario, CRUDDEFAULTS);
DSON.keepmerge(CRUD_modulo_formulario, {
    table: {
        //width: "width:3000px;",
        view: 'vw_modulo_formulario',
        //method: 'modulo_formulario',
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
            descripcion: {},
            indicador: {
                label: "Condición",
                format: function (row) {
                    try {
                        let configuration = JSON.parse(row.config);
                        let respuestas = modulo_formulario.registros.filter(d => d.modulo_formulario == row.id).map(d => JSON.parse(d.respuestas));
                        return modulo_formulario.calculate(row, configuration, respuestas);
                    } catch (e) {
                        return "Error en indicador";
                    }
                }
            },
            link: {
                format: (row) => {
                    let link = `${CONFIG.ssl === true ? 'https://' : 'http://'}${CONFIG.subdomain !== '' ? CONFIG.subdomain + '.' : ''}${CONFIG.domain}${(CONFIG.port === 80 || CONFIG.port === 443 || CONFIG.port === 443) ? '' : (":" + CONFIG.port)}${CONFIG.folderslash}/home#auth/formulario?id=${row.id}?view=true`;
                    return `<a href="${link}">Vizualizar</a>`
                }
            }
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_modulo_formulario.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
CRUD_modulo_formulario.table.options[0].menus[1] = {
    text: (data) => {
        return "Ver Gráficos";
    },
    icon: (data) => {
        return "list";
    },
    click: function (data) {
        console.log(data.row);
        Row_id = '';
        data.$scope.formulary({
            where: [{
                field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
            }]
        }, FORM.modes.edit, {}, "report");
        return false;
    }
};