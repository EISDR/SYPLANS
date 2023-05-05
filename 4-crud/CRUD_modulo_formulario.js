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
                        if (!row.indicador) {
                            return "Sin indicador";
                        }
                        let configuration = JSON.parse(row.config);
                        let respuestas = modulo_formulario.registros.filter(d => d.modulo_formulario == row.id).map(d => JSON.parse(d.respuestas));
                        let total = respuestas.length;
                        let filtrados = respuestas.filter(d => {
                            let filtro = (row.indicador + "").toLowerCase();
                            filtro = filtro.replaceAll(" y ", "&&").replaceAll(" o ", "||");
                            Object.keys(d).forEach(field => {
                                if (typeof d[field] === 'string')
                                    d[field] = d[field].toLowerCase();
                                filtro = filtro.replaceAll(`@${field.toLowerCase()}@`, `d["${field}"]`);
                            });
                            try {
                                return eval(filtro);
                            } catch (e) {
                                return false;
                            }
                        }).length;
                        let formuled = eval(row.formula);
                        let ponderation = undefined;
                        if (configuration.indicadores)
                            if (configuration.indicadores.length) {
                                for (const indicador of configuration.indicadores) {
                                    if (formuled >= indicador.desde && formuled <= indicador.hasta) {
                                        ponderation = indicador;
                                        break;
                                    }
                                }
                            }
                        if (ponderation) {
                            $(`.Unique`).css('background', ponderation.color);
                            return `<div title="${ponderation.nombre}" class='Unique shape_element'></div><div class="text-center">${(Number(formuled).toFixed(2) + "") + row.sufijo}</div>`;
                        } else {
                            return (Number(formuled).toFixed(2) + "") + row.sufijo;
                        }
                    } catch (e) {
                        return "Error en indicador";
                    }
                }
            },
            link: {
                format: (row) => {
                    let link = `${CONFIG.ssl === true ? 'https://' : 'http://'}${CONFIG.subdomain !== '' ? CONFIG.subdomain + '.' : ''}${CONFIG.domain}${(CONFIG.port === 80 || CONFIG.port === 443 || CONFIG.port === 443) ? '' : (":" + CONFIG.port)}${CONFIG.folderslash}/home#auth/formulario?id=${row.id}`;
                    return `<a href="${link}" target="_blank">Vizualizar</a>`
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
// CRUD_modulo_formulario.table.options[0].menus.push({
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