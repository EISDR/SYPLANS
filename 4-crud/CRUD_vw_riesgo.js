var Row_id = '';
var Matriz_id = '';
var From_where = '';
var Ocurrencia = '';
CRUD_vw_riesgo = {};
DSON.keepmerge(CRUD_vw_riesgo, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_riesgo, {
    table: {
        width: "width:2000px;",
        //view: 'vw_vw_riesgo',
        //method: 'vw_riesgo',
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
                exportExample: false,
                dead: true
            },
            entidad: {
                label: function (){
                    return "Entidad"
                }
            },
            registro_nombre: {
                label: function() {
                    return "Nombre"
                }
            },
            riesgo_a: {
                label: function (){
                    return "Riesgo"
                }
            },
            descripcion: {shorttext: 360},
            probabilidad_nombre: {
                label: function () {
                    return "Probalidad"
                },
                format: function (row) {
                    return row.probabilidad_nombre + " - " + parseInt(row.probabilidad_valor) + "%";
                }
            },
            impacto_nombre: {
                label: function () {
                    return "Impacto"
                },
                format: function (row) {
                    return row.impacto_nombre + " - " + parseInt(row.impacto_valor) + "";
                }
            },
            factor_riesgo: {
                label: function () {
                    return "Factor de Riesgo"
                }
            },
            tipo_riesgo: {
                label: function () {
                    return "Tipo de Riesgo"
                }
            },
            causa_debilidad: {
                label: function () {
                    return "Causa o Debilidad"
                }
            },
            consecuencia: {
                label: function () {
                    return "Efecto"
                }
            },
            supuestos: {
                label: function () {
                    return "Supuestos"
                }
            },
            estrategia_nombre: {
                label: function () {
                    return "Estrategia"
                }
            },
            estado_plan_accion_nombre: {
                label: function(){
                    return "Estatus"
                },
                export: true,
                format: function (row) {
                    var nom = row.estado_plan_accion_nombre;
                    $(`.Iniciado`).css('background', '#ff6d29');
                    $(`.Completado`).css('background', '#548235');
                    $(`.PendienteaTrabajar`).css('background', '#CECECE');
                    return `<div title="${row.estado_plan_accion_nombre}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },
            evaluacion: {
                label: function(){
                    return "Evaluación"
                }
            },
            // observacion: {
            //     label: function(){
            //         return "Observación"
            //     },
            // },
            // ocurrencia_view: {
            //     label: function () {
            //         return "¿Ocurrencia del Evento?"
            //     },
            //     visible: false,
            //     visibleDetail: false,
            // },
            riesgo_control: {
                label: function () {
                    return "Controles de Riesgo"
                },
                export: false,
                exportExample: false
            },
            riesgo_controls_real: {
                label: function () {
                    return "Controles de Riesgo"
                },
                visible: false,
                visibleDetail: false,
                export: true,
                exportExample: true,
                checkExport: true,
                dead: true
            },
            ocurrencia_nombre: {
                label: function(){
                    return "Ocurrencia del Riesgo"
                },
                export: true,
                format: function (row) {
                    var nom = row.ocurrencia_nombre;
                    $(`.ConOcurrencia`).css('background', '#e32619');
                    $(`.SinOcurrencia`).css('background', '#548235');
                    $(`.PendienteaTrabajar`).css('background', '#CECECE');
                    return `<div title="${row.ocurrencia_nombre}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },
        },
        filters: {
            columns: true
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (typeof eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`) != "undefined") {
                        if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Work') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Work') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Work') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Work') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Work') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Work') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Work') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Work') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                            return MESSAGE.i('actions.Work') + ", " +
                                MESSAGE.i('actions.View');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Work') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit) {
                            return MESSAGE.i('actions.Work');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                            return MESSAGE.i('actions.View');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Remove');
                        }
                    } else {
                        return MESSAGE.i('actions.Work') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.Remove') + ", " +
                            MESSAGE.i('actions.audit');
                    }
                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['edit', 'remove', 'active', 'view', 'copy', 'audit'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [
                    {
                        text: (data) => {
                            return 'Dos';
                        },
                        icon: (data) => {
                            return "hammer-wrench";
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return data.row.estado_plan_accion_nombre != "Completado"
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            From_where = 'plan_accion';
                            baseController.modal.modalView("riesgo_a/plan_accion", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Plan de Acción del Riesgo: "' + data.row.nombre + '"',
                                    icon: "hammer-wrench"
                                },
                                footer: {
                                    cancelButton: false
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                    sameController: 'riesgo_a'
                                },
                                event: {
                                    show: {
                                        end: function(){
                                            setTimeout(function (){
                                                if (typeof riesgo_a !== 'undefined') {
                                                    if (typeof riesgo_a !== 'not defined') {
                                                        if (riesgo_a) {
                                                            riesgo_a.getFromView(data.row);
                                                            riesgo_a.refreshAngular();
                                                        }
                                                    }
                                                }
                                            }, 2000);
                                            setTimeout(function (){
                                                if (typeof riesgo_a !== 'undefined') {
                                                    if (typeof riesgo_a !== 'not defined') {
                                                        if (riesgo_a) {
                                                            riesgo_a.refreshAngular();
                                                        }
                                                    }
                                                }
                                            }, 1500);
                                        }
                                    }
                                }
                            });
                            BASEAPI.list('riesgo', {
                                limit: 1
                            }, function(result){
                                data.$scope.refresh();
                                if (typeof riesgo_a !== 'undefined') {
                                    if (typeof riesgo_a !== 'not defined') {
                                        if (riesgo_a) {
                                            riesgo_a.getFromView(data.row);
                                        }
                                    }
                                }
                            });
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.View');
                        },
                        icon: (data) => {
                            return "eye";
                        },
                        permission: (data) => {
                            return 'view';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return data.row.estado_plan_accion_nombre == "Completado"
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            Ocurrencia = data.row.ocurrencia;
                            baseController.modal.modalView("riesgo_a/view_plan_accion", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Ver Riesgo: "' + data.row.nombre + '"',
                                    icon: "eye"
                                },
                                footer: {
                                    cancelButton: false
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                    sameController: 'riesgo_a'
                                },
                            });
                            BASEAPI.list('riesgo', {
                                limit: 1
                            }, function(result){
                                data.$scope.refresh();
                                riesgo_a.getFromView(data.row);
                            });
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Remove');
                        },
                        icon: (data) => {
                            return "trash";
                        },
                        permission: (data) => {
                            return 'remove';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: (data) => {
                            return data.row.estado_plan_accion_nombre != "Completado"
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: async function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                    BASEAPI.updateall('riesgo', {
                                        "estado": "$null",
                                        "estado_plan_accion": "$null",
                                        "observacion": "$null",
                                        "estrategia": "$null",
                                        where: [
                                            {
                                                field: "id",
                                                value: data.row.id
                                            }
                                        ]
                                    }, function(result){
                                        BASEAPI.deleteall('riesgo_matriz_control',[
                                            {
                                                field: "riesgo",
                                                value: data.row.riesgo_a_id
                                            },
                                            {
                                                field: "riesgo_control",
                                                value: data.row.id
                                            }
                                        ], function(){
                                            SWEETALERT.stop()
                                            data.$scope.refresh();
                                        });
                                    });
                                }
                            });
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.audit');
                        },
                        title: (data) => {
                            return MESSAGE.i('actions.audit');
                        },
                        permission: (data) => {
                            return 'audit';
                        },
                        icon: (data) => {
                            return "stack-text";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: (data) => {
                          return false
                        },
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/audit", data.$scope.modelName), {
                                    header: {
                                        title: MESSAGE.i('mono.auditof') + " " + data.$scope.plural,
                                        icon: "user"
                                    },
                                    footer: {
                                        cancelButton: true
                                    },
                                    content: {
                                        loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                        sameController: true
                                    },
                                });
                            }
                        }
                    },
                ]
            }
        ]
    }
});
//modify methods that existing option
//CRUD_vw_riesgo.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_vw_riesgo.table.options[0].menus.push({
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