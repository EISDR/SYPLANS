lachechon = new SESSION().current();
lachechon = lachechon || {};
var Row_id = "";
var Matriz_id = "";
var From_where = '';
var Ocurrencia = "";
CRUD_riesgo = {};
DSON.keepmerge(CRUD_riesgo, CRUDDEFAULTS);
DSON.keepmerge(CRUD_riesgo, {
    table: {
        width: "width:1600px;",
        view: 'vw_riesgo',
        //method: 'riesgo',
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
            riesgo_a_id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            riesgo_a: {
                label: function () {
                    return "Riesgo"
                }
            },
            registro: {
                label: "Registro",
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
            nivel_riesgo_v: {
                label: function () {
                    return "Nivel de Riesgo"
                },
                format: function (row) {
                    $(`.maring-bottom`).css('margin-bottom', '0');
                    return `<div class="${row.nivel_riesgo}"><p class="maring-bottom">${row.nivel_riesgo}</p>(${parseFloat(row.nivel_riesgo_v).toFixed(2)})</div>`
                }
            },
            factor_riesgo: {
                label: function () {
                    return "Factor de Riesgo"
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
            evaluacion: {
                label: function () {
                    return "Evaluación"
                }
            },
            estado: {
                label: function () {
                    return "Estatus"
                },
                export: true,
                format: function (row) {
                    var nom = row.estado;
                    $(`.Monitoreado`).css('background', '#FF0000');
                    $(`.NoMonitoreado`).css('background', '#548235');
                    $(`.PendienteaTrabajar`).css('background', '#CECECE');
                    return `<div title="${row.estado}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },
            riesgo_control: {
                label: function () {
                    return "Controles de Riesgo"
                },
                export: false,
                exportExample: false
            },
            riesgo_controls: {
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
                label: function () {
                    return "Ocurrencia del Riesgo"
                },
                export: true,
                format: function (row) {
                    var nom = row.ocurrencia_nombre;
                    $(`.ConOcurrencia`).css('background', '#e32619');
                    $(`.SinOcurrencia`).css('background', '#548235');
                    $(`.PendienteaTrabajarO`).css('background', 'none');
                    return `<div title="${row.ocurrencia_nombre}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                }
            },
        },
        filters: {
            columns: [
                {
                    key: 'registro',
                    label: 'Registro',
                    type: FILTER.types.relation,
                    table: 'pnpsp',
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
                    key: 'probabilidad',
                    label: 'Probabilidad',
                    type: FILTER.types.relation,
                    table: 'riesgo_probabilidad',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [{
                            "field": lachechon.institucion_id ? "institucion" : "compania",
                            "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : lachechon.compania_id : -1
                        }],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'impacto',
                    label: 'Impacto',
                    type: FILTER.types.relation,
                    table: 'riesgo_impacto',
                    value: "id",
                    text: "item.nombre",
                    query: {
                        limit: 0,
                        page: 1,
                        where: [{
                            "field": lachechon.institucion_id ? "institucion" : "compania",
                            "value": lachechon ? lachechon.institucion_id ? lachechon.institucion_id : lachechon.compania_id : -1
                        }],
                        orderby: "id",
                        order: "asc",
                        distinct: false
                    },
                },
                {
                    key: 'factor_riesgo',
                    label: 'Factor de Riesgo',
                    type: FILTER.types.decimal,
                    placeholder: 'Factor de Riesgo'
                },
                {
                    key: 'consecuencia',
                    label: 'Consecuencia',
                    type: FILTER.types.string,
                    placeholder: 'Consecuencia'
                },
            ]
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (typeof eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`) != "undefined") {
                        if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit) {
                            return MESSAGE.i('actions.Edit');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                            return MESSAGE.i('actions.View');
                        } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                            return MESSAGE.i('actions.Remove');
                        }
                    } else {
                        return MESSAGE.i('actions.Edit') + ", " +
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
                show: (data) => {
                    return data.row.estado == "Pendiente a Trabajar"
                },
                menus: [
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Edit');
                        },
                        icon: (data) => {
                            return "pencil5";
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return true;
                        },
                        click: function (data) {
                            Row_id = '';
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            data.$scope.riesgo_historico = data.row.riesgo_historico + '';
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
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                    header: {
                                        title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
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
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: async function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                    data.$scope.deleteRow(data.row).then(function () {
                                        SWEETALERT.stop();
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
                            return false;
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
            },
            {
                title: (data) => {
                    return "Evaluar Riesgo"
                },
                text: (data) => {
                    return "Evaluar Riesgo"
                },
                icon: (data) => {
                    return "circles";
                },
                permission: (data) => {
                    return 'evaluate';
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    return !data.row.evaluacion;
                },
                click: function (data) {

                    Row_id = data.row.id;
                    baseController.modal.modalView("riesgo_a/evaluacion", {
                        width: ENUM.modal.width.full,
                        header: {
                            title: 'Evaluación del Riesgo: "' + data.row.nombre + '"',
                            icon: "circles"
                        },
                        footer: {
                            cancelButton: false
                        },
                        content: {
                            loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                            sameController: 'riesgo_a'
                        },
                    });
                    return false;
                }
            },
            {
                title: (data) => {
                    return "Monitorear Riesgo"
                },
                text: (data) => {
                    return "Monitorear Riesgo"
                },
                icon: (data) => {
                    return "check";
                },
                permission: (data) => {
                    return 'evaluate';
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    return data.row.evaluacion && data.row.estado == "Pendiente a Trabajar";
                },
                click: function (data) {
                    Row_id = data.row.riesgo_a_id;
                    Matriz_id = data.row.id;
                    From_where = 'matriz_riesgo';
                    SWEETALERT.buttons(
                        {
                            message: "<p style='margin-top: -15px'>¿Desea Monitorear el riesgo?</p>",
                        },
                        [
                            {
                                text: "Si",
                                color: "success",
                                action: function () {
                                    swal.close();
                                    BASEAPI.list('riesgo_control', {
                                        limit: 0,
                                        where: [
                                            {
                                                field: "riesgo",
                                                value: data.row.riesgo_a_id
                                            }
                                        ]
                                    }, function (result) {
                                        if (result.data.length) {
                                            result.data.forEach(item => {
                                                Object.keys(item).forEach(field => {
                                                    if (item[field])
                                                        if (item[field].split)
                                                            if (item[field].split('-').length > 2) {
                                                                let isDate = item[field].split('T');
                                                                if (isDate.length === 2) {
                                                                    item[field] = isDate[0];
                                                                }
                                                            }
                                                    if (item[field] === null)
                                                        delete item[field];

                                                    item.riesgo_control = data.row.id;

                                                });
                                                delete item.id;
                                            });
                                        }
                                        if (result.data.length > 0) {
                                            BASEAPI.insert('riesgo_matriz_control', result.data, function (result2) {
                                                baseController.modal.modalView("riesgo_a/plan_accion", {
                                                    width: ENUM.modal.width.full,
                                                    header: {
                                                        title: 'Monitoreo del riesgo: "' + data.row.nombre + '"',
                                                        icon: "check"
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
                                                            end: function () {
                                                                setTimeout(function () {
                                                                    if (typeof riesgo_a !== 'undefined') {
                                                                        if (typeof riesgo_a !== 'not defined') {
                                                                            if (riesgo_a) {
                                                                                riesgo_a.getFromView(data.row);
                                                                                riesgo_a.refreshAngular();
                                                                            }
                                                                        }
                                                                    }
                                                                }, 1000)
                                                            }
                                                        }
                                                    }
                                                });
                                                BASEAPI.updateall('riesgo', {
                                                    "estado": 1,
                                                    "estado_plan_accion": 1,
                                                    where: [
                                                        {
                                                            field: "id",
                                                            value: data.row.id
                                                        }
                                                    ]
                                                }, function (result) {
                                                    data.$scope.refresh();
                                                    data.row.estado = 1;
                                                    data.row.estado_plan_accion_nombre = "Iniciado";
                                                    data.row.estado_plan_accion = 1;
                                                    setTimeout(function () {
                                                        if (typeof riesgo_a !== 'undefined') {
                                                            if (typeof riesgo_a !== 'not defined') {
                                                                if (riesgo_a) {
                                                                    riesgo_a.getFromView(data.row);
                                                                    riesgo_a.refreshAngular();
                                                                }
                                                            }
                                                        }
                                                    }, 1000)
                                                    // setTimeout(function (){
                                                    //     riesgo_a.getFromView(data.row);
                                                    //
                                                    // }, 1000)
                                                });
                                            })
                                        } else {
                                            baseController.modal.modalView("riesgo_a/plan_accion", {
                                                width: ENUM.modal.width.full,
                                                header: {
                                                    title: 'Monitoreo del riesgo: "' + data.row.nombre + '"',
                                                    icon: "check"
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
                                                        end: function () {
                                                            setTimeout(function () {
                                                                if (typeof riesgo_a !== 'undefined') {
                                                                    if (typeof riesgo_a !== 'not defined') {
                                                                        if (riesgo_a) {
                                                                            riesgo_a.getFromView(data.row);
                                                                            riesgo_a.refreshAngular();
                                                                        }
                                                                    }
                                                                }
                                                            }, 1000)
                                                        }
                                                    }
                                                }
                                            });
                                            BASEAPI.updateall('riesgo', {
                                                "estado": 1,
                                                "estado_plan_accion": 1,
                                                where: [
                                                    {
                                                        field: "id",
                                                        value: data.row.id
                                                    }
                                                ]
                                            }, function (result) {
                                                data.$scope.refresh();
                                                data.row.estado = 1;
                                                data.row.estado_plan_accion_nombre = "Iniciado";
                                                data.row.estado_plan_accion = 1;
                                                setTimeout(function () {
                                                    if (typeof riesgo_a !== 'undefined') {
                                                        if (typeof riesgo_a !== 'not defined') {
                                                            if (riesgo_a) {
                                                                riesgo_a.getFromView(data.row);
                                                                riesgo_a.refreshAngular();
                                                            }
                                                        }
                                                    }
                                                }, 1000)
                                                // setTimeout(function (){
                                                //     riesgo_a.getFromView(data.row);
                                                //
                                                // }, 1000)
                                            });
                                        }
                                    })
                                    return false;

                                }
                            },
                            {
                                text: "No",
                                color: "warning",
                                action: function () {
                                    BASEAPI.updateall('riesgo', {
                                        "estado": 2,
                                        where: [
                                            {
                                                field: "id",
                                                value: data.row.id
                                            }
                                        ]
                                    }, function (result) {
                                        swal.close();
                                        data.$scope.refresh();
                                    });

                                }
                            },
                            {
                                text: "Volver Atrás",
                                color: "info",
                                action: function () {
                                    swal.close()
                                }
                            }
                        ]
                    )
                    $('.swal2-animate-info-icon').css({'width': '70px', 'height': '70px'})
                    // Row_id = data.row.id;
                    // baseController.modal.modalView("riesgo_a/evaluacion", {
                    //     width: ENUM.modal.width.full,
                    //     header: {
                    //         title: 'Evaluación del Riesgo: "' + data.row.nombre + '"',
                    //         icon: "circles"
                    //     },
                    //     footer: {
                    //         cancelButton: false
                    //     },
                    //     content: {
                    //         loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                    //         sameController: 'riesgo_a'
                    //     },
                    // });
                    return false;
                }
            },
            {
                title: (data) => {
                    return "Trabajar";
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
                    return data.row.estado_plan_accion_nombre == "Iniciado"
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
                                end: function () {
                                    setTimeout(function () {
                                        if (typeof riesgo_a !== 'undefined') {
                                            if (typeof riesgo_a !== 'not defined') {
                                                if (riesgo_a) {
                                                    riesgo_a.getFromView(data.row);
                                                    riesgo_a.refreshAngular();
                                                }
                                            }
                                        }
                                    }, 1000)
                                }
                            }
                        }
                    });
                    BASEAPI.list('riesgo', {
                        limit: 1
                    }, function (result) {
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
                title: (data) => {
                    return "Trabajar";
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
                    return riesgo.esplan;
                },
                click: function (data) {
                    Row_id = data.row.riesgo_a_id;
                    Matriz_id = data.row.id;
                    From_where = 'plan_accion';
                    data.$scope.dateredada = data.row;
                    console.log(data);
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
                                end: function () {
                                    setTimeout(async function () {
                                        if (typeof riesgo_a !== 'undefined') {
                                            if (typeof riesgo_a !== 'not defined') {
                                                if (riesgo_a) {
                                                    riesgo_a.getFromView(data.row);
                                                    riesgo_a.refreshAngular();
                                                }
                                            }
                                        }
                                    }, 1000)
                                }
                            }
                        }
                    });
                    BASEAPI.list('riesgo', {
                        limit: 1
                    }, async function (result) {
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
                title: (data) => {
                    return "Ver";
                },
                icon: (data) => {
                    return "eye";
                },
                permission: (data) => {
                    return 'edit';
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    return riesgo.esplan && data.row.condicion == 1;
                },
                click: function (data) {
                    Row_id = data.row.riesgo_a_id;
                    Matriz_id = data.row.id;
                    From_where = 'plan_accion';

                    baseController.modal.modalView("riesgo_a/view_neo_plan_accion", {
                        width: ENUM.modal.width.full,
                        header: {
                            title: 'Plan de Acción del Riesgo: "' + data.row.nombre + '"',
                            icon: "eye"
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
                                end: function () {
                                    setTimeout(async function () {
                                        if (typeof riesgo_a !== 'undefined') {
                                            if (typeof riesgo_a !== 'not defined') {
                                                if (riesgo_a) {
                                                    riesgo_a.getFromView(data.row);
                                                    riesgo_a.refreshAngular();
                                                }
                                            }
                                        }
                                    }, 1000)
                                }
                            }
                        }
                    });
                    BASEAPI.list('riesgo', {
                        limit: 1
                    }, async function (result) {
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
                title: (data) => {
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
                    return data.row.estado_plan_accion_nombre == "Completado" && !riesgo.esplan
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
                    }, function (result) {
                        data.$scope.refresh();
                        riesgo_a.getFromView(data.row);
                    });
                    return false;
                }
            },
        ]
    }
});
//modify methods that existing option
//CRUD_riesgo.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_riesgo.table.options[0].menus.push({
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
